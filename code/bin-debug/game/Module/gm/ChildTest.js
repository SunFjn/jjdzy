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
var ChildTest = (function (_super) {
    __extends(ChildTest, _super);
    function ChildTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildTest.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
    };
    ChildTest.prototype.onShow = function () {
    };
    ChildTest.prototype.onHide = function () {
    };
    ChildTest.URL = "ui://vm9a8xq8p3a0e";
    return ChildTest;
}(fairygui.GComponent));
__reflect(ChildTest.prototype, "ChildTest");
