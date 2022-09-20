package com.teamtop.houtaiHttp;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 解析get请求参数类
 * @author Administrator
 * uri=/?key=6636fa178ba7072d82d2c4e60e0364bc&cmd=110&randnum=-810347853
 */
public class AnalyzeUtils {
	private static Logger logger = LoggerFactory.getLogger(AnalyzeUtils.class);
	
	public static String bkkey = "sgzj_key_b391a90cdfebca3c221941892424a200";// "bkHttpKey";

	public static String clientKey = "clientKey";
	/**
	 * 获取参数集合根据传入的uri
	 * @param uri 请求的uri
	 * @return 参数集合<名字,值>
	 * @throws UnsupportedEncodingException 
	 */
	public static HashMap<String,String> getParamters(String uri) throws UnsupportedEncodingException{
		HashMap<String,String> res = new HashMap<String, String>();
		if(StringUtils.isBlank(uri))return null;
		///?key=6636fa178ba7072d82d2c4e60e0364bc&cmd=110&randnum=-810347853 
		//解析字符串
		uri = StringUtils.substring(uri, 2);//去掉/?
		String[] params = StringUtils.split(uri,"&");//拆分成key=6636fa178ba7072d82d2c4e60e0364bc,
		String[] vals = null;
		for(String str:params){
			vals = StringUtils.split(str,"=");//拆分成 key ,value
			if(vals==null||
					ArrayUtils.isEmpty(vals)
					||vals.length!=2)continue;
			//2014.10.11添加字符编码格式转换
			byte[] bytes0 = vals[0].getBytes();
			String valsStr0 = new String(bytes0, "utf-8");
			byte[] bytes1 = vals[1].getBytes();
			String valsStr1 = new String(bytes1, "utf-8");
			res.put(valsStr0,valsStr1);
		}
		return res;
	}
	
