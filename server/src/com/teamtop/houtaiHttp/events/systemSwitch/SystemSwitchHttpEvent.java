package com.teamtop.houtaiHttp.events.systemSwitch;

import io.netty.channel.ChannelHandlerContext;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;

/**
 * 系统开关
 * @author hepl
 *
 */
public class SystemSwitchHttpEvent extends AbsHouTaiHttpEvent {
	
	private static SystemSwitchHttpEvent ins = null;
	
	public static SystemSwitchHttpEvent getIns(){
		if(ins == null){
			ins = new SystemSwitchHttpEvent();
		}
		return ins;
	}
	
	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
			//区号
			String zoneidStr = paramMap.get("zoneid");
			if(zoneidStr == null){
				HttpUtil.responseFail(ctx);
				return;
			}
			int zoneid = Integer.parseInt(zoneidStr);
			//开启或关闭标识，1开启，2关闭，3查询
			String typeStr = paramMap.get("type");
			if(typeStr == null){
				HttpUtil.responseFail(ctx);
				return;
			}
			int type = Integer.parseInt(typeStr);
			if(type == 3){
				//查询系统限制清单
				ConcurrentHashMap<Integer, List<Integer>> funIdCache = SystemSwitchCache.getFunIdCache();
				List<Integer> list = funIdCache.get(zoneid);
				String str = "[]";
				if(list != null){
					str = JsonUtils.toStr(list);
				}
				HttpUtil.response(str, ctx);
			}else {
				//系统id
				String funStr = paramMap.get("funid");
				if(funStr == null){
					HttpUtil.responseFail(ctx);
					return;
				}
				Integer funid = Integer.parseInt(funStr);
				ConcurrentHashMap<Integer, List<Integer>> funIdCache = SystemSwitchCache.getFunIdCache();
				List<Integer> list = funIdCache.get(zoneid);
				if(1 == type){
					//开启
					if(list == null){
						HttpUtil.responseFail(ctx);
						return;
					}
					if(list.contains(funid)){
						list.remove(funid);
					}
				}else if(2 == type){
					//关闭
					if(list == null){
						list = Collections.synchronizedList(new ArrayList<Integer>());
						funIdCache.put(zoneid, list);
					}
					if(!list.contains(funid)){
						list.add(funid);
					}
				}
				HttpUtil.responseSucc(ctx);
			}
		} catch (Exception e) {
			LogTool.error(e, SystemSwitchHttpEvent.class, "SystemSwitchHttpEvent has error!");
		}
	}

}
