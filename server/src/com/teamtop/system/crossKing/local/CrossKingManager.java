package com.teamtop.system.crossKing.local;

import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.happyCrossKing.HappyCrossKingFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.model.CrossKingHistory;
import com.teamtop.system.crossKing.model.CrossKingInfo;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigConst;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigFunction;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.shop.ShopEnum;
import com.teamtop.system.vip.VipAddType;
import com.teamtop.system.vip.VipFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lsxx_232;
import excel.config.Config_lsxxbp_232;
import excel.config.Config_lsxxstore_232;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lsxxbp_232;
import excel.struct.Struct_lsxxstore_232;

public class CrossKingManager {
	
	private static CrossKingManager ins;
	public static  CrossKingManager getIns(){
		if(ins == null) {
			ins = new CrossKingManager();
		}
		return ins;
	}
	
	public void openUi(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			CrossKingInfo info = CrossKingLocalCache.getInfo();
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			if(crossKing.getTerm() != info.getTerm()) {
				//不同赛季 重置
				crossKing.termReset(hero.getBelongZoneid());
			}
			if (crossKing.getRebornType()==0) {
				crossKing.setRebornType(hero.getRebornlv());
			}
			CrossKingLocalIO.getIns().getInfo(hero,0,crossKing,CrossKingLocalFunction.getIns().makeCrossKingRank(hero));
		    //八门金锁乱世枭雄
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_14, crossKing.getDuanwei());
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "openUi has wrong");
		}
		
	}
	/**
	 * 买次数
	 * @param hero
	 */
	public void buyTimes(Hero hero,int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			if(!CrossKingLocalFunction.getIns().canActivity(hero, true)) return;
			CrossKingInfo info = CrossKingLocalCache.getInfo();
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			if(crossKing.getTerm() != info.getTerm()) {
				//不同赛季 重置
				crossKing.termReset(hero.getBelongZoneid());
			}
			if (crossKing.getRebornType()==0) {
				crossKing.setRebornType(hero.getRebornlv());
			}
			if (num<=0) {
				return;
			}
			int vipNum = VipFunction.getIns().getVipNum(hero, VipAddType.crossKing);
			int maxNum = Config_xtcs_004.getIns().get(CrossKingConst.BUYNUM_MAX).getNum();
			maxNum += vipNum;
			if(!CrossKingLocalFunction.getIns().canActivity(hero, true)) return;
			int buycount=hero.getCrossKing().getBuyCount()+num;
			if (buycount<=maxNum); {
				if (UseAddUtil.canUse(hero, Config_xtcs_004.getIns().get(CrossKingConst.BUYNUM_COST).getOther(),num)) {
					UseAddUtil.use(hero, Config_xtcs_004.getIns().get(CrossKingConst.BUYNUM_COST).getOther(),num, SourceGoodConst.BUY_CROSSKING_NUM, true);
					hero.getCrossKing().setBuyCount(hero.getCrossKing().getBuyCount()+num);
					hero.getCrossKing().setChallCount(hero.getCrossKing().getChallCount()+num);
					CrossKingSender.sendCmd_1864(hero.getId(), 0,hero.getCrossKing().getChallCount() , hero.getCrossKing().getBuyCount());
				    return;
				}
			}
			CrossKingSender.sendCmd_1864(hero.getId(), 2,hero.getCrossKing().getChallCount() , hero.getCrossKing().getBuyCount());
		    return;
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "buyTimes has wrong");
		}
		
	}
	/**
	 * 挑战
	 * @param hero
	 * @param type
	 * @param index
	 * @param id
	 */
	public void challenge(Hero hero, int type, int index, long id) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			if(!CrossKingLocalFunction.getIns().canActivity(hero, true)) return;
			CrossKingInfo info = CrossKingLocalCache.getInfo();
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			if(crossKing.getTerm() != info.getTerm()) {
				//不同赛季 重置
				crossKing.termReset(hero.getBelongZoneid());
			}
			if (crossKing.getRebornType()==0) {
				crossKing.setRebornType(hero.getRebornlv());
			}
			if(id == hero.getId()) {
				CrossKingSender.sendCmd_1866(hero.getId(), 9);
				return;
			}
			if (crossKing.getChallCount() <= 0) {
				int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), CrossKingConst.PROP_ID);
				if (goodsNumBySysId <= 0) {
					// 没有挑战令
					CrossKingSender.sendCmd_1866(hero.getId(), 10);
					return;
				} else {
					if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, CrossKingConst.PROP_ID)) {
						return;
					}
					UseAddUtil.use(hero, GameConst.TOOL, 1, CrossKingConst.PROP_ID, SourceGoodConst.CROSSKING_REDUCE,
							true);
				}
			}
			int checkTime = TimeDateUtil.getCurrentTime() - crossKing.getChallTime();
			if(checkTime >0 &&  checkTime < 4){
				LogTool.warn("challenge checkTime >0 &&  checkTime < 4 hid:"+hero.getId(), CrossKingManager.class);
				return;
			}
			crossKing.setBelongZoneid(GameProperties.getFirstZoneId());
			CrossKingLocalIO.getIns().challenge(hero, crossKing,CrossKingLocalFunction.getIns().makeCrossKingRank(hero), type, index, id);
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "challenge has wrong");
		}
		
	}
	/**
	 * 战斗结束通知后端战斗结果
	 * @param hero
	 * @param brest 0胜利（获取奖励） 1失败
	 */
	public void getBattleReward(Hero hero, int brest) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			if(!CrossKingLocalFunction.getIns().canActivity(hero, true)) return;
			CrossKingInfo info = CrossKingLocalCache.getInfo();
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			if(crossKing.getTerm() != info.getTerm()) {
				//不同赛季 重置
				crossKing.termReset(hero.getBelongZoneid());
			}
			if (crossKing.getRebornType()==0) {
				crossKing.setRebornType(hero.getRebornlv());
			}
			CrossKingLocalIO.getIns().getBattleReward(hero,brest,CrossKingLocalFunction.getIns().makeCrossKingRank(hero));
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "getBattleReward has wrong");
		}
		
	}
	/**
	 *获得晋级对手信息
	 * @param hero
	 */
	public void getJingJi(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			if(!CrossKingLocalFunction.getIns().canActivity(hero, true)) return;
			CrossKingInfo info = CrossKingLocalCache.getInfo();
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			if(crossKing.getTerm() != info.getTerm()) {
				//不同赛季 重置
				crossKing.termReset(hero.getBelongZoneid());
			}
			if (crossKing.getRebornType()==0) {
				crossKing.setRebornType(hero.getRebornlv());
			}
			
			if (crossKing.getRank() > Config_lsxx_232.getIns().get(crossKing.getDuanwei()).getUp()) {
				CrossKingSender.sendCmd_1866(hero.getId(), 3);
				return;
			}
			int dwindex=crossKing.getDuanwei();
			if (dwindex>=CrossKingConst.KING_ID) {
				return;
			}
			CrossKingRank rank =CrossKingLocalFunction.getIns().makeCrossKingRank(hero);
			CrossKingLocalIO.getIns().getJinJiData(hero,0,crossKing,rank);
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "getJingJi has wrong");
		}
		
	}
	/**
	 * CG 换一批 1873
	 * @param type| 0普通换一批1晋级挑战换一批| byte
	 */
	public void changeRanks(Hero hero, int type) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			if(!CrossKingLocalFunction.getIns().canActivity(hero, true)) return;
			CrossKingInfo info = CrossKingLocalCache.getInfo();
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			if(crossKing.getTerm() != info.getTerm()) {
				//不同赛季 重置
				crossKing.termReset(hero.getBelongZoneid());
			}
			if (crossKing.getRebornType()==0) {
				crossKing.setRebornType(hero.getRebornlv());
			}
			int[][] cost=Config_xtcs_004.getIns().get(CrossKingConst.CHANGE_COST).getOther();
			if (!UseAddUtil.canUse(hero, cost)) {
				CrossKingSender.sendCmd_1874(hero.getId(), 1);
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.CROSSKING_CHANGE_COST, true);
			if (type==0) {
				//0普通换一批
				CrossKingLocalIO.getIns().getInfo(hero,1,crossKing,CrossKingLocalFunction.getIns().makeCrossKingRank(hero));
			}else {
				//1晋级挑战换一批
				CrossKingRank rank =CrossKingLocalFunction.getIns().makeCrossKingRank(hero);
				CrossKingLocalIO.getIns().getJinJiData(hero,1,crossKing,rank);
			}
			
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "changeRanks has wrong");
		}
		
	}
	/**
	 * 打开段位排行
	 * @param hero
	 * @param dw
	 */
	public void openRanks(Hero hero, int dw) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			if (dw<CrossKingConst.DW_RANK_SHOW) {
				return;
			}
			CrossKingLocalIO.getIns().getRankList(hero, dw);
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "openRanks has wrong");
		}
		
	}
	/**
	 * 打开战报
	 * @param hero
	 */
	public void openHis(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			Object[] his=new Object[crossKing.getHistory().size()];
			//B:战斗结果0失败1成功U:对手名字B:排名 0不变1上升下降B:是否晋级 1晋级2掉级
			for (int i = 0; i < his.length; i++) {
				CrossKingHistory hisTory=crossKing.getHistory().get(i);
				if (hisTory!=null) {
					his[i]=new Object[] {hisTory.getWin(),hisTory.getName(),hisTory.getIsUp(),hisTory.getIsJingJi()};
				}
			}
			his=CommonUtil.removeNull(his);
			CrossKingSender.sendCmd_1878(hero.getId(), his);
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "openHis has wrong");
		}
		
	}
	/**
	 * 打开积分奖励
	 * @param hero
	 */
	public void openRewards(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			Map<Integer, Integer> scoreReward = crossKing.getScoreReward();
			Object[] score = new Object[scoreReward.size()];
			int sumScore=crossKing.getScore();
			int i = 0;
			for (Struct_lsxxbp_232 lsxxbp_232: Config_lsxxbp_232.getIns().getSortList()) {
				if (!scoreReward.containsKey(lsxxbp_232.getId())) {
					scoreReward.put(lsxxbp_232.getId(), GameConst.REWARD_0);
				}
				if (scoreReward.get(lsxxbp_232.getId())==GameConst.REWARD_0&&sumScore>=lsxxbp_232.getBp()) {
					scoreReward.put(lsxxbp_232.getId(), GameConst.REWARD_1);
				}
				score[i] = new Object[]{lsxxbp_232.getId(),scoreReward.get(lsxxbp_232.getId())};
				i++;
			}
			CrossKingSender.sendCmd_1880(hero.getId(), score);
			return;
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "openRewards has wrong");
		}
		
	}
	/**
	 * 领取积分奖励
	 * @param hero
	 * @param index
	 */
	public void getjfreward(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			int[][] reward=Config_lsxxbp_232.getIns().get(index).getReward();
			if (crossKing.getScoreReward().get(index)==GameConst.REWARD_1) {
				if(UseAddUtil.canAdd(hero, reward, false)){
					crossKing.getScoreReward().put(index, GameConst.REWARD_2);
					UseAddUtil.add(hero, reward, SourceGoodConst.CROSSKING_JF_REWARD, null, true);
					CrossKingSender.sendCmd_1882(hero.getId(), index, GameConst.REWARD_2);
				}
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, "getjfreward has wrong");
		}
		
	}

	public void openShop(Hero hero) {
		try {
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			Object[] iteminfo =new Object[crossKing.getShopItems().size()];
			int i=0;
			int sumNum=crossKing.getSumBattleNum();
			for (Struct_lsxxstore_232 lsxxstore_232: Config_lsxxstore_232.getIns().getSortList()) {
				if (!crossKing.getShopItems().containsKey(lsxxstore_232.getId())) {
					crossKing.getShopItems().put(lsxxstore_232.getId(), GameConst.REWARD_0);
				}
				if (crossKing.getShopItems().get(lsxxstore_232.getId())==GameConst.REWARD_0&&sumNum>=lsxxstore_232.getTime()) {
					crossKing.getShopItems().put(lsxxstore_232.getId(), GameConst.REWARD_1);
				}
				iteminfo[i] = new Object[]{lsxxstore_232.getId(),crossKing.getShopItems().get(lsxxstore_232.getId())};
				i++;
			}
			CrossKingSender.sendCmd_1884(hero.getId(), sumNum, iteminfo);
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, hero.getId(), hero.getName(), "openShop has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 * @param itemId
	 */
	public void buyItem(Hero hero, int itemId) {
		try {
			CrossKing crossKing = hero.getCrossKing();
			if(crossKing == null) {
				return;
			}
			Struct_lsxxstore_232 struct_lsxxstore_232 = Config_lsxxstore_232.getIns().get(itemId);
			int[][] reward=struct_lsxxstore_232.getStore();
			int[][] cost=struct_lsxxstore_232.getPrice();
			if (crossKing.getShopItems().get(itemId)!=GameConst.REWARD_1) {
				CrossKingSender.sendCmd_1886(hero.getId(), itemId, 1);
				return;
			}
			if (!UseAddUtil.canUse(hero, cost)) {
				CrossKingSender.sendCmd_1886(hero.getId(), itemId, 2);
				return;
			}
			if(UseAddUtil.canAdd(hero, reward, false)){
				UseAddUtil.use(hero, cost, SourceGoodConst.CROSSKING_SHOP_USE, true, null);
				crossKing.getShopItems().put(itemId, GameConst.REWARD_2);
				UseAddUtil.add(hero, reward, SourceGoodConst.CROSSKING_SHOP_GET, null, true);
				CrossKingSender.sendCmd_1886(hero.getId(), itemId, 0);
				String usesys = hero.getTempData().getAccount().getUsesys();
				int itemid = reward[0][1];
				if(itemid==0) {
					itemid = reward[0][0];
				}
				int itemcost = cost[0][2];
				int buynum = 1;
				int costtype = cost[0][0];
				int type = ShopEnum.CROSS_KING_SHOP.getType();
				FlowHeroEvent.addShopFlow(hero.getId(), hero.getLevel(), type, itemid, itemcost, buynum, costtype,
						hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, hero.getId(), hero.getName(), "openShop has wrong");
		}
		
	}

	public void openbao(Hero hero) {
		try {
			if (CrossKingLocalCache.getIsbeatMap().containsKey(hero.getId())) {
				String name = CrossKingLocalCache.getIsbeatMap().get(hero.getId());
				CrossKingSender.sendCmd_1890(hero.getId(), name);
				CrossKingLocalCache.getIsbeatMap().remove(hero.getId());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, hero.getId(), hero.getName(), "openbao has wrong");
		}
		
	}

	/**
	 * 扫荡
	 * 
	 * @param hero
	 * @param beChaId
	 */
	public void mopUpHandle(Hero hero, long beChaId) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			if(!CrossKingLocalFunction.getIns().canActivity(hero, true)) return;
			long hid = hero.getId();
			int duanwei = hero.getCrossKing().getDuanwei();
			if (duanwei < CrossKingConst.KING_ID) {
				// 未达到乱世枭雄段位
				CrossKingSender.sendCmd_1894(hid, 0, 0, 0);
				return;
			}
			if (hid == beChaId) {
				// 不能扫荡自己
				CrossKingSender.sendCmd_1894(hid, 1, 0, 0);
				return;
			}
			int chaNum = hero.getCrossKing().getChallCount();
			if (chaNum == 0) {
				int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), CrossKingConst.PROP_ID);
				if (goodsNumBySysId <= 0) {
					// 没有挑战次数
					CrossKingSender.sendCmd_1894(hid, 2, 0, 0);
					return;
				} else {
					if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, CrossKingConst.PROP_ID)) {
						return;
					}
					UseAddUtil.use(hero, GameConst.TOOL, 1, CrossKingConst.PROP_ID, SourceGoodConst.CROSSKING_REDUCE,
							true);
				}
			}
			/*CrossKing heroKingData = CrossKingLocalCache.getHeroKingData(hid);
			int myRank = heroKingData.getRank();
			int beChaRank = CrossKingLocalCache.getHeroKingData(beChaId).getRank();
			if (myRank > beChaRank) {
				// 只能扫荡排行低于自己的
				CrossKingSender.sendCmd_1894(hid, 3, 0, 0);
				return;
			}*/
			// 扣除挑战次数
			int leftCha = chaNum - 1;
			if (leftCha < 0) {
				leftCha = 0;
			}
			hero.getCrossKing().setChallCount(leftCha);
			hero.getCrossKing().setSumBattleNum(hero.getCrossKing().getSumBattleNum() + 1);// 累计挑战次数也需要增加
			// 发送奖励(胜利)
			int[][] reward = Config_xtcs_004.getIns().get(CrossKingConst.BATTLE_WIN_REWARD).getOther();
			UseAddUtil.add(hero, reward, SourceGoodConst.CROSSKING_BATTLE_REWARD, null, true);
			int jifeng = Config_xtcs_004.getIns().get(CrossKingConst.BATTLE_WIN_JIFEN).getNum();
			hero.getCrossKing().setScore(hero.getCrossKing().getScore() + jifeng);
			CrossKingLocalFunction.getIns().sendOwnData(hero);
			CrossKingSender.sendCmd_1894(hid, 4, leftCha, jifeng);
			CrossKingLocalIO.getIns().getInfo(hero, 1, hero.getCrossKing(),
					CrossKingLocalFunction.getIns().makeCrossKingRank(hero));
			// 八门金锁
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_14, duanwei);
			// 少主活动-金猪送财
			ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_7, duanwei);
			// 全民狂欢活动-乱世枭雄狂欢
			HappyCrossKingFunction.getIns().addNumByType(hero);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_7, 1, 0);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_16, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_16, 1);
		} catch (Exception e) {
			LogTool.error(e, CrossKingManager.class, hero.getId(), hero.getName(), "CrossKingManager mopUp fail");
		}
	}

}
