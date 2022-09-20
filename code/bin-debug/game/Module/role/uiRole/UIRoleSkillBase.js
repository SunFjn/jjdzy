var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIRoleSkillBase = (function () {
    function UIRoleSkillBase() {
        /**技能总伤害*/
        this.tHurt = 0;
        this.CFGTIME = 0;
        this.attstate = 0;
        /**免疫击退 */ this.immst = 0;
        this.tag = 0;
    }
    UIRoleSkillBase.createBase = function (role, skill) {
        var ret = Pool.getItemByClass("UIRoleSkillBase", UIRoleSkillBase);
        ret.role = role;
        ret.skill = skill;
        ret.tag = 1;
        return ret;
    };
    UIRoleSkillBase.prototype.onEvent = function (evt, arg) {
        var evtsc = EVT_SC;
        if (evt == evtsc.EVT_STACT || evt == evtsc.EVT_THROW || evt == evtsc.EVT_DISSKILL) {
            this.role.removePlug(this);
        }
    };
    /**初始化技能场景逻辑表 */
    UIRoleSkillBase.getLogicMap = function () {
        return SkillUtil.getLogicMap();
    };
    UIRoleSkillBase.getPlayLogic = function (role, skill) {
        var creator = UIRoleSkillBase.getLogicMap()[skill.cfg.s];
        if (!creator) {
            return UIRoleSkillBase.createBase(role, skill);
        }
        return creator(role, skill);
    };
    UIRoleSkillBase.prototype.onRemove = function () {
        var self = this;
        self.role.invalid |= 1;
        self.role = null;
        self.skill = null;
        self.tag = 0;
        Pool.recover("UIRoleSkillBase", self);
    };
    UIRoleSkillBase.prototype.update = function (ctx) {
        var s = this;
        s.t += ctx.dt;
        s.doSeq(s.t);
        s.role.x += s.ms;
        s.role.h += s.msh;
        if (s.role.h < 0) {
            s.role.h = 0;
        }
        if (s.CFGTIME && s.t >= s.CFGTIME) {
            s.role.isPlaySkill = false;
        }
    };
    UIRoleSkillBase.prototype.doSeq = function (curtime) {
        var seq = this.seq;
        if (seq) {
            var self = this;
            while (seq.length && curtime >= seq[0].t) {
                var term = seq.shift();
                switch (term.type) {
                    case "m":
                        if (term.ms != undefined) {
                            self.ms = self.role.faceDir * term.ms;
                        }
                        if (term.msh != undefined) {
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
                            var tempeff = this.role.addTempEff(effid, offx * this.role.faceDir, -offy, interval, term.lifeTime);
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
                            var sceneff = UIRoleArrow.create();
                            sceneff.initXY(effid, 1, interval, true, this.role.view.x + offx, this.role.view.y + offy, 0, term.scaleX);
                            sceneff.dieTime = term.lifeTime;
                            sceneff.updateFunc = UIRoleArrow.LIFEONLY;
                            sceneff.uiparent = this.role.uiparent;
                            sceneff.onAdd();
                            this.role.effList.push(sceneff);
                        }
                        else if (term.enemy) {
                        }
                        else {
                            var offx = term.offx ? term.offx : 0;
                            var h = term.h ? term.h : 0;
                            var offy = term.offy ? term.offy : 0;
                            var eff = UIRoleArrow.create();
                            if (!term.scaleX)
                                term.scaleX = 1;
                            eff.initWithRoleFace(this.role, effid, 1, interval, isLoop, offx, -h, offy, term.scaleX);
                            eff.uiparent = this.role.uiparent;
                            eff.onAdd();
                            this.role.effList.push(eff);
                            var depAdd = term.depAdd ? term.depAdd : 50; //深度排序修正
                            eff.dep += depAdd;
                            var movetype = term.movetype; //移动类别
                            if (movetype) {
                                if (movetype == "forward") {
                                    var xspeed = term.xspeed ? term.xspeed : 10;
                                    var yspeed = term.yspeed ? term.yspeed : 0;
                                    eff.dieTime = term.lifeTime;
                                    eff.updateFunc = UIRoleArrow.FORWARD;
                                    eff.va = this.role.faceDir * xspeed;
                                    eff.vb = yspeed;
                                }
                            }
                            else {
                                eff.updateFunc = UIRoleArrow.LIFEONLY; //默认没有轨迹
                            }
                        }
                        break;
                    default:
                        break;
                }
                // if (term.s) {//播放音乐
                // 	SoundManager.getInstance().playEff(term.s);
                // }
            }
        }
    };
    UIRoleSkillBase.prototype.onAdd = function () {
        var s = this;
        s.CFGTIME = s.skill.cfg.a.t;
        s.attstate = 0;
        s.t = 0;
        s.ms = 0;
        s.msh = 0;
        s.immst = 0;
        if (s.skill.cfg.a.seqs) {
            s.seq = s.skill.cfg.a.seqs.concat();
        }
        else {
            s.seq = null;
        }
        s.doSeq(0);
        s.role.isPlaySkill = true;
    };
    UIRoleSkillBase.styleMap = {};
    UIRoleSkillBase.mapInit = 0;
    return UIRoleSkillBase;
}());
__reflect(UIRoleSkillBase.prototype, "UIRoleSkillBase");
