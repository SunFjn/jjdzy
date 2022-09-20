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
var ItemLXX814 = (function (_super) {
    __extends(ItemLXX814, _super);
    function ItemLXX814() {
        return _super.call(this) || this;
    }
    ItemLXX814.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    Object.defineProperty(ItemLXX814.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (day) {
            var self = this;
            var model = GGlobal.modelLXX814;
            var info = model.datas[day - 1];
            self._data = day;
            self.tab.text = "\u7B2C" + StrFilter.getChineseNum(day) + "\u5929";
            var costYB = null;
            var state = info.state;
            if (info) {
                costYB = Config.lxxf3_737[info.day].xiaohao;
                // state = info.costYB >= costYB && info.state == 0 ? 1 : -1;
            }
            switch (state) {
                case 1:
                    self.iconBu.visible = false;
                    self.tab.checkNotice = false;
                    break;
                case -1:
                    var dayHasPassed = model.day > day;
                    self.iconBu.visible = dayHasPassed && info.state == 0;
                    self.tab.checkNotice = false;
                    break;
                case 0:
                    self.iconBu.visible = false;
                    self.tab.checkNotice = info.costYB >= costYB && model.day >= day;
                    break;
                case 2:
                    self.iconBu.visible = true;
                    self.tab.checkNotice = false;
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemLXX814.prototype.setSelected = function (value) {
        this.tab.selected = value;
    };
    ItemLXX814.URL = "ui://qzsojhcrtt6c15";
    return ItemLXX814;
}(fairygui.GComponent));
__reflect(ItemLXX814.prototype, "ItemLXX814");
