package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.boss.monsterGod.MonsterGodConst;
import com.teamtop.system.boss.qmboss.QMBossConst;
import com.teamtop.system.crossBoss.CrossBossSender;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

public class ActiveGetGiftFunction {
	public static ActiveGetGiftFunction ins;

	public static ActiveGetGiftFunction getIns() {
		if (ins == null) {
			ins = new ActiveGetGiftFunction();
		}
		return ins;
	}

	private ActiveGetGiftFunction() {
	}

	public boolean checkIsStart(Hero hero) {
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_ACTIVEGETGIFT)) {
			return true;
		}
		return false;
	}

	public int getQs() {
		Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
		ActivityInfo activityInfo = activityMap.get(ActivitySysId.ACT_ACTIVEGETGIFT);
		return activityInfo.getPeriods();
	}

	/**
	 * 全民boss掉落
	 * 
	 * @param hero
	 * @param dropTips
	 */
	public void QMBossHandle(Hero hero, List<Object[]> dropTips) {
		if (!checkIsStart(hero)) {
			return;
		}
		int qs = getQs();
		List<ProbabilityEventModel> list = null;
		ProbabilityEventModel probabilityEventModel = null;
		try {
			list = ActiveGetGiftSysCache.getConfigMap().get(qs).get(QMBossConst.SYS_ID);
			for (ProbabilityEventModel pm : list) {
				probabilityEventModel = pm;
				int[] award = (int[]) ProbabilityEventUtil.getEventByProbability(pm);
				if (award != null) {
					dropTips.add(new Object[] { award[0], award[1], award[2] ,0});
					int[][] data = new int[][] { new int[] { award[0], award[1], award[2] } };
					if (UseAddUtil.canAdd(hero, data, true)) {
						UseAddUtil.add(hero, data, SourceGoodConst.CELEBRATION_ACTIVEGETGIFT_QMBOSS,
								UseAddUtil.getDefaultMail(), false);
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "ActiveGetGiftFunction QMBossHandle" + " qs" + qs
					+ " list" + list + " probabilityEventModel" + probabilityEventModel);
		}
	}

	/**
	 * 魔神吕布掉落以及展示
	 * 
	 * @param hero
	 * @param dropTips
	 */
	public List<Object[]> MonsterBossTip(Hero hero) {
		if (!checkIsStart(hero)) {
			return null;
		}
		List<Object[]> dropTips = new ArrayList<>();
		List<int[]> dropArr = new ArrayList<int[]>();
		if (!checkIsStart(hero)) {
			return dropTips;
		}
		int qs = getQs();
		List<ProbabilityEventModel> list = null;
		ProbabilityEventModel probabilityEventModel = null;
		try {
			list = ActiveGetGiftSysCache.getConfigMap().get(qs).get(MonsterGodConst.SYSID);
			for (ProbabilityEventModel pm : list) {
				probabilityEventModel = pm;
				int[] award = (int[]) ProbabilityEventUtil.getEventByProbability(pm);
				if (award != null) {
					dropTips.add(new Object[] { award[0], award[1], award[2] });
					dropArr.add(new int[] { award[0], award[1], award[2] });
				}
			}
			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			UseAddUtil.add(hero, drops, SourceGoodConst.ACT_HUOYUEYOULI_LVBU, UseAddUtil.getDefaultMail(), true);
			return dropTips;
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ActiveGetGiftFunction QMBossHandle" + " qs" + qs
					+ " list" + list + " probabilityEventModel" + probabilityEventModel);
		}
		return dropTips;
	}

	/**
	 * 孟获掉落提示以及发邮件
	 * 
	 * @param hero
	 * @param dropTips
	 */
	public void CrossBossTip(long hid, int qs, List<Object[]> dropTips) {
		List<int[]> dropArr = new ArrayList<int[]>();
		List<ProbabilityEventModel> list = null;
		ProbabilityEventModel probabilityEventModel = null;
		try {
			int i = 0;
			list = ActiveGetGiftSysCache.getConfigMap().get(qs).get(SystemIdConst.FUN_CROSS_BOSS_MH);
			for (ProbabilityEventModel pm : list) {
				probabilityEventModel = pm;
				int[] award = (int[]) ProbabilityEventUtil.getEventByProbability(pm);
				if (award != null) {
					dropTips.add(new Object[] { award[0], award[1], award[2] });
					dropArr.add(new int[] { award[0], award[1], award[2] });
					i++;
				}
			}
			if (i > 0) {
				int[][] drops = new int[dropArr.size()][];
				dropArr.toArray(drops);
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.MAIL_ID_CROSSBOSS_EXT,
						new Object[] { MailConst.MAIL_ID_CROSSBOSS_EXT }, drops);
//				CrossBossSender.sendCmd_1728(hid, ActivitySysId.ACT_ACTIVEGETGIFT, dropTips.toArray());
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, this, hid, "", "ActiveGetGiftFunction QMBossHandle" + " qs" + qs + " list" + list
					+ " probabilityEventModel" + probabilityEventModel);
		}
		return;
	}

	/**
	 * 添加红点
	 * 
	 * @param hero
	 */
	public void addRedPoint(Hero hero) {
		if (hero.getCommonData().getDailyRedPointState() == 0) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_THREEKINGDOMSCELEBRATION, 1,
					RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_ACTIVEGETGIFT, 1,
					RedPointConst.HAS_RED);
			hero.getCommonData().setDailyRedPointState(1);
		}
	}

}
