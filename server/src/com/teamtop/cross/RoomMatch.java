package com.teamtop.cross;

import java.util.List;
/**
 * 自定义的房间分配（群雄逐鹿和帮战）
 * @author Administrator
 *
 */
public class RoomMatch {
	/**
	 * 房间号
	 */
	private int room;
	/**
	 * 区号集合
	 */
	private List<Integer> zoneids;
	public int getRoom() {
		return room;
	}
	public void setRoom(int room) {
		this.room = room;
	}
	public List<Integer> getZoneids() {
		return zoneids;
	}
	public void setZoneids(List<Integer> zoneids) {
		this.zoneids = zoneids;
	}
}
