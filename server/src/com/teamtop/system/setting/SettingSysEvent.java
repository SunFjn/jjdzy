package com.teamtop.system.setting;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.setting.model.SettingData;

import excel.config.Config_xtcs_004;

public class SettingSysEvent extends AbsSystemEvent {

	private static SettingSysEvent settingSysEvent;

	private SettingSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SettingSysEvent getIns() {
		if (settingSysEvent == null) {
			settingSysEvent = new SettingSysEvent();
		}
		return settingSysEvent;
	}

	@Override
	public void init(Hero hero) {
		SettingData settingData = hero.getSettingData();
		if (settingData == null) {
			settingData = new SettingData();
			List<Integer> iconList = new ArrayList<>();
			List<Integer> frameList = new ArrayList<>();
			settingData.setIconList(iconList);
			settingData.setFrameList(frameList);
			hero.setSettingData(settingData);
			int job = hero.getJob();
			int icon = 0;
			switch (job) {
			case GameConst.ZHANSHI:
				icon = Config_xtcs_004.getIns().get(SettingConst.ZY_ICON).getNum();
				break;
			case GameConst.MOUSHI:
				icon = Config_xtcs_004.getIns().get(SettingConst.ZG_ICON).getNum();
				break;
			case GameConst.WUNV:
				icon = Config_xtcs_004.getIns().get(SettingConst.DC_ICON).getNum();
				break;
			}
			settingData.setIcon(icon);
			iconList.add(icon);
			int frameId = Config_xtcs_004.getIns().get(SettingConst.BASE_FRAME).getNum();
			settingData.setFrame(frameId);
			frameList.add(frameId);
			hero.setIcon(icon);
			hero.setFrame(frameId);
			//设置外观
			hero.getShowModel().setHerdid(icon);
			hero.getShowModel().setHerdUi(frameId);
		}
	}

	@Override
	public void login(Hero hero) {
		// 登录发送
		SettingData settingData = hero.getSettingData();
		int icon = settingData.getIcon();
		int frame = settingData.getFrame();
		List<Integer> iconList = settingData.getIconList();
		List<Integer> frameList = settingData.getFrameList();
		int sound = settingData.getSound();
		int wuJiangSound = settingData.getWuJiangSound();
		int showCountry = settingData.getShowCountry();
		List<Object[]> iconObjList = new ArrayList<>();
		List<Object[]> frameObjList = new ArrayList<>();
		for (int iconId : iconList) {
			iconObjList.add(new Object[] { iconId });
		}
		for (int frameId : frameList) {
			frameObjList.add(new Object[] { frameId });
		}
		SettingSender.sendCmd_1020(hero.getId(), icon, frame, showCountry, sound, wuJiangSound, iconObjList.toArray(),
				frameObjList.toArray());
	}

}
