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
var View_LiuYiKaoShiPanel = (function (_super) {
    __extends(View_LiuYiKaoShiPanel, _super);
    function View_LiuYiKaoShiPanel() {
        var _this = _super.call(this) || this;
        _this.loadRes("ShaoZhu", "ShaoZhu_atlas0");
        return _this;
    }
    View_LiuYiKaoShiPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "View_LiuYiKaoShiPanel"));
    };
    View_LiuYiKaoShiPanel.prototype.childrenCreated = function () {
        GGlobal.createPack("ShaoZhu");
        var s = this;
        s.view = fairygui.UIPackage.createObject("ShaoZhu", "View_LiuYiKaoShiPanel").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.list.itemRenderer = s.renderHander;
        s.list.callbackThisObj = s;
        _super.prototype.childrenCreated.call(this);
    };
    View_LiuYiKaoShiPanel.prototype.onShown = function () {
        var s = this;
        s._xtVo = s._args;
        s.updateShow();
        s.registerEvent(true);
    };
    View_LiuYiKaoShiPanel.prototype.onHide = function () {
        var s = this;
        s.registerEvent(false);
        s.list.numItems = 0;
    };
    View_LiuYiKaoShiPanel.prototype.registerEvent = function (pFlag) {
        var m = GGlobal.model_LiuYi;
        var self = this;
        EventUtil.register(pFlag, self.btn, egret.TouchEvent.TOUCH_TAP, self.onClick, self);
        m.register(pFlag, Model_LiuYi.KAOSHI, self.upKaoShi, self);
    };
    View_LiuYiKaoShiPanel.prototype.onClick = function () {
        var s = this;
        for (var i = 0; i < s._lyArr.length; i++) {
            if (s._lyArr[i].st == 0) {
                ViewCommonWarn.text("全部合格后可进修下一学堂");
                return;
            }
        }
        GGlobal.model_LiuYi.CG_EDUCAT_5129(s._xtVo.szId);
        s.closeEventHandler(null);
    };
    View_LiuYiKaoShiPanel.prototype.updateShow = function () {
        var s = this;
        s._lyArr = [];
        var school = s._xtVo.cfg;
        s._openSix = s._xtVo.openSix;
        //能进修
        var educat = true;
        //概率
        var ks = null;
        if (school.ks != "0") {
            ks = JSON.parse(school.ks);
        }
        for (var i = 0; i < s._xtVo.lyArr.length; i++) {
            var ly = s._xtVo.lyArr[i];
            if (s._openSix[ly.lyId]) {
                s._lyArr.push(ly);
                ly.ks = ks ? ks[i][1] : 0;
                if (ly.st == 0) {
                    educat = false;
                }
            }
        }
        s.list.numItems = s._lyArr.length;
        s.btn.checkNotice = educat;
    };
    View_LiuYiKaoShiPanel.prototype.upKaoShi = function (ly) {
        var s = this;
        var educat = true;
        for (var i = 0; i < s._lyArr.length; i++) {
            if (s._lyArr[i].lyId == ly.lyId) {
                s._lyArr[i].st = ly.st;
            }
            if (s._lyArr[i].st == 0) {
                educat = false;
            }
        }
        s.list.numItems = s._lyArr.length;
        s.btn.checkNotice = educat;
    };
    View_LiuYiKaoShiPanel.prototype.renderHander = function (idx, obj) {
        var s = this;
        obj.setVo(s._lyArr[idx], s._xtVo);
    };
    View_LiuYiKaoShiPanel.URL = "ui://p83wyb2bad1l1z";
    return View_LiuYiKaoShiPanel;
}(UIModalPanel));
__reflect(View_LiuYiKaoShiPanel.prototype, "View_LiuYiKaoShiPanel");
