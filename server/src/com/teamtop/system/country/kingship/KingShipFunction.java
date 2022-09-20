package com.teamtop.system.country.kingship;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.country.CountryConst;
import com.teamtop.system.country.CountrySysCache;
import com.teamtop.system.country.kingship.model.KingShipData;
import com.teamtop.system.country.kingship.model.KingShipModel;
import com.teamtop.system.country.kingship.model.KingShipModelMapRankComparator;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.country.model.CountryStrengthRankModel;
import com.teamtop.system.country.newkingship.NewKingShipFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class KingShipFunction {
	private static KingShipFunction kingShipFunction;

	private KingShipFunction() {
	}

	public static synchronized KingShipFunction getIns() {
		if (kingShipFunction == null) {
			kingShipFunction = new KingShipFunction();
		}
		return kingShipFunction;
	}

	/**
	 * 将前20战力的玩家加入到参与缓存中
	 * 
	 * @param countryId
	 */
	public void initJoinKingShipMap(int countryId) {
		List<CountryStrengthRankModel> list = CountrySysCache.getCountryStrengthMap().get(countryId);
		Map<Long, KingShipModel> joinKingShipMap = KingShipCache.getCountry(countryId).getJoinKingShipMap();
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				int size = list.size();
				for (int i=0;i<size;i++) {
					CountryStrengthRankModel strengthRankModel = list.get(i);
					Hero hero = HeroCache.getHero(strengthRankModel.getId(), HeroConst.FIND_TYPE_COUNTRYDATA);
					int onlyWinTimes = hero.getCountryData().getKingShipData().getOnlyWinTimes();
					KingShipModel kingShipModel = new KingShipModel();
					kingShipModel.setId(hero.getId());
					kingShipModel.setTotalStrength(hero.getTotalStrength());
					kingShipModel.setOnlyWinTimes(hero.getCountryData().getKingShipData().getWinTimes());
					joinKingShipMap.put(strengthRankModel.getId(), kingShipModel);
				}
			}

			@Override
			public Object getSession() {
				return OpTaskConst.Country_KEY;
			}
		});
	}

	/**
	 * 皇城侍卫成员名字、头像id、头像框id更新
	 * 
	 * @param hero
	 */
	public void updatekingShiplGuardName(Hero hero) {
		try {
			if (hero.getCountryType() != 0) {
				Country country = CountrySysCache.getCountryCache().getCountryMap().get(hero.getCountryType());
				List<KingShipModel> kingShiplGuardList = country.getKingShiplGuardList();
				KingShipModel kingShipModel = new KingShipModel();
				kingShipModel.setId(hero.getId());
				int indexOf = kingShiplGuardList.indexOf(kingShipModel);
				if (indexOf >= 0) {
					KingShipModel kingShipModel2 = kingShiplGuardList.get(indexOf);
					kingShipModel2.setName(hero.getName());
					kingShipModel2.setIcon(hero.getSettingData().getIcon());
					kingShipModel2.setFrame(hero.getSettingData().getFrame());
					kingShipModel2.setJob(hero.getJob());
					kingShipModel2.setBodyId(hero.getShowModel().getBodyModel());
					kingShipModel2.setMountId(hero.getMountId());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "KingShipFunction updatekingShiplGuardName has wrong");
		}
	}

	/**
	 * 王位之争各国玩家排名缓存按净胜场和达到时间刷新
	 * 
	 * @param hero
	 * @param type 1为战斗结束刷新排行缓存，0更改名字，战力更新，官衔更新，头像id，头像框id
	 */
	public void refreshKingShipModelMap(Hero hero, int type) {
		try {
			if(!KingShipCache.isWWStartTime) {
				return;
			}
			if (hero.getCountryType() != 0) {
				KingShipModel kingShipModel = new KingShipModel();
				kingShipModel.setId(hero.getId());
				kingShipModel.setName(hero.getName());
				kingShipModel.setOfficial(hero.getOfficial());
				kingShipModel.setIcon(hero.getSettingData().getIcon());
				kingShipModel.setFrame(hero.getSettingData().getFrame());
				kingShipModel.setOnlyWinTimes(hero.getCountryData().getKingShipData().getWinTimes());
				kingShipModel.setTime(TimeDateUtil.getCurrentTime());
				kingShipModel.setTotalStrength(hero.getTotalStrength());
				kingShipModel.setTitleId(hero.getTitleId());
				kingShipModel.setTitleId(hero.getTitleId());
				kingShipModel.setJob(hero.getJob());
				kingShipModel.setBodyId(hero.getShowModel().getBodyModel());
				kingShipModel.setMountId(hero.getMountId());
				List<KingShipModel> list = KingShipCache.getCountry(hero.getCountryType()).getKingShipModelList();
				OpTaskExecutorService.PublicOrderService
						.execute(new RefreshKingShipModelRank(kingShipModel, list, type));
			}
		} catch (Exception e) {
			LogTool.error(e, KingShipCache.class, "KingShipCache refreshKingShipModelMap has wrong");
		}
	}

	public void sortKingShipModelMap(List<KingShipModel> list) {
		int i = 1;
		int maxRank = 3;
		Collections.sort(list, new KingShipModelMapRankComparator());
		Iterator<KingShipModel> iterator = list.iterator();
		while (iterator.hasNext()) {
			iterator.next();
			if (i > maxRank) {
				iterator.remove();
			}
			i++;
		}
	}

	/**
	 * 检查该玩家是否为君主
	 * 
	 * @param countryId
	 * @param hid
	 * @return
	 *//*
	public boolean isKing(int countryId, long hid) {
		if (KingShipCache.isWWStartTime) {
			return false;
		}
		List<KingShipModel> linkedList = KingShipCache.getCountry(countryId).getKingShipModelList();
		if (linkedList == null) {
			return false;
		}
		if (linkedList.size() > 0) {
			KingShipModel kingShipModel = linkedList.get(0);
			if (kingShipModel == null) {
				return false;
			}
			return kingShipModel.getId() == hid;
		}
		return false;
	}

	*//**
	 * 检查该玩家是否为丞相
	 * 
	 * @param countryId
	 * @param hid
	 * @return
	 *//*
	public boolean isPrimeMinister(int countryId, long hid) {
		if (KingShipCache.isWWStartTime) {
			return false;
		}
		List<KingShipModel> linkedList = KingShipCache.getCountry(countryId).getKingShipModelList();
		if (linkedList == null) {
			return false;
		}
		if (linkedList.size() > 1) {
			KingShipModel kingShipModel = linkedList.get(1);
			if (kingShipModel == null) {
				return false;
			}
			return kingShipModel.getId() == hid;
		}
		return false;
	}

	*//**
	 * 检查该玩家是否为大将军
	 * 
	 * @param countryId
	 * @param hid
	 * @return
	 *//*
	public boolean isBigGeneral(int countryId, long hid) {
		if (KingShipCache.isWWStartTime) {
			return false;
		}
		List<KingShipModel> linkedList = KingShipCache.getCountry(countryId).getKingShipModelList();
		if (linkedList == null) {
			return false;
		}
		if (linkedList.size() > 2) {
			KingShipModel kingShipModel = linkedList.get(2);
			if (kingShipModel == null) {
				return false;
			}
			return kingShipModel.getId() == hid;
		}
		return false;
	}*/

	/**
	 * 王位之争开启红点
	 * 
	 * @param hero
	 */
	public void startRedPoint(Hero hero, boolean isLogin) {
		KingShipData kingShipData = hero.getCountryData().getKingShipData();
		int chaTimes = kingShipData.getChaTimes();
		Map<Integer, Integer> bxAwardMap = kingShipData.getBXAwardMap();
		boolean flag = false;
		for (Integer status : bxAwardMap.values()) {
			if (status == KingShipConst.CAN_GET) {
				flag = true;
			}
		}
//		int size = KingShipFunction.getIns().handleJoinKingShipMap(hero).size();
		if (KingShipCache.isWWStartTime && (chaTimes > 0 || flag)) {
			if (isLogin) {
				RedPointFunction.getIns().addLoginRedPoint(hero, CountryConst.COUNTRY_SYSID, KingShipConst.REDPOINT,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, KingShipConst.COUNTRY_KINGSHIP, KingShipConst.REDPOINT,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, CountryConst.COUNTRY_SYSID, KingShipConst.REDPOINT,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, KingShipConst.COUNTRY_KINGSHIP,
						KingShipConst.REDPOINT, RedPointConst.HAS_RED);
			}
			return;
		}
	}

	/**
	 * 王位之争关闭红点
	 * 
	 * @param hero
	 */
	public void endRedPoint(Hero hero, boolean isLogin) {
		int mobaiSize = hero.getCountryData().getKingShipData().getMobai().size();
		int size = KingShipCache.getCountry(hero.getCountryType()).getKingShipModelList().size();
		if (!KingShipCache.isWWStartTime && mobaiSize < size) {
			if (isLogin) {
				RedPointFunction.getIns().addLoginRedPoint(hero, CountryConst.COUNTRY_SYSID, KingShipConst.REDPOINT,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, KingShipConst.COUNTRY_KINGSHIP, KingShipConst.REDPOINT,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, CountryConst.COUNTRY_SYSID, KingShipConst.REDPOINT,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, KingShipConst.COUNTRY_KINGSHIP,
						KingShipConst.REDPOINT, RedPointConst.HAS_RED);
			}
			return;
		}
		boolean isKing = NewKingShipFunction.getIns().isKing(hero.getCountryType(), hero.getId());
		if(KingShipCache.isWWStartTime||!isKing) {
			return;
		}
		int guardSize = KingShipCache.getCountry(hero.getCountryType()).getKingShiplGuardList().size();
		List<CountryStrengthRankModel> guardUIList = KingShipFunction.getIns().handleGuardList(hero);
		if (!KingShipCache.isWWStartTime && (isKing
				&& (guardUIList.size() < KingShipConst.KINGSHIP_MAX_ASSIGNNUM ? guardSize < guardUIList.size()
						: guardSize < KingShipConst.KINGSHIP_MAX_ASSIGNNUM))) {
			if (isLogin) {
				RedPointFunction.getIns().addLoginRedPoint(hero, CountryConst.COUNTRY_SYSID, KingShipConst.REDPOINT,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, KingShipConst.COUNTRY_KINGSHIP, KingShipConst.REDPOINT,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, CountryConst.COUNTRY_SYSID, KingShipConst.REDPOINT,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, KingShipConst.COUNTRY_KINGSHIP,
						KingShipConst.REDPOINT, RedPointConst.HAS_RED);
			}
			return;
		}
	}

	/**
	 * 处理任命侍卫列表
	 * 
	 * @param hero
	 * @return
	 */
	public List<CountryStrengthRankModel> handleGuardList(Hero hero) {
		List<CountryStrengthRankModel> list = CountrySysCache.getCountryStrengthMap().get(hero.getCountryType());
		List<KingShipModel> kingShipModelList = CountrySysCache.getCountryCache().getCountryMap()
				.get(hero.getCountryType()).getKingShipModelList();
		ArrayList<CountryStrengthRankModel> guardUIList = new ArrayList<CountryStrengthRankModel>(list);
		int size = kingShipModelList.size();
		for (int i=0;i<size;i++) {
			KingShipModel kingShipModel = kingShipModelList.get(i);
			CountryStrengthRankModel delModel = new CountryStrengthRankModel();
			delModel.setId(kingShipModel.getId());
			guardUIList.remove(delModel);
		}
		return guardUIList;
	}

	/**
	 * 在参与王位之争列表中删除玩家,在新的列表里删除,不影响原列表
	 * 
	 * @param hero
	 * @return
	 */
	public List<KingShipModel> handleJoinKingShipMap(Hero hero) {
		Country country = CountrySysCache.getCountryCache().getCountryMap().get(hero.getCountryType());
		Map<Long, KingShipModel> joinKingShipMap = country.getJoinKingShipMap();
		List<KingShipModel> arrayList = new ArrayList<KingShipModel>(joinKingShipMap.values());
		KingShipModel kingShipModel2 = joinKingShipMap.get(hero.getId());
		if (kingShipModel2 != null) {
			KingShipModel kingShipModel = new KingShipModel();
			kingShipModel.setId(hero.getId());
			arrayList.remove(kingShipModel);
		}
		return arrayList;
	}

	/**
	 * 重置王位之争数据
	 * 
	 * @param hero
	 */
	public void resetKingShipData(Hero hero) {
//		int betweenOpen = TimeDateUtil.betweenOpen();
//		if (betweenOpen % KingShipConst.KINGSHIP_ROUND == 1) { // 周期第一天
//		}
		if (isStartWeek()) {
			hero.getCountryData().getKingShipData().setOnlyWinTimes(0);
			hero.getCountryData().getKingShipData().setWinTimes(0);
			hero.getCountryData().getKingShipData().setFailTimes(0);
			hero.getCountryData().getKingShipData().setTime(0);
			hero.getCountryData().getKingShipData().setBuyChaTimes(0);
			hero.getCountryData().getKingShipData().setChaTimes(KingShipConst.KINGSHIP_CHATIMES);
			hero.getCountryData().getKingShipData().setRefreshTime(TimeDateUtil.getCurrentTime());
			hero.getCountryData().getKingShipData().getMobai().clear();
		} else {
			hero.getCountryData().getKingShipData().getMobai().clear();
		}
//		if (betweenOpen % KingShipConst.KINGSHIP_ROUND == 2) { // 周期第二天
//			hero.getCountryData().getKingShipData().getMobai().clear();
//		}
//		if (betweenOpen % KingShipConst.KINGSHIP_ROUND == 0) {// 周期第三天
//			hero.getCountryData().getKingShipData().getMobai().clear();
//		}
	}

	/**
	 * 是否开启星期当天
	 * 
	 * @return
	 */
	public boolean isStartWeek() {
		int[] START_WEEK_BEFORE7 = { 2, 5 };// 王位之争开启星期配置(前七天)(顺序配)
		int START_BEFORE = 7;
		int betweenOpen = TimeDateUtil.betweenOpen();
		int week = TimeDateUtil.getWeek();
		if (betweenOpen <= START_BEFORE) {// 开服前7天
			for (int day : START_WEEK_BEFORE7) {
				if (day == betweenOpen) {
					return true;
				}
			}
			return false;
		} else {// 开服后7天
			for (int week1 : KingShipConst.START_WEEK_ARRAY) {
				if (week == week1) {
					return true;
				}
			}
			return false;
		}
	}

}
