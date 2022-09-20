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
var ViewHomeMaidPanel = (function (_super) {
    __extends(ViewHomeMaidPanel, _super);
    function ViewHomeMaidPanel() {
        var _this = _super.call(this) || this;
        _this._curpage = 0;
        _this.setSkin("homeMaid", "homeMaid_atlas0", "ViewHomeMaidPanel");
        return _this;
    }
    ViewHomeMaidPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("homeMaid", "ViewHomeMaidPanel"));
    };
    ViewHomeMaidPanel.prototype.setExtends = function () {
        var fac = fairygui.UIObjectFactory;
        fac.setPackageItemExtension(VMaidGrid.URL, VMaidGrid);
    };
    ViewHomeMaidPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
    };
    ViewHomeMaidPanel.prototype.onShown = function () {
        var s = this;
        var m = GGlobal.model_HomeMaid;
        s.registerEvent(true);
        m.CG_OPENUI_11301();
        s.c1.selectedIndex = 0;
        IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "maidBg.jpg");
    };
    ViewHomeMaidPanel.prototype.onHide = function () {
        var self = this;
        self.registerEvent(false);
        self._selVo = null;
        IconUtil.setImg(self.imgBg, null);
        IconUtil.setImg(self.imgMaid, null);
        self.list.numItems = 0;
    };
    /**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag
     */
    ViewHomeMaidPanel.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.reddot.register(pFlag, UIConst.HOME_MAID, self.setNotice, self);
        GGlobal.model_HomeMaid.register(pFlag, Model_HomeMaid.openui, self.upView, self);
        EventUtil.register(pFlag, self.btnLeft, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
        EventUtil.register(pFlag, self.btnRight, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
        EventUtil.register(pFlag, self.showBt, egret.TouchEvent.TOUCH_TAP, self.btnShow, self);
        EventUtil.register(pFlag, self.btnSX, egret.TouchEvent.TOUCH_TAP, self.onBtnSX, self);
        EventUtil.register(pFlag, self.list, fairygui.ItemEvent.CLICK, self.listHandle, self);
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.upView, self);
        EventUtil.register(pFlag, self.btnStar, egret.TouchEvent.TOUCH_TAP, self.onUpStar, self);
        EventUtil.register(pFlag, self.btnLv, egret.TouchEvent.TOUCH_TAP, self.onUpLv, self);
        EventUtil.register(pFlag, self.btnOneKey, egret.TouchEvent.TOUCH_TAP, self.onUpLv, self);
        EventUtil.register(pFlag, self.btnUse, egret.TouchEvent.TOUCH_TAP, self.onUse, self);
        EventUtil.register(pFlag, self.list.scrollPane, fairygui.ScrollPane.SCROLL, self.scrollComp, self);
    };
    ViewHomeMaidPanel.prototype.renderHandle = function (index, obj) {
        var a = this;
        obj.setVo(a._lstDat[index], a.c1.selectedIndex);
    };
    ViewHomeMaidPanel.prototype.listHandle = function (event) {
        var item = event.itemObject;
        var s = this;
        s._selVo = item.vo;
        s.upSelView();
    };
    ViewHomeMaidPanel.prototype.upView = function () {
        var s = this;
        s.upList();
        s.upSelView();
        s.setNotice();
    };
    ViewHomeMaidPanel.prototype.sortFuc = function () {
        var arr = GGlobal.model_HomeMaid.datArr;
        this._lstDat = arr.sort(function (a, b) {
            return getWeight(a) > getWeight(b) ? -1 : 1;
        });
        function getWeight(hor) {
            var ret = 0;
            var star = hor.star;
            var red = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, hor.id * 10 + 0) || GGlobal.reddot.checkCondition(UIConst.HOME_MAID, hor.id * 10 + 1);
            if (hor.id == GGlobal.model_HomeMaid.useId) {
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
    ViewHomeMaidPanel.prototype.upList = function () {
        var s = this;
        var m = GGlobal.model_HomeMaid;
        s.sortFuc();
        s.list.numItems = s._lstDat.length;
        if (s._selVo) {
            var srollTo = 0;
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
            s.list.scrollToView(0);
            s.list.selectedIndex = 0;
            s._selVo = s._lstDat[0];
        }
    };
    ViewHomeMaidPanel.prototype.upSelView = function () {
        var self = this;
        var m = GGlobal.model_HomeMaid;
        var v = self._selVo;
        self.vName.text = HtmlUtil.fontNoSize(v.name, Color.getColorStr(v.quality));
        IconUtil.setImg(self.imgMaid, Enum_Path.HOMEMAID_URL + v.cfg.yuanhua + ".png");
        if (self.c1.selectedIndex == 0) {
            self.labStar.visible = true;
            self.showBt.visible = v.isAct;
            self.labPower.text = v.cfgStar.power + "";
            self.lbTip.text = "";
            // self.lbTip.text = "侍女提升到" + v.cfg.dongtai + "星解锁动态效果";
            self.labStar.text = ConfigHelp.getStarFontStr(v.star);
            if (v.star == 0) {
                self.btnStar.text = "激活";
            }
            else {
                self.btnStar.text = "升星";
            }
            if (v.star >= v.cfg.shangxian) {
                self.imgMaxStar.visible = true;
                self.btnStar.visible = false;
                self.lbCostStar.text = "";
            }
            else {
                self.imgMaxStar.visible = false;
                self.btnStar.visible = true;
                //升星道具
                var consume = JSON.parse(v.cfg.xiaohao);
                self._needItem = VoItem.create(Number(consume[0][1]));
                var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
                var count = Number(consume[0][2]);
                var colorStr;
                if (hasCount >= count) {
                    colorStr = '#00FF00';
                    self._hasNeed = true;
                }
                else {
                    colorStr = '#FF0000';
                    self._hasNeed = false;
                }
                self.lbCostStar.text = "消耗：" + HtmlUtil.fontNoSize(self._needItem.name, Color.getColorStr(self._needItem.quality)) + "x" + count +
                    HtmlUtil.fontNoSize("(" + hasCount + "/" + count + ")", colorStr);
                self.btnStar.checkNotice = self._hasNeed;
            }
            //使用
            self.imgUse.visible = m.useId == v.id;
            self.btnUse.visible = m.useId != v.id && v.isAct;
        }
        else {
            self.lbLv.text = v.lv + "级";
            self.labPower.text = v.cfgLv.zl + "";
            self.showBt.visible = false;
            if (v.cfgLv.xh == "0") {
                self.imgMaxLv.visible = true;
                self.lbRes.text = "";
                self.vRes.visible = false;
                self.expBar._titleObject.text = "MAX";
                self.btnOneKey.visible = self.btnLv.visible = false;
            }
            else {
                self.imgMaxLv.visible = false;
                self.vRes.visible = true;
                //升级道具
                var consume = JSON.parse(v.cfgLv.xh);
                self._needItem = VoItem.create(Number(consume[0][1]));
                var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
                var count = Number(consume[0][2]);
                var colorStr;
                if (hasCount > 0) {
                    colorStr = '#00FF00';
                    self._hasNeed = true;
                }
                else {
                    colorStr = '#FF0000';
                    self._hasNeed = false;
                }
                self.vRes.visible = true;
                self.vRes.setImgUrl(self._needItem.icon);
                // self.vRes.setLb(hasCount, count);
                self.vRes.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(hasCount) + "/" + ConfigHelp.numToStr(count), colorStr));
                self.lbRes.text = HtmlUtil.fontNoSize(self._needItem.name, Color.getColorStr(self._needItem.quality));
                self.lbCostStar.text = "";
                //升级最大值
                var lvHome = GGlobal.homemodel.home_level;
                var cfgHome = Config.fdsj_019[lvHome];
                var red = (v.lv < cfgHome.shinv) && self._hasNeed && v.isAct;
                self.btnLv.checkNotice = red;
                self.btnOneKey.checkNotice = red && hasCount >= count;
                self.btnOneKey.visible = self.btnLv.visible = true;
                self.expBar.max = count * 10;
                self.expBar.value = v.exp;
            }
            //
            self.imgUse.visible = false;
            self.btnUse.visible = false;
        }
    };
    ViewHomeMaidPanel.prototype.pageHandler = function (event) {
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
                    if (curpage > this.list.numItems - 5)
                        curpage = this.list.numItems - 5;
                }
                break;
        }
        this._curpage = curpage;
        if (this.list.numItems > 0)
            this.list.scrollToView(curpage, true, true);
        this.setNotice();
    };
    ViewHomeMaidPanel.prototype.scrollComp = function () {
        var curpage = this.list.getFirstChildInView();
        this._curpage = curpage;
        this.setNotice();
    };
    ViewHomeMaidPanel.prototype.setNotice = function () {
        var s = this;
        s.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, 1);
        s.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, 2);
        this.btnRight.checkNotice = false;
        this.btnLeft.checkNotice = false;
        var arr = s._lstDat;
        if (!arr)
            return;
        for (var i = 0; i < arr.length; i++) {
            var id = arr[i].id;
            var red = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, id * 10 + s.c1.selectedIndex);
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
    ViewHomeMaidPanel.prototype.btnShow = function () {
        var self = this;
        var v = self._selVo;
        if (!v) {
            return;
        }
        if (!v.isAct) {
            ViewCommonWarn.text("未激活");
            return;
        }
        GGlobal.modelchat.CG_CHAT_SHOW_DATA(17, v.id);
    };
    ViewHomeMaidPanel.prototype.onBtnSX = function () {
        var self = this;
        if (!self._selVo) {
            return;
        }
        GGlobal.layerMgr.open(UIConst.HOME_MAID_ATTR, this._selVo);
    };
    ViewHomeMaidPanel.prototype.onUse = function () {
        var self = this;
        var v = self._selVo;
        if (!v) {
            return;
        }
        if (!v.isAct) {
            ViewCommonWarn.text("未激活");
            return;
        }
        GGlobal.model_HomeMaid.CG_USE_11307(v.id);
    };
    ViewHomeMaidPanel.prototype.onUpStar = function () {
        var self = this;
        var v = self._selVo;
        if (!v) {
            return;
        }
        if (!self._hasNeed) {
            View_CaiLiao_GetPanel.show(self._needItem);
            return;
        }
        GGlobal.model_HomeMaid.CG_UPSTAR_11303(v.id);
    };
    ViewHomeMaidPanel.prototype.onUpLv = function (e) {
        var self = this;
        var v = self._selVo;
        if (!v) {
            return;
        }
        if (!v.isAct) {
            ViewCommonWarn.text("未激活");
            return;
        }
        if (!self._hasNeed) {
            View_CaiLiao_GetPanel.show(self._needItem);
            return;
        }
        var lvHome = GGlobal.homemodel.home_level;
        var cfg = Config.fdsj_019[lvHome];
        if (v.lv >= cfg.shinv) {
            ViewCommonWarn.text("提高府邸等级可继续升级");
            return;
        }
        //府邸等级不满足要求
        if (e.currentTarget.id == self.btnOneKey.id) {
            GGlobal.model_HomeMaid.CG_UPLV_11305(v.id, 2);
        }
        else {
            GGlobal.model_HomeMaid.CG_UPLV_11305(v.id, 1);
        }
    };
    ViewHomeMaidPanel.URL = "ui://qqn3a7vx137v6b";
    return ViewHomeMaidPanel;
}(UIPanelBase));
__reflect(ViewHomeMaidPanel.prototype, "ViewHomeMaidPanel");
