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
var BossCtrl = (function (_super) {
    __extends(BossCtrl, _super);
    function BossCtrl() {
        var _this = _super.call(this) || this;
        _this.bossDmgPer = 0; //BOSS秒伤
        /**其他玩家信息 */
        _this.others = [];
        return _this;
    }
    BossCtrl.prototype.update = function (ctx) {
    };
    BossCtrl.prototype.onEnter = function (scene) {
        var s = this;
        s.scene = scene;
        scene.ignoreBreak = false;
        GGlobal.layerMgr.close2(UIConst.BOSS);
        GGlobal.control.listen(Enum_MsgType.MSG_MINEHPCHANGE, s.updateHp, s);
        MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
        s.createMyChars();
    };
    BossCtrl.prototype.onExit = function (scene) {
        var self = this;
        GGlobal.control.remove(Enum_MsgType.MSG_MINEHPCHANGE, self.updateHp, self);
        View_BossSceneHead.hide();
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        if (role) {
            role.curhp = role.maxhp;
            role.immuneDmg = 0;
        }
        self.scene.ctx = {};
        self.scene.removeAll();
        self.others = [];
        MainUIController.showBottomExite(false);
        self.deadInvide = 0;
        GGlobal.modelPlayer.playerDetailDic = {};
        self.enemyBoss = null;
    };
    BossCtrl.prototype.updateHp = function (arg) {
        var vomine = Model_player.voMine;
        if (vomine.sceneChar) {
            if (arg.hp > 0)
                this.deadInvide = 0;
            vomine.sceneChar.curhp = arg.hp;
        }
    };
    BossCtrl.prototype.onClickEixt = function () {
    };
    BossCtrl.prototype.createMyChars = function () {
        var vomine = Model_player.voMine;
        vomine.updateChars();
        var role = vomine.sceneChar;
        this.setRolePos(role);
        role.invalid |= 1023;
        role.force = 1;
        role.clearHurt = 1;
        if (this.scene.getUnit(role.id) == undefined) {
            this.scene.addUnit(role);
            this.addHpAndName(role, true);
        }
        var m = GGlobal.modelBoss;
        this.scaleAttribute(role, m.bossResult, true);
    };
    BossCtrl.prototype.setBossPos = function (role, offx) {
        if (offx === void 0) { offx = 0; }
        var cx = this.scene.map.focusx;
        role.x = cx + 400 + offx;
        role.y = 700;
    };
    BossCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        if (vomine && vomine.sceneChar) {
            GuanQiaAI.thinkAttack(vomine.sceneChar, ctx);
        }
    };
    BossCtrl.prototype.generalStateChange = function (data) {
        var st = data.st;
        var list = data.list;
        if (st == 0) {
            this.generalRelife(list);
        }
        else {
            this.generalKilled(list);
        }
    };
    BossCtrl.prototype.generalKilled = function (lst) {
        for (var i = 0; i < lst.length; i++) {
            var id = lst[i];
            var role = GGlobal.mapscene.getUnit(id);
            if (role) {
                role.deadRemove();
            }
            for (var j = 0; j < this.others.length; j++) {
                if (this.others[j] && this.others[j].id == id) {
                    this.others[j] = null;
                }
            }
        }
    };
    BossCtrl.prototype.generalRelife = function (lst) {
        for (var i = 0; i < lst.length; i++) {
            var id = lst[i];
            var role = GGlobal.mapscene.getUnit(id);
            if (role) {
                role.curhp = role.maxhp;
            }
            else if (GGlobal.modelPlayer.playerDetailDic[id]) {
                GGlobal.control.notify(Enum_MsgType.MSG_ADDROLEDETAIL, GGlobal.modelPlayer.playerDetailDic[id]);
            }
        }
        ArrayUitl.cleannull(this.others);
    };
    BossCtrl.prototype.createChars = function (voplayer, pos) {
        voplayer.updateChars();
        var s = this;
        var i = 0;
        var role = voplayer.sceneChar;
        if (s.scene.getUnit(role.id) == undefined) {
            s.setRolePos(role);
            role.invalid |= 255;
            role.force = pos;
            role.setName(voplayer.name);
            s.scene.addUnit(role);
        }
        else {
            s.setRolePos(role);
        }
    };
    BossCtrl.prototype.createOtherPlayer = function (vo) {
        var s = this;
        ArrayUitl.cleannull(s.others);
        if (s.others.length >= 5) {
            s.removeOther(s.others[0].id);
        }
        if (s.others.indexOf(vo) == -1) {
            s.others.push(vo);
        }
        if (Model_player.isMineID(vo.id)) {
            return;
        }
        s.createChars(vo, 1);
    };
    /**删除某个玩家 */
    BossCtrl.prototype.removeOther = function (id) {
        var s = this;
        var len = s.others.length;
        for (var i = 0; i < len; i++) {
            if (s.others[i] && s.others[i].id == id) {
                var vo = s.others[i];
                if (vo.sceneChar && vo.sceneChar.view && vo.sceneChar.view.parent) {
                    s.scene.removeUnit(vo.sceneChar);
                }
                if (Model_player.voMine.id == vo.id) {
                    Model_player.voMine.sceneChar = null;
                }
                s.others[i] = null;
                break;
            }
        }
        ArrayUitl.cleannull(s.others);
    };
    return BossCtrl;
}(SceneCtrl));
__reflect(BossCtrl.prototype, "BossCtrl");
