package com.teamtop.system.linglongge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.linglongge.model.LingLongGe;
import com.teamtop.system.linglongge.model.LingLongGeRankModel;
import com.teamtop.system.linglongge.model.LingLongGeRankZoneid;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_llgpoint_239;
import excel.struct.Struct_llgqf_239;
import excel.struct.Struct_llgrank_239;

public class LingLongGeEvent extends AbsSystemEvent {
	public static LingLongGeEvent ins;

	public static LingLongGeEvent getIns() {
		if (ins == null) {
			ins = new LingLongGeEvent();
		}
		return ins;
	}

	private LingLongGeEvent() {
	}

	@Override
	public void init(Hero hero) {
		LingLongGe linglongge = hero.getLinglongge();
		if (linglongge == null) {
			linglongge = new LingLongGe();
			linglongge.setHid(hero.getId());
			List<Integer> scoreAwardList = new ArrayList<Integer>();
			int size = LingLongGeSysCache.getLlgScoreTableMap().get(LingLongGeFunction.getIns().getTableId()).size();
			for (int i = 0; i < size; i++) {
				scoreAwardList.add(LingLongGeConst.NOT_REACH);
			}
			linglongge.setScoreAwardList(scoreAwardList);
			linglongge.setGettedBigAwardMap(new HashMap<>());
			linglongge.setVersion(1);
			hero.setLinglongge(linglongge);
		}else {
			List<Integer> scoreAwardList=linglongge.getScoreAwardList();
			int size = LingLongGeSysCache.getLlgScoreTableMap().get(LingLongGeFunction.getIns().getTableId()).size();
			int size2 = scoreAwardList.size();
			if (size2>size) {
				scoreAwardList.clear();
				for (int i = 0; i < size; i++) {
					scoreAwardList.add(LingLongGeConst.NOT_REACH);
				}
			}
			if (size2<size) {
				for (int i = size2; i < size; i++) {
					scoreAwardList.add(LingLongGeConst.NOT_REACH);
				}
			}
			if (linglongge.getVersion()==0) {
				for (int i = 0; i < size; i++) {
					Integer state = scoreAwardList.get(i);
					if (state==LingLongGeConst.GETTED) {
						scoreAwardList.set(i, LingLongGeConst.ALL_GET);
					}
				}
				linglongge.setVersion(1);
			}
			
		}
	}

