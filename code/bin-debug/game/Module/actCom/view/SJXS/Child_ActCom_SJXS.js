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
var Child_ActCom_SJXS = (function (_super) {
    __extends(Child_ActCom_SJXS, _super);
    function Child_ActCom_SJXS() {
        var _this = _super.call(this) || this;
        _this.rankItemArr = [];
        _this.skillArr = [];
        return _this;
    }
    Child_ActCom_SJXS.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SJXS", "Child_ActCom_SJXS"));
    };
    Child_ActCom_SJXS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        for (var i = 0; i < 5; i++) {
            self.rankItemArr.push(self["rank" + i]);
            if (i < 4) {
                self.skillArr.push(self["skill" + i]);
            }
        }
    };
    Child_ActCom_SJXS.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(SJXS_RankItem.URL, SJXS_RankItem);
        f(ActCom_SJXS_RewardItem.URL, ActCom_SJXS_RewardItem);
        f(VSJXSRank.URL, VSJXSRank);
    };
    Child_ActCom_SJXS.prototype.initView = function (pParent) {
    };
    Child_ActCom_SJXS.prototype.renderHandler = function (index, grid) {
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = this.rewardList[index];
    };
    Child_ActCom_SJXS.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelsjxs;
        var surTime = model.endTime - Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
        if (surTime > 0) {
            if (!Timer.instance.listen(self.timeHandler, self)) {
                Timer.instance.listen(self.timeHandler, self, 1000);
            }
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
            self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
        }
        var cost0 = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(7401)))[0];
        var cost1 = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(7402)))[0];
        self.grid0.vo = cost0;
        self.moneyLb0.text = cost0.count + "";
        self.grid1.vo = cost1;
        self.moneyLb1.text = cost1.count + "";
        self.targetBt.checkNotice = model.checkNotice();
    };
    Child_ActCom_SJXS.prototype.OnDraw = function (evt) {
        var self = this;
        self.drawHandler(evt.target.data);
    };
    Child_ActCom_SJXS.prototype.drawHandler = function (value) {
        var self = this;
        var money = 0;
        var type = 0;
        switch (value) {
            case 1:
                money = parseInt(self.moneyLb0.text);
                type = 1;
                break;
            case 10:
                type = 2;
                money = parseInt(self.moneyLb1.text);
                break;
        }
        if (Model_player.voMine.yuanbao >= money) {
            self.drawBt1.touchable = self.drawBt10.touchable = false;
            GGlobal.modelsjxs.CG_GodGenThisLife_turn_9551(type);
        }
        else {
            ModelChongZhi.guideToRecharge();
        }
    };
    Child_ActCom_SJXS.prototype.timeHandler = function () {
        var self = this;
        var model = GGlobal.modelsjxs;
        var surTime = model.endTime - Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
        if (surTime > 0) {
            self.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(surTime);
        }
        else {
            self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_ActCom_SJXS.prototype.showReward = function (arr) {
        var self = this;
        View_Reward_Show2.show(self.vo.groupId, arr.length, Handler.create(self, function () {
            self.drawHandler(arr.length);
        }), arr, parseInt(self.moneyLb0.text), parseInt(self.moneyLb1.text), 0);
        self.drawBt1.touchable = self.drawBt10.touchable = true;
        self.updateShow();
    };
    Child_ActCom_SJXS.prototype.openPanel = function (pData) {
        var self = this;
        var model = GGlobal.modelsjxs;
        var cfg = Config.god_288[pData.qs];
        self.vo = pData;
        if (!model.rankData) {
            model.getRankData();
        }
        if (!self.awater) {
            self.awater = UIRole.create();
            self.awater.uiparent = self.backImg.displayObject;
            self.awater.setScaleXY(1.5, 1.5);
            self.awater.setPos(self.backImg.width / 2, self.backImg.height - 20);
        }
        self.awater.setBody(cfg.mod);
        self.awater.setWeapon(cfg.mod);
        self.awater.onAdd();
        IconUtil.setImg(self.nameIcon, Enum_Path.ACTCOM_URL + "sjxs_" + cfg.mod + ".png");
        self.registerEvent(true);
        var skillIDArr = JSON.parse(cfg.skill);
        for (var i = 0; i < self.rankItemArr.length; i++) {
            self.rankItemArr[i].setVo(model.rankData[pData.qs][i]);
            if (i < 4) {
                self.skillArr[i].setVo(skillIDArr[i][0], cfg.mod);
            }
        }
        self.powerLb.text = cfg.power + "";
        self.drawBt1.data = 1;
        self.drawBt10.data = 10;
        self.rewardList = ConfigHelp.makeItemListArr(JSON.parse(cfg.show));
        self.list.numItems = self.rewardList.length;
        self.drawBt1.touchable = self.drawBt10.touchable = true;
        GGlobal.modelActivity.CG_OPENACT(UIConst.SHENJIANG_XIANSHI);
        if (!model.targertData) {
            GGlobal.modelsjxs.CG_GodGenThisLife_openTargetAwardUI_9555();
        }
        IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "sjxs.png");
    };
    Child_ActCom_SJXS.prototype.closePanel = function (pData) {
        var self = this;
        self.registerEvent(false);
        self.list.numItems = 0;
        for (var i = 0; i < self.rankItemArr.length; i++) {
            self.rankItemArr[i].clean();
            if (i < 4) {
                self.skillArr[i].clean();
            }
        }
        Timer.instance.remove(self.timeHandler, self);
        if (self.awater) {
            self.awater.onRemove();
            self.awater = null;
        }
        IconUtil.setImg(self.backImg, null);
        IconUtil.setImg(self.nameIcon, null);
    };
    Child_ActCom_SJXS.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.drawBt1, egret.TouchEvent.TOUCH_TAP, self.OnDraw, self);
        EventUtil.register(pFlag, self.drawBt10, egret.TouchEvent.TOUCH_TAP, self.OnDraw, self);
        EventUtil.register(pFlag, self.rankBt, egret.TouchEvent.TOUCH_TAP, self.openRank, self);
        EventUtil.register(pFlag, self.targetBt, egret.TouchEvent.TOUCH_TAP, self.openTarget, self);
        GGlobal.control.register(pFlag, UIConst.SHENJIANG_XIANSHI, self.updateShow, self);
        GGlobal.control.register(pFlag, Enum_MsgType.SJXS_REWARD, self.showReward, self);
    };
    Child_ActCom_SJXS.prototype.openRank = function () {
        var self = this;
        GGlobal.layerMgr.open(UIConst.SHENJIANG_XIANSHI_RANK, GGlobal.modelsjxs.rankData[self.vo.qs]);
    };
    Child_ActCom_SJXS.prototype.openTarget = function () {
        GGlobal.layerMgr.open(UIConst.SHENJIANG_XIANSHI_REWARD);
    };
    Child_ActCom_SJXS.URL = "ui://iwvd88mqr3je6";
    Child_ActCom_SJXS.pkg = "ActCom_SJXS";
    return Child_ActCom_SJXS;
}(fairygui.GComponent));
__reflect(Child_ActCom_SJXS.prototype, "Child_ActCom_SJXS", ["IPanel"]);
