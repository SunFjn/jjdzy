package com.teamtop.util.script;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

import com.teamtop.util.LMMethod.MethodBase;


public class GentreeExecuter {
	
	public GentreeExecuter() {
		valueMap = new HashMap<String, Object>();
	}
	
	public void execute(GentreeNode root) {
//		System.out.print(root);
		
		exestmts(root);
	}
	
	public void mappMethod(String key, MethodBase method) {
		valueMap.put(key, method);
	}
	
	public HashMap<String, Object> valueMap;
	public HashMap<String, Object> rtnMap = new HashMap<String, Object>();
	
	public Object getRtnByInvokeMethod(String key){
		return rtnMap.get(key);
	}
	
	private void exestmts(GentreeNode node) {
		Iterator<GentreeNode> it = node.childs.iterator();
		while(it.hasNext()) {
			GentreeNode stmtnode = it.next();
			exestmt(stmtnode);
		}
	}
	
	private void exestmt(GentreeNode node) {
		if(node.type == GentreeNode.DECLARE) {
			exeDeclare(node);
		}else{
			exeExp(node);
		}
	}
	
	private void exeDeclare(GentreeNode node) {
		GentreeNode namenode = node.childs.get(0);
		GentreeNode expnode = node.childs.get(1);
		Object value = exeExp(expnode);
		valueMap.put(namenode.token.src, value);
//		System.out.print(node);
	}
	
	private Object exeExp(GentreeNode node) {
		Object ret = null;
		if(node.type == GentreeNode.CONST) {
			ret = node.value.getValue();
		}else if(node.type == GentreeNode.NEWTABEL) {
			ret = newTabel(node);
		}else if(node.type == GentreeNode.CALL) {
			ret = callMethod(node);
		}else if(node.type == GentreeNode.VARNAME) {
			ret = valueMap.get(node.token.src);
		}else if(node.type == GentreeNode.NEWARRAY) {
			ret = newArray(node);
		}
			
		return ret;
	}
	
	private HashMap<Object, Object> newTabel(GentreeNode node) {
		HashMap<Object, Object> map = new HashMap<Object, Object>();
		
		Iterator<GentreeNode> it = node.childs.iterator();
		while(it.hasNext()) {
			GentreeNode namenode = it.next();
			GentreeNode valuenode = it.next();
			Object value = exeExp(valuenode);
			
			map.put(namenode.token.src, value);
		}
		
		return map;
	}
	
	private ArrayList<Object> newArray(GentreeNode node) {
		ArrayList<Object> arr = new ArrayList<Object>();
		
		Iterator<GentreeNode> it = node.childs.iterator();
		while(it.hasNext()) {
			GentreeNode valuenode = it.next();
			Object value = exeExp(valuenode);
			
			arr.add(value);
		}
		
		return arr;
	}
	
	private Object exeArgs(GentreeNode node) {
		ArrayList<Object> ret = new ArrayList<Object>();
		
		Iterator<GentreeNode> it = node.childs.iterator();
		while(it.hasNext()) {
			GentreeNode childnode = it.next();
			Object arg = exeExp(childnode);
			ret.add(arg);
		}
		return ret;
	}
	
	private Object callMethod(GentreeNode node) {
		Object ret = null;
		GentreeNode methodnamenode = node.childs.get(0);
		GentreeNode methodargnode = node.childs.get(1);
		MethodBase method = (MethodBase)exeExp(methodnamenode);
		Object args = exeArgs(methodargnode);
		
		Object execute = method.execute(args);
		rtnMap.put(methodnamenode.token.src, execute);
		
		return ret;
	}
	
}
