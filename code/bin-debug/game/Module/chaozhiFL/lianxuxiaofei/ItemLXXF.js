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
var ItemLXXF = (function (_super) {
    __extends(ItemLXXF, _super);
    function ItemLXXF() {
        return _super.call(this) || this;
    }
    ItemLXXF.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    Object.defineProperty(ItemLXXF.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (day) {
            var self = this;
            var model = GGlobal.modelLXXF;
            self._data = day;
            self.tab.text = "\u7B2C" + StrFilter.getChineseNum(day) + "\u5929";
            var info = model.datas[day];
            var costYB = TimeUitl.isIn7Days() ? Config.lxxf1_737[info.day].xiaohao : Config.lxxf2_737[info.day].xiaohao;
            var state = info.costYB >= costYB && info.state == 0 ? 1 : -1;
            switch (state) {
                case 1:
                    self.iconBu.visible = false;
                    self.tab.checkNotice = true;
                    break;
                case -1:
                    if (TimeUitl.isIn7Days()) {
                        var dayHasPassed = Model_GlobalMsg.kaifuDay > day;
                    }
                    else {
                        var kfDay = model.kaifuDay;
                        var realDay = kfDay % 7 == 0 ? 7 : kfDay % 7 >> 0;
                        dayHasPassed = realDay > day;
                    }
                    self.iconBu.visible = dayHasPassed && info.state == 0;
                    self.tab.checkNotice = false;
                    break;
            }
            // if (day == model.DAY_SEVEN) {
            //     const dayFined = model.dayFinished();
            //     self.tab.checkNotice = dayFined == model.DAY_SEVEN && model.bigGiftGotSt == 0;
            // }
        },
        enumerable: true,
        configurable: true
    });
    ItemLXXF.prototype.setSelected = function (value) {
        this.tab.selected = value;
    };
    ItemLXXF.URL = "ui://qzsojhcrtt6c15";
    return ItemLXXF;
}(fairygui.GComponent));
__reflect(ItemLXXF.prototype, "ItemLXXF");
