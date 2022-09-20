package com.teamtop.system.activity.ativitys.dailyFirstRecharge;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dailyFirstRecharge.model.DailyFirstRecharge;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;

import excel.config.Config_meirishouchong_715;
import excel.config.Config_mrbx_715;
import excel.config.Config_shop_011;
import excel.struct.Struct_meirishouchong_715;
import excel.struct.Struct_mrbx_715;

public class DailyFirstRechargeManager extends AbstractActivityManager {
	private static DailyFirstRechargeManager ins;

	public static DailyFirstRechargeManager getIns() {
		if (ins == null) {
			ins = new DailyFirstRechargeManager();
		}
		return ins;
	}

	private DailyFirstRechargeManager() {
	}

	/**
	 * 打开每日首冲界面
	 * 
	 * @param hero
	 */
	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_DailyRecharge)) {
			return;
		}
//		if (!DailyFirstRechargeFunction.getIns().isOpen(hero)) {
//			return;
//		}
		DailyFirstRecharge dailyFirstRecharge = (DailyFirstRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_DailyRecharge);
		List<Integer> baoXiangList = dailyFirstRecharge.getBaoXiangList();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		if (baoXiangList.size() != 0) {
			for (Integer state : baoXiangList) {
				arrayList.add(new Object[] { state });
			}
		}
		int rechargeDay = dailyFirstRecharge.getRechargeDay();
		int isGetted = dailyFirstRecharge.getIsGetted();
		DailyFirstRechargeSender.sendCmd_1930(hero.getId(), arrayList.toArray(), rechargeDay, isGetted);

	}

	/**
	 * 领取宝箱奖励
	 * 
	 * @param hero
	 * @param baoxiangId
	 */
	public void getBaoxiangAwards(Hero hero, int baoxiangId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_DailyRecharge)) {
			return;
		}
//		if (!DailyFirstRechargeFunction.getIns().isOpen(hero)) {
//			return;
//		}
		int checkBaoxiangId = checkBaoxiangId(hero, baoxiangId);
		if (checkBaoxiangId != DailyFirstRechargeConst.SUCCESS) {
			DailyFirstRechargeSender.sendCmd_1932(hero.getId(), checkBaoxiangId, 0);
			return;
		}
		DailyFirstRecharge dailyFirstRecharge = (DailyFirstRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_DailyRecharge);
		Struct_mrbx_715 excel = Config_mrbx_715.getIns().get(baoxiangId);
		int[][] award = excel.getAWARD();
		boolean canAddJK = UseAddUtil.canAddJK(hero, award, false, excel.getJiankong());
		if(!canAddJK) {
			DailyFirstRechargeSender.sendCmd_1932(hero.getId(), checkBaoxiangId, 0);
			return;
		}
		UseAddUtil.addJK(hero, award, SourceGoodConst.DFR_BAOXIANG_AWARDS, null, true, excel.getJiankong()); // 发放奖励
		List<Integer> baoXiangList = dailyFirstRecharge.getBaoXiangList();
		baoXiangList.set(baoxiangId - 1, DailyFirstRechargeConst.GETTED); // 设置宝箱为已领取
		DailyFirstRechargeSender.sendCmd_1932(hero.getId(), DailyFirstRechargeConst.SUCCESS, baoxiangId);
	}

	/**
	 * 领取每日首充奖励
	 * 
	 * @param hero
	 */
	public void getAwards(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.Act_DailyRecharge)) {
			return;
		}
