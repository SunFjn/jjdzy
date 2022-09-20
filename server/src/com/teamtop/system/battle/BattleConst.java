package com.teamtop.system.battle;
/**
 * 战斗
 * @author Administrator
 *
 */

import java.util.HashMap;

public class BattleConst {
	/** 战斗类型：玩家*/
	public static int ENTITY_TYPE_HERO = 1;
	/** 战斗类型：怪物*/
	public static int ENTITY_TYPE_MONSTER = 2;
	/** 技能类型：物理*/
	public static int SKILL_TYPE_WULI = 0;
	/** 技能类型：法术*/
	public static int SKILL_TYPE_FASHU = 1;
	
	/**	 * 战斗结果:攻击者输	 */
	public static final int RESULT_ATT_LOSE = 2;
	/**	 * 战斗结果:攻击者赢	 */
	public static final int RESULT_ATT_WIN = 1;
	/**	 * 战斗结果:没定输赢	 */
	public static final int RESULT_ATT_NO = 0;
	
	/**	 * 进入战场，跑过去无敌时间	秒 */
	public static final int ATT_WUDI_BEGIN_CONST = 2;
	/**	 * 无敌时间  秒	 */
	public static final int ATT_WUDI_CONST = 3;
	/**	 * 强制结束战斗的时间  秒	 */
	public static final int ATT_END_TIME = 60;
	
	//秒伤相关
	/**	 * 怒气上限常数	 */
	public static final int ATT_ANGERUP_CONST = 3;
	/**	 * 受伤怒气	 */
	public static final int HIT_ANGERBY_CONST = 4;
	/**	 * 攻击怒气	 */
	public static final int ATT_ATTANGE_CONST = 5;
	/**	 * 暴击/抗暴常数	 */
	public static final int CRIT_RESCRIT_CONST = 6;
	/**	 * 命中/闪避常数	 */
	public static final int HIT_EVADE_CONST = 7;
	/**	 * 技能秒伤常数	 */
	public static final int ATT_SECOND_HUNT_CONST = 8;
	/**	 * 攻速常数	 */
	public static final int ATT_SPEED_CONST = 9;
	/**	 * 战力压制比例	 */
	public static final int ATT_SRENGHT_CONST = 10;
	/**	 * 战力压制值	 */
	public static final int ATT_SRENGHTNUM_CONST = 11;
	/**	 * 生命战力	 */
	public static final int ATT_HP_CONST = 12;
	/**	 * 防御战力	 */
	public static final int ATT_DEF_CONST = 13;
	/**	 * 攻击战力	 */
	public static final int ATT_ATT_CONST = 14;
	/**	 * 暴击战力	 */
	public static final int ATT_CRITICAL_CONST = 15;
	/**	 * 抗暴战力	 */
	public static final int ATT_RESISTCRIT_CONST = 16;
	/**	 * 命中战力	 */
	public static final int ATT_HITSHEN_CONST = 17;
	/**	 * 闪避战力	 */
	public static final int ATT_EVADE_CONST = 18;
	/**	 * 真实伤害战力	 */
	public static final int ATT_DAMAGE_CONST = 19;
	/**	 * 暴击率战力	 */
	public static final int ATT_criticalRate_CONST = 20;
	/**	 * 抗暴率战力	 */
	public static final int ATT_resistCritRate_CONST = 21;
	/**	 * 命中率战力	 */
	public static final int ATT_hitRate_CONST = 22;
	/**	 * 闪避率战力	 */
	public static final int ATT_evadeRate_CONST = 23;
	/**	 * 爆伤加成战力	 */
	public static final int ATT_DamageAdd_CONST = 24;
	/**	 * 爆伤减免战力	 */
	public static final int ATT_DamageDerate_CONST = 25;
	/**	 * 伤害加成战力	 */
	public static final int ATT_damageAdd_CONST = 26;
	/**	 * 伤害减免战力	 */
	public static final int ATT_damageDerate_CONST = 27;
	/**	 * 火焰伤害战力	 */
	public static final int ATT_fireDamage_CONST = 28;
	/**	 * 冰冻伤害战力	 */
	public static final int ATT_frozenDamage_CONST = 29;
	/**	 * 毒液伤害战力	 */
	public static final int ATT_poisonDamage_CONST = 30;
	/**	 * 电击伤害战力	 */
	public static final int ATT_electricDamage_CONST = 31;
	/**
	 * 爆炸伤害战力
	 */
	public static final int ATT_boomDamage_CONST = 32;
	/**
	 * 火焰抗性战力
	 */
	public static final int ATT_fireRes_CONST = 33;
	/**
	 * 冰冻抗性战力
	 */
	public static final int ATT_frozenRes_CONST = 34;
	/**
	 * 剧毒抗性战力
	 */
	public static final int ATT_poisonRes_CONST = 35;
	/**
	 * 电击抗性战力
	 */
	public static final int ATT_electricRes_CONST = 36;
	/**
	 * 爆炸抗性战力
	 */
	public static final int ATT_boomRes_CONST = 37;
	/**
	 * 怒气技能cd
	 */
	//public static final int ANGER_CD=38;
	/**
	 * 天书技能cd
	 */
	public static final int GODBOOK_CD=1072;
	/**
	 * 宝物技能cd
	 */
	public static final int TREASURE_CD=1071;
	
	//以下作为战斗验证的系统类型
	/** 关卡*/
	public static int GUANQIA = 1;
	/** 其他*/
	public static int OTHER = 2;
	/** 宝物现世*/
	public static int BAO_WU_XIAN_SHI = 3;

	/* 常数表 */
	/** 战力压制常数 */
	public static final int Strength_Suppress_Const = 10;
	/** */
	public static final int Strength_Suppress_Value = 11;
	
	/** 战力压制比例（跨服试炼）*/
	public static final int CROSS_TRIAL_SSC  = 101;
	/** 战力压制值（跨服试炼）*/
	public static final int CROSS_TRIAL_SSV = 111;
	
	public static final HashMap<Integer, Integer[]> skillHurt=new HashMap<>();
	
	static {
		//武将品质-武将秒伤基础值
		skillHurt.put(3, new Integer[]{43,44});
		skillHurt.put(4, new Integer[]{45,46});
		skillHurt.put(5, new Integer[]{47,48});
		skillHurt.put(6, new Integer[]{49,50});
		skillHurt.put(7, new Integer[]{51,52});
		skillHurt.put(8, new Integer[]{53,54});
	}
}
