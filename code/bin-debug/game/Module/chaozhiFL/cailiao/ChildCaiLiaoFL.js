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
var ChildCaiLiaoFL = (function (_super) {
    __extends(ChildCaiLiaoFL, _super);
    function ChildCaiLiaoFL() {
        var _this = _super.call(this) || this;
        _this.lastWeek = -1;
        return _this;
    }
    ChildCaiLiaoFL.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "ChildCaiLiaoFL"));
    };
    ChildCaiLiaoFL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbTip = (s.getChild("lbTip"));
        s.lst = (s.getChild("lst"));
        s.lbTime = (s.getChild("lbTime"));
        s.imgPic = (s.getChild("imgPic"));
        s.lst.setVirtual();
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.renderHD;
    };
    ChildCaiLiaoFL.prototype.renderHD = function (idx, obj) {
        var item = obj;
        item.setdata(this.dta[idx], 0);
    };
    ChildCaiLiaoFL.prototype.updateX = function () {
        var t = Model_GlobalMsg.getServerTime();
        var t1 = TimeUitl.getZeroTime23h59m59s(t);
        this.lbTime.text = "活动时间：" + DateUtil.getHMSBySecond(((t1 - t) / 1000) >> 0);
    };
    ChildCaiLiaoFL.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelCZFL;
        s.dta = m.cailiaoDta;
        s.lst.numItems = s.dta.length;
    };
    ChildCaiLiaoFL.prototype.open = function () {
        var s = this;
        IconUtil.setImg(s.imgPic, Enum_Path.PIC_URL + "cailiaofanli.jpg");
        GGlobal.control.listen(Enum_MsgType.CAILIAOFL_KF, s.update, s);
        GGlobal.control.listen(Enum_MsgType.CAILIAOFANLI, s.update, s);
        GGlobal.modelCZFL.CG_OPEN_2951();
        Timer.instance.listen(s.updateX, s, 1000);
    };
    ChildCaiLiaoFL.prototype.close = function () {
        var s = this;
        IconUtil.setImg(s.imgPic, null);
        GGlobal.control.remove(Enum_MsgType.CAILIAOFL_KF, s.update, s);
        GGlobal.control.remove(Enum_MsgType.CAILIAOFANLI, s.update, s);
        Timer.instance.remove(s.updateX, s);
        s.lst.numItems = 0;
    };
    ChildCaiLiaoFL.URL = "ui://qzsojhcrlwai1";
    return ChildCaiLiaoFL;
}(fairygui.GComponent));
__reflect(ChildCaiLiaoFL.prototype, "ChildCaiLiaoFL", ["ICZFLView"]);
