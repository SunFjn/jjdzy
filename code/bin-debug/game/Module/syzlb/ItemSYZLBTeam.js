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
var ItemSYZLBTeam = (function (_super) {
    __extends(ItemSYZLBTeam, _super);
    function ItemSYZLBTeam() {
        return _super.call(this) || this;
    }
    ItemSYZLBTeam.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ItemSYZLBTeam"));
    };
    ItemSYZLBTeam.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.closeBt.addClickListener(this.onClose, this);
    };
    ItemSYZLBTeam.prototype.setVo = function (v, isLeader) {
        this._vo = v;
        this.head.setdata(v.head, 0, v.name, 0, false, v.frame);
        this.levelLb.text = "Lv." + v.lv;
        this.powerLb.text = "战力:" + ConfigHelp.numToStr(v.power);
        this.leaderImg.visible = (v.type == 1);
        this.closeBt.visible = isLeader;
    };
    ItemSYZLBTeam.prototype.onClose = function () {
        if (this._vo.pId == Model_player.voMine.id) {
            GGlobal.model_Syzlb.CG_LEAVE_TEAM();
        }
        else {
            GGlobal.model_Syzlb.CG_KICK_OUT(this._vo.pId);
        }
    };
    ItemSYZLBTeam.URL = "ui://3o8q23uuhfuw7";
    return ItemSYZLBTeam;
}(fairygui.GComponent));
__reflect(ItemSYZLBTeam.prototype, "ItemSYZLBTeam");
