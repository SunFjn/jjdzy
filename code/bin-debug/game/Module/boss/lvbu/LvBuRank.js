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
var LvBuRank = (function (_super) {
    __extends(LvBuRank, _super);
    function LvBuRank() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    LvBuRank.prototype.childrenCreated = function () {
        var s = this;
        GGlobal.createPack("Boss");
        this.view = fairygui.UIPackage.createObject("Boss", "LvBuRank").asCom;
        this.contentPane = this.view;
        this.frame = (this.view.getChild("frame"));
        this.list = (this.view.getChild("list"));
        this.lbMine = (this.view.getChild("lbMine"));
        s.resetPosition();
        s.list.itemRenderer = s.onRender;
        s.list.callbackThisObj = s;
        _super.prototype.childrenCreated.call(this);
        this.resetPosition();
        this.list.itemRenderer = this.onRender;
        this.list.callbackThisObj = this;
    };
    LvBuRank.prototype.onRender = function (index, obj) {
        var data = this.sourced[index];
        var item = obj;
        item.setdata(data);
    };
    LvBuRank.prototype.setdata = function () {
        var m = GGlobal.modelBoss;
        this.sourced = m.rankData;
        this.list.numItems = this.sourced.length;
        var rk = "未上榜";
        var d = this.sourced;
        var nm = Model_player.voMine.name;
        for (var i = 0; i < d.length; i++) {
            if (Model_player.isMine(d[i][1])) {
                rk = d[i][0];
                break;
            }
        }
        this.lbMine.text = "<font color='" + Color.WHITESTR + "'>我的排名：</font>" + rk;
    };
    LvBuRank.prototype.onShown = function () {
        var tp = this._args;
        if (tp == 0) {
            GGlobal.modelBoss.CG_LBRANK_1501();
            GGlobal.control.listen(Enum_MsgType.RANK_UPDATE, this.setdata, this);
        }
        else {
            this.setdata();
        }
    };
    LvBuRank.prototype.onHide = function () {
        this.list.numItems = 0;
        var tp = this._args;
        if (tp == 0) {
            GGlobal.control.remove(Enum_MsgType.RANK_UPDATE, this.setdata, this);
        }
        GGlobal.layerMgr.close(UIConst.LVBURANK);
    };
    LvBuRank.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    LvBuRank.URL = "ui://47jfyc6eqcyl10";
    return LvBuRank;
}(UIModalPanel));
__reflect(LvBuRank.prototype, "LvBuRank");
