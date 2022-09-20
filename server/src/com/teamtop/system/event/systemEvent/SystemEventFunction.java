package com.teamtop.system.event.systemEvent;

import java.io.File;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.forbid.ForbidCache;
import com.teamtop.forbid.ForbidEventRec;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.pf.PfConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.system.godGenSendGift.GodGenSendGiftEvent;
import com.teamtop.system.guanqia.GuanqiaConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.util.common.CollectionUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.exector.Fixtime;
import com.teamtop.util.exector.FixtimeRecord;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xitong_001;
import excel.struct.Struct_xitong_001;

/**
 * 角色事件<br/>
 * 包括登陆事件、登出事件、升级事件
 * 
 * @author Administrator
 * 
 */
public class SystemEventFunction extends AbsServerEvent{
	public static final Logger logger = LoggerFactory.getLogger(SystemEventFunction.class);
	/** 是否正在零点处理  true 是  false  否 */
	public static volatile boolean  isZeroHanlder = false;
	/**
	 * 初始化事件数组集合
	 */
	public static ISystemEvent[] initEvents = null;
	/**
	 * 平台相关_初始化事件集合 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_initEvents = new HashMap<String, ISystemEvent[]>();
	/**
	 * openNewGeneral事件数组集合
	 */
	public static ISystemEvent[] openNewGeneralEvents = null;
	/**
	 * 平台相关_openNewGeneral事件集合 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_openNewGeneral = new HashMap<String, ISystemEvent[]>();
	/**
	 * 登录事件数组集合
	 */
	public static ISystemEvent[] loginEvents = null;
	/**
	 * 平台相关_登录事件数组集合 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_loginEvents = new HashMap<String, ISystemEvent[]>();
	/**
	 * 当天首次登陆事件数组集合
	 */
	public static ISystemEvent[] loginResetEvents = null;
	/**
	 * 平台相关_当天首次登陆事件数组集合 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_loginResetEvents = new HashMap<String, ISystemEvent[]>();

	/**
	 * 登录后事件数组集合
	 */
	public static ISystemEvent[] afterLoginEvents = null;
	/**
	 * 平台相关_登录后事件数组集合 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_afterLoginEvents = new HashMap<String, ISystemEvent[]>();

	/**
	 * 登出事件数组集合
	 */
	public static ISystemEvent[] logoutEvents = null;
	/**
	 * 平台相关_登出事件数组集合 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_logoutEvents = new HashMap<String, ISystemEvent[]>();

	/**
	 * 定时同步数据库事件数组集合
	 */
	public static ISystemEvent[] syncEvents = null;
	/**
	 * 平台相关_定时同步数据库事件数组集合 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_syncEvents = new HashMap<String, ISystemEvent[]>();

	/**
	 * 升级事件数组集合
	 */
	public static Map<Integer,List<ISystemEvent>> levelUpMap = new HashMap<Integer, List<ISystemEvent>>();

	/**
	 * 平台相关_升级事件数组集合 key:pf value:对应事件集合
	 */
	public static Map<String, Map<Integer, List<ISystemEvent>>> pf_levelUpEvents = new HashMap<String, Map<Integer, List<ISystemEvent>>>();

	/**
	 * 通关关卡事件数组集合
	 */
	public static Map<Integer, List<ISystemEvent>> passGuanqiaMap = new HashMap<Integer, List<ISystemEvent>>();

	/**
	 * 平台相关_通关关卡事件数组集合 key:pf value:对应事件集合
	 */
	public static Map<String, Map<Integer, List<ISystemEvent>>> pf_passGuanqiaEvents = new HashMap<String, Map<Integer, List<ISystemEvent>>>();

	/**
	 * 登出同步事件
	 */
	public static ISystemEvent[] logoutSyncPubEvents = null;
	/**
	 * 挤下线事件数组集合
	 */
	public static ISystemEvent[] extrusionLineEvents = null;
	/**
	 * 平台相关_挤下线事件数组集合 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_extrusionLineEvents = new HashMap<String, ISystemEvent[]>();
	/**
	 * 定时处理事件集合 个人
	 */
	public static ISystemEvent[] handleQuartzSingleEvents = null;
	/**
	 * 平台相关_定时处理事件集合 个人 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_handleQuartzSingleEvents = new HashMap<String, ISystemEvent[]>();
	/**
	 * 定时处理公共活动集合
	 */
	public static ISystemEvent[] handleQuartzBatchEvents = null;
	/**
	 * 平台相关_定时处理公共活动集合 key:pf value:对应事件集合
	 */
	public static Map<String, ISystemEvent[]> pf_handleQuartzBatchEvents = new HashMap<String, ISystemEvent[]>();
	/**
	 * 定时处理活动集合FixtimeRecord 时间集合 ISystemEvent 事件类
	 */
	public static Map<FixtimeRecord, Fixtime[]> hanleQuartzFixtimeEvents = new HashMap<FixtimeRecord, Fixtime[]>();
	/**
	 * 事件的系统id集合，key为事件类名，value为系统id
	 */
	public static Map<ISystemEvent, Integer> eventFunctionIds = new HashMap<ISystemEvent, Integer>();
	
