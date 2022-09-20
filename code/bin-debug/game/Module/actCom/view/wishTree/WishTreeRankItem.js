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
var WishTreeRankItem = (function (_super) {
    __extends(WishTreeRankItem, _super);
    function WishTreeRankItem() {
        return _super.call(this) || this;
    }
    WishTreeRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_WishTree", "WishTreeRankItem"));
    };
    WishTreeRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.itemRenderer = s.renderHandle;
        s.list.callbackThisObj = this;
        s.list.setVirtual();
        s.btnReward.addClickListener(s.onReward, s);
    };
    WishTreeRankItem.prototype.setVo = function (v, index, qs) {
        this._vo = v;
        var rankCfg;
        if (v) {
            this.c1.selectedIndex = 1;
            this.labName.text = v.name;
            this.labPoint.text = "许愿次数：" + v.wish;
            this.imgNo.visible = false;
        }
        else {
            this.c1.selectedIndex = 0;
            // this.labName.text = "虚位以待";
            this.labPoint.text = "";
            this.imgNo.visible = true;
        }
        rankCfg = Model_WishTree.getxyspmCfg(qs, index + 1);
        if (rankCfg && rankCfg.rewardArr1 == null) {
            rankCfg.rewardArr1 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward1));
        }
        if (rankCfg && rankCfg.rewardArr2 == null) {
            rankCfg.rewardArr2 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward2));
        }
        this._listData2 = rankCfg ? rankCfg.rewardArr2 : [];
        this._listData1 = rankCfg ? rankCfg.rewardArr1 : [];
        this.list.numItems = this._listData1.length;
        this.labRank.text = "第" + (index + 1) + "名";
    };
    WishTreeRankItem.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData1[index];
    };
    WishTreeRankItem.prototype.onReward = function () {
        GGlobal.layerMgr.open(UIConst.WISHTREE_REW, { award: this._listData2, type: 2 });
    };
    WishTreeRankItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    WishTreeRankItem.URL = "ui://zyevj37nlwy28";
    return WishTreeRankItem;
}(fairygui.GComponent));
__reflect(WishTreeRankItem.prototype, "WishTreeRankItem");
