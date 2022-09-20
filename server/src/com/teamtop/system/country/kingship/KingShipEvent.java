package com.teamtop.system.country.kingship;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.country.CountryFunction;
import com.teamtop.system.country.CountrySysCache;
import com.teamtop.system.country.kingship.model.KingShipData;
import com.teamtop.system.country.kingship.model.KingShipModel;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_wwzd_227;
import excel.struct.Struct_chenghao_702;

public class KingShipEvent extends AbsSystemEvent {

	public static KingShipEvent ins;

	public static KingShipEvent getIns() {
		if (ins == null) {
			ins = new KingShipEvent();
		}
		return ins;
	}

	private KingShipEvent() {
	}

	/*
	 * 零点重置
	 */
	@Override
	public void zeroHero(Hero hero, int now) {
		loginReset(hero, now);
	}

	/**
	 * 王位之争开启处理
	 */
	public void fixTimeStart() {
		ConcurrentHashMap<Integer, Country> countryMap = CountrySysCache.getCountryCache().getCountryMap();
		for (Country country : countryMap.values()) {
			removeTitle(country);
			country.getKingShipModelList().clear();
			country.getKingShiplGuardList().clear();
			country.getJoinKingShipMap().clear();
			// 将前20战力的玩家加入到参与缓存中
			KingShipFunction.getIns().initJoinKingShipMap(country.getCid());
		}
		KingShipCache.isWWStartTime = true;
		Collection<Hero> values = HeroCache.getHeroMap().values();
		for (Hero hero : values) {// 王位之争开启红点
			if (hero.getCountryType() != 0
					&& HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
				KingShipManager.getIns().openUIKingShip(hero);
				KingShipFunction.getIns().startRedPoint(hero, false);
			}
		}
	}

	/**
	 * 王位之争关闭处理
	 */
	public void fixTimeEnd() {
		KingShipCache.isWWStartTime = false;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				ConcurrentHashMap<Integer, Country> countryMap = CountrySysCache.getCountryCache().getCountryMap();
				for (Country country : countryMap.values()) {
					List<Struct_chenghao_702> list = KingShipCache.getKsTitleConfig().get(country.getCid());
					Iterator<Struct_chenghao_702> iterator = list.iterator();
					List<KingShipModel> kingShipModelList = country.getKingShipModelList();
					for (KingShipModel kingShipModel : kingShipModelList) {
						if (iterator.hasNext()) {
							TitleFunction.getIns().addTitle(kingShipModel.getId(), iterator.next().getID());
						}
					}
					country.getJoinKingShipMap().clear();
				}
				CountryFunction.getIns().kingShipDatatoDB();
			}

