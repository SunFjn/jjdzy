package com.teamtop.system.talent;

import java.util.ArrayList;
import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.talent.model.ShowItem;
import com.teamtop.system.talent.model.Talent;

public class TalentEvent extends AbsSystemEvent {

	private static TalentEvent talentEvent;

	private TalentEvent() {
	}

	public static synchronized TalentEvent getIns() {
		if (talentEvent == null) {
			talentEvent = new TalentEvent();
		}
		return talentEvent;
	}

	@Override
	public void init(Hero hero) {
		Talent talent = hero.getTalent();
		if (talent == null) {
			talent = new Talent();
			talent.setHid(hero.getId());
			talent.setShowItemList(new ArrayList<ShowItem>());
			talent.setAwards(new HashMap<Integer,Integer>());
			hero.setTalent(talent);
		}
	}

	@Override
	public void login(Hero hero) {
		TalentFunction.getIns().loginRed(hero);
	}

}
