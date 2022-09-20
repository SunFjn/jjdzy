package com.teamtop.system.NPC;
/**
 * 玩家采集时的model
 * @author Administrator
 *
 */
public class HeroCollectNpc {
	/** npcUid*/
	private long npcUid;
	/** 超时的时间戳*/
	private int timeout;
	/**hid */
	private long hid;
	public long getNpcUid() {
		return npcUid;
	}
	public int getTimeout() {
		return timeout;
	}
	public long getHid() {
		return hid;
	}
	public HeroCollectNpc(long npcUid, int timeout, long hid) {
		super();
		this.npcUid = npcUid;
		this.timeout = timeout;
		this.hid = hid;
	}
	
	
	
}
