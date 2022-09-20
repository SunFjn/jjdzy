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
var Child_JiaDing_JinSheng = (function (_super) {
    __extends(Child_JiaDing_JinSheng, _super);
    function Child_JiaDing_JinSheng() {
        return _super.call(this) || this;
    }
    Child_JiaDing_JinSheng.createInstance = function () {
        return (fairygui.UIPackage.createObject("JiaDing", "Child_JiaDing_JinSheng"));
    };
    Child_JiaDing_JinSheng.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Child_JiaDing_JinSheng.prototype.initView = function (pParent) {
        var self = this;
    };
    Child_JiaDing_JinSheng.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelHouseKeeper;
        var cfg = Config.jdjins_021[model.jdID];
        self.curItem.setVo(cfg);
        self.labPower.text = cfg.power + "";
        if (cfg.next > 0) {
            self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            var nextcfg = Config.jdjins_021[cfg.next];
            self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            var costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg.xiaohao))[0];
            var count = Model_Bag.getItemCount(costItem.id);
            self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(costItem.name, Color.getColorStr(costItem.quality)) + "X"
                + costItem.count + HtmlUtil.fontNoSize("(" + count + "/" + costItem.count + ")", Color.getColorStr(count >= costItem.count ? 2 : 6));
            self.nextItem.setVo(nextcfg);
            self.c1.selectedIndex = 0;
        }
        else {
            self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.c1.selectedIndex = 1;
        }
        self.setNotice();
    };
    Child_JiaDing_JinSheng.prototype.openPanel = function (pData) {
        var self = this;
        if (GGlobal.modelHouseKeeper.jdLv > 0) {
            self.updateShow();
        }
        else {
            GGlobal.modelHouseKeeper.CG_HouseKeeper_openUI_11351();
        }
        self.register(true);
    };
    Child_JiaDing_JinSheng.prototype.closePanel = function (pData) {
        var self = this;
        self.curItem.clean();
        self.nextItem.clean();
        self.register(false);
    };
    Child_JiaDing_JinSheng.prototype.register = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.HOME_JIADING, self.updateShow, self);
        EventUtil.register(pFlag, self.btnOnekey, egret.TouchEvent.TOUCH_TAP, self.onJingSheng, self);
        GGlobal.reddot.register(pFlag, UIConst.HOME_JIADING, self.setNotice, self);
    };
    Child_JiaDing_JinSheng.prototype.setNotice = function () {
        var s = this;
        s.btnOnekey.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 2);
    };
    Child_JiaDing_JinSheng.prototype.onJingSheng = function () {
        var self = this;
        var model = GGlobal.modelHouseKeeper;
        var cfg = Config.jdjins_021[model.jdID];
        if (model.jdLv >= cfg.tiaojian) {
            var costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg.xiaohao))[0];
            var count = Model_Bag.getItemCount(costItem.id);
            if (count >= costItem.count) {
                model.CG_HouseKeeper_upHouseKeeper_11353();
            }
            else {
                View_CaiLiao_GetPanel.show(costItem);
            }
        }
        else {
            ViewCommonWarn.text(ConfigHelp.reTxt("家丁达到{0}可晋升", Config.jdsj_021[cfg.tiaojian].jie));
        }
    };
    Child_JiaDing_JinSheng.URL = "ui://ypo8uejwctaj2";
    return Child_JiaDing_JinSheng;
}(fairygui.GComponent));
__reflect(Child_JiaDing_JinSheng.prototype, "Child_JiaDing_JinSheng", ["IPanel"]);
