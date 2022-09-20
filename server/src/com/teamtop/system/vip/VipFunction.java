package com.teamtop.system.vip;

import com.teamtop.system.LoginLuxuryGifts.LoginLuxuryGiftsFunction;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActLC;
import com.teamtop.system.activity.ativitys.hefuGodGift.HeFuGodGiftFunction;
import com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew.LoginLuxuryGiftsNewFunction;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActLC;
import com.teamtop.system.activity.ativitys.vipDiscount.VipDiscountFunction;
import com.teamtop.system.collectTreasury.CollectTreasuryFunction;
import com.teamtop.system.destiny.DestinyFunction;
import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankLC;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.setting.SettingFunction;
import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankLC;
import com.teamtop.system.vip.model.VipData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_VIP_710;
import excel.struct.Struct_VIP_710;

public class VipFunction {

	private static VipFunction vipFunction;

	private VipFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized VipFunction getIns() {
		if (vipFunction == null) {
			vipFunction = new VipFunction();
		}
		return vipFunction;
	}

	/**
	 * 更新vip
	 * @param hero
	 * @param rechargeMoney
	 */
	public void updateVip(Hero hero, int rechargeMoney) {
		try {
			VipData vipData = hero.getVipData();
			int vipExp = vipData.getVipExp() + rechargeMoney;
			vipData.setVipExp(vipExp);
			updateVipHandle(hero);
		} catch (Exception e) {
			LogTool.error(e, VipFunction.class, hero.getId(), hero.getName(), "VipFunction updateVip fail");
		}
	}

	/**
	 * 检测vip等级
	 * @param hero
	 */
	public void updateVipHandle(Hero hero) {
		try {
			VipData vipData = hero.getVipData();
			int vipExp = vipData.getVipExp();
			int vipLv = hero.getVipLv();
			int startLevel = vipLv + 1;
			int nextLevel = 0;
			int maxLevel = Config_VIP_710.getIns().getSortList().size()-1;
			for(int i=startLevel;i<=maxLevel;i++){				
				Struct_VIP_710 vipInfo = Config_VIP_710.getIns().get(i+1);
				if (vipInfo == null) {
					continue;
				}
				int money = vipInfo.getMONEY();// rmb
				if (vipExp >= money) {
					nextLevel = i;
				}else {
					break;
				}
			}
			if(nextLevel==0) {
				return;
			}
			// 升级vip
			hero.setVipLv(nextLevel);
			VipManager.getIns().openVip(hero);
			// 升级vip触发
			SettingFunction.getIns().vipLevelUp(hero, nextLevel);
			// 登录豪礼活动
			LoginLuxuryGiftsNewFunction.getIns().checkRewardState(hero);
			// 登录豪礼系统
			LoginLuxuryGiftsFunction.getIns().checkRewardState(hero);
			// 更新排行榜
			RankingFunction.getIns().refreshAll(hero);
			//vip升解锁符文
			DestinyFunction.getIns().vipadd(hero);
			//聚宝盆红点
			CollectTreasuryFunction.getIns().reachVipRedPoint(hero);
			CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 2);
			CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 2);
			CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			//vip升级推送vip折扣红点
			VipDiscountFunction.getIns().vipUpRed(hero,vipLv);
			//合服-大神送礼
			HeFuGodGiftFunction.getIns().vipLevelUp(vipLv,nextLevel);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_44, 0);
		} catch (Exception e) {
			LogTool.error(e, VipFunction.class, hero.getId(), hero.getName(), "VipFunction updateVipHandle fail");
		}
	}

	/**
	 * 获取vip值（功能开启、或次数加成）
	 * 功能开启（0未开启，1开启）
	 */
	public int getVipNum(Hero hero, VipAddType vipAddType) {
		try {
			int vipLv = hero.getVipLv();
			Struct_VIP_710 vipData = Config_VIP_710.getIns().get(vipLv+1);
			if(vipData==null) {
				return 0;
			}
			if (vipAddType == VipAddType.bagEquipNum) {
				return vipData.getBAG();
			} else if (vipAddType == VipAddType.mopUpMaterialsFuBen) {
				return vipData.getSAODANGFUBEN();
			} else if (vipAddType == VipAddType.godOfWarOpen) {
				return vipData.getSAODANGJJC();
			} else if (vipAddType == VipAddType.chatLimit) {
				return vipData.getLIAOTIAN();
			} else if (vipAddType == VipAddType.mopUpQuanqia) {
				return vipData.getSAODANGGUAQIA();
			} else if (vipAddType == VipAddType.fightNSOpen) {
				return vipData.getSAODANGPK();
			} else if (vipAddType == VipAddType.forgeUpstar) {
				return vipData.getSTAR();
			} else if (vipAddType == VipAddType.godOfWarChaNum) {
				return vipData.getJJCBUYNUM();
			} else if (vipAddType == VipAddType.crossKing) {
				return vipData.getLSXX();
			} else if (vipAddType == VipAddType.crossZhuLuAddTiLi) {
				return vipData.getTl();
			} else if (vipAddType == VipAddType.crossZhuLuBuyTiLiTimes) {
				return vipData.getCs();
			}else if(vipAddType == VipAddType.crossTeamKingBuyNum) {
				return vipData.getKfwz();
			}
		} catch (Exception e) {
			LogTool.error(e, VipFunction.class, hero.getId(), hero.getName(), "VipFunction getAddNum");
		}
		return 0;
	}

}
