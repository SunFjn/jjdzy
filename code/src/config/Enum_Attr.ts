class Enum_Attr {
	public constructor() {
	}

	/** 生命*/public static HP = 102;
	/** 防御*/public static DEF = 104;
	/** 攻击*/public static ATT = 103;
	/** 暴击*/public static CRIT = 105;
	/** 抗暴*/public static RESIST = 106;
	/** 命中*/public static DEX = 107;
	/** 闪避*/public static DODGE = 108;
	/** 真实伤害*/public static DAME = 109;
	/** 暴击率*/public static CRIT_RATE = 110;
	/** 抗暴率*/public static RESIST_RATE = 111;
	/** 命中率*/public static DEX_RATE = 112;
	/** 闪避率*/public static DODGE_RATE = 113;
	/** 爆伤加成*/public static CRIT_ADD = 114;
	/** 爆伤减免*/public static CRIT_REDU = 115;
	/** 伤害加成*/public static DAME_ADD = 116;
	/** 伤害减免*/public static DAME_REDU = 117;
	/** 火焰伤害*/public static FIRE = 118;
	/** 冰冻伤害*/public static ICE = 119;
	/** 毒液伤害*/public static POI = 120;
	/** 电击伤害*/public static ELEC = 121;
	/** 爆炸伤害*/public static BOMB = 122;
	/** 火焰抗性*/public static FIRE_REDU = 123;
	/** 火焰抗性*/public static ICE_REDU = 124;
	/** 火焰抗性*/public static POI_REDU = 125;
	/** 火焰抗性*/public static ELEC_REDU = 126;
	/** 火焰抗性*/public static BOMB_REDU = 127;
	public static ITEM = 1;
	public static EQUIP = 2;
	public static TONGBI = 3;
	public static yuanBao = 4;
	public static LEVEL = 5;
	public static EXP = 6;
	/**功勋*/public static GONGXUN = 7;
	/**星魂*/public static XINGHUN = 9;
	/**魂火*/public static HUNHUO = 10;
	/**声望*/public static PRESTIGE = 11;
	/**符文*/public static FUWEN = 14;
	/**BOSS积分*/public static BOSSJF = 12;


	/** 生命战力系数*/public static XS_HP = 12;
	/** 防御战力系数*/public static XS_DEF = 13;
	/** 攻击战力系数*/public static XS_ATT = 14;
	/** 暴击战力系数*/public static XS_CRIT = 15;
	/** 抗暴战力系数*/public static XS_RESIST = 16;
	/** 命中战力系数*/public static XS_DEX = 17;
	/** 闪避战力系数*/public static XS_DODGE = 18;
	/** 真实伤害战力系数*/public static XS_DAME = 19;
	/** 暴击率战力系数*/public static XS_CRIT_RATE = 20;
	/** 抗暴率战力系数*/public static XS_RESIST_RATE = 21;
	/** 命中率战力系数*/public static XS_DEX_RATE = 22;
	/** 闪避率战力系数*/public static XS_DODGE_RATE = 23;
	/** 爆伤加成战力系数*/public static XS_CRIT_ADD = 24;
	/** 爆伤减免战力系数*/public static XS_CRIT_REDU = 25;
	/** 伤害加成战力系数*/public static XS_DAME_ADD = 26;
	/** 伤害减免战力系数*/public static XS_DAME_REDU = 27;
	/** 火焰伤害战力系数*/public static XS_FIRE = 28;
	/** 冰冻伤害战力系数*/public static XS_ICE = 29;
	/** 毒液伤害战力系数*/public static XS_POI = 30;
	/** 电击伤害战力系数*/public static XS_ELEC = 31;
	/** 爆炸伤害战力系数*/public static XS_BOMB = 32;
	/** 火焰抗性战力系数*/public static XS_FIRE_REDU = 33;
	/** 火焰抗性战力系数*/public static XS_ICE_REDU = 34;
	/** 火焰抗性战力系数*/public static XS_POI_REDU = 35;
	/** 火焰抗性战力系数*/public static XS_ELEC_REDU = 36;
	/** 火焰抗性战力系数*/public static XS_BOMB_REDU = 37;

	/**角色战斗属性值，对应vo_role*/
	public static roleAttributes: any = {
		"102": "hp",
		"103": "att",
		"104": "def",
		"105": "crit",
		"106": "resCrit",
		"107": "hit",
		"108": "dodge",
		"109": "realDmg",
		"110": "critRate",
		"111": "resCritRate",
		"112": "hitRate",
		"113": "dodgeRate",
		"114": "critDmgAdd",
		"115": "critDmgReduce",
		"116": "dmgAdd",
		"117": "dmgReduce",
		"118": "flameDmg",
		"119": "frozenDmg",
		"120": "venomDmg",
		"121": "electricDmg",
		"122": "blastDmg",
		"123": "flameRes",
		"124": "frozenRes",
		"125": "venomRes",
		"126": "electricRes",
		"127": "blastRes",
		"128": "star",
		"301": "pvpAddHurt",
		"302": "pvpMinuteHurt",
		"303": "pveAddHurt",
		"304": "wxAddHurt",
		"305": "wxMinuteHurt",
		"306": "hpShield",
		"307": "hpBlast",
		"308": "pveMinuteHurt",
		"309": "rageReply",
		"310": "bwAndTSCD",
		"311": "bwCurePre",
		"312": "dizzCD",
		"313": "enemySkillD",
		"314": "enemyCureD",
		"315": "szSkillDmgPer",
		"316": "skillDmgPer",
		"320": "lianjiDmg",
		"322": "beCrit"
	};
	public static roleAttribute: any = {
		"critRate": "110",
		"resCritRate": "111",
		"hitRate": "112",
		"dodgeRate": "113",
		"critDmgAdd": "114",
		"critDmgReduce": "115",
		"dmgAdd": "116",
		"dmgReduce": "117",
		"pvpAddHurt": "301",
		"pvpMinuteHurt": "302",
		"pveAddHurt": "303",
		"wxAddHurt": "304",
		"wxMinuteHurt": "305",
		"hpShield": "306",
		"hpBlast": "307",
		"pveMinuteHurt": "308",
		"bwCurePre": "311",
		"enemySkillD": "313",
		"enemyCureD": "314",
		"szSkillDmgPer": "315",
		"skillDmgPer": "316",
		"lianjiDmg": "320"
	};

	/**202	生命百分比
203	攻击百分比
204	防御百分比
208	真实伤害百分比
218	火焰伤害百分比
219	冰冻伤害百分比
220	毒液伤害百分比
221	电击伤害百分比
222	爆炸伤害百分比
223	火焰抗性百分比
224	冰冻抗性百分比
225	剧毒抗性百分比
226	电击抗性百分比
227	爆炸抗性百分比
 */
	public static roleAttPer: any = {
		"202": "102",
		"203": "103",
		"204": "104",
		"208": "109",
		"218": "118",
		"219": "119",
		"220": "120",
		"221": "121",
		"222": "122",
		"223": "123",
		"224": "124",
		"225": "125",
		"226": "126",
		"227": "127",
	};
}