package com.teamtop.houtaiHttp.recharge;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.netty.http.RequestParser;
import com.teamtop.netty.util.ByteBufToBytes;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpHeaders;

/**
 * http://120.92.162.198:7013?uid=11420572-jyapk&channel=whale&game_order=1999900000000465_1544413051_0_1&order_no=JY-20181210113735150908.ipaynow-weixin-pt&pay_time=1544413073&amount=1&status=1&extras_params=o2kGP4hWeIHVq-bCOx9WScRmne84&pf=whale&sign=86425a2691ac6597702dc0ce81e976c5
 * get请求 extends ChannelInboundHandlerAdapter
 * */

@Sharable
public class RechargeHttpHandler extends SimpleChannelInboundHandler<FullHttpRequest> {
	private static final Logger logger = LoggerFactory.getLogger(RechargeHttpHandler.class);
	private ByteBufToBytes reader;
	@Override
	protected void channelRead0(ChannelHandlerContext ctx, FullHttpRequest msg) throws Exception {
		try {
			if (HttpHeaders.isContentLengthSet(msg)) {
				reader = new ByteBufToBytes((int) HttpHeaders.getContentLength(msg));
			}
			logger.info("RechargeHttp notice");
			StringBuffer sb = new StringBuffer();
			Map<String, Object> tempParam = RequestParser.parse(msg);
			Map<String, String> param=new HashMap<>();
			for (String key: tempParam.keySet()) {
				String val=URLDecoder.decode((String)tempParam.get(key), "UTF8");
				param.put(key,val);
				sb.append(key).append("=").append(val).append(",");
			}
			LogTool.info("recharge params: " + sb.toString(), RechargeHttpHandler.class);
			if (param.containsKey(HoutaiConst.order_no)) {
				// 后台系统转发
				String uid  =param.get(HoutaiConst.uid);
				String channel  =param.get(HoutaiConst.channel);
				String game_order  =param.get(HoutaiConst.game_order);
				String order_no=param.get(HoutaiConst.order_no);
				String pay_time=param.get(HoutaiConst.pay_time);
				String amount=param.get(HoutaiConst.amount);
				String status=param.get(HoutaiConst.status);
				String extras_params=param.get(HoutaiConst.extras_params);
				String pf=param.get(HoutaiConst.pf);
				String sign=param.get(HoutaiConst.sign);
				boolean isLawful = xiaoCheckRequest(param);
				if(!isLawful){
					logger.info("小游戏 !isLawful,uid:"
							+uid+",channel:"+channel+",game_order:"+game_order
							+",order_no: "+order_no+",pay_time:"+pay_time+",amount:"+amount+",status:"+status+",extras_params:"+extras_params+",pf:"+pf
							+",sign:"+sign);				
					HttpUtil.responseFail(ctx);
					return;
				}else {
					logger.info("小游戏 isLawful success,uid:"
							+uid+",channel:"+channel+",game_order:"+game_order
							+",order_no: "+order_no+",pay_time:"+pay_time+",amount:"+amount+",status:"+status+",extras_params:"+extras_params+",pf:"+pf
							+",sign:"+sign);
					int zoneid = Integer.parseInt(extras_params);
					String zonestr=extras_params;
					Channel iochannel=CrossCache.getChannel(zoneid);
					CrossData crossData= new CrossData();
					param.put(HoutaiConst.cp_order_num, game_order);
					//充值元转换为分
					int yuan=Integer.parseInt(amount);
					yuan=yuan*100;
					String rechargeNum=Integer.toString(yuan);
					param.put(HoutaiConst.money, rechargeNum);
					param.put(HoutaiConst.order_num, order_no);
					param.put(HoutaiConst.app_server, zonestr);
					crossData.putObject(CrossEnum.rechargedata.name(), param);
					// 通知子服请求充值
					NettyWrite.writeXData(iochannel, CrossConst.RECHARGE, crossData, new Callback() {
						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							int result=0;
							result=crossData.getObject(CrossEnum.rechargeresult.name(), Integer.class);
							if (result==1) {
								//成功
								HttpUtil.responseXiaoSucc(ctx);
								logger.info("RechargeHttp notice success");
							}else {
								//失败
								HttpUtil.responseFail(ctx);
								logger.info("RechargeHttp notice Fail");
							}
						}
					});
					
				}
				
			}else {
				//微信 生成签名
				String decode=getSign(param);
				String uid  =(String) tempParam.get(HoutaiConst.uid);
				String order_num  =(String) tempParam.get(HoutaiConst.order_num);
				String money=(String) tempParam.get(HoutaiConst.money);
				String app_server  =(String) tempParam.get(HoutaiConst.app_server);
				String role_name=(String) tempParam.get(HoutaiConst.role_name);
				String product_id=(String) tempParam.get(HoutaiConst.product_id);
				String product_name=(String) tempParam.get(HoutaiConst.product_name);
				String product_num=(String) tempParam.get(HoutaiConst.product_num);
				String cp_order_num=(String) tempParam.get(HoutaiConst.cp_order_num);
				String passthrough_params=(String) tempParam.get(HoutaiConst.passthrough_params);
				String pay_time=(String) tempParam.get(HoutaiConst.pay_time);
				String sign=(String) tempParam.get(HoutaiConst.sign);
				if (sign.equals(decode)) {
					logger.info("微信 sign.equals(decode) ,uid:"
							+uid+",order_num:"+order_num+",money:"+money+",app_server:"+app_server
							+",pay_time:"+pay_time+",role_name:"+role_name+",product_id:"+product_id+",product_name:"+product_name
							+",product_num:"+product_num+",cp_order_num:"+cp_order_num+",passthrough_params:"+passthrough_params+",decode:"+decode+",sign:"+sign);
					
					int zoneid=Integer.parseInt(app_server);
					Channel channel=CrossCache.getChannel(zoneid);
					CrossData crossData= new CrossData();
					crossData.putObject(CrossEnum.rechargedata.name(), param);
					// 通知子服请求充值
					NettyWrite.writeXData(channel, CrossConst.RECHARGE, crossData, new Callback() {
						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							int result=0;
							result=crossData.getObject(CrossEnum.rechargeresult.name(), Integer.class);
							if (result==1) {
								//成功
								HttpUtil.responseSucc(ctx);
								logger.info("RechargeHttp notice success");
							}else {
								//失败
								HttpUtil.responseFail(ctx);
								logger.info("RechargeHttp notice Fail");
							}
						}
					});
					
				}else {
					logger.info("微信 !isLawful,uid:"
							+uid+",order_num:"+order_num+",money:"+money+",app_server:"+app_server
							+",pay_time:"+pay_time+",role_name:"+role_name+",product_id:"+product_id+",product_name:"+product_name
							+",product_num:"+product_num+",cp_order_num:"+cp_order_num+",passthrough_params:"+passthrough_params+",decode:"+decode+",sign:"+sign);
					HttpUtil.responseFail(ctx);
					return;
				}
				
			}
		} catch (Exception e) {
			HttpUtil.responseFail(ctx);
			LogTool.error(e, RechargeHttpHandler.class, "RechargeHttpHandler has wrong");
		}
	}
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
		super.exceptionCaught(ctx, cause);
	}
	
	/**
	 * 检验请求的合法性《小游戏平台》
	 * @param p
	 * @return
	 */
	public static boolean xiaoCheckRequest(Map<String,String> p){
		String uid  =p.get(HoutaiConst.uid);
		String channel  =p.get(HoutaiConst.channel);
		String game_order  =p.get(HoutaiConst.game_order);
		String order_no=p.get(HoutaiConst.order_no);
		String pay_time=p.get(HoutaiConst.pay_time);
		String amount=p.get(HoutaiConst.amount);
		String status=p.get(HoutaiConst.status);
		String extras_params=p.get(HoutaiConst.extras_params);
		String pf=p.get(HoutaiConst.pf);
		String sign=p.get(HoutaiConst.sign);
		
		String key= PropertiesTools.getProperties("rechargeHttpKey");
		
		String codeStr = "";
		Map<String,Object> map = new TreeMap<>();
		map.put("uid", uid);
		map.put("channel", channel);
		map.put("pf", pf);
		map.put("game_order", game_order);
		map.put("order_no", order_no);
		map.put("amount", amount);
		map.put("pay_time", pay_time);
		map.put("status", status);
		map.put("extras_params", extras_params);
		
		
		for(Map.Entry<String,Object> en : map.entrySet()){
			if(en.getValue() !=null && !"".equals(en.getValue())){
				if(en.getValue().equals("") ){
					codeStr += en.getKey()+ "=1";
				}else{
					codeStr += en.getKey()+ "=" + en.getValue();
				}
			}
		}
		
		
		String decode = MD5toDigest(codeStr+key);//
		if(decode.equals(sign)){
			logger.info("decode==sign uid: "+uid);
			return true;
		}
		logger.warn("recharge http server check request fail,uid:"
		+uid+",channel:"+channel+",game_order:"+game_order+",order_no:"+order_no
		+",pay_time:"+pay_time+",amount:"+amount+",status:"+status+",extras_params:"+extras_params
		+",pf:"+pf+",decode:"+decode+",sign:"+sign+",param:"+codeStr.toString());
		
		return false;
	
	}
	
	public static void main(String[] args) {
		//uid=11420572-jyapk
		//channel=whale
		//game_order=1999900000000465_1544413051_0_1
		//order_no=JY-20181210113735150908.ipaynow-weixin-pt
		//pay_time=1544413073
		//amount=1
		//status=1
		//extras_params=o2kGP4hWeIHVq-bCOx9WScRmne84
		//pf=whale
		//sign=86425a2691ac6597702dc0ce81e976c5

		Map<String, String> recharge=new HashMap<>();
	  /*recharge.put("product_id", "20001");
		recharge.put("product_name", "1元直购");
		recharge.put("product_num", "1");
		recharge.put("role_name", "健谈的兰斯");
		recharge.put("uid", "11420572-jyapk");
		recharge.put("app_server", "3");
		recharge.put("cp_order_num", "5265046f33582a648fbdebbc1cc6bb65");
		recharge.put("money", "100");
		recharge.put("order_num", "JY-20180814170231557268");
		recharge.put("passthrough_params", "3,20001");
		recharge.put("pay_time", "1534241906");*/
		recharge.put("uid", "11420572-jyapk");
		recharge.put("channel", "whale");
		recharge.put("pf", "whale");
		recharge.put("game_order", "1999900000000465_1544413051_0_1");
		recharge.put("order_no", "JY-20181210113735150908.ipaynow-weixin-pt");
		recharge.put("amount", "1");
		recharge.put("pay_time", "1544413073");
		recharge.put("status", "1");
		recharge.put("extras_params", "o2kGP4hWeIHVq-bCOx9WScRmne84");
		recharge.put("sign", "86425a2691ac6597702dc0ce81e976c5");
		if (xiaoCheckRequest(recharge)) {
			System.err.println("success");
		}else {
			System.err.println("final");
		}
	
		
		
		/*String cp_order_num="15399548332060";
		String uid="subo";
		String money="6000";
		String product_id="1";
		String app_server="1";
	
		
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("product_id", product_id));
		params.add(new BasicNameValuePair("product_name", "1元直购"));
		params.add(new BasicNameValuePair("product_num", "1"));
		params.add(new BasicNameValuePair("role_name", "健谈的兰斯"));
		params.add(new BasicNameValuePair("uid", uid));
		params.add(new BasicNameValuePair("app_server", app_server));
		params.add(new BasicNameValuePair("cp_order_num", cp_order_num));
		params.add(new BasicNameValuePair("money", money));
		params.add(new BasicNameValuePair("order_num", "JY-20180814170231557268"));
		params.add(new BasicNameValuePair("passthrough_params", "3,20001"));
		params.add(new BasicNameValuePair("pay_time", "1534241906"));
		params.add(new BasicNameValuePair("sign", sign));
		HttpGetOrPostHandle.postInfo(params, HoutaiRequestCache.RechargeTest_Url);*/
		/*String[] split = "JY-20181023170304897587".split("\\.");
		for (int i = 0; i < split.length; i++) {
			boolean equals = split[i].equals(HoutaiConst.midas);
			if (equals) {
				//System.err.println("1");
			}
		}*/
		//System.err.println(TimeDateUtil.get);
		
		//time=1524816510&order_num=JY-20180426140434534201&money=1&app_server=999&role_name=%E6%9D%8E%E9%80%8D%E9%81%A5&product_id=aab3238922bcc25a6f606eb525ffdc56&product_name=%E9%A6%92%E5%A4%B4&product_num=1&cp_order_num=CP12345&passthrough_params=test&pay_time=1524811225
		/*String paramMd5 = "f10c6da92f4311d78acf008aa35e5912";
		int cmd = 22;
		int randnum = 1497519606; 
		int money = 1;
		long rerid = 1999900000000154l;
		String key= "sanguoh52017pay";
		StringBuilder  codeStr = new StringBuilder();
		codeStr.append(cmd).append("&").append(randnum).append("&").append(money)
				.append("&").append(rerid).append("&").append(key);
		String calcmd5 = new MD5().toDigest(codeStr.toString());//加密串
		String sign = new MD5().toDigest("app_server=999&cp_order_num=CP12345&money=1&order_num=JY-20180426140434534201&passthrough_params=test&pay_time=1524811225&product_id=aab3238922bcc25a6f606eb525ffdc56&product_name=%E9%A6%92%E5%A4%B4&product_num=1&role_name=%E6%9D%8E%E9%80%8D%E9%81%A5&time=1524816510&f10c6da92f4311d78acf008aa35e5912");//加密串
		
		System.err.println("sign:"+sign);
		
		System.err.println("params:"+codeStr.toString());
		System.err.println("calcmd5:"+calcmd5);
		System.err.println("paramMd5:"+paramMd5);
		
		String ip = "192.168.7.100";
		int port = 8819;
		String url = "http://neice.sgzj.jyoup2.cn2/";
		System.err.println( url+ "randnum="+randnum+"&cmd="+cmd+"&key="+calcmd5+"&money="+money+"&rechargerid="+rerid+"&out_trade_no=14534337251");*/
		
		//,uid:1156085,channel:whale,game_order:15317208067172,
		//order_no:JY-20180716140009537399,pay_time:1531720847,
		//amount:0.01,status:1,extras_params:null,
		//pf:whale,decode:6bd7c20afabe410f6524cc5e1ef865e9,
		//sign:00f416e3e0d211e21e155bc4b69433e0,param:1156085&whale&15317208067172&JY-20180716140009537399&1531720847&0.01&1&whale&hatesummerlovesummer712
		
		//http://192.168.36.11:8809?uid=1156085&channel=whale&game_order=15317208067172&order_no=JY-20180716140009537399&pay_time=1531720847&amount=0.01&status=1&extras_params=&pf=whale&sign=00f416e3e0d211e21e155bc4b69433e0
		
		
		/*String codeStr="1156085whale15317208067172JY-2018071614000953739915317208470.01&1whalehatesummerlovesummer712";
		String decode = MD5toDigest(codeStr.toString());//加密串
		System.err.println(decode);*/
		
        /*boolean isPost = false;
		if (obj instanceof HttpRequest) {
			HttpRequest request = (HttpRequest) obj;
			HttpMethod method = request.getMethod();
			isGet = method.equals(HttpMethod.GET);
			isPost = method.equals(HttpMethod.POST);
			if (isPost) {
				HttpPostRequestDecoder decoder = new HttpPostRequestDecoder(new DefaultHttpDataFactory(false), (HttpRequest) obj);
				List<InterfaceHttpData> parmList = decoder.getBodyHttpDatas();
				
				Map<String, String> parmMap = new HashMap<>();
				for (InterfaceHttpData parm : parmList) {
					
					MemoryAttribute data = (MemoryAttribute) parm;
					parmMap.put(data.getName(), data.STRINGue());
				}
			}
		}*/
	/*	Map<String, String> recharge=new HashMap<>();
		recharge.put("product_id", "20001");
		recharge.put("product_name", "1元直购");
		recharge.put("product_num", "1");
		recharge.put("role_name", "健谈的兰斯");
		recharge.put("uid", "2017167");
		recharge.put("app_server", "3");
		recharge.put("cp_order_num", "5265046f33582a648fbdebbc1cc6bb65");
		recharge.put("money", "100");
		recharge.put("order_num", "JY-20180814170231557268");
		recharge.put("passthrough_params", "3,20001");
		recharge.put("pay_time", "1534241906");
		String decode=getSign(recharge);
		System.err.println(decode);
		if (decode.equals("008631838eeff5893dbdc6efca3d6547")) {
			System.err.println("yes");
		}*/
		
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
	 * 生成签名《微信》
	 * @param map
	 * @return
	 */
	public static String getSign(Map<String, String> map) {
		String signkey= PropertiesTools.getProperties("rechargeHttpKey");
	    //String signkey="f10c6da92f4311d78acf008aa35e5912";008631838eeff5893dbdc6efca3d6547
	    //String signkey="e520843a21f0605acbab111f672f26c9";
		try {
			// 对所有传入参数按照字段名的 ASCII 码从小到大排序（字典序）
			List<Map.Entry<String, String>> infoIds = new ArrayList<Map.Entry<String, String>>(map.entrySet());
			Collections.sort(infoIds, new Comparator<Map.Entry<String, String>>() {
				public int compare(Map.Entry<String, String> o1, Map.Entry<String, String> o2) {
					return (o1.getKey()).toString().compareTo(o2.getKey());
				}
			});
			///对每个参数做一次urlencode编码
			
			// 构造签名键值对的格式
			String codeStr = "";
			for (Map.Entry<String, String> item : infoIds) {
				String key = item.getKey();
				if (!key.equals("sign")) {
					String val = item.getValue();
					String newval="";
					if (!val.equals("")) {
						newval=URLEncoder.encode(val, "UTF8");
					}
					codeStr += key+ "=" + newval+"&";
				}
			}
			//System.err.println("codeStr:"+codeStr);
			//充值加密
			String decode = MD5toDigest(codeStr+signkey);//加密串
			return decode;
		} catch (Exception e) {
			LogTool.warn("getSign has wrong", RechargeHttpHandler.class);
			return null;
		}
	}
}
