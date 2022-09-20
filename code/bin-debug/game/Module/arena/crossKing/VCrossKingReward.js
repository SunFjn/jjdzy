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
var VCrossKingReward = (function (_super) {
    __extends(VCrossKingReward, _super);
    function VCrossKingReward() {
        return _super.call(this) || this;
    }
    VCrossKingReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossKingReward"));
    };
    VCrossKingReward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbGrade = (this.getChild("lbGrade"));
        this.list = (this.getChild("list"));
        this.imgGrade = (this.getChild("imgGrade"));
        this.list.itemRenderer = this.renderListItem;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    Object.defineProperty(VCrossKingReward.prototype, "upVo", {
        set: function (v) {
            this._vo = v;
            this._type = 1;
            this.lbGrade.text = "" + v.name;
            this.lbGrade.color = Color.getColorInt(v.color);
            if (v.rewardArr == null) {
                v["reward1Arr"] = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward1));
            }
            this.list.numItems = v["reward1Arr"].length;
            this.imgGrade.url = fairygui.UIPackage.getItemURL("Arena", "g" + Math.ceil(v.dan / 3));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VCrossKingReward.prototype, "gradeVo", {
        set: function (v) {
            this._vo = v;
            this._type = 2;
            this.lbGrade.text = "" + v.name;
            this.lbGrade.color = Color.getColorInt(v.color);
            if (v.rewardArr == null) {
                v["reward2Arr"] = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward2));
            }
            this.list.numItems = v["reward2Arr"].length;
            this.imgGrade.url = fairygui.UIPackage.getItemURL("Arena", "g" + Math.ceil(v.dan / 3));
        },
        enumerable: true,
        configurable: true
    });
    VCrossKingReward.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        if (this._type == 1) {
            item.vo = this._vo["reward1Arr"][index];
        }
        else {
            item.vo = this._vo["reward2Arr"][index];
        }
    };
    VCrossKingReward.prototype.clean = function () {
        this.list.numItems = 0;
    };
    VCrossKingReward.URL = "ui://me1skowlhfct3u";
    return VCrossKingReward;
}(fairygui.GComponent));
__reflect(VCrossKingReward.prototype, "VCrossKingReward");
