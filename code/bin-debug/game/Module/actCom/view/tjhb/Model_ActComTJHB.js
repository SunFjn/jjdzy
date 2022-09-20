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
var Model_ActComTJHB = (function (_super) {
    __extends(Model_ActComTJHB, _super);
    function Model_ActComTJHB() {
        var _this = _super.call(this) || this;
        _this.hbArr = [];
        _this.nextId = 0;
        _this.residue = 0;
        _this.fhbArr = [];
        _this.recordArr = [];
        return _this;
    }
    /**11371 发红包界面  */
    Model_ActComTJHB.prototype.CG_SEND_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(11371, ba);
    };
    /**11373 发红包 I:红包类型，配置表id  */
    Model_ActComTJHB.prototype.CG_SEND = function (type) {
        var ba = new BaseBytes();
        ba.writeInt(type);
        Model_ActComTJHB.type = type;
        this.sendSocket(11373, ba);
    };
    /**11375 领红包 L:红包id  */
    Model_ActComTJHB.prototype.CG_GET = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        Model_ActComTJHB.id = id;
        this.sendSocket(11375, ba);
    };
    /**11377 打开记录界面 L:红包id  */
    Model_ActComTJHB.prototype.CG_OPENRECORD_UI = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(11377, ba);
    };
    //协议处理
    Model_ActComTJHB.prototype.listenServ = function (mgr) {
        var self = this;
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(11370, self.GC_OPEN_UI, self);
        mgr.regHand(11372, self.GC_SEND_UI, self);
        mgr.regHand(11374, self.GC_SEND, self);
        mgr.regHand(11376, self.GC_GET, self);
        mgr.regHand(11378, self.GC_OPENRECORD_UI, self);
        mgr.regHand(11380, self.GC_INFORM, self);
    };
    /**11370 打开界面返回 [B:是否系统红包，0不是，1是B:红包状态：0已抢光，1可抢，2已经抢过L:红包idI:红包类型，配置表idU:姓名I:头像I:头像框I:红包个数I:抢到的红包金额]红包列表I:下一个系统红包id，配置表idI:今日剩余可抢红包数*/
    Model_ActComTJHB.prototype.GC_OPEN_UI = function (s, data) {
        s.hbArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = new HBVo();
            vo.readMsg(data);
            s.hbArr.push(vo);
        }
        s.nextId = data.readInt();
        s.residue = data.readInt();
        s.reddotCheckByQiang();
        GGlobal.control.notify(UIConst.ACTCOM_TJHB);
    };
    /**11372 发红包界面返回 [I:idI:参数B:发送状态：0未发，1可发，2已发]红包状态列表*/
    Model_ActComTJHB.prototype.GC_SEND_UI = function (s, data) {
        s.fhbArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = new HBVo();
            vo.readFhbMsg(data);
            s.fhbArr.push(vo);
        }
        s.reddotCheckByFa();
        GGlobal.control.notify(UIConst.TJHB_FHB);
    };
    /**11374 发红包返回 B:状态：0没有该类型红包，1成功，2未达到条件，3不可重复发*/
    Model_ActComTJHB.prototype.GC_SEND = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var len = s.fhbArr.length;
            for (var i = 0; i < len; i++) {
                var vo = s.fhbArr[i];
                if (vo.id == Model_ActComTJHB.type) {
                    vo.sendStatus = 2;
                    break;
                }
            }
            s.reddotCheckByFa();
            GGlobal.control.notify(UIConst.TJHB_FHB);
        }
    };
    /**领红包返回 B:状态：0领取失败，1成功，2已抢完，3不能重复抢, 4今日抢红包次数已达上限I:抢到的红包金额I:今日剩余可抢红包数 */
    Model_ActComTJHB.prototype.GC_GET = function (s, data) {
        var res = data.readByte();
        var money = data.readInt();
        if (res == 1) {
            var len = s.hbArr.length;
            for (var i = 0; i < len; i++) {
                var vo = s.hbArr[i];
                if (vo.hbId == Model_ActComTJHB.id) {
                    vo.hbStatus = 2;
                    vo.robNum = money;
                    ViewCommonWarn.text("元宝+" + money);
                    break;
                }
            }
            s.reddotCheckByQiang();
            s.residue = data.readInt();
            GGlobal.control.notify(UIConst.ACTCOM_TJHB);
        }
        else if (res == 2) {
            ViewCommonWarn.text("手慢了，红包已抢完");
            // GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_TJHB);
            var len = s.hbArr.length;
            for (var i = 0; i < len; i++) {
                var vo = s.hbArr[i];
                if (vo.hbId == Model_ActComTJHB.id) {
                    vo.hbStatus = 0;
                    vo.robNum = money;
                    break;
                }
            }
            s.reddotCheckByQiang();
            GGlobal.control.notify(UIConst.ACTCOM_TJHB);
        }
        else if (res == 3) {
            ViewCommonWarn.text("不能重复抢");
            var len = s.hbArr.length;
            for (var i = 0; i < len; i++) {
                var vo = s.hbArr[i];
                if (vo.hbId == Model_ActComTJHB.id) {
                    vo.hbStatus = 0;
                    vo.robNum = money;
                    break;
                }
            }
            s.reddotCheckByQiang();
            GGlobal.control.notify(UIConst.ACTCOM_TJHB);
        }
        else {
            ViewCommonWarn.text("今日抢红包次数已达上限");
        }
    };
    /**11378  打开记录界面返回 [U:名字I:红包金额B:是否玩家本人,1是,0不是]红包记录列表 */
    Model_ActComTJHB.prototype.GC_OPENRECORD_UI = function (s, data) {
        s.recordArr = [];
        var len = data.readShort();
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                var vo = new HBVo();
                vo.readRecordMsg(data);
                if (vo.isMyself == 1) {
                    s.recordArr.unshift(vo);
                }
                else {
                    s.recordArr.push(vo);
                }
            }
            GGlobal.control.notify(UIConst.TJHB_RECORD);
        }
        else {
            if (GGlobal.layerMgr.isOpenView(UIConst.TJHB_RECORD)) {
                GGlobal.layerMgr.close(UIConst.TJHB_RECORD);
            }
            GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_TJHB);
            ViewCommonWarn.text("红包已刷新");
        }
    };
    /**11380  有红包 */
    Model_ActComTJHB.prototype.GC_INFORM = function (s, data) {
        GGlobal.mainUICtr.addReportBTN(UIConst.ACTCOM_TJHB);
        TJHBEff.show();
    };
    Model_ActComTJHB.getListData = function (arr) {
        var len = arr ? arr.length : 0;
        if (arr)
            arr.sort(Model_ActComTJHB.sortFuc);
        var arr1 = []; //可发
        var arr2 = []; //不可发
        var arr3 = []; //已发
        for (var i = 0; i < len; i++) {
            var status_1 = arr ? arr[i].sendStatus : 0;
            if (status_1 == 1) {
                arr1.push(arr[i]);
            }
            else if (status_1 == 0) {
                arr2.push(arr[i]);
            }
            else if (status_1 == 2) {
                arr3.push(arr[i]);
            }
        }
        return arr1.concat(arr2).concat(arr3);
    };
    Model_ActComTJHB.sortFuc = function (a, b) {
        return a.id - b.id;
    };
    /** 检查抢红包红点 */
    Model_ActComTJHB.prototype.reddotCheckByQiang = function () {
        var bol = false;
        var sf = GGlobal.reddot;
        var len = this.hbArr.length;
        for (var i = 0; i < len; i++) {
            var vo = this.hbArr[i];
            if (vo.hbStatus == 1) {
                bol = true;
                break;
            }
        }
        sf.setCondition(UIConst.ACTCOM_TJHB, 0, bol);
        sf.notifyMsg(UIConst.ACTCOM_TJHB);
    };
    /** 检查发红包红点 */
    Model_ActComTJHB.prototype.reddotCheckByFa = function () {
        var bol = false;
        var sf = GGlobal.reddot;
        var len = this.fhbArr.length;
        for (var i = 0; i < len; i++) {
            var vo = this.fhbArr[i];
            if (vo.sendStatus == 1) {
                bol = true;
                break;
            }
        }
        sf.setCondition(UIConst.ACTCOM_TJHB, 1, bol);
        sf.notifyMsg(UIConst.ACTCOM_TJHB);
    };
    Model_ActComTJHB.type = 0;
    Model_ActComTJHB.id = 0;
    return Model_ActComTJHB;
}(BaseModel));
__reflect(Model_ActComTJHB.prototype, "Model_ActComTJHB");