	private static String MD5toDigest(String s) {
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
	
	
	/**
	 * 检验请求的合法性
	 * @param map 参数集合
	 * @return true 合法 false 不合法
	 */
	public static boolean checkRequest(Map<String, String> p) {
		String sign = p.get("sign");
		String cmd = p.get("cmd");
		String randnum = p.get("randnum");
		StringBuilder codeStr = new StringBuilder();
		Map<String, Object> map = new TreeMap<>();
		map.putAll(p);
		map.remove("sign");

		// TreeMap输出即升序
		for (Map.Entry<String, Object> en : map.entrySet()) {
			if (en.getValue() != null && !"".equals(en.getValue())) {
				codeStr.append(en.getKey()).append("=").append(en.getValue());
			}
		}

		// 后台请求加密
		int cmdValue = Integer.parseInt(cmd);
		String decode = null;
		if( 0<cmdValue&& cmdValue <= 200){
			codeStr.append(bkkey);
		}else if ( 200 < cmdValue && cmdValue <=1000) {
			codeStr.append(clientKey);
		} else if( 1000 < cmdValue && cmdValue <= 2000){
			codeStr = new StringBuilder(cmd+bkkey+(randnum==null?"":randnum));//加密串,最原始版本
		}
		decode = MD5toDigest(codeStr.toString());
		if (decode.equals(sign)) {
//			logger.info("http server check success cmd:" + cmd + ",randnum:" + randnum+",incomeCode:" + codeStr + " codeMD5:"+decode+" IncomeMD5:"+sign);
			return true;
		}
		logger.info("http server check request fail,cmd:" + cmd + ",randnum:" + randnum+",incomeCode:" + codeStr + " codeMD5:"+decode+" IncomeMD5:"+sign);
		return false;
	}

	public static List<Integer> getZoneidList(String zoneidStr) {
		List<Integer> zoneidList = new ArrayList<>();
		String[] groupArr = zoneidStr.split(";");
		for (String group : groupArr) {
			String[] zoneidArr = group.split("-");
			int startZoneId = Integer.parseInt(zoneidArr[0]);
			if (zoneidArr.length > 1) {
				int endZoneId = Integer.parseInt(zoneidArr[1]);
				if (startZoneId > endZoneId) {
					int temp = startZoneId;
					startZoneId = endZoneId;
					endZoneId = temp;
				}
				for (int i = startZoneId; i <= endZoneId; i++) {
					zoneidList.add(i);
				}
			} else {
				zoneidList.add(startZoneId);
			}
		}
		return zoneidList;
	}

	/**
	 * key:jjjjyyysgzj2018
	 * cmd:17 踢人 http://neice.sgzj.jyoup2.cn2:8802?randnum=1531821383&cmd=17&key=21fe8d8c0d64e007861b98c7386f700e
	 * cmd:18 关闭入口 http://neice.sgzj.jyoup2.cn2:8802?randnum=1531822022&cmd=18&key=1524c8cef79102042be6e46df989fcc2&type=0
	 * cmd:18 开启入口 http://neice.sgzj.jyoup2.cn2:8802?randnum=1531822022&cmd=18&key=1524c8cef79102042be6e46df989fcc2&type=1
	 * 
	 * *****禁言封号 解禁言 解封号****
	 * 第一步：根据玩家名字 区号 查询玩家唯一id
	 * cmd:1 http://neice.sgzj.jyoup2.cn2:8802?randnum=1531881625&cmd=1&key=b9e3d4541490af396f94eb7b19c76eba&name=大气的白龙&zoneid=1
	 * 得到结果后:玩家id 1000100000001196  
	 * 
	 * 第二步根据玩家id做 封号 解封号 禁言  解禁言 的操作
	 * cmd:3 封号 type=1 玩家id hid=1000100000001196 封号时间（分钟）time=600000 封号原因 reason=1  
	 * http://neice.sgzj.jyoup2.cn2:8802/?randnum=1531882411&cmd=3&key=f1fdc67655aa7adbd7e0a18278db36c7&hid=1000100000001196&type=1&time=600000&reason=1
	 * cmd:3 解封 type=5 玩家id hid=1000100000001196 
	 * http://neice.sgzj.jyoup2.cn2:8802?randnum=1531884510&cmd=3&key=abead059aa752932ce7ab63a93b97b76&hid=1000100000001196&type=5
	 * cmd:3 禁言 type=3 玩家id hid=1000100000001196 禁言时间（分钟）time=600000 禁言原因 reason=1  
	 * http://neice.sgzj.jyoup2.cn2:8802/?randnum=1531882411&cmd=3&key=f1fdc67655aa7adbd7e0a18278db36c7&hid=1000100000001196&type=3&time=600000&reason=1
	 * cmd:3 解禁言 type=6 玩家id hid=1000100000001196
	 * http://neice.sgzj.jyoup2.cn2:8802/?randnum=1531882411&cmd=3&key=f1fdc67655aa7adbd7e0a18278db36c7&hid=1000100000001196&type=6
	 * 
	 * ***发邮件****
	 * cmd:8 
	 * 单人邮件 要根据玩家姓名查出玩家唯一id(第一步里有) 
	 * hid=1000100000000006 邮件内容：content=补偿邮寄 元宝：yuanbao=6000 铜钱:coin=1000 道具:goods=[0,0]([道具id,道具数量num] 空就填[0,0])
	 * http://neice.sgzj.jyoup2.cn2:8802?randnum=1531895338&cmd=8&key=9be4f877db84157c67577161c0bed8c2&hid=1000100000001196&content=补偿邮寄&yuanbao=60&coin=1000&goods=[0,0]
	 * 
	 * 发多人邮件 
	 * hid=0 邮件内容：content=补偿邮寄 元宝：yuanbao=6000 铜钱:coin=1000 道具:goods=[0,0]([道具id,道具数量num] 空就填[0,0])
	 * http://neice.sgzj.jyoup2.cn2:8802?randnum=1531895338&cmd=8&key=9be4f877db84157c67577161c0bed8c2&hid=0&content=补偿邮寄&yuanbao=60&coin=10&goods=[4287,1]
	 * 
	 * 添加白名单
	 * 先通过第一步 查询玩家id的时候 顺便查到用户id openid
	 * 然后在把用户id设置成白名单
	 * http://neice.sgzj.jyoup2.cn2:8802?randnum=1531908953&cmd=19&key=0af8d06735baa289ad8cf46a6829944d&openid=1172622
	 * @param args
	 */
	public static void main(String[] args) {
		// int cmd = 19;
		// String ip = "192.168.36.11";
		// int port = 8802;
		// String url = "http://"+ip+":"+port+"?";
		// String key = "jjjjyyysgzj2018";
		// Integer randnum = TimeDateUtil.getCurrentTime();
		// StringBuilder codeStr = new
		// StringBuilder(cmd+key+(randnum==null?"":randnum));
		// String decode = MD5toDigest(codeStr.toString());//加密串
		// //System.err.println(url + "randnum="+randnum+"&cmd="+cmd+"&key="+decode);
		// System.err.println(url +
		// "randnum="+randnum+"&cmd="+cmd+"&key="+decode+"&openid=subo124");
		
		// http://192.168.100.222:9812/?sign=c03e6eab6328813fa68521df7cdd36b6&cmd=201&randnum=1463542867&zoneid=1&pf=1&uiid=0
		// https://192.168.100.222:9812/?sign=0bae7ae46ae04db16ffbb11f70e3f30a&cmd=202&randnum=1463542867&pf=aiweiyou&openid=112
		// http://192.168.100.222:9812/?sign=e9d72c480a10b5fda8a41256b8f9d2ad&cmd=14&randnum=1463542867&pf=aiweiyou&zoneid=1
		// http://192.168.100.222:9812/?sign=6b21f2e9c2940871c7fc44c49c51aed7&cmd=3&randnum=1463542867&pf=aiweiyou&zoneid=1&player=3&cond=hzp01;hzp006&title=第一封邮件&content=这是测试&goods=3,100000;4,10
		// http://192.168.100.222:9812/?sign=8e429b7e5924092251f38251c5590cbf&cmd=4&randnum=1463542867&pf=aiweiyou&zoneid=1&title=第二封邮件&content=这是测试&goods=3,100000;4,10&strength=&lv=&money=
		// http://192.168.100.223:9812/?sign=c98d229769967881a67eb7dc0cb19689&cmd=5&randnum=1463542867&content=服务器登录公告设置 v1
		// http://192.168.100.222:9812/?sign=17a1fc6ebae4d90f23a717df18f14a29&cmd=6&randnum=1463542867&pf=aiweiyou&zoneid=1&type=1&content=出现特别情况，服务器维护
		// http://192.168.100.222:9812/?sign=a52bc2f0816f5eeb10d22b47cf0f9a60&cmd=1&randnum=1463542867&pf=aiweiyou&zoneid=1&player=3&cond=hzp01
		// http://192.168.100.222:9812/?sign=e5b8d1deaabdc00ce4181b555f77c1a3&cmd=2&randnum=1463542867&pf=aiweiyou&zoneid=1&player=3&cond=hzp01&time=10&reason=太吵&type=2
		// http://192.168.100.222:9812/?sign=a7619cd76fda557b29a95df9b7f58edb&cmd=7&randnum=1463542867&pf=aiweiyou&zoneid=1&player=1&cond=hzp01&type=2
		// http://192.168.100.222:9812/?sign=b8f0d2735e630dd9260c5ef6f651391c&cmd=9&randnum=1463542867&pf=aiweiyou&zoneid=1&player=3&cond=hzp01
		// http://192.168.100.222:9812/?sign=5297d59a70b76e895fbef5037b6a052d&cmd=8&randnum=1463542867&pf=aiweiyou&zoneid=1&name=tool
		// http://192.168.100.222:9812/?sign=96db060594abfe90714d6dbb9b877058&cmd=90
		// http://192.169.999.999:7002/?sign=d6da5e6b75b2666fa4ee2a806758d75e&cmd=204&randnum=1463542867&pf=wxsgzj01&zoneid=1
		// cmd=202&randnum=1541495650615&pf=wxsgzj01-0&openid=oRTM-5SYxUoB8Ek0e10Zft5OSGMA
		// cmd=26pf=ncsgzj01randnum=1542682236455
		//
		/*	pf	    quick	渠道code	是
		zoneid	1	   区服号	是
		cmd	    1	  接口序号	是
		randnum	1234567890	时间戳	是
		player	3	参数类型，1角色名，2角色id，3平台账号	是
		cond	66666666	参数值，多个参数用;分隔	是
	    */
		String cmd = "25";
		StringBuilder codeStr = new StringBuilder();
		Map<String, Object> map = new TreeMap<>();
		map.put("pf", "ncsgzj01");
		map.put("cmd", cmd);
		map.put("randnum", 1542682236455l);
		map.put("maxzoneid",0);
		/*map.put("zoneid", "3");
		map.put("player", "1");
		map.put("cond", "小白龙");*/
		
		// map.put("zoneid", "9997");
		// map.put("ip", "59.42.206.106");
		//map.put("name", "tool");
		// map.put("player", "3");

		// map.put("time", "10");
		// map.put("reason", "太吵");
		// map.put("type", 2);
		// map.put("content", "出现特别情况，服务器维护");
		// map.put("strength", "");
		// map.put("money", "");
		// map.put("goods", "3,100000;4,10");
		// map.put("title", "第二封邮件");
		// map.put("content", "这是测试");
		// TreeMap输出即升序
		for (Map.Entry<String, Object> en : map.entrySet()) {
			if (en.getValue() != null && !"".equals(en.getValue())) {
				codeStr.append(en.getKey()).append("=").append(en.getValue());
			}
		}

		// 后台请求加密
		int cmdValue = Integer.parseInt(cmd);
		String decode = null;
		if (cmdValue > 200) {
			decode = MD5toDigest(codeStr + clientKey);// 加密串
		} else {
			decode = MD5toDigest(codeStr + bkkey);// 加密串
		}
		System.err.println(codeStr);
		System.err.println(decode);
		
//		Map<String, String> p = new HashMap<>();
//		p.put("sdf", "885");
//		p.put("add", "222");
//		p.put("sign", "632");
//		p.put("nop", "85");
//		p.put("pno", "632");
//		String codeStr = "";
//		StringBuilder codeStr1 = new StringBuilder();
//		Map<String, Object> map = new TreeMap<>();
//		map.putAll(p);
//		map.remove("sign");
//
//		// TreeMap输出即升序
//		for (Map.Entry<String, Object> en : map.entrySet()) {
//			if (en.getValue() != null && !"".equals(en.getValue())) {
//				codeStr += en.getKey() + "=" + en.getValue();
//				codeStr1.append(en.getKey()).append("=").append(en.getValue());
//			}
//		}
//		System.err.println(codeStr);
//		System.err.println(codeStr1);
	}
	
	
}
