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
/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
var SGCard = (function (_super) {
    __extends(SGCard, _super);
    function SGCard() {
        return _super.call(this) || this;
    }
    SGCard.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "SGCard"));
    };
    SGCard.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.sg = (s.getChild("sg"));
        s.lbGX = (s.getChild("lbGX"));
        s.lbName = (s.getChild("lbName"));
        s.lbPower = (s.getChild("lbPower"));
        s.head = (s.getChild("head"));
        s.yxz = (s.getChild("yxz"));
        s.addClickListener(s.onClick, s);
        s.sg.visible = false;
    };
    SGCard.prototype.onClick = function () {
        var s = this;
        s.clickHandler.runWith(s.playerid);
    };
    SGCard.prototype.setSel = function (v) {
        var s = this;
        s.sg.visible = s.playerid == v;
    };
    SGCard.prototype.setYaZhu = function (v) {
        var s = this;
        s.yxz.visible = s.playerid == v;
    };
    SGCard.prototype.setdata = function (v, id) {
        var s = this;
        if (v) {
            s.playerid = v.id;
            s.head.setdata(v.head, null, null, null, false, v.headicn);
            s.lbGX.text = Model_GuanXian.getJiangXianStr(v.jiangxian);
            s.lbName.text = v.name;
            s.lbPower.text = v.power + "";
            s.yxz.visible = true;
            s.head.visible = true;
        }
        else {
            s.lbGX.text = "";
            s.lbName.text = "";
            s.lbPower.text = "";
            s.yxz.visible = false;
            s.head.visible = false;
        }
        s.yxz.visible = v && id == v.id;
    };
    SGCard.URL = "ui://me1skowl608a10";
    return SGCard;
}(fairygui.GComponent));
__reflect(SGCard.prototype, "SGCard");
