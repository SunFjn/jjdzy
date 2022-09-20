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
var VZhuanPanReward = (function (_super) {
    __extends(VZhuanPanReward, _super);
    function VZhuanPanReward() {
        return _super.call(this) || this;
    }
    VZhuanPanReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "VZhuanPanReward"));
    };
    VZhuanPanReward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.list = (this.getChild("list"));
        this.lbName = (this.getChild("lbName"));
        this.imgNo = (this.getChild("imgNo"));
        this.lbCt = (this.getChild("lbCt"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
    };
    VZhuanPanReward.prototype.setVo = function (v, index) {
        this.lbRank.text = "" + (index + 1);
        if (v) {
            this.lbName.text = v.na;
            this.lbCt.text = "转盘次数：" + v.ct;
            this.imgNo.visible = false;
        }
        else {
            this.lbName.text = "";
            this.lbCt.text = "";
            this.imgNo.visible = true;
        }
        var cfg = ModelSGQD.getRankCfg(ModelSGQD.zpQs, index + 1);
        if (cfg) {
            this._arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        }
        else {
            this._arr = [];
        }
        this.list.numItems = this._arr.length;
    };
    VZhuanPanReward.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = this._arr[index];
        grid.vo = v;
        grid.tipEnabled = true;
        grid.showEff(true);
    };
    VZhuanPanReward.prototype.clean = function () {
        this.list.numItems = 0;
    };
    VZhuanPanReward.URL = "ui://kdt501v2ioin13";
    return VZhuanPanReward;
}(fairygui.GComponent));
__reflect(VZhuanPanReward.prototype, "VZhuanPanReward");
