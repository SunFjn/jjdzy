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
var Child_ActQFXF = (function (_super) {
    __extends(Child_ActQFXF, _super);
    function Child_ActQFXF() {
        return _super.call(this) || this;
    }
    Child_ActQFXF.createInstance = function () {
        return (fairygui.UIPackage.createObject("actQFXF", "Child_ActQFXF"));
    };
    Child_ActQFXF.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActQFXF.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(GridActQFXF.URL, GridActQFXF);
        f(ItemActQFXF.URL, ItemActQFXF);
    };
    Child_ActQFXF.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        s.list.setVirtual();
    };
    Child_ActQFXF.prototype.openPanel = function (pData) {
        var s = this;
        var m = GGlobal.model_ActQFXF;
        s.y = 275;
        s._act = pData;
        Timer.instance.listen(s.upTimer, s);
        m.listen(Model_ActQFXF.OPENUI, s.upView, s);
        GGlobal.modelActivity.CG_OPENACT(s._act.id);
        //红点
        // s.upView()
    };
    Child_ActQFXF.prototype.closePanel = function (pData) {
        var s = this;
        var m = GGlobal.model_ActQFXF;
        s.list.numItems = 0;
        Timer.instance.remove(s.upTimer, s);
        m.remove(Model_LuckTurn.OPENUI, s.upView, s);
    };
    Child_ActQFXF.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.closePanel();
    };
    Child_ActQFXF.prototype.itemRender = function (index, obj) {
        var s = this;
        var item = obj;
        item.vo = s._listData[index];
    };
    Child_ActQFXF.prototype.upTimer = function () {
        var s = this;
        var end = s._act ? s._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            s.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            s.labTime.text = "00:00:00";
        }
    };
    Child_ActQFXF.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_ActQFXF;
        // s._listData = m.qfxfArr ? m.qfxfArr : [];
        // s.list.numItems = s._listData.length;
        s.lbXF.text = m.grxf + "元宝";
        //排序
        var arr0 = [];
        var arr1 = [];
        var arr2 = [];
        for (var i = 0; i < m.qfxfArr.length; i++) {
            var st = 2;
            var vArr = m.qfxfArr[i];
            for (var j = 0; j < vArr.length; j++) {
                if (vArr[j].st == 1) {
                    st = 1;
                    break;
                }
                else if (vArr[j].st == 0) {
                    st = 0;
                }
            }
            if (st == 1) {
                arr1.push(vArr);
            }
            if (st == 2) {
                arr2.push(vArr);
            }
            if (st == 0) {
                arr0.push(vArr);
            }
        }
        s._listData = arr1.concat(arr0).concat(arr2);
        s.list.numItems = s._listData.length;
        if (s._listData.length > 0) {
            s.list.scrollToView(0);
        }
    };
    Child_ActQFXF.URL = "ui://p8fr1bvgkzdy5";
    Child_ActQFXF.pkg = "actQFXF";
    return Child_ActQFXF;
}(fairygui.GComponent));
__reflect(Child_ActQFXF.prototype, "Child_ActQFXF");
