package com.teamtop.system.boss.monsterGod;
/**
 * 魔神吕布
 * @author jjjjyyy
 *
 */
public class MonsterGodConst {
	/**
	 * 魔神吕布开启时间1：
	 */
	public static int BEGINTIME1=12*3600+1800;
	/**
	 * 魔神吕布开启时间2：
	 */
	public static int BEGINTIME2=18*3600+1800;
	/**
	 * 魔神吕布开启时间3：
	 */
	public static int BEGINTIME3=21*3600+1800;
	/**
	 * 魔神吕布结束时间1：
	 */
	public static int OVERTIME1=13*3600;
	/**
	 * 魔神吕布结束时间2：
	 */
	public static int OVERTIME2=19*3600;
	/**
	 * 魔神吕布结束时间3：
	 */
	public static int OVERTIME3=22*3600;
	/**
	 * 活动未开启
	 */
	public static int STATE0=0;
	/**
	 * 活动开启 魔神第一阶段1 魔神第二阶段2 魔神第三阶段3 boss已被击杀4
	 */
	public static int STATE1=1;
	/**
	 * 活动开启 魔神第一阶段1 魔神第二阶段2 魔神第三阶段3 boss已被击杀4
	 */
	public static int STATE2=2;
	/**
	 * 活动开启 魔神第一阶段1 魔神第二阶段2 魔神第三阶段3 boss已被击杀4
	 */
	public static int STATE3=3;
	/**
	 * 活动开启 魔神第一阶段1 魔神第二阶段2 魔神第三阶段3 boss已被击杀4
	 */
	public static int STATE4=4;
	

	
	public static int BOSS1=241001;
	
	public static int BOSS2=241002;
	
	public static int BOSS3=241003;
	/**
	 * 击杀boss时间 10分钟下一次boss血量翻倍
	 */
	public static int DOUBLEHP=10*60;
	/**
	 * 惩罚时间
	 */
	public static int CHENGFATIME=30;
	/**
	 *boss死亡复活时间 
	 */
	public static int BOSS_RESTLIVE_CD=3;
	/**
	 * 系统id
	 */
	public static int SYSID=1805;
	/**
	 * 血量翻倍上线
	 */
	public static int ADD_MAX=1092;
	/**
	 * boss没被杀死 血量减少
	 */
	public static int MUINE_MAX=1085;
	/**
	 * 魔神吕布在5分钟后血量还有88%或以上获得伤害加成
	 */
	public static int addAttBuffTime1=5*60;
	
	public static int addAttBuff1=1094;
	/**
	 * 魔神吕布在10分钟后血量还有65%或以上获得伤害加成
	 */
	public static int addAttBuffTime2=10*60;
	
	public static int addAttBuff2=1095;
	/**
	 * 魔神吕布在15分钟后血量还有35%或以上获得伤害加成
	 */
	public static int addAttBuffTime3=15*60;
	
	public static int addAttBuff3=1096;
}
