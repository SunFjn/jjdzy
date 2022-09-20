var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_JueXing = (function () {
    function Vo_JueXing() {
        this.skilllv0 = 0;
        this.skilllv1 = 0;
        this.skilllv2 = 0;
        this.suitLv = 0;
    }
    Vo_JueXing.create = function (id, quality, icon, name, costId, starLv, imageID, tptx) {
        var ret = Pool.getItemByClass("Vo_JueXing", Vo_JueXing);
        ret.id = id;
        ret.quality = quality;
        ret.icon = icon;
        ret.name = name;
        ret.costId = costId;
        ret.starLv = starLv;
        ret.imageID = imageID;
        ret.tptx = tptx;
        return ret;
    };
    Vo_JueXing.prototype.dispose = function () {
        var ret = this;
        ret.id = 0;
        ret.quality = 0;
        ret.icon = null;
        ret.name = null;
        ret.costId = 0;
        ret.starLv = 0;
        Pool.recover("Vo_JueXingData", ret);
    };
    return Vo_JueXing;
}());
__reflect(Vo_JueXing.prototype, "Vo_JueXing");
