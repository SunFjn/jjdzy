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
var Child_ActHolyBHuoYue = (function (_super) {
    __extends(Child_ActHolyBHuoYue, _super);
    function Child_ActHolyBHuoYue() {
        var _this = _super.call(this) || this;
        _this._preIndex = 0;
        return _this;
    }
    Child_ActHolyBHuoYue.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "Child_ActHolyBHuoYue"));
    };
    Child_ActHolyBHuoYue.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getController("c1");
        this.imgHeadbg = (this.getChild("imgHeadbg"));
        this.list = (this.getChild("list"));
        this.labTime = (this.getChild("labTime"));
        this.labTips = (this.getChild("labTips"));
        this._tabArr = [];
        for (var i = 0; i < 4; i++) {
            this._tabArr.push((this.getChild("tab" + i)));
        }
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
    };
    Object.defineProperty(Child_ActHolyBHuoYue, "instance", {
        get: function () {
            if (Child_ActHolyBHuoYue._instance == null) {
                Child_ActHolyBHuoYue._instance = Child_ActHolyBHuoYue.createInstance();
            }
            return Child_ActHolyBHuoYue._instance;
        },
        enumerable: true,
        configurable: true
    });
    Child_ActHolyBHuoYue.prototype.show = function (p, id) {
        var s = this;
        s.visible = true;
        s._hid = id;
        Timer.instance.listen(s.upTimer, s, 1000);
        s.c1.selectedIndex = 0;
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selHandle, s);
        p.addChild(s);
        s.setXY(0, 257);
        s.upView();
        for (var i = 0; i < this._tabArr.length; i++) {
            var iconObject = this._tabArr[i].getChild("icon").asLoader;
            ImageLoader.instance.loader(Enum_Path.MAINUI_URL + "64060" + (i + 1) + ".png", iconObject);
        }
        s.checkTab();
        GGlobal.reddot.listen(UIConst.ACTHB_HUOYUE, s.checkTab, s);
        GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_HUOYUE, this.upView, this);
        GGlobal.modelEightLock.CG4571(id);
        IconUtil.setImg1(Enum_Path.PIC_URL + "bar" + Config.xitong_001[id].icon + ".jpg", this.imgHeadbg);
    };
    Child_ActHolyBHuoYue.prototype.disposePanel = function () {
        var s = this;
        if (s.parent) {
            s.parent.removeChild(s);
        }
        Timer.instance.remove(s.upTimer, s);
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, s.selHandle, s);
        GGlobal.reddot.remove(UIConst.ACTHB_HUOYUE, s.checkTab, s);
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_HUOYUE, s.upView, s);
        s.list.numItems = 0;
        IconUtil.setImg1(null, this.imgHeadbg);
    };
    Child_ActHolyBHuoYue.prototype.dispose = function () {
        Child_ActHolyBHuoYue._instance = null;
        _super.prototype.dispose.call(this);
    };
    Child_ActHolyBHuoYue.prototype.upView = function () {
        this._act = null;
        this._act = ModelEightLock.getActVo(this._hid);
        this.upTimer();
        this.upList();
    };
    Child_ActHolyBHuoYue.prototype.selHandle = function () {
        var ms = Model_GlobalMsg.getServerTime();
        var data = new Date(ms);
        var week = data.getDay();
        if (week == 0 && this.c1.selectedIndex == 1) {
            this.c1.selectedIndex = this._preIndex;
            ViewCommonWarn.text("周日单刀赴会不开放");
            return;
        }
        this._preIndex = this.c1.selectedIndex;
        this.upList();
    };
    Child_ActHolyBHuoYue.prototype.upList = function () {
        var model = GGlobal.modelActHolyB;
        var index = this.c1.selectedIndex;
        this._listData = Model_HuoDong.getListData(model.huoYObj[index + 1]);
        this.list.numItems = this._listData ? this._listData.length : 0;
        if (this.list.numItems > 0) {
            this.list.scrollToView(0);
        }
    };
    Child_ActHolyBHuoYue.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index], this._hid);
    };
    Child_ActHolyBHuoYue.prototype.upTimer = function () {
        if (this._act) {
            var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            if (d < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
            }
        }
        else {
            this.labTime.text = "剩余时间：";
        }
    };
    Child_ActHolyBHuoYue.prototype.checkTab = function () {
        for (var i = 0; i < this._tabArr.length; i++) {
            var btn = this._tabArr[i];
            var red = GGlobal.reddot.checkCondition(UIConst.ACTHB_HUOYUE, i + 1);
            if (btn)
                btn.getChild("noticeImg").visible = red;
        }
    };
    Child_ActHolyBHuoYue.URL = "ui://d5y9ngt6n2pm5";
    return Child_ActHolyBHuoYue;
}(fairygui.GComponent));
__reflect(Child_ActHolyBHuoYue.prototype, "Child_ActHolyBHuoYue", ["IActHolyBeast"]);
