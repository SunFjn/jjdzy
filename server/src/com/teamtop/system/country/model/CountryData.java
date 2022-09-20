package com.teamtop.system.country.model;

import com.teamtop.system.country.fightNorthAndSouth.model.FightNSModel;
import com.teamtop.system.country.kingship.model.KingShipData;

/**
 * 国家相关个人数据
 *
 */
public class CountryData {
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 铜币捐献
	 */
	private int coinDonationTimes;
	/**
	 * 元宝捐献
	 */
	private int ybDonationTimes;
	/**
	 * 捐献累计次数
	 */
	private int donationTimes;
	/**
	 * 王位之争
	 */
	private KingShipData kingShipData;
	
	/**
	 * 南征北战个人数据
	 */
	private FightNSModel fightNSModel;

	public int getDonationTimes() {
		return donationTimes;
	}

	public void setDonationTimes(int donationTimes) {
		this.donationTimes = donationTimes;
	}
	public CountryData() {
		super();
	}
	public CountryData(Long hid) {
		this.hid = hid;
	}
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getCoinDonationTimes() {
		return coinDonationTimes;
	}
	public void setCoinDonationTimes(int coinDonationTimes) {
		this.coinDonationTimes = coinDonationTimes;
	}
	public int getYbDonationTimes() {
		return ybDonationTimes;
	}
	public void setYbDonationTimes(int ybDonationTimes) {
		this.ybDonationTimes = ybDonationTimes;
	}
	public FightNSModel getFightNSModel() {
		return fightNSModel;
	}
	public void setFightNSModel(FightNSModel fightNSModel) {
		this.fightNSModel = fightNSModel;
	}
	public KingShipData getKingShipData() {
		return kingShipData;
	}
	public void setKingShipData(KingShipData kingShipData) {
		this.kingShipData = kingShipData;
	}

}
