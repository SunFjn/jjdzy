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
var WuShengItem = (function (_super) {
    __extends(WuShengItem, _super);
    function WuShengItem() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        _this.tabID = 0;
        return _this;
    }
    WuShengItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("wushengList", "WuShengItem"));
    };
    WuShengItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.gridArr = [self["grid0"], self["grid1"], self["grid2"], self["grid3"]];
        self.lookBt.addClickListener(self.onLook, self);
    };
    WuShengItem.prototype.onLook = function () {
        GGlobal.layerMgr.open(UIConst.WUSHENGLIST_RANK, this.tabID);
    };
    //玩家idU:玩家姓名L:玩家战力B:排名
    WuShengItem.prototype.show = function (arr, index, rank) {
        var self = this;
        var cfg = Config.ws_238[index];
        self.tabID = index;
        if (rank <= 3) {
            self.nameLb.visible = self.powerLb.visible = true;
            self.rankLb.visible = false;
            var conditionLbArr = JSON.parse(cfg.tips);
            var conditionArr = JSON.parse(cfg.yq);
            if (arr) {
                self.nameLb.text = arr[1] + "";
                self.powerLb.text = cfg.name + ":" + arr[2];
            }
            else {
                self.nameLb.text = "虚位以待";
                self.powerLb.text = "大奖条件:" + HtmlUtil.fontNoSize(conditionLbArr[0][0], Color.getColorStr(2));
            }
            self.nameLb.color = Color.getColorInt(6 - rank);
            var rewardArr = JSON.parse(cfg["reward" + rank]);
            for (var i = 0; i < self.gridArr.length; i++) {
                var grid = self.gridArr[i];
                if (i < rewardArr.length) {
                    grid.setVo(rewardArr[rewardArr.length - i - 1], arr && arr[2] >= conditionArr[0][1]);
                    grid.visible = true;
                }
                else {
                    grid.clean();
                    grid.visible = false;
                }
            }
        }
        else {
            self.nameLb.visible = self.powerLb.visible = false;
            self.rankGroup.visible = true;
            self.lookBt.visible = rank != 6;
            self.rankLb.text = rank == 6 ? "11-100名" : "4-10名";
            var rewardArr = JSON.parse(cfg["reward" + rank]);
            for (var i = 0; i < self.gridArr.length; i++) {
                var grid = self.gridArr[i];
                if (i < rewardArr.length) {
                    grid.setVo(rewardArr[i]);
                    grid.visible = true;
                }
                else {
                    grid.clean();
                    grid.visible = false;
                }
            }
        }
    };
    WuShengItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        for (var i = 0; i < s.gridArr.length; i++) {
            s.gridArr[i].clean();
        }
    };
    WuShengItem.URL = "ui://a8l39nm98hxb9";
    return WuShengItem;
}(fairygui.GComponent));
__reflect(WuShengItem.prototype, "WuShengItem");
