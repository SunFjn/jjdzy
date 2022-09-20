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
var ViewShaoZhuAct = (function (_super) {
    __extends(ViewShaoZhuAct, _super);
    function ViewShaoZhuAct() {
        var _this = _super.call(this) || this;
        _this.idView = {};
        _this._curpage = 0;
        _this.setSkin("shaozhuAct", "shaozhuAct_atlas0", "ViewShaoZhuAct");
        return _this;
    }
    ViewShaoZhuAct.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "ViewShaoZhuAct"));
    };
    ViewShaoZhuAct.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ChildShaoZhuTarget.URL, ChildShaoZhuTarget);
        f(ItemShaoZhuTarget.URL, ItemShaoZhuTarget);
        f(ChildShaoZhuDanBi.URL, ChildShaoZhuDanBi);
        f(ChildShaoZhuLJCZ.URL, ChildShaoZhuLJCZ);
        f(ChildShaoZhuPig.URL, ChildShaoZhuPig);
        f(ItemPig.URL, ItemPig);
        f(HongBaoLabel.URL, HongBaoLabel);
        f(ChildShaoZhuHongBao.URL, ChildShaoZhuHongBao);
        f(HongBaoLabel.URL, HongBaoLabel);
        f(DBLabel.URL, DBLabel);
        f(ItemSaoZhuDB.URL, ItemSaoZhuDB);
        f(ShaoZhuTab2.URL, ShaoZhuTab2);
        f(ChildShaoZhuQYRank.URL, ChildShaoZhuQYRank);
        f(ItemShaoZhuQyRank1.URL, ItemShaoZhuQyRank1);
        f(ItemShaoZhuQyRank2.URL, ItemShaoZhuQyRank2);
        f(QiYuanListGrid.URL, QiYuanListGrid);
    };
    ViewShaoZhuAct.prototype.childrenCreated = function () {
        var a = this;
        a.idView = {};
        if (ModelEightLock.originalDatas[UIConst.SHAOZHU_QY_RANK]) {
            a.iconArr = [UIConst.SHAOZHU_QY_RANK, UIConst.SHAOZHU_HONGBAO, UIConst.SHAOZHU_PIG, UIConst.SHAOZHU_SINGLE, UIConst.SHAOZHU_RECHARGE, UIConst.SHAOZHU_TARGET];
        }
        else {
            a.iconArr = [UIConst.SHAOZHU_HONGBAO, UIConst.SHAOZHU_PIG, UIConst.SHAOZHU_SINGLE, UIConst.SHAOZHU_RECHARGE, UIConst.SHAOZHU_TARGET];
        }
        a.idView[UIConst.SHAOZHU_TARGET] = ChildShaoZhuTarget;
        a.idView[UIConst.SHAOZHU_RECHARGE] = ChildShaoZhuLJCZ;
        a.idView[UIConst.SHAOZHU_SINGLE] = ChildShaoZhuDanBi;
        a.idView[UIConst.SHAOZHU_PIG] = ChildShaoZhuPig;
        a.idView[UIConst.SHAOZHU_HONGBAO] = ChildShaoZhuHongBao;
        a.idView[UIConst.SHAOZHU_QY_RANK] = ChildShaoZhuQYRank;
        _super.prototype.childrenCreated.call(this);
    };
    ViewShaoZhuAct.prototype.initView = function () {
        var a = this;
        a.list.callbackThisObj = this;
        a.list.itemRenderer = this.renderHandle;
    };
    ViewShaoZhuAct.prototype.renderHandle = function (index, obj) {
        var a = this;
        var tab = obj;
        var id = a.iconArr[index];
        ImageLoader.instance.loader(Enum_Path.MAINUI_URL + id + ".png", tab.getChild("icon"));
        tab.data = id;
    };
    ViewShaoZhuAct.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        a.updateChildShow(tab.data);
    };
    ViewShaoZhuAct.prototype.updateChildShow = function (id) {
        var a = this;
        a.curTab = id;
        if (a.tabView) {
            a.tabView.disposePanel();
            a.removeChild(a.tabView);
        }
        a.tabView = a.idView[id].instance;
        a.tabView.show();
        a.tabView.setXY(0, 258);
        a.addChild(a.tabView);
    };
    ViewShaoZhuAct.prototype.setNotice = function () {
        var self = this;
        self.btnRight.checkNotice = false;
        self.btnLeft.checkNotice = false;
        var mainIconNotice = false;
        var r = GGlobal.reddot;
        for (var i = 0; i < self.iconArr.length; i++) {
            var btn = self.list.getChildAt(i);
            var id = btn.data;
            var red = r.checkCondition(id, 0);
            if (id == UIConst.SHAOZHU_TARGET) {
                red = r.checkCondition(id, 0) || r.checkCondition(id, 1) || r.checkCondition(id, 2) || r.checkCondition(id, 3) || r.checkCondition(id, 4);
            }
            if (btn)
                btn.getChild("noticeImg").visible = red;
            if (red && i > this._curpage + 3) {
                this.btnRight.checkNotice = true;
            }
            if (red && i < this._curpage) {
                this.btnLeft.checkNotice = true;
            }
            if (red) {
                mainIconNotice = true;
            }
        }
        GGlobal.reddot.setCondition(UIConst.SHAOZHU_ACT, 0, mainIconNotice);
        GGlobal.mainUICtr.setIconNotice(UIConst.SHAOZHU_ACT, mainIconNotice);
    };
    ViewShaoZhuAct.prototype.pageHandler = function (event) {
        var self = this;
        var btn = event.target;
        var curpage = self.list.getFirstChildInView();
        switch (btn.id) {
            case self.btnLeft.id:
                if (curpage > 0) {
                    curpage = curpage - 3;
                    if (curpage < 0)
                        curpage = 0;
                }
                break;
            case self.btnRight.id:
                if (curpage < self.list.numItems - 1) {
                    curpage = curpage + 3;
                    if (curpage >= self.list.numItems - 1)
                        curpage = self.list.numItems - 1;
                }
                break;
        }
        if (self.list.numItems > 0)
            self.list.scrollToView(curpage, false, true);
        self._curpage = curpage;
        self.setNotice();
    };
    ViewShaoZhuAct.prototype.updateShow = function () {
        var a = this;
        if (ModelEightLock.originalDatas[UIConst.SHAOZHU_QY_RANK]) {
            a.iconArr = [UIConst.SHAOZHU_QY_RANK, UIConst.SHAOZHU_HONGBAO, UIConst.SHAOZHU_PIG, UIConst.SHAOZHU_SINGLE, UIConst.SHAOZHU_RECHARGE, UIConst.SHAOZHU_TARGET];
        }
        else {
            a.iconArr = [UIConst.SHAOZHU_HONGBAO, UIConst.SHAOZHU_PIG, UIConst.SHAOZHU_SINGLE, UIConst.SHAOZHU_RECHARGE, UIConst.SHAOZHU_TARGET];
        }
        a.list.numItems = a.iconArr.length;
        if (a.iconArr.length > 0) {
            var scto = 0;
            if (a._args && Number(a._args) > 0) {
                scto = a._args;
            }
            a.list.scrollToView(scto);
            a.list.selectedIndex = scto;
            a.updateChildShow(a.iconArr[scto]);
        }
    };
    ViewShaoZhuAct.prototype.onTick = function () {
        if (this.tabView) {
            this.tabView.onUpdate();
        }
    };
    ViewShaoZhuAct.prototype.onShown = function () {
        var self = this;
        self.updateShow();
        self.btnLeft.addClickListener(self.pageHandler, self);
        self.btnRight.addClickListener(self.pageHandler, self);
        self.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, self.scrollComp, self);
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
        GGlobal.reddot.listen(UIConst.SHAOZHU_ACT, self.setNotice, self);
        self._curpage = 0;
        self.setNotice();
        Timer.instance.listen(self.onTick, self, 1000);
        GGlobal.control.listen(Enum_MsgType.SEND_OPEN_DAYS_SYSTEM, self.updateShow, self);
    };
    ViewShaoZhuAct.prototype.onHide = function () {
        var self = this;
        if (self.tabView) {
            self.tabView.disposePanel();
            self.tabView.removeFromParent();
        }
        self.tabView = null;
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ACT);
        self.btnLeft.removeClickListener(self.pageHandler, self);
        self.btnRight.removeClickListener(self.pageHandler, self);
        self.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, self.scrollComp, self);
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
        GGlobal.reddot.remove(UIConst.SHAOZHU_ACT, self.setNotice, self);
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ACT);
        Timer.instance.remove(self.onTick, self);
        GGlobal.control.remove(Enum_MsgType.SEND_OPEN_DAYS_SYSTEM, self.updateShow, self);
    };
    ViewShaoZhuAct.prototype.scrollComp = function () {
        var curpage = this.list.getFirstChildInView();
        this._curpage = curpage;
        this.setNotice();
    };
    ViewShaoZhuAct.prototype.closeEventHandler = function (evt) {
        if (this.tabView) {
            if (this.tabView instanceof ChildShaoZhuPig) {
                var bool = this.tabView.decideToClose();
                if (!bool)
                    return;
            }
        }
        this.hide();
    };
    ViewShaoZhuAct.URL = "ui://w5ll6n5j6hpm0";
    return ViewShaoZhuAct;
}(UIPanelBase));
__reflect(ViewShaoZhuAct.prototype, "ViewShaoZhuAct");
