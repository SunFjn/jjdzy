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
var ItemSYZLBTeamInfo = (function (_super) {
    __extends(ItemSYZLBTeamInfo, _super);
    function ItemSYZLBTeamInfo() {
        return _super.call(this) || this;
    }
    ItemSYZLBTeamInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ItemSYZLBTeamInfo"));
    };
    ItemSYZLBTeamInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btn.addClickListener(this.onClick, this);
    };
    ItemSYZLBTeamInfo.prototype.setVo = function (v, isLeader) {
        var s = this;
        s._vo = v;
        this.vHead.setdata(v.head, -1, "", -1, false, v.frame);
        this.lb.text = v.name;
        s.btn.visible = isLeader;
    };
    ItemSYZLBTeamInfo.prototype.onClick = function () {
        GGlobal.model_Syzlb.CG_CGE_LEADER(this._vo.pId);
    };
    ItemSYZLBTeamInfo.URL = "ui://3o8q23uuqqnwf";
    return ItemSYZLBTeamInfo;
}(fairygui.GComponent));
__reflect(ItemSYZLBTeamInfo.prototype, "ItemSYZLBTeamInfo");
