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
var ViewChaoZhiFL = (function (_super) {
    __extends(ViewChaoZhiFL, _super);
    function ViewChaoZhiFL() {
        var _this = _super.call(this) || this;
        _this.setSkin("chaozhifanli", "chaozhifanli_atlas0", "ViewChaoZhiFL");
        return _this;
    }
    ViewChaoZhiFL.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(CailLiaoIt.URL, CailLiaoIt);
        f(ChildCaiLiaoFL.URL, ChildCaiLiaoFL);
        f(ChildYuanBaoFL.URL, ChildYuanBaoFL);
        f(Child_ChaoZhiZP.URL, Child_ChaoZhiZP);
        f(ComActivityTab.URL, ComActivityTab);
        f(Child_DisShop.URL, Child_DisShop);
        f(DisShopItem.URL, DisShopItem);
        f(Child_ShengJieShop.URL, Child_ShengJieShop);
        f(ShengJieItem.URL, ShengJieItem);
        f(ChildWarToDead.URL, ChildWarToDead);
        f(ItemWarToDead.URL, ItemWarToDead);
        f(ChildGroupBuy.URL, ChildGroupBuy);
        f(VGroupBuyItem.URL, VGroupBuyItem);
        f(ChildLXXF.URL, ChildLXXF);
        f(ItemLXXF.URL, ItemLXXF);
        f(ChildLXX814.URL, ChildLXX814);
        f(ItemLXX814.URL, ItemLXX814);
    };
    ViewChaoZhiFL.prototype.initView = function () {
        _super.prototype.initView.call(this);
        _super.prototype.resetPosition.call(this);
        var self = this;
        self.frame.icon = "ui://qzsojhcrn2xug";
        self.lst.itemRenderer = self.onItemRender;
        self.lst.callbackThisObj = self;
        self.lst.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        self.n14.displayObject.touchEnabled = self.n15.displayObject.touchEnabled = true;
        self.n15.scalRed();
        CommonManager.listPageChange("View_ChaoZhiFL", self.lst, self.n14, self.n15, 4, Handler.create(this, this.setPageNotice));
    };
    ViewChaoZhiFL.prototype.scrollComp = function () {
        var curpage = this.lst.getFirstChildInView();
        this.setPageNotice(curpage);
    };
    ViewChaoZhiFL.prototype.setPageNotice = function (_curpage) {
        var sf = this;
        sf.n15.checkNotice = false;
        sf.n14.checkNotice = false;
        for (var i = 0; i < this.datas.length; i++) {
            var id = this.datas[i].id;
            var red = GGlobal.reddot.checkCondition(id, 0);
            if (red && i > _curpage + 3) {
                sf.n15.checkNotice = true;
            }
            if (red && i < _curpage) {
                sf.n14.checkNotice = true;
            }
        }
    };
    ViewChaoZhiFL.prototype.onItemRender = function (index, renderer) {
        var self = this;
        var data = self.datas[index];
        renderer.data = data;
        var icon = Config.xitong_001[data.id].icon;
        if (data.id == UIConst.DISCOUNT_SHOP || data.id == UIConst.DISCOUNT_SHOP1) {
            icon = "4605_1";
        }
        renderer.setActivityIcon(icon);
        renderer.checkNotice = GGlobal.reddot.checkCondition(data.id);
    };
    ViewChaoZhiFL.prototype.displayList = function () {
        var self = this;
        var temp = GGlobal.modelActivity.getGroup(UIConst.CHAOZHIFL); //GGlobal.modelCZFL.iconArr;
        var arr1 = ModelEightLock.getActivity(UIConst.CHAOZHIFL);
        temp = temp ? temp.concat(arr1) : arr1;
        self.datas = temp.filter(function (vale, index, source) {
            if (vale.id == UIConst.DISCOUNT_SHOP && ModelEightLock.originalDatas[UIConst.DISCOUNT_SHOP1]) {
                return false;
            }
            return ModuleManager.isOpen(vale.id);
        });
        self.lst.numItems = self.datas.length;
        var curpage = self.lst.getFirstChildInView();
        self.setPageNotice(curpage);
    };
    ViewChaoZhiFL.prototype.onSel = function (evt) {
        var self = this;
        var selRenderer = evt.itemObject;
        var data = selRenderer.data;
        self.setSel(data);
    };
    ViewChaoZhiFL.prototype.setSel = function (data) {
        var self = this;
        if (self.selData && self.selData.id == data.id) {
            return;
        }
        self.unSel();
        var renderer = this.getRenderer(self.selData = data);
        if (!renderer) {
            return;
        }
        (self.selTab = renderer).selected = true;
        var index = self.datas.indexOf(data);
        if (index >= 0) {
            self.lst.selectedIndex = index;
            self.lst.scrollToView(index);
        }
        else {
            self.lst.selectedIndex = 0;
        }
        self.showDetail();
    };
    ViewChaoZhiFL.prototype.unSel = function () {
        var self = this;
        if (self.selTab) {
            self.selTab.selected = false;
            self.selTab = null;
            self.selData = null;
        }
        if (self.selView) {
            self.selView.close();
            self.removeChild(self.selView);
            self.selView = null;
        }
    };
    ViewChaoZhiFL.prototype.getRenderer = function (data) {
        var lst = this.lst;
        for (var i = 0, len = lst.numItems; i < len; i++) {
            var renderer = lst._children[i];
            if (renderer && renderer.data == data) {
                return renderer;
            }
        }
        return null;
    };
    ViewChaoZhiFL.prototype.showDetail = function () {
        var fac = fairygui.UIObjectFactory;
        var self = this;
        var selTab = self.selTab;
        switch (selTab.data.id) {
            case UIConst.CAILIAOFANLI:
            case UIConst.CAILIAOFL_KF:
                self.selView = ChildCaiLiaoFL.createInstance();
                break;
            case UIConst.YUANBAOFANLI:
            case UIConst.YUANBAOFL_KF:
            case UIConst.YUANBAOFANLI1:
                self.selView = ChildYuanBaoFL.createInstance();
                break;
            case UIConst.CHAOZHI_ZHUANPAN:
                self.selView = Child_ChaoZhiZP.createInstance();
                self.selView.x = 0;
                self.selView.y = 280;
                break;
            case UIConst.DISCOUNT_SHOP:
            case UIConst.DISCOUNT_SHOP1:
                self.selView = Child_DisShop.createInstance();
                self.selView.x = 0;
                self.selView.y = 280;
                break;
            case UIConst.WARTODEAD_7IN:
            case UIConst.WARTODEAD_7OUT:
            case UIConst.WARTODEAD1:
                self.selView = ChildWarToDead.getInst();
                self.selView.x = 0;
                self.selView.y = 260;
                break;
            case UIConst.LXXF1:
            case UIConst.LXXF2:
                self.selView = ChildLXXF.getInst();
                self.selView.x = 0;
                self.selView.y = 283;
                break;
            case UIConst.GROUP_BUY:
                fac.setPackageItemExtension(ChildGroupBuy.URL, ChildGroupBuy);
                fac.setPackageItemExtension(VGroupBuyItem.URL, VGroupBuyItem);
                self.selView = ChildGroupBuy.getInst();
                break;
            case UIConst.GROUP_B814:
                fac.setPackageItemExtension(ChildGroupB814.URL, ChildGroupB814);
                fac.setPackageItemExtension(VGroupBuyI814.URL, VGroupBuyI814);
                self.selView = ChildGroupB814.getInst();
                break;
            case UIConst.SHENGJIE_SHOP:
                self.selView = Child_ShengJieShop.createInstance();
                self.selView.x = 0;
                self.selView.y = 280;
                break;
            case UIConst.LXXF3:
                self.selView = ChildLXX814.getInst();
                self.selView.x = 0;
                self.selView.y = 283;
                break;
        }
        if (self.selView) {
            self.addChild(self.selView);
            self.selView.open();
        }
    };
    ViewChaoZhiFL.prototype.addListens = function () {
        var self = this;
        var r = GGlobal.reddot;
        self.lst.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
        GGlobal.control.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.displayList, self);
        GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, self.displayList, self);
        GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, self.displayList, self);
        // GGlobal.modelLXXF.listen(ModelLXXF.msg_datas, self.lxxf, self);
        r.listen(UIConst.CHAOZHIFL, self.displayList, self);
    };
    ViewChaoZhiFL.prototype.removeListens = function () {
        var self = this;
        var r = GGlobal.reddot;
        self.lst.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
        GGlobal.control.remove(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.displayList, self);
        GGlobal.control.remove(Enum_MsgType.KAIFUDAY_UPDATE, self.displayList, self);
        GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, self.displayList, self);
        // GGlobal.modelLXXF.remove(ModelLXXF.msg_datas, self.lxxf, self);
        r.remove(UIConst.CHAOZHIFL, self.displayList, self);
    };
    ViewChaoZhiFL.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var self = this;
        self.displayList();
        self.addListens();
        // self.applyLxxf();
        if (self._args) {
            var data = self.getDataByArg(self._args);
            self.setSel(data || self.datas[0]);
        }
        else {
            self.setSel(self.datas[0]);
        }
    };
    ViewChaoZhiFL.prototype.getDataByArg = function (args) {
        var datas = this.datas;
        for (var i = 0, len = datas.length; i < datas.length; i++) {
            var data = datas[i];
            if (data.id == args) {
                return data;
            }
        }
        return null;
    };
    ViewChaoZhiFL.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        var self = this;
        self.removeListens();
        self.unSel();
        self.lst.scrollToView(0);
        self.lst.numItems = 0;
        GGlobal.layerMgr.close(UIConst.CHAOZHIFL);
    };
    return ViewChaoZhiFL;
}(UIPanelBase));
__reflect(ViewChaoZhiFL.prototype, "ViewChaoZhiFL");