	public static void readConfig(File file,String pf) throws RunServerException {
		try {
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			List<ISystemEvent> init = new ArrayList<ISystemEvent>();
			List<ISystemEvent> login = new ArrayList<ISystemEvent>();
			List<ISystemEvent> loginReset = new ArrayList<ISystemEvent>();
			List<ISystemEvent> sync = new ArrayList<ISystemEvent>();
//			Map<Integer,List<ISystemEvent>> levelUp = new HashMap<Integer,List<ISystemEvent>>();
			List<ISystemEvent> afterLogin = new ArrayList<ISystemEvent>();
			List<ISystemEvent> logout = new ArrayList<ISystemEvent>();
			List<ISystemEvent> extrusionLine = new ArrayList<ISystemEvent>();
			List<ISystemEvent> zeroHero = new ArrayList<ISystemEvent>();
			List<ISystemEvent> zeroPub = new ArrayList<ISystemEvent>();
			List<ISystemEvent> logoutSyncPub = new ArrayList<ISystemEvent>();
			for (Iterator<?> it = root.elementIterator("bean"); it.hasNext();) {
				bean = (Element) it.next();
				String className = bean.attributeValue("class");
				Class<?> clazz = Class.forName(className);
				ForbidEventRec validateEvent = ForbidCache.validateEvent(clazz);
				Method method = clazz.getDeclaredMethod("getIns");
				ISystemEvent event = (ISystemEvent) method.invoke(null);
				//事件类对应的系统id，用于系统开启的等级限制
				String funid = bean.attributeValue("funid");
				if(funid != null && !"".equals(funid) && Integer.parseInt(funid) != 0){
//					String simpleName = event.getClass().getSimpleName();
					eventFunctionIds.put(event, Integer.parseInt(funid));
				}
				List<String> unForbidFun = null;
				if(validateEvent!=null){
					unForbidFun = validateEvent.getUnForbidFun();
					if(CollectionUtil.isEmpty(unForbidFun)){
						logger.info("forbid clazz:"+clazz);
						continue;//被屏蔽的事件类
					}
				}
				List<?> elements = bean.elements();
				int size = elements.size();
				for (int i = 0; i < size; i++) {
					Element property = (Element) elements.get(i);
					String methodStr = property.attributeValue("method");
					pf = bean.attributeValue("pf");
					if(unForbidFun!=null && !unForbidFun.contains(methodStr)){
						logger.info("forbid clazz event,method:"+methodStr+",clazz:"+clazz);
						continue;
					}
					if ("init".equals(methodStr)) {
						init.add(event);
					} else if ("login".equals(methodStr)) {
						login.add(event);
					} else if ("loginReset".equals(methodStr)) {
						loginReset.add(event);
					} else if ("sync".equals(methodStr)) {
						sync.add(event);
					} else if ("levelUp".equals(methodStr)) {
						registerLevelUp(pf, property, event);
					} else if ("afterLogin".equals(methodStr)) {
						afterLogin.add(event);
					} else if ("logout".equals(methodStr)) {
						logout.add(event);
					} else if ("extrusionLine".equals(methodStr)) {
						extrusionLine.add(event);
					} else if ("zeroHero".equals(methodStr)) {
						zeroHero.add(event);
					} else if ("zeroPub".equals(methodStr)) {
						zeroPub.add(event);
					} else if ("logoutSyncPub".equals(methodStr)) {
						logoutSyncPub.add(event);
					} else if ("fixtimeSyncPub".equals(methodStr)) {
//						addFixtime(property, event);
						regFixtimeSyncPub(property, event);
					} else if ("fixTime".equals(methodStr)) {
//						fixtime.add(event);
						addFixtime(property, event);
					} else if ("passGuanqia".equals(methodStr)) {
						registerPassGuanqia(pf, property, event);
					} else {
						throw new RunServerException(null, "read system event xml exception,method not match:" + methodStr);
					}
				}
			}
			ISystemEvent[] initEvents = new ISystemEvent[init.size()];
			init.toArray(initEvents);
			
			ISystemEvent[] loginEvents = new ISystemEvent[login.size()];
			login.toArray(loginEvents);

			ISystemEvent[] loginResetEvents = new ISystemEvent[loginReset.size()];
			loginReset.toArray(loginResetEvents);

			ISystemEvent[] syncEvents = new ISystemEvent[sync.size()];
			sync.toArray(syncEvents);

			ISystemEvent[] afterLoginEvents = new ISystemEvent[afterLogin.size()];
			afterLogin.toArray(afterLoginEvents);

			ISystemEvent[] logoutEvents = new ISystemEvent[logout.size()];
			logout.toArray(logoutEvents);

			ISystemEvent[] extrusionLineEvents = new ISystemEvent[extrusionLine.size()];
			extrusionLine.toArray(extrusionLineEvents);

			ISystemEvent[] handleQuartzSingleEvents = new ISystemEvent[zeroHero.size()];
			zeroHero.toArray(handleQuartzSingleEvents);

			ISystemEvent[] handleQuartzBatchEvents = new ISystemEvent[zeroPub.size()];
			zeroPub.toArray(handleQuartzBatchEvents);
			
			ISystemEvent[] logoutSyncPubEvents = new ISystemEvent[logoutSyncPub.size()];
			logoutSyncPub.toArray(logoutSyncPubEvents);
			
			if(pf==null){
				SystemEventFunction.initEvents = initEvents;
				SystemEventFunction.loginEvents = loginEvents;
				SystemEventFunction.loginResetEvents = loginResetEvents;
				SystemEventFunction.syncEvents = syncEvents;
				SystemEventFunction.afterLoginEvents = afterLoginEvents;
				SystemEventFunction.logoutEvents = logoutEvents;
				SystemEventFunction.extrusionLineEvents = extrusionLineEvents;
				SystemEventFunction.handleQuartzSingleEvents = handleQuartzSingleEvents;
				SystemEventFunction.handleQuartzBatchEvents = handleQuartzBatchEvents;
				SystemEventFunction.logoutSyncPubEvents = logoutSyncPubEvents;
			}else{
				SystemEventFunction.pf_initEvents.put(pf, initEvents);
				SystemEventFunction.pf_loginEvents.put(pf, loginEvents);
				SystemEventFunction.pf_loginResetEvents.put(pf, loginResetEvents);
				SystemEventFunction.pf_syncEvents.put(pf, syncEvents);
				SystemEventFunction.pf_afterLoginEvents.put(pf, afterLoginEvents);
				SystemEventFunction.pf_logoutEvents.put(pf, logoutEvents);
				SystemEventFunction.pf_extrusionLineEvents.put(pf, extrusionLineEvents);
				SystemEventFunction.pf_handleQuartzSingleEvents.put(pf, handleQuartzSingleEvents);
				SystemEventFunction.pf_handleQuartzBatchEvents.put(pf, handleQuartzBatchEvents);
			}
		} catch (Exception e) {
			throw new RunServerException(e, "readConfig exception");
		}
	}
	
