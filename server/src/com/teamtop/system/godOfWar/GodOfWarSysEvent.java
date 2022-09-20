package com.teamtop.system.godOfWar;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.godOfWar.model.GodOfWar;
import com.teamtop.system.godOfWar.model.GodOfWarCache;
import com.teamtop.system.godOfWar.model.GodOfWarRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_warreward_222;
import excel.struct.Struct_warreward_222;

public class GodOfWarSysEvent extends AbsSystemEvent {

	private static GodOfWarSysEvent godOfWarSysEvent;

	private GodOfWarSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GodOfWarSysEvent getIns() {
		if (godOfWarSysEvent == null) {
			godOfWarSysEvent = new GodOfWarSysEvent();
		}
		return godOfWarSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = GodOfWarFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, GodOfWarConst.SysId, GodOfWarConst.RedPoint,
					RedPointConst.HAS_RED);
		}
		boolean rp = GodOfWarFunction.getIns().checkStoreRedPoint(hero);
		if (rp) {
			RedPointFunction.getIns().addLoginRedPoint(hero, GodOfWarConst.SysId, GodOfWarConst.Store_RedPoint,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void logout(Hero hero) {
		GodOfWarManager.getIns().fightResult(hero, 2);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		GodOfWar godOfWar = hero.getGodOfWar();
		if (godOfWar != null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, GodOfWarConst.SysId)) {
			return;
		}
		godOfWar = new GodOfWar();
		godOfWar.setHid(hero.getId());
		godOfWar.setChaNum(GodOfWarConst.BASE_CHA);
		godOfWar.setLastChaTime(-1);
		hero.setGodOfWar(godOfWar);
		// 加入排行榜
		GodOfWarFunction.getIns().addToGodOfWarRank(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		reset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		reset(hero, now);
	}

	@Override
	public void zeroPub(int now) {
		// 零点发放排行奖励
		List<GodOfWarRank> godOfWarRankList = new ArrayList<>(GodOfWarCache.getGodOfWarRankList());
		int ranking = 0;
		int mailSysId = MailConst.MAIL_ID_GODOFWARD;
		GodOfWarRank godOfWarRank = null;
		int[][] rankReward = null;
		int size = godOfWarRankList.size();
		for (int i = 0; i < size; i++) {
			ranking = i + 1;
			if (ranking > GodOfWarConst.RANK_REWARD_SIZE) {
				break;
			}
			try {
				godOfWarRank = godOfWarRankList.get(i);
				if (godOfWarRank == null) {
					continue;
				}
				if (godOfWarRank.getRobotId() > 0) {
					continue;
				}
				rankReward = getRankReward(ranking);
				MailFunction.getIns().sendMailWithFujianData2(godOfWarRank.getHid(), mailSysId,
						new Object[] { mailSysId, ranking }, rankReward);
			} catch (Exception e) {
				LogTool.error(e, GodOfWarSysEvent.class, godOfWarRank.getHid(), godOfWarRank.getName(),
						"ranking=" + ranking);
			}
		}
	}

	public int[][] getRankReward(int ranking) {
		List<Struct_warreward_222> sortList = Config_warreward_222.getIns().getSortList();
		Struct_warreward_222 warreward = null;
		int[][] reward = null;
		for (int i = 0; i < sortList.size(); i++) {
			warreward = sortList.get(i);
			int[][] rank = warreward.getRank();
			if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
				reward = warreward.getReward1();
				break;
			}
		}
		return reward;
	}

	private void reset(Hero hero, int now) {
		GodOfWar godOfWar = hero.getGodOfWar();
		if (godOfWar == null) {
			return;
		}
		godOfWar.setBuyNum(0);
		// godOfWar.setChaNum(GodOfWarConst.BASE_CHA);
		// godOfWar.setCdTime(0);
	}

}
