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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._last = 0;
        _this.logicDetail = 0;
        RES.setMaxLoadingThread(6);
        egret.TextField.default_fontFamily = "Microsoft YaHei";
        egret.TextField.default_size = 24;
        egret.ImageLoader.crossOrigin = "anonymous";
        fairygui.UIConfig.modalLayerAlpha = 0.6;
        fairygui.UIConfig.buttonSound = "common_b8ux3dh";
        fairygui.UIConfig.defaultFont = "Microsoft YaHei";
        GGlobal.main = _this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var self = this;
        var entrance;
        App.stage = GGlobal.stage = egret.MainContext.instance.stage;
        if (this.getLoginArg() && this.getLoginArg().mainType) {
            GameConfig.codeType = this.getLoginArg().mainType;
        }
        switch (GameConfig.codeType) {
            case 1:
                entrance = new WxMain();
                break;
            case 2:
                entrance = new H5Main();
                break;
            case 3:
                entrance = new ADBMain();
                break;
        }
        self.entrance = entrance;
        self.mainResolve = entrance.mainResolve;
        self.setloadVis = entrance.setloadVis;
        self.hideLoadBg = entrance.hideLoadBg;
        self.showStoreAni = entrance.showStoreAni;
        GameConfig.initProductInof();
        self.addEventListener(egret.Event.ENTER_FRAME, self.frameLogic, self);
        self.setAdaptation();
    };
    Main.prototype.setAdaptation = function () {
        var isMobile = egret.Capabilities.isMobile;
        if (!isMobile) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
    };
    Main.prototype.getLoginArg = function () {
        return window.loginArg;
    };
    Main.prototype.showFenHaoByServer = function () {
        window.showFenHaoByServer();
    };
    Main.prototype.getWhiteState = function () {
        return window.whitelist;
    };
    Main.prototype.drawBlackBg = function () {
        var shap = new fairygui.GGraph();
        shap.setSize(App.stage.stageWidth, App.stage.stageHeight);
        shap.drawRect(0, 0, 0, 0x0, 1);
        GGlobal.main.addChildAt(shap.displayObject, 0);
    };
    Main.prototype.frameLogic = function () {
        var self = this;
        var nowTime = egret.getTimer();
        var dt = nowTime - self._last;
        if (dt < 20) {
            return;
        }
        self._last = nowTime;
        self.isLowFPS = dt > 50;
        if (GGlobal.mapscene) {
            GGlobal.mapscene.update(dt);
        }
        Timer.instance.run();
        if (nowTime - this.logicDetail > 150) {
            this.logicDetail = nowTime;
            GGlobal.control.notify(Enum_MsgType.MSG_ENTERFRAME);
        }
        RESManager.checkRes(dt);
    };
    Main.body_part_type = PartType.DB;
    Main.skill_part_type = PartType.DB;
    return Main;
}(egret.Sprite));
__reflect(Main.prototype, "Main");
