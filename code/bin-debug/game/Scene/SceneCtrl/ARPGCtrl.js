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
var ARPGCtrl = (function (_super) {
    __extends(ARPGCtrl, _super);
    function ARPGCtrl() {
        var _this = _super.call(this) || this;
        _this.npcCFG = {};
        _this.heroPlugs = [];
        _this.exptime = 0;
        _this._init = false;
        return _this;
    }
    ARPGCtrl.prototype.binder = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ArpgPlayerNamePlug.URL, ArpgPlayerNamePlug);
    };
    ARPGCtrl.prototype.onEnter = function () {
        var sf = this;
        if (!this._init) {
            this.binder();
        }
        GGlobal.layerMgr.closeAllPanelExcept([ViewCommonWarn, ViewBattleFault, ViewCommonWin]);
        SceneManager.init();
        var m = ModelArpgMap.getInstance();
        m.createMyCharData();
        GGlobal.mapscene.setScrollMapVis(false);
        GameUnitManager.initData();
        this.setMainUILayout();
        if (!m.isServerControlMap && m.sceneMap) {
            ModelArpgMap.getInstance().CG_ENTER_SCENE(m.sceneMap);
        }
        MainUIController.showBottomExite(true, Handler.create(this, this.returnGuanqia));
    };
    ARPGCtrl.prototype.onExit = function () {
        var sf = this;
        GGlobal.mapscene.setScrollMapVis(true);
        GGlobal.layerMgr.close2(UIConst.ARPG_SCENEVIEW);
        ModelArpgMap.getInstance().exiteARPG();
        GameUnitManager.dispose();
        SceneManager.destory();
        MainUIController.showBottomExite(false);
    };
    ARPGCtrl.prototype.directExite = function () {
        var maptype = ModelArpgMap.getInstance().sceneType;
        switch (maptype) {
            case EnumMapType.BOSSZC_LOCAL:
            case EnumMapType.BOSSZC_CROSS:
                GGlobal.modelBossZc.CGExite();
                break;
            case EnumMapType.SYZLB:
                GGlobal.model_Syzlb.CG_EXIT_CHA();
                break;
            default:
                GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
                break;
        }
        ModelArpgMap.getInstance().isAutoExite = true;
    };
    ARPGCtrl.prototype.returnGuanqia = function () {
        var tips = '确认离开？';
        var maptype = ModelArpgMap.getInstance().sceneType;
        switch (maptype) {
            case EnumMapType.WDTX:
                tips = "";
                break;
            case EnumMapType.BOSSZC_LOCAL:
            case EnumMapType.BOSSZC_CROSS:
                if (GGlobal.modelBossZc.sceneState != 1) {
                    tips = "入口已关闭，确定退出？";
                }
                else {
                    tips = "退出后进入需<font color='#fe0000'>间隔10秒</font>，确定退出？";
                }
                break;
            case EnumMapType.SYZLB:
                tips = "退出队伍后将离开副本且次数不返还\n确认离开？";
                break;
        }
        ViewAlert.show(tips, Handler.create(this, this.directExite), ViewAlert.OKANDCANCEL);
    };
    ARPGCtrl.prototype.setMainUILayout = function () {
        var fromID = ModelArpgMap.getInstance().sceneType;
        switch (fromID) {
            case UIConst.WENDINGTX:
                GGlobal.mainUICtr.setState(MainUIController.WENDINGTIANXIA);
                break;
            case UIConst.BOSS_BATTLEFIELD_LOCAL:
            case UIConst.BOSS_BATTLEFIELD_CROSS:
                GGlobal.mainUICtr.setState(MainUIController.BOSS_BATTLEFIELD);
                break;
            case UIConst.SANGUO_YITONG:
                GGlobal.mainUICtr.setState(MainUIController.SANGUO_YITONG);
                break;
            case EnumMapType.LIANGCAO:
                GGlobal.mainUICtr.setState(MainUIController.FHLY);
                break;
            default:
                GGlobal.mainUICtr.setState(fromID);
                break;
        }
    };
    ARPGCtrl.prototype.update = function (ctx) {
        if (!ModelArpgMap.sceneReady)
            return;
        ctx.now = egret.getTimer();
        GameUnitManager.run(ctx);
        CameraManager.update(ctx.dt);
    };
    ARPGCtrl.getInstance = function () {
        return this._inst || (this._inst = new ARPGCtrl());
    };
    return ARPGCtrl;
}(SceneCtrl));
__reflect(ARPGCtrl.prototype, "ARPGCtrl");
