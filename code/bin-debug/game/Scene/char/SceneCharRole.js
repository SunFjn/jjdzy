var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneCharRole = (function (_super) {
    __extends(SceneCharRole, _super);
    function SceneCharRole() {
        var _this = _super.call(this) || this;
        /**0.没霸体1.有霸体 */
        _this.ignoreBati = 0;
        /** ##### ai相关 #####*/
        _this.ai_state = 0;
        _this.thinkInterv = 0;
        _this.thinkTime = 0;
        _this.standTime = 0;
        _this.isStand = false;
        _this.enemyid = 0;
        _this.tarpx = 0;
        _this.tarpy = 0;
        _this.nx = 0;
        _this.ny = 0;
        /** 0:怪物角色 1:英雄角色 会用于计算伤害*/ _this.charType = 0;
        /**1.受击2.浮空3.受击倒地4.死亡5.起身 */
        _this.hurt_state = 0;
        /**受击特殊动作 1火2冰3雷电4爆炸 */
        _this.hurtAct = 0;
        _this.dizz_state = 0;
        _this.attack_index = 0;
        _this.attack_state = 0;
        _this.move_state = 0;
        _this.plugs = [];
        _this.plugCtx = {};
        _this.invalid = 0; // |1：皮肤有更新
        /** -1:朝向左 1:朝向右 */
        _this.faceDir = 1;
        _this.aniTime = 0;
        _this.aniInterv = 1000;
        _this.body = 1; //皮肤
        _this.weapon = 0;
        _this.godWeapon = 0;
        _this.name = "";
        _this.horseMod = null;
        /** 无视打击掩码
         * &1: 无视站立硬直
         * &2: 无视击飞
         */
        _this.breakMask = 0;
        //战斗属性------
        /** job 0:没有职业 1:战士赵云 2:法师孔明 3:歌姬貂蝉 */
        _this.job = 0;
        /** 全员战力*/ _this.str = 1;
        /** 个人战力 */ _this.str_per = 1;
        /** 当前HP*/ _this.curhp = 100;
        /** 最大HP*/ _this._maxhp = 100;
        /** 当前护盾值*/ _this.curShield = 100;
        /** 最大护盾值*/ _this.maxShield = 100;
        /**胜者锁定气血*/ _this.lockHp = 20;
        /**胜者伤害加成限制*/ _this.dmgAddHp = 50;
        /** 攻击力*/
        _this.att = 0;
        /** 防御*/
        _this.def = 0;
        /** 暴击*/
        _this.crit = 0;
        /** 抗暴*/
        _this.resCrit = 0;
        /**命中 */
        _this.hit = 0;
        /**闪避 */
        _this.dodge = 0;
        /** 真实伤害*/
        _this.realDmg = 0;
        /** 暴击率*/
        _this.critRate = 0;
        /** 抗暴率*/
        _this.resCritRate = 0;
        /**命中率 */
        _this.hitRate = 0;
        /**闪避 率*/
        _this.dodgeRate = 0;
        /** 暴击伤害加成*/
        _this.critDmgAdd = 0;
        /** 暴击伤害减免*/
        _this.critDmgReduce = 0;
        /** 伤害加成*/
        _this.dmgAdd = 0;
        /** 伤害减免*/
        _this.dmgReduce = 0;
        /** 火焰伤害*/
        _this.flameDmg = 0;
        /** 冰冻伤害*/
        _this.frozenDmg = 0;
        /** 毒液伤害*/
        _this.venomDmg = 0;
        /** 电击伤害*/
        _this.electricDmg = 0;
        /** 爆炸伤害*/
        _this.blastDmg = 0;
        /** 火焰抗性*/
        _this.flameRes = 0;
        /** 冰冻抗性*/
        _this.frozenRes = 0;
        /** 剧毒抗性*/
        _this.venomRes = 0;
        /** 电击抗性*/
        _this.electricRes = 0;
        /** 爆炸抗性*/
        _this.blastRes = 0;
        /** 麻痹几率 */ _this.dizz = 0;
        /** 麻痹抵抗 */ _this.antiDizz = 0;
        /** 麻痹时间 */ _this.dizzTime = 1.5;
        /** 遁甲等级*/ _this.dunjia = 0;
        /** 僵直抵抗强度 */ _this.pd = 5;
        /**每次攻击回复怒气 */
        _this.rageReply = 0;
        /**减少宝物天书CD */
        _this.bwAndTSCD = 0;
        /**宝物治疗效果加成 */
        _this.bwCurePre = 0;
        /**减少被控时长 */
        _this.dizzCD = 0;
        /**1.增加自己的技能伤害百分比（不包括普攻） */
        _this.skillDmgPer = 0;
        /**增加少主技能伤害百分比 */
        _this.szSkillDmgPer = 0;
        /**降低敌方治疗效果 */
        _this.enemyCureD = 0;
        /**降低敌方对自己造成的技能伤害 */
        _this.enemySkillD = 0;
        /**额外连击伤害 */
        _this.lianjiDmg = 0;
        //------战斗属性
        _this.skillList = [];
        _this.hurtStateProxy = new HurtState();
        _this.vecx = 0;
        _this.vecy = 0;
        _this.vech = 0;
        _this.movespeed = 9;
        _this.speed = 200; //骑马的移动速度
        /**免疫伤害及状态 */
        _this.invincible = 0;
        /**免疫伤害及状态 */
        _this.immuneDmg = 0;
        /**免疫伤害状态 */
        _this.immuneHSt = 0;
        /**不减去伤害 */
        _this.clearHurt = 0;
        /**减去防御 数值*/
        _this.reduceDef = 0;
        /**服务端控制胜负，相对本人 1胜利 2失败 0不控制*/
        _this.serverCtr = 0;
        _this.namey = -225;
        _this.nameStatey = 0;
        /**普攻次数 */
        _this.attackCount = 0;
        _this.rage = 0;
        _this.country = 0;
        _this.title = 0;
        _this.guanzhi = 0;
        _this.shenJianID = 0;
        _this.autoSkill = false;
        /**连击数 */
        _this.lianjiNum = 0;
        /**宝物天书技能cd 0天书技能CD 1宝物2技能CD 2宝物1技能CD*/
        _this.skillcdList = [0, 0, 0];
        // 少主id
        _this.shaozhuID = 0;
        // 少主星级
        _this.shaozhuStar = 1;
        // 少主时装
        _this.shaozhuFashion = 1;
        // 少主技能等级
        _this.shaozhuSkillLv = 1;
        _this.changeModel = 0;
        /**神将天赋buff保存集合 */
        _this.buffData = {};
        // 角色buffCD
        _this.buffCDData = {};
        // public set curhp(value: number) {
        // 	s._curhp = value;
        // }
        // public get curhp(): number {
        // 	return s._curhp;
        // }
        _this.nameBarVild = false; //是否需要更新名字 称号等数据
        _this.weaponDown = false;
        /**超时死亡 */
        _this.overTimeDead = false;
        _this.csCount = 0;
        _this.isSilent = false;
        var self = _this;
        self.objType = 1;
        self.view = new DepSprite();
        self.createParts();
        // self.hpBar = GGlobal.commonpkg.createObject("ViewLeftHpBar").asProgress;
        self.lianjiNum = 0;
        self.headGroup = new egret.Sprite();
        self.headGroup.y = self.namey + 15;
        self.headGroup.x = 10;
        self.view.addChild(self.headGroup);
        self.headGroup.touchChildren = self.headGroup.touchEnabled = false;
        return _this;
    }
    SceneCharRole.create = function () {
        var pool = SceneCharRole.P;
        return pool.length ? pool.pop() : new SceneCharRole();
    };
    SceneCharRole.prototype.createParts = function () {
        var s = this;
        //影子
        var shadow = s.shadow = new StaticPart();
        shadow.setVal("s/1");
        shadow.setAct(4);
        s.view.addChild(shadow.mc);
        s.parts = new Parts();
        s.view.addChild(s.parts);
        //身体
        var body = new Part(Main.body_part_type);
        body.type = Parts.T_BODY;
        body.dep = Parts.P_BODY;
        s.parts.addPart(body);
    };
    SceneCharRole.prototype.setShaoZhuID = function (shaoZhuID) {
        var self = this;
        self.shaozhuID = shaoZhuID;
        if (!self.scene)
            return;
        if (shaoZhuID > 0) {
            if (self.shaoZhuChar) {
                self.updateShaoZhuData();
            }
            else {
                self.addShaoZhu();
            }
        }
        else {
            if (self.shaoZhuChar)
                self.shaoZhuChar.onRemove();
            self.shaoZhuChar = null;
        }
    };
    SceneCharRole.prototype.addShaoZhu = function () {
        var self = this;
        self.shaoZhuChar = SceneCharShaoZhu.create();
        var shaoZhuChar = self.shaoZhuChar;
        shaoZhuChar.masterID = self.id;
        shaoZhuChar.charType = 2;
        self.updateShaoZhuData();
        self.shaoZhuChar.scene = self.scene;
        self.shaoZhuChar.invalid |= 1023;
        self.updateShaoZhuPos();
        self.shaoZhuChar.onAdd();
    };
    SceneCharRole.prototype.updateShaoZhuData = function () {
        var self = this;
        var cfg = Config.son_267[self.shaozhuID];
        for (var key in Enum_Attr.roleAttributes) {
            if ((parseInt(key) > 102 && parseInt(key) <= 117) || parseInt(key) == 315) {
                if (!self[Enum_Attr.roleAttributes[key]])
                    self[Enum_Attr.roleAttributes[key]] = 0;
                self.shaoZhuChar[Enum_Attr.roleAttributes[key]] = self[Enum_Attr.roleAttributes[key]];
            }
            else {
                self.shaoZhuChar[Enum_Attr.roleAttributes[key]] = 0;
            }
        }
        self.shaoZhuChar.skillList = [];
        if (self.shaozhuFashion > 0 && Config.sonshow_267[self.shaozhuFashion]) {
            self.shaoZhuChar.setBody(Config.sonshow_267[self.shaozhuFashion].mod);
        }
        else {
            self.shaoZhuChar.setBody(cfg.mod);
        }
        if (self.shaoZhuChar.skillList.length <= 0) {
            var skillArr = JSON.parse(cfg.skill);
            for (var i = 0; i < skillArr.length; i++) {
                var skillVo = Vo_Skill.create(skillArr[i][0], self.shaozhuStar, self.shaozhuStar);
                self.shaoZhuChar.skillList.push(skillVo);
            }
        }
    };
    SceneCharRole.prototype.updateShaoZhuPos = function () {
        var self = this;
        if (!self.shaoZhuChar)
            return;
        self.shaoZhuChar.x = self.x;
        self.shaoZhuChar.y = self.y;
        self.shaoZhuChar.force = self.force;
    };
    /**根据战斗结果初始化属性
     *
     * 胜利 true 失败 false
    */
    SceneCharRole.prototype.scaleAttribute = function (bool) {
        var s = this;
        if (bool) {
            s.crit = s.crit * 2;
            s.critRate = s.critRate * 2;
            s.crit = s.crit * 2;
            s.critRate = s.critRate * 2;
            s.critDmgAdd = s.critDmgAdd * 2;
            s.dmgAdd = s.dmgAdd * 2 + 1;
            s.dmgReduce = s.dmgReduce * 2 + 0.5;
            s.critDmgReduce = s.critDmgReduce * 2;
        }
        else {
            s.crit = 0;
            s.critRate = 0;
            s.dodge = 0;
            s.dodgeRate = 0;
            s.critDmgAdd = 0;
            s.critDmgReduce = 0;
            s.dmgAdd = 0;
            s.dmgReduce = 0;
        }
    };
    SceneCharRole.prototype.update = function (ctx) {
        var self = this;
        var skillList = self.skillList;
        var len = skillList.length;
        for (var i = 0; i < len; i++) {
            var skill = skillList[i];
            var newcd = skill.remaincd - ctx.dt;
            if (newcd < 0) {
                newcd = 0;
            }
            skill.remaincd = newcd;
        }
        if (!self.isHero()) {
            for (var key in self.buffCDData) {
                var buffCD = self.buffCDData[key];
                var buffNewcd = App.isLife ? buffCD - ctx.dt : buffCD;
                if (buffNewcd < 0) {
                    buffNewcd = 0;
                }
                self.buffCDData[key] = buffNewcd;
            }
        }
        var len = self.plugs.length;
        var plugArg = self.plugCtx;
        var plugDirty = 0;
        for (var i = 0; i < len; i++) {
            var plug = self.plugs[i];
            if (!plug) {
                plugDirty++;
                continue;
            }
            plugArg.d = 0;
            plugArg.dt = ctx.dt;
            plug.update(plugArg);
            if (plugArg.d) {
                if (plug instanceof InvincibleStateTimer)
                    self.invincibleStateTimer = null;
                if (plug instanceof DizzState)
                    self.dizzState = null;
                self.plugs[i] = null;
                plug.onRemove();
                plugDirty++;
            }
            else {
            }
        }
        ctx.d = self.dead;
        if (plugDirty) {
            ArrayUitl.cleannull(self.plugs);
        }
        if (self.x < self.scene.left) {
            self.x = self.scene.left + self.force;
        }
        else if (self.x > self.scene.right) {
            self.x = self.scene.right - self.force;
        }
        //updateViewPos
        self.view.x = self.x;
        self.view.y = self.y;
        self.parts.y = -self.h;
        self.updateState();
        self.aniTime += ctx.dt;
        var perc = self.aniTime / self.aniInterv;
        self.parts.perc = perc;
        if (self.zhaoYunParts) {
            self.zhaoYunParts.perc = perc;
        }
        if (self.h > 0) {
            self.h -= 2;
            if (self.h < 0) {
                self.h = 0;
            }
        }
        self.view.dep = self.y;
        self.skillCDUpdate(ctx);
        if (self.shaoZhuChar) {
            self.shaoZhuChar.update(ctx);
        }
    };
    SceneCharRole.prototype.setName = function (v, isFlow) {
        if (isFlow === void 0) { isFlow = false; }
    };
    SceneCharRole.prototype.setPlayerName = function (val) {
        var s = this;
        if (s.name == val)
            return;
        s.name = val;
        s.nameBarVild = true;
    };
    SceneCharRole.prototype.setCountry = function (val) {
        var s = this;
        if (s.country == val)
            return;
        s.country = val;
        s.nameBarVild = true;
    };
    SceneCharRole.prototype.setShenJian = function (val) {
        this.shenJianID = val;
    };
    SceneCharRole.prototype.setTitle = function (val) {
        var s = this;
        if (s.title == val)
            return;
        s.title = val;
        s.nameBarVild = true;
    };
    SceneCharRole.prototype.setJiangXian = function (val) {
        var s = this;
        if (s.guanzhi == val)
            return;
        s.guanzhi = val;
        s.nameBarVild = true;
    };
    Object.defineProperty(SceneCharRole.prototype, "maxhp", {
        get: function () {
            return this._maxhp;
        },
        set: function (value) {
            var s = this;
            s._maxhp = value;
            s.lockHp = value * .2;
            s.dmgAddHp = value * .5;
        },
        enumerable: true,
        configurable: true
    });
    SceneCharRole.prototype.getBody = function () {
        return this.body;
    };
    SceneCharRole.prototype.setBody = function (v) {
        var s = this;
        if (v == undefined) {
            console.log("stop");
        }
        if (s.body != v) {
            s.body = v;
            s.invalid |= 1;
        }
    };
    /**读取 神兵shengjie_305 表里面的图片字段 */
    SceneCharRole.prototype.setWeapon = function (v) {
        var s = this;
        v = Config.sz_739[v] ? Config.sz_739[v].moxing : v;
        if (s.weapon != v) {
            if (v) {
                s.weaponpic = v + "";
            }
            else {
                s.weaponpic = undefined;
            }
            s.weapon = v;
            s.invalid |= 1;
        }
        else {
        }
        if (!v && !s.godWeapon) {
            s.parts.removePartByType(Parts.T_WEAPON); //移除PART
        }
    };
    SceneCharRole.prototype.setGodWeapon = function (v) {
        var s = this;
        if (Config.sb_750[v]) {
            v = Config.sb_750[v].moxing;
        }
        else if (Config.sbpf_750[v]) {
            v = Config.sbpf_750[v].mx;
        }
        if (s.godWeapon != v) {
            if (v) {
                s.godWeaponpic = v + "";
            }
            else {
                s.godWeaponpic = undefined;
            }
            s.godWeapon = v;
            s.invalid |= 1;
        }
        else {
        }
        if (!v && !s.weapon) {
            s.parts.removePartByType(Parts.T_WEAPON); //移除PART
        }
    };
    SceneCharRole.prototype.setHorseId = function (v) {
        var s = this;
        if (s.horseId != v) {
            s.horseId = v;
            var cfg = Config.zq_773[v];
            s.horseMod = cfg ? cfg.model + "" : null;
            s.invalid |= 1;
        }
        if (!v) {
            s.parts.removePartByType(Parts.T_HORSE); //移除PART
            s.parts.removePartByType(Parts.T_HORSE_WING); //移除PART
        }
    };
    SceneCharRole.prototype.setDir = function (dir) {
        var s = this;
        if (s.faceDir != dir) {
            s.faceDir = dir;
            s.invalid |= 2;
        }
    };
    SceneCharRole.prototype.faceX = function (x) {
        var s = this;
        if (x >= s.x) {
            s.setDir(1);
        }
        else {
            s.setDir(-1);
        }
    };
    SceneCharRole.prototype.updateState = function () {
        var s = this;
        var invalid = s.invalid;
        if (invalid) {
            if (invalid & 1) {
                s.updateAction();
            }
            if (invalid & 2) {
                s.updateWay();
            }
            if (invalid & 4) {
            }
            s.invalid = 0;
        }
    };
    SceneCharRole.prototype.setPlayTime = function (interval, loop, reset) {
        if (interval === void 0) { interval = 1000; }
        if (loop === void 0) { loop = true; }
        if (reset === void 0) { reset = true; }
        var s = this;
        s.aniInterv = interval;
        s.parts.ptype = loop ? Parts.DIS_REAPEAT : Parts.DIS_ONCE;
        if (reset) {
            s.aniTime = 0;
        }
        s.invalid |= 1;
    };
    SceneCharRole.prototype.updateAction = function () {
        var self = this;
        if (self.changeModel > 0) {
            self.updateChangeModel();
            return;
        }
        var urlkey;
        var weaponkey;
        var actkey = 1;
        var needSort;
        var isWeaponDown = false;
        var nameyStatey = 0;
        var body = self.body;
        var weaponpic = self.godWeaponpic ? self.godWeaponpic : self.weaponpic;
        if (self.hurt_state || self.dead) {
            if (self.hurtAct == 1) {
                urlkey = "body/" + body + "/fire/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/fire/ani";
                }
            }
            else if (self.hurtAct == 2) {
                urlkey = "body/" + body + "/ice/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/ice/ani";
                }
            }
            else if (self.hurtAct == 3) {
                urlkey = "body/" + body + "/thunder/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/thunder/ani";
                }
            }
            else if (self.hurtAct == 5) {
                urlkey = "body/" + body + "/poison/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/poison/ani";
                }
            }
            else {
                urlkey = "body/" + body + "/hurt/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/hurt/ani";
                }
            }
            if (self.hurt_state == 1) {
                actkey = 1;
            }
            else if (self.hurt_state == 2) {
                actkey = 2;
            }
            else if (self.hurt_state == 3) {
                actkey = 3;
            }
            else if (self.hurt_state == 4) {
                actkey = 4;
            }
            else {
                actkey = 5;
            }
            self.parts.ptype = Parts.DIS_ONCE;
        }
        else if (self.attack_state) {
            if (self.attack_index > 20) {
                urlkey = "body/" + body + "/use_0" + (self.attack_index % 10) + "/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/use_0" + (self.attack_index % 10) + "/ani";
                }
            }
            else if (self.attack_index > 10) {
                urlkey = "body/" + body + "/skill_0" + (self.attack_index % 10) + "/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/skill_0" + (self.attack_index % 10) + "/ani";
                }
            }
            else {
                if (self.attack_index == 9) {
                    urlkey = "body/" + body + "/rush/ani";
                    if (weaponpic) {
                        weaponkey = "weapon/" + weaponpic + "/rush/ani";
                    }
                }
                else {
                    urlkey = "body/" + body + "/attack_0" + self.attack_index + "/ani";
                    if (weaponpic) {
                        weaponkey = "weapon/" + weaponpic + "/attack_0" + self.attack_index + "/ani";
                    }
                }
            }
        }
        else {
            if (self.move_state) {
                urlkey = "body/" + body + "/run/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/run/ani";
                }
            }
            else {
                urlkey = "body/" + body + "/stand/ani";
                if (weaponpic) {
                    weaponkey = "weapon/" + weaponpic + "/stand/ani";
                    // if (self.job == 3) {//貂蝉站立时需要把武器放身后
                    // 	isWeaponDown = true;
                    // }
                }
            }
            self.parts.ptype = Parts.DIS_REAPEAT;
        }
        if (urlkey) {
            self.parts.setPart(1, urlkey, body);
        }
        var weapon;
        if (weaponkey) {
            weapon = self.parts.dic[2];
            if (!weapon) {
                weapon = Part.create();
                weapon.type = Parts.T_WEAPON;
                weapon.dep = Parts.P_WEAPON;
                self.parts.addPart(weapon);
            }
            if (self.weaponDown != isWeaponDown) {
                self.weaponDown = isWeaponDown;
                weapon.dep = Parts.D_WEAPON_DOWN;
                needSort = true;
            }
            self.parts.setPart(2, weaponkey);
        }
        if (self.shouHun) {
            var shPart = self.parts.dic[3];
            if (!shPart) {
                shPart = Part.create();
                shPart.type = Parts.T_SHOUHUN;
                shPart.dep = Parts.P_SHOUHUN;
                shPart.mc.x = -60;
                shPart.mc.y = -90;
                self.parts.addPart(shPart);
            }
            self.parts.setPart(3, "uieff/" + this.shouHun);
        }
        if (self.charType == 1) {
            needSort = true;
        }
        self.parts.setVal(actkey);
        if (needSort) {
            self.parts.sort();
        }
        if (self.zhaoYunParts) {
            self.zhaoYunParts.ptype = self.parts.ptype;
            self.zhaoYunParts.setPart(1, urlkey);
            self.zhaoYunParts.setPart(2, weaponkey);
            self.zhaoYunParts.setVal(actkey);
        }
        if (self.nameStatey != nameyStatey) {
            self.headGroup.y = self.namey + nameyStatey;
            self.nameStatey = nameyStatey;
        }
    };
    SceneCharRole.prototype.updateChangeModel = function () {
        var self = this;
        var urlkey;
        var actkey;
        if (self.hurt_state || self.dead) {
            if (self.hurt_state == 1) {
                actkey = 1;
            }
            else if (self.hurt_state == 2) {
                actkey = 2;
            }
            else if (self.hurt_state == 3) {
                actkey = 3;
            }
            else if (self.hurt_state == 4) {
                actkey = 4;
            }
            else {
                actkey = 5;
            }
            urlkey = "body/" + self.changeModel + "/hurt/ani";
            self.parts.ptype = Parts.DIS_ONCE;
        }
        else {
            urlkey = "body/" + self.changeModel + "/stand/ani";
            self.parts.ptype = Parts.DIS_REAPEAT;
            actkey = 1;
        }
        if (urlkey) {
            self.parts.setPart(1, urlkey);
        }
        self.parts.setVal(actkey);
    };
    SceneCharRole.prototype.setNameY = function (namey) {
        var s = this;
        if (s.namey != namey) {
            s.headGroup.y = namey + s.nameStatey;
            s.namey = namey;
        }
    };
    SceneCharRole.prototype.updateWay = function () {
        var s = this;
        s.parts.scaleY = s.scale;
        if (s.faceDir == 1) {
            s.parts.scaleX = s.scale;
        }
        else {
            s.parts.scaleX = -1 * s.scale;
        }
    };
    SceneCharRole.prototype.onAdd = function () {
        var s = this;
        s.invalid |= 1;
        s.scene.unitLayer.depAddChild(s.view);
        s.view.visible = true;
        s.setShaoZhuID(s.shaozhuID);
        s.updateShaoZhuPos();
        s.refreshCD();
        s.skillCD0();
        if (s.id == Model_player.voMine.id) {
            s.pd = 5;
            s.rage = Model_player.voMine.rage;
            GGlobal.modelPlayer.listen(Model_player.MSG_HERO_LEVEL, s.showLvlUpEff, s);
        }
    };
    SceneCharRole.prototype.refreshCD = function () {
        var s = this;
        var list = s.skillList;
        for (var i = 0, len = list.length; i < len; i++) {
            var skill = list[i];
            skill.remaincd = 0;
        }
    };
    SceneCharRole.prototype.skillCD0 = function () {
        var s = this;
        var list = s.skillList;
        for (var i = 0, len = list.length; i < len; i++) {
            var skill = list[i];
            skill.enterCool0();
        }
    };
    SceneCharRole.prototype.endSkill = function () {
        var s = this;
        if (s.curSkill) {
            if (GGlobal.layerMgr.isOpenView(UIConst.TSMS_PANEL) && s.id == Model_player.voMine.id) {
                GGlobal.layerMgr.close2(UIConst.TSMS_PANEL);
            }
            s.removePlug(s.curSkill);
        }
    };
    SceneCharRole.prototype.showLvlUpEff = function () {
        EffectMgr.addEff("uieff/10024", this.view, 10, -80, 1000, 1000, false);
    };
    SceneCharRole.prototype.resetVar = function () {
        var s = this;
        s.ignoreBati = 0;
        s.ai_state = 0;
        s.thinkInterv = 0;
        s.thinkTime = 0;
        s.enemyid = 0;
        s.tarpx = 0;
        s.tarpy = 0;
        s.nx = 0;
        s.ny = 0;
        s.charType = 0;
        s.hurt_state = 0;
        s.hurtAct = 0;
        s.dizz_state = 0;
        s.attack_index = 0;
        s.attack_state = 0;
        s.move_state = 0;
        s.invalid = 0; // |1：皮肤有更新
        s.faceDir = 1;
        s.aniTime = 0;
        s.aniInterv = 1000;
        s.body = 1; //皮肤
        s.weapon = 0;
        s.weaponpic = null;
        s.godWeapon = 0;
        s.godWeaponpic = null;
        s.shouHun = 0;
        s.horseMod = null;
        s.horseId = 0;
        s.parts.removePartByType(Parts.T_SHOUHUN);
        s.parts.removePartByType(Parts.T_HORSE);
        s.parts.removePartByType(Parts.T_HORSE_WING);
        s.name = "";
        s.waitSkillPos = 0;
        s.waitSkillID = undefined;
        s.waitRushID = undefined;
        s.waitTSID = undefined;
        s.breakMask = 0;
        s.job = 0;
        s.str = 1;
        s.str_per = 1;
        s.curhp = 0;
        s._maxhp = 100;
        s.curShield = 100;
        s.maxShield = 100;
        s.lockHp = 20;
        s.dmgAddHp = 50;
        s.att = 0;
        s.def = 0;
        s.crit = 0;
        s.resCrit = 0;
        s.hit = 0;
        s.dodge = 0;
        s.realDmg = 0;
        s.critRate = 0;
        s.resCritRate = 0;
        s.hitRate = 0;
        s.dodgeRate = 0;
        s.critDmgAdd = 0;
        s.critDmgReduce = 0;
        s.dmgAdd = 0;
        s.dmgReduce = 0;
        s.flameDmg = 0;
        s.frozenDmg = 0;
        s.venomDmg = 0;
        s.electricDmg = 0;
        s.blastDmg = 0;
        s.flameRes = 0;
        s.frozenRes = 0;
        s.venomRes = 0;
        s.electricRes = 0;
        s.blastRes = 0;
        s.dizz = 0;
        s.antiDizz = 0;
        s.dizzTime = 1.5;
        s.dunjia = 0;
        s.pd = 5;
        s.star = 0;
        s.pvpAddHurt = 0;
        s.pvpMinuteHurt = 0;
        s.pveAddHurt = 0;
        s.wxAddHurt = 0;
        s.wxMinuteHurt = 0;
        s.hpShield = 0;
        s.hpBlast = 0;
        s.rageReply = 0;
        s.bwAndTSCD = 0;
        s.bwCurePre = 0;
        s.dizzCD = 0;
        s.careEnemyID = 0;
        s.vecx = 0;
        s.vecy = 0;
        s.vech = 0;
        s.h = 0;
        s.movespeed = 9;
        s.dead = 0;
        s.curSkill = null;
        s.invincible = 0;
        s.immuneDmg = 0;
        s.immuneHSt = 0;
        s.clearHurt = 0;
        s.reduceDef = 0;
        s.serverCtr = 0;
        s.namey = -225;
        s.nameStatey = 0;
        s.attackCount = 0;
        s.rage = 0;
        s.country = 0;
        s.title = 0;
        s.guanzhi = 0;
        s.shenJianID = 0;
        s.autoSkill = false;
        s.bwID1 = 0;
        s.bwStar1 = 0;
        s.bwID2 = 0;
        s.bwStar2 = 0;
        s.tsID = 0;
        s.tsStar = 0;
        s.lianjiNum = 0;
        s.force = 0;
        s.dropDta = null;
        s.standTime = 0;
        s.isStand = false;
        s.changeModel = 0;
        s.buffData = {};
        s.csCount = 0;
        s.overTimeDead = false;
        s.isSilent = false;
        s.buffCDData = {};
        if (s.isHero()) {
            ViewMainUIBottomUI1.instance.setSkillCM(false);
        }
    };
    SceneCharRole.prototype.onRemove = function () {
        var s = this;
        if (s.isHero()) {
            Model_player.voMine.rage = s.rage;
            GGlobal.modelPlayer.remove(Model_player.MSG_HERO_LEVEL, s.showLvlUpEff, s);
        }
        if (GGlobal.modelPlayer.playerDetailDic[s.id]) {
            var vo = GGlobal.modelPlayer.playerDetailDic[s.id];
            vo.sceneChar = null;
        }
        if (s.curSkill) {
            if (GGlobal.layerMgr.isOpenView(UIConst.TSMS_PANEL) && s.id == Model_player.voMine.id) {
                GGlobal.layerMgr.close2(UIConst.TSMS_PANEL);
            }
            s.removePlug(s.curSkill);
        }
        if (s.hurtStateProxy.enable) {
            s.removePlug(s.hurtStateProxy);
        }
        for (var i = s.plugs.length - 1; i >= 0; i--) {
            var plug = s.plugs[i];
            if (plug && plug.autoRemove) {
                s.removePlug(plug);
            }
        }
        s.plugs = [];
        s.breakStateTimer = null;
        s.invincibleStateTimer = null;
        s.reduceDefStateTimer = null;
        s.bsState = null;
        s.dizzState = null;
        s.effPlayer = null;
        if (s.shaoZhuChar)
            s.shaoZhuChar.onRemove();
        s.shaoZhuChar = null;
        s.shaozhuID = 0;
        s.shaozhuStar = 0;
        s.shaozhuSkillLv = 0;
        s.shaozhuFashion = 0;
        for (var i = s.skillList.length - 1; i >= 0; i--) {
            var skill = s.skillList[i];
            if (skill && skill.autoRemove) {
                skill.dispose();
            }
        }
        s.skillList = [];
        s.skillcdList = [0, 0, 0];
        s.scene.unitLayer.depRemoveChild(s.view);
        s.view.alpha = 1;
        s.view.dep = -1;
        s.parts.removePartExceptBody();
        s.addZhaoYunBuff(0);
        s.resetVar();
        if (SceneCharRole.P.indexOf(this) == -1)
            SceneCharRole.P.push(this);
    };
    SceneCharRole.prototype.takeCure = function (ctx) {
        var self = this;
        if (self.curhp > 0) {
            //治疗
            self.curhp += ctx.cure;
            if (self.curhp >= self.maxhp) {
                self.curhp = self.maxhp;
            }
        }
        if (self.isHero()) {
            // 主角气血更新
            GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: self.curhp });
        }
    };
    SceneCharRole.prototype.takeMaxHurt = function () {
        var s = this;
        s.curhp = 0;
        s.overTimeDead = true;
        s.deadThrow(5, 15);
    };
    SceneCharRole.prototype.takeDmg = function (ctx) {
        var s = this;
        s.standTime = 0;
        if ((s.immuneDmg || s.invincible) && !ctx.isHpBlast) {
            return;
        }
        var isMineID = s.isHero();
        if ((GGlobal.modelGuanQia.inGuanQiaBoss() || GGlobal.sceneType != SceneCtrl.GUANQIA) && s.curShield > 0) {
            if (!ctx.isClearShow && SceneHpView.count < 10) {
                var valuenum = ctx.attVal;
                if (!valuenum) {
                    valuenum = ctx.dmgVal;
                }
                if (valuenum > s.curShield) {
                    var hpview_1 = SceneHpView.create();
                    var hpview1 = SceneHpView.create();
                    if (hpview1) {
                        if (isMineID) {
                            hpview1.init2(s.x, s.y - 140 - s.h, s.curShield, ctx.isCrit, ctx.isHit, ctx.isLianJi, true);
                        }
                        else {
                            hpview1.init(s.x, s.y - 140 - s.h, s.curShield, ctx.isCrit, ctx.isHit, ctx.isLianJi, true);
                        }
                        s.scene.addUnit(hpview1);
                    }
                    if (hpview_1) {
                        if (isMineID) {
                            hpview_1.init2(s.x, s.y - 140 - s.h, valuenum - s.curShield, ctx.isCrit, ctx.isHit, ctx.isLianJi, false);
                        }
                        else {
                            hpview_1.init(s.x, s.y - 140 - s.h, valuenum - s.curShield, ctx.isCrit, ctx.isHit, ctx.isLianJi, false);
                        }
                        s.scene.addUnit(hpview_1);
                    }
                }
                else {
                    var hpview_2 = SceneHpView.create();
                    if (hpview_2) {
                        if (isMineID) {
                            hpview_2.init2(s.x, s.y - 140 - s.h, valuenum, ctx.isCrit, ctx.isHit, ctx.isLianJi, true);
                        }
                        else {
                            hpview_2.init(s.x, s.y - 140 - s.h, valuenum, ctx.isCrit, ctx.isHit, ctx.isLianJi, true);
                        }
                        s.scene.addUnit(hpview_2);
                    }
                }
            }
            if (!ctx.clearHurt && !s.clearHurt) {
                s.hurtAct = ctx.hurtAct;
                var dmgVal = ctx.dmgVal;
                s.curShield -= dmgVal;
                if (s.curhp > 0 && s.curShield < 0) {
                    s.curhp += s.curShield;
                    if (s.curhp <= 0) {
                        s.curhp = 0;
                        s.deadThrow(5, 15);
                    }
                }
            }
        }
        else {
            if (!ctx.isClearShow && s.curhp > 0 && SceneHpView.count < 10) {
                var hpview = SceneHpView.create();
                if (hpview) {
                    var valuenum = ctx.attVal;
                    if (!valuenum) {
                        valuenum = ctx.dmgVal;
                    }
                    if (isMineID) {
                        hpview.init2(s.x, s.y - 140 - s.h, valuenum, ctx.isCrit, ctx.isHit, ctx.isLianJi, false);
                    }
                    else {
                        hpview.init(s.x, s.y - 140 - s.h, valuenum, ctx.isCrit, ctx.isHit, ctx.isLianJi, false);
                    }
                    s.scene.addUnit(hpview);
                }
            }
            if (s.curhp > 0) {
                s.hurtAct = ctx.hurtAct;
                if (!ctx.clearHurt && !s.clearHurt) {
                    var dmgVal = ctx.dmgVal;
                    if (s.serverCtr & 1 && s.curhp < s.dmgAddHp) {
                        dmgVal = dmgVal * 2; //胜者加伤,败者多扣血 
                    }
                    //扣除气血
                    s.curhp -= dmgVal;
                    // if (self.serverCtr & 2 && self.curhp < self.lockHp) {
                    // 	self.curhp = self.lockHp;//胜者锁血
                    // }
                    if (s.curhp <= 0) {
                        s.curhp = 0;
                        s.deadThrow(5, 15);
                    }
                }
            }
        }
        s.onEvent(EVT_SC.EVT_HURT, ctx);
        if (s.isHero() && !ctx.clearHurt) {
            // 主角气血更新
            GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: s.curhp });
        }
        if (ctx.bt && !s.scene.ignoreBreak && s.curhp > 0 && !s.immuneHSt) {
            if (!s.hurtStateProxy.enable) {
                s.hurtStateProxy.role = s;
                s.addPlug(s.hurtStateProxy);
            }
            else {
                s.hurtStateProxy.reEnter();
            }
            if (s.hurt_state != 4) {
                if (ctx.heff) {
                    EffectMgr.addEff("eff/" + ctx.heff + "/ani", s.parts, MathUtil.rndNum(-20, 20), -s.parts.height / 2, 400, 400, true, 1, Main.skill_part_type);
                }
                else {
                    EffectMgr.addEff("eff/200001/ani", s.view, MathUtil.rndNum(-20, 20), -70, 400, 400, true, 1, Main.skill_part_type);
                }
            }
            s.onEvent(EVT_SC.EVT_STACT, null);
        }
        if (s.immuneHSt) {
            if (!s.breakStateTimer) {
                s.breakStateTimer = BreakStateTimer.create();
            }
            if (!s.breakStateTimer.isWorking) {
                s.breakStateTimer.role = s;
                s.addPlug(s.breakStateTimer);
            }
        }
    };
    SceneCharRole.prototype.takeSrcShaoZhuDmg = function (ctx) {
        var s = this;
        if ((s.immuneDmg || s.invincible) && !ctx.isHpBlast) {
            return;
        }
        var isMineID = s.isHero();
        if ((GGlobal.modelGuanQia.inGuanQiaBoss() || GGlobal.sceneType != SceneCtrl.GUANQIA) && s.curShield > 0) {
            if (!ctx.isClearShow && SceneHpView.count < 10) {
                var valuenum = ctx.attVal;
                if (!valuenum) {
                    valuenum = ctx.dmgVal;
                }
                if (valuenum > s.curShield) {
                    var hpview_3 = SceneHpView.create();
                    var hpview1 = SceneHpView.create();
                    if (hpview1) {
                        if (isMineID) {
                            hpview1.init2(s.x, s.y - 140 - s.h, s.curShield, ctx.isCrit, ctx.isHit, false, true);
                        }
                        else {
                            hpview1.init(s.x, s.y - 140 - s.h, s.curShield, ctx.isCrit, ctx.isHit, false, true);
                        }
                        s.scene.addUnit(hpview1);
                    }
                    if (hpview_3) {
                        if (isMineID) {
                            hpview_3.init2(s.x, s.y - 140 - s.h, valuenum - s.curShield, ctx.isCrit, ctx.isHit);
                        }
                        else {
                            hpview_3.init(s.x, s.y - 140 - s.h, valuenum - s.curShield, ctx.isCrit, ctx.isHit);
                        }
                        s.scene.addUnit(hpview_3);
                    }
                }
                else {
                    var hpview_4 = SceneHpView.create();
                    if (hpview_4) {
                        if (isMineID) {
                            hpview_4.init2(s.x, s.y - 140 - s.h, valuenum, ctx.isCrit, ctx.isHit, false, true);
                        }
                        else {
                            hpview_4.init(s.x, s.y - 140 - s.h, valuenum, ctx.isCrit, ctx.isHit, false, true);
                        }
                        s.scene.addUnit(hpview_4);
                    }
                }
            }
            if (!ctx.clearHurt && !s.clearHurt) {
                s.hurtAct = ctx.hurtAct;
                var dmgVal = ctx.dmgVal;
                s.curShield -= dmgVal;
                if (s.curhp > 0 && s.curShield < 0) {
                    s.curhp += s.curShield;
                    if (s.curhp <= 0) {
                        s.curhp = 0;
                        s.deadThrow(5, 15);
                    }
                }
            }
        }
        else {
            if (!ctx.isClearShow && s.curhp > 0 && SceneHpView.count < 10) {
                var hpview = SceneHpView.create();
                if (hpview) {
                    var valuenum = ctx.attVal;
                    if (!valuenum) {
                        valuenum = ctx.dmgVal;
                    }
                    hpview.init3(s.x, s.y - 140 - s.h, valuenum, ctx.isHit);
                    s.scene.addUnit(hpview);
                }
            }
            if (s.curhp > 0) {
                s.hurtAct = ctx.hurtAct;
                if (!ctx.clearHurt && !s.clearHurt) {
                    var dmgVal = ctx.dmgVal;
                    //扣除气血
                    s.curhp -= dmgVal;
                    if (s.curhp <= 0) {
                        s.curhp = 0;
                        s.deadThrow(5, 15);
                    }
                }
            }
        }
        s.onEvent(EVT_SC.EVT_HURT, ctx);
        if (s.isHero() && !ctx.clearHurt) {
            // 主角气血更新
            GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: s.curhp });
        }
        if (ctx.bt && !s.scene.ignoreBreak && s.curhp > 0 && !s.immuneHSt) {
            if (!s.hurtStateProxy.enable) {
                s.hurtStateProxy.role = s;
                s.addPlug(s.hurtStateProxy);
            }
            else {
                s.hurtStateProxy.reEnter();
            }
            if (s.hurt_state != 4) {
                if (ctx.heff) {
                    EffectMgr.addEff("eff/" + ctx.heff + "/ani", s.parts, MathUtil.rndNum(-20, 20), -s.parts.height / 2, 400, 400, true, 1, Main.skill_part_type);
                }
                else {
                    EffectMgr.addEff("eff/200001/ani", s.view, MathUtil.rndNum(-20, 20), -70, 400, 400, true, 1, Main.skill_part_type);
                }
            }
            s.onEvent(EVT_SC.EVT_STACT, null);
        }
        if (s.immuneHSt) {
            if (!s.breakStateTimer) {
                s.breakStateTimer = BreakStateTimer.create();
            }
            if (!s.breakStateTimer.isWorking) {
                s.breakStateTimer.role = s;
                s.addPlug(s.breakStateTimer);
            }
        }
    };
    SceneCharRole.prototype.takeServerDmg = function (skillID, hp, isCrit) {
        if (isCrit === void 0) { isCrit = false; }
        var s = this;
        var hpview = SceneHpView.create();
        if (hpview) {
            if (s.isHero()) {
                hpview.init2(s.x, s.y - 140 - s.h, hp, isCrit, true);
            }
            else {
                hpview.init(s.x, s.y - 140 - s.h, hp, isCrit, true);
            }
            s.scene.addUnit(hpview);
        }
        if (s.curhp > 0) {
            //扣除气血
            s.curhp -= hp;
            if (s.curhp <= 0) {
                s.curhp = 0;
                s.deadThrow(5, 15);
            }
            s.onEvent(EVT_SC.EVT_HURT, null);
            GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: s.curhp });
            if (!s.hurtStateProxy.enable) {
                s.hurtStateProxy.role = s;
                s.addPlug(s.hurtStateProxy);
            }
            else {
                s.hurtStateProxy.reEnter();
            }
            var cfg = Config.skill_210[skillID];
            if (s.hurt_state != 4) {
                if (cfg.heff) {
                    EffectMgr.addEff("eff/" + cfg.heff + "/ani", s.parts, MathUtil.rndNum(-20, 20), -s.parts.height / 2, 400, 400, true, 1, Main.skill_part_type);
                }
                else {
                    EffectMgr.addEff("eff/200001/ani", s.view, MathUtil.rndNum(-20, 20), -70, 400, 400, true, 1, Main.skill_part_type);
                }
            }
        }
    };
    SceneCharRole.prototype.setShouHun = function (value) {
        var cfg = Config.shhx_266[value];
        if (!cfg) {
            return;
        }
        this.shouHun = cfg.mod;
        if (value && value != this.shouHun) {
            this.invalid |= 1;
        }
        else {
            this.parts.removePartByType(3); //移除PAR
        }
    };
    SceneCharRole.prototype.takeServerCure = function (ctx) {
        var self = this;
        if (self.curhp > 0) {
            //治疗
            self.curhp += ctx.cure;
            if (self.curhp >= self.maxhp) {
                self.curhp = self.maxhp;
            }
        }
        if (self.isHero()) {
            // 主角气血更新
            GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: self.curhp });
        }
    };
    SceneCharRole.prototype.setDizz = function (dizzTime, dizz_state) {
        var s = this;
        s.dizzTime = dizzTime;
        if (s.dizzState && s.dizzState.isWorking) {
            s.removePlug(s.dizzState);
            s.dizzState = null;
        }
        if (!s.dizzState) {
            s.dizzState = DizzState.create();
        }
        s.dizzState.role = s;
        s.dizzState.state = dizz_state;
        s.dizzState.remainTime = dizzTime;
        s.addPlug(s.dizzState);
    };
    SceneCharRole.prototype.invincibleState = function (invincibleTime) {
        var s = this;
        if (s.invincibleStateTimer && s.invincibleStateTimer.isWorking) {
            s.removePlug(s.invincibleStateTimer);
            s.invincibleStateTimer = null;
        }
        if (!s.invincibleStateTimer) {
            s.invincibleStateTimer = InvincibleStateTimer.create();
        }
        s.invincibleStateTimer.timerRemain = invincibleTime;
        s.invincibleStateTimer.role = s;
        s.addPlug(s.invincibleStateTimer);
    };
    SceneCharRole.prototype.takeReduceDef = function (ctx) {
        var s = this;
        if (s.reduceDefStateTimer && s.reduceDefStateTimer.isWorking) {
            s.removePlug(s.reduceDefStateTimer);
            s.reduceDefStateTimer = null;
        }
        if (!s.reduceDefStateTimer) {
            s.reduceDefStateTimer = ReduceDefStateTimer.create();
        }
        s.reduceDef = ctx.def;
        s.reduceDefStateTimer.timerRemain = ctx.defTime;
        s.reduceDefStateTimer.role = s;
        s.addPlug(s.reduceDefStateTimer);
    };
    SceneCharRole.prototype.setChangeModel = function (changeTime, dizz_state, model) {
        var self = this;
        if (self.bsState && self.bsState.isWorking) {
            self.removePlug(self.bsState);
            self.bsState = null;
        }
        if (!self.bsState) {
            self.bsState = ChangeModelState.create();
        }
        self.bsState.role = self;
        self.bsState.remainTime = changeTime;
        self.changeModel = model;
        self.parts.removePartExceptBody();
        self.invalid |= 1;
        self.addPlug(self.bsState);
    };
    SceneCharRole.prototype.deadThrow = function (speedx, speedh) {
        var s = this;
        if (!s.overTimeDead && GGlobal.sceneType != SceneCtrl.CROSS_TEAM && GGlobal.sceneType != SceneCtrl.LIU_CHU_QS &&
            GGlobal.sceneType != SceneCtrl.CROSS_SJMJ && GGlobal.sceneType != SceneCtrl.SYZLB &&
            GGlobal.sceneType != SceneCtrl.SGWS && GGlobal.sceneType != SceneCtrl.CROSS_WARS &&
            GGlobal.sceneType != SceneCtrl.WA_KUANG && GGlobal.sceneType != SceneCtrl.SHAOZHU_ESCORT &&
            GGlobal.sceneType != SceneCtrl.GUANQIABOSS_HELP && s.isHero() && Model_battle.battleId <= 0 && s.csCount <= 0) {
            if (s.addCSBuff(300001))
                return;
        }
        if (!s.hurtStateProxy.enable) {
            s.hurtStateProxy.role = this;
            s.addPlug(s.hurtStateProxy);
        }
        s.hurtStateProxy.throw(speedx * -s.faceDir, speedh);
        s.onEvent(EVT_SC.EVT_THROW, null);
    };
    /**受击后退 */
    SceneCharRole.prototype.backoff = function (speedx, speedh) {
        var s = this;
        if (!s.hurtStateProxy.enable) {
            s.hurtStateProxy.role = this;
            s.addPlug(s.hurtStateProxy);
        }
        s.hurtStateProxy.backoff(speedx, speedh);
        s.onEvent(EVT_SC.EVT_THROW, null);
    };
    /**被打的抛起。。*/
    SceneCharRole.prototype.throw = function (speedx, speedh) {
        var s = this;
        if (s.immuneHSt || s.immuneDmg || s.scene.ignoreBreak || s.invincible) {
            return;
        }
        if (s.curhp > 0) {
            if (!s.hurtStateProxy.enable) {
                s.hurtStateProxy.role = this;
                s.addPlug(s.hurtStateProxy);
            }
            s.hurtStateProxy.throw(speedx, speedh);
        }
        s.onEvent(EVT_SC.EVT_THROW, null);
        s.scene.shake();
    };
    SceneCharRole.prototype.playSkill = function (skillLog, dmgProxy) {
        if (dmgProxy === void 0) { dmgProxy = null; }
        var s = this;
        if (true) {
            // console.log("frames:" + s.scene.fc + "," + s.name + s.force + "(" + "x:" + s.x + ",y:" + s.y + ")" + "施展" + skillLog.skill.name);
        }
        if (!dmgProxy) {
            if (skillLog.dmgProxy) {
                skillLog.dmgProxy.executeNewTask(skillLog.skill, s, s.scene);
            }
            else {
                dmgProxy = DamageProxy.createByClient(skillLog.skill, s, s.scene);
                skillLog.dmgProxy = dmgProxy;
            }
        }
        s.addPlug(skillLog);
        s.curSkill = skillLog;
        if (s.curSkill.skill.type == Model_Skill.TYPE1) {
            s.attackCount++;
            if (s.attackCount < s.curSkill.skill.duoduan) {
            }
            else {
                s.attackCount = 0;
            }
        }
        else {
            s.attackCount = 0;
        }
        if (s.curSkill.skill.type == Model_Skill.TYPE3) {
            s.rage = 0;
            if (s.id == Model_player.voMine.id) {
                GGlobal.layerMgr.open(UIConst.TSMS_PANEL, s.curSkill.skill.id);
            }
        }
        if (s.curSkill.skill.type == Model_Skill.TYPE6) {
            s.waitRushID = 0;
        }
        else if (s.curSkill.skill.type == Model_Skill.TYPE7) {
            s.waitTSID = 0;
            if (s.id == Model_player.voMine.id) {
                GGlobal.layerMgr.open(UIConst.TSMS_PANEL, s.curSkill.skill.id);
            }
        }
        else if (s.curSkill.skill.type == Model_Skill.TYPE4 || s.curSkill.skill.type == Model_Skill.TYPE5 || s.curSkill.skill.type == Model_Skill.TYPE3
            || s.curSkill.skill.type == Model_Skill.TYPE10) {
            s.waitSkillID = 0;
            var sysId = 0;
            switch (GGlobal.sceneType) {
                case SceneCtrl.CROSS_TEAM:
                    sysId = UIConst.CROSS_TEAM;
                    break;
                case SceneCtrl.CROSS_SJMJ:
                    sysId = UIConst.SJMJ1;
                    break;
                case SceneCtrl.LIU_CHU_QS:
                    sysId = UIConst.CHILD_LCQS;
                    break;
                case SceneCtrl.SYZLB:
                    sysId = UIConst.SYZLB;
                    break;
                default:
                    break;
            }
            if (s.curSkill.skill.type == Model_Skill.TYPE10 && s.isHero()) {
                Model_player.voMine.qcRage = 0;
                Model_player.voMine.qcTime = 0;
            }
            if (sysId > 0) {
                GGlobal.modelSkill.CG_USE_SKILL(s.waitSkillPos, sysId);
            }
            //通知后端使用技能
            if (Model_battle.battleId > 0 && s.id == Model_player.voMine.id) {
                GGlobal.modelbattle.CG_PLAYER_USESKILL(s.curSkill.skill.id);
            }
        }
        // else if (Model_player.taskId <= Config.xtcs_004[2807].num && s.curSkill.skill.type == Model_Skill.TYPE2) {
        // 	s.waitSkillID = 0;
        // }
        if (Model_battle.battleId <= 0 && s.job > 0) {
            s.addGodGeneralBuff();
            if (s.curSkill.skill.buff > 0) {
                s.addQCBuff(s.curSkill.skill.buff);
            }
        }
        if (Model_battle.battleId > 0) {
            Model_battle.hurtRoleArr = [];
            Model_battle.hurtArr = [];
        }
        s.rage += Config.changshu_101[5].num / 100 + s.rageReply;
        if (s.rage >= Config.changshu_101[3].num / 100)
            s.rage = Config.changshu_101[3].num / 100;
        GGlobal.control.notify(Enum_MsgType.ROLE_RAGE_UPDATE);
    };
    /**前端添加 神将天赋 buff */
    SceneCharRole.prototype.addGodGeneralBuff = function () {
        var self = this;
        var vomine = Model_player.voMine;
        var buffID = Config.hero_211[self.job].buffid;
        if (self.isHero() && buffID > 0 && Config.buff_011[buffID].cf == 1 && !vomine.buffCDData[buffID] && !self.buffData[buffID]) {
            self.addZGLBuff(buffID);
        }
        else if (!self.isHero() && buffID > 0 && Config.buff_011[buffID].cf == 1 && !self.buffCDData[buffID] && !self.buffData[buffID]) {
            self.addZGLBuff(buffID);
        }
    };
    SceneCharRole.prototype.addZhaoYunBuff = function (buffID) {
        var self = this;
        if (buffID <= 0) {
            if (self.zhaoYunParts) {
                self.zhaoYunParts.removePartByType(1);
                self.zhaoYunParts.removePartByType(2);
                self.view.removeChild(self.zhaoYunParts);
                self.zhaoYunParts = null;
            }
        }
        else {
            if (!self.zhaoYunParts) {
                self.zhaoYunParts = new Parts();
                self.zhaoYunParts.alpha = 0.5;
            }
            self.zhaoYunParts.x = self.faceDir - 50;
            self.zhaoYunParts.y = 0;
            self.zhaoYunParts.scaleX = 1;
            self.view.addChild(self.zhaoYunParts);
            var body = self.zhaoYunParts.dic[1];
            if (!body) {
                body = Part.create();
                body.type = 1;
                body.dep = 5;
                self.zhaoYunParts.addPart(body);
            }
            var weapon = self.zhaoYunParts.dic[2];
            if (!weapon) {
                weapon = Part.create();
                weapon.type = 2;
                weapon.dep = 6;
                self.zhaoYunParts.addPart(weapon);
            }
        }
    };
    SceneCharRole.prototype.addZGLBuff = function (buffID) {
        var self = this;
        if (self.curSkill.skill.type == Model_Skill.TYPE1 ||
            self.curSkill.skill.type == Model_Skill.TYPE2 ||
            self.curSkill.skill.type == Model_Skill.TYPE3) {
            var godGenLv = 1;
            if (self.isHero()) {
                godGenLv = ModelGodWuJiang.getTianFuLevel(self.job);
            }
            else {
                godGenLv = self.star > 0 ? self.star : 1;
            }
            var buffCfg = Config.buff_011[buffID];
            var randomRate = Math.random() * 100000;
            if (randomRate <= buffCfg.gl + buffCfg.cz1 * godGenLv) {
                if (self.isHero() && buffCfg.tupian != "0")
                    GGlobal.layerMgr.open(UIConst.TSMS_PANEL, buffCfg.tupian);
                self.addBuff(buffCfg, godGenLv);
                if (self.job == 52) {
                    self.addZhaoYunBuff(buffID);
                }
            }
        }
    };
    /**添加奇策buff */
    SceneCharRole.prototype.addQCBuff = function (buffID) {
        var self = this;
        var vomine = Model_player.voMine;
        if (!vomine.buffCDData[buffID] && buffID > 0 && !self.buffData[buffID]) {
            var buffCfg = Config.buff_011[buffID];
            var buffLv = GGlobal.modelQice.suitLv;
            var randomRate = Math.random() * 100000;
            if (randomRate <= buffCfg.gl + buffCfg.cz1 * buffLv) {
                self.addBuff(buffCfg, buffLv);
            }
        }
    };
    /**添加重生buff */
    SceneCharRole.prototype.addCSBuff = function (buffID) {
        var self = this;
        var buffLv = GGlobal.modelZhenYan.star;
        if (buffLv <= 0)
            return false;
        var vomine = Model_player.voMine;
        var buffCfg = Config.buff_011[buffID];
        var randomRate = Math.random() * 100000;
        if (randomRate <= buffCfg.gl + buffCfg.cz1 * buffLv) {
            var per = (JSON.parse(buffCfg.xiaoguo)[0][1] + JSON.parse(buffCfg.cz)[0][1] * buffLv) / 100000;
            Model_player.voMine.fixRoles();
            self.curhp = self.maxhp * per;
            self.csCount++;
            var times_1 = setTimeout(function () {
                EffectMgr.addEff("eff/200015/ani", self.view, 0, 0, 1000, 1000, false, 1, Main.skill_part_type);
                clearTimeout(times_1);
            }, 500);
            // self.invincibleState(1500);
            return true;
        }
        return false;
    };
    SceneCharRole.prototype.addBuff = function (buffCfg, buffLv) {
        if (buffLv === void 0) { buffLv = 1; }
        var self = this;
        var buffState = RoleBuffState.create();
        buffState.role = self;
        buffState.buffID = buffCfg.ID;
        buffState.remainTime = buffCfg.shijian + buffLv * buffCfg.sjcz;
        self.addPlug(buffState);
        self.buffData[buffCfg.ID] = { cfg: buffCfg, buffLv: buffLv };
        if (self.isHero()) {
            Model_player.voMine.buffCDData[buffCfg.ID] = buffCfg.cd;
        }
        else {
            self.buffCDData[buffCfg.ID] = buffCfg.cd;
        }
        if (buffCfg.tupian != "0") {
            GGlobal.layerMgr.open(UIConst.TSMS_PANEL, buffCfg.tupian);
        }
    };
    SceneCharRole.prototype.addServerBuff = function (buffID) {
        var self = this;
        var buffCfg = Config.buff_011[buffID];
        if (buffCfg.cf == 3) {
            Model_battle.battleTimeDic[self.id] = Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            console.log(self.name + "沉默开始");
            self.isSilent = true;
            if (self.isHero()) {
                ViewMainUIBottomUI1.instance.setSkillCM(true);
            }
        }
        else if (buffCfg.cf == 2) {
            // self.invincibleState(1500);
            if (!self.hurtStateProxy.enable) {
                self.hurtStateProxy.role = this;
                self.addPlug(self.hurtStateProxy);
            }
            self.hurtStateProxy.throw(5 * -self.faceDir, 15);
            var times_2 = setTimeout(function () {
                EffectMgr.addEff("eff/200015/ani", self.view, 0, 0, 1000, 1000, false, 1, Main.skill_part_type);
                clearTimeout(times_2);
            }, 500);
        }
        else {
            var buffState = RoleBuffState.create();
            buffState.role = self;
            buffState.buffID = buffID;
            buffState.remainTime = 99999999;
            self.addPlug(buffState);
            self.buffData[buffID] = { cfg: buffCfg, buffLv: 0 };
            if (self.job == 52) {
                self.addZhaoYunBuff(buffID);
            }
            if (buffCfg.tupian != "0") {
                GGlobal.layerMgr.open(UIConst.TSMS_PANEL, buffCfg.tupian);
            }
        }
    };
    SceneCharRole.prototype.clearServerBuff = function (buffID) {
        var self = this;
        var buffCfg = Config.buff_011[buffID];
        if (buffCfg.cf == 3) {
            self.isSilent = false;
            console.log(self.name + "沉默结束总时长" + (Math.floor(Model_GlobalMsg.getServerTime() / 1000) - Model_battle.battleTimeDic[self.id]) + "秒");
            if (self.isHero()) {
                ViewMainUIBottomUI1.instance.setSkillCM(false);
            }
        }
        else {
            for (var i = 0; i < self.plugs.length; i++) {
                var plug = self.plugs[i];
                if (plug && plug instanceof RoleBuffState && plug.buffID == buffID) {
                    self.plugs[i] = null;
                    plug.onRemove();
                    break;
                }
            }
        }
    };
    SceneCharRole.prototype.addPlug = function (plug) {
        if (plug && this.plugs.indexOf(plug) == -1)
            this.plugs.push(plug);
        plug.onAdd();
    };
    SceneCharRole.prototype.removePlug = function (plug) {
        var s = this;
        var index = s.plugs.indexOf(plug);
        if (true) {
            if (index == -1) {
                throw new Error("plugIndexError");
            }
        }
        s.plugs[index] = null;
        plug.onRemove();
    };
    SceneCharRole.prototype.updateVec = function () {
        return;
    };
    SceneCharRole.prototype.deadRemove = function () {
        var self = this;
        self.dead = 1;
        if (self.dropDta) {
            var sceneDropCrrl = SceneDropCtrl.instance;
            sceneDropCrrl.onEnter(self.scene);
            sceneDropCrrl.dropExtraGoods({ x: self.x, y: self.y, drop: self.dropDta });
        }
    };
    SceneCharRole.prototype.onEvent = function (evt, arg) {
        var plugs = this.plugs;
        var len = plugs.length;
        for (var i = 0; i < len; i++) {
            var plug = plugs[i];
            if (plug) {
                plug.onEvent(evt, arg);
            }
        }
    };
    SceneCharRole.prototype.reset = function () {
        var s = this;
        if (s.hurtStateProxy.enable) {
            s.removePlug(s.hurtStateProxy);
        }
    };
    SceneCharRole.prototype.showEff = function (v, effId) {
        var s = this;
        if (v) {
            // if (s.effPart == null) {
            // 	s.effPart = EffectMgr.addEff("eff/" + effId, s.titleGroup, 0, 50, 1000, -1);
            // }
        }
        else {
            if (s.effPart) {
                EffectMgr.instance.removeEff(s.effPart);
                s.effPart = null;
            }
        }
    };
    SceneCharRole.prototype.addTempEff = function (effkey, offx, h, interval, lifeTime, isTop, repeat) {
        if (isTop === void 0) { isTop = false; }
        var self = this;
        if (!self.effPlayer) {
            self.effPlayer = new RoleEffctPlayerPlug();
        }
        if (!self.effPlayer.role) {
            self.effPlayer.role = self;
            self.addPlug(self.effPlayer);
        }
        if (isTop) {
            return self.effPlayer.addEff1(effkey, offx, h, interval, lifeTime, repeat);
        }
        else {
            return self.effPlayer.addEff(effkey, offx, h, interval, lifeTime, repeat);
        }
    };
    SceneCharRole.prototype.showHpShield = function (v) {
        if (v === void 0) { v = false; }
        var s = this;
        if (v) {
            if (!s.hpShieldPart) {
                s.hpShieldPart = EffectMgr.addEff("eff/200011/ani", s.view, 0, 0, 1000, -1, true, 1, Main.skill_part_type);
                s.view.setChildIndex(s.headGroup, s.view.numChildren - 1);
            }
        }
        else {
            if (s.hpShieldPart) {
                EffectMgr.instance.removeEff(s.hpShieldPart);
                s.hpShieldPart = null;
            }
        }
    };
    SceneCharRole.prototype.playServerSkill = function (skillLog, dmgProxy) {
        if (dmgProxy === void 0) { dmgProxy = null; }
        var s = this;
        if (!dmgProxy) {
            dmgProxy = DamageProxy.createByClient(skillLog.skill, s, s.scene);
        }
        skillLog.dmgProxy = dmgProxy;
        s.addPlug(skillLog);
        s.curSkill = skillLog;
    };
    SceneCharRole.prototype.isHero = function () {
        return Model_player.isMineID(this.id);
    };
    SceneCharRole.prototype.skillCDUpdate = function (ctx) {
        if (this.isHero())
            return;
        //天书技能 
        var bwcd1 = this.skillcdList[0];
        var newcd = App.isLife ? bwcd1 - ctx.dt : bwcd1;
        if (newcd < 0) {
            newcd = 0;
        }
        this.skillcdList[0] = newcd;
        //宝物技能2 
        var bwcd2 = this.skillcdList[1];
        newcd = App.isLife ? bwcd2 - ctx.dt : bwcd2;
        if (newcd < 0) {
            newcd = 0;
        }
        this.skillcdList[1] = newcd;
        //宝物技能1
        var bwcd3 = this.skillcdList[2];
        newcd = App.isLife ? bwcd3 - ctx.dt : bwcd3;
        if (newcd < 0) {
            newcd = 0;
        }
        this.skillcdList[2] = newcd;
    };
    SceneCharRole.prototype.cloneOtherPart = function (term) {
        var self = this;
        var clonePart = CloneRolePart.create();
        clonePart.role = self;
        clonePart.remainTime = term.lifeTime;
        clonePart.attack_index = term.act;
        clonePart.scaleX = term.scaleX ? term.scaleX : 1;
        clonePart.offx = term.offx ? term.offx : 0;
        clonePart.offy = term.offy ? term.offy : 0;
        self.addPlug(clonePart);
    };
    SceneCharRole.P = [];
    return SceneCharRole;
}(SceneObject));
__reflect(SceneCharRole.prototype, "SceneCharRole");
