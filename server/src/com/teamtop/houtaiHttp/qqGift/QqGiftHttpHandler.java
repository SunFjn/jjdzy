package com.teamtop.houtaiHttp.qqGift;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;

import com.teamtop.netty.http.HttpUtil;
import com.teamtop.netty.util.ByteBufToBytes;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpHeaders;

/**
 * http://xxxxx.xxx.xxx:8005/sgzj?openid=xxxx&taskid=xxxx&awardid=xxx&billno=xxx&timestamp=xxx&appid=xxx&action=xxx&area=xxx&pkey=xxx&sig=xxx&partition=xxx&roleid=xxx
 * http://192.168.22.20/sgzj?openid=1111&taskid=1111&awardid=111&billno=111&timestamp=111&appid=111&action=111&area=11&pkey=111&partition=1&roleid=111111&sig=VFx%2BoM2h01%2FRCxoY9UOZ1KSMRXI%3D
 * get请求  URI路径 /sgzj
 * 应用宝 礼包接入 
 * */
public class QqGiftHttpHandler extends SimpleChannelInboundHandler<FullHttpRequest>{

	
	private ByteBufToBytes reader;
	

	@Override
	protected void channelRead0(ChannelHandlerContext ctx, FullHttpRequest msg) throws Exception {
		try {
			if (HttpHeaders.isContentLengthSet(msg)) {
				reader = new ByteBufToBytes((int) HttpHeaders.getContentLength(msg));
			}
			String uri = msg.getUri();
			String[] strArray = uri.split("\\?");
			String url0 = strArray[0];
			//拉取取服务器列表
			if (url0.equals(QqGiftHttpFunction.url1)) {
				QqGiftHttpFunction.getIns().getZoneList(ctx, msg);
			}else if(url0.equals(QqGiftHttpFunction.url2)) {
				//拉取用户角色信息
				QqGiftHttpFunction.getIns().getRoleinfo(ctx, msg);
			}else if(url0.equals(QqGiftHttpFunction.url3)) {
				//发货
				QqGiftHttpFunction.getIns().fahuo(ctx, msg);
			}
			
			

		} catch (Exception e) {
			HttpUtil.responseFail(ctx);
			LogTool.error(e, QqGiftHttpHandler.class, "QqGiftHttpHandler has wrong");
		}
	}
	
	
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
		super.exceptionCaught(ctx, cause);
	}
	

	
	public static void main(String[] args) {
		HashMap<String, String> params=new HashMap<>();
		/*params.put("openid", "12345");
		params.put("taskid", "1");
		params.put("awardid", "2");
		params.put("billno", "345");
		params.put("timestamp", "8888888");
		params.put("appid", "44111");
		params.put("action", "452111");
		params.put("area", "221122");
		params.put("pkey", "22141");		
		params.put("partition", "1");*/
		params.put("openid","11111111111111111");
		params.put("openkey","2222222222222222");
		params.put("appid","123456");
		params.put("pf","qzone");
		params.put("format","json");
		params.put("userip","112.90.139.30");
		try {
			//String str=SnsSigCheck.makeSig("get", url, params, APPKEY);
			System.err.println();
			
			try {
				String val=URLDecoder.decode("oTSd6NqprqVAnoJ8sw4c0JpIhd8%3D", "UTF8");
				System.err.println(val);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}

