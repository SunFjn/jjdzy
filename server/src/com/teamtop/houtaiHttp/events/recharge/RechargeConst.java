package com.teamtop.houtaiHttp.events.recharge;

import java.util.HashMap;
import java.util.Map;

/**
 * 充值常量
 * @author yxh
 *
 */
public class RechargeConst {

	/**
	 * 参数 key 用于校验
	 */
	public static final String KEY="key";
	/**
	 * 参数 cmd 用于指派逻辑
	 */
	public static final String CMD="cmd";
	/**
	 * 参数 randnum 用于校验
	 */
	public static final String RANDNUM="randnum";
	/**
	 * 花费的RMB请参数
	 */
	public static final String MONEY="money";
	/**
	 * 充值角色参数
	 */
	public static final String RE_RID="rechargerid";
	public static Map<Integer, String> edu = new HashMap<Integer, String>();
	public static Map<Integer, Integer> dang = new HashMap<Integer, Integer>();
	static{
		// edu.put(RechargeConst.YB, "元宝");
		// edu.put(RechargeConst.TEQUANKA, "特权卡");
		// edu.put(RechargeConst.YUEKA, "月卡");
		// edu.put(RechargeConst.ZHIZUNKA, "至尊卡");
		// edu.put(3001, "聚宝盆 元宝");
		// edu.put(3002, "聚宝盆 宝石");
		// edu.put(3003, "聚宝盆 神兵");
		// edu.put(3004, "聚宝盆 将魂");
		// edu.put(3005, "聚宝盆 天书");
		//
		// dang.put(2000, 28);
		// dang.put(3000, 88);
		// dang.put(4000, 6);
		// dang.put(5000, 58);
		// dang.put(6000, 198);
	}
	
	/** 元宝 */
	public static final int YB = 1;
	/** 特权卡 */
	public static final int TEQUANKA = 2;
	/** 首充 */
	public static final int FIRST_RECHARGE = 3;
	/** 每日直购 */
	public static final int DAILYDIRECTBUY = 4;
	/**	基金	 */
	public static final int JI_JIN = 5;
	/** 尊享周卡 */
	public static final int WEEK_CARD = 6;
	/** 金猪银猪 */
	public static final int SHAO_ZHU_GOLD_PIG = 7;
	
	public static final int YUEKA = 2000;
	public static final int ZHIZUNKA = 3000;

	/** 充值rmb元宝换算比例 1元 = 10YB */
	public static final int BaseYb = 10;
	
	/** 聚宝盆等级礼包 */
	public static final int COLLECT_TREASURY = 11;
	/** 超值礼包 周礼包*/
	public static final int EXTRA_VALUE_GIFT = 12;
	/** 超值礼包 月礼包*/
	public static final int EXTRA_VALUE_GIFT_MONTH = 13;
	

	/* 系统常数 */
	/** 5倍返利充值次数 */
	public static final int FIVETIMES_NUM = 2001;
	/**
	 * 支付状态 0 未处理，1 成功，2 失败
	 */
	public static final int RECHARGE_STATE0=0;
	/**
	 * 支付状态 0 未处理，1 成功，2 失败
	 */
	public static final int RECHARGE_STATE1=1;
	/**
	 * 支付状态 0 未处理，1 成功，2 失败
	 */
	public static final int RECHARGE_STATE2=2;
	
	/**正常充值倍数*/
	public static final int NORMAL_RECHARGE=3701;
	
	/**首次充值倍数*/
	public static final int DOUBLE_RECHARGE=3702;
	
	public static final int rechargeItemId_998=109;
	
	public static final int rechargeItemId_1998=110;
	/**998永久倍数**/
	public static final int NORMAL_RECHARGE_998=3703;
	/**1998永久倍数**/
	public static final int NORMAL_RECHARGE_1998=3704;
	
}
