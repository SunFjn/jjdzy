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
var LootMineralItem = (function (_super) {
    __extends(LootMineralItem, _super);
    function LootMineralItem() {
        return _super.call(this) || this;
    }
    LootMineralItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "LootMineralItem"));
    };
    LootMineralItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.OnSelect(false);
    };
    LootMineralItem.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        self.singImg0.visible = Config.xtcs_004[6603].num - vo.myLoot > 0;
        IconUtil.setImg(self.mineIcon, Enum_Path.PIC_URL + "k" + vo.cfg.pz + ".png");
        self.nameIcon.url = CommonManager.getUrl("crossKing", "k" + vo.cfg.pz);
        if (Config.xtcs_004[6603].num - vo.myLoot <= 0) {
            self.singImg1.visible = Config.xtcs_004[6604].num - vo.mySteal > 0;
        }
        else {
            self.singImg1.visible = false;
        }
        self.checkNotice((Config.xtcs_004[6603].num - vo.myLoot > 0 && Model_CrossMineral.myLoot > 0)
            || (Config.xtcs_004[6604].num - vo.mySteal > 0 && Model_CrossMineral.mySteal > 0));
    };
    LootMineralItem.prototype.OnSelect = function (value) {
        this.selectImg.visible = value;
    };
    LootMineralItem.prototype.checkNotice = function (value) {
        this.noticeImg.visible = value;
    };
    LootMineralItem.prototype.clean = function () {
        IconUtil.setImg(this.mineIcon, null);
    };
    LootMineralItem.URL = "ui://yqpfulefnyv75f";
    return LootMineralItem;
}(fairygui.GComponent));
__reflect(LootMineralItem.prototype, "LootMineralItem");
