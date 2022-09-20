package com.teamtop.system.alarmSystem;

public class AlarmConst {

	public static final String LUO_YI = "LUO_YI";// 罗毅

	public static final String GAO_MING = "GAO_MING";// 高明

	public static final String HU_ZHI_PENG = "HU_ZHI_PENG";// 胡志鹏

	public static final String YY = "YY";// 运营

	public static final String NIE_YING_XIA = "NIE_YING_XIA";// 聂迎霞

	public static final String LI_BI_JUN = "LI_BI_JUN";// 黎碧君

	public static final String YUN_WEI = "YUN_WEI";// 运维

	public static final String KE_FU = "KE_FU";// 客服
	
//	public static final boolean ALARM_SWICH = false;

	/**/
	/** 元宝预警值 */
	public static int YUAN_BAO_MAX = 450 * 10000;// 450万
	/** 每日元宝预警值 */
	public static int YUAN_BAO_DAILY_MAX = 400 * 10000;// 400万
	/** 单日单次元宝预警值 */
	public static int YUAN_BAO_DAILY_ONCE = 140 * 10000;// 140万

	/** 铜钱预警值 */
	public static long COIN_MAX = 50 * 100000000;// 50亿
	/** 每日铜钱预警值 */
	public static long COIN_DAILY_MAX = 30L * 100000000L;// 30亿
	/** 单日单次获得铜币预警值 */
	public static long COIN_DAILY_ONCE = 3L * 100000000;// 3亿
	
	public static int ALARM_TIME = 3600;//1小时

}
