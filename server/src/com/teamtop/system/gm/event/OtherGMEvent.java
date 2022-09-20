package com.teamtop.system.gm.event;

import com.teamtop.redeploy.GroovyGMEvent;
import com.teamtop.redeploy.RedeployDeployGMEvent;
import com.teamtop.system.gm.AbsGMEvent;
import com.teamtop.system.hero.Hero;
/**
 * 其他类型的GM事件
 * @author lobbyer
 * @date 2017年3月30日
 */
public class OtherGMEvent extends AbsGMEvent {
	private static OtherGMEvent ins;
	public static OtherGMEvent getIns(){
		if(ins == null) {
			ins = new OtherGMEvent();
		}
		return ins;
	}

	@Override
	public void gm(Hero hero, int type, String[] param) {
		switch (type) {
		case 1:
			//完成当前任务
			break;
		case 2:
			//接取任务
			int taskId = Integer.parseInt(param[0]);
			break;
		case 3:
			//热更
			RedeployDeployGMEvent.getIns().gm(hero, 0, param);
			break;
		case 4:
			//脚本
			GroovyGMEvent.getIns().gm(hero, 0, param);
			break;
		}
	}

}
