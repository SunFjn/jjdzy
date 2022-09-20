package com.teamtop.houtaiHttp.events.groovy;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.util.common.ZoneIDUtil;
import com.teamtop.util.time.TimeDateUtil;

public class GroovyFunction {

	public static void initZIDGroovyMsg(){
		GroovyCache.setTimeBegin(System.currentTimeMillis());
		GroovyCache.setTimeEnd(0);
		GroovyCache.setZidGroovySuccessList(Collections.synchronizedList(new ArrayList<Integer>()));
		GroovyCache.setZidGroovyFailList(Collections.synchronizedList(new ArrayList<Integer>()));
	}
	
	public static void addZID(int zid, String result){
		if(result.equals("success")){
			GroovyCache.addZidGroovySuccessList(zid);
		}else if(result.equals("fail")){
			GroovyCache.addZidGroovyFailList(zid);
		}
		GroovyCache.setTimeEnd(System.currentTimeMillis());
	}
	
	public static String getZIDSuccessResult(){
		long timeBegin = GroovyCache.getTimeBegin();
		long timeEnd = GroovyCache.getTimeEnd();
		List<Integer> zidGroovySuccessList = GroovyCache.getZidGroovySuccessList();
		List<Integer> zidGroovyFailList = GroovyCache.getZidGroovyFailList();
		String zidStr = ZoneIDUtil.getZidStr(zidGroovySuccessList);
		String zidFailStr = ZoneIDUtil.getZidStr(zidGroovyFailList);
		String timeBeginStr = TimeDateUtil.getTimeStrByLong(timeBegin, "HH:mm:ss:SSS");
		String timeEndStr = TimeDateUtil.getTimeStrByLong(timeEnd, "HH:mm:ss:SSS");
		String dayStr = TimeDateUtil.getTimeStrByLong(timeEnd, "yyyy-MM-dd");
		if(timeBegin == 0&& timeEnd == 0)
			return "【"+zidStr+"】区成功，【"+zidFailStr+"】区失败。耗时"+(timeEnd - timeBegin)+"ms    "+" (Http第二步异常，请稍后再拨。)";
		else
			return "【"+zidStr+"】区成功，【"+zidFailStr+"】区失败。耗时"+(timeEnd - timeBegin)+"ms    "+dayStr+"的"+timeBeginStr+"到"+timeEndStr;
	}
	
	public static void initGroovyConvenientMap(){
		GroovyCache.setTimeBeginConvenient(System.currentTimeMillis());
		GroovyCache.setTimeEndConvenient(0);
		GroovyCache.setGroovyConvenientResultMap(new HashMap<>());
	}
	
	public static void addGroovyConvenientResult(int zid, String result){
		Map<String, List<Integer>> resultMap = GroovyCache.getGroovyConvenientResultMap();
		synchronized (resultMap) {
			List<Integer> list = resultMap.get(result);
			if(list == null){
				list = new ArrayList<>();
				resultMap.put(result, list);
			}
			list.add(zid);
		}
		GroovyCache.setTimeEndConvenient(System.currentTimeMillis());
	}
	
	public static String getGroovyConvenientResult(){
		StringBuilder log = new StringBuilder();
		long timeBegin = GroovyCache.getTimeBeginConvenient();
		long timeEnd = GroovyCache.getTimeEndConvenient();
		Map<String, List<Integer>> resultMap = GroovyCache.getGroovyConvenientResultMap();
		Iterator<Entry<String, List<Integer>>> iterator = resultMap.entrySet().iterator();
		while(iterator.hasNext()){
			Entry<String, List<Integer>> next = iterator.next();
			String result = next.getKey();
			List<Integer> value = next.getValue();
			String zidFailStr = ZoneIDUtil.getZidStr(value);
			String[] split = result.split(" ");
			
			if(split[0].equals("success")){
				log.append("【").append(zidFailStr).append("】区成功，").append(result).append("    ");
			}else if(split[0].equals("fail")){
				log.append("【").append(zidFailStr).append("】区❤失败❤失败❤失败❤失败❤失败❤，").append(result).append("    ");
			}
		}
		
		String timeBeginStr = TimeDateUtil.getTimeStrByLong(timeBegin, "HH:mm:ss:SSS");
		String timeEndStr = TimeDateUtil.getTimeStrByLong(timeEnd, "HH:mm:ss:SSS");
		String dayStr = TimeDateUtil.getTimeStrByLong(timeEnd, "yyyy-MM-dd");
		
		if(timeBegin == 0&& timeEnd == 0)
			log.append(" 耗时").append(timeEnd - timeBegin).append("ms     (Http第二步异常，请稍后再拨。)");
		else
			log.append(" 耗时").append(timeEnd - timeBegin).append("ms    ").append(dayStr).append("的").append(timeBeginStr).append("到").append(timeEndStr);
		return log.toString();
	}
}
