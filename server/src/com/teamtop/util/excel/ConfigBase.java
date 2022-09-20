package com.teamtop.util.excel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunLocalServer;
import com.teamtop.util.excelHotswap.ExcelHotswapCache;

public class ConfigBase<T> {
	private Map<Integer,T> dataMap = new HashMap<Integer,T>();
	private List<T> sortList = new ArrayList<T>();
	public T get(int key){
		return dataMap.get(key);
	}
	protected void put(Integer key,T t){
		dataMap.put(key, t);
		sortList.add(t);
	}
	public Map<Integer,T> getMap(){
		if(GameProperties.isLocalServer()){
			if(!RunLocalServer.isServerStart()){
				StackTraceElement stack[] = Thread.currentThread().getStackTrace();
				ExcelHotswapCache.addMethod(this.getClass().toString(), stack[2].getClassName(), stack[2].getMethodName());
			}
		}
		return dataMap;
	}
	
	public int size(){
		if(GameProperties.isLocalServer()){
			if(!RunLocalServer.isServerStart()){
				StackTraceElement stack[] = Thread.currentThread().getStackTrace();
				ExcelHotswapCache.addMethod(this.getClass().toString(), stack[2].getClassName(), stack[2].getMethodName());
			}
		}
		return dataMap.size();
	}
	
	public List<T> getSortList(){
		if(GameProperties.isLocalServer()){
			if(!RunLocalServer.isServerStart()){
				StackTraceElement stack[] = Thread.currentThread().getStackTrace();
				ExcelHotswapCache.addMethod(this.getClass().toString(), stack[2].getClassName(), stack[2].getMethodName());
			}
		}
		return sortList;
	}
	
}
