package com.teamtop.system.boss.countryBoss;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.peacockFloor.PeacockFloorSysCache;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class CountryBossSysCache extends AbsServerEvent{
	
	private static CountryBossSysCache ins = null;

	public static  CountryBossSysCache getIns() {
		if (ins == null) {
			ins = new CountryBossSysCache();
		}
		return ins;
	}
	
	private static CountryBossCache countryBossCache;

	

	public static CountryBossCache getCountryBossCache() {
		return countryBossCache;
	}

	public static void setCountryBossCache(CountryBossCache countryBossCache) {
		CountryBossSysCache.countryBossCache = countryBossCache;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.COUNTRY_BOSS);
			String content = globalData.getContent();
			if (content==null||content.equals("")||content.equals("{}")) {
				//初始化国家boss系统
				CountryBossFunction.getIns().initCountryBoss();
				updateGloalData();
			}else{
				setCountryBossCache(ObjStrTransUtil.toObj(content, CountryBossCache.class));
			}
			ConcurrentHashMap<Integer, CountryBossModel> countryBossMap = CountryBossSysCache.getCountryBossCache().getCountryBossMap();
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CountryRankJioner>> newkillersByCountry = CountryBossSysCache.getCountryBossCache().getNewkillersByCountry();
			
			for (int i = 1; i <=3; i++) {
				CountryBossModel countryBossModel = countryBossMap.get(i);
				if (countryBossModel!=null) {
					List<CountryBossDamgModel> rankList = countryBossModel.getRankList();
					int bossIndex = countryBossModel.getBossId();
					if (newkillersByCountry.containsKey(i)) {
						ConcurrentHashMap<Integer, CountryRankJioner> concurrentHashMap = newkillersByCountry.get(i);
						if (concurrentHashMap.containsKey(bossIndex)) {
							CountryRankJioner countryRankJioner=concurrentHashMap.get(bossIndex);
							List<CountryHurter> hurtRankArr = countryRankJioner.getHurtRankArr();
							if (hurtRankArr!=null&&hurtRankArr.size()>0) {
								for (int j = 0; j < hurtRankArr.size(); j++) {
									CountryHurter countryHurter = hurtRankArr.get(j);
									CountryBossDamgModel model1 = new CountryBossDamgModel();
									model1.setHid(countryHurter.getHid());
									if(!rankList.contains(model1)){
										model1.setName(countryHurter.getName());
										model1.setHurt(countryHurter.getHurt());
										rankList.add(model1);
									}
								}
							}
						}
					}
				}
			}
			if (getCountryBossCache().getIndex()==0) {
				//改版
				ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Long>> killersByCountry = getCountryBossCache().getKillersByCountry();
				newkillersByCountry = getCountryBossCache().getNewkillersByCountry();
				for (int i = 1; i <=3; i++) {
					if(killersByCountry.containsKey(i)) {
						ConcurrentHashMap<Integer, Long> concurrentHashMap = killersByCountry.get(i);
						if (!newkillersByCountry.containsKey(i)) {
							newkillersByCountry.put(i, new ConcurrentHashMap<>());
						}
						for (Integer key:concurrentHashMap.keySet()) {
							Long long1 = concurrentHashMap.get(key);
							CountryRankJioner countryRankJioner=new CountryRankJioner();
							countryRankJioner.setKillerid(long1);
							countryRankJioner.setHurtRankArr(new ArrayList<CountryHurter>());
							newkillersByCountry.get(i).put(key, countryRankJioner);
						}
					}
					getCountryBossCache().getJoinerByCountry().put(i, new ArrayList<Long>());
				}
				getCountryBossCache().setIndex(1);
				
			}
		} catch (Exception e) {
			LogTool.error(e, PeacockFloorSysCache.class, "MonsterGodSysCache has wrong");
		}
		
	}
	
	@Override
	public void shutdownServer(){
		updateGloalData();
	}
	
	/**
	 * 更新国家boss公共缓存
	 */
	public void updateGloalData() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.COUNTRY_BOSS);
			globalData.setContent(ObjStrTransUtil.toStr(getCountryBossCache()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "updateGloalData shutdownServer has wrong");
		}
	}


}
