package com.teamtop.system.activity.ativitys.scratchTicket;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.scratchTicket.model.ScratchTicketModel;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

public class ScratchTicketFunction {

	private static ScratchTicketFunction ins;

	private ScratchTicketFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ScratchTicketFunction getIns() {
		if (ins == null) {
			ins = new ScratchTicketFunction();
		}
		return ins;
	}
	
	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SCRATCH_TICKET)) {
				return;
			}
			boolean checkRedPoint = checkRedPoint(hero);
			if (checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_SCRATCH_TICKET,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_SCRATCH_TICKET,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
			
		} catch (Exception e) {
			LogTool.error(e, ScratchTicketFunction.class, hero.getId(), hero.getName(), "ScratchTicketFunction updateRedPoint");
		}
	}
	
	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SCRATCH_TICKET)) {
				return false;
			}
			ScratchTicketModel model = (ScratchTicketModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SCRATCH_TICKET);
			if(model.getFreeNum()>0) {
				return true;
			}
			int num = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), ScratchTicketConst.TOOL_ID);
			if (num > 0) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, ScratchTicketFunction.class, hero.getId(), hero.getName(), "ScratchTicketFunction checkRedPoint");
		}
		return false;
	}

}
