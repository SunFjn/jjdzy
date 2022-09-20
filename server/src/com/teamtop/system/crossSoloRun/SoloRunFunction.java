package com.teamtop.system.crossSoloRun;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.SoloRunOpTaskRunnable;
import com.teamtop.system.crossSoloRun.cross.CrossSoloRunSysCache;
import com.teamtop.system.crossSoloRun.cross.SoloRunCrossType;
import com.teamtop.system.crossSoloRun.model.SoloRunModel;
import com.teamtop.system.crossSoloRun.model.SoloRunRank;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_ddfh_225;
import io.netty.channel.Channel;

public class SoloRunFunction {

	private static SoloRunFunction soloRunFunction;

	private SoloRunFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SoloRunFunction getIns() {
		if (soloRunFunction == null) {
			soloRunFunction = new SoloRunFunction();
		}
		return soloRunFunction;
	}

	public SoloRunModel initSoloRunModel(Hero hero) {
		SoloRunModel soloRunModel = new SoloRunModel();
		soloRunModel.setHid(hero.getId());
		soloRunModel.setChaNum(SoloRunConst.DAILY_ADD_CHA);
		Set<Integer> winAward = new HashSet<>();
		soloRunModel.setWinAward(winAward);
		List<List<String>> reportList = new ArrayList<>();
		soloRunModel.setReportList(reportList);
		int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
		if (soloRunModel.getWeekResetTime() != mondayZeroTime) {
			soloRunModel.setWeekResetTime(mondayZeroTime);
			soloRunModel.setScore(0);
			soloRunModel.setChaNum(SoloRunConst.DAILY_ADD_CHA);
		}
		hero.setSoloRunModel(soloRunModel);
		return soloRunModel;
	}

	/**
	 * 检测从中央服拉取跨服
	 */
	public void checkGetRankList(long hid, boolean needSend) {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			int lastRankSynTime = CrossSoloRunSysCache.getLastRankSynTime();
			int passTime = currentTime - lastRankSynTime;
			if (passTime >= SoloRunConst.CROSS_RANK_REFRESH_TIME) {
				CrossSoloRunSysCache.setLastRankSynTime(currentTime);// 设置更新时间
				Channel crossChannel = Client_2.getIns().getCrossChannel();
				CrossData crossData = new CrossData();
				// 向中央服请求排行数据
				NettyWrite.writeXData(crossChannel, CrossConst.SOLORUN_SG_GET_RANKLIST, crossData, new Callback() {

					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						Type type = new TypeReference<ConcurrentSkipListSet<SoloRunRank>>() {}.getType();
						ConcurrentSkipListSet<SoloRunRank> rankSet = crossData.getObject(SoloRunCrossType.ranking.name(), type);
						if (rankSet != null && rankSet.size() > 0) {
							int partId = CrossCache.getlocalPartId();
							SoloRunSysCache.setCrossRankSetBeforeClear(rankSet, partId);
							if (needSend) {
								Hero hero = HeroCache.getHero(hid);
								SoloRunManager.getIns().getRankList(hero, 2);
							}
						}
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, SoloRunFunction.class, "SoloRun checkGetRankList fail");
		}
	}
	
	public void checkActOpen() {
		try {
			int week = TimeDateUtil.getWeek();
			if(week!=7) {
				int currentTime = TimeDateUtil.getCurrentTime();
				int startTime = TimeDateUtil.getOneTime(0, SoloRunConst.StartTime_Hour, SoloRunConst.StartTime_Minute, 0);
				int endTime = TimeDateUtil.getOneTime(0, SoloRunConst.EndTime_Hour, SoloRunConst.EndTime_Minute, 0);
				if(currentTime>=startTime&&currentTime<endTime) {
					SoloRunSysCache.ACT_OPEN = true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SoloRunFunction.class, "soloRun checkActOpen error");
		}
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return false;
			}
			int winNum = soloRunModel.getWinNum();
			Set<Integer> keySet = Config_ddfh_225.getIns().getMap().keySet();
			Iterator<Integer> iterator = keySet.iterator();
			Set<Integer> winAward = soloRunModel.getWinAward();
			for (; iterator.hasNext();) {
				int awardId = iterator.next();
				if (!winAward.contains(awardId) && winNum >= awardId) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SoloRunFunction.class, hero.getId(), hero.getName(), "");
		}
		return false;
	}

