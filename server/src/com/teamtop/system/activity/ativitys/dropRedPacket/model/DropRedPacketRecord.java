package com.teamtop.system.activity.ativitys.dropRedPacket.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DropRedPacketRecord {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 玩家名称
	 */
	private String name;
	/**
	 * 红包金额
	 */
	private int redPacket;

	public DropRedPacketRecord() {
	}

	public DropRedPacketRecord(long hid) {
		this.hid = hid;
	}

	public DropRedPacketRecord(long hid, String name, int redPacket) {
		this.hid = hid;
		this.name = name;
		this.redPacket = redPacket;
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

	public int getRedPacket() {
		return redPacket;
	}

	public void setRedPacket(int redPacket) {
		this.redPacket = redPacket;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		DropRedPacketRecord model = (DropRedPacketRecord) obj;
		if (this.hid != model.getHid()) {
			return false;
		}
		return true;
	}

}
