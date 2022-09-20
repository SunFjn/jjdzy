package com.teamtop.redeploy;

public class RedeployConst {
	/**	 * 微信pf	 */
	public static final int PF_QI_E_WEI_XIN = 1;
	/**	 * 微端pf */
	public static final int PF_APK = 2;
	/**	 * 测试用	 */
	public static final int PF_TEST= 3;
	/**	 * 测试部-企鹅微信	 */
	public static final int PF_TEST_QI_E_WEI_XIN= 4;
	/**	 * 测试部-微端	 */
	public static final int PF_TEST_APK= 5;
	/**	 * 微端3pf */
	public static final int PF_APK3 = 6;
	/**	 * 微端4pf */
	public static final int PF_APK4 = 7;
	/**	 * 微端2pf */
	public static final int PF_APK2 = 8;
	/**	 * 微端6pf */
	public static final int PF_APK6 = 9;
	/**	 * 万紫 pf */
	public static final int PF_WANZI = 10;	
	/**	 * 贪玩新新 pf */
	public static final int PF_TANWAN = 11;	
	/**	 * 新新ios pf*/
	public static final int PF_NEWNEW = 12;	
	/**	 * 360内测pf	 */
	public static final int PF_360= 15;
	
	public static String getPfName(int pf){
		switch (pf) {
		case PF_QI_E_WEI_XIN:
			return "138测试服";
		case PF_APK:
			return "正式服饿狼1";
		case PF_TEST:
			return "本地";
		case PF_APK2:
			return "微端2";
		case PF_APK3:
			return "微端3";
		case PF_APK4:
			return "微端4";
		case PF_APK6:
			return "微端6测试";
		case PF_WANZI:
			return "万紫正式";	
		case PF_TANWAN:
			return "贪玩新新";
		case PF_NEWNEW:
			return "新新IOS";	
		case PF_TEST_QI_E_WEI_XIN:
			return "测试部-腾讯微信";
		case PF_TEST_APK:
			return "测试部-微端";
		}
		return "类型"+pf+"还没配";
	}
}
