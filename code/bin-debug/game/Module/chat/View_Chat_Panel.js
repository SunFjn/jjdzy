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
var View_Chat_Panel = (function (_super) {
    __extends(View_Chat_Panel, _super);
    function View_Chat_Panel() {
        var _this = _super.call(this) || this;
        _this.faceBtArr = [];
        _this.tabArr = [];
        _this.checkTime = -15000;
        _this.isFirstOpen1 = true;
        _this.isFirstOpen2 = true;
        _this.chatArr = [];
        _this.sysChatArr = [];
        _this.setSkin("chat", "chat_atlas0", "View_Chat_Panel");
        return _this;
    }
    View_Chat_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ChatItem.URL, ChatItem);
        fairygui.UIObjectFactory.setPackageItemExtension(ChatRoleHead.URL, ChatRoleHead);
        fairygui.UIObjectFactory.setPackageItemExtension(ChatWuJiangSkillS.URL, ChatWuJiangSkillS);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemSHJXC.URL, ItemSHJXC);
        fairygui.UIObjectFactory.setPackageItemExtension(ChatShaoZhuSkillGrid.URL, ChatShaoZhuSkillGrid);
        fairygui.UIObjectFactory.setPackageItemExtension(ChatLabelItem.URL, ChatLabelItem);
    };
    View_Chat_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        self.list1.callbackThisObj = self;
        self.list1.itemRenderer = self.sysRenderHandler;
        self.list1.setVirtual();
        for (var i = 0; i < 16; i++) {
            var faceBt0 = self["faceBt" + i];
            faceBt0.data = i;
            faceBt0.icon = CommonManager.getUrl("chat", (i + 1) + "");
            faceBt0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.sendFace, this);
            self.faceBtArr.push(faceBt0);
            if (i < 3) {
                var tab = self["tab" + i];
                tab.data = i;
                tab.addClickListener(self.OnTab, self);
                self.tabArr.push(tab);
            }
        }
        self.check0.selected = false;
        self.blackListLb.text = HtmlUtil.createLink("查看黑名单");
        self.msgLb.maxLength = 30;
        if (Model_GlobalMsg.kaifuDay <= 7) {
            GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, self.updateTab, self);
            self.updateTab();
        }
    };
    View_Chat_Panel.prototype.sysRenderHandler = function (index, obj) {
        obj.show(this.sysChatArr[index]);
    };
    View_Chat_Panel.prototype.updateTab = function () {
        if (Model_GlobalMsg.kaifuDay > 7) {
            this.tabArr[0].visible = true;
            this.tabArr[1].setXY(134, 924);
            this.tabArr[2].setXY(254, 924);
            GGlobal.control.remove(Enum_MsgType.KAIFUDAY_UPDATE, this.updateTab, this);
        }
        else {
            this.tabArr[0].visible = false;
            this.tabArr[1].setXY(14, 924);
            this.tabArr[2].setXY(134, 924);
        }
    };
    View_Chat_Panel.prototype.textChange = function () {
        var a = this;
        a.msgLb.requestFocus();
        a.msgLb.text = a.msgLb.text.replace(/[\r\n]/g, "");
        if (a.msgLb.text.length > 30) {
            a.msgLb.text = a.msgLb.text.substr(0, 30);
        }
    };
    View_Chat_Panel.prototype.OnBlackList = function (evt) {
        evt.stopPropagation();
        GGlobal.layerMgr.open(UIConst.CHAT_BLACKLIST);
    };
    View_Chat_Panel.prototype.OnChange2 = function () {
        var a = this;
        a.blackGroup.visible = false;
        a.faceGroup.visible = false;
        if (a.c2.selectedIndex == 1) {
            a.faceGroup.visible = true;
            GGlobal.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, a.OnStageHandler, a);
        }
        else if (a.c2.selectedIndex == 2) {
            a.blackGroup.visible = true;
        }
    };
    View_Chat_Panel.prototype.OnStageHandler = function () {
        var a = this;
        if (a.c2.selectedIndex == 1)
            a.c2.selectedIndex = 0;
        GGlobal.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, a.OnStageHandler, a);
    };
    View_Chat_Panel.prototype.OnChange = function () {
        var a = this;
        a.updateShow();
        if (a.list.numItems > 0) {
            a.list.scrollToView(a.list.numItems - 1, false, true);
        }
    };
    View_Chat_Panel.prototype.OnCheck = function (evt) {
        var a = this;
        var nowTime = egret.getTimer();
        if (nowTime - a.checkTime <= 15 * 1000) {
            ViewCommonWarn.text("15秒内不得反复设置屏蔽");
            a.check0.selected = Model_Chat.checkSel;
            return;
        }
        a.checkTime = nowTime;
        Model_Chat.checkSel = a.check0.selected;
        a.updateShow();
        if (a.list.numItems > 0) {
            a.list.scrollToView(a.list.numItems - 1, false, true);
        }
    };
    View_Chat_Panel.prototype.OnSheZhi = function () {
        var a = this;
        if (a.c2.selectedIndex == 2) {
            a.c2.selectedIndex = 0;
        }
        else {
            a.c2.selectedIndex = 2;
        }
    };
    View_Chat_Panel.prototype.OnSend = function () {
        var a = this;
        if (a.msgLb.text == "控制台") {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "../loginjs/vconsole.min.js";
            document.getElementsByTagName('head')[0].appendChild(script);
            script.onload = function () { eval("var vconsole = new VConsole();"); };
            a.msgLb.text = "";
            return;
        }
        if (!this.checkChatCdt()) {
            return;
        }
        var vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
        var cfg1 = Config.xtcs_004[2501];
        if (vipcfg && vipcfg.LIAOTIAN == 1) {
        }
        else {
            if (Model_Chat.hornNum >= cfg1.num) {
                ViewCommonWarn.text("需要等级达到100级且VIP等级达到16");
                return;
            }
        }
        if (a.msgLb.text) {
            var nowTime = egret.getTimer();
            if (View_Chat_Panel.sendTime != 0 && nowTime - View_Chat_Panel.sendTime < 10 * 1000) {
                ViewCommonWarn.text("发言需间隔10秒");
                return;
            }
            if (!vipcfg || (vipcfg && vipcfg.LIAOTIAN != 1))
                Model_Chat.hornNum++;
            GGlobal.modelchat.CG_SEND_CHAT_CONTENT(a.c1.selectedIndex + 1, a.msgLb.text);
            a.msgLb.text = "";
        }
        else {
            ViewCommonWarn.text("输入的内容不得为空");
        }
    };
    View_Chat_Panel.prototype.checkChatCdt = function () {
        var chatlv = ConfigHelp.getSystemNum(2504);
        var vip = ConfigHelp.getSystemNum(9913);
        if ((Model_player.voMine.id <= vip || Model_LunHui.realLv < chatlv) && !GGlobal.main.getWhiteState()) {
            ViewCommonWarn.text("需达到" + chatlv + "级或者VIP" + vip + "才可发言");
            return false;
        }
        return true;
    };
    View_Chat_Panel.prototype.OnTab = function (event) {
        var a = this;
        var tab = event.target;
        if (a.curTab.data == tab.data)
            return;
        switch (tab.data) {
            case 0:
                break;
            case 1:
                if (a.isFirstOpen1) {
                    a.isFirstOpen1 = false;
                    GGlobal.modelchat.CG_OPEN_CHAT(2);
                }
                break;
            case 2:
                if (Model_player.voMine.country <= 0) {
                    ViewCommonWarn.text("请先加入国家");
                    tab.selected = false;
                    return;
                }
                if (a.isFirstOpen2) {
                    a.isFirstOpen2 = false;
                    GGlobal.modelchat.CG_OPEN_CHAT(3);
                }
                break;
        }
        if (a.curTab)
            a.curTab.selected = false;
        a.c1.selectedIndex = tab.data;
        a.tabArr[a.c1.selectedIndex].selected = true;
        a.curTab = a.tabArr[a.c1.selectedIndex];
    };
    View_Chat_Panel.prototype.sendFace = function (evt) {
        var a = this;
        evt.stopPropagation();
        var vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
        var cfg = Config.xtcs_004[2501];
        var nowTime = egret.getTimer();
        if (View_Chat_Panel.sendTime != 0 && nowTime - View_Chat_Panel.sendTime < 10 * 1000) {
            ViewCommonWarn.text("发言需间隔10秒");
            return;
        }
        if (vipcfg && vipcfg.LIAOTIAN == 1) {
        }
        else {
            if (Model_Chat.hornNum >= cfg.num) {
                ViewCommonWarn.text("今天发言次数已用尽,VIP4可无限制聊天");
                return;
            }
            Model_Chat.hornNum++;
        }
        var num = evt.target.data;
        var code = '[e:' + num + ':e]';
        GGlobal.modelchat.CG_SEND_CHAT_CONTENT(a.c1.selectedIndex + 1, code);
        a.c2.selectedIndex = 0;
    };
    View_Chat_Panel.prototype.OnFace = function (evt) {
        evt.stopPropagation();
        var a = this;
        if (!this.checkChatCdt()) {
            return;
        }
        if (a.c2.selectedIndex == 1) {
            a.c2.selectedIndex = 0;
        }
        else {
            a.c2.selectedIndex = 1;
        }
    };
    View_Chat_Panel.prototype.renderHandler = function (index, obj) {
        var a = this;
        var item = obj;
        var vo = a.chatArr[index];
        item.show(vo);
    };
    View_Chat_Panel.prototype.updateShow = function () {
        var a = this;
        if (!Model_Chat.chatArr[a.c1.selectedIndex])
            Model_Chat.chatArr[a.c1.selectedIndex] = [];
        var ret = a.list.getFirstChildInView() >= a.list.numItems - 5;
        var len = Model_Chat.chatArr[a.c1.selectedIndex].length;
        a.chatArr = [];
        a.sysChatArr = [];
        var vo = new Vo_Chat();
        vo.type = 1;
        vo.id = 0;
        vo.content = "亲爱的主公" + HtmlUtil.fontNoSize(Model_player.voMine.name, Color.getColorStr(2)) + "，欢迎来到" + GameConfig.gameName;
        a.sysChatArr.push(vo);
        if (Model_Chat.checkSel) {
            for (var i = 0; i < len; i++) {
                var vo_1 = Model_Chat.chatArr[a.c1.selectedIndex][i];
                if (vo_1.id == 0) {
                    a.sysChatArr.push(vo_1);
                }
                else {
                    if (vo_1.level >= Config.xtcs_004[2502].num || vo_1.id == Model_player.voMine.id) {
                        a.chatArr.push(vo_1);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                var vo_2 = Model_Chat.chatArr[a.c1.selectedIndex][i];
                if (vo_2.id == 0) {
                    a.sysChatArr.push(vo_2);
                }
                else {
                    a.chatArr.push(vo_2);
                }
            }
        }
        a.list.numItems = a.chatArr.length;
        if (a.list.numItems > 0 && ret) {
            a.list.scrollToView(a.list.numItems - 1, false, true);
        }
        var ret1 = a.list1.getFirstChildInView() >= a.list1.numItems - 3;
        a.list1.numItems = a.sysChatArr.length;
        if (a.list1.numItems > 0 && ret1) {
            a.list1.scrollToView(a.list1.numItems - 1, false, true);
        }
        var vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
        if (vipcfg && vipcfg.LIAOTIAN == 1) {
            a.hornImg.visible = a.prohibitLb.visible = false;
        }
        else {
            var cfg = Config.xtcs_004[2501];
            a.prohibitLb.text = (cfg.num - Model_Chat.hornNum) + "";
            a.hornImg.visible = a.prohibitLb.visible = true;
        }
    };
    View_Chat_Panel.prototype.onShown = function () {
        var a = this;
        a.c2.selectedIndex = 0;
        if (a._args) {
            a.c1.selectedIndex = a._args;
        }
        else {
            if (Model_GlobalMsg.kaifuDay > 7) {
                a.c1.selectedIndex = 0;
            }
            else {
                a.c1.selectedIndex = 1;
            }
        }
        a.updateShow();
        if (a.curTab)
            a.curTab.selected = false;
        a.tabArr[a.c1.selectedIndex].selected = true;
        a.curTab = a.tabArr[a.c1.selectedIndex];
        a.registerEvent(true);
    };
    View_Chat_Panel.prototype.onFocusOut = function () {
        window.scrollTo(0, 0);
    };
    View_Chat_Panel.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.faceBt, egret.TouchEvent.TOUCH_TAP, self.OnFace, self);
        EventUtil.register(pFlag, self.sendBt, egret.TouchEvent.TOUCH_TAP, self.OnSend, self);
        EventUtil.register(pFlag, self.shezhiBt, egret.TouchEvent.TOUCH_TAP, self.OnSheZhi, self);
        EventUtil.register(pFlag, self.check0, egret.TouchEvent.TOUCH_TAP, self.OnCheck, self);
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.OnChange, self);
        EventUtil.register(pFlag, self.c2, fairygui.StateChangeEvent.CHANGED, self.OnChange2, self);
        EventUtil.register(pFlag, self.msgLb, egret.Event.CHANGE, self.textChange, self);
        EventUtil.register(pFlag, self.blackListLb, egret.TextEvent.LINK, self.OnBlackList, self);
        GGlobal.control.register(pFlag, Enum_MsgType.CHAT, self.updateShow, self);
        if (PlatformManager.isTanWan && GGlobal.loginArg && GGlobal.loginArg.os == "ios") {
            EventUtil.register(pFlag, self.msgLb, egret.FocusEvent.FOCUS_OUT, self.onFocusOut, self);
        }
        GGlobal.control.register(pFlag, Enum_MsgType.CHAT_LONG_CLICK, self.longClick, self);
    };
    View_Chat_Panel.prototype.longClick = function (vo) {
        var t = this;
        var str = t.msgLb.text;
        t.msgLb.text = str + "@" + vo.name + "\t";
    };
    View_Chat_Panel.prototype.onHide = function () {
        var a = this;
        a.list.numItems = 0;
        a.list1.numItems = 0;
        a.registerEvent(false);
    };
    View_Chat_Panel.URL = "ui://fx4pr5qemtzm0";
    View_Chat_Panel.sendTime = 0;
    return View_Chat_Panel;
}(UIPanelBase));
__reflect(View_Chat_Panel.prototype, "View_Chat_Panel");
