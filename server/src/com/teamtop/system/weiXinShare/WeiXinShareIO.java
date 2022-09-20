package com.teamtop.system.weiXinShare;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.weiXinShare.model.WeiXinFriend;
import com.teamtop.system.weiXinShare.model.WeiXinShareDao;

import excel.config.Config_hylv_278;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_hylv_278;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class WeiXinShareIO {
	private static WeiXinShareIO ins;

	public static synchronized WeiXinShareIO getIns() {
		if (ins == null) {
			ins = new WeiXinShareIO();
		}
		return ins;
	}

	/**
	 * 子服收到好友信息更新
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void HLnoticFriend(Channel channel, CrossData crossData) {
		int cmd = CrossConst.WEI_XIN_SHARE_FRIEND_HL;

		try {
			int zoneId = crossData.getObject(WeiXinShareEnum.zoneId, Integer.class);
			String openid = crossData.getObject(WeiXinShareEnum.openid, String.class);

			long friendHid = crossData.getObject(WeiXinShareEnum.hid, Long.class);
			String name = crossData.getObject(WeiXinShareEnum.name, String.class);
			int level = crossData.getObject(WeiXinShareEnum.level, Integer.class);
			int herdid = crossData.getObject(WeiXinShareEnum.herdid, Integer.class);
			int iconid = crossData.getObject(WeiXinShareEnum.iconid, Integer.class);

			long hid = HeroDao.getIns().findHidByOpenid(openid, zoneId);
			Hero hero = HeroCache.getHero(hid);

			boolean isOnline = true;
			if (hero == null) {
				// 不在线特殊处理
				hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_WEI_XIN_SHARE);
				if (hero == null || hero.getWeixinshare() == null) {
					// 数据异常
					return;
				}
				isOnline = false;
			}

			WeiXinFriend friend = hero.getWeixinshare().getFriendMap().get(friendHid);
			if (friend != null) {
				// 刷新信息
				friend.setName(name);
				friend.setLevel(level);
				friend.setHerdid(herdid);
				friend.setIconid(iconid);

				if (friend.getLevelState() == 0) {
					Struct_hylv_278 config = Config_hylv_278.getIns().get(friend.getLevelCfgId());
					if (config != null) {
						if (level >= config.getLv()) {
							friend.setLevelState(1);
						}
					}
				}
			} else {
				// 新增好友
				if (hero.getWeixinshare().getFriendMap().size() >= 100) {
					return;
				}
				WeiXinShareFunction.getIns().addFriend(hero, friendHid, name, level, herdid, iconid);
			}

			WeiXinShareFunction.getIns().updateRedPoint(hero);

			if (!isOnline) {
				WeiXinShareDao.getIns().update(hero.getWeixinshare());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 子服收到红包
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void HLnoticMoney(Channel channel, CrossData crossData) {
		int cmd = CrossConst.WEI_XIN_SHARE_MONEY_HL;

		try {
			int zoneId = crossData.getObject(WeiXinShareEnum.zoneId, Integer.class);
			String openid = crossData.getObject(WeiXinShareEnum.openid, String.class);
			int money = crossData.getObject(WeiXinShareEnum.money, Integer.class);

			long friendHid = crossData.getObject(WeiXinShareEnum.hid, Long.class);

			double add = 10;
			Struct_xtcs_004 config = Config_xtcs_004.getIns().get(WeiXinShareConst.CONFIG_9903);
			if (config != null) {
				add = config.getNum();
			}

			money = (int) Math.ceil((double) money * 100 * (add / 100));

			long hid = HeroDao.getIns().findHidByOpenid(openid, zoneId);
			Hero hero = HeroCache.getHero(hid);

			boolean isOnline = true;
			if (hero == null) {
				// 不在线特殊处理
				hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_WEI_XIN_SHARE);
				if (hero == null || hero.getWeixinshare() == null) {
					// 数据异常
					return;
				}
				isOnline = false;
			}

			if (!hero.getWeixinshare().getFriendMap().containsKey(friendHid)) {
				return;
			}

			int shareCoin = hero.getWeixinshare().getTodayShareCoin();
			if (shareCoin + money >= 100000) {
				money = 100000 - shareCoin;
			}
			if (money <= 0) {
				return;
			}

			WeiXinShareFunction.getIns().addHongBao(hero, money);

			WeiXinShareFunction.getIns().updateRedPoint(hero);

			if (!isOnline) {
				WeiXinShareDao.getIns().update(hero.getWeixinshare());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
