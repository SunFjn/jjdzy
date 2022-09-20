package com.teamtop.util.common;

import java.lang.reflect.Method;

/**
 * 枚举工具类
 * 
 * @author pvsp
 * 
 */
public class EnumUtils {

	public EnumUtils() {
	}

	/**
	 * 根据枚举字符串创建指定枚举类
	 * 
	 * @param <T>
	 * @param enumClass
	 * @param name
	 * @return
	 */
	public static <T extends Enum<T>> T getEnum(Class<T> enumClass, String name) {
		return Enum.valueOf(enumClass, name);
	}

	/**
	 * 根据枚举数字创建指定枚举类
	 * 
	 * @param <T>
	 * @param enumClass
	 * @param value
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T extends Enum<T>> T getEnum(Class<T> enumClass, int value) {
		try {
			if (value < 0) {
				return null;
			}
			Method method = enumClass.getMethod("values");
			T[] values = (T[]) method.invoke(enumClass);

			if (values.length > value) {
				return values[value];
			}
			return null;
		} catch (Exception e) {
			return null;
		}
	}

}
