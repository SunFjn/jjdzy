var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonAICtrl = (function () {
    function CommonAICtrl() {
        this.ai_state = 0;
        this.thinkInterv = 0;
        this.thinkTime = 0;
        this.enemyid = 0;
        this.tarpx = 0;
        this.tarpy = 0;
        this.nx = 0;
        this.ny = 0;
        this.autoRemove = 1;
        this.lastTime = 0;
    }
    CommonAICtrl.create = function () {
        var ret = Pool.getItemByClass("CommonAICtrl", CommonAICtrl);
        return ret;
    };
    CommonAICtrl.prototype.onAdd = function () {
    };
    CommonAICtrl.prototype.onRemove = function () {
        var self = this;
        self.role = null;
        self.ai_state = 0;
        self.thinkInterv = 0;
        self.thinkTime = 0;
        self.enemyid = 0;
        self.tarpx = 0;
        self.tarpy = 0;
        self.nx = 0;
        self.ny = 0;
        self.autoRemove = 1;
        self.lastTime = 0;
        Pool.recover("CommonAICtrl", self);
    };
    CommonAICtrl.prototype.update = function (ctx) {
        var self = this;
        if (self.role.curhp <= 0) {
            return;
        }
        self.thinkTime += ctx.dt;
        if (GGlobal.pauseBattle || self.role.attack_state || self.role.hurt_state || self.role.dizz_state) {
            return;
        }
        if (self.role.isStand && self.role.standTime > 0) {
            var nowTime = egret.getTimer();
            self.role.standTime -= (nowTime - self.lastTime);
            self.lastTime = nowTime;
            return;
        }
        if (GGlobal.sceneType == SceneCtrl.GUANQIA && Model_player.voMine.sceneChar) {
            var xx = Math.abs(Model_player.voMine.sceneChar.x - self.role.x);
            var arr = JSON.parse(Config.xtcs_004[2021].other);
            if (self.role.standTime > 0 && xx >= arr[0][0] && xx <= arr[0][1]) {
                self.lastTime = egret.getTimer();
                self.role.isStand = true;
                self.ai_state = 0;
                self.role.move_state = 0;
                self.role.invalid |= 1;
            }
            else {
                if (self.ai_state == 0) {
                    if (self.thinkTime >= self.thinkInterv) {
                        self.think();
                        self.thinkTime = 0;
                    }
                }
                else if (self.ai_state == 1) {
                    if (!self.role.move_state && self.thinkTime >= self.thinkInterv) {
                        self.think();
                        self.thinkTime = 0;
                    }
                    else {
                        self.nearTarXY();
                    }
                }
            }
        }
        else {
            if (self.ai_state == 0) {
                if (self.thinkTime >= self.thinkInterv) {
                    self.think();
                    self.thinkTime = 0;
                }
            }
            else if (self.ai_state == 1) {
                if (!self.role.move_state && self.thinkTime >= self.thinkInterv) {
                    self.think();
                    self.thinkTime = 0;
                }
                else {
                    self.nearTarXY();
                }
            }
        }
    };
    CommonAICtrl.prototype.nearTarXY = function () {
        var tar = this.role.scene.getUnit(this.role.careEnemyID);
        if (tar) {
            this.nearPoint(tar.x, tar.y);
        }
        else {
            this.role.move_state = 0;
            this.role.invalid |= 1;
            this.ai_state = 0;
        }
    };
    CommonAICtrl.prototype.nearPoint = function (x, y) {
        var speedAbs = this.role.movespeed;
        var distx = x - this.role.x;
        if (distx >= 0) {
            var distxAbs = distx;
            var speedx = speedAbs;
        }
        else {
            var distxAbs = -distx;
            var speedx = -speedAbs;
        }
        if (distxAbs > this.nx) {
            this.role.scene.setRoleXY(this.role, this.role.x + speedx, this.role.y);
            this.role.faceX(x);
            return;
        }
        var disty = y - this.role.y;
        if (disty > 0) {
            var distyAbs = disty;
            var speedy = speedAbs;
        }
        else {
            var distyAbs = -disty;
            var speedy = -speedAbs;
        }
        if (distyAbs > this.ny) {
            this.role.scene.setRoleXY(this.role, this.role.x, this.role.y + speedy);
            return;
        }
        this.ai_state = 0;
        this.role.move_state = 0;
        this.role.invalid |= 1;
    };
    CommonAICtrl.prototype.think = function () {
        this.thinkAttack();
    };
    CommonAICtrl.prototype.thinkAttack = function () {
        var self = this;
        var role = self.role;
        var skillList = role.skillList; //???????????????????????????
        var enemy = role.scene.getBestRole(MapScene.NEARESTLIFEENEMYFUNC, role); //??????????????????????????????
        if (!enemy) {
            return;
        }
        self.role.careEnemyID = enemy.id;
        if (skillList.length) {
            var bestSkill = SkillUtil.getBestSkill(role);
            if (bestSkill) {
                // if (bestSkill.type == 1) {//????????????
                if (!enemy) {
                    return;
                }
                role.careEnemyID = enemy.id;
                var aicfg = bestSkill.cfg.ai;
                var skillAiMaxFarAbsx = aicfg.maxf != null ? aicfg.maxf : bestSkill.cfg.a.x;
                var skillAiMinFarAbsx = aicfg.minf != null ? aicfg.minf : 0;
                var skilly = aicfg.vert != null ? aicfg.vert : bestSkill.cfg.a.y;
                var distx = enemy.x - role.x;
                var disty = enemy.y - role.y;
                var dir = distx > 0 ? 1 : -1;
                var distxAbs = distx >= 0 ? distx : -distx;
                var distyAbs = disty >= 0 ? disty : -disty;
                self.nx = skillAiMaxFarAbsx;
                self.ny = skilly;
                if (skillAiMaxFarAbsx >= distxAbs && skilly >= distyAbs) {
                    self.ai_state = 0;
                    role.move_state = 0;
                    self.role.invalid |= 1;
                    if (bestSkill.type == Model_Skill.TYPE4) {
                        if (role.id == Model_player.voMine.id) {
                            var skillVo = Model_BaoWu.skillVo(0);
                            if (skillVo && skillVo.id == bestSkill.id) {
                                Model_player.voMine.skillcdList[2] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
                            }
                            else {
                                skillVo = Model_BaoWu.skillVo(1);
                                if (skillVo && skillVo.id == bestSkill.id)
                                    Model_player.voMine.skillcdList[1] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
                            }
                        }
                        else {
                            if (role.bwID1 == bestSkill.id) {
                                role.skillcdList[2] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
                            }
                            else if (role.bwID2 == bestSkill.id) {
                                role.skillcdList[1] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
                            }
                        }
                    }
                    else if (bestSkill.type == Model_Skill.TYPE5) {
                        if (role.id == Model_player.voMine.id) {
                            Model_player.voMine.skillcdList[0] = Config.xtcs_004[1072].num * 1000 - role.bwAndTSCD;
                        }
                        else {
                            role.skillcdList[0] = Config.xtcs_004[1072].num * 1000 - role.bwAndTSCD;
                        }
                    }
                    else {
                        bestSkill.enterCool();
                    }
                    var skillLogic = SkillBase.getPlayLogic(role, bestSkill);
                    role.faceX(enemy.x);
                    role.playSkill(skillLogic);
                }
                else {
                    if (distxAbs >= skillAiMaxFarAbsx) {
                        self.tarpx = enemy.x + skillAiMaxFarAbsx * -dir;
                    }
                    else if (distxAbs <= skillAiMinFarAbsx) {
                        self.tarpx = enemy.x + skillAiMinFarAbsx * -dir;
                    }
                    else {
                        self.tarpx = role.x;
                    }
                    var rndy = -skilly + (Math.random() * skilly * 2);
                    self.tarpy = enemy.y + rndy;
                    self.ai_state = 1;
                    role.move_state = 1;
                    role.invalid |= 1;
                }
            }
            // }
        }
    };
    CommonAICtrl.prototype.onEvent = function (evt, arg) {
    };
    return CommonAICtrl;
}());
__reflect(CommonAICtrl.prototype, "CommonAICtrl");