	public void reflashRank(ConcurrentSkipListSet<SoloRunRank> rankSet, SoloRunRank rank) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new SoloRunOpTaskRunnable() {

				@Override
				public void run() {
					try {
						reflashRankHandle(rankSet, rank);
					} catch (Exception e) {
						LogTool.error(e, SoloRunFunction.class, "SoloRunFunction reflashRankHandle");
					}
				}

				@Override
				public Object getSession() {
					return OpTaskConst.LOCAL_SOLORUN_KEY;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, SoloRunFunction.class, "SoloRunFunction reflashRank");
		}
	}

	public void reflashRankHandle(ConcurrentSkipListSet<SoloRunRank> rankSet, SoloRunRank rank) {
		Iterator<SoloRunRank> iterator = rankSet.iterator();
		SoloRunRank oldRank = null;
		SoloRunRank tempRank = null;
		for (; iterator.hasNext();) {
			tempRank = iterator.next();
			if (tempRank.equals(rank)) {
				oldRank = tempRank;
				iterator.remove();
				break;
			}
		}
		if (oldRank != null) {
			if (oldRank.getScore() == rank.getScore()) {
				rank.setCreateTime(oldRank.getCreateTime());
			}
			rankSet.add(rank);
		} else {
			if (rankSet.size() == 0) {
				rankSet.add(rank);
			} else {
				SoloRunRank last = rankSet.last();
				if (rankSet.size() >= SoloRunConst.LOCAL_RANK_SIZE && rank.getScore() < last.getScore()) {
					return;
				}
				rankSet.add(rank);
				if (rankSet.size() > SoloRunConst.LOCAL_RANK_SIZE) {
					// rankSet.remove(rankSet.last());
					rankSet.pollLast();
				}
			}
		}
	}
	
	/**
	 * 修改名字处理
	 * @param hero
	 */
	public void changeName(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SOLO_RUN)) {
				return;
			}
			if (!SoloRunSysCache.ACT_OPEN) {
				return;
			}
			SoloRunSysCache.addToRank(hero);
			CrossData crossData = new CrossData();
			long hid = hero.getId();
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			int score = soloRunModel.getScore();
			int grade = SoloRunManager.getIns().getGrade(score);
			crossData.putObject(SoloRunCrossType.hid, hid);
			crossData.putObject(SoloRunCrossType.grade, grade);
			crossData.putObject(SoloRunCrossType.score, score);
			crossData.putObject(SoloRunCrossType.hName, hero.getName());
			crossData.putObject(SoloRunCrossType.hNameZoneid, hero.getNameZoneid());
			if (!TimeDateUtil.serverOpenAtOverDays(8)) {
				crossData.putObject(SoloRunCrossType.match, 0);
			} else {
				crossData.putObject(SoloRunCrossType.match, 1);
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.SOLORUN_SG_UPDATE_GRADE, crossData);
		} catch (Exception e) {
			LogTool.error(e, SoloRunFunction.class, hero.getId(), hero.getName(), "SoloRunFunction changeName");
		}
	}

	/**
	 * 处理合服数据
	 * @throws Exception 
	 */
	public void setHeFuData(List<GlobalData> dataAll, GlobalData globalData) throws Exception{
		ConcurrentSkipListSet<SoloRunRank> rankSet = new ConcurrentSkipListSet<SoloRunRank>();
		for( GlobalData globalTemp:dataAll){
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					SoloRunCache data = ObjStrTransUtil.toObj(content, SoloRunCache.class);
					ConcurrentSkipListSet<SoloRunRank> rankSetTemp = data.getRankSet();
					for( SoloRunRank rankTemp:rankSetTemp){
						reflashRank(rankSet, rankTemp);
					}
				} catch (Exception e) {
					e.printStackTrace();
					System.err.println("zoneid:"+globalTemp.getZoneid());
				}
			}
		}
		
		SoloRunCache data = new SoloRunCache();
		data.setCrossRankSet(new ConcurrentSkipListSet<SoloRunRank>());
		data.setRankSet( rankSet);
		globalData.setContent(ObjStrTransUtil.toStr(data));
	}

	/**
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addChaNum(Hero hero, int id, int num) {
		try {
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return false;
			}
			soloRunModel.setChaNum(soloRunModel.getChaNum() + num);
			return true;
		} catch (Exception e) {
			LogTool.error(e, SoloRunFunction.class, hero.getId(), hero.getName(), "SoloRunFunction changeName");
			return false;
		}
	}

}
