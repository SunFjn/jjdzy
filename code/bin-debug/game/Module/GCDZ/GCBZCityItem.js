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
var GCBZCityItem = (function (_super) {
    __extends(GCBZCityItem, _super);
    function GCBZCityItem() {
        return _super.call(this) || this;
    }
    GCBZCityItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("GCBZ", "GCBZCityItem"));
    };
    GCBZCityItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    GCBZCityItem.prototype.setVo = function (vo) {
        var self = this;
        var model = GGlobal.modelgcbz;
        self.vo = vo;
        self.cityName.text = vo.cfg.mz;
        if (vo.id > 0) {
            self.head.setdata(vo.headID, 0, "", 0, false, vo.frameID);
            self.nameLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.id == Model_player.voMine.id ? 2 : 1));
            self.powerLb.text = "战力:" + ConfigHelp.numToStr(vo.power);
            self.dataGroup.visible = self.lookBt.visible = true;
        }
        else {
            self.head.setdata(0);
            self.lookBt.visible = self.dataGroup.visible = false;
        }
        self.addBt.visible = vo.id <= 0;
        if (model.selDiff == 0) {
            self.battleBt.visible = vo.cfg.tgs % 1000 == 1 && vo.cfg.nd <= model.diffState;
            self.cityBt.visible = self.passImg.visible = false;
        }
        else if (vo.cfg.tgs == model.curID) {
            self.battleBt.visible = model.state == 0;
            self.cityBt.visible = model.state == 1 && vo.id != Model_player.voMine.id;
            self.passImg.visible = model.state == 1 && vo.id == Model_player.voMine.id;
        }
        else {
            var cfg = Config.gcbz_777[model.curID];
            self.passImg.visible = model.curID > vo.cfg.tgs && cfg.nd == vo.cfg.nd;
            self.cityBt.visible = false;
            self.battleBt.visible = model.state == 1 && vo.cfg.tgs == cfg.xyg && cfg.nd == vo.cfg.nd;
        }
        self.register(true);
    };
    GCBZCityItem.prototype.register = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.lookBt, egret.TouchEvent.TOUCH_TAP, self.OnLook, self);
        EventUtil.register(pFlag, self.addBt, egret.TouchEvent.TOUCH_TAP, self.onAdd, self);
        EventUtil.register(pFlag, self.cityBt, egret.TouchEvent.TOUCH_TAP, self.onCity, self);
        EventUtil.register(pFlag, self.battleBt, egret.TouchEvent.TOUCH_TAP, self.OnBattle, self);
        EventUtil.register(pFlag, self.bg, egret.TouchEvent.TOUCH_TAP, self.OnLook, self);
    };
    GCBZCityItem.prototype.OnBattle = function () {
        var self = this;
        var model = GGlobal.modelgcbz;
        if (model.isTimeIn()) {
            return ViewCommonWarn.text("非活动时间中");
        }
        if (model.selDiff == 0) {
            ViewAlert.show(ConfigHelp.reTxt("是否选择{0}进行挑战，\n当天不可更换难度", HtmlUtil.fontNoSize(model.difArr[self.vo.cfg.nd] + "难度", Color.getColorStr(2))), Handler.create(self, function () {
                model.CG_AttackCity_choose_12077(self.vo.cfg.nd, self.vo.cfg.tgs);
            }));
        }
        else {
            if (model.curID < self.vo.cfg.tgs) {
                model.CG_AttackCity_move_12075(self.vo.cfg.tgs);
            }
            else {
                model.CG_AttackCity_attackNPC_12061(self.vo.cfg.tgs);
            }
        }
    };
    GCBZCityItem.prototype.OnLook = function () {
        GGlobal.layerMgr.open(UIConst.GCBZ_CITYDATA, this.vo);
    };
    GCBZCityItem.prototype.onAdd = function () {
        GGlobal.layerMgr.open(UIConst.GCBZ_CITYDATA, this.vo);
    };
    GCBZCityItem.prototype.onCity = function () {
        var self = this;
        var model = GGlobal.modelgcbz;
        var rewardMaxVo = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8251].other))[0];
        if (model.isTimeIn()) {
            return ViewCommonWarn.text("非活动时间中");
        }
        else if (model.rewardNum >= rewardMaxVo.count) {
            return ViewCommonWarn.text("驻守奖励已达上限，请及时领取");
        }
        else if (model.times <= 0) {
            return ViewCommonWarn.text("今日驻守时间已达上限");
        }
        if (model.zhuShouID > 0) {
            ViewAlert.show(ConfigHelp.reTxt("进攻该城池将退出{0}的驻守，\n是否发起进攻？", HtmlUtil.fontNoSize(Config.gcbz_777[model.zhuShouID].mz, Color.getColorStr(5))), Handler.create(self, function () {
                if (self.vo.id > 0) {
                    model.CG_AttackCity_plunder_12057(self.vo.cfg.tgs);
                }
                else {
                    model.CG_AttackCity_dispatch_12053(self.vo.cfg.tgs);
                }
            }));
        }
        else {
            if (self.vo.id > 0) {
                model.CG_AttackCity_plunder_12057(self.vo.cfg.tgs);
            }
            else {
                model.CG_AttackCity_dispatch_12053(self.vo.cfg.tgs);
            }
        }
    };
    GCBZCityItem.prototype.clean = function () {
        var self = this;
        self.register(false);
    };
    GCBZCityItem.URL = "ui://vgiijkm8uvs31";
    return GCBZCityItem;
}(fairygui.GComponent));
__reflect(GCBZCityItem.prototype, "GCBZCityItem");
