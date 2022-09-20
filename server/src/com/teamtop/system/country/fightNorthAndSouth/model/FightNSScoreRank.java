package com.teamtop.system.country.fightNorthAndSouth.model;

import com.teamtop.system.setting.model.SettingData;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.trans.FieldOrder;
import com.teamtop.util.db.trans.ObjStrTransUtil;

public class FightNSScoreRank implements Comparable<FightNSScoreRank> {

	/**
	 * 玩家id
	 */
	@FieldOrder(order = 1)
	private long hid;

	/**
	 * 玩家名称
	 */
	@FieldOrder(order = 2)
	private String name;

	/**
	 * 等级
	 */
	@FieldOrder(order = 3)
	private int level;

	/**
	 * 职业
	 */
	@FieldOrder(order = 4)
	private int job;

	/**
	 * 头像
	 */
	@FieldOrder(order = 5)
	private int icon;

	/**
	 * 头像框
	 */
	@FieldOrder(order = 6)
	private int frame;

	/**
	 * 官衔
	 */
	@FieldOrder(order = 7)
	private int official;

	/**
	 * 国家类型
	 */
	@FieldOrder(order = 8)
	private int countryType;

	/**
	 * 积分
	 */
	@FieldOrder(order = 9)
	private int score;

	/**
	 * 战力
	 */
	@FieldOrder(order = 10)
	private long strength;

	/**
	 * 更新时间
	 */
	@FieldOrder(order = 11)
	private int createTime;

	/**
	 * 设置数据字符串
	 */
	@FieldOrder(order = 12)
	private String settingData;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public int getIcon() {
		return icon;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public int getFrame() {
		return frame;
	}

	public void setFrame(int frame) {
		this.frame = frame;
	}

	public int getOfficial() {
		return official;
	}

	public void setOfficial(int official) {
		this.official = official;
	}

	public int getCountryType() {
		return countryType;
	}

	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public int getCreateTime() {
		return createTime;
	}

	public void setCreateTime(int createTime) {
		this.createTime = createTime;
	}

	public String getSettingData() {
		return settingData;
	}

	public void setSettingData(String settingData) {
		this.settingData = settingData;
		try {
			if (!CommonUtil.isNull(settingData)) {
				SettingData data = ObjStrTransUtil.toObj(settingData, SettingData.class);
				icon = data.getIcon();
				frame = data.getFrame();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof FightNSScoreRank) {
			FightNSScoreRank model = (FightNSScoreRank) obj;
			if (model.getHid() == this.hid) {
				return true;
			} else {
				return false;
			}
		}
		return super.equals(obj);
	}

	@Override
	public int compareTo(FightNSScoreRank o) {
		if (o.getHid() == getHid()) {
			return 0;
		}
		if (o.getScore() > this.getScore()) {
			return 1;
		} else if (o.getScore() == this.getScore()) {
			if (o.getCreateTime() < this.getCreateTime()) {
				return 1;
			} else if (o.getCreateTime() == this.getCreateTime()) {
				if (o.getHid() < getHid()) {
					return 1;
				} else if (o.getHid() == getHid()) {
					return 0;
				}
			}
		}
		return -1;
	}

}
