package com.teamtop.system.weiXinShare;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.weiXinShare.model.WeiXinShare;

public class WeiXinShareEvent extends AbsSystemEvent {
	public static WeiXinShareEvent ins;

	public static WeiXinShareEvent getIns() {
		if (ins == null) {
			ins = new WeiXinShareEvent();
		}
		return ins;
	}

	private WeiXinShareEvent() {
	}

	@Override
	public void init(Hero hero) {
		WeiXinShare weiXinShare = hero.getWeixinshare();
		if (weiXinShare == null) {
			weiXinShare = new WeiXinShare();
			weiXinShare.setHid(hero.getId());
			weiXinShare.setCumulativeAwardList(new ArrayList<>());
			weiXinShare.setDrawAwardList(new ArrayList<>());
			weiXinShare.setFriendMap(new ConcurrentHashMap<>());
			weiXinShare.setHongBaoList(new ArrayList<>());
			weiXinShare.setNumberCfgId(1);
			hero.setWeixinshare(weiXinShare);
		}
	}

	@Override
	public void login(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}

		boolean[] redPoint = WeiXinShareFunction.getIns().checkRedPoint(hero);
		for (int i = 1; i < 5; i++) {
			boolean hadRed = redPoint[i];
			if (hadRed) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.Wei_Xin_Share, i, RedPointConst.HAS_RED);
			}
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();
		weiXinShare.setTodayDrawTimes(0);
		weiXinShare.setTodayShareCoin(0);
		weiXinShare.setTodayShareTimes(0);
		weiXinShare.setDrawAwardList(new ArrayList<>());
		weiXinShare.setHongBaoList(new ArrayList<>());
		WeiXinShareManager.getIns().openUI(hero);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		WeiXinShareFunction.getIns().noticLevel(hero);
	}
}
