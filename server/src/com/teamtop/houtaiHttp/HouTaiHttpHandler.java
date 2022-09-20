package com.teamtop.houtaiHttp;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.netty.http.HttpUtil;
import com.teamtop.netty.http.RequestParser;
import com.teamtop.netty.util.ByteBufToBytes;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpHeaders;

public class HouTaiHttpHandler extends SimpleChannelInboundHandler<FullHttpRequest> {
	//http://127.0.0.1:8802/?sign=466cafcc6336d466635b12eee5039a23&cmd=1&randnum=1542682236455l&pf=ncsgzj01&zoneid=3&player=1&cond=小白龙
	private static final Logger logger = LoggerFactory.getLogger(HouTaiHttpHandler.class);
	private ByteBufToBytes reader;

	@Override
	protected void channelRead0(ChannelHandlerContext ctx, FullHttpRequest msg) throws Exception {
		String uri = msg.getUri();
		String hostStr = msg.headers().get("host");
		logger.info("接收到请求：uri="+uri+", host="+hostStr);
		if (uri.indexOf("favicon.ico") >= 0) {
			logger.warn("this host request has error! favicon.ico error!");
			// HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5000, ctx);
			return;
		}
		if (HttpHeaders.isContentLengthSet(msg)) {
			reader = new ByteBufToBytes((int) HttpHeaders.getContentLength(msg));
		}
		boolean isLawful = false;
		Map<String, Object> tempParam = RequestParser.parse(msg);
		Map<String, String> param = new HashMap<>();
		String cmdStr = (String) tempParam.get("cmd");
		if(cmdStr == null) {
			LogTool.warn("HouTaiHttpHandler.cmd is null.msg:"+msg, this);
			return;
		}
		int cmd = Integer.parseInt(cmdStr);
		if (!tempParam.containsKey("file")) {
			for (String key : tempParam.keySet()) {
				param.put(key, (String) tempParam.get(key));
			}
			// 检验请求的合法性
			isLawful = AnalyzeUtils.checkRequest(param);
		} else {
			isLawful = true;
		}
		if (cmd == 1001 || cmd == 1007 || cmd==1008) {
			if (hostStr == null) {
				HttpUtil.response(-5, ctx);
				return;
			}
			if (hostStr.indexOf("127.0.0.1") == -1) {
				HttpUtil.response(-6, ctx);
				return;
			}
			isLawful = true;
		}
		// HashMap<String, String> param = HttpUtil.getParamters(uri);
		if (!isLawful) {
			logger.warn("this host request is nulawful host=" + ctx.channel().remoteAddress());
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5000, ctx);
			return;
		}
		// 处理请求
//		int cmd = Integer.parseInt(param.get("cmd"));
		// TempData tempData = new TempData();
		// ctx.attr(HouTaiHttpCache.ATTR_KEY).set(tempData);
		// tempData.addAttribute("param", param);
		// tempData.addAttribute("cmd", cmd);
		AbsHouTaiHttpEvent event = HouTaiHttpCache.getHoutaiMap().get(cmd);
		if (event != null) {
			event.handleGet(param, ctx);
		}
	}
	
}
