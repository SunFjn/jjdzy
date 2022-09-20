package com.teamtop.system.weiXinShare;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.weiXinShare.model.WeiXinFriend;
import com.teamtop.system.weiXinShare.model.WeiXinHongBao;
import com.teamtop.system.weiXinShare.model.WeiXinShare;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hylv_278;
import excel.config.Config_ljfx_278;
import excel.config.Config_mrfxjl_278;
import excel.config.Config_xtcs_004;
import excel.config.Config_yqhy_278;
import excel.struct.Struct_hylv_278;
import excel.struct.Struct_ljfx_278;
import excel.struct.Struct_mrfxjl_278;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_yqhy_278;

public class WeiXinShareManager {
	public static WeiXinShareManager ins;

	public static WeiXinShareManager getIns() {
		if (ins == null) {
			ins = new WeiXinShareManager();
		}
		return ins;
	}

	private WeiXinShareManager() {

	}

	public void openUI(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();
		List<Object[]> list = new ArrayList<>();
		for (int award : weiXinShare.getCumulativeAwardList()) {
			list.add(new Object[] { award });
		}

		List<Object[]> list2 = new ArrayList<>();
		for (int award : weiXinShare.getDrawAwardList()) {
			list2.add(new Object[] { award });
		}

		WeiXinShareSender.sendCmd_7752(hero.getId(), weiXinShare.getFirstShareState(), weiXinShare.getLastShareTime(),
				weiXinShare.getTodayDrawTimes(), list2.toArray(), weiXinShare.getTotalShareTimes(), list.toArray(),hero.getShareCoin());
	}

	public void completeShare(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();

		long now = TimeDateUtil.getCurrentTime();
		Struct_xtcs_004 config = Config_xtcs_004.getIns().get(WeiXinShareConst.CONFIG_9902);
		if (config == null) {
			// 配置不存在
			WeiXinShareSender.sendCmd_7754(hero.getId(), 2);
			return;
		}
		if (now - weiXinShare.getLastShareTime() < config.getNum()) {
			// 分享CD中
			 WeiXinShareSender.sendCmd_7754(hero.getId(), 1);
			 return;
		}

		weiXinShare.setLastShareTime(now);

		// 首次分享奖励
		if (weiXinShare.getFirstShareState() == 0) {
			weiXinShare.setFirstShareState(1);
		}

		// 分享抽奖次数
		int times = weiXinShare.getTodayDrawTimes() + weiXinShare.getDrawAwardList().size();
		if (times < 8) {
			weiXinShare.setTodayDrawTimes(weiXinShare.getTodayDrawTimes() + 1);
		}

		// 累计分享奖励
		if (weiXinShare.getTodayShareTimes() < 3) {
			weiXinShare.setTodayShareTimes(weiXinShare.getTodayShareTimes() + 1);
			weiXinShare.setTotalShareTimes(weiXinShare.getTotalShareTimes() + 1);
		}
		WeiXinShareSender.sendCmd_7754(hero.getId(), 0);

		WeiXinShareFunction.getIns().updateRedPoint(hero);

		openUI(hero);
	}

	public void getFirstShareAward(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();
		if (weiXinShare.getFirstShareState() == 0) {
			// 未分享不能领取
			WeiXinShareSender.sendCmd_7756(hero.getId(), 1);
			return;
		}
		if (weiXinShare.getFirstShareState() == 2) {
			// 已领取
			WeiXinShareSender.sendCmd_7756(hero.getId(), 2);
			return;
		}
		if (weiXinShare.getFirstShareState() != 1) {
			// 状态混乱
			WeiXinShareSender.sendCmd_7756(hero.getId(), 3);
			return;
		}

		Struct_xtcs_004 config = Config_xtcs_004.getIns().get(WeiXinShareConst.CONFIG_9901);
		if (config == null) {
			// 配置不存在
			WeiXinShareSender.sendCmd_7756(hero.getId(), 4);
			return;
		}
		weiXinShare.setFirstShareState(2);
		UseAddUtil.add(hero, config.getOther(), SourceGoodConst.WEI_XIN_SHARE_GET_CUMULATIVE_AWARD,
				UseAddUtil.getDefaultMail(), true);
		WeiXinShareSender.sendCmd_7756(hero.getId(), 0);
	}

