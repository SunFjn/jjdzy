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
var PoolPreItem = (function (_super) {
    __extends(PoolPreItem, _super);
    function PoolPreItem() {
        return _super.call(this) || this;
    }
    PoolPreItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "PoolPreItem"));
    };
    PoolPreItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.setVirtual();
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
    };
    PoolPreItem.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.showEff(true);
        item.tipEnabled = true;
    };
    PoolPreItem.prototype.clean = function () {
        this.list.numItems = 0;
    };
    PoolPreItem.prototype.setdata = function (id, max) {
        var cfg = Config.fddc_019[max - id];
        var self = this;
        self.lbName.url = ["", "ui://y0plc878g2m4y", "ui://y0plc878g2m414", "ui://y0plc878g2m413", "ui://y0plc878g2m411"][cfg.dangci];
        self.awards = ConfigHelp.makeItemListArr(cfg.qdzs);
        self.list.numItems = self.awards.length;
        self.lbCondition.text = "解锁：<font color='#FFC344'>" + cfg.name + "</font>";
        self.lbCost.text = "消耗：<font color='#15f234'>" + cfg.tglxh + "积分/次</font>";
    };
    PoolPreItem.URL = "ui://y0plc878ye038";
    return PoolPreItem;
}(fairygui.GComponent));
__reflect(PoolPreItem.prototype, "PoolPreItem");
