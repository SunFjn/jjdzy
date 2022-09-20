package com.teamtop.system.treasury;

public class TreasuryConst {
	public static final Integer[] SysIdArray = new Integer[] { 3801, 3802, 3803, 3804, 9901 }; // 隆中宝库,无双宝库,枭雄宝库,三国宝库,分享宝库(微信)
	public static final double TREASURY_DISCOUNT = 0.9; // 打折

	/**
	 * 兑换返回状态
	 */
	public static final int SUCCESS = 1; // 成功
	public static final int FAILURE_NOT_TREASURYNUM = 2; // 宝库道具不足
	public static final int FAILURE_NOT_GOODSNUM = 3; // 商品已售罄
	public static final int FAILURE_NOT_VIPLV = 4; // vip等级不足
	public static final int FAILURE_NOT_GOODS = 5; // 商品不存在

}
