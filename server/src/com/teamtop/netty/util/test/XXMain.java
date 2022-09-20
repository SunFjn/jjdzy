package com.teamtop.netty.util.test;

import java.lang.reflect.Method;

public class XXMain {
	public static void main(String[] args) {
		Class<?> clazz = XXCache.class;
		try {
			for(int i=1;i<=20;i++){
				System.err.println("i:"+i);
				Object ins = clazz.newInstance();
				Method method = XXCache.class.getDeclaredMethod("p"+i);
				method.invoke(ins);
				method.invoke(ins);
				method.invoke(ins);
			}
		} catch (Exception e) {
			e.printStackTrace();
		};
	}
}
