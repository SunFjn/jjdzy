package com.teamtop.system.actGift;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.actGift.model.ActGift;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xslbb_331;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_xslbb_331;
import excel.struct.Struct_xtcs_004;

/**
 *
 */
public class ActGiftManager {

	private static ActGiftManager ActGiftManager;

	private ActGiftManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ActGiftManager getIns() {
		if (ActGiftManager == null) {
			ActGiftManager = new ActGiftManager();
		}
		return ActGiftManager;
	}


	public void sendMsg(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ActGift model = hero.getActGift();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.GIFT_ACT)) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> buyMap = model.getBuyMap();
			Map<Integer, Integer> endTimeMap = model.getEndTimeMap();
			int periods = model.getPeriods();
			List<Struct_xslbb_331> sortList = Config_xslbb_331.getIns().getSortList();
			Iterator<Struct_xslbb_331> iterator = sortList.iterator();
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(ActGiftConst.ADDTIME);
			int addTime = struct_xtcs_004.getNum() * TimeDateUtil.ONE_HOUR_INT;
			int currentTime = TimeDateUtil.getCurrentTime();
			while (iterator.hasNext()) {
				Struct_xslbb_331 next = iterator.next();
				int qs = next.getQs();
				if (periods != qs) {
					continue;
				}
				int lx = next.getLx();
				int cs = next.getCs();
				int id = next.getId();
				if (lx == ActGiftConst.TASK_1 && hero.getRebornlv() / 1000 >= cs) {
					Map<Integer, Integer> map = buyMap.get(ActGiftConst.TASK_1);
					if (map == null) {
						map = new HashMap<>();
						buyMap.put(ActGiftConst.TASK_1, map);
					}
					if (!map.containsKey(id)) {
						map.put(id, ActGiftConst.CANNOT_GET);
						endTimeMap.put(ActGiftConst.TASK_1, currentTime + addTime);
					}
				}
				Guanqia guanqia = hero.getGuanqia();
				if (guanqia != null) {
					if (lx == ActGiftConst.TASK_2 && guanqia.getBigGuanqia() >= cs) {
						Map<Integer, Integer> map = buyMap.get(ActGiftConst.TASK_2);
						if (map == null) {
							map = new HashMap<>();
							buyMap.put(ActGiftConst.TASK_2, map);
						}
						if (!map.containsKey(id)) {
							map.put(id, ActGiftConst.CANNOT_GET);
							endTimeMap.put(ActGiftConst.TASK_2, currentTime + addTime);
						}
					}
				}
				if (lx == ActGiftConst.TASK_3) {
					Map<Integer, Integer> wujiangMap = ActGiftFunction.getIns().wujiangHandle(hero);
					Integer num = wujiangMap.get(ActGiftConst.QUALITY);
					if (num == null) {
						num = 0;
					}
					if (num >= cs) {
						Map<Integer, Integer> map = buyMap.get(ActGiftConst.TASK_3);
						if (map == null) {
							map = new HashMap<>();
							buyMap.put(ActGiftConst.TASK_3, map);
						}
						if (!map.containsKey(id)) {
							map.put(id, ActGiftConst.CANNOT_GET);
							endTimeMap.put(ActGiftConst.TASK_3, currentTime + addTime);
						}

					}
				}
			}
			ActGiftFunction.getIns().Handle(hero, 1);
			List<Object[]> sendList = new ArrayList<>();
			Iterator<Integer> iterator2 = buyMap.keySet().iterator();
			while (iterator2.hasNext()) {
				List<Object[]> sendList2 = new ArrayList<>();
				Integer type = iterator2.next();
				Map<Integer, Integer> map = buyMap.get(type);
				Integer endTime = endTimeMap.get(type);
				if (endTime == null) {
					endTime = 0;
				}
				Iterator<Integer> iterator3 = map.keySet().iterator();
				while (iterator3.hasNext()) {
					Integer id = iterator3.next();
					Integer state = map.get(id);
					sendList2.add(new Object[] { id, state });
				}
				sendList.add(new Object[] { type, endTime, sendList2.toArray() });
			}
			ActGiftSender.sendCmd_10450(hero.getId(), sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, ActGiftManager.class, hero.getId(), hero.getName(), "openUI");
		}
	}

	/**
	 * @param hero
	 *            领取奖励
	 */
	public void getAward(Hero hero,int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ActGift model = hero.getActGift();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.GIFT_ACT)) {
				return;
			}
			Struct_xslbb_331 struct_xslbb_331 = Config_xslbb_331.getIns().get(id);
			if (struct_xslbb_331 == null) {
				// 配置表没有该id
				ActGiftSender.sendCmd_10452(hero.getId(), 1, id);
				return;
			}
			Map<Integer, Map<Integer, Integer>> buyMap = model.getBuyMap();
			int type = struct_xslbb_331.getLx();
			Map<Integer, Integer> map = buyMap.get(type);
			if (map == null) {
				// 未达到条件
				ActGiftSender.sendCmd_10452(hero.getId(), 2, id);
				return;
			}
			Integer state = map.get(id);
			if (state == null) {
				// 未达到条件
				ActGiftSender.sendCmd_10452(hero.getId(), 2, id);
				return;
			}
			if (state == ActGiftConst.CANNOT_GET) {
				// 未充值
				ActGiftSender.sendCmd_10452(hero.getId(), 3, id);
				return;
			}
			if (state == ActGiftConst.ALREADY_GET) {
				// 已领取
				ActGiftSender.sendCmd_10452(hero.getId(), 4, id);
				return;
			}
			map.put(id, ActGiftConst.ALREADY_GET);
			buyMap.put(type, map);
			int[][] jl = struct_xslbb_331.getJl();
			UseAddUtil.add(hero, jl, SourceGoodConst.GIFT_ACT_AWARD, UseAddUtil.getDefaultMail(),
					true); // 发放奖励
			ActGiftSender.sendCmd_10452(hero.getId(), 0, id);
		} catch (Exception e) {
			LogTool.error(e, ActGiftManager.class, hero.getId(), hero.getName(), "getAward");
		}
	}




	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ActGift model = hero.getActGift();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.GIFT_ACT)) {
				return;
			}
			int mailId = MailConst.GIFT_ACT_REWARD;
			Map<Integer, Map<Integer, Integer>> buyMap = model.getBuyMap();
			Iterator<Integer> iterator = buyMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer type = iterator.next();
				Map<Integer, Integer> map = buyMap.get(type);
				Iterator<Integer> iterator2 = map.keySet().iterator();
				while (iterator2.hasNext()) {
					Integer id = iterator2.next();
					Integer state = map.get(id);
					if (state != null && state == ActGiftConst.CAN_GET) {
						Struct_xslbb_331 struct_xslbb_331 = Config_xslbb_331.getIns().get(id);
						if (struct_xslbb_331 != null) {
							int[][] reward = struct_xslbb_331.getJl();
							if (reward != null) {
								MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId,
										new Object[] { mailId }, reward);
								map.put(id, ActGiftConst.ALREADY_GET);
								buyMap.put(type, map);
								sendMsg(hero);
							}
						}
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, ActGiftManager.class, hid, hero.getName(), "ActGiftManager handleEnd");
		}
	}


	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ActGift model = hero.getActGift();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.GIFT_ACT)) {
				return;
			}
			int periods = model.getPeriods();
			Map<Integer, Map<Integer, Integer>> buyMap = model.getBuyMap();
			for (Struct_xslbb_331 xslbb_331 : Config_xslbb_331.getIns().getMap().values()) {
				int qs = xslbb_331.getQs();
				int id = xslbb_331.getId();
				int type = xslbb_331.getLx();
				if (periods != qs) {
					continue;
				}
				int shangpin = xslbb_331.getCz();
				if (shangpin == product_id) {
					Map<Integer, Integer> map = buyMap.get(type);
					map.put(id, ActGiftConst.CAN_GET);
					buyMap.put(type, map);
				}
			}
			sendMsg(hero);
		} catch (Exception e) {
			LogTool.error(e, ActGiftManager.class, hid, hero.getName(), "ActGiftManager rechargeHandle");
		}
	}






}
