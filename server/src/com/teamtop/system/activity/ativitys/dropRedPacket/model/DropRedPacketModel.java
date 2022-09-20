package com.teamtop.system.activity.ativitys.dropRedPacket.model;

import java.util.ArrayList;
import java.util.List;

public class DropRedPacketModel {
	/**
	 * id
	 */
	private long id;
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 玩家名称
	 */
	private String name;
	/**
	 * 红包类型
	 */
	private int type;
//	/**
//	 * 剩余红包总额
//	 */
//	private int restRedPacket;

	/**
	 * 红包随机金额
	 */
	private List<Integer> randomList;
	/**
	 * 红包数量
	 */
	private int num;

	/**
	 * 已经领取过红包hid记录
	 */
	private List<DropRedPacketRecord> recordList;
	/**
	 * 头像
	 */
	private int icon;
	/**
	 * 头像框
	 */
	private int frame;

	public DropRedPacketModel() {
		// TODO Auto-generated constructor stub
	}

	public DropRedPacketModel(long id) {
		this.id = id;
	}

	public DropRedPacketModel(long hid, String name, int type, int num, int icon, int frame) {
		this.hid = hid;
		this.name = name;
		this.type = type;
		this.num = num;
		this.icon = icon;
		this.frame = frame;
	}

	public long getId() {
		return id;
	}

	public void setId(long hid) {
		this.id = hid;
	}

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

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
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

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public List<DropRedPacketRecord> getRecordList() {
		if (recordList == null) {
			recordList = new ArrayList<>();
		}
		return recordList;
	}

	public void setRecordList(List<DropRedPacketRecord> recordList) {
		this.recordList = recordList;
	}

	public List<Integer> getRandomList() {
		return randomList;
	}

	public void setRandomList(List<Integer> randomList) {
		this.randomList = randomList;
	}

//	public int getRestRedPacket() {
//		return restRedPacket;
//	}
//
//	public void setRestRedPacket(int restRedPacket) {
//		this.restRedPacket = restRedPacket;
//	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		DropRedPacketModel model = (DropRedPacketModel) obj;
		if (this.id != model.getId()) {
			return false;
		}
		return true;
	}

}
