package com.teamtop.system.activity.ativitys.scratchTicket;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.scratchTicket.model.ScratchTicketModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ggl_336;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_ggl_336;

public class ScratchTicketManager extends AbstractActivityManager {

	private static ScratchTicketManager ins;

	private ScratchTicketManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ScratchTicketManager getIns() {
		if (ins == null) {
			ins = new ScratchTicketManager();
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
		// TODO Auto-generated method stub

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		ScratchTicketModel model = new ScratchTicketModel(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		model.setFreeNum(ScratchTicketConst.FREE_NUM);
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		return ScratchTicketModel.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ScratchTicketSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SCRATCH_TICKET)) {
				return;
			}
			ScratchTicketModel model = (ScratchTicketModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SCRATCH_TICKET);
			int freeNum = model.getFreeNum();
			int rewardId = model.getRewardId();
			List<Object[]> sendList = new ArrayList<>();
			int[][] reward = null;
			if (rewardId == -1) {
				reward = Config_xtcs_004.getIns().get(ScratchTicketConst.SAVE_REWARD).getOther();
			} else if (rewardId > 0) {
				Struct_ggl_336 ggl_336 = Config_ggl_336.getIns().get(rewardId);
				reward = ggl_336.getJl();
			}
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			if (rewardId != 0 && rewardMap.size() > 0) {
				Iterator<Entry<Integer, Integer>> iterator = rewardMap.entrySet().iterator();
				int[][] jl = null;
				for (; iterator.hasNext();) {
					Entry<Integer, Integer> entry = iterator.next();
					Integer index = entry.getKey();
					Integer id = entry.getValue();
					if (id == -1) {
						jl = Config_xtcs_004.getIns().get(ScratchTicketConst.SAVE_REWARD).getOther();
					} else {
						jl = Config_ggl_336.getIns().get(id).getJl();
					}
					sendList.add(new Object[] { index, jl[0][0], jl[0][1], jl[0][2] });
				}
			}
			int type = 0;
			int toolId = 0;
			int num = 0;
			if (reward != null) {
				type = reward[0][0];
				toolId = reward[0][1];
				num = reward[0][2];
			}
			ScratchTicketSender.sendCmd_11790(hid, freeNum, sendList.toArray(), type, toolId, num);
		} catch (Exception e) {
			LogTool.error(e, ScratchTicketManager.class, hid, hero.getName(), "ScratchTicketManager openUI");
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
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SCRATCH_TICKET)) {
				return;
			}
			ScratchTicketModel model = (ScratchTicketModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SCRATCH_TICKET);
			int freeNum = model.getFreeNum();
			int drawNum = model.getDrawNum();
			if (freeNum > 0) {
				int newNum = freeNum - 1;
				model.setFreeNum(newNum);
			} else {
				if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, ScratchTicketConst.TOOL_ID)) {
					ScratchTicketSender.sendCmd_11792(hid, 0, 1);
					return;
				}
				UseAddUtil.use(hero, GameConst.TOOL, 1, ScratchTicketConst.TOOL_ID,
						SourceGoodConst.ACT_SCRATCH_TICKET_COST, true);
			}
			int newDrawNum = drawNum + 1;
			model.setDrawNum(newDrawNum);
			int periods = model.getPeriods();
			Set<Integer> set = ScratchTicketSysCache.getQsIdMap().get(periods);
			Set<Integer> tempSet = new HashSet<>(set);
			int rewardId = 0;
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			int saveNum = Config_xtcs_004.getIns().get(ScratchTicketConst.SAVE_NUM).getNum();
			if (newDrawNum == saveNum) {
				rewardId = -1;
				model.setDrawNum(0);
				model.setRewardId(-1);
			} else {
				ProbabilityEventModel eventModel = ScratchTicketSysCache.getQsMap().get(periods);
				Struct_ggl_336 ggl = (Struct_ggl_336) ProbabilityEventUtil.getEventByProbability(eventModel);
				rewardId = ggl.getId();
				model.setRewardId(rewardId);
				tempSet.remove(rewardId);
			}
			List<Integer> randomList = new ArrayList<>(tempSet);
			List<Integer> siteList = getSiteList();
			for (int i = 0; i < 3; i++) {
				int site = randomSite(siteList);
				rewardMap.put(site, rewardId);
			}
			for (int i = 0; i < 6; i++) {
				int site = randomSite(siteList);
				int showRewardId = showReward(randomList);
				rewardMap.put(site, showRewardId);
			}
			LogTool.info(hid, hero.getName(), "guaguale::" + rewardMap.size(), this);
			UseAddUtil.add(hero, GameConst.COIN, ScratchTicketConst.BUY_COIN, SourceGoodConst.ACT_SCRATCH_TICKET_COIN,
					true);
			ScratchTicketSender.sendCmd_11792(hid, 1, 0);
			ScratchTicketFunction.getIns().updateRedPoint(hero);
			openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, ScratchTicketManager.class, hid, hero.getName(), "ScratchTicketManager draw");
		}
	}

	/**
	 * 获取位置集合
	 * @return
	 */
	public List<Integer> getSiteList() {
		List<Integer> siteList = new ArrayList<>();
		for (int i = 1; i <= 9; i++) {
			siteList.add(i);
		}
		return siteList;
	}

	/**
	 * 随机位置
	 * @param siteList
	 * @return
	 */
	public int randomSite(List<Integer> siteList) {
		if (siteList.size() == 1) {
			return siteList.get(0);
		}
		int size = siteList.size() - 1;
		int random = RandomUtil.getRandomNumInAreas(0, size);
		int site = siteList.remove(random);
		return site;
	}

	/**
	 * 随机展示奖励
	 * @param randomList
	 * @return
	 */
	public int showReward(List<Integer> randomList) {
		int size = randomList.size() - 1;
		int random = RandomUtil.getRandomNumInAreas(0, size);
		int id = randomList.remove(random);
		return id;
	}

	/**
	 * 领取奖励
	 */
	public void getReward(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SCRATCH_TICKET)) {
				return;
			}
			ScratchTicketModel model = (ScratchTicketModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SCRATCH_TICKET);
			int rewardId = model.getRewardId();
			if (rewardId == 0) {
				ScratchTicketSender.sendCmd_11794(hid, 0);
				return;
			}
			boolean board = false;
			int[][] reward = null;
			if (rewardId == -1) {
				// 保底大奖
				reward = Config_xtcs_004.getIns().get(ScratchTicketConst.SAVE_REWARD).getOther();
				board = true;
				UseAddUtil.add(hero, reward, SourceGoodConst.ACT_SCRATCH_TICKET_REWARD, UseAddUtil.getDefaultMail(),
						true);
			} else if (rewardId > 0) {
				Struct_ggl_336 ggl_336 = Config_ggl_336.getIns().get(rewardId);
				int[][] jl = ggl_336.getJl();
				reward = new int[1][];
				reward[0] = new int[] { jl[0][0], jl[0][1], jl[0][2] };
				int dj = ggl_336.getDj();
				if (dj == 1) {
					board = true;
				}
				UseAddUtil.add(hero, reward, SourceGoodConst.ACT_SCRATCH_TICKET_REWARD, UseAddUtil.getDefaultMail(),
						true);
			}
			model.setRewardId(0);
			model.getRewardMap().clear();
			if (board) {
				int toolId = reward[0][1];
				if (toolId == 0) {
					toolId = reward[0][0];
				}
				ChatManager.getIns().broadCast(ChatConst.KING_SCRATCH_TICKET,
						new Object[] { hero.getNameZoneid(), toolId, reward[0][2] });
			}
			ScratchTicketSender.sendCmd_11794(hid, 1);
			openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, ScratchTicketManager.class, hid, hero.getName(), "ScratchTicketManager getReward");
		}
	}

}
