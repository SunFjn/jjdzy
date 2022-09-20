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
var ViewShaoZhuActHongBao = (function (_super) {
    __extends(ViewShaoZhuActHongBao, _super);
    function ViewShaoZhuActHongBao() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewShaoZhuActHongBao.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("bossTiShi");
        self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.surebt.addClickListener(self.OnSure, self);
        self.isShowOpenAnimation = false;
        self.closeButton = self.view.getChild("closeButton");
        _super.prototype.childrenCreated.call(this);
    };
    ViewShaoZhuActHongBao.prototype.onOpen = function (arg) {
        this.rewardArr = arg;
        _super.prototype.onOpen.call(this, arg);
    };
    ViewShaoZhuActHongBao.prototype.onShown = function () {
        var _bigAwards = [];
        var _defaultAwards = [];
        var ii = 0;
        var len = this.rewardArr.length;
        for (ii = 0; ii < len; ii++) {
            var item = this.rewardArr[ii];
            if (item.isBig) {
                _bigAwards.push(item);
            }
            else {
                _defaultAwards.push(item);
            }
        }
        this.rewardArr = _bigAwards.concat(_defaultAwards);
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        this.continuebt.visible = false;
        this.img.visible = false;
        this.lab.visible = false;
        this.surebt.setXY(255, 389);
    };
    ViewShaoZhuActHongBao.prototype.onHide = function () {
        this.list.numItems = 0;
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.SHAOZHU_HONGBAO_AWARDS);
    };
    ViewShaoZhuActHongBao.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewShaoZhuActHongBao.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = this.rewardArr[index];
        if (v.isBig) {
            v.item.extra = 5;
        }
        else {
            v.item.extra = 0;
        }
        grid.vo = v.item;
    };
    ViewShaoZhuActHongBao.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    ViewShaoZhuActHongBao.isGuide = false;
    return ViewShaoZhuActHongBao;
}(UIModalPanel));
__reflect(ViewShaoZhuActHongBao.prototype, "ViewShaoZhuActHongBao");
