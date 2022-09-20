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
var CaoCaoTimeLimitPanel = (function (_super) {
    __extends(CaoCaoTimeLimitPanel, _super);
    function CaoCaoTimeLimitPanel() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    CaoCaoTimeLimitPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaoTimeLimitPanel"));
    };
    CaoCaoTimeLimitPanel.prototype.childrenCreated = function () {
        var self = this;
        self.isClosePanel = false;
        self.view = fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaoTimeLimitPanel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    CaoCaoTimeLimitPanel.prototype.onRelife = function () {
        ViewAlert.show("是否消耗<font color='#ffc334'>" + Config.xtcs_004[1013].num + "元宝</font>立即复活", Handler.create(this, this.directRelif));
    };
    CaoCaoTimeLimitPanel.prototype.directRelif = function () {
        var m = Model_player.voMine;
        if (m.yuanbao < Config.xtcs_004[1013].num) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        var t = GGlobal.sceneType;
        if (t == SceneCtrl.CAOCAOLAIXI)
            GGlobal.modelCaoCao.CG_CaoCaoCome_buyLive_8523(0);
    };
    CaoCaoTimeLimitPanel.prototype.timeUpdate = function () {
        var self = this;
        var m = GGlobal.modelCaoCao;
        var now = Model_GlobalMsg.getServerTime();
        var t = ((m.lifeTime - now) / 1000) >> 0;
        self.lbTime.text = t + "秒";
        if (t <= 0) {
            var vomine = Model_player.voMine;
            var role = vomine.sceneChar;
            if (!role || role.curhp <= 0) {
                var t = GGlobal.sceneType;
                if (t == SceneCtrl.CAOCAOLAIXI)
                    GGlobal.modelCaoCao.CG_CaoCaoCome_buyLive_8523(1);
            }
            self.doHideAnimation();
        }
    };
    CaoCaoTimeLimitPanel.prototype.onShown = function () {
        var self = this;
        Timer.instance.listen(self.timeUpdate, self, 1000);
        self.btn.addClickListener(self.onRelife, self);
        MainUIController.setSkillEnable(false);
    };
    CaoCaoTimeLimitPanel.prototype.onHide = function () {
        var self = this;
        Timer.instance.remove(self.timeUpdate, self);
        self.btn.removeClickListener(self.onRelife, self);
        MainUIController.setSkillEnable(true);
        GGlobal.layerMgr.close(UIConst.CAOCAO_LAIXI_RELIFEPANEL);
    };
    CaoCaoTimeLimitPanel.URL = "ui://n6fub9ddeq412";
    return CaoCaoTimeLimitPanel;
}(UIModalPanel));
__reflect(CaoCaoTimeLimitPanel.prototype, "CaoCaoTimeLimitPanel");
