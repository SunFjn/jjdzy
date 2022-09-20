package com.teamtop.netty.util.nettyCache;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.main.RunServerException;
/**
 * 二叉树节点
 * @author Kyle
 */
public class Node {
	private List<Node> children;
	private Node parent;
	private String name;
	
	public void addChild(Node node){
		if(children==null){
			children = new ArrayList<Node>();
		}
		children.add(node);
		node.parent = this;
	}
	
	public Node(String name) {
		this.name = name;
	}

	public static Node createNode(String name){
		Node node = new Node(name);
		return node;
	}
	
	public static Object[] iteratorNode(Node node) throws RunServerException{
		List<Node> children = node.getChildren();
		Object[] nodeArr = new Object[children.size()];
		int i=0;
		for(Node child:children){
			if(child.children==null){
				String name = child.getName();
				int j=0;
				if("B".equals(name)){
					j = 1;
				}else if("S".equals(name)){
					j = 2;
				}else if("I".equals(name)){
					j = 3;
				}else if("L".equals(name)){
					j = 4;
				}else if("U".equals(name)){
					j = 5;
				}else if("N".equals(name)){
					j = 6;
				}else if("X".equals(name)){
					j = 0;
				}else if(Short.parseShort(name)>0){
					j = Integer.parseInt(name);
				}else{
					throw new RunServerException(null,"cmd err:"+name);
				}
				nodeArr[i] = j;
			}else{
				nodeArr[i] = iteratorNode(child);
			}
			i++;
		}
		return nodeArr;
	}
	
	
	public List<Node> getChildren() {
		return children;
	}
	public void setChildren(List<Node> children) {
		this.children = children;
	}
	public Node getParent() {
		return parent;
	}
	public void setParent(Node parent) {
		this.parent = parent;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Node [children=" + children + ", parent=" + parent + ", name=" + name + "]";
	}
	
}
