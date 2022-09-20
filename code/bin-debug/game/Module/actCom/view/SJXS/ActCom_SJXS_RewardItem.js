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
var ActCom_SJXS_RewardItem = (function (_super) {
    __extends(ActCom_SJXS_RewardItem, _super);
    function ActCom_SJXS_RewardItem() {
        var _this = _super.call(this) || this;
        _this.cfgID = 0;
        _this.state = 0;
        return _this;
    }
    ActCom_SJXS_RewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SJXS", "ActCom_SJXS_RewardItem"));
    };
    ActCom_SJXS_RewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    ActCom_SJXS_RewardItem.prototype.renderHandler = function (index, grid) {
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = this.showData[index];
    };
    ActCom_SJXS_RewardItem.prototype.drawHandler = function () {
        var self = this;
        if (self.state == 0) {
            ViewCommonWarn.text("未达到领奖条件");
            return;
        }
        GGlobal.modelsjxs.CG_GodGenThisLife_getTargetAward_9557(self.cfgID);
    };
    ActCom_SJXS_RewardItem.prototype.setVo = function (cfgID, state) {
        var self = this;
        var model = GGlobal.modelsjxs;
        self.cfgID = cfgID;
        self.state = state;
        var cfg = Config.godmb_288[cfgID];
        self.showData = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self.showData.length;
        var color = model.drawNum >= cfg.time ? 2 : 6;
        self.needLb.text = ConfigHelp.reTxt("抽奖({0})次", HtmlUtil.fontNoSize(model.drawNum + "/" + cfg.time, Color.getColorStr(color)));
        self.drawImg.visible = state == 2;
        self.drawBt.enabled = state == 1;
        self.drawBt.visible = state != 2;
        self.drawBt.checkNotice = state == 1;
        self.drawBt.addClickListener(self.drawHandler, self);
    };
    ActCom_SJXS_RewardItem.prototype.clean = function () {
        var self = this;
        self.list.numItems = 0;
        self.drawBt.removeClickListener(self.drawHandler, self);
    };
    ActCom_SJXS_RewardItem.URL = "ui://iwvd88mqr3jeb";
    return ActCom_SJXS_RewardItem;
}(fairygui.GComponent));
__reflect(ActCom_SJXS_RewardItem.prototype, "ActCom_SJXS_RewardItem");
