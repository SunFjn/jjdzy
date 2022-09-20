package com.teamtop.system.mount;

import java.util.HashMap;

/**
 * 坐骑
 * @author Administrator
 */
public class Mount {
	private long hid;
	/**
	 * 当前骑乘坐骑id
	 */
	private int rideId;
	/**
	 * 激活的坐骑<坐骑id,坐骑>
	 */
	private HashMap<Integer,MountModel> mountModels;
	
	public Mount() {
		super();
	}
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getRideId() {
		return rideId;
	}
	public void setRideId(int rideId) {
		this.rideId = rideId;
	}
	public HashMap<Integer, MountModel> getMountModels() {
		return mountModels;
	}
	public void setMountModels(HashMap<Integer, MountModel> mountModels) {
		this.mountModels = mountModels;
	}
}
