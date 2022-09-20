package com.teamtop.util.cache;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
/**
 * 普通缓存，一般使用HashMap和ConcurrentHashMap
 * @author Administrator
 *
 * @param <K>
 * @param <V>
 */
public class MapTwoKey<K1,K2,V> extends NormalCache{
	private Map<K1, Map<K2,V>> map;
	/**
	 * 构造方法
	 * @param name 如果name不为null，则加入缓存统计管理
	 * @param map
	 */
	public MapTwoKey(String name,boolean threadSafe) {
		setThreadSafe(threadSafe);
		if(threadSafe){
			this.map = new ConcurrentHashMap<K1,Map<K2, V>>();
		}else{
			this.map = new HashMap<K1,Map<K2, V>>();
		}
		super.addMMCache(name, map);
	}
	public Map<K1, Map<K2,V>> get(){
		return this.map;
	}
	public Map<K2,V> get(K1 key){
		return map.get(key);
	}
	
	public V get(K1 key1,K2 key2){
		Map<K2,V> map1 = map.get(key1);
		if(map1==null) return null;
		return map1.get(key2);
	}
	
	public void put(K1 key1,Map<K2,V> value){
		this.map.put(key1, value);
	}
	
	public void put(K1 key1,K2 key2,V value){
		Map<K2,V> map1 = map.get(key1);
		if(map1==null){
			if(threadSafe){
				map1 = new ConcurrentHashMap<K2,V>();
			}else{
				map1 = new HashMap<K2,V>();
			}
			map.put(key1, map1);
		}
		map1.put(key2, value);
	}
	public Map<K2,V> remove(K1 key1){
		return map.remove(key1);
	}
	public V remove(K1 key1,K2 key2){
		Map<K2,V> map1 = map.get(key1);
		if(map1==null){
			return null;
		}
		return map1.remove(key2);
	}
}
