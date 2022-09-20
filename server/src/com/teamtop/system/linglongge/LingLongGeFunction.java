package com.teamtop.system.linglongge;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.linglongge.model.LiLoZoneidRewardHis;
import com.teamtop.system.linglongge.model.LingLongCrossCache;
import com.teamtop.system.linglongge.model.LingLongGe;
import com.teamtop.system.linglongge.model.LingLongGeNoticeModel;
import com.teamtop.system.linglongge.model.LingLongGeRankComparator;
import com.teamtop.system.linglongge.model.LingLongGeRankModel;
import com.teamtop.system.linglongge.model.LingLongGeRankZoneid;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_kuafu_200;
import excel.struct.Struct_llgpoint_239;

public class LingLongGeFunction {
	private static LingLongGeFunction ins = null;

	public static LingLongGeFunction getIns() {
		if (ins == null) {
			ins = new LingLongGeFunction();
		}
		return ins;
	}

	private LingLongGeFunction() {
	}

//	/**
//	 * 初始化配置表 改变模式
//	 */
//	public void initConfig() {
//		int betweenOpen = TimeDateUtil.betweenOpen();
//		int weekRemain = betweenOpen % LingLongGeConst.WEEK;
//		List<Struct_llg_239> llgList = Config_llg_239.getIns().getSortList();
//		if (betweenOpen <= 7) {
//			LingLongGeSysCache.setLlgTable(llgList.get(betweenOpen - 1));
//		} else {
//			for (Struct_llg_239 struct_llg_239 : llgList) {
//				if (weekRemain == 0) {
//					if (struct_llg_239.getWeek() == LingLongGeConst.WEEK) {
//						LingLongGeSysCache.setLlgTable(struct_llg_239);
//					}
//				} else {
//					if (struct_llg_239.getWeek() == weekRemain) {
//						LingLongGeSysCache.setLlgTable(struct_llg_239);
//					}
//				}
//			}
//		}
//
//		List<Struct_llgpoint_239> llgpointList = Config_llgpoint_239.getIns().getSortList();
//		List<Struct_llgpoint_239> llgScoreTableList = LingLongGeSysCache.getLlgScoreTableList();
//		llgScoreTableList.clear();
//		for (Struct_llgpoint_239 struct_llgpoint_239 : llgpointList) {
//			if (struct_llgpoint_239.getLlg() == LingLongGeSysCache.getLlgTable().getId()) {
//				llgScoreTableList.add(struct_llgpoint_239);
//			}
//		}
//
//		List<Struct_llgrank_239> llgrankList = Config_llgrank_239.getIns().getSortList();
//		List<Struct_llgrank_239> llgRankTableList = LingLongGeSysCache.getLlgRankTableList();
//		llgRankTableList.clear();
//		for (Struct_llgrank_239 struct_llgrank_239 : llgrankList) {
//			if (struct_llgrank_239.getLlg() == LingLongGeSysCache.getLlgTable().getId()) {
//				llgRankTableList.add(struct_llgrank_239);
//			}
//		}
//
//		Map<Integer, List<ProbabilityEventModel>> genAndHigtAwardMap = LingLongGeSysCache.getGenAndHigtAwardMap();
//		String genReward = LingLongGeSysCache.getLlgTable().getReward1();
//		String highReward = LingLongGeSysCache.getLlgTable().getReward2();
//		genAndHigtAwardMap.put(LingLongGeConst.GENAWARD_GAILVEVENT_KEY, ExcelJsonUtils.getGeneralDropData(genReward));
//		genAndHigtAwardMap.put(LingLongGeConst.HIGHAWARD_GAILVEVENT_KEY, ExcelJsonUtils.getGeneralDropData(highReward));
//
//	}

