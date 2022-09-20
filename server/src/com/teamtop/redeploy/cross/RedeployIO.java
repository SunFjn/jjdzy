package com.teamtop.redeploy.cross;

import java.io.File;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.groovy.GroovyCache;
import com.teamtop.houtaiHttp.events.groovy.GroovyFunction;
import com.teamtop.houtaiHttp.events.hotSwap.HotSwapFunction;
import com.teamtop.houtaiHttp.events.hotSwap.HotSwapHttpEvent;
import com.teamtop.houtaiHttp.events.log.LogCache;
import com.teamtop.houtaiHttp.events.log.LogFunction;
import com.teamtop.houtaiHttp.events.version.VersionCache;
import com.teamtop.houtaiHttp.events.version.VersionFunction;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.redeploy.RedeployCache;
import com.teamtop.redeploy.RedeployClientCache;
import com.teamtop.redeploy.RedeployEnum;
import com.teamtop.redeploy.RedeployServerFunction;
import com.teamtop.redeploy.ui.MainFrame;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.gm.GmCmd;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.common.ConcurrentHashSet;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.file.ZipCompress;
import com.teamtop.util.groovy.InvokeGroovy;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

/**
 * 部署服的IO
 * @author Administrator
 *
 */
public class RedeployIO {
	private static RedeployIO ins = null;

	public static RedeployIO getIns() {
		if (ins == null) {
			ins = new RedeployIO();
		}
		return ins;
	}

	private Logger logger = LoggerFactory.getLogger(RedeployIO.class);
	/**
	 * 上传bin
	 * @param channel
	 * @param data
	 */
	public void uploadBin(Channel channel,CrossData data){
		int cmd = CrossConst.UPLOAD_BIN_CS;
		String type = (String) data.getObject(RedeployEnum.type, String.class);
		int zone = (Integer) data.getObject(RedeployEnum.zone, Integer.class);
		byte[] binObj = data.getObject(RedeployEnum.bin, byte[].class);
		byte[] bin = (byte[]) binObj;
		System.err.println("RedeployServer：type:"+type+",bin len:"+bin.length);
		data.finishGet();
		data.putObject("info", "RedeployServer：type:"+type+",bin len:"+bin.length);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
		RedeployServerFunction.uploadBin(channel, type, bin);
	}
	/**
	 * 重启服务器
	 * @param channel
	 * @param data
	 */
	public void rebootServer(Channel channel,CrossData data){
		int cmd = CrossConst.REBOOTSERVER;
		RedeployServerFunction.deploy(channel,RedeployCache.rebootServer);
	}
	
