package com.teamtop.netty.util.test;

import java.io.File;
import java.lang.reflect.Method;

import com.teamtop.util.json.JsonUtils;


public class XXExcelMain {
	public static void main(String[] args) throws Exception {
		System.err.println("start");
		JsonUtils.toStr("");
		while(true){
			File file = new File("F:\\workspace\\YT2\\src\\excel\\config");
			int i = 1;
			File[] listFiles = file.listFiles();
			for(File f:listFiles){
				String name = f.getName();
//			System.err.println(name);
				name = name.substring(0, name.indexOf(".java"));
				Thread.sleep(100);
				Class<?> clazz = Class.forName("excel.config."+name);
				Method method = clazz.getMethod("getIns");
				Object obj = method.invoke(null);
//			System.err.println(obj);
				System.err.println(i);
				i++;
			}
			System.err.println("total:"+i);
		}
	}
}
