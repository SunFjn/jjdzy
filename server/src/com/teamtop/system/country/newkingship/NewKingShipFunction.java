package com.teamtop.system.country.newkingship;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.country.CountryConst;
import com.teamtop.system.country.fightNorthAndSouth.FightNSFunction;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xwwzdnpc_311;
import excel.struct.Struct_xwwzdnpc_311;

public class NewKingShipFunction {
	
	private static NewKingShipFunction newKingShipFunction;

	private NewKingShipFunction() {

	}

	public static synchronized NewKingShipFunction getIns() {
		if (newKingShipFunction == null) {
			newKingShipFunction = new NewKingShipFunction();
		}
		return newKingShipFunction;
	}
	
	
	/**
	 * 重置王位之争个人数据
	 * 
	 * @param hero
	 */
	public void resetKingShipData(Hero hero) {
		hero.getNewKingWar().setBattleNum(NewKingShipConst.BATTLENUM);
		hero.getNewKingWar().setBuyChaTimes(0);
		hero.getNewKingWar().setRefreshTime(TimeDateUtil.getCurrentTime());
		hero.getNewKingWar().setMobai(0);
		hero.getNewKingWar().setIsHasReward(0);
	}
	
	/**
	 * 根据最后一次刷新时间设置恢复次数 返回最新的刷新时间
	 * 
	 * @param hero
	 * @param refreshTime
	 * @return
	 */
	public int calcrecoverTime(Hero hero) {
		if (hero.getCountryType() == 0) {
			return 0;
		}
		NewKingWar newKingWar = hero.getNewKingWar();
		if(newKingWar==null) {
			return 0;
		}
		int chaTimes = newKingWar.getBattleNum();
		if (chaTimes >= NewKingShipConst.BATTLENUM) {
			return 0;
		}

		int currentTime = TimeDateUtil.getCurrentTime();
		int refreshTime = newKingWar.getRefreshTime();
		if (refreshTime>currentTime) {
			//刷新时间大于当前时间
			newKingWar.setRefreshTime(currentTime);
			refreshTime=currentTime;
		}
		int time = currentTime - refreshTime;
		int times = time / 3600;
		if (time < 3600) {
			return 3600 - time;
		} else if (time > 3600) {
			if ((times + chaTimes) > NewKingShipConst.BATTLENUM) {
				newKingWar.setBattleNum(NewKingShipConst.BATTLENUM);
				newKingWar.setRefreshTime(currentTime);
				startRedPoint(hero, false);// 红点
				return 0;
			}
			newKingWar.setBattleNum(chaTimes + times);
			newKingWar.setRefreshTime(currentTime - (time - 3600 * times));
			startRedPoint(hero, false);// 红点
			return time - 3600 * times;
		}
		return 0;
	}

	public int calcDistantDay() {
		int START_BEFORE = 7;
		int[] START_WEEK_BEFORE7 = { 2, 5 };// 王位之争开启星期配置(前七天)(顺序配)
		int betweenOpen = TimeDateUtil.betweenOpen();
		int week = TimeDateUtil.getWeek();
		if (betweenOpen < START_BEFORE) {// 开服前7天
			int[] startWeekArray = START_WEEK_BEFORE7;
			int index;
			for (index = 0; index < startWeekArray.length; index++) {
				if (betweenOpen < startWeekArray[index]) {
					break;
				}
			}
			if (index == startWeekArray.length) {
				int lastWeek = START_BEFORE - betweenOpen + week;
				int i;
				for (i = 0; i < NewKingShipConst.START_WEEK_ARRAY.length; i++) {
					if (lastWeek < NewKingShipConst.START_WEEK_ARRAY[i]) {
						break;
					}
				}
				if (i == NewKingShipConst.START_WEEK_ARRAY.length) {
					return START_BEFORE - betweenOpen + 7 - lastWeek + NewKingShipConst.START_WEEK_ARRAY[0];
				} else {
					int j = NewKingShipConst.START_WEEK_ARRAY[i];
					return START_BEFORE - betweenOpen + j - lastWeek;
				}

			} else {
				return startWeekArray[index] - betweenOpen;
			}
		} else {// 开服后7天
			int[] startWeekArray = NewKingShipConst.START_WEEK_ARRAY;
			int index;
			for (index = 0; index < startWeekArray.length; index++) {
				if (week < startWeekArray[index]) {
					break;
				}
			}
			if (index == startWeekArray.length) {
				return startWeekArray[0] + 7 - week;
			} else {
				return startWeekArray[index] - week;
			}
		}
	}
	
	
	/**
	 * 王位之争开启红点
	 * 
	 * @param hero
	 */
	public void startRedPoint(Hero hero, boolean isLogin) {
		NewKingWar newKingWar = hero.getNewKingWar();
		boolean flag = false;
		if (newKingWar.getBattleNum()>0) {
			flag = true;
		}
//		int size = KingShipFunction.getIns().handleJoinKingShipMap(hero).size();
		if ((NewKingShipCache.isWWStartTime &&  flag)||newKingWar.getIsHasReward()==0||newKingWar.getMobai()==0) {
			if (isLogin) {
				RedPointFunction.getIns().addLoginRedPoint(hero, CountryConst.COUNTRY_SYSID, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, NewKingShipConst.COUNTRY_KINGSHIP, 1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, CountryConst.COUNTRY_SYSID, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, NewKingShipConst.COUNTRY_KINGSHIP,
						1, RedPointConst.HAS_RED);
			}
			return;
		}
	}
	
