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
var ViewBingFaDrug = (function (_super) {
    __extends(ViewBingFaDrug, _super);
    function ViewBingFaDrug() {
        var _this = _super.call(this) || this;
        _this.maxdrug = 0;
        _this.ids = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewBingFaDrug.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewBingFaDrug.prototype.onlvlup = function () {
        if (Model_Bag.getItemCount(this.ids) < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(this.ids));
            return;
        }
        var m = GGlobal.modelBingFa;
        if (m.drugCount < m.getDrugCount()) {
            GGlobal.modelBingFa.CG_DRUG_907(0);
        }
        else {
            ViewCommonWarn.text("已达到使用上限");
        }
    };
    ViewBingFaDrug.prototype.onOneKeylvlup = function () {
        if (Model_Bag.getItemCount(this.ids) < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(this.ids));
            return;
        }
        var m = GGlobal.modelBingFa;
        if (m.drugCount < m.getDrugCount()) {
            GGlobal.modelBingFa.CG_DRUG_907(1);
        }
        else {
            ViewCommonWarn.text("已达到使用上限");
        }
    };
    ViewBingFaDrug.prototype.update = function () {
        var m = GGlobal.modelBingFa;
        var lib = Config.drug_200[6];
        this.ids = lib["id"];
        var vo = VoItem.create(this.ids);
        // this.labName.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.cfg.quality))
        this.labName.text = vo.name;
        this.labName.color = Color.getColorInt(vo.cfg.quality);
        this.grid.tipEnabled = false;
        this.grid.isShowEff = true;
        this.grid.vo = vo;
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + vo.icon + ".png", this.imgIcon);
        this.maxdrug = m.getDrugCount();
        this.labHas.text = "已吞噬：" + m.drugCount + "/" + this.maxdrug;
        vo.count = Model_Bag.getItemCount(vo.id);
        this.labCount.text = "拥有数量：" + vo.count;
        if (m.drugCount != 0) {
            var att = JSON.parse(lib["attr"]);
            att = this.attsBonus(att, m.drugCount);
            this.labAttr.text = ConfigHelp.makeAttrTextArr(att);
        }
        else
            this.labAttr.text = ConfigHelp.makeAttrTextArr([[102, 0], [104, 0], [103, 0]]);
        this.lab.text = "兵法激活（升星）可增加吞噬上限";
        this.addNotice();
    };
    ViewBingFaDrug.prototype.attsBonus = function (arr, s) {
        var temp = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var key = arr[i][0];
            var val = arr[i][1];
            temp.push([key, val * s]);
        }
        return temp;
    };
    ViewBingFaDrug.prototype.addNotice = function () {
        var count = Model_Bag.getDrugCountWithCfg(6);
        var m = GGlobal.modelBingFa;
        if (count > 0 && m.drugCount < this.maxdrug) {
            this.btnEat.checkNotice = this.btnOneKey.checkNotice = true;
        }
        else {
            this.btnEat.checkNotice = this.btnOneKey.checkNotice = false;
        }
    };
    ViewBingFaDrug.prototype.onShown = function () {
        var m = GGlobal.modelBingFa;
        this.update();
        m.listen(Model_BingFa.DRUG_UP, this.update, this);
        this.btnOneKey.addClickListener(this.onOneKeylvlup, this);
        this.btnEat.addClickListener(this.onlvlup, this);
        this.resetPosition();
    };
    ViewBingFaDrug.prototype.onHide = function () {
        var m = GGlobal.modelBingFa;
        m.remove(Model_BingFa.DRUG_UP, this.update, this);
        this.btnOneKey.removeClickListener(this.onOneKeylvlup, this);
        this.btnEat.removeClickListener(this.onlvlup, this);
        GGlobal.layerMgr.close(UIConst.BINGFA_DRUG);
        this.grid.clean();
    };
    ViewBingFaDrug.URL = "ui://n52wd4d0fgxb8";
    return ViewBingFaDrug;
}(UIModalPanel));
__reflect(ViewBingFaDrug.prototype, "ViewBingFaDrug");
