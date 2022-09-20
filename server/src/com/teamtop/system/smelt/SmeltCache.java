package com.teamtop.system.smelt;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.struct.Struct_ronglian_204;

/**
 * 进阶装备熔炉缓存类
 * @author lobbyer
 * @date 2016年10月20日
 */
public class SmeltCache extends AbsServerEvent {

	/**普通熔炼缓存**/
	private static ConcurrentHashMap<Integer, List<Struct_ronglian_204>> rongluConfig = UC.reg("rongluConfig",new ConcurrentHashMap<Integer,List<Struct_ronglian_204>>());
	
	public static ConcurrentHashMap<Integer,List<Struct_ronglian_204>> getLevelRongluMap(){
		return rongluConfig;
	}
	public static List<Struct_ronglian_204> getLevelList(int level){
		return rongluConfig.get(level);
	}
	
	@Override
	public void initExcel() throws RunServerException {
		
	}

	@Override
	public void startServer() throws RunServerException {
		
	}

}
