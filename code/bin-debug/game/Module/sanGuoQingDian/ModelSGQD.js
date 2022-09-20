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
var ModelSGQD = (function (_super) {
    __extends(ModelSGQD, _super);
    function ModelSGQD() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._sortDtas = [];
        _this._regDay = -1;
        _this.huoYueYouLi = 1;
        _this.paiHangDatas = [];
        _this.haoLiInfo = {};
        _this.haoLiHave = false;
        return _this;
    }
    ModelSGQD.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        var self = this;
        wsm.regHand(4060, self.GC4060, self);
        wsm.regHand(4082, self.GC4082, self);
        wsm.regHand(4084, self.GC4084, self);
        wsm.regHand(4102, self.GC4102, self);
        wsm.regHand(4104, self.GC4104, self);
        wsm.regHand(4122, self.GCOpenUI4122, self);
        wsm.regHand(4124, self.GCBuy4124, self);
        wsm.regHand(4126, self.GCOpenRank4126, self);
        wsm.regHand(4128, self.GCOpenUI4128, self);
        wsm.regHand(4130, self.GCDrawReward4130, self);
        wsm.regHand(4910, self.getDanBiFanLiData, self);
        wsm.regHand(4912, self.getDBFLReward, self);
        wsm.regHand(4890, self.getDLYLData, self);
        wsm.regHand(4892, self.getDLYLReward, self);
        wsm.regHand(4930, self.getLCFLData, self);
        wsm.regHand(4932, self.getLCFLReward, self);
        wsm.regHand(8130, self.GC_OPEN_SGQD_SHOP, self);
        wsm.regHand(8132, self.GC_SGQD_SHOP_BUY, self);
    };
    /**8130	返回界面信息 [I:商品编号I:已购买数量]已购商品数据*/
    ModelSGQD.prototype.GC_OPEN_SGQD_SHOP = function (self, data) {
        ModelSGQD.shopArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var itemId = data.readInt();
            var buyNum = data.readInt();
            var cfg = Config.sgqdsc_261[itemId];
            ModelSGQD.shopArr.push({ cfg: cfg, buyNum: buyNum });
        }
        ModelSGQD.shopArr.sort(self.shopSort);
        GGlobal.control.notify(UIConst.SGQD_SHOP);
    };
    ModelSGQD.prototype.shopSort = function (a, b) {
        return a.cfg.id - b.cfg.id;
    };
    /**8131 购买商品 I:商品编号*/
    ModelSGQD.prototype.CG_SGQD_BUYITEM = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(8131, ba);
    };
    /**8132 购买结果返回 B:结果：0：失败，1：成功I:失败：(1:已达限购次数，2：元宝不足)，成功：商品编号I:已购数量 */
    ModelSGQD.prototype.GC_SGQD_SHOP_BUY = function (self, data) {
        var result = data.readByte();
        var itemId = data.readInt();
        var buyNum = data.readInt();
        if (result == 1) {
            ViewCommonWarn.text("购买成功");
            for (var i = 0; i < ModelSGQD.shopArr.length; i++) {
                if (ModelSGQD.shopArr[i].cfg.id == itemId) {
                    ModelSGQD.shopArr[i].buyNum = buyNum;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.SGQD_SHOP);
        }
    };
    Object.defineProperty(ModelSGQD.prototype, "DengLuYouLiCfg", {
        /**登陆有礼配表 */
        get: function () {
            if (!this._DLYLCfg) {
                var arr = [];
                var lib = Config.sgdlyj_261;
                for (var key in lib) {
                    var temp = lib[key];
                    var cfg = new VO_DeLuYouJiang();
                    cfg.init(temp);
                    arr[cfg.id] = cfg;
                }
                this._DLYLCfg = arr;
            }
            return this._DLYLCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelSGQD.prototype, "LeiChongFanLiCfg", {
        /**累充返利配表 */
        get: function () {
            if (!this._LCFLCfg) {
                var arr = [];
                var lib = Config.sglcfl_261;
                for (var key in lib) {
                    var temp = lib[key];
                    var cfg = new VO_LeiChongFanLi();
                    cfg.init(temp);
                    arr[cfg.id] = cfg;
                }
                this._LCFLCfg = arr;
            }
            return this._LCFLCfg;
        },
        enumerable: true,
        configurable: true
    });
    /**接收单笔返利的奖励数据 */
    ModelSGQD.prototype.getDBFLReward = function (self, bytes) {
        //领取奖励结果 B:结果：0：失败，1：成功I:失败：（1：没领取次数），成功：奖励项idB:可领取次数B:剩余次数
        var result = bytes.readByte(); //领取结果
        var id = bytes.readInt(); //id 
        var count = bytes.readByte(); //可领取次数
        var lastNum = bytes.readByte(); //剩余次数
        if (result == 0) {
            ViewCommonWarn.text("领取失败");
            return;
        }
        GGlobal.control.notify(Enum_MsgType.DANBIFANLIREWARD, { result: result, id: id, count: count, lastNum: lastNum });
    };
    /**接收登陆有礼的奖励数据 */
    ModelSGQD.prototype.getDLYLReward = function (self, bytes) {
        var result = bytes.readByte();
        var id = bytes.readInt();
        if (result == 0) {
            ViewCommonWarn.text("领取失败");
            return;
        }
        GGlobal.control.notify(Enum_MsgType.DENGLUYOULIREWARD, { result: result, id: id });
    };
    /**接收累充返利的奖励数据 */
    ModelSGQD.prototype.getLCFLReward = function (self, bytes) {
        var result = bytes.readByte();
        var id = bytes.readInt();
        if (result == 0) {
            ViewCommonWarn.text("领取失败");
            return;
        }
        GGlobal.control.notify(Enum_MsgType.LEICHONGFANLIReward, { result: result, id: id });
    };
    Object.defineProperty(ModelSGQD.prototype, "DanBiFanLiCfg", {
        /**单笔返利配表 */
        get: function () {
            if (!this._danbifanliCfg) {
                var arr = [];
                var lib = Config.sgdbfl_261;
                for (var key in lib) {
                    var temp = lib[key];
                    var cfg = new VO_DanBiFanLi();
                    cfg.init(temp);
                    arr[cfg.id] = cfg;
                }
                this._danbifanliCfg = arr;
            }
            return this._danbifanliCfg;
        },
        enumerable: true,
        configurable: true
    });
    /**接收单笔返利的服务器数据 */
    ModelSGQD.prototype.getDanBiFanLiData = function (self, bytes) {
        var length = bytes.readShort();
        var vo;
        var data = [];
        ModelSGQD.DBFLData = [];
        // ModelSGQD.DANBIFANLIARR = [];
        for (var i = 0; i < length; i++) {
            var id = bytes.readInt();
            var count = bytes.readByte();
            var lastNum = bytes.readByte();
            vo = self.DanBiFanLiCfg[id];
            vo.count = count;
            vo.lastNum = lastNum;
            data[i] = vo;
            //            ModelSGQD.DANBIFANLIARR[i] = id;
        }
        ModelSGQD.DBFLData = data;
        GGlobal.reddot.setCondition(UIConst.DANBIFANLI, 0, self.getNoti(UIConst.DANBIFANLI));
        GGlobal.control.notify(Enum_MsgType.DANBIFANLI, { data: data });
    };
    /**接收登陆有礼数据 */
    ModelSGQD.prototype.getDLYLData = function (self, bytes) {
        var loginDay = bytes.readByte(); //登陆天数
        var vo;
        var length = bytes.readShort();
        var data = [];
        for (var i = 0; i < length; ++i) {
            var day = bytes.readInt();
            var isGet = bytes.readByte();
            vo = self.DengLuYouLiCfg[day];
            vo.state = isGet;
            vo.loginDay = loginDay;
            data[i] = vo;
        }
        ModelSGQD.DLYLData = data;
        GGlobal.reddot.setCondition(UIConst.DENGLUSONGLI, 0, self.getNoti(UIConst.DENGLUSONGLI));
        GGlobal.control.notify(Enum_MsgType.DENGLUYOULI, { data: data });
    };
    /**接收累充返利数据*/
    ModelSGQD.prototype.getLCFLData = function (self, bytes) {
        var currentValue = bytes.readInt(); //当前充值金额
        var length = bytes.readShort();
        var vo;
        var data = [];
        ModelSGQD.LCFLData = [];
        for (var i = 0; i < length; ++i) {
            var id = bytes.readInt();
            var state = bytes.readByte();
            vo = self.LeiChongFanLiCfg[id];
            vo.state = state;
            data[i] = vo;
        }
        ModelSGQD.LCFLData = data;
        GGlobal.reddot.setCondition(UIConst.LEICHONGFANLI, 0, self.getNoti(UIConst.LEICHONGFANLI));
        GGlobal.control.notify(Enum_MsgType.LEICHONGFANLI, { data: data, currentValue: currentValue });
    };
    ModelSGQD.prototype.getAct = function (id) {
        for (var i = 0, len = this._datas.length; i < len; i++) {
            var data = this._datas[i];
            if (data.id == id) {
                return data;
            }
        }
        return this._datas[0];
    };
    ModelSGQD.prototype.getActs = function () {
        if (!this._datas || this._regDay != Model_GlobalMsg.kaifuDay) {
            this._regDay = Model_GlobalMsg.kaifuDay;
            this._datas = GGlobal.modelActivity.getGroup(UIConst.SANGUOQD);
            this._sortDtas = [];
            var arr = JSON.parse(Config.xtcs_004[5303].other);
            for (var i = 0; i < this._datas.length; ++i) {
                for (var j = 0; j < arr.length; ++j) {
                    if (this._datas[i].id == arr[j][1]) {
                        if (!this._sortDtas[arr[j][0]]) {
                            this._sortDtas[arr[j][0]] = this._datas[i];
                        }
                    }
                }
            }
            ArrayUitl.cleannull(this._sortDtas);
        }
        return this._sortDtas;
    };
    ModelSGQD.prototype.canBeOpen = function (id, msg) {
        return ModuleManager.isOpen(id, msg);
    };
    /**获取红点状态的 */
    ModelSGQD.prototype.getNoti = function (data) {
        var id = typeof data == "number" ? data : data.id;
        switch (id) {
            case UIConst.XIAOFEIPH:
                return false;
            case UIConst.JiJin:
                return this.noticeJJ();
            case UIConst.HaoLiDuiHuan:
                return this.noticeAllHL();
            case UIConst.HUOYUEYOULI:
                return !!(this.huoYueYouLi);
            case UIConst.DENGLUSONGLI:
                return this.noticeDLYL();
            case UIConst.DANBIFANLI:
                return this.noticeDBFL();
            case UIConst.LEICHONGFANLI:
                return this.noticeLCFL();
        }
    };
    /**获取累充返利红点状态 */
    ModelSGQD.prototype.noticeLCFL = function () {
        var temp = ModelSGQD.LCFLData;
        if (temp) {
            for (var i = 0; i < temp.length; ++i) {
                if (temp[i].state == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    /**获取单笔返利红点状态 */
    ModelSGQD.prototype.noticeDBFL = function () {
        var temp = ModelSGQD.DBFLData;
        if (temp) {
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].count > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    /**获取登陆有礼红点状态 */
    ModelSGQD.prototype.noticeDLYL = function () {
        var temp = ModelSGQD.DLYLData;
        if (temp) {
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].state == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    /**打开界面 [U:名字,如果不满足消费门槛，则为空字符串I:消费数，如果不满足消费门槛，则为0]排行I:第一名职业时装（job*1000+时装id），没有则为0I:专属神兵I:我的排行，没有上榜则为0I:我的消费 */
    ModelSGQD.prototype.GC4060 = function (self, bytes) {
        var len = bytes.readShort();
        var datas = [];
        for (var i = 0; i < len; i++) {
            var data = {};
            data.name = bytes.readUTF();
            data.cost = bytes.readInt();
            datas.push(data);
        }
        // datas.sort((a, b) => -a.cost + b.cost);
        var mineInfo = {};
        if (datas[0]) {
            datas[0].modId = bytes.readInt();
            datas[0].godWeapon = bytes.readInt();
        }
        else {
            bytes.readInt(); //清掉一个int
            bytes.readInt();
        }
        mineInfo.paiming = bytes.readInt();
        mineInfo.cost = bytes.readInt();
        if (datas[0]) {
            datas[0].horseId = bytes.readInt();
        }
        else {
            bytes.readInt();
        }
        self.paiHangDatas = datas;
        self.notify(ModelSGQD.msg_datas_xfph, mineInfo);
    };
    /**打开基金 */
    ModelSGQD.prototype.CG4081 = function () { this.sendSocket(4081, this.getBytes()); };
    ModelSGQD.prototype.GC4082 = function (self, bytes) {
        self.jiJinInfo = self.jiJinInfo || {};
        self.jiJinInfo.state = bytes.readByte();
        self.jiJinInfo.loginDay = bytes.readByte();
        self.jiJinInfo.states = self.jiJinInfo.states || {};
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            self.jiJinInfo.states[bytes.readShort()] = bytes.readByte();
        }
        self.notify(ModelSGQD.msg_datas_jijin);
        GGlobal.reddot.setCondition(UIConst.JiJin, 0, self.getNoti(UIConst.JiJin));
        self.notify(ModelSGQD.msg_notice);
    };
    /**基金领取 */
    ModelSGQD.prototype.CG4083 = function (id) {
        var bytes = this.getBytes();
        bytes.writeShort(id);
        this.sendSocket(4083, bytes);
    };
    ModelSGQD.prototype.GC4084 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            self.CG4081();
        }
        else {
            //B:结果 1成功 2系统未开启 3活动未开启 4配置表不存在 5非本期奖励ID 6已领取 7登录天数不足 8背包已满 9本期活动结算中，请稍后再试
            ViewCommonWarn.text(["", "", "系统未开启", "活动未开启", "配置表不存在", "非本期奖励ID", "已领取", "登录天数不足", "背包已满", "本期活动结算中，请稍后再试"][state]);
            if (state == 8) {
                Model_RongLian.ALERT_ONEKEY();
            }
        }
    };
    ModelSGQD.prototype.noticeJJ = function () {
        var states = this.jiJinInfo && this.jiJinInfo.states;
        for (var key in states) {
            if (states[key] == 1) {
                return true;
            }
        }
        return false;
    };
    ModelSGQD.prototype.getHLDatas = function () {
        var self = this;
        if (!self._HLdatas || self._HLdatas.length == 0) {
            self._HLdatas = [];
            var lib = Config.hldh_741;
            var act = GGlobal.modelActivity.get(UIConst.SANGUOQD, UIConst.HaoLiDuiHuan);
            if (act) {
                for (var key in lib) {
                    var cfg = lib[key];
                    if (cfg.qishu == act.qs) {
                        self._HLdatas.push(cfg);
                    }
                }
            }
        }
        return this._HLdatas;
    };
    /**打开豪礼兑换 */
    ModelSGQD.prototype.CG4101 = function () { this.sendSocket(4101, this.getBytes()); };
    ModelSGQD.prototype.GC4102 = function (self, bytes) {
        self._HLdatas = null;
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            self.haoLiInfo[bytes.readShort()] = bytes.readByte();
        }
        self.haoLiHave = true;
        self.notify(ModelSGQD.msg_datas_hldh);
        GGlobal.reddot.setCondition(UIConst.HaoLiDuiHuan, 0, self.getNoti(UIConst.HaoLiDuiHuan));
        GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
    };
    /**领取豪礼 */
    ModelSGQD.prototype.CG4103 = function (id) {
        var bytes = this.getBytes();
        bytes.writeShort(id);
        this.sendSocket(4103, bytes);
    };
    ModelSGQD.prototype.GC4104 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            self.CG4101();
        }
        else {
            //1成功 2系统未开启 3活动未开启 4配置表不存在 5非本期奖励ID 6兑换次数已用完 7道具不足 8背包已满
            ViewCommonWarn.text(["", "", "系统未开启", "活动未开启", "配置表不存在", "非本期奖励", "兑换次数不足", "道具不足", "背包已满"][state]);
        }
    };
    ModelSGQD.prototype.noticeHL = function (data) {
        var needs = JSON.parse(data.cailiao);
        var bool = true;
        for (var i = 0; i < needs.length; i++) {
            var arr = needs[i];
            var cnt = Model_Bag.getItemCount(arr[1]);
            if (cnt < arr[2]) {
                bool = false;
                break;
            }
        }
        if (needs.length == 0) {
            bool = false;
        }
        var rewards = JSON.parse(data.daoju);
        var xianZhi = data.cishu;
        var dhCnt = GGlobal.modelSGQD.haoLiInfo[data.id] == null ? 0 : GGlobal.modelSGQD.haoLiInfo[data.id];
        if (xianZhi > 0 && dhCnt >= xianZhi) {
            bool = false;
        }
        return bool;
    };
    ModelSGQD.prototype.noticeAllHL = function () {
        var datas = this.getHLDatas();
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var not = this.noticeHL(data);
            if (not) {
                return true;
            }
        }
        return false;
    };
    ModelSGQD.prototype.noticeAll = function () {
        var acts = this.getActs();
        for (var i = 0; acts && i < acts.length; i++) {
            var act = acts[i];
            var not = this.getNoti(act.id);
            if (not == true) {
                return true;
            }
        }
        return false;
    };
    /**4129 领取目标奖励 I:要领取的奖励id    */
    ModelSGQD.prototype.CGDrawReward4129 = function (rewardId) {
        var bytes = this.getBytes();
        bytes.writeInt(rewardId);
        this.sendSocket(4129, bytes);
    };
    /**4127 打开目标奖励界面   */
    ModelSGQD.prototype.CGOpenUI4127 = function () {
        var bytes = this.getBytes();
        this.sendSocket(4127, bytes);
    };
    /**打开UI */
    ModelSGQD.prototype.CGOpenUI4121 = function () {
        var bytes = this.getBytes();
        this.sendSocket(4121, bytes);
    };
    /**抽奖 B:次数 1单抽 2十连抽 */
    ModelSGQD.prototype.CGBuy4123 = function (type) {
        var bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(4123, bytes);
    };
    /**打开排行榜 */
    ModelSGQD.prototype.CGOpenRank4125 = function () {
        var bytes = this.getBytes();
        this.sendSocket(4125, bytes);
    };
    /**发送领取单笔返利奖励 */
    ModelSGQD.prototype.CGGet4911 = function (type) {
        var bytes = this.getBytes();
        bytes.writeInt(type);
        this.sendSocket(4911, bytes);
    };
    /**发送领取登陆有礼奖励 */
    ModelSGQD.prototype.CGGET4891 = function (type) {
        var bytes = this.getBytes();
        bytes.writeInt(type);
        this.sendSocket(4891, bytes);
    };
    /**发送领取累充返利的奖励 */
    ModelSGQD.prototype.CGGET4931 = function (type) {
        var bytes = this.getBytes();
        bytes.writeInt(type);
        this.sendSocket(4931, bytes);
    };
    /**4130 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id  */
    ModelSGQD.prototype.GCDrawReward4130 = function (self, bytes) {
        var result = bytes.readByte();
        var cfgID = bytes.readInt();
        if (result == 1) {
            ViewCommonWarn.text("领取成功");
            for (var i = 0; i < ModelSGQD.zpRewardArr.length; i++) {
                if (ModelSGQD.zpRewardArr[i].cfg.id == cfgID) {
                    ModelSGQD.zpRewardArr[i].state = 2;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.SG_ZHUANPAN_TARGET_REWARD);
        }
    };
    /**4128 打开目标奖励界面 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表 I:我的抽奖次数 */
    ModelSGQD.prototype.GCOpenUI4128 = function (self, bytes) {
        var len = bytes.readShort();
        ModelSGQD.zpRewardArr = [];
        for (var i = 0; i < len; i++) {
            var cfgId = bytes.readInt();
            var state = bytes.readByte();
            var vo = Vo_ZhuanPanTarget.create(cfgId);
            vo.state = state;
            ModelSGQD.zpRewardArr.push(vo);
        }
        ModelSGQD.zpCtMy = bytes.readInt();
        GGlobal.control.notify(UIConst.SG_ZHUANPAN_TARGET_REWARD);
    };
    ModelSGQD.prototype.sortReward = function (a, b) {
        if (a.state == b.state) {
            return a.cfg.id - b.cfg.id;
        }
        else {
            if (a.state == 1) {
                return -1;
            }
            else if (b.state == 1) {
                return 1;
            }
            else {
                return a.state - b.state;
            }
        }
    };
    /**打开UI [U:玩家IDI:道具IDI:道具数量]历史记录所有数据*/
    ModelSGQD.prototype.GCOpenUI4122 = function (self, bytes) {
        var len = bytes.readShort();
        ModelSGQD.zpLogArr = [];
        for (var i = 0; i < len; i++) {
            var n = bytes.readUTF();
            var i_1 = bytes.readInt();
            var c = bytes.readInt();
            var v = { na: n, id: i_1, ct: c };
            ModelSGQD.zpLogArr.push(v);
        }
        self.notify(ModelSGQD.msg_datas_zhuanpan);
    };
    /**抽奖 B:结果 1成功 2系统未开启 3活动未开启 4传入类型不对 5本期奖励没配 6元宝不足[B:道具类型I:道具IDI:道具数量B:是否大奖 读表]抽奖结果*/
    ModelSGQD.prototype.GCBuy4124 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 1) {
            var len = bytes.readShort();
            var dropArr = [];
            for (var i = 0; i < len; i++) {
                var v = ConfigHelp.parseItemBa(bytes);
                var big = bytes.readByte();
                dropArr.push({ item: v, isBig: big });
            }
            ModelSGQD.zpBuyArr = dropArr;
            var t = ModelSGQD.skipTween ? 0 : 1200;
            setTimeout(function () {
                GGlobal.layerMgr.open(UIConst.SG_ZHUANPAN_SHOW, dropArr);
                var arrGet = [];
                for (var i = 0; i < dropArr.length; i++) {
                    var it = dropArr[i].item;
                    if (it.gType == Enum_Attr.ITEM && it.quality > 5) {
                        arrGet.push(it);
                    }
                }
                if (arrGet) {
                    ViewCommonPrompt.textItemList(arrGet);
                }
            }, t);
            self.notify(ModelSGQD.msg_buy_zhuanpan);
        }
        else {
            ViewCommonWarn.text(["", "", "系统未开启", "活动未开启", "传入类型不对", "本期奖励没配", "元宝不足", "活动已结束"][res]);
            self.notify(ModelSGQD.msg_buy_zhuanpan_fail);
        }
    };
    /**打开排行榜 B:结果 1成功[S:排名U:玩家名I:抽奖次数]排行榜数据S:我的排名 0未进排行榜 I:我的抽奖次数*/
    ModelSGQD.prototype.GCOpenRank4126 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 1) {
            var len = bytes.readShort();
            ModelSGQD.zpRankArr = [];
            for (var i = 0; i < len; i++) {
                var rk = bytes.readShort();
                var n = bytes.readUTF();
                var c = bytes.readInt();
                ModelSGQD.zpRankArr.push({ rk: rk, na: n, ct: c });
            }
            ModelSGQD.zpRankMy = bytes.readShort();
            ModelSGQD.zpCtMy = bytes.readInt();
            self.notify(ModelSGQD.msg_rank_zhuanpan);
        }
    };
    ModelSGQD.getRankCfg = function (qs, rank) {
        if (ModelSGQD._rankCfg == null) {
            ModelSGQD._rankCfg = {};
            for (var keys in Config.sghlzprank_261) {
                var v = Config.sghlzprank_261[keys];
                if (ModelSGQD._rankCfg[v.qs] == null) {
                    ModelSGQD._rankCfg[v.qs] = {};
                }
                var rankArr = ConfigHelp.SplitStr(v.rank);
                for (var i = Number(rankArr[0][0]); i <= Number(rankArr[0][1]); i++) {
                    ModelSGQD._rankCfg[v.qs][i] = v;
                }
            }
        }
        return ModelSGQD._rankCfg[qs][rank];
    };
    ModelSGQD.msg_datas_hldh = "msg_datas_hldh"; //豪礼兑换
    ModelSGQD.msg_datas_hyyl = "msg_datas_hyyl"; //活跃有礼
    ModelSGQD.msg_datas_jijin = "msg_datas_jijin"; //基金
    ModelSGQD.msg_datas_xfph = "msg_datas_xfph"; //消费排行
    ModelSGQD.msg_notice = "msg_notice"; //红点
    ModelSGQD.msg_datas_zhuanpan = "msg_datas_zhuanpan"; //转盘
    ModelSGQD.msg_rank_zhuanpan = "msg_rank_zhuanpan"; //转盘排行榜
    ModelSGQD.msg_buy_zhuanpan = "msg_buy_zhuanpan"; //转盘动画
    ModelSGQD.msg_buy_zhuanpan_fail = "msg_buy_zhuanpan_fail"; //转盘动画
    /**单笔返利 */
    ModelSGQD.msg_datas_danbifanli = "msg_datas_danbifanli";
    /**累充返利 */
    ModelSGQD.msg_datas_leichongfanli = "msg_datas_leichongfanli";
    /**登陆有礼 */
    ModelSGQD.msg_datas_dengluyouli = "msg_datas_dengluyouli";
    ModelSGQD.shopArr = [];
    /**单笔返利的 id arr */
    // static DANBIFANLIARR : number[];
    /**单笔返利数据 */
    ModelSGQD.DBFLData = [];
    /**登陆有礼数据 */
    ModelSGQD.DLYLData = [];
    /**累充返利数据 */
    ModelSGQD.LCFLData = [];
    //三国转盘
    ModelSGQD.zpQs = 0; //期数
    ModelSGQD.skipTween = false;
    ModelSGQD.zpRankArr = [];
    ModelSGQD.zpBuyArr = [];
    ModelSGQD.zpRankMy = 0;
    ModelSGQD.zpCtMy = 0;
    ModelSGQD.zpRewardArr = [];
    return ModelSGQD;
}(BaseModel));
__reflect(ModelSGQD.prototype, "ModelSGQD");
