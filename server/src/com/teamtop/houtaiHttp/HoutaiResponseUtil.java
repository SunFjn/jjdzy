package com.teamtop.houtaiHttp;

import com.alibaba.fastjson.JSONObject;

import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.util.CharsetUtil;

public class HoutaiResponseUtil {

	public static void responseFail(int code, ChannelHandlerContext ctx) {
		JSONObject json = new JSONObject();
		json.put("status", false);
		json.put("code", code);
		response(json.toJSONString(), ctx);
	}

	public static void responseFail(boolean states, int code, String message, JSONObject data, ChannelHandlerContext ctx) {
		JSONObject json = new JSONObject();
		json.put("status", states);
		json.put("code", code);
		json.put("message", message);
		json.put("data", data);
		response(json.toJSONString(), ctx);
	}

	public static void responseSucc(ChannelHandlerContext ctx) {
		JSONObject json = new JSONObject();
		json.put("status", true);
		json.put("code", HoutaiConst.SendBack_Code_200);
		json.put("message", "");
		json.put("data", "");
		response(json.toJSONString(), ctx);
	}

	public static void responseSucc(ChannelHandlerContext ctx, String message, JSONObject data) {
		JSONObject json = new JSONObject();
		json.put("status", true);
		json.put("code", HoutaiConst.SendBack_Code_200);
		json.put("message", message);
		json.put("data", data);
		response(json.toJSONString(), ctx);
	}

	public static void responseSucc(ChannelHandlerContext ctx, String message, String data) {
		JSONObject json = new JSONObject();
		json.put("status", true);
		json.put("code", HoutaiConst.SendBack_Code_200);
		json.put("message", message);
		json.put("data", data);
		response(json.toJSONString(), ctx);
	}

	/**
	 * 返回结果给请求方
	 * 
	 * @param rtn
	 *            返回值
	 * @param ctx
	 */
	public static void response(String jsonStr, ChannelHandlerContext ctx) {
		byte[] body = jsonStr.getBytes(CharsetUtil.UTF_8);
		FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK,
				Unpooled.buffer(body.length));
		response.headers().set(HttpHeaders.Names.CONTENT_TYPE, "text/plain; charset=UTF-8");
		response.headers().set(HttpHeaders.Names.CONTENT_LENGTH, response.content().capacity());// 这个长度一定不能搞错,否则客户端会收包失败
		response.content().writeBytes(body);
		ctx.writeAndFlush(response).addListener(ChannelFutureListener.CLOSE);
	}

}
