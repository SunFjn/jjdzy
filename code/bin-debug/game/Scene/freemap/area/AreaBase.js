var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AreaBase = (function () {
    function AreaBase() {
        this.ident = 0;
    }
    AreaBase.prototype.checkXY = function (px, py) {
        return false;
    };
    AreaBase.create = function (info) {
        var ret;
        if (info.userdata == null || info.userdata == "") {
        }
        if (info.type == "rect") {
            ret = RectArea.create(info);
        }
        else if (info.type == "point") {
            ret = CircleArea.create(info);
        }
        if (ret) {
            ret.ident = AreaBase.createIndex++;
            ret.userData = info;
        }
        return ret;
    };
    AreaBase.prototype.dispose = function () {
    };
    AreaBase.prototype.getBound = function () {
        return null;
    };
    AreaBase.prototype.getRandomPoint = function () {
        return null;
    };
    AreaBase.prototype.getCenter = function () {
        return null;
    };
    AreaBase.createIndex = 0;
    return AreaBase;
}());
__reflect(AreaBase.prototype, "AreaBase");
