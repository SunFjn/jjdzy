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
var WMSZ_ShowItem = (function (_super) {
    __extends(WMSZ_ShowItem, _super);
    function WMSZ_ShowItem() {
        return _super.call(this) || this;
    }
    WMSZ_ShowItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_WMSZ", "WMSZ_ShowItem"));
    };
    WMSZ_ShowItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    WMSZ_ShowItem.prototype.setData = function (cfg) {
        var s = this;
        if (!cfg)
            return;
        var dataArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.item));
        var itemName = dataArr[0].name;
        s.lab.text = itemName + "：" + cfg.point + "积分/个";
    };
    WMSZ_ShowItem.URL = "ui://5na9ulpxgv3t9";
    return WMSZ_ShowItem;
}(fairygui.GComponent));
__reflect(WMSZ_ShowItem.prototype, "WMSZ_ShowItem");
