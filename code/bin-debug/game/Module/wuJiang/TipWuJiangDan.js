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
var TipWuJiangDan = (function (_super) {
    __extends(TipWuJiangDan, _super);
    function TipWuJiangDan() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    TipWuJiangDan.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    TipWuJiangDan.prototype.onShown = function () {
        var self = this;
        self.btnOneKey.addClickListener(self.onClickEat, self);
        self.btnEat.addClickListener(self.onClickEat, self);
        GGlobal.control.listen(Enum_MsgType.WUJIANG_USE_DAN, self.update, self);
    };
    TipWuJiangDan.prototype.onHide = function () {
        var self = this;
        self.btnOneKey.removeClickListener(self.onClickEat, self);
        self.btnEat.removeClickListener(self.onClickEat, self);
        GGlobal.control.remove(Enum_MsgType.WUJIANG_USE_DAN, self.update, self);
        GGlobal.layerMgr.close(UIConst.TIP_WUJIANG_DAN);
        self.grid.clean();
    };
    TipWuJiangDan.prototype.update = function () {
        this.show(this._vo);
    };
    TipWuJiangDan.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg);
    };
    TipWuJiangDan.prototype.show = function (obj) {
        var vo = obj;
        this.grid.tipEnabled = false;
        this.grid.isShowEff = true;
        this.grid.vo = vo;
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + obj.icon + ".png", this.imgIcon);
        this._vo = vo;
        this.labName.text = vo.name;
        this.labName.color = Color.getColorInt(vo.quality);
        this._maxCount = 0;
        if (vo.id == Model_WuJiang.DAN_SHUXING) {
            this._drug_type = Model_WuJiang.DRUG_SHUXING;
            this._eatCount = Model_WuJiang.danShuxing;
        }
        else {
            // this._drug_type = Model_WuJiang.DRUG_ZIZHI;
            // this._eatCount = Model_WuJiang.danZizhi
        }
        var drug = Config.drug_200[this._drug_type];
        for (var keys in Model_WuJiang.wuJiangStar) {
            var star = Model_WuJiang.wuJiangStar[keys];
            var hero = Config.hero_211[keys];
            if (vo.id == Model_WuJiang.DAN_SHUXING) {
                this._maxCount += hero.max1 * star;
            }
            else {
                this._maxCount += hero.max2 * star;
            }
        }
        this.labHas.text = "已吞噬：" + this._eatCount + "/" + this._maxCount;
        vo.count = Model_Bag.getItemCount(vo.id);
        this.labCount.text = "拥有数量：" + vo.count;
        var arr = ConfigHelp.SplitStr(drug.attr);
        for (var i = 0; i < arr.length; i++) {
            var attrType = Number(arr[i][0]);
            var attrValue = Number(arr[i][1]);
            attrValue = attrValue * this._eatCount;
            arr[i][1] = attrValue;
        }
        this.labAttr.text = ConfigHelp.attrString(arr, "+");
        this.lab.text = "武将激活（升星）可增加吞噬上限";
        this.btnEat.checkNotice = vo.count > 0 && this._eatCount < this._maxCount;
        this.btnOneKey.checkNotice = vo.count > 0 && this._eatCount < this._maxCount;
    };
    TipWuJiangDan.prototype.onClickEat = function (e) {
        var type = 0;
        if (e.currentTarget == this.btnOneKey) {
            type = 1;
        }
        if (this._vo.count <= 0) {
            View_CaiLiao_GetPanel.show(this._vo);
            return;
        }
        if (this._eatCount >= this._maxCount) {
            ViewCommonWarn.text("提升武将星级可增加吞噬上限");
            return;
        }
        GGlobal.modelWuJiang.CGUseDan(this._drug_type == Model_WuJiang.DRUG_SHUXING ? 0 : 1, type);
    };
    return TipWuJiangDan;
}(UIModalPanel));
__reflect(TipWuJiangDan.prototype, "TipWuJiangDan");
