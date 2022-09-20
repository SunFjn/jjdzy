package com.teamtop.netty.ssl.test;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.HttpContent;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.netty.http.HttpUtil;
import com.teamtop.netty.util.ByteBufToBytes;
public class SSLServerHandler extends ChannelInboundHandlerAdapter {
	//http://192.168.7.100:9802/?key=0d04765827325ec7c46080fbd2d7bb57&cmd=20&randnum=1463542867&zoneid=1&operType=1&uiid=0
	private static final Logger logger = LoggerFactory.getLogger(SSLServerHandler.class);
	private ByteBufToBytes reader;
	
	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg)
			throws Exception {
		if(msg instanceof HttpRequest){
			HttpRequest req = (HttpRequest) msg;
			String uri = req.getUri();
			logger.info("msg:"+msg);
			if(uri.indexOf("favicon.ico")>=0){
				logger.warn("this host request has error! favicon.ico error!");
				HttpUtil.responseFail(ctx);
				return;
			}
			if (HttpHeaders.isContentLengthSet(req)) {
                reader = new ByteBufToBytes((int) HttpHeaders.getContentLength(req));
            } 
			HttpUtil.responseSucc(ctx);
		}else if(msg instanceof HttpContent){
			HttpContent chunk = (HttpContent) msg;
			ByteBuf content = chunk.content();
			if(reader != null){
				reader.reading(content);
				if (reader.isEnd()) {
					logger.info("HttpContent!!"+chunk);
				}
			}else {
				//暂不处理
			}
		}
	}
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
		cause.printStackTrace();
	}
	
}
