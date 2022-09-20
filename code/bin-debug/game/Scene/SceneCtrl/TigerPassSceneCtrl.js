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
var TigerPassSceneCtrl = (function (_super) {
    __extends(TigerPassSceneCtrl, _super);
    function TigerPassSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.bossDmgFix = 0; //BOSS固定伤害
        _this.state = -1;
        _this.initState = 0;
        //是否已经进入失败状态
        _this.hasExiteState = false;
        _this.deadInvide1 = 0;
        _this.lastTime1 = 0;
        _this.roleList = [];
        return _this;
    }
    TigerPassSceneCtrl.getInst = function () {
        return this._inst || (this._inst = new TigerPassSceneCtrl());
    };
    TigerPassSceneCtrl.prototype.onEnter = function (scene) {
        ViewCommonWin.hide();
        ViewBattleFault.hide();
        var s = this;
        s.roleList = [];
        s.hasExiteState = false;
        s.scene = scene;
        scene.ignoreBreak = false;
        var id = GGlobal.modelTigerPass.curId;
        var cfg = Config.hlg_323[id];
        s.pveTime = cfg.time * 1000;
        //首次取UI的气血数据，停留太久不保证正确
        s.createEnemys(cfg.boss);
        s.setMapHead(cfg.dt);
        s.setSt(0);
        GGlobal.layerMgr.close2(UIConst.CHILD_TIGER_PASS);
        GGlobal.modelTigerPass.listen(Model_TigerPass.msg_datas_hurt, s.updateData, s);
        GGlobal.modelTigerPass.listen(Model_TigerPass.msg_bat_res, s.batRes, s);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        GGlobal.control.listen(Enum_MsgType.MSG_MINEHPCHANGE, s.updateHp, s);
        MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
        s.createMyChars();
        ViewTigPasSceneInfo.instance.onOpen();
    };
    TigerPassSceneCtrl.prototype.onExit = function (scene) {
        var s = this;
        var c = GGlobal.control;
        GGlobal.modelTigerPass.remove(Model_TigerPass.msg_datas_hurt, s.updateData, s);
        GGlobal.modelTigerPass.remove(Model_TigerPass.msg_bat_res, s.batRes, s);
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        GGlobal.control.remove(Enum_MsgType.MSG_MINEHPCHANGE, this.updateHp, this);
        View_BossSceneHead.hide();
        s.scene.ctx = {};
        MainUIController.showBottomExite(false);
        s.deadInvide = 0;
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        if (role) {
            role.curhp = role.maxhp;
            role.immuneDmg = 0;
        }
        s.scene.removeAll();
        s.setSt(-1);
        GGlobal.layerMgr.open(UIConst.CHILD_TIGER_PASS);
        s.others = [];
        GGlobal.modelPlayer.playerDetailDic = {};
        s.enemyBoss = null;
        ViewTigPasSceneInfo.instance.onClose();
    };
    TigerPassSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.clickExit));
    };
    TigerPassSceneCtrl.prototype.clickExit = function () {
        GGlobal.modelTigerPass.CGDie8907();
    };
    TigerPassSceneCtrl.prototype.directExite = function () {
        GGlobal.modelScene.returnMainScene();
    };
    TigerPassSceneCtrl.prototype.updateData = function () {
        var s = this;
        var m = GGlobal.modelTigerPass;
        if (!(s.initState & 1)) {
            s.initState |= 1;
            var id = m.curId;
            var cfg = Config.hlg_323[id];
            View_BossSceneHead.show(cfg.boss, true, m.bossMaxHp);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.bossCurHp);
        if (m.bossCurHp <= 0) {
            s.setSt(2);
        }
    };
    TigerPassSceneCtrl.prototype.batRes = function () {
        var m = GGlobal.modelTigerPass;
        var s = this;
        if (m.batRes == 0) {
            setTimeout(function () {
                ViewCommonWin.show(m.batDrop);
            }, 1000);
        }
        else {
            ViewCommonFail.show(5000, s, "离开", s.directExite, null, m.batDrop);
        }
    };
    TigerPassSceneCtrl.prototype.update = function (ctx) {
        var s = this;
        var now = egret.getTimer();
        if (s.state == 0) {
            var myhp = this.scene.getForceHp(1);
            if (myhp <= 0) {
                this.setSt(1);
            }
            if (now - this.oldTime >= this.pveTime) {
                this.setSt(1);
            }
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
        s.dmgByClient();
    };
    TigerPassSceneCtrl.prototype.dmgByClient = function () {
        //玩家伤害
        // super.dmgByClient();
        var self = this;
        if (GGlobal.pauseBattle)
            return;
        var role = Model_player.voMine.sceneChar;
        var ebos = self.enemyBoss;
        var now = egret.getTimer();
        if (now - self.lastTime < 1000)
            return;
        self.lastTime = now;
        if (role && role.curhp > 0 && GGlobal.mapscene.getForceCount(2) > 0) {
            if (role.immuneDmg || role.invincible) {
                return; //无敌不计算伤害
            }
            if (ebos && ((ebos.dizzState && ebos.dizzState.isWorking) || ebos.changeModel > 0)) {
                return; //定身 眩晕不计算伤害
            }
            var ret = ((role.maxhp * self.bossDmgPer / 100) >> 0) + self.bossDmgFix;
            if (role.curShield > 0) {
                role.curShield = role.curShield > ret ? role.curShield - ret : 0;
                ret = role.curShield > ret ? 0 : ret - role.curShield;
            }
            ret = role.curhp - ret;
            ret = ret < 0 ? 0 : ret;
            role.curhp = ret;
            if (ret <= 0 && self.deadInvide == 0) {
                // this.tellDead();
                self._ply1.deadThrow(5, 5);
                if (role.curhp <= 0) {
                    self.deadInvide |= 1;
                    var index = self.roleList.indexOf(self._ply1);
                    self.roleList.splice(index, 1);
                    self._ply1 = null;
                    Model_player.voMine.sceneChar = null;
                }
                else {
                    ret = role.curhp;
                }
            }
            GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: ret });
        }
        //队友伤害
        if (self._ply2) {
            role = self._ply2;
            ebos = self.enemyBoss;
            now = egret.getTimer();
            if (now - self.lastTime1 < 1000)
                return;
            self.lastTime1 = now;
            if (role && role.curhp > 0 && GGlobal.mapscene.getForceCount(2) > 0) {
                if (role.immuneDmg || role.invincible) {
                    return; //无敌不计算伤害
                }
                if (ebos && ((ebos.dizzState && ebos.dizzState.isWorking) || ebos.changeModel > 0)) {
                    return; //定身 眩晕不计算伤害
                }
                var ret = ((role.maxhp * self.bossDmgPer / 100) >> 0) + self.bossDmgFix;
                if (role.curShield > 0) {
                    role.curShield = role.curShield > ret ? role.curShield - ret : 0;
                    ret = role.curShield > ret ? 0 : ret - role.curShield;
                }
                ret = role.curhp - ret;
                ret = ret < 0 ? 0 : ret;
                role.curhp = ret;
                if (ret <= 0 && self.deadInvide1 == 0) {
                    self.deadInvide1 |= 1;
                    role.deadThrow(5, 5);
                    var index = self.roleList.indexOf(self._ply2);
                    self.roleList.splice(index, 1);
                    self._ply2 = null;
                }
                if (ret > 0)
                    self.deadInvide1 = 0;
            }
        }
    };
    // protected tellDead() {
    // 	this._ply1.deadThrow(5, 5);
    // }
    TigerPassSceneCtrl.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
        }
        else if (st == 1) {
            s.clickExit();
        }
        else if (st == 2) {
            s.enemyBoss.curhp = 0;
            s.enemyBoss.deadThrow(5, 5);
        }
        s.state = st;
        s.oldTime = egret.getTimer();
    };
    TigerPassSceneCtrl.prototype.createEnemys = function (bossId) {
        var s = this;
        var m = GGlobal.modelTigerPass;
        var boss = Config.NPC_200[bossId];
        s.enemyBoss = s.createEmeny(bossId);
        //血量
        s.enemyBoss.curhp = m.bossCurHp;
        s.enemyBoss.maxhp = m.bossMaxHp;
        var ai = new CommonAICtrl();
        ai.role = s.enemyBoss;
        s.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.maxTime = 9999999999; //长期霸体
        bati.role = s.enemyBoss;
        s.enemyBoss.addPlug(bati);
        s.enemyBoss.clearHurt = 1;
        s.enemyBoss.force = 2;
        //伤害
        var id = m.curId;
        var cfg = Config.hlg_323[id];
        s.enemyBoss.att = Model_player.voMine.hp * cfg.sh1 / 100 + Model_player.voMine.def;
        s.enemyBoss.force = 2;
        s.bossDmgPer = cfg.sh1;
        s.bossDmgFix = cfg.sh2;
        s.setBossPos(s.enemyBoss);
        s.scene.addUnit(s.enemyBoss);
        View_BossSceneHead.show(bossId, true, m.bossMaxHp, 0, 280, "第" + id + "关    " + boss.name);
    };
    TigerPassSceneCtrl.prototype.createMyChars = function () {
        var s = this;
        s._ply1 = null;
        s._ply2 = null;
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
        s._ply1 = role;
        var plyId = GGlobal.modelTigerPass.employId;
        if (plyId != 0) {
            var role1 = void 0;
            var voplayer = GGlobal.modelPlayer.playerDetailDic[plyId];
            voplayer.updateChars();
            role1 = voplayer.sceneChar;
            if (!s.scene.getUnit(role1.id)) {
                s.setRolePos(role1);
                role1.y += 30; //站位不一样
                role1.x -= 30; //站位不一样
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
            s._ply2 = role1;
        }
    };
    TigerPassSceneCtrl.prototype.aiUpdate = function (ctx) {
        for (var i = 0; i < this.roleList.length; i++) {
            GuanQiaAI.thinkAttack(this.roleList[i], ctx, this.searchEnemy);
        }
    };
    TigerPassSceneCtrl.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return TigerPassSceneCtrl;
}(BossCtrl));
__reflect(TigerPassSceneCtrl.prototype, "TigerPassSceneCtrl");
