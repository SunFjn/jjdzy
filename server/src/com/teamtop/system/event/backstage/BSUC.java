package com.teamtop.system.event.backstage;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
/**
 * 后台统一缓存管理<br/>
 * 所有缓存使用此类管理get和set<br/>
 * 目前仅提供监控功能，不提供类似LRU的功能
 * @author Administrator
 *
 */
public class BSUC {
	private static Map<BSEnum, ConcurrentHashMap<Integer,Object>> sm = new ConcurrentHashMap<BSEnum, ConcurrentHashMap<Integer,Object>>();
	/**
	 * 注册用于监控，请不要把被复制的对象直接=null处理，否则不能监控
	 * @param name 模块名字
	 * @param t 对象
	 * @return
	 */
	public static <T> T reg(String name,T t){
		return t;
	}
	/**
	 * 注册缓存
	 * @param BSEnum
	 * @param name
	 * @param value
	 */
	/*public static void regCache(BSEnum BSEnum,int name,Object value){
		ConcurrentHashMap<Integer, Object> map2 = sm.get(BSEnum);
		if(map2==null){
			map2 = new ConcurrentHashMap<Integer, Object>();
			sm.put(BSEnum, map2);
		}
		map2.put(name, value);
	}*/
	/**
	 * 获取get
	 * @param BSEnum 各系统枚举
	 * @param name 自定义缓存名字
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <V> V get(BSEnum BSEnum,int name){
		return (V) sm.get(BSEnum).get(name);
	}
	/**
	 * 获取第一层key对应的value，适用于缓存是map结构
	 * @param BSEnum 各系统枚举
	 * @param name 自定义缓存名字
	 * @param k key值
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <K,V> V getMap(BSEnum BSEnum,int name,K k){
		Object object = sm.get(BSEnum).get(name);
		Map<K, V> map = (Map<K, V>) object;
		V v = map.get(k);
		return v; 
	}
	/**
	 * set map结构的缓存数据
	 * @param BSEnum
	 * @param name
	 * @param k
	 * @param v
	 */
	@SuppressWarnings("unchecked")
	public static <K,V> void putMap(BSEnum BSEnum,int name,K k,V v){
		Object object = sm.get(BSEnum).get(name);
		Map<K, V> map = (Map<K, V>) object;
		map.put(k, v);
	}
}
