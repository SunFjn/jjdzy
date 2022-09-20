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
var DamageProxyFullScene = (function (_super) {
    __extends(DamageProxyFullScene, _super);
    function DamageProxyFullScene() {
        return _super.call(this) || this;
    }
    DamageProxyFullScene.createByClient = function (skill, srcChar, scene) {
        var ret = new DamageProxyFullScene();
        ret.sType = 1;
        ret.srcSkill = skill;
        ret.srcChar = srcChar;
        ret.scene = scene;
        ret.power = skill.power_lv;
        ret.powerType = 1;
        return ret;
    };
    DamageProxyFullScene.prototype.effect = function (times) {
        if (times === void 0) { times = 0; }
        if (this.sType == 1) {
            var cfg = this.srcSkill.cfg.a[times];
            this.effectCfg(cfg);
            if (cfg.s) {
                SoundManager.getInstance().playEff(cfg.s);
            }
        }
        else if (this.sType == 0) {
            this.effIDs();
        }
    };
    DamageProxyFullScene.caculateDmg = function (a, b, skill, scene, indexcfg) {
        if (b.immuneDmg || b.invincible) {
            return null;
        }
        var ret = DamageProxy.DMGBUFFER;
        ret.bt = null;
        if (!indexcfg) {
            ViewCommonWarn.text("技能打击配置错误[index=" + skill.id + "]");
            return;
        }
        //0.95+(A命中-D闪避)/（A命中+D闪避+命中/闪避常数[20000]）+A命中率-D闪避率
        var hitrate = (0.95 + (a.hit - b.dodge) / (a.hit + b.dodge + Config.changshu_101[7].num) + a.hitRate - b.dodgeRate);
        if (hitrate < scene.random.random()) {
            ret.attVal = 0;
            ret.dmgVal = 0;
            ret.isHit = false;
            return ret;
        }
        else {
            ret.isHit = true;
        }
        //基础伤害=max（A攻击*A技能伤害倍数+A技能附加伤害-D防御，A攻击*0.1）
        var basehurt = Math.max(a.att * skill.powerAtt_lv / 100000 + skill.power_lv - b.def, a.att * 0.1);
        //暴击概率=0.05+(A暴击-D抗暴)/（A暴击+D抗暴+暴击/抗暴常数[20000]）+A暴击率-D抗暴率
        var critPerc = 0.05 + (a.crit - b.resCrit) / (a.crit + b.resCrit + Config.changshu_101[6].num) + a.critRate - b.resCritRate; //暴击率
        if (critPerc > scene.random.random()) {
            ret.isCrit = true;
        }
        else {
            ret.isCrit = false;
        }
        var hurtValue;
        if (!ret.isCrit) {
            hurtValue = basehurt;
        }
        else {
            hurtValue = basehurt * (1.5 + a.critDmgAdd - b.critDmgReduce);
        }
        var dmgReduce = 0;
        var dmgAdd = 0;
        if (a.id == Model_player.voMine.id) {
            if (b.str >= a.str + a.str * 0.15) {
                dmgReduce = 0.1;
            }
            else if (b.str >= a.str + a.str * 0.3) {
                dmgReduce = 0.3;
            }
            else if (b.str >= a.str + a.str * 0.5) {
                dmgReduce = 0.6;
            }
        }
        else if (b.id == Model_player.voMine.id) {
            if (a.str >= b.str + b.str * 0.15) {
                dmgReduce = 0.1;
            }
            else if (a.str >= b.str + b.str * 0.3) {
                dmgReduce = 0.3;
            }
            else if (a.str >= b.str + b.str * 0.5) {
                dmgReduce = 0.6;
            }
        }
        //基础结算伤害=上阶段伤害*（1+A伤害加成-D伤害减免）+A真实伤害
        hurtValue = hurtValue * Math.max((1 + a.dmgAdd + dmgAdd - (b.dmgReduce + dmgReduce)), 0.05) + a.realDmg;
        //五行伤害计算 火 冰 毒 电 暴
        var wx = Math.max(a.flameDmg - b.flameRes, 0) + Math.max(a.frozenDmg - b.frozenRes, 0) + Math.max(a.venomDmg - b.venomRes, 0) + Math.max(a.electricDmg - b.electricRes, 0) + Math.max(a.blastDmg - b.blastRes, 0);
        //最终伤害=基础结算伤害+火系伤害+冰系伤害+毒系伤害+电系伤害+爆系伤害
        hurtValue = hurtValue + wx;
        if (!indexcfg.per) {
            indexcfg.per = 1;
        }
        var curHurt;
        // if (b.charType) {
        // 	curHurt = Math.max((hurtValue * indexcfg.per) >> 0, 1);
        // } else {
        curHurt = Math.max(((hurtValue * indexcfg.per) * (Math.random() * 0.1 + 0.95)) >> 0, 1);
        // }
        ret.attVal = curHurt; //攻击力打出的伤害，用于显示
        ret.dmgVal = curHurt; //此次伤害实际值
        ret = scene.setHurtState(a, ret, b);
        var pa = indexcfg.pa ? indexcfg.pa : 0; //攻击僵直强度
        //击退计算
        if ((pa >= b.pd) //攻击僵直强度较大
            && !b.immuneHSt && !scene.ignoreBreak) {
            //读取技能表中的a字段计算打断作用(可能某些清空需要计算？)
            ret.bt = indexcfg.bt;
            if (b.breakMask & 2) {
                if (ret.bt == 2 || ret.bt == 3) {
                    ret.bt = 1;
                }
            }
            if ((b.breakMask & 1) && ret.bt == 1) {
                ret.bt = 0;
            }
            var bx = indexcfg.bx != undefined ? indexcfg.bx : 0;
            if (ret.bt == 1) {
                ret.bx = a.faceDir * bx;
            }
            else if (ret.bt == 2) {
                ret.bx = a.faceDir * bx;
            }
            else if (ret.bt == 3) {
                var face = a.x < b.x ? 1 : -1;
                ret.bx = face * bx;
            }
            ret.by = indexcfg.by != undefined ? indexcfg.by : 0;
        }
        //麻痹计算
        ret.dizzTime = 0.;
        var dizzPercent = Math.min((a.dizz - b.antiDizz) / 10000, 0.5) * 0;
        if (scene.random.random() < dizzPercent) {
            ret.dizzTime = a.dizzTime;
        }
        ret.heff = 0;
        ret.hurtAct = 0;
        if (a.shenJianID > 0) {
            var shenjianCfg = Config.sword_216[a.shenJianID];
            ret.hurtAct = shenjianCfg.dz;
            ret.heff = shenjianCfg.tx; //打击特效
        }
        if (skill.cfg.hit > 0) {
            ret.hurtAct = skill.cfg.hit; //受击特殊动作 1火2冰3雷电4爆炸
            if (skill.type == Model_Skill.TYPE1 && ret.heff <= 0) {
                ret.heff = skill.cfg.heff; //打击特效
            }
            else if (skill.type != Model_Skill.TYPE1 && skill.cfg.heff > 0) {
                ret.heff = skill.cfg.heff; //打击特效
            }
        }
        return ret;
    };
    DamageProxyFullScene.prototype.effectCfg = function (hitcfg) {
        var boxArea = Box3D.getIns();
        var dispatcher = this.scene.getUnit(this.srcChar);
        var offx = hitcfg.offx != undefined ? hitcfg.offx : 50;
        var offy = hitcfg.offy != undefined ? hitcfg.offy : 0;
        var h1 = -800;
        var h = 1000;
        var xvalue = 1000;
        var yvalue = 500;
        if (true) {
            offx = dispatcher.faceDir * offx;
        }
        var dir = 1;
        boxArea.setDCXY(dir, offx + dispatcher.x, offy + dispatcher.y, dispatcher.h, -xvalue, -yvalue, h1, xvalue, yvalue, h);
        //SceneHitBox.create(boxArea,this.scene);
        var roles = this.scene.filterRole(Box3D.ROLE3DTESTEnemy, dispatcher, boxArea);
        for (var i = 0; i < roles.length; i++) {
            var role = roles[i];
            var ctx = DamageProxy.caculateDmg(dispatcher, role, this.srcSkill, this.scene, hitcfg);
            if (ctx) {
                if (dispatcher.charType == 2) {
                    role.takeSrcShaoZhuDmg(ctx);
                }
                else {
                    role.takeDmg(ctx);
                }
                if (ctx.bt == 1) {
                    ctx.hitback = true;
                }
                else if (ctx.bt == 2 || ctx.bt == 3) {
                    if (role.curhp > 0) {
                        role.throw(ctx.bx, ctx.by);
                    }
                }
            }
        }
        if (hitcfg.shake) {
            if (dispatcher) {
                dispatcher.scene.shake();
            }
        }
    };
    DamageProxyFullScene.prototype.effIDs = function () {
        for (var i = 0; i < this.serverDatas.length; i++) {
            var term = this.serverDatas[i];
            var role = this.scene.getUnit(term[0]);
            if (role) {
                var dmg = term[1];
                role.takeDmg({ dmgVal: dmg });
            }
        }
    };
    DamageProxyFullScene.DMGBUFFER = {};
    return DamageProxyFullScene;
}(DamageProxy));
__reflect(DamageProxyFullScene.prototype, "DamageProxyFullScene");
