package com.teamtop.system.country;

import com.teamtop.system.country.model.CountryData;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

import excel.config.Config_juanxian_712;
import excel.struct.Struct_juanxian_712;

public class CountryEvent extends AbsSystemEvent {
	public static CountryEvent ins;

	public static CountryEvent getIns() {
		if (ins == null) {
			ins = new CountryEvent();
		}
		return ins;
	}

	private CountryEvent() {
	}

	@Override
	public void init(Hero hero) {
		if (hero.getCountryData() == null) {
			hero.setCountryData(new CountryData(hero.getId()));
		}
	}

	@Override
	public void login(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, CountryConst.JUANXIAN_SYSID)) {
			CountryFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		if (HeroFunction.getIns().checkSystemOpen(hero, CountryConst.JUANXIAN_SYSID)) {
			resetJuanXian(hero);
		}
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		if (HeroFunction.getIns().checkSystemOpen(hero, CountryConst.JUANXIAN_SYSID)) {
			loginReset(hero, now);
			CountryFunction.getIns().fastSendRedPoint(hero);
		}

	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		resetJuanXian(hero);
		CountryFunction.getIns().fastSendRedPoint(hero);
	}

	/**
	 * 充值捐献次数
	 * 
	 * @param hero
	 */
	public void resetJuanXian(Hero hero) {
		for (Struct_juanxian_712 struct_juanxian_712 : Config_juanxian_712.getIns().getMap().values()) {
			if (struct_juanxian_712.getID() == 1) {
				hero.getCountryData().setCoinDonationTimes(struct_juanxian_712.getNUM());
			} else if (struct_juanxian_712.getID() == 2) {
				hero.getCountryData().setYbDonationTimes(struct_juanxian_712.getNUM());
			}
		}
	}

}
