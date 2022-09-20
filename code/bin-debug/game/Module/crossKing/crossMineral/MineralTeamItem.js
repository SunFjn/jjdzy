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
var MineralTeamItem = (function (_super) {
    __extends(MineralTeamItem, _super);
    function MineralTeamItem() {
        return _super.call(this) || this;
    }
    MineralTeamItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "MineralTeamItem"));
    };
    MineralTeamItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.closeBt.addClickListener(self.OnClose, self);
    };
    MineralTeamItem.prototype.OnClose = function () {
        if (this.vo.roleId == Model_player.voMine.id) {
            GGlobal.modelCrossMineral.CG_LEAVE_MINE();
        }
        else {
            GGlobal.modelCrossMineral.CG_KICK_MINE(this.vo.roleId);
        }
    };
    MineralTeamItem.prototype.setVo = function (vo, mineId, times, isShowClose) {
        if (isShowClose === void 0) { isShowClose = true; }
        var self = this;
        self.vo = vo;
        if (vo) {
            self.head.setdata(vo.headID, -1, null, 0, false, vo.frameID, vo.country);
            self.singImg.visible = vo.roleId == mineId;
            self.closeBt.visible = vo.roleId != mineId && (mineId == Model_player.voMine.id
                || vo.roleId == Model_player.voMine.id) && times == -1 && isShowClose;
            self.numLb.text = "战力：" + ConfigHelp.getYiWanText(vo.power);
            self.nameLb.text = vo.roleName + "";
        }
        else {
        }
    };
    MineralTeamItem.URL = "ui://yqpfulefnyv752";
    return MineralTeamItem;
}(fairygui.GComponent));
__reflect(MineralTeamItem.prototype, "MineralTeamItem");
