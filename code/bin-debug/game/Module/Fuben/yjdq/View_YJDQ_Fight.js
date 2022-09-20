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
var View_YJDQ_Fight = (function (_super) {
    __extends(View_YJDQ_Fight, _super);
    function View_YJDQ_Fight() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.childrenCreated();
        return _this;
    }
    View_YJDQ_Fight.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_Fight").asCom;
        a.contentPane = a.view;
        CommonManager.parseChildren(a.view, a);
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
        a.sureBt.addClickListener(a.sureHandle, a);
    };
    View_YJDQ_Fight.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var a = this;
        var vo;
        if (a.rewardArr[index][0] == Enum_Attr.ITEM) {
            vo = VoItem.create(a.rewardArr[index][1]);
            vo.count = a.rewardArr[index][2];
        }
        else if (a.rewardArr[index][0] == Enum_Attr.EQUIP) {
            vo = VoEquip.create(a.rewardArr[index][1]);
            vo.count = a.rewardArr[index][2];
        }
        else {
            vo = Vo_Currency.create(a.rewardArr[index][0]);
            vo.count = a.rewardArr[index][2];
        }
        grid.vo = vo;
    };
    View_YJDQ_Fight.prototype.sureHandle = function () {
        this.doHideAnimation();
        if (GGlobal.sceneType == SceneCtrl.YJDQ) {
            GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        }
    };
    View_YJDQ_Fight.prototype.updateShow = function () {
        var a = this;
        if (this._args == 1) {
            a.titleIcon.url = "ui://jvxpx9emi6im6i";
        }
        else {
            a.titleIcon.url = "ui://jvxpx9emi6im6j";
        }
        var cfg = Config.yiqi_007[Model_YJDQ.curPass];
        if (cfg) {
            a.typeIcon.url = CommonManager.getUrl("FuBen", "type" + cfg.type);
            a.passLb.text = cfg.bo + "波";
            a.rewardArr = JSON.parse(cfg.pile);
            a.list.numItems = a.rewardArr.length;
        }
        else {
            a.typeIcon.url = CommonManager.getUrl("FuBen", "type" + Math.floor(Model_YJDQ.curPass / 1000));
            a.passLb.text = "0波";
            a.list.numItems = 0;
        }
        a.sureBt.text = "确定(10)";
    };
    View_YJDQ_Fight.prototype.timeRun = function () {
        var a = this;
        a.times--;
        a.sureBt.text = "确定(" + a.times + ")";
        if (a.times <= 0) {
            a.doHideAnimation();
        }
    };
    View_YJDQ_Fight.prototype.onShown = function () {
        var a = this;
        if (a._args) {
            a.times = 10;
            a.updateShow();
            if (!Timer.instance.has(a.timeRun, a)) {
                Timer.instance.listen(a.timeRun, a, 1000);
            }
        }
    };
    View_YJDQ_Fight.prototype.onHide = function () {
        var a = this;
        ConfigHelp.cleanGridview(a.list._children);
        GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_WIN);
        Timer.instance.remove(a.timeRun, a);
        GGlobal.modelScene.returnMainScene();
    };
    View_YJDQ_Fight.URL = "ui://pkuzcu87b8ve9";
    return View_YJDQ_Fight;
}(UIModalPanel));
__reflect(View_YJDQ_Fight.prototype, "View_YJDQ_Fight");
