package com.teamtop.houtaiHttp;

import java.io.File;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.activityHandle.HoutaiActivity;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.backstage.BSUC;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.log.LogTool;

import io.netty.util.AttributeKey;
/**
 * 后台http缓存
 * @author Administrator
 *
 */
public class HouTaiHttpCache extends AbsServerEvent{
	//后台http功能缓存，key为cmd，value为功能事件对象
	private static HashMap<Integer, AbsHouTaiHttpEvent> houtaiMap = BSUC.reg("houtaiMap", new HashMap<Integer, AbsHouTaiHttpEvent>());
	//后台控制的日常活动缓存，key为系统id，value为后台日常活动时间信息对象
	private static ConcurrentHashMap<Integer, HoutaiActivity> houtaiActivity = BSUC.reg("houtaiActivity", new ConcurrentHashMap<Integer, HoutaiActivity>());
	
	public static AttributeKey<TempData> ATTR_KEY = new AttributeKey<TempData>("houttaihttpKey");
	
	/** 后台中央服缓存开关   区服id-> 开关->1开启 2关闭 */
	private static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Integer>> onOffCache= new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,Integer>>();
	
	/** 后台中央服 ios充值关卡数开启   区服id-> ios充值开启关卡数*/
	private static ConcurrentHashMap<Integer, Integer> iosRechargeGuanNum=new ConcurrentHashMap<Integer,Integer>();
	
	/**
	 * 后台http功能缓存，key为cmd，value为功能事件对象
	 * @return
	 */
	public static HashMap<Integer, AbsHouTaiHttpEvent> getHoutaiMap(){
		return houtaiMap;
	}
	/**
	 * 后台控制的日常活动缓存，key为系统id，value为后台日常活动时间信息对象
	 * @return
	 */
	public static ConcurrentHashMap<Integer, HoutaiActivity> getHoutaiActivity(){
		return houtaiActivity;
	}
	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Integer>> getOnOffCache() {
		return onOffCache;
	}
	
	public static ConcurrentHashMap<Integer, Integer> getIosRechargeGuanNum() {
		return iosRechargeGuanNum;
	}
	public static void loadXml() throws RunServerException{
		try {
			HashMap<Integer, AbsHouTaiHttpEvent> houtaiMap = getHoutaiMap();
			String realFile = FileUtils.getAbsFilePath("com/teamtop/houtaiHttp/HouTaiHttpEvents.xml");
			realFile = URLDecoder.decode(realFile,"utf-8");  
			File file = new File(realFile);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			for(Iterator<?> it = root.elementIterator("bean");it.hasNext();){
				bean = (Element) it.next();
				int cmd = Integer.parseInt(bean.attributeValue("cmd"));
				String className = bean.attributeValue("class");
				Class<?> clazz = Class.forName(className);
				Method method = clazz.getMethod("getIns");
				AbsHouTaiHttpEvent event = (AbsHouTaiHttpEvent) method.invoke(null);
				houtaiMap.put(cmd, event);
			}
		} catch (Exception e) {
			throw new RunServerException(e, "readConfig exception");
		}
	}


	@Override
	public void startServer() throws RunServerException {
		loadXml();

		if (GameProperties.isHoutaiServer()) {
			String content = null;
			try {
				content = GlobalCache.getGlobalData(GlobalConst.ON_OFF_HOUTAI).getContent();
				if (content == null || content.equals("") || content.equals("{}")) {
					onOffCache = new ConcurrentHashMap<>();
				} else {
					Type classType = new TypeReference<ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Integer>>>() {
					}.getType();
					onOffCache = JSONObject.parseObject(content, classType);
				}
			} catch (Exception e) {
				LogTool.error(e, this, "HouTaiHttpCache startServer onOffCache content:" + content);
			}
			
			
			content = null;
			try {
				content = GlobalCache.getGlobalData(GlobalConst.IOS_RECHARGENUM_HOUTAI).getContent();
				if (content == null || content.equals("") || content.equals("{}")) {
					iosRechargeGuanNum = new ConcurrentHashMap<>();
				} else {
					Type classType = new TypeReference<ConcurrentHashMap<Integer, Integer>>() {
					}.getType();
					iosRechargeGuanNum = JSONObject.parseObject(content, classType);
				}
			} catch (Exception e) {
				LogTool.error(e, this, "HouTaiHttpCache startServer iosRechargeGuanNum content:" + content);
			}
			
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		updateOnOffModel();
		updateIosRechargeNum();
	}

	public static void updateOnOffModel() {
		if (GameProperties.isHoutaiServer()) {
			String content = null;
			try {
				GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ON_OFF_HOUTAI);
				content = JSON.toJSONString(onOffCache);
				globalData.setContent(content);
				GlobalCache.doSync(globalData);
			} catch (Exception e) {
				LogTool.error(e, HeroCache.class, "updateOnOffModel content:" + content);

			}
		}
	}
	
	public static void updateIosRechargeNum() {
		if (GameProperties.isHoutaiServer()) {
			String content = null;
			try {
				GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.IOS_RECHARGENUM_HOUTAI);
				content = JSON.toJSONString(iosRechargeGuanNum);
				globalData.setContent(content);
				GlobalCache.doSync(globalData);
			} catch (Exception e) {
				LogTool.error(e, HeroCache.class, "updateIosRechargeNum content:" + content);

			}
		}
	}
}
