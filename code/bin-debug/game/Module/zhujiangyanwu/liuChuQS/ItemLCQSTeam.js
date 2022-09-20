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
var ItemLCQSTeam = (function (_super) {
    __extends(ItemLCQSTeam, _super);
    function ItemLCQSTeam() {
        return _super.call(this) || this;
    }
    ItemLCQSTeam.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ItemLCQSTeam"));
    };
    ItemLCQSTeam.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.closeBt.addClickListener(this.onClose, this);
    };
    ItemLCQSTeam.prototype.setVo = function (v, isLeader) {
        this._vo = v;
        this.head.setdata(v.head, 0, v.name, 0, false, v.frame);
        this.levelLb.text = "Lv." + v.lv;
        this.powerLb.text = "战力:" + ConfigHelp.numToStr(v.power);
        this.leaderImg.visible = false;
        this.closeBt.visible = isLeader;
    };
    ItemLCQSTeam.prototype.onClose = function () {
        if (this._vo.plyId == Model_player.voMine.id) {
            GGlobal.model_LiuChuQS.CG_LEAVE_8211(this._vo.teamId);
        }
        else {
            GGlobal.model_LiuChuQS.CG_REMOVE_MEMBER_8207(this._vo.plyId);
        }
    };
    ItemLCQSTeam.URL = "ui://7a366usasr401i";
    return ItemLCQSTeam;
}(fairygui.GComponent));
__reflect(ItemLCQSTeam.prototype, "ItemLCQSTeam");
