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
var VCrossWarsReward = (function (_super) {
    __extends(VCrossWarsReward, _super);
    function VCrossWarsReward() {
        return _super.call(this) || this;
    }
    VCrossWarsReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossWarsReward"));
    };
    VCrossWarsReward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.renderListItem;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
    };
    Object.defineProperty(VCrossWarsReward.prototype, "vo", {
        set: function (v) {
            var self = this;
            self._vo = v;
            var rank = v.id % 10;
            if (rank == 1) {
                self.lbRank.text = "冠军";
            }
            else if (rank == 2) {
                self.lbRank.text = "亚军";
            }
            else if (rank == 3) {
                self.lbRank.text = "4强";
            }
            else if (rank == 4) {
                self.lbRank.text = "8强";
            }
            else if (rank == 5) {
                self.lbRank.text = "16强";
            }
            if (v.rewardList == null) {
                v.rewardList = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward));
            }
            self.list.numItems = v.rewardList.length;
        },
        enumerable: true,
        configurable: true
    });
    VCrossWarsReward.prototype.renderListItem = function (index, obj) {
        var self = this;
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = self._vo.rewardList[index];
    };
    VCrossWarsReward.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VCrossWarsReward.URL = "ui://me1skowlhfct4a";
    return VCrossWarsReward;
}(fairygui.GComponent));
__reflect(VCrossWarsReward.prototype, "VCrossWarsReward");
