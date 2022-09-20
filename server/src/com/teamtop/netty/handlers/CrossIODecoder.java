package com.teamtop.netty.handlers;

import java.util.List;

import com.teamtop.cross.CrossCache;
import com.teamtop.util.log.LogTool;

import io.netty.buffer.ByteBuf;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
/**
 * 子服中央服通讯的decoder
 * @author Administrator
 *
 */
public class CrossIODecoder extends ByteToMessageDecoder {

	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
//		if (TecentUtil.handleTencentFirstPackage(ctx.channel(), in)) {
//			return;
//		}
		int readableBytes = in.readableBytes();
		if(readableBytes<4) return;
		int dataLength = in.readInt();
		if (readableBytes < dataLength) {
			// 原长度为14640，但此次收到的包只有1044长度
			// 需要等待更多的包，所以reset reader index
			in.resetReaderIndex();
//			logger.info("need more data，readableBytes:" + readableBytes + ",dataLength:" + dataLength + ":" + ctx.channel().remoteAddress());
			return;
		} else {
			// 此次收到的包已经满足或多于一个完整的包
			// 把这个包读出来
			final ByteBuf data = in.readBytes(dataLength - 4);
			// 读完后mark 至此包decode已经完成 下面是解析协议
			in.markReaderIndex();
			try {
				int cmd = data.readShort();
				//final Object[] readData = NettyRead.readData(data.readBytes(dataLength - 4), cmd);
				byte[] readDatas = data.readBytes(dataLength - 6).array();
				if (readDatas != null) {
					CrossDispatch.dispatcherMethod(cmd, readDatas, ctx.channel());
				} else {
					LogTool.warn("iodecoder dispatch fail,cmd:" + cmd + ",dataLen:" + (dataLength - 6),this);
				}
			} catch (Exception e) {
				// 保证不影响读取包
				LogTool.error(e,this);
			}
		}
	}
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		Channel channel = ctx.channel();
		LogTool.info("channel active,remote address:"+channel.remoteAddress()+",local address:"+channel.localAddress(),this);
	}
	
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		//360浏览器刷新不会断开连接，而关掉后又会触发：远程主机强迫关闭了一个现有的连接。
		//SB 360
	}
	
	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		Channel channel = ctx.channel();
		LogTool.info("channel inactive,remote address:"+channel.remoteAddress()+",local address:"+channel.localAddress(),this);
		int partId = CrossCache.getPartId(channel);
		CrossCache.getChannelToZoneidByPartId(partId).remove(channel);
		List<Integer> remove = CrossCache.getChannelToZoneid().remove(channel);
		if(remove!=null){
			for(Integer zoneid:remove){
				Channel nowChannel = CrossCache.getZoneidToChannel().get(zoneid);
				if (nowChannel != channel) {
					LogTool.info("channel inactive channel 不一致, zoneid=" + zoneid, this);
					continue;
				}
				CrossCache.getZoneidToChannel().remove(zoneid);
				CrossCache.getZoneidToChannelByPartId(partId).remove(zoneid);
				LogTool.info("channel inactive, zoneid="+zoneid+", remote address:"+channel.remoteAddress(), this);
			}
		}
	}
	
}
