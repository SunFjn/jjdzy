package com.teamtop.system.event.serverEvent;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.ServerProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.pf.PfConst;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;
import com.teamtop.util.ui.ShowMsgFunction;

public class ServerEventFunction {
	public static List<Smodel> startClassList = new ArrayList<Smodel>();
	public static List<Smodel> initExcelList = new ArrayList<Smodel>();
	public static List<Smodel> shutdownClassList = new ArrayList<Smodel>();
	public static Map<String, List<Smodel>> pfstartClassMap = new HashMap<String, List<Smodel>>();
	public static Map<String, List<Smodel>> pfinitExcelMap = new HashMap<String, List<Smodel>>();
	public static Map<String, List<Smodel>> pfshutdownClassMap = new HashMap<String, List<Smodel>>();
	public static final String startMethodName = "startServer";
	public static final String initExcelName = "initExcel";
	public static final String shutdownMethodName = "shutdownServer";
	public static final String pfKeyclassName = "com.teamtop.pf.PfConst";
	private static Logger logger = LoggerFactory.getLogger(ServerEventFunction.class);
	public static void main(String[] args) throws RunServerException {
		ServerEventFunction.readConfig("ServerEvents.xml");
		ScheduleUtil.readScheduleConfig("ScheduleEvents.xml");
		ServerEventFunction.startServer();
	}
	/**
	 * 读取服务器事件配置文件
	 * @throws RunServerException 读取失败跑出异常，同时关闭服务器
	 */
	public static void readConfig(String xmlName) throws RunServerException{
		try {
			String realFile = FileUtils.getAbsFilePath("com/teamtop/system/event/serverEvent/"+xmlName);
			realFile = URLDecoder.decode(realFile,"utf-8");  
			File file = new File(realFile);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			String desc = null;
			String pf = null;
			Smodel scheduleSmodel = null;
			for(Iterator<?> it = root.elementIterator("bean");it.hasNext();){
				bean = (Element) it.next();
				desc = bean.attributeValue("id");
				pf = bean.attributeValue("pf");
				String className = bean.attributeValue("class");
				String localmode = bean.attributeValue("localmode");
				if(localmode!=null && "true".equals(localmode)){
					if(!ServerProperties.localmode) continue;
				}
				List<?> elements = bean.elements();
				int size = elements.size();
				for(int i=0;i<size;i++){
					Element property = (Element) elements.get(i);
					String methodStr = property.attributeValue("method");
					if(pf == null) {
						String p = PfConst.PF_ALL;
						if(startMethodName.equals(methodStr)){
							if(!"com.teamtop.util.exector.schedule.ScheduleUtil".equals(className)){
								startClassList.add(new Smodel(className, desc, p));
							}else{
								scheduleSmodel = new Smodel(className, desc, p);
							}
						}else if(shutdownMethodName.equals(methodStr)){
							shutdownClassList.add(new Smodel(className, desc, p));
						}else if(initExcelName.equals(methodStr)){
							initExcelList.add(new Smodel(className, desc, p));
						}
					}else {
						String[] pfSplit = pf.split(PfConst.SPLIT_PF);
						for(String pstr:pfSplit) {
							String p = (String)getClassKey(pstr, pfKeyclassName);
							List<Smodel> list = getPfModelList(p, methodStr);
							if(list != null)list.add(new Smodel(className, desc, p));
						}
					}
				}
			}
			if(scheduleSmodel!=null){
				startClassList.add(scheduleSmodel);
			}
		} catch (Exception e) {
			throw new RunServerException(e, "readConfig exception");
		}
	}
	
	public static Object getClassKey(String field,String className) throws RunServerException {
		Class<?> pfclass;
		try {
			pfclass = Class.forName(className);
			Field f = pfclass.getDeclaredField(field);
			return f.get(null);
		} catch (Exception e) {
			throw new RunServerException(e, "readConfig exception");
		}
	}
	
