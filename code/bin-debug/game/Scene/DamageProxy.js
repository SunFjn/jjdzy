var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DamageProxy = (function () {
    function DamageProxy() {
    }
    DamageProxy.createByClient = function (skill, srcChar, scene) {
        var ret = Pool.getItemByClass("DamageProxy", DamageProxy);
        ret.sType = 1;
        ret.srcSkill = skill;
        ret.srcChar = srcChar;
        ret.scene = scene;
        ret.power = skill.power_lv;
        ret.powerType = 1;
        return ret;
    };
    //此类并没有做严谨的回收，附加于skillbase，重复引用即可
    DamageProxy.prototype.executeNewTask = function (skill, srcChar, scene) {
        var ret = this;
        ret.sType = 1;
        ret.srcSkill = skill;
        ret.srcChar = srcChar;
        ret.scene = scene;
        ret.power = skill.power_lv;
        ret.powerType = 1;
        return ret;
    };
    DamageProxy.prototype.effect = function (times) {
        if (times === void 0) { times = 0; }
        var self = this;
        if (self.sType == 1) {
            var cfg = self.srcSkill.cfg.a[times];
            self.effectCfg(cfg);
            if (cfg.s && self.srcChar && self.srcChar.id == Model_player.voMine.id) {
                SoundManager.getInstance().playEff(cfg.s);
            }
        }
        else if (this.sType == 0) {
            this.effIDs();
        }
    };
    DamageProxy.caculateDmg = function (a, b, skill, scene, indexcfg) {
        if (b.immuneDmg || b.invincible) {
            return null;
        }
        var ret = DamageProxy.DMGBUFFER;
        ret.bt = null;
        if (!indexcfg) {
            ViewCommonWarn.text("技能打击配置错误[index=" + skill.id + "]");
            return;
        }
        var aAttDic = {};
        var bAttDic = {};
        for (var key in Enum_Attr.roleAttributes) {
            if (parseInt(key) != 102) {
                aAttDic[Enum_Attr.roleAttributes[key]] = a[Enum_Attr.roleAttributes[key]];
                bAttDic[Enum_Attr.roleAttributes[key]] = b[Enum_Attr.roleAttributes[key]];
            }
        }
        var hasBuff = false;
        for (var key in a.buffData) {
            var buffcfg = a.buffData[key].cfg;
            if (buffcfg.type == 1 || buffcfg.type == 4) {
                var attArr = JSON.parse(buffcfg.xiaoguo);
                var czArr = JSON.parse(buffcfg.cz);
                for (var j = 0; j < attArr.length; j++) {
                    var attPer = (attArr[j][1] + czArr[j][1] * a.buffData[key].buffLv) / 100000;
                    var perType = Enum_Attr.roleAttPer[attArr[j][0]] ? Enum_Attr.roleAttPer[attArr[j][0]] : attArr[j][0];
                    if (Enum_Attr.roleAttPer[attArr[j][0]]) {
                        aAttDic[Enum_Attr.roleAttributes[perType]] += aAttDic[Enum_Attr.roleAttributes[perType]] * attPer;
                    }
                    else {
                        aAttDic[Enum_Attr.roleAttributes[perType]] += attPer;
                    }
                    hasBuff = true;
                }
            }
        }
        for (var key in b.buffData) {
            var buffcfg = b.buffData[key].cfg;
            if (buffcfg.type == 1 || buffcfg.type == 4) {
                var attArr = JSON.parse(buffcfg.xiaoguo);
                var czArr = JSON.parse(buffcfg.cz);
                for (var j = 0; j < attArr.length; j++) {
                    var attPer = (attArr[j][1] + czArr[j][1] * b.buffData[key].buffLv) / 100000;
                    var perType = Enum_Attr.roleAttPer[attArr[j][0]] ? Enum_Attr.roleAttPer[attArr[j][0]] : attArr[j][0];
                    if (Enum_Attr.roleAttPer[attArr[j][0]]) {
                        bAttDic[Enum_Attr.roleAttributes[perType]] += bAttDic[Enum_Attr.roleAttributes[perType]] * attPer;
                    }
                    else {
                        bAttDic[Enum_Attr.roleAttributes[perType]] += attPer;
                    }
                    hasBuff = true;
                }
            }
        }
        //1+(A命中-D闪避)/（A命中+D闪避+命中/闪避常数[20000]）+A命中率-D闪避率
        var hitrate = (1 + (aAttDic["hit"] - bAttDic["dodge"]) / (aAttDic["hit"] + bAttDic["dodge"] + Math.floor(Config.changshu_101[7].num / 100)) + aAttDic["hitRate"] - bAttDic["dodgeRate"]);
        var randomRate = scene.random.random();
        if (hitrate < randomRate) {
            ret.attVal = 0;
            ret.dmgVal = 0;
            ret.isHit = false;
            return ret;
        }
        else {
            ret.isHit = true;
        }
        var skillPowerPer = skill.powerAtt_lv / 100000;
        //基础伤害=max（A攻击*A技能伤害倍数+A技能附加伤害-D防御，A攻击*0.1）
        var basehurt = Math.max(aAttDic["att"] * skillPowerPer + skill.power_lv - (bAttDic["def"] - b.reduceDef), aAttDic["att"] * 0.1);
        if (a.charType == 1 && skill.type == Model_Skill.TYPE2) {
            if (b.charType == 1) {
                basehurt = basehurt * (1 + aAttDic["skillDmgPer"] - bAttDic["enemySkillD"]);
            }
            else {
                basehurt = basehurt * (1 + aAttDic["skillDmgPer"]);
            }
        }
        else if (a.charType == 2) {
            basehurt = basehurt * (1 + aAttDic["szSkillDmgPer"]);
        }
        //暴击概率=0.05+(A暴击-D抗暴)/（A暴击+D抗暴+暴击/抗暴常数[20000]）+A暴击率-D抗暴率
        var critPerc = 0.05 + (aAttDic["crit"] - bAttDic["resCrit"]) / (aAttDic["crit"] + bAttDic["resCrit"] + Math.floor(Config.changshu_101[6].num / 100)) + aAttDic["critRate"] - bAttDic["resCritRate"]; //暴击率
        if (critPerc > scene.random.random() || aAttDic["beCrit"] > 0) {
            ret.isCrit = true;
        }
        else {
            ret.isCrit = false;
        }
        var hurtValue;
        if (ret.isCrit) {
            hurtValue = basehurt * (1.5 + aAttDic["critDmgAdd"] - bAttDic["critDmgReduce"]);
        }
        else {
            hurtValue = basehurt;
        }
        var dmgReduce = 0;
        var dmgAdd = 0;
        var cfgnum = SkillUtil.getDmgConst();
        var cfg = Config.changshu_101;
        if (a.id == Model_player.voMine.id && b.charType == 0) {
            if (b.str >= a.str + Math.min(a.str * cfgnum[1005], cfg[1105].num)) {
                dmgReduce = cfgnum[1305];
            }
            else if (b.str >= a.str + Math.min(a.str * cfgnum[1004], cfg[1104].num)) {
                dmgReduce = cfgnum[1304];
            }
            else if (b.str >= a.str + Math.min(a.str * cfgnum[1003], cfg[1103].num)) {
                dmgReduce = cfgnum[1303];
            }
            else if (b.str >= a.str + Math.min(a.str * cfgnum[1002], cfg[1102].num)) {
                dmgReduce = cfgnum[1302];
            }
            else if (b.str >= a.str + Math.min(a.str * cfgnum[1001], cfg[1101].num)) {
                dmgReduce = cfgnum[1301];
            }
        }
        else if (b.id == Model_player.voMine.id && a.charType == 0) {
            if (a.str >= b.str + Math.min(b.str * cfgnum[1005], cfg[1105].num)) {
                dmgAdd = cfgnum[1205];
            }
            else if (a.str >= b.str + Math.min(b.str * cfgnum[1004], cfg[1104].num)) {
                dmgAdd = cfgnum[1204];
            }
            else if (a.str >= b.str + Math.min(b.str * cfgnum[1003], cfg[1103].num)) {
                dmgAdd = cfgnum[1203];
            }
            else if (a.str >= b.str + Math.min(b.str * cfgnum[1002], cfg[1102].num)) {
                dmgAdd = cfgnum[1202];
            }
            else if (a.str >= b.str + Math.min(b.str * cfgnum[1001], cfg[1101].num)) {
                dmgAdd = cfgnum[1201];
            }
        }
        else if (a.id == Model_player.voMine.id && b.charType == 1) {
            if (b.str >= a.str + Math.min(a.str * cfgnum[3006], cfg[3106].num)) {
                dmgReduce = cfgnum[3306];
            }
            else if (b.str >= a.str + Math.min(a.str * cfgnum[3005], cfg[3105].num)) {
                dmgReduce = cfgnum[3305];
            }
            else if (b.str >= a.str + Math.min(a.str * cfgnum[3004], cfg[3104].num)) {
                dmgReduce = cfgnum[3304];
            }
            else if (b.str >= a.str + Math.min(a.str * cfgnum[3003], cfg[3103].num)) {
                dmgReduce = cfgnum[3303];
            }
            else if (b.str >= a.str + Math.min(a.str * cfgnum[3002], cfg[3102].num)) {
                dmgReduce = cfgnum[3302];
            }
            else if (b.str >= a.str + Math.min(a.str * cfgnum[3001], cfg[3101].num)) {
                dmgReduce = cfgnum[3301];
            }
        }
        else if (b.id == Model_player.voMine.id && a.charType == 1) {
            if (b.str >= a.str + Math.min(a.str * cfgnum[3006], cfg[3106].num)) {
                dmgReduce = cfgnum[3206];
            }
            else if (a.str >= b.str + Math.min(b.str * cfgnum[3005], cfg[3105].num)) {
                dmgAdd = cfgnum[3205];
            }
            else if (a.str >= b.str + Math.min(b.str * cfgnum[3004], cfg[3104].num)) {
                dmgAdd = cfgnum[3204];
            }
            else if (a.str >= b.str + Math.min(b.str * cfgnum[3003], cfg[3103].num)) {
                dmgAdd = cfgnum[3203];
            }
            else if (a.str >= b.str + Math.min(b.str * cfgnum[3002], cfg[3102].num)) {
                dmgAdd = cfgnum[3202];
            }
            else if (a.str >= b.str + Math.min(b.str * cfgnum[3001], cfg[3101].num)) {
                dmgAdd = cfgnum[3201];
            }
        }
        //基础结算伤害=上阶段伤害*（1+A伤害加成-D伤害减免）+A真实伤害
        hurtValue = hurtValue * Math.max((1 + aAttDic["dmgAdd"] + dmgAdd - (bAttDic["dmgReduce"] + dmgReduce)), 0.05) + aAttDic["realDmg"];
        //角色结算伤害=基础结算伤害*(1+Apvp伤害-Dpvp伤免)
        if (a.charType == 1 && b.charType == 1) {
            hurtValue = hurtValue * Math.max((1 + aAttDic["pvpAddHurt"] - bAttDic["pvpMinuteHurt"]), 0);
        }
        else if (b.charType == 0) {
            hurtValue = hurtValue * Math.max((1 + aAttDic["pveAddHurt"]), 0);
        }
        else if (a.charType == 0) {
            hurtValue = hurtValue * Math.max((1 - bAttDic["pveMinuteHurt"]), 0);
        }
        //五行伤害计算 火 冰 毒 电 暴
        //五行伤害=max（（A火焰伤害+A冰冻伤害+A爆炸伤害+A毒液伤害+A雷电伤害+A攻击*A五行伤害转化）-（D火焰抗性+D冰冻抗性+D爆炸抗性+D毒液抗性+D雷电抗性+D攻击*D五行抗性转化），0）
        var wx = Math.max((a.flameDmg + a.frozenDmg + a.venomDmg + a.electricDmg + a.blastDmg + a.att * a.wxAddHurt) -
            (b.flameRes + b.frozenRes + b.venomRes + b.electricRes + b.blastRes + b.att * b.wxMinuteHurt), 0);
        hurtValue = hurtValue + wx;
        if (!indexcfg.per) {
            indexcfg.per = 1;
        }
        var curHurt;
        // if (b.charType) {
        // 	curHurt = Math.max((hurtValue * indexcfg.per) >> 0, 1);
        // } else {
        //最终伤害=min((基础结算伤害+五行伤害),角色生命值的50%)*rand(0.95,1.05)
        curHurt = Math.max(Math.floor(Math.min((hurtValue * indexcfg.per), b.maxhp * 0.5) * (Math.random() * 0.1 + 0.95)), 1);
        // }
        if (aAttDic["lianjiDmg"] > 0) {
            ret.isLianJi = true;
            curHurt = curHurt + Math.floor(curHurt * Number(aAttDic["lianjiDmg"]));
        }
        else {
            ret.isLianJi = false;
        }
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
        // if (hasBuff) {
        // 	console.log("有buff技能名称" + skill.name + "技能伤害+" + curHurt);
        // } else {
        // 	console.log("技能名称" + skill.name + "技能伤害+" + curHurt);
        // }
        return ret;
    };
    DamageProxy.prototype.effectCfg = function (hitcfg) {
        var s = this;
        if (Model_battle.battleId > 0 && s.srcChar.id == Model_player.voMine.id) {
            s.effectServerCfg(hitcfg);
            return;
        }
        var boxArea = Box3D.getIns();
        var dispatcher = s.srcChar;
        if (!dispatcher)
            return;
        var offx = hitcfg.offx != undefined ? hitcfg.offx : 50;
        var offy = hitcfg.offy != undefined ? hitcfg.offy : 0;
        var h1 = hitcfg.h1 != undefined ? hitcfg.h1 : -80;
        var h = hitcfg.h != undefined ? hitcfg.h : 100;
        var xvalue = hitcfg.x != undefined ? hitcfg.x : 100;
        var yvalue = hitcfg.y != undefined ? hitcfg.y : 50;
        if (true) {
            offx = dispatcher.faceDir * offx;
        }
        var dir = 1;
        boxArea.setDCXY(dir, offx + dispatcher.x, offy + dispatcher.y, dispatcher.h, -xvalue, -yvalue, h1, xvalue, yvalue, h);
        SceneHitBox.create(boxArea, s.scene);
        var roles = s.scene.filterRole(Box3D.ROLE3DTESTEnemy, dispatcher, boxArea);
        for (var i = 0; i < roles.length; i++) {
            var role = roles[i];
            var ctx;
            if (s.srcSkill.type == Model_Skill.TYPE7) {
                var dmgVal = Math.floor(dispatcher.maxhp * dispatcher.hpBlast);
                ctx = s.scene.setHurtState(dispatcher, {}, role);
                ctx.attVal = dmgVal;
                ctx.dmgVal = dmgVal;
                ctx.isHit = true;
                ctx.isCrit = false;
                ctx.hurtAct = s.srcSkill.cfg.hit;
                ctx.heff = s.srcSkill.cfg.heff; //打击特效
                ctx.isHpBlast = true;
            }
            else {
                ctx = DamageProxy.caculateDmg(dispatcher, role, s.srcSkill, this.scene, hitcfg);
                if (ctx)
                    ctx.isHpBlast = false;
            }
            if (ctx) {
                dispatcher.lianjiNum++;
                if (dispatcher.id == Model_player.voMine.id) {
                    if (GGlobal.layerMgr.isOpenView(UIConst.LIANJI)) {
                        GGlobal.control.notify(Enum_MsgType.LIANJI_UPDATE);
                    }
                    else {
                        GGlobal.layerMgr.open(UIConst.LIANJI);
                    }
                }
                if (dispatcher.charType == 2) {
                    role.takeSrcShaoZhuDmg(ctx);
                }
                else {
                    role.takeDmg(ctx);
                }
                if (ctx.bt == 1) {
                    ctx.hitback = true;
                    if (role.curhp > 0) {
                        role.lianjiNum = 0;
                        if (role.id == Model_player.voMine.id) {
                            GGlobal.layerMgr.close2(UIConst.LIANJI);
                            GGlobal.control.notify(Enum_MsgType.LIANJI_UPDATE);
                        }
                        role.backoff(ctx.bx, ctx.by);
                    }
                }
                else if (ctx.bt == 2 || ctx.bt == 3) {
                    if (role.curhp > 0) {
                        role.lianjiNum = 0;
                        if (role.id == Model_player.voMine.id) {
                            GGlobal.layerMgr.close2(UIConst.LIANJI);
                            GGlobal.control.notify(Enum_MsgType.LIANJI_UPDATE);
                        }
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
    /**加怒 */
    DamageProxy.prototype.addRage = function (hitcfg) {
        var dispatcher = this.srcChar;
        var ctx = DamageProxy.caculateRage(dispatcher, this.srcSkill, hitcfg);
        dispatcher.rage += ctx.rage;
        if (dispatcher.rage >= Config.changshu_101[3].num / 100)
            dispatcher.rage = Config.changshu_101[3].num / 100;
        if (hitcfg.shake) {
            if (dispatcher) {
                dispatcher.scene.shake();
            }
        }
        GGlobal.control.notify(Enum_MsgType.ROLE_RAGE_UPDATE);
    };
    DamageProxy.caculateRage = function (a, skill, indexcfg) {
        var ret = DamageProxy.DMGBUFFER;
        //回怒=最大怒气值*%+固定值
        var max = Config.changshu_101[3].num / 100 * skill.powerAtt_lv / 100000 + skill.power_lv;
        ret.rage = skill.power_lv;
        return ret;
    };
    /**回血 */
    DamageProxy.prototype.use_cure = function (hitcfg) {
        var dispatcher = this.srcChar;
        var ctx = DamageProxy.caculateCure(dispatcher, this.srcSkill, hitcfg);
        dispatcher.takeCure(ctx);
        if (hitcfg.shake) {
            if (dispatcher) {
                dispatcher.scene.shake();
            }
        }
    };
    /**减防 */
    DamageProxy.prototype.reduce_def = function (hitcfg) {
        var dispatcher = this.srcChar;
        var scene = this.scene;
        var list = scene.list;
        var len = scene.list.length;
        for (var i = 0; i < len; i++) {
            var term = scene.list[i];
            if (term.objType == 1 && term.force && dispatcher.force != term.force) {
                var ctx = DamageProxy.caculateDef(term, this.srcSkill, hitcfg);
                term.takeReduceDef(ctx);
            }
        }
        if (hitcfg.shake) {
            if (dispatcher) {
                dispatcher.scene.shake();
            }
        }
    };
    //回血技能
    DamageProxy.caculateCure = function (a, skill, indexcfg) {
        var ret = {};
        //回血=自身血量*%+固定值
        ret.cure = a.maxhp * skill.powerAtt_lv / 100000 + skill.power_lv;
        if (skill.type == Model_Skill.TYPE4) {
            console.log("当前回复气血：" + ret.cure + "气血回复加成：" + (ret.cure * a.bwCurePre));
            ret.cure += ret.cure * a.bwCurePre;
        }
        return ret;
    };
    //减低防御
    DamageProxy.caculateDef = function (a, skill, indexcfg) {
        var ret = {};
        //减防=目标防御*%+固定值
        ret.def = a.def * skill.powerAtt_lv / 100000 + skill.power_lv;
        if (ret.def >= a.def) {
            ret.def = a.def;
        }
        ret.defTime = indexcfg.defTime;
        return ret;
    };
    /**2眩晕 1定身 */
    DamageProxy.prototype.setDizz = function (hitcfg, state) {
        var dispatcher = this.srcChar;
        var scene = this.scene;
        var list = scene.list;
        var len = scene.list.length;
        for (var i = 0; i < len; i++) {
            var term = scene.list[i];
            if (term && term.objType == 1 && term.force && dispatcher.force != term.force) {
                var ctx = DamageProxy.caculateDizz(term, this.srcSkill, hitcfg);
                term.setDizz(ctx.dizzTime, state);
            }
        }
    };
    DamageProxy.caculateDizz = function (a, skill, indexcfg) {
        var ret = {};
        //眩晕/定身值=技能威力值+固定值
        var max = skill.power_lv - a.dizzCD;
        ret.dizzTime = max;
        console.log("当前的定身时间：" + max + "天赋减免时间：" + a.dizzCD);
        return ret;
    };
    /**无敌*/
    DamageProxy.prototype.setInvincible = function () {
        var dispatcher = this.srcChar;
        var ctx = DamageProxy.caculateInvincible(dispatcher, this.srcSkill);
        dispatcher.invincibleState(ctx.invincibleTime);
    };
    DamageProxy.caculateInvincible = function (a, skill) {
        var ret = {};
        //眩晕/定身值=技能威力值+固定值
        var invincibleTime = skill.power_lv;
        ret.invincibleTime = invincibleTime;
        return ret;
    };
    /**变身 */
    DamageProxy.prototype.setChangeModel = function (hitcfg) {
        var dispatcher = this.srcChar;
        var scene = this.scene;
        var list = scene.list;
        var len = scene.list.length;
        for (var i = 0; i < len; i++) {
            var term = scene.list[i];
            if (term && term.objType == 1 && term.force && dispatcher.force != term.force) {
                var ctx = DamageProxy.caculateChangeModel(term, this.srcSkill, hitcfg);
                term.setChangeModel(ctx.changeTime, 3, hitcfg.mod);
            }
        }
    };
    DamageProxy.caculateChangeModel = function (a, skill, indexcfg) {
        var ret = {};
        //眩晕/定身值=技能威力值+固定值
        var max = skill.power_lv - a.dizzCD;
        ret.changeTime = max;
        console.log("当前的变身时间：" + max + "天赋减免时间：" + a.dizzCD);
        return ret;
    };
    DamageProxy.prototype.effIDs = function () {
        for (var i = 0; i < this.serverDatas.length; i++) {
            var term = this.serverDatas[i];
            var role = this.scene.getUnit(term[0]);
            if (role) {
                var dmg = term[1];
                role.takeDmg({ dmgVal: dmg });
            }
        }
    };
    DamageProxy.prototype.effectServerCfg = function (hitcfg) {
        var s = this;
        var boxArea = Box3D.getIns();
        var dispatcher = this.srcChar;
        if (!dispatcher)
            return;
        var offx = hitcfg.offx != undefined ? hitcfg.offx : 50;
        var offy = hitcfg.offy != undefined ? hitcfg.offy : 0;
        var h1 = hitcfg.h1 != undefined ? hitcfg.h1 : -80;
        var h = hitcfg.h != undefined ? hitcfg.h : 100;
        var xvalue = hitcfg.x != undefined ? hitcfg.x : 100;
        var yvalue = hitcfg.y != undefined ? hitcfg.y : 50;
        if (true) {
            offx = dispatcher.faceDir * offx;
        }
        var dir = 1;
        boxArea.setDCXY(dir, offx + dispatcher.x, offy + dispatcher.y, dispatcher.h, -xvalue, -yvalue, h1, xvalue, yvalue, h);
        SceneHitBox.create(boxArea, this.scene);
        var roles = this.scene.filterRole(Box3D.ROLE3DTESTEnemy, dispatcher, boxArea);
        var arr = [];
        for (var i = 0; i < roles.length; i++) {
            var role = roles[i];
            var ctx;
            if (s.srcSkill.type == Model_Skill.TYPE7) {
                var dmgVal = Math.floor(dispatcher.maxhp * dispatcher.hpBlast);
                ctx = s.scene.setHurtState(dispatcher, {}, role);
                ctx.attVal = dmgVal;
                ctx.dmgVal = dmgVal;
                ctx.isHit = true;
                ctx.isCrit = false;
                ctx.hurtAct = s.srcSkill.cfg.hit;
                ctx.heff = s.srcSkill.cfg.heff; //打击特效
                ctx.isHpBlast = true;
            }
            else {
                ctx = DamageProxy.caculateDmg(dispatcher, role, this.srcSkill, this.scene, hitcfg);
                if (ctx)
                    ctx.isHpBlast = false;
            }
            if (role.curSkill && role.curSkill.skill && (role.curSkill.skill.type == Model_Skill.TYPE3 || role.curSkill.skill.type == Model_Skill.TYPE4
                || role.curSkill.skill.type == Model_Skill.TYPE5)) {
            }
            else {
                var index = 0;
                if (dispatcher.charType == 2) {
                    for (var j = 0; j < Model_battle.hurtRoleArr1.length; j++) {
                        if (roles[i].id == Model_battle.hurtRoleArr1[j].id) {
                            index++;
                            break;
                        }
                    }
                    if (index == 0 && (!(role.immuneDmg || role.invincible) || (ctx && ctx.isHpBlast))) {
                        arr.push(roles[i]);
                    }
                }
                else {
                    for (var j = 0; j < Model_battle.hurtRoleArr.length; j++) {
                        if (roles[i].id == Model_battle.hurtRoleArr[j].id) {
                            index++;
                            break;
                        }
                    }
                    if (index == 0 && (!(role.immuneDmg || role.invincible) || (ctx && ctx.isHpBlast))) {
                        arr.push(roles[i]);
                    }
                }
            }
            if (ctx) {
                if (dispatcher.charType == 2) {
                    role.takeSrcShaoZhuDmg(ctx);
                }
                else {
                    role.takeDmg(ctx);
                }
                if (ctx.bt == 1) {
                    ctx.hitback = true;
                    if (role.curhp > 0) {
                        role.backoff(ctx.bx, ctx.by);
                    }
                }
                else if (ctx.bt == 2 || ctx.bt == 3) {
                    if (role.curhp > 0) {
                        role.throw(ctx.bx, ctx.by);
                    }
                }
            }
        }
        if (arr.length > 0) {
            Model_battle.hurtRoleArr = Model_battle.hurtRoleArr.concat(arr);
            GGlobal.modelbattle.CG_BATTLE_BEATENEMY(this.srcSkill.id, arr);
        }
        if (hitcfg.shake) {
            if (dispatcher) {
                dispatcher.scene.shake();
            }
        }
    };
    /**是否暴击，1：是，0 */
    DamageProxy.serverCaculateDmg = function (a, b, skill, scene, indexcfg, hurtValue, isCrit) {
        if (b.immuneDmg || b.invincible) {
            return null;
        }
        var ret = DamageProxy.DMGBUFFER;
        ret.bt = null;
        hurtValue = hurtValue + wx;
        if (!indexcfg.per) {
            indexcfg.per = 1;
        }
        var curHurt;
        curHurt = Math.max(hurtValue * indexcfg.per);
        ret.attVal = curHurt; //攻击力打出的伤害，用于显示
        ret.dmgVal = curHurt; //此次伤害实际值
        ret.isCrit = isCrit == 1;
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
    DamageProxy.DMGBUFFER = {};
    return DamageProxy;
}());
__reflect(DamageProxy.prototype, "DamageProxy");
