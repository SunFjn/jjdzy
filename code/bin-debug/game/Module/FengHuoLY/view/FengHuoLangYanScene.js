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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var FengHuoLangYanScene = (function (_super) {
    __extends(FengHuoLangYanScene, _super);
    function FengHuoLangYanScene() {
        var _this = _super.call(this) || this;
        _this.route = [];
        _this.imgPool = [];
        _this._cardDic = {};
        _this._playerDic = {};
        _this.hasTouch = true;
        _this.touchStart = 0;
        _this.touchPoint = new egret.Point();
        _this.mapScroll = false;
        _this.maxW = 2289;
        _this.maxH = 1500;
        _this.offetx = 0;
        _this.offety = 0;
        _this.autoSetCamera = true;
        var fact = fairygui.UIObjectFactory.setPackageItemExtension;
        fact(FengHuoLYTop.URL, FengHuoLYTop);
        fact(FengHuoLYUI.URL, FengHuoLYUI);
        fact(ItemCity.URL, ItemCity);
        fact(FenghuoHead.URL, FenghuoHead);
        fact(FengHuoMap.URL, FengHuoMap);
        fact(FengHuoNamePlug.URL, FengHuoNamePlug);
        fact(FengHuoLstIt.URL, FengHuoLstIt);
        fact(FenghuoTopBar.URL, FenghuoTopBar);
        _this.loadRes("FengHuoLY", "FengHuoLY_atlas0");
        return _this;
    }
    FengHuoLangYanScene.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLangYanScene"));
    };
    FengHuoLangYanScene.prototype.childrenCreated = function () {
        var sf = this;
        GGlobal.createPack("FengHuoLY");
        sf.view = fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLangYanScene").asCom;
        sf.contentPane = sf.view;
        sf.map = (sf.view.getChild("map"));
        sf.groupUI = (sf.view.getChild("groupUI"));
        sf.routeLayer = new fairygui.GComponent();
        sf.addChild(sf.routeLayer);
        sf.mapLayer = new fairygui.GComponent();
        sf.addChild(sf.mapLayer);
        sf.cityDic = sf.map.cityDic;
        sf.lbServer1 = sf.map.lbServer1;
        sf.lbServer2 = sf.map.lbServer2;
        sf.lbServer3 = sf.map.lbServer3;
        _super.prototype.childrenCreated.call(this);
    };
    FengHuoLangYanScene.prototype.updateCity = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        for (var i = 1; i < 11; i++) {
            var city = m.getCity(i);
            sf.cityDic[i].updateVO(city);
            if (city.owerID > 0) {
                sf.removePlayer(city.owerID);
            }
        }
        //城主的变更需要更新场景的模型数据 (主动移动，显示模型。 击杀移动，直接返回复活点)
        if (m.sceneUpdateMark == 1) {
            m.sceneUpdateMark = 0;
            var serverDta = m.scenePlayer;
            var dic = sf._playerDic;
            for (var i_1 in serverDta) {
                var vo = serverDta[i_1];
                sf.addPlayer(vo);
            }
        }
    };
    FengHuoLangYanScene.prototype.scenePlayerHd = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        var dic = sf._playerDic;
        var serverDta = m.scenePlayer;
        for (var i in dic) {
            var vo = serverDta[i];
            if (!vo.needShowAwatar()) {
                sf.removePlayer(i);
            }
        }
    };
    //同步服务器的列表玩家的数据  服务器会增删玩家
    FengHuoLangYanScene.prototype.updateScenePlayer = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        var serverDta = m.scenePlayer;
        var dic = sf._playerDic;
        //add player
        for (var i in serverDta) {
            var vo = serverDta[i];
            sf.addPlayer(vo);
        }
        //对比服务器数据去移除一些不存在的单元 remove player
        for (var i in dic) {
            if (!serverDta[i]) {
                sf.removePlayer(i);
            }
        }
        if (sf.autoSetCamera) {
            sf.autoSetCamera = !sf.cameraFocusMe();
        }
    };
    FengHuoLangYanScene.prototype.findPlayer = function (playerID) {
        var vo;
        if (this._playerDic[playerID]) {
            vo = this._playerDic[playerID];
        }
        return vo;
    };
    FengHuoLangYanScene.prototype.checkRoute = function () {
        var sf = this;
        var hero = sf.findPlayer(Model_player.voMine.id);
        if (!hero || !hero.data || sf.route.length == 0)
            return;
        var tx = hero.data.x;
        var ty = hero.data.y;
        var dist = MathUtil.dist(hero.x, hero.y, tx, ty);
        for (var i = sf.route.length - 1; i >= 0; i--) {
            var img = sf.route[i];
            var dist1 = MathUtil.dist(img.x, img.y, tx, ty);
            if (dist1 > dist) {
                img.parent.removeChild(img);
                sf.route.splice(i, 1);
                sf.imgPool.push(img);
                i = sf.route.length - 1;
            }
            else {
                break;
            }
        }
    };
    FengHuoLangYanScene.prototype.drawRoute = function (x, y, role) {
        var sf = this;
        var dx = role.x - x;
        var dy = role.y - y;
        var dist = MoveUtil.distSqrt(x, y, role.x, role.y);
        var angle = MoveUtil.caculateAngle(x, y, role.x, role.y);
        var num = Math.floor(dist / 30);
        for (var i = 0; i < num; i++) {
            var bm = sf.imgPool.length ? sf.imgPool.shift() : new fairygui.GLoader();
            bm.url = "ui://edvdots4j08a1o";
            bm.rotation = angle + 90;
            var per = i / num;
            bm.setXY(dx * per + x, per * dy + y);
            sf.routeLayer.addChild(bm);
            sf.route.push(bm);
        }
    };
    FengHuoLangYanScene.prototype.sceneMove = function (obj) {
        var id = obj.id;
        var type = obj.type;
        var xx = obj.x;
        var yy = obj.y;
        var isMine = Model_player.isMineID(id);
        if (isMine && type == 1) {
            return;
        }
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        var role = this.findPlayer(id);
        if (!role) {
            var vo = GGlobal.modelFengHuoLY.getPlayer(id);
            if (!vo) {
                if (true)
                    ViewCommonWarn.text("找不到玩家ID" + id);
                return;
            }
            else {
                role = sf.addPlayer(vo, true);
            }
        }
        role.faceX(xx);
        if (type == 1) {
            var dist = MoveUtil.distSqrt(xx, yy, role.x, role.y);
            var time = dist * 10 * 200 / role.speed;
            ;
            egret.Tween.removeTweens(role);
            role.setAction(1);
            egret.Tween.get(role).to({ x: xx, y: yy }, time).call(sf.moveEnd, sf, [role, id]);
        }
        else {
            role.setDir(1000 >= xx ? 1 : -1);
            role.setXY(xx, yy);
            if (isMine) {
                sf.cameraFocusMe();
            }
            GGlobal.modelFengHuoLY.setPlayerXY(id, role.x, role.y);
        }
    };
    FengHuoLangYanScene.prototype.moveToCity = function (cityid, playerID) {
        var role = this.findPlayer(playerID);
        if (!role) {
            var pvo = GGlobal.modelFengHuoLY.getPlayer(playerID);
            if (!pvo)
                return;
            role = this.addPlayer(pvo, true);
        }
        var sf = this;
        var city = this.cityDic[cityid];
        var x = city.xx;
        var y = city.yy;
        role.faceX(x);
        var dist = MoveUtil.distSqrt(x, y, role.x, role.y);
        var time = dist * 10 * 200 / role.speed; //骑马
        role.data = {};
        role.data.cityid = cityid;
        role.data.playerID = playerID;
        role.data.x = x;
        role.data.y = y;
        sf.clearRoute();
        if (playerID == Model_player.voMine.id) {
            this.drawRoute(x, y, role);
        }
        egret.Tween.removeTweens(role);
        role.setAction(1);
        egret.Tween.get(role).to({ x: x, y: y }, time).call(this.moveEnd, this, [role, playerID]);
    };
    FengHuoLangYanScene.prototype.moveEnd = function (role, playerID) {
        if (Model_player.isMineID(playerID)) {
            var cityid = role.data.cityid;
            var sf = this;
            sf.clearRoute();
            var city = sf.cityDic[cityid];
            city.interactive();
        }
        role.setAction(0);
        GGlobal.modelFengHuoLY.setPlayerXY(playerID, role.x, role.y);
    };
    FengHuoLangYanScene.prototype.canCreate = function (i) {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        var serverDta = m.scenePlayer;
        var dic = sf._playerDic;
        var ret = !dic[i] && !m.hasCity(i) && !m.inCity(i);
        return ret;
    };
    FengHuoLangYanScene.prototype.addPlayer = function (vo, igone) {
        if (igone === void 0) { igone = false; }
        var sf = this;
        if (!vo || sf._playerDic[vo.id]) {
            return null;
        }
        if (!sf.canCreate(vo.id) && !igone) {
            return;
        }
        var awatar = UIRole.create();
        awatar.setAction(0);
        awatar.name = vo.name;
        awatar.speed = vo.speed;
        awatar.setXY(vo.xx, vo.yy);
        awatar.extraFrameFun = awatar.synchroPos;
        awatar.setJob(vo.job);
        awatar.setGodWeapon(vo.godweapon);
        awatar.setHorseId(vo.horseId);
        awatar.setDir(vo.xx > 1500 ? -1 : 1);
        var namebar = FengHuoNamePlug.create(Model_player.isMineID(vo.id));
        namebar.role = awatar;
        namebar.setCamp(vo.camp);
        var cfg = Config.mod_200[awatar.getBody()];
        if (cfg && cfg.h) {
            if (vo.horseId) {
                awatar.setNameY(-cfg.zh - 60);
            }
            else {
                awatar.setNameY(-cfg.h - 60);
            }
        }
        awatar.headGroup.x = -93;
        awatar.addPlug(namebar);
        namebar.setArrow(Model_player.isMineID(vo.id));
        // awatar.setScaleXY(0.7, 0.7);
        awatar.uiparent = sf.mapLayer.displayListContainer;
        awatar.onAdd();
        sf._playerDic[vo.id] = awatar;
        return awatar;
    };
    FengHuoLangYanScene.prototype.removePlayer = function (id) {
        if (this._playerDic[id]) {
            var awatar = this._playerDic[id];
            awatar.onRemove();
            egret.Tween.removeTweens(awatar);
            awatar = null;
        }
        delete this._playerDic[id];
    };
    FengHuoLangYanScene.prototype.clearRoute = function () {
        var sf = this;
        while (sf.route.length) {
            var img = sf.route.shift();
            img.parent.removeChild(img);
            sf.imgPool.push(img);
        }
    };
    FengHuoLangYanScene.prototype.heartHD = function () {
        var sf = this;
        if (this.hasTouch) {
            sf.mapScroll = (egret.getTimer() - sf.touchStart) > 100;
        }
        else {
            sf.mapScroll = false;
        }
        //check route
        sf.checkRoute();
        if (GGlobal.modelFengHuoLY.camera == 1) {
            sf.cameraFocusMe();
        }
        var now = egret.getTimer();
        for (var i = 1; i < 11; i++) {
            var city = sf.cityDic[i];
            sf.cityDic[i].updateShow(now);
        }
    };
    FengHuoLangYanScene.prototype.touchMapMove = function (evt) {
        var sf = this;
        if (!sf.mapScroll)
            return;
        var xx = evt.$stageX;
        var yy = evt.$stageY;
        var x = sf.map.x - (sf.touchPoint.x - xx);
        var y = sf.map.y - (sf.touchPoint.y - yy);
        sf.touchPoint.x = xx;
        sf.touchPoint.y = yy;
        sf.mapMove(x, y);
    };
    //镜头拉到自己身上
    FengHuoLangYanScene.prototype.cameraFocusMe = function () {
        var pos;
        var sf = this;
        var mid = Model_player.voMine.id;
        var player = sf._playerDic[mid];
        if (player) {
            pos = {};
            pos.x = player.x;
            pos.y = player.y;
        }
        else {
            var cid = GGlobal.modelFengHuoLY.getMyCity();
            if (cid > 0) {
                pos = {};
                pos.x = sf.cityDic[cid].xx;
                pos.y = sf.cityDic[cid].yy;
            }
            else {
                var zhengshouID = GGlobal.modelFengHuoLY.zhengshouID;
                if (zhengshouID > 0) {
                    pos = {};
                    pos.x = sf.cityDic[zhengshouID].xx;
                    pos.y = sf.cityDic[zhengshouID].yy;
                }
            }
        }
        if (pos) {
            var minx = fairygui.GRoot.inst.width;
            var miny = fairygui.GRoot.inst.height;
            var rx = pos.x - minx / 2;
            var ry = pos.y - miny / 2;
            sf.mapMove(-rx, -ry);
            return true;
        }
        else {
            return false;
        }
    };
    FengHuoLangYanScene.prototype.mapMove = function (xx, yy) {
        var sf = this;
        if (sf.offetx == xx && sf.offety == yy)
            return;
        var maxx = 0;
        var maxy = 0;
        var minx = fairygui.GRoot.inst.width - sf.maxW;
        var miny = fairygui.GRoot.inst.height - sf.maxH;
        sf.offetx = xx;
        sf.offety = yy;
        if (sf.offetx < minx) {
            sf.offetx = minx;
        }
        else if (sf.offetx > maxx) {
            sf.offetx = maxx;
        }
        if (sf.offety < miny) {
            sf.offety = miny;
        }
        else if (sf.offety > maxy) {
            sf.offety = maxy;
        }
        sf.map.setXY(sf.offetx, sf.offety);
        sf.mapLayer.setXY(sf.offetx, sf.offety);
        sf.routeLayer.setXY(sf.offetx, sf.offety);
    };
    FengHuoLangYanScene.prototype.touchMap = function (evt) {
        var s = this;
        if (GGlobal.modelFengHuoLY.camera == 1)
            return;
        s.hasTouch = true;
        s.touchStart = egret.getTimer();
        s.touchPoint = new egret.Point(evt.$stageX, evt.$stageY);
    };
    FengHuoLangYanScene.prototype.touchMapEnd = function () {
        this.hasTouch = false;
    };
    FengHuoLangYanScene.prototype.heroMove = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        sf.moveToCity(m.moveCityID, Model_player.voMine.id);
    };
    FengHuoLangYanScene.prototype.uiInit = function () {
        var sf = this;
        sf.map.enter();
        for (var i in sf.cityDic) {
            sf.cityDic[i].registHD();
        }
    };
    FengHuoLangYanScene.prototype.sceneInit = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        sf.lbServer1.text = m.blueServer == 0 ? "轮空" : "S." + m.blueServer;
        sf.lbServer2.text = m.redServer == 0 ? "轮空" : "S." + m.redServer;
        sf.lbServer3.text = m.greenServer == 0 ? "轮空" : "S." + m.greenServer;
    };
    FengHuoLangYanScene.prototype.stateChange = function () {
        var sf = this;
        var st = GGlobal.modelFengHuoLY.state;
        if (st != 1) {
            for (var i in sf.cityDic) {
                sf.cityDic[i].stopCollect();
            }
        }
    };
    FengHuoLangYanScene.prototype.cityStateChange = function (vo) {
        var sf = this;
        // let st = GGlobal.modelFengHuoLY.state;
        // if (st != 1) {
        sf.cityDic[vo.id].updateVO(vo);
        // }
    };
    FengHuoLangYanScene.prototype.listen = function () {
        var sf = this;
        sf.map.addEventListener(egret.TouchEvent.TOUCH_BEGIN, sf.touchMap, sf);
        sf.map.addEventListener(egret.TouchEvent.TOUCH_MOVE, sf.touchMapMove, sf);
        sf.map.addEventListener(egret.TouchEvent.TOUCH_END, sf.touchMapEnd, sf);
        var ctr = GGlobal.control;
        ctr.listen(Enum_MsgType.FHLY_CITY_UPDATE, sf.updateCity, sf);
        ctr.listen(Enum_MsgType.FHLY_SCENE_PLAYER, sf.updateScenePlayer, sf);
        ctr.listen(Enum_MsgType.FHLY_HERO_MOVE, sf.heroMove, sf);
        ctr.listen(Enum_MsgType.FHLY_SYSCHRO, sf.sceneMove, sf);
        ctr.listen(Enum_MsgType.FHLY_SCORE_INIT, sf.sceneInit, sf);
        ctr.listen(Enum_MsgType.FHLY_STATE_CHANGE, sf.stateChange, sf);
        ctr.listen(Enum_MsgType.FHLY_CITYSTATE_CHANGE, sf.cityStateChange, sf);
        ctr.listen(Enum_MsgType.FHLY_PLAYER_STATE, sf.scenePlayerHd, sf);
        sf.updateCity();
        sf.updateScenePlayer();
        sf.sceneInit();
    };
    FengHuoLangYanScene.prototype.onShown = function () {
        var sf = this;
        FengHuoLYCtr.getInstance().enter();
        sf.uiInit();
        sf.listen();
        Timer.instance.listen(sf.heartHD, sf, 30);
        if (this._args && this._args.type) {
            if (this._args.type == 2) {
                sf.autoSetCamera = true;
            }
        }
        IconUtil.setImg(sf.n20, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
        IconUtil.setImg(sf.n40, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
        IconUtil.setImg(sf.n23, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
    };
    FengHuoLangYanScene.prototype.onHide = function () {
        var sf = this;
        if (!sf.map)
            return;
        sf.map.exite();
        sf.autoSetCamera = true;
        FengHuoLYCtr.getInstance().exite();
        sf.clearRoute();
        GGlobal.modelFengHuoLY.CG_QUIT_3575();
        for (var i in sf._playerDic) {
            sf.removePlayer(i);
        }
        for (var i in sf.cityDic) {
            sf.cityDic[i].removeHD();
        }
        GGlobal.layerMgr.close(UIConst.FHLY);
        sf.map.removeEventListener(egret.TouchEvent.TOUCH_MOVE, sf.touchMapMove, sf);
        sf.map.removeEventListener(egret.TouchEvent.TOUCH_END, sf.touchMapEnd, sf);
        sf.map.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, sf.touchMap, sf);
        Timer.instance.remove(sf.heartHD);
        var ctr = GGlobal.control;
        ctr.remove(Enum_MsgType.FHLY_SCENE_PLAYER, sf.updateScenePlayer, sf);
        ctr.remove(Enum_MsgType.FHLY_CITY_UPDATE, sf.updateCity, sf);
        ctr.remove(Enum_MsgType.FHLY_HERO_MOVE, sf.heroMove, sf);
        ctr.remove(Enum_MsgType.FHLY_SYSCHRO, sf.sceneMove, sf);
        ctr.remove(Enum_MsgType.FHLY_SCORE_INIT, sf.sceneInit, sf);
        ctr.remove(Enum_MsgType.FHLY_STATE_CHANGE, sf.stateChange, sf);
        ctr.remove(Enum_MsgType.FHLY_CITYSTATE_CHANGE, sf.cityStateChange, sf);
        ctr.remove(Enum_MsgType.FHLY_PLAYER_STATE, sf.scenePlayerHd, sf);
        IconUtil.setImg(sf.n20, null);
        IconUtil.setImg(sf.n40, null);
        IconUtil.setImg(sf.n23, null);
    };
    FengHuoLangYanScene.URL = "ui://edvdots4srrs3";
    return FengHuoLangYanScene;
}(UIModalPanel));
__reflect(FengHuoLangYanScene.prototype, "FengHuoLangYanScene");
