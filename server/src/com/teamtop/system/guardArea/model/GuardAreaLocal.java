package com.teamtop.system.guardArea.model;

import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class GuardAreaLocal {
	/*** 玩家id */
	@FieldOrder(order = 1)
	private long hid;
	/*** 掠夺次数 */
	@FieldOrder(order = 2)
	private int plunderTimes;
	/*** 免费刷新时间 */
	@FieldOrder(order = 3)
	private int freeRefreshTime;
	/*** 商城信息 */
	@FieldOrder(order = 4)
	private Map<Integer, Integer> shopMap;
	/*** 商店刷新时间 */
	@FieldOrder(order = 5)
	private int shopRefreshTime;
	/*** 荣耀货币 */
	@FieldOrder(order = 6)
	private long honorCoin;
	/*** 正在攻击的城池id */
	@FieldOrder(order = 7)
	private int attckCityId;

	public GuardAreaLocal() {

	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getPlunderTimes() {
		return plunderTimes;
	}

	public void setPlunderTimes(int plunderTimes) {
		this.plunderTimes = plunderTimes;
	}

	public int getFreeRefreshTime() {
		return freeRefreshTime;
	}

	public void setFreeRefreshTime(int freeRefreshTime) {
		this.freeRefreshTime = freeRefreshTime;
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

	public long getHonorCoin() {
		return honorCoin;
	}

	public void setHonorCoin(long honorCoin) {
		this.honorCoin = honorCoin;
	}

	public int getAttckCityId() {
		return attckCityId;
	}

	public void setAttckCityId(int attckCityId) {
		this.attckCityId = attckCityId;
	}

}
