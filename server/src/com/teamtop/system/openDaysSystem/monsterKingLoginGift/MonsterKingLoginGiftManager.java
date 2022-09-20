package com.teamtop.system.openDaysSystem.monsterKingLoginGift;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import com.teamtop.system.openDaysSystem.monsterKingLoginGift.model.MonsterKingLoginGift;
import com.teamtop.util.log.LogTool;

import excel.config.Config_wszwdlyj_324;
import excel.struct.Struct_wszwdlyj_324;

public class MonsterKingLoginGiftManager extends AbsOpenDaysManager {

	private static MonsterKingLoginGiftManager ins;

	private MonsterKingLoginGiftManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterKingLoginGiftManager getIns() {
		if (ins == null) {
			ins = new MonsterKingLoginGiftManager();
		}
		return ins;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return MonsterKingLoginGiftSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_LOGIN_GIFT)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_LOGIN_GIFT);
			MonsterKingLoginGift actData = (MonsterKingLoginGift) getSystemModel(hero, uid);
			int qs = actData.getQs();
			Map<Integer, Struct_wszwdlyj_324> map = MonsterKingLoginGiftCache.getQsMap().get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			int loginTimes = actData.getLoginTimes();
			Set<Integer> reward = actData.getReward();
			List<Object[]> sendData = new ArrayList<>();
			for (; iterator.hasNext();) {
				int state = 0;
				Integer day = iterator.next();
				if (day <= loginTimes) {
					state = 1;
				}
				if (reward.contains(day)) {
					state = 2;
				}
				Struct_wszwdlyj_324 wszwdlyj_324 = map.get(day);
				sendData.add(new Object[] { wszwdlyj_324.getId(), state });
			}
			MonsterKingLoginGiftSender.sendCmd_9160(hid, loginTimes, sendData.toArray());
		} catch (Exception e) {
			LogTool.error(e, MonsterKingLoginGiftManager.class, hero.getId(), hero.getName(),
					"MonsterKingLoginGiftManager openUI");
		}
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param id
	 */
	public void getReward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_LOGIN_GIFT)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_LOGIN_GIFT);
			MonsterKingLoginGift actData = (MonsterKingLoginGift) getSystemModel(hero, uid);
			Struct_wszwdlyj_324 wszwdlyj_324 = Config_wszwdlyj_324.getIns().get(id);
			int day = wszwdlyj_324.getDay();
			if (day < 1) {
				LogTool.warn("MonsterKingLoginGift getReward hid=" + hid + ", day=" + day,
						MonsterKingLoginGiftManager.class);
				return;
			}
			int loginTimes = actData.getLoginTimes();
			if (day > loginTimes) {
				// 未达条件
				MonsterKingLoginGiftSender.sendCmd_9162(hid, 0, 1);
				return;
			}
			Set<Integer> reward = actData.getReward();
			if (reward.contains(day)) {
				// 已领取
				MonsterKingLoginGiftSender.sendCmd_9162(hid, 0, 2);
				return;
			}
			int qs = actData.getQs();
			Map<Integer, Struct_wszwdlyj_324> map = MonsterKingLoginGiftCache.getQsMap().get(qs);
			Struct_wszwdlyj_324 struct_wszwdlyj_324 = map.get(day);
			if (struct_wszwdlyj_324 == null) {
				LogTool.warn("MonsterKingLoginGift getReward struct_wszwdlyj_324 null hid=" + hid + ", day=" + day,
						MonsterKingLoginGiftManager.class);
				return;
			}
			reward.add(day);
			int[][] goods = struct_wszwdlyj_324.getReward();
			UseAddUtil.add(hero, goods, SourceGoodConst.MONSTER_KING_LOGIN_GIFT, UseAddUtil.getDefaultMail(), true);
			MonsterKingLoginGiftSender.sendCmd_9162(hid, 1, id);
			MonsterKingLoginGiftFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, MonsterKingLoginGiftManager.class, hero.getId(), hero.getName(),
					"MonsterKingLoginGiftManager getReward, id=" + id);
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		MonsterKingLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		MonsterKingLoginGift actData = (MonsterKingLoginGift) getSystemModel(hero, uid);
		if (actData == null) {
			return;
		}
		int loginTimes = actData.getLoginTimes();
		int qs = actData.getQs();
		int mailId = MailConst.MONSTER_KING_LOGIN_AWARD;
		long hid = hero.getId();
		Map<Integer, Struct_wszwdlyj_324> map = MonsterKingLoginGiftCache.getQsMap().get(qs);
		Set<Integer> reward = actData.getReward();
		for (int i = 1; i <= loginTimes; i++) {
			if (reward.contains(i)) {
				continue;
			}
			int[][] goods = map.get(i).getReward();
			if (goods == null) {
				continue;
			}
			reward.add(i);
			MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, goods);
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		MonsterKingLoginGift cgift = (MonsterKingLoginGift) opSysDataMap.get(uid);
		if(cgift==null) {			
			cgift = new MonsterKingLoginGift();
			Set<Integer> reward = new HashSet<>();
			cgift.setReward(reward);
		}
		return cgift;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return MonsterKingLoginGift.class;
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub
		
	}

}
