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
var QuanMinHead = (function (_super) {
    __extends(QuanMinHead, _super);
    function QuanMinHead() {
        var _this = _super.call(this) || this;
        _this.isOpenAndLife = false;
        return _this;
    }
    QuanMinHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "QuanMinHead"));
    };
    QuanMinHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.sg = (s.getChild("sg"));
        s.headIcon = (s.getChild("headIcon"));
        s.ng = (s.getChild("ng"));
    };
    QuanMinHead.prototype.setSel = function (v) {
        this.sg.visible = v;
    };
    QuanMinHead.prototype.setNotice = function (v) {
        this.ng.visible = v;
    };
    QuanMinHead.prototype.setVO = function (_vo) {
        var s = this;
        s.vo = _vo;
        s.touchable = _vo.isOpen();
        s.grayed = !_vo.isOpen();
        var itemCount = Model_Bag.getItemCount(410015);
        var count = GGlobal.modelBoss.qmCount;
        s.isOpenAndLife = (count > 0 || itemCount > 0) && _vo.st == 1 && _vo.isOpen();
        s.setNotice(s.isOpenAndLife);
        s.headIcon.setdata(RoleUtil.getHeadImg(_vo.bosshead + ""), -1, _vo.level, 0, true);
    };
    QuanMinHead.URL = "ui://47jfyc6egs0dr";
    return QuanMinHead;
}(fairygui.GComponent));
__reflect(QuanMinHead.prototype, "QuanMinHead");
