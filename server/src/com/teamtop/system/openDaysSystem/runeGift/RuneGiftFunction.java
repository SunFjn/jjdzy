package com.teamtop.system.openDaysSystem.runeGift;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.crossBoss.CrossBossSender;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;

public class RuneGiftFunction {

	private static RuneGiftFunction ins;

	private RuneGiftFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RuneGiftFunction getIns() {
		if (ins == null) {
			ins = new RuneGiftFunction();
		}
		return ins;
	}

	/**
	 * 全民boss掉落
	 * 
	 * @param hero
	 * @param dropTips
	 */
	public void QMBossHandle(Hero hero, List<Object[]> dropTips) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.RUNE_GIFT)) {
			return;
		}
		List<ProbabilityEventModel> list = null;
		ProbabilityEventModel probabilityEventModel = null;
		int uid = 0;
		try {
			uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_GIFT);
			int qs = Config_hdfl_012.getIns().get(uid).getQs();
			list = RuneGiftSysCache.getRuneGiftReward().get(SystemIdConst.FUN_QM_BOSS).get(qs);
			for (ProbabilityEventModel pm : list) {
				probabilityEventModel = pm;
				int[] award = (int[]) ProbabilityEventUtil.getEventByProbability(pm);
				if (award != null) {
					dropTips.add(new Object[] { award[0], award[1], award[2] ,0});
					int[][] data = new int[][] { new int[] { award[0], award[1], award[2] } };
					if (UseAddUtil.canAdd(hero, data, true)) {
						UseAddUtil.add(hero, data, SourceGoodConst.RUNE_GIFT_QM, UseAddUtil.getDefaultMail(), false);
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "RuneGiftFunction QMBossHandle" + " uid=" + uid
					+ " list:" + JSON.toJSONString(list) + " probabilityEventModel"
					+ JSON.toJSONString(probabilityEventModel));
		}
	}

	/**
	 * 魔神吕布掉落以及展示
	 * 
	 * @param hero
	 * @param dropTips
	 */
	public List<Object[]> MonsterBossTip(Hero hero) {
		List<Object[]> dropTips = new ArrayList<>();
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.RUNE_GIFT)) {
			return dropTips;
		}
		List<int[]> dropArr = new ArrayList<int[]>();
		int qs = 0;
		List<ProbabilityEventModel> list = null;
		ProbabilityEventModel probabilityEventModel = null;
		int uid = 0;
		try {
			uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_GIFT);
			qs = Config_hdfl_012.getIns().get(uid).getQs();
			list = RuneGiftSysCache.getRuneGiftReward().get(SystemIdConst.FUN_MONSTER_GOD).get(qs);
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
			UseAddUtil.add(hero, drops, SourceGoodConst.RUNE_GIFT_LB, UseAddUtil.getDefaultMail(), true);
			return dropTips;
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "RuneGiftFunction QMBossHandle" + " uid" + uid
					+ " list：" + JSON.toJSONString(list) + " probabilityEventModel："
					+ JSON.toJSONString(probabilityEventModel));
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
//		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.RUNE_GIFT)) {
//			return;
//		}
		List<int[]> dropArr = new ArrayList<int[]>();
		List<ProbabilityEventModel> list = null;
		ProbabilityEventModel probabilityEventModel = null;
		int uid = 0;
		try {
			list = RuneGiftSysCache.getRuneGiftReward().get(SystemIdConst.FUN_CROSS_BOSS_MH).get(qs);
			int i = 0;
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
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.MAIL_ID_RUNE_GIFT,
						new Object[] { MailConst.MAIL_ID_RUNE_GIFT }, drops);
//				CrossBossSender.sendCmd_1728(hid, SystemIdConst.RUNE_GIFT, dropTips.toArray());
			}
		} catch (Exception e) {
			LogTool.error(e, this, hid, "", "RuneGiftFunction QMBossHandle" + " uid=" + uid + " list："
					+ JSON.toJSONString(list) + " probabilityEventModel:" + JSON.toJSONString(probabilityEventModel));
		}
	}

}
