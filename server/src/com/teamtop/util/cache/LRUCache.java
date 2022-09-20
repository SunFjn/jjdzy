package com.teamtop.util.cache;

/**
 * LRU缓存
 * @author Administrator
 *
 * @param <K>
 * @param <V>
 */
public class LRUCache<K,V>{
	protected LRUMap<K,V> map;
	protected int maxsize = 100;
	/**
	 * 构造方法，构造一个LRU
	 * @param name 如果name不为null，则加入缓存统计管理
	 * @param map
	 * @param maxsize
	 */
	public LRUCache(String name, int maxsize) {
		this.maxsize = maxsize;
		map = new LRUMap<K,V>(this.maxsize);
	}

	public V get(K key){
		V obj = map.get(key);
		return obj;
	}
	
	public void put(K key,V value){
		map.put(key, value);
	}


	public LRUMap<K,V> get(){
		return map;
	}
	
	public LRUCache() {
		super();
	}
}
