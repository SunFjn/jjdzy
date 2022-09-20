package com.teamtop.houtaiHttp.qqGift;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.netty.http.RequestParser;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;

public class QqGiftHttpFunction {
	
	private static QqGiftHttpFunction ins = null;

	public static synchronized QqGiftHttpFunction getIns() {
		if (ins == null) {
			ins = new QqGiftHttpFunction();
		}
		return ins;
	}
	/**
	 * 获取开服列表
	 */
	public static final String url1="/sgzjzonelist";
	/**
	 * 拉取用户角色信息接口
	 */
	public static final String url2="/sgzjroleinfo";
	/**
	 * 请求发货
	 */
	public static final String url3="/sgzj";
	
	
	public static final String APPKEY="IqPXJQtTXfHS8N5M&";
	
	/**
	 * 发货
	 * @param ctx
	 * @param msg
	 * http://192.168.22.20:8805/sgzj?openid=8853C1AE1133AA2D6190CE98F1E652DE&taskid=60029&awardid=111&billno=1111&timestamp=1565171233&appid=1109607260&action=send&area=qq&pkey=8c335f9dcef50b368021ebf2060c6465&partition=1&sig=iwsmHunSjpIWwXJqZADoElXGpJA%3D
	 */
	public void fahuo(ChannelHandlerContext ctx,FullHttpRequest msg) {
		try {
			LogTool.info("QqGiftHttpHandler notice", QqGiftHttpHandler.class);
			StringBuffer sb = new StringBuffer();
			Map<String, Object> tempParam = RequestParser.parse(msg);
			
			HashMap<String, String> param=new HashMap<>();
			for (String key: tempParam.keySet()) {
				String val=URLDecoder.decode((String)tempParam.get(key), "UTF8");
				param.put(key,val);
				sb.append(key).append("=").append(val).append(",");
			}
			LogTool.info("QqGiftHttpHandler params: " + sb.toString(), QqGiftHttpFunction.class);
			//小游戏
			/*openid	String	用户登录游戏的openid，包括qq登录和微信登录
	          taskid	Int	礼包对应的id，提交申请文档后，应用宝统一分配（开发商不能自定义）
	          awardid	Int	这个字段已经不需要校验，历史遗留问题
	          billno	String	组成方式为YYYYMMDDHHMMSS_dPnCXs_Taskid_Awardid 其中，第二块是随机生成的六位大小写随机码,提供对账
	          timestamp	Long long	发请求的时间戳，精确到秒，开发商收到请求后需验证timestamp与当前请求是否超过5分钟，如果超过5分钟，可认为请求无效直接丢弃
	          appid	    Unsigned int	手Q的appid（如果是用户是微信id，也是用手Qappid）
	          action	String	包括check、send、check_send三种 check:开发者仅需要查询任务步骤是否完成，返回步骤完成状态 check_send:开发者需要查询任务步骤是否完成，若步骤已完成，直接给用户发货，并返回发货是否成功(暂时只需要开发这个接口)Send:平台通知开发者直接给给用户发货，开发者返回发货是否成功
	          area	    string	标示用户是qq登录还是微信登录
	          pkey	    String	用户生成辅助签名，用户增强任务回调接口安全性。
	          partition	String	用户选取的区id
	          sig	String	请求串的签名，签名方式跟开平签名sig参数一致。
	             
	          http://xxxxx.xxx.xxx?openid=xxxx&taskid=xxxx&awardid=xxx&billno=xxx&timestamp=xxx&appid=xxx&action=xxx&area=xxx&pkey=xxx&
	          sig=xxx&partition=xxx&roleid=xxx  可选*/
			String openid  =param.get(QqGiftConst.openid);
			String taskid  =param.get(QqGiftConst.taskid);
			String awardid =param.get(QqGiftConst.awardid);
			String billno  =param.get(QqGiftConst.billno);
			String timestamp=param.get(QqGiftConst.timestamp);
			String appid=param.get(QqGiftConst.appid);
			String action=param.get(QqGiftConst.action);
			String area=param.get(QqGiftConst.area);		
			String pkey=param.get(QqGiftConst.pkey);		
			String partition=param.get(QqGiftConst.partition);
			String sig=param.get(QqGiftConst.sig);			
			//请求后需验证timestamp与当前请求是否超过5分钟，如果超过5分钟，可认为请求无效直接丢弃
			int times = Integer.parseInt(timestamp);
			int currentTime = TimeDateUtil.getCurrentTime();	
			if (currentTime-times>=5*60) {
				JSONObject  hashMap=new JSONObject();
				hashMap.put("ret", QqGiftConst.rest_1);
				hashMap.put("msg", "请求无效");
				HttpUtil.response(JSON.toJSONString(hashMap), ctx);
				return;
			}
			boolean isLawful = checkRequest(param);
			if(!isLawful){
				LogTool.info("应用宝 !isLawful,openid:"
						+openid+",taskid:"+taskid+",awardid:"+awardid
						+",billno: "+billno+",timestamp:"+timestamp+",appid:"+appid+",action:"+action+",area:"+area+",pkey:"+pkey
						+",partition:"+partition, QqGiftHttpFunction.class);
				JSONObject  hashMap=new JSONObject();
				hashMap.put("ret", QqGiftConst.rest_3);
				hashMap.put("msg", ":sig参数错误");
				HttpUtil.response(JSON.toJSONString(hashMap), ctx);
				return;
			}else {
				LogTool.info("应用宝  success,openid:"
						+openid+",taskid:"+taskid+",awardid:"+awardid
						+",billno: "+billno+",timestamp:"+timestamp+",appid:"+appid+",action:"+action+",area:"+area+",pkey:"+pkey
						+",partition:"+partition, QqGiftHttpFunction.class);
				int zoneid = Integer.parseInt(partition);
				Channel iochannel=CrossCache.getChannel(zoneid);
				CrossData crossData= new CrossData();
				param.put(QqGiftConst.openid, openid);
				param.put(QqGiftConst.taskid, taskid);
				crossData.putObject(CrossEnum.giftdata.name(), param);
				// 通知子服领取霸权礼包
				NettyWrite.writeXData(iochannel, CrossConst.GIFTGET, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						int result=-1;
						result=crossData.getObject(CrossEnum.giftdataRest.name(), Integer.class);
						if (result==0) {
							//成功
							JSONObject  hashMap=new JSONObject();
							hashMap.put("ret", 0);
							hashMap.put("msg", "OK");
							HttpUtil.response(JSON.toJSONString(hashMap), ctx);
							LogTool.info("QqGiftHttpHandler notice success",QqGiftHttpFunction.class);
							return;
						}else {
							//失败
							JSONObject  hashMap=new JSONObject();
							hashMap.put("ret", result);
							hashMap.put("msg", "");
							HttpUtil.response(JSON.toJSONString(hashMap), ctx);
							LogTool.info("QqGiftHttpHandler notice Fail" + result,QqGiftHttpFunction.class);
						}
					}
				});

			}
		} catch (Exception e) {
			HttpUtil.responseFail(ctx);
			LogTool.error(e, QqGiftHttpFunction.class, "QqGiftHttpFunction has wrong");
		}
		
	}
	/**
	 * 拉取服务器列表
	 * @param ctx
	 * @param msg
	 * http://192.168.22.20:8805/sgzjzonelist?timestamp=11111&appid=11111&area=111111&sig=Sgq0Jeq22UU1nR%2BlOfVdZcuMzlM%3D
	 */
    public void getZoneList(ChannelHandlerContext ctx, FullHttpRequest msg) {
		try {
			LogTool.info("getZoneList notice", QqGiftHttpHandler.class);
			StringBuffer sb = new StringBuffer();
			Map<String, Object> tempParam = RequestParser.parse(msg);
			
			HashMap<String, String> param=new HashMap<>();
			for (String key: tempParam.keySet()) {
				String val=URLDecoder.decode((String)tempParam.get(key), "UTF8");
				param.put(key,val);
				sb.append(key).append("=").append(val).append(",");
			}
			LogTool.info("getZoneList params: " + sb.toString(), QqGiftHttpFunction.class);
			//http://xxxxx.xxx.xxx?timestamp=xxx&appid=xxx&area=xxx&sig=xxx
			String timestamp=param.get(QqGiftConst.timestamp);
			//请求后需验证timestamp与当前请求是否超过5分钟，如果超过5分钟，可认为请求无效直接丢弃
			int times = Integer.parseInt(timestamp);
			int currentTime = TimeDateUtil.getCurrentTime();	
			if (currentTime-times>=5*60) {
				JSONObject  hashMap=new JSONObject();
				hashMap.put("ret", QqGiftConst.rest_1);
				hashMap.put("msg", "请求无效");
				LogTool.info("getZoneList currentTime-times>=5*60 ", QqGiftHttpFunction.class);
				HttpUtil.response(JSON.toJSONString(hashMap), ctx);
				return;
			}
			/*0：拉取成功
			1：请求参数timestamp已过期
			2：sig参数错误
			100~1000:其他自定义失败错误码
			正确的返回示例：
			成功：
			Content-type: text/html; charset=utf-8
			{"ret":0,"msg":"OK",”list”:[{“id”:”1”,”name”:”1区”,”type”:1},{“id”:”2”,”name”:”2区”,”type”:1}]}*/
			boolean isLawful = checkGetZoneListRequest(param);
			if(!isLawful){
				LogTool.info("checkGetZoneListRequest  final",QqGiftHttpFunction.class);
				JSONObject  hashMap=new JSONObject();
				hashMap.put("ret", 2);
				hashMap.put("msg", "sig参数错误");
				HttpUtil.response(JSON.toJSONString(hashMap), ctx);
				return;
			}else {
				LogTool.info("checkGetZoneListRequest  success",QqGiftHttpFunction.class);
				JSONObject  hashMap=new JSONObject();
				hashMap.put("ret", 0);
				hashMap.put("msg", "OK");
				List<JSONObject> serverInfos = new ArrayList<>();
				List<M_ServerInfo> serverNumByType = getServerList();
				for (int i = 0; i < serverNumByType.size(); i++) {
					M_ServerInfo m_ServerInfo=serverNumByType.get(i);
					if (m_ServerInfo.getZoneid()>80) {
						JSONObject serverInfo = new JSONObject();
						serverInfo.put("id", m_ServerInfo.getZoneid()+"");
						serverInfo.put("name", m_ServerInfo.getAlias());
						serverInfo.put("type", 3);
						serverInfos.add(serverInfo);
					}
				}
				//String serverInfoStr = JSON.toJSONString(serverInfos);
				hashMap.put("list",serverInfos);
				HttpUtil.response(JSON.toJSONString(hashMap), ctx);
				return;
			}
		} catch (Exception e) {
			HttpUtil.responseFail(ctx);
			LogTool.error(e, QqGiftHttpFunction.class, "getZoneList has wrong");
		}
		
	}
    
    public List<M_ServerInfo> getServerList() {
    	List<M_ServerInfo> list = new ArrayList<>();
		Map<String, Map<Integer, M_ServerInfo>> pfServerMap = ServerInfoCache.pfServerMap;
		for (Map<Integer, M_ServerInfo> map : pfServerMap.values()) {
			for (M_ServerInfo m_ServerInfo : map.values()) {
				if (m_ServerInfo.getState() != ServerInfoConst.NOT_OPEN) {
					list.add(m_ServerInfo);
				}
			}
		}
		return list;
	}
    
    /**
     * 拉取用户角色信息
     * @param ctx
     * @param msg
     * http://192.168.22.20:8805/sgzjroleinfo?appid=1109607260&area=qq&openid=8853C1AE1133AA2D6190CE98F1E652DE&partition=1&pkey=8c335f9dcef50b368021ebf2060c6465&timestamp=1565149747&sig=1URyypbjX7sfkzRolF4RXD%2F3kNk%3D
     */
	public void getRoleinfo(ChannelHandlerContext ctx, FullHttpRequest msg) {
		try {
			//http://xxxxx.xxx.xxx?openid=xxx&timestamp=xxx&appid=xxx&area=xxx&partition=xxx&pkey=xxx&sig=xxx
			LogTool.info("getRoleinfo notice", QqGiftHttpHandler.class);
			StringBuffer sb = new StringBuffer();
			Map<String, Object> tempParam = RequestParser.parse(msg);
			
			HashMap<String, String> param=new HashMap<>();
			for (String key: tempParam.keySet()) {
				String val=URLDecoder.decode((String)tempParam.get(key), "UTF8");
				param.put(key,val);
				sb.append(key).append("=").append(val).append(",");
			}
			LogTool.info("getRoleinfo params: " + sb.toString(), QqGiftHttpFunction.class);
	
			String openid  =param.get(QqGiftConst.openid);
			String timestamp=param.get(QqGiftConst.timestamp);
			String appid=param.get(QqGiftConst.appid);
			String area=param.get(QqGiftConst.area);		
			String pkey=param.get(QqGiftConst.pkey);		
			String partition=param.get(QqGiftConst.partition);
			String sig=param.get(QqGiftConst.sig);			
			//请求后需验证timestamp与当前请求是否超过5分钟，如果超过5分钟，可认为请求无效直接丢弃
			int times = Integer.parseInt(timestamp);
			int currentTime = TimeDateUtil.getCurrentTime();	
			if (currentTime-times>=5*60) {
				JSONObject  hashMap=new JSONObject();
				hashMap.put("ret", QqGiftConst.rest_1);
				hashMap.put("msg", "请求无效");
				LogTool.info("getRoleinfo currentTime-times>=5*60 ", QqGiftHttpFunction.class);
				HttpUtil.response(JSON.toJSONString(hashMap), ctx);
				return;
			}
			boolean isLawful = checkGetRoleinfoRequest(param);
			if(!isLawful){
				LogTool.info("getRoleinfo !isLawful,openid:"
						+openid+",timestamp:"+timestamp+",appid:"+appid+",area:"+area+",pkey:"+pkey
						+",partition:"+partition, QqGiftHttpFunction.class);
				JSONObject  hashMap=new JSONObject();
				hashMap.put("ret", 3);
				hashMap.put("msg", "sig参数错误");
				HttpUtil.response(JSON.toJSONString(hashMap), ctx);
				return;
			}else {
				LogTool.info("getRoleinfo success ,openid:"
						+openid+",timestamp:"+timestamp+",appid:"+appid+",area:"+area+",pkey:"+pkey
						+",partition:"+partition, QqGiftHttpFunction.class);
				int zoneid = Integer.parseInt(partition);
				Channel iochannel=CrossCache.getChannel(zoneid);
				CrossData crossData= new CrossData();
				crossData.putObject(CrossEnum.getGiftName.name(), param);
				// 通知子服领取霸权礼包
				NettyWrite.writeXData(iochannel, CrossConst.GIFT_GETHERO, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						int result=-1;
						result=crossData.getObject(CrossEnum.getGiftNameRest.name(), Integer.class);
						if (result==0) {
							long hid=crossData.getObject(CrossEnum.hid.name(), Long.class);
							String name=crossData.getObject(CrossEnum.name.name(), String.class);
							JSONObject  hashMap=new JSONObject();
							hashMap.put("ret", 0);
							hashMap.put("msg", "OK");
							List<JSONObject> serverInfos = new ArrayList<>();
							JSONObject serverInfo = new JSONObject();
							serverInfo.put("roleid", hid+"");
							serverInfo.put("rolename", name);
							serverInfos.add(serverInfo);
							hashMap.put("list",serverInfos);
							//成功
							HttpUtil.response(JSON.toJSONString(hashMap), ctx);
							LogTool.info("getRoleinfo notice success",QqGiftHttpFunction.class);
							return;
						}else {
							//失败
							JSONObject  hashMap=new JSONObject();
							hashMap.put("ret", result);
							hashMap.put("msg", "");
							HttpUtil.response(JSON.toJSONString(hashMap), ctx);
							LogTool.info("getRoleinfo notice Fail" + result,QqGiftHttpFunction.class);
						}
					}
				});
				
				
			}
			
		} catch (Exception e) {
			HttpUtil.responseFail(ctx);
			LogTool.error(e, QqGiftHttpFunction.class, "getRoleinfo has wrong");
		}
		
	}
	
	
	/**
	 * 拉取用户角色信息 检验请求的合法性  
	 * @param 
	 * @return
	 */
	public static boolean checkGetRoleinfoRequest(HashMap<String,String> params){
		try {
			String sig = params.get(QqGiftConst.sig);
			params.remove(QqGiftConst.sig);
			String str=SnsSigCheck.makeSig("get", url2, params, APPKEY);
			if (checkSign(sig, str)) {
				return true;
			}
			LogTool.warn("checkGetRoleinfoRequest !sig.equals(str) str:"+str , QqGiftHttpHandler.class);
		} catch (Exception e) {
			LogTool.error(e, QqGiftHttpHandler.class, "checkGetRoleinfoRequest has wrong");
		}
		return false;
	
	}
	
	
    
    
    
	/**
	 * 获取开服列表验证 检验请求的合法性  
	 * @param 
	 * @return
	 */
	public static boolean checkGetZoneListRequest(HashMap<String,String> params){
		try {
			String sig = params.get(QqGiftConst.sig);
			params.remove(QqGiftConst.sig);
			String str=SnsSigCheck.makeSig("get", url1, params, APPKEY);
			if (checkSign(sig, str)) {
				return true;
			}
			LogTool.warn("checkGetZoneListRequest !sig.equals(str) str:"+str , QqGiftHttpHandler.class);
		} catch (Exception e) {
			LogTool.error(e, QqGiftHttpHandler.class, "checkGetZoneListRequest has wrong");
		}
		return false;
	
	}
    
    
	
	/**
	 * 发货验证 检验请求的合法性  
	 * @param 
	 * @return
	 */
	public static boolean checkRequest(HashMap<String,String> params){
		try {
			String sig = params.get(QqGiftConst.sig);
			params.remove(QqGiftConst.sig);
			String str=SnsSigCheck.makeSig("get", url3, params, APPKEY);
			
			if (checkSign(sig, str)) {
				return true;
			}
			LogTool.warn("!sig.equals(str) str:"+str , QqGiftHttpHandler.class);
		} catch (Exception e) {
			LogTool.error(e, QqGiftHttpHandler.class, "checkRequest has wrong");
		}
		return false;
	
	}
	
	public static boolean checkSign(String sig, String mySig) {
		String rSig = sig.replace(" ", "+");
		mySig = mySig.replace(" ", "+");
		return rSig.equals(mySig);
	}
	

}
