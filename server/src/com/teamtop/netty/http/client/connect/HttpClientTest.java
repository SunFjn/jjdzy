package com.teamtop.netty.http.client.connect;

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

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URI;

import com.teamtop.cross.battleVideo.upload.event.HttpUploadConst;

/**
 * http请求，使用netty
 * 
 * @author Administrator
 * 
 */
public class HttpClientTest {
	public static AttributeKey<Integer> ATTR_KEY = new AttributeKey<Integer>("httpIDKey");
	private static Bootstrap b = null;
	private static void initClient() throws Exception {
		EventLoopGroup workerGroup = new NioEventLoopGroup();
		b = new Bootstrap();
		b.group(workerGroup);
		b.channel(NioSocketChannel.class);
		b.option(ChannelOption.SO_KEEPALIVE, true);
		b.handler(new ChannelInitializer<SocketChannel>() {
			@Override
			public void initChannel(SocketChannel ch) throws Exception {
				// 客户端接收到的是httpResponse响应，所以要使用HttpResponseDecoder进行解码
				ch.pipeline().addLast(new HttpResponseDecoder());
				// 客户端发送的是httprequest，所以要使用HttpRequestEncoder进行编码
				ch.pipeline().addLast(new HttpRequestEncoder());
				ch.pipeline().addLast(new HttpClientCallbackHandler());
			}
		});
	}
	/**
	 * 使用netty进行http连接<br/>
	 * 异步连接，不会阻塞
	 * @param host ip
	 * @param port 端口
	 * @param content 内容
	 */
	public static void connect(final int type,final String host, int port,final String content){
		try {
			if(b==null){
				initClient();
			}
			// Start the client.
			b.connect(host, port).addListener(new GenericFutureListener<ChannelFuture>() {
				@Override
				public void operationComplete(ChannelFuture future) throws Exception {
//					System.err.println("callback,"+future.isSuccess());
					if(!future.isSuccess()) return;
					future.channel().attr(ATTR_KEY).set(type);
					URI uri = new URI("/?"+content);
//					String msg = "";
					byte[] data = getFile();
					DefaultFullHttpRequest request = new DefaultFullHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.GET, uri.toASCIIString(), Unpooled.wrappedBuffer(data));
					// 构建http请求
					request.headers().set(HttpHeaders.Names.HOST, host);
					request.headers().set(HttpHeaders.Names.CONNECTION, HttpHeaders.Values.KEEP_ALIVE);
					request.headers().set(HttpHeaders.Names.CONTENT_LENGTH, request.content().readableBytes());
					request.headers().set(HttpUploadConst.uploadType, HttpUploadConst.TYPE_HOTSWAP);
					// 发送http请求
					future.channel().writeAndFlush(request).addListener(ChannelFutureListener.CLOSE);
				}
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args) throws Exception {
		connect(2,"127.0.0.1", 9800,"a=b&c=d");
//		connect(2,"192.168.7.100", 9801,"zoneid=1&battleType=20003&bid=1&rectime=1435648930");
		/*for(int i=1;i<10;i++){
			System.err.println("connect ok,wait callback");
			System.err.println("do next");
		}*/
	}
	
	private static byte[] getFile(){
		byte[] sendData = null;
		try {
			File file = new File("F:\\newfile.zip");
			FileInputStream fis = new FileInputStream(file.getPath());
			int binLen = fis.available();
			byte[] data = new byte[binLen];
			fis.read(data);
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			DataOutputStream output = new DataOutputStream(bos);
			output.write(data);
			sendData = bos.toByteArray();
			fis.close();
			bos.close();
			output.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sendData;
	}
}
