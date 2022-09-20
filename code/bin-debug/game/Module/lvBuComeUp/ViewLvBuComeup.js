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
var ViewLvBuComeup = (function (_super) {
    __extends(ViewLvBuComeup, _super);
    function ViewLvBuComeup() {
        var _this = _super.call(this) || this;
        _this.WIDTH = 557;
        _this.imgsTargets = ["n25", "n39", "n51", "n63"];
        _this.setSkin("LvBuComeUp", "LvBuComeUp_atlas0", "ViewLvBuComeup");
        return _this;
    }
    ViewLvBuComeup.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self.txtCheck.displayObject.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onHand, self);
        self.btnForward.addClickListener(self.onHand, self);
        self.closeButton.addClickListener(self.onHand, self);
        self.list.itemRenderer = self.onRender;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        self.txtCheck.text = HtmlUtil.underLine(self.txtCheck.text);
        self.btnLeft.displayObject.touchEnabled = self.btnRight.displayObject.touchEnabled = true;
        CommonManager.listPageChange("ViewLvBuComeup", self.list, self.btnLeft, self.btnRight, 4);
    };
    ViewLvBuComeup.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ItemLvBuAward.URL, ItemLvBuAward);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemLBPH.URL, ItemLBPH);
    };
    ViewLvBuComeup.prototype.onRender = function (index, item) {
        var data = this.allAwards[index];
        item.vo = data;
    };
    ViewLvBuComeup.prototype.onHand = function (evt) {
        var self = this;
        var tar = evt.currentTarget;
        switch (tar) {
            case self.closeButton:
                GGlobal.layerMgr.close(UIConst.VIEWLVBUCOMEUP);
                break;
            case self.txtCheck.displayObject:
                GGlobal.layerMgr.open(UIConst.VIEWLBPAIHANG);
                break;
            case self.btnForward:
                GGlobal.layerMgr.open(UIConst.JINSHENG);
                break;
        }
    };
    ViewLvBuComeup.prototype.onUpdate = function () {
        var self = this;
        var model = GGlobal.modelLvBuCompup;
        var info = model.datas;
        var leftDay = 8 - Model_GlobalMsg.kaifuDay;
        if (leftDay > 1) {
            self.txtAcTime.text = "剩余时间：<font color='#15f234'>" + (8 - Model_GlobalMsg.kaifuDay) + "天</font>";
        }
        else {
            self.addTimer();
        }
        var first = info[1]; //第一名
        if (first.head) {
            var headBgUrl = RoleUtil.getHeadRole(Config.shezhi_707[first.headBg].picture + "");
            IconUtil.setImg(self.headBg, headBgUrl);
            var headUrl = RoleUtil.getHeadRole(Config.shezhi_707[first.head].picture + "");
            IconUtil.setImg(self.iconHero, headUrl);
        }
        else {
            IconUtil.setImg(self.headBg, null);
            IconUtil.setImg(self.iconHero, null);
        }
        self.txtNameFir.text = first.name;
        self.txtJiFenFir.text = "晋升积分: " + first.jiFen;
        var awards = ConfigHelp.makeItemListArr(JSON.parse(Config.lbjl_250[1].reward));
        self.setAwards(awards, [self["grid1_0"], self["grid1_1"], self["grid1_2"]]);
        self.txtPromot.text = "晋升积分≥" + Config.xtcs_004[3301].num;
        var bigAwards = ConfigHelp.makeItemListArr(JSON.parse(Config.lbjl_250[1].reward1));
        self.setAwardsWithGrp(bigAwards, [self["grp0"]], [self["grid1_3"]]);
        var second = info[2];
        self.txtNameSec.text = second.name;
        self.txtJiFenSec.text = "晋升积分: " + second.jiFen;
        awards = ConfigHelp.makeItemListArr(JSON.parse(Config.lbjl_250[2].reward));
        self.setAwards(awards, [self["grid2_0"], self["grid2_1"], self["grid2_2"]]);
        bigAwards = ConfigHelp.makeItemListArr(JSON.parse(Config.lbjl_250[2].reward1));
        self.setAwardsWithGrp(bigAwards, [self["grp2"]], [self["grid2_3"]]);
        var third = info[3];
        self.txtNameThir.text = third.name;
        self.txtJiFenThir.text = "晋升积分: " + third.jiFen;
        awards = ConfigHelp.makeItemListArr(JSON.parse(Config.lbjl_250[3].reward));
        self.setAwards(awards, [self["grid3_0"], self["grid3_1"], self["grid3_2"]]);
        bigAwards = ConfigHelp.makeItemListArr(JSON.parse(Config.lbjl_250[3].reward1));
        self.setAwardsWithGrp(bigAwards, [self["grp3"]], [self["grid3_3"]]);
        awards = ConfigHelp.makeItemListArr(JSON.parse(Config.lbjl_250[4].reward));
        self.setAwards(awards, [self["grid4_0"], self["grid4_1"], self["grid4_2"]]);
        bigAwards = ConfigHelp.makeItemListArr(JSON.parse(Config.lbjl_250[4].reward1));
        self.setAwardsWithGrp(bigAwards, [self["grp4"]], [self["grid4_3"]]);
        self.txtAwardTJ.text = "大奖领取条件: " + "<font color='#00FF00'>" + "晋升积分≥" + Config.xtcs_004[3301].num;
        var arr = ["n78", "n81", "n82", "n83"];
        for (var i = 0; i <= 3; i++) {
            var target = self[self.imgsTargets[i]];
            var djObj = self[arr[i]];
            var childIdx = target.parent.getChildIndex(djObj);
            ExtralFunc.addBigAdEff("ViewLvBuComeup" + i, target, "uieff/10022", childIdx - 1);
            target.parent.setChildIndex(djObj, 100);
        }
        self.txtMinePM.text = "我的排名: " + (model.paimingMine > 0 ? HtmlUtil.fontNoSize(model.paimingMine + "", "#00ff00") : HtmlUtil.fontNoSize("未上榜", "#00ff00"));
        self.txtMineJF.text = "我的晋升积分: " + HtmlUtil.fontNoSize(model.jifenMine + "", "#00ff00");
        var persent = model.jifenMine / ModelLvBuComeUp.getMaxJL();
        persent = Math.min(persent, 1);
        self.iconProp.width = self.WIDTH * persent;
        self.txtProp.text = model.jifenMine + "/" + ModelLvBuComeUp.getMaxJL();
        self.updateList();
        self.list.scrollToView(model.canGetJLIndex());
    };
    ViewLvBuComeup.prototype.updateSingle = function (data) {
        var len = this.list.numItems;
        for (var i = 0; i < len; i++) {
            var item = this.list._children[i];
            if (item.vo.cfgId == data.cfgId) {
                item.vo = data;
                break;
            }
        }
    };
    ViewLvBuComeup.prototype.updateList = function () {
        var arr = [];
        var info = GGlobal.modelLvBuCompup.awardGetInfo;
        for (var key in info) {
            arr.push(info[key]);
        }
        this.allAwards = arr;
        this.list.numItems = this.allAwards.length;
    };
    ViewLvBuComeup.prototype.setAwards = function (awards, grids) {
        for (var i = 0; i < grids.length; i++) {
            grids[i].visible = false;
        }
        for (var i = 0; i < awards.length; i++) {
            var grid = grids[i];
            grid.visible = true;
            var data = awards[i];
            grid.vo = data;
            grid.showEff(true);
            grid.tipEnabled = true;
        }
    };
    ViewLvBuComeup.prototype.setAwardsWithGrp = function (awards, grps, grids) {
        for (var i = 0; i < grps.length; i++) {
            grps[i].visible = false;
        }
        for (var i = 0; i < awards.length; i++) {
            var grp = grps[i];
            var grid = grids[i];
            var data = awards[i];
            grp.visible = true;
            grid.vo = data;
            grid.showEff(true);
            grid.tipEnabled = true;
        }
    };
    ViewLvBuComeup.prototype.onTimer = function () {
        var self = this;
        var day = 8 - Model_GlobalMsg.kaifuDay;
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 - (ms - h0);
        if (day <= 1) {
            self.txtAcTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getHMSBySecond((ax / 1000) >> 0) + "</font>";
            if (ax < 0) {
                self.removeTimer();
            }
        }
        else {
            self.removeTimer();
        }
    };
    ViewLvBuComeup.prototype.addTimer = function () {
        var day = 8 - Model_GlobalMsg.kaifuDay;
        if (day <= 1) {
            Timer.instance.listen(this.onTimer, this, 1000);
        }
    };
    ViewLvBuComeup.prototype.removeTimer = function () {
        this.txtAcTime.text = "剩余时间：<font color='#15f234'>00:00:00</font>";
        Timer.instance.remove(this.onTimer, this);
    };
    ViewLvBuComeup.prototype.showAwater = function () {
        var self = this;
        if (!self.uirole) {
            self.uirole = UIRole.create();
            self.uirole.uiparent = self.displayListContainer;
            self.uirole.setPos(110, 295);
            self.uirole.setScaleXY(1, 1);
        }
        self.uirole.setBody(501);
        self.uirole.setWeapon(501);
        self.uirole.onAdd();
    };
    ViewLvBuComeup.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "bg.jpg");
        this.showAwater();
        GGlobal.modelLvBuCompup.listen(ModelLvBuComeUp.msg_datas, this.onUpdate, this);
        GGlobal.modelLvBuCompup.listen(ModelLvBuComeUp.msg_single, this.updateSingle, this);
        GGlobal.modelLvBuCompup.CG2711();
    };
    ViewLvBuComeup.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        var self = this;
        GGlobal.modelLvBuCompup.remove(ModelLvBuComeUp.msg_datas, this.onUpdate, this);
        GGlobal.modelLvBuCompup.remove(ModelLvBuComeUp.msg_single, this.updateSingle, this);
        for (var i = 0; i < 4; i++) {
            self["grid1_" + i].clean();
        }
        for (var i = 0; i < 4; i++) {
            self["grid2_" + i].clean();
        }
        for (var i = 0; i < 4; i++) {
            self["grid3_" + i].clean();
        }
        for (var i = 0; i < 4; i++) {
            self["grid4_" + i].clean();
        }
        for (var i = 0; i <= 3; i++) {
            var target = self.getChild(self.imgsTargets[i]);
            ExtralFunc.addBigAdEff("ViewLvBuComeup" + (i - 1), target, null);
        }
        this.removeTimer();
        this.list.numItems = 0;
        IconUtil.setImg(this.backImg, null);
        if (self.uirole) {
            self.uirole.onRemove();
            self.uirole = null;
        }
    };
    return ViewLvBuComeup;
}(UIPanelBase));
__reflect(ViewLvBuComeup.prototype, "ViewLvBuComeup");
