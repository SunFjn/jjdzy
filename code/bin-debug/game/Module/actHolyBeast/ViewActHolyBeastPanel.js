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
var ViewActHolyBeastPanel = (function (_super) {
    __extends(ViewActHolyBeastPanel, _super);
    function ViewActHolyBeastPanel() {
        var _this = _super.call(this) || this;
        _this._curpage = 0;
        _this.setSkin("actHolyBeast", "actHolyBeast_atlas0", "ViewActHolyBeastPanel");
        return _this;
    }
    ViewActHolyBeastPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "ViewActHolyBeastPanel"));
    };
    ViewActHolyBeastPanel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Child_ActHolyBXiLian.URL, Child_ActHolyBXiLian);
        f(Child_ActHolyBMuBiao.URL, Child_ActHolyBMuBiao);
        f(Child_ActHolyBHuoYue.URL, Child_ActHolyBHuoYue);
        f(Child_ActHolyBZhuanP.URL, Child_ActHolyBZhuanP);
        f(Child_XiLianRank.URL, Child_XiLianRank);
        f(VActHolyBeastItem.URL, VActHolyBeastItem);
        f(ItemXiLianRank.URL, ItemXiLianRank);
        f(ItemXiLianRank1.URL, ItemXiLianRank1);
        f(ItemXiLianRank2.URL, ItemXiLianRank2);
        f(XiLianListGrid.URL, XiLianListGrid);
        f(ChildSGZL.URL, ChildSGZL);
        f(SGZLBtn.URL, SGZLBtn);
        f(SGZLTaskItem.URL, SGZLTaskItem);
        f(SGZLShopItem.URL, SGZLShopItem);
        f(SGZLRewardItem.URL, SGZLRewardItem);
    };
    ViewActHolyBeastPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        this.btnRight.scalRed();
        a.idView = {};
        a.idView[UIConst.ACTHB_XILIANRANK] = Child_XiLianRank;
        a.idView[UIConst.ACTHB_ZHUANPAN] = Child_ActHolyBZhuanP;
        a.idView[UIConst.ACTHB_MUBIAO] = Child_ActHolyBMuBiao;
        a.idView[UIConst.ACTHB_HUOYUE] = Child_ActHolyBHuoYue;
        a.idView[UIConst.ACTHB_XILIAN] = Child_ActHolyBXiLian;
        a.idView[UIConst.ACTHB_SGZL] = ChildSGZL;
    };
    /** 回收方法 */
    ViewActHolyBeastPanel.prototype.dispose = function () {
        for (var k in this.idView) {
            var t_cls = this.idView[k];
            if (t_cls && "_instance" in t_cls) {
                var t_view = t_cls._instance;
                if (t_view) {
                    t_view.dispose();
                    t_cls._instance = null;
                    // console.log("================= 触发回收");
                }
            }
        }
        _super.prototype.dispose.call(this);
    };
    ViewActHolyBeastPanel.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        a.btnLeft.addClickListener(this.pageHandler, this);
        a.btnRight.addClickListener(this.pageHandler, this);
        a.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.modelEightLock.CG4571(UIConst.ACTHB_XILIANRANK);
        GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XILIAN_RANK, a.updateShow, a);
        var r = GGlobal.reddot;
        r.listen(UIConst.ACTHB_ZHUANPAN, a.setNotice, a);
        r.listen(UIConst.ACTHB_XILIAN, a.setNotice, a);
        r.listen(UIConst.ACTHB_MUBIAO, a.setNotice, a);
        r.listen(UIConst.ACTHB_HUOYUE, a.setNotice, a);
        r.listen(UIConst.ACTHB_SGZL, a.setNotice, a);
        this._curpage = 0;
        a.setNotice();
    };
    ViewActHolyBeastPanel.prototype.onHide = function () {
        var a = this;
        if (a.tabView) {
            a.tabView.disposePanel();
        }
        GGlobal.layerMgr.close(UIConst.ACT_HOLY_BEAST);
        a.btnLeft.removeClickListener(this.pageHandler, this);
        a.btnRight.removeClickListener(this.pageHandler, this);
        a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
        a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XILIAN_RANK, a.updateShow, a);
        var r = GGlobal.reddot;
        r.remove(UIConst.ACTHB_ZHUANPAN, a.setNotice, a);
        r.remove(UIConst.ACTHB_XILIAN, a.setNotice, a);
        r.remove(UIConst.ACTHB_MUBIAO, a.setNotice, a);
        r.remove(UIConst.ACTHB_HUOYUE, a.setNotice, a);
        r.remove(UIConst.ACTHB_SGZL, a.setNotice, a);
    };
    ViewActHolyBeastPanel.prototype.updateShow = function () {
        var a = this;
        var arr = ModelEightLock.getActivity(UIConst.ACT_HOLY_BEAST);
        //图标关闭
        if (Model_ActHolyBeast.endTime <= 0) {
            var curVO = void 0;
            for (var i = 0; i < arr.length; i++) {
                var vo = arr[i];
                if (vo.id == UIConst.ACTHB_XILIANRANK) {
                    curVO = vo;
                    break;
                }
            }
            if (curVO) {
                var index = arr.indexOf(curVO);
                if (index != -1) {
                    arr.splice(index, 1);
                }
            }
        }
        a.actArr = [];
        arr.forEach(function (element) {
            if (ModuleManager.isOpen(element.id)) {
                a.actArr.push(element);
            }
        });
        a.actArr.sort(function (a, b) { return a.id - b.id; });
        //图标开启，洗练排行图标要放第一位
        if (Model_ActHolyBeast.endTime > 0) {
            var curVO = void 0;
            for (var i = 0; i < a.actArr.length; i++) {
                var vo = a.actArr[i];
                if (vo.id == UIConst.ACTHB_XILIANRANK) {
                    curVO = vo;
                    break;
                }
            }
            if (curVO) {
                var index = a.actArr.indexOf(curVO);
                if (index != -1) {
                    a.actArr.splice(index, 1);
                    a.actArr.unshift(curVO);
                }
            }
        }
        a.list.numItems = a.actArr.length;
        if (a.actArr.length > 0) {
            var scto = 0;
            a.list.scrollToView(scto);
            a.list.selectedIndex = scto;
            a.updateChildShow(a.actArr[scto].id);
        }
    };
    ViewActHolyBeastPanel.prototype.renderHandle = function (index, obj) {
        var a = this;
        var tab = obj;
        var id = a.actArr[index].id;
        ImageLoader.instance.loader(Enum_Path.MAINUI_URL + Config.xitong_001[id].icon + ".png", tab.getChild("icon"));
        tab.data = id;
    };
    ViewActHolyBeastPanel.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        a.updateChildShow(tab.data);
        if (tab.data == UIConst.ACTHB_XILIANRANK) {
            GGlobal.modelEightLock.CG4571(UIConst.ACTHB_XILIANRANK);
        }
    };
    ViewActHolyBeastPanel.prototype.updateChildShow = function (id) {
        this.curTab = id;
        var a = this;
        if (a.tabView) {
            a.tabView.disposePanel();
        }
        if (a.idView[id]) {
            a.tabView = a.idView[id].instance;
            a.tabView.show(a, id);
        }
    };
    ViewActHolyBeastPanel.prototype.setNotice = function () {
        this.btnRight.checkNotice = false;
        this.btnLeft.checkNotice = false;
        for (var i = 0; i < this.actArr.length; i++) {
            var id = this.actArr[i].id;
            var btn = this.list.getChildAt(i);
            var red = GGlobal.reddot.checkCondition(id, 0);
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
    ViewActHolyBeastPanel.prototype.pageHandler = function (event) {
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
    ViewActHolyBeastPanel.prototype.scrollComp = function () {
        var curpage = this.list.getFirstChildInView();
        this._curpage = curpage;
        this.setNotice();
    };
    ViewActHolyBeastPanel.URL = "ui://d5y9ngt6ccyk4";
    return ViewActHolyBeastPanel;
}(UIPanelBase));
__reflect(ViewActHolyBeastPanel.prototype, "ViewActHolyBeastPanel");
