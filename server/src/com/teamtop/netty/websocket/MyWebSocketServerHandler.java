package com.teamtop.netty.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.firewall.FireWallFunction;
import com.teamtop.netty.firewall.skyeye.SkyEyeCache;
import com.teamtop.netty.firewall.skyeye.SkyEyeFunction;
import com.teamtop.netty.util.NettyDispatch;
import com.teamtop.netty.util.NettyRead;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.system.event.backstage.events.backstage.BackstageConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.handler.codec.http.websocketx.CloseWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PingWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PongWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshaker;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshakerFactory;
import io.netty.util.CharsetUtil;
public class MyWebSocketServerHandler extends SimpleChannelInboundHandler<Object> {
	private Logger logger = LoggerFactory.getLogger(MyWebSocketServerHandler.class);
	private WebSocketServerHandshaker handshaker;
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		// ??????
		Channel channel = ctx.channel();
		if(GameProperties.shutdown) channel.close();
		TempData tempData = new TempData();
		tempData.setChannel(channel);
		channel.attr(NettyCache.ATTR_KEY).set(tempData);
		SkyEyeCache.addChannelConn(channel);//???????????????channel
		logger.info(channel.remoteAddress().toString() + ",client channelActive");
		super.channelActive(ctx);
//		System.out.println("?????????????????????????????????");
	}
	
	// ??????
	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		try {
			Channel channel = ctx.channel();
			SkyEyeCache.removeChannelConn(channel);
			TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
			if(tempData!=null&& tempData.getHero()!=null){
				Hero hero = tempData.getHero();
				int operType = 0;
				int onlinetime = TimeDateUtil.getCurrentTime() - hero.getLoginTime();
				logger.info("MyWebSocket.remove channel.hid:"+hero.getId()+".hero online time:"+onlinetime);
				if(onlinetime<10){
					//??????
					operType = BackstageConst.M_LOGINOUT_OPER_REFRESH;
				}else{
					//????????????
					operType = BackstageConst.M_LOGINOUT_OPER_NORMAL;
				}
				if(CrossZone.isCrossServer()){
					//???????????????
					CrossFunction.logout(hero);
				}else{
					HeroFunction.getIns().logout(hero, operType);
				}
			}else {
				logger.info("MyWebSocket.not hero.remove channel.address:"+channel.remoteAddress().toString() + ",channelInactive.");
			}
			tempData.setChannel(null);
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e));
		}
