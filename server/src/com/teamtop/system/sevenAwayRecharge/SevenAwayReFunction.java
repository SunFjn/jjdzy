package com.teamtop.system.sevenAwayRecharge;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lxlc1_728;
import excel.struct.Struct_lxlc1_728;

public class SevenAwayReFunction {
	
	private static SevenAwayReFunction ins;
	public static SevenAwayReFunction getIns(){
		if(ins == null) {
			ins = new SevenAwayReFunction();
		}
		return ins;
	}
	
	public void sendOldSysReward(Hero hero) {
		try {
			for(Struct_lxlc1_728 sortList:Config_lxlc1_728.getIns().getSortList()) {
				if(hero.getSevenAwayRecharge().getReward().get(sortList.getId())==GameConst.REWARD_1) {
					hero.getSevenAwayRecharge().getReward().put(sortList.getId(), GameConst.REWARD_2);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.AWAYRECHARGE_REWARD,
							new Object[] { MailConst.AWAYRECHARGE_REWARD}, sortList.getJiangli());
					LogTool.info("sendOldSysReward:"+hero.getId()+" name:"+hero.getName(), SevenAwayReFunction.class);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SevenAwayReFunction.class, "SevenAwayReFunction");
		}
	}
	
	

}
