var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossAI = (function () {
    function BossAI() {
        this.ai_state = 0;
        this.thinkInterv = 0;
        this.thinkTime = 0;
        this.autoRemove = 1;
    }
    BossAI.create = function () {
        return new BossAI();
    };
    BossAI.prototype.onAdd = function () {
    };
    BossAI.prototype.onRemove = function () {
    };
    BossAI.prototype.update = function (ctx) {
        var self = this;
        if (self.role.curhp <= 0) {
            return;
        }
        self.thinkTime += ctx.dt;
        if (self.role.attack_state) {
            return;
        }
        if (self.role.hurt_state || self.role.dizz_state) {
            return;
        }
        if (self.ai_state == 0) {
            if (self.thinkTime >= self.thinkInterv) {
                self.think();
                self.thinkTime = 0;
            }
        }
    };
    BossAI.prototype.think = function () {
        this.thinkAttack();
    };
    BossAI.prototype.thinkAttack = function () {
        var role = this.role;
        var skillList = role.skillList; //取出能够释放的技能
        var skillVo = SkillUtil.getWaitSkillVo(role);
        if (skillVo)
            skillList.push(skillVo);
        if (skillList.length) {
            var bestSkill;
            var len = skillList.length;
            for (var i = 0; i < len; i++) {
                var tempSkill = skillList[i];
                if (tempSkill.remaincd > 0) {
                    continue;
                }
                if (bestSkill) {
                    if (tempSkill.cfg.p > bestSkill.cfg.p) {
                        bestSkill = tempSkill;
                    }
                }
                else {
                    bestSkill = tempSkill;
                }
            }
            if (bestSkill) {
                var aicfg = bestSkill.cfg.ai;
                var skillAiMaxFarAbsx = aicfg.maxf != null ? aicfg.maxf : bestSkill.cfg.a.x;
                var skillAiMinFarAbsx = aicfg.minf != null ? aicfg.minf : 0;
                var skilly = aicfg.vert != null ? aicfg.vert : bestSkill.cfg.a.y;
                this.role.invalid |= 1;
                bestSkill.enterCool();
                var skillLogic = SkillBase.getPlayLogic(role, bestSkill);
                role.playSkill(skillLogic);
            }
        }
    };
    BossAI.prototype.onEvent = function (evt, arg) {
    };
    return BossAI;
}());
__reflect(BossAI.prototype, "BossAI");
