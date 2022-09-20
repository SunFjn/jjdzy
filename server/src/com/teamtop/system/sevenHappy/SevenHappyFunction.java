package com.teamtop.system.sevenHappy;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.archive.ArchiveFunction;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.excalibur.ExcaliburFunction;
import com.teamtop.system.generalSoul.GeneralSoulFunction;
import com.teamtop.system.godbook.GodBookFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.specialTreasure.SpecialTreasureManager;
import com.teamtop.system.treasure.TreasureFunction;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_party_240;
import excel.struct.Struct_party_240;


public class SevenHappyFunction {
	
	public static SevenHappyFunction ins;
	public static  SevenHappyFunction getIns() {
		if(ins == null){
			ins = new SevenHappyFunction();
		}
		return ins;
	}
	
	public void refreshSevenWuShenRank(Hero hero,int type) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SevenHappyConst.FUN_SEVENHAPPY)) return;
		Struct_party_240 party_240=SevenHappyCache.getSevenHappyByType().get(type);
		if (party_240==null) {
			return;
		}
		int now=TimeDateUtil.betweenOpen();
		int beginTime=party_240.getTime()[0][0];
		int overTime=party_240.getTime()[0][1];
		if (now<beginTime||now>overTime) {
			return;
		}
		try {
			long goal=0;
			Map<Integer, Map<Integer, Integer>> map = new HashMap<>();
			switch (type) {
			//1.玩家等级
			case SevenHappyConst.TYPE_1:
				goal=hero.getRealLevel();
				break;
			//2晋升经验
			case SevenHappyConst.TYPE_2:
				goal=hero.getPromotionModel().getExp();
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
			//15.神将狂欢
			case SevenHappyConst.TYPE_15:
				//map=WuJiangFunction.getIns().getWujiangAndStarNum(hero);
				break;	
			default:
				break;
			}
			//目标
			ConcurrentHashMap<Integer, Struct_party_240> concurrentHashMap = SevenHappyCache.getSevenHappyMap().get(type);
			for (Struct_party_240 struct_party_240:concurrentHashMap.values()) {
				if(struct_party_240.getYq()[0].length==1) {
					if(goal>=struct_party_240.getYq()[0][0]&&hero.getSevenHappy().getRewardMap().get(type).get(struct_party_240.getId())==GameConst.REWARD_0) {
						hero.getSevenHappy().getRewardMap().get(type).put(struct_party_240.getId(), GameConst.REWARD_1);
					//SevenHappySender.sendCmd_2334(hero.getId(), struct_party_240.getId(), GameConst.REWARD_1);
						isHong(hero, false);
					}
					continue;
				}
				if(struct_party_240.getYq()[0].length==2) {
					int lastThreeNum = getLastThreeNum(struct_party_240.getId());
					Map<Integer, Integer> map2 = map.get(lastThreeNum);
					if(map2==null) {
						continue;
					}
					int pingzhi=struct_party_240.getYq()[0][0];
					Integer num = map2.get(pingzhi);
					if(num==null) {
						continue;
					}
					Map<Integer, Integer[]> awardStateMap = hero.getSevenHappy().getTwoRewardMap().get(type);
					Integer[] awardStateArray = awardStateMap.get(struct_party_240.getId());
					if(num>=struct_party_240.getYq()[0][1]&&awardStateArray[0]==GameConst.REWARD_0) {
						awardStateArray[0]=GameConst.REWARD_1;
						awardStateArray[1]=GameConst.REWARD_1;
					//SevenHappySender.sendCmd_2334(hero.getId(), struct_party_240.getId(), GameConst.REWARD_1);
						isHong(hero, false);
					}
				}
				
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "refreshSevenWuShenRank has wrong type:"+type);
		}
	}
	
	/**
	 * 取得倒数第三个的数字
	 * @param id
	 * @return
	 */
	public int getLastThreeNum(int id) {
		String idStr = Integer.toString(id);
		int len = idStr.length();
		String lastThreeStr = idStr.substring(len-3, len-2);
		return Integer.parseInt(lastThreeStr);
	}
	
	/**
	 * 0点发奖励
	 * 未能及时领取的奖励用邮件补发 主题狂欢每天0点补发，其他的7天后补发
	 * @param num
	 */
	public void zero(Hero hero) {
		try {
			//发奖励
			for (int i = SevenHappyConst.TYPE_1; i <=SevenHappyConst.TYPE_12; i++) {
				Struct_party_240 party_240=SevenHappyCache.getSevenHappyByType().get(i);
				if (party_240==null) {
					continue;
				}
				int now=TimeDateUtil.betweenOpen();
				int overTime=party_240.getTime()[0][1];
				if (now>overTime) {
					HashMap<Integer, Integer> reward = hero.getSevenHappy().getRewardMap().get(i);
					if (reward==null) {
						continue;
					}
					for(int index:reward.keySet()) {
						int state=reward.get(index);
						if (state==GameConst.REWARD_1) {
							int[][] rewardArrs= SevenHappyCache.getSevenHappyMap().get(i).get(index).getReward();
							hero.getSevenHappy().getRewardMap().get(i).put(index, GameConst.REWARD_2);
							MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.SEVENHAPPY, new Object[] {MailConst.SEVENHAPPY}, rewardArrs);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SevenHappyFunction.class, "zero has wrong");
		}
		
	}
	/**
	 * 是否有红点
	 * @param hero
	 */
	public void isHong(Hero hero,boolean isLogin) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SevenHappyConst.FUN_SEVENHAPPY))
			return;
		// 目标
		HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
		int now = TimeDateUtil.betweenOpen();
		SevenHappy sevenHappy = hero.getSevenHappy();
		for (Struct_party_240 party_240 : Config_party_240.getIns().getSortList()) {
			int beginTime = party_240.getOpen()[0][0];
			int overTime = party_240.getOpen()[0][1];
			boolean flag = false;
			if (party_240.getXl() == null) {
				if (sevenHappy.getRewardMap().get(party_240.getType()).get(party_240.getId()) == GameConst.REWARD_1) {
					flag = true;
				}
			} else {
				Integer[] awardStateArray = sevenHappy.getTwoRewardMap().get(party_240.getType())
						.get(party_240.getId());
				if (party_240.getXl() != null && awardStateArray[0] == GameConst.REWARD_1) {
					flag = true;
				}
				if (party_240.getXl() != null && awardStateArray[1] == GameConst.REWARD_1) {
					flag = true;
				}
			}
			if (flag == true && now >= beginTime && now <= overTime) {
				if (!map.containsKey(party_240.getType())) {
					map.put(party_240.getType(), 0);
					if (isLogin) {
						RedPointFunction.getIns().addLoginRedPoint(hero, SevenHappyConst.FUN_SEVENHAPPY,
								party_240.getType(), RedPointConst.HAS_RED);
					} else {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SevenHappyConst.FUN_SEVENHAPPY,
								party_240.getType(), RedPointConst.HAS_RED);
					}
				}
			}
		}
		
	}
	
	
}
