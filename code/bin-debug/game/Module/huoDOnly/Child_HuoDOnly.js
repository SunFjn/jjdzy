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
var Child_HuoDOnly = (function (_super) {
    __extends(Child_HuoDOnly, _super);
    function Child_HuoDOnly() {
        return _super.call(this) || this;
    }
    Child_HuoDOnly.createInstance = function () {
        return (fairygui.UIPackage.createObject("huoDOnly", "Child_HuoDOnly"));
    };
    Child_HuoDOnly.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    Child_HuoDOnly.prototype.show = function (a, act) {
        this.visible = true;
        this._act = act;
        Timer.instance.listen(this.upTimer, this, 1000);
        if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
            GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_DAIONEA_UI, this.upList, this);
        }
        else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
            GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI, this.upList, this);
        }
        else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
            GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_YBFL, this.upList, this);
        }
        GGlobal.modelHuoDOnly.CG_OPEN_UI(act.id);
        this.labTips.text = Config.zshdb_315[act.id].nr;
        this.upList();
        // if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
        // 	IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "yuanbaofanli.jpg");
        // } else {
        IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "zs" + Config.zshd_315[this._act.index].bg + ".jpg");
        // }
    };
    Child_HuoDOnly.prototype.upList = function () {
        this._listData = [];
        this.labCharge.text = "";
        this.imgCharge.visible = false;
        if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
            this._listData = this.getListDataDaiOne(Model_HuoDOnly.getDaiOneArr(this._act.id), Config.zshddbcz_315);
        }
        else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
            this._listData = Model_HuoDong.getListData(Model_HuoDOnly.getAddRechargeArr(this._act.id));
        }
        else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
            this._listData = Model_HuoDong.getListData(GGlobal.modelHuoDOnly.getYbaoDta(this._act.id));
        }
        this.list.numItems = this._listData ? this._listData.length : 0;
        if (this.list.numItems > 0) {
            this.list.scrollToView(0);
        }
        this.upTimer();
    };
    //单笔充值
    Child_HuoDOnly.prototype.getListDataDaiOne = function (arr, cfg) {
        var len = arr ? arr.length : 0;
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
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
    Child_HuoDOnly.prototype.disposePanel = function () {
        Timer.instance.remove(this.upTimer, this);
        GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_DAIONEA_UI, this.upList, this);
        GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI, this.upList, this);
        GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_YBFL, this.upList, this);
        this.visible = false;
        IconUtil.setImg(this.imgHeadbg, null);
        this.list.numItems = 0;
    };
    Child_HuoDOnly.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index], this._act);
    };
    Child_HuoDOnly.prototype.upTimer = function () {
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
    Child_HuoDOnly.URL = "ui://mk3gp0vrlbbw0";
    return Child_HuoDOnly;
}(fairygui.GComponent));
__reflect(Child_HuoDOnly.prototype, "Child_HuoDOnly", ["IChildHuoDong"]);
