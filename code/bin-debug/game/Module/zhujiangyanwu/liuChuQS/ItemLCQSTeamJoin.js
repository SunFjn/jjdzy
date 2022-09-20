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
var ItemLCQSTeamJoin = (function (_super) {
    __extends(ItemLCQSTeamJoin, _super);
    function ItemLCQSTeamJoin() {
        return _super.call(this) || this;
    }
    ItemLCQSTeamJoin.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ItemLCQSTeamJoin"));
    };
    ItemLCQSTeamJoin.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.joinBt.addClickListener(this.onJoin, this);
    };
    Object.defineProperty(ItemLCQSTeamJoin.prototype, "vo", {
        set: function (v) {
            this._vo = v;
            this.head.setdata(v.headId, 0, v.name, 0, false, v.frameId);
            this.numLb.text = "人数：" + v.total + "/3";
        },
        enumerable: true,
        configurable: true
    });
    ItemLCQSTeamJoin.prototype.onJoin = function () {
        GGlobal.model_LiuChuQS.CG_JOIN_TEAM_8213(this._vo.teamId, this._vo.guan);
    };
    ItemLCQSTeamJoin.URL = "ui://7a366usasr401k";
    return ItemLCQSTeamJoin;
}(fairygui.GComponent));
__reflect(ItemLCQSTeamJoin.prototype, "ItemLCQSTeamJoin");
