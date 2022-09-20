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
var ViewSettingPanel = (function (_super) {
    __extends(ViewSettingPanel, _super);
    function ViewSettingPanel() {
        var _this = _super.call(this) || this;
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ChildSettingName.URL, ChildSettingName);
        f(ChildSettingHead.URL, ChildSettingHead);
        f(VSettingHead.URL, VSettingHead);
        f(VSettingFrame.URL, VSettingFrame);
        f(VSettingHeadTop.URL, VSettingHeadTop);
        _this.loadRes("setting", "setting_atlas0");
        return _this;
    }
    ViewSettingPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("setting", "ViewSettingPanel"));
    };
    ViewSettingPanel.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("setting");
        self.view = fairygui.UIPackage.createObject("setting", "ViewSettingPanel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewSettingPanel.prototype.onShown = function () {
        this.c1.selectedIndex = 0;
        this.addListen();
    };
    ViewSettingPanel.prototype.onHide = function () {
        this.removeListen();
    };
    ViewSettingPanel.prototype.addListen = function () {
        var self = this;
        GGlobal.control.listen(Enum_MsgType.SETTING_CHANGE_HEAD, self.selectPage, self);
        self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
        self.btnKefu.addClickListener(self.onKeFu, self);
        self.viewName.addListen();
        self.viewHead.addListen();
        self.selectPage();
        // let clientVer = ResourceVersionConfig.version;
        var clientVer = "";
        if (GGlobal.loginArg && GGlobal.loginArg.clientversion) {
            clientVer = GGlobal.loginArg.clientversion;
        }
        self.lbVersion.text = "ver：" + clientVer + "  server:" + GGlobal.serverVer + " kfday：" + Model_GlobalMsg.kaifuDay;
        if (GGlobal.loginArg.pf && GGlobal.loginArg.pf.indexOf("jysgzj04") != -1) {
            self.btnKefu.text = "刷新游戏";
        }
        else {
            self.btnKefu.text = "联系客服";
        }
        if (PlatformManager.is1377 || PlatformManager.is350 || PlatformManager.is915
            || PlatformManager.isDuoYu || PlatformManager.isGaoRe
            || PlatformManager.isTanWan || PlatformManager.isWanZi) {
            self.btnKefu.visible = false;
        }
    };
    ViewSettingPanel.prototype.removeListen = function () {
        GGlobal.layerMgr.close(UIConst.SETTING);
        GGlobal.control.remove(Enum_MsgType.SETTING_CHANGE_HEAD, this.selectPage, this);
        this.btnKefu.removeClickListener(this.onKeFu, this);
        this.viewName.removeListen();
        this.viewHead.removeListen();
        this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
    };
    ViewSettingPanel.prototype.selectPage = function () {
        if (this.c1.selectedIndex == 0) {
            this.viewName.update();
        }
        else if (this.c1.selectedIndex == 1) {
            this.viewHead.update();
        }
    };
    ViewSettingPanel.prototype.onKeFu = function () {
        this.btnKefu.selected = false;
        if (GGlobal.loginArg.pf && GGlobal.loginArg.pf.indexOf("jysgzj04") != -1) {
            window.location.reload(); //刷新游戏
        }
        else {
            if (GGlobal.sdk) {
                GGlobal.sdk.Customer();
            }
            else {
                ViewCommonWarn.text("请点击左侧的悬浮框  【账户】-【在线客服】进行咨询");
            }
        }
        this.closeEventHandler(null);
    };
    ViewSettingPanel.URL = "ui://dt6yws4jvaaj0";
    return ViewSettingPanel;
}(UIModalPanel));
__reflect(ViewSettingPanel.prototype, "ViewSettingPanel");
