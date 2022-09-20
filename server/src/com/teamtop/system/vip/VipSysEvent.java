package com.teamtop.system.vip;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.vip.model.VipData;

import excel.config.Config_VIPbc_710;
import excel.struct.Struct_VIPbc_710;

public class VipSysEvent extends AbsSystemEvent {

	private static VipSysEvent vipSysEvent;

	private VipSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized VipSysEvent getIns() {
		if (vipSysEvent == null) {
			vipSysEvent = new VipSysEvent();
		}
		return vipSysEvent;
	}

	@Override
	public void init(Hero hero) {
		VipData vipData = hero.getVipData();
		if (vipData == null) {
			vipData = new VipData();
			vipData.setHid(hero.getId());
			Set<Integer> vipAward = new HashSet<>();
			vipData.setVipAward(vipAward);
			Set<Integer> vipGift = new HashSet<>();
			vipData.setVipGift(vipGift);
			vipData.setVersion(1);
			hero.setVipData(vipData);
		} else {
			Set<Integer> vipGift = vipData.getVipGift();
			if (vipGift == null) {
				vipGift = new HashSet<>();
				vipData.setVipGift(vipGift);
			}
		}
	}

	@Override
	public void login(Hero hero) {
		VipFunction.getIns().updateVipHandle(hero);
		VipData vipData = hero.getVipData();
		int version = vipData.getVersion();
		if (version == 0) {
			long hid = hero.getId();
			int mailId = MailConst.MAIL_ID_VIP_PAYBACK;
			vipData.setVersion(1);
			Set<Integer> vipAward = vipData.getVipAward();
			int vipLv = hero.getVipLv();
			// 发放补偿礼包
			List<Struct_VIPbc_710> sortList = Config_VIPbc_710.getIns().getSortList();
			int size = sortList.size();
			Struct_VIPbc_710 viPbc_710 = null;
			for(int i=0;i<size;i++) {
				viPbc_710 = sortList.get(i);
				int level = viPbc_710.getLevel();
				if (vipLv >= level) {
					int[][] bc = viPbc_710.getBc();
					if (bc != null) {
						if (!vipAward.contains(level)) {
							continue;
						}
						MailFunction.getIns().sendMailWithFujianData2(hid, mailId,
								new Object[] { mailId, level }, bc);
					}
				}
			}
		}
	}

}
