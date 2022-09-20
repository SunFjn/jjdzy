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
var View_BaoWu_Panel = (function (_super) {
    __extends(View_BaoWu_Panel, _super);
    function View_BaoWu_Panel() {
        var _this = _super.call(this) || this;
        _this.setSkin("role", "role_atlas0", "View_BaoWu_Panel");
        return _this;
    }
    View_BaoWu_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ViewBWGrid.URL, ViewBWGrid);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu.URL, Child_BaoWu);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_Jie.URL, Child_BaoWu_Jie);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_JiBan.URL, Child_BaoWu_JiBan);
    };
    View_BaoWu_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        GGlobal.modelBySys.CGGetinfobysys(Model_BySys.BAO_WU);
        GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_BAOWU);
    };
    View_BaoWu_Panel.prototype.check_juexing = function () {
        var s = this;
        s.checkBingFa();
        s.checkZhanJia();
        s.checkYiBao();
        s.checkTianShu();
        s.checkRed();
        s.checkShenJian();
    };
    View_BaoWu_Panel.prototype.checkZhanJia = function () {
        var r = GGlobal.reddot;
        this.btnSZ.checkNotice = r.checkCondition(UIConst.ZHAN_JIA) || r.checkCondition(UIConst.JUEXING, 6);
    };
    View_BaoWu_Panel.prototype.checkShenJian = function () {
        var r = GGlobal.reddot;
        this.btnSJ.checkNotice = r.checkCondition(UIConst.SHEN_JIAN) || r.checkCondition(UIConst.SHEN_JIAN, 1) || r.checkCondition(UIConst.SHEN_JIAN, 2) || r.checkCondition(UIConst.JUEXING, 2);
    };
    View_BaoWu_Panel.prototype.checkTianShu = function () {
        var s = this;
        s.btnTJ.checkNotice = false;
        var r = GGlobal.reddot;
        var ret = false;
        if (ModuleManager.isOpen(UIConst.TIANSHU)) {
            for (var i = 0; i < 6; i++) {
                ret = r.checkCondition(UIConst.TIANSHU, i);
                if (ret)
                    break;
            }
            if (!ret) {
                ret = r.checkCondition(UIConst.JUEXING, 4);
            }
            s.btnTJ.checkNotice = ret;
        }
    };
    View_BaoWu_Panel.prototype.checkBingFa = function () {
        var ret = false;
        for (var i = 0; i < 4; i++) {
            ret = GGlobal.reddot.checkCondition(UIConst.BINGFA, i);
            if (ret)
                break;
        }
        if (!ret)
            ret = GGlobal.reddot.checkCondition(UIConst.JUEXING, 5);
        this.btnBF.checkNotice = ret;
    };
    View_BaoWu_Panel.prototype.checkYiBao = function () {
        var r = GGlobal.reddot;
        this.btnYB.checkNotice = r.checkCondition(UIConst.YIBAO) || r.checkCondition(UIConst.YIBAO, 1) || r.checkCondition(UIConst.YIBAO, 2) || r.checkCondition(UIConst.JUEXING, 3);
    };
    View_BaoWu_Panel.prototype.shenjianHandle = function () {
        GGlobal.layerMgr.open(UIConst.SHEN_JIAN, this.c1.selectedIndex);
    };
    View_BaoWu_Panel.prototype.openBingFaHandler = function () {
        GGlobal.layerMgr.open(UIConst.BINGFA, this.c1.selectedIndex);
    };
    View_BaoWu_Panel.prototype.openTuJian = function () {
        //天书
        GGlobal.layerMgr.open(UIConst.TIANSHU, this.c1.selectedIndex);
    };
    View_BaoWu_Panel.prototype.openSZHandler = function () {
        GGlobal.layerMgr.open(UIConst.ZHAN_JIA, this.c1.selectedIndex);
    };
    View_BaoWu_Panel.prototype.openYiBao = function () {
        GGlobal.layerMgr.open(UIConst.YIBAO, this.c1.selectedIndex);
    };
    View_BaoWu_Panel.prototype.onShown = function () {
        var s = this;
        s.setExtends();
        var f = GGlobal.reddot;
        if (s._args) {
            s.c1.selectedIndex = s._args;
        }
        else {
            s.c1.selectedIndex = 0;
        }
        s.selectPage();
        s.onXianShi();
        s.iconSelImg.setXY(s.btnJH.x - 11, s.btnJH.y - 5);
        s.btnBF.addClickListener(s.openBingFaHandler, s);
        s.btnYB.addClickListener(s.openYiBao, s);
        s.btnSZ.addClickListener(s.openSZHandler, s);
        s.btnTJ.addClickListener(s.openTuJian, s);
        s.btnSJ.addClickListener(s.shenjianHandle, s);
        s.check_juexing();
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
        f.listen(ReddotEvent.CHECK_BAOWU, s.checkRed, s);
        f.listen(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
        f.listen(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
        f.listen(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
        f.listen(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
        f.listen(ReddotEvent.CHECK_YIBAO, s.checkYiBao, s);
        f.listen(UIConst.JUEXING, s.check_juexing, s);
    };
    View_BaoWu_Panel.prototype.onHide = function () {
        var s = this;
        var f = GGlobal.reddot;
        if (s._p) {
            s._p.close();
        }
        s._p = null;
        s.btnYB.removeClickListener(s.openYiBao, s);
        s.btnBF.removeClickListener(s.openBingFaHandler, s);
        s.btnTJ.removeClickListener(s.openTuJian, s);
        s.btnSJ.removeClickListener(s.shenjianHandle, s);
        s.btnSZ.removeClickListener(s.openSZHandler, s);
        f.remove(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
        f.remove(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
        f.remove(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
        f.remove(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
        f.remove(ReddotEvent.CHECK_YIBAO, s.checkYiBao, s);
        f.remove(ReddotEvent.CHECK_BAOWU, s.checkRed, s);
        f.remove(UIConst.JUEXING, s.check_juexing, s);
        this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        GGlobal.layerMgr.close(UIConst.BAOWU);
    };
    View_BaoWu_Panel.prototype.selectPage = function () {
        if (this._p) {
            this._p.close();
        }
        if (this.c1.selectedIndex == 0) {
            this.p0.open();
            this._p = this.p0;
        }
        else if (this.c1.selectedIndex == 1) {
            this.p1.open();
            this._p = this.p1;
        }
        else if (this.c1.selectedIndex == 2) {
            this.p2.open();
            this._p = this.p2;
        }
    };
    View_BaoWu_Panel.prototype.checkRed = function () {
        var r = false;
        var f = GGlobal.reddot;
        r = f.checkCondition(UIConst.BAOWU, 0) || f.checkCondition(UIConst.JUEXING, 1);
        this.tab0.checkNotice = r;
        //升阶
        this.tab1.checkNotice = f.checkCondition(UIConst.BAOWU, 1);
        this.tab2.checkNotice = f.checkCondition(UIConst.BAOWU, 2);
        this.btnJH.checkNotice = r || f.checkCondition(UIConst.BAOWU, 1) || f.checkCondition(UIConst.BAOWU, 2);
    };
    View_BaoWu_Panel.prototype.checkJihuo = function () {
        for (var i = 0; i < Model_BaoWu.baowuArr.length; i++) {
            var vo = Model_BaoWu.baowuArr[i];
            if (vo.state == 3) {
                return true;
            }
        }
        return false;
    };
    View_BaoWu_Panel.prototype.guide_baowu_select = function (step) {
        this.p0.guide_baowu_select(step);
    };
    View_BaoWu_Panel.prototype.check_baowu_select = function (value) {
        var isGuide = this.checkJihuo();
        if (isGuide)
            return true;
        if (this.c1.selectedIndex == 0) {
            return this.p0.check_select_grid();
        }
        else {
            return false;
        }
    };
    View_BaoWu_Panel.prototype.check_baowu_upstar = function () {
        var isGuide = this.checkJihuo();
        return isGuide;
    };
    View_BaoWu_Panel.prototype.guide_baowu_upstar = function (step) {
        this.p0.guide_baowu_upstar(step);
    };
    View_BaoWu_Panel.prototype.check_use_grid = function () {
        return this.p0.check_use_grid();
    };
    View_BaoWu_Panel.prototype.guide_use_grid = function (step) {
        this.p0.guide_use_grid(step);
    };
    View_BaoWu_Panel.prototype.check_baowu_useBt = function () {
        return this.p0.check_baowu_useBt();
    };
    View_BaoWu_Panel.prototype.guide_baowu_useBt = function (step) {
        this.p0.guide_baowu_useBt(step);
    };
    View_BaoWu_Panel.prototype.guide_baowu_upLv = function (step) {
        this.p1.guide_baowu_upLv(step);
    };
    View_BaoWu_Panel.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    View_BaoWu_Panel.prototype.onXianShi = function () {
        var arr = [];
        var boo;
        //宝物
        boo = ModuleManager.isXianShi(UIConst.BAOWU);
        this.btnJH.visible = boo;
        if (boo) {
            arr.push(this.btnJH);
        }
        //天书
        boo = ModuleManager.isXianShi(UIConst.TIANSHU);
        this.btnTJ.visible = boo;
        if (boo) {
            arr.push(this.btnTJ);
        }
        //神剑
        boo = ModuleManager.isXianShi(UIConst.SHEN_JIAN);
        this.btnSJ.visible = boo;
        if (boo) {
            arr.push(this.btnSJ);
        }
        //异宝
        boo = ModuleManager.isXianShi(UIConst.YIBAO);
        this.btnYB.visible = boo;
        if (boo) {
            arr.push(this.btnYB);
        }
        //战甲
        boo = ModuleManager.isXianShi(UIConst.ZHAN_JIA);
        this.btnSZ.visible = boo;
        if (boo) {
            arr.push(this.btnSZ);
        }
        //兵法
        boo = ModuleManager.isXianShi(UIConst.BINGFA);
        this.btnBF.visible = boo;
        if (boo) {
            arr.push(this.btnBF);
        }
        //按钮居中
        var jg = 15;
        var ww = 640;
        var w = 76;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            arr[i].x = (ww - len * w - (len - 1) * jg) / 2 + i * (w + jg);
        }
    };
    View_BaoWu_Panel.URL = "ui://3tzqotadjx2x34";
    return View_BaoWu_Panel;
}(UIPanelBase));
__reflect(View_BaoWu_Panel.prototype, "View_BaoWu_Panel");
