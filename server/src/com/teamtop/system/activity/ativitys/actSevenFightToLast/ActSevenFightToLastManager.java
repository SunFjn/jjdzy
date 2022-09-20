package com.teamtop.system.activity.ativitys.actSevenFightToLast;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.personalBoss.PersonalBossConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xzdd2_252;
import excel.struct.Struct_xzdd2_252;

public class ActSevenFightToLastManager extends AbstractActivityManager{

	public static ActSevenFightToLastManager ins;
	public static synchronized ActSevenFightToLastManager getIns() {
		if(ins == null){
			ins = new ActSevenFightToLastManager();
		}
		return ins;
	}
	
	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		ActSevenFightToLast actSevenFightToLast = (ActSevenFightToLast)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_ACTSEVENFIGHTOLAST);
		actSevenFightToLast.setHid(hero.getId());
		actSevenFightToLast.setFloorNum(0);
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		ActSevenFightToLast actSevenFightToLast = (ActSevenFightToLast)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_ACTSEVENFIGHTOLAST);
		actSevenFightToLast.setFloorNum(0);
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		ActSevenFightToLast actSevenFightToLast = new ActSevenFightToLast();
		actSevenFightToLast.setHid(hero.getId());
		actSevenFightToLast.setIndexId(activityInfo.getIndex());
		actSevenFightToLast.setActId(activityInfo.getActId());
		actSevenFightToLast.setPeriods(activityInfo.getPeriods());
		actSevenFightToLast.setFloorNum(0);
		actSevenFightToLast.setPeriods(activityInfo.getPeriods());
		return actSevenFightToLast;
	}

	@Override
	public Class<?> getActivityData() {
		return ActSevenFightToLast.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return ActSevenFightToLastEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_ACTSEVENFIGHTOLAST);
			if (!checkHeroActOpen) {
				return;
			}
			ActSevenFightToLast actSevenFightToLast = (ActSevenFightToLast)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_ACTSEVENFIGHTOLAST);
			ActSevenFightToLastSender.sendCmd_2832(hero.getId(), actSevenFightToLast.getPeriods(), actSevenFightToLast.getFloorNum());
		} catch (Exception e) {
			LogTool.error(e, ActSevenFightToLastManager.class, hero.getId(), hero.getName(), "openUI has wrong");
		}
		
	}

	public void battle(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_ACTSEVENFIGHTOLAST);
			if (!checkHeroActOpen) {
				return;
			}
			ActSevenFightToLast actSevenFightToLast = (ActSevenFightToLast)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_ACTSEVENFIGHTOLAST);
			int floorNum=0;
			if (actSevenFightToLast.getFloorNum()==0) {
				floorNum=(actSevenFightToLast.getPeriods()-1)*10+1;
			}else {
				floorNum=actSevenFightToLast.getFloorNum()+1;
			}
			if (Config_xzdd2_252.getIns().get(floorNum)==null) {
				ActSevenFightToLastSender.sendCmd_2834(hero.getId(), 1, floorNum, 0);
				return;
			}
			int equipEmptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, BagFunction.getIns().getEquipData(hero));
			if (equipEmptyGrid < PersonalBossConst.BAG_EMPTY_GRID_NUM) {
				// 装备背包格子不足
				ActSevenFightToLastSender.sendCmd_2834(hero.getId(), 2, floorNum, 0);
				return;
			}
			Struct_xzdd2_252 xzdd2_252 =Config_xzdd2_252.getIns().get(floorNum);
			int npcid = xzdd2_252.getBoss();
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);// 0:失败，1：成功，2：由前端结果决定
			ActSevenFightToLastSender.sendCmd_2834(hero.getId(), 0, floorNum, result);
			String usesys = hero.getTempData().getAccount().getUsesys();
			FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
					hero.getTotalStrength(), ActivitySysId.Act_ACTSEVENFIGHTOLAST, hero.getZoneid(), hero.getPf(),
					usesys, hero.getReincarnationLevel());
			return;
		} catch (Exception e) {
			LogTool.error(e, ActSevenFightToLastManager.class, hero.getId(), hero.getName(), "battle has wrong");
		}

	}
	
	public void getWinReward(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_ACTSEVENFIGHTOLAST);
			if (!checkHeroActOpen) {
				return;
			}
			ActSevenFightToLast actSevenFightToLast = (ActSevenFightToLast)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_ACTSEVENFIGHTOLAST);
			int floorNum=0;
			if (actSevenFightToLast.getFloorNum()==0) {
				floorNum=(actSevenFightToLast.getPeriods()-1)*10+1;
			}else {
				floorNum=actSevenFightToLast.getFloorNum()+1;
			}
			if (Config_xzdd2_252.getIns().get(floorNum)==null) {
				ActSevenFightToLastSender.sendCmd_2834(hero.getId(), 1, floorNum, 0);
				return;
			}
			Struct_xzdd2_252 tower_219=Config_xzdd2_252.getIns().get(floorNum);
			int npcid = tower_219.getBoss();
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);// 0:失败，1：成功，2：由前端结果决定
			
			if (result !=0) {
				List<Object[]> dropTips = new ArrayList<Object[]>();
				List<ProbabilityEventModel> bossDropData =ExcelJsonUtils.getGeneralDropData(tower_219.getBd());
				int size = bossDropData.size();
				List<int[]> dropArr = new ArrayList<int[]>();
				for (int i = 0; i < size; i++) {
					ProbabilityEventModel pe = bossDropData.get(i);
					int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
					if (js != null) {
						int type = js[0];
						if (type == GameConst.GENDROP) {
							int num = js[2];
							ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
							for (int j = 1; j <= num; j++) {
								js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
								dropArr.add(js);
								dropTips.add(new Object[] { js[0], js[1], js[2] });
							}
						} else {
							dropArr.add(js);
							dropTips.add(new Object[] { js[0], js[1], js[2] });
						}
					}
				}
				int[][] drops = new int[dropArr.size()][];
				dropArr.toArray(drops);
				if (UseAddUtil.canAdd(hero, drops, false)) {
					UseAddUtil.add(hero, drops, SourceGoodConst.ACTFIGHTTOLAST_DROP, null, false);
				}
				actSevenFightToLast.setFloorNum(floorNum);
				ActSevenFightToLastSender.sendCmd_2836(hero.getId(), floorNum, dropTips.toArray());
				if (tower_219.getGuangbo()==1) {
					ChatManager.getIns().broadCast(ChatConst.BROCAST_FIGHTBOOl, new Object[] {hero.getNameZoneid(),tower_219.getReward1()[0][1],floorNum}); 
				}else if (tower_219.getGuangbo()==2){
					ChatManager.getIns().broadCast(ChatConst.BROCAST_FIGHTBOOl, new Object[] {hero.getNameZoneid(),tower_219.getReward2()[0][1],floorNum});
				}
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, ActSevenFightToLastManager.class, hero.getId(), hero.getName(), "getWinReward has wrong");
		}

	}
	
	public boolean isHasReadPint(Hero hero) {
		boolean isreadPoint=false;
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_ACTSEVENFIGHTOLAST)) {
			return isreadPoint;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.Act_ACTSEVENFIGHTOLAST)) {
			return isreadPoint;
		}
		ActSevenFightToLast actSevenFightToLast = (ActSevenFightToLast)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_ACTSEVENFIGHTOLAST);
		
		int floorNum=0;
		if (actSevenFightToLast.getFloorNum()==0) {
			floorNum=(actSevenFightToLast.getPeriods()-1)*10+1;
		}else {
			floorNum=actSevenFightToLast.getFloorNum()+1;
		}
		if (Config_xzdd2_252.getIns().get(floorNum)==null) {
			return isreadPoint;
		}
		for (int i = floorNum; i <=Config_xzdd2_252.getIns().size(); i++) {
			Struct_xzdd2_252 struct_xzdd2_252 = Config_xzdd2_252.getIns().get(i);
			if (hero.getTotalStrength()>=struct_xzdd2_252.getPower()) {
				isreadPoint=true;
				break;
			}
		}
		return isreadPoint;
		
	}

}
