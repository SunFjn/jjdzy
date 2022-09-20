package com.teamtop.system.countrySkill;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.country.CountryConst;
import com.teamtop.system.country.CountryType;
import com.teamtop.system.country.newkingship.NewKingShipFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.guanqia.GuanqiaConst;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_gjjn_748;
import excel.struct.Struct_gjjn_748;

public class CountrySkillFunction {
	private static volatile CountrySkillFunction ins = null;

	public static CountrySkillFunction getIns() {
		if (ins == null) {
			synchronized (CountrySkillFunction.class) {
				if (ins == null) {
					ins = new CountrySkillFunction();
				}
			}
		}
		return ins;
	}

	private CountrySkillFunction() {
	}

	/**
	 * 增加国家声望
	 * 
	 * @param hero
	 * @param addPrestige
	 */
	public void addPrestige(Hero hero, int addPrestige) {
		try {
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				// 没有加入国家
				LogTool.warn(
						"hid" + hero.getId() + " name:" + hero.getName() + "countryType=0 addPrestige:" + addPrestige,
						this);
				return;
			}
			AtomicLong countryPrestige = CountrySkillCache.getCountryPrestigeByTypeMap().get(countryType);
			countryPrestige.addAndGet((long) addPrestige);
			CountrySkillFunction.getIns().redPoint(hero, false);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "addPrestige:" + addPrestige);
		}
	}

	/**
	 * 国家技能总等级
	 * 
	 * @param countryType
	 * @return
	 */
	public int getCountrySkillTotalLV(int countryType) {
		Map<Integer, Integer> map = CountrySkillCache.getCountrySkillByTypeMap().get(countryType);
		int totalSkillLv = 0;
		for (int skillId : map.values()) {
			// 技能等级累加
			int lv = skillId % 100;
			totalSkillLv += lv;
		}
		return totalSkillLv;
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.COUNTRYSKILL_SYSID)) {
			return;
		}
		int countryType = hero.getCountryType();
		if (countryType == 0) {
			// 没有加入国家
			return;
		}

		boolean king = NewKingShipFunction.getIns().isKing(countryType, hero.getId());
		if (!king) {
			// 不是国王
			return;
		}
		Map<Integer, Integer> countrySkillMap = CountrySkillCache.getCountrySkillByTypeMap().get(countryType);
		Map<Integer, List<Struct_gjjn_748>> configByTypeMap = CountrySkillCache.getConfigByTypeMap();
		int countrySkillTotalLV = CountrySkillFunction.getIns().getCountrySkillTotalLV(countryType);
		Map<Integer, AtomicLong> countryPrestigeByTypeMap = CountrySkillCache.getCountryPrestigeByTypeMap();
		AtomicLong atomicLong = countryPrestigeByTypeMap.get(countryType);
		long countryPrestige = atomicLong.get();
		for (Entry<Integer, List<Struct_gjjn_748>> entry : configByTypeMap.entrySet()) {
			int type = entry.getKey();
			Integer skillId = countrySkillMap.get(type);
			List<Struct_gjjn_748> list = entry.getValue();
			Boolean isRedPoint = Optional.ofNullable(skillId).map(skillId1 -> {
				Struct_gjjn_748 struct_gjjn_748 = Config_gjjn_748.getIns().get(skillId1);
				int tj = struct_gjjn_748.getTj();
				if (tj != 0 && countrySkillTotalLV >= tj) {
					int[][] consume = struct_gjjn_748.getConsume();
					if (countryPrestige >= consume[0][2]) {
						return true;
					}
					return false;
				} else {
					return false;
				}
			}).orElseGet(() -> {
				Struct_gjjn_748 struct_gjjn_748 = list.get(0);
				int tj = struct_gjjn_748.getTj();
				if (countrySkillTotalLV >= tj) {
					int[][] consume = struct_gjjn_748.getConsume();
					if (countryPrestige >= consume[0][2]) {
						return true;
					}
					return false;
				} else {
					return false;
				}
			});
			if (isRedPoint) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, CountryConst.COUNTRY_SYSID, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.COUNTRYSKILL_SYSID, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, CountryConst.COUNTRY_SYSID, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.COUNTRYSKILL_SYSID, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}

		}

	}

	/**
	 * 国家技能离线经验和铜钱收益处理(登录处理)
	 * 
	 * @param hero
	 * @return
	 */
	public Integer[] offlineExpAndCoinHandle(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.COUNTRYSKILL_SYSID)) {
				return new Integer[] { 0, 0 };
			}
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return new Integer[] { 0, 0 };
			}
			int loginTime = hero.getLoginTime();
			int logoutTime = hero.getLogoutTime();
			int intervalTime = loginTime - logoutTime;
			if (intervalTime <= 0) {
				LogTool.warn("hid" + hero.getId() + " name:" + hero.getName() + "CountrySkillEvent login loginTime:"
						+ loginTime + " logoutTime:" + logoutTime, this);
				return new Integer[] { 0, 0 };
			}
			int intervalHour = intervalTime / TimeDateUtil.ONE_HOUR_INT;
			Map<Integer, Integer[]> onAndOfflineExpCoinMap = CountrySkillCache.getOnAndOfflineExpCoinMap();
			Integer[] expCoinArray = onAndOfflineExpCoinMap.get(countryType);
			int offlineExp = expCoinArray[2] * intervalHour;
			int offlineCoin = expCoinArray[3] * intervalHour;
			if (offlineExp > 0) {
				UseAddUtil.add(hero, GameConst.EXP, offlineExp, SourceGoodConst.COUNTRYSKILL_OFFLINE, false);
			}
			if (offlineCoin > 0) {
				UseAddUtil.add(hero, GameConst.COIN, offlineCoin, SourceGoodConst.COUNTRYSKILL_OFFLINE, false);
			}
			return new Integer[] { offlineExp, offlineCoin };
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "offlineExpAndCoinHandle");
		}
		return new Integer[] { 0, 0 };
	}

	/**
	 * 国家技能在线经验和铜钱收益处理,用在关卡小怪掉落处理(关卡小怪掉落，扫荡调用)
	 * 
	 * @param hero
	 * @return
	 */
	public void onlineExpAndCoinHandle(Hero hero, List<int[]> dropArr, List<Object[]> dropTips, boolean mopUp) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.COUNTRYSKILL_SYSID)) {
				return;
			}
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			Map<Integer, Integer[]> onAndOfflineExpCoinMap = CountrySkillCache.getOnAndOfflineExpCoinMap();
			Integer[] expCoinArray = onAndOfflineExpCoinMap.get(countryType);
			int onlineExp = expCoinArray[0];
			int onlineCoin = expCoinArray[1];
			if(mopUp) {
				onlineExp = expCoinArray[2] * GuanqiaConst.MOPUP_AWARD_TIME;
				onlineCoin = expCoinArray[3] * GuanqiaConst.MOPUP_AWARD_TIME;
			}
			if (onlineExp > 0) {
				dropArr.add(new int[] { GameConst.EXP, 0, onlineExp });
				mergeHandle(dropTips, GameConst.EXP, onlineExp);
			}
			if (onlineCoin > 0) {
				dropArr.add(new int[] { GameConst.COIN, 0, onlineCoin });
				mergeHandle(dropTips, GameConst.COIN, onlineCoin);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "onlineExpAndCoinHandle");
		}
	}

	/**
	 * 相同类型数组合并处理
	 * 
	 * @param dropTips
	 * @param type
	 * @param num
	 */
	private void mergeHandle(List<Object[]> dropTips, int type, int num) {
		int size = dropTips.size();
		boolean isAdd = true;
		for (int i = 0; i < size; i++) {
			Object[] objArray = dropTips.get(i);
			if ((Integer) objArray[0] == type) {
				objArray[2] = (Integer) objArray[2] + num;
				isAdd = false;
			}
		}
		if (isAdd == true) {
			dropTips.add(new Object[] { type, 0, num });
		}
	}

	/**
	 * 重算国家技能战力
	 * 
	 * @param hero
	 */
	public void countrySkillFightCalc(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.COUNTRYSKILL_SYSID)) {
				return;
			}
			if (hero.getCountryType() == 0) {
				return;
			}
			// 重算国家技能战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.COUNTRYSKILL, SystemIdConst.COUNTRYSKILL_SYSID);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "countrySkillFightCalc");
		}
	}

	/**
	 * 国家技能国王红点取消
	 * 
	 * @param isCancel 红点是否取消，不是取消则是开启
	 */
	public void redPointCancel(boolean isCancel) {
		Hero kingHero = null;
		try {
			CountryType[] types = CountryType.values();
			for (CountryType type : types) {
				int countryId = type.getCountryType();
				kingHero = NewKingShipFunction.getIns().kingHero(countryId);
				if (kingHero == null) {
					return;
				}
				if (!HeroFunction.getIns().checkSystemOpen(kingHero, SystemIdConst.COUNTRYSKILL_SYSID)) {
					return;
				}
				int countryType = kingHero.getCountryType();
				if (countryType == 0) {
					// 没有加入国家
					return;
				}
				if (isCancel) {
					// 国家技能国王红点取消
					RedPointFunction.getIns().fastUpdateRedPoint(kingHero, CountryConst.COUNTRY_SYSID, 1,
							RedPointConst.NO_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(kingHero, SystemIdConst.COUNTRYSKILL_SYSID, 1,
							RedPointConst.NO_RED);
				} else {
					// 国家技能国王红点开启
					redPoint(kingHero, false);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			if (kingHero != null) {
				LogTool.error(e, this, kingHero.getId(), kingHero.getName(), "redPointCancel");
			} else {
				LogTool.error(e, this, "redPointCancel");
			}
		}
	}
	
	
	public void setHeFuDataCountrySkill(List<GlobalData> dataAll, GlobalData globalData) {
		try {
			Map<Integer, Map<Integer, Integer>> countrySkillByTypeMap = new HashMap<>();
			for( GlobalData globalTemp:dataAll){
				String content = globalTemp.getContent();
				if (content == null || content.equals("") || content.equals("{}")) {
					
				} else {
					Map<Integer, Map<Integer, Integer>> map = JSONObject.parseObject(content,
							new TypeReference<Map<Integer, Map<Integer, Integer>>>() {
							}.getType());
					
					CountryType[] types = CountryType.values();
					if (map != null) {
						for (CountryType type : types) {
							int countryType = type.getCountryType();
							Map<Integer, Integer> map2 = map.get(countryType);
							if (map2!=null) {
								if (!countrySkillByTypeMap.containsKey(countryType)) {
									countrySkillByTypeMap.put(countryType, map2);
								}else {
									Map<Integer, Integer> map3 = countrySkillByTypeMap.get(countryType);
									
									Iterator<Entry<Integer, Integer>> it=map2.entrySet().iterator();
									
									while(it.hasNext()){
									    Entry<Integer, Integer> entry = it.next();
									    Integer key = entry.getKey();
									    Integer value = entry.getValue();
									    if (map3.containsKey(key)) {
											if (value>map3.get(key)) {
												map3.put(key, value);
											}
										}else {
											map3.put(key, value);
										}
									    
									}
								}
							}
						}
					}
					
				}
			}
			String countrySkillMapStr = JSON.toJSONString(countrySkillByTypeMap);
			globalData.setContent(countrySkillMapStr);
		} catch (Exception e) {
			LogTool.error(e, CountrySkillFunction.class, "hefuForCountrySkill has wrong");
		}
	}
	/**
	 * 
	 * @param dataAll
	 * @param globalData
	 */
	public void setHeFuDataCountryPrestige(List<GlobalData> dataAll, GlobalData globalData) {
		try {
			Map<Integer, AtomicLong> countryPrestigeByTypeMap=new HashMap<>();
			for( GlobalData globalTemp:dataAll){
				String content = globalTemp.getContent();
				if (content == null || content.equals("") || content.equals("{}")) {

				} else {
					Map<Integer, AtomicLong> map  = JSONObject.parseObject(content,
							new TypeReference<Map<Integer, AtomicLong>>() {
							}.getType());
					
					CountryType[] types = CountryType.values();
					if (map != null) {
						for (CountryType type : types) {
							int countryType = type.getCountryType();
							AtomicLong Atomicnum = map.get(countryType);
							if (Atomicnum!=null) {
								if (!countryPrestigeByTypeMap.containsKey(countryType)) {
									countryPrestigeByTypeMap.put(countryType, Atomicnum);
								}else {
									AtomicLong Atomicoldnum = countryPrestigeByTypeMap.get(countryType);
									long num=Atomicnum.get();
									long oldnum=Atomicoldnum.get();
									if (num>oldnum) {
										Atomicoldnum.set(num);
									}
									
								}
							}
						}
					}
				}
			}
			String countryPrestigeStr =JSON.toJSONString(countryPrestigeByTypeMap);
			globalData.setContent(countryPrestigeStr);
			
		} catch (Exception e) {
			LogTool.error(e, CountrySkillFunction.class, "setHeFuDataCountryPrestige has wrong");
		}
	}
	
	
	

}
