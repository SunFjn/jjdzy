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
var ViewSuperMarblesPool = (function (_super) {
    __extends(ViewSuperMarblesPool, _super);
    function ViewSuperMarblesPool() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewSuperMarblesPool.createInstance = function () {
        return (fairygui.UIPackage.createObject("superMarbles", "ViewSuperMarblesPool"));
    };
    ViewSuperMarblesPool.prototype.childrenCreated = function () {
        var self = this;
        var view = fairygui.UIPackage.createObject("superMarbles", "ViewSuperMarblesPool").asCom;
        self.contentPane = view;
        CommonManager.parseChildren(view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.render;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewSuperMarblesPool.prototype.render = function (idx, obj) {
        obj.update(idx);
    };
    ViewSuperMarblesPool.prototype.onShown = function () {
        var self = this;
        self.list.numItems = GGlobal.modelSuperMarbles.cfg.length;
    };
    ViewSuperMarblesPool.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.ACTCOMCJDZ_POOL);
    };
    ViewSuperMarblesPool.URL = "ui://gf2tw9lzx9uy4";
    return ViewSuperMarblesPool;
}(UIModalPanel));
__reflect(ViewSuperMarblesPool.prototype, "ViewSuperMarblesPool");
