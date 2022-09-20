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
var View_YB_Panel = (function (_super) {
    __extends(View_YB_Panel, _super);
    function View_YB_Panel() {
        var _this = _super.call(this) || this;
        _this.setSkin("role", "role_atlas0", "View_BaoWu_Panel");
        return _this;
    }
    View_YB_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ViewBWGrid.URL, ViewYBGrid);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu.URL, Child_YB);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_Jie.URL, Child_YB_Jie);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_BaoWu_JiBan.URL, Child_YB_JiBan);
    };
    View_YB_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        GGlobal.modelYiBao.CG_OPEN_YIBAO();
        GGlobal.modelBySys.CGGetinfobysys(Model_BySys.YI_BAO);
        GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_YIBAO);
    };
    View_YB_Panel.prototype.check_juexing = function () {
        var s = this;
        s.checkBingFa();
        s.checkZhanJia();
        s.checkBaoWu();
        s.checkTianShu();
        s.checkRed();
        s.checkShenJian();
    };
    View_YB_Panel.prototype.checkZhanJia = function () {
        var r = GGlobal.reddot;
        this.btnSZ.checkNotice = r.checkCondition(UIConst.ZHAN_JIA) || r.checkCondition(UIConst.JUEXING, 6);
    };
    View_YB_Panel.prototype.checkBaoWu = function () {
        var r = GGlobal.reddot;
        this.btnJH.checkNotice = r.checkCondition(UIConst.BAOWU) || r.checkCondition(UIConst.BAOWU, 1) || r.checkCondition(UIConst.BAOWU, 2) || r.checkCondition(UIConst.JUEXING, 1);
    };
    View_YB_Panel.prototype.checkShenJian = function () {
        var r = GGlobal.reddot;
        this.btnSJ.checkNotice = r.checkCondition(UIConst.SHEN_JIAN) || r.checkCondition(UIConst.SHEN_JIAN, 1) || r.checkCondition(UIConst.SHEN_JIAN, 2) || r.checkCondition(UIConst.JUEXING, 2);
    };
    View_YB_Panel.prototype.checkTianShu = function () {
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
    View_YB_Panel.prototype.checkBingFa = function () {
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
    View_YB_Panel.prototype.openJiangHunHandle = function () {
        //宝物
        GGlobal.layerMgr.open(UIConst.BAOWU, this.c1.selectedIndex);
    };
    View_YB_Panel.prototype.shenjianHandle = function () {
        GGlobal.layerMgr.open(UIConst.SHEN_JIAN, this.c1.selectedIndex);
    };
    View_YB_Panel.prototype.openBingFaHandler = function () {
        GGlobal.layerMgr.open(UIConst.BINGFA, this.c1.selectedIndex);
    };
    View_YB_Panel.prototype.openTuJian = function () {
        //天书
        GGlobal.layerMgr.open(UIConst.TIANSHU, this.c1.selectedIndex);
    };
    View_YB_Panel.prototype.openSZHandler = function () {
        GGlobal.layerMgr.open(UIConst.ZHAN_JIA, this.c1.selectedIndex);
    };
    View_YB_Panel.prototype.onShown = function () {
        var s = this;
        var f = GGlobal.reddot;
        s.setExtends();
        if (s._args) {
            s.c1.selectedIndex = s._args;
        }
        else {
            s.c1.selectedIndex = 0;
        }
        s.onXianShi();
        s.iconSelImg.setXY(s.btnYB.x - 11, s.btnYB.y - 5);
        s.btnBF.addClickListener(s.openBingFaHandler, s);
        s.btnSZ.addClickListener(s.openSZHandler, s);
        s.btnTJ.addClickListener(s.openTuJian, s);
        s.btnSJ.addClickListener(s.shenjianHandle, s);
        s.btnJH.addClickListener(s.openJiangHunHandle, s);
        s.selectPage();
        s.check_juexing();
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        f.listen(ReddotEvent.CHECK_YIBAO, this.checkRed, this);
        f.listen(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
        f.listen(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
        f.listen(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
        f.listen(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
        f.listen(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
        f.listen(UIConst.JUEXING, s.check_juexing, s);
    };
    View_YB_Panel.prototype.onHide = function () {
        var s = this;
        var f = GGlobal.reddot;
        if (s._p) {
            s._p.onClose();
        }
        s._p = null;
        s.btnBF.removeClickListener(s.openBingFaHandler, s);
        s.btnTJ.removeClickListener(s.openTuJian, s);
        s.btnSJ.removeClickListener(s.shenjianHandle, s);
        s.btnJH.removeClickListener(s.openJiangHunHandle, s);
        s.btnSZ.removeClickListener(s.openSZHandler, s);
        f.remove(ReddotEvent.CHECK_BINGFA, s.checkBingFa, s);
        f.remove(ReddotEvent.CHECK_ZHAN_JIA, s.checkZhanJia, s);
        f.remove(ReddotEvent.CHECK_BAOWU, s.checkBaoWu, s);
        f.remove(ReddotEvent.CHECK_TIANSHU, s.checkTianShu, s);
        f.remove(ReddotEvent.CHECK_SHENJIAN, s.checkShenJian, s);
        f.remove(ReddotEvent.CHECK_YIBAO, s.checkRed, s);
        f.remove(UIConst.JUEXING, s.check_juexing, s);
        this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
        GGlobal.layerMgr.close(UIConst.YIBAO);
    };
    View_YB_Panel.prototype.selectPage = function () {
        var self = this;
        if (self._p) {
            self._p.onClose();
            self._p = null;
        }
        if (self.c1.selectedIndex == 0) {
            self.p0.onOpen();
            self._p = this.p0;
        }
        else if (self.c1.selectedIndex == 1) {
            self.p1.onOpen();
            self._p = self.p1;
        }
        else {
            self.p2.onOpen();
            self._p = self.p1;
        }
    };
    View_YB_Panel.prototype.checkRed = function () {
        var f = GGlobal.reddot;
        this.tab0.checkNotice = f.checkCondition(UIConst.YIBAO, 0) || f.checkCondition(UIConst.JUEXING, 3);
        //升阶
        this.tab1.checkNotice = f.checkCondition(UIConst.YIBAO, 1);
        //升阶
        this.tab2.checkNotice = f.checkCondition(UIConst.YIBAO, 2);
        this.btnYB.checkNotice = f.checkCondition(UIConst.YIBAO, 0) || f.checkCondition(UIConst.YIBAO, 1) || f.checkCondition(UIConst.YIBAO, 2) || f.checkCondition(UIConst.JUEXING, 3);
    };
    View_YB_Panel.prototype.onXianShi = function () {
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
    View_YB_Panel.URL = "ui://3tzqotadyoiw1f";
    return View_YB_Panel;
}(UIPanelBase));
__reflect(View_YB_Panel.prototype, "View_YB_Panel");
