package com.teamtop.system.openDaysSystem.otherAwayRecharge;

import java.util.HashMap;
import java.util.Map;

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
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;
import excel.config.Config_lxlc2_745;
import excel.config.Config_lxlc3_745;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_lxlc2_745;
import excel.struct.Struct_lxlc3_745;
import excel.struct.Struct_xtcs_004;

public class OtherAwayRechargeManager extends AbsOpenDaysManager {

	private static OtherAwayRechargeManager ins;
	public static OtherAwayRechargeManager getIns(){
		if(ins == null) {
			ins = new OtherAwayRechargeManager();
		}
		return ins;
	}
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_AWAYRECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_AWAYRECHARGE);
			OtherAwayRecharge otherAwayRecharge=(OtherAwayRecharge)getSystemModel(hero, uid);
			
			
			Object[] rewardstate=new Object[otherAwayRecharge.getBigReward().size()];
			int i=0;
			for (Struct_lxlc3_745  lxlc3_745: Config_lxlc3_745.getIns().getSortList()) {
				if (lxlc3_745.getQishu()==otherAwayRecharge.getQs()) {
					Integer state = otherAwayRecharge.getBigReward().get(lxlc3_745.getId());
					if (state!=null) {
						rewardstate[i]=new Object[] {lxlc3_745.getId(),state};
						i++;
					}else {
						otherAwayRecharge.getBigReward().put(lxlc3_745.getId(), GameConst.REWARD_0);
						rewardstate[i]=new Object[] {lxlc3_745.getId(),GameConst.REWARD_0};
						i++;
					}
				}
			}
			rewardstate=CommonUtil.removeNull(rewardstate);
			OtherAwayRechargeSender.sendCmd_7050(hero.getId(), otherAwayRecharge.getTodayRecharge(),otherAwayRecharge.getQs(),otherAwayRecharge.getSuccessNum(),otherAwayRecharge.getTodayRewardSate(), rewardstate);
		} catch (Exception e) {
			LogTool.error(e, OtherAwayRechargeManager.class, "openUI has wrong");
		}
		
	}
	

	public void getreward(Hero hero, int index) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_AWAYRECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_AWAYRECHARGE);
			OtherAwayRecharge otherAwayRecharge=(OtherAwayRecharge)getSystemModel(hero, uid);
			
			Struct_lxlc3_745  lxlc3_745=Config_lxlc3_745.getIns().get(index);
			if (lxlc3_745.getQishu()!=otherAwayRecharge.getQs()) {
				LogTool.warn("lxlc3_745.getQishu()!=otherAwayRecharge.getQs()+id:"+otherAwayRecharge.getHid(), OtherAwayRechargeManager.class);
				return;
			}
			if (otherAwayRecharge.getBigReward().get(index)==GameConst.REWARD_1) {
				if (UseAddUtil.canAdd(hero, lxlc3_745.getJiangli(), false)) {
					UseAddUtil.add(hero, lxlc3_745.getJiangli(), SourceGoodConst.AYRECHARGE_REWARD, null, true);
					otherAwayRecharge.getBigReward().put(index, GameConst.REWARD_2);
					OtherAwayRechargeSender.sendCmd_7052(hero.getId(), index, GameConst.REWARD_2);
					return;
				}
			}
			OtherAwayRechargeSender.sendCmd_7052(hero.getId(), index,otherAwayRecharge.getBigReward().get(index));
			return;
		} catch (Exception e) {
			LogTool.error(e,  OtherAwayRechargeManager.class, "getreward has wrong");
		}
		
		
	}

	public void gettodayRew(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_AWAYRECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_AWAYRECHARGE);
			OtherAwayRecharge otherAwayRecharge=(OtherAwayRecharge)getSystemModel(hero, uid);
			if (otherAwayRecharge.getTodayRewardSate()!=GameConst.REWARD_1) {
				LogTool.warn("otherAwayRecharge.getTodayRewardSate()!=GameConst.REWARD_1", OtherAwayRechargeManager.class);
				return;
			}
			int periods = otherAwayRecharge.getQs();
			int rewardId=0;
			if (periods==1) {
				rewardId=OtherAwayRechargeConst.QISHU_1;
			}else if (periods==2) {
				rewardId=OtherAwayRechargeConst.QISHU_2;
			}else if (periods==3) {
				rewardId=OtherAwayRechargeConst.QISHU_3;
			}
			if (rewardId==0) {
				LogTool.warn("rewardId==0 has wrong", OtherAwayRechargeManager.class);
				return;
			}
			
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(rewardId);
			int[][] reward = struct_xtcs_004.getOther();
			if (UseAddUtil.canAdd(hero, reward, false)) {
				otherAwayRecharge.setTodayRewardSate(GameConst.REWARD_2);
				UseAddUtil.add(hero, reward, SourceGoodConst.AWAYRECHARGE, null, true);
				OtherAwayRechargeSender.sendCmd_7056(hero.getId(), otherAwayRecharge.getTodayRewardSate(),otherAwayRecharge.getTodayRecharge());
				return;
			}
			OtherAwayRechargeSender.sendCmd_7056(hero.getId(), otherAwayRecharge.getTodayRewardSate(),otherAwayRecharge.getTodayRecharge());
			return;
		} catch (Exception e) {
			LogTool.error(e,  OtherAwayRechargeManager.class, "gettodayRew has wrong");
		}
		
	}

	@Override
	public void handleOpenPub() {
		
		
	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		
		
	}

	@Override
	public void handleEndPub() {
		
		
	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		OtherAwayRecharge otherAwayRecharge = (OtherAwayRecharge) opSysDataMap.get(uid);
		
		otherAwayRecharge.setTodayRecharge(0);
		otherAwayRecharge.setTodayIsSuccess(0);
		otherAwayRecharge.setSuccessNum(0);
		if (otherAwayRecharge.getBigReward()==null) {
			otherAwayRecharge.setBigReward(new HashMap<>());
		}
		for(Struct_lxlc2_745 sortList:Config_lxlc2_745.getIns().getSortList()) {
			if (!otherAwayRecharge.getBigReward().containsKey(sortList.getId())) {
				continue;
			}else if(otherAwayRecharge.getBigReward().get(sortList.getId())==GameConst.REWARD_1
					&&otherAwayRecharge.getQs()==sortList.getQishu()) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.NEW_AWAYRECHARGE_BIG,
						new Object[] { MailConst.NEW_AWAYRECHARGE_BIG}, sortList.getJiangli());
			}
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		OtherAwayRecharge otherAwayRecharge = (OtherAwayRecharge) opSysDataMap.get(uid);
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int qs = struct_hdfl_012.getQs();
		if (otherAwayRecharge==null) {
			otherAwayRecharge= new OtherAwayRecharge();
			otherAwayRecharge.setHid(hero.getId());
			otherAwayRecharge.setTodayRecharge(0);
			otherAwayRecharge.setTodayIsSuccess(0);
			otherAwayRecharge.setSuccessNum(0);
			if (otherAwayRecharge.getBigReward()==null) {
				otherAwayRecharge.setBigReward(new HashMap<>());
			}
			for(Struct_lxlc3_745 sortList:Config_lxlc3_745.getIns().getSortList()) {
				if (sortList.getQishu()==qs) {
					otherAwayRecharge.getBigReward().put(sortList.getId(), GameConst.REWARD_0);
				}
			}
		}
		return otherAwayRecharge;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return OtherAwayRecharge.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return OtherAwayRechargeEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_AWAYRECHARGE)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_AWAYRECHARGE);
		OtherAwayRecharge otherAwayRecharge=(OtherAwayRecharge)getSystemModel(hero, uid);
		
		otherAwayRecharge.setTodayRecharge(otherAwayRecharge.getTodayRecharge()+money);
		int value=Config_xtcs_004.getIns().get(3201).getNum();
		if (otherAwayRecharge.getTodayRecharge()>=value&&otherAwayRecharge.getTodayIsSuccess()==0) {
			otherAwayRecharge.setSuccessNum(otherAwayRecharge.getSuccessNum()+1);
			otherAwayRecharge.setTodayIsSuccess(1);
			otherAwayRecharge.setTodayRewardSate(GameConst.REWARD_1);
			
			for(Struct_lxlc3_745 sortList:Config_lxlc3_745.getIns().getSortList()) {
				if(otherAwayRecharge.getSuccessNum()>=sortList.getTianshu()
						&&otherAwayRecharge.getQs()==sortList.getQishu()&&(otherAwayRecharge.getBigReward().get(sortList.getId())==GameConst.REWARD_0)) {
					otherAwayRecharge.getBigReward().put(sortList.getId(), GameConst.REWARD_1);
					OtherAwayRechargeSender.sendCmd_7054(hero.getId(), otherAwayRecharge.getSuccessNum(), sortList.getId(), GameConst.REWARD_1);
				}
			}
			OtherAwayRechargeSender.sendCmd_7056(hero.getId(), otherAwayRecharge.getTodayRewardSate(),otherAwayRecharge.getTodayRecharge());
		}
		return;
		
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub
		
	}


}