	public static void readConfig(File file) throws RunServerException {
		try {
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			Map<String,List<ISystemEvent>> init = new HashMap<String, List<ISystemEvent>>();
			Map<String,List<ISystemEvent>> login = new HashMap<String, List<ISystemEvent>>();
			Map<String,List<ISystemEvent>> loginReset = new HashMap<String, List<ISystemEvent>>();
			Map<String,List<ISystemEvent>> sync = new HashMap<String, List<ISystemEvent>>();
//			Map<Integer,List<ISystemEvent>> levelUp = new HashMap<Integer,List<ISystemEvent>>();
			Map<String,List<ISystemEvent>> afterLogin = new HashMap<String, List<ISystemEvent>>();
			Map<String,List<ISystemEvent>> logout = new HashMap<String, List<ISystemEvent>>();
			Map<String,List<ISystemEvent>> extrusionLine = new HashMap<String, List<ISystemEvent>>();
			Map<String,List<ISystemEvent>> zeroHero = new HashMap<String, List<ISystemEvent>>();
			Map<String,List<ISystemEvent>> zeroPub = new HashMap<String, List<ISystemEvent>>();
			Map<String,List<ISystemEvent>> logoutSyncPub = new HashMap<String, List<ISystemEvent>>();
			for (Iterator<?> it = root.elementIterator("bean"); it.hasNext();) {
				bean = (Element) it.next();
				String className = bean.attributeValue("class");
				Class<?> clazz = Class.forName(className);
				ForbidEventRec validateEvent = ForbidCache.validateEvent(clazz);
				Method method = clazz.getDeclaredMethod("getIns");
				ISystemEvent event = (ISystemEvent) method.invoke(null);
				//事件类对应的系统id，用于系统开启的等级限制
				String funid = bean.attributeValue("funid");
				String pf = bean.attributeValue("pf");
				if(pf == null) pf = "PF_ALL";
				if(funid != null && !"".equals(funid) && Integer.parseInt(funid) != 0){
//					String simpleName = event.getClass().getSimpleName();
					eventFunctionIds.put(event, Integer.parseInt(funid));
				}
				List<String> unForbidFun = null;
				if(validateEvent!=null){
					unForbidFun = validateEvent.getUnForbidFun();
					if(CollectionUtil.isEmpty(unForbidFun)){
						logger.info("forbid clazz:"+clazz);
						continue;//被屏蔽的事件类
					}
				}
				List<?> elements = bean.elements();
				int size = elements.size();
				for (int i = 0; i < size; i++) {
					Element property = (Element) elements.get(i);
					String methodStr = property.attributeValue("method");
					if(unForbidFun!=null && !unForbidFun.contains(methodStr)){
						logger.info("forbid clazz event,method:"+methodStr+",clazz:"+clazz);
						continue;
					}
					if ("init".equals(methodStr)) {
						getPfEventList(pf, init, event);
					} else if ("login".equals(methodStr)) {
						getPfEventList(pf, login, event);
					} else if ("loginReset".equals(methodStr)) {
						getPfEventList(pf, loginReset, event);
					} else if ("sync".equals(methodStr)) {
						getPfEventList(pf, sync, event);
					} else if ("levelUp".equals(methodStr)) {
						registerLevelUp(pf, property, event);
					} else if ("afterLogin".equals(methodStr)) {
						getPfEventList(pf, afterLogin, event);
					} else if ("logout".equals(methodStr)) {
						getPfEventList(pf, logout, event);
					} else if ("extrusionLine".equals(methodStr)) {
						getPfEventList(pf, extrusionLine, event);
					} else if ("zeroHero".equals(methodStr)) {
						getPfEventList(pf, zeroHero, event);
					} else if ("zeroPub".equals(methodStr)) {
						getPfEventList(pf, zeroPub, event);
					} else if ("logoutSyncPub".equals(methodStr)) {
						getPfEventList("PF_ALL", logoutSyncPub, event);
					} else if ("fixtimeSyncPub".equals(methodStr)) {
//						addFixtime(property, event);
						regFixtimeSyncPub(property, event);
					} else if ("fixTime".equals(methodStr)) {
//						fixtime.add(event);
						addFixtime(property, event);
					} else if ("passGuanqia".equals(methodStr)) {
						registerPassGuanqia(pf, property, event);
					} else {
						throw new RunServerException(null, "read system event xml exception,method not match:" + methodStr);
					}
				}
				
			}
			SystemEventFunction.initEvents = addPfEvent(init, pf_initEvents);
			SystemEventFunction.loginEvents = addPfEvent(login, pf_loginEvents);
			SystemEventFunction.loginResetEvents = addPfEvent(loginReset, pf_loginResetEvents);
			SystemEventFunction.afterLoginEvents = addPfEvent(afterLogin, pf_afterLoginEvents);
			SystemEventFunction.logoutEvents = addPfEvent(logout, pf_logoutEvents);
			SystemEventFunction.syncEvents = addPfEvent(sync, pf_syncEvents);
			SystemEventFunction.logoutSyncPubEvents = addPfEvent(logoutSyncPub, null);
			SystemEventFunction.handleQuartzSingleEvents = addPfEvent(zeroHero, pf_handleQuartzSingleEvents);
			SystemEventFunction.handleQuartzBatchEvents = addPfEvent(zeroPub, pf_handleQuartzBatchEvents);
			SystemEventFunction.extrusionLineEvents = addPfEvent(extrusionLine, pf_extrusionLineEvents);
		} catch (Exception e) {
			throw new RunServerException(e, "readConfig exception");
		}
	}
	
	public static void getPfEventList(String pf,Map<String,List<ISystemEvent>> map,ISystemEvent event) throws RunServerException {
		String[] pfSplit = pf.split(PfConst.SPLIT_PF);
		for(String pstr:pfSplit) {
			String p = (String)ServerEventFunction.getClassKey(pstr,"com.teamtop.pf.PfConst");
			List<ISystemEvent> list = map.get(p);
			if(list == null) {
				list = new ArrayList<ISystemEvent>();
				map.put(p, list);
			}
			list.add(event);
		}
	}
	
