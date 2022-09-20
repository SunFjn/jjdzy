var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AstarNode = (function () {
    function AstarNode(x, y) {
        this.walkable = true;
        this.version = 1;
        this.x = x;
        this.y = y;
    }
    return AstarNode;
}());
__reflect(AstarNode.prototype, "AstarNode");
