package com.teamtop.system.weiXinShare;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossMine.CrossMineFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.weiXinShare.model.WeiXinFriend;
import com.teamtop.system.weiXinShare.model.WeiXinHongBao;
import com.teamtop.system.weiXinShare.model.WeiXinShare;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hylv_278;
import excel.config.Config_ljfx_278;
import excel.config.Config_yqhy_278;
import excel.struct.Struct_hylv_278;
import excel.struct.Struct_ljfx_278;
import excel.struct.Struct_yqhy_278;
import io.netty.channel.Channel;

public class WeiXinShareFunction {
	private static WeiXinShareFunction ins = null;

	public static WeiXinShareFunction getIns() {
		if (ins == null) {
			ins = new WeiXinShareFunction();
		}
		return ins;
	}

	private WeiXinShareFunction() {
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
				return;
			}
			boolean[] redPoint = checkRedPoint(hero);
			for (int i = 1; i < 5; i++) {
				boolean hadRed = redPoint[i];
				if (hadRed) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.Wei_Xin_Share, i,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.Wei_Xin_Share, i,
							RedPointConst.NO_RED);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean[] checkRedPoint(Hero hero) {
		boolean[] hadRedPoint = new boolean[5];
		hadRedPoint[0] = false;
		hadRedPoint[1] = false;
		hadRedPoint[2] = false;
		hadRedPoint[3] = false;
		hadRedPoint[4] = false;

		try {
			if (hero == null) {
				return hadRedPoint;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.Wei_Xin_Share)) {
				return hadRedPoint;
			}
			WeiXinShare weiXinShare = hero.getWeixinshare();

			if (weiXinShare.getFirstShareState() != 2) {
				hadRedPoint[WeiXinShareRedPointConst.RED_1] = true;
			}

			if (weiXinShare.getTodayDrawTimes() > 0) {
				hadRedPoint[WeiXinShareRedPointConst.RED_1] = true;
				hadRedPoint[WeiXinShareRedPointConst.RED_2] = true;
			}

			for (Struct_ljfx_278 config : Config_ljfx_278.getIns().getSortList()) {
				if (weiXinShare.getCumulativeAwardList().contains(config.getId())) {
					continue;
				}
				if (weiXinShare.getTotalShareTimes() >= config.getTime()) {
					hadRedPoint[WeiXinShareRedPointConst.RED_1] = true;
					hadRedPoint[3] = true;
					break;
				}
			}

			if (weiXinShare.getNumberState() == 1) {
				hadRedPoint[WeiXinShareRedPointConst.RED_1] = true;
				hadRedPoint[4] = true;
			}

			List<WeiXinFriend> friendList = new ArrayList<>();
			friendList.addAll(weiXinShare.getFriendMap().values());
			for (WeiXinFriend friend : friendList) {
				if(friend == null) {
					continue;
				}
				if (friend.getLevelState() == 1) {
					hadRedPoint[WeiXinShareRedPointConst.RED_1] = true;
					hadRedPoint[4] = true;
					break;
				}
			}

			List<WeiXinHongBao> hongBaoList = new ArrayList<>();
			hongBaoList.addAll(weiXinShare.getHongBaoList());
			for (WeiXinHongBao hongBao : hongBaoList) {
				if (hongBao.getState() == 0) {
					hadRedPoint[WeiXinShareRedPointConst.RED_1] = true;
					hadRedPoint[4] = true;
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return hadRedPoint;
	}

	/**
	 * 通知更新好友信息
	 */
	public void noticFriend(Hero hero) {
		if (hero.getWeixinshare().getZoneId() == 0) {
			return;
		}
		CrossData crossData = new CrossData();

		crossData.putObject(WeiXinShareEnum.zoneId, hero.getWeixinshare().getZoneId());
		crossData.putObject(WeiXinShareEnum.openid, hero.getWeixinshare().getOpenId());

		crossData.putObject(WeiXinShareEnum.hid, hero.getId());
		crossData.putObject(WeiXinShareEnum.name, hero.getNameZoneid());
		crossData.putObject(WeiXinShareEnum.level, hero.getRealLevel());
		crossData.putObject(WeiXinShareEnum.herdid, hero.getIcon());
		crossData.putObject(WeiXinShareEnum.iconid, hero.getFrame());

		Channel channel = Client_1.getIns().getCrossChannel();
		if (channel == null || !channel.isOpen()) {
			LogTool.warn("channel == null || !channel.isOpen() sendToCross", CrossMineFunction.class);
			return;
		}
		NettyWrite.writeXData(channel, CrossConst.WEI_XIN_SHARE_FRIEND_LH, crossData);
	}

	/**
	 * 通知达到等级奖励
	 */
	public void noticLevel(Hero hero) {
		if (hero.getWeixinshare().getZoneId() == 0) {
			return;
		}
		for (Struct_hylv_278 config : Config_hylv_278.getIns().getSortList()) {
			if (hero.getRealLevel() == config.getLv()) {
				noticFriend(hero);
				break;
			}
		}
	}

	/**
	 * 通知充值返利奖励
	 */
	public void noticMoney(Hero hero, int money) {
		if (hero.getWeixinshare().getZoneId() == 0) {
			return;
		}
		CrossData crossData = new CrossData();

		crossData.putObject(WeiXinShareEnum.zoneId, hero.getWeixinshare().getZoneId());
		crossData.putObject(WeiXinShareEnum.openid, hero.getWeixinshare().getOpenId());

		crossData.putObject(WeiXinShareEnum.hid, hero.getId());
		crossData.putObject(WeiXinShareEnum.money, money);

		Channel channel = Client_1.getIns().getCrossChannel();
		if (channel == null || !channel.isOpen()) {
			LogTool.warn("channel == null || !channel.isOpen() sendToCross", CrossMineFunction.class);
			return;
		}
		NettyWrite.writeXData(channel, CrossConst.WEI_XIN_SHARE_MONEY_LH, crossData);
	}

	/**
	 * 通知改名
	 */
	public void noticName(Hero hero) {
		noticFriend(hero);
	}

	/**
	 * 通知改头像
	 */
	public void noticHerdid(Hero hero) {
		noticFriend(hero);
	}

	/**
	 * 通知改头像框
	 */
	public void noticIconid(Hero hero) {
		noticFriend(hero);
	}

	/**
	 * 新建一名微信好友
	 * 
	 * @param hero
	 * @param name
	 * @param level
	 * @param herdid
	 * @param iconid
	 */
	public void addFriend(Hero hero, long hid, String name, int level, int herdid, int iconid) {
		WeiXinFriend friend = new WeiXinFriend();
		friend.setHid(hid);
		friend.setName(name);
		friend.setLevel(level);
		friend.setLevelCfgId(1);
		friend.setLevelState(0);
		friend.setHerdid(herdid);
		friend.setIconid(iconid);
		hero.getWeixinshare().getFriendMap().put(hid, friend);

		int size = hero.getWeixinshare().getFriendMap().size();

		if (hero.getWeixinshare().getNumberState() == 0) {
			Struct_yqhy_278 config = Config_yqhy_278.getIns().get(hero.getWeixinshare().getNumberCfgId());
			if (config != null) {
				if (size >= config.getTime()) {
					hero.getWeixinshare().setNumberState(1);
				}
			}
		}
	}

	/**
	 * 新建一个红包
	 * 
	 * @param hero
	 * @param money
	 */
	public void addHongBao(Hero hero, int money) {
		WeiXinHongBao hongBao = new WeiXinHongBao();
		hongBao.setShareCoin(money);
		hongBao.setState(0);
		hero.getWeixinshare().getHongBaoList().add(hongBao);
		int index = hero.getWeixinshare().getHongBaoList().indexOf(hongBao);
		hongBao.setId(index);
	}

}
