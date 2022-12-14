package com.teamtop.system.dengFengZaoJi;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.callback.Callback;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossTrial.CrossTrialSysEvent;
import com.teamtop.system.dengFengZaoJi.cross.DengFengZaoJiCrossEnum;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJi;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiBattleInfo;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiModel;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiTheFirst;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.mount.Mount;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_dfzjhx2_261;
import excel.config.Config_dfzjhx3_261;
import excel.config.Config_dfzjjs1_261;
import excel.config.Config_dfzjjs3_261;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_dfzjhx2_261;
import excel.struct.Struct_dfzjhx3_261;
import excel.struct.Struct_dfzjjs1_261;
import excel.struct.Struct_dfzjjs3_261;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class DengFengZaoJiFunction {

	private static DengFengZaoJiFunction ins;

	private DengFengZaoJiFunction() {
	}

	public static synchronized DengFengZaoJiFunction getIns() {
		if (ins == null) {
			ins = new DengFengZaoJiFunction();
		}
		return ins;
	}
	
	/**????????????????????????*/
	public void upData() {
		// ?????????10:00 ??????????????????
		ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(RankingConst.STRENGTH_RANKING);
		if (treeSet != null) {
			List<CrossHeroBaseModel> rankList = new ArrayList<>();
			for (BaseRankModel model : treeSet) {
				long hid = model.getHid();
				try {
					Hero hero = HeroCache.getHero(hid);
					if (hero == null) {
						hero = HeroDao.getIns().find(hid, null);
						SystemEventFunction.triggerInitEvent(hero);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.LOGIN, SystemIdConst.SYSID);
					}
					if (hero != null) {
						CrossHeroBaseModel cmodel = new CrossHeroBaseModel();
						CrossFunction.makeCrossBaseHeroModel(cmodel, hero);
						rankList.add(cmodel);
					}
				} catch (Exception e) {
					LogTool.error(e, CrossTrialSysEvent.class, "DengFengZaoJiEvent fixTime hid=" + hid);
				}
			}
			CrossData crossData = new CrossData();
			crossData.putObject(DengFengZaoJiCrossEnum.rankData.name(), rankList);
			crossData.putObject(DengFengZaoJiCrossEnum.time.name(), TimeDateUtil.getMondayZeroTime());
			crossData.putObject(DengFengZaoJiCrossEnum.zoneid.name(), GameProperties.getFirstZoneId());
			Channel channel = Client_2.getIns().getCrossChannel();
			
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_UPDATA, crossData);
			LogTool.info("DengFengZaoJiEvent upload", this);
		}
	}
	
	/**????????????????????????*/
	public void upScore(Hero hero, int score, int type) {
		try {
			CrossHeroBaseModel model = new CrossHeroBaseModel();
			CrossFunction.makeCrossBaseHeroModel(model, hero);
			
			CrossData crossData = new CrossData();
			crossData.putObject(DengFengZaoJiCrossEnum.hid.name(), hero.getId());
			crossData.putObject(DengFengZaoJiCrossEnum.type.name(), type);//0.?????? 1.??????
			crossData.putObject(DengFengZaoJiCrossEnum.score.name(), score);
			crossData.putObject(DengFengZaoJiCrossEnum.heroBaseModel.name(), model);
			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_UPSCORE, crossData);
		}catch (Exception e) {
			LogTool.error(e, DengFengZaoJiFunction.class, "DengFengZaoJiFunction upScore");
		}
	}
	
	/**??????????????????*/
	public void addScore(Hero hero, DengFengZaoJiModel dengFengZaoJiModel, int addScore, int type) {
		int score = dengFengZaoJiModel.getScore();
		int totalScore = score+addScore;
		dengFengZaoJiModel.setScore(totalScore);
		upScore(hero, totalScore, type);
	}
	
	/**
	 * ??????????????????
	 * @param result 1.?????? 0.??????
	 * @param type 0.?????? 1.??????
	 * @return
	 */
	public int getScore(int result, int type, int rank, DengFengZaoJiModel dengFengZaoJiModel) {
		int score = 0;
		try {
			if(type == 0) {
				if(result == 1) {
					Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DengFengZaoJiConst.DENGFENGZAOJI_ABC_BATTLE_ADD);
					int[] arr = struct_xtcs_004.getOther()[0];
					int num = getBattleNum(dengFengZaoJiModel);
					Integer index = DengFengZaoJiConst.battleMap.get(num);
					score = arr[index];
					
					if(num >= DengFengZaoJiConst.SHOW_HAIXUAN) {
						Struct_xtcs_004 hx_struct_xtcs_004 = Config_xtcs_004.getIns().get(DengFengZaoJiConst.DENGFENGZAOJI_BATTLE_ALL_SUCCESS_ADD);
						score = score+hx_struct_xtcs_004.getNum();
					}
				}else {
					Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DengFengZaoJiConst.DENGFENGZAOJI_BATTLE_FAIL_ADD);
					score = struct_xtcs_004.getNum();
				}
			}else {
				if(result == 1) {
					List<Struct_dfzjjs1_261> list = Config_dfzjjs1_261.getIns().getSortList();
					for(Struct_dfzjjs1_261 struct_dfzjjs1_261 : list) {
						int[] rankArr = struct_dfzjjs1_261.getRank()[0];
						int min = rankArr[0];
						int max = rankArr[1];
						if(rank>=min && rank<=max) {
							score = struct_dfzjjs1_261.getPoint();
							break;
						}
					}
				}else {
					Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DengFengZaoJiConst.DENGFENGZAOJI_JUESAI_BATTLE_FAIL_ADD);
					score = struct_xtcs_004.getNum();
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiFunction.class, "DengFengZaoJiFunction getScore");
		}
		
		return score;
	}
	
	/**???????????????*/
	public int getBattleNum(DengFengZaoJiModel dengFengZaoJiModel) {
		int num = 0;
		Map<Long, DengFengZaoJiBattleInfo> battleInfoMap = dengFengZaoJiModel.getBattleMap();
		for(DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo : battleInfoMap.values()) {
			if(dengFengZaoJiBattleInfo.getBattleState() == 1) {
				num++;
			}
		}
		return num;
	}
	
	public List<Object[]> rankList(int type, HashMap<Integer, DengFengZaoJiModel> dengFengZaoJiModelMap, CrossData crossData) {
		Map<Long, DengFengZaoJiBattleInfo> battleMap = new HashMap<Long, DengFengZaoJiBattleInfo>();
		Type typeReference = new TypeReference<List<DengFengZaoJiBattleInfo>>() {}.getType();
		List<DengFengZaoJiBattleInfo> list = crossData.getObject(DengFengZaoJiCrossEnum.rankData.name(), typeReference);
		List<Object[]> objectList = new ArrayList<>();
		for (DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo : list) {
			CrossHeroBaseModel model = dengFengZaoJiBattleInfo.getModel();
			Mount mount = model.getMount();
			int mountId = 0;
			if(mount != null) {
				mountId = mount.getRideId();
			}
			int godWeapon = GodWeaponFunction.getIns().getNowGodWeapon(model);
			int body = FashionClothesManager.getIns().getBodyid(model.getJob(), model.getBodyModel());
			int rank = dengFengZaoJiBattleInfo.getRank();
			objectList.add(new Object[] {rank,model.getId(),model.getNameZoneid(), model.getTotalStrength(),body, godWeapon, mountId,0});
			
			DengFengZaoJiBattleInfo result = DengFengZaoJiBattleInfo.valueOf(rank, 0, model); 
			battleMap.put(model.getId(), result);
		}
		
		DengFengZaoJiModel dengFengZaoJiModel = dengFengZaoJiModelMap.get(type);
		if(dengFengZaoJiModel == null) {
			dengFengZaoJiModel = new DengFengZaoJiModel();
			dengFengZaoJiModelMap.put(type, dengFengZaoJiModel);
		}
		dengFengZaoJiModel.setBattleMap(battleMap);
		return objectList;
	}
	
	public boolean isStart(int type) {
		if(type == 0) {
			return DengFengZaoJiCache.isStart_haixuan;
		}else {
			return DengFengZaoJiCache.isStart_juesai;
		}
	}
	
	/**????????????????????????*/
	public int getNum(int type) {
		if(type == 0) {
			int week = TimeDateUtil.getWeek();
			if(week > 5) {
				week = 5;
			}
			return week*DengFengZaoJiConst.HAIXUAN_NUM;
		}else {
			int week = TimeDateUtil.getWeek();
			if(week > 5) {
				week = week-5;
			}else {
				week = 1;
			}
			return week*DengFengZaoJiConst.JUESAI_NUM;
		}
	}
	/**???????????????*/
	public int getRankNum(int type) {
		if(type == 0) {
			return DengFengZaoJiConst.HAIXUAN;
		}else {
			return DengFengZaoJiConst.JUESAI;
		}
	}
	
	/**?????????????????????????????????????????????????????????*/
	public long getTheFirst(int time) {
		DengFengZaoJiTheFirst dengFengZaoJiTheFirst = getDengFengZaoJiTheFirst();
		Map<Integer, Long> firstMap = dengFengZaoJiTheFirst.getFirstMap();
		Long firstHid = firstMap.get(time);
		if(firstHid == null) {
			return 0;
		}
		return firstHid;
	}
	
	/**???????????????????????????????????????*/
	public DengFengZaoJiTheFirst getDengFengZaoJiTheFirst() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.DENGFENGZAOJI_THE_FIRST);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			return new DengFengZaoJiTheFirst();
		} else {
			DengFengZaoJiTheFirst dengFengZaoJiTheFirst = JSONObject.parseObject(content, DengFengZaoJiTheFirst.class);
			if (dengFengZaoJiTheFirst != null) {
				return dengFengZaoJiTheFirst;
			}
			return new DengFengZaoJiTheFirst();
		}
	}
	
	/**?????????????????????????????????*/
	public void saveTheFirst(int time, long firstHid) {
		try {
			DengFengZaoJiTheFirst dengFengZaoJiTheFirst = getDengFengZaoJiTheFirst();
			Map<Integer, Long> firstMap = dengFengZaoJiTheFirst.getFirstMap();
			firstMap.put(time, firstHid);
			
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.DENGFENGZAOJI_THE_FIRST);
			globalData.setContent(JSON.toJSONString(dengFengZaoJiTheFirst));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiFunction.class, "DengFengZaoJiFunction saveTheFirst");
		}
	}
	
	/**???????????????*/
	public void sendScoreReward(Hero hero) {
		long hid = hero.getId();
		try {
			DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
			
			DengFengZaoJiModel dengFengZaoJiModel = dengFengZaoJi.getDengFengZaoJiModel().get(0);
			if(dengFengZaoJiModel == null) {
				return;//????????????
			}
			int score = dengFengZaoJiModel.getScore();
			if(score == 0) {
				return;
			}
			
			List<Struct_dfzjhx2_261> list = Config_dfzjhx2_261.getIns().getSortList();
			Map<Integer, Integer> map = dengFengZaoJi.getHasReceiveScoreReward();
			if(map!=null && map.size()>=list.size()) {
				return;
			}
			
			for(Struct_dfzjhx2_261 struct_dfzjhx2_261 : list) {
				if(score >= struct_dfzjhx2_261.getPoint()) {
					int id = struct_dfzjhx2_261.getId();
					if(map.get(id) == null) {
						map.put(id, 2);
						int[][] reward = struct_dfzjhx2_261.getReward();
						MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.DENGFENGZAOJI_SCORE_REWARD, new Object[] { MailConst.DENGFENGZAOJI_SCORE_REWARD }, reward);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiFunction.class, hid, hero.getName(), "DengFengZaoJiFunction scoreReward");
		}
	}
	
	/**??????????????????*/
	public void sendBetReward(Hero hero) {
		DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi(); 
		long bethid = dengFengZaoJi.getBetHid();
		if(bethid > 0) {
			int betReceive = dengFengZaoJi.getBetReceive();
			if(betReceive == 0) {
				int time = dengFengZaoJi.getResetTime();
				long firstHid = getTheFirst(time);
				if(firstHid == 0) return;
				dengFengZaoJi.setBetReceive(1);
				int mailType = bethid==firstHid? MailConst.DENGFENGZAOJI_CHAMPIONSHIP_RIGHT:MailConst.DENGFENGZAOJI_CHAMPIONSHIP_WRONG;
				int awardType = bethid==firstHid? DengFengZaoJiConst.DENGFENGZAOJI_CAIDUI_ADD:DengFengZaoJiConst.DENGFENGZAOJI_CAICUO_ADD;
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(awardType);
				int[][] reward = struct_xtcs_004.getOther();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailType, new Object[] { mailType }, reward);
			}
		}
	}
	
	/**???????????????*/
	public void replace(Hero hero, int type) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) {
				return;
			}
			if(type>1 || type<0) {
				return;
			}
			
			long hid = hero.getId();
			
