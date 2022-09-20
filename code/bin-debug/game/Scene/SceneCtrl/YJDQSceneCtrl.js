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
var YJDQSceneCtrl = (function (_super) {
    __extends(YJDQSceneCtrl, _super);
    function YJDQSceneCtrl() {
        var _this = _super.call(this) || this;
        /**
             * 0 正在打
             * 1 WIN
             * 2 LOSE
             */
        _this.state = -1;
        _this.result = 0;
        _this.enemyArr = [];
        return _this;
    }
    Object.defineProperty(YJDQSceneCtrl, "instance", {
        get: function () {
            if (!YJDQSceneCtrl._instance) {
                YJDQSceneCtrl._instance = new YJDQSceneCtrl();
            }
            return YJDQSceneCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    YJDQSceneCtrl.prototype.onEnter = function (scene) {
        this.scene = scene;
        var layerMgr = GGlobal.layerMgr;
        layerMgr.open(UIConst.FUBEN_YJDQ_REWARD);
        layerMgr.close2(UIConst.FUBEN);
        this.scene.initWithID(351001);
        MainUIController.showBottomExite(true, Handler.create(this, this.exitFuBenHandle), this);
        Model_player.voMine.updateChars();
        // this.setSt(0);
    };
    YJDQSceneCtrl.prototype.onExit = function (scene) {
        this.scene.removeAll();
        var layerMgr = GGlobal.layerMgr;
        layerMgr.close2(UIConst.FUBEN_YJDQ_REWARD);
        if (GGlobal.layerMgr.lastPanelId <= 0)
            layerMgr.open(UIConst.FUBEN, 2);
        MainUIController.showBottomExite(false);
        this.closeUi();
        this.enemyArr = [];
    };
    YJDQSceneCtrl.prototype.exitFuBenHandle = function () {
        ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
    };
    YJDQSceneCtrl.prototype.okHandler = function () {
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        //发送失败协议
        GGlobal.modelyjdq.CG_YJDQ_SYSWIN(2);
    };
    YJDQSceneCtrl.prototype.update = function (ctx) {
        var now = egret.getTimer();
        if (this.state == 0) {
            this.aiUpdate(ctx);
            var myhp = this.scene.getForceCount(1);
            var bosshp = this.scene.getForceCount(2);
            if (bosshp <= 0) {
                this.result = 1;
                this.setSt(1);
            }
            else if (myhp <= 0) {
                this.result = -1;
                this.setSt(2);
            }
            else {
                if (now - this.oldTime >= this.pveTime - this.surTime) {
                    if (now - this.oldTime >= this.pveTime) {
                        ViewBattlePrompt.show(0);
                        this.setSt(2);
                    }
                    else {
                        ViewBattlePrompt.show(Math.floor((this.pveTime + this.oldTime - now) / 1000));
                    }
                }
            }
        }
        else if (this.state == 1) {
        }
        if (this.bossid > 0) {
            var boss = this.scene.getUnit(this.bossid);
            if (boss) {
                GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, boss.curhp);
            }
            else {
                GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
            }
        }
        this.scene.watchMainRole();
    };
    YJDQSceneCtrl.prototype.synWin = function () {
        GGlobal.modelyjdq.CG_YJDQ_SYSWIN(1);
        this.closeUi();
    };
    YJDQSceneCtrl.prototype.setSt = function (st) {
        //exitst
        if (this.state == 0) {
        }
        else if (this.state == 1) {
        }
        else if (this.state == 2) {
        }
        //enterst
        if (st == 0) {
            this.createMyChars();
            this.createEnemys();
        }
        else if (st == 1) {
            this.synWin();
            st = -1;
            ViewBattlePrompt.show(0);
        }
        else if (st == 2) {
            //打开失败界面
            GGlobal.modelyjdq.CG_YJDQ_SYSWIN(0);
            this.closeUi();
            ViewBattlePrompt.show(0);
            st = -1;
        }
        this.oldTime = egret.getTimer();
        this.state = st;
    };
    YJDQSceneCtrl.prototype.createMyChars = function () {
        var role = Model_player.voMine.sceneChar;
        if (!role) {
            Model_player.voMine.updateChars();
            role = Model_player.voMine.sceneChar;
        }
        if (!this.scene.getUnit(role.id)) {
            this.setRolePos(role);
            role.invalid |= 1023;
            role.force = 1;
            this.scene.addUnit(role);
            this.addHpAndName(role, true);
        }
        this.scaleAttribute(role, Model_YJDQ.battleRet, true);
    };
    YJDQSceneCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    YJDQSceneCtrl.prototype.createEnemys = function () {
        var cfg = Config.yiqi_007[Model_YJDQ.curPass];
        var list = JSON.parse(cfg.dispose);
        var cx = this.scene.map.focusx;
        this.enemyArr = [];
        this.bossid = 0;
        if (Model_player.voMine && Model_player.voMine.sceneChar) {
            Model_player.voMine.sceneChar.lianjiNum = 0;
            GGlobal.layerMgr.close2(UIConst.LIANJI);
        }
        for (var i = 0; i < list.length; i++) {
            var id = list[i][0];
            var count = list[i][1];
            for (var ii = 0; ii < count; ii++) {
                var enemy = this.createEmeny(id);
                var ai = new CommonAICtrl();
                ai.role = enemy;
                enemy.addPlug(ai);
                enemy.force = 2;
                this.setMonsterPos(enemy);
                this.scene.addUnit(enemy);
                this.enemyArr.push(enemy);
                this.scaleAttribute(enemy, Model_YJDQ.battleRet);
            }
        }
        var layerMgr = GGlobal.layerMgr;
        if (cfg.boss == 1) {
            this.bossid = enemy.id;
            if (Config.yiqi_007[Model_YJDQ.curPass + 1]) {
                layerMgr.open(UIConst.FUBEN_YJDQ_PROMPT);
            }
            var cfg1 = Config.yiqi_007[Math.floor(Model_YJDQ.passMax / 20 + 1) * 20];
            if (!cfg1 || Model_YJDQ.curPass > Model_YJDQ.passMax) {
                cfg1 = Config.yiqi_007[Math.floor(Model_YJDQ.curPass / 20 + 1) * 20];
            }
            if (!cfg1) {
                cfg1 = Config.yiqi_007[Model_YJDQ.curPass];
            }
            var rewardVo = void 0;
            var pass = 0;
            if (Model_YJDQ.curPass <= Math.floor(Model_YJDQ.passMax / 20 - 1) * 20) {
                View_BossSceneHead.show(id, false, 0, 0, 280, "第" + cfg.bo + "波    " + enemy.name);
            }
            else {
                rewardVo = ConfigHelp.makeItemListArr(JSON.parse(cfg1.award))[0];
                pass = cfg1.bo;
                View_BossSceneHead.show(id, false, 0, 0, 280, "第" + cfg.bo + "波    " + enemy.name, rewardVo, pass + "波大奖");
            }
        }
        else {
            layerMgr.open(UIConst.FUBEN_YJDQ_WAVE);
        }
    };
    YJDQSceneCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
    };
    YJDQSceneCtrl.prototype.closeUi = function () {
        var layerMgr = GGlobal.layerMgr;
        View_BossSceneHead.hide();
        if (this.bossid > 0) {
            layerMgr.close2(UIConst.FUBEN_YJDQ_PROMPT);
        }
        else {
            layerMgr.close2(UIConst.FUBEN_YJDQ_WAVE);
        }
    };
    return YJDQSceneCtrl;
}(SceneCtrl));
__reflect(YJDQSceneCtrl.prototype, "YJDQSceneCtrl");
