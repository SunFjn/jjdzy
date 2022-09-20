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
var MapScene = (function (_super) {
    __extends(MapScene, _super);
    function MapScene() {
        var _this = _super.call(this) || this;
        /**忽略打断 */
        _this.ignoreBreak = true;
        /** 忽略霸体*/
        _this.ignoreBati = 1;
        /**是否显示打击碰撞 */
        _this.showHitBox = false;
        _this.left = 0; //场景左边区域限制
        _this.right = 100000000; //场景右边区域限制
        _this.pauseCounter = 0;
        _this.dt = 33;
        _this.scenetype = 0;
        /** 缓存正在转场中的场景类型 成功切换则会置空（用于做一些跳过onExit的逻辑） */
        _this.tempSceneType = 0;
        _this.random = new GRandom();
        _this.fc = 0;
        _this.resourceDic = {};
        _this.mapsizeW = 960;
        _this.isShake_ = 1;
        _this.units = {};
        _this.list = [];
        _this.heartbeatTime = 0;
        _this.ctx = {};
        _this.time200 = 0;
        _this.frameInterv = 0; //顿帧时间 0-33都相当于默认帧频 越大越卡
        _this.intervTime = 0;
        _this.bufArr = [];
        _this.scale = 1;
        _this.mapView = new egret.Sprite();
        _this.view_far = new ScrollFarMap();
        _this.view = new egret.Sprite();
        var sw = App.stage.stageWidth;
        var sh = App.stage.stageHeight;
        // this.view.graphics.beginFill(0x0, 1);
        // this.view.graphics.drawRect(0, 0, sw, sh);
        _this.map = new ScrollMap();
        _this.view.addChild(_this.map);
        _this.unitLayer = new DepSprite();
        _this.map.addChild(_this.unitLayer);
        _this.mapView.addChild(_this.view_far);
        _this.mapView.addChild(_this.view);
        //this.map.setHead("5");
        _this.initMapCustom();
        return _this;
    }
    MapScene.prototype.enterScene = function (scenetype) {
        //场景适配器
        this.scenetype = scenetype;
        this.tempSceneType = scenetype;
        var ctrl = SceneCtrl.getCtrl(scenetype);
        if (this.sceneCtrl)
            GGlobal.layerMgr.open(UIConst.SCENELOADING);
        this.enterSceneCtrl(ctrl);
    };
    MapScene.prototype.setUnitLayerVis = function (v) {
        this.unitLayer.visible = v;
    };
    MapScene.prototype.setScrollMapVis = function (v) {
        this.map.visible = v;
        this.view_far.visible = v;
        this.setUnitLayerVis(v);
    };
    MapScene.prototype.enterSceneCtrl = function (ctrl) {
        if (this.sceneCtrl) {
            ViewBattlePrompt.show(0);
            // console.log("退出时间" + DateUtil.getHMSBySecond2(Math.floor(Model_GlobalMsg.getServerTime() / 1000)));
            this.sceneCtrl.onExit(this);
        }
        this.sceneCtrl = ctrl;
        this.tempSceneType = 0;
        var sceneCtrl = SceneCtrl;
        if (this.scenetype == sceneCtrl.GUANQIA) {
            GGlobal.layerMgr.close2(UIConst.ALERT);
        }
        this.sceneShow();
        if (ctrl) {
            this.map.watchFocus(0, 0);
            this.moveMidbg(0);
            // console.log("进入时间" + DateUtil.getHMSBySecond2(Math.floor(Model_GlobalMsg.getServerTime() / 1000)));
            ctrl.onEnter(this);
        }
        GGlobal.control.notify(Enum_MsgType.SCENE_CHANGE);
    };
    /**场景显示 */
    MapScene.prototype.sceneShow = function () {
        var isCityState = false;
        if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
            isCityState = true;
        }
        var uist; //UI状态
        switch (this.scenetype) {
            case SceneCtrl.GUANQIA:
                if (GGlobal.modelGuanQia.inGuanQiaBoss()) {
                    uist = MainUIController.GUANQIABOSS;
                }
                else {
                    uist = MainUIController.GUANQIA;
                }
                if (isCityState && GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
                    var mainTown = GGlobal.layerMgr.getView(UIConst.MAINTOWN);
                    mainTown.visible = true;
                    uist = MainUIController.MAINTOWN;
                }
                break;
            case SceneCtrl.GUANQIABOSS_HELP:
                uist = MainUIController.GUANQIABOSS;
                break;
            case SceneCtrl.SGWS:
            case SceneCtrl.CROSS_WARS:
            case SceneCtrl.WA_KUANG:
            case SceneCtrl.SHAOZHU_ESCORT:
                if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
                    var mainTown = GGlobal.layerMgr.getView(UIConst.MAINTOWN); //先处理主城的逻辑
                    if (mainTown)
                        mainTown.visible = false;
                }
                uist = MainUIController.VIDEOTAPE;
                break;
            default:
                if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
                    var mainTown = GGlobal.layerMgr.getView(UIConst.MAINTOWN); //先处理主城的逻辑
                    if (mainTown)
                        mainTown.visible = false;
                }
                uist = MainUIController.BATTLE;
                break;
        }
        GGlobal.mainUICtr.setState(uist);
    };
    /**是否是普通场景 */
    MapScene.checkIsComoon = function (isMsg) {
        if (isMsg === void 0) { isMsg = false; }
        return false;
    };
    MapScene.prototype.initWithID = function (id, force) {
        var cfg = Config.map_200[id];
        if (cfg) {
            if (id != GGlobal.sceneID || force) {
                this.destoryMapSkin(id);
                GGlobal.sceneID = id;
                GGlobal.control.notify(Enum_MsgType.ENTER_SCENE);
                View_MapPanel.show();
                this.view_far.enterMap(id);
            }
            this.mapsizeW = cfg.c;
            this.initMapCustom();
            this.map.setHead1(cfg.s, id);
            SoundManager.getInstance().playBGM(cfg.b);
        }
    };
    MapScene.prototype.destoryMapSkin = function (id) {
        if (id && GGlobal.sceneID) {
            var cfg = Config.map_200[id];
            var curCfg = Config.map_200[GGlobal.sceneID];
            var srcID = cfg.s;
            var curSrcID = curCfg.s;
            var dic = this.resourceDic;
            if (srcID != curSrcID) {
                var now = egret.getTimer();
                dic[srcID] = now;
                dic[curSrcID] = now;
                for (var i in dic) {
                    if (now - dic[i] > 60000) {
                        var imgType = "jpg";
                        if (cfg.type != 0)
                            imgType = "png";
                        var imgUrlNear = "resource/map/" + i + "/clipmap/0_0." + imgType;
                        RESManager.destoryRes(imgUrlNear);
                        delete dic[i];
                        return;
                    }
                }
            }
        }
    };
    MapScene.prototype.initMapCustom = function () {
        var stage = GGlobal.stage;
        this.map.va = { numRow: 1, numCol: 1 };
        this.map.blockSizeW = this.mapsizeW;
        this.map.blockSizeH = 1136;
        this.map.initCustom(stage.stageWidth, 1136, this.right, 1000);
        this.map.updateViewLimit();
        this.map.itemCreateFunc = ScrollMapRepeatItem.CREATEFUNC;
    };
    MapScene.prototype.moveMidbg = function (v) {
        this.view_far.move();
    };
    MapScene.prototype.shake = function (shakex, shakey) {
        if (shakex === void 0) { shakex = 1; }
        if (shakey === void 0) { shakey = 1; }
        if (this.isShake_ == 1) {
            this.isShake_ = 2;
            egret.Tween.get(this.mapView).to({ x: this.mapView.x + shakex, y: this.mapView.y + shakey }, 300, MapScene.SHAKEEASE).call(this.onShakeEnd);
        }
    };
    MapScene.prototype.onShakeEnd = function () {
        var self = GGlobal.mapscene;
        self.isShake_ = 1;
        self.mapView.x = 0;
        self.mapView.y = 0;
    };
    MapScene.SHAKEEASE = function (value) {
        var ret;
        var a = value * 2 % 1.0;
        ret = Math.sin(a * Math.PI * 2);
        return ret;
    };
    MapScene.prototype.addUnit = function (u) {
        if (!this.units[u.id]) {
            this.units[u.id] = u;
            this.list.push(u);
            u.scene = this;
            u.onAdd();
        }
    };
    MapScene.prototype.removeUnit = function (u) {
        if (u) {
            u.onRemove();
            this.list[this.list.indexOf(u)] = null;
            delete this.units[u.id];
            if (Model_player.voMine && Model_player.isMineID(u.id)) {
                Model_player.voMine.sceneChar = null;
            }
        }
    };
    MapScene.prototype.getUnit = function (id) {
        var ret = this.units[id];
        return ret;
    };
    MapScene.prototype.update = function (dt) {
        var self = this;
        self.intervTime += dt;
        if (self.intervTime < self.frameInterv) {
            return;
        }
        self.intervTime = 0;
        self.dt = dt;
        var ctx = self.ctx;
        ctx.dt = dt;
        if (self.pauseCounter) {
            return;
        }
        var list = self.list;
        var len = self.list.length;
        var cleanflag;
        for (var i = 0; i < len;) {
            var term = self.list[i];
            if (!term) {
                i++;
                cleanflag = 1;
                continue;
            }
            ctx.d = null;
            term.update(ctx);
            if (ctx.d) {
                delete self.units[term.id];
                list[i] = null;
                term.onRemove();
                len--;
            }
            else {
                i++;
            }
        }
        if (cleanflag) {
            ArrayUitl.cleannull(list);
        }
        self.time200 += dt;
        if (self.time200 >= 300) {
            self.unitLayer.sortChild();
            self.time200 = 0;
        }
        if (self.sceneCtrl) {
            self.sceneCtrl.update(ctx);
        }
        Model_player.skillCDUpdate(ctx);
        self.heartbeatTime += dt;
        if (self.heartbeatTime >= 2000) {
            self.heartbeatTime = 0;
            // GGlobal.modelScene.CG_HEARTBEAT_181();
        }
    };
    MapScene.prototype.removes = function (filter, arg) {
        for (var i = 0, len = this.list.length; i < len; i++) {
            var u = this.list[i];
            if (u && filter(u, arg)) {
                this.removeUnit(u);
            }
        }
    };
    MapScene.prototype.removeAll = function () {
        var units = this.units;
        for (var k in units) {
            var u = units[k];
            // if (u instanceof SceneCharRole) {
            // 	console.log("怪物名字" + u.name + "怪物气血" + u.curhp);
            // }
            if (u)
                u.onRemove();
            delete units[k];
        }
        this.units = {};
        this.list.length = 0;
        if (Model_player.voMine) {
            Model_player.voMine.sceneChar = null;
        }
    };
    /**获取场景中某个势力所有单位个数 */
    MapScene.prototype.getForceCount = function (force) {
        var list = this.list;
        var ret = 0;
        for (var i = list.length - 1; i >= 0; i--) {
            var u = list[i];
            if (u && u.force == force && u.charType != 2) {
                ret++;
            }
        }
        return ret;
    };
    /**获取场景中某个势力所有单位的总血量 */
    MapScene.prototype.getForceHp = function (force) {
        var list = this.list;
        var ret = 0;
        for (var i = list.length - 1; i >= 0; i--) {
            var u = list[i];
            if (u && u.charType != 2 && u.force == force && u.curhp > 0) {
                ret += u.curhp;
            }
        }
        return ret;
    };
    /**清除场景中某个势力 */
    MapScene.prototype.clearForce = function (force) {
        var list = this.list;
        var ret = 0;
        for (var i = list.length - 1; i >= 0; i--) {
            var u = list[i];
            if (u && u.force == force) {
                u.takeMaxHurt();
            }
        }
    };
    /** 如果不传入 arr来存放匹配的对象 请不要持久保存arr 否则会被其他地方调用删除 */
    MapScene.prototype.filterRole = function (filter, arg, arg2, arr) {
        if (arg === void 0) { arg = null; }
        if (arg2 === void 0) { arg2 = null; }
        if (arr === void 0) { arr = null; }
        if (!arr) {
            arr = this.bufArr;
            arr.length = 0;
        }
        var list = this.list;
        var len = this.list.length;
        for (var i = 0; i < len; i++) {
            var term = this.list[i];
            if (term && filter(term, arg, arg2)) {
                arr.push(term);
            }
        }
        return arr;
    };
    MapScene.prototype.getBestRole = function (scoreFunc, arg, arg2, thisArg) {
        if (arg === void 0) { arg = null; }
        if (arg2 === void 0) { arg2 = null; }
        if (thisArg === void 0) { thisArg = null; }
        var bestScore = -1;
        var best;
        var list = this.list;
        var len = this.list.length;
        for (var i = 0; i < len; i++) {
            var term = this.list[i];
            if (term) {
                var score = scoreFunc(term, arg, arg2, thisArg);
                if (score >= 0 && score >= bestScore) {
                    bestScore = score;
                    best = term;
                }
            }
        }
        return best;
    };
    MapScene.prototype.moveRole = function (role, x, y, h) {
        role.x += x;
        role.y += y;
        var nh = role.h + h;
        if (nh < 0) {
            nh = 0;
        }
        role.h = nh;
    };
    MapScene.prototype.hasRole = function (matchFunc, arg) {
        var list = this.list;
        var len = this.list.length;
        for (var i = 0; i < len; i++) {
            var term = this.list[i];
            if (matchFunc(term, arg)) {
                return true;
            }
        }
        return false;
    };
    MapScene.prototype.setRoleXY = function (role, x, y) {
        role.x = x;
        role.y = y;
    };
    MapScene.prototype.getLifeHero = function () {
        var vo = Model_player.voMine;
        var mainRole = this.getUnit(vo.id);
        return mainRole;
    };
    MapScene.prototype.watchMainRole = function (offx) {
        if (offx === void 0) { offx = 0; }
        var mainRole = this.getLifeHero();
        if (mainRole) {
            this.map.watchFocus(mainRole.x + offx, mainRole.y);
            this.moveMidbg(mainRole.x + offx);
        }
    };
    /**是否显示其他玩家的伤害值 role攻击者  role1被攻击者*/
    MapScene.prototype.setHurtState = function (role, ctx, role1) {
        ctx.clearHurt = null;
        ctx.isClearShow = null;
        if (this.ctx.clearHurt) {
            ctx.clearHurt = true;
        }
        if (this.ctx.isClearShow) {
            if (role1.id != Model_player.voMine.id && role1.charType == 1) {
                ctx.isClearShow = true;
            }
        }
        return ctx;
    };
    /**场景是否灰化 */
    MapScene.prototype.isGrey = function (bo) {
        if (bo) {
            if (!this.rec) {
                this.rec = new fairygui.GGraph();
                this.rec.drawRect(0, 0, 0, 0x000000, 1);
                this.rec.setSize(480, 800);
                this.rec.alpha = .5;
            }
            if (!this.rec.parent) {
                GGlobal.layerMgr.UI_MainBottom.addChildAt(this.rec, 0);
            }
            // this.view.filters = Color.disabled;
            // this.unitLayer.filters = Color.disabled;
        }
        else {
            if (this.rec && this.rec.parent) {
                this.rec.parent.removeChild(this.rec);
                this.rec.graphics.clear();
            }
            this.rec = null;
            // this.view.filters = [];
            // this.unitLayer.filters = [];
        }
    };
    MapScene.prototype.scaleScene = function (x, y) {
        if (x === void 0) { x = 0.8; }
        if (y === void 0) { y = 0.8; }
        this.scale = x;
        this.view.scaleX = x;
        this.view.scaleY = y;
    };
    MapScene.ISLIFEENEMY = function (term, myforce) {
        if (term.objType == 1 && term && term.curhp > 0 && term.force != 0 && term.force != myforce) {
            return true;
        }
    };
    MapScene.ISMONEY = function (term, myrole) {
        if (term.objType == 20) {
            return true;
        }
    };
    MapScene.NEARESTENEMYFUNC = function (term, role, arg2) {
        if (term.objType == 1 && term.force && term.force != role.force) {
            var subx = term.x - role.x;
            var suby = term.y - role.y;
            var far = subx * subx + (suby) * (suby);
            return 100000000000 - far;
        }
        return -1;
    };
    MapScene.NEARESTLIFEENEMYFUNC = function (term, role, arg2) {
        if (term.objType == 1 && term.force && term.curhp > 0 && term.force != role.force) {
            var subx = term.x - role.x;
            var suby = term.y - role.y;
            var far = subx * subx;
            return 100000000000 - far;
        }
        return -1;
    };
    MapScene.prototype.setLeftAndRight = function (left, right) {
        if (left === void 0) { left = 50; }
        if (right === void 0) { right = 99999999; }
        this.left = left;
        this.right = right;
    };
    return MapScene;
}(MsgCenter));
__reflect(MapScene.prototype, "MapScene");
