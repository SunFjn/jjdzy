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
var VCangBaoGeRank = (function (_super) {
    __extends(VCangBaoGeRank, _super);
    function VCangBaoGeRank() {
        return _super.call(this) || this;
    }
    VCangBaoGeRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("cangbaoge", "VCangBaoGeRank"));
    };
    VCangBaoGeRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.labName = (this.getChild("labName"));
        this.labRank = (this.getChild("labRank"));
        this.labPoint = (this.getChild("labPoint"));
        this.list = (this.getChild("list"));
        this.btnReward = (this.getChild("btnReward"));
        this.imgNo = (this.getChild("imgNo"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.btnReward.addClickListener(this.onReward, this);
    };
    VCangBaoGeRank.prototype.setVo = function (v, index, isLast) {
        if (isLast === void 0) { isLast = false; }
        this._vo = v;
        var rankCfg;
        if (v) {
            this.labName.text = v.pName;
            this.labPoint.text = "抽奖次数：" + v.ct;
            this.imgNo.visible = false;
        }
        else {
            this.labName.text = "";
            this.labPoint.text = "";
            this.imgNo.visible = true;
        }
        var cbgRankQs = isLast ? GGlobal.modelActivityHall.cbgRankLastQs : GGlobal.modelActivityHall.cbgRankQs;
        if (Model_ActivityHall.cbgIsKuaF()) {
            rankCfg = Model_ActivityHall.getCbgCfg2(cbgRankQs, index + 1);
        }
        else {
            rankCfg = Model_ActivityHall.getCbgCfg1(cbgRankQs, index + 1);
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
    VCangBaoGeRank.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData1[index];
    };
    VCangBaoGeRank.prototype.onReward = function () {
        GGlobal.layerMgr.open(UIConst.CANGBAOGE_REW, { award: this._listData2, type: 2 });
    };
    VCangBaoGeRank.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VCangBaoGeRank.URL = "ui://1tr9e6d8z8fv18";
    return VCangBaoGeRank;
}(fairygui.GComponent));
__reflect(VCangBaoGeRank.prototype, "VCangBaoGeRank");