	/**
	 * 添加平台事件
	 * @author lobbyer
	 * @param list
	 * @param pf
	 * @param map
	 * @return 
	 * @date 2016年5月23日
	 */
	public static ISystemEvent[] addPfEvent(Map<String,List<ISystemEvent>> listMap, Map<String, ISystemEvent[]> map) {
		ISystemEvent[] allEvent = null;
		for(String pf:listMap.keySet()) {
			List<ISystemEvent> list = listMap.get(pf);
			if(list == null) list = new ArrayList<ISystemEvent>();
			ISystemEvent[] initEvents = new ISystemEvent[list.size()];
			list.toArray(initEvents);
			if(pf.equals(PfConst.PF_ALL)) {
				allEvent = initEvents;
			}else{
				if(map == null)
					allEvent = initEvents;
				else
					map.put(pf, initEvents);
			}
		}
		if(allEvent==null) allEvent = new ISystemEvent[0];
		return allEvent;
	}
	
	public static void regFixtimeSyncPub(Element property,ISystemEvent event){
		String gap = property.attributeValue("gap");
		//starttime="0011" time="g5_1,g8_2,g10_3,g60_4,d0000_5"
		String[] times = new String[]{"g"+gap};
		Integer starttime = Integer.parseInt("0000");
		addFixtime(times, starttime, null, null, 2, event);
	}
	/**
	 * 注册升级处理事件
	 * 注：此方法注册只限于 level= int 或者 all 的情况 且 int <130 >0
	 * @param elements
	 */
	public static void registerLevelUp(String pf,Element property,ISystemEvent event){
		String level = property.attributeValue("level");
		String funId = property.attributeValue("funid");
		if(StringUtils.equals(level, "all")){
			int maxLevel = HeroFunction.getIns().getHeroMaxLevel();
			for (int j = 1; j <= maxLevel; j++) {
				addToLvUpEventList(pf, j, event);
			}
		}else if(StringUtils.indexOf(level,"_")>0){
			registerMatriLevelUp(pf,level,event);
		}else if(StringUtils.equals(level,"gap")){
			registerGapLevelUp(pf,property,event);
		}else if(StringUtils.isNumeric(level)){
			addToLvUpEventList(pf,CommonUtil.transforObjtoInt(level), event);
		}else if(StringUtils.isNumeric(funId)){
			int funIdInt = Integer.parseInt(funId);
			Struct_xitong_001 excel = Config_xitong_001.getIns().get(funIdInt);
			if(excel!=null&& excel.getServer()!=null) {
				int[][] server = excel.getServer();
				int typeExcel = server[0][0];
				int levelExcel = server[0][1];
				if(typeExcel==3) {
					addToLvUpEventList(pf, levelExcel, event);
					return;
				}
			}
			addToLvUpEventList(pf, 1, event);
		}
	}
	
