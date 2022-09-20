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
/**
 * 跨服王者匹配界面
 * @author: lujiahao
 * @date: 2019-12-11 10:41:48
 */
var ViewMatchKfwz = (function (_super) {
    __extends(ViewMatchKfwz, _super);
    function ViewMatchKfwz() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._seconds = 0;
        _this.isClosePanel = false;
        _this.loadRes("Arena", "Arena_atlas0");
        return _this;
    }
    ViewMatchKfwz.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewMatchKfwz"));
    };
    ViewMatchKfwz.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewMatchKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewMatchKfwz.prototype.initView = function () {
        var t = this;
    };
    //=========================================== API ==========================================
    ViewMatchKfwz.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
        IconUtil.setImg(t.bgLoader, Enum_Path.IMAGE_MODULES_URL + "area/ppqz.png");
    };
    ViewMatchKfwz.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        SimpleTimer.ins().removeTimer(t.onTimerCallback, t);
        IconUtil.setImg(t.bgLoader, null);
    };
    ViewMatchKfwz.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewMatchKfwz.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t._seconds = 0;
        SimpleTimer.ins().addTimer(t.onTimerCallback, t, 1000, 0, null, true);
        if (t_model.areYouLeader) {
            t.btnClose.visible = true;
        }
        else {
            t.btnClose.visible = false;
        }
    };
    ViewMatchKfwz.prototype.onTimerCallback = function () {
        var t = this;
        t._count++;
        t._count = t._count % 4;
        var t_str = "";
        for (var i = 0; i < t._count; i++) {
            t_str += ".";
        }
        t.tfDes.text = "正在匹配" + t_str;
        t.tfTime.text = DateUtil2.formatUsedTime(t._seconds);
        t._seconds++;
    };
    ViewMatchKfwz.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnClose, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewMatchKfwz.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnClose:
                t_model.CG_CrossTeamKing_cancelMarry_10855();
                break;
        }
    };
    //>>>>end
    ViewMatchKfwz.URL = "ui://me1skowlju9q7q";
    return ViewMatchKfwz;
}(UIModalPanel));
__reflect(ViewMatchKfwz.prototype, "ViewMatchKfwz");
