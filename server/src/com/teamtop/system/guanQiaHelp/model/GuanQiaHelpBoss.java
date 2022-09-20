package com.teamtop.system.guanQiaHelp.model;

import com.teamtop.system.hero.FinalFightAttr;

public class GuanQiaHelpBoss {
	/** 求助者玩家Id */
	private long hid;
	/** 帮助者玩家Id */
	private long otherId;
	/** 关卡bossId */
	private int bossId;
	/** 当前气血 */
	private double hp;
	/** 最大气血 */
	private double hpmax;
	/** 战斗属性 */
	private FinalFightAttr attr;
	/** 求助者玩家模块 */
	private GuanQiaHelpModel myModel;
	/** 帮助者玩家模块 */
	private GuanQiaHelpModel otherModel;
	/** 无敌结束时间 */
	private long InvincibleTime;
	/** 求助BOSS创建时间 */
	private long createTime;
	/** 关卡BOSS状态:0-正在等待协助,1-正在战斗,2-等待对方回应进入战斗,3-战斗结束 */
	private int state;
	/** 是否有金甲兵 */
	private int hasGoldMonster;
	/** 当前关卡数 */
	private int guanQiaNum;
	/** 协助开始时间 */
	private long askTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public long getOtherId() {
		return otherId;
	}

	public void setOtherId(long otherId) {
		this.otherId = otherId;
	}

	public double getHpmax() {
		return hpmax;
	}

	public void setHpmax(double hpmax) {
		this.hpmax = hpmax;
	}

	public int getBossId() {
		return bossId;
	}

	public void setBossId(int bossId) {
		this.bossId = bossId;
	}

	public double getHp() {
		return hp;
	}

	public void setHp(double hp) {
		this.hp = hp;
	}

	public FinalFightAttr getAttr() {
		return attr;
	}

	public void setAttr(FinalFightAttr attr) {
		this.attr = attr;
	}

	public GuanQiaHelpModel getMyModel() {
		return myModel;
	}

	public void setMyModel(GuanQiaHelpModel myModel) {
		this.myModel = myModel;
	}

	public GuanQiaHelpModel getOtherModel() {
		return otherModel;
	}

	public void setOtherModel(GuanQiaHelpModel otherModel) {
		this.otherModel = otherModel;
	}

	public long getInvincibleTime() {
		return InvincibleTime;
	}

	public void setInvincibleTime(long invincibleTime) {
		InvincibleTime = invincibleTime;
	}

	public long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getHasGoldMonster() {
		return hasGoldMonster;
	}

	public void setHasGoldMonster(int hasGoldMonster) {
		this.hasGoldMonster = hasGoldMonster;
	}

	public int getGuanQiaNum() {
		return guanQiaNum;
	}

	public void setGuanQiaNum(int guanQiaNum) {
		this.guanQiaNum = guanQiaNum;
	}

	public long getAskTime() {
		return askTime;
	}

	public void setAskTime(long askTime) {
		this.askTime = askTime;
	}

}