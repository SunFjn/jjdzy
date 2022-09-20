package com.teamtop.system.compound;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_compose_245;
import excel.struct.Struct_compose_245;

public class CompoundManager {
	private static CompoundManager ins = null;

	public static CompoundManager getIns() {
		if (ins == null) {
			ins = new CompoundManager();
		}
		return ins;
	}

	public void heceng(Hero hero, int goal, int num) {
		try {
			if (num<=0) {
				return;
			}
			Struct_compose_245 compose_245=Config_compose_245.getIns().get(goal);
			int vipExcel = compose_245.getVip();
			int vipLv = hero.getVipLv();
			if(vipExcel>vipLv) {
				CompoundSender.sendCmd_2652(hero.getId(), 2, goal, num);
				return;
			}
			
			int[][] Consume=CommonUtil.copyArrayAndNum(compose_245.getItem(), num);
			if(UseAddUtil.canUse(hero, Consume)) {
				UseAddUtil.use(hero, Consume, SourceGoodConst.COST_HECHENG, true);
				UseAddUtil.add(hero, GameConst.TOOL, num, goal, null, SourceGoodConst.INCOME_HECHENG, true);
				CompoundSender.sendCmd_2652(hero.getId(), 0, goal, num);
				return;
			}
			CompoundSender.sendCmd_2652(hero.getId(), 1, goal, num);
			return;
		} catch (Exception e) {
			LogTool.error(e, CompoundManager.class, "heceng has wrong");
		}
		
	}
	
	
	
}
