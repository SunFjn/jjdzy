var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Player = (function () {
    function Vo_Player() {
        /**将衔*/
        this.jiangXian = 0;
        /**称号*/
        this.title = 0;
        /** vip等级 */
        this.viplv = 0;
        /** 玩家名字 */
        this.name = "";
        /**  声望*/
        this.prestige = 0;
        /**功勋  */
        this.gongxun = 0;
        /**家园币  */
        this.homeMoney = 0;
        /**符文经验  */
        this.fuwen = 0;
        /**当前经验 */
        this.exp = 0;
        /**角色属性 */
        this.attributeData = {};
        /** 转生ID*/
        this.zsID = 0;
        /** 武器*/
        this.weapon = 0;
        /** 神兵*/
        this.godWeapon = 0;
        /**兽魂 */
        this._shouHun = 0;
        /**经验加成*/
        this.expAdd = 0;
        /**战场积分*/
        this.bossZCScore = 0;
        /**六道印记  */
        this.yinji = 0;
        /** 僵直抵抗强度 */
        this.pd = 0;
        /** 麻痹率 */
        this.dizz = 0;
        /** 麻痹时间 */
        this.dizzTime = 0;
        /** 抵抗麻痹率*/
        this.antiDizz = 0;
        this.skillList = [];
        /**玩家装备数据 voEquip */
        this.equipData = {};
        /**宝物天书技能cd 0天书技能CD 1宝物2技能CD 2宝物1技能CD*/
        this.skillcdList = [0, 0, 0];
        /**是否自动释放技能 */
        this.autoSkill = false;
        this.rage = 0;
        // 少主id
        this.shaozhuID = 0;
        // 少主星级
        this.shaozhuStar = 1;
        // 少主时装
        this.shaozhuFashion = 1;
        // 少主技能等级
        this.shaozhuSkillLv = 1;
        // 轮回id
        this.reincarnationLevel = 0;
        /**每次攻击回复怒气 */
        this.rageReply = 0;
        /**减少宝物天书CD */
        this.bwAndTSCD = 0;
        /**宝物治疗效果加成 */
        this.bwCurePre = 0;
        /**减少被控时长 */
        this.dizzCD = 0;
        /**1.增加自己的技能伤害百分比（不包括普攻） */
        this.skillDmgPer = 0;
        /**增加少主技能伤害百分比 */
        this.szSkillDmgPer = 0;
        /**降低敌方治疗效果 */
        this.enemyCureD = 0;
        /**降低敌方对自己造成的技能伤害 */
        this.enemySkillD = 0;
        /**额外连击伤害 */
        this.lianjiDmg = 0;
        // 历史最高等级
        this.maxLv = 0;
        // 角色buffCD
        this.buffCDData = {};
        // 奇策曝气值
        this.qcRage = 0;
        // 奇策时间
        this.qcTime = 0;
        // 桃园结义id
        this.tyjyId = 0;
        //坐骑id
        this.horseId = 0;
        //移动总速度
        this.speed = 0;
    }
    Vo_Player.prototype.parseDetail = function (bytes) {
        var self = this;
        ModelGuanQia.autoWave = Config.xtcs_004[4422].num;
        self.id = bytes.readLong();
        self.name = bytes.readUTF();
        self.level = bytes.readShort();
        self.exp = bytes.readLong();
        self.job = bytes.readInt();
        self.country = bytes.readByte();
        // self.setBody(self.job);
        // self.weapon = self.job;
        self.yuanbao = bytes.readLong();
        self.tongbi = bytes.readLong();
        self.xinghun = bytes.readLong(); //星魂
        self.hunhuo = bytes.readLong(); //魂火
        self.viplv = bytes.readInt(); //vip等级
        self.gongxun = bytes.readInt(); //功勋
        self.prestige = bytes.readLong(); //声望
        self.str = bytes.readLong();
        self.zsID = bytes.readShort();
        GGlobal.modelGuanQia.curGuanQiaLv = bytes.readInt(); //当前关卡
        self.setTitle(bytes.readInt()); //I:称号id
        self.setShenJian(bytes.readInt()); //I:神剑id
        self.expAdd = bytes.readInt(); //经验加成
        self.jinsheng = bytes.readInt(); //I:晋升等级
        self.setGodWeapon(bytes.readInt()); //I神兵
        self.setShiZhuang(self.job);
        self.fuwen = bytes.readLong(); //符文经验
        self.bossZCScore = bytes.readLong(); //战场boss积分
        self.shouHun = bytes.bytesAvailable ? bytes.readInt() : 0; //兽魂
        var herocfg = Config.hero_211[self.job];
        self.heroName = herocfg.name;
        self.setAutoSkill(Model_player.autoSkill);
        self.shaozhuID = bytes.readByte(); //少主id
        self.shaozhuFashion = bytes.readInt(); //少主时装
        self.shaozhuStar = bytes.readInt(); //少主星级
        self.shaozhuSkillLv = bytes.readInt(); //少主主动技能等级
        self.reincarnationLevel = bytes.readInt(); //轮回id
        self.maxLv = bytes.readInt(); //历史最高等级
        self.tyjyId = bytes.readLong(); //桃园结义id
        self.horseId = bytes.readInt(); //坐骑id
        self.speed = bytes.readInt(); //总速度
    };
    Vo_Player.prototype.parseRole = function (bytes) {
        var a = this;
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            a.parse(bytes);
        }
        a.str = bytes.readLong();
        GGlobal.control.notify(Enum_MsgType.SKILL_UPDATE);
    };
    /**玩家战斗属性 [L:唯一id，第一个跟hid一样B:类型：战士法师道士[I:属性keyI:属性值]属性数据[S:技能等级]技能数据[I:阵眼id]阵眼数据]属性数组，按照UI面板顺序发送L:总战力 */
    Vo_Player.prototype.parse = function (bytes) {
        var a = this;
        a.id = bytes.readLong();
        a.job = bytes.readInt();
        a.setShiZhuang(a.job);
        a.readBattleProperty(bytes);
        //--attrs
        a.skillList.length = 0;
        a.parseSkill(bytes);
        var len = bytes.readShort();
        for (var i = 0; i < a.skillList.length; i++) {
            var vo = a.skillList[i];
            if (vo.cfg.type == Model_Skill.TYPE3) {
                for (var j = 0; j < len; j++) {
                    var zhenYanID = bytes.readInt();
                    vo.zhenYanArr[Math.floor(zhenYanID / 1000) - 1] = zhenYanID;
                }
                break;
            }
        }
        var herocfg = Config.hero_211[a.job];
        a.heroName = herocfg.name;
        // a.body = a.job;
        a.setBody(a.job);
    };
    /**
     * 读取战斗属性
     * I:生命I:攻击I:防御I:暴击I:抗暴I:命中I:闪避I:伤害I:暴击率I:抗暴率
     * I:命中率I:闪避率I:暴伤加成I:暴伤减免I:伤害加成I:伤害减免I:火焰伤害I:冰冻伤害I:毒液伤害I:电击伤害I:爆炸伤害I:火焰抗性I:冰冻抗性I:毒液抗性I:电击抗性
     * I:爆炸**抗 性
    */
    Vo_Player.prototype.readBattleProperty = function (bytes) {
        var len = bytes.readShort();
        var key;
        var keyNum;
        var valNum;
        var obj = Enum_Attr.roleAttributes;
        for (var i = 0; i < len; i++) {
            keyNum = bytes.readInt();
            valNum = bytes.readLong();
            key = obj[keyNum + ""];
            this[key] = Vo_attr.getRealNum(keyNum, valNum);
        }
    };
    /**
     * GC 战斗玩家的属性数据 L:玩家idU:玩家名称I:将衔I:国家I:称号[L:唯一id，第一个跟hid一样B:人物武将类型[I:属性keyI:属性值]
     * 战斗属性[B:技能位置0-7I:技能idS:技能等级]技能数据I:时装资源ID]属性L:总战力
    */
    Vo_Player.prototype.parseOtherRole = function (bytes) {
        var a = this;
        bytes.readShort();
        bytes.readLong();
        a.job = bytes.readInt();
        a.setShiZhuang(a.job);
        a.setGodWeapon(bytes.readInt());
        a.readBattleProperty(bytes);
        a.skillList.length = 0;
        a.parseOtherSkill(bytes);
        var herocfg = Config.hero_211[a.job];
        a.chongId = herocfg.chong;
        a.heroName = herocfg.name;
        // a.body = a.job;
        a.setBody(a.job);
        var sz = bytes.readInt();
        a.str = bytes.readLong();
    };
    //[I:0（宝物1id）1（宝物1星级）2（宝物2）3（宝物2星级）4（天书id）5（天书星级）6（武将星级）]其他参数数组
    Vo_Player.prototype.parseOtherRole2 = function (bytes) {
        var a = this;
        bytes.readShort();
        bytes.readLong();
        a.job = bytes.readInt();
        a.setShiZhuang(a.job);
        a.readBattleProperty(bytes);
        a.skillList.length = 0;
        a.parseOtherSkill(bytes);
        var herocfg = Config.hero_211[a.job];
        a.chongId = herocfg.chong;
        a.heroName = herocfg.name;
        a.str = bytes.readLong();
    };
    Vo_Player.prototype.parseOtherSkill = function (bytes) {
        var a = this;
        var fscfg = Config.sz_739[a.job];
        var realJob = 0;
        var jobid;
        if (fscfg) {
            realJob = fscfg.moxing;
            jobid = (a.job / 1000) >> 0;
        }
        else {
            jobid = realJob = a.job;
        }
        var cfg = Config.hero_211[jobid];
        a.chongId = cfg.chong;
        var attackSkillArr = JSON.parse(cfg.attack);
        var cfgids = attackSkillArr.concat(JSON.parse(cfg.skills));
        for (var i = 0; i < cfgids.length; i++) {
            var id = cfgids[i][0];
            var vo = Vo_Skill.create(id, 0, 0);
            a.skillList[i] = vo;
        }
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var index = bytes.readByte();
            var id = bytes.readInt();
            var level = bytes.readShort(); //技能等级
            var skillPer = bytes.readInt(); //I:技能伤害加成
            for (var j = 0; j < a.skillList.length; j++) {
                var vo = a.skillList[j];
                if (vo.id == id) {
                    vo.level = level;
                    vo.starLv = a.star;
                    vo.skillPer = skillPer;
                    vo.updatePower();
                    break;
                }
            }
        }
    };
    /** 修复所有角色气血和内力*/
    Vo_Player.prototype.fixRoles = function () {
        var vo = this;
        var role = vo.sceneChar;
        if (role) {
            role.curhp = role.maxhp = vo.hp;
        }
    };
    Vo_Player.prototype.updateChars = function () {
        var a = this;
        if (!a.sceneChar) {
            a.sceneChar = SceneCharRole.create();
        }
        a.sceneChar.id = a.id;
        var scenechar = a.sceneChar;
        scenechar.charType = 1;
        scenechar.curhp = scenechar.maxhp = a.hp;
        for (var key in Enum_Attr.roleAttributes) {
            if (parseInt(key) != 102) {
                if (!a[Enum_Attr.roleAttributes[key]])
                    a[Enum_Attr.roleAttributes[key]] = 0;
                scenechar[Enum_Attr.roleAttributes[key]] = a[Enum_Attr.roleAttributes[key]];
            }
        }
        scenechar.job = a.job;
        scenechar.autoSkill = a.autoSkill && GGlobal.modelGuanQia.curGuanQiaLv >= GGlobal.autoSkill;
        scenechar.setBody(a.getBody());
        scenechar.str = a.str;
        scenechar.str_per = a.str;
        scenechar.dead = null;
        scenechar.guanzhi = a.jiangXian;
        scenechar.title = a.title;
        scenechar.setWeapon(a.weapon);
        scenechar.setGodWeapon(a.godWeapon);
        scenechar.setCountry(a.country);
        scenechar.setPlayerName(a.name);
        scenechar.setTitle(a.title);
        scenechar.setShenJian(a.shenJianID);
        scenechar.setShouHun(a._shouHun);
        scenechar.skillcdList = a.skillcdList;
        scenechar.curShield = scenechar.maxShield = Math.ceil(a.hp * a.hpShield);
        if (a.chongId > 0) {
            scenechar.waitRushID = a.chongId;
        }
        if (a.hpBlast > 0) {
            scenechar.waitTSID = 120006;
        }
        scenechar.lianjiNum = 0;
        if (a.id == Model_player.voMine.id) {
            GGlobal.layerMgr.close2(UIConst.LIANJI);
        }
        scenechar.bwID1 = a.bwID1;
        scenechar.bwStar1 = a.bwStar1;
        scenechar.bwID2 = a.bwID2;
        scenechar.bwStar2 = a.bwStar2;
        scenechar.tsID = a.tsID;
        scenechar.tsStar = a.tsStar;
        AttributeUtil.updateNamey(scenechar);
        for (var ii = 0, len = a.skillList.length; ii < len; ii++) {
            scenechar.skillList[ii] = a.skillList[ii];
        }
        a.setShaoZhuID(a.shaozhuID);
    };
    Vo_Player.prototype.parseSkill = function (bytes) {
        var a = this;
        var cfg = Config.hero_211[a.job];
        a.chongId = cfg.chong;
        var attackSkillArr = JSON.parse(cfg.attack);
        var cfgids = attackSkillArr.concat(JSON.parse(cfg.skills));
        for (var i = 0; i < cfgids.length; i++) {
            var id = cfgids[i][0];
            var vo = Vo_Skill.create(id, 0, 0);
            vo.openGuanQiaHandle();
            a.skillList[i] = vo;
        }
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var pos = bytes.readByte();
            var level = bytes.readShort(); //技能等级
            var vo = a.skillList[pos + attackSkillArr.length - 1];
            vo.starLv = a.star;
            vo.level = level;
            vo.updatePower();
        }
    };
    Object.defineProperty(Vo_Player.prototype, "shouHun", {
        get: function () {
            return this._shouHun;
        },
        set: function (value) {
            this._shouHun = value;
            if (this.sceneChar) {
                this.sceneChar.setShouHun(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Vo_Player.prototype.getBody = function () {
        return this.body;
    };
    Vo_Player.prototype.setBody = function (v) {
        if (this._shiZhuang && Config.sz_739[this._shiZhuang] && Config.sz_739[this._shiZhuang].moxing != v) {
            this.body = Config.sz_739[this._shiZhuang].moxing;
        }
        else {
            this.body = Config.sz_739[v] ? Config.sz_739[v].moxing : v;
        }
    };
    Vo_Player.prototype.setShiZhuang = function (val) {
        var self = this;
        self._shiZhuang = val;
        var isHero = Model_player.isMineID(self.id);
        if (Config.sz_739[val]) {
            self.job = val / 1000 >> 0;
            self.setBody(val);
            self.weapon = val;
        }
        else {
            if (isHero) {
                var szInfo = Model_WuJiang.shiZhuanDic[self.job];
                if (szInfo && szInfo.onSkinId) {
                    self.setBody(szInfo.onSkinId);
                    self.weapon = szInfo.onSkinId;
                }
                else {
                    self.setBody(self.job);
                    self.weapon = self.job;
                }
            }
            else {
                self.setBody(self.job);
                self.weapon = self.job;
            }
        }
        if (self == Model_player.voMine) {
            var character = Model_player.voMine && Model_player.voMine.sceneChar;
            if (character) {
                character.setBody(self.getBody());
                character.setWeapon(self.weapon);
            }
        }
    };
    Vo_Player.prototype.setTitle = function (val) {
        var s = this;
        s.title = val;
        if (s.sceneChar) {
            s.sceneChar.setTitle(val);
        }
    };
    Vo_Player.prototype.setJiangXian = function (val) {
        var s = this;
        s.jiangXian = val;
        if (s.sceneChar) {
            s.sceneChar.setJiangXian(val);
        }
    };
    Vo_Player.prototype.setCountry = function (val) {
        var s = this;
        s.country = val;
        if (s.sceneChar) {
            s.sceneChar.setCountry(val);
        }
    };
    Vo_Player.prototype.setShenJian = function (value) {
        var s = this;
        s.shenJianID = value;
        if (s.sceneChar) {
            s.sceneChar.setShenJian(value);
        }
    };
    Vo_Player.prototype.setGodWeapon = function (value) {
        var s = this;
        s.godWeapon = value;
        if (s.sceneChar) {
            s.sceneChar.setGodWeapon(value);
        }
    };
    Vo_Player.prototype.setHorseId = function (value) {
        var s = this;
        s.horseId = value;
        if (s.sceneChar) {
            s.sceneChar.setHorseId(value);
        }
    };
    Vo_Player.prototype.setAutoSkill = function (value) {
        var s = this;
        s.autoSkill = value;
        Model_player.autoSkill = value;
        if (s.sceneChar && GGlobal.modelGuanQia.curGuanQiaLv >= GGlobal.autoSkill) {
            s.sceneChar.autoSkill = value;
        }
    };
    Vo_Player.prototype.updateSkill = function () {
        var a = this;
        var arr = [];
        var cfg = Config.hero_211[a.job];
        var attackSkillArr = JSON.parse(cfg.attack);
        var cfgids = attackSkillArr.concat(JSON.parse(cfg.skills));
        for (var i = cfgids.length - 1; i >= 0; i--) {
            var id = cfgids[i][0];
            var damage = 0;
            var shenjiangzhiliSkillLv = Model_WuJiang.shenjiangzhiliSkillLv[a.job] ? Model_WuJiang.shenjiangzhiliSkillLv[a.job] : 0;
            var godskillCfg = Config.herogodskill_211[a.job * 100 + shenjiangzhiliSkillLv];
            if (godskillCfg) {
                var attArr = JSON.parse(godskillCfg.attpg);
                var len = attArr.length;
                for (var j = 0; j < len; j++) {
                    if (attArr[j][0] == id) {
                        damage = attArr[j][1];
                        break;
                    }
                }
            }
            var vo = Vo_Skill.create(id, 0, 0, 0, 0, damage);
            vo.openGuanQiaHandle();
            if (vo.type == Model_Skill.TYPE1) {
                vo.level = 1;
            }
            else if (vo.type == Model_Skill.TYPE3) {
                vo.level = 1; //技能等级
                vo.godWeaponPer = Model_ZSGodWeapon.getPerByJob(a.job);
                vo.zhenYanArr = a.skillList[i].zhenYanArr;
            }
            else {
                for (var j = 0; j < a.skillList.length; j++) {
                    if (id % 10 == a.skillList[j].id % 10) {
                        vo.level = a.skillList[j].level;
                        break;
                    }
                }
            }
            if (cfg.godhero == 1) {
                vo.starLv = ModelGodWuJiang.wuJiangStar(a.job);
            }
            else {
                vo.starLv = Model_WuJiang.wuJiangStar[a.job];
            }
            vo.updatePower();
            arr.unshift(vo);
        }
        a.skillList = arr;
        a.chongId = cfg.chong;
        if (a.sceneChar) {
            a.sceneChar.attackCount = 0;
            a.sceneChar.skillList = arr;
            AttributeUtil.updateNamey(a.sceneChar);
        }
    };
    Vo_Player.prototype.parseObject = function (object) {
        if (true) {
            var self = this;
            self.id = object.id;
            self.str = object.str;
            self.name = object.name;
            self.id = object.id;
            self.job = object.job;
            self.hp = object.hp;
            self.att = object.att;
            self.def = object.def;
            self.crit = object.cirt;
            self.resCrit = object.resCrit;
            self.hit = object.hit;
            self.dodge = object.dodge;
            self.realDmg = object.realDmg;
            self.critRate = object.critRate;
            self.resCritRate = object.resCritRate;
            self.hitRate = object.hitRate;
            self.dodgeRate = object.dodgeRate;
            self.critDmgAdd = object.critDmgAdd;
            self.critDmgReduce = object.critDmgReduce;
            self.dmgAdd = object.dmgAdd;
            self.dmgReduce = object.dmgReduce;
            var cfgHero = Config.hero_211;
            var herocfg = cfgHero[self.job];
            self.name = herocfg.name;
            if (object.body) {
                self.setBody(object.body);
                // self.body = object.body;
            }
            else {
                // self.body = self.job;
                self.setBody(self.job);
            }
            self.parseSkillByObj(object.skillList);
        }
    };
    Vo_Player.prototype.parseSkillByObj = function (object) {
    };
    //清理当前准备释放的技能列表
    Vo_Player.prototype.clearSkilllist = function () {
        if (this.sceneChar) {
            this.sceneChar.endSkill();
        }
    };
    Vo_Player.prototype.clone = function () {
        var self = this;
        var ret = {};
        for (var key in self) {
            var value = self[key];
            ret[key] = value;
        }
        return ret;
    };
    Vo_Player.prototype.setShaoZhuID = function (shaozhuID) {
        var self = this;
        self.shaozhuID = shaozhuID;
        if (self.sceneChar) {
            self.sceneChar.shaozhuSkillLv = self.shaozhuSkillLv;
            self.sceneChar.shaozhuFashion = self.shaozhuFashion;
            self.sceneChar.shaozhuStar = self.shaozhuStar;
            self.sceneChar.setShaoZhuID(shaozhuID);
        }
    };
    return Vo_Player;
}());
__reflect(Vo_Player.prototype, "Vo_Player");
