package com.teamtop.system.crossDynastyWarriors.model;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 奖池数据
 * 
 * @author hzp
 *
 */
public class PondData {

	/** 奖池id */
	@FieldOrder(order = 1)
	private int id;

	/** 已领取人数 */
	@FieldOrder(order = 2)
	private int playerNum;

	/** 抢到最多奖励的玩家id */
	@FieldOrder(order = 3)
	private long luckyId;

	/** 玩家名称 */
	@FieldOrder(order = 4)
	private String name;

	/** 当前贵高奖励 */
	@FieldOrder(order = 5)
	private int money;

	/** 当领取人数满通知子服标志 */
	@FieldOrder(order = 6)
	private boolean notice;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPlayerNum() {
		return playerNum;
	}

	public void setPlayerNum(int playerNum) {
		this.playerNum = playerNum;
	}

	public long getLuckyId() {
		return luckyId;
	}

	public void setLuckyId(long luckyId) {
		this.luckyId = luckyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getMoney() {
		return money;
	}

	public void setMoney(int money) {
		this.money = money;
	}

	public boolean isNotice() {
		return notice;
	}

	public void setNotice(boolean notice) {
		this.notice = notice;
	}

}
