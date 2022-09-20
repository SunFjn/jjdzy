package com.teamtop.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.util.log.LogTool;


/**
 * 普通缓存，一般使用HashMap和ConcurrentHashMap
 * @author Administrator
 *
 * @param <K>
 * @param <V>
 */
public class MapOneKey<K,V> extends NormalCache{
	private Map<K, V> map;
	/**
	 * 构造方法
	 * @param name 如果name不为null，则加入缓存统计管理
	 * @param map
	 */
	public MapOneKey(String name,Map<K, V> map) {
		this.map = map;
		super.addMMCache(name, map);
	}
	
	public MapOneKey(String name,boolean threadSafe) {
		setThreadSafe(threadSafe);
		if(threadSafe){
			this.map = new ConcurrentHashMap<K,V>();
		}else{
			this.map = new HashMap<K,V>();
		}
		super.addMMCache(name, map);
	}

	public V get(K key){
		V obj = map.get(key);
		return obj;
	}
	public void put(K key,V value){
		map.put(key, value);
	}
	
	public Map<K,V> get(){
		return map;
	}
	
	public V remove(K k){
		return map.remove(k);
	}
	/**
	 * 当value为ConcurrentSkipListSet时，可以调用此方法。key没有对应的value，会根据传入的class自动创建
	 * @param key
	 * @param realValue
	 * @param clazz
	 */
	@SuppressWarnings("unchecked")
	public void putConcurrentSkipListSet(K key,Object realValue){
		V v = get(key);
		if(v==null){
			try {
				v = (V) new ConcurrentSkipListSet<>();
				put(key, v);
			} catch (Exception e) {
				LogTool.error(e,this,"key:"+key);
			}
		}
		Set<Object> set = (Set<Object>) v;
		set.add(realValue);
	}
	
	/**
	 * 当value为HashSet时，可以调用此方法。key没有对应的value，会根据传入的class自动创建
	 * @param key
	 * @param realValue
	 * @param clazz
	 */
	@SuppressWarnings("unchecked")
	public void putHashSet(K key,Object realValue){
		V v =  get(key);
		if(v==null){
			try {
				v = (V) new HashSet<>();
				put(key, v);
			} catch (Exception e) {
				LogTool.error(e,this,"key:"+key);
			}
		}
		Set<Object> set = (Set<Object>) v;
		set.add(realValue);
	}	
	
	/**
	 * 当value为ArrayList时，可以调用此方法。key没有对应的value，会根据传入的class自动创建
	 * @param key
	 * @param realValue
	 * @param clazz
	 */
	@SuppressWarnings("unchecked")
	public void putArrayList(K key,Object realValue){
		V v =  get(key);
		if(v==null){
			try {
				v = (V) new ArrayList<>();
				put(key, v);
			} catch (Exception e) {
				LogTool.error(e,this,"key:"+key);
			}
		}
		Set<Object> set = (Set<Object>) v;
		set.add(realValue);
	}
	/**
	 * 当value为set时,移除
	 * @param key
	 * @param realValue
	 */
	@SuppressWarnings("unchecked")
	public void removeSet(K key,Object realValue){
		V v =  get(key);
		if(v==null){
			return;
		}
		Set<Object> set = (Set<Object>) v;
		set.remove(realValue);
	}
	/**
	 * 当value为List时,移除
	 * @param key
	 * @param realValue
	 */
	@SuppressWarnings("unchecked")
	public void removeList(K key,Object realValue){
		V v =  get(key);
		if(v==null){
			return;
		}
		List<Object> list = (List<Object>) v;
		list.remove(realValue);
	}

	@Override
	public String toString() {
		return "MapOneKey [map=" + map + "]";
	}
	public void clear(){
		map.clear();
	}
}
