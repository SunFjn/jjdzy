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
var Item_ActCom_WMSZ = (function (_super) {
    __extends(Item_ActCom_WMSZ, _super);
    function Item_ActCom_WMSZ() {
        return _super.call(this) || this;
    }
    Item_ActCom_WMSZ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.itemRenderer = s.renderHandle;
        s.list.callbackThisObj = s;
        s.list.setVirtual();
    };
    Item_ActCom_WMSZ.prototype.setData = function (index, qs) {
        var self = this;
        var model = GGlobal.model_ActWMSZ;
        if (index < 3) {
            self.rankImg.url = CommonManager.getCommonUrl("rank_" + (index + 1));
            self.rankImg.visible = true;
            self.labRank.text = "";
        }
        else {
            self.labRank.text = "第" + (index + 1) + "名";
            self.rankImg.visible = false;
        }
        var vo = model.rankArr[index];
        if (vo) {
            self.c1.selectedIndex = 1;
            self.labName.text = vo.name;
            if (model.myRank == index + 1) {
                self.labName.color = Color.GREENINT;
            }
            else {
                self.labName.color = Color.WHITEINT;
            }
            self.labIntegral.text = "积分：" + vo.integral;
        }
        else {
            self.c1.selectedIndex = 0;
        }
        var curCfg;
        for (var key in Config.wmpm_779) {
            var cfg = Config.wmpm_779[key];
            var start = ConfigHelp.SplitStr(cfg.rank)[0][0];
            var end = ConfigHelp.SplitStr(cfg.rank)[0][1];
            if (qs == Math.floor(cfg.id / 100) && (index + 1) >= start && (index + 1) <= end) {
                curCfg = cfg;
            }
        }
        self._listData = [];
        if (curCfg) {
            self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(curCfg.reward1));
        }
        self.list.numItems = self._listData.length;
    };
    Item_ActCom_WMSZ.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    Item_ActCom_WMSZ.prototype.clean = function () {
        var self = this;
        _super.prototype.clean.call(this);
        self.list.numItems = 0;
        self.rankImg.url = "";
    };
    Item_ActCom_WMSZ.URL = "ui://5na9ulpx8a0y1";
    return Item_ActCom_WMSZ;
}(fairygui.GComponent));
__reflect(Item_ActCom_WMSZ.prototype, "Item_ActCom_WMSZ");
