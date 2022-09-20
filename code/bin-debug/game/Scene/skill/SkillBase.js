var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkillBase = (function () {
    function SkillBase() {
        /**技能总伤害*/
        this.tHurt = 0;
        this.CFGTIME = 0;
        this.attstate = 0;
        /**免疫击退 */ this.immst = 0;
        this.tag = 0;
        this.dmgProxy = Pool.getItemByClass("DamageProxy", DamageProxy);
    }
    SkillBase.createBase = function (role, skill) {
        var ret = Pool.getItemByClass("SkillBase", SkillBase);
        ret.role = role;
        ret.skill = skill;
        ret.tag = 1;
        return ret;
    };
    /**计算伤害 caculateHurt */
    SkillBase.prototype.cacHurt = function (tar, perc) {
        if (perc === void 0) { perc = 1; }
        var hurt = this.role.att - tar.def;
        if (hurt < 0) {
            hurt = 6;
        }
        if (hurt > tar.maxhp * 0.5) {
            hurt = tar.maxhp * 0.5;
        }
        return (hurt * perc) >> 0;
    };
    SkillBase.prototype.onEvent = function (evt, arg) {
        var evtsc = EVT_SC;
        if (evt == evtsc.EVT_STACT || evt == evtsc.EVT_THROW || evt == evtsc.EVT_DISSKILL) {
            this.role.removePlug(this);
        }
    };
    /**初始化技能场景逻辑表 */
    SkillBase.getLogicMap = function () {
        return SkillUtil.getLogicMap();
    };
    SkillBase.getPlayLogic = function (role, skill) {
        var creator = SkillBase.getLogicMap()[skill.cfg.s];
        if (!creator) {
            //ViewCommonWarn.text("skill style empty:" + skill.id);
            return SkillBase.createBase(role, skill);
        }
        return creator(role, skill);
    };
    SkillBase.prototype.onDispose = function () {
        var s = this;
        s.role.careEnemyID = 0;
        s.role.curSkill = null;
        s.role.invalid |= 1;
        s.role.setPlayTime();
        s.role.attack_state -= s.attstate;
        s.role.immuneHSt -= s.immst;
        s.role.immuneDmg = 0;
        if (GGlobal.layerMgr.isOpenView(UIConst.TSMS_PANEL) && s.role.id == Model_player.voMine.id) {
            GGlobal.layerMgr.close2(UIConst.TSMS_PANEL);
        }
        if (s.dmgProxy && s.dmgProxy.srcChar)
            s.dmgProxy.srcChar = null;
        s.dmgProxy = null;
        s.role = null;
        s.skill = null;
        s.tag = 0;
    };
    SkillBase.prototype.onRemove = function () {
        this.onDispose();
        Pool.recover("SkillBase", this);
    };
    SkillBase.prototype.update = function (ctx) {
        var self = this;
        self.t += ctx.dt;
        self.doSeq(self.t);
        self.role.x += self.ms;
        self.role.h += self.msh;
        if (self.role.h < 0) {
            self.role.h = 0;
        }
        if (self.CFGTIME && self.t >= self.CFGTIME) {
            ctx.d = 1;
        }
    };
    SkillBase.prototype.doSeq = function (curtime) {
        var seq = this.seq;
        if (seq) {
            var self = this;
            while (seq.length && curtime >= seq[0].t) {
                var term = seq.shift();
                switch (term.type) {
                    case "m":
                        if (term.ms) {
                            self.ms = self.role.faceDir * term.ms;
                        }
                        if (term.msh) {
                            self.msh = term.msh;
                        }
                        break;
                    case "act":
                        self.role.attack_index = term.act;
                        self.role.invalid |= 1;
                        var isLoop = term.loop ? true : false;
                        self.role.setPlayTime(term.interv, isLoop);
                        self.role.attack_state++;
                        self.attstate++;
                        break;
                    case "dmg":
                        self.dmgProxy.effectCfg(term);
                        break;
                    case "cure":
                        self.role.immuneDmg = 1;
                        self.dmgProxy.use_cure(term);
                        break;
                    case "addRage":
                        self.role.immuneDmg = 1;
                        self.dmgProxy.addRage(term);
                        break;
                    case "reduceDef":
                        self.dmgProxy.reduce_def(term);
                        break;
                    case "invincible":
                        self.dmgProxy.setInvincible();
                        break;
                    case "dizz"://定身
                        self.dmgProxy.setDizz(term, 1);
                        break;
                    case "vertigo"://眩晕
                        self.dmgProxy.setDizz(term, 2);
                        break;
                    case "bs"://变身
                        self.dmgProxy.setChangeModel(term);
                        break;
                    case "setVal":
                        var key = term.k;
                        if (key == "immst") {
                            self.immst += term.v;
                            self.role.immuneHSt += term.v;
                        }
                        break;
                    case "eff":
                        if (term.effid < 100001)
                            return;
                        var effid;
                        if (self.role.job == 15) {
                            var effid1 = SkillUtil.replaceEff(self.role.godWeapon > 0 ? self.role.godWeapon : self.role.weapon, self.role.body, term.effid);
                            effid = "eff/" + effid1 + "/ani";
                        }
                        else {
                            effid = "eff/" + term.effid + "/ani";
                        }
                        isLoop = term.loop ? true : false;
                        var interval = term.interval ? term.interval : term.lifeTime;
                        if (term.self) {
                            var offx = term.offx ? term.offx : 0;
                            var offy = term.offy ? term.offy : 0;
                            var tempeff = this.role.addTempEff(effid, offx * this.role.faceDir, -offy, interval, term.lifeTime, term.istop);
                            tempeff.removeBreak = true;
                            if (term.scaleX) {
                                tempeff.mc.scaleX = this.role.faceDir * term.scaleX;
                            }
                            else {
                                tempeff.mc.scaleX = this.role.faceDir;
                            }
                        }
                        else if (term.scene) {
                            var offx = term.offx ? term.offx : 0;
                            var offy = term.offy ? term.offy : 0;
                            if (!term.scaleX)
                                term.scaleX = 1;
                            var sceneff = new HuangZhongArrow1();
                            sceneff.initXY(effid, 1, 500, true, this.role.scene.map.focusx + offx, GGlobal.stage.stageHeight / 2 + offy, 0, term.scaleX);
                            sceneff.effInterv = interval;
                            sceneff.dieTime = term.lifeTime;
                            sceneff.updateFunc = HuangZhongArrow1.LIFEONLY;
                            this.role.scene.addUnit(sceneff);
                            sceneff.dep = this.role.view.dep - 1;
                            if (sceneff.dep <= 0)
                                sceneff.dep = 0;
                        }
                        else if (term.enemy) {
                            var offx = term.offx ? term.offx : 0;
                            var h = term.h ? term.h : 0;
                            var list = this.role.scene.list;
                            for (var i = list.length - 1; i >= 0; i--) {
                                var u = list[i];
                                if (u && u.objType == 1 && u.force != this.role.force) {
                                    var tempeff = u.addTempEff(effid, offx * u.faceDir, -h, interval, term.lifeTime);
                                    tempeff.removeBreak = true;
                                    tempeff.mc.scaleX = u.faceDir;
                                    break;
                                }
                            }
                        }
                        else {
                            var offx = term.offx ? term.offx : 0;
                            var h = term.h ? term.h : 0;
                            var offy = term.offy ? term.offy : 0;
                            var eff = HuangZhongArrow1.create();
                            if (!term.scaleX)
                                term.scaleX = 1;
                            eff.initWithRoleFace(this.role, effid, 1, interval, isLoop, offx, -h, offy, term.scaleX);
                            this.role.scene.addUnit(eff);
                            var depAdd = term.depAdd ? term.depAdd : 50; //深度排序修正
                            eff.dep += depAdd;
                            var movetype = term.movetype; //移动类别
                            if (movetype) {
                                if (movetype == "forward") {
                                    var xspeed = term.xspeed ? term.xspeed : 10;
                                    var yspeed = term.yspeed ? term.yspeed : 0;
                                    xspeed = xspeed * GGlobal.frameScale;
                                    yspeed = yspeed * GGlobal.frameScale;
                                    eff.dieTime = term.lifeTime;
                                    eff.updateFunc = HuangZhongArrow1.FORWARD;
                                    eff.va = this.role.faceDir * xspeed;
                                    eff.vb = yspeed;
                                }
                            }
                            else {
                                eff.updateFunc = HuangZhongArrow1.LIFEONLY; //默认没有轨迹
                            }
                        }
                        break;
                    case "screendark":
                        ScreenDark.show(term.time ? term.time : 1500);
                        break;
                    case "setvis":
                        self.role.view.visible = term.value;
                        break;
                    default:
                        break;
                }
                if (term.s && self.role && self.role.id == Model_player.voMine.id) {
                    SoundManager.getInstance().playEff(term.s);
                }
            }
        }
    };
    SkillBase.prototype.onAdd = function () {
        var s = this;
        s.CFGTIME = s.skill.cfg.a.t;
        s.attstate = 0;
        s.t = 0;
        s.ms = 0;
        s.msh = 0;
        s.immst = 0;
        if (s.skill.type == Model_Skill.TYPE4 || s.skill.type == Model_Skill.TYPE5 || s.skill.type == Model_Skill.TYPE3) {
            this.role.immuneDmg = 1;
        }
        if (s.skill.cfg.a.seqs) {
            s.seq = s.skill.cfg.a.seqs.concat();
        }
        else {
            s.seq = null;
        }
        s.doSeq(0);
    };
    return SkillBase;
}());
__reflect(SkillBase.prototype, "SkillBase");
