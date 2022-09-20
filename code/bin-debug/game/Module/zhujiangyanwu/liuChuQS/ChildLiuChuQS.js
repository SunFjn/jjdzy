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
var ChildLiuChuQS = (function (_super) {
    __extends(ChildLiuChuQS, _super);
    function ChildLiuChuQS() {
        return _super.call(this) || this;
    }
    ChildLiuChuQS.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ChildLiuChuQS"));
    };
    ChildLiuChuQS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHander;
        this.list.setVirtual();
    };
    ChildLiuChuQS.prototype.onShow = function () {
        var s = this;
        s.vTitle.addListen();
        var m = GGlobal.model_LiuChuQS;
        m.fristLogin();
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selHandle, s);
        m.listen(Model_LiuChuQS.openui, this.onUpdate, this);
        m.CG_OPENUI_8201();
        this.onUpdate();
    };
    ChildLiuChuQS.prototype.onHide = function () {
        var s = this;
        var m = GGlobal.model_LiuChuQS;
        s.vTitle.removeListen();
        s.list.numItems = 0;
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.selHandle, s);
        m.remove(Model_LiuChuQS.openui, this.onUpdate, this);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.openui, this.onUpdate, this);
    };
    ChildLiuChuQS.prototype.onUpdate = function () {
        var s = this;
        var m = GGlobal.model_LiuChuQS;
        var hard = m.getHard(m.curGuan);
        s._tabArr = m.getTabArr(hard);
        s.c1.selectedIndex = hard;
        this.list.numItems = s._tabArr.length;
        //定位到一下关卡
        var cur = m.curGuan;
        var scrTo = 0;
        if (cur != 0) {
            for (var i = 0; i < s._tabArr.length; i++) {
                var v = s._tabArr[i];
                if (Math.floor(cur / 1000) == Math.floor(v.id / 1000)) {
                    scrTo = i;
                }
            }
        }
        if (scrTo < 0) {
            scrTo = 0;
        }
        if (scrTo > s._tabArr.length - 1) {
            scrTo = s._tabArr.length - 1;
        }
        this.list.scrollToView(scrTo);
    };
    ChildLiuChuQS.prototype.renderHander = function (index, obj) {
        var v = obj;
        v.vo = this._tabArr[index];
    };
    ChildLiuChuQS.prototype.selHandle = function () {
        var s = this;
        var m = GGlobal.model_LiuChuQS;
        var hard = m.getHard(m.curGuan);
        if (s.c1.selectedIndex == 1) {
            if (hard == 0) {
                ViewCommonWarn.text("普通难度全部通关后开启");
                s.c1.selectedIndex = 0;
            }
        }
        else if (s.c1.selectedIndex == 0) {
            if (hard == 1) {
                ViewCommonWarn.text("普通难度已经全部通关");
                s.c1.selectedIndex = 1;
            }
        }
    };
    ChildLiuChuQS.URL = "ui://7a366usasr4011";
    return ChildLiuChuQS;
}(fairygui.GComponent));
__reflect(ChildLiuChuQS.prototype, "ChildLiuChuQS");
