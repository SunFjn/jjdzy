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
 * @date: 2019-09-26 10:18:02
 */
var QxzlMapGUI = (function (_super) {
    __extends(QxzlMapGUI, _super);
    function QxzlMapGUI() {
        return _super.call(this) || this;
    }
    QxzlMapGUI.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "QxzlMapGUI"));
    };
    QxzlMapGUI.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        var t = this;
        t.role.touchable = false;
    };
    //>>>>end
    QxzlMapGUI.URL = "ui://6d8dzzdgems45";
    return QxzlMapGUI;
}(fairygui.GComponent));
__reflect(QxzlMapGUI.prototype, "QxzlMapGUI");
