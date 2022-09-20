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
var View_HuoDong_Panel = (function (_super) {
    __extends(View_HuoDong_Panel, _super);
    function View_HuoDong_Panel() {
        var _this = _super.call(this) || this;
        _this.idView = {};
        _this._curpage = 0;
        _this.setSkin("huoDong", "huoDong_atlas0", "View_HuoDong_Panel");
        return _this;
    }
    ;
    View_HuoDong_Panel.prototype.setExtends = function () {
        var fac = fairygui.UIObjectFactory;
        fac.setPackageItemExtension(ChildDL.URL, ChildDL);
        fac.setPackageItemExtension(ChaoJiTip.URL, ChaoJiTip);
        fac.setPackageItemExtension(ChildCZDJ.URL, ChildCZDJ);
        fac.setPackageItemExtension(Child_HuoDong.URL, Child_HuoDong);
        fac.setPackageItemExtension(VHuoDongItem.URL, VHuoDongItem);
        fac.setPackageItemExtension(ItemCJDJ.URL, ItemCJDJ);
        fac.setPackageItemExtension(Child_LXLC.URL, Child_LXLC);
        fac.setPackageItemExtension(VLXLCItem.URL, VLXLCItem);
    };
    View_HuoDong_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        a.viewHd.visible = false;
        this.btnRight.scalRed();
        a.idView = {};
        a.idView[UIConst.HUODONG_DAILY_GIFT814] = Child_HuoDong814;
        a.idView[UIConst.HUODONG_DAILY_ONE814] = Child_HuoDong814;
        a.idView[UIConst.HUODONG_ADD_RECHARGE814] = Child_HuoDong814;
        a.idView[UIConst.HUODONG_DAILY_ADDUP814] = Child_HuoDong814;
        a.idView[UIConst.HUODONG_DIANJIAN814] = ChildCZD814;
        a.idView[UIConst.HUODONG_SEVEN814] = Child_LXLC814;
    };
    View_HuoDong_Panel.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        a.btnLeft.addClickListener(this.pageHandler, this);
        a.btnRight.addClickListener(this.pageHandler, this);
        a.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.reddot.listen(ReddotEvent.CHECK_HUODONG, a.setNotice, a);
        this._curpage = 0;
        a.setNotice();
    };
    View_HuoDong_Panel.prototype.onHide = function () {
        var a = this;
        if (a.tabView) {
            a.tabView.disposePanel();
        }
        GGlobal.layerMgr.close(UIConst.HUODONG);
        a.btnLeft.removeClickListener(this.pageHandler, this);
        a.btnRight.removeClickListener(this.pageHandler, this);
        a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
        a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.reddot.remove(ReddotEvent.CHECK_HUODONG, a.setNotice, a);
    };
    View_HuoDong_Panel.prototype.updateShow = function () {
        var _this = this;
        var a = this;
        a.iconArr = [];
        this.actArr = GGlobal.modelActivity.getGroup(4501); //Model_Activity.activityObj[4501]
        var arr1 = ModelEightLock.getActivity(UIConst.HUODONG);
        this.actArr = this.actArr ? this.actArr.concat(arr1) : arr1;
        Model_HuoDong.iconArr.forEach(function (element) {
            var id = element.id;
            if (element.id == UIConst.HUODONG_ADD_RECHARGE && Model_GlobalMsg.kaifuDay <= 7) {
                id = UIConst.HUODONG_ADD_RECHARGESYS;
            }
            else if (element.id == UIConst.HUODONG_DIANJIANG && Model_GlobalMsg.kaifuDay <= 7) {
                id = UIConst.HUODONG_DIANJIANG_SYS;
            }
            if (_this.isOpen(id) && ModuleManager.isOpen(id)) {
                a.iconArr.push(element);
            }
        });
        // if (a.iconArr.length == 0) return;
        a.list.numItems = a.iconArr.length;
        if (a.iconArr.length > 0) {
            var scto = 0;
            if (a._args && Number(a._args) > 0) {
                if (Number(a._args) == UIConst.HUODONG_ADD_RECHARGESYS)
                    a._args = UIConst.HUODONG_ADD_RECHARGE;
                for (var i = 0; i < a.iconArr.length; i++) {
                    if (a.iconArr[i].id == Number(a._args)) {
                        scto = i;
                        break;
                    }
                }
            }
            a.list.scrollToView(scto);
            a.list.selectedIndex = scto;
            a.updateChildShow(a.iconArr[scto].id);
        }
    };
    View_HuoDong_Panel.prototype.isOpen = function (id) {
        if (id == UIConst.HUODONG_SEVEN_KAIFU || id == UIConst.HUODONG_DAI_GIFT_KF ||
            id == UIConst.HUODONG_DAI_ONE_KF || id == UIConst.HUODONG_DAI_ADD_KF ||
            id == UIConst.HUODONG_ADD_RECHARGE || id == UIConst.HUODONG_DIANJIANG_SYS ||
            id == 4515) {
            if (Model_GlobalMsg.kaifuDay <= 7) {
                return true;
            }
            else {
                if (id == UIConst.HUODONG_ADD_RECHARGE) {
                    var act = GGlobal.modelActivity.get(UIConst.HUODONG, id);
                    if (act) {
                        var servTime = (Model_GlobalMsg.getServerTime() / 1000) >> 0;
                        return (act.end - servTime > 0) && (servTime - act.start > 0);
                    }
                }
            }
        }
        else if (this.actArr && this.actArr.length > 0) {
            for (var i = 0; i < this.actArr.length; i++) {
                var act = this.actArr[i];
                if (act.id == id) {
                    var time = (Model_GlobalMsg.getServerTime() / 1000) >> 0;
                    if ((act.end - time > 0) && (time - act.start > 0))
                        return true;
                }
            }
        }
        return false;
    };
    View_HuoDong_Panel.prototype.renderHandle = function (index, obj) {
        var a = this;
        var id = a.iconArr[index].id;
        obj.data = id;
        obj.setActivityIcon(Config.jchd_723[id].icon);
    };
    View_HuoDong_Panel.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        a.updateChildShow(tab.data);
    };
    View_HuoDong_Panel.prototype.updateChildShow = function (id) {
        this.curTab = id;
        var a = this;
        if (a.tabView) {
            a.tabView.disposePanel();
        }
        var fac = fairygui.UIObjectFactory;
        if (id == UIConst.HUODONG_DIANJIANG) {
            a.tabView = ChildCZDJ.instance;
        }
        else if (id == UIConst.HUODONG_SEVEN_KAIFU || id == UIConst.HUODONG_SEVEN_ACT) {
            a.tabView = Child_LXLC.instance;
        }
        else if (a.idView[id] != null) {
            fac.setPackageItemExtension(Child_HuoDong814.URL, Child_HuoDong814);
            fac.setPackageItemExtension(VHuoDongI814.URL, VHuoDongI814);
            a.tabView = a.idView[id].instance;
        }
        else {
            fac.setPackageItemExtension(Child_HuoDong.URL, Child_HuoDong);
            fac.setPackageItemExtension(VHuoDongItem.URL, VHuoDongItem);
            a.tabView = this.viewHd;
        }
        a.tabView.show(a, id);
    };
    View_HuoDong_Panel.prototype.setNotice = function () {
        this.btnRight.checkNotice = false;
        this.btnLeft.checkNotice = false;
        for (var i = 0; i < this.iconArr.length; i++) {
            var id = this.iconArr[i].id;
            var btn = this.list.getChildAt(i);
            if (id == UIConst.HUODONG_DIANJIANG && Model_GlobalMsg.kaifuDay <= 7) {
                id = UIConst.HUODONG_DIANJIANG_SYS;
            }
            if (id == UIConst.HUODONG_ADD_RECHARGE && Model_GlobalMsg.kaifuDay <= 7) {
                id = UIConst.HUODONG_ADD_RECHARGESYS;
            }
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
    View_HuoDong_Panel.prototype.pageHandler = function (event) {
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
    View_HuoDong_Panel.prototype.scrollComp = function () {
        var curpage = this.list.getFirstChildInView();
        this._curpage = curpage;
        this.setNotice();
    };
    View_HuoDong_Panel.URL = "ui://vrw7je9rlj8v0";
    return View_HuoDong_Panel;
}(UIPanelBase));
__reflect(View_HuoDong_Panel.prototype, "View_HuoDong_Panel");
