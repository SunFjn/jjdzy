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
var ChildBaZhenTuFenJ = (function (_super) {
    __extends(ChildBaZhenTuFenJ, _super);
    function ChildBaZhenTuFenJ() {
        var _this = _super.call(this) || this;
        _this.idxArr = [0, 0, 0, 0, 1, 2, 3, 3, 4];
        return _this;
    }
    ChildBaZhenTuFenJ.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "ChildBaZhenTuFenJ"));
    };
    ChildBaZhenTuFenJ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHander;
        this.list.setVirtual();
        this._checkArr = [];
        for (var i = 1; i <= 5; i++) {
            this._checkArr.push((this.getChild("check" + i)));
        }
        var img = this.labGod.getChild("icon");
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + Config.daoju_204[Model_BaZhenTu.GODid].icon + ".png", img);
    };
    ChildBaZhenTuFenJ.prototype.open = function () {
        var s = this;
        s.btnFenJ.addClickListener(s.onFenJ, s);
        s.btnLock.addClickListener(s.onLock, s);
        s.btnUnLock.addClickListener(s.onUnLock, s);
        for (var i = 0; i < 5; i++) {
            this._checkArr[i].addClickListener(s.onCheck, s);
            if (i < 2) {
                this._checkArr[i].selected = true;
            }
            else {
                this._checkArr[i].selected = false;
            }
        }
        s.grid.tipEnable = true;
        for (var i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
            var v = Model_BaZhenTu.bagArr[i];
            if (v.type == 0 || v.pz < 5) {
                v.fenJ = 1;
            }
            else {
                v.fenJ = 0;
            }
        }
        s.list.addEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
        GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.LOCK, this.upLock, this);
        GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.OPENUI, this.update, this);
        GGlobal.modelPlayer.listen(Model_player.FUWEN_UPDATE, s.upFuwen, s);
        GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.UP_FENJIE, s.upFenJ, s);
        GGlobal.socketMgr.registerReconnectHD("ChildBaZhenTuFenJ_onFenJ", Handler.create(GGlobal.modelBaZhenTu, GGlobal.modelBaZhenTu.CGOPENUI4401));
        s.update();
    };
    ChildBaZhenTuFenJ.prototype.close = function () {
        var s = this;
        s.btnFenJ.removeClickListener(s.onFenJ, s);
        s.btnLock.removeClickListener(s.onLock, s);
        s.btnUnLock.removeClickListener(s.onUnLock, s);
        for (var i = 0; i < 5; i++) {
            this._checkArr[i].removeClickListener(s.onCheck, s);
        }
        s.grid.tipEnable = false;
        s.grid.showEff(false);
        s.list.numItems = 0;
        s.list.removeEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
        GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.LOCK, this.upLock, this);
        GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.OPENUI, this.update, this);
        GGlobal.modelPlayer.remove(Model_player.FUWEN_UPDATE, s.upFuwen, s);
        GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.UP_FENJIE, s.upFenJ, s);
        GGlobal.socketMgr.removeReconnectHD("ChildBaZhenTuFenJ_onFenJ");
    };
    ChildBaZhenTuFenJ.prototype.onFenJ = function () {
        if (!TimeUitl.cool("ChildBaZhenTuFenJ_onFenJ", 200)) {
            return;
        }
        var s = this;
        var loacIndex = 0;
        var arr = [];
        var tyfenJ = true;
        for (var i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
            var v = Model_BaZhenTu.bagArr[i];
            if (v.locked == 1 && v.type != 0)
                continue;
            if (v.locked == 1)
                loacIndex++;
            var idx = s.idxArr[v.cfg.pz];
            if (v.fenJ == 1) {
                arr.push(v.pos);
                //分解的  check未选中
                if (tyfenJ && this._checkArr[idx].selected == false) {
                    tyfenJ = false;
                }
            }
            else {
                //不分解  check选中了
                if (tyfenJ && this._checkArr[idx].selected == true) {
                    tyfenJ = false;
                }
            }
        }
        if (arr.length == 0) {
            if (loacIndex > 0) {
                ViewCommonWarn.text("选中符文已被锁定");
            }
            else {
                ViewCommonWarn.text("未选中任何符文");
            }
            return;
        }
        if (tyfenJ) {
            var arrCheck = [];
            for (var i = 0; i < this._checkArr.length; i++) {
                var ck = this._checkArr[i];
                if (ck.selected) {
                    // arrCheck.push(i + 2);
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
            GGlobal.modelBaZhenTu.CG_FENJIE_4421(arrCheck);
        }
        else {
            GGlobal.modelBaZhenTu.CGFenjie4409(arr);
        }
    };
    ChildBaZhenTuFenJ.prototype.onLock = function () {
        if (this._selectVo) {
            if (this._selectVo.cfg && this._selectVo.cfg.type != 0) {
                GGlobal.modelBaZhenTu.CGLocked4413(this._selectVo.pos, 1);
            }
        }
    };
    ChildBaZhenTuFenJ.prototype.onUnLock = function () {
        if (this._selectVo) {
            GGlobal.modelBaZhenTu.CGLocked4413(this._selectVo.pos, 0);
        }
    };
    ChildBaZhenTuFenJ.prototype.update = function () {
        this._showArr = [];
        for (var i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
            this._showArr.push(Model_BaZhenTu.bagArr[i]);
        }
        this._showArr.sort(this.sortFunc);
        this.list.numItems = this._showArr.length;
        if (Model_BaZhenTu.bagArr.length > 0) {
            this.list.scrollToView(0);
            this.list.selectedIndex = 0;
        }
        this.upSelect(this._showArr[0]);
        this.upFuwen();
        this.btnFenJ.checkNotice = Model_BaZhenTu.checkFenJ();
    };
    ChildBaZhenTuFenJ.prototype.sortFunc = function (a, b) {
        if (a.pz != b.pz) {
            return a.pz - b.pz;
        }
        if (a.starLv != b.starLv) {
            return a.starLv - b.starLv;
        }
        if (a.level != b.level) {
            return a.level - b.level;
        }
        return a.id - b.id;
    };
    ChildBaZhenTuFenJ.prototype.upSelect = function (v) {
        var self = this;
        self._selectVo = v;
        self.grid.isShowEff = true;
        self.grid.vo = v;
        if (v && v.cfg) {
            self.lbName.text = ConfigHelp.createColorName(v.name, v.pz); //HtmlUtil.fontNoSize(v.name, Color.QUALITYCOLORH[v.pz]);
            if (v.type == 0) {
                self.lbLevel.text = "";
                self.lbPower.text = "";
                self.lbAttr.text = v.tipDes;
            }
            else {
                self.lbLevel.text = "Lv." + v.level + "/" + v.maxLv;
                self.lbPower.text = "战力：" + v.power;
                self.lbAttr.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
            }
            if (v.type == 0) {
                self.btnLock.visible = false;
                self.btnUnLock.visible = false;
                self.imgLock.visible = false;
            }
            else {
                if (v.locked == 0) {
                    self.btnLock.visible = true;
                    self.btnUnLock.visible = false;
                }
                else {
                    self.btnLock.visible = false;
                    self.btnUnLock.visible = true;
                }
                self.imgLock.visible = v.locked == 1;
            }
        }
        else {
            self.lbPower.text = "";
            self.lbName.text = "";
            self.lbLevel.text = "";
            self.lbAttr.text = "";
            self.btnLock.visible = false;
            self.btnUnLock.visible = false;
            self.imgLock.visible = false;
        }
    };
    ChildBaZhenTuFenJ.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.grid.isShowEff = true;
        gird.voFenJ = this._showArr[index];
    };
    ChildBaZhenTuFenJ.prototype.itemClick = function (e) {
        var gird = e.itemObject;
        this.upSelect(gird.vo);
        gird.onCheck();
        this.upFuwen();
    };
    ChildBaZhenTuFenJ.prototype.upLock = function () {
        this.list.numItems = Model_BaZhenTu.bagArr.length;
        if (this._selectVo) {
            this.upSelect(this._selectVo);
        }
        else {
            this.upSelect(Model_BaZhenTu.bagArr[0]);
        }
        this.upFuwen();
    };
    ChildBaZhenTuFenJ.prototype.onCheck = function (e) {
        var checkBtn = e.currentTarget;
        if (checkBtn.id == this._checkArr[3].id || checkBtn.id == this._checkArr[4].id) {
            if (checkBtn.selected) {
                ViewAlert.show("\u5F53\u524D\u9009\u4E2D\u4E86\u73CD\u7A00\u7B26\u6587\uFF0C\u786E\u8BA4\u5206\u89E3\uFF1F", Handler.create(this, this.doCheckSure, [checkBtn], true), ViewAlert.OKANDCANCEL, "确认", "取消", Handler.create(this, this.doCheckCancel, [checkBtn], true), false, Handler.create(this, this.doCheckCancel, [checkBtn], true));
                return;
            }
        }
        this.doCheck();
    };
    ChildBaZhenTuFenJ.prototype.doCheckSure = function (check) {
        check.selected = true;
        this.doCheck();
    };
    ChildBaZhenTuFenJ.prototype.doCheckCancel = function (check) {
        check.selected = false;
        this.doCheck();
    };
    //				 [0, 1, 2, 3, 4, 5, 6, 7, 8]
    ChildBaZhenTuFenJ.prototype.doCheck = function () {
        var arr = [];
        for (var i = 0; i < 5; i++) {
            if (this._checkArr[i].selected) {
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
        for (var i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
            var v = Model_BaZhenTu.bagArr[i];
            var isFj = 0;
            for (var j = 0; j < arr.length; j++) {
                if (v.pz == arr[j]) {
                    isFj = 1;
                    break;
                }
            }
            v.fenJ = isFj;
        }
        GGlobal.modelBaZhenTu.notify(Model_BaZhenTu.CHECKED);
        this.upFuwen();
    };
    ChildBaZhenTuFenJ.prototype.upFuwen = function () {
        var total = 0;
        var toGod = 0;
        for (var i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
            var v = Model_BaZhenTu.bagArr[i];
            if (v.locked == 1 && v.type > 0) {
                continue;
            }
            if (v.fenJ == 1) {
                total += v.fjExp;
                toGod += v.fjGod;
            }
        }
        var str = ConfigHelp.numToStr(Model_player.voMine.fuwen);
        if (total > 0) {
            str += HtmlUtil.fontNoSize("(+" + ConfigHelp.numToStr(total) + ")", Color.GREENSTR);
        }
        this.labChip.text = str;
        //神符碎片
        str = ConfigHelp.numToStr(Model_Bag.getItemCount(Model_BaZhenTu.GODid));
        if (toGod > 0) {
            str += HtmlUtil.fontNoSize("(+" + ConfigHelp.numToStr(toGod) + ")", Color.GREENSTR);
        }
        this.labGod.text = str;
    };
    ChildBaZhenTuFenJ.prototype.upFenJ = function () {
        for (var i = 0; i < 5; i++) {
            this._checkArr[i].selected = false;
        }
        this.update();
    };
    ChildBaZhenTuFenJ.URL = "ui://xrzn9ppaf8nk2";
    return ChildBaZhenTuFenJ;
}(fairygui.GComponent));
__reflect(ChildBaZhenTuFenJ.prototype, "ChildBaZhenTuFenJ");
