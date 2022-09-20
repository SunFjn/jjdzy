package com.teamtop.cross;

import com.teamtop.system.hero.Hero;

/**
 * 默认的跨服控制做法
 * @author Administrator
 *
 */
public class DefaultCrossControl extends AbsCrossControl{
	@Override
	public boolean reciCG(Hero hero, boolean isCrossServer, int cmd) {
		if (isCrossServer) {
			if(hero.getLocalChannel()!=null){
				return true;
			}
		} else {
			if (hero.getCrossChannel() == null) {
				return true;
			}
		}
		return false;
	}
}
