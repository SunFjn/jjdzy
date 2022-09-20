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
var VSHHuanXing = (function (_super) {
    __extends(VSHHuanXing, _super);
    function VSHHuanXing() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this.loadRes("shouhunJX", "shouhunJX_atlas0");
        return _this;
    }
    VSHHuanXing.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "VSHHuanXing"));
    };
    VSHHuanXing.prototype.childrenCreated = function () {
        var s = this;
        var view = fairygui.UIPackage.createObject("shouhunJX", "VSHHuanXing").asCom;
        s.contentPane = view;
        CommonManager.parseChildren(view, s);
        _super.prototype.childrenCreated.call(this);
    };
    VSHHuanXing.prototype.onShown = function () {
        var s = this;
        s._data = s._args;
        s._index = 0;
        s.btnHX.addClickListener(s.onHandHX, s);
        s.btnJiH.addClickListener(s.onHandJiH, s);
        s.btnRight.addClickListener(s.onRight, s);
        s.btnLeft.addClickListener(s.onLeft, s);
        GGlobal.modelSHJX.listen(ModelSH.msg_huanx_ui, s.openUI, s);
        GGlobal.modelSHJX.listen(ModelSH.msg_huanx_buy, s.upBuy, s);
        s._hxArr = [];
        for (var k in Config.shhx_266) {
            var v = Config.shhx_266[k];
            if (v.type == s._data.yj) {
                s._hxArr.push(v);
            }
        }
        s.onUpdate();
        GGlobal.modelSHJX.CGHXUI_5695(s._data.yj);
    };
    VSHHuanXing.prototype.onHide = function () {
        var s = this;
        s.btnHX.removeClickListener(s.onHandHX, s);
        s.btnJiH.removeClickListener(s.onHandJiH, s);
        s.btnRight.removeClickListener(s.onRight, s);
        s.btnLeft.removeClickListener(s.onLeft, s);
        GGlobal.modelSHJX.remove(ModelSH.msg_huanx_ui, s.openUI, s);
        GGlobal.modelSHJX.remove(ModelSH.msg_huanx_buy, s.upBuy, s);
        GGlobal.layerMgr.close(s.panelId);
        s.container.setEff(null);
    };
    VSHHuanXing.prototype.onHandHX = function () {
        var s = this;
        var v = s._hxArr[s._index];
        GGlobal.modelSHJX.CGWEAR_5699(v.type, v.id);
    };
    VSHHuanXing.prototype.onHandJiH = function () {
        var s = this;
        var v = s._hxArr[s._index];
        GGlobal.modelSHJX.CGBUY_5697(v.type, v.id);
    };
    VSHHuanXing.prototype.onRight = function () {
        var s = this;
        s._index++;
        if (s._index > s._hxArr.length - 1) {
            s._index = s._hxArr.length - 1;
        }
        s.onSel(s._hxArr[s._index]);
    };
    VSHHuanXing.prototype.onLeft = function () {
        var s = this;
        s._index--;
        if (s._index < 0) {
            s._index = 0;
        }
        s.onSel(s._hxArr[s._index]);
    };
    //定位已经幻化的
    VSHHuanXing.prototype.openUI = function () {
        var s = this;
        s._index = 0;
        var m = GGlobal.modelSHJX;
        var arr = m.huanXObj[s._data.yj];
        arr.sort(function (a, b) { return a.id - b.id; });
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].st == 1) {
                s._index = i;
                break;
            }
        }
        s.onUpdate();
    };
    VSHHuanXing.prototype.upBuy = function () {
        var s = this;
        s.onUpdate();
    };
    VSHHuanXing.prototype.onUpdate = function () {
        var s = this;
        s.onSel(s._hxArr[s._index]);
    };
    VSHHuanXing.prototype.onSel = function (val) {
        var s = this;
        s.container.setEff("uieff/" + val.mod2);
        s.lbName.text = val.name;
        s.lbName.color = Color.getColorInt(val.pz);
        s.lbPower.text = val.power + "";
        s.lbAttr.text = ConfigHelp.attrString(JSON.parse(val.attr));
        if (s._index <= 0) {
            s.btnLeft.visible = false;
            s.btnRight.visible = true;
        }
        else if (s._index >= s._hxArr.length - 1) {
            s.btnLeft.visible = true;
            s.btnRight.visible = false;
        }
        else {
            s.btnLeft.visible = true;
            s.btnRight.visible = true;
        }
        var m = GGlobal.modelSHJX;
        var arr = m.huanXObj[s._data.yj];
        var len = arr ? arr.length : 0;
        var st = 0;
        for (var i = 0; i < len; i++) {
            if (arr[i].id == val.id) {
                st = arr[i].st;
                break;
            }
        }
        s._st = st;
        if (val.conmuse == "0") {
            s.c2.selectedIndex = 0;
        }
        else {
            s.c2.selectedIndex = 1;
            var conmuse = JSON.parse(val.conmuse);
            this.lbCost.text = conmuse[0][2] + "";
            if (Model_player.voMine.yuanbao < Number(conmuse[0][2])) {
                this.lbCost.color = Color.REDINT;
            }
            else {
                this.lbCost.color = Color.GREENINT;
            }
            var red = (Model_player.voMine.yuanbao >= Number(conmuse[0][2]));
            this.btnHX.checkNotice = red;
        }
        if (st == 0) {
            s.c1.selectedIndex = 0;
            this.btnHX.text = "激活";
        }
        else if (st == 1) {
            s.c1.selectedIndex = 2; //已幻形
        }
        else if (st == 2) {
            s.c1.selectedIndex = 1;
            this.btnHX.text = "幻形";
            this.btnHX.checkNotice = false;
        }
        this.btnRight.checkNotice = GGlobal.reddot.checkCondition(UIConst.SH_HUANX, val.type - 1);
    };
    VSHHuanXing.URL = "ui://4aepcdbwbvfw5g";
    return VSHHuanXing;
}(UIModalPanel));
__reflect(VSHHuanXing.prototype, "VSHHuanXing");
