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
var ViewTeQuan = (function (_super) {
    __extends(ViewTeQuan, _super);
    function ViewTeQuan() {
        var _this = _super.call(this) || this;
        _this._curpage = 0;
        _this.setSkin("tequan", "tequan_atlas0", "ViewTeQuan");
        return _this;
    }
    ViewTeQuan.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ChildCard.URL, ChildCard);
        f(TqIt.URL, TqIt);
        f(Child_WeekVip.URL, Child_WeekVip);
    };
    ViewTeQuan.prototype.initView = function () {
        var sf = this;
        sf.n31.callbackThisObj = this;
        sf.n31.itemRenderer = sf.renderHandle;
        sf.n31.numItems = GGlobal.modelvip._icons.length;
    };
    ViewTeQuan.prototype.renderHandle = function (index, obj) {
        var a = this;
        var tab = obj;
        var id = GGlobal.modelvip._icons[index];
        ImageLoader.instance.loader(Enum_Path.MAINUI_URL + id + ".png", tab.getChild("icon"));
        tab.data = id;
    };
    ViewTeQuan.prototype.getHeadHD = function () {
        GGlobal.modelvip.CG_LTQ_2175();
    };
    ViewTeQuan.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        a.updateChildShow(tab.data);
    };
    ViewTeQuan.prototype.updateChildShow = function (id) {
        var a = this;
        this.curTab = id;
        if (a.tabView) {
            a.tabView.close();
            a.removeChild(a.tabView);
        }
        switch (id) {
            case 500401:
            case 500402:
            case 500403:
                a.tabView = ChildCard.createInstance();
                a.tabView.idx = GGlobal.modelvip._icons.indexOf(id);
                break;
            case UIConst.WEEK_VIP:
                a.tabView = Child_WeekVip.createInstance();
                break;
        }
        a.tabView.setXY(1, 299);
        a.addChild(a.tabView);
        a.tabView.open();
    };
    ViewTeQuan.prototype.setNotice = function () {
        this.n35.visible = false;
        this.n37.visible = false;
        var arr = GGlobal.modelvip._icons;
        for (var i = 0; i < arr.length; i++) {
            var id = arr[i];
            var btn = this.n31.getChildAt(i);
            var red = GGlobal.reddot.checkCondition(id, 0);
            if (btn)
                btn.getChild("noticeImg").visible = red;
            if (red && i > this._curpage + 3) {
                this.n35.visible = true;
            }
            if (red && i < this._curpage) {
                this.n37.visible = true;
            }
        }
        this.n31.numItems = GGlobal.modelvip._icons.length;
    };
    ViewTeQuan.prototype.pageHandler = function (event) {
        var btn = event.target;
        var curpage = this.n31.getFirstChildInView();
        switch (btn.id) {
            case this.n37.id:
                if (curpage > 0) {
                    curpage = curpage - 3;
                    if (curpage < 0)
                        curpage = 0;
                }
                break;
            case this.n35.id:
                if (curpage < this.n31.numItems - 1) {
                    curpage = curpage + 3;
                    if (curpage >= this.n31.numItems - 1)
                        curpage = this.n31.numItems - 1;
                }
                break;
        }
        this._curpage = curpage;
        if (this.n31.numItems > 0)
            this.n31.scrollToView(curpage, true, true);
        this.setNotice();
    };
    ViewTeQuan.prototype.scrollComp = function () {
        var curpage = this.n31.getFirstChildInView();
        this._curpage = curpage;
        this.setNotice();
    };
    ViewTeQuan.prototype.setExtraAward = function () {
        var model = GGlobal.modelvip;
        var sf = this;
        sf.btnHeadAward.enabled = model.headState == 1;
        sf.btnHeadAward.visible = model.headState != 2;
        sf.btnHeadAward.checkNotice = model.headState == 1;
        sf.imgYlq.visible = model.headState == 2;
    };
    ViewTeQuan.prototype.onShown = function () {
        var s = this;
        GGlobal.control.listen(Enum_MsgType.TQ_LQ, s.setNotice, s);
        GGlobal.control.listen(Enum_MsgType.TQ_INFO, s.setNotice, s);
        GGlobal.control.listen(Enum_MsgType.WELFARE_WEEKVIP_LQ, s.setNotice, s);
        s.n31.addEventListener(fairygui.ItemEvent.CLICK, s.listHandle, s);
        s.btnHeadAward.addClickListener(s.getHeadHD, s);
        GGlobal.control.listen(Enum_MsgType.TQ_LQ, s.setExtraAward, s);
        GGlobal.modelvip.CG_TQ_2171();
        s.n31.selectedIndex = 0;
        s.updateChildShow(GGlobal.modelvip._icons[0]);
        s.setExtraAward();
        this.setNotice();
    };
    ViewTeQuan.prototype.onHide = function () {
        var s = this;
        s.n31.removeEventListener(fairygui.ItemEvent.CLICK, s.listHandle, s);
        s.btnHeadAward.removeClickListener(s.getHeadHD, s);
        GGlobal.control.remove(Enum_MsgType.TQ_LQ, s.setNotice, s);
        GGlobal.control.remove(Enum_MsgType.TQ_INFO, s.setNotice, s);
        GGlobal.control.remove(Enum_MsgType.WELFARE_WEEKVIP_LQ, s.setNotice, s);
        GGlobal.control.remove(Enum_MsgType.TQ_LQ, s.setExtraAward, s);
        GGlobal.layerMgr.close(UIConst.TEQUAN);
        if (s.tabView) {
            s.tabView.close();
            s.removeChild(s.tabView);
        }
    };
    ViewTeQuan.URL = "ui://k82cjspug8eo3";
    return ViewTeQuan;
}(UIPanelBase));
__reflect(ViewTeQuan.prototype, "ViewTeQuan");
