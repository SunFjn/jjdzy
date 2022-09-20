package com.teamtop.system.redBox.cross;

import java.util.HashMap;
import java.util.List;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

public class RedBoxCross extends CacheModel{
	/** 红包唯一id*/
	@FieldOrder(order = 1)
	private long boxid;
	/**发送者id*/
	@FieldOrder(order = 2)
	private long sendid;
	
	/**发送者名字*/
	@FieldOrder(order = 3)
	private String name;
	/**红包名字*/
	@FieldOrder(order = 4)	
	private String boxname;
	/**
	 * 头像
	 */
	@FieldOrder(order = 5)	
	private int icon;
	/**
	 * 头像框,
	 */
	@FieldOrder(order = 6)		
	private int frame; 
	/**
	 * 红包总金元宝数
	 */
	@FieldOrder(order = 7)	
	private int maxNum;
	/**
	 * 剩余红包金元宝数
	 */
	@FieldOrder(order = 8)	
	private int leftNum;
	/**
	 * 红包领取情况
	 */
	@FieldOrder(order = 9)	
	private HashMap<Long, RedBoxGeter> redBoxGetInfo;
	
	/**
	 * 红包随机金额
	 */
	@FieldOrder(order = 10)	
	private List<Integer> randomList;
	
	/** 所属partid*/
	@FieldOrder(order = 11)
	private int belongPartid;
	
	
	

	public RedBoxCross() {
		super();
	}

	public long getBoxid() {
		return boxid;
	}

	public void setBoxid(long boxid) {
		this.boxid = boxid;
	}

	public long getSendid() {
		return sendid;
	}

	public void setSendid(long sendid) {
		this.sendid = sendid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBoxname() {
		return boxname;
	}

	public void setBoxname(String boxname) {
		this.boxname = boxname;
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


	public int getMaxNum() {
		return maxNum;
	}

	public void setMaxNum(int maxNum) {
		this.maxNum = maxNum;
	}

	public int getLeftNum() {
		return leftNum;
	}

	public void setLeftNum(int leftNum) {
		this.leftNum = leftNum;
	}

	public HashMap<Long, RedBoxGeter> getRedBoxGetInfo() {
		return redBoxGetInfo;
	}

	public void setRedBoxGetInfo(HashMap<Long, RedBoxGeter> redBoxGetInfo) {
		this.redBoxGetInfo = redBoxGetInfo;
	}

	public int getBelongPartid() {
		return belongPartid;
	}

	public void setBelongPartid(int belongPartid) {
		this.belongPartid = belongPartid;
	}

	public List<Integer> getRandomList() {
		return randomList;
	}

	public void setRandomList(List<Integer> randomList) {
		this.randomList = randomList;
	}
	
	
	

}
