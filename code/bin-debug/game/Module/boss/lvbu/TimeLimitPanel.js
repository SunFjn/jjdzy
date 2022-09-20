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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var TimeLimitPanel = (function (_super) {
    __extends(TimeLimitPanel, _super);
    function TimeLimitPanel() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    TimeLimitPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "TimeLimitPanel"));
    };
    TimeLimitPanel.prototype.childrenCreated = function () {
        var s = this;
        s.isClosePanel = false;
        s.view = fairygui.UIPackage.createObject("Boss", "TimeLimitPanel").asCom;
        s.contentPane = s.view;
        this.backbg = (s.view.getChild("backbg"));
        this.btn = (s.view.getChild("btn"));
        this.lbTime = (s.view.getChild("lbTime"));
        _super.prototype.childrenCreated.call(this);
    };
    TimeLimitPanel.prototype.onRelife = function () {
        ViewAlert.show("是否消耗<font color='#ffc334'>" + Config.xtcs_004[1013].num + "元宝</font>立即复活", Handler.create(this, this.directRelif));
    };
    TimeLimitPanel.prototype.directRelif = function () {
        var m = Model_player.voMine;
        if (m.yuanbao < Config.xtcs_004[1013].num) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        var t = GGlobal.sceneType;
        if (t == SceneCtrl.LVBU)
            GGlobal.modelBoss.CG_LBRELIFE_1515(0);
        if (t == SceneCtrl.MENGHUO)
            GGlobal.modelBoss.CG_MHRELIFE_1705(0);
    };
    TimeLimitPanel.prototype.timeUpdate = function () {
        var m = GGlobal.modelBoss;
        var now = Model_GlobalMsg.getServerTime();
        var t = ((m.lifeTime - now) / 1000) >> 0;
        this.lbTime.text = t + "秒";
        if (t <= 0) {
            var vomine = Model_player.voMine;
            var role = vomine.sceneChar;
            if (!role || role.curhp <= 0) {
                var t = GGlobal.sceneType;
                if (t == SceneCtrl.LVBU)
                    GGlobal.modelBoss.CG_LBRELIFE_1515(1);
                if (t == SceneCtrl.MENGHUO)
                    GGlobal.modelBoss.CG_MHRELIFE_1705(1);
            }
            this.doHideAnimation();
        }
    };
    TimeLimitPanel.prototype.onShown = function () {
        Timer.instance.listen(this.timeUpdate, this, 1000);
        this.btn.addClickListener(this.onRelife, this);
        MainUIController.setSkillEnable(false);
    };
    TimeLimitPanel.prototype.onHide = function () {
        Timer.instance.remove(this.timeUpdate, this);
        this.btn.removeClickListener(this.onRelife, this);
        MainUIController.setSkillEnable(true);
        GGlobal.layerMgr.close(UIConst.RELIFEPANEL);
    };
    TimeLimitPanel.URL = "ui://47jfyc6eqcylz";
    return TimeLimitPanel;
}(UIModalPanel));
__reflect(TimeLimitPanel.prototype, "TimeLimitPanel");
