var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoaderItem = (function () {
    function LoaderItem() {
    }
    LoaderItem.create = function () {
        var ret = new LoaderItem();
        return ret;
    };
    LoaderItem.prototype.destory = function () {
    };
    return LoaderItem;
}());
__reflect(LoaderItem.prototype, "LoaderItem");
