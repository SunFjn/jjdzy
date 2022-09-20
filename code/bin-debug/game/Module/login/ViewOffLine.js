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
var ViewOffLine = (function (_super) {
    __extends(ViewOffLine, _super);
    function ViewOffLine() {
        var _this = _super.call(this) || this;
        _this.hasHand = false;
        _this.hasInit = false;
        _this.time = 10;
        _this.loadRes();
        return _this;
    }
    ViewOffLine.prototype.childrenCreated = function () {
        var self = this;
        self.isClosePanel = false;
        self.view = fairygui.UIPackage.createObject("common", "ViewOffLine").asCom;
        self.contentPane = self.view;
        self.backImg = self.view.getChild("backImg").asLoader;
        if (GGlobal.commonpkg) {
            ImageLoader.instance.loader(Enum_Path.BACK_URL + "offline.jpg", self.backImg);
        }
        self.sureBt = self.view.getChild("sureBt").asButton;
        self.sureBt.addClickListener(self.onHand, self);
        _super.prototype.childrenCreated.call(this);
        if (self.closeButton) {
            self.closeButton.visible = false;
        }
        // if (!self.hasInit) {
        // 	self.hasInit = true;
        // 	self.setOffLineInfo(self.strContent);
        // }
    };
    ViewOffLine.prototype.onHand = function () {
        var self = this;
        if (self.hasHand) {
            return;
        }
        self.hasHand = true;
        // if (self.time <= 0) {
        // } else {
        // 	GGlobal.modelLogin.reLogin();
        // }
        self.doHideAnimation();
    };
    ViewOffLine.prototype.onHide = function () {
        GGlobal.modelLogin.exiteGame();
        GGlobal.layerMgr.close(UIConst.OFFLINE);
        this.hasHand = false;
        Timer.instance.remove(this.run, this);
    };
    ViewOffLine.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        this.time = 10;
        // Timer.instance.listen(this.run, this, 1000);
    };
    ViewOffLine.show = function (content) {
        if (!GGlobal.layerMgr.isOpenView(UIConst.OFFLINE)) {
            GGlobal.layerMgr.open(UIConst.OFFLINE);
        }
        var self = GGlobal.layerMgr.getView(UIConst.OFFLINE);
        if (self.hasInit) {
            self.setOffLineInfo(content);
        }
        else {
            self.strContent = content;
        }
    };
    ViewOffLine.prototype.run = function () {
        if (this.time < 0) {
            Timer.instance.remove(this.run, this);
        }
    };
    return ViewOffLine;
}(UIModalPanel));
__reflect(ViewOffLine.prototype, "ViewOffLine");
