package com.teamtop.system.battleVixens;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.system.battleVixens.model.BattleVixens;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_yiqi_007;

public class BattleVixensSysEvent extends AbsSystemEvent {

	private static BattleVixensSysEvent battleVixensSysEvent;

	private BattleVixensSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleVixensSysEvent getIns() {
		if (battleVixensSysEvent == null) {
			battleVixensSysEvent = new BattleVixensSysEvent();
		}
		return battleVixensSysEvent;
	}

	@Override
	public void init(Hero hero) {
		BattleVixens battleVixens = hero.getBattleVixens();
		if (battleVixens == null) {
			Map<Integer, int[]> passMap = new HashMap<Integer, int[]>();
			battleVixens = new BattleVixens();
			battleVixens.setHardType(1);// 初始化难度
			hero.setBattleVixens(battleVixens);
			battleVixens.setPassMap(passMap);
			battleVixens.setFreeCha(BattleVixensConst.DAILY_CHA);
			Map<Integer, Integer> topPassMap = new HashMap<>();
			battleVixens.setTopPassMap(topPassMap);
			Set<Integer> keySet = BattleVixensCache.getHardTypeMap().keySet();
			for (int hardType : keySet) {
				passMap.put(hardType, new int[] { 0, 0, 0 });
			}
		} else {
			Map<Integer, Integer> topPassMap = battleVixens.getTopPassMap();
			if (topPassMap == null) {
				topPassMap = new HashMap<>();
				battleVixens.setTopPassMap(topPassMap);
			}
			int maxPassId = battleVixens.getMaxPassId();
			int size = topPassMap.size();
			if (maxPassId > 0 && size == 0) {
				int hardType = battleVixens.getHardType();
				Map<Integer, List<Struct_yiqi_007>> hardTypeMap = BattleVixensCache.getHardTypeMap();
				Iterator<Entry<Integer, List<Struct_yiqi_007>>> iterator = hardTypeMap.entrySet().iterator();
				Entry<Integer, List<Struct_yiqi_007>> entry = null;
				int tempHardType = 0;
				List<Struct_yiqi_007> list = null;
				for (; iterator.hasNext();) {
					entry = iterator.next();
					tempHardType = entry.getKey();
					list = entry.getValue();
					if (hardType > tempHardType) {
						int index = list.get(list.size() - 1).getIndex();
						topPassMap.put(tempHardType, index);
					} else if (hardType == tempHardType) {
						topPassMap.put(tempHardType, maxPassId);
					}
				}
			}
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, BattleVixensConst.SysId)) {
			return;
		}
		BattleVixens battleVixens = hero.getBattleVixens();
		if (battleVixens == null) {
			return;
		}
		int challengeNum = battleVixens.getChallengeNum();
		int buyNum = battleVixens.getBuyNum();
		int addNum = battleVixens.getAddNum();
		int freeCha = battleVixens.getFreeCha();
		int leftCha = freeCha + addNum + buyNum - challengeNum;
		if (leftCha > 0) {
			RedPointFunction.getIns().addLoginRedPoint(hero, BattleVixensConst.SysId, 1, RedPointConst.HAS_RED);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		BattleVixens battleVixens = hero.getBattleVixens();
		if (battleVixens == null) {
			return;
		}
		int challengeNum = battleVixens.getChallengeNum();
		int buyNum = battleVixens.getBuyNum();
		int addNum = battleVixens.getAddNum();
		int freeCha = battleVixens.getFreeCha();
		int leftCha = freeCha + addNum + buyNum - challengeNum;
		if (leftCha > 0) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, BattleVixensConst.SysId, 1, RedPointConst.HAS_RED);
		}

	}

	@Override
	public void zeroPub(int now) {
		BattleVixensCache.getRankList().clear();
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero);
	}

	@Override
	public void logout(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, BattleVixensConst.SysId)) {
			return;
		}
		BattleVixens battleVixens = hero.getBattleVixens();
		if (battleVixens == null) {
			return;
		}
		if (battleVixens.getTempHardType() > 0) {
			BattleVixensManager.getIns().oneFightEnd(hero, 2);
		}
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero);
	}

	private void dailyReset(Hero hero) {
		BattleVixens battleVixens = hero.getBattleVixens();
		if (battleVixens == null) {
			return;
		}
		//奖励找回处理(重置前)
		RewardBackFunction.getIns().handle(hero,BattleVixensConst.SysId,0);
		int challengeNum = battleVixens.getChallengeNum();
		int buyNum = battleVixens.getBuyNum();
		int addNum = battleVixens.getAddNum();
		int freeCha = battleVixens.getFreeCha();
		int leftCha = freeCha + addNum + buyNum - challengeNum;
		if (leftCha < 0) {
			leftCha = 0;
		}
		if (leftCha > 0) {
			battleVixens.setFreeCha(0);
		} else {
			battleVixens.setFreeCha(BattleVixensConst.DAILY_CHA);
		}
		battleVixens.setAddNum(leftCha);
		battleVixens.setBuyNum(0);
		battleVixens.setChallengeNum(0);
		battleVixens.setTodayHardType(0);
		battleVixens.setTodayMaxPassId(0);
		battleVixens.setResetTime(TimeDateUtil.getTodayZeroTimeReturnInt());
		Map<Integer, int[]> passMap = battleVixens.getPassMap();
		for (int[] info : passMap.values()) {
			info[0] = 0;
		}
		//奖励找回处理(重置后)
		RewardBackFunction.getIns().handle(hero,BattleVixensConst.SysId,1);
		BattleVixensManager.getIns().openBattleVixens(hero);
	}
}