//		if (!DailyFirstRechargeFunction.getIns().isOpen(hero)) {
//			return;
//		}
		DailyFirstRecharge dailyFirstRecharge = (DailyFirstRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_DailyRecharge);
		if (dailyFirstRecharge.getIsGetted() == DailyFirstRechargeConst.NOT_REACH) { // 首充没达成，不能领取
			DailyFirstRechargeSender.sendCmd_1934(hero.getId(), DailyFirstRechargeConst.FAILURE_NOT_REACH);
			return;
		}
		if (dailyFirstRecharge.getIsGetted() == DailyFirstRechargeConst.GETTED) { // 不能重复领取
			DailyFirstRechargeSender.sendCmd_1934(hero.getId(), DailyFirstRechargeConst.FAILURE_NOT_REP);
			return;
		}
		Struct_meirishouchong_715 excel = Config_meirishouchong_715.getIns().get(1);
		int[][] award = excel.getAWARD();
		boolean canAddJK = UseAddUtil.canAddJK(hero, award, false, excel.getJiankong());
		if(!canAddJK) {
			DailyFirstRechargeSender.sendCmd_1934(hero.getId(), DailyFirstRechargeConst.FAILURE_NOT_REP);
			return;
		}
		
		UseAddUtil.addJK(hero, award, SourceGoodConst.DFR_AWARDS, null, true, excel.getJiankong()); // 发放奖励
		dailyFirstRecharge.setIsGetted(DailyFirstRechargeConst.GETTED); // 改为已领取状态
		DailyFirstRechargeSender.sendCmd_1934(hero.getId(), DailyFirstRechargeConst.SUCCESS);
	}

	/**
	 * 检查宝箱id是否满足条件 2：宝箱不存在，3：累计天数不满足，4：不能重复领取
	 * 
	 * @param hero
	 * @param baoxiangId
	 * @return
	 */
	public int checkBaoxiangId(Hero hero, int baoxiangId) {
		DailyFirstRecharge dailyFirstRecharge = (DailyFirstRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_DailyRecharge);
		List<Integer> baoXiangList = dailyFirstRecharge.getBaoXiangList();
		Struct_mrbx_715 struct_mrbx_715 = Config_mrbx_715.getIns().get(baoxiangId);
		if (struct_mrbx_715 == null) { // 没有这个宝箱
			return DailyFirstRechargeConst.FAILURE_NOT_AWARDS;
		}
		if (baoXiangList.get(baoxiangId - 1) == DailyFirstRechargeConst.NOT_REACH) { // 当前累计天数没达到领取宝箱要求
			return DailyFirstRechargeConst.FAILURE_NOT_ENOUGH_DAY;
		}
		if (baoXiangList.get(baoxiangId - 1) == DailyFirstRechargeConst.GETTED) { // 不能重复领取
			return DailyFirstRechargeConst.FAILURE_NOT_REP;
		}
		return DailyFirstRechargeConst.SUCCESS;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_DailyRecharge)) {
			DailyFirstRechargeFunction.getIns().fastSendRedPoint(hero);
		}

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		DailyFirstRecharge dailyFirstRecharge = (DailyFirstRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_DailyRecharge);
		List<Integer> baoXiangList = dailyFirstRecharge.getBaoXiangList();
		int size = baoXiangList.size();
		List<Struct_mrbx_715> mrbxList = Config_mrbx_715.getIns().getSortList();
		for (int i = 0; i < size; i++) {
			Integer integer = baoXiangList.get(i);
			if (integer == DailyFirstRechargeConst.CAN_GET) {
				int[][] award = mrbxList.get(i).getAWARD();
				Object[] contentData = new Object[] { MailConst.MAIL_ID_DAILYFIRSTRECHARGE_AWARD };
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_ID_DAILYFIRSTRECHARGE_AWARD,
						contentData, award);
				baoXiangList.set(i, DailyFirstRechargeConst.GETTED);
			}
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		DailyFirstRecharge dailyFirstRecharge = new DailyFirstRecharge(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		ArrayList<Integer> arrayList = new ArrayList<Integer>();
		int size = Config_mrbx_715.getIns().getSortList().size();
		for (int i = 0; i < size; i++) { // 初始化宝箱列表数据
			arrayList.add(DailyFirstRechargeConst.NOT_REACH);
		}
		dailyFirstRecharge.setBaoXiangList(arrayList);
		return dailyFirstRecharge;
	}

	@Override
	public Class<?> getActivityData() {
		return DailyFirstRecharge.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		int type = Config_shop_011.getIns().get(product_id).getType();
//		if (type == RechargeConst.DAILYDIRECTBUY|| type == RechargeConst.JI_JIN || type == RechargeConst.WEEK_CARD) {// 不算入首充
//			return;
//		}
		DailyFirstRechargeFunction.getIns().addRechargeDay(hero, money);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return DailyFirstRechargeEvent.getIns();
	}

}
