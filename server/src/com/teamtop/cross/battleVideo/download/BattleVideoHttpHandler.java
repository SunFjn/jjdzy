package com.teamtop.cross.battleVideo.download;

import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.HttpRequest;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.trans.LMessageFormat;
import com.teamtop.util.log.LogTool;
@Sharable
public class BattleVideoHttpHandler extends ChannelInboundHandlerAdapter {
	private static final Logger logger = LoggerFactory.getLogger(BattleVideoHttpHandler.class);
	public static String xml="<?xml version=\"1.0\"? encoding=\"UTF-8\"?>"
			+"<cross-domain-policy>"
			+"<allow-access-from domain=\"*\" />"
			+"<allow-access-from domain=\"*\" to-ports=\"*\" />"
			+"</cross-domain-policy>";
	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg)
			throws Exception {
		if(msg instanceof HttpRequest){
			HttpRequest req = (HttpRequest) msg;
			String uri = req.getUri();
			if(uri.indexOf("favicon.ico")>=0){
				return;
			}else if(uri.equals("/crossdomain.xml")){
				HttpUtil.response(xml, ctx);
				return;
			}else if(uri.indexOf("primaryVideo")>=0) {
				System.err.println(uri);
				HashMap<String, String> param = HttpUtil.getParamters(uri);
				sendPrimaryVideoFile(param, ctx);
				return;
			}
//			System.err.println(uri);
			HashMap<String, String> param = HttpUtil.getParamters(uri);
			sendVideoFile(param,ctx);
		}
	}
	/**
	 * 发送战斗录像
	 * @param param
	 * @param ctx
	 */
	private void sendVideoFile(HashMap<String, String> param,ChannelHandlerContext ctx){
		int zoneid = CommonUtil.transforObjtoInt(param.get("zoneid"));
		int battleType = CommonUtil.transforObjtoInt(param.get("battleType"));
		int bid = CommonUtil.transforObjtoInt(param.get("bid"));
		int rectime = CommonUtil.transforObjtoInt(param.get("rectime"));
		
		String sep = GamePath.SEP;
		String path = GamePath.USER_DIR + sep + "battleVideo" + sep + "zoneid" +sep+ zoneid + sep + "battleType" + sep + battleType
				+ sep + bid+ "_" + rectime;
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(path);
			byte[] b = new byte[fis.available()];
			fis.read(b);
//			Object read = LMessageFormat.read(b);
//			System.err.println(read);
			HttpUtil.response(b,ctx);
			
		} catch (Exception e) {
			LogTool.error(e,this);
		} finally {
			 if(fis!=null){
				 try {
					fis.close();
				} catch (IOException e) {
					LogTool.error(e,this);
				}
			 }
		}
	}
	/**
	 * 发送天下第一战斗录像
	 * @author lobbyer
	 * @param param
	 * @param ctx
	 * @date 2016年7月19日
	 */
	private void sendPrimaryVideoFile(HashMap<String, String> param,ChannelHandlerContext ctx){
		int term = CommonUtil.transforObjtoInt(param.get("term"));
		int bang = CommonUtil.transforObjtoInt(param.get("bang"));
		int round = CommonUtil.transforObjtoInt(param.get("round"));
		int ju = CommonUtil.transforObjtoInt(param.get("ju"));
		long attId = CommonUtil.transforObjtoLong(param.get("attId"));
		
		String sep = GamePath.SEP;
		String path = GamePath.USER_DIR + sep + "primaryVideo" + sep + term +sep+ bang + sep + round + sep + ju
				+ sep + attId;
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(path);
			byte[] b = new byte[fis.available()];
			fis.read(b);
			Object read = LMessageFormat.read(b);
			System.err.println(read);
			HttpUtil.response(b,ctx);
			
		} catch (Exception e) {
			LogTool.error(e,this);
		} finally {
			 if(fis!=null){
				 try {
					fis.close();
				} catch (IOException e) {
					LogTool.error(e,this);
				}
			 }
		}
	}
	
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
	}
	
}
