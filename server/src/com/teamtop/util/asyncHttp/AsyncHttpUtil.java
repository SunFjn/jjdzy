package com.teamtop.util.asyncHttp;

import io.netty.bootstrap.Bootstrap;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.http.DefaultFullHttpRequest;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpMethod;
import io.netty.handler.codec.http.HttpRequestEncoder;
import io.netty.handler.codec.http.HttpResponseDecoder;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.util.AttributeKey;
import io.netty.util.concurrent.GenericFutureListener;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.battleVideo.upload.event.HttpUploadConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.AnalyzeUtils;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.md5.MD5Function;
import com.teamtop.util.time.TimeDateUtil;

/**
 * http请求，使用netty
 * 
 * @author Administrator
 * 
 */
public class AsyncHttpUtil {
	private static Logger logger = LoggerFactory.getLogger(AsyncHttpUtil.class);
	public static AttributeKey<Object> ATTR_KEY = new AttributeKey<Object>("httpIDKey");
	private static Bootstrap b = null;
	private static void initClient() throws Exception {
		EventLoopGroup workerGroup = new NioEventLoopGroup();
		b = new Bootstrap();
		b.group(workerGroup);
		b.channel(NioSocketChannel.class);
		b.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 2000);
		b.handler(new ChannelInitializer<SocketChannel>() {
			@Override
			public void initChannel(SocketChannel ch) throws Exception {
				// 客户端接收到的是httpResponse响应，所以要使用HttpResponseDecoder进行解码
				ch.pipeline().addLast(new HttpResponseDecoder());
				// 客户端发送的是httprequest，所以要使用HttpRequestEncoder进行编码
				ch.pipeline().addLast(new HttpRequestEncoder());
				ch.pipeline().addLast(new AsyncHttpCallbackHandler());
			}
		});
	}
	/**
	 * 使用netty进行http连接<br/>
	 * 异步连接，不会阻塞
	 * 方法里面会封装公共参数 zoneid，openid，openkey，pf，pfkey，key，randnum
	 * @param host ip
	 * @param port 端口
	 * @param content 内容
	 */
	public static boolean connectTxApi(final Hero hero,final String content,final int cmd,final Object ext){
		try {
			if(b==null){
				initClient();
			}
			// Start the client.
			final String host = GameProperties.apihost;
			b.connect(host,GameProperties.apiPort).addListener(new GenericFutureListener<ChannelFuture>() {
				@Override
				public void operationComplete(ChannelFuture future) throws Exception {
					logger.info("connect operationComplete,"+future.isSuccess()+",content:"+content+",cmd:"+cmd);
					if(!future.isSuccess()){
						AbsAsyncHttpCallback callback = AsyncHttpCache.getCallback(cmd);
						if(callback!=null){
							callback.timeout(hero,ext);
						}
						return;
					}
//					future.channel().attr(ATTR_KEY).set(new DiamondNettyAttr(hero, cmd,ext));
					
					String key = PropertiesTools.getProperties(AnalyzeUtils.bkkey);
					Integer randnum = TimeDateUtil.getCurrentTime();		
					StringBuilder  codeStr = new StringBuilder(cmd+key+(randnum==null?"":randnum));
					String decode = MD5Function.getIns().toDigest(codeStr.toString());//加密串
					
					URI uri = new URI(new StringBuilder().append(GameProperties.apiIndex).append(content)
							.append("&openid=").append(hero.getOpenid()).append("&openkey=")
							.append(hero.getLoginPlatform().getOpenkey()).append("&pf=").append(hero.getLoginPlatform().getRepf())
							.append("&zoneid=").append(hero.getZoneid()).append("&cmd=")
							.append(cmd).append("&randnum=").append(randnum).append("&key=").append(decode).toString());
					String msg = "";
					logger.info(uri.toString());
					DefaultFullHttpRequest request = new DefaultFullHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.GET, uri.toASCIIString(), Unpooled.wrappedBuffer(msg.getBytes("UTF-8")));
					// 构建http请求
					request.headers().set(HttpHeaders.Names.HOST, host);
					request.headers().set(HttpHeaders.Names.CONNECTION, HttpHeaders.Values.KEEP_ALIVE);
					request.headers().set(HttpHeaders.Names.CONTENT_LENGTH, request.content().readableBytes());
					// 发送http请求
					future.channel().write(request);
					future.channel().flush();
				}
			});
			return true;
		} catch (Exception e) {
			logger.error(LogTool.exception(e,hero.getId(),"cmd="+cmd));
			return false;
		}
	}
	/**
	 * 上传战报
	 * 异步连接，不会阻塞
	 * @param host ip
	 * @param port 端口
	 * @param content 内容
	 */
	public static void writeVideo(final byte[] data,final int zoneid,final int battleType,final int bid,final int rectime){
		try {
			if(b==null){
				initClient();
			}
			// Start the client.
			b.connect(GameProperties.battlevideo_upload_ip, GameProperties.battlevideo_upload_port).addListener(new GenericFutureListener<ChannelFuture>() {
				@Override
				public void operationComplete(ChannelFuture future) throws Exception {
//					System.err.println("callback,"+future.isSuccess());
					if(!future.isSuccess()) return;
					URI uri = new URI("/");
					DefaultFullHttpRequest request = new DefaultFullHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.GET, uri.toASCIIString(), Unpooled.wrappedBuffer(data));
					// 构建http请求
					HttpHeaders headers = request.headers();
					headers.set(HttpHeaders.Names.CONNECTION, HttpHeaders.Values.KEEP_ALIVE);
					headers.set(HttpHeaders.Names.CONTENT_LENGTH, request.content().readableBytes());
					headers.set(HttpUploadConst.uploadType, HttpUploadConst.TYPE_BATTLE_VIDEO);
					headers.set("zoneid", zoneid);
					headers.set("battleType", battleType);
					headers.set("bid", bid);
					headers.set("rectime", rectime);
					
					// 发送http请求
					future.channel().writeAndFlush(request).addListener(ChannelFutureListener.CLOSE);
				}
				
			});
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}

}
