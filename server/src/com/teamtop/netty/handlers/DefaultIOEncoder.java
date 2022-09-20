package com.teamtop.netty.handlers;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelOutboundHandlerAdapter;
import io.netty.channel.ChannelPromise;
import io.netty.handler.codec.http.websocketx.BinaryWebSocketFrame;
@Sharable
public class DefaultIOEncoder extends ChannelOutboundHandlerAdapter {

	@Override
	public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise){
//		System.err.println("send "+ctx.channel());
		if(msg instanceof byte[]){
			final byte[] data = (byte[]) msg ;
			final ByteBuf encoded = ctx.alloc().buffer(data.length+2);
			encoded.writeShort(data.length+2);
			encoded.writeBytes(data);
			ctx.writeAndFlush(new BinaryWebSocketFrame(encoded));
//			System.err.println(writeAndFlush.isSuccess()+","+ctx.channel());
		}else{
			try {
				super.write(ctx, msg, promise);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
}
