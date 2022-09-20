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
var Child_QMKH = (function (_super) {
    __extends(Child_QMKH, _super);
    function Child_QMKH() {
        var _this = _super.call(this) || this;
        _this.panelId = 0;
        _this.arr = [];
        _this.times = 0;
        return _this;
    }
    Child_QMKH.createInstance = function () {
        return (fairygui.UIPackage.createObject("QMKH", "Child_QMKH"));
    };
    Child_QMKH.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.list = (a.getChild("list"));
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.list.setVirtual();
        a.timeLb = (a.getChild("timeLb"));
        a.titleBg = (a.getChild("titleBg"));
    };
    Child_QMKH.prototype.renderHandler = function (index, obj) {
        var item = obj;
        item.show(this.arr[index], this.panelId);
    };
    Child_QMKH.prototype.updateShow = function () {
        var a = this;
        switch (a.panelId) {
            case UIConst.QUANMIN_KUANGHUAN_BOSS:
                a.arr = GGlobal.modelqmkh.bossArr;
                break;
            case UIConst.QUANMIN_KUANGHUAN_XIAOXIONG:
                a.arr = GGlobal.modelqmkh.xiaoxiongArr;
                break;
            case UIConst.QUANMIN_KUANGHUAN_LVBU:
                a.arr = GGlobal.modelqmkh.lvbuArr;
                break;
            case UIConst.QUANMIN_KUANGHUAN_FUHUI:
                a.arr = GGlobal.modelqmkh.fuhuiArr;
                break;
        }
        a.list.numItems = a.arr.length;
        IconUtil.setImg(a.titleBg, Enum_Path.BACK_URL + a.panelId + ".jpg");
        // let vo = Model_Activity.getActivty1(UIConst.QUANMIN_KUANGHUAN, a.panelId);
        var vo = GGlobal.modelActivity.get(UIConst.QUANMIN_KUANGHUAN, a.panelId);
        a.times = vo.end - Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
        Timer.instance.listen(a.timeHandle, a, 1000);
    };
    Child_QMKH.prototype.timeHandle = function () {
        this.times--;
        this.timeLb.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(this.times), Color.getColorStr(2));
    };
    Child_QMKH.prototype.open = function () {
        var a = this;
        GGlobal.modelqmkh.CG_QUANMINKUANGHUAN_OPENUI(a.panelId);
        GGlobal.control.listen(Enum_MsgType.QUANMIN_KUANGHUAN, a.updateShow, a);
    };
    Child_QMKH.prototype.close = function () {
        var a = this;
        Timer.instance.remove(this.timeHandle, this);
        for (var i = 0; i < this.list._children.length; i++) {
            var item = this.list._children[i];
            item.clean();
        }
        GGlobal.control.remove(Enum_MsgType.QUANMIN_KUANGHUAN, a.updateShow, a);
        IconUtil.setImg(a.titleBg, null);
        a.list.numItems = 0;
    };
    Child_QMKH.URL = "ui://vrex0iz4tznx4";
    return Child_QMKH;
}(fairygui.GComponent));
__reflect(Child_QMKH.prototype, "Child_QMKH");
