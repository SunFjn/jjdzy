package com.teamtop.system.setting;

import java.util.List;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActLC;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.CrossGodGenSendGiftActLC;
import com.teamtop.system.activity.ativitys.overTurntable.OverTurntableFunction;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActLC;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActLC;
import com.teamtop.system.battleVixens.BattleVixensFunction;
import com.teamtop.system.country.CountryFunction;
import com.teamtop.system.country.kingship.KingShipFunction;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsFunction;
import com.teamtop.system.crossHeroesList.HeroesListFunction;
import com.teamtop.system.crossMine.CrossMineFunction;
import com.teamtop.system.crossSoloRun.SoloRunFunction;
import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankLC;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.friends.FriendFunction;
import com.teamtop.system.godGenSendGift.GodGenSendGiftFunction;
import com.teamtop.system.guanqia.GuanqiaFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.linglongge.LingLongGeFunction;
import com.teamtop.system.longZhongDui.LongZhongDuiFunction;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.setting.model.SettingData;
import com.teamtop.system.shaozhuEscort.ShaoZhuEscortFunction;
import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankLC;
import com.teamtop.system.weiXinShare.WeiXinShareFunction;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shezhi_707;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_shezhi_707;

public class SettingManager {

	private static SettingManager settingManager;

	private SettingManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SettingManager getIns() {
		if (settingManager == null) {
			settingManager = new SettingManager();
		}
		return settingManager;
	}

	/**
	 * 更换头像
	 * 
	 * @param hero
	 * @param icon
	 * @param frame
	 */
	public void changeIcon(Hero hero, int icon, int frame) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, SettingConst.Icon_SysId)) {
				// 系统未开放
				return;
			}
			Struct_shezhi_707 iconData = Config_shezhi_707.getIns().get(icon);
			if (iconData == null) {
				// 头像数据不存在
				SettingSender.sendCmd_1022(hid, 0, 1, 0);
				return;
			}
			if (iconData.getType() != 1) {
				// 非头像数据
				SettingSender.sendCmd_1022(hid, 0, 2, 0);
				return;
			}
			SettingData settingData = hero.getSettingData();
			List<Integer> iconList = settingData.getIconList();
			if (!iconList.contains(icon)) {
				icon = settingData.getIcon();
			}

			Struct_shezhi_707 frameData = Config_shezhi_707.getIns().get(frame);
			if (frameData == null) {
				// 头像框数据不存在
				SettingSender.sendCmd_1022(hid, 0, 3, 0);
				return;
			}
			if (frameData.getType() != 2) {
				// 非头像框数据
				SettingSender.sendCmd_1022(hid, 0, 4, 0);
				return;
			}
			List<Integer> frameList = settingData.getFrameList();
			if (!frameList.contains(frame)) {
				frame = settingData.getFrame();
			}

			settingData.setIcon(icon);
			settingData.setFrame(frame);
			hero.setIcon(icon);
			hero.setFrame(frame);
			//设置外观
			hero.getShowModel().setHerdid(icon);
			hero.getShowModel().setHerdUi(frame);
			SettingSender.sendCmd_1022(hid, 1, icon, frame);
			CountryFunction.getIns().refreshCountryStrengthMap(hero, 0);
			KingShipFunction.getIns().updatekingShiplGuardName(hero);
			KingShipFunction.getIns().refreshKingShipModelMap(hero, 0);
			CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 2);
			CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 2);
			CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			ShaoZhuEscortFunction.getIns().escortAddCacheHandle(hero, 0, false);
			// 更新排行榜
			RankingFunction.getIns().refreshAll(hero);
		} catch (Exception e) {
			LogTool.error(e, SettingManager.class, hero.getId(), hero.getName(),
					"changeIcon fail, icon=" + icon + ", frame=" + frame);
		}
	}

	/**
	 * 修改名称
	 * 
	 * @param hero
	 * @param name
	 */
	public void changeName(Hero hero, String name) {
		/*if (true) {
			GlobalSender.sendCmd_260(hero.getId(), 1, "系统维护中");
			return;
		}*/
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!HeroFunction.getIns().checkSystemOpen(hero, SettingConst.Name_SysId)) {
				// 系统未开放
				return;
			}
			if (name.length() > 12) {
				// 名字不能超过12个字符
				SettingSender.sendCmd_1024(hid, 1, "");
				return;
			}
			if (StringUtils.isBlank(name)) {
				// 非法字符
				SettingSender.sendCmd_1024(hid, 2, "");
				return;
			}
			// 微信检测
//			if (!WeixinApiUtils.getIns().msgChesk(name)) {
				// 非法字符
