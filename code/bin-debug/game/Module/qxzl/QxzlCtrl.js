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
/**
 * 群雄逐鹿战斗逻辑控制
 * @author: lujiahao
 * @date: 2019-10-09 21:00:14
 */
var QxzlCtrl = (function (_super) {
    __extends(QxzlCtrl, _super);
    function QxzlCtrl() {
        var _this = _super.call(this) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(QxzlCtrl, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new QxzlCtrl();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    QxzlCtrl.prototype.onEnter = function (scene) {
        this.st = -1;
        this.scene = scene;
        scene.setLeftAndRight();
        scene.initWithID(387001);
        this.createMyChars();
        GGlobal.layerMgr.close2(UIConst.QXZL_CITY_INFO);
        GGlobal.layerMgr.close2(UIConst.QXZL);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
        GGlobal.mainUICtr.setState(MainUIController.BATTLE);
    };
    QxzlCtrl.prototype.onExit = function (scene) {
        this.scene.setLeftAndRight();
        this.rightPlayer = null;
        this.leftPlayer = null;
        scene.removeAll();
        MainUIController.showBottomExite(false);
        // if (GGlobal.layerMgr.lastPanelId <= 0) {
        //     GGlobal.layerMgr.open(UIConst.QXZL);
        // }
    };
    QxzlCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，是否确认？\n(消耗体力不返还)", Handler.create(this, this.okHandler));
    };
    QxzlCtrl.prototype.okHandler = function () {
        //发送失败协议
        // GGlobal.modelQxzl.CG_QunXiongZhuLu_battleResult_8973(2, GGlobal.modelQxzl.battleIndex);
        if (this.st == 0)
            this.setState(1);
    };
    QxzlCtrl.prototype.update = function (ctx) {
        var now = egret.getTimer();
        if (this.st == -1) {
            this.setState(0);
        }
        else if (this.st == 0) {
            var myhp = this.scene.getForceHp(1);
            var playerhp = this.scene.getForceHp(2);
            if (myhp <= 0) {
                this.setState(1);
            }
            else if (playerhp <= 0) {
                this.setState(2);
            }
            if (now - this.oldTime >= this.pvpTime) {
                if (this.rightPlayer) {
                    this.killRole(this.leftPlayer.sceneChar, this.rightPlayer.sceneChar);
                }
                else {
                    this.killRole(this.leftPlayer.sceneChar, this.enemy);
                }
            }
            this.aiUpdate(ctx);
        }
        else {
        }
        this.scene.watchMainRole();
    };
    QxzlCtrl.prototype.setState = function (st) {
        var t_model = GGlobal.modelQxzl;
        switch (st) {
            case 0:
                if (t_model.battleType == 1) {
                    //NPC
                    this.enemy = this.createEnemys(t_model.battleId);
                    GGlobal.modelQxzl.battleTempVo = null;
                }
                else {
                    //玩家
                    var vo = GGlobal.modelPlayer.playerDetailDic[t_model.battleId];
                    this.addOther(vo);
                    this.createOther(this.rightPlayer);
                    GGlobal.modelQxzl.battleTempVo = this.rightPlayer;
                }
                break;
            case 1://失败
                GGlobal.layerMgr.close(UIConst.ALERT);
                GGlobal.modelQxzl.CG_QunXiongZhuLu_battleResult_8973(0, t_model.battleIndex);
                break;
            case 2://胜利
                GGlobal.layerMgr.close(UIConst.ALERT);
                setTimeout(function () {
                    GGlobal.modelQxzl.CG_QunXiongZhuLu_battleResult_8973(1, t_model.battleIndex);
                }, 1000);
                break;
        }
        this.oldTime = egret.getTimer();
        this.st = st;
    };
    QxzlCtrl.prototype.createEnemys = function (id) {
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
    QxzlCtrl.prototype.createMyChars = function () {
        var vomine = Model_player.voMine;
        this.leftPlayer = vomine;
        vomine.updateChars();
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
    QxzlCtrl.prototype.addOther = function (vo) {
        this.rightPlayer = vo;
    };
    QxzlCtrl.prototype.createOther = function (vo) {
        vo.updateChars();
        var role = vo.sceneChar;
        if (!this.scene.getUnit(role.id)) {
            this.setBossPos(role);
            role.rage = Config.changshu_101[3].num / 100;
            role.invalid |= 1023;
            role.force = 2;
            role.setDir(-1);
            role.autoSkill = true;
            this.scene.addUnit(role);
            this.addHpAndName(role, false);
        }
    };
    QxzlCtrl.prototype.aiUpdate = function (ctx) {
        var self = this;
        if (self.leftPlayer && self.leftPlayer.sceneChar)
            GuanQiaAI.thinkAttack(self.leftPlayer.sceneChar, ctx);
        if (self.rightPlayer && self.rightPlayer.sceneChar) {
            GuanQiaAI.thinkAttack(self.rightPlayer.sceneChar, ctx);
        }
    };
    QxzlCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    return QxzlCtrl;
}(SceneCtrl));
__reflect(QxzlCtrl.prototype, "QxzlCtrl");
