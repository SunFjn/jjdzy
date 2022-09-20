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
var Model_ActComJRSC = (function (_super) {
    __extends(Model_ActComJRSC, _super);
    function Model_ActComJRSC() {
        var _this = _super.call(this) || this;
        _this.freshCt = 0;
        _this.freeCt = 0;
        _this.itCt = 0;
        _this.zhe = 0;
        _this.addCt = 1; //累计次数
        return _this;
    }
    //协议处理
    Model_ActComJRSC.prototype.listenServ = function (mgr) {
        var self = this;
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(10800, self.GC_OPENUI_10800, self);
        mgr.regHand(10802, self.GC_REFRESH_10802, self);
        mgr.regHand(10804, self.GC_REFRESH_ZHE_10804, self);
        mgr.regHand(10806, self.GC_BUY_10806, self);
    };
    /**打开界面返回 [I:商品idI:购买次数]商品信息I:剩余刷新次数I:剩余免费次数I:折扣钥匙有多少个I:当前折扣id*/
    Model_ActComJRSC.prototype.GC_OPENUI_10800 = function (self, data) {
        var len = data.readShort();
        self.shopArr = [];
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var ct = data.readInt();
            var cfg = Config.jrscspb_334[id];
            self.shopArr.push({ id: id, ct: ct, cfg: cfg });
        }
        self.freshCt = data.readInt();
        self.freeCt = data.readInt();
        self.itCt = data.readInt();
        self.zhe = data.readInt();
        self.addCt = data.readInt();
        self.checkRed();
        self.notify(Model_ActComJRSC.OPENUI);
    };
    Model_ActComJRSC.prototype.checkRed = function () {
        var s = this;
        var red = s.freeCt > 0;
        var sf = GGlobal.reddot;
        sf.setCondition(UIConst.ACTCOM_JRSC, 0, red);
        sf.notifyMsg(UIConst.ACTCOM_JRSC);
    };
    /**刷新商店数据*/
    Model_ActComJRSC.prototype.CG_REFRESH_10801 = function () {
        var bates = this.getBytes();
        this.sendSocket(10801, bates);
    };
    /**刷新商店数据返回 B:状态 1成功 2元宝不足*/
    Model_ActComJRSC.prototype.GC_REFRESH_10802 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            ViewCommonWarn.text("刷新成功");
            self.notify(Model_ActComJRSC.FRESH_ITEM);
        }
        else if (res == 2) {
            ViewCommonWarn.text("元宝不足");
        }
        else {
            ViewCommonWarn.text("刷新失败");
        }
    };
    /**刷新商店折扣数据*/
    Model_ActComJRSC.prototype.CG_REFRESH_ZHE_10803 = function () {
        var bates = this.getBytes();
        this.sendSocket(10803, bates);
    };
    /**刷新商店折扣数据返回 B:状态 1成功 2元宝不足 3道具不足 4刷新折扣次数不足*/
    Model_ActComJRSC.prototype.GC_REFRESH_ZHE_10804 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            ViewCommonWarn.text("刷新成功");
            self.notify(Model_ActComJRSC.FRESH_ZHE);
        }
        else {
            ViewCommonWarn.text(["元宝不足", "道具不足", "刷新折扣次数不足", "已达到最低折扣"][res - 2]);
        }
    };
    Model_ActComJRSC.prototype.CG_BUY_10805 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(10805, bates);
    };
    /**购买商品返回 B:状态 1成功 2元宝不足 3没有购买次数 4没有该商品I: 商品id*/
    Model_ActComJRSC.prototype.GC_BUY_10806 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            for (var i = 0; i < self.shopArr.length; i++) {
                if (self.shopArr[i].id == id) {
                    self.shopArr[i].ct++;
                    break;
                }
            }
            self.notify(Model_ActComJRSC.OPENUI);
        }
        else {
            ViewCommonWarn.text(["元宝不足", "没有购买次数", "没有该商品"][res - 2]);
        }
    };
    Model_ActComJRSC.prototype.getMinZhe = function (qs) {
        var s = this;
        if (s._MinZhe == null) {
            s._MinZhe = {};
            for (var k in Config.jrsczkb_334) {
                var v = Config.jrsczkb_334[k];
                if (s._MinZhe[v.qs] == null || s._MinZhe[v.qs] > v.zk) {
                    s._MinZhe[v.qs] = v.zk;
                }
            }
        }
        return s._MinZhe[qs];
    };
    Model_ActComJRSC.prototype.getAddCtPrice = function (qs, ct) {
        var s = this;
        if (s._addCtPrice == null) {
            s._addCtPrice = [];
            for (var k in Config.jrscybb_334) {
                var v = Config.jrscybb_334[k];
                if (s._addCtPrice[v.qs] == null) {
                    s._addCtPrice[v.qs] = [];
                }
                s._addCtPrice[v.qs][v.zk - 1] = JSON.parse(v.jg)[0][2];
            }
        }
        var arr = s._addCtPrice[qs];
        if (!arr) {
            return 0;
        }
        if (ct > arr.length - 1) {
            return arr[arr.length - 1];
        }
        else {
            return arr[ct - 1];
        }
    };
    Model_ActComJRSC.OPENUI = "openui";
    Model_ActComJRSC.FRESH_ZHE = "fresh_zhe";
    Model_ActComJRSC.FRESH_ITEM = "fresh_item";
    Model_ActComJRSC.ITEM_ID = 416034; //刷新道具id
    return Model_ActComJRSC;
}(BaseModel));
__reflect(Model_ActComJRSC.prototype, "Model_ActComJRSC");
