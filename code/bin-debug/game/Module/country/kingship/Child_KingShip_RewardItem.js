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
var Child_KingShip_RewardItem = (function (_super) {
    __extends(Child_KingShip_RewardItem, _super);
    function Child_KingShip_RewardItem() {
        return _super.call(this) || this;
    }
    Child_KingShip_RewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "Child_KingShip_RewardItem"));
    };
    Child_KingShip_RewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.gridArr = [self.grid0, self.grid1, self.grid2];
    };
    Child_KingShip_RewardItem.prototype.setData = function (value) {
        var self = this;
        var id = Model_player.voMine.country * 1000 + value;
        var cfg = Config.xwwzdjl_311[id];
        self.vo = cfg;
        var titleArr = JSON.parse(Config.xtcs_004[1067].other);
        if (titleArr[Model_player.voMine.country - 1].length >= value) {
            var cfgCH = Config.chenghao_702[titleArr[Model_player.voMine.country - 1][value - 1]];
            ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfgCH.picture + ".png", self.titleIcon);
        }
        else {
            self.titleIcon.url = value == 5 ? "ui://uwzc58njapr12w" : "ui://uwzc58njqnae1e";
        }
    };
    Child_KingShip_RewardItem.prototype.updateShow = function (value) {
        var self = this;
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(self.vo.reward));
        for (var i = 0; i < self.gridArr.length; i++) {
            if (i < rewardArr.length) {
                self.gridArr[i].vo = rewardArr[i];
                self.gridArr[i].tipEnabled = self.gridArr[i].visible = true;
                self.gridArr[i].showEff(true);
            }
            else {
                self.gridArr[i].visible = false;
            }
        }
        // self.backImg.url = value ? "ui://uwzc58njmr752v" : "ui://jvxpx9emoo0o3ct";
        self.imgSel.visible = value;
    };
    Child_KingShip_RewardItem.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.gridArr);
    };
    Child_KingShip_RewardItem.URL = "ui://uwzc58njjd2n2t";
    return Child_KingShip_RewardItem;
}(fairygui.GComponent));
__reflect(Child_KingShip_RewardItem.prototype, "Child_KingShip_RewardItem");
