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
var View_ActCom_XfZpShow = (function (_super) {
    __extends(View_ActCom_XfZpShow, _super);
    function View_ActCom_XfZpShow() {
        var _this = _super.call(this) || this;
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    View_ActCom_XfZpShow.prototype.childrenCreated = function () {
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
    View_ActCom_XfZpShow.prototype.onShown = function () {
        var cfg = Config.xhdxfzpxf_316[this._args];
        var v = { item: ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show))[0], isBig: cfg.big };
        this.rewardArr = [v];
        ViewCommonPrompt.textItemList([v.item]);
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        this.continuebt.text = "再来一次";
        var model = GGlobal.model_actCom;
        var ct = model.xfzpHaveCt;
        if (ct >= 1) {
            this.lab.color = Color.GREENINT;
        }
        else {
            this.lab.color = Color.REDINT;
        }
        this.lab.text = ct + "次";
        this.img.visible = false;
    };
    View_ActCom_XfZpShow.prototype.onHide = function () {
        this.list.numItems = 0;
        Timer.instance.remove(this.timeHandler, this);
    };
    View_ActCom_XfZpShow.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    View_ActCom_XfZpShow.prototype.OnContinue = function () {
        this.doHideAnimation();
        GGlobal.model_actCom.CG_XFZP_TURN();
    };
    View_ActCom_XfZpShow.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = this.rewardArr[index];
        v.item.extra = v.isBig ? 5 : 0;
        grid.vo = v.item;
    };
    View_ActCom_XfZpShow.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    return View_ActCom_XfZpShow;
}(UIModalPanel));
__reflect(View_ActCom_XfZpShow.prototype, "View_ActCom_XfZpShow");
