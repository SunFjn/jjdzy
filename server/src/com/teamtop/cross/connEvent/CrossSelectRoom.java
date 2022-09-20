package com.teamtop.cross.connEvent;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 跨服选择房间model
 * @author Administrator
 *
 */
public class CrossSelectRoom {
	/**
	 * return值，1为分配成功
	 */
	@FieldOrder(order = 1)
	private int rtn;
	/**
	 * 中央服的ip
	 */
	@FieldOrder(order = 2)
	private String crossIp;
	/**
	 * 中央服的端口
	 */
	@FieldOrder(order = 3)
	private int crossPort;
	/**
	 * 房间id
	 */
	@FieldOrder(order = 4)
	private int roomId;
	
	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public CrossSelectRoom(int rtn, String crossIp, int crossPort) {
		super();
		this.rtn = rtn;
		this.crossIp = crossIp;
		this.crossPort = crossPort;
	}
	
	public CrossSelectRoom() {
		super();
	}

	public int getRtn() {
		return rtn;
	}
	public void setRtn(int rtn) {
		this.rtn = rtn;
	}
	public String getCrossIp() {
		return crossIp;
	}
	public void setCrossIp(String crossIp) {
		this.crossIp = crossIp;
	}

	public int getCrossPort() {
		return crossPort;
	}

	public void setCrossPort(int crossPort) {
		this.crossPort = crossPort;
	}
}
