package com.teamtop.system.liuChuQiShan;

import java.util.HashSet;
import java.util.Set;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShan;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.model.Team;

import excel.config.Config_six_279;
import excel.struct.Struct_six_279;

public class LiuChuQiShanEvent extends AbsSystemEvent {
	private static LiuChuQiShanEvent ins = null;

	public static LiuChuQiShanEvent getIns() {
		if (ins == null) {
			ins = new LiuChuQiShanEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		LiuChuQiShan data = hero.getLiuChuQiShan();
		if(data==null){
			data = new LiuChuQiShan();
			Struct_six_279 struct_six_279 = Config_six_279.getIns().getSortList().get(0);
			int gqId = struct_six_279.getId();// 配置表的初始关卡
			data.setGqId(gqId);// 初始化关卡
			data.setHid(hero.getId());
			data.setNumHelpAwards(LiuChuQiShanConst.NUM_HELP_AWARDS_MAX);
			data.setNeedHelpNum(LiuChuQiShanConst.NEED_HELP_NUM);
			data.setSaoDangNum(LiuChuQiShanConst.SAO_DANG_NUM);
			data.setPassSet(new HashSet<>());
			hero.setLiuChuQiShan(data);
		}
	}

	@Override
	public void login(Hero hero) {
		LiuChuQiShan LiuChuQiShan = hero.getLiuChuQiShan();
		int numHelpAwards = LiuChuQiShan.getNumHelpAwards();
		int totalHelp = LiuChuQiShanConst.NUM_HELP_AWARDS_MAX;
		LiuChuQiShanSender.sendCmd_8228(hero.getId(), numHelpAwards, totalHelp);
		LiuChuQiShanFunction.getIns().sendRed(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
		liuChuQiShan.setNumHelpAwards(LiuChuQiShanConst.NUM_HELP_AWARDS_MAX);
		liuChuQiShan.setNeedHelpNum(LiuChuQiShanConst.NEED_HELP_NUM);
		liuChuQiShan.setSaoDangNum(LiuChuQiShanConst.SAO_DANG_NUM);
		Set<Integer> passSet = liuChuQiShan.getPassSet();
		passSet.clear();// 清空昨天首通的关卡
		LiuChuQiShanManager.getIns().openUI(hero);
	}

	@Override
	public void logout(Hero hero) {
		long hid = hero.getId();
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
		if (teamIDInt == null) {
			return;
		}
		Team team = TeamCache.getTeamMap().get(teamIDInt);
		if (team == null) {
			// 队伍缓存异常
			LiuChuQiShanSender.sendCmd_8212(hid, 1);
			TeamCache.removeHidToTeamIDMap(hid);
			return;
		}
		int id = team.getId();
		LiuChuQiShanManager.getIns().leave(hero, id);
		LiuChuQiShanManager.getIns().leaveBattle(hero);

	}

}
