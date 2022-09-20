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
var SyzlbSceneCtrl = (function (_super) {
    __extends(SyzlbSceneCtrl, _super);
    function SyzlbSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.state = -1;
        //是否已经进入失败状态
        _this.hasExiteState = false;
        _this.roleList = [];
        return _this;
    }
    SyzlbSceneCtrl.getInst = function () {
        return this._inst || (this._inst = new SyzlbSceneCtrl());
    };
    SyzlbSceneCtrl.prototype.onEnter = function (scene) {
        ViewCommonWin.hide();
        ViewBattleFault.hide();
        var s = this;
        s.roleList = [];
        s.hasExiteState = false;
        s.scene = scene;
        var id = GGlobal.model_Syzlb.batId;
        var cfg = Config.syzlb_762[id];
        //首次取UI的气血数据，停留太久不保证正确
        s.createEnemys(JSON.parse(cfg.boss)[0][1]);
        // s.setMapHead(cfg.dt);
        s.scene.initWithID(cfg.dt, true);
        s.setSt(0);
        Model_Syzlb.batIng = true;
        GGlobal.layerMgr.close2(UIConst.SYZLB);
        GGlobal.layerMgr.close2(UIConst.CHAT);
        GGlobal.layerMgr.close2(UIConst.SYZLB_REW);
        GGlobal.layerMgr.close2(UIConst.SYZLB_INFO);
        GGlobal.model_Syzlb.listen(Model_Syzlb.msg_datas_hurt, s.upBossHp, s);
        GGlobal.model_Syzlb.listen(Model_Syzlb.msg_datas_hp, s.updateData, s);
        GGlobal.model_Syzlb.listen(Model_Syzlb.msg_datas_dead, s.updateRoleDead, s);
        GGlobal.model_Syzlb.listen(Model_Syzlb.msg_relive, s.upreliv, s);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
        s.createMyChars();
    };
    SyzlbSceneCtrl.prototype.onExit = function (scene) {
        var s = this;
        var c = GGlobal.control;
        // Model_Syzlb.batIng = false
        GGlobal.model_Syzlb.remove(Model_Syzlb.msg_datas_hurt, s.upBossHp, s);
        GGlobal.model_Syzlb.remove(Model_Syzlb.msg_datas_hp, s.updateData, s);
        GGlobal.model_Syzlb.remove(Model_Syzlb.msg_datas_dead, s.updateRoleDead, s);
        GGlobal.model_Syzlb.remove(Model_Syzlb.msg_relive, s.upreliv, s);
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        View_BossSceneHead.hide();
        s.scene.ctx = {};
        MainUIController.showBottomExite(false);
        s.deadInvide |= 1;
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        if (role) {
            // role.curhp = role.maxhp;
            role.immuneDmg = 0;
        }
        s.scene.removeAll();
        s.setSt(-1);
        if (GGlobal.model_Syzlb.batResult == 1) {
        }
        else {
            var m = GGlobal.model_Syzlb;
            if (m.teamMyArr.length > 0) {
                m.CG_EXIT_CHA();
            }
            GGlobal.layerMgr.open(UIConst.SYZLB);
        }
        s.others = [];
        s.enemyBoss = null;
    };
    SyzlbSceneCtrl.prototype.delayShowAward = function () {
        MainUIController.showBottomExite(false);
    };
    SyzlbSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出队伍后将离开副本且次数不返还\n是否退出?", Handler.create(this, this.directExite));
    };
    SyzlbSceneCtrl.prototype.directExite = function () {
        GGlobal.model_Syzlb.CG_EXIT_CHA();
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelScene.returnMainScene();
    };
    SyzlbSceneCtrl.prototype.updateRoleDead = function (roleId) {
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
    SyzlbSceneCtrl.prototype.upreliv = function () {
        var s = this;
        //状态
        s.setSt(0);
        //设置满血
        Model_player.voMine.currentHp = Model_player.voMine.hp;
        Model_Syzlb.hpCur[Model_player.voMine.id] = Model_player.voMine.hp;
        var teamArr = GGlobal.model_Syzlb.teamMyArr;
        for (var i = 0; i < teamArr.length; i++) {
            var info = teamArr[i];
            if (info.pId != Model_player.voMine.id) {
                var voplayer = void 0;
                voplayer = GGlobal.modelPlayer.playerDetailDic[info.pId];
                voplayer.currentHp = voplayer.hp;
                Model_Syzlb.hpCur[info.pId] = voplayer.hp;
            }
        }
        //创建
        s.createMyChars();
    };
    // protected initState: number = 0;
    SyzlbSceneCtrl.prototype.updateData = function () {
        var s = this;
        // if (!(s.initState & 1)) {//是否初始化
        // 	s.initState |= 1;
        // 	const id = GGlobal.model_Syzlb.batId;
        // 	const cfg = Config.syzlb_762[id];
        // 	View_BossSceneHead.show(JSON.parse(cfg.boss)[0][1], true);
        // }
        // GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, Model_Syzlb.bossHP);
        // if (Model_Syzlb.bossHP <= 0) {//BOSS被击杀
        // 	s.setSt(2);
        // }
        for (var j = 0; j < s.roleList.length; j++) {
            for (var i = 0; i < Model_Syzlb.hpArr.length; i++) {
                var id = s.roleList[j].id;
                if (Model_Syzlb.hpArr[i][0] == id) {
                    if (s.roleList[j].curhp != Model_Syzlb.hpArr[i][1]) {
                        s.roleList[j].curhp = Model_Syzlb.hpArr[i][1];
                        if (Model_Syzlb.hpArr[i][1] <= 0) {
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
    SyzlbSceneCtrl.prototype.upBossHp = function () {
        var s = this;
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, Model_Syzlb.bossHP);
        if (Model_Syzlb.bossHP <= 0) {
            s.setSt(2);
        }
    };
    SyzlbSceneCtrl.prototype.update = function (ctx) {
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
    SyzlbSceneCtrl.prototype.setSt = function (st) {
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
    SyzlbSceneCtrl.prototype.createEnemys = function (bossId) {
        var s = this;
        var boss = Config.NPC_200[bossId];
        if (boss) {
            Model_Syzlb.bossHP = boss.hp;
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
    SyzlbSceneCtrl.prototype.createMyChars = function () {
        var s = this;
        var vomine = Model_player.voMine;
        if (vomine.currentHp > 0) {
            vomine.updateChars();
            vomine.sceneChar.curhp = vomine.currentHp;
            vomine.sceneChar.maxhp = vomine.hp;
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
        }
        else {
            vomine.updateChars();
            vomine.sceneChar.curhp = 0;
        }
        //队友
        var teamArr = GGlobal.model_Syzlb.teamMyArr;
        for (var i = 0; i < teamArr.length; i++) {
            var info = teamArr[i];
            if (info.pId != Model_player.voMine.id) {
                var role1 = void 0;
                var voplayer = void 0;
                voplayer = GGlobal.modelPlayer.playerDetailDic[info.pId];
                if (voplayer.currentHp <= 0)
                    continue;
                voplayer.updateChars();
                voplayer.sceneChar.curhp = voplayer.currentHp;
                voplayer.sceneChar.maxhp = voplayer.hp;
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
                //移除原来的
                for (var i_1 = 0; i_1 < s.roleList.length; i_1++) {
                    if (s.roleList[i_1].id == info.pId) {
                        s.roleList.splice(i_1, 1);
                        break;
                    }
                }
                s.roleList.push(role1);
            }
        }
    };
    SyzlbSceneCtrl.prototype.aiUpdate = function (ctx) {
        for (var i = 0; i < this.roleList.length; i++) {
            GuanQiaAI.thinkAttack(this.roleList[i], ctx, this.searchEnemy);
        }
    };
    SyzlbSceneCtrl.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return SyzlbSceneCtrl;
}(BossCtrl));
__reflect(SyzlbSceneCtrl.prototype, "SyzlbSceneCtrl");
