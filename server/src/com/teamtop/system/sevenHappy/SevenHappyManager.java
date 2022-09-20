package com.teamtop.system.sevenHappy;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.archive.ArchiveFunction;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.excalibur.ExcaliburFunction;
import com.teamtop.system.generalSoul.GeneralSoulFunction;
import com.teamtop.system.godbook.GodBookFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.rechargeFeedback.RechargeFeedbackConst;
import com.teamtop.system.rechargeFeedback.RechargeFeedbackSender;
import com.teamtop.system.rechargeFeedback.moel.RechargeFeedback;
import com.teamtop.system.specialTreasure.SpecialTreasureManager;
import com.teamtop.system.treasure.TreasureFunction;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lchk_744;
import excel.config.Config_party_240;
import excel.struct.Struct_lchk_744;
import excel.struct.Struct_party_240;

public class SevenHappyManager {
	
	public static SevenHappyManager ins;
	public static  SevenHappyManager getIns() {
		if(ins == null){
			ins = new SevenHappyManager();
		}
		return ins;
	}
	
	
	public void openUi(Hero hero, int type) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SevenHappyConst.FUN_SEVENHAPPY)) return;
			Struct_party_240 party_240=SevenHappyCache.getSevenHappyByType().get(type);
			int now=TimeDateUtil.betweenOpen();
			int beginTime=party_240.getTime()[0][0];
			int overTime=party_240.getTime()[0][1];
			if (now<beginTime||now>overTime) {
				return;
			}
			long goal=0;
			switch (type) {
			//1.玩家等级
			case SevenHappyConst.TYPE_1:
				goal=hero.getRealLevel();
				break;
			//2晋升经验
			case SevenHappyConst.TYPE_2:
				if (hero.getPromotionModel()!=null) {
					goal=hero.getPromotionModel().getExp();
				}
				break;
			//3宝物总战力	
			case SevenHappyConst.TYPE_3:
				goal=TreasureFunction.getIns().getTreasureTotalStrength(hero);
				break;
			//4.装备总战力
			case SevenHappyConst.TYPE_4:
				goal=EquipFunction.getIns().getAllEquipTotalStrength(hero);
				break;
			//5.武将总战力
			case SevenHappyConst.TYPE_5:
				goal=WuJiangFunction.getIns().getWuJiangTotelStr(hero);
				break;
			//6.战甲总战力	
			case SevenHappyConst.TYPE_6:
				goal=ZhanJiaFunction.getIns().getZhanJiaTotelStr(hero);
				break;
			//7.图鉴总战力
			case SevenHappyConst.TYPE_7:
				goal=ArchiveFunction.getIns().getArchiveTotalStrength(hero);
				break;
			//8.铜雀台通关层数
			case SevenHappyConst.TYPE_8:
				goal=hero.getPeacockFloor().getFloorNum();
				break;
			//9.玩家总战力	
			case SevenHappyConst.TYPE_9:
				goal=hero.getTotalStrength();
				break;
			//10.元宝消耗
			case SevenHappyConst.TYPE_10:
				goal=hero.getOneDayConsmeNum();
				break;
			//11.天书总战力	
			case SevenHappyConst.TYPE_11:
				goal=GodBookFunction.getIns().getZhanJiaTotelStr(hero);
				break;
			//12.将魂战斗力
			case SevenHappyConst.TYPE_12:
				goal=GeneralSoulFunction.getIns().getGeneralSoulTotelStr(hero);
				break;
			//13.神剑战斗力
			case SevenHappyConst.TYPE_13:
				goal=ExcaliburFunction.getIns().getExcaliburTotalStrength(hero);
				break;
			//14.异宝战斗力
			case SevenHappyConst.TYPE_14:
				goal=SpecialTreasureManager.getIns().getSpeTreasureTotalStrength(hero);
				break;				
			default:
				break;
			}
			HashMap<Integer, Integer> rewardSate=hero.getSevenHappy().getRewardMap().get(type);
			Object[] rewards=new Object[rewardSate.size()];
			int i=0;
			for (int index:rewardSate.keySet()) {
				rewards[i]=new Object[] {index,goal,rewardSate.get(index)};
				i++;
			}
			SevenHappySender.sendCmd_2332(hero.getId(), rewards);
			return;
		} catch (Exception e) {
			LogTool.error(e, SevenHappyManager.class, "openUi has wrong");
		}
		
	}


	public void getReward(Hero hero, int index) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SevenHappyConst.FUN_SEVENHAPPY)) return;
			Struct_party_240 party_240= Config_party_240.getIns().get(index);
			int now=TimeDateUtil.betweenOpen();
			int beginTime=party_240.getTime()[0][0];
			int overTime=party_240.getTime()[0][1];
			if (now<beginTime||now>overTime) {
				return;
			}
			int[][] data=party_240.getReward();
			if (hero.getSevenHappy().getRewardMap().get(party_240.getType()).get(index)==GameConst.REWARD_1) {
				hero.getSevenHappy().getRewardMap().get(party_240.getType()).put(index, GameConst.REWARD_2);
				UseAddUtil.add(hero, data, SourceGoodConst.SEVENHAPP, null, true);
				SevenHappySender.sendCmd_2334(hero.getId(),index, GameConst.REWARD_2);
			}
		} catch (Exception e) {
			LogTool.error(e, SevenHappyManager.class, "getReward has wrong");
		}

	}


	/**
	 * 新打开界面(使用它的目的是有限量奖励(特殊奖励)状态)
	 * @param hero
	 * @param type 开服狂欢类型，例如神将狂欢15
	 */
	public void newOpenUI(Hero hero, int type) {
		// TODO Auto-generated method stub
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SevenHappyConst.FUN_SEVENHAPPY))
				return;
			if(!isStart(type)) {
				return;
			}
			Map<Integer, Struct_party_240> configMap = SevenHappyCache.getSevenHappyMap().get(type);
			Object[] rewards = new Object[configMap.size()];
			int i = 0;
			Map<Integer, Integer[]> awardMap = hero.getSevenHappy().getTwoRewardMap().get(type);
			Map<Integer, AtomicInteger> limitNumMap = SevenHappyCache.getLimitNumMap().get(type);
			for (Struct_party_240 struct_party_240 : configMap.values()) {
				int id = struct_party_240.getId();
				Integer[] state = awardMap.get(id);
				rewards[i] = new Object[] { id,  state[0],state[1],limitNumMap.get(id).get()};
				i++;
			}
			int endTimeInt = getEndTimeInt(type);
			SevenHappySender.sendCmd_2336(hero.getId(), rewards,endTimeInt);
			return;
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "newOpenUI type:" + type);
		}
	}
	
	public int getEndTimeInt(int type) {
		Struct_party_240 party_240=SevenHappyCache.getSevenHappyByType().get(type);
		int endTime=party_240.getTime()[0][1];
		int betweenOpen = TimeDateUtil.betweenOpen();
		int time =endTime-betweenOpen+1;
		int endTimeInt = TimeDateUtil.getOneTime(time, 0, 0, 0);
		return endTimeInt;
		
	}
	
	public boolean isStart(int type) {
		Struct_party_240 party_240 = SevenHappyCache.getSevenHappyByType().get(type);
		if(party_240==null) {
			return false;
		}
		int now = TimeDateUtil.betweenOpen();
		int beginTime = party_240.getTime()[0][0];
		int overTime = party_240.getTime()[0][1];
		if (now < beginTime || now > overTime) {
			return false;
		}
		return true;
	}


	/**领取奖励 (使用它的目的是有限量奖励(特殊奖励)状态)
	 * @param hero
	 * @param awardId 要领取的奖励id
	 * @param awardType 奖励类型，0:普通奖励，1:限量奖励(特殊奖励)
	 */
	public void newGetAward(Hero hero, int awardId, int awardType) {
		// TODO Auto-generated method stub
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SevenHappyConst.FUN_SEVENHAPPY)) return;
			Struct_party_240 party_240= Config_party_240.getIns().get(awardId);
			if(party_240==null) {
				SevenHappySender.sendCmd_2338(hero.getId(), 0, awardId, awardType,0);
				return;
			}
			if(!isStart(party_240.getType())) {
				return;
			}
			Map<Integer, Integer[]> map = hero.getSevenHappy().getTwoRewardMap().get(party_240.getType());
			Integer[] stateArray = map.get(awardId);
			int[][] data;
			if (stateArray !=null && stateArray[awardType]==GameConst.REWARD_1) {
				int decrementAndGet=0;
				//限量奖励数量
				if(awardType==1) {
					AtomicInteger atomicInteger = SevenHappyCache.getLimitNumMap().get(party_240.getType()).get(awardId);
					//通过并发包里的atom原子类来实现对共享变量的线程安全
					if(atomicInteger.get()>0) {
						decrementAndGet = atomicInteger.decrementAndGet();
						if(decrementAndGet<0) {
							SevenHappySender.sendCmd_2338(hero.getId(), 4, awardId, awardType,0);
							return;
						}
					}else {
						SevenHappySender.sendCmd_2338(hero.getId(), 4, awardId, awardType,0);
						return;
					}
					data = party_240.getXl();
				}else {
					data = party_240.getReward();
				}
				stateArray[awardType]=GameConst.REWARD_2;
				UseAddUtil.addJK(hero, data, SourceGoodConst.SEVENHAPP, null, true, party_240.getJiankong());
				SevenHappySender.sendCmd_2338(hero.getId(), 1, awardId, awardType,decrementAndGet);
			}else {
				if(stateArray[awardType]==GameConst.REWARD_0) {
					SevenHappySender.sendCmd_2338(hero.getId(), 2, awardId, awardType,0);
					return;
				}else {
					SevenHappySender.sendCmd_2338(hero.getId(), 3, awardId, awardType,0);
					return;
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "newGetAward awardId:" + awardId+" awardType:"+awardType);
		}
	}
	
	

	

}
