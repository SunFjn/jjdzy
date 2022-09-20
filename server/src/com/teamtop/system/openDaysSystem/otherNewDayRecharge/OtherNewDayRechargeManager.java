package com.teamtop.system.openDaysSystem.otherNewDayRecharge;

import java.util.HashMap;

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
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_drlc3_734;
import excel.struct.Struct_drlc3_734;

public class OtherNewDayRechargeManager extends AbsOpenDaysManager {
	
	
	private static OtherNewDayRechargeManager ins;
	public static OtherNewDayRechargeManager getIns(){
		if(ins == null) {
			ins = new OtherNewDayRechargeManager();
		}
		return ins;
	}
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAY_RECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAY_RECHARGE);
			OtherNewDayRecharge newDayRecharge = (OtherNewDayRecharge) getSystemModel(hero, uid);
			int openFuDay = TimeDateUtil.betweenOpen();
			if (!OtherNewDayRechargeCache.newDayRechargeHashMap.containsKey(openFuDay)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, OtherNewDayRechargeEvent.class);
				return;
			}
			HashMap<Integer, Struct_drlc3_734> hashMap = OtherNewDayRechargeCache.newDayRechargeHashMap
					.get(openFuDay);
			Object[] rewardstate=new Object[hashMap.size()];
			int i=0;
			HashMap<Integer, Integer> reward = newDayRecharge.getReward();
			for (Struct_drlc3_734 drlc3_734 : hashMap.values()) {
				Integer state = reward.get(drlc3_734.getId());
				if(state==null) {
					reward.put(drlc3_734.getId(), GameConst.REWARD_0);
				}
				if (newDayRecharge.getReward().get(drlc3_734.getId())==GameConst.REWARD_0&&newDayRecharge.getTodayRecharge()>=drlc3_734.getCoin()) {
					newDayRecharge.getReward().put(drlc3_734.getId(), GameConst.REWARD_1);
					OtherNewDayRechargeSender.sendCmd_4692(hero.getId(), newDayRecharge.getTodayRecharge(), drlc3_734.getId(), GameConst.REWARD_1);
				}
				rewardstate[i] = new Object[] { drlc3_734.getId(),
						reward.get(drlc3_734.getId()) };
				i++;
			}
			OtherNewDayRechargeSender.sendCmd_4690(hero.getId(), newDayRecharge.getTodayRecharge(), rewardstate);
		} catch (Exception e) {
			LogTool.error(e, OtherNewDayRechargeManager.class, hero.getId(), hero.getName(),"openUi has wrong");
		}
		
	}

	public void getReward(Hero hero, int index) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAY_RECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAY_RECHARGE);
			OtherNewDayRecharge newDayRecharge = (OtherNewDayRecharge) getSystemModel(hero, uid);
			int openFuDay = TimeDateUtil.betweenOpen();
			if (!OtherNewDayRechargeCache.newDayRechargeHashMap.containsKey(openFuDay)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, OtherNewDayRechargeEvent.class);
				return;
			}
			HashMap<Integer, Struct_drlc3_734> hashMap = OtherNewDayRechargeCache.newDayRechargeHashMap
					.get(openFuDay);
			if (hashMap.containsKey(index)) {
				Struct_drlc3_734 struct_drlc3_734 = hashMap.get(index);
				if (newDayRecharge.getReward().get(index)==GameConst.REWARD_1) {
					if (UseAddUtil.canAdd(hero, struct_drlc3_734.getReward(), false)) {
						newDayRecharge.getReward().put(index, GameConst.REWARD_2);
						UseAddUtil.add(hero, struct_drlc3_734.getReward(), SourceGoodConst.REWARD_SEDAYRECHARGE, null,
								true);
					}
					OtherNewDayRechargeSender.sendCmd_4692(hero.getId(), newDayRecharge.getTodayRecharge(), index,
							newDayRecharge.getReward().get(index));
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OtherNewDayRechargeManager.class, hero.getId(), hero.getName(),"getreward has wrong index+"+index);
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
		//OtherNewDayRechargeEvent.getIns().zeroHero(hero, 0);
		//int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAY_RECHARGE);
		OtherNewDayRecharge sevenDayRecharge = (OtherNewDayRecharge) OtherNewDayRechargeManager.getIns()
				.getSystemModel(hero, uid);
		sevenDayRecharge.setTodayRecharge(0);
		for (Struct_drlc3_734 drlc3_734 : Config_drlc3_734.getIns().getSortList()) {
			if (sevenDayRecharge.getReward().containsKey(drlc3_734.getId())
					&& sevenDayRecharge.getReward().get(drlc3_734.getId()) == GameConst.REWARD_1) {
				sevenDayRecharge.getReward().put(drlc3_734.getId(), GameConst.REWARD_2);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONEDAYRECAHARE,
						new Object[] { MailConst.ONEDAYRECAHARE }, drlc3_734.getReward());
			}
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		OtherNewDayRecharge othernewDayRecharge = (OtherNewDayRecharge) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if(othernewDayRecharge==null) {
			othernewDayRecharge = new OtherNewDayRecharge();
			othernewDayRecharge.setHid(hero.getId());
			othernewDayRecharge.setReward(new HashMap<>());
			for (Struct_drlc3_734 drlc3_734 : Config_drlc3_734.getIns().getSortList()) {
				othernewDayRecharge.getReward().put(drlc3_734.getId(), GameConst.REWARD_0);
			}
		}
		return othernewDayRecharge;
	}

	@Override
	public Class<?> getSystemModel() {
		return OtherNewDayRecharge.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return OtherNewDayRechargeEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAY_RECHARGE)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAY_RECHARGE);
		OtherNewDayRecharge newDayRecharge = (OtherNewDayRecharge) getSystemModel(hero, uid);
		int openFuDay = TimeDateUtil.betweenOpen();
		if (!OtherNewDayRechargeCache.newDayRechargeHashMap.containsKey(openFuDay)) {
			LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, OtherNewDayRechargeManager.class);
			return;
		}
		boolean isChargeNum=false;
		newDayRecharge.setTodayRecharge(newDayRecharge.getTodayRecharge()+money);
		HashMap<Integer, Struct_drlc3_734> hashMap = OtherNewDayRechargeCache.newDayRechargeHashMap.get(openFuDay);
		for (Struct_drlc3_734 drlc3_734 : hashMap.values()) {
			if (newDayRecharge.getReward().get(drlc3_734.getId())==GameConst.REWARD_0&&newDayRecharge.getTodayRecharge()>=drlc3_734.getCoin()) {
				newDayRecharge.getReward().put(drlc3_734.getId(), GameConst.REWARD_1);
				OtherNewDayRechargeSender.sendCmd_4692(hero.getId(), newDayRecharge.getTodayRecharge(), drlc3_734.getId(), GameConst.REWARD_1);
				isChargeNum=true;
			}
		}
		if (!isChargeNum) {
			OtherNewDayRechargeSender.sendCmd_4692(hero.getId(), newDayRecharge.getTodayRecharge(), 0, 0);
		}
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}
	
	
	
}