	/**
	 * 获取指定平台集合
	 */
	public static List<Smodel> getPfModelList(String pf,String methodStr) {
		List<Smodel> list = null;
		if(startMethodName.equals(methodStr)){
			list = pfstartClassMap.get(pf);
			if(list == null) {
				list = new ArrayList<Smodel>();
				pfstartClassMap.put(pf, list);
			}
		}else if(shutdownMethodName.equals(methodStr)){
			list = pfshutdownClassMap.get(pf);
			if(list == null) {
				list = new ArrayList<Smodel>();
				pfshutdownClassMap.put(pf, list);
			}
		}else if(initExcelName.equals(methodStr)){
			list = pfinitExcelMap.get(pf);
			if(list == null) {
				list = new ArrayList<Smodel>();
				pfinitExcelMap.put(pf, list);
			}
		}
		return list;
	}
	
	/**
	 * 启动服务器，把监听的相关事件执行startServer方法
	 * @throws RunServerException
	 */
	public static void startServer() throws RunServerException{
		long s = System.currentTimeMillis();
		try {
			//20170621 放到上层方法
			/*int serverId = PropertiesTools.getPropertiesInt("serverId");
			if(serverId == GameConst.SERVER_ID_LOCAL)
				CmdEvent.expalinXml("cmdevent.xml");*/
			for(Smodel smodel:startClassList){
				long a = System.currentTimeMillis();
				Class<?> clazz = Class.forName(smodel.getClassName());
				Object obj = clazz.newInstance();
				Method method = clazz.getDeclaredMethod(startMethodName);
				logger.info(smodel.getClassName());
				method.invoke(obj);
				long b = System.currentTimeMillis();
				logger.info(LogTool.showInitComplete(smodel.getDesc()+",time:"+(b-a)+" ms"));
				ShowMsgFunction.sendMsg(LogTool.showInitComplete(smodel.getDesc()+",time:"+(b-a)+" ms"));
				obj = null;
			}
			if(!pfstartClassMap.isEmpty()) {
				for(String pf:pfstartClassMap.keySet()) {
					dealPfSmodel(pf, pfstartClassMap.get(pf), startMethodName);
				}
			}
		} catch (Exception e) {
			AlarmSystemFunction.getIns().alarmSend(AlarmType.STARTUP_FAIL, 0, new Object[] {});
			throw new RunServerException(e, "start server exception");
		}
		long e = System.currentTimeMillis();
		String desc = "serverStart invoke complete"+",total time:"+(e-s)+" ms";
		logger.info(LogTool.showRunComplete(desc));
		ShowMsgFunction.sendBlueMsg(LogTool.showRunComplete(desc));
	}
	
