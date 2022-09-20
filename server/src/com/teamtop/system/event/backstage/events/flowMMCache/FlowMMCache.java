package com.teamtop.system.event.backstage.events.flowMMCache;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.cache.union.SysEnum;
import com.teamtop.util.log.LogTool;

public class FlowMMCache {
	/**
	 * 流水列表
	 */
	private static ConcurrentLinkedQueue<B_FlowMMCache> FlowMMCacheModelList = new ConcurrentLinkedQueue<B_FlowMMCache>();
	/**
	 * 保存所有缓存对象的map，key为缓存的名称，value对缓存对象
	 */
	private static ConcurrentHashMap<String, Object> otherCacheMap = new ConcurrentHashMap<String, Object>();
	/**
	 * 缓存名字值是1 2 3 4，对应的名字
	 */
	private static Map<SysEnum, Map<Integer, String>> cacheNameMap = new HashMap<SysEnum, Map<Integer, String>>();
	
	/**
	 * 统计缓存类、字段名
	 */
	@Deprecated
	public static void regCacheName(String classname,SysEnum sysEnum,Integer cacheNameVal){
		try {
			Map<Integer, String> map = cacheNameMap.get(sysEnum);
			if(map==null){
				map = new HashMap<Integer, String>();
				cacheNameMap.put(sysEnum, map);
			}
			if(!map.containsKey(cacheNameVal)){
				Class<?> clazz = Class.forName(classname);
				Field[] declaredFields = clazz.getDeclaredFields();
				for(Field field:declaredFields){
					field.setAccessible(true);
					Object object = field.get(null);
					if(object instanceof Integer){
						Integer objInt = (Integer) object;
						if(cacheNameVal.equals(objInt)){
							map.put(cacheNameVal, field.getName());
							break;
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, FlowMMCache.class, "regCacheName Exception!");
		}
	}
	
	public static String getCacheName(SysEnum sysEnum,Integer cacheNameInt){
		Map<Integer, String> map = cacheNameMap.get(sysEnum);
		if(map!=null){
			return map.get(cacheNameInt);
		}
		return "notfound";
	}
	/**
	 * 添加一个缓存对象到缓存管理
	 * @param name 缓存名称
	 * @param obj 缓存对象
	 */
	@Deprecated
	public static void addCache(String name, Object obj){
		otherCacheMap.put(name, obj);
	}
	
	@Deprecated
	public static ConcurrentHashMap<String, Object> getOtherCacheMap() {
		return otherCacheMap;
	}

	/**
	 * 获取流水记录List
	 * @return
	 */
	public static ConcurrentLinkedQueue<B_FlowMMCache> getFlowMMCacheModelList() {
		return FlowMMCacheModelList;
	}
	
	/**
	 * 增加一条流水记录
	 * @param FlowMMCacheModel
	 */
	public static void addFlowVigor(B_FlowMMCache FlowMMCacheModel){
		FlowMMCacheModelList.add(FlowMMCacheModel);
	}
	
}
