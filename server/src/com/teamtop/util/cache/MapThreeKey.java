package com.teamtop.util.cache;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MapThreeKey<K1,K2,K3,V> extends NormalCache{
	private Map<K1,Map<K2,Map<K3,V>>> map;
	
	public MapThreeKey(String name,boolean threadSafe) {
		setThreadSafe(threadSafe);
		if(threadSafe){
			this.map = new ConcurrentHashMap<K1,Map<K2, Map<K3,V>>>();
		}else{
			this.map = new HashMap<K1,Map<K2, Map<K3,V>>>();
		}
		super.addMMCache(name, map);
	}
	
	public Map<K1,Map<K2,Map<K3,V>>> get(){
		return this.map;
	}
	
	public Map<K2,Map<K3,V>> get(K1 key){
		return map.get(key);
	}
	
	public Map<K3,V> get(K1 key1,K2 key2){
		Map<K2, Map<K3, V>> map2 = map.get(key1);
		if(map2==null) return null;
		return map2.get(key2);
	}
	
	public V get(K1 key1,K2 key2,K3 key3){
		if(key3==null) return null;
		Map<K2, Map<K3, V>> map2 = map.get(key1);
		if(map2==null) return null;
		Map<K3, V> map3 = map2.get(key2);
		if(map3==null) return null;
		return map3.get(key3);
	}
	
	public void put(K1 key1,Map<K2,Map<K3,V>> value){
		map.put(key1, value);
	}
	
	public void put(K1 key1,K2 key2,K3 key3,V value){
		Map<K2, Map<K3, V>> map2 = map.get(key1);
		if(map2==null){
			if(threadSafe){
				map2 = new ConcurrentHashMap<K2,Map<K3,V>>();
			}else{
				map2 = new HashMap<K2,Map<K3,V>>();
			}
			map.put(key1, map2);
		}
		Map<K3, V> map3 = map2.get(key2);
		if(map3==null){
			if(threadSafe){
				map3 = new ConcurrentHashMap<K3, V>();
			}else{
				map3 = new HashMap<K3, V>();
			}
			map2.put(key2, map3);
		}
		map3.put(key3, value);
	}
	
	public V remove(K1 key1,K2 key2,K3 key3){
		Map<K2, Map<K3, V>> map2 = map.get(key1);
		if(map2==null){
			return null;
		}
		Map<K3, V> map3 = map2.get(key2);
		if(map3==null){
			return null;
		}
		return map3.remove(key3);
	}
}
