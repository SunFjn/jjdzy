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
var Model_XuTian = (function (_super) {
    __extends(Model_XuTian, _super);
    function Model_XuTian() {
        var _this = _super.call(this) || this;
        _this.huntArr = [];
        //type 1：奖励，2：buff
        //buff 1.冰冻2.减速3.额外羽箭4.加速射击5.概率提升
        _this.lastCt = 0; //剩余狩猎次数
        _this.hasBuy = 0; //已经购买次数
        _this.cangKu = []; //仓库数据
        _this.yuCt = 0; //箭羽数量
        _this.st = 0; //是否狩猎
        _this._maxBuy = -1;
        return _this;
    }
    Object.defineProperty(Model_XuTian.prototype, "maxBuy", {
        get: function () {
            var s = this;
            if (s._maxBuy == -1) {
                var cfg = null;
                for (var key in Config.xtwlcs_776) {
                    cfg = Config.xtwlcs_776[key];
                }
                this._maxBuy = cfg ? cfg.id : 0;
            }
            return this._maxBuy;
        },
        enumerable: true,
        configurable: true
    });
    //打开界面
    Model_XuTian.prototype.CG_OPENUI = function () {
        var bates = this.getBytes();
        this.sendSocket(11821, bates);
    };
    //购买狩猎次数 B:要买的次数
    Model_XuTian.prototype.CG_BUY_HUNT = function (ct) {
        var bates = this.getBytes();
        bates.writeByte(ct);
        this.sendSocket(11823, bates);
    };
    //开始狩猎
    Model_XuTian.prototype.CG_START_HUNT = function () {
        var bates = this.getBytes();
        this.sendSocket(11825, bates);
    };
    //请求击杀猎物 B:猎物类型（1：奖励，2：buff）I:猎物id
    Model_XuTian.prototype.CG_HUNT = function (type, id) {
        var bates = this.getBytes();
        bates.writeByte(type);
        bates.writeInt(id);
        this.sendSocket(11827, bates);
    };
    //围猎结束
    Model_XuTian.prototype.CG_END_HUNT = function () {
        var bates = this.getBytes();
        this.sendSocket(11829, bates);
    };
    //打开围猎仓库
    Model_XuTian.prototype.CG_OPEN_WARE = function () {
        var bates = this.getBytes();
        this.sendSocket(11831, bates);
    };
    //协议处理
    Model_XuTian.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(11822, this.GC_OPENUI11822, this);
        mgr.regHand(11824, this.GC_BUY_HUNT11824, this);
        mgr.regHand(11826, this.GC_START_HUNT11826, this);
        mgr.regHand(11828, this.GC_HUNT11828, this);
        mgr.regHand(11830, this.GC_END_HUNT11830, this);
        mgr.regHand(11832, this.GC_OPEN_WARE11832, this);
    };
    //返回界面信息 I:剩余狩猎次数B:已购买次数
    Model_XuTian.prototype.GC_OPENUI11822 = function (self, data) {
        self.lastCt = data.readInt();
        self.hasBuy = data.readByte();
        self.notify(Model_XuTian.OPENUI);
        self.checkRed();
    };
    //购买结果返回 B:结果：0：失败，1：成功I:失败：（1：元宝不足，2：超过可购买次数），成功：剩余狩猎次数B:已购买次数
    Model_XuTian.prototype.GC_BUY_HUNT11824 = function (self, data) {
        var res = data.readByte();
        var ty = data.readInt();
        if (res == 1) {
            self.lastCt = ty;
            self.hasBuy = data.readByte();
            ;
            self.notify(Model_XuTian.OPENUI);
            self.checkRed();
        }
        else {
            ViewCommonWarn.text(["元宝不足", "超过可购买次数"][ty - 1]);
        }
    };
    //开始狩猎返回 B:结果：:1：成功，2：没有次数[I:奖励猎物id]奖励猎物数据[I:buff猎物id]buff猎物数据
    Model_XuTian.prototype.GC_START_HUNT11826 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            self.lastCt--;
            if (self.lastCt < 0) {
                self.lastCt = 0;
            }
            self.st = 1;
            var len = data.readShort();
            var arrId = [];
            for (var i = 0; i < len; i++) {
                arrId.push([data.readInt(), data.readInt()]);
            }
            len = data.readShort();
            var arrBuf = [];
            for (var i = 0; i < len; i++) {
                arrBuf.push([data.readInt(), data.readInt()]);
            }
            //乱序
            arrId = self.shuffle(arrId);
            arrBuf = self.shuffle(arrBuf);
            //buf 插入
            self.huntArr = [];
            var bei = Math.floor(arrId.length / arrBuf.length) - 1;
            while (arrId.length > 0 && arrBuf.length > 0) {
                var isBuf = Math.random() * bei < 1;
                if (isBuf) {
                    self.huntArrPush(arrBuf, 2);
                }
                else {
                    self.huntArrPush(arrId, 1);
                }
            }
            while (arrBuf.length > 0) {
                self.huntArrPush(arrBuf, 2);
            }
            while (arrId.length > 0) {
                self.huntArrPush(arrId, 1);
            }
            self.yuCt = ConfigHelp.getSystemNum(8211);
            self.notify(Model_XuTian.START_HUNT);
            self.checkRed();
        }
        else if (res == 2) {
            ViewCommonWarn.text("没有次数");
        }
        else {
            ViewCommonWarn.text("狩猎失败");
        }
    };
    Model_XuTian.prototype.huntArrPush = function (arr, type) {
        var p = arr.pop();
        this.huntArr.push({ type: type, id: p[0], cfgId: p[1] });
    };
    //乱序算法
    Model_XuTian.prototype.shuffle = function (arr) {
        for (var i = arr.length - 1; i >= 0; i--) {
            var rIndex = Math.floor(Math.random() * (i + 1));
            var temp = arr[rIndex];
            arr[rIndex] = arr[i];
            arr[i] = temp;
        }
        return arr;
    };
    //射击结果 B:0：失败，1：成功B:失败（1：没箭，2：没击中）B:猎物类型I:猎物idI:剩余箭数量
    Model_XuTian.prototype.GC_HUNT11828 = function (self, data) {
        var res = data.readByte();
        var resTy = data.readByte();
        var type = data.readByte();
        var id = data.readInt();
        self.yuCt = data.readInt();
        if (res == 0 && resTy == 1) {
            return; //没箭
        }
        self.notify(Model_XuTian.WIN_HUNT, { res: res, type: type, id: id });
        if (self.yuCt <= 0) {
            self.CG_END_HUNT();
        }
    };
    //围猎结束
    Model_XuTian.prototype.GC_END_HUNT11830 = function (self, data) {
        self.st = 0;
        self.notify(Model_XuTian.END_HUNT);
        ViewAlert.show("狩猎结束，奖励已发至邮件", new Handler(self, self.startAgain), 3, "再次狩猎", "确认");
    };
    Model_XuTian.prototype.startAgain = function () {
        var self = this;
        var b = GGlobal.layerMgr.isOpenView(UIConst.XU_TIAN);
        if (!b) {
            ViewCommonWarn.text("需要打开许田围猎");
            return;
        }
        if (self.lastCt < 0) {
            ViewCommonWarn.text("挑战次数不足");
            return;
        }
        self.CG_START_HUNT();
    };
    //仓库信息返回 [B:道具类型I:道具idI:道具数量]仓库数据
    Model_XuTian.prototype.GC_OPEN_WARE11832 = function (self, data) {
        var len = data.readShort();
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push([data.readByte(), data.readInt(), data.readInt()]);
        }
        self.cangKu = ConfigHelp.makeItemListArr(arr);
        self.notify(Model_XuTian.CANG_KU);
    };
    Model_XuTian.prototype.checkRed = function () {
        var s = this;
        GGlobal.reddot.setCondition(UIConst.XU_TIAN, 0, s.lastCt > 0);
        GGlobal.reddot.notify(UIConst.XU_TIAN);
    };
    Model_XuTian.OPENUI = "openui";
    Model_XuTian.WIN_HUNT = "win_hunt";
    Model_XuTian.START_HUNT = "start_hunt";
    Model_XuTian.END_HUNT = "end_hunt";
    Model_XuTian.CANG_KU = "cang_ku";
    Model_XuTian.ITEM_BATCT = 410437;
    return Model_XuTian;
}(BaseModel));
__reflect(Model_XuTian.prototype, "Model_XuTian");
