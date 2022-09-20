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
var VActHolyBRank = (function (_super) {
    __extends(VActHolyBRank, _super);
    function VActHolyBRank() {
        return _super.call(this) || this;
    }
    VActHolyBRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "VActHolyBRank"));
    };
    VActHolyBRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.labName = (this.getChild("labName"));
        this.labRank = (this.getChild("labRank"));
        this.labPoint = (this.getChild("labPoint"));
        this.list = (this.getChild("list"));
        this.btnReward = (this.getChild("btnReward"));
        this.imgNo = (this.getChild("imgNo"));
        this.btnReward.addClickListener(this.onReward, this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.btnReward.addClickListener(this.onReward, this);
    };
    VActHolyBRank.prototype.setVo = function (v, index) {
        this._vo = v;
        var ply = GGlobal.modelSHXunbao.xbRankArr[index];
        this.labRank.text = "第" + (index + 1) + "名";
        this.labName.text = ply ? ply.pName : "";
        this.labPoint.text = ply ? "圈数：" + ply.quan : "";
        this.imgNo.visible = ply ? false : true;
        this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward));
        this.list.numItems = this._listData.length;
    };
    VActHolyBRank.prototype.onReward = function () {
        GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBREWARD, this._vo);
    };
    VActHolyBRank.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VActHolyBRank.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    VActHolyBRank.URL = "ui://4aepcdbwwg9y53";
    return VActHolyBRank;
}(fairygui.GComponent));
__reflect(VActHolyBRank.prototype, "VActHolyBRank");
