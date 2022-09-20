var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Singleton = (function () {
    function Singleton() {
    }
    Singleton.getInst = function (cla) {
        var key = cla.prototype.__class__;
        return (this.dic[key] || (this.dic[key] = new cla()));
    };
    Singleton.dic = {};
    return Singleton;
}());
__reflect(Singleton.prototype, "Singleton");
