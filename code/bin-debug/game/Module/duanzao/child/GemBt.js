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
var GemBt = (function (_super) {
    __extends(GemBt, _super);
    function GemBt() {
        return _super.call(this) || this;
    }
    GemBt.createInstance = function () {
        return (fairygui.UIPackage.createObject("DuanZao", "GemBt"));
    };
    GemBt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.grid = (a.getChild("grid"));
        a.grid.tipEnabled = false;
        a.addImg = (a.getChild("addImg"));
    };
    GemBt.prototype.updateShow = function (stoneId) {
        var a = this;
        if (stoneId > 0) {
            var vo = VoItem.create(stoneId);
            a.grid.grid.isShowEff = true;
            a.grid.vo = vo;
            a.addImg.visible = false;
        }
        else {
            a.addImg.visible = true;
            a.grid.vo = null;
            a.grid.lbNum.visible = false;
        }
    };
    GemBt.prototype.showText = function (str) {
        this.grid.lbName.text = str;
        this.grid.lbName.color = Color.getColorInt(1);
    };
    GemBt.prototype.setCheckNotice = function (value) {
        this.grid.showNotice = value > 0;
        this.checkNotice = value;
    };
    GemBt.URL = "ui://pofv8989sv0ga";
    return GemBt;
}(fairygui.GButton));
__reflect(GemBt.prototype, "GemBt");
