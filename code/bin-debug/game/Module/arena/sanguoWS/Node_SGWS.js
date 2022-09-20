var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Node_SGWS = (function () {
    function Node_SGWS() {
    }
    //是否还没被淘汰 false被淘汰了
    Node_SGWS.prototype.isLife = function () {
        var m = GGlobal.modelsgws;
        var st = GGlobal.modelsgws.state;
        var ret = false;
        ret = this.lun >= m.lun;
        return ret;
    };
    return Node_SGWS;
}());
__reflect(Node_SGWS.prototype, "Node_SGWS");
