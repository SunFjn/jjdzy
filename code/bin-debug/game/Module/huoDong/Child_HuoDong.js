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
var Child_HuoDong = (function (_super) {
    __extends(Child_HuoDong, _super);
    function Child_HuoDong() {
        return _super.call(this) || this;
    }
    Child_HuoDong.createInstance = function () {
        return (fairygui.UIPackage.createObject("huoDong", "Child_HuoDong"));
    };
    Child_HuoDong.prototype.constructFromXML = function (xml) {
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
    Child_HuoDong.prototype.show = function (a, id) {
        this.visible = true;
        this._hid = id;
        Timer.instance.listen(this.upTimer, this, 1000);
        if (this._hid == UIConst.HUODONG_DAILY_GIFT) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYGIFT_OPENUI, this.upList, this);
            GGlobal.modelActivity.CG_OPENACT(id);
            this.labTips.text = "每日登录即可领取豪华奖励";
        }
        else if (this._hid == UIConst.HUODONG_DAI_GIFT_ACT) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAIGIFTACT_UI, this.upList, this);
            GGlobal.modelActivity.CG_OPENACT(id);
            this.labTips.text = "每日登录即可领取豪华奖励";
        }
        else if (this._hid == UIConst.HUODONG_DAI_GIFT_KF) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAIGIFTKF_UI, this.upList, this);
            GGlobal.modelHuoDong.CG_DAIGIFTKF_UI();
            this.labTips.text = "每日登录即可领取豪华奖励";
        }
        else if (this._hid == UIConst.HUODONG_DAILY_ONE) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYONE_OPENUI, this.upList, this);
            GGlobal.modelActivity.CG_OPENACT(id);
            this.labTips.text = "单笔充值达到指定数额即可领取奖励";
        }
        else if (this._hid == UIConst.HUODONG_DAI_ONE_KF) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAIONEKF_UI, this.upList, this);
            GGlobal.modelHuoDong.CG_DAIONEKF_UI();
            this.labTips.text = "单笔充值达到指定数额即可领取奖励";
        }
        else if (this._hid == UIConst.HUODONG_DAI_ONE_ACT) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAIONEACT_UI, this.upList, this);
            GGlobal.modelHuoDong.CG_DAIONEACT_UI();
            this.labTips.text = "单笔充值达到指定数额即可领取奖励";
        }
        else if (this._hid == UIConst.HUODONG_ADD_RECHARGE) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_ADDRECHARGE_OPENUI, this.upList, this);
            GGlobal.modelHuoDong.CG_ADDRECHARGE_OPENUI2();
            this.labTips.text = "累计充值达到指定数额即可领取奖励";
        }
        else if (this._hid == UIConst.HUODONG_DAILY_ADDUP) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAILYADDUP_OPENUI, this.upList, this);
            GGlobal.modelHuoDong.CG_DAILYADDUP_OPENUI();
            this.labTips.text = "累计充值达到指定数额即可领取奖励";
        }
        else if (this._hid == UIConst.HUODONG_DAI_ADD_KF) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAIADDKF_UI, this.upList, this);
            GGlobal.modelHuoDong.CG_DAIADDKF_OPENUI();
            this.labTips.text = "累计充值达到指定数额即可领取奖励";
        }
        else if (this._hid == UIConst.HUODONG_DAI_ADD_ACT) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_DAIADDACT_UI, this.upList, this);
            GGlobal.modelHuoDong.CG_DAIADDACT_OPENUI();
            this.labTips.text = "累计充值达到指定数额即可领取奖励";
        }
        else if (this._hid == UIConst.HUODONG_SEVEN_KAIFU) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, this.upList, this);
            GGlobal.modelHuoDong.CG_SEVEN_KAIFU_UI();
            this.labTips.text = "累计充值满" + ConfigHelp.getSystemNum(3201) + "元且达到指定天数可领取奖励";
        }
        else if (this._hid == UIConst.HUODONG_SEVEN_ACT) {
            GGlobal.control.listen(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, this.upList, this);
            GGlobal.modelHuoDong.CG_SEVEN_ACT_UI();
            this.labTips.text = "累计充值满" + ConfigHelp.getSystemNum(3201) + "元且达到指定天数可领取奖励";
        }
        this.upList();
        if (id == UIConst.HUODONG_ADD_RECHARGESYS) {
            id = UIConst.HUODONG_ADD_RECHARGE;
        }
        IconUtil.setImg1(Enum_Path.PIC_URL + "bar" + Config.jchd_723[id].icon + ".jpg", this.imgHeadbg);
    };
    Child_HuoDong.prototype.upList = function () {
        var self = this;
        self._listData = [];
        self._act = null;
        self.labCharge.text = "";
        self.imgCharge.visible = false;
        if (self._hid == UIConst.HUODONG_DAILY_GIFT) {
            self._listData = self.getListDataGift(Model_HuoDong.dailyGiftArr);
            // self._act = Model_Activity.getActivty(Model_HuoDong.TYPE, self._hid, Model_HuoDong.dailyGiftQs)
            self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid, Model_HuoDong.dailyGiftQs);
        }
        else if (self._hid == UIConst.HUODONG_DAI_GIFT_ACT) {
            self._listData = self.getListDataGift(Model_HuoDong.daiGiftActArr);
            // self._act = Model_Activity.getActivty(Model_HuoDong.TYPE, self._hid, Model_HuoDong.daiGiftActQs)
            self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid, Model_HuoDong.daiGiftActQs);
        }
        else if (self._hid == UIConst.HUODONG_DAI_GIFT_KF) {
            self._listData = self.getListDataGift(Model_HuoDong.daiGiftKfArr);
            self._act = null;
        }
        else if (self._hid == UIConst.HUODONG_DAILY_ONE) {
            var arr = Model_HuoDong.getDailyOneArr(Model_HuoDong.dailyOneQs);
            var len = arr ? arr.length : 0;
            var arr1 = []; //可领取
            var arr2 = []; //不能领取
            var arr3 = []; //已领取
            for (var i = 0; i < len; i++) {
                arr[i].index = i;
                var $status = Model_HuoDong.dailyOneArr ? Model_HuoDong.dailyOneArr[i] : 0;
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
            self._listData = arr1.concat(arr2).concat(arr3);
            // self._act = Model_Activity.getActivty(Model_HuoDong.TYPE, self._hid, Model_HuoDong.dailyOneQs)
            self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid, Model_HuoDong.dailyOneQs);
        }
        else if (self._hid == UIConst.HUODONG_DAI_ONE_KF) {
            self._listData = self.getListDataDaiOne(Model_HuoDong.daiOneKfArr, self._hid);
            self._act = null;
        }
        else if (self._hid == UIConst.HUODONG_DAI_ONE_ACT) {
            self._listData = self.getListDataDaiOne(Model_HuoDong.daiOneActArr, self._hid);
            // self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid);
            self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
        }
        else if (self._hid == UIConst.HUODONG_ADD_RECHARGE) {
            self._listData = self.getListData(Model_HuoDong.addRechargeArr);
            // self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid)
            self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
        }
        else if (self._hid == UIConst.HUODONG_DAILY_ADDUP) {
            self._listData = self.getListData(Model_HuoDong.dailyAddUpArr);
            // self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid)
            self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
        }
        else if (self._hid == UIConst.HUODONG_DAI_ADD_KF) {
            self._listData = self.getListData(Model_HuoDong.daiAddKfArr);
            // self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid);
            self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
        }
        else if (self._hid == UIConst.HUODONG_DAI_ADD_ACT) {
            self._listData = self.getListData(Model_HuoDong.daiAddActArr);
            // self._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, self._hid);
            self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid);
        }
        else if (self._hid == UIConst.HUODONG_SEVEN_KAIFU) {
            self._listData = self.getListData(Model_HuoDong.sevenKfArr);
            self._act = null;
            self.labCharge.text = "今日已充：" + Model_HuoDong.sevenKf + "元";
            self.imgCharge.visible = true;
        }
        else if (self._hid == UIConst.HUODONG_SEVEN_ACT) {
            self._listData = self.getListData(Model_HuoDong.sevenKfArr);
            self._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, self._hid, Model_HuoDong.sevenQs);
            self.labCharge.text = "今日已充：" + Model_HuoDong.sevenKf + "元";
            self.imgCharge.visible = true;
        }
        self.list.numItems = self._listData ? self._listData.length : 0;
        if (self.list.numItems > 0) {
            self.list.scrollToView(0);
        }
        self.upTimer();
    };
    Child_HuoDong.prototype.getListData = function (arr) {
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
    Child_HuoDong.prototype.getListDataGift = function (giftArr) {
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
        for (var i = 1; i < 5; i++) {
            if (giftArr[i] == 1) {
                arr1.push(i);
            }
            else if (giftArr[i] == 2) {
                arr3.push(i);
            }
            else {
                arr2.push(i);
            }
        }
        return arr1.concat(arr2).concat(arr3);
    };
    //单笔充值
    Child_HuoDong.prototype.getListDataDaiOne = function (arr, hid) {
        var len = arr ? arr.length : 0;
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
        var cfg = this._hid == UIConst.HUODONG_DAI_ONE_KF ? Config.dbcz1_733 : Config.dbcz2_733;
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
    Child_HuoDong.prototype.disposePanel = function () {
        var control = GGlobal.control;
        Timer.instance.remove(this.upTimer, this);
        control.remove(Enum_MsgType.HUODONG_DAILYGIFT_OPENUI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_DAIGIFTACT_UI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_DAIGIFTKF_UI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_DAILYONE_OPENUI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_DAIONEKF_UI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_DAIONEACT_UI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_ADDRECHARGE_OPENUI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_DAILYADDUP_OPENUI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_DAIADDKF_UI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_DAIADDACT_UI, this.upList, this);
        control.remove(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, this.upList, this);
        this.visible = false;
        IconUtil.setImg1(null, this.imgHeadbg);
        this.list.numItems = 0;
    };
    Child_HuoDong.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index], this._hid);
    };
    Child_HuoDong.prototype.upTimer = function () {
        if (this._act && (this._hid == UIConst.HUODONG_DAI_GIFT_ACT ||
            this._hid == UIConst.HUODONG_DAI_ONE_ACT ||
            this._hid == UIConst.HUODONG_DAI_ADD_ACT)) {
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
        else if (this._hid == UIConst.HUODONG_DAI_GIFT_KF ||
            this._hid == UIConst.HUODONG_DAI_ONE_KF ||
            this._hid == UIConst.HUODONG_DAI_ADD_KF) {
            //倒计时用
            var ax = this.kaiFuTime();
            if (ax < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                var ax_1 = this.oneDayTime();
                if (ax_1 < 0) {
                    ax_1 = 0;
                }
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax_1 / 1000) >> 0);
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
        else if (this._hid == UIConst.HUODONG_SEVEN_KAIFU) {
            //倒计时用
            var ax = this.kaiFuTime();
            if (ax < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
            }
        }
        else if (this._hid == UIConst.HUODONG_ADD_RECHARGE) {
            if (Model_GlobalMsg.kaifuDay > 7) {
                var act = GGlobal.modelActivity.get(UIConst.HUODONG, UIConst.HUODONG_ADD_RECHARGE);
                if (act) {
                    this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(act.getSurTime());
                }
                else {
                    this.labTime.text = "剩余时间：已结束";
                }
            }
            else {
                var ax = this.kaiFuTime();
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
            }
        }
        else {
            this.labTime.text = "剩余时间：";
        }
    };
    Child_HuoDong.prototype.kaiFuTime = function () {
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 - (ms - h0);
        var day = Model_GlobalMsg.kaifuDay;
        ax += 86400000 * (7 - day);
        return ax;
    };
    Child_HuoDong.prototype.oneDayTime = function () {
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 + h0 - ms;
        return ax;
    };
    Child_HuoDong.URL = "ui://vrw7je9rt2amc";
    return Child_HuoDong;
}(fairygui.GComponent));
__reflect(Child_HuoDong.prototype, "Child_HuoDong");
