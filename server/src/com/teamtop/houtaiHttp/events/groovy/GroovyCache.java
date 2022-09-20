package com.teamtop.houtaiHttp.events.groovy;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GroovyCache {

	/**	 * 开始同步脚本到子服的时间	 */
	private static long timeBegin = 0; 
	/**	 * 接受到最后一个成功子服回调的时间	 */
	private static long timeEnd = 0;
	/**	 * 本次同步文件成功的区ID	 */
	private static List<Integer> zidGroovySuccessList = Collections.synchronizedList(new ArrayList<Integer>());
	/**	 * 本次同步文件失败的区ID	 */
	private static List<Integer> zidGroovyFailList = Collections.synchronizedList(new ArrayList<Integer>());
	/**	 * 便捷式/查日志，当前选中区	 */
	private static String zidSelect = "";
	/**	 * 文件名	 */
	public static final String DEBUG_FILE_NAME = "Debug.groovy";
	/**	 * 便捷式，文件名	 */
	public static final String DEBUG_CONVENIENT_FILE_NAME = "DebugConvenient.groovy";
	/**	 * 便捷式，结果缓存，key:结果   value:一样结果的区	 */
	private static Map<String, List<Integer>> groovyConvenientResultMap = new HashMap<>();
	/**	 * 便捷式，开始同步脚本到子服的时间	 */
	private static long timeBeginConvenient = 0; 
	/**	 * 便捷式，接受到最后一个成功子服回调的时间	 */
	private static long timeEndConvenient = 0;
	
	public static long getTimeBegin() {
		return timeBegin;
	}
	public static void setTimeBegin(long timeBegin) {
		GroovyCache.timeBegin = timeBegin;
	}
	public static long getTimeEnd() {
		return timeEnd;
	}
	public static void setTimeEnd(long timeEnd) {
		GroovyCache.timeEnd = timeEnd;
	}
	public static List<Integer> getZidGroovySuccessList() {
		return zidGroovySuccessList;
	}
	public static void setZidGroovySuccessList(List<Integer> zidGroovySuccessList) {
		GroovyCache.zidGroovySuccessList = zidGroovySuccessList;
	}
	public static void addZidGroovySuccessList(int zid) {
		zidGroovySuccessList.add(zid);
	}
	public static List<Integer> getZidGroovyFailList() {
		return zidGroovyFailList;
	}
	public static void setZidGroovyFailList(List<Integer> zidGroovyFailList) {
		GroovyCache.zidGroovyFailList = zidGroovyFailList;
	}
	public static void addZidGroovyFailList( int zid) {
		zidGroovyFailList.add(zid);
	}
	public static String getZidSelect() {
		return zidSelect;
	}
	public static void setZidSelect(String zidSelect) {
		GroovyCache.zidSelect = zidSelect;
	}
	public static Map<String, List<Integer>> getGroovyConvenientResultMap() {
		return groovyConvenientResultMap;
	}
	public static void setGroovyConvenientResultMap(Map<String, List<Integer>> groovyConvenientResultMap) {
		GroovyCache.groovyConvenientResultMap = groovyConvenientResultMap;
	}
	public static long getTimeBeginConvenient() {
		return timeBeginConvenient;
	}
	public static void setTimeBeginConvenient(long timeBeginConvenient) {
		GroovyCache.timeBeginConvenient = timeBeginConvenient;
	}
	public static long getTimeEndConvenient() {
		return timeEndConvenient;
	}
	public static void setTimeEndConvenient(long timeEndConvenient) {
		GroovyCache.timeEndConvenient = timeEndConvenient;
	}
}
