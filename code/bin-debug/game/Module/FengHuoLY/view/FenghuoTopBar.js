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
var FenghuoTopBar = (function (_super) {
    __extends(FenghuoTopBar, _super);
    function FenghuoTopBar() {
        return _super.call(this) || this;
    }
    FenghuoTopBar.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FenghuoTopBar"));
    };
    FenghuoTopBar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getController("c1");
        this.n1 = (this.getChild("n1"));
        this.hp1 = (this.getChild("hp1"));
        this.n2 = (this.getChild("n2"));
        this.n3 = (this.getChild("n3"));
        this.n5 = (this.getChild("n5"));
    };
    // 1上方不需要显示胜利失败
    //2 结算界面需要显示
    FenghuoTopBar.prototype.setUIPos = function (t) {
        this.n5.visible = t == 1;
    };
    FenghuoTopBar.prototype.setForce = function (b) {
        this.c1.selectedIndex = b;
    };
    FenghuoTopBar.prototype.setdata = function (data) {
        var s = this;
        var camp = data[0];
        var score = data[1];
        var server = data[2];
        var type = data[3];
        s.setUIPos(type);
        s.setForce(camp - 1);
        s.n2.text = server == 0 ? "轮空" : "S." + server;
        s.n3.text = "积分：" + score;
        s.hp1.width = ModelFengHuoLY.maxScore == 0 ? 0 : 312 * score / ModelFengHuoLY.maxScore;
    };
    FenghuoTopBar.URL = "ui://edvdots4b801w25";
    return FenghuoTopBar;
}(fairygui.GComponent));
__reflect(FenghuoTopBar.prototype, "FenghuoTopBar");
