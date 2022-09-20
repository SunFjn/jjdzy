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
var Tip_XuTian_Buf = (function (_super) {
    __extends(Tip_XuTian_Buf, _super);
    function Tip_XuTian_Buf() {
        var _this = _super.call(this) || this;
        _this.loadRes("xuTian", "xuTian_atlas0");
        return _this;
    }
    Tip_XuTian_Buf.createInstance = function () {
        return (fairygui.UIPackage.createObject("xuTian", "Tip_XuTian_Buf"));
    };
    Tip_XuTian_Buf.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("xuTian");
        self.view = fairygui.UIPackage.createObject("xuTian", "Tip_XuTian_Buf").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    Tip_XuTian_Buf.prototype.onShown = function () {
        var self = this;
        var id = this._args;
        var buf = Config.xtwlbf_776[id];
        self.img.url = CommonManager.getUrl("xuTian", "buf" + buf.lx);
        self.lb.text = buf.ms;
    };
    Tip_XuTian_Buf.URL = "ui://j0lk55yeopmfk";
    return Tip_XuTian_Buf;
}(UIModalPanel));
__reflect(Tip_XuTian_Buf.prototype, "Tip_XuTian_Buf");
