package com.teamtop.system.battleVixens;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.actGift.ActGiftFunction;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleVixens.model.BattleVixens;
import com.teamtop.system.battleVixens.model.BattleVixensRank;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.weekCard.WeekCardFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_yiqi_007;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_yiqi_007;

/**
 * 一骑当千
 * 
 * @author hzp
 *
 */
public class BattleVixensManager {

	private static BattleVixensManager battleVixensManager;

	private BattleVixensManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleVixensManager getIns() {
		if (battleVixensManager == null) {
			battleVixensManager = new BattleVixensManager();
		}
		return battleVixensManager;
	}

	/**
	 * 打开一骑当千
	 * 
	 * @param hero
	 */
	public void openBattleVixens(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			BattleVixens battleVixens = hero.getBattleVixens();
			if (battleVixens == null) {
				// 系统未开启
				return;
			}
			int hardType = battleVixens.getHardType();
			List<Struct_yiqi_007> list = BattleVixensCache.getHardTypeMap().get(hardType);
			int size = list.size();
			int index = battleVixens.getMaxPassId()%1000-1;
			int nowType = battleVixens.getMaxPassId()/1000;
			if(index==size-1&&hardType==nowType) {
				hardType += 1;
				if (BattleVixensCache.getHardTypeMap().containsKey(hardType)) {
					battleVixens.setHardType(hardType);
				} else {
					hardType -= 1;
				}
			}
			int maxPassId = battleVixens.getMaxPassId();
			int challengeNum = battleVixens.getChallengeNum();
			int buyNum = battleVixens.getBuyNum();
			int addNum = battleVixens.getAddNum();
			int freeCha = battleVixens.getFreeCha();
			int leftCha = freeCha + addNum + buyNum - challengeNum;
			List<Object[]> passData = new ArrayList<>();
			Map<Integer, int[]> passMap = battleVixens.getPassMap();
			for (int type : passMap.keySet()) {
				int[] is = passMap.get(type);
				passData.add(new Object[] { type, is[0], is[1] });
			}
			BattleVixensSender.sendCmd_1282(hero.getId(), hardType, maxPassId, passData.toArray(), leftCha, buyNum);
		} catch (Exception e) {
			LogTool.error(e, BattleVixensManager.class, hero.getId(), hero.getName(), "openBattleVixens fail");
		}
	}

	/**
	 * 请求挑战
	 * @param hero
	 * @param hardType 难度
	 */
	public void challenge(Hero hero, int hardType) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			BattleVixens battleVixens = hero.getBattleVixens();
			if (battleVixens == null) {
				// 系统未开启
				return;
			}
			if (hardType > battleVixens.getHardType()) {
				// 难度未开启
				BattleVixensSender.sendCmd_1284(hid, 1);
				return;
			}
			int challengeNum = battleVixens.getChallengeNum();
			int buyNum = battleVixens.getBuyNum();
			int addNum = battleVixens.getAddNum();
			int freeCha = battleVixens.getFreeCha();
			int leftCha = freeCha + addNum + buyNum - challengeNum;
			if (leftCha == 0) {
				// 无挑战次数
				BattleVixensSender.sendCmd_1284(hid, 2);
				return;
			}
			List<Struct_yiqi_007> list = BattleVixensCache.getHardTypeMap().get(hardType);
			// 从此难度的第一波开始
			// Struct_yiqi_007 struct_yiqi_007 = list.get(0);
			// 当前难度通关大于11 减10关开启
			Map<Integer, Integer> topPassMap = battleVixens.getTopPassMap();
			Integer topPass = topPassMap.get(hardType);
			int startIndex = 0;// 开始挑战关
			if (WeekCardFunction.getIns().isWeekCardEffect(hero)) {
				if (topPass != null) {
					int topTemp = topPass % 1000;
					if (topTemp > 11) {
						startIndex = topTemp - 1 - BattleVixensConst.MINUS_VALUE;
					}
				}
			}
			Struct_yiqi_007 struct_yiqi_007 = list.get(startIndex);
			int[][] dispose = struct_yiqi_007.getDispose();
			int npcid = BattleFunction.getMaxNpcid(dispose, 0);
			int npcNum = dispose[0][1];
			BattleFunction.setBattleCheckTime(hero);
			int result = 0;
			battleVixens.setTempHp(hero.getFinalFightAttr().getHpMax());// 设置初始血量
			// long tempHp = battleVixens.getTempHp();
			// List<Long> hpList = new ArrayList<>();
			// hpList.add(tempHp);
			battleVixens.setSynTime(TimeDateUtil.getCurrentTime());
			// boolean checkWin = BattleFunction.checkWinHeroCanDead(hero, npcid, npcNum,
			// BattleConst.OTHER, true, null, true);
			// if (checkWin) {
			// result = 1;
			// }
			result = BattleFunction.checkWinByFight(hero, npcid, BattleVixensConst.SysId);
			battleVixens.setChallengeNum(challengeNum + 1);
			battleVixens.setTempHardType(hardType);// 在挑战难度
			int passId = struct_yiqi_007.getIndex();
			battleVixens.setTempPassId(passId);
			if (passId > battleVixens.getTodayMaxPassId()) {
				battleVixens.setTodayMaxPassId(passId);
			}
			if (hardType > battleVixens.getTempHardType()) {
				battleVixens.setTodayHardType(hardType);// 今日最高难度
			}
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_4, 1, 0);
			BattleVixensSender.sendCmd_1284(hid, 0);
			BattleVixensSender.sendCmd_1286(hid, passId, result);
			LogTool.info(hid, hero.getName(), "BattleVixensManager challenge hardType=" + hardType, BattleVixensManager.class);
		} catch (Exception e) {
			LogTool.error(e, BattleVixensManager.class, hero.getId(), hero.getName(), "BattleVixens challenge fail");
		}
	}

	/**
	 * 请求下一波
	 * 
	 * @param hero
	 * @param endResult
	 */
	public void oneFightEnd(Hero hero, int endResult) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			BattleVixens battleVixens = hero.getBattleVixens();
			if (battleVixens == null) {
				// 系统未开启
				return;
			}
			int tempHardType = battleVixens.getTempHardType();
			if (tempHardType == 0) {
				// 非法操作
				return;
			}
			int tempPassId = battleVixens.getTempPassId();
			long tempHp = battleVixens.getTempHp();
			List<Struct_yiqi_007> list = BattleVixensCache.getHardTypeMap().get(tempHardType);
			int size = list.size();
			int index = tempPassId % 1000 - 1;
			Struct_yiqi_007 struct_yiqi_007 = list.get(index);
			int[][] dispose = struct_yiqi_007.getDispose();
			int npcid = BattleFunction.getMaxNpcid(dispose, 0);
			int npcNum = dispose[0][1];
			// List<Long> hpList = new ArrayList<>();
			// hpList.add(tempHp);
			int result = BattleFunction.checkWinByFight(hero, npcid, BattleVixensConst.SysId);
			if (result == 2) {
				result = endResult;
			}
			if (endResult == 2 || endResult == 0) {
				result = 0;
			}
			if (result == 0) {
				int truePassId = tempPassId - 1;
				if (truePassId > 0) {
					getAllAward(hero, truePassId);// 失败结算
				}
				battleVixens.setTempHardType(0);
				BattleVixensSender.sendCmd_1286(hid, struct_yiqi_007.getIndex(), 4);
				return;
			}
			//设置最高通关id
			Map<Integer, Integer> topPassMap = battleVixens.getTopPassMap();
			int maxPassId = battleVixens.getMaxPassId();
			if(tempPassId>maxPassId) {				
				battleVixens.setMaxPassId(tempPassId);
				topPassMap.put(tempHardType, tempPassId);
			}
			if (tempPassId > battleVixens.getTodayMaxPassId()) {
				battleVixens.setTodayMaxPassId(tempPassId);
			}
			battleVixens.setStrength(hero.getTotalStrength());
			BattleVixensFunction.getIns().refresh(hero, battleVixens.getTempHardType(), tempPassId);
			Map<Integer, int[]> passMap = battleVixens.getPassMap();
			int[] info = passMap.get(tempHardType);
			if(tempPassId>info[0]) {				
				info[0] = tempPassId;
			}
			if (index == size - 1) {
				// 当前难度最后一关 结算
				BattleVixensSender.sendCmd_1286(hid, struct_yiqi_007.getIndex(), 3);
				//结算处理
				getAllAward(hero, tempPassId);
				ActGiftFunction.getIns().Handle(hero, 1);
				battleVixens.setTempHardType(0);
				int nextHardType =  tempHardType+1;
				int topType = battleVixens.getHardType();
				if (nextHardType > topType && BattleVixensCache.getHardTypeMap().containsKey(nextHardType)) {
					battleVixens.setHardType(nextHardType);
				}
				// 通关广播
				ChatManager.getIns().broadCast(ChatConst.BATTLEVIXENS_PASS,
						new Object[] { hero.getNameZoneid(), tempHardType });
				return;
			}
			int nextIndex = index + 1;
			int boss = struct_yiqi_007.getBoss();
			int currentTime = TimeDateUtil.getCurrentTime();
			if (boss == 1) {
				// Long costTime = hpList.get(1);
				int costTime = currentTime - battleVixens.getSynTime();
				battleVixens.setSynTime(TimeDateUtil.getCurrentTime());
				int limitTime = Config_xtcs_004.getIns().get(BattleVixensConst.JUMP_NEED).getNum();
				if (costTime <= limitTime) {
					nextIndex = index + 5;
					//跳关处理
					Struct_yiqi_007 jumpPass = list.get(index+4);
					int jumpPassId = jumpPass.getIndex();
					if (jumpPassId > battleVixens.getMaxPassId()) {
						battleVixens.setMaxPassId(jumpPassId);
						topPassMap.put(tempHardType, jumpPassId);
					}
					if (jumpPassId > battleVixens.getTodayMaxPassId()) {
						battleVixens.setTodayMaxPassId(jumpPassId);
					}
					if (jumpPassId > info[0]) {
						info[0] = jumpPassId;
					}
					battleVixens.setStrength(hero.getTotalStrength());
					BattleVixensFunction.getIns().refresh(hero, battleVixens.getTempHardType(), jumpPassId);
				}
			}
			battleVixens.setSynTime(currentTime);
			struct_yiqi_007 = list.get(nextIndex);
			dispose = struct_yiqi_007.getDispose();
			npcid = BattleFunction.getMaxNpcid(dispose, 0);
			npcNum = dispose[0][1];
			// tempHp = hpList.get(0);
			// List<Long> checkHpList = new ArrayList<>();
			// checkHpList.add(tempHp);
			// checkWin = BattleFunction.checkWinHeroCanDead(hero, npcid, npcNum,
			// BattleConst.OTHER, true, checkHpList, true);
			// int result = 0;
			// if (checkWin) {
			// result = 1;
			// }
			result = BattleFunction.checkWinByFight(hero, npcid, BattleVixensConst.SysId);
			int passId = struct_yiqi_007.getIndex();
			battleVixens.setTempPassId(passId);
			battleVixens.setTempHp(tempHp);// 新血量
			BattleVixensSender.sendCmd_1286(hid, passId, result);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE16);
		} catch (Exception e) {
			LogTool.error(e, BattleVixensManager.class, hero.getId(), hero.getName(), "BattleVixens oneFightEnd fail");
		}
	}

	/**
	 * 获取所有通关奖励
	 */
	private void getAllAward(Hero hero, int tempPassId) {
		Struct_yiqi_007 struct_yiqi_007 = Config_yiqi_007.getIns().get(tempPassId);
		if (struct_yiqi_007 == null) {
			return;
		}
		int[][] pile = struct_yiqi_007.getPile();
		if(pile!=null) {			
			UseAddUtil.add(hero, pile, SourceGoodConst.BATTLE_VIXENS_PASS, null, true);
		}
	}

	/**
	 * 购买挑战次数
	 * 
	 * @param hero
	 */
	public void buyCha(Hero hero,int num) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			BattleVixens battleVixens = hero.getBattleVixens();
			if (battleVixens == null) {
				// 系统未开启
				return;
			}
			int buyNum = battleVixens.getBuyNum();
			buyNum+=num;
			Struct_xtcs_004 struct1 = Config_xtcs_004.getIns().get(BattleVixensConst.CAN_BUY);
			int canBuyNum = struct1.getNum();
			if (buyNum > canBuyNum) {
				// 已达当天购买上限
				BattleVixensSender.sendCmd_1288(hid, 0, 1, 0);
				return;
			}
			Struct_xtcs_004 struct2 = Config_xtcs_004.getIns().get(BattleVixensConst.BUY_COST);
			int cost = struct2.getNum()*num;
			if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, cost)) {
				// 元宝不足
				BattleVixensSender.sendCmd_1288(hid, 0, 2, 0);
				return;
			}
			UseAddUtil.use(hero, GameConst.YUANBAO, cost, SourceGoodConst.BATTLE_VIXENS_BUY, true);
