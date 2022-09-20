package com.teamtop.util.excelHotswap;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.teamtop.main.RunServerException;
import com.teamtop.util.cache.union.SysEnum;
import com.teamtop.util.cache.union.UC;

/**
 * 用于excel热更时的关联操作
 * @author Administrator
 *
 */
public class ExcelHotswapCache {
	public static void main(String[] args) {
		String string = ExcelHotswapCache.class.toString();
		string = string.substring(6, string.length());
		System.err.println(string);
	}
	private static HashMap<String, List<Method>> ehsMap = UC.reg("ehsMap", new HashMap<String, List<Method>>());
	
	public static HashMap<String, List<Method>> getHotswapMap(){
		return ehsMap;
	}
	
	public static void addMethod(String clazz,String className,String methodName){
		try {
			clazz = clazz.substring(6, clazz.length());
			Class<?> forName = Class.forName(className);
			Method method = forName.getDeclaredMethod(methodName);
			HashMap<String, List<Method>> hotswapMap = getHotswapMap();
			List<Method> list = hotswapMap.get(clazz);
			if(list==null){
				list = new ArrayList<Method>();
				hotswapMap.put(clazz, list);
			}
			if(!list.contains(method)){
				list.add(method);
			}
		} catch (Exception e) {
			try {
				throw new RunServerException(e, "");
			} catch (RunServerException e1) {
				e1.printStackTrace();
			}
		}
	}
}
