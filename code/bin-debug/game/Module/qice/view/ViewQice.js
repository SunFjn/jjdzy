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
 * 奇策界面
 * @author: lujiahao
 * @date: 2019-10-21 21:05:24
 */
var ViewQice = (function (_super) {
    __extends(ViewQice, _super);
    function ViewQice() {
        var _this = _super.call(this) || this;
        _this._uidList = [UIConst.QICE_STAR, UIConst.QICE_LEVEL, UIConst.QICE_LOTTERY];
        _this._targetId = 0;
        _this.setSkin("qice", "qice_atlas0", "ViewQice");
        return _this;
    }
    ViewQice.createInstance = function () {
        return (fairygui.UIPackage.createObject("qice", "ViewQice"));
    };
    ViewQice.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var t = this;
        t._tabContronller = new TabController();
        t._tabContronller.initView(t, t.tabCtrl);
        t._tabContronller.setPanelClassMap([
            ChildStarQice,
            ChildLevelQice,
            ChildLotteryQice,
        ]);
        t._tabContronller.tabChange = t.onTabChange;
        t._tabContronller.tabChangeCaller = t;
    };
    ViewQice.prototype.onTabChange = function (pTabIndex, pVo) {
        var t = this;
        var arr = this._uidList;
        var t_id = arr[pTabIndex];
        if (t_id > 0 && !ModuleManager.isOpen(t_id, true)) {
            return false;
        }
        switch (pTabIndex) {
            case 0:
                pVo.data = t._targetId;
                t._targetId = 0;
                break;
        }
        return true;
    };
    ViewQice.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        ReddotMgr.ins().register(UIConst.QICE_STAR + "", t.tab0.noticeImg);
        ReddotMgr.ins().register(UIConst.QICE_LEVEL + "", t.tab1.noticeImg);
        ReddotMgr.ins().register(UIConst.QICE_LOTTERY + "", t.tab2.noticeImg);
        var t_selectIndex = 0;
        if (t._args) {
            var t_arg = ~~t._args;
            if (t_arg < 10) {
                t_selectIndex = t_arg;
            }
            else {
                t_selectIndex = 0;
                t._targetId = t_arg;
            }
        }
        t._tabContronller.selectedIndex = -1;
        t._tabContronller.selectedIndex = t_selectIndex;
    };
    ViewQice.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t._tabContronller.close();
        ReddotMgr.ins().unregister(t.tab0.noticeImg);
        ReddotMgr.ins().unregister(t.tab1.noticeImg);
        ReddotMgr.ins().unregister(t.tab2.noticeImg);
    };
    ViewQice.prototype.dispose = function () {
        var t = this;
        if (t._tabContronller)
            t._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ViewQice.prototype.registerEvent = function (pFlag) {
        var t = this;
        t._tabContronller.registerEvent(pFlag);
    };
    //>>>>end
    ViewQice.URL = "ui://cokk050nj82l0";
    return ViewQice;
}(UIPanelBase));
__reflect(ViewQice.prototype, "ViewQice");