	@Override
	public void login(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, LingLongGeConst.LINGLONGGE)) {
			LingLongGe linglongge = hero.getLinglongge();
			List<Integer> scoreAwardList = linglongge.getScoreAwardList();
			for (int state : scoreAwardList) {
				if (state >0) {
					RedPointFunction.getIns().addLoginRedPoint(hero, LingLongGeConst.LINGLONGGE,
							LingLongGeConst.REDPOINT_BXAWARD, RedPointConst.HAS_RED);
				}
			}
			int llCoinNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), LingLongGeConst.LINGLONGBI_ID);
			if (llCoinNum > 0) {
				RedPointFunction.getIns().addLoginRedPoint(hero, LingLongGeConst.LINGLONGGE,
						LingLongGeConst.REDPOINT_COIN, RedPointConst.HAS_RED);
			}
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		LingLongGe linglongge = hero.getLinglongge();
//		linglongge.getGettedBigAwardMap().clear();//是否取得大奖Map重置
		List<Integer> scoreAwardList = linglongge.getScoreAwardList();
		List<Struct_llgpoint_239> list = LingLongGeSysCache.getLlgScoreTableMap().get(LingLongGeFunction.getIns().getLastTableId());
		int size = list.size();
		for (int i = 0; i < size; i++) {
			if (scoreAwardList.get(i) > 0) {
				int rewardNum=scoreAwardList.get(i);
				for (int j = 0; j < rewardNum; j++) {
					int[][] award = list.get(i).getReward();
					Object[] contentData = new Object[] { MailConst.LINGLONGGE_BXAWARD };
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.LINGLONGGE_BXAWARD, contentData,
							award);
				}
			}
		}
		scoreAwardList.clear(); // 每日积分宝箱奖励状态列表重置
		size = LingLongGeSysCache.getLlgScoreTableMap().get(LingLongGeFunction.getIns().getTableId()).size();
		for (int i = 0; i < size; i++) {
			scoreAwardList.add(LingLongGeConst.NOT_REACH);
		}
		linglongge.setScore(0);// 积分清零
		LingLongGeManager.getIns().openUI(hero);
	}

	@Override
	public void zeroPub(int now) {
		int scoreNeed = Config_xtcs_004.getIns().get(LingLongGeConst.SCORENEED).getNum();
		if (TimeDateUtil.serverOpenOverDays(7)) {
			scoreNeed = Config_xtcs_004.getIns().get(LingLongGeConst.SCORENEED1).getNum();
		}
		List<LingLongGeRankModel> lingLongGeRankList = LingLongGeSysCache.getLingLongGeRankList();
		int size = lingLongGeRankList.size();
		int lastTableId = LingLongGeFunction.getIns().getLastTableId();
		for (int i = 1; i <= size; i++) { // 0点发放每日积分排行奖励
			Long hid = lingLongGeRankList.get(i - 1).getHid();
			if(!GameProperties.isRidInThisServer(hid)) {
				continue;
			}
			for (Struct_llgrank_239 struct_llgrank_239 : LingLongGeSysCache.getLlgRankTableMap().get(lastTableId)) {
				int[] rank = struct_llgrank_239.getRank()[0];
				int minRank = rank[0];
				int maxRank = rank[1];
				if (i >= minRank && i <= maxRank) {
					int[][] reward1 = struct_llgrank_239.getReward1();
					int score = lingLongGeRankList.get(i - 1).getScore();
					int[][] reward2 = struct_llgrank_239.getReward2();
					if (score >= scoreNeed) {
						int length = reward1.length + reward2.length;
						int[][] reward3 = new int[length][];
						for (int i1 = 0; i1 < reward1.length; i1++) {
							reward3[i1] = reward1[i1];
						}
						for (int i2 = reward1.length; i2 < length; i2++) {
							reward3[i2] = reward2[i2 - reward1.length];
						}
						MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.LINGLONGGE_RANKAWARD,
								new Object[] { MailConst.LINGLONGGE_RANKAWARD, i }, reward3);// 邮件发放普通奖励和特殊奖励
					} else {
						MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.LINGLONGGE_RANKAWARD,
								new Object[] { MailConst.LINGLONGGE_RANKAWARD, i }, reward1);// 邮件发放普通奖励
					}
					break;
				}
			}
			// 给第一名添加称号
			if (i == 1) {
				String[] chenghaoSplit = LingLongGeConst.CHENGHAO_RANGE.split("-");
				int chenghaoStartId = Integer.parseInt(chenghaoSplit[0]) + TimeDateUtil.getWeek() - 1;
				TitleFunction.getIns().addTitle(hid, chenghaoStartId);
			}
		}
		//上一期玩家排名
		List<LingLongGeRankModel> lastRankList = LingLongGeSysCache.getLastRankList();
		lastRankList.clear();
		lastRankList.addAll(lingLongGeRankList);
		lingLongGeRankList.clear();
		if (TimeDateUtil.serverOpenOverDays(7)) {
			List<Long> zoneidRewardHis = LingLongGeSysCache.getZoneidRewardHis();
			if (zoneidRewardHis==null||zoneidRewardHis.size()==0) {
				return;
			}
			int zoneid=GameProperties.getFirstZoneId();
			//区服排行
			List<LingLongGeRankZoneid> zoneidRankList = LingLongGeSysCache.getZoneidRankList();
			for (int i = 1; i <=zoneidRankList.size(); i++) {
				LingLongGeRankZoneid lingLongGeRankZoneid = zoneidRankList.get(i-1);
				if (zoneid!=lingLongGeRankZoneid.getZoneid()) {
					continue;
				}
				for (Struct_llgqf_239 struct_llgqf_239 : LingLongGeSysCache.getRankZoneidTableMap().get(lastTableId)) {
					int[] rank = struct_llgqf_239.getRank()[0];
					int minRank = rank[0];
					int maxRank = rank[1];
					if (i >= minRank && i <= maxRank) {
						int[][] reward1 = struct_llgqf_239.getReward1();
						for (int j = 0; j < zoneidRewardHis.size(); j++) {
							long hid=zoneidRewardHis.get(j);
							MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.LINGLONGGE_RANKAWARD_ZONEID,
									new Object[] { MailConst.LINGLONGGE_RANKAWARD_ZONEID, i }, reward1);// 邮件发放普通奖励和特殊奖励
						}
						LingLongGeSysCache.getZoneidRewardHis().clear();
						break;
					}
				}
				
			}
			
		}
		//上一期区服积分排名
		List<LingLongGeRankZoneid> zoneidRankList = LingLongGeSysCache.getZoneidRankList();
		List<LingLongGeRankZoneid> lastZoneidRankList = LingLongGeSysCache.getLastZoneidRankList();
		lastZoneidRankList.clear();
		lastZoneidRankList.addAll(zoneidRankList);
		LingLongGeSysCache.getZoneidRewardHis().clear();
		LingLongGeSysCache.getZoneidRankList().clear();
		LingLongGeSysCache.setScore(0);
	}

}
