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
var TitlePage = (function (_super) {
    __extends(TitlePage, _super);
    function TitlePage() {
        return _super.call(this) || this;
    }
    TitlePage.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "TitlePage"));
    };
    TitlePage.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.img = (this.getChild("img"));
        this.imgSelected = (this.getChild("imgSelected"));
        this.imgNotice = (this.getChild("imgNotice"));
        this.lbName = (this.getChild("lbName"));
    };
    TitlePage.prototype.setdata = function (vo) {
        this.vo = vo;
        var state = vo.state;
        this.img.url = state == 0 ? "ui://3tzqotadp6mw3x" : "ui://3tzqotadp6mw3y";
        this.imgNotice.visible = vo.isNotice();
        this.lbName.text = vo.name;
    };
    TitlePage.prototype.setChoose = function (val) {
        this.imgSelected.visible = val;
    };
    TitlePage.prototype.clean = function () {
        this.setChoose(false);
    };
    TitlePage.URL = "ui://3tzqotadp6mw3w";
    return TitlePage;
}(fairygui.GComponent));
__reflect(TitlePage.prototype, "TitlePage");
