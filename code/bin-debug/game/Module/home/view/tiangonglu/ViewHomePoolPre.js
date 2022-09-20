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
var ViewHomePoolPre = (function (_super) {
    __extends(ViewHomePoolPre, _super);
    function ViewHomePoolPre() {
        var _this = _super.call(this) || this;
        _this.itemRender = function (idx, obj) {
            var item = obj;
            item.setdata(idx, _this.maxLen);
        };
        _this.maxLen = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewHomePoolPre.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewHomePoolPre"));
    };
    ViewHomePoolPre.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomePoolPre").asCom;
        self.maxLen = 0;
        for (var i in Config.fddc_019) {
            self.maxLen++;
        }
        CommonManager.parseChildren(self.view, self);
        self.list.setVirtual();
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        _super.prototype.childrenCreated.call(this);
    };
    ViewHomePoolPre.prototype.onShown = function () {
        var self = this;
        self.list.numItems = self.maxLen;
    };
    ViewHomePoolPre.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.HOME_PRE);
    };
    ViewHomePoolPre.URL = "ui://y0plc878ye037";
    return ViewHomePoolPre;
}(UIModalPanel));
__reflect(ViewHomePoolPre.prototype, "ViewHomePoolPre");
