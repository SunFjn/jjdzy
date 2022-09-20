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
var CailLiaoIt = (function (_super) {
    __extends(CailLiaoIt, _super);
    function CailLiaoIt() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        return _this;
    }
    CailLiaoIt.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "CailLiaoIt"));
    };
    CailLiaoIt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbPro = (this.getChild("lbPro"));
        this.btn = (this.getChild("btn"));
        this.btn1 = (this.getChild("btn1"));
        this.ylq = (this.getChild("ylq"));
        this.btn.addClickListener(this.onClickHD, this);
        this.btn1.addClickListener(this.openView, this);
        this.com = new fairygui.GComponent();
        this.addChild(this.com);
        this.com.setScale(0.8, 0.8);
    };
    CailLiaoIt.prototype.onClickHD = function () {
        if (this.type == 2) {
            GGlobal.modelCZFL.CG_LQ_4791(this.ids);
        }
        else if (this.type == 0) {
            GGlobal.modelCZFL.CG_LQ_2431(this.ids);
        }
        else {
            GGlobal.modelCZFL.CG_LQ_2451(this.ids);
        }
    };
    CailLiaoIt.prototype.openView = function () {
        GGlobal.layerMgr.open(this.viewID);
    };
    CailLiaoIt.prototype.clean = function () {
        ConfigHelp.cleanGridview(this.grids);
    };
    CailLiaoIt.prototype.setdata = function (dta, type) {
        var s = this;
        var award;
        s.type = type;
        var itname;
        var st = dta[1];
        var it;
        var count;
        var lib;
        s.ids = dta[0];
        if (type == 0) {
            var cfg = GGlobal.modelCZFL.getCailiaoCFG();
            var lib_1 = cfg[s.ids];
            this.viewID = lib_1.systemid;
            award = JSON.parse(lib_1.reward);
            it = JSON.parse(lib_1.consume);
            count = it[0][2];
            if (it[0][0] < 3)
                itname = ConfigHelp.getItemColorName(it[0][1]);
            else
                itname = ConfigHelp.AttrName(it[0][0]);
            if (GGlobal.modelCZFL.cl >= count) {
                s.lbPro.text = "消耗" + count + "个" + itname + "<font color='" + Color.GREENSTR + "'>(" + GGlobal.modelCZFL.cl + "/" + count + ")</font>";
            }
            else {
                s.lbPro.text = "消耗" + count + "个" + itname + "<font color='" + Color.REDSTR + "'>(" + GGlobal.modelCZFL.cl + "/" + count + ")</font>";
            }
        }
        else {
            var cfg = GGlobal.modelCZFL.getYuanBaoCFG();
            var lib_2 = cfg[s.ids];
            this.viewID = lib_2.systemid;
            award = JSON.parse(lib_2.reward);
            it = JSON.parse(lib_2.consume);
            count = it[0][2];
            if (GGlobal.modelCZFL.yb >= count) {
                s.lbPro.text = "消耗" + count + "元宝" + "<font color='" + Color.GREENSTR + "'>(" + GGlobal.modelCZFL.yb + "/" + count + ")</font>";
            }
            else {
                s.lbPro.text = "消耗" + count + "元宝" + "<font color='" + Color.REDSTR + "'>(" + GGlobal.modelCZFL.yb + "/" + count + ")</font>";
            }
        }
        s.ylq.visible = st == 2;
        s.btn.visible = st == 1;
        s.btn1.visible = st == 0;
        s.btn.checkNotice = st == 1;
        ConfigHelp.cleanGridview(s.grids);
        s.grids = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(award), this.com, 36, 63, true, false, 4, 110);
    };
    CailLiaoIt.URL = "ui://qzsojhcrlwai3";
    return CailLiaoIt;
}(fairygui.GComponent));
__reflect(CailLiaoIt.prototype, "CailLiaoIt");
