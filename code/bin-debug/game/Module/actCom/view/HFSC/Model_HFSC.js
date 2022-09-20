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
var Model_HFSC = (function (_super) {
    __extends(Model_HFSC, _super);
    function Model_HFSC() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scData = [];
        return _this;
    }
    //协议处理
    Model_HFSC.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(9630, this.GC_HeFuFristRecharge_openUi_9630, this);
        mgr.regHand(9632, this.GC_HeFuFristRecharge_getreward_9632, this);
    };
    /**9630 [I-B] GC 打开ui返回 [I:奖励状态B:0不可以领取1可以领取2已经领取了]rewardstate*/
    Model_HFSC.prototype.GC_HeFuFristRecharge_openUi_9630 = function (self, data) {
        var red = false;
        self.scData = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var rewardID = data.readInt();
            var state = data.readByte();
            self.scData[rewardID - 1] = state;
            if (state == 1) {
                red = true;
            }
        }
        GGlobal.reddot.setCondition(UIConst.HFKH_HFSC, 0, red);
        GGlobal.reddot.notifyMsg(UIConst.HFKH_HFSC);
        GGlobal.control.notify(UIConst.HFKH_HFSC);
    };
    /**9631 I CG 获取奖励 I:奖励序号index*/
    Model_HFSC.prototype.CG_HeFuFristRecharge_getreward_9631 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(9631, bates);
    };
    /**9632 I-B GC 奖励状态变化 I:奖励序号indexB:奖励状态state*/
    Model_HFSC.prototype.GC_HeFuFristRecharge_getreward_9632 = function (self, data) {
        var red = false;
        var rewardID = data.readInt();
        var state = data.readByte();
        self.scData[rewardID - 1] = state;
        for (var i = 0; i < self.scData.length; i++) {
            if (self.scData[rewardID - 1] == 1) {
                red = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.HFKH_HFSC, 0, red);
        GGlobal.reddot.notifyMsg(UIConst.HFKH_HFSC);
        GGlobal.control.notify(UIConst.HFKH_HFSC);
    };
    return Model_HFSC;
}(BaseModel));
__reflect(Model_HFSC.prototype, "Model_HFSC");
