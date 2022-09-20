package com.teamtop.util.cache;


public abstract class AbsCacheDBHandler<K,V> {
	public abstract void sync(V v) throws Exception;
	public abstract V find(K key) throws Exception;
	public boolean remove(V v){
		return false;
	}
}
