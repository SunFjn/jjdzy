package com.teamtop.system.openDaysSystem.otherFightToLast;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
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
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;
import excel.config.Config_xzdd2_252;
import excel.config.Config_xzdd3_252;
import excel.struct.Struct_xzdd3_252;

public class OtherFightToLastManager extends AbsOpenDaysManager {
	
	public static OtherFightToLastManager ins;
	public static  OtherFightToLastManager getIns() {
		if(ins == null){
			ins = new OtherFightToLastManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_FIGHT_TO_LAST)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_FIGHT_TO_LAST);
			OtherFightToLast otherFightToLast = (OtherFightToLast) getSystemModel(hero, uid);
			int qs = Config_hdfl_012.getIns().get(uid).getQs();
			int chaId = otherFightToLast.getChaId();
			OtherFightToLastSender.sendCmd_4750(hero.getId(), otherFightToLast.getFloorNum(), chaId, qs);
		} catch (Exception e) {
			LogTool.error(e, OtherFightToLastManager.class, hero.getId(), hero.getName(), "openUi has wrong");
		}
		
	}
	public void battle(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_FIGHT_TO_LAST)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_FIGHT_TO_LAST);
			OtherFightToLast otherFightToLast = (OtherFightToLast) getSystemModel(hero, uid);
			int qs = Config_hdfl_012.getIns().get(uid).getQs();
			int floorNum = otherFightToLast.getFloorNum();
			/*if (floorNum==0) {
				floorNum=qs*1000;
				otherFightToLast.setFloorNum(floorNum);
			}*/
			int chaId = otherFightToLast.getChaId();
			List<Struct_xzdd3_252> list = OtherFightToLastCache.getQsListMap().get(qs);
			if (chaId == 0) {
				Struct_xzdd3_252 xzdd3_252 = list.get(0);
				chaId = xzdd3_252.getId();
			} else {
				chaId += 1;
			}
			int goalFloorNum = floorNum + 1;
			if (goalFloorNum > list.size()) {
				OtherFightToLastSender.sendCmd_4752(hero.getId(), 1, goalFloorNum, 0, 0);
				return;
			}
			
			int equipEmptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, BagFunction.getIns().getEquipData(hero));
			if (equipEmptyGrid < PersonalBossConst.BAG_EMPTY_GRID_NUM) {
				// 装备背包格子不足
				OtherFightToLastSender.sendCmd_4752(hero.getId(), 2, goalFloorNum, 0, 0);
				return;
			}
			
			Struct_xzdd3_252 tower_219 = Config_xzdd3_252.getIns().get(chaId);
			int npcid = tower_219.getBoss();
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);// 0:失败，1：成功，2：由前端结果决定
			OtherFightToLastSender.sendCmd_4752(hero.getId(), 0, goalFloorNum, chaId, result);
			String usesys = hero.getTempData().getAccount().getUsesys();
			FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
					hero.getTotalStrength(), SystemIdConst.OTHER_FIGHT_TO_LAST, hero.getZoneid(), hero.getPf(), usesys,
					hero.getReincarnationLevel());
			return;
		} catch (Exception e) {
			LogTool.error(e, OtherFightToLastManager.class, hero.getId(), hero.getName(), "battle has wrong");
		}
		
	}
	
	public void getReward(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_FIGHT_TO_LAST)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_FIGHT_TO_LAST);
			OtherFightToLast otherFightToLast = (OtherFightToLast) getSystemModel(hero, uid);
			int qs = Config_hdfl_012.getIns().get(uid).getQs();
			List<Struct_xzdd3_252> list = OtherFightToLastCache.getQsListMap().get(qs);
			int goalFloorNum = otherFightToLast.getFloorNum() + 1;
			int chaId = otherFightToLast.getChaId();
			if (chaId == 0) {
				Struct_xzdd3_252 xzdd3_252 = list.get(0);
				chaId = xzdd3_252.getId();
			} else {
				chaId += 1;
			}
			if (goalFloorNum > list.size()) {
				OtherFightToLastSender.sendCmd_4752(hero.getId(), 1, goalFloorNum, 0, 0);
				return;
			}
			Struct_xzdd3_252 tower_219 = Config_xzdd3_252.getIns().get(chaId);
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
					UseAddUtil.add(hero, drops, SourceGoodConst.SEVENFIGHTTOLAST_DROP, null, false);
				}
				otherFightToLast.setChaId(chaId);
				otherFightToLast.setFloorNum(goalFloorNum);
				OtherFightToLastSender.sendCmd_4754(hero.getId(), goalFloorNum, chaId, dropTips.toArray());
				if (tower_219.getGuangbo()==1) {
					ChatManager.getIns().broadCast(ChatConst.BROCAST_FIGHTBOOl, new Object[] {hero.getNameZoneid(),tower_219.getReward1()[0][1],goalFloorNum}); 
				}else if (tower_219.getGuangbo()==2){
					ChatManager.getIns().broadCast(ChatConst.BROCAST_FIGHTBOOl, new Object[] {hero.getNameZoneid(),tower_219.getReward2()[0][1],goalFloorNum});
				}
				return;
			}
		} catch (Exception e) { 
			LogTool.error(e, OtherFightToLastManager.class, hero.getId(), hero.getName(), "getreward has wrong");
		}
	}
	
	
	public boolean isHasReadPint(Hero hero) {
		boolean isreadPoint=false;
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_FIGHT_TO_LAST)) {
			return isreadPoint;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_FIGHT_TO_LAST);
		OtherFightToLast otherFightToLast = (OtherFightToLast) getSystemModel(hero, uid);
		
		int goalFloorNum = otherFightToLast.getFloorNum() + 1;
		if (goalFloorNum > Config_xzdd3_252.getIns().size()) {
			return isreadPoint;
		}
		
		if (Config_xzdd2_252.getIns().get(goalFloorNum)==null) {
			return isreadPoint;
		}
		for (int i = goalFloorNum; i <= Config_xzdd3_252.getIns().size(); i++) {
			Struct_xzdd3_252 struct_xzdd3_252 = Config_xzdd3_252.getIns().get(i);
			if (hero.getTotalStrength() >= struct_xzdd3_252.getPower()) {
				isreadPoint=true;
			}
		}
		return isreadPoint;
		
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		OtherFightToLast otherFightToLast = (OtherFightToLast) opSysDataMap.get(uid);
		if (otherFightToLast == null) {
			otherFightToLast = new OtherFightToLast();
			otherFightToLast.setFloorNum(0);
		}
		return otherFightToLast;
	}

	@Override
	public Class<?> getSystemModel() {
		return OtherFightToLast.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return OtherFightToLastEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}
	

}
