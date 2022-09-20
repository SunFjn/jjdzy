package com.teamtop.system.peacockFloor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.rankNew.rankModel.PeacockRankModel;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankConst;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_tower_219;
import excel.struct.Struct_tower_219;

public class PeacockFloorManager {
	
    public static PeacockFloorManager ins;
	public static  PeacockFloorManager getIns() {
		if(ins == null){
			ins = new PeacockFloorManager();
		}
		return ins;
	}
	
	public void openUi(Hero hero) {
		try {
			PeacockFloor peacockFloor=hero.getPeacockFloor();
			PeacockCache peacockCache=PeacockFloorSysCache.getPeacockCache();
			int maxNum=0;
			String maxname="";
			/*String name="";
			long strength=0;*/
			int herdiceon =0;
			int frame=0;
			Object[] rewardfloor=new Object[] {};
			/*if (peacockCache.getFirster()!=null&&peacockCache.getFirster().getHid()>0) {
				maxNum=peacockCache.getFirster().getFloorNum();
				Hero maxHero = HeroCache.getHero(peacockCache.getFirster().getHid(), HeroConst.FIND_TYPE_BASIC);
				maxname=maxHero.getNameZoneid();
				herdiceon =maxHero.getIcon();
				frame=maxHero.getFrame();
			}*/
			ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(RankingConst.PEACOCK_RANKING);
			int i=0;
			for (BaseRankModel model : treeSet) {
				if (i==0) {
					PeacockRankModel rank = (PeacockRankModel) model;
					maxNum=rank.getFloorNum();
					maxname=model.getName();
					herdiceon=model.getIcon();
					frame=model.getFrame();
					break;
				}
				i++;
			}
			
			if (peacockCache.getPassNum()==null) {
				peacockCache.setPassNum(new ConcurrentHashMap<Integer, Integer>());
			}
			int a=0;
			int passNum=0;
			if (peacockFloor.getRewardState().size()>0) {
				rewardfloor=new Object[peacockFloor.getRewardState().size()];
				for (Map.Entry<Integer, Integer> entry:peacockFloor.getRewardState().entrySet()) {
					int floorNum=entry.getKey();
					if (entry.getValue()==GameConst.REWARD_1) {
						if (peacockCache.getPassNum().containsKey(floorNum)) {
							passNum=peacockCache.getPassNum().get(floorNum);
						}
						rewardfloor[a]=new Object[] {floorNum,passNum};
						a++;
					}
				}
			}
			rewardfloor=CommonUtil.removeNull(rewardfloor);
			PeacockFloorSender.sendCmd_1222(hero.getId(), peacockFloor.getFloorNum(), maxNum, maxname,herdiceon,frame, rewardfloor);
		    return;
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorManager.class, hero.getId(), hero.getName(), "openUi has wrong!");
		}
		
	}
	/**
	 * 获取双倍奖励关卡通过人数
	 * @param hero
	 * @param floorNum
	 */
	public void getNum(Hero hero, int floorNum) {
		try {
			int passNum=0;
			PeacockCache peacockCache=PeacockFloorSysCache.getPeacockCache();
			if (peacockCache.getPassNum()!=null&&peacockCache.getPassNum().containsKey(floorNum)) {
				passNum=peacockCache.getPassNum().get(floorNum);
			}
			PeacockFloorSender.sendCmd_1224(hero.getId(), floorNum, passNum);
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorManager.class, hero.getId(), hero.getName(), "getNum has wrong!");
		}
		
	}
	/**
	 * 获取双倍奖励
	 * @param hero
	 * @param floornum
	 */
	public void getreward(Hero hero, int floornum) {
		try {
			PeacockFloor peacockFloor=hero.getPeacockFloor();
			if (floornum>peacockFloor.getFloorNum()) {
				PeacockFloorSender.sendCmd_1226(hero.getId(), 1, floornum);
				return;
			}
			if(Config_tower_219.getIns().get(floornum).getReward1()==null) {
				PeacockFloorSender.sendCmd_1226(hero.getId(), 1, floornum);
				return;
			}
			if (!peacockFloor.getRewardState().containsKey(floornum)) {
				PeacockFloorSender.sendCmd_1226(hero.getId(), 1, floornum);
				return;
			}
			if (peacockFloor.getRewardState().get(floornum)==GameConst.REWARD_1) {
				//
				int[][] data = CommonUtil.copyDyadicArray(Config_tower_219.getIns().get(floornum).getReward1());
				for (int[] d:data) {
					d[2] =d[2]*2;
				}
				if(UseAddUtil.canAdd(hero, data, false)) {
					UseAddUtil.add(hero, data, SourceGoodConst.TOWER_DOUBLE, null, true);
					peacockFloor.getRewardState().put(floornum, GameConst.REWARD_2);
					PeacockFloorSender.sendCmd_1226(hero.getId(), 0, floornum);
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorManager.class, hero.getId(), hero.getName(), "getNum has wrong!");
		}
		
	}
	/**
	 * 爬塔
	 * @param hero
	 */
	public void upPower(Hero hero) {
		try {
			PeacockFloor peacockFloor=hero.getPeacockFloor();
			int goalFloorNum=peacockFloor.getFloorNum()+1;
			if (goalFloorNum>Config_tower_219.getIns().size()) {
				PeacockFloorSender.sendCmd_1228(hero.getId(), 1, goalFloorNum, 0);
				return;
			}
			Struct_tower_219 tower_219=Config_tower_219.getIns().get(goalFloorNum);
			int npcid = tower_219.getBoss()[0][0];
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);// 0:失败，1：成功，2：由前端结果决定

			peacockFloor.setAttTime(TimeDateUtil.getCurrentTime());
			PeacockFloorSender.sendCmd_1228(hero.getId(), 0, goalFloorNum, result);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE14);
			//八门金锁
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_12, 1);
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorManager.class, hero.getId(), hero.getName(), "upPower has wrong");
		}
	}
	/**
	 * 击败关卡boss 申请奖励
	 * @param hero
	 */
	public void beatBossWin(Hero hero) {
		try {
			PeacockFloor peacockFloor=hero.getPeacockFloor();
			//公共缓存修改
			PeacockCache peacockCache=PeacockFloorSysCache.getPeacockCache();
			
			int goalFloorNum=peacockFloor.getFloorNum()+1;
			if (goalFloorNum>Config_tower_219.getIns().size()) {
				return;
			}
			//int nowTime=TimeDateUtil.getCurrentTime();
			
			/*if (nowTime-peacockFloor.getAttTime()<1) {
				//通过耗时太短
				LogTool.warn("peacockFloor.getAttTime()-nowTime<2 hid:"+hero.getId(), PeacockFloorManager.class);
				return;
			}*/
			Struct_tower_219 tower_219=Config_tower_219.getIns().get(goalFloorNum);
			int npcid = tower_219.getBoss()[0][0];
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);
			boolean ischargeCache=false;
			
			if (result !=0) {
				List<Object[]> dropTips = new ArrayList<Object[]>();
				List<ProbabilityEventModel> pelist = PeacockFloorSysCache.getBossDropMap().get(goalFloorNum);
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
					UseAddUtil.add(hero, drops, SourceGoodConst.TOWER_DROP, null, false);
				}
				peacockFloor.setAttTime(0);
				if (tower_219.getReward1()!=null) {
					//有双倍奖励可以领取
					peacockFloor.getRewardState().put(goalFloorNum, GameConst.REWARD_1);
					if (peacockCache.getPassNum()==null) {
						peacockCache.setPassNum(new ConcurrentHashMap<Integer, Integer>());
					}
					if (peacockCache.getPassNum().containsKey(goalFloorNum)) {
						int  passNum=peacockCache.getPassNum().get(goalFloorNum)+1;
						int goalNum=tower_219.getNum();
						if (passNum>=goalNum-2) {
							passNum=goalNum-2;
						}
						peacockCache.getPassNum().put(goalFloorNum, passNum);
						ischargeCache=true;
					}else {
						peacockCache.getPassNum().put(goalFloorNum, 1);
						ischargeCache=true;
					}
				}
				peacockFloor.setFloorNum(goalFloorNum);
				if (peacockCache.getFirster()==null) {
					PeacockFloorer peacockFloorer=new PeacockFloorer(goalFloorNum, hero.getId(), hero.getTotalStrength());
					peacockCache.setFirster(peacockFloorer);
					ischargeCache=true;
				}else {
					if (goalFloorNum>peacockCache.getFirster().getFloorNum()) {
						peacockCache.getFirster().setHid(hero.getId());
						peacockCache.getFirster().setStrength(hero.getTotalStrength());
						peacockCache.getFirster().setFloorNum(goalFloorNum);
						ischargeCache=true;
					}
				}
				if (peacockCache.getFlooers()==null) {
					peacockCache.setFlooers(new ConcurrentHashMap<Integer, PeacockFloorer>());
					ischargeCache=true;
				}
				if (peacockCache.getFlooers().containsKey(goalFloorNum)) {
					if (peacockCache.getFlooers().get(goalFloorNum).getStrength()<hero.getTotalStrength()) {
						PeacockFloorer peacockFloorer=new PeacockFloorer(goalFloorNum, hero.getId(), hero.getTotalStrength());
						peacockCache.getFlooers().put(goalFloorNum, peacockFloorer);
						ischargeCache=true;
					}
				}else {
					PeacockFloorer peacockFloorer=new PeacockFloorer(goalFloorNum, hero.getId(), hero.getTotalStrength());
					peacockCache.getFlooers().put(goalFloorNum, peacockFloorer);
					ischargeCache=true;
				}
				PeacockFloorSender.sendCmd_1230(hero.getId(), goalFloorNum, dropTips.toArray());
				
				if (ischargeCache) {
					GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.PEACOCK);
					globalData.setContent(ObjStrTransUtil.toStr(peacockCache));
					GlobalCache.doSync(globalData);
				}
				//七日武圣榜
				SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_TONGQUTAI);
				//开服狂欢
				SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_8);
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_7, 0);
				//八门金锁
				EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_12, 1);
				//转生红点
				//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
				//更新排行榜
				RankingFunction.getIns().refreshPeacockRankList(hero);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_37, 0);
				//
				if(tower_219.getReward()!=null) {
					ChatManager.getIns().broadCast(ChatConst.BROCAST_TONGQUETAI,
							new Object[] { hero.getName(), goalFloorNum}); // 全服广播
				}
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorManager.class, hero.getId(), hero.getName(), "upPower has wrong");
		}
		
	}

}
