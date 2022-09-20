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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ItemHomeRank = (function (_super) {
    __extends(ItemHomeRank, _super);
    function ItemHomeRank() {
        var _this = _super.call(this) || this;
        _this._idx = 0;
        return _this;
    }
    ItemHomeRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ItemHomeRank"));
    };
    ItemHomeRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ItemHomeRank.prototype.setdata = function (idx) {
        var data = GGlobal.homemodel.homeRank_data[idx];
        var self = this;
        self.n3.setdata(data.head, data.level, null, null, false, data.headGrid);
        self.lbName.text = data.name;
        self._idx = data.id;
        var CFG = Config.fddc_019[data.homeType];
        var lib = Config.fdrank_019;
        for (var i in lib) {
            if (lib[i].pm1 <= data.rank && lib[i].pm2 >= data.rank) {
                self.lbAwards.text = "奖励：" + ConfigHelp.makeItemRewardText(lib[i].award) + "/天";
                break;
            }
        }
        self.imgTip.visible = data.event == 1 && GGlobal.homemodel.helpTime > 0;
        self.lbHomeType.text = CFG.name + "(等级：" + data.homeLv + ")";
        self.lbHomeType.color = [1, Color.BLURINT, 0xFF00FF, Color.YELLOWINT, Color.REDINT][data.homeType];
        self.lbRank.text = data.rank + "";
        self.imgRank.visible = data.rank < 4;
        self.lbRank.visible = data.rank > 3;
        self.btnEnter.visible = self.imgTip.visible = data.id != Model_player.voMine.id;
        self.imgRank.url = CommonManager.getCommonUrl("rank_" + data.rank);
        self.btnEnter.addClickListener(self.enterHD, self);
        var st = 3;
        if (GGlobal.homemodel.home_masterID == data.id && !GGlobal.homemodel.isSelfHome) {
            st = 2;
        }
        if (Model_player.voMine.id == data.id) {
            st = 1;
        }
        self.lbHome.visible = st == 1;
        self.lbInHome.visible = st == 2;
        self.n11.visible = st == 3;
    };
    ItemHomeRank.prototype.clean = function () {
        this.btnEnter.removeClickListener(this.enterHD, this);
    };
    ItemHomeRank.prototype.enterHD = function () {
        GGlobal.homemodel.CG_House_gotoRoom_11119(this._idx);
    };
    ItemHomeRank.URL = "ui://y0plc878sbl7e";
    return ItemHomeRank;
}(fairygui.GComponent));
__reflect(ItemHomeRank.prototype, "ItemHomeRank");
