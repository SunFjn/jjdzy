package com.teamtop.util.cache;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.log.LogTool;

public abstract class DBCache<K,V> {
	private Logger logger = LoggerFactory.getLogger(DBCache.class);
	protected int syncPeriod;
	protected AbsCacheDBHandler<K, V> handler;
	public int getSyncPeriod() {
		return syncPeriod;
	}
	public V get(K key){
		V obj = get().get(key);
		if(obj==null){
			//get from db
			if(handler!=null)
				try {
					obj = handler.find(key);
					if(obj!=null){
						get().put(key, obj);
					}
				} catch (Exception e) {
					logger.error(LogTool.exception(e,"key:"+key));
				}
		}
		return obj;
	}
	@SuppressWarnings("unchecked")
	public void sync(Object obj) throws Exception{
		V v =(V) obj;
		handler.sync(v);
	}
	@SuppressWarnings("unchecked")
	public boolean remove(Object obj){
		V v = (V) obj;
		return handler.remove(v);
	}
	public abstract Map<K,V> get();
	
}