	public void draw(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();
		int canTurn = weiXinShare.getTodayDrawTimes();
		int turnNum = weiXinShare.getDrawAwardList().size();
		if (canTurn <= 0) {
			// 次数不足
			WeiXinShareSender.sendCmd_7758(hero.getId(), 1, 0);
			return;
		}
		List<Struct_mrfxjl_278> sortList = Config_mrfxjl_278.getIns().getSortList();
		int size = sortList.size();
		if (turnNum >= size) {
			// 已全部抽完
			WeiXinShareSender.sendCmd_7758(hero.getId(), 2, 0);
			return;
		}
		int newTurnNum = turnNum + 1;
		List<int[]> randomList = WeiXinShareCache.getRandomList(newTurnNum);
		ProbabilityEventModel probabilityEvent = ProbabilityEventFactory.getProbabilityEvent();
		int randomSize = randomList.size();
		for (int i = 0; i < randomSize; i++) {
			int[] data = randomList.get(i);
			if (weiXinShare.getDrawAwardList().contains(data[0])) {
				continue;
			}
			probabilityEvent.addProbabilityEvent(data[1], data[0]);
		}
		int id = (Integer) ProbabilityEventUtil.getEventByProbability(probabilityEvent);
		weiXinShare.getDrawAwardList().add(id);
		weiXinShare.setTodayDrawTimes(weiXinShare.getTodayDrawTimes() - 1);
		Struct_mrfxjl_278 mrfxjl_278 = Config_mrfxjl_278.getIns().get(id);
		int[][] reward = mrfxjl_278.getReward();
		UseAddUtil.add(hero, reward, SourceGoodConst.WEI_XIN_SHARE_DRAW_AWARD, UseAddUtil.getDefaultMail(), false);

		WeiXinShareSender.sendCmd_7758(hero.getId(), 0, id);
	}

	public void getCumulativeAward(Hero hero, int cfgId) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();

