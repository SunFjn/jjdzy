package com.teamtop.system.vip;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.vip.model.VipData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_VIP_710;
import excel.struct.Struct_VIP_710;

public class VipManager {

	private static VipManager vipManager;

	private VipManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized VipManager getIns() {
		if (vipManager == null) {
			vipManager = new VipManager();
		}
		return vipManager;
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openVip(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int vipLv = hero.getVipLv();
			VipData vipData = hero.getVipData();
			int vipExp = vipData.getVipExp();
			Set<Integer> vipAward = vipData.getVipAward();
			List<Object[]> awardData = new ArrayList<>();
			if (vipAward != null) {
				Iterator<Integer> iterator = vipAward.iterator();
				int lvl = 0;
				for (; iterator.hasNext();) {
					lvl = iterator.next();
					awardData.add(new Object[] { lvl });
				}
			}
			Set<Integer> vipGift = vipData.getVipGift();
			List<Object[]> giftData = new ArrayList<>();
			if (vipGift != null) {
				Iterator<Integer> iterator = vipGift.iterator();
				for (; iterator.hasNext();) {
					Integer index = iterator.next();
					giftData.add(new Object[] { index });
				}
			}
			VipSender.sendCmd_2062(hid, vipLv, vipExp, awardData.toArray(), giftData.toArray());
		} catch (Exception e) {
			LogTool.error(e, VipManager.class, hid, hero.getName(), "VipManager openVip");
		}
	}

	/**
	 * 领取vip奖励
	 * 
	 * @param hero
	 * @param vipLevel
	 */
	public void getVipAward(Hero hero, int vipLevel) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int vipLv = hero.getVipLv();
			if (vipLv < vipLevel) {
				// 未达到该vip等级
				return;
			}
			VipData vipData = hero.getVipData();
			Set<Integer> vipAward = vipData.getVipAward();
			if (vipAward.contains(vipLevel)) {
				// 已领取
				VipSender.sendCmd_2064(hid, 0, 1);
				return;
			}
			Struct_VIP_710 vipInfo = Config_VIP_710.getIns().get(vipLevel+1);
			int[][] award = vipInfo.getAWARD();
			if (award == null) {
				return;
			}
			UseAddUtil.add(hero, award, SourceGoodConst.VIP_AWARD, null, true);
			vipAward.add(vipLevel);
			VipSender.sendCmd_2064(hid, 1, vipLevel);
			LogTool.info(hid, hero.getName(), "VipManager getVipAward vipLevel=" + vipLevel, VipManager.class);
		} catch (Exception e) {
			LogTool.error(e, VipManager.class, hid, hero.getName(), "VipManager getVipAward vipLevel=" + vipLevel);
		}
	}

	/**
	 * 购买vip礼包
	 * 
	 * @param hero
	 * @param index
	 */
	public void buyVipGift(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int vipLv = hero.getVipLv();
			Struct_VIP_710 vip_710 = Config_VIP_710.getIns().get(index);
			if (vip_710.getLV() > vipLv) {
				VipSender.sendCmd_2066(hid, 0, 1);
				return;
			}
			int lbjg = vip_710.getLbjg();
			if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, lbjg)) {
				VipSender.sendCmd_2066(hid, 0, 2);
				return;
			}
			VipData vipData = hero.getVipData();
			Set<Integer> vipGift = vipData.getVipGift();
			if (vipGift.contains(index)) {
				VipSender.sendCmd_2066(hid, 0, 3);
				return;
			}
			UseAddUtil.use(hero, GameConst.YUANBAO, lbjg, SourceGoodConst.VIP_BUY_GIFT, true);
			vipGift.add(index);
			int[][] viplb = vip_710.getViplb();
			UseAddUtil.add(hero, viplb, SourceGoodConst.VIP_BUY_GIFT, UseAddUtil.getDefaultMail(), true);
			VipSender.sendCmd_2066(hid, 1, index);
		} catch (Exception e) {
			LogTool.error(e, VipManager.class, hid, hero.getName(), "VipManager buyVipGift index=" + index);
		}
	}

}
