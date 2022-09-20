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
var View_ActivityOpenPrompt_Panel = (function (_super) {
    __extends(View_ActivityOpenPrompt_Panel, _super);
    function View_ActivityOpenPrompt_Panel() {
        var _this = _super.call(this) || this;
        _this._timer = 0;
        _this.loadRes("TiShi", "TiShi_atlas0");
        return _this;
    }
    View_ActivityOpenPrompt_Panel.prototype.childrenCreated = function () {
        GGlobal.createPack("TiShi");
        var self = this;
        self.isShowMask = false;
        self.view = fairygui.UIPackage.createObject("TiShi", "View_ActivityOpenPrompt_Panel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.enterBt.addClickListener(self.onEnter, self);
        self.closeBt.addClickListener(self.closeEventHandler, self);
    };
    View_ActivityOpenPrompt_Panel.prototype.onEnter = function () {
        var self = this;
        if (self.cfg.sysid == UIConst.FHLY) {
            var sysid = Config.xtcs_004[6401].num;
            var cfg = Config.hddt_200[UIConst.FHLY];
            if (cfg)
                GGlobal.layerMgr.open(sysid, cfg.fenlei - 1);
        }
        else if (self.cfg.sysid == UIConst.WENDINGTX) {
            var sysid = Config.xtcs_004[6402].num;
            var cfg = Config.hddt_200[UIConst.WENDINGTX];
            if (cfg)
                GGlobal.layerMgr.open(sysid, cfg.fenlei - 1);
        }
        else if (self.cfg.sysid == UIConst.LIANGCAO) {
            var sysid = Config.xtcs_004[6403].num;
            var cfg = Config.hddt_200[UIConst.LIANGCAO];
            if (cfg)
                GGlobal.layerMgr.open(sysid, cfg.fenlei - 1);
        }
        else {
            GGlobal.layerMgr.open(self.cfg.sysid);
        }
        self.doHideAnimation();
    };
    View_ActivityOpenPrompt_Panel.prototype.onShown = function () {
        var self = this;
        self._timer = 0;
        self.cfg = self._args;
        IconUtil.setImg(self.iconImg, Enum_Path.MAINUI_URL + self.cfg.sysid + ".png");
        Timer.instance.listen(this.upTime, this, 1000);
    };
    View_ActivityOpenPrompt_Panel.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.ACTIVITY_PROMPT);
        IconUtil.setImg(this.iconImg, null);
        View_ActivityOpenPrompt_Panel.yxj = 0;
    };
    View_ActivityOpenPrompt_Panel.show = function (cfg) {
        if (GGlobal.sceneType != SceneCtrl.GUANQIA) {
            return;
        }
        if (!ModuleManager.isOpen(cfg.sysid)) {
            return;
        }
        if (GGlobal.layerMgr.isOpenView(UIConst.ACTIVITY_PROMPT)) {
            var panel = GGlobal.layerMgr.getView(UIConst.ACTIVITY_PROMPT);
            if (cfg.yxj > panel.cfg.yxj) {
                View_ActivityOpenPrompt_Panel.yxj = cfg.yxj;
                panel._args = cfg;
                panel.onShown();
            }
        }
        else {
            View_ActivityOpenPrompt_Panel.yxj = cfg.yxj;
            GGlobal.layerMgr.open(UIConst.ACTIVITY_PROMPT, cfg);
        }
    };
    View_ActivityOpenPrompt_Panel.hide = function () {
        GGlobal.layerMgr.close2(UIConst.ACTIVITY_PROMPT);
    };
    View_ActivityOpenPrompt_Panel.prototype.upTime = function () {
        this._timer++;
        if (this._timer > 10) {
            GGlobal.layerMgr.close2(UIConst.ACTIVITY_PROMPT);
        }
    };
    View_ActivityOpenPrompt_Panel.URL = "ui://5ed3mplelsg13";
    View_ActivityOpenPrompt_Panel.yxj = 0;
    return View_ActivityOpenPrompt_Panel;
}(UIModalPanel));
__reflect(View_ActivityOpenPrompt_Panel.prototype, "View_ActivityOpenPrompt_Panel");
