/**
 * Copyright (c) 2012 teamTopGame
 * All rights reserved.
 */
package com.teamtop.util.excel;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonParser.Feature;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.type.TypeFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.ProbabilityEvent.ProbabilityConst;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;

/**
 * Json序列化
 * @author yxh
 * @since 1.0
 */
public abstract class ExcelJsonUtils {

	
	public static void main(String[] args) throws Exception {
		
	}
	
	private final static Logger logger = LoggerFactory.getLogger(ExcelJsonUtils.class);
	/**
	 * 私有构造函数，防止实例化
	 */
	private ExcelJsonUtils() {
	}

	/**
	 * ObjectMapper实例
	 */
	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	/**
	 * 静态块，可初始化ObjectMapper
	 */
	static {
		configure(Feature.ALLOW_SINGLE_QUOTES, true);
		configure(Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
		configure(Feature.ALLOW_UNQUOTED_CONTROL_CHARS, false);
	}

	/**
	 * 配置ObjectMapper
	 * 
	 * @param f
	 *            特性
	 * @param state
	 *            特性值
	 */
	public static void configure(Feature f, boolean state) {
		OBJECT_MAPPER.configure(f, state);
	}

	/**
	 * 将一个对象序列化成JSON字符串
	 * 
	 * @param objectSource
	 * @return
	 * @throws IOException
	 */
	public static String toStr(Object objectSource){
		try {
			if(objectSource==null) return null;
			return OBJECT_MAPPER.writeValueAsString(objectSource);
		} catch (Exception e) {
			logger.error("jsonEncode error json is:"+objectSource,e);
		}
		return null;
	}
	/**
	 * 根据通用的掉落格式转换成为字符串数组
	 * @param data [1,4200,1,1000;1,4200,2,5000;1,4200,10,4000],[1,4200,1,1000;1,4200,2,5000]
	 * @return
	 */
	public static List<ProbabilityEventModel> getGeneralDropData(String data){
		int max = ProbabilityConst.PRO_100000;
		data = data.substring(1, data.length()-1);
		String[] split = data.split("\\],\\[");
		List<ProbabilityEventModel> list = new ArrayList<ProbabilityEventModel>();
		for(String str:split){
			int[][] intarr = toObj(str, int[][].class);
			ProbabilityEventModel pe = ProbabilityEventFactory.getProbabilityEvent();
			if(intarr.length==1){
				int[] arr = intarr[0];
				int per = arr[3];
				if(per<max){
					pe.addProbabilityEvent(per,new int[]{arr[0],arr[1],1});
					pe.addProbabilityEvent(max-per,null);
//					for(int i=1;i<=arr[2];i++){
//						list.add(pe);
//					}
					list.add(pe);
				}else{
					pe.addProbabilityEvent(per,arr);
					list.add(pe);
				}
			}else{
				int count = 0;
				for(int[] arr:intarr){
					count += arr[3];
					pe.addProbabilityEvent(arr[3],arr);
				}
				//不够1000补足
				int left = max - count;
				if(left>0){
					pe.addProbabilityEvent(left, null);
				}
				list.add(pe);
			}
		}
		return list;
	}
	/**
	 * 将JSON字符串封装成指定对象
	 * 
	 * @param objectSource
	 *            JSON字符串
	 * @param clazz
	 *            指定的类型
	 * @return 返回指定类型的实例
	 * @throws IOException
	 *             IO操作异常
	 */
	@SuppressWarnings("unchecked")
	public static <T> T toObj(String objectSource, Class<T> clazz){
		try {
			if(StringUtils.isBlank(objectSource) || "0".equals(objectSource))return null;
			if(objectSource.indexOf("{")<0 && objectSource.indexOf("[")<0){
				if(clazz==int[][].class){
					//二维
					String[] split = objectSource.split(";");
					int size = split.length;
					int[][] array = new int[size][];
					for(int i=0;i<size;i++){
						String[] split2 = split[i].split(",");
						int[] subarr = new int[split2.length];
						for(int j = 0;j<split2.length;j++){
							subarr[j] = Integer.parseInt(split2[j]);
						}
						array[i] = subarr;
					}
					return (T)array;
				}else{
					//一维
					String[] split = objectSource.split(",");
					int size = split.length;
					int[] intArray = new int[size];
					for(int i=0;i<size;i++){
						intArray[i]=Integer.parseInt(split[i]);
					}
					return (T) intArray;
				}
			}else{
				//json
				return OBJECT_MAPPER.readValue(objectSource, clazz);
			}
		} catch (Exception e) {
			logger.error("jsonDecode error {}",e);
		}
		return null;
	}
	
	/**
	 * 字符串转换为HashMap<K,V>
	 * @param objectSource
	 * @param keyClass
	 * @param valueClass
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	public static <K, V> HashMap<K, V> toMap(String objectSource, Class<K> keyClass, Class<V> valueClass) throws JsonParseException, JsonMappingException, IOException{
		if(StringUtils.isBlank(objectSource) || "0".equals(objectSource))return null;
		//去除非法字符
		objectSource=getTxtWithoutNTSRElement(objectSource);
		return OBJECT_MAPPER.readValue(objectSource, TypeFactory.defaultInstance().constructMapType(HashMap.class, keyClass, valueClass));
	}
	
	/**  
	 * 去除字符串中的空格、回车、换行符、制表符和问号  
	 *   注： \n 回车(\u000a)     
	       \t 水平制表符(\u0009)     
	       \s 空格(\u0008)     
	       \r 换行(\u000d)  
	 **/  
	public static String getTxtWithoutNTSRElement(String str) {
		String dest = "";
		if (str != null) {
			Pattern p = Pattern
					.compile("[\\s]|[\t]|[\r]|[\n]|[?]|[^\\p{ASCII}]");
			Matcher m = p.matcher(str);
			dest = m.replaceAll("");
		}
		return dest.replaceAll("\"\"", "\"");
	}

}
