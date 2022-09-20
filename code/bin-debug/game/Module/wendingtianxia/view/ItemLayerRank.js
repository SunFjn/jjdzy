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
var ItemLayerRank = (function (_super) {
    __extends(ItemLayerRank, _super);
    function ItemLayerRank() {
        var _this = _super.call(this) || this;
        _this.idx = 0;
        return _this;
    }
    ItemLayerRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ItemLayerRank"));
    };
    ItemLayerRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n10 = (this.getChild("n10"));
        this.n12 = (this.getChild("n12"));
        this.lbLayer = (this.getChild("lbLayer"));
        this.lbCondition = (this.getChild("lbCondition"));
        this.n3 = (this.getChild("n3"));
        this.n4 = (this.getChild("n4"));
        this.lbWDC = (this.getChild("lbWDC"));
        this.n6 = (this.getChild("n6"));
        this.imgYlq = (this.getChild("imgYlq"));
        this.lbCondition_2 = (this.getChild("lbCondition_2"));
        this.grids = [this.n3, this.n4];
    };
    ItemLayerRank.prototype.clean = function () {
        for (var i = 0; i < 2; i++) {
            this.grids[i].tipEnabled = false;
            this.grids[i].showEff(false);
        }
        this.n6.removeClickListener(this.lqHD, this);
    };
    ItemLayerRank.prototype.lqHD = function () {
        GGlobal.modelWenDingTX.layerAwards4221(this.idx);
    };
    ItemLayerRank.prototype.setdata = function (data) {
        this.n6.addClickListener(this.lqHD, this);
        var s = this;
        var idx;
        this.idx = idx = data[0];
        var cfg = Config.wdtx_260[idx];
        s.lbLayer.text = BroadCastManager.reTxt("第{0}层", cfg.id);
        // if (idx > 1) {
        // 	s.lbCondition.text = BroadCastManager.reTxt("进入积分：{0}", Config.wdtx_260[idx - 1].next);
        // } else {
        // 	s.lbCondition.text = BroadCastManager.reTxt("进入积分：{0}", 0);
        // }
        s.lbCondition.text = "";
        s.lbCondition_2.text = "收益：" + ConfigHelp.makeItemRewardText(cfg.reward);
        var isCrossActg = GGlobal.modelWenDingTX.getActivityIsCross();
        var awards = isCrossActg ? cfg.reward1 : cfg.reward2;
        awards = JSON.parse(awards);
        var floorAward = ConfigHelp.makeItemListArr(awards);
        for (var i = 0; i < 2; i++) {
            this.grids[i].tipEnabled = false;
            if (i < floorAward.length) {
                this.grids[i].vo = floorAward[i];
                this.grids[i].tipEnabled = true;
                this.grids[i].showEff(true);
                this.grids[i].visible = true;
            }
            else {
                this.grids[i].vo = floorAward[i];
                this.grids[i].showEff(false);
                this.grids[i].visible = false;
            }
        }
        var st = data[1];
        s.imgYlq.visible = st == 2;
        s.n6.visible = st == 1;
        s.lbWDC.visible = st == 0;
    };
    ItemLayerRank.URL = "ui://gxs8kn67fl2ha";
    return ItemLayerRank;
}(fairygui.GComponent));
__reflect(ItemLayerRank.prototype, "ItemLayerRank");
