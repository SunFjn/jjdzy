package com.teamtop.houtaiHttp.events.version;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class VersionCache {

	/**	 * 9999区临时缓存，子服回调的数据  key:版本号  value:区号	 */
	private static Map<String,List<Integer>> versionMap = new HashMap<String,List<Integer>>();
	/**	 * 9999区临时缓存，中央服版本号数据  key:版本号  value:区号	 */
	private static Map<String,List<Integer>> versionCrossMap = new HashMap<String,List<Integer>>();
	/**	 * 接受时间	 */
	private static long timeBegin = 0; 
	/**	 * 接受到最后一个的时间	 */
	private static long timeEnd = 0;
	/**	 * 统计版本号的区	 */
	private static int zidSaveVersion = 0;

	public static Map<String, List<Integer>> getVersionMap() {
		return versionMap;
	}
	public static void setVersionMap(Map<String, List<Integer>> versionMap) {
		VersionCache.versionMap = versionMap;
	}
	public static void clearVersionMap() {
		versionMap.clear();
	}
	public static Map<String, List<Integer>> getVersionCrossMap() {
		return versionCrossMap;
	}
	public static void setVersionCrossMap(Map<String, List<Integer>> versionCrossMap) {
		VersionCache.versionCrossMap = versionCrossMap;
	}
	public static void clearVersionCrossMap() {
		versionCrossMap.clear();;
	}
	public static long getTimeBegin() {
		return timeBegin;
	}
	public static void setTimeBegin(long timeBegin) {
		VersionCache.timeBegin = timeBegin;
	}
	public static long getTimeEnd() {
		return timeEnd;
	}
	public static void setTimeEnd(long timeEnd) {
		VersionCache.timeEnd = timeEnd;
	}
	public static int getZidSaveVersion() {
		return zidSaveVersion;
	}
	public static void setZidSaveVersion(int zidSaveVersion) {
		VersionCache.zidSaveVersion = zidSaveVersion;
	}
}
