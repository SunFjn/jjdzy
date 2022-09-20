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
var Model_VipDiscount = (function (_super) {
    __extends(Model_VipDiscount, _super);
    function Model_VipDiscount() {
        return _super.call(this) || this;
    }
    Model_VipDiscount.getVipDisData = function (vip) {
        var disData;
        for (var i = 0; i < Model_VipDiscount.discountArr.length; i++) {
            disData = Model_VipDiscount.discountArr[i];
            if (disData.vip == vip) {
                return disData;
            }
        }
        return null;
    };
    /**
     * vip折扣红点
     */
    Model_VipDiscount.checkVipDisNotice = function (vip) {
        var bol = false;
        var data = Model_VipDiscount.getVipDisData(vip);
        if (data) {
            var cfg = Config.xhdvip_402[vip];
            if (cfg && data.buyCount < cfg.time) {
                return true;
            }
        }
        else {
            if (Model_VipDiscount.curVip >= vip) {
                return true;
            }
        }
        return bol;
    };
    Model_VipDiscount.prototype.checkNoticeVipDis = function () {
        var isNotice = false;
        for (var key in Config.xhdvip_402) {
            var cfg = Config.xhdvip_402[key];
            if (Model_VipDiscount.checkVipDisNotice(cfg.ID)) {
                isNotice = true;
                break;
            }
        }
        var r = GGlobal.reddot;
        r.setCondition(UIConst.ACTCOM_VIPZK, 0, isNotice);
        r.notify(UIConst.ACTCOM);
    };
    /**8451	CG 打开vip折扣界面 */
    Model_VipDiscount.prototype.CG_OPEN_UI = function () {
        this.sendSocket(8451, new BaseBytes());
    };
    /**8453	CG 抽取折扣 B:vip等级 */
    Model_VipDiscount.prototype.CG_EXTRACT_DISCOUNT = function (vip) {
        var ba = new BaseBytes();
        ba.writeByte(vip);
        this.sendSocket(8453, ba);
    };
    /**8455	CG 	购买 B:vip等级 */
    Model_VipDiscount.prototype.CG_BUY = function (vip) {
        var ba = new BaseBytes();
        ba.writeByte(vip);
        this.sendSocket(8455, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_VipDiscount.prototype.listenServ = function (wsm) {
        var self = this;
        self.socket = wsm;
        wsm.regHand(8452, self.GC_OPEN_UI, self);
        wsm.regHand(8454, self.GC_EXTRACT_DISCOUNT, self);
        wsm.regHand(8456, self.GC_BUY, self);
    };
    /**8452	GC 	打开vip折扣界面返回 [B:vip等级I:现价B:购买次数]获得现价的vip折扣数组信息B:当前vip等级 */
    Model_VipDiscount.prototype.GC_OPEN_UI = function (self, data) {
        Model_VipDiscount.discountArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var disData = new Vo_VipDisData();
            disData.initDate(data);
            Model_VipDiscount.discountArr.push(disData);
        }
        Model_VipDiscount.curVip = data.readByte();
        GGlobal.control.notify(UIConst.ACTCOM_VIPZK);
    };
    /**8454	GC 返回抽取折扣信息 B:状态：0.vip等级不足 1.成功 2.已抽取折扣 3.参数错误B:vip等级I:现价B:已购买次数 */
    Model_VipDiscount.prototype.GC_EXTRACT_DISCOUNT = function (self, data) {
        var ret = data.readByte();
        if (ret == 1) {
            var disData = new Vo_VipDisData();
            var vip = data.readByte();
            disData.vip = vip;
            disData.curPrice = data.readInt();
            disData.buyCount = data.readByte();
            Model_VipDiscount.discountArr.push(disData);
            // GGlobal.control.notify("GC_EXTRACT_DISCOUNT");
            self.checkNoticeVipDis();
            GGlobal.control.notify(UIConst.ACTCOM_VIPZK, vip);
        }
        else if (ret == 0) {
            ViewCommonWarn.text("vip等级不足");
        }
        else if (ret == 2) {
            ViewCommonWarn.text("已抽取折扣");
        }
    };
    /**8456	GC 购买返回 B:0.vip等级不足 1.成功 2.未获得现价 3.参数错误 4.货币不足 5.超过购买次数 B:vip ID(等级) */
    Model_VipDiscount.prototype.GC_BUY = function (self, data) {
        var ret = data.readByte();
        if (ret == 1) {
            var vip = data.readByte();
            if (!Model_VipDiscount.discountArr || Model_VipDiscount.discountArr.length <= 0)
                return;
            var len = Model_VipDiscount.discountArr.length;
            for (var i = 0; i < len; i++) {
                var disData = Model_VipDiscount.discountArr[i];
                if (disData.vip == vip) {
                    disData.buyCount++;
                }
            }
            self.checkNoticeVipDis();
            GGlobal.control.notify(UIConst.ACTCOM_VIPZK);
        }
        else if (ret == 0) {
            ViewCommonWarn.text("vip等级不足");
        }
        else if (ret == 4) {
            ViewCommonWarn.text("货币不足");
        }
        else if (ret == 5) {
            ViewCommonWarn.text("超过购买次数");
        }
    };
    Model_VipDiscount.discountArr = []; //折扣信息数组
    Model_VipDiscount.curVip = 0; //当前vip等级
    return Model_VipDiscount;
}(BaseModel));
__reflect(Model_VipDiscount.prototype, "Model_VipDiscount");
