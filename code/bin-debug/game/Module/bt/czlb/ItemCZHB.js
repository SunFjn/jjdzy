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
var ItemCZHB = (function (_super) {
    __extends(ItemCZHB, _super);
    function ItemCZHB() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.noCount = 0;
        _this.clickHD = function () {
            if (!_this.noCount) {
                GGlobal.modelchongzhi.CG_CHONGZHI_135(_this.idx, null, false);
            }
            else {
                ViewCommonWarn.text("没有次数");
            }
        };
        return _this;
    }
    ItemCZHB.createInstance = function () {
        return (fairygui.UIPackage.createObject("czlb", "ItemCZHB"));
    };
    ItemCZHB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemCZHB.prototype.setdata = function (idx) {
        var self = this;
        var model = GGlobal.modelBT;
        var indexType = ViewCZHB.selectIndex;
        var lib;
        if (indexType == 0) {
            lib = model.czhb_lib_week[idx];
        }
        else {
            lib = model.czhb_lib_mouth[idx];
        }
        self.idx = lib.czid;
        ConfigHelp.createViewGridList(self.list, lib.reward, self);
        var count = model.czhb_data[lib.id];
        if (count <= 0) {
            self.btn.visible = false;
            self.ylq.visible = true;
            self.noCount = 1;
        }
        else {
            self.noCount = 0;
            self.btn.visible = true;
            self.ylq.visible = false;
        }
        self.lbPrice.text = ConfigHelp.reTxt("原价：{0}元", lib.price);
        self.lbTips.text = ConfigHelp.reTxt("限购次数：{0}", count);
        self.lbPro.text = lib.name;
        self.btn.text = lib.limit + "元";
        self.btn.addClickListener(self.clickHD, self);
    };
    ItemCZHB.prototype.clean = function () {
        var self = this;
        self.list.numItems = 0;
        self.btn.removeClickListener(self.clickHD, self);
    };
    ItemCZHB.URL = "ui://2o8uvlozk7mb4";
    return ItemCZHB;
}(fairygui.GComponent));
__reflect(ItemCZHB.prototype, "ItemCZHB");
