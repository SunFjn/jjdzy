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
var ZSSFGeneralGoItem = (function (_super) {
    __extends(ZSSFGeneralGoItem, _super);
    function ZSSFGeneralGoItem() {
        return _super.call(this) || this;
    }
    ZSSFGeneralGoItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ZSSFGeneralGoItem"));
    };
    ZSSFGeneralGoItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ZSSFGeneralGoItem.prototype.onShow = function (cfg) {
        var self = this;
        self.cfg = cfg;
        ImageLoader.instance.loader(Enum_Path.HEAD_URL + cfg.head + ".png", self.imgIcon);
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + Model_WuJiang.getHeroQuality(cfg) + ".png", self.bg);
        self.starLb.text = Model_WuJiang.wuJiangStar[cfg.type] + "";
        self.nameLb.text = cfg.name;
        self.nameLb.color = Color.getColorInt(cfg.pinzhi);
        var perValue = 0;
        switch (cfg.pinzhi) {
            case 3:
                perValue = 8003;
                break;
            case 4:
                perValue = 8008;
                break;
            case 5:
                perValue = 8009;
                break;
            case 6:
            case 7:
                perValue = 8010;
                break;
            default:
                perValue = 8011;
                break;
        }
        self.perLb.text = "品质加成：" + cfg.pinzhi * (Config.xtcs_004[8002].num / 1000) + "%\n" + "星级加成：" +
            Model_WuJiang.getWuJiangStarByJob(cfg.type) * (Config.xtcs_004[perValue].num / 1000) + "%";
    };
    ZSSFGeneralGoItem.prototype.clean = function () {
    };
    ZSSFGeneralGoItem.URL = "ui://3o8q23uucenr19";
    return ZSSFGeneralGoItem;
}(fairygui.GButton));
__reflect(ZSSFGeneralGoItem.prototype, "ZSSFGeneralGoItem");
