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
 * 六道 分解界面
 */
var ChildSixWayFenJie = (function (_super) {
    __extends(ChildSixWayFenJie, _super);
    function ChildSixWayFenJie() {
        var _this = _super.call(this) || this;
        _this._panelId = 0;
        _this.idxArr = [0, 0, 0, 0, 1, 2, 3, 3, 4];
        _this.setSkin("lunhui", "lunhui_atlas0", "ChildSixWayFenJie");
        return _this;
    }
    ChildSixWayFenJie.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "ChildSixWayFenJie"));
    };
    ChildSixWayFenJie.prototype.constructFromXML = function (xml) {
        var self = this;
        CommonManager.parseChildren(self, self);
        // self.list.callbackThisObj = self;
        // self.list.itemRenderer = self.renderHander;
        // self.list.setVirtual();
        // self._checkArr = []
        // for (let i = 0; i < 5; i++) {
        // 	self._checkArr.push(<fairygui.GButton><any>(self.getChild("check" + i)))
        // }
    };
    ChildSixWayFenJie.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHander;
        self.list.setVirtual();
    };
    ChildSixWayFenJie.prototype.onShown = function () {
        var s = this;
        s._panelId = s._args;
        s.vres.setType(0);
        s.btnFenJ.addClickListener(s.onFenJ, s);
        s._checkArr = [];
        for (var i = 0; i < 5; i++) {
            s["check" + (i + 1)].addClickListener(s.onCheck, s);
            if (i < 2) {
                s["check" + (i + 1)].selected = true;
            }
            else {
                s["check" + (i + 1)].selected = false;
            }
            s._checkArr.push(s["check" + (i + 1)]);
        }
        for (var i = 0; i < Model_LunHui.bagArr.length; i++) {
            var v = Model_LunHui.bagArr[i];
            if (v.type == 0 || v.pz < 5) {
                v.fenJ = 1;
            }
            else {
                v.fenJ = 0;
            }
        }
        s.list.addEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
        GGlobal.control.listen(UIConst.SIXWAY_FENJIE, s.upFenJ, s);
        // GGlobal.socketMgr.registerReconnectHD("ChildBaZhenTuFenJ_onFenJ", Handler.create(GGlobal.modelBaZhenTu, GGlobal.modelBaZhenTu.CGOPENUI4401));
        s.update();
    };
    ChildSixWayFenJie.prototype.onHide = function () {
        var s = this;
        s.btnFenJ.removeClickListener(s.onFenJ, s);
        for (var i = 0; i < 5; i++) {
            s._checkArr[i].removeClickListener(s.onCheck, s);
        }
        // s.grid.showEff(false)
        s.list.numItems = 0;
        s.list.removeEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
        GGlobal.control.remove(UIConst.SIXWAY_FENJIE, s.upFenJ, s);
        // GGlobal.socketMgr.removeReconnectHD("ChildBaZhenTuFenJ_onFenJ");
        if (s._panelId == UIConst.SIXWAY) {
            GGlobal.layerMgr.open(UIConst.SIXWAY, 2);
        }
        else {
            GGlobal.layerMgr.open(UIConst.SIXWAY_YINJI, Model_LunHui.type);
        }
    };
    ChildSixWayFenJie.prototype.onCheck = function (e) {
        var checkBtn = e.currentTarget;
        if (checkBtn.id == this._checkArr[3].id || checkBtn.id == this._checkArr[4].id) {
            if (checkBtn.selected) {
                ViewAlert.show("\u5F53\u524D\u9009\u4E2D\u4E86\u73CD\u7A00\u5370\u8BB0\uFF0C\u786E\u8BA4\u5206\u89E3\uFF1F", Handler.create(this, this.doCheckSure, [checkBtn], true), ViewAlert.OKANDCANCEL, "确认", "取消", Handler.create(this, this.doCheckCancel, [checkBtn], true), false, Handler.create(this, this.doCheckCancel, [checkBtn], true));
                return;
            }
        }
        this.doCheck();
    };
    ChildSixWayFenJie.prototype.doCheckSure = function (check) {
        check.selected = true;
        this.doCheck();
    };
    ChildSixWayFenJie.prototype.doCheckCancel = function (check) {
        check.selected = false;
        this.doCheck();
    };
    ChildSixWayFenJie.prototype.doCheck = function () {
        var s = this;
        var model = GGlobal.modellh;
        var arr = [];
        for (var i = 0; i < 5; i++) {
            if (s._checkArr[i].selected) {
                if (i == 0) {
                    arr.push(2);
                    arr.push(3);
                }
                else if (i == 4) {
                    arr.push(8);
                }
                else {
                    arr.push(i + 3);
                }
            }
        }
        for (var i = 0; i < Model_LunHui.bagArr.length; i++) {
            var v = Model_LunHui.bagArr[i];
            var isFj = 0;
            for (var j = 0; j < arr.length; j++) {
                if (v.pz == arr[j]) {
                    isFj = 1;
                    break;
                }
            }
            v.fenJ = isFj;
        }
        model.notify(Model_LunHui.CHECKED);
        s.upYinji();
    };
    ChildSixWayFenJie.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.grid.isShowEff = true;
        gird.voFenJ = this._showArr[index];
    };
    ChildSixWayFenJie.prototype.itemClick = function (e) {
        var gird = e.itemObject;
        this.upSelect(gird.vo);
        gird.onCheck();
        this.upYinji();
    };
    ChildSixWayFenJie.prototype.update = function () {
        var s = this;
        s._showArr = [];
        for (var i = 0; i < Model_LunHui.bagArr.length; i++) {
            s._showArr.push(Model_LunHui.bagArr[i]);
        }
        s._showArr.sort(s.sortFunc);
        s.list.numItems = s._showArr.length;
        if (Model_LunHui.bagArr.length > 0) {
            s.list.scrollToView(0);
            s.list.selectedIndex = 0;
        }
        s.upSelect(s._showArr[0]);
        s.upYinji();
        s.btnFenJ.checkNotice = Model_BaZhenTu.checkFenJ();
    };
    ChildSixWayFenJie.prototype.sortFunc = function (a, b) {
        if (a.pz != b.pz) {
            return a.pz - b.pz;
        }
        if (a.lv != b.lv) {
            return a.lv - b.lv;
        }
        if (a.star != b.star) {
            return a.star - b.star;
        }
        return a.id - b.id;
    };
    ChildSixWayFenJie.prototype.upSelect = function (v) {
        var self = this;
        self._selectVo = v;
        self.grid.isShowEff = true;
        self.grid.vo = v;
        if (v && v.cfg) {
            self.lbName.text = ConfigHelp.createColorName(v.name, v.pz);
            self.lbLevel.text = "Lv." + v.lv + "/" + v.maxLv;
            self.lbPower.text = "战力：" + v.power;
            self.lbAttr.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
        }
        else {
            self.lbPower.text = "";
            self.lbName.text = "";
            self.lbLevel.text = "";
            self.lbAttr.text = "";
        }
    };
    ChildSixWayFenJie.prototype.onFenJ = function () {
        if (!TimeUitl.cool("ChildSixWayFenJie_onFenJ", 200)) {
            return;
        }
        var s = this;
        var loacIndex = 0;
        var arr = [];
        var tyfenJ = true;
        for (var i = 0; i < Model_LunHui.bagArr.length; i++) {
            var v = Model_LunHui.bagArr[i];
            var idx = s.idxArr[v.cfg.pz];
            if (v.fenJ == 1) {
                arr.push(v.pos);
                //分解的  check未选中
                if (tyfenJ && s._checkArr[idx].selected == false) {
                    tyfenJ = false;
                }
            }
            else {
                //不分解  check选中了
                if (tyfenJ && s._checkArr[idx].selected == true) {
                    tyfenJ = false;
                }
            }
        }
        if (arr.length == 0) {
            ViewCommonWarn.text("未选中任何印记");
            return;
        }
        if (tyfenJ) {
            var arrCheck = [];
            for (var i = 0; i < s._checkArr.length; i++) {
                var ck = this._checkArr[i];
                if (ck.selected) {
                    if (i == 0) {
                        arrCheck.push(2);
                        arrCheck.push(3);
                    }
                    else if (i == 4) {
                        arrCheck.push(8);
                    }
                    else {
                        arrCheck.push(i + 3);
                    }
                }
            }
            GGlobal.modellh.CG_FENJIEBYTYPE(arrCheck);
        }
        else {
            GGlobal.modellh.CG_RESOLVE(arr);
        }
    };
    ChildSixWayFenJie.prototype.upYinji = function () {
        var s = this;
        var m = GGlobal.modellh;
        var total = 0;
        for (var i = 0; i < Model_LunHui.bagArr.length; i++) {
            var v = Model_LunHui.bagArr[i];
            if (v.fenJ == 1) {
                total += v.fjNum;
            }
        }
        var str = ConfigHelp.numToStr(total);
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + "29.png", s.vres.getChild("icon").asLoader);
        s.vres.text = str;
        s.vres.color = Color.WHITEINT;
    };
    ChildSixWayFenJie.prototype.upFenJ = function () {
        for (var i = 0; i < 5; i++) {
            this._checkArr[i].selected = false;
        }
        this.update();
    };
    ChildSixWayFenJie.URL = "ui://ehelf5bh11m1wz";
    return ChildSixWayFenJie;
}(UIPanelBase));
__reflect(ChildSixWayFenJie.prototype, "ChildSixWayFenJie");
