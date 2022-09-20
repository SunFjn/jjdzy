package com.teamtop.util.asyncHttp;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.HttpContent;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpResponse;

import java.net.URLDecoder;

public class AsyncHttpCallbackHandler extends ChannelInboundHandlerAdapter {
	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
		if (msg instanceof HttpResponse) {
			HttpResponse response = (HttpResponse) msg;
			System.out.println("CONTENT_TYPE:" + response.headers().get(HttpHeaders.Names.CONTENT_TYPE));
		}
		if (msg instanceof HttpContent) {
			HttpContent content = (HttpContent) msg;
			ByteBuf buf = content.content();
			byte[] data = buf.array();
			String rtnData = new String(data,"utf-8");
			rtnData = URLDecoder.decode(rtnData,"utf-8");
			Object obj = ctx.channel().attr(AsyncHttpUtil.ATTR_KEY).get();
			/*if(obj instanceof DiamondNettyAttr){
				DiamondNettyAttr diamond = (DiamondNettyAttr) obj;
				Hero hero = diamond.getHero();
				int cmd = diamond.getCmd();
				AbsAsyncHttpCallback callback = AsyncHttpCache.getCallback(cmd);
				if(callback!=null){
					callback.handleData(hero, rtnData,diamond.getExt());
				}
				ctx.channel().attr(AsyncHttpUtil.ATTR_KEY).remove();
			}*/
			ctx.close();
		}
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
		// TODO Auto-generated method stub
		super.exceptionCaught(ctx, cause);
	}
	
	
}