//			buyNum += 1;
			battleVixens.setBuyNum(buyNum);
			int addNum = battleVixens.getAddNum();
			int freeCha = battleVixens.getFreeCha();
			int leftCha = freeCha + addNum + buyNum - battleVixens.getChallengeNum();
			BattleVixensSender.sendCmd_1288(hid, 1, leftCha, buyNum);
			LogTool.info(hid, hero.getName(), "BattleVixensManager buyNum=" + buyNum, BattleVixensManager.class);
		} catch (Exception e) {
			LogTool.error(e, BattleVixensManager.class, hero.getId(), hero.getName(), "BattleVixens buyCha fail");
		}
	}

	/**
	 * 领取首通奖励
	 * 
	 * @param hero
	 */
	public void getAward(Hero hero, int hardType) {
		if (hero == null) {
			return;
		}
		try {
			BattleVixens battleVixens = hero.getBattleVixens();
			if (battleVixens == null) {
				// 系统未开启
				return;
			}
			long hid = hero.getId();
			int maxPassId = battleVixens.getMaxPassId();
			int[] info = battleVixens.getPassMap().get(hardType);
			int oldAwardId = info[1];
			int getAwardId = 0;
			List<Struct_yiqi_007> awardList = BattleVixensCache.getAwardList(hardType);
			Struct_yiqi_007 struct_yiqi_007 = null;
			if (oldAwardId == 0) {
				struct_yiqi_007 = awardList.get(0);
			} else {
				int size = awardList.size();
				for (int i = 0; i < size; i++) {
					if (oldAwardId == awardList.get(i).getIndex()) {
						struct_yiqi_007 = awardList.get(i + 1);
						break;
					}
				}
			}
			getAwardId = struct_yiqi_007.getIndex();
			if (getAwardId > maxPassId) {
				// 未通关不能领取
				BattleVixensSender.sendCmd_1290(hid, 0, 1);
				return;
			}
			int[][] award = struct_yiqi_007.getAward();
			UseAddUtil.add(hero, award, SourceGoodConst.BATTLE_VIXENS_FIRST, null, true);
			info[1] = getAwardId;
			BattleVixensSender.sendCmd_1290(hid, 1, getAwardId);
			LogTool.info(hid, hero.getName(), "BattleVixensManager getAwardId=" + getAwardId, BattleVixensManager.class);
			// 首通奖励广播
			ChatManager.getIns().broadCast(ChatConst.BATTLEVIXENS_AWARD,
					new Object[] { hero.getNameZoneid(), getAwardId });
		} catch (Exception e) {
			LogTool.error(e, BattleVixensManager.class, hero.getId(), hero.getName(), "BattleVixens getAward fail");
		}
	}

	/**
	 * 排行榜
	 * 
	 * @param hero
	 */
	public void openRanking(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			BattleVixens battleVixens = hero.getBattleVixens();
			if (battleVixens == null) {
				// 系统未开启
				return;
			}
			List<BattleVixensRank> rankList = BattleVixensCache.getRankList();
			int size = rankList.size();
			if(size>BattleVixensConst.RANKING_LIMIT) {
				size = BattleVixensConst.RANKING_LIMIT;
			}
			Object[] sendList = new Object[size];
			BattleVixensRank rank = null;
			for(int i=0;i<size;i++) {
				rank = rankList.get(i);
				sendList[i] = new Object[] {i+1, rank.getName(), rank.getHardType(), rank.getMaxPassId(), rank.getStrength()};
			}
			BattleVixensSender.sendCmd_1292(hero.getId(), sendList);
		} catch (Exception e) {
			LogTool.error(e, BattleVixensManager.class, hero.getId(), hero.getName(), "BattleVixens openRanking fail");
		}
	}

}
