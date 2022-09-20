package com.teamtop.system.openDaysSystem.otherOverCallbackYBSe;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.otherOverCallbackYBSe.model.OtherOverCallbackYBSe;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_ybfl3_735;
import excel.struct.Struct_ybfl3_735;

public class OtherOverCallbackYBSeManager extends AbsOpenDaysManager {

	private static OtherOverCallbackYBSeManager ins;

	private OtherOverCallbackYBSeManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OtherOverCallbackYBSeManager getIns() {
		if (ins == null) {
			ins = new OtherOverCallbackYBSeManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_BACK_YB)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_BACK_YB);
			OtherOverCallbackYBSe overCallbackYBSe = (OtherOverCallbackYBSe) getSystemModel(hero, uid);
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			ArrayList<Object> arrayList = new ArrayList<Object>();
			int day = TimeDateUtil.betweenOpen();
			Map<Integer, Struct_ybfl3_735> map = OtherOverCallbackYBSeCache.getYbConfigMap().get(day);
			Iterator<Integer> iterator = map.keySet().iterator();
			for (; iterator.hasNext();) {
				int id = iterator.next();
				int state = OtherOverCallbackYBSeConst.NOT_REACH;
				if (awardStateMap.containsKey(id)) {
					state = awardStateMap.get(id);
				}
				arrayList.add(new Object[] { id, state });
			}
			OtherOverCallbackYBSeSender.sendCmd_4790(hero.getId(), arrayList.toArray(),
					overCallbackYBSe.getConsumeYBNum());
		} catch (Exception e) {
			LogTool.error(e, OtherOverCallbackYBSeManager.class, hero.getId(), hero.getName(), "OverCallbackYBSeManager openUI");
		}
	}
	
	/**
	 * 领取奖励
	 * @param hero
	 * @param index 索引id
	 */
	public void getAward(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_BACK_YB)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_BACK_YB);
			OtherOverCallbackYBSe overCallbackYBSe = (OtherOverCallbackYBSe) getSystemModel(hero, uid);
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			Integer state = awardStateMap.get(index);
			if (state == null) {// 没有奖励
				OtherOverCallbackYBSeSender.sendCmd_4792(hero.getId(), OtherOverCallbackYBSeConst.FAILURE_NOT_AWARD, 0);
				return;
			}
			if (state == OtherOverCallbackYBSeConst.NOT_REACH) {// 不可领取
				OtherOverCallbackYBSeSender.sendCmd_4792(hero.getId(), OtherOverCallbackYBSeConst.FAILURE_NOT_REACH, 0);
				return;
			}
			if (state == OtherOverCallbackYBSeConst.GETTED) {// 不可重复领取
				OtherOverCallbackYBSeSender.sendCmd_4792(hero.getId(), OtherOverCallbackYBSeConst.FAILURE_NOT_REP, 0);
				return;
			}
			int openDays = TimeDateUtil.betweenOpen();
			Map<Integer, Struct_ybfl3_735> map = OtherOverCallbackYBSeCache.getYbConfigMap().get(openDays);
			awardStateMap.put(index, OtherOverCallbackYBSeConst.GETTED);
			int[][] award = map.get(index).getReward();
			UseAddUtil.add(hero, award, SourceGoodConst.OVERCALLBACKCONST_YB_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
			OtherOverCallbackYBSeSender.sendCmd_4792(hero.getId(), OtherOverCallbackYBSeConst.SUCCESS, index);
			OtherOverCallbackYBSeFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, OtherOverCallbackYBSeManager.class, hero.getId(), hero.getName(), "OverCallbackYBSeManager ");
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		OtherOverCallbackYBSe overCallbackYBSe = (OtherOverCallbackYBSe) OtherOverCallbackYBSeManager.getIns()
				.getSystemModel(hero, uid);
		Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
		Iterator<Entry<Integer, Integer>> iterator = awardStateMap.entrySet().iterator();
		Entry<Integer, Integer> entry = null;
		for (; iterator.hasNext();) {
			entry = iterator.next();
			int id = entry.getKey();
			int state = entry.getValue();
			if (state == OtherOverCallbackYBSeConst.CAN_GET) {
				entry.setValue(OtherOverCallbackYBSeConst.GETTED);
				int[][] reward = Config_ybfl3_735.getIns().get(id).getReward();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.OVERCALLBACKYB,
						new Object[] { MailConst.OVERCALLBACKYB }, reward);
			}
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		OtherOverCallbackYBSe otherOverCallbackYBSe = (OtherOverCallbackYBSe) heroOpenDaysSysData.getOpSysDataMap()
				.get(uid);
		if (otherOverCallbackYBSe == null) {
			otherOverCallbackYBSe = new OtherOverCallbackYBSe();
			Map<Integer, Integer> awardStateMap = new HashMap<>();
			otherOverCallbackYBSe.setAwardStateMap(awardStateMap);
			int openDays = TimeDateUtil.betweenOpen();
			otherOverCallbackYBSe.setOpenDays(openDays);
		}
		return otherOverCallbackYBSe;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return OtherOverCallbackYBSe.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return OtherOverCallbackYBSeEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		OtherOverCallbackYBSeFunction.getIns().addconsumeYBNum(hero, GameConst.YUANBAO, 0, consumeNum);
	}

}
