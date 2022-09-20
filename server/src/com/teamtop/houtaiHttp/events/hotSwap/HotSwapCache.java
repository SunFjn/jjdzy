package com.teamtop.houtaiHttp.events.hotSwap;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.teamtop.util.cache.union.UC;

public class HotSwapCache {

	/**	 * 接受到热更通知的时间	 */
	private static long timeBegin = 0; 
	/**	 * 接受到最后一个热更回调成功的子服的时间	 */
	private static long timeEnd = 0;
	/**	 * 本次热更成功的区ID	 */
	private static List<Integer> zidHotSwapSuccessList = UC.reg("zidHotSwapSuccessList",Collections.synchronizedList(new ArrayList<Integer>()));
	/**	 * 本次热更失败的区ID	 */
	private static List<Integer> zidHotSwapFailList = UC.reg("zidHotSwapFailList",Collections.synchronizedList(new ArrayList<Integer>()));
	
	public static List<Integer> getZidHotSwapSuccessList() {
		return zidHotSwapSuccessList;
	}
	public static void setZidHotSwapSuccessList(List<Integer> zidHotSwapSuccessList) {
		HotSwapCache.zidHotSwapSuccessList = zidHotSwapSuccessList;
	} 
	public static void addZidHotSwapSuccessList(int zid) {
		zidHotSwapSuccessList.add(zid);
	}
	public static long getTimeBegin() {
		return timeBegin;
	}
	public static void setTimeBegin(long timeBegin) {
		HotSwapCache.timeBegin = timeBegin;
	}
	public static long getTimeEnd() {
		return timeEnd;
	}
	public static void setTimeEnd(long timeEnd) {
		HotSwapCache.timeEnd = timeEnd;
	}
	public static List<Integer> getZidHotSwapFailList() {
		return zidHotSwapFailList;
	}
	public static void setZidHotSwapFailList(List<Integer> zidHotSwapFailList) {
		HotSwapCache.zidHotSwapFailList = zidHotSwapFailList;
	}
	public static void addZidHotSwapFailList(int zid) {
		zidHotSwapFailList.add(zid);
	}
}
