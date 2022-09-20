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
var VSHGaiLvItem = (function (_super) {
    __extends(VSHGaiLvItem, _super);
    function VSHGaiLvItem() {
        return _super.call(this) || this;
    }
    VSHGaiLvItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "VSHGaiLvItem"));
    };
    VSHGaiLvItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lb2 = (this.getChild("lb2"));
        this.lb3 = (this.getChild("lb3"));
        this.lb1 = (this.getChild("lb1"));
    };
    Object.defineProperty(VSHGaiLvItem.prototype, "vo", {
        set: function (v) {
            var times = JSON.parse(v.time);
            if (Number(times[0][1]) == 0) {
                this.lb3.text = times[0][0] + "次以上";
            }
            else {
                this.lb3.text = times[0][0] + "-" + times[0][1] + "次";
            }
            var fws = JSON.parse(v.fw);
            this.lb2.text = fws[0][0] + "-" + fws[0][1] + "星";
            this.lb1.text = v.id + "星";
        },
        enumerable: true,
        configurable: true
    });
    VSHGaiLvItem.URL = "ui://4aepcdbwl5k549";
    return VSHGaiLvItem;
}(fairygui.GComponent));
__reflect(VSHGaiLvItem.prototype, "VSHGaiLvItem");
