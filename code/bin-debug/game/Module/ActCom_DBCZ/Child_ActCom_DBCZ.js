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
var Child_ActCom_DBCZ = (function (_super) {
    __extends(Child_ActCom_DBCZ, _super);
    function Child_ActCom_DBCZ() {
        return _super.call(this) || this;
    }
    Child_ActCom_DBCZ.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_DBCZ", "Child_ActCom_DBCZ"));
    };
    /** 绑定ui的方法（静态方法） */
    Child_ActCom_DBCZ.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ActCom_DBCZItem.URL, ActCom_DBCZItem);
    };
    Child_ActCom_DBCZ.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_ActCom_DBCZ.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        self.show();
    };
    Child_ActCom_DBCZ.prototype.closePanel = function (pData) {
        var s = this;
        var c = GGlobal.control;
        Timer.instance.remove(s.upTimer, s);
        c.remove(Enum_MsgType.HUODONG_DAILYGIFT_814, s.upList, s);
        c.remove(Enum_MsgType.HUODONG_DAILYONE_814, s.upList, s);
        c.remove(Enum_MsgType.HUODONG_ADDRECHARGE_814, s.upList, s);
        c.remove(Enum_MsgType.HUODONG_DAILYADDUP_814, s.upList, s);
        s.list.numItems = 0;
        IconUtil.setImg(s.imgHeadbg, null);
    };
    Child_ActCom_DBCZ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
    };
    Child_ActCom_DBCZ.prototype.show = function () {
        var s = this;
        s.visible = true;
        s._hid = s.vo.id;
        Timer.instance.listen(s.upTimer, s, 1000);
        GGlobal.modelEightLock.CG4571(s._hid);
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
        IconUtil.setImg(s.imgHeadbg, Enum_Path.PIC_URL + "bar" + Config.jchd_723[s._hid].icon + ".jpg");
    };
    Child_ActCom_DBCZ.prototype.upList = function () {
        var self = this;
        self._listData = [];
        self.labCharge.text = "";
        self.imgCharge.visible = false;
        if (self._hid == UIConst.HUODONG_DAILY_GIFT814) {
            self._listData = self.getListData(Model_HuoD814.dailyGiftArr);
        }
        else if (self._hid == UIConst.HUODONG_DAILY_ONE814) {
            self._listData = this.getListDataDaiOne(Model_HuoD814.dailyOneArr);
        }
        else if (self._hid == UIConst.HUODONG_ADD_RECHARGE814) {
            self._listData = self.getListData(Model_HuoD814.addRechargeArr);
        }
        else if (self._hid == UIConst.HUODONG_DAILY_ADDUP814) {
            self._listData = self.getListData(Model_HuoD814.dailyAddUpArr);
        }
        self.list.numItems = self._listData ? self._listData.length : 0;
        if (self.list.numItems > 0) {
            self.list.scrollToView(0);
        }
        self.upTimer();
    };
    Child_ActCom_DBCZ.prototype.getListData = function (arr) {
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
    Child_ActCom_DBCZ.prototype.getListDataDaiOne = function (arr) {
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
    Child_ActCom_DBCZ.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index], this._hid);
    };
    Child_ActCom_DBCZ.prototype.upTimer = function () {
        var self = this;
        if (self.vo && (self._hid == UIConst.HUODONG_DAILY_GIFT814
            || self._hid == UIConst.HUODONG_DAILY_ONE814
            || self._hid == UIConst.HUODONG_DAILY_ADDUP814)) {
            //倒计时用
            var d = self.vo.getSurTime();
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
        else if (self.vo) {
            var d = self.vo.getSurTime();
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
    Child_ActCom_DBCZ.prototype.oneDayTime = function () {
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 + h0 - ms;
        return ax;
    };
    Child_ActCom_DBCZ.URL = "ui://ncy51skvglz70";
    /** 设置包名（静态属性） */
    Child_ActCom_DBCZ.pkg = "ActCom_DBCZ";
    return Child_ActCom_DBCZ;
}(fairygui.GComponent));
__reflect(Child_ActCom_DBCZ.prototype, "Child_ActCom_DBCZ", ["IPanel"]);
