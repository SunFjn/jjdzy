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
var ViewLingLongPanel = (function (_super) {
    __extends(ViewLingLongPanel, _super);
    function ViewLingLongPanel() {
        var _this = _super.call(this) || this;
        _this._cost1 = 0;
        _this._cost10 = 0;
        _this.startIndex = 0;
        _this.startCount = 0;
        _this.setSkin("lingLong", "lingLong_atlas0", "ViewLingLongPanel");
        return _this;
    }
    ViewLingLongPanel.prototype.setExtends = function () {
        var setPackageItemExtension = fairygui.UIObjectFactory.setPackageItemExtension;
        setPackageItemExtension(VLingLongItem.URL, VLingLongItem);
        setPackageItemExtension(VLingLongRank.URL, VLingLongRank);
        setPackageItemExtension(VLingLongPoint.URL, VLingLongPoint);
        setPackageItemExtension(VLingLongRank1.URL, VLingLongRank1);
    };
    ViewLingLongPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        // s.frame.getChild("titleIcon").asLoader.url = "ui://1xperbsyq4gka";
        s._gArr = [s.g0, s.g1, s.g2, s.g3, s.g4, s.g5, s.g6, s.g7];
        s.listPoint.itemRenderer = s.renderPoint;
        s.listPoint.callbackThisObj = s;
        s.listPoint.setVirtual();
        var v = VoItem.create(Model_LingLong.lingLongId);
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.imgLing1);
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.imgLing10);
        s.linkLb.text = HtmlUtil.createLink("概率");
        s.linkLb.addEventListener(egret.TextEvent.LINK, s.openGaiLV, s);
    };
    ViewLingLongPanel.prototype.openGaiLV = function (evt) {
        evt.stopPropagation();
        if (Model_GlobalMsg.kaifuDay <= 7) {
            GGlobal.layerMgr.open(UIConst.GAILV, 3);
        }
        else {
            GGlobal.layerMgr.open(UIConst.GAILV, 4);
        }
    };
    ViewLingLongPanel.prototype.onShown = function () {
        this.addListen();
        this.update();
        var s = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2601));
        var c = Number(s[0][2]);
        this.labBuy1.text = "购买" + c + "星魂";
        this.labBuy10.text = "购买" + (c * 10) + "星魂";
    };
    ViewLingLongPanel.prototype.onHide = function () {
        this.removeListen();
    };
    ViewLingLongPanel.prototype.addListen = function () {
        var s = this;
        s.btnRank.addClickListener(s.openRank, s);
        s.btnBuy1.addClickListener(s.onBuy1, s);
        s.btnBuy10.addClickListener(s.onBuy10, s);
        s.btnLeft.addClickListener(s.pageHandler, s);
        s.btnRight.addClickListener(s.pageHandler, s);
        s.checkBox.addClickListener(s.onCheck, s);
        s.listPoint.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, s.scrollComp, s);
        s.listPoint.addEventListener(fairygui.ItemEvent.CLICK, s.onGetPoint, s);
        GGlobal.control.listen(Enum_MsgType.LINGLONG_OPEN_UI, s.update, s);
        GGlobal.control.listen(Enum_MsgType.LINGLONG_GET_AWARD, s.update, s);
        GGlobal.control.listen(Enum_MsgType.LINGLONG_LOGS, s.upLogs, s);
        GGlobal.control.listen(Enum_MsgType.LINGLONG_BUY_FLASH, s.startDraw, s);
        s.chooseImg.visible = false;
        s.btnBuy1.touchable = s.btnBuy10.touchable = true;
        GGlobal.modelLingLong.CG_OPENUI();
        var key = Model_player.voMine.id + "lingLongCheck";
        var val = egret.localStorage.getItem(key);
        Model_LingLong.skipTween = val == "1" ? true : false;
        s.checkBox.selected = Model_LingLong.skipTween;
    };
    ViewLingLongPanel.prototype.removeListen = function () {
        var s = this;
        s.btnRank.removeClickListener(s.openRank, s);
        s.btnBuy1.removeClickListener(s.onBuy1, s);
        s.btnBuy10.removeClickListener(s.onBuy10, s);
        s.btnLeft.removeClickListener(s.pageHandler, s);
        s.btnRight.removeClickListener(s.pageHandler, s);
        s.checkBox.removeClickListener(s.onCheck, s);
        s.listPoint.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, s.scrollComp, s);
        s.listPoint.removeEventListener(fairygui.ItemEvent.CLICK, s.onGetPoint, s);
        GGlobal.control.remove(Enum_MsgType.LINGLONG_OPEN_UI, s.update, s);
        GGlobal.control.remove(Enum_MsgType.LINGLONG_GET_AWARD, s.update, s);
        GGlobal.control.remove(Enum_MsgType.LINGLONG_LOGS, s.upLogs, s);
        GGlobal.control.remove(Enum_MsgType.LINGLONG_BUY_FLASH, s.startDraw, s);
        GGlobal.layerMgr.close(UIConst.LING_LONG);
        this._curpage = 0;
        s.listPoint.numItems = 0;
        for (var i = 0; i < s._gArr.length; i++) {
            s._gArr[i].vo = null;
        }
    };
    ViewLingLongPanel.prototype.update = function () {
        var s = this;
        var cfg = Config.llg_239[Model_LingLong.cfgId];
        if (cfg) {
            if (cfg.showArr == null) {
                cfg.showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show));
            }
            s.showArr = cfg.showArr;
            for (var i = 0; i < s._gArr.length; i++) {
                s._gArr[i].vo = s.showArr[i];
                s._gArr[i].index = i;
            }
            s.labJin.text = "今日主题：" + cfg.jinri;
            if (cfg.mingri == "0") {
                s.labMing.text = "";
                s.labMing1.text = "";
            }
            else {
                s.labMing.text = "明日主题：" + cfg.mingri;
                s.labMing1.text = "明日主题：" + cfg.mingri;
            }
        }
        else {
            s.labJin.text = "";
            s.labMing.text = "";
            s.labMing1.text = "明日主题：";
        }
        s.labTotal.text = "总积分：" + Model_LingLong.myPoint;
        //积分奖励
        var pointMax = 100;
        if (Model_LingLong.pointArr.length > 0) {
            var vPoint = Model_LingLong.pointArr[Model_LingLong.pointArr.length - 1];
            var pointCfg = Config.llgpoint_239[vPoint.point];
            pointMax = Number(pointCfg.point);
        }
        var bs = Math.floor(Model_LingLong.myPoint / pointMax);
        s.base = pointMax * bs;
        s.expBar.max = pointMax;
        s.expBar.value = Model_LingLong.myPoint - s.base;
        s.expBar.text = (Model_LingLong.myPoint - s.base) + "/" + pointMax;
        //list
        s.listPoint.numItems = Model_LingLong.pointArr.length;
        if (Model_LingLong.pointArr.length > 4) {
            var scroTo = 0;
            for (var i = 0; i < Model_LingLong.pointArr.length; i++) {
                var vPoint = Model_LingLong.pointArr[i];
                var pointCfg = Config.llgpoint_239[vPoint.point];
                if (vPoint.status != -1) {
                    scroTo = i;
                    break;
                }
            }
            s.listPoint.scrollToView(scroTo, true, true);
        }
        if (Model_LingLong.pointArr.length > 4) {
            s.btnLeft.visible = s.btnRight.visible = true;
        }
        else {
            s.btnLeft.visible = s.btnRight.visible = false;
        }
        if (s._cost1 == 0) {
            s._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2602))[0][2]);
        }
        if (s._cost10 == 0) {
            s._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2603))[0][2]);
        }
        if (Model_LingLong.lingLong > 0) {
            s.imgBao1.visible = false;
            s.imgLing1.visible = true;
            s.labCost1.text = "" + Model_LingLong.lingLong + "/1";
            s.labCost1.color = Color.WHITEINT;
            s.btnBuy1.checkNotice = true;
        }
        else {
            s.imgBao1.visible = true;
            s.imgLing1.visible = false;
            s.labCost1.text = "" + s._cost1;
            if (Model_player.voMine.yuanbao >= s._cost1) {
                s.labCost1.color = Color.GREENINT;
            }
            else {
                s.labCost1.color = Color.REDINT;
            }
            s.btnBuy1.checkNotice = false;
        }
        if (Model_LingLong.lingLong > 9) {
            s.imgBao10.visible = false;
            s.imgLing10.visible = true;
            s.labCost10.text = "" + Model_LingLong.lingLong + "/10";
            s.labCost10.color = Color.WHITEINT;
            s.btnBuy10.checkNotice = true;
        }
        else {
            s.imgBao10.visible = true;
            s.imgLing10.visible = false;
            s.labCost10.text = "" + s._cost10;
            if (Model_player.voMine.yuanbao >= s._cost10) {
                s.labCost10.color = Color.GREENINT;
            }
            else {
                s.labCost10.color = Color.REDINT;
            }
            s.btnBuy10.checkNotice = false;
        }
        s.upLogs();
        s.setNotice();
    };
    ViewLingLongPanel.prototype.upLogs = function () {
        //玩家购买日记
        var arr = Model_LingLong.logsArr;
        var noteStr = "";
        var len = arr.length;
        for (var i = 0; i < arr.length; i++) {
            var v = arr[len - i - 1];
            if (i != 0) {
                noteStr += "\n";
            }
            noteStr += v.name + "获得<font color='" + Color.getColorStr(v.itemVo.quality) + "'>" + v.itemVo.name + "</font>*" + v.itemVo.count;
        }
        this.noteLb.text = noteStr;
    };
    ViewLingLongPanel.prototype.openRank = function () {
        GGlobal.layerMgr.open(UIConst.LING_LONG_RANK);
    };
    ViewLingLongPanel.prototype.onBuy1 = function () {
        if (Model_LingLong.lingLong > 0) {
            GGlobal.modelLingLong.CG_BUY(1, 0);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost1) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelLingLong.CG_BUY(1, 1);
            this.btnBuy1.touchable = this.btnBuy10.touchable = false;
        }
    };
    ViewLingLongPanel.prototype.onBuy10 = function () {
        if (Model_LingLong.lingLong > 9) {
            GGlobal.modelLingLong.CG_BUY(10, 0);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost10) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelLingLong.CG_BUY(10, 1);
            this.btnBuy1.touchable = this.btnBuy10.touchable = false;
        }
    };
    ViewLingLongPanel.prototype.onGetPoint = function (e) {
        var v = e.itemObject;
        var vPoint = v.vo;
        var pointCfg = Config.llgpoint_239[vPoint.point];
        var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(pointCfg.reward));
        GGlobal.layerMgr.open(UIConst.LING_LONG_REWARD, { award: rewardArr, type: 1, vo: vPoint, base: this.base });
    };
    ViewLingLongPanel.prototype.renderPoint = function (index, obj) {
        var v = obj;
        v.setVo(Model_LingLong.pointArr[index], this.base);
    };
    ViewLingLongPanel.prototype.startDraw = function (dropArr) {
        if (Model_LingLong.skipTween) {
            this.btnBuy1.touchable = this.btnBuy10.touchable = true;
            this.upLogs();
            return;
        }
        this.startIndex = 0;
        this.startCount = 0;
        this.btnBuy1.touchable = this.btnBuy10.touchable = false;
        Timer.instance.listen(this.startEff, this, 50);
    };
    ViewLingLongPanel.prototype.startEff = function () {
        this.startIndex++;
        if (this.startIndex >= this._gArr.length) {
            this.startIndex = 0;
            this.startCount++;
        }
        var grid = this._gArr[this.startIndex];
        this.chooseImg.visible = true;
        this.chooseImg.setXY(grid.x - 3, grid.y - 2);
        if (this.startCount >= 2 && this.startIndex == 7) {
            Timer.instance.remove(this.startEff, this);
            this.chooseImg.visible = false;
            this.btnBuy1.touchable = this.btnBuy10.touchable = true;
            this.upLogs();
        }
    };
    ViewLingLongPanel.prototype.guide_draw = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.btnBuy1, self.btnBuy1.width / 2, self.btnBuy1.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.btnBuy1, self.btnBuy1.width / 2, 0, -90, -106, -100);
        if (self.btnBuy1.parent)
            self.btnBuy1.parent.setChildIndex(self.btnBuy1, self.btnBuy1.parent.numChildren - 1);
    };
    ViewLingLongPanel.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    ViewLingLongPanel.prototype.pageHandler = function (event) {
        var btn = event.target;
        var curpage = this.listPoint.getFirstChildInView();
        switch (btn.id) {
            case this.btnLeft.id:
                if (curpage > 0) {
                    curpage = curpage - 3;
                    if (curpage < 0)
                        curpage = 0;
                }
                break;
            case this.btnRight.id:
                if (curpage < this.listPoint.numItems - 3) {
                    curpage = curpage + 3;
                    if (curpage >= this.listPoint.numItems - 3)
                        curpage = this.listPoint.numItems - 3;
                }
                break;
        }
        this._curpage = curpage;
        if (this.listPoint.numItems > 0)
            this.listPoint.scrollToView(curpage, true, true);
        this.setNotice();
    };
    ViewLingLongPanel.prototype.setNotice = function () {
        this.btnRight.checkNotice = false;
        this.btnLeft.checkNotice = false;
        for (var i = 0; i < Model_LingLong.pointArr.length; i++) {
            var red = void 0;
            var vPoint = Model_LingLong.pointArr[i];
            // let pointCfg = Config.llgpoint_239[vPoint.point]
            if (vPoint.status == 0 || vPoint.status == -1) {
                red = false;
            }
            else {
                red = true;
            }
            if (red && i > this._curpage + 3) {
                this.btnRight.checkNotice = true;
            }
            if (red && i < this._curpage) {
                this.btnLeft.checkNotice = true;
            }
        }
    };
    ViewLingLongPanel.prototype.scrollComp = function () {
        var curpage = this.listPoint.getFirstChildInView();
        this._curpage = curpage;
        this.setNotice();
    };
    ViewLingLongPanel.prototype.onCheck = function (e) {
        Model_LingLong.skipTween = this.checkBox.selected;
        var key = Model_player.voMine.id + "lingLongCheck";
        var val = Model_LingLong.skipTween ? "1" : "0";
        egret.localStorage.setItem(key, val);
    };
    return ViewLingLongPanel;
}(UIPanelBase));
__reflect(ViewLingLongPanel.prototype, "ViewLingLongPanel");
