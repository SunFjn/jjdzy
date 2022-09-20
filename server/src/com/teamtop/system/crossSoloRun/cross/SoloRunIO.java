package com.teamtop.system.crossSoloRun.cross;

import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossSoloRunOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.crossSoloRun.SoloRunConst;
import com.teamtop.system.crossSoloRun.model.SoloRunRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class SoloRunIO {

	private static SoloRunIO soloRunIO;

	private SoloRunIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SoloRunIO getIns() {
		if (soloRunIO == null) {
			soloRunIO = new SoloRunIO();
		}
		return soloRunIO;
	}

	/**
	 * 请求匹配
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void askMatch(Channel channel, CrossData crossData) {
		try {
			CrossHeroBaseModel model = crossData.getObject(SoloRunCrossType.heroBaseModel.name(), CrossHeroBaseModel.class);
			int grade = crossData.getObject(SoloRunCrossType.grade.name(), Integer.class);
			int match = crossData.getObject(SoloRunCrossType.match.name(), Integer.class);
			crossData.finishGet();
			if (model != null) {
				if (!CrossZone.isCrossServer()) {
					return;
				}
				Hero hero = CrossFunction.makeHeroForBattle(model);
				long hid = hero.getId();
				int partId = CrossCache.getPartId(channel);
				// HeroCache.getHeroMap().put(hid, hero);// 替换为最新的数据
				CrossSoloRunSysCache.getModelMap().put(hid, model);
				Integer oldGrade = CrossSoloRunSysCache.getHeroGradeMap().get(hid);
				if (oldGrade == null) {
					CrossSoloRunSysCache.getHeroGradeMap().put(hid, grade);// 更新段位
				}
				if (oldGrade != null && oldGrade != grade) {
					CrossSoloRunSysCache.getHeroGradeMap().put(hid, grade);// 更新段位
					CrossSoloRunSysCache.getMatchSet(oldGrade, partId).remove(hid);// 从老段位移除
				}
				// 放入匹配列表
				Set<Long> matchSet = CrossSoloRunSysCache.getMatchSet(grade, partId);
				int size = matchSet.size();
				if (match == 1) {
					if (size < SoloRunConst.GRADE_MATCH_LIMIT) {
						matchSet.add(hid);// 加入匹配集合
					}
				}
				byte robot = 0;
				if (size == 0) {
					// 匹配机器人
					robot = 1;
				} else {
					List<Long> myMatchList = CrossSoloRunSysCache.getMyMatchList(hid, grade, partId);
					if(myMatchList.size()==0) {
						// 匹配机器人
						robot = 1;
					}else {						
						int randomSize = myMatchList.size() - 1;
						int random = RandomUtil.getRandomNumInAreas(0, randomSize);
						long beChaHid = myMatchList.get(random);
						CrossHeroBaseModel beChaModel = CrossSoloRunSysCache.getModelMap().get(beChaHid);
						crossData.putObject(SoloRunCrossType.enemyBaseModel.name(), beChaModel);
					}
				}
				crossData.putObject(SoloRunCrossType.robot, robot);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			LogTool.error(e, SoloRunIO.class, "SoloRun askMatch fail");
		}
	}

	/** 更新段位和积分 */
	public void updateGradeAndScore(final Channel channel, final CrossData crossData) {
		int cmd = CrossConst.SOLORUN_SG_UPDATE_GRADE;
		try {
			OpTaskExecutorService.PublicOrderService.execute(new CrossSoloRunOpTaskRunnable() {

				@Override
				public void run() {
					updateGradeAndScoreHandle(channel, crossData);
				}

				@Override
				public Object getSession() {
					return OpTaskConst.SOLORUN_KEY;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, SoloRunIO.class, "SoloRun updateGradeAndScore fail");
		}
	}

	/** 更新段位和积分 */
	public void updateGradeAndScoreHandle(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(SoloRunCrossType.hid.name(), Long.class);
			String hName = crossData.getObject(SoloRunCrossType.hName.name(), String.class);
			String hNameZoneid = crossData.getObject(SoloRunCrossType.hNameZoneid.name(), String.class);
			int grade = crossData.getObject(SoloRunCrossType.grade.name(), Integer.class);
			int score = crossData.getObject(SoloRunCrossType.score.name(), Integer.class);
			int match = crossData.getObject(SoloRunCrossType.match.name(), Integer.class);
			CrossHeroBaseModel model = CrossSoloRunSysCache.getModelMap().get(hid);
			Integer oldGrade = CrossSoloRunSysCache.getHeroGradeMap().get(hid);
			if (oldGrade == null) {
				CrossSoloRunSysCache.getHeroGradeMap().put(hid, grade);// 更新段位
			}
			int partId = CrossCache.getPartId(channel);
			if (oldGrade != null && oldGrade != grade) {
				CrossSoloRunSysCache.getHeroGradeMap().put(hid, grade);// 更新段位
				CrossSoloRunSysCache.getMatchSet(oldGrade, partId).remove(hid);// 从老段位移除
			}
			model.setName(hName);
			model.setNameZoneid(hNameZoneid);
			// 放入匹配列表
			Set<Long> matchSet = CrossSoloRunSysCache.getMatchSet(grade, partId);
			int size = matchSet.size();
			if (match == 1) {
				if (size < SoloRunConst.GRADE_MATCH_LIMIT) {
					matchSet.add(hid);// 加入匹配集合
				}
			}
			// 更新排行
			CrossSoloRunSysCache.addToRank(model, score, partId);
		} catch (Exception e) {
			LogTool.error(e, SoloRunIO.class, "SoloRun updateGradeAndScore fail "+JSON.toJSONString(crossData));
		}
	}

	/**
	 * 获取跨服排行榜
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void getRankList(Channel channel, CrossData crossData) {
		try {
			crossData.finishGet();
			int partId = CrossCache.getPartId(channel);
			ConcurrentSkipListSet<SoloRunRank> crossRank = CrossSoloRunSysCache.getCrossRankSet(partId);
			ConcurrentSkipListSet<SoloRunRank> crossRankSet = new ConcurrentSkipListSet<>();
			if (crossRank != null) {
				crossRankSet = new ConcurrentSkipListSet<>(crossRank);
			}
			crossData.putObject(SoloRunCrossType.ranking, crossRankSet);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, SoloRunIO.class, "SoloRun getRankList fail");
		}
	}

}
