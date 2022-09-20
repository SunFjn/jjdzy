var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**ARPG地图  唯一*/ var ArpgMap = (function () {
    function ArpgMap() {
        this._portProxy = new PortProxy();
        this._foucus = new egret.Point();
        this._scale = 1;
        this.loadQueue = [];
        this._rcDict = {};
        this._init = false;
        //忽略碰撞的id
        this._ignoreList = {};
        this.loadingcount = 0;
        this.loadQueueLen = 0;
        this.urlMap = {};
    }
    ArpgMap.getInstance = function () {
        if (!this.inst)
            this.inst = new ArpgMap();
        return this.inst;
    };
    /**点击地图 寻路 or 地图单位交互*/
    ArpgMap.prototype.downEvent = function (e) {
        if (!TimeUitl.cool("ArpgMap_downEvent", 500)) {
            return;
        }
        if (!ModelArpgMap.sceneReady)
            return;
        GameUnitManager.getOverObj();
        var target = GameUnitManager.overObj;
        if (target instanceof ARPGNpc) {
            var npc = target;
        }
    };
    ArpgMap.prototype.addIgnoreId = function (id) {
        this._ignoreList[id] = true;
    };
    ArpgMap.prototype.clearIgnoreId = function () {
        this._ignoreList = {};
    };
    ArpgMap.prototype.hasIgnore = function (id) {
        return this._ignoreList[id];
    };
    ArpgMap.prototype.upEvent = function (e) {
        if (!TimeUitl.cool("ArpgMap_upEvent", 500)) {
            return;
        }
        if (!ModelArpgMap.sceneReady)
            return;
        if (!ModelArpgMap.moveEnable) {
            ViewCommonWarn.text("跟随状态不可移动");
            return;
        }
        var m = ModelArpgMap.getInstance();
        GGlobal.control.notify(Enum_MsgType.ARPG_MAP_CLICK, null);
        var unit = GameUnitManager.moveTargetPoint;
        WorldConfigManager.paths = [];
        GameUnitManager.getOverObj();
        var target = GameUnitManager.overObj;
        var hero = GameUnitManager.hero;
        GameUnitManager.hideFilter();
        if (target instanceof ARPGNpc) {
            var npc = target;
            target.showFilter();
            hero.target = target;
        }
        else if (target instanceof ArpgRole && target.id != hero.id && !this.hasIgnore(target.id)) {
            if (target instanceof ArpgRole) {
                ModelArpgMap.touchPoint.x = e.$stageX;
                ModelArpgMap.touchPoint.y = e.$stageY; //fairygui.GRoot.mouseY;
            }
            else {
                hero.target = target;
            }
            hero.target = target;
        }
        else if (target instanceof Door) {
            hero.lockTarget = null;
            if (ModelArpgMap.needShowTarPoint) {
                GameUnitManager.moveTargetPoint.show();
            }
            hero.autoMoveID = -1;
            hero.autoMoveType = -1;
            var point = this.mapBlockLayer.globalToLocal(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
            var goRet = hero.go(point.x, point.y);
        }
        else {
            if (ModelArpgMap.needShowTarPoint) {
                GameUnitManager.moveTargetPoint.show();
            }
            var point = this.mapBlockLayer.globalToLocal(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
            var goRet = hero.go(point.x, point.y);
            if (goRet) {
                GameUnitManager.hero.stopAutonMove();
            }
        }
    };
    ArpgMap.prototype.setXY = function (xx, yy) {
        this._foucus.x = xx;
        this._foucus.y = yy;
        this._portProxy.focusXY(xx, yy);
        this._portProxy.adjustRealPoint();
    };
    ArpgMap.prototype.setSight = function (sightX, sightY) {
        this.mapBlockLayer.x = sightX;
        this.mapBlockLayer.y = sightY;
        this.mainLayer.x = sightX;
        this.mainLayer.y = sightY;
        this.mapfrontLayer.x = sightX;
        this.mapfrontLayer.y = sightY;
    };
    Object.defineProperty(ArpgMap.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (value) {
            var sf = this;
            sf._scale = value;
            sf._portProxy.setScale(value);
            sf.mapBlockLayer.scaleX = sf.mapBlockLayer.scaleY = value;
            sf.mainLayer.scaleX = sf.mainLayer.scaleY = value;
            sf.mapfrontLayer.scaleX = sf.mapfrontLayer.scaleY = value;
            CameraManager.invalidate = true;
            CameraManager.update(0);
        },
        enumerable: true,
        configurable: true
    });
    ArpgMap.prototype.setRestrictWH = function (w, h) {
        this._portProxy.setRestrictWH(w, h);
        CameraManager.invalidate = true;
    };
    ArpgMap.prototype.rebuild = function () {
        var s = this;
        var m = ModelArpgMap.getInstance();
        var sceneid = m.sceneMap;
        var points = s._portProxy._pointRest;
        var portWid = Math.floor(s._portProxy._portWid / s._portProxy.scaleX);
        var portHei = Math.floor(s._portProxy._portHei / s._portProxy.scaleY);
        var tsx = Math.floor(Math.max(0, (points.x) / s._portProxy._matrix.a / ModelArpgMap.MAPBLOCKW));
        var tsy = Math.floor(Math.max(0, (points.y) / s._portProxy._matrix.d / ModelArpgMap.MAPBLOCKH));
        var ex = Math.ceil((points.x + portWid) / s._portProxy._matrix.a / ModelArpgMap.MAPBLOCKW);
        var ey = Math.ceil((points.y + portHei) / s._portProxy._matrix.d / ModelArpgMap.MAPBLOCKH);
        var maxex = Math.ceil(s._portProxy._restritRect.width / ModelArpgMap.MAPBLOCKW) - 1;
        var maxey = Math.ceil(s._portProxy._restritRect.height / ModelArpgMap.MAPBLOCKH) - 1;
        ex = Math.min(maxex, ex);
        ey = Math.min(maxey, ey);
        s.removes(tsx, tsy, ex, ey);
        ArpgMap._version++;
        for (var row = tsy; row <= ey; row++) {
            for (var col = tsx; col <= ex; col++) {
                s.addRC(row, col, sceneid);
            }
        }
        s.loadNextBlock();
    };
    ArpgMap.prototype.addRC = function (row, col, sceneid) {
        var s = this;
        var k = sceneid + "_" + row + "_" + col;
        if (sceneid != 0) {
            var block = s._rcDict[k] || Pool.getItemByClass("MapBlock", MapBlock);
            block.key = k;
            block.sceneid = sceneid;
            block.setRC(row, col);
            s.mapBlockLayer.addChild(block.back);
            if (block.alphainfo)
                s.mapfrontLayer.addChild(block.front);
            s._rcDict[k] = block;
            MapManager.addItemRC(row, col);
            s.addToLoadQueue(block);
        }
        if (block)
            block._version = ArpgMap._version;
    };
    ArpgMap.prototype.removes = function (sx, sy, ex, ey) {
        var s = this;
        var m = ModelArpgMap.getInstance();
        var sceneid = m.sceneMap;
        for (var k in s._rcDict) {
            var block = s._rcDict[k];
            if (block.col < sx || block.col > ex || block.row < sy || block.row > ey ||
                block._version != ArpgMap._version || block.sceneid != sceneid) {
                s.mapBlockLayer.removeChild(block.back);
                if (block.front.parent)
                    block.front.parent.removeChild(block.front);
                delete s._rcDict[k];
                block.dispose();
                MapManager.removeItemRC(block.row, block.col);
                s.spliceLoadQueue(block);
            }
        }
    };
    ArpgMap.prototype.addToLoadQueue = function (block) {
        var index = this.loadQueue.indexOf(block);
        if (index == -1) {
            this.loadQueue.push(block);
            this.loadQueueLen++;
        }
    };
    ArpgMap.prototype.spliceLoadQueue = function (block) {
        var index = this.loadQueue.indexOf(block);
        if (index != -1) {
            this.loadQueue.splice(index, 1);
            this.loadQueueLen--;
        }
    };
    ArpgMap.prototype.loadNextBlock = function () {
        var s = this;
        var hero = GameUnitManager.hero;
        if (s.loadingcount < 2 && s.loadQueueLen > 0 && ModelArpgMap.sceneReady) {
            s.herorow = Math.floor(hero.x / ModelArpgMap.MAPBLOCKW);
            s.herocol = Math.floor(hero.y / ModelArpgMap.MAPBLOCKH);
            s.loadQueue.sort(s.loadBlockCompare);
            var block = s.loadQueue.shift();
            s.loadQueueLen = s.loadQueue.length;
            var url = block.url;
            if (block) {
                if (!this._rcDict[block.key]) {
                    delete s.urlMap[block.key];
                    s.loadNextBlock();
                    return;
                }
                RES.getResByUrl(block.url, s.onBlockLoadComplete, { scene: s, block: block }, RES.ResourceItem.TYPE_IMAGE);
            }
            else {
                s.loadNextBlock();
            }
        }
    };
    ArpgMap.prototype.onBlockLoadComplete1 = function (obj) {
        obj.scene.loadingcount--;
        var block = obj.block;
        obj.scene.urlMap[block.key] = obj;
        block.onLoadComplete(obj.img);
        obj.scene.loadNextBlock();
    };
    ArpgMap.prototype.onBlockLoadComplete = function (img, url) {
        var obj = this;
        var block = obj.block;
        obj.scene.urlMap[block.key] = obj;
        block.onLoadComplete(img, url);
        obj.scene.loadingcount--;
        obj.scene.loadNextBlock();
    };
    ArpgMap.prototype.loadBlockCompare = function (a, b) {
        var av = Math.abs(a.row - this.herorow) + Math.abs(a.col - this.herocol);
        var bv = Math.abs(b.row - this.herorow) + Math.abs(b.col - this.herocol);
        var ret = av - bv;
        return ret;
    };
    ArpgMap.prototype.show = function () {
        var s = this;
        var m = ModelArpgMap.getInstance();
        GameUnitManager.init();
        CameraManager.update(0);
        MapManager.reSize(App.stage.stageWidth, App.stage.stageHeight);
        s.mapBlockLayer.touchable = true;
        s.mapBlockLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downEvent, this);
        s.mapBlockLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.upEvent, this);
        GGlobal.control.notify(Enum_MsgType.ENTER_SCENE);
        CameraManager.invalidate = true;
    };
    ArpgMap.prototype.sortChild = function () {
        var s = this;
        s.mainLayer.sortChild();
    };
    ArpgMap.prototype.disposeByChangeScene = function () {
        var s = this;
        if (!s.mainLayer)
            return;
        s.loadingcount = 0;
        s.loadQueue = [];
        ArrayUitl.cleannull(s.mainLayer.list);
        for (var k in s._rcDict) {
            var block = s._rcDict[k];
            s.mapBlockLayer.removeChild(block.back);
            if (block.front.parent)
                s.mapfrontLayer.removeChild(block.front);
            delete s._rcDict[k];
            block.dispose();
            MapManager.removeItemRC(block.row, block.col);
            s.spliceLoadQueue(block);
        }
    };
    ArpgMap.prototype.addLayer = function () {
        var parent = GGlobal.mapscene.view;
        var s = this;
        s._init = true;
        s.mapBlockLayer = new fairygui.GComponent();
        s.mapfrontLayer = new fairygui.GComponent();
        s.mainLayer = new DepSprite();
        parent.addChild(s.mapBlockLayer.displayObject);
        s.mapBlockLayer.touchable = false;
        parent.addChild(s.mapfrontLayer.displayObject);
        s.mapfrontLayer.touchable = false;
        parent.addChild(s.mainLayer);
        s.mainLayer.touchEnabled = false;
    };
    ArpgMap.prototype.destory = function () {
        var s = this;
        if (!s._init)
            return;
        s._init = false;
        s.disposeByChangeScene();
        s.mapBlockLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, s.downEvent, s);
        s.mapBlockLayer.removeEventListener(egret.TouchEvent.TOUCH_END, s.upEvent, s);
        s.mapBlockLayer.removeFromParent();
        s.mapfrontLayer.removeFromParent();
        s.mainLayer.parent.removeChild(s.mainLayer);
        s.mapBlockLayer = null;
        s.mapfrontLayer = null;
        s.mainLayer = null;
    };
    ArpgMap.SHAKEEASE = function (value) {
        var ret;
        var a = value * 2 % 1.0;
        ret = Math.sin(a * Math.PI * 2);
        return ret;
    };
    ArpgMap._version = 0;
    return ArpgMap;
}());
__reflect(ArpgMap.prototype, "ArpgMap");
