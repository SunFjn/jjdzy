package com.teamtop.system.activity.ativitys.totalRebate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.totalRebate.model.RebateInfo;
import com.teamtop.system.activity.ativitys.totalRebate.model.TotalRebate;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_chongzhi_716;
import excel.struct.Struct_chongzhi_716;
import excel.struct.Struct_ljfl_772;

public class TotalRebateManager extends AbstractActivityManager {
	private static TotalRebateManager ins = null;

	public static TotalRebateManager getIns() {
		if (ins == null) {
			ins = new TotalRebateManager();
		}
		return ins;
	}

	private TotalRebateManager() {
	}
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (hero == null)
				return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_TOTALREBATE))
				return;
			long hid = hero.getId();
			TotalRebate totalRebate = (TotalRebate) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_TOTALREBATE);//个人数据
			int qs = totalRebate.getPeriods();
			Map<Integer, Struct_ljfl_772> map = TotalRebateCache.rechargeRebateConfig.get(qs);
			Map<Integer, RebateInfo> rebateMap = totalRebate.getRebateMap();
			List<Object[]> rebateList = new ArrayList<>();
			for(Struct_ljfl_772 struct_ljfl_772 : map.values()) {
				int id = struct_ljfl_772.getId();
				RebateInfo rebateInfo = rebateMap.get(id);
				if(rebateInfo == null) {
					rebateList.add(new Object[] {id,TotalRebateConst.PRO,0});
				}else {
					int state = rebateInfo.getState();
					int rebate = rebateInfo.getRebate();
					int baseRebate = rebateInfo.getBaseRebate();
					if(baseRebate > 0) {
						if(state == 0) {
							state = 1;
						}
					}else {
						baseRebate = TotalRebateConst.PRO;
					}
					int total = baseRebate+rebate;
					
//					if(total > struct_ljfl_772.getSx()) {
//						total = struct_ljfl_772.getSx();
//					}
					rebateList.add(new Object[] {id,total,state});
				}
			}
			totalRebate.setTips(1);
			TotalRebateSender.sendCmd_10750(hid, qs, rebateList.toArray());
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "TotalRebateManager.openUI 打开累计充值界面 异常");
		}
	}
	
	public void getAward(Hero hero, int id) {
		try {//state 1.成功 2参数错误 3.领取条件不足 4.已领取
			if (hero == null)
				return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_TOTALREBATE))
				return;
			long hid = hero.getId();
			Struct_chongzhi_716 struct_chongzhi_716 = Config_chongzhi_716.getIns().get(id);
			if(struct_chongzhi_716 == null) {
				TotalRebateSender.sendCmd_10752(hid, 2, id);
				return;
			}
			TotalRebate totalRebate = (TotalRebate) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_TOTALREBATE);//个人数据
			Map<Integer, RebateInfo> rebateMap = totalRebate.getRebateMap();
			RebateInfo rebateInfo = rebateMap.get(id);
			if(rebateInfo == null) {
				TotalRebateSender.sendCmd_10752(hid, 3, id);
				return;
			}
			if(rebateInfo.getState() == 2) {
				TotalRebateSender.sendCmd_10752(hid, 4, id);
				return;
			}
			int baseRebate = rebateInfo.getBaseRebate();
			if(baseRebate == 0) {
				TotalRebateSender.sendCmd_10752(hid, 3, id);
				return;
			}
			int rebate = rebateInfo.getRebate();
			int total = baseRebate+rebate;
			
			int qs = totalRebate.getPeriods();
			Map<Integer, Struct_ljfl_772> map = TotalRebateCache.rechargeRebateConfig.get(qs);
			Struct_ljfl_772 struct_ljfl_772 = map.get(id);
			if(struct_ljfl_772 == null) return;
//			if(total > struct_ljfl_772.getSx()) {
//				total = struct_ljfl_772.getSx();
//			}
			int coin = struct_chongzhi_716.getCOIN();
			int yuanbao = coin*total/100;
			
			boolean canAdd = UseAddUtil.canAdd(hero, GameConst.YUANBAO, yuanbao);
			if(canAdd){
				rebateInfo.setState(2);
				UseAddUtil.add(hero, GameConst.YUANBAO, yuanbao, SourceGoodConst.TOTALREBATE_ADD, true);
				TotalRebateSender.sendCmd_10752(hid, 1, id);
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "TotalRebateManager.getAward 领取累计充值奖励 异常");
		}
	}
	
	@Override
	public void actOpen() {
	}

	@Override
	public void heroActOpen(Hero hero) {
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {
		//TotalRebateFunction.getIns().heroActEnd(hero);//活动结束取消补发
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		TotalRebate totalRebate = new TotalRebate(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(), activityInfo.getPeriods());
		totalRebate.setRebateMap(new HashMap<Integer, RebateInfo>());
		totalRebate.setTips(0);
		return totalRebate;
	}

	@Override
	public Class<?> getActivityData() {
		return TotalRebate.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_TOTALREBATE))
			return;
		ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.ACT_TOTALREBATE);
		if(activityInfo != null) {
			int endTime = activityInfo.getEndTime();
			int time = TimeDateUtil.getCurrentTime();
			if(endTime-time <= TotalRebateConst.COUNTDOWN) {
				int qs = activityInfo.getPeriods();
				Map<Integer, Struct_ljfl_772> qsMap = TotalRebateCache.rechargeRebateConfig.get(qs);
				if(qsMap != null) {
					Struct_ljfl_772 struct_ljfl_772 = qsMap.get(product_id);
					if(struct_ljfl_772 != null) {
						TotalRebate totalRebate = (TotalRebate) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_TOTALREBATE);//个人数据
						Map<Integer, RebateInfo> rebateMap = totalRebate.getRebateMap();
						RebateInfo rebateInfo = rebateMap.get(product_id);
						if(rebateInfo == null) {
							rebateInfo = new RebateInfo();
							rebateMap.put(product_id, rebateInfo);
						}
						rebateInfo.setBaseRebate(TotalRebateConst.PRO);
						TotalRebateFunction.getIns().rechargeReward(hero, product_id);
						TotalRebateFunction.getIns().updateRedPoint(hero);
					}
				}
			}
		}
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return TotalRebateEvent.getIns();
	}

}
