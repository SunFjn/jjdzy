/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var FengHuoLYBottom = (function (_super) {
    __extends(FengHuoLYBottom, _super);
    function FengHuoLYBottom() {
        return _super.call(this) || this;
    }
    FengHuoLYBottom.createInstance = function () {
        if (!this.inst)
            this.inst = (fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLYBottom"));
        return this.inst;
    };
    FengHuoLYBottom.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btnOut = (this.getChild("btnOut"));
        this.btnFollow = (this.getChild("btnFollow"));
        this.n3 = (this.getChild("n3"));
    };
    FengHuoLYBottom.URL = "ui://edvdots4srrs2";
    return FengHuoLYBottom;
}(fairygui.GComponent));
__reflect(FengHuoLYBottom.prototype, "FengHuoLYBottom");
