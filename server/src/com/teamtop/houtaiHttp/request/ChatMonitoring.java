package com.teamtop.houtaiHttp.request;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.md5.MD5Function;
import com.teamtop.util.time.TimeDateUtil;

public class ChatMonitoring {
	
	/**
	 * 聊天监控
	 * 触发条件：当一个角色的发言，触发关键字，积分达到100分的情况下，这个角色的玩家被标记为广告嫌疑人，之后这个玩家的所有发言都要发到后台
	 * @param hero
	 * @param chatType 监控类型：'1'=>'广告关键字可疑人', '2'=>'私聊多可疑人', '3'=>'连续相似发言'
	 * @param chatState '0'=>'不是广告号', '1'=>'广告关键字可疑人', '2'=>'私聊多可疑人', '3'=>'连续相似发言' , '4'=>'是广告号'
	 * @param channel '1'=>'子服世界', '2'=>'帮会', '4'=>'私聊', '5'=>'跨服世界'
	 * @param message
	 */
	public static void monitoring(Hero hero, int chatType, int chatState, int channel, String message) {
		/*
			platform_code		子平台	是
			server_id		区服	是
			role_id		角色id	是
			chat_type		监控类型	是
			chat_status		监控状态	是
			channel		聊天频道	是
			role_name		角色名	是
			amount		金额	是
			chat_info		聊天记录	是
			time		当前时间	是
			level		角色等级	是
			uid		账号	是
		*/
		try {
			JSONObject chatInfo = new JSONObject();
			List<JSONObject> chatInfos = new ArrayList<>();
			chatInfo.put("platform_code", hero.getPf());
			chatInfo.put("server_id", hero.getZoneid());
			chatInfo.put("role_id", hero.getId());
			chatInfo.put("chat_type", chatType);
			chatInfo.put("chat_status", chatState);
			chatInfo.put("channel", channel);
			chatInfo.put("role_name", hero.getName());
			chatInfo.put("amount", hero.getChongZhiYuan());
			chatInfo.put("chat_info", message);
			chatInfo.put("time", TimeDateUtil.getCurrentTime());
			chatInfo.put("level", hero.getLevel());
			chatInfo.put("uid", hero.getOpenid());
			// chatInfo.put("platform_code", "89945");
			// chatInfo.put("server_id", 1);
			// chatInfo.put("role_id", "1999600000000009");
			// chatInfo.put("chat_type", 1);
			// chatInfo.put("chat_status", 1);
			// chatInfo.put("channel", 1);
			// chatInfo.put("role_name", "测试数据");
			// chatInfo.put("amount", 1000);
			// chatInfo.put("chat_info", "来玩一个好玩的游戏");
			// chatInfo.put("time", TimeDateUtil.getCurrentTime());
			// chatInfo.put("level", 56);
			// chatInfo.put("uid", 1);
			chatInfos.add(chatInfo);
			String chatInfoStr = JSON.toJSONString(chatInfos);
			monitoringSend(chatInfoStr);
		} catch (Exception e) {
			LogTool.error(e, ChatMonitoring.class, hero.getId(), hero.getName(), "ChatMonitoring monitoring");
		}
	}

	public static void monitoringSend(String chatInfoStr) {
		/*	time	1532425736	时间戳	是
			sign	md5(time+token+key)	签名	是
			token	md5 (chat_infos)		是
			chat_infos		聊天记录json数组字符串	是
		*/
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			String time = currentTime + "";
			String token = MD5Function.getIns().toDigest(chatInfoStr);
			String sign = MD5Function.getIns().toDigest(time + token + HoutaiRequestCache.ChatMonitoring_Key);
			List<NameValuePair> params = new ArrayList<NameValuePair>();
			params.add(new BasicNameValuePair("time", time));
			params.add(new BasicNameValuePair("sign", sign));
			params.add(new BasicNameValuePair("token", token));
			params.add(new BasicNameValuePair("chat_infos", chatInfoStr));
			String url = HoutaiRequestCache.ChatMonitoring_Url;
			boolean isTest = false;
/*			if ("192.169.999.999".equals(GameProperties.serverAddress)) {
				// 内测用
				url = "http://192.169.999.999/api/chat_new/index";
				isTest = true;
			}*/
			String result = HttpGetOrPostHandle.postInfo(params, url);
			if (!isTest && !CommonUtil.isNull(result) && result.indexOf("success") == -1) {
				AlarmSystemFunction.getIns().alarmSend(AlarmType.HOUTAI_SYN, 0, new Object[] { "chat:: " + result
						+ ", chatInfoStr::" + chatInfoStr + ", schat::" + sign + ", token::" + token });
				LogTool.info("ChatMonitoring monitoringSend chat_infos=" + chatInfoStr, ChatMonitoring.class);
			}
		} catch (Exception e) {
			AlarmSystemFunction.getIns().alarmSend(AlarmType.HOUTAI_SYN, 0, new Object[] { "后端逻辑处理报错" });
			LogTool.error(e, ChatMonitoring.class, "ChatMonitoring monitoringSend");
		}
	}

	public static void main(String[] args) {
//		ChatMonitoring.monitoring(null, 1, 1, 1, "");
		String chatInfoStr = "[{\"chat_type\":1,\"role_name\":\"猪哥漂亮\",\"uid\":\"21990214-ios\",\"chat_status\":1,\"amount\":39828,\"platform_code\":\"jysgzj02-ios3\",\"role_id\":1029300000001507,\"level\":281,\"channel\":5,\"time\":1575617719,\"server_id\":293,\"chat_info\":\"什么时候都在\"}]";
		System.err.println(chatInfoStr);
		String token = MD5Function.getIns().toDigest(chatInfoStr);
		String sign = MD5Function.getIns().toDigest("1575617719" + token + HoutaiRequestCache.ChatMonitoring_Key);
		System.err.println(token);
		System.err.println(sign);
	}

}
