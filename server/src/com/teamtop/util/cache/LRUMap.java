package com.teamtop.util.cache;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by liuzhao on 14-5-15.
 */
public class LRUMap<K, V> extends LinkedHashMap<K, V> {
	private static final long serialVersionUID = 5817448690753726887L;
//	private Logger logger = LoggerFactory.getLogger(LRUMap.class);
	private final int MAX_CACHE_SIZE;
	private final Lock lock = new ReentrantLock();

	public LRUMap(int cacheSize) {
		super((int) Math.ceil(cacheSize / 0.75) + 1, 0.75f, true);
		MAX_CACHE_SIZE = cacheSize;
	}

	@Override
	protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
//		V value = eldest.getValue();
		if(size() > MAX_CACHE_SIZE){
			return true;
		}
		return false;
	}

	@Override
	public V get(Object key) {
		try {
			lock.lock();
			return super.get(key);
		} finally {
			lock.unlock();
		}
	}

	@Override
	public V put(K key, V value) {
		try {
			lock.lock();
			return super.put(key, value);
		} finally {
			lock.unlock();
		}
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		for (Map.Entry<K, V> entry : entrySet()) {
			sb.append(String.format("%s:%s ", entry.getKey(), entry.getValue()));
		}
		return sb.toString();
	}
}