	/**
	 * 检查该玩家是否为君主
	 * 
	 * @param countryId
	 * @param hid
	 * @return
	 */
	public boolean isKing(int countryId, long hid) {
		if (NewKingShipCache.isWWStartTime) {
			return false;
		}
		if (NewKingShipCache.getNewKingShipSysCache()==null||NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper()==null) {
			return false;
		}
		ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap =NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper().get(countryId);
		if (concurrentHashMap==null) {
			return false;
		}
		int key=countryId*100+1;
		if (concurrentHashMap.containsKey(key)) {
			NewKingShip newKingShip = concurrentHashMap.get(key);
			return newKingShip.getId() == hid;
		}else {
			return false;
		}
	}
	/**
	 * 获取指定国家的国王名字
	 * @param countryId
	 * @return
	 */
	public String kingName(int countryId) {
		if (NewKingShipCache.isWWStartTime) {
			return "";
		}
		if (NewKingShipCache.getNewKingShipSysCache()==null||NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper()==null) {
			return "";
		}
		ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap =NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper().get(countryId);
		if (concurrentHashMap==null) {
			return "";
		}
		int key=countryId*100+1;
		
		if (concurrentHashMap.containsKey(key)) {
			NewKingShip newKingShip = concurrentHashMap.get(key);
			if (newKingShip.getType()==NewKingShipConst.TYPE_1) {
				Hero hero=HeroCache.getHero(newKingShip.getId(), HeroConst.FIND_TYPE_BASIC);
				if(hero==null){
					return "";
				}
				return hero.getNameZoneid();
			}
		}
		return "";
		
	}
	
	/**
	 * 获取指定国家的国王hero对象
	 * 
	 * @param countryId
	 * @return
	 */
	public Hero kingHero(int countryId) {
		NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
		Hero kingHero = Optional.ofNullable(newKingShipSysCache)
				.map(newKingShipSysCache1 -> newKingShipSysCache1.getJoinerNewKingShiper())
				.map(joinerNewKingShiper -> joinerNewKingShiper.get(countryId)).map(map -> {
					int key = countryId * 100 + 1;
					return map.get(key);
				}).filter(newKingShip -> newKingShip.getType() == NewKingShipConst.TYPE_1)
				.map(newKingShip -> HeroCache.getHero(newKingShip.getId(), HeroConst.FIND_TYPE_BASIC)).orElse(null);
		return kingHero;
	}

	/**
	 * 检查该玩家是否为丞相
	 * 
	 * @param countryId
	 * @param hid
	 * @return
	 */
	public boolean isPrimeMinister(int countryId, long hid) {
		if (NewKingShipCache.isWWStartTime) {
			return false;
		}
		if (NewKingShipCache.getNewKingShipSysCache()==null||NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper()==null) {
			return false;
		}
		ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap =NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper().get(countryId);
		if (concurrentHashMap==null) {
			return false;
		}
		int key=countryId*100+2;
		if (concurrentHashMap.containsKey(key)) {
			NewKingShip newKingShip = concurrentHashMap.get(key);
			return newKingShip.getId() == hid;
		}else {
			return false;
		}
	}

