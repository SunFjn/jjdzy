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
 * 角色模型容器
 * @author: lujiahao
 * @date: 2019-09-29 15:39:40
 */
var RoleCom = (function (_super) {
    __extends(RoleCom, _super);
    function RoleCom() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    RoleCom.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "RoleCom"));
    };
    RoleCom.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.test.visible = false;
    };
    //>>>>end
    RoleCom.URL = "ui://jvxpx9emgxpd3gh";
    return RoleCom;
}(fairygui.GComponent));
__reflect(RoleCom.prototype, "RoleCom");
