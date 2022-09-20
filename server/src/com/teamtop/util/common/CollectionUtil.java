package com.teamtop.util.common;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

/**
 * 集合工具类
 * 
 * 
 */
public class CollectionUtil {
	
	public static Comparator<Map.Entry<String, Object>> entryComp = new Comparator<Map.Entry<String, Object>>() {   
	    public int compare(Map.Entry<String, Object> o1, Map.Entry<String, Object> o2) {
	        return o1.getKey().compareTo(o2.getKey());
	    }
	};

	/**
	 * 判断指定集合是否为空,集合为null或者集没有元素都为空
	 * 
	 * @param <T>
	 * @param collection
	 * @return
	 *            <li>true空
	 *            <li>false非空
	 */
	public static <T> boolean isEmpty(Collection<T> collection) {
		if (collection == null || collection.isEmpty()) {
			return true;
		}
		return false;
	}

	/**
	 * 判断指定MAP是否为空,MAP为null或者集没有元素都为空
	 * 
	 * @param <T>
	 * @param map
	 * @return
	 *            <li>true空
	 *            <li>false非空
	 */
	public static <T, K> boolean isEmpty(Map<T, K> map) {
		if (map == null || map.isEmpty()) {
			return true;
		}
		return false;
	}

	/**
	 * 取得空元素集合
	 * 
	 * @param <T>
	 * @return {@link List}
	 */
	public static <T> List<T> getEmptyList() {
		return Collections.emptyList();
	}
}
