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
var Child_ShengJieShop = (function (_super) {
    __extends(Child_ShengJieShop, _super);
    function Child_ShengJieShop() {
        return _super.call(this) || this;
    }
    Child_ShengJieShop.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "Child_ShengJieShop"));
    };
    Child_ShengJieShop.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.list = (s.getChild("list"));
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHandle;
        s.list.setVirtual();
        s.timeLb = (s.getChild("timeLb"));
    };
    Child_ShengJieShop.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(GGlobal.modelCZFL.shengjieShop[index]);
    };
    Child_ShengJieShop.prototype.show = function () {
        var s = this;
        this.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(Math.floor(Model_GlobalMsg.getkaiFuTime() / 1000));
        this.list.numItems = GGlobal.modelCZFL.shengjieShop.length;
        Timer.instance.listen(s.timeHandle, s, 1000);
    };
    Child_ShengJieShop.prototype.timeHandle = function () {
        this.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(Math.floor(Model_GlobalMsg.getkaiFuTime() / 1000));
    };
    Child_ShengJieShop.prototype.open = function () {
        var s = this;
        GGlobal.control.listen(Enum_MsgType.SHENGJIE_SHOP, s.show, s);
        if (GGlobal.modelCZFL.shengjieShop.length <= 0) {
            GGlobal.modelCZFL.CG_OPEN_SHENGJIESHOP();
        }
        else {
            s.show();
        }
    };
    Child_ShengJieShop.prototype.close = function () {
        var s = this;
        s.list.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.SHENGJIE_SHOP, s.show, s);
        Timer.instance.remove(s.timeHandle, s);
    };
    Child_ShengJieShop.URL = "ui://qzsojhcrpdbd1h";
    return Child_ShengJieShop;
}(fairygui.GComponent));
__reflect(Child_ShengJieShop.prototype, "Child_ShengJieShop", ["ICZFLView"]);
