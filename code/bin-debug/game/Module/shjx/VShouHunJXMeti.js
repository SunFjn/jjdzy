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
var VShouHunJXMeti = (function (_super) {
    __extends(VShouHunJXMeti, _super);
    function VShouHunJXMeti() {
        var _this = _super.call(this) || this;
        _this.dataProviders = [];
        _this.loadRes("shouhunJX", "shouhunJX_atlas0");
        return _this;
    }
    VShouHunJXMeti.prototype.childrenCreated = function () {
        var _this = this;
        var view = this.contentPane = fairygui.UIPackage.createObject("shouhunJX", "VShouHunJXMeti").asCom;
        CommonManager.parseChildren(view, this);
        this.list.itemRenderer = function (i, r) { r.setData(_this.dataProviders[i]); };
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    VShouHunJXMeti.prototype.showList = function () {
        var lib = Config.shjxyj_266;
        this.dataProviders.length = 0;
        for (var key in lib) {
            var cfg = lib[key];
            if (cfg.yj == this._data.yj) {
                if (Model_Bag.getItemCount(cfg.id) > 0) {
                    this.dataProviders.push(cfg.id);
                }
            }
        }
        this.list.numItems = this.dataProviders.length;
    };
    VShouHunJXMeti.prototype.onShown = function () {
        this._data = this._args;
        this.showList();
    };
    VShouHunJXMeti.prototype.onHide = function () {
        GGlobal.layerMgr.close(this.panelId);
        this.list.numItems = 0;
    };
    return VShouHunJXMeti;
}(UIModalPanel));
__reflect(VShouHunJXMeti.prototype, "VShouHunJXMeti");
