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
/**扫荡项 */
var ItemSJSD = (function (_super) {
    __extends(ItemSJSD, _super);
    function ItemSJSD() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.grids = [];
        _this.justifyHei = 200;
        return _this;
    }
    ItemSJSD.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ItemSJSD.prototype.setData = function (value) {
        var self = this;
        var id = value.mjId;
        var rewards = value.arr;
        self.title.text = Config.sjmjfb_258[id].name;
        if (self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        self.grids = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(rewards), self, 61, 86, true, false, 4, 120);
        self.justifyHei = self.grids.length < 5 ? 200 : 300;
    };
    Object.defineProperty(ItemSJSD.prototype, "height", {
        get: function () {
            return this.justifyHei;
        },
        enumerable: true,
        configurable: true
    });
    ItemSJSD.URL = "ui://yqpfulefrydj47";
    return ItemSJSD;
}(fairygui.GComponent));
__reflect(ItemSJSD.prototype, "ItemSJSD");
