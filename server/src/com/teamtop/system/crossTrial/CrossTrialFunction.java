package com.teamtop.system.crossTrial;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossTrial.cross.CrossTrialEnum;
import com.teamtop.system.crossTrial.model.TrialModel;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_kfsl_767;
import io.netty.channel.Channel;

public class CrossTrialFunction {

	private static CrossTrialFunction ins;

	private CrossTrialFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossTrialFunction getIns() {
		if (ins == null) {
			ins = new CrossTrialFunction();
		}
		return ins;
	}

	/**
	 * gm上传数据
	 */
	public void gmUploadData() {
		try {
			ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap()
					.get(RankingConst.STRENGTH_RANKING);
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
						LogTool.error(e, this, "CrossTrialFunction gmUploadData hid=" + hid);
					}
				}
				CrossData crossData = new CrossData();
				crossData.putObject(CrossTrialEnum.rankData.name(), rankList);
				crossData.putObject(CrossTrialEnum.zoneid.name(), GameProperties.getFirstZoneId());
				Channel channel = Client_2.getIns().getCrossChannel();
				NettyWrite.writeXData(channel, CrossConst.CROSS_TRIAL_UPLOAD_RANK, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTrialFunction.class, "CrossTrialFunction gmUploadData");
		}
	}

	public void gmClearAll() {
		try {
			CrossData crossData = new CrossData();
			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_TRIAL_CLEAR, crossData);
		} catch (Exception e) {
			LogTool.error(e, CrossTrialFunction.class, "CrossTrialFunction gmClearAll");
		}
	}

	/**
	 * 检测红点
	 * @param hero
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
				return false;
			}
			TrialModel trialModel = hero.getTrialModel();
			int floor = trialModel.getFloor();
//			int passFloor = trialModel.getPassFloor();
//			int trailPoint = trialModel.getTrailPoint();
//			int chestNum = 0;
//			int tempFloor = floor;
			int maxFloor = Config_kfsl_767.getIns().size();
			if (floor > maxFloor) {
				return false;
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, CrossTrialFunction.class, hero.getId(), hero.getName(),
					"CrossTrialFunction checkRedPoint");
			return false;
		}
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
				return;
			}
			boolean checkRedPoint = checkRedPoint(hero);
			if (checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_TRIAL, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_TRIAL, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTrialFunction.class, hero.getId(), hero.getName(),
					"CrossTrialFunction checkRedPoint");
		}
	}

}
