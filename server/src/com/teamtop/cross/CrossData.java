package com.teamtop.cross;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 子服中央服之间通讯的数据结构
 *
 */
public class CrossData {
	/**
	 * 需要更新的属性和值映射
	 */
	@FieldOrder(order = 1)
	private Map<String,String> map = new HashMap<String,String>(4);
	/**
	 * 回调的cmd，没有回调就为0
	 */
	@FieldOrder(order = 2)
	private int callbackCmd;

	
	/**
	 * 添加key value
	 * @param key  key
	 * @param value  值(复杂类对象)
	 * @throws java.lang.Exception 
	 */
	public CrossData putObject(Object key, Object obj) {
		if (obj == null) {
			try {
				throw new Exception("传入参数null错误");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
//		if ((!(obj instanceof String)) && CommonUtil.isBasicType(obj)) {
//			try {
//				throw new Exception("传入参数错误");
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
		String data = JSON.toJSONString(obj);
		map.put(key.toString(), data);
		return this;
	}
	
	/**
	 * 获取对应类对象
	 * @param key
	 * @param t 类对象
	 * 例如: int num = crossData.getObject(key, Integer.class);
	 * 例如: String str = crossData.getObject(key, String.class);
	 * 例如: Map str = crossData.getObject(key, new TypeReference<Map<Integer, Integer>>(){}.getType());
	 * @return
	 */
	public <T> T getObject(Object key, Class<T> classes) {
		String data = (String) map.get(key.toString());
		T t = JSONObject.parseObject(data, classes);
		return t;
	};
	
	/**
	 * 获取对应类对象
	 * @param key
	 * @param type 反射类型   获取方式 type = new TypeReference< T>() {}.getType()
	 * @return
	 */
	public <T> T getObject(Object key, Type type) {
		String data = (String) map.get(key.toString());
		T t = JSONObject.parseObject(data, type);
		return t;
	}
	/**
	 * 不支持concurrentHashMap
	 */
	public <K, V> Map<K, V> getObjectMap(Object key, Class<K> keyType, Class<V> valueType) {
		String data = (String) map.get(key.toString());
		TypeReference<Map<K, V>> typeReference = new TypeReference<Map<K, V>>(){};
		return JSONObject.parseObject( data, typeReference);
	}
	public <V> List<V> getObjectList(Object key, Class<V> valueType) {
		String data = (String) map.get(key.toString());
		TypeReference<List<V>> typeReference = new TypeReference<List<V>>(){};
		return JSONObject.parseObject( data, typeReference);
	}
	public <K> Set<K> getObjectSet(Object key, Class<K> keyType) {
		String data = (String) map.get(key.toString());
		TypeReference<Set<K>> typeReference = new TypeReference<Set<K>>(){};
		return JSONObject.parseObject( data, typeReference);
	}
	public <K> TreeSet<K> getObjectTreeSet(Object key, Class<K> keyType) {
		String data = (String) map.get(key.toString());
		TypeReference<TreeSet<K>> typeReference = new TypeReference<TreeSet<K>>(){};
		return JSONObject.parseObject( data, typeReference);
	}
	
	/**
	 * 添加key value
	 * @param key  key
	 * @param value  值
	 */
//	public CrossData put(Object key,long value){
//		map.put(key.toString(), String.valueOf(value));
//		return this;
//	}
	
	/**
	 * 添加key value
	 * @param key  key
	 * @param value  值
	 */
//	public CrossData put(Object key,boolean value){
//		map.put(key.toString(), String.valueOf(value));
//		return this;
//	}
	
	/**
	 * 获取某个值
	 * @param key key
	 * @return
	 */
//	private Object get(Object key) {
//		return map.get(key);
//	}
	/**
	 * 清空所有属性值 
	 */
	public void finishGet(){
		map.clear();
	}
	
	/*public Map<Object, Object> map() {
		return map;
	}*/
	
	public void setCallbackCmd(int callbackCmd) {
		this.callbackCmd = callbackCmd;
	}

	public Map<String, String> getMap() {
		return map;
	}
	public int getCallbackCmd() {
		return callbackCmd;
	}
	public CrossData() {
		super();
	}
	public void setMap(Map<String, String> map) {
		this.map = map;
	}
	public CrossData( Object key, Object value) {
		super();
		putObject(key, value);
	}

//	public CrossData(String key, long value) {
//		super();
//		this.map.put(key.toString(), String.valueOf(value));
//	}
	
//	public CrossData(String key, boolean value) {
//		super();
//		this.map.put(key, String.valueOf(value));
//	}

}
