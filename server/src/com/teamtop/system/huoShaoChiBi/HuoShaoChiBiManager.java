package com.teamtop.system.huoShaoChiBi;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveEnum;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveFunction;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.rankNew.rankModel.HuoShaoChiBiRankModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hscb_751;
import excel.struct.Struct_hscb_751;

public class HuoShaoChiBiManager {
	
	public static HuoShaoChiBiManager ins;

	public static HuoShaoChiBiManager getIns() {
		if(ins == null){
			ins = new HuoShaoChiBiManager();
		}
		return ins;
	}
	
	public void openUi(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, HuoShaoChiBiConst.sysId)) {
				// 开服第15天开
				return;
			}
			HuoShaoChiBi huoShaoChiBi = hero.getHuoShaoChiBi();
			int maxNum=0;
			String maxname="";
			int heroIcon = 0;
			int frame=0;
			ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(RankingConst.HUOSHAOCHIBI_RANKING);
			int i=0;
			for (BaseRankModel model : treeSet) {
				if (i==0) {
					HuoShaoChiBiRankModel rank = (HuoShaoChiBiRankModel) model;
					maxNum=rank.getFloorNum();
					if (maxNum == 0) {
						// 榜首0关不显示在排行榜
						break;
					}
					maxname=model.getName();
					heroIcon = model.getIcon();
					frame=model.getFrame();
					break;
				}
				i++;
			}
			HuoShaoChiBiSender.sendCmd_7932(hero.getId(), huoShaoChiBi.getFloorNum(), maxNum, maxname, heroIcon, frame);
		    return;
		} catch (Exception e) {
			LogTool.error(e, HuoShaoChiBiManager.class, hero.getId(), hero.getName(), "openUi has wrong!");
		}
		
	}

	/**
	 * 爬塔
	 * @param hero
	 */
	public void upPower(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, HuoShaoChiBiConst.sysId)) {
				return;
			}
			HuoShaoChiBi huoShaoChiBi = hero.getHuoShaoChiBi();
			int goalFloorNum = huoShaoChiBi.getFloorNum() + 1;
			if (goalFloorNum>Config_hscb_751.getIns().size()) {
				HuoShaoChiBiSender.sendCmd_7934(hero.getId(), 1, goalFloorNum, 0);
				return;
			}
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE31);
			Struct_hscb_751 hscb_751=Config_hscb_751.getIns().get(goalFloorNum);
			int npcid = hscb_751.getBoss()[0][0];
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);// 0:失败，1：成功，2：由前端结果决定
			HuoShaoChiBiSender.sendCmd_7934(hero.getId(), 0, goalFloorNum, result);
		} catch (Exception e) {
			LogTool.error(e, HuoShaoChiBiManager.class, hero.getId(), hero.getName(), "upPower has wrong");
		}
	}
	/**
	 * 击败关卡boss 申请奖励
	 * @param hero
	 */
	public void beatBossWin(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, HuoShaoChiBiConst.sysId)) {
				return;
			}
			HuoShaoChiBi huoShaoChiBi = hero.getHuoShaoChiBi();
			//公共缓存修改
			HuoShaoChiBiCache huoShaoChiBiCache = HuoShaoChiBiSysCache.getHuoShaoChiBiCache();
			int goalFloorNum = huoShaoChiBi.getFloorNum() + 1;
			if (goalFloorNum > Config_hscb_751.getIns().size()) {
				return;
			}
			Struct_hscb_751 hscb_751 = Config_hscb_751.getIns().get(goalFloorNum);
			int npcid = hscb_751.getBoss()[0][0];
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);
			boolean ischargeCache = false;
			if (result !=0) {
				List<Object[]> dropTips = new ArrayList<Object[]>();
				List<ProbabilityEventModel> pelist = HuoShaoChiBiSysCache.getBossDropMap().get(goalFloorNum);
				int size = pelist.size();
				List<int[]> dropArr = new ArrayList<int[]>();
				for (int i = 0; i < size; i++) {
					ProbabilityEventModel pe = pelist.get(i);
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
					UseAddUtil.add(hero, drops, SourceGoodConst.HUOSHAOCHIBI, null, false);
				}
				huoShaoChiBi.setFloorNum(goalFloorNum);
				huoShaoChiBi.setAttTime(TimeDateUtil.getCurrentTime());
				RankingFunction.getIns().refreshHuoShaoChiBiRankList(hero);
				// 三国战令
				WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_4, 0);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_39, 0);
				if (huoShaoChiBiCache.getFirster() == null) {
					HuoShaoChiBier huoShaoChiBier = new HuoShaoChiBier(goalFloorNum, hero.getId(),
							hero.getTotalStrength());
					huoShaoChiBiCache.setFirster(huoShaoChiBier);
					ischargeCache=true;
				}else {
					if (goalFloorNum > huoShaoChiBiCache.getFirster().getFloorNum()) {
						huoShaoChiBiCache.getFirster().setHid(hero.getId());
						huoShaoChiBiCache.getFirster().setStrength(hero.getTotalStrength());
						huoShaoChiBiCache.getFirster().setFloorNum(goalFloorNum);
						ischargeCache=true;
					}
				}
				if (huoShaoChiBiCache.getFlooers() == null) {
					huoShaoChiBiCache.setFlooers(new ConcurrentHashMap<Integer, HuoShaoChiBier>());
					ischargeCache=true;
				}
				if (huoShaoChiBiCache.getFlooers().containsKey(goalFloorNum)) {
					if (huoShaoChiBiCache.getFlooers().get(goalFloorNum).getStrength() < hero.getTotalStrength()) {
						HuoShaoChiBier huoShaoChiBier = new HuoShaoChiBier(goalFloorNum, hero.getId(),
								hero.getTotalStrength());
						huoShaoChiBiCache.getFlooers().put(goalFloorNum, huoShaoChiBier);
						ischargeCache=true;
					}
				}else {
					HuoShaoChiBier huoShaoChiBier = new HuoShaoChiBier(goalFloorNum, hero.getId(),
							hero.getTotalStrength());
					huoShaoChiBiCache.getFlooers().put(goalFloorNum, huoShaoChiBier);
					ischargeCache=true;
				}
				HuoShaoChiBiSender.sendCmd_7936(hero.getId(), goalFloorNum, dropTips.toArray());
				if (ischargeCache) {
					GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HUO_SHAO_CHI_BI);
					globalData.setContent(ObjStrTransUtil.toStr(huoShaoChiBiCache));
					GlobalCache.doSync(globalData);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HuoShaoChiBiManager.class, hero.getId(), hero.getName(), "upPower has wrong");
		}
		
	}

}
