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
var SMCard = (function (_super) {
    __extends(SMCard, _super);
    function SMCard() {
        var _this = _super.call(this) || this;
        _this.clickHD = function () {
            if (GGlobal.modelSuperMarbles.closeNum >= 3) {
                if (_this.state == 1) {
                    GGlobal.modelSuperMarbles.CG_optAwards(_this.idx, _this.state == 1 ? 2 : 1);
                }
                else {
                    ViewCommonWarn.text("最多只可屏蔽3份");
                    GGlobal.control.notify(UIConst.ACTCOMCJDZ);
                }
            }
            else {
                GGlobal.modelSuperMarbles.CG_optAwards(_this.idx, _this.state == 1 ? 2 : 1);
            }
        };
        _this.idx = 0;
        _this.state = 0;
        return _this;
    }
    SMCard.createInstance = function () {
        return (fairygui.UIPackage.createObject("superMarbles", "SMCard"));
    };
    SMCard.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    SMCard.prototype.clean = function () {
        var self = this;
        self.grid.vo = null;
        self.btn.removeClickListener(self.clickHD, self);
    };
    SMCard.prototype.setdata = function (data, idx) {
        var self = this;
        var vo = ConfigHelp.makeItem([data.type, data.id, data.count]);
        self.grid.isShowEff = true;
        self.grid.tipEnabled = true;
        self.grid.vo = vo;
        self.btn.addClickListener(self.clickHD, self);
        self.state = data.isclose;
        self.btn['setState'](data.isclose == 1 ? fairygui.GButton.DOWN : fairygui.GButton.UP);
        self.lbLv.text = ["一", "二", "三", "四", "五", "五", "五"][idx] + "等奖";
        self.idx = idx + 1;
    };
    SMCard.URL = "ui://gf2tw9lz77k9e";
    return SMCard;
}(fairygui.GComponent));
__reflect(SMCard.prototype, "SMCard");
