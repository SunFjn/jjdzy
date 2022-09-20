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
var VShouHunJX = (function (_super) {
    __extends(VShouHunJX, _super);
    function VShouHunJX() {
        var _this = _super.call(this) || this;
        _this.datas = [];
        _this.listIndex = 0;
        _this._uidList = [UIConst.SHOULING, UIConst.SHJX, UIConst.ERBASU, UIConst.ACTHB_XUNBAO];
        _this.setSkin("shouhunJX", "shouhunJX_atlas0", "VShouHunJX");
        return _this;
    }
    VShouHunJX.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(ChildSJ.URL, ChildSJ);
        f.setPackageItemExtension(ChildJX.URL, ChildJX);
        f.setPackageItemExtension(ChildEBS.URL, ChildEBS);
        f.setPackageItemExtension(ItemSHJX.URL, ItemSHJX);
        f.setPackageItemExtension(ItemYinJi.URL, ItemYinJi);
        f.setPackageItemExtension(ItemMeti.URL, ItemMeti);
        f.setPackageItemExtension(VSHStarItem.URL, VSHStarItem);
        f.setPackageItemExtension(Child_ActHolyBXunB.URL, Child_ActHolyBXunB);
        f.setPackageItemExtension(VActHolyBRank.URL, VActHolyBRank);
        f.setPackageItemExtension(VActHolyBMuB.URL, VActHolyBMuB);
        f.setPackageItemExtension(VActHolyBGrid.URL, VActHolyBGrid);
        f.setPackageItemExtension(VActHolyBHead.URL, VActHolyBHead);
        f.setPackageItemExtension(ActHolyBXunBGrid.URL, ActHolyBXunBGrid);
    };
    VShouHunJX.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap([
            ChildSJ,
            ChildJX,
            ChildEBS,
            Child_ActHolyBXunB,
        ]);
        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;
        self.list.itemRenderer = function (i, r) {
            r.data = self.datas[i];
            switch (self.c1.selectedIndex) {
                case 0:
                    r.checkNotice = ModelSH.checkSJ(self.datas[i].yj);
                    break;
                case 1:
                    var red = GGlobal.reddot.checkCondition(UIConst.SH_HUANX, self.datas[i].yj - 1);
                    r.checkNotice = red || ModelSH.checkJX(self.datas[i].yj);
                    break;
                case 2:
                    r.checkNotice = ModelSH.checkXS(self.datas[i].yj);
                    break;
            }
            r.setIcon("resource/image/shouling/icon" + self.datas[i].yj + ".png");
        };
        self.list.callbackThisObj = self;
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        self.onUpdate();
    };
    VShouHunJX.prototype.onTabChange = function (pTabIndex, pVo) {
        var self = this;
        var arr = self._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        if (self._render)
            self._render.selected = false;
        pVo.data = self.datas[self.listIndex];
        if (self.datas[self.listIndex]) {
            self.list.scrollToView(self.listIndex);
            self._render = self.list._children[self.listIndex];
            self._render.selected = true;
            self.listIndex = 0;
        }
        return true;
    };
    VShouHunJX.prototype.onSel = function (evt) {
        var item = evt.itemObject;
        this.setSel(item.data);
    };
    VShouHunJX.prototype.setSel = function (data) {
        var self = this;
        var render;
        if (self._render)
            self._render.selected = false;
        if (data) {
            var index = data.yj - 1;
            self.list.scrollToView(index);
            render = self.list._children[index];
            render.selected = true;
        }
        self._render = render;
        if (data) {
            GGlobal.modelSHJX.notify(ModelSH.msg_itemSel, data);
        }
    };
    VShouHunJX.prototype.onUpdate = function () {
        var self = this;
        if (!self.datas.length) {
            var dicDatas = ModelSH.getOrigDatas();
            for (var key in dicDatas) {
                var tempArr = dicDatas[key];
                self.datas.push(tempArr[0]);
            }
        }
        self.list.numItems = self.datas.length;
        self.updateNot();
    };
    VShouHunJX.prototype.onBagUpdate = function (items) {
        if (items[UIConst.SHOULING] || items["equip12"] || items[UIConst.SHJX]) {
            this.onUpdate();
        }
    };
    VShouHunJX.prototype.updateNot = function () {
        var self = this;
        var red = false;
        for (var i = 0; i < 4; i++) {
            red = GGlobal.reddot.checkCondition(UIConst.SH_HUANX, i);
            if (red) {
                break;
            }
        }
        self.tab1.checkNotice = ModelSH.checkSJ(1) || ModelSH.checkSJ(2) || ModelSH.checkSJ(3) || ModelSH.checkSJ(4);
        self.tab2.checkNotice = ModelSH.checkJX(1) || ModelSH.checkJX(2) || ModelSH.checkJX(3) || ModelSH.checkJX(4) || red;
        self.tab3.checkNotice = ModelSH.checkXS(1) || ModelSH.checkXS(2) || ModelSH.checkXS(3) || ModelSH.checkXS(4);
        self.tab4.checkNotice = GGlobal.reddot.checkCondition(UIConst.ACTHB_XUNBAO, 0);
    };
    VShouHunJX.prototype.onShown = function () {
        var self = this;
        self.onUpdate();
        self._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (self._args) {
            if (typeof self._args == "number") {
                t_selectIndex = self._args;
                self.listIndex = 0;
            }
            else {
                t_selectIndex = self._args.tabIndex;
                self.listIndex = self._args.listIndex;
            }
        }
        self._tabContronller.selectedIndex = -1;
        self._tabContronller.selectedIndex = t_selectIndex;
        GGlobal.modelSHJX.listen(ModelSH.msg_notice, self.onUpdate, self);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.onBagUpdate, self);
        GGlobal.control.listen(Enum_MsgType.SHOULING_DATA_UPDATE, self.onUpdate, self);
        var r = GGlobal.reddot;
        r.listen(UIConst.ACTHB_XUNBAO, self.updateNot, self);
        r.listen(UIConst.SH_HUANX, self.onUpdate, self);
    };
    VShouHunJX.prototype.onHide = function () {
        var self = this;
        self._tabContronller.registerEvent(false);
        self._tabContronller.close();
        self.setSel(null);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.onBagUpdate, self);
        GGlobal.control.remove(Enum_MsgType.SHOULING_DATA_UPDATE, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_notice, self.onUpdate, self);
        var r = GGlobal.reddot;
        r.remove(UIConst.ACTHB_XUNBAO, self.updateNot, self);
        r.remove(UIConst.SH_HUANX, self.onUpdate, self);
        self.list.numItems = 0;
    };
    return VShouHunJX;
}(UIPanelBase));
__reflect(VShouHunJX.prototype, "VShouHunJX");
