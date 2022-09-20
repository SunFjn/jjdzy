package com.teamtop.util.cache;

import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.log.LogTool;

public class DBCache2<K,V> extends ConcurrentHashMap<K, V>{
	private static final long serialVersionUID = 1L;
	private Logger logger = LoggerFactory.getLogger(DBCache2.class);
	private int syncPeriod;
	private AbsCacheDBHandler<K, V> handler;
	public DBCache2(int syncPeriod, AbsCacheDBHandler<K, V> handler) {
		this.syncPeriod = syncPeriod;
		this.handler = handler;
	}
	public int getSyncPeriod() {
		return syncPeriod;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public V get(Object key) {
		K k = (K) key;
		V obj = super.get(k);
		if(obj==null){
			//get from db
			if(handler!=null)
				try {
					obj = handler.find(k);
					if(obj!=null){
						super.put(k, obj);
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
	public boolean delete(Object obj){
		V v = (V) obj;
		return handler.remove(v);
	}
}
