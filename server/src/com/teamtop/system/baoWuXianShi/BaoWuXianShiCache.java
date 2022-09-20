package com.teamtop.system.baoWuXianShi;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_bwxs_740;
import excel.struct.Struct_bwxs_740;

public class BaoWuXianShiCache extends AbsServerEvent{
	private static BaoWuXianShiCache ins = null;

	public static  BaoWuXianShiCache getIns() {
		if (ins == null) {
			ins = new BaoWuXianShiCache();
		}
		return ins;
	}
	/**	 * BOSS掉落奖励	 */
	private static List<ProbabilityEventModel> bossAwards = new ArrayList<ProbabilityEventModel>();
	
	@Override
	public void startServer() throws RunServerException {
		
	}

	@Override
	public void initExcel() throws RunServerException {
		Struct_bwxs_740 excel = Config_bwxs_740.getIns().get(1);
		List<ProbabilityEventModel> data = ExcelJsonUtils.getGeneralDropData(excel.getJiangli());
		bossAwards=data;
	}
	public static List<ProbabilityEventModel> getBossAwards() {
		return bossAwards;
	}
	public static void setBossAwards(List<ProbabilityEventModel> bossAwards) {
		BaoWuXianShiCache.bossAwards = bossAwards;
	}

}
