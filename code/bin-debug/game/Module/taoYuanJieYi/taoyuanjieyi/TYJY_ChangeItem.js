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
/**
 * /**
 * 桃园结义人员调动列表Item
 */
var TYJY_ChangeItem = (function (_super) {
    __extends(TYJY_ChangeItem, _super);
    function TYJY_ChangeItem() {
        return _super.call(this) || this;
    }
    TYJY_ChangeItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_ChangeItem"));
    };
    TYJY_ChangeItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    TYJY_ChangeItem.prototype.clean = function () {
        var s = this;
        s.kickBtn.removeClickListener(s.onKick, s);
        s.transferBtn.removeClickListener(s.onTransfer, s);
        s.applyBtn.removeClickListener(s.onApply, s);
    };
    TYJY_ChangeItem.prototype.setdata = function (vo, isDage) {
        var s = this;
        if (!vo) {
            s.c1.selectedIndex = 2;
            s.viewHead.setdata(null);
            return;
        }
        s._vo = vo;
        if (isDage) {
            s.c1.selectedIndex = 0;
        }
        else {
            s.c1.selectedIndex = 1;
            s.applyBtn.visible = vo.position == 1 ? true : false;
        }
        s.nameLb.text = vo.playerName;
        if (vo.offLine > 0) {
            s.timeLb.text = "<font color='#D8E2EB'>" + GGlobal.model_TYJY.getOffLineStr(vo.offLine) + "</font>";
        }
        else {
            s.timeLb.text = "在线";
            s.timeLb.color = Color.GREENINT;
        }
        s.viewHead.setdata(vo.headId, -1, "", -1, false, vo.frameId, 0);
        s.kickBtn.addClickListener(s.onKick, s);
        s.transferBtn.addClickListener(s.onTransfer, s);
        s.applyBtn.addClickListener(s.onApply, s);
    };
    /**
     * 踢出成员
     */
    TYJY_ChangeItem.prototype.onKick = function (e) {
        ViewAlert.show("是否将此玩家请离义盟？", null, 3, "取消", "请离", Handler.create(this, function () { GGlobal.model_TYJY.CG_EXPEL(this._vo.playerId); }));
    };
    /**
     * 转让大哥
     */
    TYJY_ChangeItem.prototype.onTransfer = function (e) {
        ViewAlert.show("是否将大哥转让给此玩家？", null, 3, "取消", "转让", Handler.create(this, function () { GGlobal.model_TYJY.CG_TRANSFER(this._vo.playerId); }));
    };
    /**
     * 申请大哥
     */
    TYJY_ChangeItem.prototype.onApply = function (e) {
        var self = this;
        var needLeave = 3 * 24 * 60 * 60;
        if (self._vo.offLine < needLeave) {
            ViewCommonWarn.text("大哥离线3天以上才可申请");
            return;
        }
        ViewAlert.show("是否申请大哥？", null, 3, "取消", "申请", Handler.create(self, function () { GGlobal.model_TYJY.CG_APPLY_BROTHER(); }));
    };
    TYJY_ChangeItem.URL = "ui://m2fm2aiyvfmx1b";
    return TYJY_ChangeItem;
}(fairygui.GComponent));
__reflect(TYJY_ChangeItem.prototype, "TYJY_ChangeItem");
