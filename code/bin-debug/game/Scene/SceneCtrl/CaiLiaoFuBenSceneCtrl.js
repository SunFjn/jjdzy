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
var CaiLiaoFuBenSceneCtrl = (function (_super) {
    __extends(CaiLiaoFuBenSceneCtrl, _super);
    function CaiLiaoFuBenSceneCtrl() {
        var _this = _super.call(this) || this;
        /**
             * 0 正在打
             * 1 WIN
             * 2 LOSE
             */
        _this.state = -1;
        _this.wave = 0;
        _this.enemyArr = [];
        return _this;
    }
    Object.defineProperty(CaiLiaoFuBenSceneCtrl, "instance", {
        get: function () {
            if (!CaiLiaoFuBenSceneCtrl._instance) {
                CaiLiaoFuBenSceneCtrl._instance = new CaiLiaoFuBenSceneCtrl();
            }
            return CaiLiaoFuBenSceneCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    CaiLiaoFuBenSceneCtrl.prototype.onEnter = function (scene) {
        this.scene = scene;
        var layerMgr = GGlobal.layerMgr;
        layerMgr.close2(UIConst.FUBEN_CAILIAO);
        MainUIController.showBottomExite(true, Handler.create(this, this.exitFuBenHandle), this);
        this.wave = 0;
        for (var i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
            if (Model_CaiLiao.curFuBenId == Model_CaiLiao.caiLiaoArr[i].id) {
                this.vo = Model_CaiLiao.caiLiaoArr[i];
                break;
            }
        }
        var mapid = this.vo.scene;
        this.scene.initWithID(mapid);
        this.createMyChars();
        this.setSt(0);
    };
    CaiLiaoFuBenSceneCtrl.prototype.onExit = function (scene) {
        this.scene.removeAll();
        var layerMgr = GGlobal.layerMgr;
        if (layerMgr.lastPanelId <= 0)
            layerMgr.open(UIConst.FUBEN_CAILIAO);
        MainUIController.showBottomExite(false);
        View_BossSceneHead.hide();
        this.enemyArr = [];
    };
    CaiLiaoFuBenSceneCtrl.prototype.exitFuBenHandle = function () {
        ViewAlert.show("中途退出不扣除挑战次数\n是否退出副本?", Handler.create(this, this.okHandler));
    };
    CaiLiaoFuBenSceneCtrl.prototype.okHandler = function () {
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
    };
    CaiLiaoFuBenSceneCtrl.prototype.update = function (ctx) {
        var now = egret.getTimer();
        if (this.state == 0) {
            this.aiUpdate(ctx);
            var myhp = this.scene.getForceCount(1);
            var bosshp = this.scene.getForceCount(2);
            if (bosshp <= 0) {
                this.setSt(1);
            }
            else if (myhp <= 0) {
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
    CaiLiaoFuBenSceneCtrl.prototype.synWin = function () {
        if (this.wave > this.vo.monsterArr.length) {
            //胜利
            GGlobal.modelcailiao.CG_REAWARD_CAILIAOFUBEN(this.vo.id);
        }
        else {
            this.setSt(0);
        }
    };
    CaiLiaoFuBenSceneCtrl.prototype.setSt = function (st) {
        //exitst
        if (this.state == 0) {
        }
        else if (this.state == 1) {
        }
        else if (this.state == 2) {
        }
        //enterst
        this.state = st;
        if (st == 0) {
            this.createEnemys();
            this.wave++;
        }
        else if (st == 1) {
            this.synWin();
            ViewBattlePrompt.show(0);
        }
        else if (st == 2) {
            //打开失败界面
            ViewBattleFault.show(10000);
            ViewBattlePrompt.show(0);
        }
        this.oldTime = egret.getTimer();
    };
    CaiLiaoFuBenSceneCtrl.prototype.createMyChars = function () {
        var vomine = Model_player.voMine;
        var role = this.scene.getLifeHero();
        if (role) {
            this.setRolePos(role);
        }
        else {
            vomine.updateChars();
            role = vomine.sceneChar;
            this.setRolePos(role);
            role.invalid |= 1023;
            role.force = 1;
            role.scene = this.scene;
            this.scene.addUnit(role);
            this.addHpAndName(role, true);
            this.scaleAttribute(role, Model_CaiLiao.battleRet, true);
        }
    };
    CaiLiaoFuBenSceneCtrl.prototype.createEnemys = function () {
        var list;
        var cx = this.scene.map.focusx;
        this.enemyArr = [];
        this.bossid = 0;
        if (Model_player.voMine && Model_player.voMine.sceneChar) {
            Model_player.voMine.sceneChar.lianjiNum = 0;
            GGlobal.layerMgr.close2(UIConst.LIANJI);
        }
        if (this.wave < this.vo.monsterArr.length) {
            list = this.vo.monsterArr[this.wave];
            var id_1 = list[1];
            var count_1 = list[2];
            for (var ii = 0; ii < count_1; ii++) {
                var enemy = this.createEmeny(id_1);
                var ai = new CommonAICtrl();
                ai.role = enemy;
                enemy.addPlug(ai);
                enemy.force = 2;
                this.setMonsterPos(enemy);
                this.scene.addUnit(enemy);
                this.enemyArr.push(enemy);
                this.scaleAttribute(enemy, Model_CaiLiao.battleRet);
            }
        }
        else {
            list = this.vo.bossArr;
            for (var i = 0; i < list.length; i++) {
                var id = list[i][0];
                var count = list[i][1];
                var enemy = this.createEmeny(id);
                var ai = new CommonAICtrl();
                ai.role = enemy;
                enemy.addPlug(ai);
                enemy.force = 2;
                this.setBossPos(enemy);
                this.scene.addUnit(enemy);
                this.enemyArr.push(enemy);
                this.scaleAttribute(enemy, Model_CaiLiao.battleRet);
                this.bossid = enemy.id;
                View_BossSceneHead.show(id, false);
            }
        }
    };
    CaiLiaoFuBenSceneCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
    };
    return CaiLiaoFuBenSceneCtrl;
}(SceneCtrl));
__reflect(CaiLiaoFuBenSceneCtrl.prototype, "CaiLiaoFuBenSceneCtrl");
