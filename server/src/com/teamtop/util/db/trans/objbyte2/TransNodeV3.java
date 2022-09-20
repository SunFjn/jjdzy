package com.teamtop.util.db.trans.objbyte2;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * 配合ObjByteArr工具使用
 * 用于byte[]生成可操作的节点数据。
 * @author Kyle
 */
public class TransNodeV3 {
	private Map<Integer,TransNodeV3> children;
	private List<TransNodeV3> childrenList;
	private TransNodeV3 parent;
	private byte type;
	private Object value;
	private Object key;
	public void addChild(int order,TransNodeV3 node){
		if(children==null){
			children = new HashMap<Integer, TransNodeV3>();
		}
		children.put(order,node);
		node.parent = this;
	}
	public void addChild(TransNodeV3 node){
		if(childrenList==null){
			childrenList = new ArrayList<>();
		}
		childrenList.add(node);
		node.parent = this;
	}
	public TransNodeV3(byte type,Object value) {
		this.type = type;
		this.value = value;
	}
	
	public static TransNodeV3 createNode(byte type,Object value){
		TransNodeV3 node = new TransNodeV3(type,value);
		return node;
	}
	public TransNodeV3 getLastNode(){
		if(childrenList!=null){
			return childrenList.get(childrenList.size()-1);
		}else{
			return null;
		}
		
	}
	
	public List<TransNodeV3> getChildrenList() {
		return childrenList;
	}
	public void setChildrenList(List<TransNodeV3> childrenList) {
		this.childrenList = childrenList;
	}
	public Map<Integer, TransNodeV3> getChildren() {
		return children;
	}

	public void setChildren(Map<Integer, TransNodeV3> children) {
		this.children = children;
	}

	public TransNodeV3 getParent() {
		return parent;
	}
	public void setParent(TransNodeV3 parent) {
		this.parent = parent;
	}

	public byte getType() {
		return type;
	}

	public void setType(byte type) {
		this.type = type;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public Object getKey() {
		return key;
	}

	public void setKey(Object key) {
		this.key = key;
	}
}
