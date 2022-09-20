package com.teamtop.util.db.trans;

import java.util.ArrayList;
import java.util.List;
/**
 * 配合ObjByteArr工具使用
 * 用于byte[]生成可操作的节点数据。
 * @author Kyle
 */
public class TransNodeV2 {
	private List<TransNodeV2> children;
	private TransNodeV2 parent;
	private byte type;
	private Object value;
	private Object key;
	public void addChild(TransNodeV2 node){
		if(children==null){
			children = new ArrayList<TransNodeV2>();
		}
		children.add(node);
		node.parent = this;
	}
	
	public TransNodeV2(byte type,Object value) {
		this.type = type;
		this.value = value;
	}
	
	public static TransNodeV2 createNode(byte type,Object value){
		TransNodeV2 node = new TransNodeV2(type,value);
		return node;
	}
	public TransNodeV2 getLastNode(){
		if(children!=null){
			return children.get(children.size()-1);
		}else{
			return null;
		}
		
	}
	public List<TransNodeV2> getChildren() {
		return children;
	}
	public void setChildren(List<TransNodeV2> children) {
		this.children = children;
	}
	public TransNodeV2 getParent() {
		return parent;
	}
	public void setParent(TransNodeV2 parent) {
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
