var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WenDingTXManager = (function () {
    function WenDingTXManager() {
        this.lastLayer = -1;
        this._isFirstEnter = true;
    }
    WenDingTXManager.getInstance = function () {
        if (!this._instanc)
            this._instanc = new WenDingTXManager();
        return this._instanc;
    };
    WenDingTXManager.prototype.init = function () {
        if (this._init)
            return;
        this._init = true;
        var spie = fairygui.UIObjectFactory.setPackageItemExtension;
        spie(WenDingTXStatePlug.URL, WenDingTXStatePlug);
        spie(WenDingTXNamePlug.URL, WenDingTXNamePlug);
        spie(ViewWenDingTXTopUI.URL, ViewWenDingTXTopUI);
        spie(ViewWenDingTXBottomUI.URL, ViewWenDingTXBottomUI);
        spie(ItemWDTXZhanDi.URL, ItemWDTXZhanDi);
        spie(ItemWDTXRank.URL, ItemWDTXRank);
        spie(ItemLayerRank.URL, ItemLayerRank);
        spie(ItemWDTXScore.URL, ItemWDTXScore);
        spie(ChildWDTXScoreRank.URL, ChildWDTXScoreRank);
        spie(ChildWDTXRank.URL, ChildWDTXRank);
        spie(ChildLianZhanPanel.URL, ChildLianZhanPanel);
        spie(ChildLayerRank.URL, ChildLayerRank);
        spie(WDTXMapNamePanel.URL, WDTXMapNamePanel);
    };
    WenDingTXManager.prototype.showMap = function () {
        if (this.lastLayer == GGlobal.modelWenDingTX.layer)
            return;
        this.lastLayer = GGlobal.modelWenDingTX.layer;
        if (!this.mapName)
            this.mapName = WDTXMapNamePanel.createInstance();
        this.mapName.show1();
    };
    WenDingTXManager.prototype.enter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sf = this;
                        sf.init();
                        GGlobal.modelWenDingTX.ACtiving = true;
                        return [4 /*yield*/, RES.getResAsync("wendingTX")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync("wendingTX_atlas0")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, sf.loadCompleteEnter()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WenDingTXManager.prototype.loadCompleteEnter = function () {
        if (!GGlobal.modelWenDingTX.ACtiving) {
            DEBUGWARING.log("问鼎天下已结束！！！");
            return;
        }
        GGlobal.createPack("wendingTX");
        var sf = this;
        GGlobal.modelWenDingTX.enter();
        ViewWenDingTXTopUI.createInstance().toShow();
        ViewWenDingTXBottomUI.createInstance().toShow();
        GGlobal.control.listen(Enum_MsgType.ARPG_SCENE_READY, this.showRevive, this);
        GGlobal.control.listen(Enum_MsgType.EXIT_SERVERBATTLE, WenDingTXManager.exiteBattle, sf);
        GGlobal.control.listen(Enum_MsgType.WDTX_PVE_END, sf.showReslt, sf);
        GGlobal.control.listen(Enum_MsgType.WDTX_LAYER_UPDATE, sf.changeSceneHD, sf);
        GGlobal.socketMgr.registerReconnectHD("WenDingTXManager01", Handler.create(this, this.onSocketClose));
        if (this._isFirstEnter && GGlobal.modelWenDingTX.layer != 0) {
            sf.changeSceneHD();
            this._isFirstEnter = false;
        }
    };
    WenDingTXManager.prototype.exite = function () {
        var sf = this;
        if (GGlobal.sceneType == SceneCtrl.WDTX_PVE) {
            GGlobal.mapscene.sceneCtrl.onExit();
        }
        ModelArpgMap.getInstance().isServerControlMap = true;
        GGlobal.modelWenDingTX.exite();
        GGlobal.modelWenDingTX.ACtiving = false;
        ViewWenDingTXTopUI.createInstance().toHide();
        ViewWenDingTXBottomUI.createInstance().toHide();
        ViewWenDingTXTopUI.createInstance().visible = true;
        ViewWenDingTXBottomUI.createInstance().visible = true;
        GGlobal.socketMgr.removeReconnectHD("WenDingTXManager01");
        GGlobal.control.remove(Enum_MsgType.WDTX_PVE_END, sf.showReslt, sf);
        GGlobal.control.remove(Enum_MsgType.ARPG_SCENE_READY, this.showRevive, this);
        GGlobal.control.remove(Enum_MsgType.EXIT_SERVERBATTLE, WenDingTXManager.exiteBattle, sf);
        GGlobal.control.remove(Enum_MsgType.WDTX_LAYER_UPDATE, sf.changeSceneHD, sf);
        ARPGMapManager.exite();
        Model_WorldNet.exiteCross();
        this._isFirstEnter = true;
        this.lastLayer = -1;
        console.log("问鼎天下 离开场景断开中央服");
    };
    WenDingTXManager.prototype.onSocketClose = function () {
        this.exite();
        Model_WorldNet.exiteCross();
        console.log("问鼎掉线 断开中央服");
    };
    WenDingTXManager.leavelBattleScene = function () {
        WenDingTXManager.exiteBattle();
    };
    WenDingTXManager.prototype.showReslt = function (arg) {
        this._arg = arg;
        Timer.instance.callLater(this.delayShowResultPanel, 200, this);
    };
    WenDingTXManager.prototype.delayShowResultPanel = function () {
        var arg = this._arg;
        if (arg.ret == 1) {
            ViewCommonWin.show(arg.awards, 5000, this, "确定", WenDingTXManager.exiteBattle, null, true);
        }
        else {
            ViewCommonFail.show(5000, this, "退出", WenDingTXManager.exiteBattle, null, null, true);
        }
    };
    //重新进入 arpg地图 需要对界面进行重新布局
    WenDingTXManager.prototype.changeSceneHD = function () {
        this._isFirstEnter = false;
        var m = GGlobal.modelWenDingTX;
        var cfg = Config.wdtx_260[m.layer];
        var mid = cfg.map;
        if (mid == ModelArpgMap.getInstance().sceneMap)
            return;
        ARPGMapManager.enter(mid, UIConst.WENDINGTX, false);
        this.showMap();
        this.showRevive();
    };
    WenDingTXManager.prototype.showRevive = function () {
        if (GGlobal.modelWenDingTX.deadTime > Model_GlobalMsg.getServerTime()) {
            GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, UIConst.WENDINGTX);
        }
    };
    WenDingTXManager.enterBattle = function () {
        ViewMainTopUI1.instance.visible = true;
        ViewMainTopUI.instance.visible = false;
        ViewWenDingTXTopUI.createInstance().visible = false;
        ViewWenDingTXBottomUI.createInstance().visible = false;
    };
    WenDingTXManager.exiteBattle = function () {
        if (!GGlobal.modelWenDingTX.ACtiving) {
            DEBUGWARING.log("问鼎天下已结束！！！");
            GGlobal.layerMgr.open(UIConst.WENDINGTX_RET);
            return;
        }
        ViewMainTopUI.instance.visible = true;
        ViewMainTopUI1.instance.visible = false;
        GGlobal.modelWenDingTX.reApplyEnter4225();
        WenDingTXManager.getInstance().loadCompleteEnter();
        ViewWenDingTXTopUI.createInstance().visible = true;
        ViewWenDingTXBottomUI.createInstance().visible = true;
    };
    WenDingTXManager.enterPve = function (id) {
        if (GGlobal.mapscene.sceneCtrl instanceof ARPGCtrl) {
            GGlobal.modelWenDingTX.fight4227(id);
        }
    };
    return WenDingTXManager;
}());
__reflect(WenDingTXManager.prototype, "WenDingTXManager");