	/**
	 * 刷新每日目标积分奖励状态列表
	 */
	public void refreshScoreAwardList(Hero hero,int addNum) {
		try {
			int sourceMax=Config_xtcs_004.getIns().get(LingLongGeConst.SCUREMAX_SEVEN).getNum();
			if (TimeDateUtil.serverOpenOverDays(7)) {
				sourceMax=Config_xtcs_004.getIns().get(LingLongGeConst.SCUREMAX_NUM).getNum();
			}
			List<Struct_llgpoint_239> llgScoreTableList = LingLongGeSysCache.getLlgScoreTableMap()
					.get(LingLongGeFunction.getIns().getTableId());
			LingLongGe linglongge = hero.getLinglongge();
			List<Integer> scoreAwardList = linglongge.getScoreAwardList();
			int size = scoreAwardList.size();
			for (int j = 0; j < addNum; j++) {
				int oldscore=linglongge.getScore()%sourceMax;
				linglongge.setScore(linglongge.getScore()+LingLongGeConst.BUYONE_GAINSCORE);
				int score = linglongge.getScore()%sourceMax;
				if (score==0&&linglongge.getScore()!=0) {
					//4000 8000 12000 整除
					score=sourceMax;
				}
				for (int i = 0; i < size; i++) {
					Integer oldNum = scoreAwardList.get(i);
					Struct_llgpoint_239 struct_llgpoint_239 = llgScoreTableList.get(i);
					int needScore = struct_llgpoint_239.getPoint();
					if (score >= needScore&&oldscore<needScore) {
						if (oldNum==LingLongGeConst.ALL_GET) {
							oldNum=0;
						}
						int nownum=oldNum+1;
						scoreAwardList.set(i,nownum);
						LingLongGeSender.sendCmd_2228(hero.getId(), -1, struct_llgpoint_239.getId(), nownum);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "LingLongGeFunction refreshScoreAwardList has wrong");
		}
	}

	/**
	 * 刷新获奖公告列表
	 * 
	 * @param hero
	 * @param lingLongGeNoticeModel
	 * @param type                  1:刷新获奖公告列表，0：更改名字
	 */
	public void refreshAwardNoticeList(final Hero hero, final LingLongGeNoticeModel lingLongGeNoticeModel,
			final int type) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					List<LingLongGeNoticeModel> awardNoticeList = LingLongGeSysCache.getAwardNoticeList();
					if (type == 0) {
						for (LingLongGeNoticeModel lingLongGeNoticeModel : awardNoticeList) {
							if (lingLongGeNoticeModel.getHid() == hero.getId()) {
								lingLongGeNoticeModel.setName(hero.getNameZoneid());
							}
						}
					} else {
						int size = awardNoticeList.size();
						if (size < LingLongGeConst.AWARD_NOTICE_NUM) {
							awardNoticeList.add(lingLongGeNoticeModel);
						} else {
							awardNoticeList.remove(0);
							awardNoticeList.add(lingLongGeNoticeModel);
						}
					}
				}

				@Override
				public Object getSession() {
					// TODO Auto-generated method stub
					return OpTaskConst.LINGLONGGE_AWARDNOTICE;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "LingLongGeFunction refreshAwardNoticeList has wrong");
		}
	}

	/**
	 * 刷新每日本服玩家积分排名
	 * 
	 * @param hero
	 * @param type 1:刷新每日本服玩家积分排名，0：更改名字
	 */
	public void refreshLingLongGeRankList(final Hero hero, final int type) {
		try {

			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					List<LingLongGeRankModel> lingLongGeRankList = LingLongGeSysCache.getLingLongGeRankList();
					LingLongGeRankModel lingLongGeRankModel = new LingLongGeRankModel();
					lingLongGeRankModel.setHid(hero.getId());
					lingLongGeRankModel.setName(hero.getNameZoneid());
					lingLongGeRankModel.setScore(hero.getLinglongge().getScore());
					lingLongGeRankModel.setReachTime(TimeDateUtil.getCurrentTime());
					int indexOf = lingLongGeRankList.indexOf(lingLongGeRankModel);
					if (type == 1) {
						if (indexOf < 0) {
							lingLongGeRankList.add(lingLongGeRankModel);
						} else {
							LingLongGeRankModel lingLongGeRankModel2 = lingLongGeRankList.get(indexOf);
							lingLongGeRankModel2.setScore(lingLongGeRankModel.getScore());
							lingLongGeRankModel2.setReachTime(lingLongGeRankModel.getReachTime());
						}
						sortRank(lingLongGeRankList);
					} else {
						if (indexOf >= 0) {
							LingLongGeRankModel lingLongGeRankModel2 = lingLongGeRankList.get(indexOf);
							lingLongGeRankModel2.setName(hero.getNameZoneid());
						}
					}
				}

				@Override
				public Object getSession() {
					// TODO Auto-generated method stub
					return OpTaskConst.LINGLONGGE_SCORERANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "LingLongGeFunction refreshLingLongGeRankList has wrong");
		}
	}

	public void sortRank(List<LingLongGeRankModel> lingLongGeRankList) {
		Collections.sort(lingLongGeRankList, new LingLongGeRankComparator());
		int size = lingLongGeRankList.size();
		for (int i = 0; i < size; i++) {
			if (i > LingLongGeConst.RANK_NUM) {
				lingLongGeRankList.remove(i);
			}
		}
	}

	/**
	 * 取得玲珑阁配置id
	 * 
	 * @return
	 */
	public int getTableId() {
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (betweenOpen <= 7) {
			return 10 + betweenOpen;
		} else {
			int week = TimeDateUtil.getWeek();
			return 20 + week;
		}
	}
	
	/**
	 * 取得前一天玲珑阁配置id
	 * 
	 * @return
	 */
	public int getTableIdBeforeOneDay() {
		int betweenOpen = TimeDateUtil.betweenOpen();
		if(betweenOpen==1) {
			return 0;
		}
		if (betweenOpen <= 8) {
			return 10 + betweenOpen-1;
		} else {
			int week = TimeDateUtil.getWeek();
			if(week==1) {
				return 20 + 7;
			}else {
				return 20 + week;
			}
		}
	}

	/**
	 * 处理合服数据
	 * 
	 * @throws Exception
	 */
	public void setHeFuData(int firstZoneid,List<GlobalData> dataAll, GlobalData globalData) throws Exception {
		//达标玩家集合
		List<Long> zoneidRewardHis=new ArrayList<>();
		//本服总积分
		int score=0;
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					LiLoZoneidRewardHis data = ObjStrTransUtil.toObj(content, LiLoZoneidRewardHis.class);
					List<Long> zoneidRewardHis2 = data.getZoneidRewardHis();
					score=score+data.getScore();
					zoneidRewardHis.addAll(zoneidRewardHis2);
				} catch (Exception e) {
					LogTool.error(e, LingLongGeFunction.class, "setHeFuData has wrong");

				}
			}
		}
		LiLoZoneidRewardHis data = new LiLoZoneidRewardHis();
		data.setZoneidRewardHis(zoneidRewardHis);
		data.setScore(score);
		globalData.setContent(ObjStrTransUtil.toStr(data));
	}
	
	/**
	 * 合并中央服数据 只合并数据
	 * @param firstZoneid
	 * @param dataAll
	 * @param globalData
	 * @throws Exception
	 */
	public void setBigHeFuData(int firstZoneid,List<GlobalData> dataAll, GlobalData globalData) throws Exception {
		///** 获奖公告列表 **/
		Map<Integer, List<LingLongGeNoticeModel>> pAwardNoticeList=new HashMap<Integer, List<LingLongGeNoticeModel>>();
		//每日本服玩家积分排名
		Map<Integer, List<LingLongGeRankModel>> pLingLongGeRankList=new HashMap<Integer, List<LingLongGeRankModel>>();
		//区积分排名
		Map<Integer, List<LingLongGeRankZoneid>> pZoneidRankList=new HashMap<>();
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					LingLongCrossCache obj = ObjStrTransUtil.toObj(content, LingLongCrossCache.class);
					Map<Integer, List<LingLongGeRankModel>> tempLingLongGeRank = obj.getPLingLongGeRankList();
					for (Integer key: tempLingLongGeRank.keySet()) {
						if (!pLingLongGeRankList.containsKey(key)) {
							pLingLongGeRankList.put(key, tempLingLongGeRank.get(key));
						}
					}
					Map<Integer, List<LingLongGeRankZoneid>> tempZoneidRankList = obj.getPZoneidRankList();
					for (Integer key: tempZoneidRankList.keySet()) {
						if (!pZoneidRankList.containsKey(key)) {
							pZoneidRankList.put(key, tempZoneidRankList.get(key));
						}
					}
				} catch (Exception e) {
					LogTool.error(e, LingLongGeFunction.class, "setBigHeFuData has wrong");

				}
			}
		}
		LingLongCrossCache data = new LingLongCrossCache();
		data.setPAwardNoticeList(pAwardNoticeList);
		data.setPLingLongGeRankList(pLingLongGeRankList);
		data.setPZoneidRankList(pZoneidRankList);
		globalData.setContent(ObjStrTransUtil.toStr(data));
		LogTool.info("setBigHeFuData linglongge success", LingLongGeFunction.class);
		
	}
	
	/**
	 * 处理合大跨服组数据 并重新排序
	 * 
	 * @throws Exception
	 */
	public void setCrossBigHeZuData(List<GlobalData> dataAll, GlobalData globalData) throws Exception {
		///** 获奖公告列表 **/
		Map<Integer, List<LingLongGeNoticeModel>> pAwardNoticeList=new HashMap<Integer, List<LingLongGeNoticeModel>>();
		//每日本服玩家积分排名
		Map<Integer, List<LingLongGeRankModel>> pLingLongGeRankList=new HashMap<Integer, List<LingLongGeRankModel>>();
		//区积分排名
		Map<Integer, List<LingLongGeRankZoneid>> pZoneidRankList=new HashMap<>();
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					Map<Integer, Struct_kuafu_200> map = Config_kuafu_200.getIns().getMap();
					
					LingLongCrossCache obj = ObjStrTransUtil.toObj(content, LingLongCrossCache.class);
					Map<Integer, List<LingLongGeRankModel>> tempLingLongGeRank = obj.getPLingLongGeRankList();
					for (Integer key: tempLingLongGeRank.keySet()) {
						int goalKey=key;
						Struct_kuafu_200 struct_kuafu_200 = map.get(key);
						if(struct_kuafu_200.getCl()==1) {
							int mb = struct_kuafu_200.getMb();
							goalKey=mb;
						}
						if (!pLingLongGeRankList.containsKey(goalKey)) {
							pLingLongGeRankList.put(goalKey, tempLingLongGeRank.get(key));
						}else {
							List<LingLongGeRankModel> list = pLingLongGeRankList.get(goalKey);
							list.addAll(tempLingLongGeRank.get(key));
						}
					}
					Map<Integer, List<LingLongGeRankZoneid>> tempZoneidRankList = obj.getPZoneidRankList();
					for (Integer key: tempZoneidRankList.keySet()) {
						int goalKey=key;
						Struct_kuafu_200 struct_kuafu_200 = map.get(key);
						if(struct_kuafu_200.getCl()==1) {
							int mb = struct_kuafu_200.getMb();
							goalKey=mb;
						}
						if (!pZoneidRankList.containsKey(goalKey)) {
							pZoneidRankList.put(goalKey, tempZoneidRankList.get(key));
						}else {
							List<LingLongGeRankZoneid> list = pZoneidRankList.get(goalKey);
							list.addAll(tempZoneidRankList.get(key));
						}
					}
				} catch (Exception e) {
					LogTool.error(e, LingLongGeFunction.class, "setHeFuData has wrong");

				}
			}
		}
	
		for (List<LingLongGeRankModel> ranklist: pLingLongGeRankList.values()) {
			LingLongGeLocalIO.getIns().sortRank(ranklist);
		}
		for (List<LingLongGeRankZoneid> rankZoneidList: pZoneidRankList.values()) {
			LingLongGeLocalIO.getIns().sortRankZoneid(rankZoneidList);
		}
		LingLongCrossCache data = new LingLongCrossCache();
		data.setPAwardNoticeList(pAwardNoticeList);
		data.setPLingLongGeRankList(pLingLongGeRankList);
		data.setPZoneidRankList(pZoneidRankList);
		globalData.setContent(ObjStrTransUtil.toStr(data));
		LogTool.info("setCrossZuHeFuData lingLongGe success", LingLongGeFunction.class);
	}
	
	/**
	 * 取得昨天玲珑阁配置id
	 * @return
	 */
	public int getLastTableId() {
		int betweenOpen = TimeDateUtil.betweenOpen();
		if(betweenOpen==8) {
			return 17;
		}
		if(betweenOpen>7&&TimeDateUtil.getWeek()==1) {
			return 27;
		}
		return getTableId()-1;
	}
}
