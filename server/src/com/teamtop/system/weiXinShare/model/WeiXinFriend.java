package com.teamtop.system.weiXinShare.model;

import com.teamtop.util.db.trans.FieldOrder;

public class WeiXinFriend {
	/** 玩家id */
	@FieldOrder(order = 1)
	private long hid;
	/** 区服名字 */
	@FieldOrder(order = 2)
	private String name;
	/** 等级 */
	@FieldOrder(order = 3)
	private int level;
	/** 头像 */
	@FieldOrder(order = 4)
	private int herdid;
	/** 头像框 */
	@FieldOrder(order = 5)
	private int iconid;
	/** 当前等级奖励配置id */
	@FieldOrder(order = 6)
	private int levelCfgId;
	/** 当前等级奖励状态:0-未完成,1-可领取,2-已全部领取 */
	@FieldOrder(order = 7)
	private int levelState;
	
	public WeiXinFriend() {
		
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

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getHerdid() {
		return herdid;
	}

	public void setHerdid(int herdid) {
		this.herdid = herdid;
	}

	public int getIconid() {
		return iconid;
	}

	public void setIconid(int iconid) {
		this.iconid = iconid;
	}

	public int getLevelCfgId() {
		return levelCfgId;
	}

	public void setLevelCfgId(int levelCfgId) {
		this.levelCfgId = levelCfgId;
	}

	public int getLevelState() {
		return levelState;
	}

	public void setLevelState(int levelState) {
		this.levelState = levelState;
	}
}
