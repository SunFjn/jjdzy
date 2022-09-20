package com.teamtop.util.db.trans;

import java.io.Serializable;
import java.util.HashMap;

public class SendDataMap implements Serializable{
	private static final long serialVersionUID = 1L;
	private HashMap<Object,Object> map = new HashMap<>(4,0.75f);
	public void put(Object key,Object value){
		map.put(key, value);
	}
	public Object get(Object key){
		return map.get(key);
	}
	
	public HashMap<Object, Object> getMap() {
		return map;
	}

	private SendDataMap child;
	private SendDataMap parent;
	public SendDataMap getChild() {
		return child;
	}
	public void setChild(SendDataMap child) {
		this.child = child;
	}
	public SendDataMap getParent() {
		return parent;
	}
	public void setParent(SendDataMap parent) {
		this.parent = parent;
	}
	@Override
	public String toString() {
		return "SendDataMap [map=" + map + "]";
	}
	
}
