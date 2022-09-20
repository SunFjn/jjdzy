package com.teamtop.system.openDaysSystem.offlineNewDayRecharge;

import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;

import excel.config.Config_xxdrlc1_781;
import excel.config.Config_xxdrlcyb_781;
import excel.struct.Struct_xxdrlc1_781;
import excel.struct.Struct_xxdrlcyb_781;

public class OfflineNewDayRechargeManager/* extends AbsOpenDaysManager*/{

	
	private static OfflineNewDayRechargeManager ins;
	public static OfflineNewDayRechargeManager getIns(){
		if(ins == null) {
			ins = new OfflineNewDayRechargeManager();
		}
		return ins;
	}
	
	/** 重置前执行  */
	public void sendMailYB(Hero hero) {
		if(HeroFunction.getIns().checkSystemOpen(hero,SystemIdConst.OFFLINE_DAILY_YB)) {
			int total = hero.getOneDayRecharge();
			if(total>0) {
				List<Struct_xxdrlcyb_781> list = Config_xxdrlcyb_781.getIns().getSortList();
				for (Struct_xxdrlcyb_781 struct_xxdrlcyb_781 : list) {
					if(struct_xxdrlcyb_781.getMin()<=total && total<=struct_xxdrlcyb_781.getMax()) {
						int yuanbao = (int)Math.floor(total*(500*struct_xxdrlcyb_781.getReward()/100));
						int [] r = new int[] {GameConst.YUANBAO,0,yuanbao};
						int[][] reward = new int[][] {r}; 
						int mailSysId = MailConst.OFFLINE_DAILY_TATAL_YB;
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailSysId,
								new Object[] { mailSysId, total, struct_xxdrlcyb_781.getReward()}, reward);
					}
				}
			}
		}
	}
	
	/** 在设置money属性后调用  用于发送线下道具奖励邮件*/
	public void rechargeHandle(Hero hero, int money) {
		if(HeroFunction.getIns().checkSystemOpen(hero,SystemIdConst.OFFLINE_DAILY_DAOJU)) {
			int total = hero.getOneDayRecharge();
			List<Struct_xxdrlc1_781> list = Config_xxdrlc1_781.getIns().getSortList();
			for (Struct_xxdrlc1_781 struct_xxdrlc1_781 : list) {
				if(total>=struct_xxdrlc1_781.getCoin() && total-money<struct_xxdrlc1_781.getCoin()) {
					int mailSysId = MailConst.OFFLINE_DAILY_TATALRECHARGE;
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailSysId,
							new Object[] { mailSysId, struct_xxdrlc1_781.getCoin() }, struct_xxdrlc1_781.getReward());
				}
			}
		}
	}
/*
	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		
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
		// TODO Auto-generated method stub
		
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return OfflineNewDayRechargeEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub
		
	}
	
*/
}
