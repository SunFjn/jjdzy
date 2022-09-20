package com.teamtop.system.activity.ativitys.hefuRechargeBack;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hfkhczfl_286;
import excel.config.Config_hfkhczfljl_286;
import excel.struct.Struct_hfkhczfl_286;
import excel.struct.Struct_hfkhczfljl_286;

public class HeFuRechargeBackFunction {
	
	public static HeFuRechargeBackFunction ins;
	public static synchronized HeFuRechargeBackFunction getIns() {
		if(ins == null){
			ins = new HeFuRechargeBackFunction();
		}
		return ins;
	}
	
	public void numCharge(Hero hero,int type,int addnum) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_RECHARGEBACK)) {
				return;
			}
			HeFuRechargeBack actData = (HeFuRechargeBack) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_RECHARGEBACK);
			
			int recharge = actData.getRecharge();
			for (Struct_hfkhczfljl_286 struct_hfkhczfljl_286:Config_hfkhczfljl_286.getIns().getSortList()) {
				int taskid=struct_hfkhczfljl_286.getId();
				if (!actData.getReward().contains(taskid)) {
					if (type==taskid/1000) {
						int oldnum = actData.getTaskInfo().get(taskid);
						if (oldnum<struct_hfkhczfljl_286.getCs()) {
							int nowNum=oldnum+addnum;
							if (nowNum>=struct_hfkhczfljl_286.getCs()) {
								nowNum=struct_hfkhczfljl_286.getCs();
							}
							actData.getTaskInfo().put(taskid, nowNum);
							Struct_hfkhczfl_286 hfkhczfl_286 = Config_hfkhczfl_286.getIns().get(taskid/1000);
							if (recharge>=hfkhczfl_286.getCz()) {
								HeFuRechargeBackSender.sendCmd_9524(hero.getId(), taskid, nowNum, GameConst.REWARD_1);
							}else {
								HeFuRechargeBackSender.sendCmd_9524(hero.getId(), taskid, nowNum, GameConst.REWARD_0);
							}
							
						}
						
					}
					
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeFuRechargeBackFunction.class, "numCharge has wrong");
		}
	}

}