	/**
	 * 文字提醒 S-C
	 * @param channel
	 * @param data
	 */
	public void tellInfo(Channel channel,CrossData data){
		int zone = channel.attr(RedeployClientCache.ATTR_KEY).get();
		String info = data.getObject(RedeployEnum.info, String.class);
		if(info!=null){
			System.out.println("RedeployIO.tellInfo:"+info);
			MainFrame.info(info, zone);
		}
		String error = (String) data.getObject(RedeployEnum.error, String.class);
		if(error!=null){
			System.err.println("RedeployIO.tellInfo:"+error);
			MainFrame.err(error, zone);
		}
	}
	/**
	 * 中央服接收内测服发送的热更文件，并控制其他子服热更
	 * @param channel
	 * @param data
	 */
	@SuppressWarnings("unchecked")
	public void HOTSWAP_STEP1(final Channel channel9999,CrossData data){
		int cmd = CrossConst.HOTSWAP_STEP1;
		Type jsonType = new TypeReference<List<Integer>>() {}.getType();
		List<Integer> zonelist = (List<Integer>) data.getObject(RedeployEnum.zonelist, jsonType);
		logger.info("zonelist:"+zonelist);
		byte[] bin = (byte[]) data.getObject(RedeployEnum.bin, byte[].class);
		final String type = (String) data.getObject(RedeployEnum.type, String.class);
		final List<Integer> successUpList = new ArrayList<Integer>();
		final int size = zonelist.size();
		CrossData title = new CrossData(RedeployEnum.msg,"-----now running "+type+"-----");
		title.putObject(RedeployEnum.type, type);
		NettyWrite.writeXData(channel9999, CrossConst.HOTSWAP_MSG,title);
		ConcurrentHashSet<Integer> mainServerSet = CrossCache.getMainServerSet();
		// for(final int zoneid:zonelist){
		for (int i = 0; i < size; i++) {
			int randomSize = zonelist.size() - 1;
			int random = RandomUtil.getRandomNumInAreas(0, randomSize);
			final int zoneid = zonelist.remove(random);
			if (!mainServerSet.contains(zoneid)) {
				successUpList.add(zoneid);
				CrossData crossData2 = new CrossData(RedeployEnum.msg,"zone "+zoneid+":"+"success not main server"+",succ:"+successUpList.size()+",all size:"+size);
				crossData2.putObject(RedeployEnum.type, type);
				crossData2.putObject(CrossEnum.zoneid, zoneid);
				crossData2.putObject(CrossEnum.result, "success");
				NettyWrite.writeXData(channel9999, CrossConst.HOTSWAP_MSG,crossData2);
				continue;
			}
			CrossData d2 = new CrossData();
			d2.putObject(RedeployEnum.bin, bin);
			d2.putObject(RedeployEnum.type, type);
			Channel zoneidChannel = CrossCache.getChannel(zoneid);
			logger.info("send step 2 to zoneid:"+zoneid+",channel:"+zoneidChannel);
			NettyWrite.writeXData(zoneidChannel, CrossConst.HOTSWAP_STEP2, d2,new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					String rs = (String) crossData.getObject(RedeployEnum.msg, String.class);
					if("success".equals(rs)){
						successUpList.add(zoneid);
					}
					CrossData crossData2 = new CrossData(RedeployEnum.msg,"zone "+zoneid+":"+rs+",succ:"+successUpList.size()+",all size:"+size);
					crossData2.putObject(RedeployEnum.type, type);
					crossData2.putObject(CrossEnum.zoneid, zoneid);
					crossData2.putObject(CrossEnum.result, rs);
					NettyWrite.writeXData(channel9999, CrossConst.HOTSWAP_MSG,crossData2);
				}
			});
		}
	}
	/**
	 * 子服接受热更文件并热更
	 * @param channel
	 * @param data
	 */
	@SuppressWarnings("static-access")
	public void HOTSWAP_STEP2(Channel channel,CrossData data){
		int cmd = CrossConst.HOTSWAP_STEP2;
		byte[] bin = (byte[]) data.getObject(RedeployEnum.bin, byte[].class);
		String type = (String) data.getObject(RedeployEnum.type, String.class);
		CrossData crossData = new CrossData(RedeployEnum.type, type);
		logger.info("recieve hotswap bin len:"+bin.length);
		if(RedeployEnum.hotswap.name().equals(type)){
			//热更
			String tmpPath = GameProperties.hotswapDir + File.separator+"newfile.zip";
			try {
				File file = new File(tmpPath);
				if (file != null && file.exists()) {
					FileUtils.deleteFile(tmpPath);
				}
				FileUtils.writeData(tmpPath, bin);
				FileUtils.deleteDirectory(tmpPath.substring(0, tmpPath.indexOf(".zip")));
				Thread.sleep(1000);
				//解压
				String path = tmpPath.substring(0, tmpPath.indexOf("newfile.zip"));
				ZipCompress.readByApacheZipFile(tmpPath, path);
				//热更
				String result = HotSwapHttpEvent.getIns().handleGet();
				if(result==null || !"attach finish".equals(result)){
					result = "fail";
				}else{
					result = "success";
				}
				crossData.putObject(RedeployEnum.msg, result);
				NettyWrite.writeCallbackData(channel, crossData, data.getCallbackCmd());
				LogTool.info("HOTSWAP_STEP2 热更 success", RedeployIO.class);
			} catch (Exception e) {
				crossData.putObject(RedeployEnum.msg, "fail");
				NettyWrite.writeCallbackData(channel, crossData, data.getCallbackCmd());
			}
		}else if(RedeployEnum.groovy.name().equals(type)){
			//脚本
			try {
				String tmpPath = GamePath.USER_DIR+GamePath.SEP+"bin"+GamePath.SEP+"groovyScript"+GamePath.SEP+"Debug.groovy";
				File file = new File(tmpPath);
				if (file != null && file.exists()) {
					FileUtils.deleteFile(tmpPath);
					Thread.sleep(500);
				}
				FileUtils.writeData(tmpPath, bin);
				Thread.sleep(500);
				String result = InvokeGroovy.runScript(GroovyCache.DEBUG_FILE_NAME);
				if(result==null || result.indexOf("ok")<0){
					result = "fail";
				}else{
					result = "success";
				}
				crossData.putObject(RedeployEnum.msg, result);
				NettyWrite.writeCallbackData(channel, crossData, data.getCallbackCmd());
				LogTool.info("HOTSWAP_STEP2 脚本 success", RedeployIO.class);
			} catch (InterruptedException e) {
				crossData.putObject(RedeployEnum.msg, "fail");
				NettyWrite.writeCallbackData(channel, crossData, data.getCallbackCmd());
			}
		}else if(RedeployEnum.GROOVY_CONVENIENT.name().equals(type)){
			//脚本便捷式
			try {
				String tmpPath = GamePath.USER_DIR+GamePath.SEP+"bin"+GamePath.SEP+"groovyScript"+GamePath.SEP+GroovyCache.DEBUG_CONVENIENT_FILE_NAME;
				File file = new File(tmpPath);
				if (file != null && file.exists()) {
					FileUtils.deleteFile(tmpPath);
					Thread.sleep(500);
				}
				FileUtils.writeData(tmpPath, bin);
				Thread.sleep(500);
				String result = InvokeGroovy.runScript(GroovyCache.DEBUG_CONVENIENT_FILE_NAME);
				if(result==null || result.indexOf("ok")<0){
					result = "fail "+result;
				}else{
					result = "success "+result;
				}
				crossData.putObject(RedeployEnum.msg, result);
				NettyWrite.writeCallbackData(channel, crossData, data.getCallbackCmd());
				LogTool.info("HOTSWAP_STEP2 脚本便捷式 success", RedeployIO.class);
			} catch (InterruptedException e) {
				crossData.putObject(RedeployEnum.msg, "fail");
				NettyWrite.writeCallbackData(channel, crossData, data.getCallbackCmd());
			}
		}
	}
	
	public void HOTSWAP_MSG(Channel channel,CrossData data){
		int cmd = CrossConst.HOTSWAP_MSG;
		String msg = (String) data.getObject(RedeployEnum.msg, String.class);
		String type = (String) data.getObject(RedeployEnum.type, String.class);
		logger.info(msg);
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		String time = TimeDateUtil.printTime(TimeDateUtil.getCurrentTime());
		for(Hero hero:heroMap.values()){
			if(hero.isOnline()){
				if(RedeployEnum.hotswap.name().equals(type)){
					//热更
					NettyWrite.writeData(hero.getChannel(), new Object[]{msg+" "+time,3},GmCmd.GC_ErrorPrint_96);
//					GlobalSender.sendCmd_260(hero.getId(), GlobalConst.TYPE_HOSTWAP, msg);
				}else if(RedeployEnum.groovy.name().equals(type)){
					//脚本
					NettyWrite.writeData(hero.getChannel(), new Object[]{msg+" "+time,3},GmCmd.GC_ErrorPrint_96);
//					GlobalSender.sendCmd_260(hero.getId(), GlobalConst.TYPE_HOSTWAP, msg);
				}
			}
		}
		//send msg
		Integer zoneid = data.getObject(CrossEnum.zoneid, Integer.class);
		String result = data.getObject(CrossEnum.result, String.class);
		if(zoneid != null){
			if(RedeployEnum.hotswap.name().equals(type)){
				HotSwapFunction.addZID(zoneid, result);
			}else if(RedeployEnum.groovy.name().equals(type)){
				GroovyFunction.addZID(zoneid, result);
			}else if(RedeployEnum.GROOVY_CONVENIENT.name().equals(type)){
				GroovyFunction.addGroovyConvenientResult(zoneid, result);
			}
		}
	}

	public void hotSwapByZidCS(Channel channel,CrossData data){
		int cmd = CrossConst.HOTSWAP_BY_ZID_CS;
		String zidListStr = (String) data.getObject(RedeployEnum.zonelist, String.class);
		LogTool.info("hotSwapByZidCS zid:"+zidListStr, this);

		//服务端热更其他子服
		String port = PropertiesTools.getProperties("httpPort");
		//调用内测服热更事件
		String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=e9048df90618272480e01f240024d8af&cmd=1003&randnum=1&type=2&"+RedeployEnum.zonelist.name()+"="+zidListStr);
//		String connect = HttpGetOrPostHandle.doGetInfo("http://127.0.0.1:"+port, "sign=e9048df90618272480e01f240024d8af&cmd=1003&randnum=1&type=2&"+RedeployEnum.zonelist.name()+"="+zidListStr);
		RedeployServerToClient.sendInfo(channel, connect);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	public void hotSwapByZidCheckCS(Channel channel,CrossData data){
		int cmd = CrossConst.HOTSWAP_BY_ZID_CHECK_CS;
		LogTool.info("hotSwapByZidCheckCS", this);
		//服务端热更其他子服
		String port = PropertiesTools.getProperties("httpPort");
		//调用内测服热更事件
		String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=e9048df90618272480e01f240024d8af&cmd=1003&randnum=1&type=3");
		data.putObject(CrossEnum.data1, connect);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	public void getAllVersionCS(Channel channel,CrossData data){
		int cmd = CrossConst.GET_ALL_VERSION_CS;
		String port = PropertiesTools.getProperties("httpPort");
		Integer type = data.getObject(CrossEnum.type, Integer.class);
		String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=6fabd4af3541d8cf5f9dcc31bc1d8ac6&cmd=1005&randnum=1&type="+type);
		data.putObject(CrossEnum.data1, connect);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}
	
	public void getAllVersionLC(Channel channel,CrossData data){
		int cmd = CrossConst.GET_ALL_VERSION_LC;
		List<Integer> list = CrossCache.getChannelToZoneid().get(channel);
		Integer zidInt = list.get(0);
		VersionCache.setZidSaveVersion(zidInt);
		RedeployCrossToLocal.getVersionCL();
	}
	
	/**
	 * 获取版本号
	 */
	public void getVersionCL(Channel channel,CrossData data){
		int cmd = CrossConst.GET_ONE_VERSION_CL;
		data.finishGet();
		String zoneIdStr = GameProperties.getZoneIdStr();
		data.putObject(CrossEnum.zoneidList,zoneIdStr);
		String version = GlobalCache.getVersion();
		data.putObject(CrossEnum.version,version);
		LogTool.info("上传版本号："+version+" "+zoneIdStr, this);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	public void sendVersionTo9999CL(Channel channel,CrossData data){
		int cmd = CrossConst.SEND_ONE_VERSION_CL;
		String zoneidList = data.getObject(CrossEnum.zoneidList, String.class);
		String version = data.getObject(CrossEnum.version, String.class);
		VersionFunction.setVersionZid(zoneidList, version);
		VersionCache.setTimeEnd(System.currentTimeMillis());
	}

	public void getAllCrossVersionLC(Channel channel,CrossData data){
		int cmd = CrossConst.GET_CROSS_VERSION_LC;
		data.putObject(CrossEnum.zoneidList,GameProperties.getZoneIdStr());
		String version = GlobalCache.getVersion();
		data.putObject(CrossEnum.version,version);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}
	
	public void groovyByZidCS(Channel channel,CrossData data){
		int cmd = CrossConst.GROOVY_BY_ZID_CS;
		String zidListStr = (String) data.getObject(RedeployEnum.zonelist, String.class);
		LogTool.info("groovyByZidCS zid:"+zidListStr, this);

		//服务端热更其他子服
		String port = PropertiesTools.getProperties("httpPort");
		//调用内测服热更事件
		String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=c122b8b3c37d09c09c95bb6411091b6c&cmd=1004&randnum=1&type=2&"+RedeployEnum.zonelist.name()+"="+zidListStr);
		RedeployServerToClient.sendInfo(channel, connect);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	public void groovyByZidCheckCS(Channel channel,CrossData data){
		int cmd = CrossConst.GROOVY_BY_ZID_CHECK_CS;
		LogTool.info("groovyByZidCheckCS", this);
		//服务端热更其他子服
		String port = PropertiesTools.getProperties("httpPort");
		//调用内测服热更事件
		String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=c122b8b3c37d09c09c95bb6411091b6c&cmd=1004&randnum=1&type=3");
		data.putObject(CrossEnum.data1, connect);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	public void groovyConveneintByZidCS(Channel channel,CrossData data){
		int cmd = CrossConst.GROOVY_CONVENEINT_BY_ZID_CS;
		String zidListStr = (String) data.getObject(RedeployEnum.zonelist, String.class);
		LogTool.info("groovyConveneintByZidCS zid:"+zidListStr, this);
		
		//服务端热更其他子服
		String port = PropertiesTools.getProperties("httpPort");
		//调用内测服热更事件
		String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=c122b8b3c37d09c09c95bb6411091b6c&cmd=1004&randnum=1&type=4&"+RedeployEnum.zonelist.name()+"="+zidListStr);
		RedeployServerToClient.sendInfo(channel, connect);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
		// http://127.0.0.1:8802/?sign=c122b8b3c37d09c09c95bb6411091b6c&cmd=1004&randnum=1&type=4&zonelist=1_3,5
	}
	
	public void groovyConveneintCS(Channel channel,CrossData data){
		int cmd = CrossConst.GROOVY_CONVENEINT_BY_ZID_CHECK_CS;
		LogTool.info("groovyConveneintCS", this);
		//服务端热更其他子服
		String port = PropertiesTools.getProperties("httpPort");
		//调用内测服热更事件
		String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=c122b8b3c37d09c09c95bb6411091b6c&cmd=1004&randnum=1&type=5");
		data.putObject(CrossEnum.data1, connect);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}
	
	public void getLogExceptiomByZIDListLC(Channel channel9999,CrossData data){
		int cmd = CrossConst.LOG_EXCEPTION_LC;
		Type jsonType = new TypeReference<List<Integer>>() {}.getType();
		List<Integer> zonelist = (List<Integer>) data.getObject(RedeployEnum.zonelist, jsonType);
		String name = (String) data.getObject(RedeployEnum.name, String.class);
		String logTime = (String) data.getObject(RedeployEnum.logTime, String.class);
		
		for(final int zoneid:zonelist){
			CrossData d2 = new CrossData();
			d2.putObject(RedeployEnum.name, name);
			d2.putObject(RedeployEnum.logTime, logTime);
			Channel zoneidChannel = CrossCache.getChannel(zoneid);
			NettyWrite.writeXData(zoneidChannel, CrossConst.LOG_EXCEPTION_TO_LOCAL_CL, d2,new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
//					CrossData crossData2 = new CrossData();
//					crossData2.putObject(RedeployEnum.type, type);
//					crossData2.putObject(CrossEnum.zoneid, zoneid);
//					crossData2.putObject(CrossEnum.result, rs);
					NettyWrite.writeXData(channel9999, CrossConst.LOG_EXCEPTION_RESULT_TO_9999_CL,crossData);
				}
			});
		}
	}
	
	public void getLogExceptionDataCL(Channel channel,CrossData data){
		int cmd = CrossConst.LOG_EXCEPTION_TO_LOCAL_CL;
		String name = (String) data.getObject(RedeployEnum.name, String.class);
		String logTime = (String) data.getObject(RedeployEnum.logTime, String.class);
		Map<String, Integer> logException = LogFunction.getLogException(name, logTime);
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.data1, logException);
		NettyWrite.writeCallbackData(channel, crossData, data.getCallbackCmd());
	}
	
	public void saveLogExceptionDataCL(Channel channel,CrossData data){
		int cmd = CrossConst.LOG_EXCEPTION_RESULT_TO_9999_CL;
		Map<String, Integer> result = (Map<String, Integer>) data.getObject(CrossEnum.data1, new TypeReference<Map<String, Integer>>(){}.getType());
		
		//统计
		Map<String, Integer> exceptionNumMap = LogCache.getExceptionNumMap();
		Set<Entry<String,Integer>> entrySet = result.entrySet();
		Iterator<Entry<String, Integer>> iterator = entrySet.iterator();
		while(iterator.hasNext()){
			Entry<String, Integer> next = iterator.next();
			String key = next.getKey();
			Integer num = next.getValue();
			
			Integer numAll = exceptionNumMap.get(key);
			if(numAll==null){
				exceptionNumMap.put(key, num);
			}else{
				exceptionNumMap.put(key, num+numAll);
			}
		}
		
		//最后收到结果的时间
		LogCache.setTimeLastNoteStr(TimeDateUtil.getCurrentDateTimeStr("yyyy-MM-dd_HH:mm:ss"));
		exceptionNumMap.put("LastTime::::::::"+ LogCache.getTimeLastNoteStr(), 0);
	}
	
	public void initExceptionNumCS(Channel channel,CrossData data){
		int cmd = CrossConst.LOG_EXCEPTION_CS;
		LogTool.info("initExceptionNumCS", this);
		String name = (String) data.getObject(RedeployEnum.name, String.class);
		String logTime = (String) data.getObject(RedeployEnum.logTime, String.class);
		String zonelist = (String) data.getObject(RedeployEnum.zonelist, String.class);
		//服务端热更其他子服
		String port = PropertiesTools.getProperties("httpPort");
		//调用内测服热更事件
		String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=611f5040a97b0e3bc9fea1195cc1e3d6&cmd=1006&randnum=1&type=5&name="+name+"&logTime="+logTime+"&zonelist="+zonelist);
		data.putObject(CrossEnum.data1, connect);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	public void getExceptionNumResultCS(Channel channel,CrossData data){
		int cmd = CrossConst.LOG_EXCEPTION_RESULT_CS;
		LogTool.info("getExceptionNumResultCS", this);
		//服务端热更其他子服
		String port = PropertiesTools.getProperties("httpPort");
		//调用内测服热更事件
		String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=611f5040a97b0e3bc9fea1195cc1e3d6&cmd=1006&randnum=1&type=6");
		data.putObject(CrossEnum.data1, connect);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}
}
