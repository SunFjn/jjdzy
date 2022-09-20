package com.teamtop.system.global;

import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xitong_001;
import excel.struct.Struct_xitong_001;

public class GlobalFunction {
	private static GlobalFunction ins;
	public static GlobalFunction getIns(){
		if(ins == null) {
			ins = new GlobalFunction();
		}
		return ins;
	}
	
	/**
	 * 检查玩家在当前的状态下是否限制该系统的操作
	 * @param hero
	 * @param sysId 要检查的系统id
	 * @return true限制/false没限制
	 */
	public boolean checkSysLimit(Hero hero , int sysId){
		try{
			Struct_xitong_001 limit = Config_xitong_001.getIns().get(sysId);
			if(limit == null){
				return false;
			}
			//判断限制功能 若限制则返回true
		}catch(Exception e){
			LogTool.error(e,this);
		}
		
		return false;
	}
	
	/**
	 * 上线发送版本号
	 * @author lobbyer
	 * @param hero
	 * @date 2017年6月23日
	 */
	public void sendVersion(Hero hero){
		HeroSender.sendCmd_168(hero.getId(),GlobalCache.getVersion());
	}
	
	/**
	 * 全局通知
	 * @author lobbyer
	 * @param content
	 * @date 2017年6月9日
	 */
	public void noticeAll(String content) {
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for(long hid:heroMap.keySet()){
			if(!HeroFunction.getIns().isOnline(hid)) continue;
			GlobalSender.sendCmd_260(hid, GlobalConst.TYPE_GLOBAL, content);
		}
	}
}
