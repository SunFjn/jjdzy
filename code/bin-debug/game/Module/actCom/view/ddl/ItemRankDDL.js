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
var ItemRankDDL = (function (_super) {
    __extends(ItemRankDDL, _super);
    function ItemRankDDL() {
        return _super.call(this) || this;
    }
    ItemRankDDL.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_DDL", "ItemRankDDL"));
    };
    ItemRankDDL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    ItemRankDDL.prototype.setVo = function (vo, index, qs) {
        var self = this;
        if (index < 3) {
            self.rankImg.url = CommonManager.getCommonUrl("rank_" + (index + 1));
            self.rankImg.visible = true;
            self.lbRank.text = "";
        }
        else {
            self.lbRank.text = "第" + (index + 1) + "名";
            self.rankImg.visible = false;
        }
        if (vo) {
            self.c1.selectedIndex = 1;
            self.lbName.text = vo.name;
            self.lbCount.text = "对出" + vo.count + "联";
        }
        else {
            self.c1.selectedIndex = 0;
        }
        var cfg = Model_ActComDDL.getddlpmCfg(qs, index + 1);
        if (cfg) {
            var award = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
            self._listData = award;
        }
        self.list.numItems = self._listData.length;
    };
    ItemRankDDL.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    ItemRankDDL.URL = "ui://ke8qv0ckxn888";
    return ItemRankDDL;
}(fairygui.GComponent));
__reflect(ItemRankDDL.prototype, "ItemRankDDL");
