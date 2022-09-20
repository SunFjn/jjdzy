package com.teamtop.netty.util.nettyCache;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.teamtop.main.RunServerException;

/**
 * 节点工具(通讯用)
 * @author Kyle
 *
 */
public class NodeUtil {
	public static void main(String[] args) throws RunServerException{
		Node node = strToNode("B-[U-[I-S]-I]-[I-S]-U-B");
		Object[] nodeArr = nodeToArr(node);
		System.out.println(nodeArr);
	}
	
	public static Node strToNode(String protocal){
		Node currNode = new Node("root");
		int length = protocal.length();
		Pattern pattern = Pattern.compile("\\d");
		
		for(int i=0;i<length;i++){
			String currStr = String.valueOf(protocal.charAt(i));
			if("[".equals(currStr)){
				Node newNode = Node.createNode(currStr);
				currNode.addChild(newNode);
				currNode = newNode;
			}else if("]".equals(currStr)){
				currNode = currNode.getParent();
			}else if(!"-".equals(currStr)){
				StringBuilder sb = null;
				while(true){
					Matcher matcher = pattern.matcher(currStr);
					if(matcher.find()){
						if(sb==null) sb = new StringBuilder();
						sb.append(currStr);
						i++;
						if(i<length){
							currStr = String.valueOf(protocal.charAt(i));
						}else{
							break;
						}
					}else{
						break;
					}
				}
				if(sb!=null){
					currStr = sb.toString();
				}
				Node newNode = Node.createNode(currStr);
				currNode.addChild(newNode);
			}
			
		}
		return currNode;
	}
	
	public static Object[] nodeToArr(Node node) throws RunServerException{
		return Node.iteratorNode(node);
	}
}


