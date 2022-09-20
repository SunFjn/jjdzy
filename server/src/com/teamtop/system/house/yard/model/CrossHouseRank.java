package com.teamtop.system.house.yard.model;

import com.teamtop.system.crossCommonRank.model.CommonRankModel;

public class CrossHouseRank extends CommonRankModel {
	/** 头像id */
	private int icon;
	/** 头像框id */
	private int frame;
	/** 等级 */
	private int level;
	/** 府邸等级 */
	private int houseLv;
	/** 府邸档次 */
	private int houseDc;
	/** 是否有随机事件 */
	private int hadRandomEvent;

	public CrossHouseRank() {
	}

	public CrossHouseRank(long hid, String name, int icon, int frame, int level, int houseLv, int houseDc,
			int hadRandomEvent,int num) {
		super(hid, name, (houseDc * 100 + houseLv)*1000000 + num);
		this.icon = icon;
		this.frame = frame;
		this.level = level;
		this.houseLv = houseLv;
		this.houseDc = houseDc;
		this.hadRandomEvent = hadRandomEvent;
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

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getHouseLv() {
		return houseLv;
	}

	public void setHouseLv(int houseLv) {
		this.houseLv = houseLv;
	}

	public int getHouseDc() {
		return houseDc;
	}

	public void setHouseDc(int houseDc) {
		this.houseDc = houseDc;
	}

	public int getHadRandomEvent() {
		return hadRandomEvent;
	}

	public void setHadRandomEvent(int hadRandomEvent) {
		this.hadRandomEvent = hadRandomEvent;
	}

}
