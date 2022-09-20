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
var ChildYuanBaoFL = (function (_super) {
    __extends(ChildYuanBaoFL, _super);
    function ChildYuanBaoFL() {
        var _this = _super.call(this) || this;
        _this.lastWeek = -1;
        return _this;
    }
    ChildYuanBaoFL.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "ChildYuanBaoFL"));
    };
    ChildYuanBaoFL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbTitle = (s.getChild("lbTitle"));
        s.lst = (s.getChild("lst"));
        s.lbTime = (s.getChild("lbTime"));
        s.imgPic = (s.getChild("imgPic"));
        s.lst.setVirtual();
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.renderHD;
    };
    ChildYuanBaoFL.prototype.renderHD = function (idx, obj) {
        var item = obj;
        if (ModelEightLock.originalDatas[UIConst.YUANBAOFANLI1]) {
            item.setdata(this.dta[idx], 2);
        }
        else {
            item.setdata(this.dta[idx], 1);
        }
    };
    ChildYuanBaoFL.prototype.updateX = function () {
        var t = Model_GlobalMsg.getServerTime();
        var t1 = TimeUitl.getZeroTime23h59m59s(t);
        this.lbTime.text = "活动时间：" + DateUtil.getHMSBySecond(((t1 - t) / 1000) >> 0);
    };
    ChildYuanBaoFL.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelCZFL;
        s.dta = m.yuanbaoDta;
        s.lst.numItems = s.dta.length;
    };
    ChildYuanBaoFL.prototype.open = function () {
        var s = this;
        IconUtil.setImg(s.imgPic, Enum_Path.PIC_URL + "yuanbaofanli.jpg");
        GGlobal.control.listen(Enum_MsgType.YUANBAOFANLI, s.update, s);
        GGlobal.control.listen(Enum_MsgType.YUANBAOFL_KF, s.update, s);
        Timer.instance.listen(s.updateX, s, 1000);
        if (ModelEightLock.originalDatas[UIConst.YUANBAOFANLI1]) {
            GGlobal.modelEightLock.CG4571(UIConst.YUANBAOFANLI1);
        }
        else {
            GGlobal.modelCZFL.CG_OPEN_3031();
        }
    };
    ChildYuanBaoFL.prototype.close = function () {
        var s = this;
        IconUtil.setImg(s.imgPic, null);
        GGlobal.control.remove(Enum_MsgType.YUANBAOFANLI, s.update, s);
        GGlobal.control.remove(Enum_MsgType.YUANBAOFL_KF, s.update, s);
        Timer.instance.remove(s.updateX, s);
        s.lst.numItems = 0;
    };
    ChildYuanBaoFL.URL = "ui://qzsojhcrlwai2";
    return ChildYuanBaoFL;
}(fairygui.GComponent));
__reflect(ChildYuanBaoFL.prototype, "ChildYuanBaoFL", ["ICZFLView"]);
