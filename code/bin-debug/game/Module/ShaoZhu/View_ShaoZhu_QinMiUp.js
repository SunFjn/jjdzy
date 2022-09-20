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
var View_ShaoZhu_QinMiUp = (function (_super) {
    __extends(View_ShaoZhu_QinMiUp, _super);
    function View_ShaoZhu_QinMiUp() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ShaoZhu_QinMiUp.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_QinMiUp").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        _super.prototype.childrenCreated.call(this);
        self.sureBt.addClickListener(self.closeEventHandler, self);
    };
    View_ShaoZhu_QinMiUp.prototype.renderHandler = function (index, obj) {
        obj.tipEnabled = true;
        obj.vo = this.rewardArr[index];
    };
    View_ShaoZhu_QinMiUp.prototype.updateShow = function () {
        var self = this;
        var vo = self._args.vo;
        self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(vo.qinMiCfg.shouw1));
        IconUtil.setImg(self.titleIcon, "resource/image/son/" + Math.floor(vo.qinMiCfg.jie / 100) + ".png");
        self.list.numItems = self.rewardArr.length;
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        if (!self.awatar) {
            self.awatar = EffectMgr.addEff("uieff/" + vo.cfg.zs, self.modelIcon.displayObject, self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
        }
        self.promptLb.visible = self._args.isShow;
    };
    View_ShaoZhu_QinMiUp.prototype.onShown = function () {
        var self = this;
        IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "shaozhuBack.png");
        self.updateShow();
    };
    View_ShaoZhu_QinMiUp.prototype.onHide = function () {
        var self = this;
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        IconUtil.setImg(self.backIcon, null);
        GGlobal.layerMgr.close(UIConst.SHAOZHU_QINMI_REWARD);
        self.list.numItems = 0;
    };
    View_ShaoZhu_QinMiUp.URL = "ui://p83wyb2bng03i";
    return View_ShaoZhu_QinMiUp;
}(UIModalPanel));
__reflect(View_ShaoZhu_QinMiUp.prototype, "View_ShaoZhu_QinMiUp");
