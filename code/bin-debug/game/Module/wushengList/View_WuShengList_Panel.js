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
var View_WuShengList_Panel = (function (_super) {
    __extends(View_WuShengList_Panel, _super);
    function View_WuShengList_Panel() {
        var _this = _super.call(this) || this;
        _this.curOrder = 0;
        _this.curState = 0;
        _this.setSkin("wushengList", "wushengList_atlas0", "View_WuShengList_Panel");
        return _this;
    }
    View_WuShengList_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(WuShengItem.URL, WuShengItem);
        fairygui.UIObjectFactory.setPackageItemExtension(WuShengTab.URL, WuShengTab);
        fairygui.UIObjectFactory.setPackageItemExtension(WuShengListGrid.URL, WuShengListGrid);
    };
    View_WuShengList_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self.grid.isShowEff = true;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
        self.list1.callbackThisObj = self;
        self.list1.itemRenderer = self.itemRender;
        self.drawBt.addClickListener(self.onDraw, self);
        self.goBt.addClickListener(self.onGo, self);
        self.giftBt.addClickListener(self.onGift, self);
        Model_WuShengList.getRank();
        GGlobal.modelWuSheng.CG_OPEN_WUSHENG_LIST(Model_GlobalMsg.kaifuDay);
    };
    View_WuShengList_Panel.prototype.itemRender = function (index, item) {
        var self = this;
        if (index < 3) {
            item.show(Model_WuShengList.rankArr[index], self.curTab.vo.id, index + 1);
        }
        else {
            if (index == 3) {
                item.show(null, self.curTab.vo.id, 4);
            }
            else {
                item.show(null, self.curTab.vo.id, 6);
            }
        }
    };
    View_WuShengList_Panel.prototype.onGift = function () {
        GGlobal.layerMgr.open(this.curTab.vo.open2);
    };
    View_WuShengList_Panel.prototype.onGo = function () {
        GGlobal.layerMgr.open(this.curTab.vo.open1);
    };
    View_WuShengList_Panel.prototype.onDraw = function () {
        if (this.drawBt.checkNotice) {
            GGlobal.modelWuSheng.CG_WUSHENG_LIST_DRAW(this.curOrder);
        }
        else {
            ViewCommonWarn.text("未达到领取条件");
        }
    };
    View_WuShengList_Panel.prototype.listHandler = function (evt) {
        var tab = evt.itemObject;
        if (this.curTab && this.curTab.vo.id == tab.vo.id)
            return;
        if (!tab.vo)
            return;
        if (tab.vo.id > Model_GlobalMsg.kaifuDay) {
            ViewCommonWarn.text("活动未开启");
            tab.selected = false;
            if (this.curTab)
                this.curTab.selected = true;
            return;
        }
        this.curTab = tab;
        GGlobal.modelWuSheng.CG_OPEN_WUSHENG_LIST(tab.vo.id);
    };
    View_WuShengList_Panel.prototype.renderHandler = function (index, obj) {
        var tab = obj;
        tab.show(Model_WuShengList.listArr[index]);
        if (!this.curTab && index + 1 == Model_GlobalMsg.kaifuDay) {
            tab.selected = true;
            this.curTab = tab;
            this.list.scrollToView(index, true);
        }
    };
    View_WuShengList_Panel.prototype.updateShow = function () {
        this.list.numItems = Model_WuShengList.listArr.length;
        this.updateSelShow();
    };
    View_WuShengList_Panel.prototype.updateSelShow = function () {
        var s = this;
        if (!s.curTab)
            return;
        var cfg = s.curTab.vo;
        var reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward4));
        var conditionArr = JSON.parse(cfg.tips);
        s.list1.numItems = 5;
        if (Model_WuShengList.myRank > 100 || Model_WuShengList.myRank == 0) {
            s.conditionLb.text = "大奖条件：" + HtmlUtil.fontNoSize(conditionArr[1][0], Color.getColorStr(2));
            s.rankLb.text = "我的排名：" + HtmlUtil.fontNoSize("未上榜", Color.getColorStr(2));
        }
        else {
            s.conditionLb.text = "大奖条件：" + HtmlUtil.fontNoSize(conditionArr[0][0], Color.getColorStr(2));
            s.rankLb.text = "我的排名：" + HtmlUtil.fontNoSize("" + Model_WuShengList.myRank, Color.getColorStr(2));
        }
        s.powerLb.text = cfg.name + "：" + HtmlUtil.fontNoSize("" + Model_WuShengList.power, Color.getColorStr(2));
        var cfg1;
        var state;
        var targetId;
        var color = 0;
        for (var i = 0; i < Model_WuShengList.drawArr.length; i++) {
            var arr = Model_WuShengList.drawArr[i];
            state = arr[1];
            targetId = arr[0];
            if (state != 2) {
                cfg1 = Config.wsmb_238[targetId];
                break;
            }
        }
        if (!cfg1) {
            targetId = Model_WuShengList.drawArr[Model_WuShengList.drawArr.length - 1][0];
            cfg1 = Config.wsmb_238[targetId];
            s.drawImg.visible = true;
            s.drawBt.visible = false;
            s.curState = 2;
            color = 2;
        }
        else {
            s.drawBt.visible = true;
            s.drawImg.visible = false;
            s.drawBt.enabled = s.drawBt.checkNotice = state == 1;
            if (state == 1) {
                color = 2;
            }
            else {
                color = 6;
            }
            s.curState = state;
        }
        s.curOrder = targetId;
        var cfg2;
        /**第1天:武将
        第2天:宝物
        第3天:天书
        第4天:神剑
        第5天:异宝
        第6天:铜雀台
        第7天:总战力*/
        switch (cfg1.type) {
            case 1:
                cfg2 = Config.herolv_211[cfg1.canshu];
                s.tipLb.text = BroadCastManager.reTxt(cfg1.name, [HtmlUtil.fontNoSize(cfg2.jie + "", Color.getColorStr(color))]);
                break;
            case 2:
                cfg2 = Config.baolv_214[cfg1.canshu];
                s.tipLb.text = BroadCastManager.reTxt(cfg1.name, [HtmlUtil.fontNoSize(cfg2.jie + "", Color.getColorStr(color))]);
                break;
            case 3:
                cfg2 = Config.booklv_215[cfg1.canshu];
                s.tipLb.text = BroadCastManager.reTxt(cfg1.name, [HtmlUtil.fontNoSize(cfg2.jie + "", Color.getColorStr(color))]);
                break;
            case 4:
                cfg2 = Config.swordlv_216[cfg1.canshu];
                s.tipLb.text = BroadCastManager.reTxt(cfg1.name, [HtmlUtil.fontNoSize(cfg2.jie + "", Color.getColorStr(color))]);
                break;
            case 5:
                cfg2 = Config.yblv_217[cfg1.canshu];
                s.tipLb.text = BroadCastManager.reTxt(cfg1.name, [HtmlUtil.fontNoSize(cfg2.jie + "", Color.getColorStr(color))]);
                break;
            default:
                s.tipLb.text = BroadCastManager.reTxt(cfg1.name, [HtmlUtil.fontNoSize(cfg1.canshu + "", Color.getColorStr(color))]);
                break;
        }
        var reward1 = ConfigHelp.makeItemListArr(JSON.parse(cfg1.reward));
        s.grid.vo = reward1[0];
        s.grid.tipEnabled = true;
        if (Model_GlobalMsg.kaifuDay > cfg.id) {
            s.giftBt.visible = false;
        }
        else {
            s.giftBt.visible = true;
        }
    };
    View_WuShengList_Panel.prototype.onShown = function () {
        GGlobal.modelWuSheng.CG_OPEN_WUSHENG_LIST(Model_GlobalMsg.kaifuDay);
        GGlobal.reddot.listen(ReddotEvent.CHECK_WUSHENGLIST, this.updateShow, this);
        GGlobal.control.listen(ReddotEvent.CHECK_WUSHENGLIST, this.updateSelShow, this);
    };
    View_WuShengList_Panel.prototype.onHide = function () {
        var self = this;
        if (self.curTab)
            self.curTab.selected = false;
        self.curTab = null;
        self.list.numItems = 0;
        self.list1.numItems = 0;
        GGlobal.layerMgr.close(UIConst.WUSHENGLIST);
        GGlobal.reddot.remove(ReddotEvent.CHECK_WUSHENGLIST, self.updateShow, self);
        GGlobal.control.remove(ReddotEvent.CHECK_WUSHENGLIST, self.updateSelShow, self);
    };
    View_WuShengList_Panel.URL = "ui://a8l39nm98hxb0";
    return View_WuShengList_Panel;
}(UIPanelBase));
__reflect(View_WuShengList_Panel.prototype, "View_WuShengList_Panel");
