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
var View_HuoDOnly_Panel = (function (_super) {
    __extends(View_HuoDOnly_Panel, _super);
    function View_HuoDOnly_Panel() {
        var _this = _super.call(this) || this;
        _this._curpage = 0;
        _this.setSkin("huoDOnly", "huoDOnly_atlas0", "View_HuoDOnly_Panel");
        return _this;
    }
    ;
    View_HuoDOnly_Panel.prototype.setExtends = function () {
        var fac = fairygui.UIObjectFactory;
        fac.setPackageItemExtension(Child_HuoDOnly.URL, Child_HuoDOnly);
        fac.setPackageItemExtension(VHuoDOnlyItem.URL, VHuoDOnlyItem);
        fac.setPackageItemExtension(Child_HOnlyShop.URL, Child_HOnlyShop);
        fac.setPackageItemExtension(HOnlyShopItem.URL, HOnlyShopItem);
        fac.setPackageItemExtension(Child_HOnlyDBFanLi.URL, Child_HOnlyDBFanLi);
        fac.setPackageItemExtension(Item_HOnlyDBFanLi.URL, Item_HOnlyDBFanLi);
    };
    View_HuoDOnly_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        a.btnRight.scalRed();
        a.viewHd.visible = false;
        a.idView = {};
        a.idView[UIConst.HUOD_ONLY_SHOP] = Child_HOnlyShop;
        a.idView[UIConst.HUOD_ONLY_DBFanLi] = Child_HOnlyDBFanLi;
    };
    View_HuoDOnly_Panel.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        a.btnLeft.addClickListener(this.pageHandler, this);
        a.btnRight.addClickListener(this.pageHandler, this);
        a.checkBox.addClickListener(this.onCheck, this);
        a.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.reddot.listen(UIConst.HUOD_ONLY, a.setNotice, a);
        GGlobal.modelHuoDOnly.listen(Model_HuoDOnly.add_del_hd, this.updateShow, this);
        this._curpage = 0;
        a.setNotice();
        a.checkBox.selected = Model_HuoDOnly.getSkipShow();
    };
    View_HuoDOnly_Panel.prototype.onCheck = function () {
        Model_HuoDOnly.setSkipShow(this.checkBox.selected);
    };
    View_HuoDOnly_Panel.prototype.onHide = function () {
        var a = this;
        if (a.tabView) {
            a.tabView.disposePanel();
        }
        a.btnLeft.removeClickListener(this.pageHandler, this);
        a.btnRight.removeClickListener(this.pageHandler, this);
        a.checkBox.removeClickListener(this.onCheck, this);
        a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
        a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.reddot.remove(UIConst.HUOD_ONLY, a.setNotice, a);
        GGlobal.modelHuoDOnly.remove(Model_HuoDOnly.add_del_hd, this.updateShow, this);
    };
    View_HuoDOnly_Panel.prototype.updateShow = function () {
        var a = this;
        a.actArr = Model_HuoDOnly.getActivity();
        a.actArr.sort(function (a, b) { return a.id - b.id; });
        a.list.numItems = a.actArr.length;
        if (a.actArr.length > 0) {
            var scto = 0;
            if (a._args && Number(a._args) > 0) {
                for (var i = 0; i < a.actArr.length; i++) {
                    if (a.actArr[i].index == Number(a._args)) {
                        scto = i;
                        break;
                    }
                }
            }
            a.list.scrollToView(scto);
            a.list.selectedIndex = scto;
            a.updateChildShow(a.actArr[scto]);
        }
    };
    View_HuoDOnly_Panel.prototype.renderHandle = function (index, obj) {
        var a = this;
        var tab = obj;
        var id = a.actArr[index].index;
        ImageLoader.instance.loader(Enum_Path.MAINUI_URL + Config.zshd_315[id].icon + ".png", tab.getChild("icon"));
        tab.data = a.actArr[index];
    };
    View_HuoDOnly_Panel.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        a.updateChildShow(tab.data);
    };
    View_HuoDOnly_Panel.prototype.updateChildShow = function (act) {
        var a = this;
        if (a.tabView) {
            a.tabView.disposePanel();
        }
        var id = act.index;
        if (a.idView[id] != null) {
            a.tabView = a.idView[id].instance;
        }
        else {
            a.tabView = a.viewHd;
        }
        a.tabView.show(a, act);
    };
    View_HuoDOnly_Panel.prototype.setNotice = function () {
        this.btnRight.checkNotice = false;
        this.btnLeft.checkNotice = false;
        for (var i = 0; i < this.actArr.length; i++) {
            var id = this.actArr[i].index;
            var index = this.actArr[i].id;
            var btn = this.list.getChildAt(i);
            var red = GGlobal.reddot.checkCondition(id, index - 1);
            if (btn)
                btn.getChild("noticeImg").visible = red;
            if (red && i > this._curpage + 3) {
                this.btnRight.checkNotice = true;
            }
            if (red && i < this._curpage) {
                this.btnLeft.checkNotice = true;
            }
        }
    };
    View_HuoDOnly_Panel.prototype.pageHandler = function (event) {
        var btn = event.target;
        var curpage = this.list.getFirstChildInView();
        switch (btn.id) {
            case this.btnLeft.id:
                if (curpage > 0) {
                    curpage = curpage - 3;
                    if (curpage < 0)
                        curpage = 0;
                }
                break;
            case this.btnRight.id:
                if (curpage < this.list.numItems - 1) {
                    curpage = curpage + 3;
                    if (curpage >= this.list.numItems - 1)
                        curpage = this.list.numItems - 1;
                }
                break;
        }
        this._curpage = curpage;
        if (this.list.numItems > 0)
            this.list.scrollToView(curpage, true, true);
        this.setNotice();
    };
    View_HuoDOnly_Panel.prototype.scrollComp = function () {
        var curpage = this.list.getFirstChildInView();
        this._curpage = curpage;
        this.setNotice();
    };
    View_HuoDOnly_Panel.URL = "ui://mk3gp0vrlbbw0";
    return View_HuoDOnly_Panel;
}(UIPanelBase));
__reflect(View_HuoDOnly_Panel.prototype, "View_HuoDOnly_Panel");
