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
var Child_ActHolyBXiLian = (function (_super) {
    __extends(Child_ActHolyBXiLian, _super);
    function Child_ActHolyBXiLian() {
        return _super.call(this) || this;
    }
    Child_ActHolyBXiLian.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "Child_ActHolyBXiLian"));
    };
    Child_ActHolyBXiLian.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgHeadbg = (this.getChild("imgHeadbg"));
        this.list = (this.getChild("list"));
        this.labTime = (this.getChild("labTime"));
        this.labTips = (this.getChild("labTips"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
    };
    Object.defineProperty(Child_ActHolyBXiLian, "instance", {
        get: function () {
            if (Child_ActHolyBXiLian._instance == null) {
                Child_ActHolyBXiLian._instance = Child_ActHolyBXiLian.createInstance();
            }
            return Child_ActHolyBXiLian._instance;
        },
        enumerable: true,
        configurable: true
    });
    Child_ActHolyBXiLian.prototype.show = function (p, id) {
        var s = this;
        s._hid = id;
        Timer.instance.listen(this.upTimer, this, 1000);
        p.addChild(s);
        s.setXY(0, 257);
        GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XILIAN, this.upList, this);
        GGlobal.modelEightLock.CG4571(id);
        this.upList();
        IconUtil.setImg1(Enum_Path.PIC_URL + "bar" + Config.xitong_001[id].icon + ".jpg", this.imgHeadbg);
    };
    Child_ActHolyBXiLian.prototype.upList = function () {
        var model = GGlobal.modelActHolyB;
        this._listData = Model_HuoDong.getListData(model.xlArr);
        this._act = ModelEightLock.getActVo(this._hid);
        this.list.numItems = this._listData ? this._listData.length : 0;
        if (this.list.numItems > 0) {
            this.list.scrollToView(0);
        }
        this.upTimer();
    };
    Child_ActHolyBXiLian.prototype.disposePanel = function () {
        var s = this;
        if (s.parent) {
            s.parent.removeChild(s);
        }
        Timer.instance.remove(s.upTimer, s);
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XILIAN, s.upList, s);
        s.list.numItems = 0;
        IconUtil.setImg1(null, this.imgHeadbg);
    };
    Child_ActHolyBXiLian.prototype.dispose = function () {
        Child_ActHolyBXiLian._instance = null;
        _super.prototype.dispose.call(this);
    };
    Child_ActHolyBXiLian.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index], this._hid);
    };
    Child_ActHolyBXiLian.prototype.upTimer = function () {
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
    Child_ActHolyBXiLian.URL = "ui://d5y9ngt6ccyk0";
    return Child_ActHolyBXiLian;
}(fairygui.GComponent));
__reflect(Child_ActHolyBXiLian.prototype, "Child_ActHolyBXiLian", ["IActHolyBeast"]);
