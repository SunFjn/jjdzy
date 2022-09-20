package com.teamtop.system.setting;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.setting.model.SettingData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_daoju_204;
import excel.config.Config_shezhi_707;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_shezhi_707;

public class SettingFunction {

	private static SettingFunction settingFunction;

	private SettingFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SettingFunction getIns() {
		if (settingFunction == null) {
			settingFunction = new SettingFunction();
		}
		return settingFunction;
	}

	/**
	 * 使用道具激活头像或头像框
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 */
	public boolean activateIconOrFrame(Hero hero, int id, int num) {
		try {
			long hid = hero.getId();
			Struct_daoju_204 item = Config_daoju_204.getIns().get(id);
			String use = item.getUse();
			int addId = Integer.parseInt(use);
			Struct_shezhi_707 struct_shezhi_707 = Config_shezhi_707.getIns().get(addId);
			int type = struct_shezhi_707.getType();
			SettingData settingData = hero.getSettingData();
			if (!HeroFunction.getIns().checkSystemOpen(hero, SettingConst.Icon_SysId)) {
				// 未开启
				SettingSender.sendCmd_1030(hid, 1);
				return false;
			}
			if (type == 1) {// 头像
				List<Integer> iconList = settingData.getIconList();
				if (iconList.contains(id)) {
					// 已激活过
					SettingSender.sendCmd_1030(hid, 2);
					return false;
				}
				iconList.add(addId);
			} else {
				List<Integer> FrameList = settingData.getFrameList();
				if (FrameList.contains(id)) {
					// 已激活过
					SettingSender.sendCmd_1030(hid, 2);
					return false;
				}
				FrameList.add(addId);
			}
			updateIconFrame(hero);
			return true;
		} catch (Exception e) {
			LogTool.error(e, SettingFunction.class, hero.getId(), hero.getName(), "activateIconOrFrame fail, id="+id);
			return false;
		}
	}

