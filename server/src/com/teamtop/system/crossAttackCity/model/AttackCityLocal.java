package com.teamtop.system.crossAttackCity.model;

import java.util.Map;
import java.util.Set;

import com.teamtop.system.crossAttackCity.AttackCityConst;
import com.teamtop.util.db.trans.FieldOrder;

public class AttackCityLocal {
	/*** 玩家id */
	@FieldOrder(order = 1)
	private long hid;
	/*** 当前城池id */
	@FieldOrder(order = 2)
	private int cityId;
	/*** 重置次数 */
	@FieldOrder(order = 3)
	private int times;
	/*** 商城信息 */
	@FieldOrder(order = 4)
	private Map<Integer, Integer> shopMap;
	/*** 商店刷新时间 */
	@FieldOrder(order = 5)
	private int shopRefreshTime;
	/*** 今天是否已选择难度 0没有 1已选 */
	@FieldOrder(order = 6)
	private int choose;
	/*** 可购买次数 每天重置 */
	@FieldOrder(order = 7)
	private int buyTimes;
	/*** 每日剩余可驻守时间 */
	@FieldOrder(order = 8)
	private int reTime;
	/*** 累计奖励物资 */
	@FieldOrder(order = 9)
	private int countAward;
	/*** 累计首通通关id */
	@FieldOrder(order = 10)
	private Set<Integer> passSet;
	/*** 占领的城池id */
	@FieldOrder(order = 11)
	private int dispatchId;
	/*** 已开启难度 */
	@FieldOrder(order = 12)
	private int nd;
	/*** 累计通关id 每日重置 */
	@FieldOrder(order = 13)
	private Set<Integer> rePassSet;
	/*** 正在攻击的城池id 不入库 */
	@FieldOrder(order = 14)
	private int attckCityId;
	/*** 正在攻击的玩家id 不入库 */
	@FieldOrder(order = 15)
	private long attckPlayerId;

	public Set<Integer> getRePassSet() {
		return rePassSet;
	}

	public void setRePassSet(Set<Integer> rePassSet) {
		this.rePassSet = rePassSet;
	}

	public long getAttckPlayerId() {
		return attckPlayerId;
	}

	public void setAttckPlayerId(long attckPlayerId) {
		this.attckPlayerId = attckPlayerId;
	}

	public int getChoose() {
		return choose;
	}

	public void setChoose(int choose) {
		this.choose = choose;
	}

	public int getNd() {
		return nd;
	}

	public void setNd(int nd) {
		this.nd = nd;
	}

	public int getDispatchId() {
		return dispatchId;
	}

	public void setDispatchId(int dispatchId) {
		this.dispatchId = dispatchId;
	}

	public Set<Integer> getPassSet() {
		return passSet;
	}

	public void setPassSet(Set<Integer> passSet) {
		this.passSet = passSet;
	}



	public int getCountAward() {
		return countAward;
	}

	public void setCountAward(int countAward) {
		if (countAward >= AttackCityConst.XTCS_8251[0][2]) {
			countAward = AttackCityConst.XTCS_8251[0][2];
		}
		this.countAward = countAward;
	}

	public int getReTime() {
		return reTime;
	}

	public void setReTime(int reTime) {
		if (reTime < 0) {
			reTime = 0;
		}
		this.reTime = reTime;
	}

	public int getBuyTimes() {
		return buyTimes;
	}

	public void setBuyTimes(int buyTimes) {
		this.buyTimes = buyTimes;
	}

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	public AttackCityLocal() {

	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getTimes() {
		return times;
	}

	public void setTimes(int times) {
		this.times = times;
	}

	public Map<Integer, Integer> getShopMap() {
		return shopMap;
	}

	public void setShopMap(Map<Integer, Integer> shopMap) {
		this.shopMap = shopMap;
	}

	public int getShopRefreshTime() {
		return shopRefreshTime;
	}

	public void setShopRefreshTime(int shopRefreshTime) {
		this.shopRefreshTime = shopRefreshTime;
	}

	public int getAttckCityId() {
		return attckCityId;
	}

	public void setAttckCityId(int attckCityId) {
		this.attckCityId = attckCityId;
	}

}