		Struct_ljfx_278 config = Config_ljfx_278.getIns().get(cfgId);
		if (config == null) {
			// 配置不存在
			WeiXinShareSender.sendCmd_7760(hero.getId(), 1, 0);
			return;
		}
		if (weiXinShare.getCumulativeAwardList().contains(cfgId)) {
			// 已领取
			WeiXinShareSender.sendCmd_7760(hero.getId(), 2, 0);
			return;
		}
		if (weiXinShare.getTotalShareTimes() < config.getTime()) {
			// 分享次数不足
			WeiXinShareSender.sendCmd_7760(hero.getId(), 3, 0);
			return;
		}
		weiXinShare.getCumulativeAwardList().add(cfgId);
		UseAddUtil.add(hero, config.getReward(), SourceGoodConst.WEI_XIN_SHARE_GET_CUMULATIVE_AWARD,
				UseAddUtil.getDefaultMail(), true);
		WeiXinShareSender.sendCmd_7760(hero.getId(), 0, cfgId);
	}

	public void openShareUI(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();

		List<Object[]> friendList = new ArrayList<>();
		for (WeiXinFriend friend : weiXinShare.getFriendMap().values()) {
			if (friend != null) {
				// 检查等级任务变化
				if (friend.getLevelState() == 0) {
					Struct_hylv_278 config = Config_hylv_278.getIns().get(friend.getLevelCfgId());
					if (config != null) {
						if (friend.getLevel() >= config.getLv()) {
							friend.setLevelState(1);
						}
					}
				}
				if(friend.getLevelCfgId() == 0) {
					friend.setLevelCfgId(Config_hylv_278.getIns().getSortList().get(Config_hylv_278.getIns().getSortList().size()-1).getId());
				}
				friendList.add(new Object[] { friend.getName(), friend.getLevel(), friend.getHerdid(),
						friend.getIconid(), friend.getLevelCfgId(), friend.getLevelState(), friend.getHid() });
			}
		}
		List<Object[]> hongBaoList = new ArrayList<>();
		for (WeiXinHongBao hongBao : weiXinShare.getHongBaoList()) {
			if (hongBao.getId() == 0) {
				hongBao.setId(weiXinShare.getHongBaoList().indexOf(hongBao));
			}
			hongBaoList.add(new Object[] { hongBao.getState(), hongBao.getShareCoin(), hongBao.getId() });
		}
		WeiXinShareSender.sendCmd_7762(hero.getId(), weiXinShare.getNumberCfgId(), weiXinShare.getNumberState(),
				friendList.toArray(), hongBaoList.toArray());
	}

	public void getNumberAward(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();
		int cfgId = weiXinShare.getNumberCfgId();
		int state = weiXinShare.getNumberState();
		if (state == 2) {
			// 全部已完成
			WeiXinShareSender.sendCmd_7764(hero.getId(), 1);
			return;
		}
		if (state == 0) {
			// 未完成
			WeiXinShareSender.sendCmd_7764(hero.getId(), 2);
			return;
		}
		int size = weiXinShare.getFriendMap().size();
		Struct_yqhy_278 config = Config_yqhy_278.getIns().get(cfgId);
		if (config == null) {
			// 配置不存在
			WeiXinShareSender.sendCmd_7764(hero.getId(), 3);
			return;
		}
		if (size < config.getTime()) {
			// 未完成
			WeiXinShareSender.sendCmd_7764(hero.getId(), 2);
			return;
		}

		int[][] award = config.getReward();
		weiXinShare.setNumberCfgId(config.getNext());
		if (weiXinShare.getNumberCfgId() == 0) {
			// 最后一个任务
			weiXinShare.setNumberState(2);
		} else {
			// 检查下一个任务是否达标
			weiXinShare.setNumberState(0);
			config = Config_yqhy_278.getIns().get(weiXinShare.getNumberCfgId());
			if (config != null) {
				if (config.getTime() <= size) {
					weiXinShare.setNumberState(1);
				}
			}
		}

		UseAddUtil.add(hero, award, SourceGoodConst.WEI_XIN_SHARE_GET_NUMBER_AWARD, UseAddUtil.getDefaultMail(), true);
		WeiXinShareSender.sendCmd_7764(hero.getId(), 0);
	}

	public void getLevelAward(Hero hero, long hid) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();
		WeiXinFriend friend = weiXinShare.getFriendMap().get(hid);
		if (friend == null) {
			// 好友不存在
			WeiXinShareSender.sendCmd_7766(hero.getId(), 4, 0, 0, 0);
			return;
		}

		int cfgId = friend.getLevelCfgId();
		int state = friend.getLevelState();
		if (state == 2) {
			// 全部已完成
			WeiXinShareSender.sendCmd_7766(hero.getId(), 1, 0, 0, 0);
			return;
		}
		if (state == 0) {
			// 未完成
			WeiXinShareSender.sendCmd_7766(hero.getId(), 2, 0, 0, 0);
			return;
		}
		int level = friend.getLevel();
		Struct_hylv_278 config = Config_hylv_278.getIns().get(cfgId);
		if (config == null) {
			// 配置不存在
			WeiXinShareSender.sendCmd_7766(hero.getId(), 3, 0, 0, 0);
			return;
		}
		if (level < config.getLv()) {
			// 未完成
			WeiXinShareSender.sendCmd_7766(hero.getId(), 2, 0, 0, 0);
			return;
		}

		int[][] award = config.getReward();
		friend.setLevelCfgId(config.getNext());
		if (friend.getLevelCfgId() == 0) {
			// 最后一个任务
			friend.setLevelState(2);
			friend.setLevelCfgId(config.getId());
		} else {
			// 检查下一个任务是否达标
			friend.setLevelState(0);
			config = Config_hylv_278.getIns().get(friend.getLevelCfgId());
			if (config != null) {
				if (config.getLv() <= level) {
					friend.setLevelState(1);
				}
			}
		}

		UseAddUtil.add(hero, award, SourceGoodConst.WEI_XIN_SHARE_GET_LEVEL_AWARD, UseAddUtil.getDefaultMail(), true);
		WeiXinShareSender.sendCmd_7766(hero.getId(), 0, hid, friend.getLevelCfgId(), friend.getLevelState());
	}

	public void getHongBaoAward(Hero hero, int index) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
			return;
		}
		WeiXinShare weiXinShare = hero.getWeixinshare();
		WeiXinHongBao hongBao = weiXinShare.getHongBaoList().get(index);
		if (hongBao == null) {
			WeiXinShareSender.sendCmd_7768(hero.getId(), 1, 0, 0);
			return;
		}
		if (hongBao.getState() == 1) {
			// 已领取
			WeiXinShareSender.sendCmd_7768(hero.getId(), 2, 0, 0);
			return;
		}
		hongBao.setState(1);
		UseAddUtil.addHuobi(hero, WeiXinShareConst.SHARE_COIN, hongBao.getShareCoin(),
				SourceGoodConst.WEI_XIN_SHARE_GET_LEVEL_AWARD, true);
		WeiXinShareSender.sendCmd_7768(hero.getId(), 0, index, hongBao.getShareCoin());
	}
}
