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
var ViewBossTiShi = (function (_super) {
    __extends(ViewBossTiShi, _super);
    function ViewBossTiShi() {
        var _this = _super.call(this) || this;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewBossTiShi.prototype.childrenCreated = function () {
        GGlobal.createPack("bossTiShi");
        this.view = fairygui.UIPackage.createObject("bossTiShi", "ViewBossTiShi").asCom;
        this.contentPane = this.view;
        this.headIcon = (this.view.getChild("headIcon"));
        this.lbTitle = (this.view.getChild("lbTitle"));
        this.btn = (this.view.getChild("btn"));
        this.isShowMask = false;
        this.closeButton = this.view.getChild("closeButton");
        _super.prototype.childrenCreated.call(this);
        this.resetPosition();
    };
    ViewBossTiShi.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    ViewBossTiShi.prototype.onShown = function () {
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        GGlobal.control.listen(Enum_MsgType.SCENE_CHANGE, this.onSceneChange, this);
        GGlobal.control.listen(Enum_MsgType.SCENE_TASK, this.onSceneChange, this);
        Timer.instance.listen(this.upTime, this, 1000);
        this.updateShow();
    };
    ViewBossTiShi.prototype.updateShow = function () {
        this._timer = 0;
        this._ui = this._args.ui;
        this._index = this._args.index;
        this._cfg = this._args.cfg;
        this.lbTitle.text = this._cfg.name;
        var n = Config.NPC_200[this._cfg.boss];
        this.headIcon.setdata(RoleUtil.getHeadImg(n.head + ""), -1, "", 0, true);
        this.onSceneChange();
    };
    ViewBossTiShi.prototype.onHide = function () {
        if (this.btn) {
            this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        GGlobal.control.remove(Enum_MsgType.SCENE_CHANGE, this.onSceneChange, this);
        GGlobal.control.remove(Enum_MsgType.SCENE_TASK, this.onSceneChange, this);
        Timer.instance.remove(this.upTime, this);
        GGlobal.layerMgr.close(UIConst.BOSS_TISHI);
        ViewBossTiShi.yxj = 0;
    };
    ViewBossTiShi.prototype.onSceneChange = function () {
        if (GGlobal.sceneType == SceneCtrl.GUANQIA) {
            var taskId = ConfigHelp.getSystemNum(2805);
            if (Model_player.taskId > taskId) {
                this.visible = true;
                return;
            }
        }
        this.visible = false;
    };
    ViewBossTiShi.show = function (ui, index) {
        if (index === void 0) { index = 0; }
        if (ui == UIConst.QMBOSS) {
            var itemCount = Model_Bag.getItemCount(410015);
            if (GGlobal.modelBoss.qmCount <= 0 && itemCount == 0)
                return; //没次数
            if (index < 3)
                return;
        }
        else if (ui == UIConst.MHBOSS) {
            if (Model_GlobalMsg.kaifuDay <= 1)
                return; //开服第一天不开
        }
        if (GGlobal.sceneType != SceneCtrl.GUANQIA) {
            return;
        }
        if (!ModuleManager.isOpen(ui)) {
            return;
        }
        //排序优先显示
        var cfg = ViewBossTiShi.getCfg(ui, index);
        if (!cfg) {
            return;
        }
        //提示消失
        if (GGlobal.layerMgr.isOpenView(UIConst.BOSS_TISHI)) {
            var v = GGlobal.layerMgr.getView(UIConst.BOSS_TISHI);
            if (v._args.cfg.yxj < cfg.yxj) {
                //数值大的优先
                v._args = { ui: ui, cfg: cfg, index: index };
                ViewBossTiShi.yxj = cfg.yxj;
                v.updateShow();
            }
        }
        else {
            ViewBossTiShi.yxj = cfg.yxj;
            GGlobal.layerMgr.open(UIConst.BOSS_TISHI, { ui: ui, cfg: cfg, index: index });
        }
    };
    ViewBossTiShi.hide = function (ui, fu) {
        if (fu === void 0) { fu = 0; }
        var cfg = ViewBossTiShi.getCfg(ui, fu);
        //提示消失
        if (GGlobal.layerMgr.isOpenView(UIConst.BOSS_TISHI)) {
            var ui_1 = GGlobal.layerMgr.getView(UIConst.BOSS_TISHI);
            if (ui_1._args.cfg.id == cfg.id) {
                GGlobal.layerMgr.close2(UIConst.BOSS_TISHI);
            }
        }
    };
    ViewBossTiShi.prototype.onClick = function () {
        GGlobal.layerMgr.open(this._ui);
        this.closeEventHandler(null);
    };
    ViewBossTiShi.getCfg = function (ui, fb) {
        if (ViewBossTiShi._cfg == null) {
            ViewBossTiShi._cfg = {};
            for (var keys in Config.bossts_200) {
                var cfg = Config.bossts_200[keys];
                if (ViewBossTiShi._cfg[cfg.sysid] == null) {
                    ViewBossTiShi._cfg[cfg.sysid] = {};
                }
                ViewBossTiShi._cfg[cfg.sysid][cfg.fb] = cfg;
            }
        }
        return ViewBossTiShi._cfg[ui] ? ViewBossTiShi._cfg[ui][fb] : null;
    };
    ViewBossTiShi.prototype.upTime = function () {
        this._timer++;
        if (this._timer > 10) {
            GGlobal.layerMgr.close2(UIConst.BOSS_TISHI);
        }
    };
    ViewBossTiShi.yxj = 0;
    return ViewBossTiShi;
}(UIModalPanel));
__reflect(ViewBossTiShi.prototype, "ViewBossTiShi");
