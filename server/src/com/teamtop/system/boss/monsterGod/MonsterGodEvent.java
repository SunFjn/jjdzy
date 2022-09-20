package com.teamtop.system.boss.monsterGod;

import java.util.Map;

import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossBoss.CrossBossConst;
import com.teamtop.system.crossBoss.CrossBossFunction;
import com.teamtop.system.crossBoss.CrossBossManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class MonsterGodEvent extends AbsSystemEvent{
	private static MonsterGodEvent ins = null;

	public static  MonsterGodEvent getIns() {
		if (ins == null) {
			ins = new MonsterGodEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		
		
	}

	@Override
	public void login(Hero hero) {
		MonsterGodSender.sendCmd_1500(hero.getId(), MonsterGodSysCache.getIns().getMonsterGodCache().getState());
		if (MonsterGodSysCache.getIns().getMonsterGodCache().getState()>=MonsterGodConst.STATE1&&MonsterGodSysCache.getIns().getMonsterGodCache().getState()!=MonsterGodConst.STATE4) {
			RedPointFunction.getIns().addLoginRedPoint(hero,MonsterGodConst.SYSID, 0, RedPointConst.HAS_RED);
			GlobalSender.sendCmd_264(hero.getId(),MonsterGodConst.SYSID, 0, 1);
		}
	}
	
	@Override
	public void logout(Hero hero){
		MonsterGodManager.getIns().quitLvBuBoss(hero);
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
		if(cmdId==MonsterGodConst.STATE1){
			//活动开启
			MonsterGodFunction.getIns().start();
			/*ChatManager.getIns().broadCast(ChatConst.START_MONSTER,
					new Object[] {}); // 全服广播
*/			Map<Long,Hero> heroMap = HeroCache.getHeroMap();
			for(Hero hero:heroMap.values()){
				if(hero==null||!hero.isOnline()){
					continue;
				}
				GlobalSender.sendCmd_264(hero.getId(),MonsterGodConst.SYSID, 0, 1);
			}
			
		}else if(cmdId==MonsterGodConst.STATE0){
			//关闭
			MonsterGodFunction.getIns().end();
			ChatManager.getIns().broadCast(ChatConst.END_MONSTER,
					new Object[] {}); // 全服广播
		}
		LogTool.info("MonsterGodEvent.fixTime cmdId:"+cmdId+" time:"+TimeDateUtil.printTime(now), this);
	}

}
