package com.teamtop.netty.handlers;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelOutboundHandlerAdapter;
import io.netty.channel.ChannelPromise;
@Sharable
/**
 * 子服中央服通讯的encoder
 * @author Administrator
 *
 */
public class CrossIOEncoder extends ChannelOutboundHandlerAdapter {

	@Override
	public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise){
		final byte[] data = (byte[]) msg;
		final ByteBuf encoded = ctx.alloc().buffer(data.length+4);
		encoded.writeInt(data.length+4);
		encoded.writeBytes(data);
		ctx.writeAndFlush(encoded);
	}
	
}
