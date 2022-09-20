package com.teamtop.system.crossTrial;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
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
import com.teamtop.util.log.LogTool;

import excel.config.Config_kfsl_767;
import excel.struct.Struct_kfsl_767;
import io.netty.channel.Channel;

public class CrossTrialSysEvent extends AbsSystemEvent {

	private static CrossTrialSysEvent ins;

	private CrossTrialSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossTrialSysEvent getIns() {
		if (ins == null) {
			ins = new CrossTrialSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		TrialModel trialModel = hero.getTrialModel();
		if (trialModel == null) {
			trialModel = new TrialModel();
			trialModel.setHid(hero.getId());
			Struct_kfsl_767 struct_kfsl_767 = Config_kfsl_767.getIns().getSortList().get(0);
			trialModel.setFloor(struct_kfsl_767.getTgs());
			hero.setTrialModel(trialModel);
		}
	}

	@Override
	public void login(Hero hero) {
//		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
//			return;
//		}
//		boolean checkRedPoint = CrossTrialFunction.getIns().checkRedPoint(hero);
//		if (checkRedPoint) {
//			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.CROSS_TRIAL, RedPointConst.RED_1,
//					RedPointConst.HAS_RED);
//		}
	}
	
	@Override
	public void logout(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
			return;
		}
		CrossTrialManager.getIns().fightEnd(hero, 0);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero);
	}

	public void dailyReset(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
			return;
		}
		TrialModel trialModel = hero.getTrialModel();
		Struct_kfsl_767 struct_kfsl_767 = Config_kfsl_767.getIns().getSortList().get(0);
		trialModel.setFloor(struct_kfsl_767.getTgs());
		trialModel.setPassFloor(0);
		trialModel.setTrailPoint(0);
		trialModel.getGetChestMap().clear();
		trialModel.getBuffAttr().clear();
		trialModel.getBuffMap().clear();
		trialModel.getEnemyMap().clear();
		trialModel.getEnemyDetialMap().clear();
	}

	@Override
	public void fixTime(int cmdId, int now) {
		try {
			if (cmdId == 1) {
				// 每天 00:01 上传战力排名
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
							LogTool.error(e, CrossTrialSysEvent.class, "CrossTrialSysEvent fixTime hid=" + hid);
						}
					}
					CrossData crossData = new CrossData();
					crossData.putObject(CrossTrialEnum.rankData.name(), rankList);
					crossData.putObject(CrossTrialEnum.zoneid.name(), GameProperties.getFirstZoneId());
					Channel channel = Client_2.getIns().getCrossChannel();
					NettyWrite.writeXData(channel, CrossConst.CROSS_TRIAL_UPLOAD_RANK, crossData);
					LogTool.info("CrossTrialSysEvent upload", this);
				}
			}else if(cmdId == 2) {
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				for(Hero hero : heroMap.values()) {
					if(hero.isOnline()) {
						if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
							continue;
						}
						CrossTrialManager.getIns().openUI(hero);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTrialSysEvent.class, "CrossTrialSysEvent fixTime");
		}
	}

}
