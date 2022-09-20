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
var Child_ActCom_ZFZJ = (function (_super) {
    __extends(Child_ActCom_ZFZJ, _super);
    function Child_ActCom_ZFZJ() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        _this.rewardList = [];
        return _this;
    }
    Child_ActCom_ZFZJ.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_ZFZJ", "Child_ActCom_ZFZJ"));
    };
    Child_ActCom_ZFZJ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.expBar.titleType = fairygui.ProgressTitleType.ValueAndMax;
        self.itemArr = [self.item0, self.item1, self.item2];
    };
    Child_ActCom_ZFZJ.prototype.renderHandler = function (index, grid) {
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = this.rewardList[index];
    };
    Child_ActCom_ZFZJ.prototype.initView = function (pParent) {
    };
    Child_ActCom_ZFZJ.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ZFZJItem.URL, ZFZJItem);
        f(ActCom_ZFZJ_RankItem.URL, ActCom_ZFZJ_RankItem);
        f(ActCom_ZFZJ_RewardItem.URL, ActCom_ZFZJ_RewardItem);
        f(ZFZJSceneInfo.URL, ZFZJSceneInfo);
    };
    Child_ActCom_ZFZJ.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelzfzj;
        var cfg = Config.hfkhzfzj_286[model.bossLv];
        self.c1.selectedIndex = model.state;
        self.levelLb.text = "Lv." + cfg.id;
        self.rewardList = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self.rewardList.length;
        self.expBar.value = model.zuiYi;
        self.expBar.max = cfg.zui;
        if (self.c1.selectedIndex == 0) {
            for (var i = 0; i < self.itemArr.length; i++) {
                self.itemArr[i].setVo(i + 1);
            }
            Timer.instance.remove(self.updateEnterTime, self);
        }
        else if (self.c1.selectedIndex == 1) {
            if (model.times > 0) {
                if (!Timer.instance.has(self.updateEnterTime, self)) {
                    Timer.instance.listen(self.updateEnterTime, self, 1000);
                }
            }
            else {
                Timer.instance.remove(self.updateEnterTime, self);
            }
        }
        else {
            Timer.instance.remove(self.updateEnterTime, self);
        }
        self.rewardBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.HFKH_ZFZJ_REWARD, 0);
    };
    Child_ActCom_ZFZJ.prototype.updateEnterTime = function () {
        var model = GGlobal.modelzfzj;
        var self = this;
        model.times--;
        if (model.times <= 0) {
            Timer.instance.remove(self.updateEnterTime, self);
        }
    };
    Child_ActCom_ZFZJ.prototype.timeHandler = function () {
        var self = this;
        if (self.vo.getSurTime() > 0) {
            self.timeLb.text = "剩余活动时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
            Timer.instance.listen(self.timeHandler, self);
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_ActCom_ZFZJ.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        GGlobal.modelzfzj.activityVo = pData;
        if (pData.getSurTime() > 0) {
            self.timeLb.text = "剩余活动时间：" + DateUtil.getMSBySecond4(pData.getSurTime());
            Timer.instance.listen(self.timeHandler, self);
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
        IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "zfzj.jpg");
        self.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.HFKH_ZFZJ);
    };
    Child_ActCom_ZFZJ.prototype.closePanel = function (pData) {
        var self = this;
        Timer.instance.remove(self.timeHandler, self);
        Timer.instance.remove(self.updateEnterTime, self);
        IconUtil.setImg(self.backImg, null);
        self.list.numItems = 0;
        for (var i = 0; i < self.itemArr.length; i++) {
            self.itemArr[i].clean();
        }
        self.registerEvent(false);
    };
    Child_ActCom_ZFZJ.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.HFKH_ZFZJ, self.updateShow, self);
        EventUtil.register(pFlag, self.rewardBt, egret.TouchEvent.TOUCH_TAP, self.openReward, self);
        EventUtil.register(pFlag, self.rankLb, egret.TouchEvent.TOUCH_TAP, self.openRank, self);
        EventUtil.register(pFlag, self.explainLb, egret.TouchEvent.TOUCH_TAP, self.openExplain, self);
        EventUtil.register(pFlag, self.battleBt, egret.TouchEvent.TOUCH_TAP, self.onBattle, self);
    };
    Child_ActCom_ZFZJ.prototype.onBattle = function () {
        var self = this;
        var model = GGlobal.modelzfzj;
        if (model.times > 0) {
            ViewCommonWarn.text(model.times + "秒后进入挑战");
            return;
        }
        model.CG_HeFuZhangFeiBoss_join_9645();
    };
    Child_ActCom_ZFZJ.prototype.openReward = function (evt) {
        GGlobal.layerMgr.open(UIConst.HFKH_ZFZJ_REWARD);
    };
    Child_ActCom_ZFZJ.prototype.openRank = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.HFKH_ZFZJ_RANK);
    };
    Child_ActCom_ZFZJ.prototype.openExplain = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.HFKH_ZFZJ);
    };
    Child_ActCom_ZFZJ.URL = "ui://4h4iwgjrgapng";
    Child_ActCom_ZFZJ.pkg = "ActCom_ZFZJ";
    return Child_ActCom_ZFZJ;
}(fairygui.GComponent));
__reflect(Child_ActCom_ZFZJ.prototype, "Child_ActCom_ZFZJ", ["IPanel"]);
