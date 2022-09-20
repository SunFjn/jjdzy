package com.teamtop.cross;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 子服中央服之间通讯的数据结构
 *
 */
public class CrossDataOld {
	/**
	 * 需要更新的属性和值映射
	 */
	@FieldOrder(order = 1)
	private Map<String,Object> map = new HashMap<String,Object>(4);
	/**
	 * 回调的cmd，没有回调就为0
	 */
	@FieldOrder(order = 2)
	private int callbackCmd;
	/**
	 * 添加key value
	 * @param key  key
	 * @param value  值
	 */
	public CrossDataOld put(Object key,Object value){
		map.put(key.toString(), value);
		return this;
	}
	/**
	 * 获取某个值
	 * @param key key
	 * @return
	 */
	public Object get(Object key){
		return map.get(key);
	}
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

	public Map<String, Object> getMap() {
		return map;
	}
	public int getCallbackCmd() {
		return callbackCmd;
	}
	public CrossDataOld() {
		super();
	}
	public void setMap(Map<String, Object> map) {
		this.map = map;
	}
	public CrossDataOld(String key,Object value) {
		super();
		this.map.put(key, value);
	}
	
}
