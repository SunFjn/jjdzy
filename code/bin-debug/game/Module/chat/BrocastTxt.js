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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var BrocastTxt = (function (_super) {
    __extends(BrocastTxt, _super);
    function BrocastTxt() {
        return _super.call(this) || this;
    }
    BrocastTxt.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "BrocastTxt"));
    };
    BrocastTxt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbContent = (this.getChild("lbContent"));
    };
    BrocastTxt.prototype.setdata = function (str) {
        this.lbContent.text = str;
        this.tween();
    };
    BrocastTxt.prototype.tween = function () {
        var iw = this.lbContent.textWidth;
        var time = (iw / 60) * 1000;
        this.lbContent.x = 380;
        egret.Tween.get(this.lbContent).to({ x: -iw }, time).call(this.run, this);
    };
    BrocastTxt.prototype.clear = function () {
        egret.Tween.removeTweens(this);
        this.lbContent.x = 0;
        this.lbContent.text = "";
    };
    BrocastTxt.prototype.run = function () {
        this.callBack.run();
    };
    BrocastTxt.URL = "ui://7gxkx46we2bn4b";
    return BrocastTxt;
}(fairygui.GComponent));
__reflect(BrocastTxt.prototype, "BrocastTxt");
