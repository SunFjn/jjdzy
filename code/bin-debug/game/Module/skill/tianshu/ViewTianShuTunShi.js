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
var ViewTianShuTunShi = (function (_super) {
    __extends(ViewTianShuTunShi, _super);
    function ViewTianShuTunShi() {
        var _this = _super.call(this) || this;
        _this.ids = 0;
        _this.maxdrug = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewTianShuTunShi.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TipEatDan"));
    };
    ViewTianShuTunShi.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewTianShuTunShi.prototype.onClickEat = function (e) {
        var c = Model_Bag.getItemCount(this.ids);
        if (c < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(this.ids));
            return;
        }
        var m = GGlobal.modeltianshu;
        if (m.shuxingdan >= this.maxdrug)
            ViewCommonWarn.text("已达上限");
        else {
            if (e.currentTarget == this.btnEat)
                GGlobal.modeltianshu.CG_TUNSHI_979(0);
            else
                GGlobal.modeltianshu.CG_TUNSHI_979(1);
        }
    };
    ViewTianShuTunShi.prototype.update = function () {
        var s = this;
        var m = GGlobal.modeltianshu;
        var lib = Config.drug_200[8];
        s.ids = m.drugID;
        var vo = VoItem.create(s.ids);
        this.labName.text = vo.name;
        this.labName.color = Color.getColorInt(vo.cfg.quality);
        s.grid.tipEnabled = false;
        s.grid.isShowEff = true;
        s.grid.vo = vo;
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + vo.icon + ".png", this.imgIcon);
        s.maxdrug = m.getDrugCount();
        this.labHas.text = "已吞噬：" + m.shuxingdan + "/" + s.maxdrug;
        var c = Model_Bag.getItemCount(s.ids);
        s.btnEat.checkNotice = s.btnOneKey.checkNotice = c > 0 && m.getDrugCount() > m.shuxingdan;
        s.labCount.text = "拥有数量：" + c;
        var att = JSON.parse(lib["attr"]);
        att = s.attsBonus(att, m.shuxingdan);
        s.labAttr.text = ConfigHelp.makeAttrTextArr(att);
        this.lab.text = "天书激活（升星）可增加吞噬上限";
    };
    ViewTianShuTunShi.prototype.attsBonus = function (arr, s) {
        var temp = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var key = arr[i][0];
            var val = arr[i][1];
            temp.push([key, val * s]);
        }
        return temp;
    };
    ViewTianShuTunShi.prototype.onShown = function () {
        var self = this;
        self.update();
        self.btnOneKey.addClickListener(self.onClickEat, self);
        self.btnEat.addClickListener(self.onClickEat, self);
        GGlobal.control.listen(Enum_MsgType.MSG_TS_DRUG, self.update, self);
    };
    ViewTianShuTunShi.prototype.onHide = function () {
        var self = this;
        var m = GGlobal.modeltianshu;
        self.btnOneKey.removeClickListener(self.onClickEat, self);
        self.btnEat.removeClickListener(self.onClickEat, self);
        GGlobal.control.remove(Enum_MsgType.MSG_TS_DRUG, self.update, self);
        GGlobal.layerMgr.close(UIConst.TIANSHUDRAG);
        self.grid.clean();
    };
    ViewTianShuTunShi.URL = "ui://jvxpx9emur2m3da";
    return ViewTianShuTunShi;
}(UIModalPanel));
__reflect(ViewTianShuTunShi.prototype, "ViewTianShuTunShi");