//				SettingSender.sendCmd_1024(hid, 2, "");
//				return;
//			}
			// 非法openId
			if (!IlliegalUtil.isNameIll(name, Integer.MAX_VALUE)) {
				// 非法字符
				SettingSender.sendCmd_1024(hid, 2, "");
				return;
			}
			// 简单防注入验证
			String CHECKSQL = ".*([';]+|(--)+).*";
			if (Pattern.matches(CHECKSQL, name)) {
				// 非法字符
				SettingSender.sendCmd_1024(hid, 2, "");
				return;
			}
			if (name.equals(hero.getName())) {
				// 名字没有改变
				SettingSender.sendCmd_1024(hid, 3, "");
				return;
			}
			boolean isExist = true;
			try {
				isExist = HeroDao.getIns().existName(name, hero.getZoneid());
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (isExist) {
				// 名字已存在
				SettingSender.sendCmd_1024(hid, 4, "");
				return;
			}
			//是否有改名卡
			if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, SettingConst.CHARGE_NAME)) {
				UseAddUtil.use(hero, GameConst.TOOL, 1, SettingConst.CHARGE_NAME, SourceGoodConst.CHARGENAMECARD_CONSUME, true);
			}else {
				int cost = Config_xtcs_004.getIns().get(SettingConst.CHANGE_NAME_COST).getNum();
				if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, cost)) {
					// 元宝不足
					SettingSender.sendCmd_1024(hid, 5, "");
					return;
				}
				UseAddUtil.use(hero, GameConst.YUANBAO, cost, SourceGoodConst.CHANGE_NAME, true);
			}
		
			hero.setName(name);
			try {
				HeroDao.getIns().updateName(name, hid, hero.getZoneid());
			} catch (Exception e) {
				// 名字已存在
				SettingSender.sendCmd_1024(hid, 4, "");
				return;
			}
			RankingFunction.getIns().refreshAll(hero);
			FriendFunction.getIns().changeName(hero);
			GuanqiaFunction.getIns().changeName(hero);
			BattleVixensFunction.getIns().changeName(hero);
			SettingSender.sendCmd_1024(hid, 0, name);
			LingLongGeFunction.getIns().refreshAwardNoticeList(hero, null, 0);
			LingLongGeFunction.getIns().refreshLingLongGeRankList(hero, 0);
			LongZhongDuiFunction.getIns().refreshlongZhongDuiRank(hero, 0);
			OverTurntableFunction.getIns().refreshAwardNoticeList(hero, 0);
			KingShipFunction.getIns().refreshKingShipModelMap(hero, 0);
			CountryFunction.getIns().refreshCountryStrengthMap(hero, 0);
			KingShipFunction.getIns().updatekingShiplGuardName(hero);
			SoloRunFunction.getIns().changeName(hero);
			HeroesListFunction.getIns().reflashName(hero);
			DynastyWarriorsFunction.getIns().changeName(hero);
			GodGenSendGiftFunction.getIns().refreshRankList(hero, 0);
			CrossGodGenSendGiftActLC.getIns().addUpdateConsumeRankListToCen(hero, null, 0, 0);
			CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 1);
			CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 1);
			CrossMineFunction.getIns().changeName(hero);
			WeiXinShareFunction.getIns().noticName(hero);
			CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			ShaoZhuEscortFunction.getIns().escortAddCacheHandle(hero, 0, false);
			CrossRechargeRankActLC.getIns().addUpdateConsumeRankListToCen(hero, 0, 1);
			CrossCommonRankLC.getIns().updateNameIcon(hero, 1);
		} catch (Exception e) {
			LogTool.error(e, SettingManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 开启、关闭声音
	 * 
	 * @param hero
	 * @param type 1：开启，2：关闭
	 */
	public void operateSound(Hero hero, int type, int wuJiang) {
		if (hero == null) {
			return;
		}
		try {
			SettingData settingData = hero.getSettingData();
			int sound = 0;
			if (type == 1) {
				sound = 1;
			}
			wuJiang = wuJiang==1? 1: 0;
			
			settingData.setSound(sound);
			settingData.setWuJiangSound(wuJiang);
		} catch (Exception e) {
			LogTool.error(e, SettingManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 显示、隐藏势力
	 * 
	 * @param hero
	 * @param type 1：显示，2：隐藏
	 */
	public void operateCountry(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			SettingData settingData = hero.getSettingData();
			int showCountry = 0;
			if (type == 1) {
				showCountry = 1;
			}
			settingData.setShowCountry(showCountry);
			hero.setShowCountry(showCountry);

		} catch (Exception e) {
			LogTool.error(e, SettingManager.class, hero.getId(), hero.getName(), "");
		}
	}

}
