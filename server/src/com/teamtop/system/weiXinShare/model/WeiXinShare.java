package com.teamtop.system.weiXinShare.model;

import java.util.List;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class WeiXinShare {
	/** 玩家id */
	@FieldOrder(order = 1)
	private long hid;
	/** 总累计分享次数 */
	@FieldOrder(order = 2)
	private int totalShareTimes;
	/** 第一次分享奖励状态:0-未完成,1-可领取,2-已领取 */
	@FieldOrder(order = 3)
	private int firstShareState;
	/** 上一次分享时间戳:每5分钟可分享一次 */
	@FieldOrder(order = 4)
	private long lastShareTime;
	/** 今天分享次数 */
	@FieldOrder(order = 5)
	private int todayShareTimes;
	/** 今天抽奖次数 */
	@FieldOrder(order = 6)
	private int todayDrawTimes;
	/** 抽奖已获得奖励配置id列表 */
	@FieldOrder(order = 7)
	private List<Integer> drawAwardList;
	/** 累计分享已获得奖励配置id列表 */
	@FieldOrder(order = 8)
	private List<Integer> cumulativeAwardList;
	/** 邀请好友列表 */
	@FieldOrder(order = 9)
	private Map<Long,WeiXinFriend> friendMap;
	/** 当前好友数量奖励配置id */
	@FieldOrder(order = 10)
	private int numberCfgId;
	/** 当前好友数量奖励状态:0-未完成,1-可领取,2-已全部领取 */
	@FieldOrder(order = 11)
	private int numberState;
	/** 今天已领取红包分享币数量 */
	@FieldOrder(order = 12)
	private int todayShareCoin;
	/** 返利红包列表 */
	@FieldOrder(order = 13)
	private List<WeiXinHongBao> hongBaoList;
	/** 推荐人区服id */
	@FieldOrder(order = 14)
	private int zoneId;
	/** 推荐人openId */
	@FieldOrder(order = 15)
	private String openId;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getTotalShareTimes() {
		return totalShareTimes;
	}

	public void setTotalShareTimes(int totalShareCount) {
		this.totalShareTimes = totalShareCount;
	}

	public int getFirstShareState() {
		return firstShareState;
	}

	public void setFirstShareState(int firstShareState) {
		this.firstShareState = firstShareState;
	}

	public long getLastShareTime() {
		return lastShareTime;
	}

	public void setLastShareTime(long lastShareTime) {
		this.lastShareTime = lastShareTime;
	}

	public int getTodayShareTimes() {
		return todayShareTimes;
	}

	public void setTodayShareTimes(int todayShareTime) {
		this.todayShareTimes = todayShareTime;
	}

	public int getTodayDrawTimes() {
		return todayDrawTimes;
	}

	public void setTodayDrawTimes(int todayDrawTime) {
		this.todayDrawTimes = todayDrawTime;
	}

	public List<Integer> getDrawAwardList() {
		return drawAwardList;
	}

	public void setDrawAwardList(List<Integer> drawAwardList) {
		this.drawAwardList = drawAwardList;
	}

	public List<Integer> getCumulativeAwardList() {
		return cumulativeAwardList;
	}

	public void setCumulativeAwardList(List<Integer> cumulativeAwardList) {
		this.cumulativeAwardList = cumulativeAwardList;
	}

	public Map<Long,WeiXinFriend> getFriendMap() {
		return friendMap;
	}

	public void setFriendMap(Map<Long,WeiXinFriend> friendMap) {
		this.friendMap = friendMap;
	}

	public int getNumberCfgId() {
		return numberCfgId;
	}

	public void setNumberCfgId(int numberCfgId) {
		this.numberCfgId = numberCfgId;
	}

	public int getNumberState() {
		return numberState;
	}

	public void setNumberState(int numberState) {
		this.numberState = numberState;
	}

	public int getTodayShareCoin() {
		return todayShareCoin;
	}

	public void setTodayShareCoin(int todayShareCoin) {
		this.todayShareCoin = todayShareCoin;
	}

	public List<WeiXinHongBao> getHongBaoList() {
		return hongBaoList;
	}

	public void setHongBaoList(List<WeiXinHongBao> hongBaoList) {
		this.hongBaoList = hongBaoList;
	}

	public int getZoneId() {
		return zoneId;
	}

	public void setZoneId(int zoneId) {
		this.zoneId = zoneId;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}
}
