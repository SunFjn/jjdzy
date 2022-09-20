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
var ChildGroupBuy = (function (_super) {
    __extends(ChildGroupBuy, _super);
    function ChildGroupBuy() {
        var _this = _super.call(this) || this;
        _this.lastWeek = -1;
        return _this;
    }
    ChildGroupBuy.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "ChildGroupBuy"));
    };
    ChildGroupBuy.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getController("c1");
        this.list = (this.getChild("list"));
        this.tab0 = (this.getChild("tab0"));
        this.tab1 = (this.getChild("tab1"));
        this.tab2 = (this.getChild("tab2"));
        this.tab3 = (this.getChild("tab3"));
        this.tab4 = (this.getChild("tab4"));
        this.imgHeadbg = (this.getChild("imgHeadbg"));
        this.imgCharge = (this.getChild("imgCharge"));
        this.labTime = (this.getChild("labTime"));
        this.labTips = (this.getChild("labTips"));
        this.labCharge = (this.getChild("labCharge"));
        this.list.setVirtual();
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHD;
        this.tabList = [this.tab0, this.tab1, this.tab2, this.tab3, this.tab4];
    };
    ChildGroupBuy.getInst = function () {
        return this._inst || (this._inst = ChildGroupBuy.createInstance());
    };
    ChildGroupBuy.prototype.renderHD = function (idx, obj) {
        var item = obj;
        item.setVo(this.listDta[idx]);
    };
    ChildGroupBuy.prototype.updateX = function () {
        //倒计时用
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 - (ms - h0);
        var day = Model_GlobalMsg.kaifuDay;
        ax += 86400000 * (7 - day);
        if (ax < 0) {
            this.labTime.text = "活动剩余时间：已结束";
        }
        else {
            var ms_1 = Model_GlobalMsg.getServerTime();
            var data_1 = DateUtil.clearHourse(new Date(ms_1));
            var h0_1 = data_1.getTime();
            var ax_1 = 86400000 + h0_1 - ms_1;
            if (ax_1 < 0) {
                ax_1 = 0;
            }
            // this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
            this.labTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4((ax_1 / 1000) >> 0);
        }
    };
    ChildGroupBuy.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelGroupBuy;
        s.upCharge();
        s.tabDta = [];
        s.dta = [];
        var index = -1;
        for (var i = 0; i < m.buyArr.length; i++) {
            var v = m.buyArr[i];
            var conf = Config.sctg_730[v.id];
            if (s.tabDta.indexOf(conf.renshu) == -1) {
                s.tabDta.push(conf.renshu);
                index++;
                s.dta[index] = [];
            }
            s.dta[index].push(v);
        }
        for (var i = 0; i < s.tabDta.length; i++) {
            this.tabList[i].text = "团购" + s.tabDta[i] + "人";
            var arr = s.dta[i];
            var check = false;
            for (var j = 0; j < arr.length; j++) {
                var v = arr[j];
                if (v.status == 1) {
                    check = true;
                    break;
                }
            }
            this.tabList[i].checkNotice = check;
        }
        s.pageChange();
    };
    ChildGroupBuy.prototype.upCharge = function () {
        var s = this;
        var m = GGlobal.modelGroupBuy;
        s.labCharge.text = "今日已充：" + m.charge + "元";
    };
    ChildGroupBuy.prototype.open = function () {
        var s = this;
        var m = GGlobal.modelGroupBuy;
        IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "shouchongtuangou.jpg");
        GGlobal.control.listen(Enum_MsgType.GROUP_BUY_UI, s.update, s);
        GGlobal.control.listen(Enum_MsgType.GROUP_BUY_CHARGE, s.upCharge, s);
        GGlobal.control.listen(Enum_MsgType.GROUP_BUY_NUM, s.pageChange, s);
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.pageChange, s);
        Timer.instance.listen(this.updateX, this, 1000);
        s.update();
    };
    ChildGroupBuy.prototype.close = function () {
        var s = this;
        IconUtil.setImg(this.imgHeadbg, null);
        GGlobal.control.remove(Enum_MsgType.GROUP_BUY_UI, s.update, s);
        GGlobal.control.remove(Enum_MsgType.GROUP_BUY_CHARGE, s.upCharge, s);
        GGlobal.control.remove(Enum_MsgType.GROUP_BUY_NUM, s.pageChange, s);
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.pageChange, s);
        Timer.instance.remove(this.updateX, this);
        s.c1.selectedIndex = 0;
        s.list.numItems = 0;
    };
    ChildGroupBuy.prototype.pageChange = function () {
        var s = this;
        var i = s.c1.selectedIndex;
        if (s.dta == null || s.dta[i] == null) {
            s.list.numItems = 0;
            return;
        }
        s.listDta = this.getListData(s.dta[i]);
        s.list.numItems = s.listDta.length;
    };
    ChildGroupBuy.prototype.getListData = function (arr) {
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
    ChildGroupBuy.URL = "ui://qzsojhcrr2r0h";
    return ChildGroupBuy;
}(fairygui.GComponent));
__reflect(ChildGroupBuy.prototype, "ChildGroupBuy", ["ICZFLView"]);
