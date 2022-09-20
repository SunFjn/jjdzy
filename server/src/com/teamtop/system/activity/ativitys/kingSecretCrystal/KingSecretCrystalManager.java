package com.teamtop.system.activity.ativitys.kingSecretCrystal;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.kingSecretCrystal.model.KingRewardInfo;
import com.teamtop.system.activity.ativitys.kingSecretCrystal.model.KingSecretCrystalModel;
import com.teamtop.system.activity.ativitys.kingSecretCrystal.model.ProRewardInfo;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zzmb_503;
import excel.config.Config_zzmbxh_503;
import excel.struct.Struct_zzmb_503;
import excel.struct.Struct_zzmbxh_503;

/**
 * 至尊秘宝
 * @author hzp
 *
 */
public class KingSecretCrystalManager extends AbstractActivityManager {

	private static KingSecretCrystalManager ins;

	private KingSecretCrystalManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized KingSecretCrystalManager getIns() {
		if (ins == null) {
			ins = new KingSecretCrystalManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		resetHandle(hero);
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
		KingSecretCrystalModel model = new KingSecretCrystalModel(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		return KingSecretCrystalModel.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return KingSecretCrystalSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			long hid = hero.getId();
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_KING_SECRET_CTRISTAL)) {
				return;
			}
			KingSecretCrystalModel model = (KingSecretCrystalModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_KING_SECRET_CTRISTAL);
			List<Object[]> sendList = new ArrayList<>();
			Map<Integer, KingRewardInfo> rewardMap = model.getRewardMap();
			int size = rewardMap.size();
			for (int i = 1; i <= size; i++) {
				KingRewardInfo kingRewardInfo = rewardMap.get(i);
				int index = kingRewardInfo.getIndex();
				int[][] reward = kingRewardInfo.getReward();
				int num = kingRewardInfo.getNum();
				int board = kingRewardInfo.getBoard();
				sendList.add(new Object[] { index, reward[0][0], reward[0][1], reward[0][2], num, board });
			}
			KingSecretCrystalSender.sendCmd_11700(hid, sendList.toArray(), model.getDrawNum());
		} catch (Exception e) {
			LogTool.error(e, KingSecretCrystalManager.class, hero.getId(), hero.getName(),
					"KingSecretCrystalManager openUI");
		}
	}

	/**
	 * 抽奖
	 * @param hero
	 */
	public void draw(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_KING_SECRET_CTRISTAL)) {
				return;
			}
			KingSecretCrystalModel model = (KingSecretCrystalModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_KING_SECRET_CTRISTAL);
			int drawNum = model.getDrawNum();
			int size = Config_zzmbxh_503.getIns().size();
			int nowNum = drawNum + 1;
			if (nowNum >= size) {
				nowNum = size;
			}
			Struct_zzmbxh_503 zzmbxh_503 = Config_zzmbxh_503.getIns().get(nowNum);
			int[][] consume = zzmbxh_503.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				// 道具不足
				KingSecretCrystalSender.sendCmd_11702(hid, 0, 1, 0, 0, 0, 0);
				return;
			}
			// 将还有剩余份数的奖励加入概率事件
			ProbabilityEventModel proModel = ProbabilityEventFactory.getProbabilityEvent();
			Map<Integer, Struct_zzmb_503> map = Config_zzmb_503.getIns().getMap();
			Map<Integer, KingRewardInfo> rewardMap = model.getRewardMap();
			Iterator<KingRewardInfo> iterator = rewardMap.values().iterator();
			boolean canDraw = false;
			for (; iterator.hasNext();) {
				KingRewardInfo rewardInfo = iterator.next();
				int num = rewardInfo.getNum();
				if (num > 0) {
					int index = rewardInfo.getIndex();
					int id = rewardInfo.getId();
					Struct_zzmb_503 zzmb_503 = map.get(id);
					proModel.addProbabilityEvent(zzmb_503.getGl(), index);
					canDraw = true;
				}
			}
			if (!canDraw) {
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.ACT_KING_SECRECT_CRYSTAL_COST, true);
			// 抽取奖励
			int index = ((Integer) ProbabilityEventUtil.getEventByProbability(proModel)).intValue();
			KingRewardInfo kingRewardInfo = rewardMap.get(index);
			kingRewardInfo.setNum(kingRewardInfo.getNum() - 1);
			model.setDrawNum(drawNum + 1);
			int[][] reward = kingRewardInfo.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.ACT_KING_SECRECT_CRYSTAL_REWARD, UseAddUtil.getDefaultMail(), false);
			KingSecretCrystalSender.sendCmd_11702(hid, 1, index, reward[0][0], reward[0][1], reward[0][2],
					kingRewardInfo.getBoard());
			int board = kingRewardInfo.getBoard();
			if (board == 1) {
				// 广播
				ChatManager.getIns().broadCast(ChatConst.KING_SECRECT_CRYSTAL_DRAW,
						new Object[] { hero.getNameZoneid(), reward[0][1], reward[0][2] });
			}
			KingSecretCrystalFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, KingSecretCrystalManager.class, hero.getId(), hero.getName(),
					"KingSecretCrystalManager draw");
		}
	}

	/**
	 * 重置奖励
	 */
	public void resetReward(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_KING_SECRET_CTRISTAL)) {
				return;
			}
			KingSecretCrystalModel model = (KingSecretCrystalModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_KING_SECRET_CTRISTAL);
			if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, KingSecretCrystalConst.SYSID)) {
				// 道具不足
				KingSecretCrystalSender.sendCmd_11704(hid, 0, 1);
				return;
			}
			UseAddUtil.use(hero, GameConst.TOOL, 1, KingSecretCrystalConst.SYSID,
					SourceGoodConst.ACT_KING_SECRECT_CRYSTAL_RESET, true);
			resetHandle(hero);
			KingSecretCrystalSender.sendCmd_11704(hid, 1, 0);
			openUI(hero);
			KingSecretCrystalFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, KingSecretCrystalManager.class, hero.getId(), hero.getName(),
					"KingSecretCrystalManager resetReward");
		}
	}

	public void resetHandle(Hero hero) {
		KingSecretCrystalModel model = (KingSecretCrystalModel) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_KING_SECRET_CTRISTAL);
		Map<Integer, KingRewardInfo> rewardMap = model.getRewardMap();
		rewardMap.clear();
		model.setDrawNum(0);
		Map<Integer, ProRewardInfo> map = KingSecretCrystalSysCache.getQsMap().get(model.getPeriods());
		int size = map.size();
		for (int i = 1; i <= size; i++) {
			ProRewardInfo proRewardInfo = map.get(i);
			int[] reward = (int[]) ProbabilityEventUtil.getEventByProbability(proRewardInfo.getModel());
			KingRewardInfo info = new KingRewardInfo();
			info.setId(proRewardInfo.getId());
			info.setIndex(i);
			info.setNum(reward[5]);
			info.setBoard(reward[4]);
			int[][] baseRward = new int[1][];
			baseRward[0] = new int[] { reward[0], reward[1], reward[2] };
			info.setReward(baseRward);
			rewardMap.put(i, info);
		}
	}

}
