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
var View_SanGuoYT_ScenePanel = (function (_super) {
    __extends(View_SanGuoYT_ScenePanel, _super);
    function View_SanGuoYT_ScenePanel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_SanGuoYT_ScenePanel.prototype.childrenCreated = function () {
        var self = this;
        self.isClosePanel = self.isShowMask = false;
        self.view = fairygui.UIPackage.createObject("sanGuoYiTong", "View_SanGuoYT_ScenePanel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.smLb.text = HtmlUtil.createLink("玩法说明", true);
        _super.prototype.childrenCreated.call(this);
        self.smLb.addEventListener(egret.TextEvent.LINK, self.linkHandler, self);
    };
    View_SanGuoYT_ScenePanel.prototype.linkHandler = function (event) {
        event.stopPropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SANGUO_YITONG);
    };
    View_SanGuoYT_ScenePanel.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelSanGuoYT;
        var max = 0;
        for (var i = 0; i < model.jifenArr.length; i++) {
            if (model.jifenArr[i] > max)
                max = model.jifenArr[i];
        }
        var barArr = [4, 1, 5];
        for (var i = 0; i < model.jifenArr.length; i++) {
            self["bar" + i].width = max == 0 ? 0 : 257 * (model.jifenArr[i] / max);
            self["numlb" + i].text = Model_Country.getCountryName(i + 1) + ":" + model.jifenArr[i];
            IconUtil.setImg(self["bar" + i], Enum_Path.PIC_URL + "BM_BOXT" + barArr[i] + ".png");
        }
    };
    View_SanGuoYT_ScenePanel.prototype.onShown = function () {
        var self = this;
        self.updateShow();
        GGlobal.reddot.listen(UIConst.SANGUO_YITONG, self.updateShow, self);
    };
    View_SanGuoYT_ScenePanel.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.SANGUO_YITONG_SCENE);
        GGlobal.reddot.remove(UIConst.SANGUO_YITONG, self.updateShow, self);
    };
    View_SanGuoYT_ScenePanel.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, GGlobal.layerMgr.uiAlign + ViewMainTopUI.instance.height - 20);
    };
    View_SanGuoYT_ScenePanel.URL = "ui://z4ijxlqklyu5u";
    return View_SanGuoYT_ScenePanel;
}(UIModalPanel));
__reflect(View_SanGuoYT_ScenePanel.prototype, "View_SanGuoYT_ScenePanel");
