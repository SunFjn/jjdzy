package com.teamtop.houtaiHttp.events.hotSwap;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.teamtop.util.common.ZoneIDUtil;
import com.teamtop.util.time.TimeDateUtil;

public class HotSwapFunction {

	public static void initZIDHotSwapMsg(){
		HotSwapCache.setTimeBegin(System.currentTimeMillis());
		HotSwapCache.setTimeEnd(0);
		HotSwapCache.setZidHotSwapSuccessList(Collections.synchronizedList(new ArrayList<Integer>()));
		HotSwapCache.setZidHotSwapFailList(Collections.synchronizedList(new ArrayList<Integer>()));
	}
	
	public static void addZID(int zid, String result){
		if(result.equals("success")){
			HotSwapCache.addZidHotSwapSuccessList(zid);
		}else if(result.equals("fail")){
			HotSwapCache.addZidHotSwapFailList(zid);
		}
		HotSwapCache.setTimeEnd(System.currentTimeMillis());
	}
	
	public static String getZIDSuccessResult(){
		long timeBegin = HotSwapCache.getTimeBegin();
		long timeEnd = HotSwapCache.getTimeEnd();
		List<Integer> zidHotSwapSuccessList = HotSwapCache.getZidHotSwapSuccessList();
		List<Integer> zidHotSwapFailList = HotSwapCache.getZidHotSwapFailList();
		String zidStr = ZoneIDUtil.getZidStr(zidHotSwapSuccessList);
		String zidFailStr = ZoneIDUtil.getZidStr(zidHotSwapFailList);
		String timeBeginStr = TimeDateUtil.getTimeStrByLong(timeBegin, "HH:mm:ss:SSS");
		String timeEndStr = TimeDateUtil.getTimeStrByLong(timeEnd, "HH:mm:ss:SSS");
		String dayStr = TimeDateUtil.getTimeStrByLong(timeEnd, "yyyy-MM-dd");
		if(timeBegin == 0&& timeEnd == 0)
			return "【"+zidStr+"】区成功，【"+zidFailStr+"】区失败。耗时"+(timeEnd - timeBegin)+"ms    "+" (Http第二步异常，请稍后再拨。)";
		else
			return "【"+zidStr+"】区成功，【"+zidFailStr+"】区失败。耗时"+(timeEnd - timeBegin)+"ms    "+dayStr+"的"+timeBeginStr+"到"+timeEndStr;
	}
}
