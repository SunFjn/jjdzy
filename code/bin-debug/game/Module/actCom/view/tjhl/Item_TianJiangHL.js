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
var Item_TianJiangHL = (function (_super) {
    __extends(Item_TianJiangHL, _super);
    function Item_TianJiangHL() {
        var _this = _super.call(this) || this;
        _this.openCharge = function () {
            ViewChongZhi.tryToOpenCZ();
        };
        _this.getAwards = function () {
            GGlobal.model_actCom.CG_TJHL_DATA_GETAWARDS(_this.idx);
        };
        _this.idx = 0;
        return _this;
    }
    Item_TianJiangHL.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComTianJiangHaoli", "Item_TianJiangHL"));
    };
    Item_TianJiangHL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Item_TianJiangHL.prototype.clean = function () {
        var self = this;
        self.list.numItems = 0;
        self.btn1.removeClickListener(self.openCharge, self);
        self.btn.removeClickListener(self.getAwards, self);
    };
    Item_TianJiangHL.prototype.setdata = function (data) {
        var self = this;
        var model = GGlobal.model_actCom;
        self.btn1.addClickListener(self.openCharge, self);
        self.btn.addClickListener(self.getAwards, self);
        self.btn.checkNotice = true;
        self.idx = data.id;
        var lib = Config.tjhl_335[self.idx];
        ConfigHelp.createViewGridList(self.list, lib.reward, self);
        self.btn.visible = data.st == 1;
        self.btn1.visible = data.st == 0;
        self.ylq.visible = data.st == 2;
        var targeValue = data.cfg.lj;
        var color = targeValue <= model.tianJiangHl_rechargeValue ? Color.GREENSTR : Color.REDSTR;
        self.lbPro.text = BroadCastManager.reTxt("累计充值{0}元,可领取<font color='{1}'>({2}/{3})</font>", targeValue, color, model.tianJiangHl_rechargeValue, targeValue);
        self.lbTips.text = BroadCastManager.reTxt("(再充值<font color='{0}'>{1}</font>元可领取)", Color.GREENSTR, targeValue - model.tianJiangHl_rechargeValue);
        self.lbTips.visible = targeValue > model.tianJiangHl_rechargeValue;
    };
    Item_TianJiangHL.URL = "ui://gy3mzfqr7jlm1";
    return Item_TianJiangHL;
}(fairygui.GComponent));
__reflect(Item_TianJiangHL.prototype, "Item_TianJiangHL");
