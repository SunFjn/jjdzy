package com.teamtop.system.event.backstage;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.teamtop.main.RunServerException;
import com.teamtop.util.file.FileUtils;

public class BackstageCache {
	private static List<AbsBackstageEvent> loginEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> logoutEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> serverStartEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> shutdownEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> executeEightPreEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> executePreOneTenMinEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> executeOneMinEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> executeFiveMinEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> executeOneDayEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> executeOneHourEvent = new ArrayList<AbsBackstageEvent>();
	private static List<AbsBackstageEvent> resetCacheOnDayEvent = new ArrayList<AbsBackstageEvent>();
	/**
	 * 读取配置文件
	 * @throws RunServerException
	 */
	public static void readConfig() throws RunServerException{
		readConfig(new File(FileUtils.getAbsFilePath("com/teamtop/system/event/backstage/BackstageEvents.xml")));
	}
	private static void readConfig(File file) throws RunServerException {
		try {
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			for (Iterator<?> it = root.elementIterator("bean"); it.hasNext();) {
				bean = (Element) it.next();
				String className = bean.attributeValue("class");
				Class<?> clazz = Class.forName(className);
				AbsBackstageEvent event = (AbsBackstageEvent) clazz.newInstance();
				List<?> elements = bean.elements();
				int size = elements.size();
				for (int i = 0; i < size; i++) {
					Element property = (Element) elements.get(i);
					String methodStr = property.attributeValue("method");
					if ("login".equals(methodStr)) {
						loginEvent.add(event);
					} else if ("logout".equals(methodStr)) {
						logoutEvent.add(event);
					} else if ("resetCacheOnDay".equals(methodStr)) {
						resetCacheOnDayEvent.add(event);
					} else if ("executeOneHour".equals(methodStr)) {
						executeOneHourEvent.add(event);
					} else if ("executeOneDay".equals(methodStr)) {
						executeOneDayEvent.add(event);
					}else if ("executeOneMin".equals(methodStr)) {
						executeOneMinEvent.add(event);
					}else if ("executeFiveMin".equals(methodStr)) {
						executeFiveMinEvent.add(event);
					} else if ("executePreOneTenMin".equals(methodStr)) {
						executePreOneTenMinEvent.add(event);
					} else if ("executeEightPre".equals(methodStr)) {
						executeEightPreEvent.add(event);
					} else if ("startServer".equals(methodStr)) {
						serverStartEvent.add(event);
					} else if ("shutdownServer".equals(methodStr)) {
						shutdownEvent.add(event);
					} else {
						throw new RunServerException(null, "read backstage event xml exception,method not match:" + methodStr);
					}
				}
			}
		} catch (Exception e) {
			throw new RunServerException(e, "readConfig exception");
		}
	}
	public static List<AbsBackstageEvent> getLoginEvent() {
		return loginEvent;
	}
	public static List<AbsBackstageEvent> getServerStartEvent() {
		return serverStartEvent;
	}
	public static List<AbsBackstageEvent> getShutdownEvent() {
		return shutdownEvent;
	}
	public static List<AbsBackstageEvent> getLogoutEvent() {
		return logoutEvent;
	}
	public static List<AbsBackstageEvent> getExecuteEightPreEvent() {
		return executeEightPreEvent;
	}
	public static List<AbsBackstageEvent> getExecutePreOneTenMinEvent() {
		return executePreOneTenMinEvent;
	}
	public static List<AbsBackstageEvent> getExecuteOneMinEvent() {
		return executeOneMinEvent;
	}
	public static List<AbsBackstageEvent> getExecuteFiveMinEvent() {
		return executeFiveMinEvent;
	}
	public static List<AbsBackstageEvent> getExecuteOneDayEvent() {
		return executeOneDayEvent;
	}
	public static List<AbsBackstageEvent> getExecuteOneHourEvent() {
		return executeOneHourEvent;
	}
	public static List<AbsBackstageEvent> getResetCacheOnDayEvent() {
		return resetCacheOnDayEvent;
	}
	
}
