package com.teamtop.system.crossSJMiJing;

public class CrossSJMiJingConst {

	/**	 * 每日可扫荡次数	 */
	public static final int SAO_DANG_NUM=1;
	
	/**	 * 宝箱  0未购买，1已购买 */
	public static final int STATE_NOT_GET=0;
	/**	 * 宝箱  0未购买，1已购买 */
	public static final int STATE_GET=1;
	
	/**	 * 0未死亡，1死亡 */
	public static final int DEATH_NO=0;
	/**	 * 0未死亡，1死亡 */
	public static final int DEATH_YES=1;
	
	/**	 * 协助总次数 */
	public static final int NUM_HELP_AWARDS_MAX=3;
	
	
	
	
	/**	 * 额外奖励时间  1开始时间  2结束时间	 */
	public static final int[][] TIME_DOULE_AWARDS= new int[][]{{10,12},{23,24},{0,1}};
//	/**	 * 翻倍奖励 倍数 100%	 */
//	public static final int PRO_DOULE=100;
//	/**	 * 组队额外奖励 倍数 	30% */
//	public static final int PRO_TEAM=30;
	
}
