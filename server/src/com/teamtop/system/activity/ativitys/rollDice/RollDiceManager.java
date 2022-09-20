package com.teamtop.system.activity.ativitys.rollDice;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.playBalloon.PlayBalloonConst;
import com.teamtop.system.activity.ativitys.playBalloon.PlayBalloonSender;
import com.teamtop.system.activity.ativitys.rollDice.model.RollDice;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_xfyt_763;

public class RollDiceManager extends AbstractActivityManager {
	private static RollDiceManager ins = null;

	public static RollDiceManager getIns() {
		if (ins == null) {
			ins = new RollDiceManager();
		}
		return ins;
	}

	private RollDiceManager() {
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (hero == null)
				return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_ROLLDICE))
				return;
			RollDice rollDice = (RollDice) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_ROLLDICE);// 个人数据
			int qs = rollDice.getPeriods();
			int index = rollDice.getRdIndex();
			int yuanbao = rollDice.getConsume();
			int diceNum = rollDice.getDiceNum();
			if(diceNum == 0) {
				diceNum = 1;
			}
			int totalNum = rollDice.getTotalNum();
			List<Struct_xfyt_763> list = RollDiceCache.rollDiceListConfig.get(qs);
			Struct_xfyt_763 struct_xfyt_763 = list.get(index);
			int id = struct_xfyt_763.getId();
			int num = RollDiceFunction.getIns().getNum(hero);
			RollDiceSender.sendCmd_10020(hero.getId(), id, num, yuanbao, qs, diceNum, totalNum);
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "RollDiceManager.openUI 打开摇骰子界面 异常");
		}
	}

	public void rolldice(Hero hero) {
		try {
			if (hero == null)
				return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_ROLLDICE))
				return;

			int num = RollDiceFunction.getIns().getNum(hero);
			if (num <= 0) {// 没有剩余次数
				RollDiceSender.sendCmd_10022(hero.getId(), RollDiceConst.NOT_HAVE_NUM, 0, 0, 0, 0, 0);
				return;
			}

			RollDice rollDice = (RollDice) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_ROLLDICE);// 个人数据
			int qs = rollDice.getPeriods();
			int index = rollDice.getRdIndex();
			int yuanbao = rollDice.getConsume();

			List<Struct_xfyt_763> list = RollDiceCache.rollDiceListConfig.get(qs);
			Map<Integer, Struct_xfyt_763> map = RollDiceCache.rollDiceConfig.get(qs);

			int diceNum = RandomUtil.getRandomNumInAreas(1, 6);// 随机骰子点数

			List<int[][]> rewardList = new ArrayList<int[][]>();

			int id = 0;
			int newIndex = index;
			for (int i = 0; i < diceNum; i++) {
				Struct_xfyt_763 currStruct_xfyt_763 = list.get(newIndex);
				int nextId = currStruct_xfyt_763.getNext();

				Struct_xfyt_763 nextStruct_xfyt_763 = map.get(nextId);
				
				int[][] reward = nextStruct_xfyt_763.getReward();
				if (reward != null) {
					boolean canAdd = UseAddUtil.canAdd(hero, reward, false);
					if (!canAdd) {// 背包已满
						PlayBalloonSender.sendCmd_10002(hero.getId(), PlayBalloonConst.FULL, index, 0, 0, 0, 0);
						return;
					}
					rewardList.add(reward);
				}

				newIndex = list.indexOf(nextStruct_xfyt_763);
				id = nextStruct_xfyt_763.getId();
			}

			rollDice.setNum(rollDice.getNum() + 1);
			rollDice.setRdIndex(newIndex);
			rollDice.setDiceNum(diceNum);
			rollDice.setTotalNum(rollDice.getTotalNum()+diceNum);
			
			for (int[][] reward : rewardList) {
				UseAddUtil.add(hero, reward, SourceGoodConst.ROLLDICE_ADD, UseAddUtil.getDefaultMail(), true);
				if (reward[0][3] == 1) {
					ChatManager.getIns().broadCast(ChatConst.ROLLDICE, new Object[] { hero.getName(), reward[0][1], reward[0][2] }); // 全服广播
				}
			}

			RollDiceSender.sendCmd_10022(hero.getId(), RollDiceConst.SUCCESS, id, diceNum, num-1, rollDice.getNum(), rollDice.getTotalNum());
			LogTool.info("hid:" + hero.getId() + " RollDiceManager.rolldice 摇骰子活动：  qs:" + qs + " yuanbao:" + yuanbao+ "num:" + rollDice.getNum(), this);// 日志
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "RollDiceManager.openUI 摇骰子 异常");
		}
	}

	@Override
	public void actOpen() {
	}

	@Override
	public void heroActOpen(Hero hero) {
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		RollDice rollDice = new RollDice(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		rollDice.setNum(0);
		rollDice.setConsume(0);
		rollDice.setRdIndex(0);
		rollDice.setDiceNum(1);
		rollDice.setTotalNum(0);
		return rollDice;
	}

	@Override
	public Class<?> getActivityData() {
		return RollDice.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return RollDiceEvent.getIns();
	}
}
