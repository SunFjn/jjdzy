package com.teamtop.util.weixinAPI;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.request.HttpGetOrPostHandle;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class WeixinApiUtils {

	private static WeixinApiUtils ins;

	public WeixinApiUtils() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WeixinApiUtils getIns() {
		if (ins == null) {
			ins = new WeixinApiUtils();
		}
		return ins;
	}

	public synchronized String getAccessToken() {
		if (WeixinApiConst.LAST_UPDATE_TIME != 0) {
			int passTime = TimeDateUtil.getCurrentTime() - WeixinApiConst.LAST_UPDATE_TIME;
			if (passTime >= WeixinApiConst.UPDATE_TIME_INTERVAL) {
				WeixinApiConst.ACCESS_TOKEN = "";
			}
		}
		if (WeixinApiConst.ACCESS_TOKEN != "") {
			return WeixinApiConst.ACCESS_TOKEN;
		}
		StringBuilder parmsStr = new StringBuilder();
		parmsStr.append("grant_type=").append(WeixinApiConst.grant_type)
				.append("&appid=").append(WeixinApiConst.APPID)
				.append("&secret=").append(WeixinApiConst.APPSECRET);
		String result = HttpGetOrPostHandle.doGetInfo(WeixinApiConst.tokenUrl, parmsStr.toString());
		JSONObject jsonObject = JSONObject.parseObject(result);
		String access_token = (String) jsonObject.get("access_token");
		WeixinApiConst.ACCESS_TOKEN = access_token;
		WeixinApiConst.LAST_UPDATE_TIME = TimeDateUtil.getCurrentTime();// 刷新
		return WeixinApiConst.ACCESS_TOKEN;
	}

	/**
	 * 微信检查一段文本是否含有违法违规内容
	 * 
	 * @param msg
	 * @return
	 */
	public boolean msgChesk(String msg) {
		try {
			// access_token string 是 接口调用凭证
			// content string 是 要检测的文本内容，长度不超过 500KB
			int i = 0;
			while (i < 5) {
				JSONObject params = new JSONObject();
				String accessToken = getAccessToken();
				params.put("content", msg);
				String result = HttpGetOrPostHandle.postJsonInfo(params, WeixinApiConst.msgUrl + accessToken);
				if ("".equals(result)) {
					Thread.sleep(300);
					// 请求失败重试
					i++;
					continue;
				}
				JSONObject jsonObject = JSONObject.parseObject(result);
				int errcode = (Integer) jsonObject.get("errcode");
				String errmsg = (String) jsonObject.get("errmsg");
				// 返回 errcode number 错误码0 内容正常,87014 内容含有违法违规内容; errMsg string 错误信息
				if (errcode == 0) {
					return true;
				} else if (errmsg.indexOf("access_token") != -1) {
					// token过期重新获取
					WeixinApiConst.ACCESS_TOKEN = "";
					Thread.sleep(300);
					i++;
					continue;
				}
				return false;
			}
		} catch (Exception e) {
			LogTool.error(e, WeixinApiUtils.class, "WeixinApiUtils msgChesk, msg=" + msg);
		}
		return false;
	}

	/**
	 * 微信校验一张图片是否含有违法违规内容
	 * 
	 * @param filePath
	 * @return
	 */
	public boolean imageCheck(String filePath) {
		try {
			String accessToken = getAccessToken();
			String result = HttpGetOrPostHandle.postImage(WeixinApiConst.imageUrl + accessToken, filePath);
			JSONObject jsonObject = JSONObject.parseObject(result);
			int errcode = (Integer) jsonObject.get("errcode");
			String errmsg = (String) jsonObject.get("errmsg");
			// 返回 errcode number 错误码0 内容正常,87014 内容含有违法违规内容; errMsg string 错误信息
			if (errcode == 0) {
				return true;
			} else if (errmsg.indexOf("access_token") != -1) {
				WeixinApiConst.ACCESS_TOKEN = "";
			}
		} catch (Exception e) {
			LogTool.error(e, WeixinApiUtils.class, "WeixinApiUtils imageCheck, data=");
		}
		return false;
	}

	public static void main(String[] args) {
		// WeixinApiUtils.msgChesk("特3456书yuuo莞6543李zxcz蒜7782法fgnv级");
		// WeixinApiUtils.msgChesk("完2347全dfji试3726测asad感3847知qwez到");
		WeixinApiUtils.getIns().msgChesk("水电费");
		// WeixinApiUtils.imageCheck("F:\\dde.jpg");
	}

}
