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
var KingShipCtrl = (function (_super) {
    __extends(KingShipCtrl, _super);
    function KingShipCtrl() {
        var _this = _super.call(this) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(KingShipCtrl, "instance", {
        get: function () {
            if (!KingShipCtrl._instance)
                KingShipCtrl._instance = new KingShipCtrl();
            return KingShipCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    KingShipCtrl.prototype.onEnter = function (scene) {
        this.st = -1;
        this.scene = scene;
        this.scene.setLeftAndRight();
        scene.initWithID(340004);
        this.createMyChars();
        GGlobal.layerMgr.close2(UIConst.COUNTRY_KINGSHIP);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
    };
    KingShipCtrl.prototype.onExit = function (scene) {
        this.scene.setLeftAndRight();
        GGlobal.modelPlayer.removePlayer(Model_Kingship.battlePos);
        Model_Kingship.battlePos = 0;
        this.rightPlayer = null;
        this.leftPlayer = null;
        scene.removeAll();
        MainUIController.showBottomExite(false);
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.COUNTRY_KINGSHIP);
    };
    KingShipCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
    };
    KingShipCtrl.prototype.okHandler = function () {
        //发送失败协议
        GGlobal.modelKingship.CG_FIGHT_END(2);
        GGlobal.modelScene.returnMainScene();
    };
    KingShipCtrl.prototype.update = function (ctx) {
        var self = this;
        var now = egret.getTimer();
        if (self.st == -1) {
            self.setState(0);
        }
        else if (self.st == 0) {
            var myhp = self.scene.getForceHp(1);
            var playerhp = self.scene.getForceHp(2);
            if (myhp <= 0) {
                self.setState(1);
            }
            else if (playerhp <= 0) {
                self.setState(2);
            }
            if (now - self.oldTime >= self.pvpTime) {
                if (self.rightPlayer) {
                    self.killRole(self.leftPlayer.sceneChar, self.rightPlayer.sceneChar);
                }
                else {
                    self.killRole(self.leftPlayer.sceneChar, self.enemy);
                }
            }
            var cfg = Config.buff_011[100003];
            if (cfg && self.leftPlayer && self.rightPlayer && self.leftPlayer.sceneChar && self.rightPlayer.sceneChar) {
                var times = JSON.parse(cfg.xiaoguo)[0][1] + JSON.parse(cfg.cz)[0][1];
                var times1 = JSON.parse(cfg.cz)[0][1];
                if (self.leftPlayer.sceneChar.isSilent && now - self.oldTime >= self.rightPlayer.star * times1 + times) {
                    self.leftPlayer.sceneChar.isSilent = false;
                    if (self.leftPlayer.sceneChar.isHero()) {
                        ViewMainUIBottomUI1.instance.setSkillCM(false);
                    }
                }
                if (self.rightPlayer.sceneChar.isSilent && now - self.oldTime >= self.leftPlayer.star * times1 + times) {
                    self.rightPlayer.sceneChar.isSilent = false;
                }
            }
            self.aiUpdate(ctx);
        }
        else {
        }
        this.scene.watchMainRole();
    };
    KingShipCtrl.prototype.setState = function (st) {
        if (st == 0) {
            var kingVo = Model_Kingship.guardArr[Model_Kingship.battlePos - 1];
            if (kingVo.sid == 0) {
                this.enemy = this.createEnemys(kingVo.id);
            }
            else {
                var vo = GGlobal.modelPlayer.playerDetailDic[kingVo.sid];
                this.addOther(vo);
                this.createOther(this.rightPlayer);
            }
        }
        else if (st == 1) {
            GGlobal.modelKingship.CG_FIGHT_END(0);
        }
        else if (st == 2) {
            var self_1 = this;
            setTimeout(function () {
                GGlobal.modelKingship.CG_FIGHT_END(1);
            }, 1000);
        }
        this.oldTime = egret.getTimer();
        this.st = st;
    };
    /**  1失败 2胜利*/
    KingShipCtrl.prototype.checkResult = function () {
        var hasLeft = this.scene.getForceHp(1);
        var hasRight = this.scene.getForceHp(2);
        if (hasLeft > hasRight) {
            return 2;
        }
        else {
            return 1;
        }
    };
    KingShipCtrl.prototype.createEnemys = function (id) {
        var enemy = this.createEmeny(id);
        var ai = new CommonAICtrl();
        ai.role = enemy;
        enemy.addPlug(ai);
        enemy.force = 2;
        this.setBossPos(enemy);
        this.addHpAndName(enemy, false);
        this.scene.addUnit(enemy);
        return enemy;
    };
    KingShipCtrl.prototype.createMyChars = function () {
        var vomine = Model_player.voMine;
        this.leftPlayer = vomine;
        vomine.updateChars();
        vomine.star = Model_WuJiang.getWuJiangStarByJob(vomine.job);
        var role = vomine.sceneChar;
        if (!this.scene.getUnit(role.id)) {
            this.setRolePos(role);
            role.invalid |= 1023;
            role.force = 1;
            role.setDir(1);
            this.scene.addUnit(role);
            this.addHpAndName(role, true);
        }
    };
    KingShipCtrl.prototype.addOther = function (vo) {
        this.rightPlayer = vo;
    };
    KingShipCtrl.prototype.createOther = function (vo) {
        var self = this;
        vo.updateChars();
        var role = vo.sceneChar;
        if (!self.scene.getUnit(role.id)) {
            if (!self.rightPlayer.star)
                self.rightPlayer.star = 1;
            self.setBossPos(role);
            role.rage = Config.changshu_101[3].num / 100;
            role.invalid |= 1023;
            role.force = 2;
            role.setDir(-1);
            role.autoSkill = true;
            self.scene.addUnit(role);
            self.addHpAndName(role, false);
        }
        if (role.job == 53) {
            self.leftPlayer.sceneChar.isSilent = true;
            if (self.leftPlayer.sceneChar.isHero()) {
                ViewMainUIBottomUI1.instance.setSkillCM(true);
            }
        }
        if (self.leftPlayer.job == 53) {
            role.isSilent = true;
        }
    };
    KingShipCtrl.prototype.aiUpdate = function (ctx) {
        var self = this;
        if (self.leftPlayer && self.leftPlayer.sceneChar)
            GuanQiaAI.thinkAttack(self.leftPlayer.sceneChar, ctx);
        if (self.rightPlayer && self.rightPlayer.sceneChar) {
            GuanQiaAI.thinkAttack(self.rightPlayer.sceneChar, ctx);
        }
    };
    KingShipCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    return KingShipCtrl;
}(SceneCtrl));
__reflect(KingShipCtrl.prototype, "KingShipCtrl");
