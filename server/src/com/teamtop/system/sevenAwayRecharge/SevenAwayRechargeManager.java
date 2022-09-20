package com.teamtop.system.sevenAwayRecharge;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lxlc1_745;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lxlc1_745;

public class SevenAwayRechargeManager {
	
	private static SevenAwayRechargeManager ins;
	public static SevenAwayRechargeManager getIns(){
		if(ins == null) {
			ins = new SevenAwayRechargeManager();
		}
		return ins;
	}
	
	
	public void openUi(Hero hero) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENAWAYRECHARGE)) return;
			if (hero.getSevenAwayRecharge()==null) {
				return;
			}
			SevenAwayRecharge sevenAwayRecharge=hero.getSevenAwayRecharge();
			Object[] rewardstate=new Object[sevenAwayRecharge.getBigReward().size()];
			int i=0;
			for (int key:sevenAwayRecharge.getBigReward().keySet()) {
				rewardstate[i]=new Object[] {key,sevenAwayRecharge.getBigReward().get(key)};
				i++;
			}
			SevenAwayRechargeSender.sendCmd_2772(hero.getId(), sevenAwayRecharge.getTodayRecharge(), sevenAwayRecharge.getSuccessNum(),sevenAwayRecharge.getTodayRewardSate(), rewardstate);
		} catch (Exception e) {
			LogTool.error(e, SevenAwayRechargeManager.class, hero.getId(), hero.getName(), "openUi has wrong");
		}
		
	}


	public void getreward(Hero hero, int index) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENAWAYRECHARGE)) return;
			if (hero.getSevenAwayRecharge()==null) {
				return;
			}
			SevenAwayRecharge sevenAwayRecharge=hero.getSevenAwayRecharge();
			if (sevenAwayRecharge.getBigReward().containsKey(index)) {
				int state=sevenAwayRecharge.getBigReward().get(index);
				if (state==GameConst.REWARD_1) {
					Struct_lxlc1_745 struct_lxlc1_745 = Config_lxlc1_745.getIns().get(index);
					if(UseAddUtil.canAdd(hero, struct_lxlc1_745.getJiangli(), false)) {
						UseAddUtil.add(hero, struct_lxlc1_745.getJiangli(), SourceGoodConst.SEVENAWAYRECHARGE_REWARD, null, true);
						sevenAwayRecharge.getBigReward().put(index, GameConst.REWARD_2);
						SevenAwayRechargeSender.sendCmd_2774(hero.getId(), index, GameConst.REWARD_2);
						return;
					}
				}
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, SevenAwayRechargeManager.class, hero.getId(), hero.getName(), "openUi has wrong");
		}
		
	}
	/**
	 * 获取今日奖励
	 * @param hero
	 */
	public void gettodayRew(Hero hero) {
		try {
			int[][] reward = Config_xtcs_004.getIns().get(5201).getOther();
			SevenAwayRecharge sevenAwayRecharge=hero.getSevenAwayRecharge();
			if (sevenAwayRecharge.getTodayRewardSate()==GameConst.REWARD_1&&UseAddUtil.canAdd(hero, reward, false)) {
				sevenAwayRecharge.setTodayRewardSate(GameConst.REWARD_2);
				UseAddUtil.add(hero, reward, SourceGoodConst.SEVENAWAYRECHARGE_REWARD, null, true);
				SevenAwayRechargeSender.sendCmd_2778(hero.getId(),sevenAwayRecharge.getTodayRewardSate(),sevenAwayRecharge.getTodayRecharge());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, SevenAwayRechargeManager.class, hero.getId(), hero.getName(), "gettodayRew has wrong");
		}
		
	}
	
	
	

}
