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
 * 神将之力主界面
 */
var WuJiangZhiLiMainView = (function (_super) {
    __extends(WuJiangZhiLiMainView, _super);
    function WuJiangZhiLiMainView() {
        var _this = _super.call(this) || this;
        _this._uidList = [UIConst.WUJIANGZHILI, UIConst.WUJIANGZHILI_SKILL];
        _this._targetId = 0;
        _this.setExtends();
        _this.loadRes("wuJiang", "wuJiang_atlas0");
        return _this;
    }
    WuJiangZhiLiMainView.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "WuJiangZhiLiMainView"));
    };
    WuJiangZhiLiMainView.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(View_WuJiangZhiLi.URL, View_WuJiangZhiLi);
        f.setPackageItemExtension(ChildWuJiangZhiLiSkillUp.URL, ChildWuJiangZhiLiSkillUp);
    };
    WuJiangZhiLiMainView.prototype.childrenCreated = function () {
        var s = this;
        GGlobal.createPack("wuJiang");
        s.view = fairygui.UIPackage.createObject("wuJiang", "WuJiangZhiLiMainView").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.tabArr = [s["tab0"], s["tab1"]];
        s._tabContronller = new TabController();
        s._tabContronller.initView(s, s.c1);
        s._tabContronller.setPanelClassMap([
            View_WuJiangZhiLi,
            ChildWuJiangZhiLiSkillUp,
        ]);
        s._tabContronller.tabChange = s.onTabChange;
        s._tabContronller.tabChangeCaller = s;
        _super.prototype.childrenCreated.call(this);
    };
    WuJiangZhiLiMainView.prototype.onShown = function () {
        var s = this;
        s._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (s._args) {
            var t_arg = ~~s._args;
            if (t_arg < 10) {
                t_selectIndex = t_arg;
            }
            else {
                t_selectIndex = 0;
                s._targetId = t_arg;
            }
        }
        s._tabContronller.selectedIndex = -1;
        s._tabContronller.selectedIndex = t_selectIndex;
        var r = GGlobal.reddot;
        r.listen(UIConst.WUJIANGZHILI, s.checkTabNotice, s);
        r.listen(UIConst.WUJIANGZHILI_SKILL, s.checkTabNotice, s);
        GGlobal.control.listen(Enum_MsgType.WUJIANG_SHENGJIANGZHILI, s.checkTabNotice, s);
        GGlobal.control.listen(Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP, s.checkTabNotice, s);
        s.checkTabNotice();
    };
    WuJiangZhiLiMainView.prototype.onHide = function () {
        var s = this;
        s._tabContronller.registerEvent(false);
        s._tabContronller.close();
        GGlobal.layerMgr.close(UIConst.WUJIANGZHILI);
        GGlobal.layerMgr.close(UIConst.WUJIANGZHILI_SKILL);
        var r = GGlobal.reddot;
        r.remove(UIConst.WUJIANGZHILI, s.checkTabNotice, s);
        r.remove(UIConst.WUJIANGZHILI_SKILL, s.checkTabNotice, s);
        GGlobal.control.remove(Enum_MsgType.WUJIANG_SHENGJIANGZHILI, s.checkTabNotice, s);
        GGlobal.control.remove(Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP, s.checkTabNotice, s);
    };
    WuJiangZhiLiMainView.prototype.onTabChange = function (pTabIndex, pVo) {
        var self = this;
        var arr = this._uidList;
        var t_id = arr[pTabIndex];
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        switch (pTabIndex) {
            case 0:
                pVo.data = self._targetId;
                self._targetId = 0;
                break;
        }
        return true;
    };
    WuJiangZhiLiMainView.prototype.checkTabNotice = function () {
        var self = this;
        var red = GGlobal.reddot;
        self.tabArr[0].checkNotice = red.checkCondition(UIConst.WUJIANGZHILI, Model_WuJiang.wujiangzhiliType);
        self.tabArr[1].checkNotice = red.checkCondition(UIConst.WUJIANGZHILI_SKILL, Model_WuJiang.wujiangzhiliType);
    };
    WuJiangZhiLiMainView.URL = "ui://zyx92gzwf00b4x";
    return WuJiangZhiLiMainView;
}(UIModalPanel));
__reflect(WuJiangZhiLiMainView.prototype, "WuJiangZhiLiMainView");