	/**
	 * 注册同一事件多等级触发事件
	 * @param className
	 * @param Level
	 */
	public static void registerMatriLevelUp(String pf,String level,ISystemEvent event){
		String[] levels = level.split("_");
		for(String l:levels){
			addToLvUpEventList(pf,Integer.valueOf(l), event);
		}
	}
	/**
	 * 注册间隔等级触发事件
	 * @param className
	 * @param property
	 */
	public static void registerGapLevelUp(String pf,Element property,ISystemEvent event){
		String startLevel = property.attributeValue("startLevel");
		String endLevel = property.attributeValue("endLevel");
		String gapLevel = property.attributeValue("gapLevel");
		int i = Integer.parseInt(startLevel);
		int size = Integer.parseInt(endLevel);
		int gap = Integer.parseInt(gapLevel);
		for(;i<=size;i+=gap){
			addToLvUpEventList(pf, i, event);
		}
	}
	public static void addToLvUpEventList(String pf,int level,ISystemEvent event){
		String[] pfSplit = pf.split(PfConst.SPLIT_PF);
		for(String pstr:pfSplit) {
			try {
				String p = (String)ServerEventFunction.getClassKey(pstr,"com.teamtop.pf.PfConst");
				List<ISystemEvent> list = null;
				Map<Integer, List<ISystemEvent>> map = null;
				if(p.equals(PfConst.PF_ALL)) {
					map = levelUpMap;
					list = levelUpMap.get(level);
				}else{
					map = pf_levelUpEvents.get(p);
					if(map == null) {
						map = new HashMap<Integer, List<ISystemEvent>>();
						pf_levelUpEvents.put(p, map);
					}
					list = map.get(level);
				}
				if(list==null){
					list = new ArrayList<ISystemEvent>(10);
				}
				list.add(event);
				map.put(level, list);
			} catch (RunServerException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 注册通关关卡处理事件
	 * 注：此方法注册只限于 level= int 或者 all 的情况 且 int  >0
	 * @param elements
	 */
	public static void registerPassGuanqia(String pf, Element property, ISystemEvent event) {
		String curGuanqia = property.attributeValue("curGuanqia");
		String funId = property.attributeValue("funid");
		if (StringUtils.equals(curGuanqia, "all")) {
			for (int j = 1; j <= GuanqiaConst.MAX_GUANQIA_NUM; j++) {
				addToPassGuanqiaEventList(pf, j, event);
			}
		} else if (StringUtils.indexOf(curGuanqia, "_") > 0) {
			registerMatriPassGunaqia(pf, curGuanqia, event);
		} else if (StringUtils.isNumeric(curGuanqia)) {
			addToPassGuanqiaEventList(pf, CommonUtil.transforObjtoInt(curGuanqia), event);
		} else if (StringUtils.isNumeric(funId)) {
			Struct_xitong_001 op = Config_xitong_001.getIns().get(CommonUtil.transforObjtoInt(funId));
			int[][] open = op.getServer();
			int guanqia = 0;
			for (int[] info : open) {
				if (info[0] == 1) {
					guanqia = info[1];
					break;
				}
			}
			addToPassGuanqiaEventList(pf, guanqia, event);
		}
	}

	/**
	 * 注册同一事件多关卡触发事件
	 * 
	 * @param className
	 * @param Level
	 */
	public static void registerMatriPassGunaqia(String pf, String guanqia, ISystemEvent event) {
		String[] guanqias = guanqia.split("_");
		for (String l : guanqias) {
			addToPassGuanqiaEventList(pf, Integer.valueOf(l), event);
		}
	}

	public static void addToPassGuanqiaEventList(String pf, int curGuanqia, ISystemEvent event) {
		String[] pfSplit = pf.split(PfConst.SPLIT_PF);
		for (String pstr : pfSplit) {
			try {
				String p = (String) ServerEventFunction.getClassKey(pstr, "com.teamtop.pf.PfConst");
				List<ISystemEvent> list = null;
				Map<Integer, List<ISystemEvent>> map = null;
				if (p.equals(PfConst.PF_ALL)) {
					map = passGuanqiaMap;
					list = passGuanqiaMap.get(curGuanqia);
				} else {
					map = pf_passGuanqiaEvents.get(p);
					if (map == null) {
						map = new HashMap<Integer, List<ISystemEvent>>();
						pf_passGuanqiaEvents.put(p, map);
					}
					list = map.get(curGuanqia);
				}
				if (list == null) {
					list = new ArrayList<ISystemEvent>(10);
				}
				list.add(event);
				map.put(curGuanqia, list);
			} catch (RunServerException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 添加定时事件
	 * @param property
	 * @param event
	 */
	public static void addFixtime(Element property, ISystemEvent event) {
		String timeStr = property.attributeValue("time");
		if(timeStr == null) return;
		String[] times = timeStr.split(",");
		String attributeValue = property.attributeValue("starttime");
		Integer starttime;
		if(attributeValue == null){
			starttime = null;
		}else{
			starttime = Integer.parseInt(attributeValue);
		}
		String endtimeValue = property.attributeValue("endtime");
		Integer endtime;
		if (endtimeValue == null) {
			endtime = null;
		} else {
			endtime = Integer.parseInt(endtimeValue);
		}
		String opWeekValue = property.attributeValue("opweek");
		Set<Integer> opWeekSet;
		if (opWeekValue == null) {
			opWeekSet = null;
		} else {
			String[] weeks = opWeekValue.split(",");
			opWeekSet = new HashSet<>();
			for(String week : weeks) {
				opWeekSet.add(Integer.parseInt(week));
			}
		}
		addFixtime(times, starttime, endtime, opWeekSet, 1, event);
	}
	
	public static void addFixtime(String[] times, Integer starttime, Integer endtime, Set<Integer> opWeekSet, int fixType,
			ISystemEvent event) {
		for(String time:times){
			int cmd = 0;
			String[] timeAndCmd = new String[]{time};
			if(time.indexOf("_") >= 0) {
				timeAndCmd = time.split("_");
				cmd = Integer.parseInt(timeAndCmd[1]);
			}
			FixtimeRecord record = transStrToRecord(timeAndCmd[0], starttime);
			Fixtime[] fixtimes = hanleQuartzFixtimeEvents.get(record);
			Fixtime fixtime = new Fixtime();
			fixtime.setEvent(event);
			fixtime.setCmd(cmd);
			fixtime.setFixType(fixType);
			if (starttime != null) {
				fixtime.setStarttime(starttime);
			}
			if (endtime != null) {
				fixtime.setEndtime(endtime);
			}
			if (opWeekSet != null) {
				fixtime.setOpWeekSet(opWeekSet);
			}
			Fixtime[] newFixtimes;
			if(fixtimes == null) {
				newFixtimes = new Fixtime[]{fixtime};
			}else{
				int len = fixtimes.length;
				newFixtimes = new Fixtime[len + 1];
				System.arraycopy(fixtimes, 0, newFixtimes, 0, len);
				newFixtimes[len] = fixtime;
			}
			hanleQuartzFixtimeEvents.put(record, newFixtimes);
		}
	}
	
	/**
	 * 将string 转换为FixtimeRecord对象
	 * @param time
	 * @return
	 */
	public static FixtimeRecord transStrToRecord(String time, Integer startTime) {
		int curTime = TimeDateUtil.getCurrentTime();
		FixtimeRecord record = new FixtimeRecord();
		int type = 0;
		int opTime = 0;
		if(time.startsWith("g")) {//每隔多久
			type = 1;
			int gapTime = Integer.parseInt(time.substring(1));
			record.setType(type);
			record.setTime(gapTime);
			int oneTime = TimeDateUtil.getOneTime(0, startTime==null?0:startTime/100, startTime==null?0:startTime%100, 0);
			int tempTime = (curTime - oneTime) % (gapTime * TimeDateUtil.ONE_MINUTE);
			if(tempTime > 0){
				opTime = curTime - tempTime + gapTime * TimeDateUtil.ONE_MINUTE;
			}else {
				opTime = oneTime;
			}
			record.setOpTime(opTime);
		}else if(time.startsWith("d")) {//每天
			type = 2;
			int dayTime = Integer.parseInt(time.substring(1));
			record.setType(type);
			record.setTime(dayTime);
			opTime = TimeDateUtil.getOneTime(0, dayTime/100, dayTime%100, 0);
			if(curTime > opTime){
				opTime = opTime + TimeDateUtil.ONE_DAY_INT;
			}
			record.setOpTime(opTime);
		}else if(time.startsWith("w")) {//每周
			type = 3;
			int week = Integer.parseInt(String.valueOf(time.charAt(1)));
			int dayTime = Integer.parseInt(time.substring(2));
			record.setType(type);
			record.setTime(dayTime);
			record.setWeek(week);
			opTime = TimeDateUtil.getWeekOneTime(week, dayTime/100, dayTime%100, 0);
			if(curTime > opTime){
				opTime = opTime + TimeDateUtil.ONE_DAY_INT * 7;
			}
			record.setOpTime(opTime);
		}else if(time.startsWith("y")) {//每年
			type = 4;
			int dayTime = Integer.parseInt(time.substring(1));
			record.setType(type);
			record.setTime(dayTime);
			int md = dayTime / 10000; //月日
			int hm = dayTime % 10000; //时分
			opTime = TimeDateUtil.getYearOneTime(0, md/100, md%100, hm/100, hm%100, 0);
			if(curTime > opTime){
				opTime = TimeDateUtil.getYearOneTime(1, md/100, md%100, hm/100, hm%100, 0);
			}
			record.setOpTime(opTime);
		}
		return record;
		
	}
	/**
	 * 开启新英雄时触发各个系统的处理
	 * 
	 * @param hero
	 *            角色
	 */
	public static void triggerOpenNewGeneralEvent(Hero hero,int job) {
		for (ISystemEvent event : openNewGeneralEvents) {
			try {
				if (event != null) {
					event.openNewGeneral(hero, job);
				}
			} catch (Exception e) {
				logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "init exception"));
			}
		}
		ISystemEvent[] events = pf_openNewGeneral.get(hero.getLoginPf());
		if(events!=null){
			for (ISystemEvent event : events) {
				try {
					if (event != null) {
						event.openNewGeneral(hero, job);
					}
				} catch (Exception e) {
					logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "init exception"));
				}
			}
		}
	}
	/**
	 * 登陆时触发各个系统的处理
	 * 
	 * @param hero
	 *            角色
	 */
	public static void triggerInitEvent(Hero hero) {
		for (ISystemEvent event : initEvents) {
			try {
				if (event != null) {
					event.init(hero);
				}
			} catch (Exception e) {
				logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "init exception"));
			}
		}
		ISystemEvent[] events = pf_initEvents.get(hero.getLoginPf());
		if(events!=null){
			for (ISystemEvent event : events) {
				try {
					if (event != null) {
						event.init(hero);
					}
				} catch (Exception e) {
					logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "init exception"));
				}
			}
		}
	}

	/**
	 * 登陆时触发各个系统的处理
	 * 
	 * @param hero
	 *            角色
	 */
	public static void triggerLoginEvent(Hero hero) {
		for (ISystemEvent event : loginEvents) {
			try {
				if (event != null) {
					event.login(hero);
				}
			} catch (Exception e) {
				logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "login exception"));
			}
		}
		ISystemEvent[] events = pf_loginEvents.get(hero.getLoginPf());
		if(events!=null){
			for (ISystemEvent event : events) {
				try {
					if (event != null) {
						event.login(hero);
					}
				} catch (Exception e) {
					logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "login exception"));
				}
			}
		}
	}
	/**
	 * 登陆时触发各个系统的处理
	 * 
	 * @param hero
	 *            角色
	 */
	public static void triggerLoginResetEvent(Hero hero) {
		int zeroTime = hero.getZeroTime();
		int now = TimeDateUtil.getCurrentTime();
		if(TimeDateUtil.isLessTodayZeroTime(zeroTime)){
			if(loginResetEvents != null){
				for (ISystemEvent event : loginResetEvents) {
					try {
						if (event != null) {
							Integer funid = eventFunctionIds.get(event);
							if (funid != null && !HeroFunction.getIns().checkSystemOpenZero(hero, funid)) {
//								logger.info(LogTool.getmsg(hero.getId(),hero.getNameZoneid(),"zero hero level limit:"+event.getClass().getSimpleName()));
								//特殊处理
								if(funid==5604) {
									GodGenSendGiftEvent.getIns().loginReset(hero, now);
								}
								continue;
							}
							event.loginReset(hero,now);
						}
					} catch (Exception e) {
						logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "login exception"));
					}
				}
			}
			if(pf_loginResetEvents!=null){
				//所有平台执行上线重置
				for(ISystemEvent[] eventArr : pf_loginResetEvents.values()) {
					for (ISystemEvent event : eventArr) {
						try {
							if (event != null) {
								event.loginReset(hero,now);
							}
						} catch (Exception e) {
							logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "login exception"));
						}
					}
				}
			}
			hero.setZeroTime(TimeDateUtil.getCurrentTime());
		}
	}
	/**
	 * 登陆后触发各个系统的处理
	 * 
	 * @param hero
	 *            角色
	 */
	public static void triggerAfterLoginEvent(Hero hero) {
		if(afterLoginEvents!=null){
			for (ISystemEvent event : afterLoginEvents) {
				try {
					if (event != null) {
						event.afterLogin(hero);
					}
				} catch (Exception e) {
					logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "afterLogin exception"));
				}
			}
		}
		if(pf_afterLoginEvents!=null){
			ISystemEvent[] events = pf_afterLoginEvents.get(hero.getLoginPf());
			if(events!=null){
				for (ISystemEvent event : events) {
					try {
						if (event != null) {
							event.afterLogin(hero);
						}
					} catch (Exception e) {
						logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "afterLogin exception"));
					}
				}
			}
		}
	}

	/**
	 * 登出时触发各个系统的处理 关闭服务器的时候不执行LightHeroEvent登出事件
	 * 
	 * @param hero
	 *            角色
	 * @param isShutDown
	 *            关闭服务器标示
	 */
	public static void triggerLogoutEvent(Hero hero, boolean isShutDown) {
		if(logoutEvents!=null){
			for (ISystemEvent event : logoutEvents) {
				try {
					if (event != null) {
						event.logout(hero);
					}
				} catch (Exception e) {
					logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "triggerLogoutEvent exception"));
				}
			}
		}
		if(pf_logoutEvents!=null){
			ISystemEvent[] events = pf_logoutEvents.get(hero.getLoginPf());
			if(events!=null){
				for (ISystemEvent event : events) {
					try {
						if (event != null) {
							event.logout(hero);
						}
					} catch (Exception e) {
						logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "triggerLogoutEvent exception"));
					}
				}
			}
		}
	}

	/**
	 * 是否需要执行
	 * 
	 * @param event
	 * @param isShutDown
	 * @return true 需要执行 false 不需要
	 */
	@SuppressWarnings("unused")
	public static boolean isRun(ISystemEvent event, boolean isShutDown) {
		/*
		 * return !(event==null|| ((event instanceof
		 * LightHeroEvent)&&isShutDown));
		 */
		return isShutDown;
	}

	/**
	 * 角色下线保存角色数据(跟角色相关的数据，如hero equip friend mountain等等)
	 * 
	 * @param hero
	 *            角色
	 */
	/*public static void triggerSyncEvent(Hero hero) {
		for (ISystemEvent event : syncEvents) {
			try {
				if (event == null)
					continue;
				event.logoutSync(hero);
			} catch (Exception e) {
				logger.error(LogFormat.exception(e, hero.getId(), hero.getName(), event.getClass().getSimpleName() + "triggerSyncToDBEvent exception"));
			}
		}
		ISystemEvent[] events = pf_syncEvents.get(hero.getLoginPf());
		if(events!=null){
			for (ISystemEvent event : events) {
				try {
					if (event == null)
						continue;
					event.logoutSync(hero);
				} catch (Exception e) {
					logger.error(LogFormat.exception(e, hero.getId(), hero.getName(), event.getClass().getSimpleName() + "triggerSyncToDBEvent exception"));
				}
			}
		}
	}*/

	/**
	 * 执行批量事件
	 * 
	 * @param hero
	 *            角色
	 */
	public static void triggerBatchSyncToDBEvent() {
		/*
		 * for(ISystemEvent event:HeroEventSysCache.fixedTimeSychDBEvents){ try {
		 * if(event==null)continue; event.syncAllCacheToDB(); } catch (Exception
		 * e) { logger.error(LogFormat.exception(e,
		 * event.getClass().getSimpleName()+
		 * "triggerBatchSyncToDBEvent exception")); } }
		 */
	}

	/**
	 * 被挤下线时触发各个系统的处理
	 * 
	 * @param hero
	 *            角色
	 */
	public static void triggerExtrusionLineEvent(Hero hero) {
		if(extrusionLineEvents!=null){
			for (ISystemEvent event : extrusionLineEvents) {
				try {
					if (event!=null) {
						event.extrusionLine(hero);
					}
				} catch (Exception e) {
					logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "triggerLogoutEvent exception"));
				}
			}
		}
		if(pf_extrusionLineEvents!=null){
			ISystemEvent[] events = pf_extrusionLineEvents.get(hero.getLoginPf());
			if(events!=null){
				for (ISystemEvent event : events) {
					try {
						if (event!=null) {
							event.extrusionLine(hero);
						}
					} catch (Exception e) {
						logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "triggerLogoutEvent exception"));
					}
				}
			}
		}
	}
	/**
	 * 触发升级事件
	 * @param hero
	 * @param oldLv
	 * @param newLv
	 */
	public static final void triggerLevelUpEvent(Hero hero ,int oldLv,int newLv){
		if(levelUpMap!=null){
			List<ISystemEvent> list = levelUpMap.get(newLv);
			if(list!=null){
				for(ISystemEvent event:list){
					try {
						if (event!=null) {
							// event.init(hero);
							event.levelUp(hero, newLv, oldLv);
						}
					} catch (Exception e) {
						logger.error(" triggerLevelUpEvent exception:",e);
					}
				}
			}
		}
		if(pf_levelUpEvents!=null){
			//平台等级事件
			Map<Integer, List<ISystemEvent>> pf_level = pf_levelUpEvents.get(hero.getLoginPf());
			if(pf_level != null && !pf_level.isEmpty()) {
				List<ISystemEvent> pflist = pf_level.get(newLv);
				if(pflist != null) {
					for(ISystemEvent event:pflist){
						try {
							if (event!=null) {
								// event.init(hero);
								event.levelUp(hero, newLv, oldLv);
							}
						} catch (Exception e) {
							logger.error(" triggerLevelUpEvent pf:"+hero.getLoginPf()+" exception:",e);
						}
					}
				}
			}
		}
	}

	/**
	 * 触发通关关卡事件
	 * @param hero
	 * @param passGuanqia
	 */
	public static final void triggerPassGuanqiaEvent(Hero hero, int passGuanqia) {
		try {
			if (passGuanqiaMap != null) {
				List<ISystemEvent> list = passGuanqiaMap.get(passGuanqia);
				if (list == null) {
					return;
				}
				int size = list.size();
				ISystemEvent event = null;
				for (int i = 0; i < size; i++) {
					event = list.get(i);
					try {
						if (event!=null) {
							event.passGuanqia(hero, passGuanqia);
						}
					} catch (Exception e) {
						logger.error(" triggerPassGuanqiaEvent event="+event.getClass().getSimpleName()+" exception:",e);
					}
				}
			}
			//HeroFunction.getIns().systemOpenAward(hero);
		} catch (Exception e) {
			logger.error(" triggerPassGuanqiaEvent exception:", e);
		}
	}

	/**
	 * 零点处理事件
	 */
	public static final void triggerZeroHandlerEvent(int now){
		//先处理公共零点处理事件
		logger.info("zeroPUHandlerEvents start handler");
		isZeroHanlder = true;
		try {
			if(handleQuartzBatchEvents != null){
				for(ISystemEvent event:handleQuartzBatchEvents){
					if(event==null)continue;
					try {
						if (event!=null) {
							event.zeroPub(now);
						}
					} catch (Exception e) {
						logger.error(" zeroPUHandlerEvents exception:",e);
					}
				}
			}
			logger.info("zeroPUHandlerEvents success handler finsh");
			logger.info("zeroHandlerEvents  start  handler");
			//再处理个人相关零点处理事件
			Map<Long,Hero> heroCache = HeroCache.getHeroMap();
			for(Hero hero:heroCache.values()){
				if(hero==null || !hero.isOnline())continue;
				if(!hero.getTempVariables().isLoginSuccess()){
					continue;
				}
				try {
					OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {
						
						@Override
						public void run() {
							if (TimeDateUtil.isLessTodayZeroTime(hero.getZeroTime())) {
								for (ISystemEvent event : handleQuartzSingleEvents) {
									try {
										if (event == null)
											continue;
										Integer funid = eventFunctionIds.get(event);
										if (funid != null && !HeroFunction.getIns().checkSystemOpenZero(hero, funid)) {
//										logger.info(LogTool.getmsg(hero.getId(),hero.getNameZoneid(),"zero hero level limit:"+event.getClass().getSimpleName()));
											// 特殊处理
											if (funid == 5604) {
												GodGenSendGiftEvent.getIns().zeroHero(hero, now);
											}
											continue;
										}
										event.zeroHero(hero, now);
									} catch (Exception e) {
										logger.error(hero.getId() + ",name=" + hero.getNameZoneid()
												+ " zero handler exception:", e);
									}
								}
								ISystemEvent[] events = pf_handleQuartzSingleEvents.get(hero.getLoginPf());
								if (events != null) {
									for (ISystemEvent event : events) {
										try {
											event.zeroHero(hero, now);
										} catch (Exception e) {
											logger.error(LogTool.exception(e, hero.getId(), hero.getNameZoneid(),
													event.getClass().getSimpleName() + "triggerLogoutEvent exception"));
										}
									}
								}
								// 完成零点处理
								hero.setZeroTime(TimeDateUtil.getCurrentTime());
								HeroSender.sendCmd_162(hero.getId());
							}
						}
						
						@Override
						public Object getSession() {
							// TODO Auto-generated method stub
							return hero.getId();
						}
					});
				} catch (Exception e) {
					LogTool.error(e, SystemEventFunction.class, hero.getId(), hero.getName(), "zeroHandlerEvents fail");
				}
			}
			logger.info("zeroHandlerEvents  success  handler finsh");
		} catch (Exception e) {
			logger.error("triggerZeroHandlerEvent exception",e);
		}finally{
			isZeroHanlder = false;
		}
		//后台的零点处理
		/*try{
			ConcurrentHashMap<Long,Hero> heroCache = HeroCache.getHeroCache();
			for(Hero hero:heroCache.values()){
				if(hero==null)continue;
				bzevent.handleOnZeroClock(hero);
			}
		}catch(Exception e){
			logger.error("BackstageZeroBatchEvent exception",e);
		}*/
		logger.info("zeroHandlerEvents success handler finsh");
	}

	@Override
	public void startServer() throws RunServerException {
		/*if(GameProperties.isLocalServer()){
			if (GameProperties.platform.equals(PfConst.PF_TW)) {
				readConfig("com/teamtop/system/event/systemEvent/SystemEventsTW.xml");
			}else {
				readConfig("com/teamtop/system/event/systemEvent/SystemEvents.xml");
			}
		}*//*else if(GameProperties.isJianghuServer()){
			readConfig("com/teamtop/system/event/systemEvent/JiangHuSystemEvents.xml");
		}else if(GameProperties.isRankRaiseServer()){
			readConfig("com/teamtop/system/event/systemEvent/RankRaiseSystemEvents.xml");
		}*/
		if(GameProperties.isCentralServer()){
			readConfig("com/teamtop/system/event/systemEvent/CentralSystemEvents.xml");
		}
	}
	/**
	 * 读取配置文件
	 * @throws RunServerException
	 */
	public static void readConfig(String path) throws RunServerException{
		//readConfig(new File(FileUtils.getAbsFilePath(path)), null);
		checkTheSame(new File(FileUtils.getAbsFilePath(path)));
		readConfig(new File(FileUtils.getAbsFilePath(path)));
	}
	/**
	 * 坚持读取的配置文件是否有重复方法
	 */
	public static void checkTheSame(File file){
		try {
			List<String> checkList=new ArrayList<String>();
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			for (Iterator<?> it = root.elementIterator("bean"); it.hasNext();) {
				bean = (Element) it.next();
				String className = bean.attributeValue("class");
				Class<?> clazz = Class.forName(className);
				ForbidEventRec validateEvent = ForbidCache.validateEvent(clazz);
				Method method = clazz.getDeclaredMethod("getIns");
				ISystemEvent event = (ISystemEvent) method.invoke(null);
				//事件类对应的系统id，用于系统开启的等级限制
				String funid = bean.attributeValue("funid");
				String pf = bean.attributeValue("pf");
				if(pf == null) pf = "PF_ALL";
				if(funid != null && !"".equals(funid) && Integer.parseInt(funid) != 0){
//					String simpleName = event.getClass().getSimpleName();
					eventFunctionIds.put(event, Integer.parseInt(funid));
				}
				List<String> unForbidFun = null;
				if(validateEvent!=null){
					unForbidFun = validateEvent.getUnForbidFun();
					if(CollectionUtil.isEmpty(unForbidFun)){
						logger.info("forbid clazz:"+clazz);
						continue;//被屏蔽的事件类
					}
				}
				List<?> elements = bean.elements();
				int size = elements.size();
				for (int i = 0; i < size; i++) {
					Element property = (Element) elements.get(i);
					String methodStr = property.attributeValue("method");
					if(unForbidFun!=null && !unForbidFun.contains(methodStr)){
						logger.info("forbid clazz event,method:"+methodStr+",clazz:"+clazz);
						continue;
					}
					if (checkList.contains(methodStr)) {
						throw new RunServerException(null, "read system event xml exception,className "+  className +" has same methodStr: " + methodStr);
					}else {
						checkList.add(methodStr);
					}
				/*if("fixTime".equals(methodStr)) {
//						fixtime.add(event);
						addFixtime(property, event);
					} else {
						throw new RunServerException(null, "read system event xml exception,method not match:" + methodStr);
					}*/
				}
				checkList.clear();
				
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "checkTheSame"));
		}
		
	}
	
	
}
