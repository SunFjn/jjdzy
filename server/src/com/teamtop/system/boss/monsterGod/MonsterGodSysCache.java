package com.teamtop.system.boss.monsterGod;

import java.util.ArrayList;
import java.util.Collections;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.boss.qmboss.QMBossDamgRankModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.peacockFloor.PeacockFloorSysCache;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class MonsterGodSysCache extends AbsServerEvent{
	
    private static MonsterGodSysCache ins;
	
	
	public static synchronized MonsterGodSysCache getIns() {
		if(ins==null) {
			ins = new MonsterGodSysCache();
		}
		return ins;
	}
	
	/**
	 * 魔神吕布公共缓存
	 */
	private MonsterGodCache monsterGodCache;
	/**
	 * 魔神吕布历史排行榜
	 */
	private MonsterGodHis monsterGodHis;
	
	public MonsterGodCache getMonsterGodCache() {
		return monsterGodCache;
	}

	public void setMonsterGodCache(MonsterGodCache monsterGodCache) {
		this.monsterGodCache = monsterGodCache;
	}

	public  MonsterGodHis getMonsterGodHis() {
		return monsterGodHis;
	}

	public void setMonsterGodHis(MonsterGodHis monsterGodHis) {
		this.monsterGodHis = monsterGodHis;
	}


	@Override
	public void startServer() throws RunServerException {
		try {
			MonsterGodCache monsterGodCache=new MonsterGodCache();
			monsterGodCache.setState(MonsterGodConst.STATE0);
			MonsterGodSysCache.getIns().setMonsterGodCache(monsterGodCache);
			
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.MONSTER_LVBU);
			String content = globalData.getContent();
			if (content==null||content.equals("")||content.equals("{}")) {
				MonsterGodSysCache.getIns().setMonsterGodHis(new MonsterGodHis());
			}else{
				MonsterGodSysCache.getIns().setMonsterGodHis(ObjStrTransUtil.toObj(content, MonsterGodHis.class));
			}
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorSysCache.class, "MonsterGodSysCache has wrong");
		}
	}
	
	@Override
	public void shutdownServer(){
		updateGloalData();
	}
	/**
	 * 更新魔神吕布公共缓存
	 */
	public void updateGloalData() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.MONSTER_LVBU);
			globalData.setContent(ObjStrTransUtil.toStr(MonsterGodSysCache.getIns().getMonsterGodHis()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "updateGloalData shutdownServer has wrong");
		}
	}

}
