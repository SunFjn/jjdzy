package com.teamtop.system.event.serverEvent;
import java.io.File;
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

import com.teamtop.cross.AbsCrossControl;
import com.teamtop.forbid.ForbidCache;
import com.teamtop.forbid.ForbidEventRec;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.netty.util.nettyCache.FunCmd;
import com.teamtop.netty.util.nettyCache.MethodInvoke;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.pf.PfConst;
import com.teamtop.system.event.systemEvent.ISystemEvent;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.util.common.CollectionUtil;

import excel.config.Config_xitong_001;
import excel.struct.Struct_xitong_001;


public class CmdEvent{
	private static Logger logger = LoggerFactory.getLogger(CmdEvent.class);

	public static void main(String[] args) throws Exception {
		expalinXml("cmdevent.xml");
	}
	@SuppressWarnings("unchecked")
	public static void expalinXml(String xmlFilePath) throws Exception{
		String realFile = MethodInvoke.class.getResource("/"+xmlFilePath).getFile();
		realFile = URLDecoder.decode(realFile,"utf-8");  
		File file = new File(realFile);
		SAXReader saxReader = new SAXReader();
		Document doc = saxReader.read(file);
		Element root = doc.getRootElement();
		List<Object[]> list = new ArrayList<Object[]>();
		Map<Integer,FunCmd> funCmdRelateMap = new HashMap<Integer, FunCmd>();
		//event
		Map<String,List<ISystemEvent>> init = new HashMap<String, List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> login = new HashMap<String, List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> openNewGeneral = new HashMap<String, List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> loginReset = new HashMap<String, List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> sync = new HashMap<String, List<ISystemEvent>>();
//		Map<Integer,List<ISystemEvent>> levelUp = new HashMap<Integer,List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> afterLogin = new HashMap<String, List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> logout = new HashMap<String, List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> extrusionLine = new HashMap<String, List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> zeroHero = new HashMap<String, List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> zeroPub = new HashMap<String, List<ISystemEvent>>();
		Map<String,List<ISystemEvent>> logoutSyncPub = new HashMap<String, List<ISystemEvent>>();
		for(Iterator<?> it = root.elementIterator("bean");it.hasNext();){
			Element bean = (Element) it.next();
			try {
				Object[] beanArr = new Object[2];
				beanArr[0] = bean.attributeValue("id");//<bean id="com.teamtop.system.hero.HeroCG" desc="角色">
				String desc = bean.attributeValue("desc");
				String cgpf = bean.attributeValue("pf");
				String cgfunidstr = bean.attributeValue("funid");
				int cgfunid=0;
				if(cgfunidstr!=null) cgfunid = Integer.parseInt(cgfunidstr);
				String crossControl = bean.attributeValue("crossControl");
				AbsCrossControl cc = null;
				if(crossControl!=null){
					Class<AbsCrossControl> clazz = (Class<AbsCrossControl>) Class.forName(crossControl);
					cc = clazz.newInstance();
				}
				List<?> eventElements = bean.elements("event");
				int eventSize=eventElements.size();
				for(int i=0;i<eventSize;i++){
					Element e = (Element) eventElements.get(i);
					String className = e.attributeValue("id");//<event id="com.teamtop.system.hero.HeroEvent">
					String id = className.substring(className.lastIndexOf(".")+1,className.length());
					String pf = e.attributeValue("pf");
					if(pf == null) pf = "PF_ALL";
					int funid = 0;
					String funidstr = e.attributeValue("funid");
					if(funidstr==null && cgfunid>0) funid = cgfunid;
					Class<?> clazz = Class.forName(className);
					ForbidEventRec validateEvent = ForbidCache.validateEvent(clazz);
					Method method = clazz.getDeclaredMethod("getIns");
					ISystemEvent event = (ISystemEvent) method.invoke(null);
					if(funid>0){
						SystemEventFunction.eventFunctionIds.put(event, funid);
					}
					List<String> unForbidFun = null;
					if(validateEvent!=null){
						unForbidFun = validateEvent.getUnForbidFun();
						if(CollectionUtil.isEmpty(unForbidFun)){
							logger.info("forbid clazz:"+clazz);
							continue;//被屏蔽的事件类
						}
					}
					List<?> eventEle = e.elements();
					List<String> checkList=new ArrayList<String>();
					int subSize=eventEle.size();
					for(int j=0;j<subSize;j++){
						Element ele = (Element) eventEle.get(j);
						String methodStr = ele.attributeValue("method");//<property method = "init"/>
						if(unForbidFun!=null && !unForbidFun.contains(methodStr)){
							logger.info("forbid clazz event,method:"+methodStr+",clazz:"+clazz);
							continue;
						}
						if (checkList.contains(methodStr)) {
							throw new RunServerException(null, "read system event xml exception,className "+  className +" has same methodStr: " + methodStr);
						}else {
							checkList.add(methodStr);
						}
						if ("init".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, init, event);
						} else if ("login".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, login, event);
						} else if ("openNewGeneral".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, openNewGeneral, event);
						} else if ("loginReset".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, loginReset, event);
						} else if ("sync".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, sync, event);
						} else if ("levelUp".equals(methodStr)) {
							SystemEventFunction.registerLevelUp(pf, ele, event);
						} else if ("afterLogin".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, afterLogin, event);
						} else if ("logout".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, logout, event);
						} else if ("extrusionLine".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, extrusionLine, event);
						} else if ("zeroHero".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, zeroHero, event);
						} else if ("zeroPub".equals(methodStr)) {
							SystemEventFunction.getPfEventList(pf, zeroPub, event);
						} else if ("logoutSyncPub".equals(methodStr)) {
							SystemEventFunction.getPfEventList("PF_ALL", logoutSyncPub, event);
						} else if ("fixtimeSyncPub".equals(methodStr)) {
//							addFixtime(property, event);
							SystemEventFunction.regFixtimeSyncPub(ele, event);
						} else if ("fixTime".equals(methodStr)) {
//							fixtime.add(event);
							SystemEventFunction.addFixtime(ele, event);
						} else if ("passGuanqia".equals(methodStr)) {
							SystemEventFunction.registerPassGuanqia(pf, ele, event);
						} else {
							throw new RunServerException(null, "read system event xml exception,method not match:" + methodStr);
						}
					}
				}
				
				//cache
				List<?> cacheElements = bean.elements("cache");
				int cacheSize=cacheElements.size();
				Smodel scheduleSmodel = null;
				for(int i=0;i<cacheSize;i++){
					Element event = (Element) cacheElements.get(i);
					String className = event.attributeValue("id");//<cache id="com.teamtop.system.hero.HeroCache">
					String id = className.substring(className.lastIndexOf(".")+1,className.length());
					String pf = bean.attributeValue("pf");
					List<?> eventEle = event.elements();
					int subSize=eventEle.size();
					for(int j=0;j<subSize;j++){
						Element ele = (Element) eventEle.get(j);
						String methodStr = ele.attributeValue("method");//<property method = "startServer"/>
						if(pf == null && cgpf==null) {
							String p = PfConst.PF_ALL;
							if(ServerEventFunction.startMethodName.equals(methodStr)){
								if(className.indexOf("ScheduleUtil")==-1){
									if(GameProperties.isLocalServer()){
										ServerEventFunction.startClassList.add(new Smodel(className, desc, p));
									}
								}else{
									scheduleSmodel = new Smodel(className, desc, p);
								}
							}else if(ServerEventFunction.shutdownMethodName.equals(methodStr)){
								if(GameProperties.isLocalServer()){
									ServerEventFunction.shutdownClassList.add(new Smodel(className, desc, p));
								}
							}else if(ServerEventFunction.initExcelName.equals(methodStr)){
								if(GameProperties.isLocalServer()){
									ServerEventFunction.initExcelList.add(new Smodel(className, desc, p));
								}
							}
						}else {
							String[] pfSplit = pf.split(PfConst.SPLIT_PF);
							for(String pstr:pfSplit) {
								String p = (String)ServerEventFunction.getClassKey(pstr, ServerEventFunction.pfKeyclassName);
								List<Smodel> pflist = ServerEventFunction.getPfModelList(p, methodStr);
								if(pflist != null)pflist.add(new Smodel(className, desc, p));
							}
						}
					}
				}
				if(scheduleSmodel!=null){
					if(GameProperties.isLocalServer()){
						ServerEventFunction.startClassList.add(scheduleSmodel);
					}
				}
				//cmd
				List<Object[]> arrList = new ArrayList<Object[]>();
				List<?> cmdElements = bean.elements("cmd");
				int cmdSize=cmdElements.size();
				for(int i=0;i<cmdSize;i++){
					Element event = (Element) cmdElements.get(i);
					String cmdfunid = event.attributeValue("funid");
					int funid = 0;
					if(cmdfunid==null){
						funid = cgfunid;
					} else {
						funid = Integer.parseInt(cmdfunid);
					}
					int lv = 0;
					int guanqiaId = 0;
					if(funid>0){
						Struct_xitong_001 kq = Config_xitong_001.getIns().get(funid);
						if(kq==null){
							throw new RunServerException(null, "xitongkaiqi is null,funid:"+funid);
						}
						int[][] open = kq.getServer();
						if (open != null && open.length > 0) {
							for (int[] info : open) {
								switch (info[0]) {
								case 1:
									guanqiaId = info[1];
									break;
								case 2:

									break;
								default:
									break;
								}
							}
						}
					}
					List<?> eventEle = event.elements();
					int subSize=eventEle.size();
					for(int j=0;j<subSize;j++){
						Element ele = (Element) eventEle.get(j);//<property cmdId="101" methodName="login" paramConn="true" />
						int cmd = Integer.parseInt(ele.attributeValue("cmdId"));
						arrList.add(new Object[]{cmd,ele.attributeValue("methodName"),ele.attributeValue("paramConn")});
						funCmdRelateMap.put(cmd, new FunCmd(funid, cmd, lv, guanqiaId));
						if(cc!=null){
							NettyCache.crossControlMap.put(cmd, cc);
						}
					}
				}
				beanArr[1] = arrList.toArray();
				list.add(beanArr);
			} catch (Exception e) {
				throw new RunServerException(e, bean.toString());
			}
		}
		MethodInvoke.registerCmdToMethod(list);
		MethodInvoke.regCrossIO();
		ForbidCache.getFunCmdMap().putAll(funCmdRelateMap);//funid对应的cmd结合
 		if(!GameProperties.isLocalServer()){
			//中央服由xxserverevent.xml提供
			return;
		}
		SystemEventFunction.initEvents = SystemEventFunction.addPfEvent(init, SystemEventFunction.pf_initEvents);
		SystemEventFunction.loginEvents = SystemEventFunction.addPfEvent(login, SystemEventFunction.pf_loginEvents);
		SystemEventFunction.openNewGeneralEvents = SystemEventFunction.addPfEvent(openNewGeneral, SystemEventFunction.pf_openNewGeneral);
		SystemEventFunction.loginResetEvents = SystemEventFunction.addPfEvent(loginReset, SystemEventFunction.pf_loginResetEvents);
		SystemEventFunction.afterLoginEvents = SystemEventFunction.addPfEvent(afterLogin, SystemEventFunction.pf_afterLoginEvents);
		SystemEventFunction.logoutEvents = SystemEventFunction.addPfEvent(logout, SystemEventFunction.pf_logoutEvents);
		SystemEventFunction.syncEvents = SystemEventFunction.addPfEvent(sync, SystemEventFunction.pf_syncEvents);
		SystemEventFunction.logoutSyncPubEvents = SystemEventFunction.addPfEvent(logoutSyncPub, null);
		SystemEventFunction.handleQuartzSingleEvents = SystemEventFunction.addPfEvent(zeroHero, SystemEventFunction.pf_handleQuartzSingleEvents);
		SystemEventFunction.handleQuartzBatchEvents = SystemEventFunction.addPfEvent(zeroPub, SystemEventFunction.pf_handleQuartzBatchEvents);
		SystemEventFunction.extrusionLineEvents = SystemEventFunction.addPfEvent(extrusionLine, SystemEventFunction.pf_extrusionLineEvents);
	}
}
