package com.teamtop.system.liuChuQiShan;

import excel.config.Config_xtcs_004;

public class LiuChuQiShanConst {

	/** * 系统id */
	public static final int sysId = 6203;
	/** * 每日可扫荡次数 */
	public static final int SAO_DANG_NUM=1;
	/** * 0未死亡，1死亡 */
	public static final int DEATH_NO=0;
	/** * 0未死亡，1死亡 */
	public static final int DEATH_YES=1;
	/** * 求助总次数 */
	public static final int NEED_HELP_NUM = Config_xtcs_004.getIns().get(6901).getNum();
	/** * 协助总次数 */
	public static final int NUM_HELP_AWARDS_MAX = Config_xtcs_004.getIns().get(6902).getNum();
	
	
	

	
}
