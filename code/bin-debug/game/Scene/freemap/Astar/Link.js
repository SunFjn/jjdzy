var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Link = (function () {
    function Link(snode, node, cost, type) {
        this.snode = snode;
        this.node = node;
        this.cost = cost;
        this.type = type;
    }
    return Link;
}());
__reflect(Link.prototype, "Link");
