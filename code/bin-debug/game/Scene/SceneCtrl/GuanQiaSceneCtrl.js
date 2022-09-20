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
var GuanQiaSceneCtrl = (function (_super) {
    __extends(GuanQiaSceneCtrl, _super);
    function GuanQiaSceneCtrl() {
        var _this = _super.call(this) || this;
        /** 0:创建怪物正在打怪 1:打完怪同步数据领取奖励
         * */
        _this.state = 0;
        _this.lastSynTime = -99999;
        return _this;
    }
    GuanQiaSceneCtrl.getIns = function () {
        if (!GuanQiaSceneCtrl._ins) {
            GuanQiaSceneCtrl._ins = new GuanQiaSceneCtrl();
        }
        return GuanQiaSceneCtrl._ins;
    };
    GuanQiaSceneCtrl.prototype.update = function (ctx) {
        var s = this;
        s.stateUpdate(ctx);
    };
    //设置当前关卡状态，普通打怪状态
    GuanQiaSceneCtrl.prototype.setCurSt = function (st) {
        var s = this;
        s.state = st;
        if (st == 0) {
            var modelguanqia = GGlobal.modelGuanQia;
            var lib = Config.xiaoguai_205;
            var mapid = lib[Config.BOSS_205[modelguanqia.curGuanQiaLv].lj].dt;
            s.updateMap(mapid);
            GGlobal.control.listen(Enum_MsgType.HERO_UPDATE, s.createMyChars, s);
            GGlobal.control.listen(Enum_MsgType.MSG_WAVEUPDATE, s.onWaveUD, s);
            GGlobal.control.listen(ModelGuanQia.msg_gqGetRed, s.updateMap, s);
            s.createMyChars();
            s.createCurWave();
        }
        else if (st == 1) {
            s.playMoney();
            s.lastSynTime = -99999;
            s.synWave();
        }
    };
    GuanQiaSceneCtrl.prototype.updateMap = function (mapId) {
        var cfg = Config.dgq_205[ModelGuanQia.curGQID];
        if (cfg) {
            var arr = JSON.parse(cfg.guanqia);
            if (GGlobal.modelGuanQia.curGuanQiaLv == arr[0][0] || GGlobal.modelGuanQia.curGuanQiaLv == arr[0][1] + 1) {
                this.scene.initWithID(cfg.ditu);
            }
            else {
                this.scene.initWithID(mapId);
            }
        }
        else {
            this.scene.initWithID(mapId);
        }
    };
    GuanQiaSceneCtrl.prototype.playMoney = function () {
        var moneys = this.scene.filterRole(MapScene.ISMONEY);
        for (var i = 0; i < moneys.length; i++) {
            moneys[i].tweenToHero();
        }
    };
    GuanQiaSceneCtrl.prototype.synWave = function () {
        var s = this;
        //请求下一波怪啊！
        var now = egret.getTimer();
        if (now - s.lastSynTime >= 10000) {
            GGlobal.modelGuanQia.CS_WAVE_1101(GGlobal.modelGuanQia.curWave);
            s.lastSynTime = now;
        }
    };
    GuanQiaSceneCtrl.prototype.stateUpdate = function (ctx) {
        var s = this;
        if (s.state == 0) {
            s.aiUpdate(ctx);
            var liferole = s.scene.getLifeHero();
            if (liferole) {
                s.scene.watchMainRole(35);
            }
            else {
                s.createMyChars();
            }
            if (!s.scene.getForceCount(2)) {
                s.setCurSt(1);
                return;
            }
        }
        else if (s.state == 1) {
            GuanQiaAI.keepPos(Model_player.voMine);
            s.synWave();
        }
    };
    GuanQiaSceneCtrl.prototype.onEnter = function (scene) {
        var s = this;
        s.scene = scene;
        scene.ignoreBreak = false;
        s.createMyChars();
        s.scene.setLeftAndRight();
        s.setCurSt(0);
    };
    GuanQiaSceneCtrl.prototype.onExit = function (scene) {
        var s = this;
        GGlobal.control.remove(Enum_MsgType.MSG_WAVEUPDATE, s.onWaveUD, s);
        s.scene.removeAll();
    };
    GuanQiaSceneCtrl.prototype.onWaveUD = function () {
        var s = this;
        s.setCurSt(0);
    };
    //根据后端的结果放大自身属性 BOSS战
    GuanQiaSceneCtrl.prototype.createMyChars = function (isBoss) {
        var s = this;
        var vomine = Model_player.voMine;
        vomine.updateChars();
        var role = vomine.sceneChar;
        role.scene = s.scene;
        if (s.scene.getUnit(role.id)) {
            s.scene.watchMainRole(35);
            return;
        }
        role.curhp = role.maxhp;
        s.setRolePos(role);
        role.invalid |= 1023;
        role.force = 1;
        s.scene.addUnit(role);
        s.scene.watchMainRole(35);
        s.addHpAndName(role, true);
    };
    GuanQiaSceneCtrl.prototype.createCurWave = function () {
        var s = this;
        var guanqia = GGlobal.modelGuanQia.curGuanQiaLv;
        var guanqiacfg = Config.BOSS_205[guanqia];
        var cfg = Config.xiaoguai_205[guanqiacfg.lj];
        if (!cfg) {
            ViewCommonWarn.text("noneLevel:" + guanqia);
            return;
        }
        var count = 0;
        var monsters = JSON.parse(cfg.m);
        for (var i = 0; i < monsters.length; i++) {
            var id = monsters[i][1];
            var num = monsters[i][2];
            for (var ii = 0; ii < num; ii++) {
                var m = s.createEmenyByInfo(id);
                s.setMonsterPos(m, (count / 2) >> 0);
                count++;
            }
        }
    };
    GuanQiaSceneCtrl.prototype.createEmenyByInfo = function (id) {
        var s = this;
        var mapscene = s.scene;
        var enemy = _super.prototype.createEmeny.call(this, id);
        var gailv = Math.random() * 100000;
        if (gailv <= Config.xtcs_004[2023].num) {
            enemy.standTime = Config.xtcs_004[2022].num;
        }
        else {
            enemy.standTime = 0;
        }
        enemy.isStand = false;
        s.setMonsterPos(enemy);
        enemy.curhp = enemy.maxhp = ModelGuanQia.MAX_HP;
        var ai = CommonAICtrl.create();
        ai.role = enemy;
        enemy.addPlug(ai);
        var hpplug = GuanQiaMonHpPlug.create();
        hpplug.role = enemy;
        enemy.addPlug(hpplug);
        mapscene.addUnit(enemy);
        return enemy;
    };
    GuanQiaSceneCtrl.prototype.setMonsterPos = function (enemy, fixedPos) {
        if (fixedPos === void 0) { fixedPos = 0; }
        var role = this.scene.getLifeHero();
        var posArr = [500, 620, 750];
        var pos = 662;
        if (posArr.length > fixedPos)
            pos = posArr[fixedPos];
        enemy.x = MathUtil.rndNum(role.x + 400, role.x + 600);
        enemy.y = MathUtil.rndNum(pos + 50, pos);
    };
    GuanQiaSceneCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
    };
    GuanQiaSceneCtrl.prototype.bossAiUpdate = function (ctx) {
        var enemys = this.scene.filterRole(MapScene.ISLIFEENEMY, 1);
        for (var len = enemys.length, i = 0; i < len; i++) {
            var enemy = enemys[i];
            GuanQiaAI.thinkAttack(enemy, ctx);
        }
    };
    //boss--
    GuanQiaSceneCtrl.prototype.challBoss = function () {
        var s = this;
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIABOSS);
    };
    return GuanQiaSceneCtrl;
}(SceneCtrl));
__reflect(GuanQiaSceneCtrl.prototype, "GuanQiaSceneCtrl");
