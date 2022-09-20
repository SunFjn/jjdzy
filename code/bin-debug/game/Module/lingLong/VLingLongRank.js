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
var VLingLongRank = (function (_super) {
    __extends(VLingLongRank, _super);
    function VLingLongRank() {
        return _super.call(this) || this;
    }
    VLingLongRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("lingLong", "VLingLongRank"));
    };
    VLingLongRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.labName = (this.getChild("labName"));
        this.labRank = (this.getChild("labRank"));
        this.labPoint = (this.getChild("labPoint"));
        this.btnReward = (this.getChild("btnReward"));
        this.list = (this.getChild("list"));
        this.imgNo = (this.getChild("imgNo"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.btnReward.addClickListener(this.onReward, this);
    };
    VLingLongRank.prototype.setVo = function (v, index, isLast) {
        if (isLast === void 0) { isLast = false; }
        this._vo = v;
        var rankCfg;
        var rankId = isLast ? Model_LingLong.rankLastId : Model_LingLong.rankId;
        if (v) {
            this.labName.text = v.name;
            this.labPoint.text = "积分：" + v.point;
            rankCfg = Config.llgrank_239[v.rankId];
            this.imgNo.visible = false;
        }
        else {
            this.labName.text = "";
            this.labPoint.text = "";
            rankCfg = Model_LingLong.getLLgCfg(rankId, index + 1);
            this.imgNo.visible = true;
        }
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
    VLingLongRank.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData1[index];
    };
    VLingLongRank.prototype.onReward = function () {
        GGlobal.layerMgr.open(UIConst.LING_LONG_REWARD, { award: this._listData2, type: 2 });
    };
    VLingLongRank.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VLingLongRank.URL = "ui://1xperbsykaqa4";
    return VLingLongRank;
}(fairygui.GComponent));
__reflect(VLingLongRank.prototype, "VLingLongRank");
