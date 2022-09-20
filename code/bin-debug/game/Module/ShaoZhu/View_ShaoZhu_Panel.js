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
var View_ShaoZhu_Panel = (function (_super) {
    __extends(View_ShaoZhu_Panel, _super);
    function View_ShaoZhu_Panel() {
        var _this = _super.call(this) || this;
        _this.tabArr = [];
        _this.setSkin("ShaoZhu", "ShaoZhu_atlas0", "View_ShaoZhu_Panel");
        return _this;
    }
    View_ShaoZhu_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_Panel"));
    };
    View_ShaoZhu_Panel.prototype.setExtends = function () {
        View_ShaoZhu_Panel.setExtends();
    };
    View_ShaoZhu_Panel.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Child_ShaoZhu_UpStar.URL, Child_ShaoZhu_UpStar);
        f(Child_ShaoZhu_QinMi.URL, Child_ShaoZhu_QinMi);
        f(Child_ShaoZhu_Skill.URL, Child_ShaoZhu_Skill);
        f(ShaoZhuGrid.URL, ShaoZhuGrid);
        f(ShaoZhuSkillGrid.URL, ShaoZhuSkillGrid);
        f(ItemShaoZhuFashion.URL, ItemShaoZhuFashion);
        f(Child_ShaoZhu_QiYuan.URL, Child_ShaoZhu_QiYuan);
        f(VSZQiYuanPoint.URL, VSZQiYuanPoint);
        f(ShaoZhuSkillItem.URL, ShaoZhuSkillItem);
        //少主六艺
        f(Child_LiuYi.URL, Child_LiuYi);
        f(BtnLiuYi.URL, BtnLiuYi);
        f(BtnXueTang.URL, BtnXueTang);
        f(ItemLiuYiKaoShi.URL, ItemLiuYiKaoShi);
        //少主潜能
        f(BtnQianNeng.URL, BtnQianNeng);
    };
    View_ShaoZhu_Panel.prototype.initView = function () {
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self["tab0"].data = 0;
        self["tab1"].data = 1;
        self["tab2"].data = 2;
        self["tab3"].data = 3;
        self.starItem.type = 0;
        self.qinMiItem.type = 1;
        self.skillItem.type = 2;
        self.qiYuanItem.type = 3;
        self.liuYiItem.type = 4;
        self.tabArr = [self["tab0"], self["tab1"], self["tab2"], self["tab3"]];
        GGlobal.modelShaoZhu.CG_GET_STAR_STATE();
        if (!Model_ShaoZhu.hasData) {
            GGlobal.modelShaoZhu.CG_OPEN_SHAOZHU_5101();
        }
        if (!Model_QianNeng.hasData) {
            GGlobal.model_QianNeng.CG_OPENUI_5133();
        }
    };
    View_ShaoZhu_Panel.prototype.tabHandler = function (evt) {
        var self = this;
        var tab = evt.target;
        var panelIdArr = [UIConst.SHAOZHU, UIConst.SHAOZHU_QINMI, UIConst.SHAOZHU_SKILL, UIConst.SHAOZHU_QIYUAN];
        if (!ModuleManager.isOpen(panelIdArr[tab.data], true))
            return;
        if (self.curTab && self.curTab.data == tab.data)
            return;
        if (self.curTab)
            self.curTab.selected = false;
        tab.selected = true;
        self.curTab = tab;
        self.c1.selectedIndex = self.curTab.data;
    };
    View_ShaoZhu_Panel.prototype.listHandler = function (evt) {
        var self = this;
        var item = evt.itemObject;
        if (self.curItem && self.curItem.hashCode == item.hashCode)
            return;
        if (self.curItem)
            self.curItem.choose(false);
        item.choose(true);
        self.curItem = item;
        if (self.c2.selectedIndex == 0) {
            self.curChild.close();
            self.updateChild();
        }
        else {
            self.liuYiItem.upVo(self.curItem.vo);
            // self.selectTab();
        }
    };
    View_ShaoZhu_Panel.prototype.renderHandler = function (index, obj) {
        var self = this;
        var model = GGlobal.modelShaoZhu;
        var red = GGlobal.reddot;
        obj.data = index;
        obj.setVo(model.shaoZhuArr[index]);
        switch (self.c2.selectedIndex) {
            case 0:
                switch (self.c1.selectedIndex) {
                    case 0:
                        obj.noticeImg.visible = model.checkOneStarNotice(model.shaoZhuArr[index])
                            || GGlobal.reddot.checkCondition(UIConst.SHAOZHU, 123 + index + 1)
                            || GGlobal.reddot.checkCondition(UIConst.SHAOZHU_QIANNENG, index + 1);
                        break;
                    case 1:
                        obj.noticeImg.visible = model.checkOneQinMiNotice(model.shaoZhuArr[index]);
                        break;
                    case 2:
                        obj.noticeImg.visible = model.checkOneSkillNotice(model.shaoZhuArr[index]);
                        break;
                }
                break;
            case 1:
                obj.noticeImg.visible = red.checkCondition(UIConst.SHAOZHU_LIUYI, index + 1);
        }
        if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == model.shaoZhuArr[index].shaozhuID) {
            if (self.curItem)
                self.curItem.choose(false);
            obj.choose(true);
            self.curItem = obj;
            Model_GlobalMsg.selectID = 0;
        }
        else if (!self.curItem && ((index == 0 && Model_player.voMine.shaozhuID <= 0) || model.shaoZhuArr[index].shaozhuID == Model_player.voMine.shaozhuID)) {
            obj.choose(true);
            self.curItem = obj;
        }
    };
    View_ShaoZhu_Panel.prototype.selectTab = function () {
        var self = this;
        if (self.c2.selectedIndex < 0)
            return;
        if (self.c2.selectedIndex == 1) {
            if (!ModuleManager.isOpen(UIConst.SHAOZHU_LIUYI, true)) {
                self.c2.selectedIndex = 0;
                return;
            }
        }
        if (self.curChild)
            self.curChild.close();
        if (self.c2.selectedIndex == 1) {
            self.curChild = self.liuYiItem;
            self.curChild.open(self.curItem.vo);
        }
        else {
            self.updateChild();
        }
        self.list.numItems = GGlobal.modelShaoZhu.shaoZhuArr.length;
    };
    View_ShaoZhu_Panel.prototype.updateChild = function () {
        var self = this;
        if (self.c2.selectedIndex == 1) {
            if (self.curChild && 4 != self.curChild.type) {
                self.curChild.close();
                self.curChild.open(self.curItem.vo);
            }
            return;
        }
        if (self.curChild && self.c1.selectedIndex != self.curChild.type)
            self.curChild.close();
        switch (self.c1.selectedIndex) {
            case 0:
                self.curChild = self.starItem;
                break;
            case 1:
                self.curChild = self.qinMiItem;
                break;
            case 2:
                self.curChild = self.skillItem;
                break;
            case 3:
                self.curChild = self.qiYuanItem;
                break;
        }
        self.curChild.open(self.curItem.vo);
    };
    View_ShaoZhu_Panel.prototype.updateShow = function () {
        var self = this;
        if (GGlobal.modelShaoZhu.shaoZhuArr.length <= 0) {
            GGlobal.modelShaoZhu.initShaoZhu();
        }
        var redAll = false;
        for (var i = 0; i < self.tabArr.length; i++) {
            if (i == 3) {
                self.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_QIYUAN, 0);
            }
            else {
                self.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU, i);
                ;
                if (i == 0 && !self.tabArr[i].checkNotice) {
                    self.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU, 123 + 1) ||
                        GGlobal.reddot.checkCondition(UIConst.SHAOZHU, 123 + 2) ||
                        GGlobal.reddot.checkCondition(UIConst.SHAOZHU, 123 + 3); //领取奖励的红点
                }
            }
            if (self.tabArr[i].checkNotice) {
                redAll = true;
            }
        }
        self.btn0.checkNotice = redAll;
        self.btn1.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_LIUYI, 0);
        self.list.numItems = GGlobal.modelShaoZhu.shaoZhuArr.length;
        self.updateChild();
    };
    View_ShaoZhu_Panel.prototype.onShown = function () {
        var self = this;
        if (self._args) {
            if (self._args >= 4) {
                self.c1.selectedIndex = 0;
                self.c2.selectedIndex = 1;
            }
            else {
                self.c1.selectedIndex = self._args;
            }
        }
        else {
            self.c1.selectedIndex = 0;
            self.c2.selectedIndex = 0;
        }
        if (self.curTab)
            self.curTab.selected = false;
        self.tabArr[self.c1.selectedIndex].selected = true;
        self.curTab = self.tabArr[self.c1.selectedIndex];
        self.addListen();
        self.updateShow();
    };
    View_ShaoZhu_Panel.prototype.addListen = function () {
        var self = this;
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
        self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
        self.c2.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selectTab, self);
        for (var i = 0; i < self.tabArr.length; i++) {
            self.tabArr[i].addClickListener(self.tabHandler, self);
        }
        GGlobal.reddot.listen(UIConst.SHAOZHU, self.updateShow, self);
        GGlobal.reddot.listen(UIConst.SHAOZHU_LIUYI, self.updateShow, self);
        GGlobal.reddot.listen(UIConst.SHAOZHU_QIANNENG, self.updateShow, self);
    };
    View_ShaoZhu_Panel.prototype.removeListen = function () {
        var self = this;
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
        self.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
        self.c2.removeEventListener(fairygui.StateChangeEvent.CHANGED, self.selectTab, self);
        for (var i = 0; i < self.tabArr.length; i++) {
            self.tabArr[i].removeClickListener(self.tabHandler, self);
        }
        GGlobal.reddot.remove(UIConst.SHAOZHU, self.updateShow, self);
        GGlobal.reddot.remove(UIConst.SHAOZHU_LIUYI, self.updateShow, self);
        GGlobal.reddot.remove(UIConst.SHAOZHU_QIANNENG, self.updateShow, self);
    };
    View_ShaoZhu_Panel.prototype.onHide = function () {
        var self = this;
        if (self.curChild)
            self.curChild.close();
        self.curChild = null;
        if (self.curItem)
            self.curItem.choose(false);
        self.curItem = null;
        self.removeListen();
        GGlobal.layerMgr.close(UIConst.SHAOZHU);
        self.list.numItems = 0;
    };
    View_ShaoZhu_Panel.URL = "ui://p83wyb2bh7p80";
    return View_ShaoZhu_Panel;
}(UIPanelBase));
__reflect(View_ShaoZhu_Panel.prototype, "View_ShaoZhu_Panel");
