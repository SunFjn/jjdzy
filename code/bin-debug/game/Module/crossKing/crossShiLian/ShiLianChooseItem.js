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
var ShiLianChooseItem = (function (_super) {
    __extends(ShiLianChooseItem, _super);
    function ShiLianChooseItem() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    ShiLianChooseItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ShiLianChooseItem"));
    };
    ShiLianChooseItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.gridArr = [self.grid0, self.grid1];
    };
    ShiLianChooseItem.prototype.setVo = function (roleData, cfg) {
        var self = this;
        var model = GGlobal.modelkfsl;
        var cfg2 = Config.kfsl_767[model.floor];
        if (!cfg) {
            self.battleBt.visible = false;
        }
        else {
            self.battleBt.visible = true;
            if (model.maxFloor - model.floor >= 10) {
                self.battleBt.text = Model_player.voMine.str > roleData.power ? "扫荡" : "挑战";
            }
            else {
                self.battleBt.text = "挑战";
            }
        }
        self.roleData = roleData;
        IconUtil.setImg(self.backImg, Enum_Path.SHILIAN_URL + "nd" + (roleData.type - 1) + ".png");
        self.titleIcon.url = CommonManager.getUrl("crossKing", "nd" + (roleData.type - 1));
        self.nameLb.text = roleData.name;
        self.powerLb.text = ConfigHelp.getYiWanText(roleData.power);
        var cfg1 = Config.slzd_767[cfg.lx];
        var strArr = ["", "ptyl", "knyl", "emyl"];
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg1[strArr[roleData.type]]));
        for (var i = 0; i < self.gridArr.length; i++) {
            self.gridArr[i].tipEnabled = self.gridArr[i].isShowEff = true;
            self.gridArr[i].vo = rewardArr[i];
        }
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.uiparent = self.modelIcon.displayObject;
            self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
            self.awatar.setPos(self.modelIcon.width / 2, self.modelIcon.height + 20);
        }
        if (Config.sz_739[roleData.job]) {
            self.awatar.setBody(Config.sz_739[roleData.job].moxing);
        }
        else {
            self.awatar.setBody(roleData.job);
        }
        self.awatar.setWeapon(roleData.job);
        self.awatar.setGodWeapon(roleData.godWeapon);
        self.awatar.setHorseId(roleData.horseId);
        if (roleData.horseId) {
            self.awatar.setScaleXY(0.7, 0.7);
        }
        else {
            self.awatar.setScaleXY(1, 1);
        }
        self.awatar.onAdd();
        self.battleBt.addClickListener(self.battleHandler, self);
    };
    ShiLianChooseItem.prototype.battleHandler = function () {
        var self = this;
        var model = GGlobal.modelkfsl;
        if (model.maxFloor - model.floor >= 10 && Model_player.voMine.str > self.roleData.power) {
            model.CG_CROSSTRIAL_SAODANG_10483(self.roleData.type);
        }
        else {
            model.CG_CrossTrial_challenge_10473(self.roleData.type);
        }
    };
    ShiLianChooseItem.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.backImg, null);
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        ConfigHelp.cleanGridEff(self.gridArr);
        self.battleBt.removeClickListener(self.battleHandler, self);
    };
    ShiLianChooseItem.URL = "ui://yqpfulefkh256e";
    return ShiLianChooseItem;
}(fairygui.GComponent));
__reflect(ShiLianChooseItem.prototype, "ShiLianChooseItem");
