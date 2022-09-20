package com.teamtop.system.activity.ativitys.totalRebate;

import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.totalRebate.model.RebateInfo;
import com.teamtop.system.activity.ativitys.totalRebate.model.TotalRebate;
import com.teamtop.system.event.useAddEvent.AbsAddHandleEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;

import excel.config.Config_daoju_204;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_ljfl_772;

public class TotalRebateAddEvent extends AbsAddHandleEvent {

	@Override
	public void addFunctionHandle(Hero hero, int type, int itemId, long num) {
		Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(itemId);
		if(struct_daoju_204 != null) {
			if(ActivitySysId.ACT_TOTALREBATE==struct_daoju_204.getSys() && TotalRebateConst.LEIXING==struct_daoju_204.getLeixing()) {
				if(UseAddUtil.canUse(hero, type, (int)num, itemId)) {
					UseAddUtil.use(hero,GameConst.TOOL, (int)num, itemId, SourceGoodConst.TOTALREBATE_DEL, true);//不进背包，此处删除
				}
				
				if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_TOTALREBATE)) return;
				
				TotalRebate totalRebate = (TotalRebate) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_TOTALREBATE);//个人数据
				if(totalRebate == null) return;
				int qs = totalRebate.getPeriods();
				Map<Integer, Struct_ljfl_772> map = TotalRebateCache.itemRebateConfig.get(qs);
				if(map != null) {
					Struct_ljfl_772 struct_ljfl_772 = map.get(itemId);
					if(struct_ljfl_772 != null) {
						int id = struct_ljfl_772.getId();
						Map<Integer, RebateInfo> rebateMap = totalRebate.getRebateMap();
						RebateInfo rebateInfo = rebateMap.get(id);
						if(rebateInfo == null) {
							rebateInfo = new RebateInfo();
							rebateMap.put(id, rebateInfo);
						}
						rebateInfo.addRebate((int)num);
//						if(rebateInfo.getState() == 0) {
//							int sx = struct_ljfl_772.getSx();
//							int total = rebateInfo.getBaseRebate()+rebateInfo.getRebate()+(int)num;
//							if(total < sx) {
//								rebateInfo.addRebate((int)num);
//							}else {
//								int rebate = sx-TotalRebateConst.PRO;
//								rebateInfo.setRebate(rebate);
//							}
//						}
					}
				}
			}
		}
	}

}
