
package com.teamtop.system.team.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.battleNew.model.BuffInfo;

/**
 * 队伍成员
 * @author Administrator
 */
public class TeamMember {
	/**	 * id，角色id或机器人id	 */
//	@FieldOrder(order = 1)
	private long hid;
	/**	 * 队员类型：队长、队员	 */
//	@FieldOrder(order = 2)
	private int type;
	/**	 * 队伍id	 */
//	@FieldOrder(order = 3)
//	private int tid;
	/**	 * 名字，冗余数据，修改名字需要一并修改	 */
	private String name;
	/**	 * 机器人ID	 */
	private int robotId;
	/**	 * 加入队伍时间	 */
	private int timeJoin;
	/**
	 * buff增加的临时属性
	 */
	private Map<Integer, int[][]> buffTempAttrMap = new HashMap<>();
	/**
	 * key:buffid, value:buff信息
	 */
	private Map<Integer, BuffInfo> buffMap = new HashMap<>();
	
	
//	/**	 * 头像	 */
//	private int icon;
//	/**	 * 头像框	 */
//	private int frame;
//	/**	 * 玩家战斗数据：离线、在线、跨服玩家传输到本地的数据	 */
//	private HeroCrossData heroData;
//	/**	 * 离线的查看队伍列表显示数据，下线时记录，上线删除	 */
//	private Object[] offlineData;
//	/**	 * 离线的个人队伍信息数据，下线时记录，上线删除	 */
//	private Object[] offlineTeamInfoData;
//	/**	 * 离线的个人和将领属性数据，下线时记录，上线删除	 */
//	private SendDataMap offlineAttr;
//	/**	 * hero站位	 */
//	@FieldOrder(order = 4)
//	private int heroIndex;
//	/**	 * 带的将领(如果有宠物，将领id为0)	 */
//	@FieldOrder(order = 5)
//	private int gid;
//	/**	 * 宠物id(如果有将领，宠物id为0)	 */
//	@FieldOrder(order = 6)
//	private int petid;
//	/**	 * 带的将领站位	 */
//	@FieldOrder(order = 7)
//	private int generalIndex;
//	/**	 * 队员状态(0：离线，1：在线跟随，2：离队))	 */
//	private int state;
//	/**	 * 副本装备状态 1：准备，0：未准备	 */
//	private int fbState;
	
	public TeamMember(long hid) {
		super();
		this.hid = hid;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
//	public int getTid() {
//		return tid;
//	}
//	public void setTid(int tid) {
//		this.tid = tid;
//	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
//	public int getIcon() {
//		return icon;
//	}
//	public void setIcon(int icon) {
//		this.icon = icon;
//	}
//	public int getFrame() {
//		return frame;
//	}
//	public void setFrame(int frame) {
//		this.frame = frame;
//	}
	public int getRobotId() {
		return robotId;
	}
	public void setRobotId(int robotId) {
		this.robotId = robotId;
	}
	public int getTimeJoin() {
		return timeJoin;
	}
	public void setTimeJoin(int timeJoin) {
		this.timeJoin = timeJoin;
	}

	public Map<Integer, int[][]> getBuffTempAttrMap() {
		return buffTempAttrMap;
	}

	public void setBuffTempAttrMap(Map<Integer, int[][]> buffTempAttrMap) {
		this.buffTempAttrMap = buffTempAttrMap;
	}

	public Map<Integer, BuffInfo> getBuffMap() {
		return buffMap;
	}

	public void setBuffMap(Map<Integer, BuffInfo> buffMap) {
		this.buffMap = buffMap;
	}
}
