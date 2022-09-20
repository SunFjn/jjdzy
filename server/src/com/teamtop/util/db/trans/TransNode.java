package com.teamtop.util.db.trans;

import java.util.ArrayList;
import java.util.List;
/**
 * 配合ObjStrTransUtil工具使用
 * 用于字符串生成可操作的节点数据。
 * @author Kyle
 */
public class TransNode {
	private List<TransNode> children;
	private TransNode parent;
	private String name;
	private String key;
	public void addChild(TransNode node){
		if(children==null){
			children = new ArrayList<TransNode>();
		}
		children.add(node);
		node.parent = this;
	}
	
	public TransNode(String name) {
		this.name = name;
	}

	public static TransNode createNode(String name){
		TransNode node = new TransNode(name);
		return node;
	}
	
	public List<TransNode> getChildren() {
		return children;
	}
	public void setChildren(List<TransNode> children) {
		this.children = children;
	}
	public TransNode getParent() {
		return parent;
	}
	public void setParent(TransNode parent) {
		this.parent = parent;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	@Override
	public String toString() {
		return name;
	}

}
