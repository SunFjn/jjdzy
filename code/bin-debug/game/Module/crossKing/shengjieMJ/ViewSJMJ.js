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
/**升阶秘境 */
var ViewSJMJ = (function (_super) {
    __extends(ViewSJMJ, _super);
    function ViewSJMJ() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        _this.seconds = 5;
        _this.isTicking = false;
        _this.tabDatas = [];
        _this.isCheck = true;
        _this.isAutoSel = false;
        _this.fubenInfoDic = {};
        _this.lastTime = 0;
        _this.setSkin("crossKing", "crossKing_atlas0", "ViewSJMJ");
        return _this;
    }
    ViewSJMJ.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.listSel.itemRenderer = s.onSelRender;
        s.listSel.callbackThisObj = s;
        s.listSel.addEventListener(fairygui.ItemEvent.CLICK, s.onDataSel, s);
        s.listSel.setVirtual();
        s.listTeam.itemRenderer = s.onTeamRender;
        s.listTeam.callbackThisObj = s;
        s.listTab.itemRenderer = s.onRenderTab;
        s.listTab.callbackThisObj = s;
        s.listTab.addEventListener(fairygui.ItemEvent.CLICK, s.onTabSel, s);
        s.listTab.setVirtual();
        s.btnHand.addClickListener(s.onHand, s);
        s.btnXieZhu.addClickListener(s.onHand, s);
        s.btnSaoDang.addClickListener(s.onHand, s);
        s.checkBox.addClickListener(s.onHand, s);
        CommonManager.listPageChange("VIEWSJMJ", s.listSel, s.iconLeft, s.iconRight, 3);
        // s.frame["titleIcon"].icon = "ui://yqpfulefgenj3l";
        s.isFullScreen = true;
        s.chatBt.addClickListener(s.chatHandler, s);
        s.initTabs();
    };
    ViewSJMJ.prototype.initTabs = function () {
        var lib = Config.sjmj_258;
        for (var key in lib) {
            this.tabDatas.push(lib[key]);
        }
        this.tabDatas.sort(function (a, b) { return a.px - b.px; });
    };
    ViewSJMJ.prototype.onRenderTab = function (index, renderer) {
        renderer.setData(this.tabDatas[index]);
        renderer.selected = this.curSelTab == renderer;
    };
    ViewSJMJ.prototype.onTabSel = function (evt) {
        if (ModelShengJieMJ.isSelfTeam) {
            ViewCommonWarn.text("退出组队才能更换副本!");
            return;
        }
        var renderer = evt.itemObject;
        this.setSelTab(renderer.getData());
    };
    ViewSJMJ.prototype.setSelTab = function (data) {
        if (data) {
            if (this.curSelTab && this.curSelTab.getData() != data) {
                this.curSelTab.setSel(false);
            }
            var virArr = this.listTab["_virtualItems"];
            for (var i = 0; i < virArr.length; i++) {
                var child = virArr[i].obj;
                if (child && child.getData() == data) {
                    (this.curSelTab = child).setSel(true);
                    break;
                }
            }
        }
        else {
            if (this.curSelTab) {
                this.curSelTab.setSel(false);
            }
        }
    };
    ViewSJMJ.prototype.updateTabs = function () {
        this.tabDatas.sort(this.onSort);
        this.listTab.numItems = this.tabDatas.length;
    };
    ViewSJMJ.prototype.onSort = function (a, b) {
        var openLvA = a.lv;
        var openLvB = b.lv;
        var heroLv = Model_LunHui.realLv;
        var aIndex = a.px + (heroLv < openLvA ? 100 : 0);
        var bIndex = b.px + (heroLv < openLvB ? 100 : 0);
        return aIndex - bIndex;
    };
    ViewSJMJ.prototype.chatHandler = function () {
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = UIConst.SJMJ2 + "_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        egret.localStorage.setItem(key, "SJMJ_Chat_Notice");
        this.chatBt.checkNotice = false;
        if (Model_GlobalMsg.kaifuDay > 7) {
            GGlobal.layerMgr.open(UIConst.CHAT);
        }
        else {
            GGlobal.layerMgr.open(UIConst.CHAT, 1);
        }
    };
    ViewSJMJ.prototype.setExtends = function () {
        _super.prototype.setExtends.call(this);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemMJSel.URL, ItemMJSel);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemTeam.URL, ItemTeam);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemSJMJTab.URL, ItemSJMJTab);
    };
    ViewSJMJ.prototype.onHand = function (evt) {
        var self = this;
        var target = evt.currentTarget;
        switch (target) {
            case self.btnHand:
                if (self.btnHand.data == 0) {
                    GGlobal.modelSJMJ.CG3765(self.curSel.data.id);
                }
                else if (self.btnHand.data == 1) {
                    GGlobal.modelSJMJ.CG3775();
                }
                else if (self.btnHand.data == 3) {
                    var idAsKey = self.curSel.data.id / 1000 >> 0;
                    var sdCnt = GGlobal.modelSJMJ.sdCntDic[idAsKey];
                    if (sdCnt > 0) {
                        GGlobal.modelSJMJ.CG3765(self.curSel.data.id);
                    }
                    else {
                        ViewCommonWarn.text("挑战次数不足");
                    }
                }
                break;
            case self.btnXieZhu:
                if (self.btnXieZhu.enabled == false) {
                    ViewCommonWarn.text("请稍等!");
                    return;
                }
                GGlobal.modelSJMJ.CG3769();
                break;
            case self.btnSaoDang:
                if (self.btnSaoDang.data == 0) {
                    if (GGlobal.layerMgr.backPanelId == UIConst.CHAT) {
                        self.close3();
                        GGlobal.layerMgr.open(UIConst.CHAT);
                    }
                    else {
                        GGlobal.modelSJMJ.CG3771();
                    }
                }
                else {
                    GGlobal.modelSJMJ.CG3787(self.curSel.data.id);
                }
                break;
            case self.checkBox:
                self.isCheck = !self.isCheck;
                self.checkBox.selected = self.isCheck;
                self.tickHandle();
                break;
        }
    };
    ViewSJMJ.prototype.onSelRender = function (index, renderer) {
        renderer.data = this.datas[index];
        renderer.selected = this.curSelID == renderer.data.id;
    };
    ViewSJMJ.prototype.onDataSel = function (evt) {
        var renderItem = evt.itemObject;
        var type = renderItem.data.id / 1000 >> 0;
        if (renderItem.state == 0) {
            ViewCommonWarn.text(ModelShengJieMJ.idToName[type] + "等阶不足");
        }
        else if (renderItem.state == 1) {
            ViewCommonWarn.text("需要通关上一个副本");
        }
        else {
            if (ModelShengJieMJ.isSelfTeam) {
                ViewCommonWarn.text("退出组队才能更换副本!");
            }
            else {
                this.isAutoSel = false;
                this.setDataSel(renderItem.data);
            }
        }
    };
    ViewSJMJ.prototype.setDataSel = function (data) {
        var self = this;
        var renderers = self.listSel["_virtualItems"];
        for (var i = 0, len = renderers.length; i < len; i++) {
            var renderer = renderers[i].obj;
            if (renderer && renderer.data == data) {
                if (self.curSel) {
                    self.curSel.selected = false;
                }
                (self.curSel = renderer).selected = true;
                self.curSelID = self.curSel.data.id;
                break;
            }
        }
        ItemTeam.curMiJing = self.curSel;
        GGlobal.modelSJMJ.CG3763(self.curSel.data.id);
        self.lbPower.text = self.curSel.data.power + "";
        self.lbPower.color = Model_player.voMine.str > self.curSel.data.power ? Color.GREENINT : Color.REDINT;
    };
    ViewSJMJ.prototype.onTeamRender = function (index, renderer) {
        renderer.data = GGlobal.modelSJMJ.teamInfos[index];
    };
    /**更新通关信息 */
    ViewSJMJ.prototype.updateFBInfo = function () {
        var self = this;
        var justyId = self._args / 1000 >> 0;
        if (!self.fubenInfoDic[justyId]) {
            var lib = Config.sjmjfb_258;
            var arr = [];
            for (var key in lib) {
                var tempId = Number(key) / 1000 >> 0;
                if (tempId == justyId) {
                    arr.push(lib[key]);
                }
            }
            self.fubenInfoDic[justyId] = arr;
        }
        self.datas = self.fubenInfoDic[justyId];
        self.listSel.numItems = self.datas.length;
        var shouldSel = self.selRender();
        if (self.isAutoSel && shouldSel && self.curSel && shouldSel.data != self.curSel.data && !ViewSJMJ.isInvite && !ShengJieMJSceneCtrl.isBatEnd) {
            ShengJieMJSceneCtrl.isBatEnd = false;
            var temp = self.datas.indexOf(shouldSel.data);
            if (temp != 0) {
                temp -= 1;
            }
            else if (temp == self.listSel.numItems) {
                temp = 20;
            }
            self.listSel.scrollToView(temp);
            self.setDataSel(shouldSel.data);
        }
    };
    ViewSJMJ.prototype.selRender = function () {
        var self = this;
        var virArr = self.listSel["_virtualItems"];
        for (var i = 0; i < virArr.length; i++) {
            var render = virArr[i].obj;
            if (render && render.state == 2) {
                return render;
            }
        }
        return null;
    };
    /**更新队伍信息 */
    ViewSJMJ.prototype.updateTeam = function () {
        this.listTeam.numItems = GGlobal.modelSJMJ.teamInfos.length;
        this.showDetail();
    };
    /**副本详细信息 */
    ViewSJMJ.prototype.showDetail = function () {
        var self = this;
        if (self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        var awars = ConfigHelp.makeItemListArr(JSON.parse(self.curSel.data.kf));
        self.grids = ConfigHelp.addGridview(awars, self, 90, 480, true, false, 5, 80, 0.7);
        var state = self.getState();
        if (state == 3) {
            self.c1.setSelectedIndex(0);
        }
        else {
            self.c1.setSelectedIndex(state);
        }
        var curCnt = ModelShengJieMJ.xieZhuCnt;
        var maxCnt = ModelShengJieMJ.maxXieZhuCnt;
        var str = ""; //没有周卡提示
        if (maxCnt <= 3) {
            str = "（周卡+2）";
        }
        if (maxCnt - curCnt <= 0) {
            self.txtXieZhu.text = HtmlUtil.fontNoSize(maxCnt - curCnt + "/" + maxCnt, "#ff0000") + str;
        }
        else {
            self.txtXieZhu.text = maxCnt - curCnt + "/" + maxCnt + str;
        }
        switch (state) {
            case 0: //显示创建
            case 3:
                self.btnHand.data = state;
                self.btnHand.text = "创建队伍";
                var idAsKey = self.curSel.data.id / 1000 >> 0;
                var sdCnt = GGlobal.modelSJMJ.sdCntDic[idAsKey];
                self.battleNumLb.setVar("num", sdCnt).flushVars();
                break;
            case 1://显示 挑战 邀请协助
                self.btnHand.data = 1;
                self.btnHand.text = "开始挑战";
                if (self.isCheck && !self.isTicking) {
                    self.tickHandle();
                }
                break;
            case 2:
                if (!self.isLeader() && ModelShengJieMJ.isSelfTeam) {
                    self.btnSaoDang.data = 0;
                    self.btnSaoDang.text = "退出队伍";
                    self.btnSaoDang.enabled = true;
                }
                else {
                    self.btnSaoDang.data = 1;
                    self.btnSaoDang.text = "扫荡";
                    var idAsKey_1 = self.curSel.data.id / 1000 >> 0;
                    var sdCnt_1 = GGlobal.modelSJMJ.sdCntDic[idAsKey_1];
                    self.btnSaoDang.enabled = 3 - sdCnt_1 > 0;
                }
                break;
        }
    };
    ViewSJMJ.prototype.isLeader = function () {
        if (ModelShengJieMJ.isSelfTeam) {
            var members = GGlobal.modelSJMJ.teamInfos;
            for (var i = 0, len = members.length; i < len; i++) {
                var member = members[i];
                if (member.id == Model_player.voMine.id && member.isLeader == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    ViewSJMJ.prototype.getState = function () {
        var self = this;
        var curId = self.curSel.data.id;
        var target = self.getTGInfo(curId);
        if (!ModelShengJieMJ.isSelfTeam && ((target == null && (curId % 1000 >> 0) == 1) || (target && curId == target.id + 1))) {
            return 0;
        }
        else if (self.isLeader()) {
            return 1;
        }
        else {
            if (ModelShengJieMJ.isSelfTeam && !self.isLeader()) {
                return 2;
            }
            else if (target && curId <= target.id) {
                return 3;
            }
        }
    };
    ViewSJMJ.prototype.getTGInfo = function (id) {
        var fubenInfo = GGlobal.modelSJMJ.fubenInfo;
        var idAsKey = id / 1000 >> 0;
        for (var key in fubenInfo) {
            var compareId = Number(key) / 1000 >> 0;
            if (compareId == idAsKey) {
                return Config.sjmjfb_258[key];
            }
        }
        return null;
    };
    ViewSJMJ.prototype.tickHandle = function () {
        var self = this;
        self.seconds = 5;
        if (self.isCheck && GGlobal.modelSJMJ.teamInfos.length == 3) {
            self.checkBox.text = "\u6EE1\u5458\u81EA\u52A8\u5F00\u59CB(" + self.seconds + "s)";
            Timer.instance.listen(this.onTick, this, 1000, 0, false);
        }
        else {
            self.checkBox.text = "\u6EE1\u5458\u81EA\u52A8\u5F00\u59CB";
            Timer.instance.remove(this.onTick, this);
        }
    };
    ViewSJMJ.prototype.onTick = function () {
        var self = this;
        self.seconds--;
        if (self.seconds < 0) {
            GGlobal.modelSJMJ.CG3775();
            Timer.instance.remove(this.onTick, this);
        }
        else {
            self.checkBox.text = "\u6EE1\u5458\u81EA\u52A8\u5F00\u59CB(" + self.seconds + "s)";
        }
    };
    ViewSJMJ.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var self = this;
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_team, self.updateTeam, self);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_team, self.updateFBInfo, self);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_sjmj, self.updateFBInfo, self);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_invite, self.onInvite, self);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_sjmj, self.updateTabs, self);
        IconUtil.setImg(self.n2, Enum_Path.BACK_URL + "sjmjBack.png");
        self.updateTabs();
        self.mixHander(this._args);
    };
    /**混乱之治 */
    ViewSJMJ.prototype.mixHander = function (arg) {
        this._args = arg;
        var self = this;
        self.isAutoSel = true;
        self.resolveTab();
        self.updateFBInfo();
        if (ViewSJMJ.isInvite) {
            for (var i = 0; i < self.datas.length; i++) {
                var data = self.datas[i];
                if (data.id == self._args) {
                    var temp = i;
                    if (temp != 0) {
                        temp -= 1;
                    }
                    else if (i == self.datas.length - 1) {
                        temp = i;
                    }
                    self.listSel.scrollToView(temp);
                    self.setDataSel(data);
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < self.datas.length; i++) {
                var data = self.datas[i];
                if (data.id == self.dealWidth(self._args)) {
                    var temp = i;
                    if (temp != 0) {
                        temp -= 1;
                    }
                    else if (i == self.datas.length - 1) {
                        temp = i;
                    }
                    self.listSel.scrollToView(temp);
                    self.setDataSel(data);
                    break;
                }
            }
        }
        self.showDetail();
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = UIConst.SJMJ2 + "_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        var value = egret.localStorage.getItem(key);
        self.chatBt.checkNotice = !value;
    };
    ViewSJMJ.prototype.resolveTab = function () {
        var id = this._args ? this._args / 1000 >> 0 : 1;
        for (var i = 0; i < this.tabDatas.length; i++) {
            var data = this.tabDatas[i];
            if (data.id == id) {
                var temp = i;
                if (temp != 0) {
                    temp -= 1;
                }
                else if (i == this.tabDatas.length - 1) {
                    temp = i;
                }
                this.listTab.scrollToView(temp);
                this.setSelTab(data);
                break;
            }
        }
    };
    ViewSJMJ.prototype.dealWidth = function (enterId) {
        var nextId = enterId + 1;
        var virArr = this.listSel["_virtualItems"];
        for (var i = 0; i < virArr.length; i++) {
            var render = virArr[i].obj;
            if (render && render.data && render.data.id == nextId && render.state != 0 && render.state != 1) {
                return nextId;
            }
        }
        return enterId;
    };
    ViewSJMJ.prototype.onInvite = function (time) {
        this.lastTime = time;
        this.btnXieZhu.enabled = false;
        Timer.instance.listen(function onT() {
            this.lastTime--;
            if (this.lastTime < 0) {
                this.btnXieZhu.enabled = true;
                this.btnXieZhu.text = "邀请协助";
                Timer.instance.remove(onT, this);
            }
            else {
                this.btnXieZhu.text = "\u7B49\u5F85(" + this.lastTime + ")";
            }
        }, this, 1000);
    };
    ViewSJMJ.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        var self = this;
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_team, self.updateTeam, self);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_team, self.updateFBInfo, self);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_sjmj, self.updateFBInfo, self);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_invite, self.onInvite, self);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_sjmj, self.updateTabs, self);
        self.listSel.numItems = 0;
        self.listTeam.numItems = 0;
        Timer.instance.remove(this.onTick, this);
        this.seconds = 5;
        self.curSel = null;
        self.curSelID = 0;
        self.curSelTab = null;
        ViewSJMJ.isInvite = false;
        IconUtil.setImg(self.n2, null);
        GGlobal.layerMgr.close(this.panelId);
    };
    ViewSJMJ.prototype.closeEventHandler = function () {
        WorldSocketMgr.instance.close();
        if (GGlobal.layerMgr.backPanelId == 0) {
            GGlobal.layerMgr.open(UIConst.SJMJ1);
        }
        this.hide();
    };
    ViewSJMJ.prototype.close3 = function () {
        WorldSocketMgr.instance.close();
        GGlobal.layerMgr.close2(this.panelId);
    };
    ViewSJMJ.isInvite = false;
    return ViewSJMJ;
}(UIPanelBase));
__reflect(ViewSJMJ.prototype, "ViewSJMJ");
