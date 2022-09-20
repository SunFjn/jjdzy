package com.teamtop.system.privilegeCard;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_tqk_719;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_tqk_719;

/**
 * 特权卡
 * @author hzp
 *
 */
public class PrivilegeCardManager {

	private static PrivilegeCardManager privilegeCardManager;

	private PrivilegeCardManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PrivilegeCardManager getIns() {
		if (privilegeCardManager == null) {
			privilegeCardManager = new PrivilegeCardManager();
		}
		return privilegeCardManager;
	}

	/**
	 * 打开特权卡界面
	 * @param hero
	 */
	public void openPrivilegeCard(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
				return;
			}
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			int privilegeAward = hero.getPrivilegeAward();
			Iterator<Entry<Integer, int[]>> iterator = privilegeCardMap.entrySet().iterator();
			List<Object[]> cardData = new ArrayList<>();
			Entry<Integer, int[]> entry = null;
			int currentTime = TimeDateUtil.getCurrentTime();
			for (; iterator.hasNext();) {
				entry = iterator.next();
				int[] value = entry.getValue();
				int leftTime = 0;
				if (value[1] > 0) {
					leftTime = value[1] - currentTime;
					if (leftTime < 0) {
						iterator.remove();
						continue;
					}
				}
				cardData.add(new Object[] { entry.getKey(), value[0], leftTime });
			}
			PrivilegeCardSender.sendCmd_2172(hero.getId(), cardData.toArray(), privilegeAward);
		} catch (Exception e) {
			LogTool.error(e, PrivilegeCardManager.class, hero.getId(), hero.getName(),
					"PrivilegeCardManager openPrivilegeCard");
		}
	}
	
	/**
	 * 领取特权卡
	 * @param hero
	 * @param cardId
	 */
	public void getPrivilegeCard(Hero hero, int cardId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
				return;
			}
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			if (!privilegeCardMap.containsKey(cardId)) {
				// 非法操作
				return;
			}
			int[] info = privilegeCardMap.get(cardId);
			int state = info[0];
			if (state == PrivilegeCardConst.ALREADY_GET) {
				// 今日已领取
				PrivilegeCardSender.sendCmd_2174(hid, 0, 1);
				return;
			}
			Struct_tqk_719 tqk = Config_tqk_719.getIns().get(cardId);
//			int yuanbao = tqk.getYUANBAO();
//			int[][] reward = tqk.getDAOJU();
			int[][] reward = tqk.getJl();
			if (reward != null) {
				UseAddUtil.add(hero, reward, SourceGoodConst.PRIVILEGECARD_DAILY_REWARD, UseAddUtil.getDefaultMail(), true);
			}
//			UseAddUtil.add(hero, GameConst.YUANBAO, yuanbao, SourceGoodConst.PRIVILEGECARD_DAILY_REWARD, true);
			info[0] = PrivilegeCardConst.ALREADY_GET;
			PrivilegeCardSender.sendCmd_2174(hid, 1, cardId);
			LogTool.info(hid, hero.getName(), "PrivilegeCardManager cardId=" + cardId, PrivilegeCardManager.class);
		} catch (Exception e) {
			LogTool.error(e, PrivilegeCardManager.class, hero.getId(), hero.getName(),
					"PrivilegeCardManager getPrivilegeCard");
		}
	}

	/**
	 * 领取 同时拥有3张特权卡奖励
	 * @param hero
	 */
	public void getThreeAward(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
				return;
			}
			int privilegeAward = hero.getPrivilegeAward();
			if(privilegeAward!=PrivilegeCardConst.THREE_CAN_GET) {
				//不可领取
				LogTool.warn("PrivilegeCardManager getThreeAward id="+hero.getId()+", state="+privilegeAward, PrivilegeCardManager.class);
				PrivilegeCardSender.sendCmd_2176(hid, 0);
				return;
			}
			hero.setPrivilegeAward(PrivilegeCardConst.THREE_ALREADY_GET);
			int[][] award = Config_xtcs_004.getIns().get(PrivilegeCardConst.THREE_AWARD_ID).getOther();
			UseAddUtil.add(hero, award, SourceGoodConst.PRIVILEGE_THREE_AWARD, null, true);
			PrivilegeCardSender.sendCmd_2176(hid, 1);
		} catch (Exception e) {
			LogTool.error(e, PrivilegeCardManager.class, hero.getId(), hero.getName(),
					"PrivilegeCardManager getThreeAward");
		}
	}

}
