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
var ViewLZDRank = (function (_super) {
    __extends(ViewLZDRank, _super);
    function ViewLZDRank() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewLZDRank.prototype.childrenCreated = function () {
        GGlobal.createPack("activityHall");
        var s = this;
        s.view = fairygui.UIPackage.createObject("activityHall", "ViewLZDRank").asCom;
        s.contentPane = s.view;
        // s.frame = <fairygui.GComponent><any>(s.view.getChild("frame"));
        s.lst = (s.view.getChild("lst"));
        s.lbInfo = (s.view.getChild("lbInfo"));
        s.lbMyRank = (s.view.getChild("lbMyRank"));
        s.lst.callbackThisObj = s;
        s.lst.setVirtual();
        s.lst.itemRenderer = s.renderHd;
        _super.prototype.childrenCreated.call(this);
        // s.frame.getChild("lbTitle").asTextField.text = "排行榜";
    };
    ViewLZDRank.prototype.renderHd = function (i, obj) {
        var m = GGlobal.modelActivityHall;
        var it = obj;
        it.setdata(i + 1, m.lzd_rankDta[i]);
    };
    ViewLZDRank.prototype.setdata = function () {
        var s = this;
        var m = GGlobal.modelActivityHall;
        var d = m.lzd_rankDta;
        if (d.length == 0) {
            s.lst.numItems = 0;
            s.lbInfo.text = "我的积分：0";
            s.lbMyRank.text = "我的排名：<font color='#ffc334'>未上榜</font>";
        }
        else {
            s.lbInfo.text = "我的积分：" + m.lzd_score;
            if (m.lzd_rank == 0 || m.lzd_rank > 10) {
                s.lbMyRank.text = "我的排名：<font color='#ffc334'>10+</font>";
            }
            else {
                s.lbMyRank.text = "我的排名：<font color='#ffc334'>" + m.lzd_rank + "</font>";
            }
            s.lst.numItems = d.length;
        }
    };
    ViewLZDRank.prototype.onShown = function () {
        var s = this;
        var m = GGlobal.modelActivityHall;
        var c = GGlobal.control;
        m.CG_RANK_1985();
        c.listen(Enum_MsgType.LZD_OPENRANK, s.setdata, s);
    };
    ViewLZDRank.prototype.onHide = function () {
        var s = this;
        var c = GGlobal.control;
        c.remove(Enum_MsgType.LZD_OPENRANK, s.setdata, s);
        GGlobal.layerMgr.close(UIConst.LZDRANK);
    };
    ViewLZDRank.URL = "ui://1xydor24n7ie4";
    return ViewLZDRank;
}(UIModalPanel));
__reflect(ViewLZDRank.prototype, "ViewLZDRank");
