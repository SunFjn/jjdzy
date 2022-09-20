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
var ViewActHolyBShow = (function (_super) {
    __extends(ViewActHolyBShow, _super);
    function ViewActHolyBShow() {
        var _this = _super.call(this) || this;
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewActHolyBShow.prototype.childrenCreated = function () {
        GGlobal.createPack("bossTiShi");
        this.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.surebt = (this.view.getChild("surebt"));
        this.continuebt = (this.view.getChild("continuebt"));
        this.lab = (this.view.getChild("lab"));
        this.img = (this.view.getChild("img"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.surebt.addClickListener(this.OnSure, this);
        this.continuebt.addClickListener(this.OnContinue, this);
        this.isShowOpenAnimation = false;
        this.closeButton = this.view.getChild("closeButton");
        _super.prototype.childrenCreated.call(this);
    };
    ViewActHolyBShow.prototype.onShown = function () {
        this.rewardArr = ConfigHelp.makeItemListArr(this._args);
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        this.continuebt.text = "再来一次";
        var ct = Model_Bag.getItemCount(Model_SHXunBao.XB_ITEM);
        if (ct >= 1) {
            this.lab.color = Color.GREENINT;
        }
        else {
            this.lab.color = Color.REDINT;
        }
        this.lab.text = "" + ct;
        var icon = Config.daoju_204[Model_SHXunBao.XB_ITEM].icon;
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + icon + ".png", this.img);
    };
    ViewActHolyBShow.prototype.onHide = function () {
        this.list.numItems = 0;
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.ACT_HOLYB_XBSHOW);
    };
    ViewActHolyBShow.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewActHolyBShow.prototype.OnContinue = function () {
        this.onBuy();
        this.doHideAnimation();
    };
    ViewActHolyBShow.prototype.onBuy = function () {
        var ct = Model_Bag.getItemCount(Model_SHXunBao.XB_ITEM);
        if (ct <= 0) {
            ViewCommonWarn.text("道具不足");
            return;
        }
        GGlobal.modelSHXunbao.CG_XUNBAO_ROLL();
    };
    ViewActHolyBShow.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        grid.vo = this.rewardArr[index];
    };
    ViewActHolyBShow.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    return ViewActHolyBShow;
}(UIModalPanel));
__reflect(ViewActHolyBShow.prototype, "ViewActHolyBShow");
