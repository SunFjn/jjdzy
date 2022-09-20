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
var View_Shop_Panel = (function (_super) {
    __extends(View_Shop_Panel, _super);
    function View_Shop_Panel() {
        var _this = _super.call(this) || this;
        _this.tabArr = [];
        _this.shopArr = [];
        _this.setSkin("Shop", "Shop_atlas0", "View_Shop_Panel");
        return _this;
    }
    View_Shop_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ShopItem.URL, ShopItem);
    };
    View_Shop_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        a.list.foldInvisibleItems = true;
        a.list.setVirtual();
        for (var key in Config.stroe_218) {
            a.tabArr.push(Config.stroe_218[key]);
        }
        a.tabArr.sort(function (aa, bb) {
            return aa.px - bb.px;
        });
        a.tabList.callbackThisObj = a;
        a.tabList.itemRenderer = a.tabRenderHandler;
        a.tabList.foldInvisibleItems = true;
        a.tabList.numItems = a.tabArr.length;
        a.tabList.addEventListener(fairygui.ItemEvent.CLICK, a.tabListHandler, a);
        a.refreshBt.addClickListener(a.refreshHandle, a);
        a.linkLb.addClickListener(a.linkHandler, a);
    };
    View_Shop_Panel.prototype.tabListHandler = function (event) {
        var self = this;
        var tab = event.itemObject;
        if (self.curTab && self.curTab.data == tab.data)
            return;
        if (self.curTab)
            self.curTab.selected = false;
        self.curTab = tab;
        self.changeHandler();
    };
    View_Shop_Panel.prototype.tabRenderHandler = function (index, tab) {
        var self = this;
        var cfg = self.tabArr[index];
        tab.visible = cfg.xs == 1 && ModuleManager.isOpen(cfg.tj);
        tab.data = cfg.px;
        if (tab.visible) {
            tab.setIcon(Enum_Path.SHOP_URL + "tab" + cfg.pic + ".png");
        }
    };
    View_Shop_Panel.prototype.linkHandler = function (event) {
        event.stopImmediatePropagation();
        var self = this;
        var cfg = self.tabArr[self.curTab.data - 1];
        if (cfg.open == UIConst.COUNTRY) {
            if (Model_player.voMine.country > 0) {
                GGlobal.layerMgr.open(UIConst.COUNTRY);
            }
            else {
                ViewCommonWarn.text("加入国家后才可获得声望");
            }
        }
        else if (cfg.open == UIConst.CROSS_SHILIAN) {
            var ms = Model_GlobalMsg.getServerTime();
            var nowDate = new Date(ms);
            var h = nowDate.getHours();
            var nowMin = nowDate.getMinutes();
            var nowSec = nowDate.getSeconds();
            if (h <= 0 && nowMin * 60 + nowSec <= 300) {
                ViewCommonWarn.text("跨服试炼重置中");
                return;
            }
            GGlobal.layerMgr.open(cfg.open);
        }
        else {
            GGlobal.layerMgr.open(cfg.open);
        }
    };
    View_Shop_Panel.prototype.changeHandler = function () {
        this.updateShow();
        this.list.scrollToView(0, false, true);
    };
    View_Shop_Panel.prototype.refreshHandle = function () {
        var self = this;
        var cfg = self.tabArr[self.curTab.data - 1];
        var costArr = JSON.parse(cfg.consume);
        if (costArr[0][0] == Enum_Attr.TONGBI && Model_player.voMine.tongbi >= costArr[0][2]) {
            GGlobal.modelshop.CG_SHOP_REFRESH(cfg.store);
        }
        else {
            ViewCommonWarn.text("铜币不足!");
        }
    };
    View_Shop_Panel.prototype.renderHandle = function (index, obj) {
        var item = obj;
        var vo = this.shopArr[index];
        item.setVo(vo);
    };
    View_Shop_Panel.prototype.updateShow = function () {
        var self = this;
        if (!self.curTab) {
            self.curTab = self.tabList._children[0];
            self.curTab.selected = true;
        }
        var cfg = self.tabArr[self.curTab.data - 1];
        self.shopArr = [];
        var arr = Model_Shop.shopArr[cfg.id - 1];
        if (!arr)
            arr = [];
        IconUtil.setImg(self.headIcon, Enum_Path.SHOP_URL + cfg.pic + ".jpg");
        if (cfg.id == 3 && Model_player.voMine.viplv < 10) {
            for (var i = 0; i < arr.length; i++) {
                var vo = arr[i];
                if (vo.condition.length <= 0 || (vo.condition.length > 0 && vo.condition[0][1] <= 15)) {
                    self.shopArr.push(vo);
                }
            }
        }
        else {
            self.shopArr = arr;
        }
        if (cfg.id == 5) {
            GGlobal.reddot.setCondition(UIConst.SHOP, 0, false);
        }
        self.list.numItems = self.shopArr.length;
        var voMine = Model_player.voMine;
        if (cfg.consume != "0") {
            self.refreshGroup.visible = true;
            var costArr = JSON.parse(cfg.consume);
            self.moneyLb2.text = costArr[0][2] + "";
        }
        else {
            self.refreshGroup.visible = false;
        }
        self.bg0.visible = self.bg1.visible = self.money0.visible = self.money1.visible = self.moneyLb0.visible = self.moneyLb1.visible = false;
        var moneyArr = JSON.parse(cfg.hb);
        for (var i = 0; i < moneyArr.length; i++) {
            if (moneyArr[i][0] == Enum_Attr.ITEM) {
                var itemVo = VoItem.create(moneyArr[i][1]);
                self["bg" + i].visible = self["moneyLb" + i].visible = self["money" + i].visible = true;
                IconUtil.setImg(self["money" + i], Enum_Path.ICON70_URL + itemVo.icon + ".png");
                self["moneyLb" + i].text = ConfigHelp.numToStr(Model_Bag.getItemCount(moneyArr[i][1]));
            }
            else {
                var moneyVo = Vo_Currency.create(moneyArr[i][0]);
                IconUtil.setImg(self["money" + i], Enum_Path.ICON70_URL + moneyVo.icon + ".png");
                var moneyNum = 0;
                switch (moneyArr[i][0]) {
                    case Enum_Attr.yuanBao:
                        moneyNum = voMine.yuanbao;
                        break;
                    case Enum_Attr.TONGBI:
                        moneyNum = voMine.tongbi;
                        break;
                    case Enum_Attr.PRESTIGE:
                        moneyNum = voMine.prestige;
                        break;
                    case Enum_Attr.BOSSJF:
                        moneyNum = voMine.bossZCScore;
                        break;
                }
                self["moneyLb" + i].text = ConfigHelp.numToStr(moneyNum);
                self["bg" + i].visible = self["moneyLb" + i].visible = self["money" + i].visible = true;
            }
        }
        if (cfg.open > 0) {
            self.linkLb.visible = true;
            self.linkLb.text = HtmlUtil.createLink(cfg.way, true, cfg.open + "");
        }
        else {
            self.linkLb.visible = false;
        }
        self.checkTab();
    };
    View_Shop_Panel.prototype.checkTab = function () {
        var self = this;
        for (var i = 0; i < self.tabList._children.length; i++) {
            if (self.tabList._children[i].data == Config.stroe_218[5].px) {
                self.tabList._children[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.SHOP, 0);
                break;
            }
        }
    };
    View_Shop_Panel.prototype.onShown = function () {
        var self = this;
        if (Model_Shop.shopArr.length <= 0) {
            GGlobal.modelshop.CG_OPEN_SHOP(0);
        }
        self.curTab = self.tabList._children[0];
        if (self._args) {
            for (var i = 0; i < self.tabArr.length; i++) {
                var cfg = self.tabArr[i];
                if (cfg.xs == 1 && ModuleManager.isOpen(cfg.tj) && cfg.px == self._args) {
                    self.curTab = self.tabList._children[i];
                    self.tabList.scrollToView(i, false, true);
                    break;
                }
            }
        }
        self.curTab.selected = true;
        self.updateShow();
        GGlobal.reddot.listen(ReddotEvent.CHECK_SHOP, self.updateShow, self);
    };
    View_Shop_Panel.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.SHOP);
        GGlobal.reddot.remove(ReddotEvent.CHECK_SHOP, self.updateShow, self);
        IconUtil.setImg(self.headIcon, null);
        self.list.numItems = 0;
        if (self.curTab)
            self.curTab.selected = false;
        self.curTab = null;
    };
    View_Shop_Panel.URL = "ui://1f2dgazvspa9c";
    return View_Shop_Panel;
}(UIPanelBase));
__reflect(View_Shop_Panel.prototype, "View_Shop_Panel");
