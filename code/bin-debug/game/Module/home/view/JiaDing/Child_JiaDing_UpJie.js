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
var Child_JiaDing_UpJie = (function (_super) {
    __extends(Child_JiaDing_UpJie, _super);
    function Child_JiaDing_UpJie() {
        return _super.call(this) || this;
    }
    Child_JiaDing_UpJie.createInstance = function () {
        return (fairygui.UIPackage.createObject("JiaDing", "Child_JiaDing_UpJie"));
    };
    Child_JiaDing_UpJie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Child_JiaDing_UpJie.prototype.initView = function (pParent) {
    };
    Child_JiaDing_UpJie.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelHouseKeeper;
        var cfg = Config.jdjins_021[model.jdID];
        var cfg1 = Config.jdsj_021[model.jdLv];
        self.nameLb.text = cfg.mingzi;
        self.labPower.text = cfg1.power + "";
        if (!self.uiRole) {
            self.uiRole = UIRole.create();
            self.uiRole.uiparent = self.modelImg.displayObject;
            self.uiRole.setPos(self.modelImg.width / 2, self.modelImg.height);
        }
        self.uiRole.setBody(cfg.moxing);
        self.uiRole.onAdd();
        if (cfg.next > 0) {
            if (cfg.tiaojian > 0) {
                self.upLb.text = ConfigHelp.reTxt("提升到{0}可晋升为{1}", Config.jdsj_021[cfg.tiaojian].jie, Config.jdjins_021[cfg.next].mingzi);
            }
            else {
                self.upLb.text = "";
            }
        }
        else {
            self.upLb.text = "已达最高职位";
        }
        var nextcfg = Config.jdsj_021[model.jdLv + 1];
        if (nextcfg) {
            self.c1.selectedIndex = 0;
            self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(cfg1.attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
        }
        else {
            self.c1.selectedIndex = 1;
            self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(cfg1.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
        }
        self.iconJie.setVal(model.jdLv);
        self.expBar.value = model.jdExp;
        self.expBar.max = cfg1.exp;
        var costItem = VoItem.create(Model_HouseKeeper.costID);
        self.labNeedName.text = costItem.name;
        self.labNeedName.color = costItem.qColor;
        var count = Model_Bag.getItemCount(Model_HouseKeeper.costID);
        self.boxNeed.setImgUrl(costItem.icon);
        self.boxNeed.setCount(count);
        self.setNotice();
    };
    Child_JiaDing_UpJie.prototype.openPanel = function (pData) {
        var self = this;
        self.register(true);
        if (GGlobal.modelHouseKeeper.jdLv <= 0) {
            GGlobal.modelHouseKeeper.CG_HouseKeeper_openUI_11351();
        }
        else {
            self.updateShow();
        }
    };
    Child_JiaDing_UpJie.prototype.closePanel = function (pData) {
        var self = this;
        if (self.uiRole) {
            self.uiRole.onRemove();
            self.uiRole = null;
        }
        self.register(false);
    };
    Child_JiaDing_UpJie.prototype.register = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.HOME_JIADING, self.updateShow, self);
        GGlobal.reddot.register(pFlag, UIConst.HOME_JIADING, self.setNotice, self);
        EventUtil.register(pFlag, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
        EventUtil.register(pFlag, self.btnOnekey, egret.TouchEvent.TOUCH_TAP, self.onOneKey, self);
    };
    Child_JiaDing_UpJie.prototype.setNotice = function () {
        var s = this;
        s.btnUp.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 1);
        s.btnOnekey.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 1);
    };
    Child_JiaDing_UpJie.prototype.onUp = function () {
        var cfg = Config.fdsj_019[GGlobal.homemodel.home_level];
        var model = GGlobal.modelHouseKeeper;
        if (Math.floor((model.jdLv + 1) / 10) > cfg.jiading) {
            return ViewCommonWarn.text("府邸等级不足");
        }
        var count = Model_Bag.getItemCount(Model_HouseKeeper.costID);
        if (count > 0) {
            model.CG_HouseKeeper_upHouseKeeperLevel_11355(1);
        }
        else {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_HouseKeeper.costID));
        }
    };
    Child_JiaDing_UpJie.prototype.onOneKey = function () {
        var cfg = Config.fdsj_019[GGlobal.homemodel.home_level];
        var model = GGlobal.modelHouseKeeper;
        if (Math.floor((model.jdLv + 1) / 10) > cfg.jiading) {
            return ViewCommonWarn.text("府邸等级不足");
        }
        var count = Model_Bag.getItemCount(Model_HouseKeeper.costID);
        if (count > 0) {
            model.CG_HouseKeeper_upHouseKeeperLevel_11355(2);
        }
        else {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_HouseKeeper.costID));
        }
    };
    Child_JiaDing_UpJie.URL = "ui://ypo8uejwctaj1";
    return Child_JiaDing_UpJie;
}(fairygui.GComponent));
__reflect(Child_JiaDing_UpJie.prototype, "Child_JiaDing_UpJie", ["IPanel"]);
