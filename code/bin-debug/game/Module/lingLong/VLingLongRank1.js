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
var VLingLongRank1 = (function (_super) {
    __extends(VLingLongRank1, _super);
    function VLingLongRank1() {
        return _super.call(this) || this;
    }
    VLingLongRank1.createInstance = function () {
        return (fairygui.UIPackage.createObject("lingLong", "VLingLongRank1"));
    };
    VLingLongRank1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.labName = (this.getChild("labName"));
        this.labRank = (this.getChild("labRank"));
        this.labPoint = (this.getChild("labPoint"));
        this.list = (this.getChild("list"));
        this.imgSelf = (this.getChild("imgSelf"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    // private _listData2: Array<any>;
    VLingLongRank1.prototype.setVo = function (v, index, isLast) {
        if (isLast === void 0) { isLast = false; }
        this._vo = v;
        var rankCfg = null;
        this.imgSelf.visible = false;
        var rankId = isLast ? Model_LingLong.rankLast1Id : Model_LingLong.cfgId;
        if (v) {
            this.labName.text = v.rankId ? "S" + v.rankId : "";
            this.labPoint.text = "积分：" + v.point;
            if (v.status == 1) {
                this.imgSelf.visible = true; //是自己
            }
        }
        else {
            this.labName.text = "暂无";
            this.labPoint.text = "";
            this.labRank.text = "";
        }
        this.labRank.text = "第" + (index + 1) + "名";
        rankCfg = Model_LingLong.getLLGRank1(rankId, index + 1);
        if (rankCfg && rankCfg.rewardArr1 == null) {
            rankCfg.rewardArr1 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward1));
        }
        this._listData1 = rankCfg ? rankCfg.rewardArr1 : [];
        this.list.numItems = this._listData1.length;
    };
    VLingLongRank1.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData1[index];
    };
    VLingLongRank1.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VLingLongRank1.URL = "ui://1xperbsydhj5n";
    return VLingLongRank1;
}(fairygui.GComponent));
__reflect(VLingLongRank1.prototype, "VLingLongRank1");
