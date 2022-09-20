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
 * @date: 2019-11-15 10:45:01
 */
var SGZL2Btn = (function (_super) {
    __extends(SGZL2Btn, _super);
    function SGZL2Btn() {
        return _super.call(this) || this;
    }
    SGZL2Btn.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComSgzl2", "SGZL2Btn"));
    };
    SGZL2Btn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //>>>>end
    SGZL2Btn.URL = "ui://ggwi8wepqhocd";
    return SGZL2Btn;
}(fairygui.GButton));
__reflect(SGZL2Btn.prototype, "SGZL2Btn");
