var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Enum_Attr = (function () {
    function Enum_Attr() {
    }
    /** 生命*/ Enum_Attr.HP = 102;
    /** 防御*/ Enum_Attr.DEF = 104;
    /** 攻击*/ Enum_Attr.ATT = 103;
    /** 暴击*/ Enum_Attr.CRIT = 105;
    /** 抗暴*/ Enum_Attr.RESIST = 106;
    /** 命中*/ Enum_Attr.DEX = 107;
    /** 闪避*/ Enum_Attr.DODGE = 108;
    /** 真实伤害*/ Enum_Attr.DAME = 109;
    /** 暴击率*/ Enum_Attr.CRIT_RATE = 110;
    /** 抗暴率*/ Enum_Attr.RESIST_RATE = 111;
    /** 命中率*/ Enum_Attr.DEX_RATE = 112;
    /** 闪避率*/ Enum_Attr.DODGE_RATE = 113;
    /** 爆伤加成*/ Enum_Attr.CRIT_ADD = 114;
    /** 爆伤减免*/ Enum_Attr.CRIT_REDU = 115;
    /** 伤害加成*/ Enum_Attr.DAME_ADD = 116;
    /** 伤害减免*/ Enum_Attr.DAME_REDU = 117;
    /** 火焰伤害*/ Enum_Attr.FIRE = 118;
    /** 冰冻伤害*/ Enum_Attr.ICE = 119;
    /** 毒液伤害*/ Enum_Attr.POI = 120;
    /** 电击伤害*/ Enum_Attr.ELEC = 121;
    /** 爆炸伤害*/ Enum_Attr.BOMB = 122;
    /** 火焰抗性*/ Enum_Attr.FIRE_REDU = 123;
    /** 火焰抗性*/ Enum_Attr.ICE_REDU = 124;
    /** 火焰抗性*/ Enum_Attr.POI_REDU = 125;
    /** 火焰抗性*/ Enum_Attr.ELEC_REDU = 126;
    /** 火焰抗性*/ Enum_Attr.BOMB_REDU = 127;
    Enum_Attr.ITEM = 1;
    Enum_Attr.EQUIP = 2;
    Enum_Attr.TONGBI = 3;
    Enum_Attr.yuanBao = 4;
    Enum_Attr.LEVEL = 5;
    Enum_Attr.EXP = 6;
    /**功勋*/ Enum_Attr.GONGXUN = 7;
    /**星魂*/ Enum_Attr.XINGHUN = 9;
    /**魂火*/ Enum_Attr.HUNHUO = 10;
    /**声望*/ Enum_Attr.PRESTIGE = 11;
    /**符文*/ Enum_Attr.FUWEN = 14;
    /**BOSS积分*/ Enum_Attr.BOSSJF = 12;
    /** 生命战力系数*/ Enum_Attr.XS_HP = 12;
    /** 防御战力系数*/ Enum_Attr.XS_DEF = 13;
    /** 攻击战力系数*/ Enum_Attr.XS_ATT = 14;
    /** 暴击战力系数*/ Enum_Attr.XS_CRIT = 15;
    /** 抗暴战力系数*/ Enum_Attr.XS_RESIST = 16;
    /** 命中战力系数*/ Enum_Attr.XS_DEX = 17;
    /** 闪避战力系数*/ Enum_Attr.XS_DODGE = 18;
    /** 真实伤害战力系数*/ Enum_Attr.XS_DAME = 19;
    /** 暴击率战力系数*/ Enum_Attr.XS_CRIT_RATE = 20;
    /** 抗暴率战力系数*/ Enum_Attr.XS_RESIST_RATE = 21;
    /** 命中率战力系数*/ Enum_Attr.XS_DEX_RATE = 22;
    /** 闪避率战力系数*/ Enum_Attr.XS_DODGE_RATE = 23;
    /** 爆伤加成战力系数*/ Enum_Attr.XS_CRIT_ADD = 24;
    /** 爆伤减免战力系数*/ Enum_Attr.XS_CRIT_REDU = 25;
    /** 伤害加成战力系数*/ Enum_Attr.XS_DAME_ADD = 26;
    /** 伤害减免战力系数*/ Enum_Attr.XS_DAME_REDU = 27;
    /** 火焰伤害战力系数*/ Enum_Attr.XS_FIRE = 28;
    /** 冰冻伤害战力系数*/ Enum_Attr.XS_ICE = 29;
    /** 毒液伤害战力系数*/ Enum_Attr.XS_POI = 30;
    /** 电击伤害战力系数*/ Enum_Attr.XS_ELEC = 31;
    /** 爆炸伤害战力系数*/ Enum_Attr.XS_BOMB = 32;
    /** 火焰抗性战力系数*/ Enum_Attr.XS_FIRE_REDU = 33;
    /** 火焰抗性战力系数*/ Enum_Attr.XS_ICE_REDU = 34;
    /** 火焰抗性战力系数*/ Enum_Attr.XS_POI_REDU = 35;
    /** 火焰抗性战力系数*/ Enum_Attr.XS_ELEC_REDU = 36;
    /** 火焰抗性战力系数*/ Enum_Attr.XS_BOMB_REDU = 37;
    /**角色战斗属性值，对应vo_role*/
    Enum_Attr.roleAttributes = {
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
    Enum_Attr.roleAttribute = {
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
    Enum_Attr.roleAttPer = {
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
    return Enum_Attr;
}());
__reflect(Enum_Attr.prototype, "Enum_Attr");
