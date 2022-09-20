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
var ShengJieMJSceneCtrl = (function (_super) {
    __extends(ShengJieMJSceneCtrl, _super);
    function ShengJieMJSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.state = -1;
        _this.serverResult = 0;
        _this.initState = 0;
        //是否已经进入失败状态
        _this.hasExiteState = false;
        _this.roleList = [];
        return _this;
    }
    ShengJieMJSceneCtrl.getInst = function () {
        return this._inst || (this._inst = new ShengJieMJSceneCtrl());
    };
    ShengJieMJSceneCtrl.prototype.onEnter = function (scene) {
        ViewCommonWin.hide();
        ViewBattleFault.hide();
        var c = GGlobal.control;
        var s = this;
        s.roleList = [];
        s.hasExiteState = false;
        s.scene = scene;
        //首次取UI的气血数据，停留太久不保证正确
        s.createEnemys();
        var id = ItemTeam.curMiJing.data.id;
        var mapid = Config.sjmj_258[id / 1000 >> 0].map;
        s.setMapHead(mapid);
        s.setSt(0);
        // CrossTeamRankInfo.show();
        GGlobal.layerMgr.close2(UIConst.SJMJ2);
        GGlobal.layerMgr.close2(UIConst.SJMJ1);
        GGlobal.layerMgr.close2(UIConst.CHAT);
        // c.listen(Enum_MsgType.CROSS_TEAM_RANK_UPDATE, s.updateData, s);
        // c.listen(Enum_MsgType.CROSS_TEAM_PLAYER_DEAD, s.updateRoleDead, s);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_hurt, s.updateData, s);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_hp, s.updateData, s);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_dead, s.updateRoleDead, s);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
        s.createMyChars();
    };
    ShengJieMJSceneCtrl.prototype.onExit = function (scene) {
        var s = this;
        var c = GGlobal.control;
        s.serverResult = 0;
        // c.remove(Enum_MsgType.CROSS_TEAM_RANK_UPDATE, s.updateData, s);
        // c.remove(Enum_MsgType.CROSS_TEAM_PLAYER_DEAD, s.updateRoleDead, s);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_hurt, s.updateData, s);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_hp, s.updateData, s);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_dead, s.updateRoleDead, s);
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
        // CrossTeamRankInfo.hide();
        // GGlobal.modelSJMJ.CG3771();
        if (Model_GlobalMsg.batResult == 1) {
            GGlobal.modelSJMJ.CG3785();
            if (GGlobal.layerMgr.backPanelId == UIConst.CHAT) {
                WorldSocketMgr.instance.close();
                GGlobal.layerMgr.open(UIConst.CHAT);
            }
            else {
                ShengJieMJSceneCtrl.sucOpenPan = true;
                GGlobal.modelSJMJ.CG3761();
            }
        }
        else {
            ShengJieMJSceneCtrl.isBatEnd = true;
            GGlobal.modelSJMJ.CG3761();
            GGlobal.layerMgr.open(UIConst.SJMJ2, ItemTeam.curMiJing.data.id);
        }
        s.others = [];
        s.enemyBoss = null;
    };
    ShengJieMJSceneCtrl.prototype.delayShowAward = function () {
        this.serverResult = 1; //标记已经获取到后端数据 并且把退出按钮屏蔽
        MainUIController.showBottomExite(false);
    };
    ShengJieMJSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.directExite));
    };
    ShengJieMJSceneCtrl.prototype.directExite = function () {
        GGlobal.modelSJMJ.CG3785();
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelScene.returnMainScene();
        // GGlobal.modelCrossTeam.CG_TEAM_EXIT_TEAMFUBEN();
        // Model_CrossTeam.teamId = 0;
        // Model_CrossTeam.myTeamArr.length = 0;
        // GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_UPDATE);
        // GGlobal.modelSJMJ.notify(ModelShengJieMJ.msg_datas_team);
    };
    ShengJieMJSceneCtrl.prototype.updateRoleDead = function (roleId) {
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
    ShengJieMJSceneCtrl.prototype.updateData = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        if (!(s.initState & 1)) {
            s.initState |= 1;
            // let id = Model_CrossTeam.fubenID;
            // let cfg = Config.zdfb_255[id];
            var id = ItemTeam.curMiJing.data.id;
            var cfg = Config.sjmjfb_258[id];
            View_BossSceneHead.show(cfg.boss, true, ModelShengJieMJ.bossMaxHP);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, ModelShengJieMJ.bossHP);
        if (ModelShengJieMJ.bossHP <= 0) {
            s.setSt(2);
        }
        for (var j = 0; j < s.roleList.length; j++) {
            for (var i = 0; i < ModelShengJieMJ.hpArr.length; i++) {
                var id = s.roleList[j].id;
                if (ModelShengJieMJ.hpArr[i][0] == id) {
                    if (s.roleList[j].curhp != ModelShengJieMJ.hpArr[i][1]) {
                        s.roleList[j].curhp = ModelShengJieMJ.hpArr[i][1];
                        if (ModelShengJieMJ.hpArr[i][1] <= 0) {
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
    ShengJieMJSceneCtrl.prototype.update = function (ctx) {
        var s = this;
        if (s.state == 0) {
            s.aiUpdate(ctx);
            // for (let i = 0; i < s.roleList.length; i++) {
            // 	if (s.roleList[i].id == Model_player.voMine.id && s.roleList[i].curhp <= 0) {
            // 		GGlobal.modelCrossTeam.CG_TEAM_DEADSEND(0);
            // 		s.updateRoleDead(s.roleList[i].id);
            // 	} else if (Model_CrossTeam.isLeader && s.roleList[i].charType == 0 && s.roleList[i].curhp <= 0) {
            // 		GGlobal.modelCrossTeam.CG_TEAM_DEADSEND(s.roleList[i].id);
            // 		s.updateRoleDead(s.roleList[i].id);
            // 	}
            // }
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
            // let now = egret.getTimer();
            // if (now - s.dieTime >= 2000 && !GGlobal.layerMgr.isOpenView(UIConst.BATTLEWIN)) {
            // 	GGlobal.layerMgr.open(UIConst.BATTLEWIN);
            // } else if (now - s.dieTime >= 10000) {//5秒后自动退出
            // }
        }
        else if (s.state == 1) {
            // let now = egret.getTimer();
            // if (now - s.dieTime >= 1000 && !s.hasExiteState) {//5秒后自动退出
            // 	s.hasExiteState = true;
            // 	ViewBattleFault.show(3000, s, "离开", s.directExite, s.directExite);
            // }
        }
    };
    ShengJieMJSceneCtrl.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
        }
        else if (st == 1) {
            // s.dieTime = egret.getTimer();
            // let voplayer = Model_player.voMine;
            // voplayer.sceneChar.deadThrow(5, 5);
        }
        else if (st == 2) {
            s.dieTime = egret.getTimer();
            s.enemyBoss.curhp = 0;
            s.enemyBoss.deadThrow(5, 5);
        }
        s.state = st;
    };
    ShengJieMJSceneCtrl.prototype.createEnemys = function () {
        var s = this;
        // let id = Model_CrossTeam.fubenID;
        // let cfg = Config.zdfb_255[id];
        var id = ItemTeam.curMiJing.data.id;
        var cfg = Config.sjmjfb_258[id];
        var boss = Config.NPC_200[cfg.boss];
        if (boss) {
            ModelShengJieMJ.bossHP = boss.hp;
            ModelShengJieMJ.bossMaxHP = boss.hp;
        }
        s.enemyBoss = s.createEmeny(cfg.boss);
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
        View_BossSceneHead.show(cfg.boss, true);
    };
    ShengJieMJSceneCtrl.prototype.createMyChars = function () {
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
        // let arr = Model_CrossTeam.myTeamArr;
        var teamArr = GGlobal.modelSJMJ.teamInfos;
        for (var i = 0; i < teamArr.length; i++) {
            var info = teamArr[i];
            if (info.id != Model_player.voMine.id) {
                var role1 = void 0;
                var voplayer = void 0;
                // if (1 < 0) {
                // role1 = s.createEmeny(arr[i][3]);
                // role1.id = arr[i][3];
                // role1.setPlayerName(arr[i][1]);
                // } else {
                // 	voplayer = GGlobal.modelPlayer.playerDetailDic[info.id];
                // 	voplayer.updateChars();
                // 	role1 = voplayer.sceneChar;
                // }
                voplayer = GGlobal.modelPlayer.playerDetailDic[info.id];
                voplayer.updateChars();
                role1 = voplayer.sceneChar;
                if (!s.scene.getUnit(role1.id)) {
                    s.setRolePos(role1);
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
    ShengJieMJSceneCtrl.prototype.aiUpdate = function (ctx) {
        for (var i = 0; i < this.roleList.length; i++) {
            GuanQiaAI.thinkAttack(this.roleList[i], ctx, this.searchEnemy);
        }
    };
    ShengJieMJSceneCtrl.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    ShengJieMJSceneCtrl.sucOpenPan = false;
    ShengJieMJSceneCtrl.isBatEnd = false;
    return ShengJieMJSceneCtrl;
}(BossCtrl));
__reflect(ShengJieMJSceneCtrl.prototype, "ShengJieMJSceneCtrl");
