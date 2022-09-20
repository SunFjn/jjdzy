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
var ItemNianShouReward = (function (_super) {
    __extends(ItemNianShouReward, _super);
    function ItemNianShouReward() {
        return _super.call(this) || this;
    }
    ItemNianShouReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComNianShou", "ItemNianShouReward"));
    };
    ItemNianShouReward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        s.list.setVirtual();
        s.btnGet.addClickListener(s.onReward, s);
    };
    Object.defineProperty(ItemNianShouReward.prototype, "vo", {
        set: function (v) {
            var s = this;
            s._v = v;
            s.lbPoint.text = "获得" + v.point + "积分";
            s._lstData = ConfigHelp.makeItemListArr(JSON.parse(v.reward));
            s.list.numItems = s._lstData.length;
            var m = GGlobal.model_ActNianShou;
            var st = m.rewStObj[v.id];
            var point = m.point;
            if (st == 1) {
                s.imgYWC.visible = true;
                s.lbNo.visible = false;
                s.btnGet.visible = false;
            }
            else if (point >= v.point) {
                s.imgYWC.visible = false;
                s.btnGet.checkNotice = s.btnGet.visible = true;
                s.lbNo.visible = false;
            }
            else {
                s.imgYWC.visible = false;
                s.btnGet.visible = false;
                s.lbNo.visible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemNianShouReward.prototype.onReward = function () {
        var s = this;
        if (!s._v) {
            return;
        }
        GGlobal.model_ActNianShou.CG_GET_GOAL_REWARD_11557(s._v.id);
    };
    ItemNianShouReward.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        s.list.numItems = 0;
    };
    ItemNianShouReward.prototype.itemRender = function (idx, grid) {
        grid.tipEnabled = grid.isShowEff = true;
        grid.vo = this._lstData[idx];
    };
    ItemNianShouReward.URL = "ui://ht2966i4dsuf9";
    return ItemNianShouReward;
}(fairygui.GComponent));
__reflect(ItemNianShouReward.prototype, "ItemNianShouReward");
