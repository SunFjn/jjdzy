package com.teamtop.system.searchAnimals;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.searchAnimals.model.SearchAnimals;

public class SearchAnimalsEvent extends AbsSystemEvent {

	private static SearchAnimalsEvent searchAnimalsEvent;

	private SearchAnimalsEvent() {
	}

	public static synchronized SearchAnimalsEvent getIns() {
		if (searchAnimalsEvent == null) {
			searchAnimalsEvent = new SearchAnimalsEvent();
		}
		return searchAnimalsEvent;
	}

	@Override
	public void init(Hero hero) {
		SearchAnimals data = hero.getSearchAnimals();
		if (data == null) {
			data = new SearchAnimals();
			data.setHid(hero.getId());
			SearchAnimalsFunction.getIns().initAnimals(data);
			SearchAnimalsFunction.getIns().initScoreAward(data);
			hero.setSearchAnimals(data);
		}
	}

	@Override
	public void login(Hero hero) {
		SearchAnimalsFunction.getIns().loginRed(hero);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		SearchAnimals data = hero.getSearchAnimals();
		data.setFirstTime(0);
	}

}
