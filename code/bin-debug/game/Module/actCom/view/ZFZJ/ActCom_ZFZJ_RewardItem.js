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
var ActCom_ZFZJ_RewardItem = (function (_super) {
    __extends(ActCom_ZFZJ_RewardItem, _super);
    function ActCom_ZFZJ_RewardItem() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        return _this;
    }
    ActCom_ZFZJ_RewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_ZFZJ", "ActCom_ZFZJ_RewardItem"));
    };
    ActCom_ZFZJ_RewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    ActCom_ZFZJ_RewardItem.prototype.renderHandler = function (index, grid) {
        var self = this;
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = self.rewardArr[index];
    };
    ActCom_ZFZJ_RewardItem.prototype.onDraw = function () {
        var self = this;
        if (self.drawBt.checkNotice) {
            GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_getBossReward_9665(self.vo.id);
        }
        else {
            ViewCommonWarn.text("未达到领取条件");
        }
    };
    ActCom_ZFZJ_RewardItem.prototype.setVo = function (cfg) {
        var self = this;
        var model = GGlobal.modelzfzj;
        var state = model.rewardData[cfg.id];
        self.vo = cfg;
        self.levelLb.text = cfg.id + "级";
        self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self.rewardArr.length;
        self.drawImg.visible = state == 2;
        self.drawBt.visible = state != 2;
        self.drawBt.checkNotice = state == 1;
        self.drawBt.enabled = state == 1;
        self.drawBt.addClickListener(self.onDraw, self);
    };
    ActCom_ZFZJ_RewardItem.prototype.clean = function () {
        var self = this;
        self.list.numItems = 0;
        self.drawBt.removeClickListener(self.onDraw, self);
    };
    ActCom_ZFZJ_RewardItem.URL = "ui://4h4iwgjrr3jek";
    return ActCom_ZFZJ_RewardItem;
}(fairygui.GComponent));
__reflect(ActCom_ZFZJ_RewardItem.prototype, "ActCom_ZFZJ_RewardItem");
