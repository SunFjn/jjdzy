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
var Tip_ZSGodWeaponDan = (function (_super) {
    __extends(Tip_ZSGodWeaponDan, _super);
    function Tip_ZSGodWeaponDan() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.childrenCreated();
        return _this;
    }
    Tip_ZSGodWeaponDan.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    Tip_ZSGodWeaponDan.prototype.onShown = function () {
        var self = this;
        self.btnOneKey.addClickListener(self.onClickEat, self);
        self.btnEat.addClickListener(self.onClickEat, self);
        GGlobal.control.listen(UIConst.ZS_GODWEAPON_DAN, self.update, self);
    };
    Tip_ZSGodWeaponDan.prototype.onHide = function () {
        var self = this;
        self.btnOneKey.removeClickListener(self.onClickEat, self);
        self.btnEat.removeClickListener(self.onClickEat, self);
        GGlobal.control.remove(UIConst.ZS_GODWEAPON_DAN, self.update, self);
        GGlobal.layerMgr.close(UIConst.ZS_GODWEAPON_DAN);
        self.grid.clean();
    };
    Tip_ZSGodWeaponDan.prototype.update = function (vo) {
        this.show({ vo: vo, index: this.index });
    };
    Tip_ZSGodWeaponDan.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg);
    };
    Tip_ZSGodWeaponDan.prototype.show = function (obj) {
        var self = this;
        var vo = obj.vo;
        self.index = obj.index;
        self._vo = vo;
        self.itemVo = VoItem.create(Model_ZSGodWeapon.danIDArr[self.index]);
        self.grid.tipEnabled = false;
        self.grid.isShowEff = true;
        self.grid.vo = self.itemVo;
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + self.itemVo.quality + ".png", this.bg);
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + self.itemVo.icon + ".png", self.imgIcon);
        self.labName.text = self.itemVo.name;
        self.labName.color = Color.getColorInt(self.itemVo.quality);
        self._maxCount = vo.starLv * vo.cfg["max" + (self.index + 1)];
        self._eatCount = vo.tunshiArr[self.index];
        var drug = Config.sbsz_750[self.index + 1];
        self.labHas.text = "已吞噬：" + self._eatCount + "/" + self._maxCount;
        self.itemVo.count = Model_Bag.getItemCount(Model_ZSGodWeapon.danIDArr[self.index]);
        self.labCount.text = "拥有数量：" + self.itemVo.count;
        var attStr = "";
        if (drug.attr1 != "0") {
            var arr = JSON.parse(drug.attr1);
            for (var i = 0; i < arr.length; i++) {
                var attrType = Number(arr[i][0]);
                var attrValue = Number(arr[i][1]);
                attrValue = attrValue * self._eatCount;
                arr[i][1] = attrValue;
            }
            attStr = ConfigHelp.attrString(arr, "+");
        }
        else {
            attStr = "升星属性+" + drug.attr2 * self._eatCount / 1000 + "%\n" + "淬炼属性+" + drug.attr2 * self._eatCount / 1000 + "%";
        }
        self.labAttr.text = attStr;
        self.lab.text = "神兵激活（升星）可增加吞噬上限";
        self.lab1.text = ConfigHelp.reTxt("已永久增加神兵·{0}属性", HtmlUtil.fontNoSize(vo.cfg.name, Color.getColorStr(vo.quality)));
        self.btnEat.checkNotice = self.itemVo.count > 0 && self._eatCount < self._maxCount;
        self.btnOneKey.checkNotice = self.itemVo.count > 0 && self._eatCount < self._maxCount;
    };
    Tip_ZSGodWeaponDan.prototype.onClickEat = function (e) {
        var type = 0;
        var self = this;
        if (e.currentTarget == this.btnOneKey) {
            type = 1;
        }
        if (self.itemVo.count <= 0) {
            View_CaiLiao_GetPanel.show(self.itemVo);
            return;
        }
        if (this._eatCount >= this._maxCount) {
            ViewCommonWarn.text("提升神兵星级可增加吞噬上限");
            return;
        }
        GGlobal.modelGodWeapon.CG_GodWeapon_godForge_7855(self._vo.job, self.index + 1, type);
    };
    return Tip_ZSGodWeaponDan;
}(UIModalPanel));
__reflect(Tip_ZSGodWeaponDan.prototype, "Tip_ZSGodWeaponDan");
