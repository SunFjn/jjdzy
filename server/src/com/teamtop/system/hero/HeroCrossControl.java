package com.teamtop.system.hero;

import com.teamtop.cross.AbsCrossControl;
/**
 * 协议100-200的跨服控制
 * @author Administrator
 *
 */
public class HeroCrossControl extends AbsCrossControl {

	@Override
	public boolean reciCG(Hero hero, boolean isCrossServer, int cmd) {
		if(isCrossServer){
//			if(cmd==HeroCmd.CG_LookOtherHero_113 || cmd==HeroCmd.CG_GetHeartBeat_181){
//				return true;
//			}
			return false;
		}else{
//			if(hero.getCrossChannel()!=null && cmd==HeroCmd.CG_LookOtherHero_113) return false;
			//子服
			return true;
		}
	}
}
