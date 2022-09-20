package com.teamtop.system.activity.ativitys.consumeTurnTableAct;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.consumeTurnTableAct.model.ConsumeTurnTableAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xhdxfzpxf_316;
import excel.struct.Struct_xhdxfzpxf_316;

public class ConsumeTurnTableActManager extends AbstractActivityManager {
	private static ConsumeTurnTableActManager ins;

	private ConsumeTurnTableActManager() {
		// TODO Auto-generated constructor stub
	}

	public static ConsumeTurnTableActManager getIns() {
		if (ins == null) {
			ins = new ConsumeTurnTableActManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUME_TURNTABLE)) {
			return;
		}
		ConsumeTurnTableAct consumeTurnTableAct = (ConsumeTurnTableAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_CONSUME_TURNTABLE);
		int periods = consumeTurnTableAct.getPeriods();
		List<Struct_xhdxfzpxf_316> list = ConsumeTurnTableActCache.getConsumeturnConfigMap().get(periods);
		int size = list.size();
		List<Object[]> turntableList = new ArrayList<>();
		Set<Integer> turnedAwardSet = consumeTurnTableAct.getTurnedAwardSet();
		for (int i = 0; i < size; i++) {
			Struct_xhdxfzpxf_316 struct_xhdxfzpxf_316 = list.get(i);
			int[][] show = struct_xhdxfzpxf_316.getShow();
			Byte flag = 0;
			if (turnedAwardSet.contains(show[0][1])) {
				flag = 1;
			}
			turntableList.add(new Object[] { struct_xhdxfzpxf_316.getId(), flag });
		}
		int totalRecharge = consumeTurnTableAct.getTotalRecharge();
		int turnedTimes = consumeTurnTableAct.getTurnedTimes();
		int nowId = consumeTurnTableAct.getNowId();
		ConsumeTurnTableActSender.sendCmd_8570(hero.getId(), totalRecharge, nowId, turnedTimes,
				turntableList.toArray());
	}

	/**
	 * 抽奖
	 * 
	 * @param hero
	 */
	public void turn(Hero hero) {
		// TODO Auto-generated method stub
		int nowId = 0;
		int turnedTimes = 0;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUME_TURNTABLE)) {
				return;
			}
			ConsumeTurnTableAct consumeTurnTableAct = (ConsumeTurnTableAct) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.ACT_CONSUME_TURNTABLE);
			nowId = consumeTurnTableAct.getNowId();
			int times = 0;
			if (nowId != 0) {
				Struct_xhdxfzpxf_316 struct_xhdxfzpxf_316 = Config_xhdxfzpxf_316.getIns().get(nowId);
				times = struct_xhdxfzpxf_316.getTimes();
			}
			turnedTimes = consumeTurnTableAct.getTurnedTimes();
			if (turnedTimes >= times) {
				ConsumeTurnTableActSender.sendCmd_8572(hero.getId(), 2, 0);
				return;
			}
			turnedTimes++;
			Map<Integer, Map<Integer, List<ProbabilityEventModel>>> awardProEventConfigMap = ConsumeTurnTableActCache
					.getAwardProEventConfigMap();
			Map<Integer, List<ProbabilityEventModel>> awardProEventMap = awardProEventConfigMap
					.get(consumeTurnTableAct.getPeriods());
			List<ProbabilityEventModel> list = awardProEventMap.get(turnedTimes);
			int[] award = null;
			int loopTimes = 0;
			while (loopTimes < 100) {
				// 限制100次以内抽取，如果还没抽到只能到下一步手动取得奖励
				int[] turnAward = (int[]) ProbabilityEventUtil.getEventByProbability(list.get(0));// 抽奖
				if (turnAward != null) {
					int id = turnAward[1];
					Set<Integer> turnedAwardSet = consumeTurnTableAct.getTurnedAwardSet();
					if (!turnedAwardSet.contains(id)) {
						turnedAwardSet.add(id);
						award = turnAward;
						break;
					}
				}
				loopTimes++;
			}
			if (loopTimes >= 100) {
				// 抽了100次还没抽到不重复的奖励
				ProbabilityEventModel pm = list.get(0);
				List<Object> events = pm.getEvents();
				int size = events.size();
				for (int i = 0; i < size; i++) {
					int[] turnAward = (int[]) events.get(i);
					if (turnAward != null) {
						int id = turnAward[1];
						Set<Integer> turnedAwardSet = consumeTurnTableAct.getTurnedAwardSet();
						if (!turnedAwardSet.contains(id)) {
							turnedAwardSet.add(id);
							award = turnAward;
							break;
						}
					}
				}
			}
			if (award == null) {
				LogTool.error(new Exception(), this, hero.getId(), hero.getNameZoneid(),
						"ConsumeTurnTableActManager turn award=null loopTimes:" + loopTimes + " nowId:" + nowId
								+ " turnedTimes" + turnedTimes);
				return;
			}
			consumeTurnTableAct.setTurnedTimes(turnedTimes);
			int[][] reward = new int[][] { award };
			UseAddUtil.add(hero, reward, SourceGoodConst.ACT_CONSUME_TURNTABLE_AWARD, UseAddUtil.getDefaultMail(),
					false); // 发放抽取的奖励
			Integer id = ConsumeTurnTableActCache.getToolIdConfigMap().get(consumeTurnTableAct.getPeriods())
					.get(award[1]);
			if (id == null) {
				id = 0;
			}
			ConsumeTurnTableActSender.sendCmd_8572(hero.getId(), 1, id);
			if (award[4] == 1) {
				// 广播
				ChatManager.getIns().broadCast(ChatConst.ACT_CONSUME_TURNTABLE_BIG_AWARD,
						new Object[] { hero.getName(), award[1], award[2] }); // 全服广播
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(),
					"ConsumeTurnTableActManager turn" + " nowId:" + nowId + " turnedTimes" + turnedTimes);
		}
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
		// TODO Auto-generated method stub

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		ConsumeTurnTableAct consumeTurnTableAct = new ConsumeTurnTableAct(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		consumeTurnTableAct.setTurnedAwardSet(new HashSet<>());
		return consumeTurnTableAct;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return ConsumeTurnTableAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ConsumeTurnTableActEvent.getIns();
	}

}
