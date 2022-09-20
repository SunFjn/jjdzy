package com.teamtop.util.cache.union;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

public class UCTriggerFunction extends AbsServerEvent{
	private static Logger logger = LoggerFactory.getLogger(UCTriggerFunction.class);
	private static final String serverstart = "serverstart";//启动服务器
	private static final String fixtime = "fixtime";//定时
	private static final String shutdown = "shutdown";//关闭服务器
	private static final String logout = "logout";//玩家登出
	private static final String clearcache = "clearcache";//玩家清除缓存
	private static final String zerotime = "zerotime";//零点
	private static final String find = "find";//查找 用于单个数据查找
	private static List<String> triggerTypeList = new ArrayList<String>();
	
	public static List<UCTriggerWrap> serverstartList = new ArrayList<>();
	public static List<UCTriggerWrap> fixtimeList = new ArrayList<>();
	public static List<UCTriggerWrap> shutdownList = new ArrayList<>();
	public static List<UCTriggerWrap> logoutList = new ArrayList<>();
	public static List<UCTriggerWrap> clearcacheList = new ArrayList<>();
	public static List<UCTriggerWrap> zerotimeList = new ArrayList<>();
	public static List<UCTriggerWrap> findList = new ArrayList<>();
	
	static{
		triggerTypeList.add(serverstart);
		triggerTypeList.add(fixtime);
		triggerTypeList.add(shutdown);
		triggerTypeList.add(logout);
		triggerTypeList.add(clearcache);
		triggerTypeList.add(zerotime);
		triggerTypeList.add(find);
	}
	public static void main(String[] args) throws RunServerException {
		loadXml();
		System.err.println();
	}
	@SuppressWarnings("unchecked")
	public static void loadXml() throws RunServerException{
		try {
			String realFile = GamePath.USER_DIR+GamePath.SEP+"bin"+GamePath.SEP+"com"+GamePath.SEP+"teamtop"+GamePath.SEP
					+"util"+GamePath.SEP+"cache"+GamePath.SEP+"union"+GamePath.SEP+"UCCacheTrigger.xml";
			realFile = URLDecoder.decode(realFile, "utf-8");
			File file = new File(realFile);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			for (Iterator<?> it1 = root.elementIterator("system"); it1.hasNext();) {
				Element system = (Element) it1.next();
				String cache = system.attributeValue("cache");
				String getter = system.attributeValue("getter");
				String handler = system.attributeValue("handler");
				String pf = system.attributeValue("pf");
				//基本元素判空
				if(CommonUtil.isNull(cache)||CommonUtil.isNull(getter)||CommonUtil.isNull(handler)||CommonUtil.isNull(pf)){
					throw new RunServerException(null, "UCTriggerFunction loadXml,some element is null,cache:"+cache+",getter:"+getter+",handler:"+handler+",pf:"+pf);
				}
//				System.err.println("cache:"+cache+",getter:"+getter+",handler:"+handler+",pf:"+pf);
				
				//实例化handler
				Class<AbsUCTrigger<?>> handlerClazz = (Class<AbsUCTrigger<?>>) Class.forName(handler);
				AbsUCTrigger<?> triggerObj = handlerClazz.newInstance();
				Class<?> cacheClazz = Class.forName(cache);
				Method getterMethod = cacheClazz.getDeclaredMethod(getter);
				triggerObj.setT(getterMethod.invoke(null));
				
				
				for (Iterator<?> opit = system.elementIterator("op"); opit.hasNext();) {
					Element op = (Element) opit.next();
					String trigger = op.attributeValue("trigger");
					String method = op.attributeValue("method");
					String afterMethod = op.attributeValue("afterMethod");
					//基本元素判空
					if(CommonUtil.isNull(trigger)/*||CommonUtil.isNull(method)*/){
						throw new RunServerException(null, "UCTriggerFunction loadXml,some element is null,system:"+system+",trigger:"+trigger+",method:"+method);
					}
					//验证trigger是否存在
					if(!triggerTypeList.contains(trigger)){
						throw new RunServerException(null, "UCTriggerFunction loadXml,trigger type not find,system:"+system+",trigger:"+trigger);
					}
					if(serverstart.equals(trigger)){
						method = "loadAll";
					}else if(shutdown.equals(trigger)){
						method = "syncAll";
					}
					Method triggerInvokeMethod = null;
					//trigger method
					if("loadOne".equals(method) ||"syncOne".equals(method) ||"killOne".equals(method)){
						triggerInvokeMethod = handlerClazz.getMethod(method,Object.class);
					}else{
						triggerInvokeMethod = handlerClazz.getMethod(method);
					}
					UCTriggerWrap ucTriggerWrap = new UCTriggerWrap(triggerObj, triggerInvokeMethod);
					
					//after method
					Method afterInvokeMethod = null;
					if(!CommonUtil.isNull(afterMethod)){
						if("loadOne".equals(method) ||"syncOne".equals(method) ||"killOne".equals(method)){
							afterInvokeMethod = handlerClazz.getMethod(afterMethod,Object.class);
						}else{
							afterInvokeMethod = handlerClazz.getMethod(afterMethod);
						}
					}
					if(afterInvokeMethod!=null){
						ucTriggerWrap.setAfterMethod(afterInvokeMethod);
					}
					
					if(fixtime.equals(trigger)){
						//定时
//						String period = op.attributeValue("period");
						fixtimeList.add(ucTriggerWrap);
					}else if(serverstart.equals(trigger)){
						//启动服务器
						serverstartList.add(ucTriggerWrap);
					}else if(shutdown.equals(trigger)){
						//关闭服务器
						shutdownList.add(ucTriggerWrap);
					}else if(logout.equals(trigger)){
						//玩家登出
						logoutList.add(ucTriggerWrap);
					}else if(clearcache.equals(trigger)){
						//玩家清除缓存
						clearcacheList.add(ucTriggerWrap);
					}else if(zerotime.equals(trigger)){
						//零点
						zerotimeList.add(ucTriggerWrap);
					}else if(find.equals(trigger)){
						//查找 用于单个数据查找
						findList.add(ucTriggerWrap);
					}
//					System.err.println("trigger:"+trigger+",method:"+method+",afterMethod:"+afterMethod);
				}
			}
		} catch (Exception e) {
			throw new RunServerException(e, "UCTriggerFunction loadXml err");
		}
	}
	
	@Override
	public void startServer() throws RunServerException {
		loadXml();
		Iterator<UCTriggerWrap> it = serverstartList.iterator();
		while(it.hasNext()){
			UCTriggerWrap ucTriggerWrap = it.next();
			try {
				ucTriggerWrap.getMethod().invoke(ucTriggerWrap.getTrigger());
			} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
				throw new RunServerException(e, "UCTrigger serverstart invoke err");
			}
		}
	}
	
	@Override
	public void shutdownServer() {
		Iterator<UCTriggerWrap> it = shutdownList.iterator();
		while(it.hasNext()){
			UCTriggerWrap ucTriggerWrap = it.next();
			try {
				ucTriggerWrap.getMethod().invoke(ucTriggerWrap.getTrigger());
			} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
				logger.error(LogTool.exception(e));
			}
		}
	}
	
	
}