	/**
	 * 检查该玩家是否为大将军
	 * 
	 * @param countryId
	 * @param hid
	 * @return
	 */
	public boolean isBigGeneral(int countryId, long hid) {
		if (NewKingShipCache.isWWStartTime) {
			return false;
		}
		if (NewKingShipCache.getNewKingShipSysCache()==null||NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper()==null) {
			return false;
		}
		ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap =NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper().get(countryId);
		if (concurrentHashMap==null) {
			return false;
		}
		int key=countryId*100+3;
		if (concurrentHashMap.containsKey(key)) {
			NewKingShip newKingShip = concurrentHashMap.get(key);
			return newKingShip.getId() == hid;
		}else {
			return false;
		}
	}
	
	/**
	 * 获取指定国家的丞相hero对象
	 * 
	 * @param countryId
	 * @return
	 */
	public Hero primeMinisterHero(int countryId) {
		NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
		Hero primeMinisterHero = Optional.ofNullable(newKingShipSysCache)
				.map(newKingShipSysCache1 -> newKingShipSysCache1.getJoinerNewKingShiper())
				.map(joinerNewKingShiper -> joinerNewKingShiper.get(countryId)).map(map -> {
					int key = countryId * 100 + 2;
					return map.get(key);
				}).filter(newKingShip -> newKingShip.getType() == NewKingShipConst.TYPE_1)
				.map(newKingShip -> HeroCache.getHero(newKingShip.getId(), HeroConst.FIND_TYPE_BASIC)).orElse(null);
		return primeMinisterHero;
	}

	/**
	 * 获取指定国家的大将军hero对象
	 * 
	 * @param countryId
	 * @return
	 */
	public Hero bigGeneralHero(int countryId) {
		NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
		Hero bigGeneralHero = Optional.ofNullable(newKingShipSysCache)
				.map(newKingShipSysCache1 -> newKingShipSysCache1.getJoinerNewKingShiper())
				.map(joinerNewKingShiper -> joinerNewKingShiper.get(countryId)).map(map -> {
					int key = countryId * 100 + 3;
					return map.get(key);
				}).filter(newKingShip -> newKingShip.getType() == NewKingShipConst.TYPE_1)
				.map(newKingShip -> HeroCache.getHero(newKingShip.getId(), HeroConst.FIND_TYPE_BASIC)).orElse(null);
		return bigGeneralHero;
	}
	

	/**
	 * 处理合服数据
	 * @throws Exception 
	 */
	public void setHeFuData(List<GlobalData> dataAll, GlobalData globalData)  throws Exception{
		for( GlobalData globalTemp:dataAll){
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				
			} else {
				try {
					NewKingShipSysCache data;
					data = ObjStrTransUtil.toObj(content, NewKingShipSysCache.class);
					if(data!=null){
						//先移除所有人的称号
						for (int i = 1; i <=3; i++) {
							ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = data.getJoinerNewKingShiper().get(i);
							for (NewKingShip newKingShip:concurrentHashMap.values()) {
								if (newKingShip.getType()==NewKingShipConst.TYPE_1) {
									for (Struct_xwwzdnpc_311 xwwzdnpc_311: Config_xwwzdnpc_311.getIns().getSortList()) {
										if (xwwzdnpc_311.getSite()==newKingShip.getSit()) {
											TitleFunction.getIns().heFuRemoveTitle(newKingShip.getId(), xwwzdnpc_311.getCh());
										}
									}
								}
							}
						}
					}
					
				} catch (Exception e) {
					LogTool.error(e, FightNSFunction.class, "setHeFuData zoneid:"+globalTemp.getZoneid());
				}
			}
		}
		
		//初始化 三国王位之争npc
		NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
		for (Struct_xwwzdnpc_311  xwwzdnpc_311:Config_xwwzdnpc_311.getIns().getSortList()) {
			int countryId=xwwzdnpc_311.getSite()/100;
			if(!newKingShipSysCache.getJoinerNewKingShiper().containsKey(countryId)) {
				newKingShipSysCache.getJoinerNewKingShiper().put(countryId, new ConcurrentHashMap<Integer, NewKingShip>());
			}
			ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = newKingShipSysCache.getJoinerNewKingShiper().get(countryId);
			NewKingShip newKingShip=new NewKingShip();
			newKingShip.setType(NewKingShipConst.TYPE_0);
			newKingShip.setNpcid(xwwzdnpc_311.getNpc());
			newKingShip.setSit(xwwzdnpc_311.getSite());
			newKingShip.setId(xwwzdnpc_311.getNpc());
			concurrentHashMap.put(xwwzdnpc_311.getSite(), newKingShip);
		}
		globalData.setContent(ObjStrTransUtil.toStr(newKingShipSysCache));
	}

}
