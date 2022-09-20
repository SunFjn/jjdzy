package com.teamtop.houtaiHttp.events.log;

import java.util.HashMap;
import java.util.Map;

public class LogCache {

	/**	 * 记录保存数量	 */
	private static Map<String, Integer> exceptionNumMap = new HashMap<String, Integer>();
	/**	 * 查报错时间	 */
	private static String timeStr = "";
	/**	 * 记录最后一次统计报错的时间	 */
	private static String timeLastNoteStr = "";

	
	
	public static Map<String, Integer> getExceptionNumMap() {
		return exceptionNumMap;
	}
	public static void setExceptionNumMap(Map<String, Integer> exceptionNumMap) {
		LogCache.exceptionNumMap = exceptionNumMap;
	}
	public static String getTimeStr() {
		return timeStr;
	}
	public static void setTimeStr(String timeStr) {
		LogCache.timeStr = timeStr;
	}
	public static String getTimeLastNoteStr() {
		return timeLastNoteStr;
	}
	public static void setTimeLastNoteStr(String timeLastNoteStr) {
		LogCache.timeLastNoteStr = timeLastNoteStr;
	}
}
