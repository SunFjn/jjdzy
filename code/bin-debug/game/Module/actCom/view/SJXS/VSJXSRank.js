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
var VSJXSRank = (function (_super) {
    __extends(VSJXSRank, _super);
    function VSJXSRank() {
        return _super.call(this) || this;
    }
    VSJXSRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SJXS", "VSJXSRank"));
    };
    VSJXSRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    VSJXSRank.prototype.renderHandler = function (index, grid) {
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = this.showData[index];
    };
    VSJXSRank.prototype.setVo = function (rank, cfg) {
        var self = this;
        var model = GGlobal.modelsjxs;
        var rankData = model.rankDic[rank];
        self.labRank.text = rank + "";
        self.showData = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self.showData.length;
        if (rankData) {
            self.imgNo.visible = false;
            self.labName.text = rankData.name;
            self.labPoint.text = "抽奖：" + rankData.num + "次";
        }
        else {
            self.labName.text = "";
            self.labPoint.text = "";
            self.imgNo.visible = true;
        }
    };
    VSJXSRank.prototype.clean = function () {
        var self = this;
        self.list.numItems = 0;
    };
    VSJXSRank.URL = "ui://iwvd88mqr3jee";
    return VSJXSRank;
}(fairygui.GComponent));
__reflect(VSJXSRank.prototype, "VSJXSRank");
