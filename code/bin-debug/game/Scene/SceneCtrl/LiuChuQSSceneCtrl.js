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
var LiuChuQSSceneCtrl = (function (_super) {
    __extends(LiuChuQSSceneCtrl, _super);
    function LiuChuQSSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.state = -1;
        _this.initState = 0;
        //是否已经进入失败状态
        _this.hasExiteState = false;
        _this.roleList = [];
        return _this;
    }
    LiuChuQSSceneCtrl.getInst = function () {
        return this._inst || (this._inst = new LiuChuQSSceneCtrl());
    };
    LiuChuQSSceneCtrl.prototype.onEnter = function (scene) {
        ViewCommonWin.hide();
        ViewBattleFault.hide();
        var s = this;
        s.roleList = [];
        s.hasExiteState = false;
        s.scene = scene;
        var id = GGlobal.model_LiuChuQS.batId;
        var cfg = Config.six_279[id];
        //首次取UI的气血数据，停留太久不保证正确
        s.createEnemys(cfg.npc);
        s.setMapHead(cfg.map);
        s.setSt(0);
        Model_LiuChuQS.batIng = true;
        GGlobal.layerMgr.close2(UIConst.CHILD_LCQS);
        GGlobal.layerMgr.close2(UIConst.CHILD_LCQS_PANEL);
        GGlobal.layerMgr.close2(UIConst.CHAT);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_datas_hurt, s.updateData, s);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_datas_hp, s.updateData, s);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_datas_dead, s.updateRoleDead, s);
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_datas_over, s.batOver, s);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
        s.createMyChars();
    };
    LiuChuQSSceneCtrl.prototype.onExit = function (scene) {
        var s = this;
        var c = GGlobal.control;
        // s.serverResult = 0;
        Model_LiuChuQS.batIng = false;
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_datas_hurt, s.updateData, s);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_datas_hp, s.updateData, s);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_datas_dead, s.updateRoleDead, s);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_datas_over, s.batOver, s);
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        GGlobal.control.remove(Enum_MsgType.MSG_MINEHPCHANGE, this.updateHp, this);
        View_BossSceneHead.hide();
        s.scene.ctx = {};
        MainUIController.showBottomExite(false);
        s.deadInvide |= 1;
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        if (role) {
            role.curhp = role.maxhp;
            role.immuneDmg = 0;
        }
        s.scene.removeAll();
        s.setSt(-1);
        if (Model_GlobalMsg.batResult == 1) {
            // GGlobal.modelSJMJ.CG3785();
            // GGlobal.model_LiuChuQS.CG_LEAVE_BATTLE_8223();
            var m = GGlobal.model_LiuChuQS;
            if (m.teamMyArr.length > 0) {
                // Model_LiuChuQS.leaveMsg = false
                m.CG_LEAVE_8211(m.teamMyArr[0].teamId);
            }
            if (GGlobal.layerMgr.backPanelId == UIConst.CHAT) {
                GGlobal.layerMgr.open(UIConst.CHAT);
            }
            else {
                // ShengJieMJSceneCtrl.sucOpenPan = true;
                var index = Math.floor(GGlobal.model_LiuChuQS.batId / 1000);
                GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, index);
            }
        }
        else {
            // ShengJieMJSceneCtrl.isBatEnd = true;
            var index = Math.floor(GGlobal.model_LiuChuQS.batId / 1000);
            GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, index);
        }
        s.others = [];
        s.enemyBoss = null;
    };
    // public static sucOpenPan: boolean = false;
    // public static isBatEnd: boolean = false;
    // private serverResult = 0;
    LiuChuQSSceneCtrl.prototype.delayShowAward = function () {
        // this.serverResult = 1;//标记已经获取到后端数据 并且把退出按钮屏蔽
        MainUIController.showBottomExite(false);
    };
    LiuChuQSSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.directExite));
    };
    LiuChuQSSceneCtrl.prototype.directExite = function () {
        GGlobal.model_LiuChuQS.CG_LEAVE_BATTLE_8223();
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelScene.returnMainScene();
    };
    LiuChuQSSceneCtrl.prototype.updateRoleDead = function (roleId) {
        var s = this;
        for (var i = 0; i < s.roleList.length; i++) {
            var scenechar = s.roleList[i];
            if (scenechar.id == roleId) {
                scenechar.curhp = 0;
                s.roleList.splice(i, 1);
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
    LiuChuQSSceneCtrl.prototype.batOver = function () {
        // ViewCommonWarn.text("队长已退出")
        Model_GlobalMsg.batResult = 2;
        ViewBattleFault.show();
        var s = this;
        s.setSt(1);
    };
    LiuChuQSSceneCtrl.prototype.updateData = function () {
        var s = this;
        if (!(s.initState & 1)) {
            s.initState |= 1;
            var id = GGlobal.model_LiuChuQS.batId;
            var cfg = Config.six_279[id];
            View_BossSceneHead.show(cfg.npc, true, Model_LiuChuQS.bossMaxHP);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, Model_LiuChuQS.bossHP);
        if (Model_LiuChuQS.bossHP <= 0) {
            s.setSt(2);
        }
        for (var j = 0; j < s.roleList.length; j++) {
            for (var i = 0; i < Model_LiuChuQS.hpArr.length; i++) {
                var id = s.roleList[j].id;
                if (Model_LiuChuQS.hpArr[i][0] == id) {
                    if (s.roleList[j].curhp != Model_LiuChuQS.hpArr[i][1]) {
                        s.roleList[j].curhp = Model_LiuChuQS.hpArr[i][1];
                        if (Model_LiuChuQS.hpArr[i][1] <= 0) {
                            s.roleList[j].deadThrow(5, 5);
                            if (Model_player.isMineID(id)) {
                                Model_player.voMine.sceneChar = null;
                            }
                        }
                    }
                    break;
                }
            }
        }
    };
    LiuChuQSSceneCtrl.prototype.update = function (ctx) {
        var s = this;
        if (s.state == 0) {
            s.aiUpdate(ctx);
            if (Model_player.voMine && Model_player.voMine.sceneChar && Model_player.voMine.sceneChar.curhp <= 0) {
                if (s.enemyBoss) {
                    s.scene.map.watchFocus(s.enemyBoss.x, s.enemyBoss.y);
                }
            }
            else {
                s.scene.watchMainRole();
            }
        }
        else if (s.state == 2) {
        }
        else if (s.state == 1) {
        }
    };
    LiuChuQSSceneCtrl.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
        }
        else if (st == 1) {
        }
        else if (st == 2) {
            s.dieTime = egret.getTimer();
            s.enemyBoss.curhp = 0;
            s.enemyBoss.deadThrow(5, 5);
        }
        s.state = st;
    };
    LiuChuQSSceneCtrl.prototype.createEnemys = function (bossId) {
        var s = this;
        var boss = Config.NPC_200[bossId];
        if (boss) {
            Model_LiuChuQS.bossHP = boss.hp;
            Model_LiuChuQS.bossMaxHP = boss.hp;
        }
        s.enemyBoss = s.createEmeny(bossId);
        var ai = new CommonAICtrl();
        ai.role = s.enemyBoss;
        s.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.maxTime = 9999999999; //长期霸体
        bati.role = s.enemyBoss;
        s.enemyBoss.addPlug(bati);
        s.enemyBoss.clearHurt = 1;
        s.enemyBoss.force = 2;
        s.setBossPos(s.enemyBoss);
        s.scene.addUnit(s.enemyBoss);
        View_BossSceneHead.show(bossId, true);
    };
    LiuChuQSSceneCtrl.prototype.createMyChars = function () {
        var s = this;
        var vomine = Model_player.voMine;
        vomine.updateChars();
        var role = vomine.sceneChar;
        s.setRolePos(role);
        role.invalid |= 1023;
        role.force = 1;
        role.immuneDmg = 1;
        role.clearHurt = 1;
        if (!s.scene.getUnit(role.id)) {
            s.scene.addUnit(role);
            s.addHpAndName(role, true);
        }
        s.roleList.push(role);
        var teamArr = GGlobal.model_LiuChuQS.teamMyArr;
        for (var i = 0; i < teamArr.length; i++) {
            var info = teamArr[i];
            if (info.plyId != Model_player.voMine.id) {
                var role1 = void 0;
                var voplayer = void 0;
                voplayer = GGlobal.modelPlayer.playerDetailDic[info.plyId];
                voplayer.updateChars();
                role1 = voplayer.sceneChar;
                if (!s.scene.getUnit(role1.id)) {
                    s.setRolePos(role1);
                    role1.y += 30 * (i + 1); //站位不一样
                    role1.x -= 30 * (i + 1); //站位不一样
                    role1.invalid |= 255;
                    role1.force = 1;
                    role1.clearHurt = 1;
                    s.scene.addUnit(role1);
                    s.addHpAndName(role1, true);
                }
                else {
                    s.setRolePos(role1);
                }
                s.roleList.push(role1);
            }
        }
    };
    LiuChuQSSceneCtrl.prototype.aiUpdate = function (ctx) {
        for (var i = 0; i < this.roleList.length; i++) {
            GuanQiaAI.thinkAttack(this.roleList[i], ctx, this.searchEnemy);
        }
    };
    LiuChuQSSceneCtrl.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return LiuChuQSSceneCtrl;
}(BossCtrl));
__reflect(LiuChuQSSceneCtrl.prototype, "LiuChuQSSceneCtrl");
