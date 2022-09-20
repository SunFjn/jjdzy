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
 * 轮回副本战斗场景控制
 * @author: lujiahao
 * @date: 2020-03-05 10:57:57
 */
var LhfbCtrl = (function (_super) {
    __extends(LhfbCtrl, _super);
    function LhfbCtrl() {
        var _this = _super.call(this) || this;
        _this.roleList = [];
        _this.initState = 0;
        _this.fightStartTime = 0;
        _this.st = 0;
        return _this;
    }
    Object.defineProperty(LhfbCtrl, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new LhfbCtrl();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //=========================================== API ==========================================
    LhfbCtrl.prototype.onEnter = function (pScene) {
        ViewCommonWin.hide();
        ViewBattleFault.hide();
        var t = this;
        t.st = -1;
        t.scene = pScene;
        t.initState = 0;
        var t_model = GGlobal.modelLhfb;
        t_model.isInBattle = true;
        var t_copyVo = t_model.getCopyVoByLunhuiId(t_model.teamVo.lunhuiId);
        t.setMapHead(t_copyVo.mapId);
        t.setSt(0);
        GGlobal.mapscene.map.watchFocus(0, 0);
        GGlobal.layerMgr.close2(UIConst.LHFB);
        // GGlobal.layerMgr.close2(UIConst.SIXWAY);
        // GGlobal.layerMgr.closeAllPanel();
        GGlobal.layerMgr.closeAllPanelExcept([]);
        GGlobal.mainUICtr.setState(MainUIController.BATTLE);
        MainUIController.showBottomExite(true, Handler.create(t, t.onClickEixt), t);
        GGlobal.control.register(true, Enum_MsgType.LHFB_BATTLE_HP_UPDATE, t.onBattleHpUpdate, t);
        GGlobal.control.register(true, Enum_MsgType.LHFB_BATTLE_DEAD, t.onBattleDead, t);
        // super.onEnter(pScene);
        t.createEnemys();
        t.createMyChars();
        SimpleTimer.ins().removeTimer(t.onDelayOpen, t);
    };
    LhfbCtrl.prototype.onExit = function (scene) {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        t_model.isInBattle = false;
        t.fightStartTime = 0;
        View_BossSceneHead.hide();
        t.scene.ctx = {};
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        if (role) {
            role.curhp = role.maxhp;
            role.immuneDmg = 0;
        }
        t.scene.removeAll();
        MainUIController.showBottomExite(false);
        t.deadInvide |= 1;
        t.setSt(-1);
        t.others.length = 0;
        t.roleList.length = 0;
        t.enemyBoss = null;
        GGlobal.control.register(false, Enum_MsgType.LHFB_BATTLE_HP_UPDATE, t.onBattleHpUpdate, t);
        if (!t_model.hasResult) {
            SimpleTimer.ins().addTimer(t.onDelayOpen, t, 500, 1);
        }
    };
    LhfbCtrl.prototype.onDelayOpen = function () {
        GGlobal.modelLhfb.onResultExit();
    };
    LhfbCtrl.prototype.onClickEixt = function () {
        var self = this;
        var tips = "退出按失败结算，是否确认退出？";
        ViewAlert.show(tips, Handler.create(self, self.okHandler));
    };
    LhfbCtrl.prototype.okHandler = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        // GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        //发送失败协议
        // t_model.CG_RebornFB_leaveBattle_11887();
        t_model.CG_RebornFB_exitTeam_11873();
        // GGlobal.modelbattle.CG_EXIT_BATTLE();
    };
    LhfbCtrl.prototype.onBattleHpUpdate = function () {
        var t = this;
        t.updateData();
    };
    LhfbCtrl.prototype.onBattleDead = function (pData) {
        var t = this;
        t.updateRoleDead(pData.roleId);
    };
    LhfbCtrl.prototype.updateRoleDead = function (roleId) {
        var t = this;
        for (var i = t.roleList.length - 1; i >= 0; i--) {
            var scenechar = t.roleList[i];
            if (scenechar.id == roleId) {
                scenechar.curhp = 0;
                t.roleList.splice(i, 1);
                if (scenechar && scenechar.view && scenechar.view.parent) {
                    scenechar.deadThrow(5, 5);
                }
                break;
            }
        }
        if (Model_player.isMineID(roleId)) {
            Model_player.voMine.sceneChar = null;
        }
    };
    LhfbCtrl.prototype.updateData = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        if (!(t.initState & 1)) {
            t.initState |= 1;
            var t_copyVo = t_model.getCopyVoByLunhuiId(t_model.teamVo.lunhuiId);
            var t_bossId = t_copyVo.levelVo.cfg.boss;
            var boss = Config.NPC_200[t_bossId];
            View_BossSceneHead.show(t_bossId, true, t_model.bossHpMax);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, t_model.bossHp);
        if (t_model.bossHp <= 0) {
            t.setSt(2);
        }
        for (var _i = 0, _a = t.roleList; _i < _a.length; _i++) {
            var v = _a[_i];
            var t_bvo = t_model.getBattleVoByRoleId(v.id);
            if (t_bvo) {
                if (v.curhp != t_bvo.curHp) {
                    v.curhp = t_bvo.curHp;
                    if (t_bvo.curHp <= 0) {
                        v.deadThrow(5, 5);
                        if (Model_player.isMineID(v.id))
                            Model_player.voMine.sceneChar = null;
                    }
                }
            }
        }
    };
    LhfbCtrl.prototype.update = function (ctx) {
        var t = this;
        if (egret.getTimer() - t.fightStartTime < 400) {
            return;
        }
        if (t.st == 0) {
            t.aiUpdate(ctx);
            if (Model_player.voMine && (Model_player.voMine.sceneChar && Model_player.voMine.sceneChar.curhp <= 0) || !Model_player.voMine.sceneChar) {
                if (t.enemyBoss) {
                    t.scene.map.watchFocus(t.enemyBoss.x, t.enemyBoss.y);
                }
            }
            else {
                t.scene.watchMainRole();
            }
        }
        else if (t.st == 2) {
        }
        else if (t.st == 1) {
        }
    };
    // protected dieTime: number;
    LhfbCtrl.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
        }
        else if (st == 1) {
        }
        else if (st == 2) {
            // s.dieTime = egret.getTimer();
            s.enemyBoss.curhp = 0;
            s.enemyBoss.deadThrow(5, 5);
        }
        s.st = st;
    };
    LhfbCtrl.prototype.createEnemys = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        var t_copyVo = t_model.getCopyVoByLunhuiId(t_model.teamVo.lunhuiId);
        var t_bossId = t_copyVo.levelVo.cfg.boss;
        var boss = Config.NPC_200[t_bossId];
        if (boss) {
            t_model.bossHp = boss.hp;
            t_model.bossHpMax = boss.hp;
        }
        t.enemyBoss = t.createEmeny(t_bossId);
        var ai = new CommonAICtrl();
        ai.role = t.enemyBoss;
        t.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.maxTime = 9999999999; //长期霸体
        bati.role = t.enemyBoss;
        t.enemyBoss.addPlug(bati);
        t.enemyBoss.clearHurt = 1;
        t.enemyBoss.force = 2;
        t.setBossPos(t.enemyBoss);
        t.scene.addUnit(t.enemyBoss);
        View_BossSceneHead.show(t_bossId, true);
    };
    LhfbCtrl.prototype.createMyChars = function () {
        var t = this;
        var t_myvo = Model_player.voMine;
        t_myvo.updateChars();
        var t_role = t_myvo.sceneChar;
        t.setRolePos(t_role, -180);
        t_role.invalid |= 1023;
        t_role.force = 1;
        t_role.immuneDmg = 1;
        t_role.clearHurt = 1;
        if (!t.scene.getUnit(t_role.id)) {
            t.scene.addUnit(t_role);
            t.addHpAndName(t_role, true);
        }
        t.roleList.push(t_role);
        var t_model = GGlobal.modelLhfb;
        var t_list = t_model.teamVo.memberList;
        for (var _i = 0, t_list_1 = t_list; _i < t_list_1.length; _i++) {
            var v = t_list_1[_i];
            if (v.roleId != Model_player.voMine.id) {
                var t_pvo = GGlobal.modelPlayer.playerDetailDic[v.roleId];
                t_pvo.updateChars();
                var t_role1 = t_pvo.sceneChar;
                if (!t.scene.getUnit(t_role1.id)) {
                    t.setRolePos(t_role1);
                    t_role1.invalid |= 255;
                    t_role1.force = 1;
                    t_role1.clearHurt = 1;
                    t.scene.addUnit(t_role1);
                    t.addHpAndName(t_role1, true);
                }
                else {
                    t.setRolePos(t_role1);
                }
                t.roleList.push(t_role1);
            }
        }
    };
    LhfbCtrl.prototype.aiUpdate = function (ctx) {
        for (var i = 0; i < this.roleList.length; i++) {
            GuanQiaAI.thinkAttack(this.roleList[i], ctx, this.searchEnemy);
        }
    };
    LhfbCtrl.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return LhfbCtrl;
}(BossCtrl));
__reflect(LhfbCtrl.prototype, "LhfbCtrl");
