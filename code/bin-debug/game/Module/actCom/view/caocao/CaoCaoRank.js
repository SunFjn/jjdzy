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
var CaoCaoRank = (function (_super) {
    __extends(CaoCaoRank, _super);
    function CaoCaoRank() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    CaoCaoRank.prototype.childrenCreated = function () {
        var s = this;
        GGlobal.createPack("CaoCaoLaiXi");
        s.view = fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaoRank").asCom;
        s.contentPane = this.view;
        CommonManager.parseChildren(s.view, s);
        s.list.itemRenderer = s.onRender;
        s.list.callbackThisObj = s;
        _super.prototype.childrenCreated.call(this);
    };
    CaoCaoRank.prototype.onRender = function (index, obj) {
        var data = this.sourced[index];
        var item = obj;
        item.setdata(data);
    };
    CaoCaoRank.prototype.setdata = function () {
        var m = GGlobal.modelCaoCao;
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
    CaoCaoRank.prototype.onShown = function () {
        var self = this;
        var tp = self._args;
        if (tp == 0) {
            GGlobal.modelCaoCao.CG_CaoCaoCome_openRank_8511();
            GGlobal.control.listen(UIConst.CAOCAO_LAIXI_RANK, self.setdata, self);
        }
        else {
            self.setdata();
        }
    };
    CaoCaoRank.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        var tp = self._args;
        if (tp == 0) {
            GGlobal.control.remove(UIConst.CAOCAO_LAIXI_RANK, self.setdata, self);
        }
        GGlobal.layerMgr.close(UIConst.CAOCAO_LAIXI_RANK);
    };
    CaoCaoRank.URL = "ui://n6fub9ddeq413";
    return CaoCaoRank;
}(UIModalPanel));
__reflect(CaoCaoRank.prototype, "CaoCaoRank");
