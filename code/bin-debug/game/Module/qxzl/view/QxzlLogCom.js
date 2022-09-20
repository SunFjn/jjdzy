var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * @author: lujiahao
 * @date: 2019-10-09 19:29:10
 */
var QxzlLogCom = (function (_super) {
    __extends(QxzlLogCom, _super);
    function QxzlLogCom() {
        return _super.call(this) || this;
    }
    QxzlLogCom.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "QxzlLogCom"));
    };
    QxzlLogCom.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //>>>>end
    QxzlLogCom.URL = "ui://6d8dzzdgi2j21g";
    return QxzlLogCom;
}(fairygui.GComponent));
__reflect(QxzlLogCom.prototype, "QxzlLogCom");
