package com.teamtop.system.country;

import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.country.kingship.KingShipCache;
import com.teamtop.system.country.kingship.model.KingShipModel;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.country.model.CountryCache;
import com.teamtop.system.country.model.CountryStrengthComparator;
import com.teamtop.system.country.model.CountryStrengthRankModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroMapper;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.title.TitleConst;
import com.teamtop.system.title.TitleInfo;
import com.teamtop.system.title.TitleModel;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_juanxian_712;

public class CountryFunction {
	private static CountryFunction countryFunction;

	private CountryFunction() {

	}

	public static synchronized CountryFunction getIns() {
		if (countryFunction == null) {
			countryFunction = new CountryFunction();
		}
		return countryFunction;
	}

	/**
	 * 将存在国家缓存中的王者之争数据写入数据库
	 */
	public void kingShipDatatoDB() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.COUNTRY);
			globalData.setContent(ObjStrTransUtil.toStr(CountrySysCache.getCountryCache()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "CountryFunction kingShipDatatoDB has wrong");
		}

	}

	/**
	 * 刷新国家战力缓存
	 * 
	 * @param hero
	 * @param type 1:刷新国家战力缓存，0：修改名字、修改官职、头像、头像框
	 */
	public void refreshCountryStrengthMap(final Hero hero, final int type) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					countryStrengthMapRank(hero, type);
				}

				@Override
				public Object getSession() {
					return OpTaskConst.Country_KEY;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, CountrySysCache.class, "CountrySysCache refreshCountryStrengthMap has wrong");
		}
	}

	public void countryStrengthMapRank(Hero hero, int type) {
		if (hero.getCountryType() != 0) {
			List<CountryStrengthRankModel> list = CountrySysCache.getCountryStrengthMap().get(hero.getCountryType());
			CountryStrengthRankModel cStrengthRankModel = new CountryStrengthRankModel();
			cStrengthRankModel.setId(hero.getId());
			cStrengthRankModel.setName(hero.getName());
			cStrengthRankModel.setOfficial(hero.getOfficial());
			cStrengthRankModel.setTotalStrength(hero.getTotalStrength());
			cStrengthRankModel.setIcon(hero.getSettingData().getIcon());
			cStrengthRankModel.setFrame(hero.getSettingData().getFrame());
			cStrengthRankModel.setJob(hero.getJob());
			cStrengthRankModel.setBodyId(hero.getShowModel().getBodyModel());
			cStrengthRankModel.setMountId(hero.getMountId());
			int indexOf = list.indexOf(cStrengthRankModel);
			if (type == 1) {
				if (indexOf < 0) {
					list.add(cStrengthRankModel);
				} else {
					CountryStrengthRankModel countryStrengthRankModel = list.get(indexOf);
					countryStrengthRankModel.setTotalStrength(hero.getTotalStrength());
					countryStrengthRankModel.setOfficial(hero.getOfficial());
				}
				if (list.size() <= 20) {
					refreshjoinKingShipMapByStrength(hero, 0, hero.getCountryType());
				}
				sortCountryStrengthMap(hero, hero.getCountryType(), list);
			} else {
				if (indexOf >= 0) {
					CountryStrengthRankModel countryStrengthRankModel = list.get(indexOf);
					countryStrengthRankModel.setName(hero.getName());
					countryStrengthRankModel.setOfficial(hero.getOfficial());
					countryStrengthRankModel.setIcon(hero.getSettingData().getIcon());
					countryStrengthRankModel.setFrame(hero.getSettingData().getFrame());
					countryStrengthRankModel.setJob(hero.getJob());
					countryStrengthRankModel.setBodyId(hero.getShowModel().getBodyModel());
					countryStrengthRankModel.setMountId(hero.getMountId());
				}
			}
		}
	}

	public void sortCountryStrengthMap(Hero hero, int cid, List<CountryStrengthRankModel> list) {
		int i = 1;
		int maxRank = 20;
		Collections.sort(list, new CountryStrengthComparator());
		Iterator<CountryStrengthRankModel> iterator = list.iterator();
		while (iterator.hasNext()) {
			CountryStrengthRankModel next = iterator.next();
			if (i > maxRank) {
				refreshjoinKingShipMapByStrength(hero, next.getId(), cid);
				iterator.remove();
			}
			i++;
		}
	}

	/**
	 * 根据战力刷新玩家参与王位之争的缓存,只在王者之争开启才使用
	 * 
	 * @param intoHid
	 * @param excludeHid
	 * @param cid
	 */
	public void refreshjoinKingShipMapByStrength(Hero hero, long excludeHid, int cid) {
		try {
			if (KingShipCache.isWWStartTime) {
				long id = hero.getId();
				Country country = CountrySysCache.getCountryCache().getCountryMap().get(cid);
				Map<Long, KingShipModel> joinKingShipMap = country.getJoinKingShipMap();
				if (!joinKingShipMap.containsKey(id)) {
					KingShipModel kingShipModel = new KingShipModel();
					kingShipModel.setId(id);
					kingShipModel.setOnlyWinTimes(hero.getCountryData().getKingShipData().getWinTimes());
					joinKingShipMap.put(id, kingShipModel);
				}
				if (excludeHid != 0) {
					KingShipModel kingShipModel = joinKingShipMap.get(excludeHid);
					if (kingShipModel != null && kingShipModel.getTime() == 0) {
						joinKingShipMap.remove(excludeHid);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CountrySysCache.class, "CountrySysCache refreshjoinKingShipMapByStrength has wrong");
		}
	}

	/**
	 * 通过玩家净胜场刷新参与王位之争的成员缓存
	 * 
	 * @param cid
	 * @param onlyWinTimes
	 */
	public void refreshjoinKingShipMapByOWT(int cid, long hid, int onlyWinTimes) {
		try {
			Country country = CountrySysCache.getCountryCache().getCountryMap().get(cid);
			Map<Long, KingShipModel> joinKingShipMap = country.getJoinKingShipMap();
			KingShipModel kingShipModel = new KingShipModel();
			kingShipModel.setId(hid);
			kingShipModel.setOnlyWinTimes(onlyWinTimes);
			kingShipModel.setTime(TimeDateUtil.getCurrentTime());
			joinKingShipMap.put(hid, kingShipModel);
		} catch (Exception e) {
			LogTool.error(e, CountrySysCache.class, "CountrySysCache refreshjoinKingShipMapByOWT has wrong" + "hid:"
					+ hid + " onlyWinTimes" + onlyWinTimes);
		}
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		int coinDonationTimes = hero.getCountryData().getCoinDonationTimes();
		int[][] coinConsume = Config_juanxian_712.getIns().get(1).getUSE();
		if (coinDonationTimes > 0 && UseAddUtil.canUse(hero, coinConsume)) {
			RedPointFunction.getIns().addLoginRedPoint(hero, CountryConst.COUNTRY_SYSID, CountryConst.REDPOINT_JUANXIAN,
					RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, CountryConst.JUANXIAN_SYSID,
					CountryConst.REDPOINT_JUANXIAN, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		int coinDonationTimes = hero.getCountryData().getCoinDonationTimes();
		int[][] coinConsume = Config_juanxian_712.getIns().get(1).getUSE();
		if (coinDonationTimes > 0 && UseAddUtil.canUse(hero, coinConsume)) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, CountryConst.COUNTRY_SYSID,
					CountryConst.REDPOINT_JUANXIAN, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, CountryConst.JUANXIAN_SYSID,
					CountryConst.REDPOINT_JUANXIAN, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 合服,清理国王称号数据
	 * 
	 * @throws Exception
	 */
	public void delTitleData(List<GlobalData> globalDataAll) throws Exception {
		for (GlobalData globalData : globalDataAll) {
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				return;
			} else {
				CountryCache countryData = ObjStrTransUtil.toObj(content, CountryCache.class);
				ConcurrentHashMap<Integer, Country> countryMap = countryData.getCountryMap();
				Iterator<Country> iterator = countryMap.values().iterator();
				while (iterator.hasNext()) {
					Country country = iterator.next();
					List<KingShipModel> kingShipModelList = country.getKingShipModelList();
					for (int i = 0; i < kingShipModelList.size(); i++) {
						KingShipModel temp = kingShipModelList.get(i);
						long hid = temp.getId();
						Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_TITLE);
						if (hero == null)
							continue;
						TitleModel titleModel = hero.getTitleModel();
						if (titleModel == null)
							continue;
						Map<Integer, TitleInfo> hasMap = titleModel.getHasMap();

						TitleInfo remove1 = hasMap.remove(TitleConst.TITLE_SHU_WANG);
						TitleInfo remove2 = hasMap.remove(TitleConst.TITLE_WU_WANG);
						TitleInfo remove3 = hasMap.remove(TitleConst.TITLE_WEI_WANG);
						TitleInfo remove4 = hasMap.remove(TitleConst.TITLE_SHU_DA_JIANG_JUN);
						TitleInfo remove5 = hasMap.remove(TitleConst.TITLE_WU_DA_JIANG_JUN);
						TitleInfo remove6 = hasMap.remove(TitleConst.TITLE_WEI_DA_JIANG_JUN);
						TitleInfo remove7 = hasMap.remove(TitleConst.TITLE_SHU_XIANG);
						TitleInfo remove8 = hasMap.remove(TitleConst.TITLE_WU_XIANG);
						TitleInfo remove9 = hasMap.remove(TitleConst.TITLE_WEI_XIANG);
						if (remove1 != null || remove2 != null || remove3 != null || remove4 != null || remove5 != null
								|| remove6 != null || remove7 != null || remove8 != null || remove9 != null) {
							DaoUtil.update(titleModel, HeroMapper.class, hero.getZoneid());
						}
					}
				}
			}
		}
	}

	/**
	 * 处理合服数据
	 * 
	 * @throws Exception
	 */
	public void setHeFuData(List<GlobalData> dataSouAll, GlobalData globalData) throws Exception {
		GlobalData dataSou = null;
		if (dataSouAll != null && dataSouAll.size() >= 1)
			dataSou = dataSouAll.get(0);
		if (dataSou == null)
			return;
		ConcurrentHashMap<Integer, Country> countryMap = new ConcurrentHashMap<Integer, Country>();
		String content = dataSou.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			return;
		} else {
			try {
				CountryCache data = ObjStrTransUtil.toObj(content, CountryCache.class);
				countryMap = data.getCountryMap();
				Iterator<Country> iterator = countryMap.values().iterator();
				while (iterator.hasNext()) {
					Country country = iterator.next();
					country.setJoinKingShipMap(new ConcurrentHashMap<>());
					country.setKingShiplGuardList(new LinkedList<KingShipModel>());
					country.setKingShipModelList(new LinkedList<KingShipModel>());
				}
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("zoneid:" + dataSou.getZoneid());
			}
		}
		CountryCache countryCache = new CountryCache(countryMap);

		globalData.setContent(ObjStrTransUtil.toStr(countryCache));
	}
}
