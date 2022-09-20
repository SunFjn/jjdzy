package com.teamtop.system.crossBoss;

import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.crossBoss.model.CrossBoss;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.rewardBack.RewardBackFunction;

import excel.config.Config_seven_223;
import excel.struct.Struct_seven_223;
/**
 * 跨服事件
 * @author Administrator
 *
 */
public class CrossBossLocalEvent extends AbsSystemEvent{
	private static CrossBossLocalEvent ins = null;

	public static CrossBossLocalEvent getIns() {
		if (ins == null) {
			ins = new CrossBossLocalEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		if (hero.getCrossBoss()==null) {
			CrossBoss crossBoss=new CrossBoss();
			crossBoss.setHid(hero.getId());
			crossBoss.setNum(CrossBossConst.CROSS_IN_NUM);
			hero.setCrossBoss(crossBoss);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.FUN_CROSS_BOSS_MH)) {
			return;
		}
		CrossBossManager.getIns().showInfo(hero);
		hero.getCrossBoss().setIsInBoss(CrossBossConst.INBOSS_STATE0);
		boolean isRead=CrossBossFunction.getIns().isReadPoint(hero);
		if (isRead) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.FUN_CROSS_BOSS_MH, ArchiveConst.RedPoint,
					RedPointConst.HAS_RED);
		}
		if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
			return;
		}
		int bossId=0;
		for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
			if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
				bossId=seven.getBoss();
				break;
			}
		}
		if (bossId==0||CrossBossLocalCache.dieBoss.contains(bossId)) {
			return;
		}
		CrossBossFunction.getIns().noticeBossSate(hero, bossId, 1);
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	@Override
	public void zeroHero(Hero hero,int now){
		//奖励找回处理(重置前)
		RewardBackFunction.getIns().handle(hero,SystemIdConst.FUN_CROSS_BOSS_MH,0);
		hero.getCrossBoss().setNum(CrossBossConst.CROSS_IN_NUM);
		hero.getCrossBoss().setBuyNum(0);
		//奖励找回处理(重置后)
		RewardBackFunction.getIns().handle(hero,SystemIdConst.FUN_CROSS_BOSS_MH,1);
	}
	@Override
	public void logout(Hero hero) {
		CrossBossManager.getIns().exitCrossBoss(hero);
	}
	
}
