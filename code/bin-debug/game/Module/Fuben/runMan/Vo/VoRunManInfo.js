var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoRunManInfo = (function () {
    function VoRunManInfo() {
    }
    VoRunManInfo.prototype.copy = function () {
        var c = new VoRunManInfo();
        c.type = this.type;
        c.layerId = this.layerId;
        c.layerMaxId = this.layerMaxId;
        return c;
    };
    return VoRunManInfo;
}());
__reflect(VoRunManInfo.prototype, "VoRunManInfo");
