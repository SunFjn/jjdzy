package com.teamtop.redeploy;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.redeploy.cross.RedeployLocalToCross;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.gm.AbsGMEvent;
import com.teamtop.system.hero.Hero;
/**
 * 热更GM，在内测服热更其他服
 * @author Administrator
 *
 */
public class RedeployDeployGMEvent extends AbsGMEvent {
	private static RedeployDeployGMEvent ins = null;
	
	public static RedeployDeployGMEvent getIns() {
		if (ins == null) {
			ins = new RedeployDeployGMEvent();
		}
		return ins;
	}
	
	@Override
	public void gm(Hero hero, int type, String[] param) {
		List<Integer> zonelist = new ArrayList<Integer>();
		int start = Integer.parseInt(param[0]);
		int end = Integer.parseInt(param[1]);
		for(int i=start;i<=end;i++){
			if(!zonelist.contains(new Integer(i))){
				zonelist.add(i);
			}
		}
		boolean success = RedeployLocalToCross.hotSwapByZIDListLC(zonelist, GameProperties.platform);
		if(!success){
			GlobalSender.sendCmd_260(hero.getId(), 1, "热更其他正式服报错");
		}
	}
}