	public void vipLevelUp(Hero hero, int vipLevel) {
		try {
			long hid = hero.getId();
			SettingData settingData = hero.getSettingData();
			List<Struct_shezhi_707> sortList = Config_shezhi_707.getIns().getSortList();
			Struct_shezhi_707 struct_shezhi_707 = null;
			boolean update = false;
			for (int i = 0; i < sortList.size(); i++) {
				struct_shezhi_707 = sortList.get(i);
				int id = struct_shezhi_707.getId();
				int[][] condition = struct_shezhi_707.getCondition();
				boolean isOnlyVip = true;
				int atVipLevel = 0;
				for (int[] info : condition) {
					if (info[0] == 2 || info[0] == 3) {// 道具或将领激活
						isOnlyVip = false;
						break;
					}
					atVipLevel = info[1];
				}
				if (isOnlyVip && vipLevel >= atVipLevel) {
					if (!HeroFunction.getIns().checkSystemOpen(hero, SettingConst.Icon_SysId)) {
						// 未开启
						SettingSender.sendCmd_1030(hid, 1);
						continue;
					}
					int type = struct_shezhi_707.getType();
					if (type == 1) {// 头像
						List<Integer> iconList = settingData.getIconList();
						if (iconList.contains(id)) {
							// 已激活过
							//SettingSender.sendCmd_1030(hid, 2);
							continue;
						}
						iconList.add(id);
						update = true;
					} else {
						List<Integer> FrameList = settingData.getFrameList();
						if (FrameList.contains(id)) {
							// 已激活过
							//SettingSender.sendCmd_1030(hid, 2);
							continue;
						}
						FrameList.add(id);
						update = true;
					}
				}
			}
			if (update) {
				updateIconFrame(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, SettingFunction.class, hero.getId(), hero.getName(),
					"vipLevelUp activateIconOrFrame fail");
		}
	}

	/**
	 * 获得将领激活
	 * 
	 * @param 武将职业id
	 */
	public void generalActivate(Hero hero, int generalId) {
		try {
			long hid = hero.getId();
			SettingData settingData = hero.getSettingData();
			List<Struct_shezhi_707> sortList = Config_shezhi_707.getIns().getSortList();
			Struct_shezhi_707 struct_shezhi_707 = null;
			boolean update = false;
			for (int i = 0; i < sortList.size(); i++) {
				struct_shezhi_707 = sortList.get(i);
				int id = struct_shezhi_707.getId();
				int[][] condition = struct_shezhi_707.getCondition();
				boolean isOnlyGeneral = true;
				int atGeneralId = 0;
				for (int[] info : condition) {
					if (info[0] == 1 || info[0] == 2) {// 道具或vip激活
						isOnlyGeneral = false;
						break;
					}
					atGeneralId = info[1];
				}
				if (isOnlyGeneral && generalId == atGeneralId) {
					if (!HeroFunction.getIns().checkSystemOpen(hero, SettingConst.Icon_SysId)) {
						// 未开启
						SettingSender.sendCmd_1030(hid, 1);
						continue;
					}
					int type = struct_shezhi_707.getType();
					if (type == 1) {// 头像
						List<Integer> iconList = settingData.getIconList();
						if (iconList.contains(id)) {
							// 已激活过
							SettingSender.sendCmd_1030(hid, 2);
							continue;
						}
						iconList.add(id);
						update = true;
					} else {
						List<Integer> FrameList = settingData.getFrameList();
						if (FrameList.contains(id)) {
							// 已激活过
							SettingSender.sendCmd_1030(hid, 2);
							continue;
						}
						FrameList.add(id);
						update = true;
					}
				}
			}
			if (update) {
				updateIconFrame(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, SettingFunction.class, hero.getId(), hero.getName(),
					"generalActivate activateIconOrFrame fail");
		}
	}

	/**
	 * 获得侍女激活
	 * 
	 * @param 侍女id
	 */
	public void maidActivate(Hero hero, int maidId) {
		try {
			long hid = hero.getId();
			SettingData settingData = hero.getSettingData();
			List<Struct_shezhi_707> sortList = Config_shezhi_707.getIns().getSortList();
			Struct_shezhi_707 struct_shezhi_707 = null;
			boolean update = false;
			for (int i = 0; i < sortList.size(); i++) {
				struct_shezhi_707 = sortList.get(i);
				int id = struct_shezhi_707.getId();
				int[][] condition = struct_shezhi_707.getCondition();
				boolean isOnlyGeneral = true;
				int atGeneralId = 0;
				for (int[] info : condition) {
					if (info[0] == 1 || info[0] == 2) {// 道具或vip激活
						isOnlyGeneral = false;
						break;
					}
					atGeneralId = info[1];
				}
				if (isOnlyGeneral && maidId == atGeneralId) {
					if (!HeroFunction.getIns().checkSystemOpen(hero, SettingConst.Icon_SysId)) {
						// 未开启
						continue;
					}
					int type = struct_shezhi_707.getType();
					if (type == 1) {// 头像
						List<Integer> iconList = settingData.getIconList();
						if (iconList.contains(id)) {
							// 已激活过
							continue;
						}
						iconList.add(id);
						update = true;
					} else {
						List<Integer> FrameList = settingData.getFrameList();
						if (FrameList.contains(id)) {
							// 已激活过
							continue;
						}
						FrameList.add(id);
						update = true;
					}
				}
			}
			if (update) {
				updateIconFrame(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, SettingFunction.class, hero.getId(), hero.getName(),
					"maidActivate activateIconOrFrame fail");
		}
	}

	public void updateIconFrame(Hero hero) {
		SettingData settingData = hero.getSettingData();
		List<Integer> iconList = settingData.getIconList();
		List<Integer> frameList = settingData.getFrameList();
		List<Object[]> iconObjList = new ArrayList<>();
		List<Object[]> frameObjList = new ArrayList<>();
		for (int iconId : iconList) {
			iconObjList.add(new Object[] { iconId });
		}
		for (int frameId : frameList) {
			frameObjList.add(new Object[] { frameId });
		}
		SettingSender.sendCmd_1032(hero.getId(), iconObjList.toArray(), frameObjList.toArray());
	}

}
