package com.teamtop.util.db.trans.crossTrans;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * 配合ObjByteArr工具使用
 * 用于byte[]生成可操作的节点数据。
 * @author Kyle
 */
public class CrossTransNode {
	//简单类型的值
	private Object simpleValue;
	//对象类型的值
	private Map<Integer,CrossTransNode> objValue;
	//map类型的key
	private Object mapKey;
	//map，list，数组类型的值
	private List<CrossTransNode> mapListArrValue;
	private CrossTransNode parent;
	//这个节点的节点类型
	private byte type;
	//这个节点的clazz
	private Class<?> clazz;
	public void addChild(int order,CrossTransNode node){
		if(order==0){
			if(mapListArrValue==null){
				mapListArrValue = new ArrayList<>();
			}
			mapListArrValue.add(node);
		}else{
			if(objValue==null){
				objValue = new HashMap<Integer, CrossTransNode>();
			}
			objValue.put(order,node);
		}
		node.parent = this;
	}
	
	public CrossTransNode(byte type) {
		this.type = type;
	}
	
	public static CrossTransNode createNode(byte type){
		CrossTransNode node = new CrossTransNode(type);
		return node;
	}
	public CrossTransNode getMapListLastNode(){
		if(mapListArrValue!=null){
			return mapListArrValue.get(mapListArrValue.size()-1);
		}else{
			return null;
		}
		
	}
	
	

	public Object getSimpleValue() {
		return simpleValue;
	}

	public void setSimpleValue(Object simpleValue) {
		this.simpleValue = simpleValue;
	}

	public Map<Integer, CrossTransNode> getObjValue() {
		return objValue;
	}

	public void setObjValue(Map<Integer, CrossTransNode> objValue) {
		this.objValue = objValue;
	}

	public Object getMapKey() {
		return mapKey;
	}

	public void setMapKey(Object mapKey) {
		this.mapKey = mapKey;
	}

	public List<CrossTransNode> getMapListArrValue() {
		return mapListArrValue;
	}

	public void setMapListArrValue(List<CrossTransNode> mapListArrValue) {
		this.mapListArrValue = mapListArrValue;
	}

	public Class<?> getClazz() {
		return clazz;
	}

	public void setClazz(String className) throws ClassNotFoundException {
		if("int".equals(className)){
			this.clazz = int.class;
		}else if("short".equals(className)){
			this.clazz = short.class;
		}else if("long".equals(className)){
			this.clazz = long.class;
		}else{
			this.clazz = Class.forName(className);
		}
	}

	public CrossTransNode getParent() {
		return parent;
	}
	public void setParent(CrossTransNode parent) {
		this.parent = parent;
	}

	public byte getType() {
		return type;
	}

	public void setType(byte type) {
		this.type = type;
	}
}
