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
var CaoCaotem = (function (_super) {
    __extends(CaoCaotem, _super);
    function CaoCaotem() {
        var _this = _super.call(this) || this;
        _this.rank = 0;
        return _this;
    }
    CaoCaotem.createInstance = function () {
        return (fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaotem"));
    };
    CaoCaotem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    CaoCaotem.prototype.onCheck = function () {
        var self = this;
        for (var key in Config.cclxpm_754) {
            var rankArr = JSON.parse(Config.cclxpm_754[key].mc);
            if (self.rank >= rankArr[0][0] && self.rank <= rankArr[0][1]) {
                var arr = JSON.parse(Config.cclxpm_754[key].jl);
                GGlobal.layerMgr.open(UIConst.CAOCAO_LAIXI_BOX, { rank: self.rank, data: arr });
                break;
            }
        }
    };
    CaoCaotem.prototype.setdata = function (data) {
        var self = this;
        self.rank = data[0];
        self.lbRank.text = "" + data[0];
        self.lbName.text = "" + data[1];
        self.lbLv.text = "" + ConfigHelp.getYiWanText(data[2]);
        self.btnCheck.addClickListener(self.onCheck, self);
    };
    CaoCaotem.prototype.clean = function () {
        var self = this;
        self.btnCheck.removeClickListener(self.onCheck, self);
    };
    CaoCaotem.URL = "ui://n6fub9ddeq414";
    return CaoCaotem;
}(fairygui.GComponent));
__reflect(CaoCaotem.prototype, "CaoCaotem");