//			boolean isStart = DengFengZaoJiFunction.getIns().isStart(type);
//			if(!isStart) {
//				DengFengZaoJiSender.sendCmd_11960(hid, 3, null, type);
//				return;
//			}
			
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData(); 
			crossData.putObject(DengFengZaoJiCrossEnum.hid.name(), hid);
			crossData.putObject(DengFengZaoJiCrossEnum.type.name(), type);
			NettyWrite.writeXData(channel, CrossConst.LOCAL2CROSS_REPLACE, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
					HashMap<Integer, DengFengZaoJiModel> dengFengZaoJiModelMap = dengFengZaoJi.getDengFengZaoJiModel();
					int myRank = crossData.getObject(DengFengZaoJiCrossEnum.myRank.name(), Integer.class);
					if(type == 1) {
						dengFengZaoJi.setMyRank(myRank);
					}
					DengFengZaoJiFunction.getIns().rankList(type, dengFengZaoJiModelMap, crossData);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiFunction.class, "replace has wrong");
		}
	}
	
	/**
	 * ??????????????????????????????
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DENGFENGZAOJI)) return;
			DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
			if(dengFengZaoJi != null) {
				int week = TimeDateUtil.getWeek();
				if(week == 6) {
					int hour = TimeDateUtil.getHour();
					if(hour >= 10) {
						long betHid = dengFengZaoJi.getBetHid();
						if(betHid == 0) {
							RedPointFunction.getIns().addLoginRedPoint(hero,  SystemIdConst.DENGFENGZAOJI_JUESAI, RedPointConst.HAS_RED, RedPointConst.RED_1);
						}
					}
				}
				HashMap<Integer, DengFengZaoJiModel> dengFengZaoJiModelMap = dengFengZaoJi.getDengFengZaoJiModel();
				
				if(DengFengZaoJiCache.isStart_juesai) {
					DengFengZaoJiModel dengFengZaoJiModel = dengFengZaoJiModelMap.get(1);
					if(dengFengZaoJiModel != null) {
						int num = hasBattleNum(dengFengZaoJiModel, 1);
						if(num > 0) {
							RedPointFunction.getIns().addLoginRedPoint(hero,  SystemIdConst.DENGFENGZAOJI_JUESAI, RedPointConst.HAS_RED, RedPointConst.RED_1);
						}
					}
				}
				
				if(DengFengZaoJiCache.isStart_haixuan) {
					DengFengZaoJiModel dengFengZaoJiModel = dengFengZaoJiModelMap.get(0);
					if(dengFengZaoJiModel != null) {
						int num = hasBattleNum(dengFengZaoJiModel, 0);
						if(num > 0) {
							RedPointFunction.getIns().addLoginRedPoint(hero,  SystemIdConst.DENGFENGZAOJI, RedPointConst.HAS_RED, RedPointConst.RED_1);
							return;
						}
						
						int score = dengFengZaoJiModel.getScore();
						if(score > 0) {
							List<Struct_dfzjhx2_261> list = Config_dfzjhx2_261.getIns().getSortList();
							Map<Integer, Integer> map = dengFengZaoJi.getHasReceiveScoreReward();
							if(map.size() >= Config_dfzjhx2_261.getIns().size()) {
								return;
							}
							
							for(Struct_dfzjhx2_261 struct_dfzjhx2_261 : list) {
								if(score >= struct_dfzjhx2_261.getPoint()) {
									int id = struct_dfzjhx2_261.getId();
									if(map.get(id) == null) {
										RedPointFunction.getIns().addLoginRedPoint(hero,  SystemIdConst.DENGFENGZAOJI, RedPointConst.HAS_RED, RedPointConst.RED_1);
										return;
									}
								}
							}
						}
					}
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "DengFengZaoJiFunction loginRed ??????????????????????????????  ??????");
		}
	}
	
	/**????????????????????????*/
	public int hasBattleNum(DengFengZaoJiModel dengFengZaoJiModel,int type) {
		int hasBattleNum = DengFengZaoJiFunction.getIns().getNum(type);
		if(dengFengZaoJiModel != null) {
			hasBattleNum = hasBattleNum+dengFengZaoJiModel.getBuyNum()-dengFengZaoJiModel.getBattleNum();
			if(hasBattleNum < 0) {
				hasBattleNum = 0;
			}
		}
		return hasBattleNum;
	}
	
	/**??????*/
	public void reset(Hero hero) {
		DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi(); 
		int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
		if(mondayZeroTime != dengFengZaoJi.getResetTime()) {
			int week = TimeDateUtil.getWeek();
			if(week == 1) {
				int hour = TimeDateUtil.getHour();
				if(hour < 10) {
					return;
				}
			}
			dengFengZaoJi.setResetTime(mondayZeroTime);
			sendScoreReward(hero);//??????????????????????????????
			dengFengZaoJi.reset();
		}else {
			if(!DengFengZaoJiCache.isStart_haixuan) {
				sendScoreReward(hero);//??????????????????????????????
			}
		}
	}
	
	/**
	 * ??????????????????????????????????????????int??????
	 * 
	 * @return
	 */
