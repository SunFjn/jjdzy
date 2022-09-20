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
var ViewActLuckTurnTarge = (function (_super) {
    __extends(ViewActLuckTurnTarge, _super);
    function ViewActLuckTurnTarge() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewActLuckTurnTarge.createInstance = function () {
        return (fairygui.UIPackage.createObject("actLuckTurn", "ViewActLuckTurnTarge"));
    };
    ViewActLuckTurnTarge.prototype.childrenCreated = function () {
        GGlobal.createPack("actLuckTurn");
        var s = this;
        s.view = fairygui.UIPackage.createObject("actLuckTurn", "ViewActLuckTurnTarge").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
        s.list1.itemRenderer = s.renderHandle1;
        s.list1.callbackThisObj = s;
        s.list1.setVirtual();
    };
    ViewActLuckTurnTarge.prototype.onShown = function () {
        var m = GGlobal.model_LuckTurn;
        m.listen(Model_LuckTurn.TARGET, this.update, this);
        m.CG_TARGET_OPEN_10343();
        this.update();
    };
    ViewActLuckTurnTarge.prototype.onHide = function () {
        GGlobal.model_LuckTurn.remove(Model_LuckTurn.TARGET, this.update, this);
        this.list1.numItems = 0;
    };
    ViewActLuckTurnTarge.prototype.update = function () {
        var m = GGlobal.model_LuckTurn;
        var rk = "";
        var ct = "";
        this.dataArr1 = m.targetArr;
        this.dataArr1.sort(this.funcSort);
        this.list1.numItems = this.dataArr1.length;
        this.lb1.text = "我的获胜次数：" + m.winCt;
    };
    ViewActLuckTurnTarge.prototype.funcSort = function (a, b) {
        if (a.st == b.st) {
            return a.id - b.id;
        }
        else {
            if (a.st == 1) {
                return -1;
            }
            if (b.st == 1) {
                return 1;
            }
            if (a.st == 0) {
                return -1;
            }
            if (b.st == 0) {
                return 1;
            }
        }
        return 1;
    };
    ViewActLuckTurnTarge.prototype.renderHandle1 = function (index, obj) {
        var v = obj;
        v.setVo(this.dataArr1[index]);
    };
    ViewActLuckTurnTarge.URL = "ui://px5jiht9fvskf";
    return ViewActLuckTurnTarge;
}(UIModalPanel));
__reflect(ViewActLuckTurnTarge.prototype, "ViewActLuckTurnTarge");
