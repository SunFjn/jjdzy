package com.teamtop.system.baoWuXianShi;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bwxs_740;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_bwxs_740;
import excel.struct.Struct_xtcs_004;

public class BaoWuXianShiManager {
	
	private static BaoWuXianShiManager ins;
	public static BaoWuXianShiManager getIns(){
		if(ins == null) {
			ins = new BaoWuXianShiManager();
		}
		return ins;
	}
	
	public void loginData(Hero hero) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.BAO_WU_XIAN_SHI);
		if( !checkSystemOpen)
			return;
		BaoWuXianShi baoWuXianShi = hero.getBaoWuXianShi();
		int numGetToday = baoWuXianShi.getNumGetToday();
		int timeGeted = baoWuXianShi.getTimeGeted();
		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(XTCS004Const.BAO_WU_XIAN_SHI_AWARDS_NUM);
		int awardsNumMax = excel.getNum();
		Struct_xtcs_004 excelTime = Config_xtcs_004.getIns().get(XTCS004Const.BAO_WU_XIAN_SHI_NEXT_TIME);
		int oneTime = excelTime.getNum();
		
		BaoWuXianShiSender.sendCmd_4000(hero.getId(), timeGeted+oneTime, awardsNumMax-numGetToday);
	}
	
	public void getAwards(Hero hero, int type) {
		List<Object[]> dropTips = new ArrayList<Object[]>();
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.BAO_WU_XIAN_SHI);
		if( !checkSystemOpen){
			//系统未开启
			BaoWuXianShiSender.sendCmd_4002(hero.getId(), 2, dropTips.toArray());
			return;
		}

		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(XTCS004Const.BAO_WU_XIAN_SHI_AWARDS_NUM);
		int awardsNumMax = excel.getNum();
		BaoWuXianShi baoWuXianShi = hero.getBaoWuXianShi();
		int numGetToday = baoWuXianShi.getNumGetToday();
		if(numGetToday>= awardsNumMax) {
			//今日领奖励次数已搭上限
			BaoWuXianShiSender.sendCmd_4002(hero.getId(), 3, dropTips.toArray());
			return ;
		}
		Struct_xtcs_004 excelTime = Config_xtcs_004.getIns().get(XTCS004Const.BAO_WU_XIAN_SHI_NEXT_TIME);
		int oneTime = excelTime.getNum();
		int timeGeted = baoWuXianShi.getTimeGeted();
		int timeNow = TimeDateUtil.getCurrentTime();
		if(timeNow< timeGeted + oneTime) {
			//还在冷却中
			BaoWuXianShiSender.sendCmd_4002(hero.getId(), 4, dropTips.toArray());
			return ;
		}
		
		Struct_bwxs_740 excelBoss = Config_bwxs_740.getIns().get(1);
		int[][] boss = excelBoss.getBoss();
		int npcid = boss[0][1];
		int checkResult = BattleFunction.checkWinBoss(hero, npcid, BattleConst.OTHER);
		if (checkResult == 2) {
			checkResult = type;
		}
		if( checkResult == BattleConst.RESULT_ATT_WIN) {
			List<int[]> dropArr = new ArrayList<int[]>();
			List<ProbabilityEventModel> bossAwards = BaoWuXianShiCache.getBossAwards();
			int size = bossAwards.size();
			for (int a = 0; a < size; a++) {
				ProbabilityEventModel pe = bossAwards.get(a);
				int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
				if (js != null) {
					int typeGoods = js[0];
					if (typeGoods == GameConst.GENDROP) {
						int num = js[2];
						ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
						for (int j = 1; j <= num; j++) {
							js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
							dropArr.add(js);
							dropTips.add(new Object[] { js[0], js[1], js[2] });
							
							ChatManager.getIns().broadCast(ChatConst.CROSS_BAO_WU_XIAN_SHI, new Object[] { hero.getName(), js[1] });
						}
					} else {
						dropArr.add(js);
						dropTips.add(new Object[] { js[0], js[1], js[2] });
						ChatManager.getIns().broadCast(ChatConst.CROSS_BAO_WU_XIAN_SHI, new Object[] { hero.getName(), js[1] });
					}
				}
			}

			baoWuXianShi.setNumGetToday(numGetToday+1);
			baoWuXianShi.setTimeGeted(timeNow);
			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			UseAddUtil.add(hero, drops, SourceGoodConst.BAO_WU_XIAN_SHI, UseAddUtil.getDefaultMail(), false);
			BaoWuXianShiSender.sendCmd_4002(hero.getId(), 1, dropTips.toArray());
		}else {
			//战败
			BaoWuXianShiSender.sendCmd_4002(hero.getId(), 5, dropTips.toArray());
		}
		loginData(hero);
	}
	

}
