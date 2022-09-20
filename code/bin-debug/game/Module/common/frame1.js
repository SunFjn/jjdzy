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
 * @date: 2019-10-23 14:51:57
 */
var frame1 = (function (_super) {
    __extends(frame1, _super);
    function frame1() {
        return _super.call(this) || this;
    }
    frame1.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "frame1"));
    };
    frame1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var Child = ["closeButton",];
        for (var i = 0; i < Child.length; i++)
            this[Child[i]] = this.getChild(Child[i]);
    };
    //>>>>end
    frame1.URL = "ui://jvxpx9emf1cf47";
    return frame1;
}(fairygui.GComponent));
__reflect(frame1.prototype, "frame1");
