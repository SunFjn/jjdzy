package com.teamtop.system.setting.model;

import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class SettingData {

	/**
	 * 头像
	 */
	@FieldOrder(order = 1)
	private int icon;

	/**
	 * 已拥有的头像
	 */
	@FieldOrder(order = 2)
	private List<Integer> iconList;

	/**
	 * 头像框
	 */
	@FieldOrder(order = 3)
	private int frame;

	/**
	 * 已拥有头像框
	 */
	@FieldOrder(order = 4)
	private List<Integer> frameList;

	/**
	 * 声音开启标识（0：开启，1：关闭）
	 */
	@FieldOrder(order = 5)
	private int sound;

	/**
	 * 势力显示标识（0：显示，1：隐藏）
	 */
	@FieldOrder(order = 6)
	private int showCountry;
	/**	 * 武将音效开启标识（0：开启，1：关闭）	 */
	@FieldOrder(order = 7)
	private int wuJiangSound;

	public int getIcon() {
		return icon;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public List<Integer> getIconList() {
		return iconList;
	}

	public void setIconList(List<Integer> iconList) {
		this.iconList = iconList;
	}

	public int getFrame() {
		return frame;
	}

	public void setFrame(int frame) {
		this.frame = frame;
	}

	public List<Integer> getFrameList() {
		return frameList;
	}

	public void setFrameList(List<Integer> frameList) {
		this.frameList = frameList;
	}

	public int getSound() {
		return sound;
	}

	public void setSound(int sound) {
		this.sound = sound;
	}

	public int getShowCountry() {
		return showCountry;
	}

	public void setShowCountry(int showCountry) {
		this.showCountry = showCountry;
	}
	public int getWuJiangSound() {
		return wuJiangSound;
	}
	public void setWuJiangSound(int wuJiangSound) {
		this.wuJiangSound = wuJiangSound;
	}
}
