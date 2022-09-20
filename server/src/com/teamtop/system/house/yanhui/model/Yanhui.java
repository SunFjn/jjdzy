package com.teamtop.system.house.yanhui.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 
 * 宴会信息
 * 
 */
public class Yanhui {
	/**
	 * 宴会id
	 */
	@FieldOrder(order = 1)
	private int id;
	
	/**
	 * 宴会主人id
	 */
	@FieldOrder(order = 2)
	private long hid;
	
	/**
	 * 开启的boss<boosid,boss>
	 */
	@FieldOrder(order = 3)
	private Map<Integer,YanhuiBoss> bossMap;
	
	/**
	 * 场景唯一id
	 */
	@FieldOrder(order = 4)
	private int sceneUnitId;
	
	/**
	 * 地图id
	 */
	@FieldOrder(order = 5)
	private int mapId;

	/**
	 * 宴会主人名称
	 */
	@FieldOrder(order = 6)
	private String name;
	/**
	 * 头像
	 */
	@FieldOrder(order = 7)
	private int icon;
	/**
	 * 头像框,默认：  int frameId = Config_xtcs_004.getIns().get(SettingConst.BASE_FRAME).getNum();
	 */
	@FieldOrder(order = 8)
	private int frame;
	 
	/**
	 * 宴会玩家
	 */
	@FieldOrder(order = 9)
	private Map<Long,YanhuiMember> yanhuiMemberMap;
	
	/**
	 * 宴会结束时间
	 */
	@FieldOrder(order = 10)
	private int time;
	/**
	 * 宴会类型
	 */
	@FieldOrder(order = 11)
	private int type;
	/**
	 * 接受普通赴宴礼物 1.不接受
	 */
	@FieldOrder(order = 12)
	private int accept;
	/**
	 * 氛围值
	 */
	@FieldOrder(order = 13)
	private int fenweiVal;
	
	/**
	 * 敬酒<玩家id<标识(次数递增)，敬酒id>>
	 */
	@FieldOrder(order = 14)
	private Map<Long,Map<Integer,Integer>> jingjiuMap;
	
	/**
	 * 申请玩家
	 */
	@FieldOrder(order = 15)
	private Map<Long,ShenqingMember> shenqingMemberMap;
	
	/**
	 * 申请类型 0.无需申请 1.需申请
	 */
	@FieldOrder(order = 16)
	private int applyType;
	
	public Yanhui() {
		super();
	}

	public Yanhui(CrossHeroBaseModel heroBase, int id, int sceneUnitId, int mapId,int time,int type,int accept) {
		this.id = id;
		this.hid = heroBase.getId();
		this.name = heroBase.getNameZoneid();
		this.icon = heroBase.getIcon();
		this.frame = heroBase.getFrame();
		this.sceneUnitId = sceneUnitId;
		this.mapId = mapId;
		this.time = time;
		this.type = type;
		this.accept = accept;
		this.yanhuiMemberMap = new HashMap<Long, YanhuiMember>();
		this.jingjiuMap = new HashMap<Long,Map<Integer,Integer>>();
		this.bossMap = new HashMap<Integer, YanhuiBoss>();
		this.shenqingMemberMap = new HashMap<Long, ShenqingMember>();
	}


	public int getApplyType() {
		return applyType;
	}

	public void setApplyType(int applyType) {
		this.applyType = applyType;
	}

	public Map<Long, ShenqingMember> getShenqingMemberMap() {
		return shenqingMemberMap;
	}

	public void setShenqingMemberMap(Map<Long, ShenqingMember> shenqingMemberMap) {
		this.shenqingMemberMap = shenqingMemberMap;
	}

	public Map<Long, Map<Integer, Integer>> getJingjiuMap() {
		return jingjiuMap;
	}

	public void setJingjiuMap(Map<Long, Map<Integer, Integer>> jingjiuMap) {
		this.jingjiuMap = jingjiuMap;
	}

	public int getAccept() {
		return accept;
	}

	public void setAccept(int accept) {
		this.accept = accept;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getId() {
		return id;
	}




	public void setId(int id) {
		this.id = id;
	}




	public long getHid() {
		return hid;
	}




	public void setHid(long hid) {
		this.hid = hid;
	}






	public int getSceneUnitId() {
		return sceneUnitId;
	}




	public void setSceneUnitId(int sceneUnitId) {
		this.sceneUnitId = sceneUnitId;
	}




	public int getMapId() {
		return mapId;
	}




	public void setMapId(int mapId) {
		this.mapId = mapId;
	}




	public Map<Integer, YanhuiBoss> getBossMap() {
		return bossMap;
	}




	public void setBossMap(Map<Integer, YanhuiBoss> bossMap) {
		this.bossMap = bossMap;
	}




	public String getName() {
		return name;
	}




	public void setName(String name) {
		this.name = name;
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



	public Map<Long, YanhuiMember> getYanhuiMemberMap() {
		return yanhuiMemberMap;
	}

	public void setYanhuiMemberMap(Map<Long, YanhuiMember> yanhuiMemberMap) {
		this.yanhuiMemberMap = yanhuiMemberMap;
	}

	public int getFenweiVal() {
		return fenweiVal;
	}

	public void setFenweiVal(int fenweiVal) {
		this.fenweiVal = fenweiVal;
	}
	
}
