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
var ChildGroupB814 = (function (_super) {
    __extends(ChildGroupB814, _super);
    function ChildGroupB814() {
        var _this = _super.call(this) || this;
        _this.lastWeek = -1;
        return _this;
    }
    ChildGroupB814.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "ChildGroupBuy"));
    };
    ChildGroupB814.prototype.constructFromXML = function (xml) {
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
    ChildGroupB814.getInst = function () {
        return this._inst || (this._inst = ChildGroupB814.createInstance());
    };
    ChildGroupB814.prototype.renderHD = function (idx, obj) {
        var item = obj;
        item.setVo(this.listDta[idx]);
    };
    ChildGroupB814.prototype.updateX = function () {
        if (this._act) {
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
        else {
            this.labTime.text = "剩余时间：";
        }
    };
    ChildGroupB814.prototype.oneDayTime = function () {
        var ms = Model_GlobalMsg.getServerTime();
        var data = DateUtil.clearHourse(new Date(ms));
        var h0 = data.getTime();
        var ax = 86400000 + h0 - ms;
        return ax;
    };
    ChildGroupB814.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelGroupB814;
        s.upCharge();
        s.tabDta = [];
        s.dta = [];
        var index = -1;
        for (var i = 0; i < m.buyArr.length; i++) {
            var v = m.buyArr[i];
            var conf = Config.sctg3_730[v.id];
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
    ChildGroupB814.prototype.upCharge = function () {
        var s = this;
        var m = GGlobal.modelGroupB814;
        s.labCharge.text = "今日已充：" + m.charge + "元";
    };
    ChildGroupB814.prototype.open = function () {
        var s = this;
        IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "shouchongtuangou.jpg");
        GGlobal.control.listen(Enum_MsgType.GROUP_BUY_UI, s.update, s);
        GGlobal.control.listen(Enum_MsgType.GROUP_BUY_CHARGE, s.upCharge, s);
        GGlobal.control.listen(Enum_MsgType.GROUP_BUY_NUM, s.pageChange, s);
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.pageChange, s);
        Timer.instance.listen(this.updateX, this, 1000);
        s.update();
        this._act = ModelEightLock.getActVo(UIConst.GROUP_B814);
        GGlobal.modelEightLock.CG4571(UIConst.GROUP_B814);
    };
    ChildGroupB814.prototype.close = function () {
        var s = this;
        IconUtil.setImg(this.imgHeadbg, null);
        GGlobal.control.remove(Enum_MsgType.GROUP_BUY_UI, s.update, s);
        GGlobal.control.remove(Enum_MsgType.GROUP_BUY_CHARGE, s.upCharge, s);
        GGlobal.control.remove(Enum_MsgType.GROUP_BUY_NUM, s.pageChange, s);
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.pageChange, s);
        Timer.instance.remove(this.updateX, this);
        s.c1.selectedIndex = 0;
    };
    ChildGroupB814.prototype.pageChange = function () {
        var s = this;
        var i = s.c1.selectedIndex;
        if (s.dta == null || s.dta[i] == null) {
            s.list.numItems = 0;
            return;
        }
        s.listDta = this.getListData(s.dta[i]);
        s.list.numItems = s.listDta.length;
    };
    ChildGroupB814.prototype.getListData = function (arr) {
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
    ChildGroupB814.URL = "ui://qzsojhcrr2r0h";
    return ChildGroupB814;
}(fairygui.GComponent));
__reflect(ChildGroupB814.prototype, "ChildGroupB814", ["ICZFLView"]);
