package com.teamtop.system.sevenFightToLast;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.personalBoss.PersonalBossConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xzdd1_252;
import excel.config.Config_xzdd2_252;
import excel.struct.Struct_xzdd1_252;

public class SevenFightToLastManager {
	
	public static SevenFightToLastManager ins;
	public static  SevenFightToLastManager getIns() {
		if(ins == null){
			ins = new SevenFightToLastManager();
		}
		return ins;
	}
	public void openUi(Hero hero) {
		try {
			SevenFightToLastSender.sendCmd_2802(hero.getId(), hero.getSevenFightToLast().getFloorNum());
		} catch (Exception e) {
			LogTool.error(e, SevenFightToLastManager.class, hero.getId(), hero.getName(), "openUi has wrong");
		}
		
	}
	public void battle(Hero hero) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENFIGHTTOLAST)) return;
			SevenFightToLast sevenFightToLast=hero.getSevenFightToLast();
			int goalFloorNum=sevenFightToLast.getFloorNum()+1;
			if (goalFloorNum>Config_xzdd1_252.getIns().size()) {
				SevenFightToLastSender.sendCmd_2804(hero.getId(), 1, goalFloorNum, 0);
				return;
			}
			
			int equipEmptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, BagFunction.getIns().getEquipData(hero));
			if (equipEmptyGrid < PersonalBossConst.BAG_EMPTY_GRID_NUM) {
				// 装备背包格子不足
				SevenFightToLastSender.sendCmd_2804(hero.getId(), 2, goalFloorNum, 0);
				return;
			}
			
			Struct_xzdd1_252 tower_219=Config_xzdd1_252.getIns().get(goalFloorNum);
			int npcid = tower_219.getBoss();
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);// 0:失败，1：成功，2：由前端结果决定
			SevenFightToLastSender.sendCmd_2804(hero.getId(), 0, goalFloorNum, result);
			String usesys = hero.getTempData().getAccount().getUsesys();
			FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
					hero.getTotalStrength(), SystemIdConst.SEVENFIGHTTOLAST, hero.getZoneid(), hero.getPf(), usesys,
					hero.getReincarnationLevel());
			return;
		} catch (Exception e) {
			LogTool.error(e, SevenFightToLastManager.class, hero.getId(), hero.getName(), "battle has wrong");
		}
		
	}
	
	public void getreward(Hero hero) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENFIGHTTOLAST)) return;
			SevenFightToLast sevenFightToLast=hero.getSevenFightToLast();
			int goalFloorNum=sevenFightToLast.getFloorNum()+1;
			if (goalFloorNum>Config_xzdd1_252.getIns().size()) {
				SevenFightToLastSender.sendCmd_2804(hero.getId(), 1, goalFloorNum, 0);
				return;
			}
			Struct_xzdd1_252 tower_219=Config_xzdd1_252.getIns().get(goalFloorNum);
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
				sevenFightToLast.setFloorNum(goalFloorNum);
				SevenFightToLastSender.sendCmd_2806(hero.getId(), goalFloorNum, dropTips.toArray());
				if (tower_219.getGuangbo()==1) {
					ChatManager.getIns().broadCast(ChatConst.BROCAST_FIGHTBOOl, new Object[] {hero.getNameZoneid(),tower_219.getReward1()[0][1],goalFloorNum}); 
				}else if (tower_219.getGuangbo()==2){
					ChatManager.getIns().broadCast(ChatConst.BROCAST_FIGHTBOOl, new Object[] {hero.getNameZoneid(),tower_219.getReward2()[0][1],goalFloorNum});
				}
				return;
			}
		} catch (Exception e) { 
			LogTool.error(e, SevenFightToLastManager.class, hero.getId(), hero.getName(), "getreward has wrong");
		}
	}
	
	
	public boolean isHasReadPint(Hero hero) {
		boolean isreadPoint=false;
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENFIGHTTOLAST)) return isreadPoint;
		SevenFightToLast sevenFightToLast=hero.getSevenFightToLast();
		
		int goalFloorNum=sevenFightToLast.getFloorNum()+1;
		if (goalFloorNum>Config_xzdd1_252.getIns().size()) {
			return isreadPoint;
		}
		
		if (Config_xzdd2_252.getIns().get(goalFloorNum)==null) {
			return isreadPoint;
		}
		for (int i = goalFloorNum; i <=Config_xzdd1_252.getIns().size(); i++) {
			Struct_xzdd1_252 struct_xzdd1_252 = Config_xzdd1_252.getIns().get(i);
			if (hero.getTotalStrength()>=struct_xzdd1_252.getPower()) {
				isreadPoint=true;
			}
		}
		return isreadPoint;
		
	}
	

}
