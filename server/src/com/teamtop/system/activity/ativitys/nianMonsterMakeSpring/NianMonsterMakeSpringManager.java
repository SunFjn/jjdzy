package com.teamtop.system.activity.ativitys.nianMonsterMakeSpring;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.nianMonsterMakeSpring.model.NianMonsterMakeSpringModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_nian_299;
import excel.config.Config_nianpoint_299;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_nian_299;
import excel.struct.Struct_nianpoint_299;

public class NianMonsterMakeSpringManager extends AbstractActivityManager {

	private static NianMonsterMakeSpringManager ins;

	private NianMonsterMakeSpringManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized NianMonsterMakeSpringManager getIns() {
		if (ins == null) {
			ins = new NianMonsterMakeSpringManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// 活动结束补发奖励
		NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData()
				.getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
		if (actData == null) {
			return;
		}
		long hid = hero.getId();
		int score = actData.getScore();
		// 目标奖励
		int gMailId = MailConst.NIAN_MONSTER_ACT_GOAL_REWARD;
		HashSet<Integer> goalRewardSet = actData.getGoalRewardSet();
		List<Struct_nianpoint_299> sortList = Config_nianpoint_299.getIns().getSortList();
		int size = sortList.size();
		Struct_nianpoint_299 nianpoint_299 = null;
		for (int i = 0; i < size; i++) {
			nianpoint_299 = sortList.get(i);
			if (score >= nianpoint_299.getPoint() && (!goalRewardSet.contains(nianpoint_299.getId()))) {
				int[][] reward = nianpoint_299.getReward();
				MailFunction.getIns().sendMailWithFujianData2(hid, gMailId, new Object[] { gMailId }, reward);
			}
		}
		// 奖池奖励
		int pMailId = MailConst.NIAN_MONSTER_ACT_POOL_REWARD;
		int currentTime = TimeDateUtil.getCurrentTime();
		ArrayList<int[]> rewardPoolList = actData.getRewardPoolList();
		size = rewardPoolList.size();
		int[] info = null;
		for (int i = 0; i < size; i++) {
			info = rewardPoolList.get(i);
			if (currentTime > info[1]) {
				Struct_nian_299 nian_299 = Config_nian_299.getIns().get(info[0]);
				MailFunction.getIns().sendMailWithFujianData2(hid, pMailId, new Object[] { pMailId },
						nian_299.getReward());
			}
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		NianMonsterMakeSpringModel actData = new NianMonsterMakeSpringModel(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		int maxNum = Config_xtcs_004.getIns().get(NianMonsterMakeSpringConst.MAX_BOOM).getNum();
		actData.setBoomNum(maxNum);
		return actData;
	}

	@Override
	public Class<?> getActivityData() {
		return NianMonsterMakeSpringModel.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return NianMonsterMakeSpringSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
				return;
			}
			NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData()
					.getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
			checkBoomNum(hero);
			int monsterId = actData.getMonsterId();
			int leftHp = actData.getMonsterHp();
			int kingState = actData.getKingState();
			int score = actData.getScore();
			int boomNum = actData.getBoomNum();
			int maxNum = Config_xtcs_004.getIns().get(NianMonsterMakeSpringConst.MAX_BOOM).getNum();
			int boomLeftTime = 0;
			int currentTime = TimeDateUtil.getCurrentTime();
			if (boomNum >= maxNum) {
				boomLeftTime = 0;
			} else {
				int lastAddTime = actData.getLastAddTime();
				int gap = Config_xtcs_004.getIns().get(NianMonsterMakeSpringConst.TIME_GAP).getNum();
				int passTime = currentTime - lastAddTime;
				boomLeftTime = gap - passTime;
				if (boomLeftTime < 0) {
					boomLeftTime = 0;
				}
			}
			ArrayList<int[]> rewardPoolList = actData.getRewardPoolList();
			int size = rewardPoolList.size();
			List<Object[]> poolData = new ArrayList<>();
			int[] info = null;
			int leftTime = 0;
			for (int i = 0; i < size; i++) {
				info = rewardPoolList.get(i);
				leftTime = info[1] - currentTime;
				if (leftTime < 0) {
					leftTime = 0;
				}
				poolData.add(new Object[] { info[0], leftTime });
			}
			HashSet<Integer> goalRewardSet = actData.getGoalRewardSet();
			Iterator<Integer> iterator = goalRewardSet.iterator();
			List<Object[]> goalData = new ArrayList<>();
			int id = 0;
			for (; iterator.hasNext();) {
				id = iterator.next();
				goalData.add(new Object[] { id });
			}
			NianMonsterMakeSpringSender.sendCmd_11550(hid, monsterId, leftHp, kingState, boomNum, boomLeftTime, score,
					poolData.toArray(), goalData.toArray());
		} catch (Exception e) {
			LogTool.error(e, NianMonsterMakeSpringManager.class, hid, hero.getName(),
					"NianMonsterMakeSpringManager openUI");
		}
	}

	/**
	 * 检测鞭炮恢复
	 */
	public void checkBoomNum(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
				return;
			}
			NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData()
					.getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
			if (actData == null) {
				return;
			}
			int boomNum = actData.getBoomNum();
			int maxNum = Config_xtcs_004.getIns().get(NianMonsterMakeSpringConst.MAX_BOOM).getNum();
			int gap = Config_xtcs_004.getIns().get(NianMonsterMakeSpringConst.TIME_GAP).getNum();
			int lastAddTime = actData.getLastAddTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			if (lastAddTime == 0) {
				lastAddTime = currentTime;
				actData.setLastAddTime(lastAddTime);
			}
			if (boomNum < maxNum) {
				if (lastAddTime > 0) {
					int passTime = currentTime - lastAddTime;
					int addNum = passTime / gap;
					if (addNum == 0) {
						return;
					}
					int maxAdd = maxNum - boomNum;
					if (addNum > maxAdd) {
						addNum = maxAdd;
					}
					actData.changeBoomNum(addNum);
					lastAddTime = lastAddTime + gap * addNum;
					if (addNum == maxAdd) {
						lastAddTime = currentTime;
					}
				}
				actData.setLastAddTime(lastAddTime);
			}
		} catch (Exception e) {
			LogTool.error(e, NianMonsterMakeSpringManager.class, hid, hero.getName(),
					"NianMonsterMakeSpringManager checkBoomNum");
		}
	}

	/**
	 * 刷新召唤年兽
	 */
	public void summonMonster(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
				return;
			}
			NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData()
					.getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
			int monsterId = actData.getMonsterId();
			int monsterHp = actData.getMonsterHp();
			if (monsterId > 0 && monsterHp > 0) {
				// 年兽还没击退不能刷新
				NianMonsterMakeSpringSender.sendCmd_11552(hid, 0, 1, 0);
				return;
			}
			int size = actData.getRewardPoolList().size();
			if (size == NianMonsterMakeSpringConst.POOL_SIZE) {
				// 奖池满
				NianMonsterMakeSpringSender.sendCmd_11552(hid, 0, 2, 0);
				return;
			}
			int refreshTimes = actData.getRefreshTimes();
			int newMonsterId = NianMonsterMakeSpringCache.getMonsterId();
			if (refreshTimes == NianMonsterMakeSpringConst.REFRESH_TIMES) {
				newMonsterId = NianMonsterMakeSpringConst.ORANGE_MONSTER;
				actData.setRefreshTimes(0);
			}
			if (newMonsterId != NianMonsterMakeSpringConst.ORANGE_MONSTER) {
				actData.setRefreshTimes(actData.getRefreshTimes() + 1);
			}
			int hp = Config_nian_299.getIns().get(newMonsterId).getHp();
			actData.setMonsterId(newMonsterId);
			actData.setMonsterHp(hp);
			NianMonsterMakeSpringSender.sendCmd_11552(hid, 1, newMonsterId, hp);
			NianMonsterMakeSpringFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, NianMonsterMakeSpringManager.class, hid, hero.getName(),
					"NianMonsterMakeSpringManager summonMonster");
		}
	}

	/**
	 * 召唤年兽王
	 * @param hero
	 */
	public void summonMonsterKing(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
				return;
			}
			int hour = TimeDateUtil.getHour();
			int[] hours = NianMonsterMakeSpringConst.KING_HOURS;
			if (hour < hours[0] || hour >= hours[1]) {
				// 不在时段内
				NianMonsterMakeSpringSender.sendCmd_11554(hid, 0, 4, 0);
				return;
			}
			NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData()
					.getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
			int monsterId = actData.getMonsterId();
			int monsterHp = actData.getMonsterHp();
			if (monsterId > 0 && monsterHp > 0) {
				// 年兽王还没击退不能刷新
				NianMonsterMakeSpringSender.sendCmd_11554(hid, 0, 1, 0);
				return;
			}
			int size = actData.getRewardPoolList().size();
			if (size == NianMonsterMakeSpringConst.POOL_SIZE) {
				// 奖池满
				NianMonsterMakeSpringSender.sendCmd_11554(hid, 0, 2, 0);
				return;
			}
			int kingState = actData.getKingState();
			if (kingState != 0) {
				// 已召唤过
				NianMonsterMakeSpringSender.sendCmd_11554(hid, 0, 3, 0);
				return;
			}
			actData.setKingSummonTime(TimeDateUtil.getTodayZeroTimeReturnInt());
			actData.setKingState(1);
			int hp = Config_nian_299.getIns().get(NianMonsterMakeSpringConst.KING_MONSTER).getHp();
			actData.setMonsterId(NianMonsterMakeSpringConst.KING_MONSTER);
			actData.setMonsterHp(hp);
			NianMonsterMakeSpringSender.sendCmd_11554(hid, 1, NianMonsterMakeSpringConst.KING_MONSTER, hp);
			NianMonsterMakeSpringFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, NianMonsterMakeSpringManager.class, hid, hero.getName(),
					"NianMonsterMakeSpringManager summonMonsterKing");
		}
	}

	/**
	 * 攻击年兽
	 * @param hero
	 */
	public void attactMonster(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
				return;
			}
			NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData()
					.getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
			int monsterId = actData.getMonsterId();
			List<Object[]> poolData = new ArrayList<>();
			if (monsterId == 0) {
				NianMonsterMakeSpringSender.sendCmd_11556(hid, 0, 1, 0, 0, 0, actData.getScore(), 0,
						poolData.toArray());
				return;
			}
			int monsterHp = actData.getMonsterHp();
			if (monsterHp <= 0) {
				// 已击退
				NianMonsterMakeSpringSender.sendCmd_11556(hid, 0, 2, 0, 0, 0, actData.getScore(), 0,
						poolData.toArray());
				return;
			}
			checkBoomNum(hero);
			int boomNum = actData.getBoomNum();
			if (boomNum <= 0) {
				// 鞭炮不足
				NianMonsterMakeSpringSender.sendCmd_11556(hid, 0, 3, 0, 0, 0, actData.getScore(), 0,
						poolData.toArray());
				return;
			}
			// 扣除鞭炮
			int newBoomNum = actData.changeBoomNum(-1);
			int hurtHp = NianMonsterMakeSpringCache.getHurtHp();
			int leftHp = monsterHp - hurtHp;
			if (leftHp < 0) {
				leftHp = 0;
			}
			actData.setMonsterHp(leftHp);
			if (leftHp == 0) {
				// 击退发奖励到奖励池
				Struct_nian_299 nian_299 = Config_nian_299.getIns().get(monsterId);
				ArrayList<int[]> rewardPoolList = actData.getRewardPoolList();
				int[] info = new int[] { monsterId, TimeDateUtil.getCurrentTime() + nian_299.getTime() };
				rewardPoolList.add(info);
				// 加积分
				int point = nian_299.getPoint();
				actData.setScore(actData.getScore() + point);
				if (monsterId == NianMonsterMakeSpringConst.KING_MONSTER) {
					int kingSummonTime = actData.getKingSummonTime();
					int todayZeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
					if (kingSummonTime == todayZeroTime) {
						actData.setKingState(2);
					}
				}
			}
			ArrayList<int[]> rewardPoolList = actData.getRewardPoolList();
			int size = rewardPoolList.size();
			int[] info = null;
			int leftTime = 0;
			int currentTime = TimeDateUtil.getCurrentTime();
			for (int i = 0; i < size; i++) {
				info = rewardPoolList.get(i);
				leftTime = info[1] - currentTime;
				if (leftTime < 0) {
					leftTime = 0;
				}
				poolData.add(new Object[] { info[0], leftTime });
			}
			int maxNum = Config_xtcs_004.getIns().get(NianMonsterMakeSpringConst.MAX_BOOM).getNum();
			int boomLeftTime = 0;
			if (newBoomNum >= maxNum) {
				boomLeftTime = 0;
			} else {
				if(boomNum == maxNum) {					
					actData.setLastAddTime(currentTime);
				}
				int lastAddTime = actData.getLastAddTime();
				int gap = Config_xtcs_004.getIns().get(NianMonsterMakeSpringConst.TIME_GAP).getNum();
				int passTime = currentTime - lastAddTime;
				boomLeftTime = gap - passTime;
				if (boomLeftTime < 0) {
					boomLeftTime = 0;
				}
			}
			NianMonsterMakeSpringSender.sendCmd_11556(hid, 1, monsterId, leftHp, newBoomNum, boomLeftTime,
					actData.getScore(), actData.getKingState(), poolData.toArray());
			NianMonsterMakeSpringFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, NianMonsterMakeSpringManager.class, hid, hero.getName(),
					"NianMonsterMakeSpringManager attactMonster");
		}
	}

	/**
	 * 领取目标奖励
	 * @param hero
	 * @param id
	 */
	public void getGoalReward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
				return;
			}
			NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
			HashSet<Integer> goalRewardSet = actData.getGoalRewardSet();
			if (goalRewardSet.contains(id)) {
				//已领取
				NianMonsterMakeSpringSender.sendCmd_11558(hid, 0, 1);
				return;
			}
			int score = actData.getScore();
			Struct_nianpoint_299 nianpoint_299 = Config_nianpoint_299.getIns().get(id);
			int point = nianpoint_299.getPoint();
			if (score < point) {
				// 积分未达目标
				NianMonsterMakeSpringSender.sendCmd_11558(hid, 0, 2);
				return;
			}
			goalRewardSet.add(id);
			int[][] reward = nianpoint_299.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.NIAM_MONSTER_GOAL_REWARD, UseAddUtil.getDefaultMail(), true);
			NianMonsterMakeSpringSender.sendCmd_11558(hid, 1, id);
			NianMonsterMakeSpringFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, NianMonsterMakeSpringManager.class, hid, hero.getName(),
					"NianMonsterMakeSpringManager getGoalReward");
		}
	}

	/**
	 * 领取奖池奖励
	 * @param hero
	 * @param index
	 * @param type 0:不使用元宝开启，1：使用元宝开启
	 */
	public void getReward(Hero hero, int index, int type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
				return;
			}
			NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
			ArrayList<int[]> rewardPoolList = actData.getRewardPoolList();
			int size = rewardPoolList.size();
			List<Object[]> poolData = new ArrayList<>();
			if (size == 0) {
				NianMonsterMakeSpringSender.sendCmd_11560(hid, 2, poolData.toArray());
				return;
			}
			int tempIndex = index - 1;
			int maxIndex = size - 1;
			if (tempIndex > maxIndex) {
				// 奖励不存在
				NianMonsterMakeSpringSender.sendCmd_11560(hid, 2, poolData.toArray());
				return;
			}
			int[] info = rewardPoolList.get(tempIndex);
			int monsterId = info[0];
			int endTime = info[1];
			int currentTime = TimeDateUtil.getCurrentTime();
			Struct_nian_299 nian_299 = Config_nian_299.getIns().get(monsterId);
			if (currentTime < endTime) {
				if (type == 1) {
					int[][] consume = nian_299.getConsume();
					if (!UseAddUtil.canUse(hero, consume)) {
						// 元宝不足
						NianMonsterMakeSpringSender.sendCmd_11560(hid, 3, poolData.toArray());
						return;
					}
					UseAddUtil.use(hero, consume, SourceGoodConst.NIAM_MONSTER_WIN_REWARD, true);
				} else {
					// 倒计时未结束
					NianMonsterMakeSpringSender.sendCmd_11560(hid, 4, poolData.toArray());
					return;
				}
			}
			rewardPoolList.remove(tempIndex);
			int[][] reward = nian_299.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.NIAM_MONSTER_WIN_REWARD, UseAddUtil.getDefaultMail(), true);
			int newSize = rewardPoolList.size();
			int[] sendInfo = null;
			int leftTime = 0;
			for (int i = 0; i < newSize; i++) {
				sendInfo = rewardPoolList.get(i);
				leftTime = sendInfo[1] - currentTime;
				if (leftTime < 0) {
					leftTime = 0;
				}
				poolData.add(new Object[] { sendInfo[0], leftTime });
			}
			NianMonsterMakeSpringSender.sendCmd_11560(hid, 1, poolData.toArray());
			NianMonsterMakeSpringFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, NianMonsterMakeSpringManager.class, hid, hero.getName(),
					"NianMonsterMakeSpringManager getReward");
		}
	}

}