	/**
	 * 启动服务器，初始化excel
	 * @throws RunServerException
	 */
	public static void initExcel() throws RunServerException{
		long s = System.currentTimeMillis();
		try {
			if(!pfinitExcelMap.isEmpty()) {
				for(String pf:pfinitExcelMap.keySet()) {
					dealPfSmodel(pf, pfinitExcelMap.get(pf), initExcelName);
				}
			}
			for(Smodel smodel:initExcelList){
				long a = System.currentTimeMillis();
				Class<?> clazz = Class.forName(smodel.getClassName());
				Object obj = clazz.newInstance();
				Method method = clazz.getDeclaredMethod(initExcelName);
				method.invoke(obj);
				long b = System.currentTimeMillis();
				logger.info(LogTool.showInitComplete(smodel.getDesc()+",time:"+(b-a)+" ms"));
				ShowMsgFunction.sendMsg(LogTool.showInitComplete(smodel.getDesc()+",time:"+(b-a)+" ms"));
				obj = null;
			}
		} catch (Exception e) {
			throw new RunServerException(e, "start server exception");
		}
		long e = System.currentTimeMillis();
		String desc = "initExcel invoke complete"+",total time:"+(e-s)+" ms";
		logger.info(LogTool.showRunComplete(desc));
		ShowMsgFunction.sendBlueMsg(LogTool.showRunComplete(desc));
	}
	/**
	 * 关闭服务器，把监听的相关事件执行shutdownServer方法
	 * @throws RunServerException
	 */
	public static void shutdownServer() throws RunServerException{
		Smodel tempModel = null;
		if(!pfshutdownClassMap.isEmpty()) {
			for(String pf:pfshutdownClassMap.keySet()) {
				dealPfSmodel(pf, pfshutdownClassMap.get(pf), shutdownMethodName);
			}
		}
		for(Smodel smodel:shutdownClassList){
			try {
				if("com.teamtop.system.hero.HeroDataSaver".equals(smodel.getClassName())){
					tempModel = smodel;
					continue;
				}
				Class<?> clazz = Class.forName(smodel.getClassName());
				Object obj = clazz.newInstance();
				Method method = clazz.getDeclaredMethod(shutdownMethodName);
				method.invoke(obj);
				logger.info(LogTool.showRunComplete(smodel.getDesc()));
				obj = null;
			} catch (Exception e) {
				logger.error(LogTool.exception(e));
			}
		}
		//最后调用hero下线数据保存管理
		try {
			if(tempModel!=null){
				Class<?> clazz = Class.forName(tempModel.getClassName());
				Object obj = clazz.newInstance();
				Method method = clazz.getDeclaredMethod(shutdownMethodName);
				method.invoke(obj);
				logger.info(LogTool.showRunComplete(tempModel.getDesc()));
				obj = null;
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
		if(CrossZone.isCrossServer()){
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			for(Hero hero:heroMap.values()){
				try {
					CrossFunction.logout(hero);
				} catch (Exception e) {
					logger.error(LogTool.exception(e));
				}
			}
		}
	}
	
	public static void dealPfSmodel(String pf, List<Smodel> classList, String methodName) throws RunServerException {
		try {
			for(Smodel smodel:classList){
				if(!pf.equals(PfConst.PF_ALL) && !pf.equals(GameProperties.platform)) continue;
				long a = System.currentTimeMillis();
				Class<?> clazz = Class.forName(smodel.getClassName());
				Object obj = clazz.newInstance();
				Method method = clazz.getDeclaredMethod(methodName);
				method.invoke(obj);
				long b = System.currentTimeMillis();
				logger.info(LogTool.showInitComplete(smodel.getDesc()+",time:"+(b-a)+" ms"));
				ShowMsgFunction.sendMsg(LogTool.showInitComplete(smodel.getDesc()+",time:"+(b-a)+" ms"));
				obj = null;
			}
		} catch (Exception e) {
			throw new RunServerException(e, "start server dealSmodel exception pf:"+pf);
		}
	}
	
	/**
	 * 加入关闭服务器的事件
	 */
	public static void addShutdownHook(){
		Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
			public void run() {
				try {
					//关服事件
					shutdownServer();
					//保存console日志
					saveConsole();
				} catch (RunServerException e) {
					logger.error(LogTool.exception(e));
				}
				logger.info(LogTool.showRunComplete("Server Shutdown"));
			}
		}));
	}
	
	public static void saveConsole(){
		String fileTime = TimeDateUtil.getTimeStrByLong(TimeDateUtil.getCurrentTimeInMillis(), "yyyyMMdd_HH-mm-ss");
		//console.log
		String consolePath = GamePath.USER_DIR + File.separator + "log" + File.separator + "console.log";
		File file = new File(consolePath);
		if(file.exists()){
			String consoleNewPath = GamePath.USER_DIR + File.separator + "log" + File.separator + "console_"+fileTime+".log";
			FileUtils.renameFile(consolePath, consoleNewPath);
		}else{
			LogTool.info("文件不存在："+consolePath, ServerEventFunction.class);
		}
		
		//gc.log
		String gcPath = GamePath.USER_DIR + File.separator + "log" + File.separator + "gc.log";
		File fileGc = new File(gcPath);
		if(fileGc.exists()){
			String gcNewPath = GamePath.USER_DIR + File.separator + "log" + File.separator + "gc_"+fileTime+".log";
			FileUtils.renameFile(gcPath, gcNewPath);
		}else{
			LogTool.info("文件不存在："+gcPath, ServerEventFunction.class);
		}
		//移除
		String dirPath = GamePath.USER_DIR + File.separator + "log" + File.separator;
		FileUtils.removeFileByTime(dirPath, 0, TimeDateUtil.getCurrentTime()-TimeDateUtil.SECONDS_IN_DAY*30);
	}
}
