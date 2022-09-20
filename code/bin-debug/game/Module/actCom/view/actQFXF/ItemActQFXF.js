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
var ItemActQFXF = (function (_super) {
    __extends(ItemActQFXF, _super);
    function ItemActQFXF() {
        return _super.call(this) || this;
    }
    ItemActQFXF.createInstance = function () {
        return (fairygui.UIPackage.createObject("actQFXF", "ItemActQFXF"));
    };
    ItemActQFXF.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        s.list.setVirtual();
    };
    Object.defineProperty(ItemActQFXF.prototype, "vo", {
        set: function (v) {
            var s = this;
            var tarXF = v[0].cfg.qf;
            var nowXF = GGlobal.model_ActQFXF.qfxf;
            s.lbCost.text = "目标：" + ConfigHelp.getYiWanText(tarXF);
            s.lb.text = "当前：" + ConfigHelp.getYiWanText(nowXF);
            s.lb.color = nowXF >= tarXF ? Color.getColorInt(2) : Color.getColorInt(6);
            s._lisDat = [];
            var arr0 = [];
            var arr1 = [];
            var arr2 = [];
            for (var i = 0; i < v.length; i++) {
                if (v[i].st == 0) {
                    arr0.push(v[i]);
                }
                else if (v[i].st == 1) {
                    arr1.push(v[i]);
                }
                else {
                    arr2.push(v[i]);
                }
            }
            s._lisDat = arr1.concat(arr0).concat(arr2);
            s.list.numItems = s._lisDat.length;
            if (s._lisDat.length > 0) {
                s.list.scrollToView(0);
            }
            var red = false;
            for (var i = 0; i < v.length; i++) {
                if (v[i].st == 1) {
                    red = true;
                    break;
                }
            }
            s.noticeImg.visible = red;
        },
        enumerable: true,
        configurable: true
    });
    ItemActQFXF.prototype.itemRender = function (index, obj) {
        var s = this;
        var item = obj;
        item.vo = s._lisDat[index];
    };
    ItemActQFXF.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    ItemActQFXF.URL = "ui://p8fr1bvgkzdy6";
    return ItemActQFXF;
}(fairygui.GComponent));
__reflect(ItemActQFXF.prototype, "ItemActQFXF");
