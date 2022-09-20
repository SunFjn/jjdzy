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
var BaoWuSkillBase = (function (_super) {
    __extends(BaoWuSkillBase, _super);
    function BaoWuSkillBase() {
        var _this = _super.call(this) || this;
        /**技能总伤害*/
        _this.tHurt = 0;
        _this.CFGTIME = 0;
        _this.endTime = 0;
        _this.attstate = 0;
        /**免疫击退 */ _this.immst = 0;
        _this.tag = 0;
        return _this;
    }
    BaoWuSkillBase.create = function (role, skill) {
        var ret = new BaoWuSkillBase();
        ret.role = role;
        ret.skill = skill;
        return ret;
    };
    /**计算伤害 caculateHurt */
    BaoWuSkillBase.prototype.cacHurt = function (tar, perc) {
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
    BaoWuSkillBase.prototype.onEvent = function (evt, arg) {
        var evtsc = EVT_SC;
        if (evt == evtsc.EVT_STACT || evt == evtsc.EVT_THROW || evt == evtsc.EVT_DISSKILL) {
            this.role.removePlug(this);
        }
    };
    /**初始化技能场景逻辑表 */
    BaoWuSkillBase.getLogicMap = function () {
        return SkillUtil.getLogicMap();
    };
    BaoWuSkillBase.getPlayLogic = function (role, skill) {
        var creator = SkillBase.getLogicMap()[skill.cfg.s];
        if (!creator) {
            //ViewCommonWarn.text("skill style empty:" + skill.id);
            return SkillBase.createBase(role, skill);
        }
        return creator(role, skill);
    };
    BaoWuSkillBase.prototype.onRemove = function () {
        var self = this;
        self.role.curSkill = null;
        self.role.invalid |= 1;
        self.role.setPlayTime();
        self.role.immuneHSt -= self.immst;
        self.role.immuneDmg = 0;
    };
    BaoWuSkillBase.prototype.update = function (ctx) {
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
        if (self.endTime && self.t >= self.endTime && self.tag == 0) {
            self.tag = 1;
            self.role.attack_state -= self.attstate;
        }
    };
    BaoWuSkillBase.prototype.doSeq = function (curtime) {
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
                        self.role.invincibleState(term.invincibleTime);
                        break;
                    case "dizz"://定身
                        self.dmgProxy.setDizz(term, 1);
                        break;
                    case "vertigo"://眩晕
                        self.dmgProxy.setDizz(term, 2);
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
                        var effid = "eff/" + term.effid + "/ani";
                        isLoop = term.loop ? true : false;
                        var interval = term.interval ? term.interval : term.lifeTime;
                        if (term.self) {
                            var offx = term.offx ? term.offx : 0;
                            var offy = term.offy ? term.offy : 0;
                            var repeat = term.repeat == 1;
                            var tempeff = this.role.addTempEff(effid, offx * this.role.faceDir, -offy, interval, term.lifeTime, term.istop, repeat);
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
                            var sceneff = new HuangZhongArrow1();
                            sceneff.initXY(effid, 1, 500, true, this.role.scene.map.focusx + offx, GGlobal.stage.stageHeight / 2 + offy);
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
                        this.role.view.visible = term.value;
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
    BaoWuSkillBase.prototype.onAdd = function () {
        var s = this;
        s.CFGTIME = s.skill.cfg.a.t;
        s.endTime = s.skill.cfg.a.end;
        s.attstate = 0;
        s.t = 0;
        s.ms = 0;
        s.msh = 0;
        s.immst = 0;
        s.tag = 0;
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
    BaoWuSkillBase.styleMap = {};
    BaoWuSkillBase.mapInit = 0;
    return BaoWuSkillBase;
}(SkillBase));
__reflect(BaoWuSkillBase.prototype, "BaoWuSkillBase");
