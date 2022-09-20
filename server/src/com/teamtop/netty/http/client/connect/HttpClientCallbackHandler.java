package com.teamtop.netty.http.client.connect;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.HttpContent;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpResponse;
/**
 * HTTP客户端IO处理
 */
public class HttpClientCallbackHandler extends ChannelInboundHandlerAdapter {
	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
		if (msg instanceof HttpResponse) {
			HttpResponse response = (HttpResponse) msg;
			System.out.println("CONTENT_TYPE:" + response.headers().get(HttpHeaders.Names.CONTENT_TYPE));
		}else if (msg instanceof HttpContent) {
			/*if(msg instanceof LastHttpContent){
				return;
			}*/
			HttpContent content = (HttpContent) msg;
			ByteBuf buf = content.content();
			String callback = buf.toString(io.netty.util.CharsetUtil.UTF_8);
			buf.release();
			Integer type = ctx.channel().attr(HttpClientTest.ATTR_KEY).get();
			System.err.println("type:"+type+",callback:"+callback);
			
			//分发不同type
		}
	}
}
