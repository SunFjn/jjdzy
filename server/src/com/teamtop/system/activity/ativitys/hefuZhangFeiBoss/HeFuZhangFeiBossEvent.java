package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_hfkhzfzj_286;
import excel.struct.Struct_hfkhzfzj_286;

public class HeFuZhangFeiBossEvent extends AbsSystemEvent{
	
	private static HeFuZhangFeiBossEvent ins;

	private HeFuZhangFeiBossEvent() {
		
	}
	public static synchronized HeFuZhangFeiBossEvent getIns() {
		if (ins == null) {
			ins = new HeFuZhangFeiBossEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
			return;
		}
		HeFuZhangFeiBoss heFuZhangFeiBoss = (HeFuZhangFeiBoss) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_ZHANGFEIBOSS);
		HeFuZhangFeiBossCahce heFuZhangFeiBossCahce = HeFuZhangFeiBossSysCache.getHeFuZhangFeiBossCahce();
		int bossid = heFuZhangFeiBossCahce.getBossid();
		
		for (Struct_hfkhzfzj_286 struct_hfkhczfljl_286:Config_hfkhzfzj_286.getIns().getSortList()) {
			int bossindex=struct_hfkhczfljl_286.getId();
			int state=GameConst.REWARD_0;
			if (heFuZhangFeiBoss.getReward().contains(bossindex)) {
				state=GameConst.REWARD_2;
			}else {
				if (bossid>bossindex) {
					state=GameConst.REWARD_1;
				}else if(bossid==bossindex&&heFuZhangFeiBossCahce.getBossType()==HeFuZhangFeiBossConst.BOSS_TYPE2) {
					state=GameConst.REWARD_1;
				}
			}
			if (state==GameConst.REWARD_1) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.HEFU_ZHANGFEIBOSS, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			}
		
		}
		
		HeFuZhangFeiBossFunction.getIns().quit(hero);
		
	}
	
	@Override
	public void logout(Hero hero) {
		HeFuZhangFeiBossFunction.getIns().quit(hero);
		
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_ZHANGFEIBOSS)) {
			return;
		}
		HeFuZhangFeiBoss heFuZhangFeiBoss = (HeFuZhangFeiBoss) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_ZHANGFEIBOSS);
		for (int key:heFuZhangFeiBoss.getBuyNumMap().keySet()) {
			heFuZhangFeiBoss.getBuyNumMap().put(key, 0);
		}
	}

}
