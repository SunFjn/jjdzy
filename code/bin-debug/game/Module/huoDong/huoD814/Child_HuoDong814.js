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
var Child_HuoDong814 = (function (_super) {
    __extends(Child_HuoDong814, _super);
    function Child_HuoDong814() {
        return _super.call(this) || this;
    }
    Child_HuoDong814.createInstance = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(Child_HuoDong814.URL, Child_HuoDong814);
        fairygui.UIObjectFactory.setPackageItemExtension(VHuoDongI814.URL, VHuoDongI814);
        return (fairygui.UIPackage.createObject("huoDong", "Child_HuoDong"));
    };
    Object.defineProperty(Child_HuoDong814, "instance", {
        get: function () {
            if (Child_HuoDong814._instance == null) {
                Child_HuoDong814._instance = Child_HuoDong814.createInstance();
            }
            return Child_HuoDong814._instance;
        },
        enumerable: true,
        configurable: true
    });
    Child_HuoDong814.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgHeadbg = (this.getChild("imgHeadbg"));
        this.list = (this.getChild("list"));
        this.labTime = (this.getChild("labTime"));
        this.labTips = (this.getChild("labTips"));
        this.labCharge = (this.getChild("labCharge"));
        this.imgCharge = (this.getChild("imgCharge"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    Child_HuoDong814.prototype.show = function (p, id) {
        var s = this;
        s.visible = true;
        s._hid = id;
        p.addChild(s);
        s.setXY(0, 290);
        Timer.instance.listen(s.upTimer, s, 1000);
        GGlobal.modelEightLock.CG4571(id);
        if (s._hid == UIConst.HUODONG_DAILY_GIFT814) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYGIFT_814, s.upList, s);
            s.labTips.text = "每日登录即可领取豪华奖励";
        }
        else if (s._hid == UIConst.HUODONG_DAILY_ONE814) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYONE_814, s.upList, s);
            s.labTips.text = "单笔充值达到指定数额即可领取奖励";
        }
        else if (s._hid == UIConst.HUODONG_ADD_RECHARGE814) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_ADDRECHARGE_814, s.upList, s);
            s.labTips.text = "累计充值达到指定数额即可领取奖励";
        }
        else if (s._hid == UIConst.HUODONG_DAILY_ADDUP814) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYADDUP_814, s.upList, s);
            s.labTips.text = "累计充值达到指定数额即可领取奖励";
        }
        s.upList();
        IconUtil.setImg(s.imgHeadbg, Enum_Path.PIC_URL + "bar" + Config.jchd_723[id].icon + ".jpg");
    };
    Child_HuoDong814.prototype.disposePanel = function () {
        var s = this;
        if (s.parent) {
            s.parent.removeChild(s);
        }
        Timer.instance.remove(s.upTimer, s);
        GGlobal.control.remove(Enum_MsgType.HUODONG_DAILYGIFT_814, s.upList, s);
        GGlobal.control.remove(Enum_MsgType.HUODONG_DAILYONE_814, s.upList, s);
        GGlobal.control.remove(Enum_MsgType.HUODONG_ADDRECHARGE_814, s.upList, s);
        GGlobal.control.remove(Enum_MsgType.HUODONG_DAILYADDUP_814, s.upList, s);
        this.list.numItems = 0;
        IconUtil.setImg(s.imgHeadbg, null);
    };
    Child_HuoDong814.prototype.upList = function () {
        this._listData = [];
        this._act = null;
        this.labCharge.text = "";
        this.imgCharge.visible = false;
        this._act = ModelEightLock.getActVo(this._hid);
        if (this._hid == UIConst.HUODONG_DAILY_GIFT814) {
            this._listData = this.getListData(Model_HuoD814.dailyGiftArr);
        }
        else if (this._hid == UIConst.HUODONG_DAILY_ONE814) {
            this._listData = this.getListDataDaiOne(Model_HuoD814.dailyOneArr);
        }
        else if (this._hid == UIConst.HUODONG_ADD_RECHARGE814) {
            this._listData = this.getListData(Model_HuoD814.addRechargeArr);
        }
        else if (this._hid == UIConst.HUODONG_DAILY_ADDUP814) {
            this._listData = this.getListData(Model_HuoD814.dailyAddUpArr);
        }
        this.list.numItems = this._listData ? this._listData.length : 0;
        if (this.list.numItems > 0) {
            this.list.scrollToView(0);
        }
        this.upTimer();
    };
    Child_HuoDong814.prototype.getListData = function (arr) {
        var len = arr ? arr.length : 0;
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
        for (var i = 0; i < len; i++) {
            var $status = arr ? arr[i].status : 0;
            if ($status == 1) {
                arr1.push(arr[i]);
            }
            else if ($status == 2) {
                arr3.push(arr[i]);
            }
            else {
                arr2.push(arr[i]);
            }
        }
        return arr1.concat(arr2).concat(arr3);
    };
    //单笔充值
    Child_HuoDong814.prototype.getListDataDaiOne = function (arr) {
        var len = arr ? arr.length : 0;
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
        var cfg = Config.dbcz3_733;
        arr.sort(function (a, b) {
            return a.id < b.id ? -1 : 1;
        });
        for (var i = 0; i < len; i++) {
            var v = arr[i];
            var max = cfg[v.id].cs;
            var $status = arr ? arr[i].getStaCt(max) : 0;
            if ($status == 1) {
                arr1.push(arr[i]);
            }
            else if ($status == 2) {
                arr3.push(arr[i]);
            }
            else {
                arr2.push(arr[i]);
            }
        }
        return arr1.concat(arr2).concat(arr3);
    };
    Child_HuoDong814.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index], this._hid);
    };
    Child_HuoDong814.prototype.upTimer = function () {
        if (this._act && (this._hid == UIConst.HUODONG_DAILY_GIFT814
            || this._hid == UIConst.HUODONG_DAILY_ONE814
            || this._hid == UIConst.HUODONG_DAILY_ADDUP814)) {
            //倒计时用
            var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            if (d < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                var ax = this.oneDayTime();
                if (ax < 0) {
                    ax = 0;
                }
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
            }
        }
        else if (this._act) {
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
    Child_HuoDong814.prototype.oneDayTime = function () {
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 + h0 - ms;
        return ax;
    };
    Child_HuoDong814.URL = "ui://vrw7je9rt2amc";
    return Child_HuoDong814;
}(fairygui.GComponent));
__reflect(Child_HuoDong814.prototype, "Child_HuoDong814");