			@Override
			public Object getSession() {
				return OpTaskConst.KINGSHIP_KEY;
			}
		});

		Collection<Hero> values = HeroCache.getHeroMap().values();
		for (Hero hero : values) {// 王位之争关闭红点
			if (hero.getCountryType() != 0
					&& HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
				KingShipManager.getIns().openUIKingShip(hero);
				KingShipFunction.getIns().endRedPoint(hero, false);
			}
		}
	}

	/*
	 * 从开服开始每三天一轮换，每三天的第一天19.30-20.30开启
	 */
	@Override
	public void fixTime(int cmdId, int now) {
//		int betweenOpen = TimeDateUtil.betweenOpen();
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (cmdId == 1) { // 每周一10:00开启
//			if (betweenOpen % KingShipConst.KINGSHIP_ROUND == 1) {// 周期第一天
//			}
			if (KingShipFunction.getIns().isStartWeek()) {
				fixTimeStart();
			}
		}
		if (cmdId == 2) {// 每周一22:00关闭
//			if (betweenOpen % KingShipConst.KINGSHIP_ROUND == 1) {// 周期第一天
//			}
			if (KingShipFunction.getIns().isStartWeek()) {
				fixTimeEnd();
				sendBXAwardMailFixTime();
			}
		}
		if (cmdId == 3) {// 每天00:00
//			if (betweenOpen % KingShipConst.KINGSHIP_ROUND == 1) {// 周期第一天
//			}
			if (KingShipFunction.getIns().isStartWeek()) {
				ConcurrentHashMap<Integer, Country> countryMap = CountrySysCache.getCountryCache().getCountryMap();
				for (Country country : countryMap.values()) {
					removeTitle(country);
					country.getKingShipModelList().clear();
					country.getJoinKingShipMap().clear();
					country.getKingShiplGuardList().clear();
				}
				CountryFunction.getIns().kingShipDatatoDB();
			} else {
				Collection<Hero> values = HeroCache.getHeroMap().values();
				for (Hero hero : values) {// 王位之争关闭红点
					if (hero.getCountryType() != 0
							&& HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
						KingShipFunction.getIns().endRedPoint(hero, false);
					}
				}
			}
		}

	}

	@Override
	public void init(Hero hero) {
		KingShipData kingShipData = hero.getCountryData().getKingShipData();
		if (kingShipData == null) {
			kingShipData = new KingShipData();
			kingShipData.setMobai(new HashMap<Integer, Long>());
			hero.getCountryData().setKingShipData(kingShipData);
		}
		Map<Integer, Integer> bxAwardMap = kingShipData.getBXAwardMap();
		if (bxAwardMap == null) {
			kingShipData.setBXAwardMap(new ConcurrentHashMap<>());
		}
	}

	@Override
	public void login(Hero hero) {
		if (hero.getCountryType() != 0 && HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			KingShipFunction.getIns().startRedPoint(hero, true);// 王位之争开启红点
			KingShipFunction.getIns().endRedPoint(hero, true);// 王位之争关闭红点
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		if (hero.getCountryType() != 0 && HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			sendBXAwardMail(hero);
			KingShipFunction.getIns().resetKingShipData(hero);
		}
	}

	@Override
	public void logout(Hero hero) { // 掉线登出判输
		// TODO Auto-generated method stub
		KingShipManager.getIns().fightEnd(hero, 2);
	}

	/**
	 * 取消称号
	 * 
	 * @param country
	 */
	public void removeTitle(Country country) {
		// 取消君主、丞相、大将军称号
		List<Struct_chenghao_702> list = KingShipCache.getKsTitleConfig().get(country.getCid());
		List<KingShipModel> kingShipModelList = country.getKingShipModelList();
		for (int i = 0; i < kingShipModelList.size(); i++) {
			KingShipModel kingShipModel = kingShipModelList.get(i);
			TitleFunction.getIns().removeTitle(kingShipModel.getId(), list.get(i).getID());
		}
		// 取消皇城侍卫称号
		List<KingShipModel> kingShiplGuardList = country.getKingShiplGuardList();
		for (int i = 0; i < kingShiplGuardList.size(); i++) {
			KingShipModel kingShipModel = kingShiplGuardList.get(i);
			TitleFunction.getIns().removeTitle(kingShipModel.getId(), KingShipConst.KINGSHIP_TITLE);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (hero.getCountryType() != 0) {
			KingShipFunction.getIns().startRedPoint(hero, false);
			KingShipFunction.getIns().endRedPoint(hero, false);
		}
	}

	/**
	 * 补发邮件(FixTime调用)
	 */
	public void sendBXAwardMailFixTime() {
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			if (hero.getCountryType() != 0
					&& HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
				sendBXAwardMail(hero);
			}
		}
	}

	/**
	 * 补发邮件
	 * 
	 * @param hero
	 */
	public void sendBXAwardMail(Hero hero) {
		Map<Integer, Integer> bxAwardMap = hero.getCountryData().getKingShipData().getBXAwardMap();
		for (Map.Entry<Integer, Integer> entry : bxAwardMap.entrySet()) {
			if (entry.getValue() == KingShipConst.CAN_GET) {
				try {
					int[][] reward = Config_wwzd_227.getIns().get(entry.getKey()).getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_KINGSHIP_BXAWARD,
							new Object[] { MailConst.MAIL_KINGSHIP_BXAWARD }, reward);
				} catch (Exception e) {
					// TODO: handle exception
					LogTool.error(e, KingShipEvent.class, hero.getId(), hero.getName(),
							"sendBXAwardMail has wrong" + "key:" + entry.getKey());
				}
			}
		}
		bxAwardMap.clear();
	}
}
