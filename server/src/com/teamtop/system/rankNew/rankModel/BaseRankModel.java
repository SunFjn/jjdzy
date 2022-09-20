package com.teamtop.system.rankNew.rankModel;

import java.util.List;

import com.teamtop.util.log.LogTool;

import excel.config.Config_lunhui_274;
import excel.struct.Struct_lunhui_274;

public class BaseRankModel implements Comparable<BaseRankModel> {

	/** 玩家id */
	private long id;

	/** 排行榜类型 */
	private int rankType;

	/** 名字 */
	private String name;

	/** 官衔 */
	private int official;

	/** 职业 */
	private int job;

	/** 创号时的职业 */
	private int createJob;

	/** 国家 */
	private int countryType;

	/** 称号 */
	private int titleId;

	/** 等级 */
	private int level;
	
	/** 轮回等级 */
	private int reincarnationLevel;

	/** vip等级 */
	private int vipLv;

	/** 战力 */
	private long strength;

	/** 玩家战力 */
	private long totalStrength;

	/** 头像 */
	private int icon;

	/** 头像框 */
	private int frame;

	/** 显示国家 */
	private int showCountry;

	/** 区号 */
	private int zoneid;
	/** 时装*/
	private int bodyid;
	/** 专属神兵*/
	private int godWeapon;
	/**坐骑*/
	private int mountId;

	// /** 排行 */
	// private int ranking;

	public long getHid() {
		return id;
	}

	public void setHid(long hid) {
		this.id = hid;
	}

	public int getRankType() {
		return rankType;
	}

	public void setRankType(int rankType) {
		this.rankType = rankType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getOfficial() {
		return official;
	}

	public void setOfficial(int official) {
		this.official = official;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public int getCreateJob() {
		return createJob;
	}

	public void setCreateJob(int createJob) {
		this.createJob = createJob;
	}

	public int getCountryType() {
		return countryType;
	}

	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}

	public int getTitleId() {
		return titleId;
	}

	public void setTitleId(int titleId) {
		this.titleId = titleId;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getVipLv() {
		return vipLv;
	}

	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public long getTotalStrength() {
		return totalStrength;
	}

	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}

	// public int getRanking() {
	// return ranking;
	// }
	//
	// public void setRanking(int ranking) {
	// this.ranking = ranking;
	// }

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

	public int getShowCountry() {
		return showCountry;
	}

	public void setShowCountry(int showCountry) {
		this.showCountry = showCountry;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public int getBodyid() {
		return bodyid;
	}

	public void setBodyid(int bodyid) {
		this.bodyid = bodyid;
	}

	@Override
	public int compareTo(BaseRankModel o) {
		if(o.getHid() == getHid()) {
			return 0;
		}
		if (o.getStrength() > this.getStrength()) {
			return 1;
		} else if (o.getStrength() < this.getStrength()) {
			return -1;
		} else {
			if (o.getRealLv() > this.getRealLv()) {
				return 1;
			} else if (o.getRealLv() < this.getRealLv()) {
				return -1;
			} else {
				if (o.getTotalStrength() > this.getTotalStrength()) {
					return 1;
				} else if (o.getTotalStrength() < this.getTotalStrength()) {
					return -1;
				} else {
					if (o.getHid() < getHid()) {
						return 1;
					} else if (o.getHid() > getHid()) {
						return -1;
					}
					return 0;
				}
			}
		}
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof BaseRankModel) {
			BaseRankModel model = (BaseRankModel) obj;
			if (model.getHid() == this.id) {
				return true;
			} else {
				return false;
			}
		}
		return super.equals(obj);
	}

	public int getGodWeapon() {
		return godWeapon;
	}

	public void setGodWeapon(int godWeapon) {
		this.godWeapon = godWeapon;
	}

	public int getReincarnationLevel() {
		return reincarnationLevel;
	}

	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}

	public int getMountId() {
		return mountId;
	}

	public void setMountId(int mountId) {
		this.mountId = mountId;
	}

	public int getRealLv() {
		int totalAddLevel = 0;
		try {
			List<Struct_lunhui_274> sortList = Config_lunhui_274.getIns().getSortList();
			int nowReincarnationLevel = getReincarnationLevel();
			if (nowReincarnationLevel > 0) {
				for (int i = nowReincarnationLevel; i > 0; i--) {
					totalAddLevel += sortList.get(i - 1).getLv();
				}
			}
		} catch (Exception e) {
			LogTool.info("Hero getRealLevel", this);
		}
		int realLevel = getLevel() + totalAddLevel;
		return realLevel;
	}

}
