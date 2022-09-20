package com.teamtop.system.activity.ativitys.totalRebate;

import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.totalRebate.model.RebateInfo;
import com.teamtop.system.activity.ativitys.totalRebate.model.TotalRebate;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_chongzhi_716;
import excel.struct.Struct_chongzhi_716;
import excel.struct.Struct_ljfl_772;

public class TotalRebateFunction {
	private static TotalRebateFunction ins;

	private TotalRebateFunction() {
	}

	public static TotalRebateFunction getIns() {
		if (ins == null) {
			ins = new TotalRebateFunction();
		}
		return ins;
	}
	
	/**
	 * 登录/激活推送红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_TOTALREBATE)) return;
			TotalRebate totalRebate = (TotalRebate) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_TOTALREBATE);//个人数据
			Map<Integer, RebateInfo> rebateMap = totalRebate.getRebateMap();
			for(RebateInfo rebateInfo : rebateMap.values()) {
				int state = rebateInfo.getState();
				if(state != 2) {
					int baseRebate = rebateInfo.getBaseRebate();
					int rebate = rebateInfo.getRebate();
					if(baseRebate>0 || rebate>0) {
						int tips = totalRebate.getTips();
						if(tips == 0) {
							RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.ACT_TOTALREBATE, RedPointConst.RED_1, RedPointConst.HAS_RED);
							return;
						}
					}
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "TotalRebateFunction loginRed 登录/激活推送红点  异常");
		}
	}
	
	/**
	 * 推送红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_TOTALREBATE)) return;
			TotalRebate totalRebate = (TotalRebate) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_TOTALREBATE);//个人数据
			Map<Integer, RebateInfo> rebateMap = totalRebate.getRebateMap();
			for(RebateInfo rebateInfo : rebateMap.values()) {
				int state = rebateInfo.getState();
				if(state != 2) {
					int baseRebate = rebateInfo.getBaseRebate();
					int rebate = rebateInfo.getRebate();
					if(baseRebate>0 || rebate>0) {
						int tips = totalRebate.getTips();
						if(tips == 0) {
							RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_TOTALREBATE, RedPointConst.RED_1, RedPointConst.HAS_RED);
							return;
						}
					}
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "RollDiceFunction consumeRed 消费推送红点 异常");
		}
	}
	
	/**
	 * 活动结束补发奖励
	 * @param hero
	 */
	public void heroActEnd(Hero hero) {
		if (hero == null) return;
		TotalRebate totalRebate = (TotalRebate) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_TOTALREBATE);//个人数据
		Map<Integer, RebateInfo> rebateMap = totalRebate.getRebateMap();
		for(Entry<Integer,RebateInfo> it : rebateMap.entrySet()) {
			RebateInfo rebateInfo = it.getValue();
			int baseRebate = rebateInfo.getBaseRebate();
			int rebate = rebateInfo.getRebate();
			if(baseRebate>0 || rebate>0) {
				int state = rebateInfo.getState();
				if(state != 2) {
					int total = baseRebate+rebate;
					
					int qs = totalRebate.getPeriods();
					Map<Integer, Struct_ljfl_772> map = TotalRebateCache.rechargeRebateConfig.get(qs);
					int id = it.getKey(); 
					Struct_ljfl_772 struct_ljfl_772 = map.get(id);
					if(struct_ljfl_772 != null) {
						rebateInfo.setState(2);
//						if(total > struct_ljfl_772.getSx()) {
//							total = struct_ljfl_772.getSx();
//						}
						Struct_chongzhi_716 struct_chongzhi_716 = Config_chongzhi_716.getIns().get(id);
						int coin = struct_chongzhi_716.getCOIN();
						int yuanbao = coin*total/100;
						int [] r = new int[] {GameConst.YUANBAO,0,yuanbao};
						int[][] reward = new int[][] {r}; 
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.TOTALREBATE_AWARD, new Object[] { MailConst.TOTALREBATE_AWARD }, reward);
					}
				}
			}
		}
	}
	
	/**
	 * 充值发奖励
	 * @param hero
	 * @param id 充值商品id
	 */
	public void rechargeReward(Hero hero, int id) {
		if (hero == null) return;
		TotalRebate totalRebate = (TotalRebate) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_TOTALREBATE);//个人数据
		Map<Integer, RebateInfo> rebateMap = totalRebate.getRebateMap();
		RebateInfo rebateInfo = rebateMap.get(id);
		int baseRebate = rebateInfo.getBaseRebate();
		int rebate = rebateInfo.getRebate();
		if(baseRebate>0 || rebate>0) {
			int qs = totalRebate.getPeriods();
			Map<Integer, Struct_ljfl_772> map = TotalRebateCache.rechargeRebateConfig.get(qs);
			Struct_ljfl_772 struct_ljfl_772 = map.get(id);
			if(struct_ljfl_772 != null) {
				rebateInfo.setState(2);
				rebateInfo.setRebate(0);
				rebateInfo.setBaseRebate(0);
				
				Struct_chongzhi_716 struct_chongzhi_716 = Config_chongzhi_716.getIns().get(id);
				int coin = struct_chongzhi_716.getCOIN();
				int total = baseRebate+rebate;
				int yuanbao = coin*total/100;
				int [] r = new int[] {GameConst.YUANBAO,0,yuanbao};
				int[][] reward = new int[][] {r}; 
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.TOTALREBATE_AWARD, new Object[] { MailConst.TOTALREBATE_AWARD,struct_chongzhi_716.getRMB(),yuanbao }, reward);
			}
		}
	}
}