//	public static int getMondayTenTime() {
//		Calendar calendar = Calendar.getInstance(TimeDateUtil.serverTimezone);
//		calendar.setTimeInMillis(TimeDateUtil.getRealTime());
//		calendar.setFirstDayOfWeek(Calendar.MONDAY);
//		calendar.set(Calendar.HOUR_OF_DAY, 10);
//		calendar.set(Calendar.MINUTE, 0);
//		calendar.set(Calendar.SECOND, 0);
//		calendar.set(Calendar.MILLISECOND, 0);
//		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
//		return (int) (calendar.getTimeInMillis() / 1000);
//	}
	
	/**
	 * ??????????????????
	 * @param state 1.???????????? 2.???????????? 0.??????
	 */
	public void activityStart(int state) {
		for (Hero hero:HeroCache.getHeroMap().values()) {
			if (hero.isOnline()) {
				DengFengZaoJiSender.sendCmd_11972(hero.getId(), state);
			}
		}
	}
	
	
	/**
	 * ????????????????????????
	 * @param type 0.?????? 1.??????
	 * @param key ???????????????
	 * @return
	 */
	public int[][] getConsume(int type, int key) {
		int[][] consume = null;
		if(type == 0) {
			Struct_dfzjhx3_261 struct_dfzjhx3_261 = Config_dfzjhx3_261.getIns().get(key);
			consume = struct_dfzjhx3_261.getConsume();
		}else {
			Struct_dfzjjs3_261 struct_dfzjjs3_261 = Config_dfzjjs3_261.getIns().get(key);
			consume = struct_dfzjjs3_261.getConsume();
		}
		return consume;
	}
	
	/**
	 * ???????????????????????????????????????
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addDengfengzaojiNum(Hero hero, int id, int num) {
		try {
			if(DengFengZaoJiCache.isStart_haixuan) {
				DengFengZaoJiFunction.getIns().reset(hero);
				DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
				HashMap<Integer, DengFengZaoJiModel> map = dengFengZaoJi.getDengFengZaoJiModel();
				DengFengZaoJiModel dengFengZaoJiModel = map.get(0);
				dengFengZaoJiModel.setBuyNum(dengFengZaoJiModel.getBuyNum()+num);
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiFunction.class, "addDengfengzaojiNum has wrong");
		}
		return false;
	}
}
