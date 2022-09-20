var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoaderCtx = (function () {
    function LoaderCtx() {
        this.priority = 0;
        this.restype = 0;
        this.items = new Array();
    }
    LoaderCtx.create = function () {
        var ret = new LoaderCtx();
        return ret;
    };
    return LoaderCtx;
}());
__reflect(LoaderCtx.prototype, "LoaderCtx");
