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
var ViewDengFengPoint = (function (_super) {
    __extends(ViewDengFengPoint, _super);
    function ViewDengFengPoint() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewDengFengPoint.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ViewDengFengPoint"));
    };
    ViewDengFengPoint.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("syzlb", "ViewDengFengPoint").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderRew;
        s.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewDengFengPoint.prototype.onShown = function () {
        var s = this;
        s.registerEvent(true);
        var m = GGlobal.modelDengFengZJ;
        m.CG_POINT_DAT();
    };
    ViewDengFengPoint.prototype.onHide = function () {
        var s = this;
        s.registerEvent(false);
        s.list.numItems = 0;
    };
    ViewDengFengPoint.prototype.registerEvent = function (pFlag) {
        var self = this;
        var m = GGlobal.modelDengFengZJ;
        m.register(pFlag, Model_DengFengZJ.POINT_DAT, self.update, self);
    };
    ViewDengFengPoint.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelDengFengZJ;
        s.lbRank.text = "我的排名：" + (m.seaRank == 0 ? "未上榜" : HtmlUtil.fontNoSize(m.seaRank + "", Color.GREENSTR));
        s.lbPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.seaPoint + "", Color.GREENSTR);
        var arr = m.getCfgPointSea();
        //排序
        var arr1 = []; //可领取
        var arr2 = []; //未完成
        var arr3 = []; //已领取
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            var st = m.pointDat[v.id];
            if (st) {
                arr3.push(v);
            }
            else if (m.seaPoint >= v.point) {
                arr1.push(v);
            }
            else {
                arr2.push(v);
            }
        }
        s._lstArr = arr1.concat(arr2).concat(arr3);
        s.list.numItems = s._lstArr.length;
    };
    ViewDengFengPoint.prototype.renderRew = function (index, obj) {
        obj.vo = this._lstArr[index];
    };
    ViewDengFengPoint.URL = "ui://3o8q23uua0u32c";
    return ViewDengFengPoint;
}(UIModalPanel));
__reflect(ViewDengFengPoint.prototype, "ViewDengFengPoint");
