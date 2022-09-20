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
var GameLoadingView = (function () {
    function GameLoadingView() {
        this.imgName = "Login";
        this.fuiName = "Login_atlas0";
        this.WIDTH = 591;
        this.isShow = false;
        this.isInit = false;
        this.per = 0;
        this.tips = "";
        this.initView();
    }
    GameLoadingView.getInst = function () {
        return this._inst || (this._inst = new GameLoadingView());
    };
    GameLoadingView.prototype.initView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, imageLoader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.getResAsync(this.imgName)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync(this.fuiName)];
                    case 2:
                        _a.sent();
                        GGlobal.createPack("Login");
                        self = this;
                        self.panel = fairygui.UIPackage.createObject("Login", "viewLoading").asCom;
                        self.bg = new egret.Bitmap();
                        imageLoader = new egret.ImageLoader();
                        imageLoader.addEventListener(egret.Event.COMPLETE, self.loadCompleteHandler1, self);
                        self.bgSrc = RESManager.getVersionUrl("loginres/Bm_Back12.jpg");
                        imageLoader.load(self.bgSrc);
                        GGlobal.main.addChildAt(self.bg, 0);
                        self._proBg = self.panel.getChild("progressBg");
                        self._proBar = self.panel.getChild("progressBar");
                        self._proBg1 = self.panel.getChild("progressBg1");
                        self._proBar1 = self.panel.getChild("progressBar1");
                        self._tips = self.panel.getChild("txtProp");
                        self.txtInfo = self.panel.getChild("txtInfo");
                        if (self.isShow) {
                            GGlobal.main.addChild(self.panel.displayObject);
                        }
                        if (GGlobal.layerMgr.UI_OFFLINE) {
                            GGlobal.main.setChildIndex(GGlobal.layerMgr.UI_OFFLINE.displayObject, GGlobal.main.numChildren - 1);
                        }
                        self.resize();
                        self.isInit = true;
                        self._proBar.width = 1;
                        self.showPro(self.per, self.tips);
                        self._proBar1.width = 0;
                        egret.Tween.get(self._proBar1, { loop: true }).to({ width: self.WIDTH }, 600).wait(100).call(this.resetWidth, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    GameLoadingView.prototype.resetWidth = function () {
        this._proBar1.width = 0;
    };
    GameLoadingView.prototype.loadCompleteHandler1 = function (event) {
        var imageLoader = event.currentTarget;
        var texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this.bg.texture = texture;
        this.resize();
    };
    GameLoadingView.prototype.hideBg = function (v) {
        this.bg.visible = v;
    };
    GameLoadingView.prototype.show = function () {
        var self = this;
        self.isShow = true;
        if (self.panel && !self.panel.displayObject.stage) {
            GGlobal.main.addChild(self.panel.displayObject);
            if (GGlobal.layerMgr.UI_OFFLINE) {
                GGlobal.main.setChildIndex(GGlobal.layerMgr.UI_OFFLINE.displayObject, GGlobal.main.numChildren - 1);
            }
        }
    };
    GameLoadingView.prototype.hide = function () {
        var self = this;
        self.isShow = false;
        if (self.panel && self.panel.displayObject.stage) {
            GGlobal.main.removeChild(self.panel.displayObject);
        }
        egret.Tween.removeTweens(self._proBar);
        self._proBar.width = 0;
    };
    GameLoadingView.prototype.clearMemTaken = function () {
        var self = this;
        self.bg.texture = null;
        egret.Tween.removeTweens(self._proBar);
        egret.Tween.removeTweens(this._proBar1);
        if (self.bg) {
            self.bg.texture = null;
        }
        if (self.panel && self.panel.displayObject.stage) {
            GGlobal.main.removeChild(self.panel.displayObject);
        }
        if (self.bg && self.bg.stage) {
            GGlobal.main.removeChild(self.bg);
        }
    };
    GameLoadingView.prototype.showPro = function (per, tips) {
        var self = this;
        self.per = per;
        self.tips = tips;
        if (!self.isShow) {
            self.show();
        }
        if (self.isInit) {
            egret.Tween.removeTweens(self._proBar);
            egret.Tween.get(self._proBar).to({ width: per * self.WIDTH }, 200);
            self.txtInfo.text = tips;
            self._tips.text = "加载中,请稍后";
        }
        if (per == 1 && GGlobal.main.isNewRole) {
            self.bg.visible = false;
            GGlobal.layerMgr.open(UIConst.STORE_ANI);
        }
    };
    GameLoadingView.prototype.resize = function () {
        this.panel.scaleX = this.panel.scaleY = LayerManager.getFullScreenSc();
        var xx = (App.stage.stageWidth - this.panel.width * this.panel.scaleX) >> 1;
        var yy = (App.stage.stageHeight - this.panel.height * this.panel.scaleY) >> 1;
        this.panel.setXY(xx, yy);
        var sw = App.stage.stageWidth;
        var sh = App.stage.stageHeight;
        var rate = sh / sw;
        var mx = sw / 640;
        var my = sh / 1136;
        var sc = Math.max(mx, my);
        this.bg.scaleX = sc;
        this.bg.scaleY = sc;
        this.bg.x = (sw - this.bg.width * sc) >> 1; //不考虑横屏
    };
    return GameLoadingView;
}());
__reflect(GameLoadingView.prototype, "GameLoadingView");
