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
 * /**
 * 少主护送战报item
 */
var ShaoZhuEscReportItem = (function (_super) {
    __extends(ShaoZhuEscReportItem, _super);
    function ShaoZhuEscReportItem() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        _this.order = 0;
        return _this;
    }
    ShaoZhuEscReportItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscReportItem"));
    };
    ShaoZhuEscReportItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        this.roomBt.addClickListener(self.onRoom, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = this.itemRender;
        // self.list.setVirtual();
    };
    ShaoZhuEscReportItem.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._awards[idx]);
    };
    ShaoZhuEscReportItem.prototype.onRoom = function () {
        GGlobal.modelShaoZhuEscort.CG_LOOK_REPORT(this.order);
    };
    ShaoZhuEscReportItem.prototype.setdata = function (data, index) {
        var s = this;
        s.order = index;
        var ret = data[0];
        var name = data[1];
        if (data[2]) {
            s._awards = ConfigHelp.makeItemListArr(data[2]);
        }
        s.win.visible = ret == 1;
        s.lose.visible = ret != 1;
        if (ret == 0) {
            s.c1.selectedIndex = 1;
            s.n13.text = BroadCastManager.reTxt("{0}拦截了你的少主，使你损失了", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
            if (s._awards) {
                s.list.numItems = s._awards.length;
            }
        }
        else {
            s.c1.selectedIndex = 0;
            if (ret == 1) {
                s.n3.text = BroadCastManager.reTxt("{0}来拦截你的少主，被你狠狠地教训了一顿", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
            }
            else {
                s.n3.text = BroadCastManager.reTxt("{0}拦截了你的少主，幸亏是吕布护送，没有造成损失", HtmlUtil.fontNoSize(name, Color.getColorStr(2)));
            }
        }
    };
    ShaoZhuEscReportItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    ShaoZhuEscReportItem.URL = "ui://lnw94ki2lnitn";
    return ShaoZhuEscReportItem;
}(fairygui.GComponent));
__reflect(ShaoZhuEscReportItem.prototype, "ShaoZhuEscReportItem");
