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
 * 桃园结义已加盟Item
 */
var TYJY_JoinItem = (function (_super) {
    __extends(TYJY_JoinItem, _super);
    function TYJY_JoinItem() {
        var _this = _super.call(this) || this;
        _this.lastTime = 0;
        return _this;
    }
    TYJY_JoinItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_JoinItem"));
    };
    TYJY_JoinItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    TYJY_JoinItem.prototype.clean = function () {
        var s = this;
        s.inviteBtn.removeClickListener(s.onInvite, s);
        GGlobal.model_TYJY.remove(Model_TYJY.msg_invite, s.onInviteCD, s);
    };
    TYJY_JoinItem.prototype.setdata = function (vo, index) {
        this.first.visible = index == 0 ? true : false;
        this.second.visible = index == 1 ? true : false;
        this.third.visible = index == 2 ? true : false;
        if (!vo) {
            this.c1.selectedIndex = 0;
            this.viewHead.setdata(null);
        }
        else {
            this.c1.selectedIndex = 1;
            this.viewHead.setdata(vo.headId, -1, "", -1, false, vo.frameId, 0);
            this.nameLb.text = vo.playerName;
            this.lvLb.text = "等级：" + vo.playerLv;
            this.powerLb.text = "战力：" + vo.playerPower;
            if (vo.offLine > 0) {
                this.timeLb.text = "<font color='#D8E2EB'>" + GGlobal.model_TYJY.getOffLineStr(vo.offLine) + "</font>";
            }
            else {
                this.timeLb.text = "在线";
                this.timeLb.color = Color.GREENINT;
            }
        }
        this.inviteBtn.addClickListener(this.onInvite, this);
        GGlobal.model_TYJY.listen(Model_TYJY.msg_invite, this.onInviteCD, this);
    };
    /**
     * 广播邀请
     */
    TYJY_JoinItem.prototype.onInvite = function (e) {
        if (this.inviteBtn.enabled == false) {
            ViewCommonWarn.text("请稍等!");
            return;
        }
        GGlobal.model_TYJY.CG_RECRUITING();
    };
    TYJY_JoinItem.prototype.onInviteCD = function (time) {
        var self = this;
        self.lastTime = time;
        self.inviteBtn.enabled = false;
        Timer.instance.listen(function onT() {
            self.lastTime--;
            if (self.lastTime < 0) {
                self.inviteBtn.enabled = true;
                self.inviteBtn.text = "广播邀请";
                Timer.instance.remove(onT, self);
            }
            else {
                self.inviteBtn.text = "\u7B49\u5F85(" + self.lastTime + ")";
            }
        }, self, 1000);
    };
    TYJY_JoinItem.URL = "ui://m2fm2aiyvfmx11";
    return TYJY_JoinItem;
}(fairygui.GComponent));
__reflect(TYJY_JoinItem.prototype, "TYJY_JoinItem");
