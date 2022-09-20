package com.teamtop.system.dengFengZaoJi.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.dengFengZaoJi.DengFengZaoJiCache;
import com.teamtop.system.dengFengZaoJi.DengFengZaoJiConst;
import com.teamtop.system.dengFengZaoJi.DengFengZaoJiFunction;
import com.teamtop.system.dengFengZaoJi.event.DengFengZaoJiCrossEvent;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJi;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiBattleInfo;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiCrossModel;
import com.teamtop.system.dengFengZaoJi.model.RankRewardCrossModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.robot.CrossHeroBaseRobot;
import com.teamtop.util.common.DateUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_dfzjhx1_261;
import excel.config.Config_dfzjjs1_261;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_dfzjhx1_261;
import excel.struct.Struct_dfzjjs1_261;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class DengFengZaoJiCrossIO {
	
	private static DengFengZaoJiCrossIO ins;
	
	public static synchronized DengFengZaoJiCrossIO getIns(){
		if(ins == null) {
			ins = new DengFengZaoJiCrossIO();
		}
		return ins;
	}
	
	//每周一10点中央服接到子服上传数据
	public synchronized void crossUpdata(Channel channel, CrossData crossData) {
		try {
			Type type = new TypeReference<List<CrossHeroBaseRobot>>() {}.getType();
			List<CrossHeroBaseModel> list = crossData.getObject(DengFengZaoJiCrossEnum.rankData.name(), type);
 			int time = crossData.getObject(DengFengZaoJiCrossEnum.time.name(), Integer.class);
			int zoneid = crossData.getObject(DengFengZaoJiCrossEnum.zoneid.name(), Integer.class);
			
			//每周重置
			DengFengZaoJiCrossCache.reset(time);
			
			Map<Integer, Integer> zoneidMap = DengFengZaoJiCrossCache.getZoneidMap();
			Integer zoneNum = zoneidMap.get(zoneid);
			if(zoneNum != null) {
				return;
			}
			
			List<CrossHeroBaseModel> fightList = DengFengZaoJiCrossCache.getFightList();
			
			zoneidMap.put(zoneid, list.size());
			
			fightList.addAll(list);
			
			Collections.sort(fightList, new Comparator<CrossHeroBaseModel>() {   
			    public int compare(CrossHeroBaseModel o1, CrossHeroBaseModel o2) {    
			    	if(o2.getTotalStrength() > o1.getTotalStrength()){
						return 1;
					}else if(o2.getTotalStrength() < o1.getTotalStrength()){
						return -1;
					}else {
						return 0;
					}
			    }
			}); 
			
			LogTool.info("DengFengZaoJiCrossIO.crossUpdata zoneid:"+zoneid+"time:"+time+"上传成功："+ (fightList.size()/20)+"服"+ "  时间:"+System.currentTimeMillis()+ "  size:"+fightList.size(), this);
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO crossUpdata");
		}
	}
	
	
	//上传数据
	public void localAskUpdata(Channel channel, CrossData crossData) {
		try {
			DengFengZaoJiFunction.getIns().upData();
			//开启设置
			int week = TimeDateUtil.getWeek();
			int hour = TimeDateUtil.getHour();
			if(week > 5) {
				if(week == 6) {
					if(hour >= 10) {
						DengFengZaoJiCache.isStart_juesai = true;
					}
				}else {
					DengFengZaoJiCache.isStart_juesai = true;
				}
			}else {
				if(week == 1) {
					if(hour >= 10) {
						DengFengZaoJiCache.isStart_haixuan = true;
					}
				}else {
					DengFengZaoJiCache.isStart_haixuan = true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO localAskUpdata");
		}
	}
	
	//中央服接到子服上传的积分数据
	public void crossUpscore(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(DengFengZaoJiCrossEnum.hid.name(), Long.class);
			int type = crossData.getObject(DengFengZaoJiCrossEnum.type.name(), Integer.class);
			int score = crossData.getObject(DengFengZaoJiCrossEnum.score.name(), Integer.class);
			CrossHeroBaseModel model = crossData.getObject(DengFengZaoJiCrossEnum.heroBaseModel.name(), CrossHeroBaseModel.class);
			
			DengFengZaoJiCrossModel cache = DengFengZaoJiCrossCache.getCache();
			Map<Integer, List<RankRewardCrossModel>> map = cache.getRankRewardMap();
			List<RankRewardCrossModel> list = map.get(type);
			if(list == null) {
				if(type == 1) return;//决赛列表没人，不做处理
				list = new ArrayList<RankRewardCrossModel>();
				map.put(type, list);
				RankRewardCrossModel rankRewardCrossModel = RankRewardCrossModel.valueOf(score, model.getTotalStrength(), model);
				list.add(rankRewardCrossModel);
				return;
			}else {
				for(RankRewardCrossModel crossModel : list) {
					if(hid == crossModel.getModel().getId()) {
						crossModel.setScore(score);
						crossModel.setStrength(model.getTotalStrength());
						crossModel.setModel(model);
						DengFengZaoJiCrossFunction.getIns().sort(list);
						return;
					}
				}
				if(type == 1) return;//未进决赛，不做处理
				int size = list.size();
				int num = DengFengZaoJiFunction.getIns().getRankNum(type);
				if(size >= num) {
					RankRewardCrossModel lastRankRewardCrossModel = list.get(size-1);
					if(score > lastRankRewardCrossModel.getScore()) {
						list.remove(lastRankRewardCrossModel);
						
						RankRewardCrossModel rankRewardCrossModel = RankRewardCrossModel.valueOf(score, model.getTotalStrength(), model);
						list.add(rankRewardCrossModel);
						DengFengZaoJiCrossFunction.getIns().sort(list);
					}
				}else {
					RankRewardCrossModel rankRewardCrossModel = RankRewardCrossModel.valueOf(score, model.getTotalStrength(), model);
					list.add(rankRewardCrossModel);
					DengFengZaoJiCrossFunction.getIns().sort(list);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO crossUpscore");
		}
	}
	//中央服返回我的排名
	public void crossMyrank(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(DengFengZaoJiCrossEnum.hid.name(), Long.class);
			int type = crossData.getObject(DengFengZaoJiCrossEnum.type.name(), Integer.class);
			int myRank = getMyRank(hid, type);
			
			crossData.putObject(DengFengZaoJiCrossEnum.myRank.name(), myRank);
			if(type == 1) {
				DengFengZaoJiCrossModel cache = DengFengZaoJiCrossCache.getCache();
				List<RankRewardCrossModel> fightList2 = cache.getRankRewardMap().get(type);
				if(fightList2 != null) {
					RankRewardCrossModel rankRewardCrossModel = fightList2.get(0);
					CrossHeroBaseModel model = rankRewardCrossModel.getModel();
					DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo = DengFengZaoJiBattleInfo.valueOf(1, 0, model);
					crossData.putObject(DengFengZaoJiCrossEnum.rankData.name(), dengFengZaoJiBattleInfo);
				}
			}
			
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO crossMyrank");
		}
	}
	//中央服返回决赛第一名玩家数据
	public void crossFirstRank(Channel channel, CrossData crossData) {
		try {
			int type = crossData.getObject(DengFengZaoJiCrossEnum.type.name(), Integer.class);
			
			if(type == 1) {
				DengFengZaoJiCrossModel cache = DengFengZaoJiCrossCache.getCache();
				List<RankRewardCrossModel> fightList2 = cache.getRankRewardMap().get(type);
				if(fightList2 != null) {
					RankRewardCrossModel rankRewardCrossModel = fightList2.get(0);
					CrossHeroBaseModel model = rankRewardCrossModel.getModel();
					DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo = DengFengZaoJiBattleInfo.valueOf(1, 0, model);
					crossData.putObject(DengFengZaoJiCrossEnum.rankData.name(), dengFengZaoJiBattleInfo);
					
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO crossMyrank");
		}
	}
	
	//中央服返回登峰造极数据
	public void crossOpenUI(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(DengFengZaoJiCrossEnum.hid.name(), Long.class);
			int type = crossData.getObject(DengFengZaoJiCrossEnum.type.name(), Integer.class);
			int myRank = getMyRank(hid, type);
			
			//List<CrossHeroBaseModel> list = new ArrayList<CrossHeroBaseModel>();
			//List<DengFengZaoJiBattleInfo> list = new ArrayList<DengFengZaoJiBattleInfo>();
			
			List<DengFengZaoJiBattleInfo> list = showData(hid, type);
			
			crossData.putObject(DengFengZaoJiCrossEnum.myRank.name(), myRank);
			crossData.putObject(DengFengZaoJiCrossEnum.rankData.name(), list);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO crossOpenUI");
		}
	}

	private List<DengFengZaoJiBattleInfo> showData(long hid, int type) {
		List<DengFengZaoJiBattleInfo> list = new ArrayList<DengFengZaoJiBattleInfo>();
		try {
			Map<Long,Integer> ids = new HashMap<Long,Integer>();
			int n = 0;//随到相同的玩家次数
			for(int i=1; i<=6-type; i++) {
				if(n >= 20) {
					break;
				}
				if(type == 0) {
					List<CrossHeroBaseModel> fightList = DengFengZaoJiCrossCache.getFightList();
					int size = fightList.size();
					int index = DengFengZaoJiCrossFunction.getIns().getRankIndex(type, i, size);
					if(index == -1) {
						break;
					}
					CrossHeroBaseModel crossHeroBaseModel = fightList.get(index);
					if(hid==crossHeroBaseModel.getId() || ids.get(crossHeroBaseModel.getId())!=null) {
						i--;
						n++;
					}else {
						ids.put(crossHeroBaseModel.getId(), 1);
						DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo = DengFengZaoJiBattleInfo.valueOf(fightList.indexOf(crossHeroBaseModel)+1, 0, crossHeroBaseModel);
						list.add(dengFengZaoJiBattleInfo);
					}
					if(list.size()>=DengFengZaoJiConst.SHOW_HAIXUAN || list.size()>=size) {
						break;
					}
				}else {
					DengFengZaoJiCrossModel cache = DengFengZaoJiCrossCache.getCache();
					List<RankRewardCrossModel> fightList2 = cache.getRankRewardMap().get(type);
					if(fightList2 != null) {
						int size = fightList2.size();
						int index2 = DengFengZaoJiCrossFunction.getIns().getRankIndex(type, i, size);
						if(index2 == -1) {
							break;
						}
						RankRewardCrossModel rankRewardCrossModel = fightList2.get(index2);
						CrossHeroBaseModel model = rankRewardCrossModel.getModel();
						if(ids.get(model.getId()) != null) {
							i--;
							n++;
						}else {
							if(index2 > 0) {
								if(hid == model.getId()) {
									i--;
									n++;
								}else {
									ids.put(model.getId(), 1);
									DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo = DengFengZaoJiBattleInfo.valueOf(fightList2.indexOf(rankRewardCrossModel)+1, 0, model);
									list.add(dengFengZaoJiBattleInfo);
								}
							}else {
								ids.put(model.getId(), 1);
								DengFengZaoJiBattleInfo dengFengZaoJiBattleInfo = DengFengZaoJiBattleInfo.valueOf(fightList2.indexOf(rankRewardCrossModel)+1, 0, model);
								list.add(dengFengZaoJiBattleInfo);
							}
						}
						if(list.size()>=DengFengZaoJiConst.SHOW_JUESAI || list.size()>=size) {
							break;
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO showData");
		}
		return list;
	}

	/**获得我的排名*/
	private int getMyRank(long hid, int type) {
		int myRank = 0;
		DengFengZaoJiCrossModel cache = DengFengZaoJiCrossCache.getCache();
		Map<Integer, List<RankRewardCrossModel>> map = cache.getRankRewardMap();
		List<RankRewardCrossModel> list = map.get(type);
		if(list != null) {
			for(RankRewardCrossModel rankRewardCrossModel : list) {
				CrossHeroBaseModel model = rankRewardCrossModel.getModel();
				if(model != null) {
					if(hid == model.getId()) {
						myRank = list.indexOf(rankRewardCrossModel)+1;
						break;
					}
				}
			}
		}
		return myRank;
	}
	//中央服返回换一批数据
	public void crossReplace(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(DengFengZaoJiCrossEnum.hid.name(), Long.class);
			int type = crossData.getObject(DengFengZaoJiCrossEnum.type.name(), Integer.class);
			
			List<DengFengZaoJiBattleInfo> list = showData(hid, type);
			int myRank = getMyRank(hid, type);
			crossData.putObject(DengFengZaoJiCrossEnum.myRank.name(), myRank);
			crossData.putObject(DengFengZaoJiCrossEnum.rankData.name(), list);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO crossReplace");
		}
	}
	
	//中央服返回排行奖励数据
	public void crossRankReward(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(DengFengZaoJiCrossEnum.hid.name(), Long.class);
			int type = crossData.getObject(DengFengZaoJiCrossEnum.type.name(), Integer.class);
			
			List<Object[]> list = new ArrayList<Object[]>();
			
			int myRank = 0;
			DengFengZaoJiCrossModel cache = DengFengZaoJiCrossCache.getCache();
			Map<Integer, List<RankRewardCrossModel>> map = cache.getRankRewardMap();
			List<RankRewardCrossModel> modelList = map.get(type);
			if(modelList != null) {
				for(RankRewardCrossModel rankRewardCrossModel : modelList) {
					CrossHeroBaseModel model = rankRewardCrossModel.getModel();
					if(model != null) {
						if(hid == model.getId()) {
							myRank = modelList.indexOf(rankRewardCrossModel)+1;
						}
						Object[] obj = new Object[] {modelList.indexOf(rankRewardCrossModel)+1,model.getNameZoneid(),rankRewardCrossModel.getScore()};
						list.add(obj);
					}
				}
			}
			
			crossData.putObject(DengFengZaoJiCrossEnum.myRank.name(), myRank);
			crossData.putObject(DengFengZaoJiCrossEnum.objectList.name(), list);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO crossRankReward");
		}
	}
	//中央服返回冠军预测数据
	public void crossGetPredictData(Channel channel, CrossData crossData) {
		try {
			List<Object[]> list = new ArrayList<Object[]>();
			DengFengZaoJiCrossModel cache = DengFengZaoJiCrossCache.getCache();
			Map<Integer, List<RankRewardCrossModel>> map = cache.getRankRewardMap();
			List<RankRewardCrossModel> juesaiList = map.get(1);
			if(juesaiList != null) {
				List<RankRewardCrossModel> modelList = map.get(0);
				if(modelList != null) {
					int size = DengFengZaoJiConst.JUESAI;
					if(DengFengZaoJiConst.JUESAI > modelList.size()) {
						size = modelList.size();
					}
					for(int i=0; i<size; i++) {
						RankRewardCrossModel rankRewardCrossModel = modelList.get(i);
						CrossHeroBaseModel model = rankRewardCrossModel.getModel();
						if(model != null) {
							Object[] obj = new Object[] {model.getId(),model.getNameZoneid(),model.getTotalStrength(),model.getIcon(),model.getFrame()};
							list.add(obj);
						}
					}
				}
			}
			crossData.putObject(DengFengZaoJiCrossEnum.objectList.name(), list);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO crossGetPredictData");
		}
	}
	
	/**周日22点通知子服发下注奖励*/
	public void localSendBetAwards(Channel channel, CrossData crossData) {
		try {
			DengFengZaoJiCache.isStart_juesai = false;
			int time = crossData.getObject(DengFengZaoJiCrossEnum.time.name(), Integer.class);
			long firstHid = crossData.getObject(DengFengZaoJiCrossEnum.hid.name(), Long.class);
			DengFengZaoJiFunction.getIns().saveTheFirst(time, firstHid);
			//全服发下注奖励
			for (Hero hero:HeroCache.getHeroMap().values()) {
				if (hero.isOnline()) {
					DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
					if(dengFengZaoJi != null) {
						long bethid = dengFengZaoJi.getBetHid();
						if(bethid > 0) {
							dengFengZaoJi.setBetReceive(1);
							int mailType = bethid==firstHid? MailConst.DENGFENGZAOJI_CHAMPIONSHIP_RIGHT:MailConst.DENGFENGZAOJI_CHAMPIONSHIP_WRONG;
							int awardType = bethid==firstHid? DengFengZaoJiConst.DENGFENGZAOJI_CAIDUI_ADD:DengFengZaoJiConst.DENGFENGZAOJI_CAICUO_ADD;
							Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(awardType);
							int[][] reward = struct_xtcs_004.getOther();
							MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailType, new Object[] { mailType }, reward);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO localSendBetAwards");
		}
	}
	
	/**周日24点发排行奖励*/
	public void localSendRankAwards(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(DengFengZaoJiCrossEnum.hid.name(), Long.class);
			int type = crossData.getObject(DengFengZaoJiCrossEnum.type.name(), Integer.class);
			int myRank = crossData.getObject(DengFengZaoJiCrossEnum.myRank.name(), Integer.class);
			
			int[][] reward = null;
			int mailType = 0;
			if(type == 0) {
				mailType = MailConst.DENGFENGZAOJI_HAIXUAN_RANK;
				List<Struct_dfzjhx1_261> list = Config_dfzjhx1_261.getIns().getSortList();
				for(Struct_dfzjhx1_261 struct_dfzjhx1_261 : list) {
					int[] arr = struct_dfzjhx1_261.getRank()[0];
					if(myRank>=arr[0] && myRank<=arr[1]) {
						reward = struct_dfzjhx1_261.getReward(); 
						break;
					}
				}
			}else {
				mailType = MailConst.DENGFENGZAOJI_JUESAI_RANK;
				List<Struct_dfzjjs1_261> list = Config_dfzjjs1_261.getIns().getSortList();
				for(Struct_dfzjjs1_261 struct_dfzjjs1_261 : list) {
					int[] arr = struct_dfzjjs1_261.getRank()[0];
					if(myRank>=arr[0] && myRank<=arr[1]) {
						reward = struct_dfzjjs1_261.getReward();
						break;
					}
				}
			}
			
			if(reward != null) {
				MailFunction.getIns().sendMailWithFujianData2(hid, mailType, new Object[] { mailType,myRank }, reward);
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO localSendRankAwards");
		}
	}
	
	public void crossNotice(Channel channel, CrossData crossData) {
		try {
			int type = crossData.getObject(DengFengZaoJiCrossEnum.type.name(), Integer.class);
		 
			switch(type) {
			case 1 : case 2: case 3:
				DengFengZaoJiCrossEvent.getIns().fixTime(type, 0);break;
			case 4 : //重置
				DengFengZaoJiCrossCache.reset((int)(DateUtil.getCurrentTime()/1000));break;
			//case 5 : 
			//	DengFengZaoJiCrossFunction.getIns().finalHero(); break;
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossIO.class, "DengFengZaoJiCrossIO crossNotice");
		}
	}
}
