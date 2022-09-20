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
var ActCom_CZPHItem = (function (_super) {
    __extends(ActCom_CZPHItem, _super);
    function ActCom_CZPHItem() {
        return _super.call(this) || this;
    }
    ActCom_CZPHItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActComCZPH", "ActCom_CZPHItem"));
    };
    ActCom_CZPHItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    ActCom_CZPHItem.prototype.renderHandler = function (index, grid) {
        grid.isShowEff = true;
        grid.tipEnabled = true;
        grid.vo = this.rewardArr[index];
    };
    ActCom_CZPHItem.prototype.setVo = function (cfg) {
        var self = this;
        var rankArr = JSON.parse(cfg.rank);
        self.nameLb.visible = false;
        if (rankArr[0][0] != rankArr[0][1]) {
            self.rankLb.text = ConfigHelp.reTxt("第{0}-{1}名", rankArr[0][0], rankArr[0][1]);
        }
        else {
            if (rankArr[0][0] == 2) {
                self.nameLb.visible = true;
                self.nameLb.text = GGlobal.modelczph.rankArr[1][1] + "";
            }
            self.rankLb.text = ConfigHelp.reTxt("第{0}名", rankArr[0][0]);
        }
        self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.tips));
        self.list.numItems = self.rewardArr.length;
        IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "720901.png");
    };
    ActCom_CZPHItem.prototype.clean = function () {
        var self = this;
        self.list.numItems = 0;
        IconUtil.setImg(self.backImg, null);
    };
    ActCom_CZPHItem.URL = "ui://q5asybs1k1rz6";
    return ActCom_CZPHItem;
}(fairygui.GComponent));
__reflect(ActCom_CZPHItem.prototype, "ActCom_CZPHItem");
