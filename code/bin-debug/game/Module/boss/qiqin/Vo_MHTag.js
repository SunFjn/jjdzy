var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_MHTag = (function () {
    function Vo_MHTag() {
        this.id = 0;
        this.awards = [];
        this.state = 0;
    }
    return Vo_MHTag;
}());
__reflect(Vo_MHTag.prototype, "Vo_MHTag");
