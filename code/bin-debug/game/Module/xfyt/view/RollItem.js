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
 * @date: 2019-10-30 17:36:19
 */
var RollItem = (function (_super) {
    __extends(RollItem, _super);
    function RollItem() {
        return _super.call(this) || this;
    }
    RollItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("xfyt", "RollItem"));
    };
    RollItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //>>>>end
    RollItem.URL = "ui://n5noipr2vpqqf";
    return RollItem;
}(fairygui.GComponent));
__reflect(RollItem.prototype, "RollItem");
