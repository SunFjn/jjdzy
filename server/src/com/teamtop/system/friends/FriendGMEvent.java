package com.teamtop.system.friends;

import com.teamtop.system.gm.AbsGMEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;

public class FriendGMEvent extends AbsGMEvent {

	private static FriendGMEvent ins;
	public static FriendGMEvent getIns(){
		if(ins == null) {
			ins = new FriendGMEvent();
		}
		return ins;
	}
	
	@Override
	public void gm(Hero hero, int type, String[] param) {
		long id = Long.parseLong(param[0]);
		Hero hero2=HeroCache.getHero(id);
		/*if (FriendFunction.getIns().addEnemyFriends(hero, id, hero2.getName())) {
			FriendFunction.getIns().addEnemyFriendsED(hero2, hero.getId());
		}*/
	}

}