//		System.out.println("?????????????????????????????????");
	}
	@Override
	protected void channelRead0(ChannelHandlerContext ctx, Object msg) throws Exception {
		if (msg instanceof FullHttpRequest) {
			handleHttpRequest(ctx, ((FullHttpRequest) msg));
		} else if (msg instanceof WebSocketFrame) {
			handlerWebSocketFrame(ctx, (WebSocketFrame) msg);
		}
	}
	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		ctx.flush();
	}
	private void handlerWebSocketFrame(ChannelHandlerContext ctx,WebSocketFrame frame) {
		// ?????????????????????????????????
		if (frame instanceof CloseWebSocketFrame) {
			handshaker.close(ctx.channel(), (CloseWebSocketFrame) frame
					.retain());
		}
		// ????????????ping??????
		if (frame instanceof PingWebSocketFrame) {
			ctx.channel().write(
					new PongWebSocketFrame(frame.content().retain()));
			return;
		}
		ByteBuf in = frame.content();
		int readableBytes = in.readableBytes();
		if(readableBytes<2) return;
		int dataLength = in.readUnsignedShort();
		//logger.error("receive frame Length:"+dataLength);
		if (readableBytes < dataLength) {
			// ????????????12640??????????????????????????????1024??????
			// ?????????????????????????????????reset reader index
			in.resetReaderIndex();
//			logger.warn("need more data???readableBytes:" + readableBytes + ",dataLength:" + dataLength + ":" + ctx.channel().remoteAddress());
			return;
		} else {
			// ?????????????????????????????????????????????????????????
			// ?????????????????????
			final ByteBuf data = in.readBytes(dataLength - 2);
			// ?????????mark ?????????decode???????????? ?????????????????????
			in.markReaderIndex();
			try {
				int cmd = data.readUnsignedShort();
				if( GameProperties.gmFlag&& cmd==101)
					System.err.println("??????101??????");
				if(cmd %2==0){
					TempData tempData = ctx.channel().attr(NettyCache.ATTR_KEY).get();
					SkyEyeFunction.cgBadCmd(tempData);
				}
				if((cmd >6100 & cmd <6200) || cmd==223 || cmd==225 || cmd==603){
					
				}else{
					FireWallFunction.channelRead(ctx, dataLength);
				}
				
				if( GameProperties.gmFlag&& cmd!=1101&& cmd!=3907&& cmd!=3909&& cmd!=3911&& cmd!=3865){//?????????????????????
					Hero hero = ctx.channel().attr(NettyCache.ATTR_KEY).get().getHero();
//					if( hero!=null)
//						System.err.println(hero.getName()+" cmd:"+cmd+"			openid:"+hero.getOpenid());
				}
				
				final Object[] readDatas = NettyRead.readData(data, cmd);
				if (readDatas != null) {
					NettyDispatch.dispatcherMethod(cmd, readDatas, ctx.channel());
				} else {
//					logger.warn("iodecoder dispatch fail,cmd:" + cmd + ",dataLen:" + (dataLength - 4));
				}

				 //???????????????Object[]
				/*byte[] readDatas = data.readBytes(dataLength - 4).array();
				if (readDatas != null) {
					NettyDispatch.dispatcherMethod(cmd, readDatas, ctx.channel());
				} else {
					logger.warn("iodecoder dispatch fail,cmd:" + cmd + ",dataLen:" + (dataLength - 4));
				}*/
				
			} catch (Exception e) {
				// ????????????????????????
				LogTool.error(e, this, "");
//				logger.error(LogFormat.exception(e));
			}
		}
		/*// ?????????????????????????????????????????????????????????
		if (!(frame instanceof TextWebSocketFrame)) {
			System.out.println("?????????????????????????????????????????????????????????");
			throw new UnsupportedOperationException(String.format(
					"%s frame types not supported", frame.getClass().getName()));
		}
		// ??????????????????
		String request = ((TextWebSocketFrame) frame).text();
		System.out.println("??????????????????" + request);
		String response = "{\"msg\":\"heroInfo\", \"b\":1,\"name\":\"name\",\"x\":700,\"y\":800, \"ms\":250}";
		TextWebSocketFrame tws = new TextWebSocketFrame(response);
		// ??????????????????????????????
		ctx.channel().writeAndFlush(tws);*/
	}
	private void handleHttpRequest(ChannelHandlerContext ctx,FullHttpRequest req) {
		String upgrade = req.headers().get("Upgrade");
		if (!req.getDecoderResult().isSuccess()
				|| (!"websocket".equals(upgrade) && !"Websocket".equals(upgrade))) {
			sendHttpResponse(ctx, req, new DefaultFullHttpResponse(
					HttpVersion.HTTP_1_1, HttpResponseStatus.BAD_REQUEST));
			return;
		}
		WebSocketServerHandshakerFactory wsFactory = new WebSocketServerHandshakerFactory(
				"wss://localhost:8001/websocket", null, false);
		handshaker = wsFactory.newHandshaker(req);
		if (handshaker == null) {
			WebSocketServerHandshakerFactory
					.sendUnsupportedWebSocketVersionResponse(ctx.channel());
		} else {
			handshaker.handshake(ctx.channel(), req);
		}
	}
	private static void sendHttpResponse(ChannelHandlerContext ctx,FullHttpRequest req, DefaultFullHttpResponse res) {
		// ????????????????????????
		if (res.getStatus().code() != 200) {
			ByteBuf buf = Unpooled.copiedBuffer(res.getStatus().toString(),
					CharsetUtil.UTF_8);
			res.content().writeBytes(buf);
			buf.release();
		}
		// ????????????Keep-Alive???????????????
		ChannelFuture f = ctx.channel().writeAndFlush(res);
		if (!isKeepAlive(req) || res.getStatus().code() != 200) {
			f.addListener(ChannelFutureListener.CLOSE);
		}
	}
	private static boolean isKeepAlive(FullHttpRequest req) {
		return false;
	}
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		//cause.printStackTrace();
		ctx.close();
	}
} 

	
