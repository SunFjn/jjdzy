var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuanQiaAI = (function () {
    function GuanQiaAI() {
    }
    GuanQiaAI.keepPos = function (vo) {
        var ret = true;
        var xx = null;
        var role = vo.sceneChar;
        if (role.scene && role.curhp > 0) {
            if (xx == null) {
                xx = role.x;
            }
            if (role.attack_state || role.hurt_state || role.dizz_state) {
                ret = false;
            }
            else {
                var roleret = GuanQiaAI.nearPointDir(role, xx, 598);
                if (roleret) {
                    role.setDir(1);
                }
                else {
                    ret = roleret;
                }
            }
        }
        return ret;
    };
    GuanQiaAI.thinkShaoZhuAttack = function (role, ctx, searchFun, thisArg, skillTestFunc) {
        if (searchFun === void 0) { searchFun = null; }
        if (thisArg === void 0) { thisArg = null; }
        if (skillTestFunc === void 0) { skillTestFunc = null; }
        if (!searchFun) {
            searchFun = MapScene.NEARESTENEMYFUNC;
        }
        if (role.curhp <= 0) {
            return;
        }
        role.thinkTime += ctx.dt;
        if (role.attack_state) {
            return;
        }
        if (role.hurt_state || role.dizz_state) {
            return;
        }
        var self = GuanQiaAI;
        var skillCDIndex = 0;
        for (var i = 0; i < role.skillList.length; i++) {
            if (role.skillList[i].remaincd <= 0)
                skillCDIndex++;
        }
        if (skillCDIndex == 0) {
            var tar = role.scene.getUnit(role.masterID);
            // if (tar && ((tar.x - role.x > 50 && tar.faceDir == 1) || (role.x - tar.x > 50 && tar.faceDir == -1))) {
            self.nearMasterPoint(role, tar.x, tar.y);
            // } else {
            // 	role.ai_state = 0;
            // 	role.move_state = 0;
            // 	role.invalid |= 1;
            // }
        }
        else {
            if (role.ai_state == 0) {
                if (role.thinkTime >= role.thinkInterv) {
                    self.testSkillAttack(role, searchFun, thisArg, skillTestFunc);
                    role.thinkTime = 0;
                }
            }
            else if (role.ai_state == 1) {
                if (!role.move_state && role.thinkTime >= role.thinkInterv) {
                    self.testSkillAttack(role, searchFun, thisArg, skillTestFunc);
                    role.thinkTime = 0;
                }
                else {
                    self.nearTarXY(role);
                }
            }
        }
    };
    GuanQiaAI.thinkAttack = function (role, ctx, searchFun, thisArg, skillTestFunc) {
        if (searchFun === void 0) { searchFun = null; }
        if (thisArg === void 0) { thisArg = null; }
        if (skillTestFunc === void 0) { skillTestFunc = null; }
        if (!role) {
            if (true) {
                DEBUGWARING.log("AI ERROR");
            }
            return;
        }
        if (!searchFun) {
            searchFun = MapScene.NEARESTENEMYFUNC;
        }
        if (role.curhp <= 0 || GGlobal.pauseBattle) {
            return;
        }
        if (role.shaoZhuChar) {
            GuanQiaAI.thinkShaoZhuAttack(role.shaoZhuChar, ctx, searchFun, thisArg, skillTestFunc);
        }
        role.thinkTime += ctx.dt;
        if (role.attack_state) {
            return;
        }
        if (role.hurt_state || role.dizz_state) {
            return;
        }
        var self = GuanQiaAI;
        if (role.ai_state == 0) {
            if (role.thinkTime >= role.thinkInterv) {
                self.testSkillAttack(role, searchFun, thisArg, skillTestFunc);
                role.thinkTime = 0;
            }
        }
        else if (role.ai_state == 1) {
            if (!role.move_state && role.thinkTime >= role.thinkInterv) {
                self.testSkillAttack(role, searchFun, thisArg, skillTestFunc);
                role.thinkTime = 0;
            }
            else {
                self.nearTarXY(role);
            }
        }
    };
    GuanQiaAI.nearTarXY = function (role) {
        var tar = role.scene.getUnit(role.careEnemyID);
        var self = GuanQiaAI;
        if (tar) {
            self.nearPoint(role, tar.x, tar.y);
        }
        else {
            role.move_state = 0;
            role.invalid |= 1;
            role.ai_state = 0;
        }
    };
    GuanQiaAI.nearPoint = function (role, x, y) {
        var speedAbs = role.movespeed;
        var distx = x - role.x;
        if (distx >= 0) {
            var distxAbs = distx;
            var speedx = speedAbs;
        }
        else {
            var distxAbs = -distx;
            var speedx = -speedAbs;
        }
        if (distxAbs > role.nx) {
            role.scene.setRoleXY(role, role.x + speedx, role.y);
            role.faceX(x);
            return;
        }
        var disty = y - role.y;
        if (disty > 0) {
            var distyAbs = disty;
            var speedy = speedAbs;
        }
        else {
            var distyAbs = -disty;
            var speedy = -speedAbs;
        }
        if (distyAbs > role.ny) {
            role.scene.setRoleXY(role, role.x, role.y + speedy);
            return;
        }
        role.ai_state = 0;
        role.move_state = 0;
        role.invalid |= 1;
    };
    GuanQiaAI.nearMasterPoint = function (role, x, y) {
        var speedAbs = role.movespeed;
        var distx = x - role.x;
        if (distx >= 0) {
            var distxAbs = distx;
            var speedx = speedAbs;
        }
        else {
            var distxAbs = -distx;
            var speedx = -speedAbs;
        }
        if (distxAbs > GuanQiaAI.nx) {
            GuanQiaAI.nx = 130;
            role.ai_state = 0;
            role.move_state = 1;
            role.invalid |= 1;
            role.scene.setRoleXY(role, role.x + speedx, role.y);
            role.faceX(x);
            return;
        }
        var disty = y - role.y;
        if (disty > 0) {
            var distyAbs = disty;
            var speedy = speedAbs;
        }
        else {
            var distyAbs = -disty;
            var speedy = -speedAbs;
        }
        if (distyAbs > role.ny) {
            role.scene.setRoleXY(role, role.x, role.y + speedy);
            return;
        }
        GuanQiaAI.nx = 180;
        role.ai_state = 0;
        role.move_state = 0;
        role.invalid |= 1;
    };
    //径直走位某点
    GuanQiaAI.nearPointDir = function (role, x, y) {
        var subx = x - role.x;
        var suby = y - role.y;
        var dist = Math.sqrt(subx * subx + suby * suby);
        if (role.movespeed * 1.1 >= dist) {
            role.x = x;
            role.y = y;
            if (role.move_state != 0) {
                role.move_state = 0;
                role.invalid |= 1;
            }
            return true; //成功接近点
        }
        role.faceX(x);
        var angle = Math.atan2(suby, subx);
        var mx = Math.cos(angle) * role.movespeed;
        var my = Math.sin(angle) * role.movespeed;
        role.x += mx;
        role.y += my;
        if (role.move_state != 1) {
            role.move_state = 1;
            role.invalid |= 1;
        }
        return false;
    };
    GuanQiaAI.testSkillAttack = function (role, searchFun, thisArg, skillTestFunc) {
        if (thisArg === void 0) { thisArg = null; }
        if (!role.scene || role.curSkill) {
            return;
        }
        var skillList = role.skillList; //取出能够释放的技能
        // var enemy: SceneCharRole = role.scene.getUnit(role.careEnemyID);
        // if (!enemy || enemy.curhp <= 0) {
        var enemy = role.scene.getBestRole(searchFun, role, null, thisArg); //根据算法取出一个敌人
        // }
        if (!enemy) {
            return;
        }
        role.careEnemyID = enemy.id;
        var voMine = Model_player.voMine;
        if (skillList.length) {
            var bestSkill = SkillUtil.getBestSkill(role, skillTestFunc);
            if (bestSkill) {
                var aicfg = bestSkill.cfg.ai;
                var skillAiMaxFarAbsx = aicfg.maxf != null ? aicfg.maxf : bestSkill.cfg.a.x;
                var skillAiMinFarAbsx = aicfg.minf != null ? aicfg.minf : 0;
                var skilly = aicfg.vert != null ? aicfg.vert : bestSkill.cfg.a.y;
                var distx = enemy.x - role.x;
                var disty = enemy.y - role.y;
                var dir = distx > 0 ? 1 : -1;
                var distxAbs = distx >= 0 ? distx : -distx;
                var distyAbs = disty >= 0 ? disty : -disty;
                role.nx = skillAiMaxFarAbsx;
                role.ny = skilly;
                if (skillAiMaxFarAbsx >= distxAbs && skilly >= distyAbs) {
                    role.ai_state = 0;
                    role.move_state = 0;
                    role.invalid |= 1;
                    if (bestSkill.type == Model_Skill.TYPE4) {
                        if (role.id == Model_player.voMine.id) {
                            var skillVo = Model_BaoWu.skillVo(0);
                            if (skillVo && skillVo.id == bestSkill.id) {
                                voMine.skillcdList[2] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
                            }
                            else {
                                skillVo = Model_BaoWu.skillVo(1);
                                if (skillVo && skillVo.id == bestSkill.id)
                                    voMine.skillcdList[1] = Config.xtcs_004[1071].num * 1000 - role.bwAndTSCD;
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
                        if (role.id == voMine.id) {
                            voMine.skillcdList[0] = Config.xtcs_004[1072].num * 1000 - role.bwAndTSCD;
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
                        role.tarpx = enemy.x + skillAiMaxFarAbsx * -dir;
                    }
                    else if (distxAbs <= skillAiMinFarAbsx) {
                        role.tarpx = enemy.x + skillAiMinFarAbsx * -dir;
                    }
                    else {
                        role.tarpx = role.x;
                    }
                    var rndy = -skilly + (((role.scene.random.randomInt() * skilly * 2) / 1000) >> 0);
                    role.tarpy = enemy.y + rndy;
                    role.ai_state = 1;
                    role.move_state = 1;
                    role.invalid |= 1;
                }
            }
            else {
                // role.careEnemyID = 0;
                // role.ai_state = 1;
                // role.move_state = 1;
                // role.invalid |= 1;
            }
        }
        // }
    };
    GuanQiaAI.serverSkillAttack = function (role, skillID) {
        if (!role.scene) {
            return;
        }
        var skillList = role.skillList; //取出能够释放的技能
        var enemy = role.scene.getBestRole(MapScene.NEARESTLIFEENEMYFUNC, role); //根据算法取出一个敌人
        if (!enemy) {
            return;
        }
        role.careEnemyID = enemy.id;
        if (skillList.length) {
            var bestSkill;
            for (var i = 0; i < skillList.length; i++) {
                if (skillList[i].id == skillID) {
                    bestSkill = skillList[i];
                    break;
                }
            }
            if (bestSkill) {
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
                role.nx = skillAiMaxFarAbsx;
                role.ny = skilly;
                if (skillAiMaxFarAbsx >= distxAbs && skilly >= distyAbs) {
                    role.ai_state = 0;
                    role.move_state = 0;
                    role.invalid |= 1;
                    var skillLogic = SkillBase.getPlayLogic(role, bestSkill);
                    role.faceX(enemy.x);
                    role.playServerSkill(skillLogic);
                }
                else {
                    if (distxAbs >= skillAiMaxFarAbsx) {
                        role.tarpx = enemy.x + skillAiMaxFarAbsx * -dir;
                    }
                    else if (distxAbs <= skillAiMinFarAbsx) {
                        role.tarpx = enemy.x + skillAiMinFarAbsx * -dir;
                    }
                    else {
                        role.tarpx = role.x;
                    }
                    var rndy = -skilly + (((role.scene.random.randomInt() * skilly * 2) / 1000) >> 0);
                    role.tarpy = enemy.y + rndy;
                    role.ai_state = 1;
                    role.move_state = 1;
                    role.invalid |= 1;
                }
            }
        }
    };
    GuanQiaAI.nx = 100;
    return GuanQiaAI;
}());
__reflect(GuanQiaAI.prototype, "GuanQiaAI");
