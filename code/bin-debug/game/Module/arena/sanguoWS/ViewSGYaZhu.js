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
var ViewSGYaZhu = (function (_super) {
    __extends(ViewSGYaZhu, _super);
    function ViewSGYaZhu() {
        var _this = _super.call(this) || this;
        _this.canYZ = false;
        _this.loadRes();
        return _this;
    }
    ViewSGYaZhu.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewSGYaZhu"));
    };
    ViewSGYaZhu.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "ViewSGYaZhu").asCom;
        var b = a.contentPane = a.view;
        this.frame = (a.view.getChild("frame"));
        this.btn = (a.view.getChild("btn"));
        this.n8 = (a.view.getChild("n8"));
        this.n10 = (a.view.getChild("n10"));
        this.lbYb = (a.view.getChild("lbYb"));
        this.n12 = (a.view.getChild("n12"));
        this.n13 = (a.view.getChild("n13"));
        this.n14 = (a.view.getChild("n14"));
        this.lbYbWin = (a.view.getChild("lbYbWin"));
        this.lbYbFault = (a.view.getChild("lbYbFault"));
        this.n18 = (a.view.getChild("n18"));
        this.i0 = (a.view.getChild("i0"));
        this.n17 = (a.view.getChild("n17"));
        this.n6 = (a.view.getChild("n6"));
        this.i1 = (a.view.getChild("i1"));
        _super.prototype.childrenCreated.call(this);
        a.i0.idx = 0;
        a.i0.clickHandler = Handler.create(a, a.setSel, null);
        a.i1.clickHandler = Handler.create(a, a.setSel, null);
        a.i1.idx = 1;
        var yb = ConfigHelp.getSystemNum(2101);
        this.lbYb.text = yb + "";
        this.lbYbWin.text = yb * 2 + "";
        this.lbYbFault.text = yb / 2 + "";
    };
    ViewSGYaZhu.prototype.yazhuHandler = function () {
        if (!this.canYZ) {
            ViewCommonWarn.text("当前赛程不能下注");
            return;
        }
        var yb = ConfigHelp.getSystemNum(2101);
        var myyb = Model_player.voMine.yuanbao;
        if (myyb < yb) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelsgws.CG_XIAZHU_1833(this.pid, this.lun);
    };
    ViewSGYaZhu.prototype.setSel = function (pid) {
        this.i0.setSel(pid);
        this.i1.setSel(pid);
        this.pid = pid;
    };
    ViewSGYaZhu.prototype.setYaZhu = function (pid) {
        this.i0.setYaZhu(pid);
        this.i1.setYaZhu(pid);
    };
    ViewSGYaZhu.prototype.onShown = function () {
        var s = this;
        var d = s._args;
        var lun = d[0];
        this.lun = lun;
        var zu = d[1];
        var m = GGlobal.modelsgws;
        var id = -1;
        s.btn.enabled = true;
        if (m.yazhu[lun]) {
            id = m.yazhu[lun];
            s.btn.enabled = false;
        }
        var dta = m.getGrouperByLun(lun, zu);
        if (dta && dta.length) {
            var vo0 = dta[0];
            s.i0.setdata(vo0, id);
            this.canYZ = m.checkYazhu(lun, zu);
            var selID = vo0.id;
            if (dta[1]) {
                var vo1 = dta[1];
                if (vo1.power > vo0.power)
                    selID = vo1.id;
                s.i1.setdata(dta[1], id);
                s.i1.touchable = true;
            }
            else {
                s.i1.touchable = false;
                s.i1.setdata(null, id);
            }
            s.setSel(selID);
        }
        else {
            s.setSel(-1);
        }
        s.btn.addClickListener(s.yazhuHandler, s);
        GGlobal.control.listen(Enum_MsgType.SGWS_YZ, s.setYaZhu, s);
    };
    ViewSGYaZhu.prototype.onHide = function () {
        var s = this;
        s.btn.removeClickListener(s.yazhuHandler, s);
        GGlobal.control.remove(Enum_MsgType.SGWS_YZ, s.setYaZhu, s);
        GGlobal.layerMgr.close(UIConst.SGWS_YZ);
    };
    ViewSGYaZhu.URL = "ui://me1skowl608az";
    return ViewSGYaZhu;
}(UIModalPanel));
__reflect(ViewSGYaZhu.prototype, "ViewSGYaZhu");
