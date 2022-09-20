package com.teamtop.system.longZhongDui;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.longZhongDui.model.LongZhongDuiCache;
import com.teamtop.system.longZhongDui.model.LongZhongDuiRankModel;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lzdreward_234;
import excel.struct.Struct_lzdreward_234;

public class LongZhongDuiEndSchedule extends AbsScheduleExecutor {

	public LongZhongDuiEndSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void execute(int now) {
		// TODO Auto-generated method stub
		afterAnswerHandle();
		ScheduleUtil.cancelTask(LongZhongDuiConst.SCHEDULE_ID);
	}

	public void afterAnswerHandle() {
		LongZhongDuiCache longZhongDuiCache = LongZhongDuiSysCache.getLongZhongDuiCache();
		try {
		Collection<Hero> values = HeroCache.getHeroMap().values();
		for (Hero hero : values) {
			if (HeroFunction.getIns().checkSystemOpen(hero, LongZhongDuiConst.LONGZHONGDUI)) {
				HeroFunction.getIns().sendSystemState(hero.getId(), LongZhongDuiConst.LONGZHONGDUI,
						SystemStateEnum.StateEnum.NOT_OPEN.getState());
				LongZhongDuiFunction.getIns().fastSendRedPoint(hero, RedPointConst.NO_RED);
			}
		}
		List<LongZhongDuiRankModel> longZhongDuiRankList = longZhongDuiCache
				.getLongZhongDuiRankList();
		Map<Long, Long> joinMap = longZhongDuiCache.getJoinMap();
		for (int i=0;i<longZhongDuiRankList.size();i++) { // 从参与玩家map中删除排名前10的玩家
			joinMap.remove(longZhongDuiRankList.get(i).getHid());
		}

		Map<Integer, int[][]> configFormat = configFormat();
		int i = 1;
		for (LongZhongDuiRankModel longZhongDuiRank : longZhongDuiRankList) { // 发放排名前10奖励
			int[][] award = configFormat.get(i);
			long hid = longZhongDuiRank.getHid();
			MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.LONGZHONGDUI_RANKAWARD,
					new Object[] { MailConst.LONGZHONGDUI_RANKAWARD, i }, award);// 邮件发放奖励
			i++;
		}
		for (long hid : joinMap.keySet()) { // 发放参与奖
			int[][] award = configFormat.get(LongZhongDuiConst.RANK_NUM + 1);
			MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.LONGZHONGDUI_RANKAWARD,
					new Object[] { MailConst.LONGZHONGDUI_RANKAWARD, String.valueOf(i - 1) + "+" }, award);// 邮件发放奖励
		}
		} catch (Exception e) {
			// TODO: handle exception
			List<LongZhongDuiRankModel> longZhongDuiRankList = longZhongDuiCache.getLongZhongDuiRankList();
			LogTool.error(e, this,
					"afterAnswerHandle longZhongDuiRankListStr:" + JSON.toJSONString(longZhongDuiRankList));
		}
	}

	public Map<Integer, int[][]> configFormat() {
		List<Struct_lzdreward_234> sortList = Config_lzdreward_234.getIns().getSortList();
		HashMap<Integer, int[][]> hashMap = new HashMap<Integer, int[][]>();
		for (Struct_lzdreward_234 struct_lzdreward_234 : sortList) {
			int[][] rankList = struct_lzdreward_234.getRank();
			int[] rank = rankList[0];
			int[][] reward = struct_lzdreward_234.getReward();
			int min = rank[0];
			int max = rank[1];
			if (min == max) {
				hashMap.put(min, reward);
			} else {
				if (min >= LongZhongDuiConst.RANK_NUM) {
					hashMap.put(min + 1, reward);
				} else {
					for (int i = min; i <= max; i++) {
						hashMap.put(i, reward);
					}
				}
			}

		}
		return hashMap;
	}

}
