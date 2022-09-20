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
var ItemSYZLBJoin = (function (_super) {
    __extends(ItemSYZLBJoin, _super);
    function ItemSYZLBJoin() {
        return _super.call(this) || this;
    }
    ItemSYZLBJoin.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ItemSYZLBJoin"));
    };
    ItemSYZLBJoin.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.joinBt.addClickListener(this.onJoin, this);
    };
    Object.defineProperty(ItemSYZLBJoin.prototype, "vo", {
        set: function (v) {
            this._vo = v;
            this.head.setdata(v.head, 0, v.name, 0, false, v.frame);
            this.numLb.text = "人数：" + v.ct + "/3";
        },
        enumerable: true,
        configurable: true
    });
    ItemSYZLBJoin.prototype.onJoin = function () {
        GGlobal.model_Syzlb.CG_JOIN_BY_TEAMID(this._vo.teamId);
    };
    ItemSYZLBJoin.URL = "ui://3o8q23uuhfuw8";
    return ItemSYZLBJoin;
}(fairygui.GComponent));
__reflect(ItemSYZLBJoin.prototype, "ItemSYZLBJoin");
