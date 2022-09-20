package com.teamtop.system.event.backstage.events.backstage.oldPlayer;

import java.util.ArrayList;

/**
 * 滚服玩家列表
 * @author hepl
 *
 */
public class M_OldPlayer {
	/**
	 * 玩家账号
	 */
	private String openid;
	/**
	 * 玩家建号的区号列表
	 */
	private ArrayList<ZonesInfo> zoneids;
	/**
	 * 创号ip
	 */
	private String createIp;
	
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public ArrayList<ZonesInfo> getZoneids() {
		return zoneids;
	}

	public void setZoneids(ArrayList<ZonesInfo> zoneids) {
		this.zoneids = zoneids;
	}

	public String getCreateIp() {
		return createIp;
	}

	public void setCreateIp(String createIp) {
		this.createIp = createIp;
	}
}
