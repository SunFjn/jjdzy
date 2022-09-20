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
var View_Horse_Panel = (function (_super) {
    __extends(View_Horse_Panel, _super);
    function View_Horse_Panel() {
        var _this = _super.call(this) || this;
        _this._curpage = 0;
        _this._lastIndex = 0;
        _this.setSkin("horse", "horse_atlas0", "View_Horse_Panel");
        return _this;
    }
    // private _needItem: VoItem;
    // private _hasNeed = false;
    View_Horse_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("horse", "View_Horse_Panel"));
    };
    View_Horse_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Child_Hourse_HH.URL, Child_Hourse_HH);
        f(ItemHorseHH.URL, ItemHorseHH);
        f(ItemHorseCondition.URL, ItemHorseCondition);
        // f(View_Horse_Panel.URL, View_Horse_Panel);
        f(Child_Horse_Lv.URL, Child_Horse_Lv);
        f(Child_Horse_Star.URL, Child_Horse_Star);
        f(VHorseGrid.URL, VHorseGrid);
    };
    View_Horse_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        a.list.setVirtual();
    };
    View_Horse_Panel.prototype.onShown = function () {
        var s = this;
        var m = GGlobal.model_Horse;
        var t_selectedIndex = ~~s._args;
        s.registerEvent(true);
        m.CG_OPENUI_11021();
        s.c1.selectedIndex = -1;
        s.c1.selectedIndex = t_selectedIndex;
    };
    View_Horse_Panel.prototype.onHide = function () {
        var self = this;
        self.registerEvent(false);
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        self._selVo = null;
        self.v0.hide();
        self.v1.hide();
        self.v2.closePanel();
        self.list.numItems = 0;
    };
    /**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag
     */
    View_Horse_Panel.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.reddot.register(pFlag, UIConst.HORSE, self.setNotice, self);
        GGlobal.model_Horse.register(pFlag, Model_Horse.openui, self.upView, self);
        EventUtil.register(pFlag, self.btnLeft, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
        EventUtil.register(pFlag, self.btnRight, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
        EventUtil.register(pFlag, self.showBt, egret.TouchEvent.TOUCH_TAP, self.btnShow, self);
        EventUtil.register(pFlag, self.list, fairygui.ItemEvent.CLICK, self.listHandle, self);
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.onSelectChange, self);
        EventUtil.register(pFlag, self.list.scrollPane, fairygui.ScrollPane.SCROLL, self.scrollComp, self);
        if (pFlag) {
            ReddotMgr.ins().register(UIConst.HORSE_HH + "|" + 0, self.tab2.noticeImg);
        }
        else {
            ReddotMgr.ins().unregister(self.tab2.noticeImg);
        }
    };
    View_Horse_Panel.prototype.renderHandle = function (index, obj) {
        var a = this;
        obj.setVo(a._lstDat[index], a.c1.selectedIndex);
    };
    View_Horse_Panel.prototype.pageHandler = function (event) {
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
    View_Horse_Panel.prototype.setNotice = function () {
        var s = this;
        s.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.HORSE, 1);
        s.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.HORSE, 2);
        this.btnRight.checkNotice = false;
        this.btnLeft.checkNotice = false;
        var horArr = s._lstDat;
        if (!horArr)
            return;
        for (var i = 0; i < horArr.length; i++) {
            var id = horArr[i].id;
            var red = GGlobal.reddot.checkCondition(UIConst.HORSE, id * 10 + s.c1.selectedIndex);
            if (!red)
                continue;
            if (i > this._curpage + 4) {
                this.btnRight.checkNotice = true;
            }
            if (i < this._curpage) {
                this.btnLeft.checkNotice = true;
            }
        }
    };
    View_Horse_Panel.prototype.scrollComp = function () {
        var curpage = this.list.getFirstChildInView();
        this._curpage = curpage;
        this.setNotice();
    };
    View_Horse_Panel.prototype.listHandle = function (event) {
        var item = event.itemObject;
        var s = this;
        s._selVo = item.vo;
        s.upSelView();
    };
    View_Horse_Panel.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_Horse;
        s.upList();
        s.upSelView();
        s.setNotice();
    };
    View_Horse_Panel.prototype.onSelectChange = function (e) {
        var t = this;
        if (!(e.currentTarget instanceof fairygui.Controller))
            return;
        var t_selectedIndex = e.currentTarget.selectedIndex;
        if (t_selectedIndex < 0)
            return;
        if (t_selectedIndex == 2) {
            if (!ModuleManager.isOpen(UIConst.HORSE_HH, true)) {
                t.c1.setSelectedIndex(t._lastIndex);
                return;
            }
        }
        t._lastIndex = t_selectedIndex;
        t.upView();
    };
    View_Horse_Panel.prototype.sortHor = function () {
        var arr = GGlobal.model_Horse.getHorseListByType(EnumHorse.TYPE_COMMON);
        this._lstDat = arr.sort(function (a, b) {
            return getWeight(a) > getWeight(b) ? -1 : 1;
        });
        function getWeight(hor) {
            var ret = 0;
            var star = hor.star;
            var red = GGlobal.reddot.checkCondition(UIConst.HORSE, hor.id * 10 + 0) || GGlobal.reddot.checkCondition(UIConst.HORSE, hor.id * 10 + 1);
            if (hor.id == GGlobal.model_Horse.rideId) {
                ret += 100000000000;
            }
            else if (star) {
                ret += 5000000000;
                ret += 1000000 * hor.quality; //品质权重大于id权重
                ret += hor.id;
            }
            else if (red) {
                ret += 5000000;
                ret += 100000 * hor.quality; //品质权重大于id权重
                ret += hor.id;
            }
            else {
                ret += hor.id * -1; //品质权重大于id权重
                ret += hor.quality * -10000;
            }
            return ret;
        }
    };
    View_Horse_Panel.prototype.upList = function () {
        var s = this;
        s.sortHor();
        s.list.numItems = s._lstDat.length;
        var srollTo = 0;
        if (Model_GlobalMsg.selectID > 0) {
            for (var i = 0; i < s._lstDat.length; i++) {
                var vo = s._lstDat[i];
                if (vo.id == Model_GlobalMsg.selectID) {
                    srollTo = i;
                    break;
                }
            }
            s._selVo = s._lstDat[srollTo];
            Model_GlobalMsg.selectID = 0;
        }
        else if (s._selVo) {
            for (var i = 0; i < s._lstDat.length; i++) {
                if (s._lstDat[i].id == s._selVo.id) {
                    srollTo = i;
                    break;
                }
            }
            s.list.scrollToView(srollTo);
            s.list.selectedIndex = srollTo;
        }
        else {
            s._selVo = s._lstDat[0];
        }
        s.list.scrollToView(srollTo);
        s.list.selectedIndex = srollTo;
    };
    View_Horse_Panel.prototype.upSelView = function () {
        var self = this;
        var m = GGlobal.model_Horse;
        var v = self._selVo;
        self.vname.text = HtmlUtil.fontNoSize(v.name, Color.getColorStr(v.quality));
        self.labStar.text = ConfigHelp.getStarFontStr(v.star);
        switch (self.c1.selectedIndex) {
            case 0:
                self.v0.show(v);
                self.labStar.visible = true;
                self.showBt.visible = v.isAct;
                self.v2.closePanel();
                break;
            case 1:
                self.v1.show(v);
                self.labStar.visible = false;
                self.showBt.visible = false;
                self.v2.closePanel();
                break;
            case 2:
                self.v2.openPanel();
                self.labStar.visible = false;
                self.showBt.visible = false;
                break;
        }
        self.labPower.text = "" + self.getAllPower();
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        if (!self.awatar) {
            self.awatar = EffectMgr.addEff("body/" + v.cfg.model + "/ride_st/ani", self.modelIcon.displayObject, self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
        }
    };
    View_Horse_Panel.prototype.getAllPower = function () {
        var s = this;
        if (!s._selVo.cfgLv) {
            return 0;
        }
        //升级
        var lvCfg = s._selVo.cfgLv;
        //升星
        var starCfg = s._selVo.cfgStar;
        return lvCfg.power + starCfg.zl;
    };
    View_Horse_Panel.prototype.btnShow = function () {
        var self = this;
        var v = self._selVo;
        if (!v) {
            return;
        }
        if (!v.isAct) {
            ViewCommonWarn.text("未激活");
            return;
        }
        GGlobal.modelchat.CG_CHAT_SHOW_DATA(16, v.id);
    };
    //>>>>end
    View_Horse_Panel.URL = "ui://7shc3kzdmoak0";
    return View_Horse_Panel;
}(UIPanelBase));
__reflect(View_Horse_Panel.prototype, "View_Horse_Panel");
