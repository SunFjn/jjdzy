package com.teamtop.houtaiHttp.recharge;

import java.security.MessageDigest;
import java.util.TreeMap;

import com.teamtop.houtaiHttp.AnalyzeUtils;

import java.util.Map;

public class Sing {
	public static void main(String []args) {
		Map<String,Object> map = new TreeMap<>();
		map.put("pf", "elbt01");
		String randnum = "1";
		map.put("randnum", randnum);
/*		map.put("uid", "1156085");
		map.put("channel", "whale");
		map.put("game_order", "15317208067172");
		map.put("order_no", "JY-20180716140009537399");
		map.put("amount", "0.01");
		map.put("pay_time", "1531720847");
		map.put("status", "1");
		map.put("extras_params", "");*/
/*		//总充值数
		map.put("cmd", "1008");
		map.put("payTime1", "1608466038");
		map.put("payTime2", System.currentTimeMillis()/1000);*/
		
		/* type	1	1.查询状态 2.开启 3.关闭 4.设置数量 5添加IP白名单 6删除IP白名单	是
		num	1	设置注册限制数量	type=4 时传输
		ip	1.1.1.1	ip白名单	type=5和6 时传输*/
/*		map.put("cmd", "45");
		map.put("type", 5);
		map.put("ip", "111.111.111.111");*/
/*		//bsh
		map.put("cmd", "66");
		String code = "com.alibaba.fastjson.JSONObject;com.teamtop.houtaiHttp.events.heroInfo.HeroInfoIO;try {JSONObject heroInfo = HeroInfoIO.getIns().getHeroInfoObject(1, 3, 'a123');heroInfo.toString();} catch (Exception e) {e.printStackTrace();}";
		map.put("code", code);*/
		//定时开服 type	1	是否自动开服 1是 2否	是  cmd	44	接口序号	是  opentime	12:00	自动开服时间	是
		int cmd = 1003;
		map.put("cmd", cmd+"");
		map.put("type", 2);
		map.put("opentime", "12:16");
		
		String sing = "";
		String signKey = AnalyzeUtils.bkkey;//"xiakexing2016";
		
		if( 0<cmd&& cmd <= 200){
			signKey = AnalyzeUtils.bkkey;
		}else if ( 200 < cmd && cmd <=1000) {
			signKey = AnalyzeUtils.clientKey;
		} else if( 1000 < cmd && cmd <= 2000){
			signKey = cmd+AnalyzeUtils.bkkey+(randnum==null?"":randnum);
		}
		
		String parmStr = "";
		// TreeMap输出即升序
		for(Map.Entry<String,Object> en : map.entrySet()){
			if(en.getValue() !=null && !"".equals(en.getValue())){
				if(en.getValue().equals("") ){
					sing += en.getKey()+ "=1";
					parmStr+="&"+en.getKey()+"=1";
				}else{
					sing += en.getKey()+ "=" + en.getValue();
					parmStr+="&"+en.getKey()+"=" + en.getValue();
				}
			}
		}
		sing = MD5(sing+signKey);
		//System.out.println(sing);
		System.out.println("http://106.54.90.227:7011/?sign="+sing+parmStr);
		//System.out.println("http://119.45.44.63:7011/?sign="+sing+parmStr);
		// 输出 
	}
	private static String MD5(String s) {
		try {
			MessageDigest md = MessageDigest.getInstance("md5");
			byte[] bytes = md.digest(s.getBytes("utf-8"));
			return toHex(bytes);
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	private static String toHex(byte[] bytes) {
		final char[] HEX_DIGITS = "0123456789ABCDEF".toCharArray();
		StringBuilder ret = new StringBuilder(bytes.length * 2);
		for (int i=0; i<bytes.length; i++) {
			ret.append(HEX_DIGITS[(bytes[i] >> 4) & 0x0f]);
			ret.append(HEX_DIGITS[bytes[i] & 0x0f]);
		}
		return ret.toString().toLowerCase();
	}
}
