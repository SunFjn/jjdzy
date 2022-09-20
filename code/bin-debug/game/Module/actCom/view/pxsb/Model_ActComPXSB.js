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
var Model_ActComPXSB = (function (_super) {
    __extends(Model_ActComPXSB, _super);
    function Model_ActComPXSB() {
        var _this = _super.call(this) || this;
        _this.type = 0; //是否大奖，0不是，1是
        _this.xfNum = 0;
        return _this;
    }
    /**12101 领取奖励 B:是否大奖，0不是，1是I:配置表id  */
    Model_ActComPXSB.prototype.CG_GET = function (type, id) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeInt(id);
        this.sendSocket(12101, ba);
        this.type = type;
    };
    //协议处理
    Model_ActComPXSB.prototype.listenServ = function (mgr) {
        var self = this;
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(12100, self.GC_OPEN_UI, self);
        mgr.regHand(12102, self.GC_GET, self);
    };
    /**12100 打开界面返回 [I:大奖配置表idB:状态：0未达到，1可领取，2已领取I:达到天数[I:配置表idB:状态：0未达到，1可领取，2已领取]]奖励列表I:今日消费数 */
    Model_ActComPXSB.prototype.GC_OPEN_UI = function (s, data) {
        Model_ActComPXSB.rewardArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = new PXSBVO();
            vo.readMsg(data);
            Model_ActComPXSB.rewardArr.push(vo);
        }
        s.xfNum = data.readInt();
        s.reddotCheck();
        GGlobal.control.notify(UIConst.ACTCOM_PXSB);
    };
    /**12102 领取奖励返回 B:领取状态，0条件未达到，1成功，2已领取I:配置表id */
    Model_ActComPXSB.prototype.GC_GET = function (s, data) {
        var result = data.readByte();
        var id = data.readInt();
        if (result == 1) {
            var len = Model_ActComPXSB.rewardArr.length;
            if (s.type == 1) {
                for (var i = 0; i < len; i++) {
                    var vo = Model_ActComPXSB.rewardArr[i];
                    if (vo.id == id) {
                        vo.status = 2;
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    var vo = Model_ActComPXSB.rewardArr[i];
                    var len1 = vo.arr.length;
                    for (var j = 0; j < len1; j++) {
                        if (vo.arr[j][0] == id) {
                            vo.arr[j][1] = 2;
                            break;
                        }
                    }
                }
            }
            s.reddotCheck();
            GGlobal.control.notify(UIConst.ACTCOM_PXSB);
        }
    };
    /**将超过1000000的数值转换成x.x万显示 */
    Model_ActComPXSB.prototype.getWanText1 = function (v) {
        if (v >= 10000) {
            return (v / 10000) + "万";
        }
        else {
            return String(v);
        }
    };
    Model_ActComPXSB.getListData = function (arr) {
        var len = arr ? arr.length : 0;
        if (arr)
            arr.sort(Model_ActComPXSB.sortFuc);
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
        for (var i = 0; i < len; i++) {
            var status_1 = arr ? arr[i][1] : 0;
            if (status_1 == 1) {
                arr1.push(arr[i]);
            }
            else if (status_1 == 2) {
                arr3.push(arr[i]);
            }
            else {
                arr2.push(arr[i]);
            }
        }
        return arr1.concat(arr2).concat(arr3);
    };
    Model_ActComPXSB.sortFuc = function (a, b) {
        return a.id - b.id;
    };
    /** 检查红点 */
    Model_ActComPXSB.prototype.reddotCheck = function () {
        var sf = GGlobal.reddot;
        var bol = false;
        if (!Model_ActComPXSB.rewardArr || Model_ActComPXSB.rewardArr.length < 0)
            return bol;
        var len = Model_ActComPXSB.rewardArr.length;
        for (var i = 0; i < len; i++) {
            bol = this.reddotCheckByIndex(i);
            if (bol)
                break;
        }
        sf.setCondition(UIConst.ACTCOM_PXSB, 0, bol);
        sf.notifyMsg(UIConst.ACTCOM_PXSB);
    };
    Model_ActComPXSB.prototype.reddotCheckByIndex = function (index) {
        var bol = false;
        var vo = Model_ActComPXSB.rewardArr[index];
        if (!vo || vo.arr.length < 0)
            return bol;
        var len = vo.arr.length;
        for (var i = 0; i < len; i++) {
            var status_2 = vo.arr[i][1];
            if (status_2 == 1) {
                return true;
            }
        }
        return bol;
    };
    Model_ActComPXSB.rewardArr = [];
    return Model_ActComPXSB;
}(BaseModel));
__reflect(Model_ActComPXSB.prototype, "Model_ActComPXSB");
