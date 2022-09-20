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
var ItemWyhb = (function (_super) {
    __extends(ItemWyhb, _super);
    function ItemWyhb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemWyhb.createInstance = function () {
        return (fairygui.UIPackage.createObject("wyhb", "ItemWyhb"));
    };
    ItemWyhb.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemWyhb.prototype.setdata = function (idx) {
        var self = this;
        self.idx = idx;
        var model = GGlobal.modelBT;
        var indexType = ViewWYHB.selectIndex;
        var data;
        if (indexType == 0) {
            self.c2.setSelectedIndex(0);
            data = model.wyhb_lib_lvl;
        }
        else {
            data = model.wyhb_lib_yb;
            self.c2.setSelectedIndex(1);
        }
        var lib = data[idx];
        var condition = lib.limit;
        self.condition = condition;
        self.idx = lib.id;
        if (indexType == 0) {
            self.lbLev.text = condition + "级";
            self.btnlq.checkNotice = condition <= Model_player.voMine.level;
        }
        else {
            self.lbcz.text = "累充" + condition + "元";
            self.btnlq.checkNotice = condition <= ModelBT.realRechargeValue;
        }
        if (model.wyhb_data_yb.indexOf(lib.id) != -1 || model.wyhb_data_lvl.indexOf(lib.id) != -1) {
            self.c1.setSelectedIndex(1);
        }
        else {
            self.c1.setSelectedIndex(0);
        }
        self.lbYb.text = lib.show + "元";
        ;
        self.btnlq.addClickListener(self.lqHd, self);
    };
    ItemWyhb.prototype.clean = function () {
        var self = this;
        self.btnlq.removeClickListener(self.lqHd, self);
    };
    ItemWyhb.prototype.lqHd = function () {
        var self = this;
        var indexType = ViewWYHB.selectIndex;
        if (indexType == 0) {
            if (Model_player.voMine.level < self.condition) {
                ViewCommonWarn.text("等级不足");
                return;
            }
        }
        else {
            if (ModelBT.realRechargeValue < self.condition) {
                ViewCommonWarn.text("条件未达成");
                return;
            }
        }
        GGlobal.modelBT.CG_get_20013(self.idx);
    };
    ItemWyhb.URL = "ui://27qy37vtk7mb8";
    return ItemWyhb;
}(fairygui.GComponent));
__reflect(ItemWyhb.prototype, "ItemWyhb");
