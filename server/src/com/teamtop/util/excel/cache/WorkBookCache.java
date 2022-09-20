package com.teamtop.util.excel.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WorkBookCache {
	private static final Map<String, List<String>> mapCache = new ConcurrentHashMap<String, List<String>>();
	public static final HashMap<String,HashMap<String,Object[]>> allDataCache = new HashMap<String,HashMap<String,Object[]>>();
//	public static final HashMap<String,HashMap<String, String[]>> excelMap = new HashMap<String,HashMap<String, String[]>>();

	/**
	 * 设置值
	 * @param key
	 * @param value
	 */
	public static void setMapCache(String key, List<String> value) {
		mapCache.put(key, value);
	}
	
	/**
	 * 根据文件名（Excel文档的名称，非绝对路径）称读取缓存中的sharedStrings.xml数据，读取后该map失效。
	 * @param fileName
	 * @return
	 */
	public static List<String> getSharedStringWork(String fileName) {
		return mapCache.remove(fileName);
	}
}
