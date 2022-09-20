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
var guibin_panel = (function (_super) {
    __extends(guibin_panel, _super);
    function guibin_panel() {
        var _this = _super.call(this) || this;
        _this.loadRes("guibin", "guibin_atlas0");
        return _this;
    }
    guibin_panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("guibin", "guibin_panel"));
    };
    guibin_panel.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("guibin");
        self.view = fairygui.UIPackage.createObject("guibin", "guibin_panel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.RewardList.callbackThisObj = self;
        self.RewardList.itemRenderer = self.itemRenderer;
        _super.prototype.childrenCreated.call(this);
    };
    guibin_panel.prototype.itemRenderer = function (index, item) {
        var self = this;
        var vo = self.rewardListVO[index];
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = vo;
    };
    guibin_panel.prototype.onShown = function () {
        var self = this;
        self.copyBtn.addClickListener(self.onClickCopyBtn, self);
        self.returnBtn.addClickListener(self.closeEventHandler, self);
        var index = PlatformManager.getPfIndex();
        self.cfgVO = Config.guibin_749[index];
        if (!self.cfgVO)
            return;
        self.rewardListVO = ConfigHelp.makeItemListArr(JSON.parse(self.cfgVO.jiangli));
        self.RewardList.numItems = self.rewardListVO.length;
        self.weixinNumber.text = self.cfgVO.wz + "：";
        self.numLb.text = self.cfgVO.weixin + "";
        IconUtil.setImg(self.bgLoader, "resource/image/back/guibinBG.png");
        IconUtil.setImg(self.iconLoader, "resource/image/guibin/" + self.cfgVO.tupian + ".jpg");
    };
    guibin_panel.prototype.onHide = function () {
        var self = this;
        self.copyBtn.removeClickListener(self.onClickCopyBtn, self);
        self.returnBtn.removeClickListener(self.closeEventHandler, self);
        self.RewardList.numItems = 0;
        self.cfgVO = null;
        GGlobal.layerMgr.close(UIConst.GUI_BIN_VIP);
        IconUtil.setImg(self.bgLoader, null);
        IconUtil.setImg(self.iconLoader, null);
    };
    guibin_panel.prototype.onClickCopyBtn = function () {
        var self = this;
        var str = self.numLb.text;
        Model_Setting.onCopy(str, "复制成功");
    };
    guibin_panel.URL = "ui://uwuhem42itpb6";
    return guibin_panel;
}(UIModalPanel));
__reflect(guibin_panel.prototype, "guibin_panel");
