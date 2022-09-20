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
var Item_LoginYouJiang = (function (_super) {
    __extends(Item_LoginYouJiang, _super);
    function Item_LoginYouJiang() {
        return _super.call(this) || this;
    }
    Item_LoginYouJiang.createInstance = function () {
        return (fairygui.UIPackage.createObject("LoginReward", "Item_LoginYouJiang"));
    };
    Item_LoginYouJiang.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.girdList.setVirtual();
        self.girdList.callbackThisObj = self;
        self.girdList.itemRenderer = self.itemRenderer;
    };
    Item_LoginYouJiang.prototype.itemRenderer = function (index, item) {
        var self = this;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = self.rewardVO[index];
    };
    Item_LoginYouJiang.prototype.onClickBtnGet = function () {
        var self = this;
        var model = GGlobal.modelLoginGift;
        if (model.rewardData[self.VODatas.id] == 1) {
            model.CG_GETREWARD_9161(self.VODatas.id);
        }
        else {
            ViewCommonWarn.text("暂不可领取");
        }
    };
    Item_LoginYouJiang.prototype.clean = function () {
        var self = this;
        self.girdList.numItems = 0;
        self.btnGet.removeClickListener(self.onClickBtnGet, self);
    };
    Item_LoginYouJiang.prototype.setData = function (cfg) {
        var self = this;
        var model = GGlobal.modelLoginGift;
        self.VODatas = cfg;
        self.btnGet.visible = model.rewardData[cfg.id] == 1;
        self.desc.text = "累计登陆" + cfg.day + "天";
        if (cfg.day <= model.loginDay) {
            self.day.text = "(" + model.loginDay + "/" + cfg.day + ")";
        }
        else {
            self.day.text = "[color=#ff0000](" + model.loginDay + "/" + cfg.day + ")[/color]";
        }
        self.noticeImg.visible = model.rewardData[cfg.id] == 1;
        self.ylq.visible = model.rewardData[cfg.id] == 2;
        var reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.rewardVO = reward;
        self.girdList.numItems = self.rewardVO.length;
        self.btnGet.addClickListener(self.onClickBtnGet, self);
    };
    Item_LoginYouJiang.URL = "ui://q4uuphepdsdy3";
    return Item_LoginYouJiang;
}(fairygui.GComponent));
__reflect(Item_LoginYouJiang.prototype, "Item_LoginYouJiang");
