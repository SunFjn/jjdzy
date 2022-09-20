package com.teamtop.util.cache.union;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class UnionCache {
	private static Map<SysEnum, ConcurrentHashMap<Integer,Object>> sm = new ConcurrentHashMap<SysEnum, ConcurrentHashMap<Integer,Object>>();
	public static <K, V> void regCache(Class<K> kc,Class<V> vc,SysEnum sysEnum,int name,boolean threadSafe) {
		/*MapOneKey<K, V> map = new MapOneKey<K,V>(sysEnum+"_"+name, threadSafe);
		ConcurrentHashMap<Integer, Object> map2 = sm.get(sysEnum);
		if(map2==null){
			map2 = new ConcurrentHashMap<Integer, Object>();
		}
		map2.put(name, map);*/
	}

}
