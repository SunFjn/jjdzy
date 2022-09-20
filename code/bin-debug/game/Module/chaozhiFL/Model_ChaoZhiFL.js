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
var Model_ChaoZhiFL = (function (_super) {
    __extends(Model_ChaoZhiFL, _super);
    function Model_ChaoZhiFL() {
        var _this = _super.call(this) || this;
        _this.shopArr = [];
        _this.shengjieShop = [];
        _this.yuanbaoDta = [];
        _this.cailiaoDta = [];
        return _this;
    }
    // public iconArr;
    // public filterArr(): void {
    // 	let a = this;
    // 	a.iconArr = [];
    // let t = Model_Activity.activityObj[UIConst.CHAOZHIFL];
    // 	if (t) {
    // 		t.forEach(element => {
    // 			a.iconArr.push(element);
    // 		});
    // 	}
    // 	this.add(UIConst.DISCOUNT_SHOP);
    // 	var bool = GGlobal.modelWarToDead.isIn7Days();
    // 	if (bool) {
    // 		this.add(UIConst.WARTODEAD_7IN);
    // 		this.add(UIConst.GROUP_BUY);
    // 		this.add(UIConst.CAILIAOFL_KF);
    // 		this.add(UIConst.YUANBAOFL_KF);
    // 	} else {
    // 		// this.add(UIConst.WARTODEAD_7OUT);
    // 	}
    // 	GGlobal.control.listenonce(Enum_MsgType.KAIFUDAY_UPDATE, this.filterArr, this);
    // }
    // private add(actId) {
    // 	var vo = new Vo_Activity();
    // 	vo.id = actId;
    // 	this.iconArr.push(vo);
    // }
    Model_ChaoZhiFL.prototype.checkActivity = function (id) {
        // let ret = false;
        // if (this.iconArr) {
        // 	for (let i = 0; i < this.iconArr.length; i++) {
        // 		if (this.iconArr[i].id == id) {
        // 			ret = true;
        // 			break;
        // 		}
        // 	}
        // }
        // return ret;
        return !!GGlobal.modelActivity.get(UIConst.CHAOZHIFL, id);
    };
    Model_ChaoZhiFL.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(2430, a.GC_OPENUI_2430, a);
        wsm.regHand(2432, a.GC_LQ_2432, a);
        wsm.regHand(2952, a.GC_OPENUI_2952, a);
        wsm.regHand(2954, a.GC_LQ_2954, a);
        wsm.regHand(2450, a.GC_OPENUI_2450, a);
        wsm.regHand(2452, a.GC_LQ_2452, a);
        wsm.regHand(3032, a.GC_OPENUI_3032, a);
        wsm.regHand(3034, a.GC_LQ_3034, a);
        wsm.regHand(2500, a.GC_OPEN_CHAOZHI_ZHUANPAN, a);
        wsm.regHand(2502, a.GC_DRAW_CHAOZHI_ZHUANPAN, a);
        wsm.regHand(2504, a.GC_DRAW_CHAOZHI_ZHUANPAN_BOX, a);
        wsm.regHand(2506, a.GC_CHAOZHI_ZHUANPAN_NOTE, a);
        wsm.regHand(2508, a.GC_CHAOZHI_ZHUANPAN_BROADCAST, a);
        wsm.regHand(2632, a.GC_OPEN_DISCOUNTSHOP, a);
        wsm.regHand(2634, a.GC_DISCOUNTSHOP_BUY, a);
        wsm.regHand(4502, a.GC_OPEN_SHENGJIESHOP, a);
        wsm.regHand(4504, a.GC_SHENGJIESHOP_BUY, a);
        //8-28天
        wsm.regHand(4790, a.GC_OPENUI_2450, a);
        wsm.regHand(4792, a.GC_LQ_2452, a);
        wsm.regHand(4770, a.GC_OPEN_DISCOUNTSHOP, a);
        wsm.regHand(4772, a.GC_DISCOUNTSHOP_BUY, a);
    };
    //=============折扣商店
    /**2631	打开界面 */
    Model_ChaoZhiFL.prototype.CG_OPEN_DISCOUNTSHOP = function () {
        var ba = new BaseBytes();
        this.sendSocket(2631, ba);
    };
    /**2633	购买 I:商品id */
    Model_ChaoZhiFL.prototype.CG_DISCOUNTSHOP_BUY = function (itemId) {
        var ba = new BaseBytes();
        ba.writeInt(itemId);
        if (ModelEightLock.originalDatas[UIConst.DISCOUNT_SHOP1]) {
            this.sendSocket(4771, ba);
        }
        else {
            this.sendSocket(2633, ba);
        }
    };
    /**2634	购买返回 B:状态，0：商品不存在，1：成功，2：元宝不足，3：商品已售罄，4：vip等级不足I:商品id */
    Model_ChaoZhiFL.prototype.GC_DISCOUNTSHOP_BUY = function (self, data) {
        var result = data.readByte();
        var itemId = data.readInt();
        if (result == 1) {
            ViewCommonWarn.text("购买成功");
            for (var i = 0; i < self.shopArr.length; i++) {
                if (self.shopArr[i].id == itemId) {
                    self.shopArr[i].buyNum--;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.DISCOUNT_SHOP);
        }
    };
    /**2632	打开界面返回 [I:商品idI:已购买数量]商品列表 */
    Model_ChaoZhiFL.prototype.GC_OPEN_DISCOUNTSHOP = function (self, data) {
        self.shopArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var itemId = data.readInt();
            var buyNum = data.readInt();
            var cfg = void 0;
            if (ModelEightLock.originalDatas[UIConst.DISCOUNT_SHOP1]) {
                cfg = Config.offstore3_244[itemId];
            }
            else {
                if (Model_GlobalMsg.kaifuDay <= 7) {
                    cfg = Config.offstore1_244[itemId];
                }
                else {
                    cfg = Config.offstore2_244[itemId];
                }
            }
            cfg.buyNum = buyNum;
            self.shopArr.push(cfg);
        }
        self.shopArr.sort(self.shopSort);
        GGlobal.control.notify(Enum_MsgType.DISCOUNT_SHOP);
    };
    Model_ChaoZhiFL.prototype.shopSort = function (a, b) {
        return a.wz - b.wz;
    };
    //============
    //=============升阶商店
    /**4501	打开界面 */
    Model_ChaoZhiFL.prototype.CG_OPEN_SHENGJIESHOP = function () {
        var ba = new BaseBytes();
        this.sendSocket(4501, ba);
    };
    /**4503	购买 I:购买的配置表id */
    Model_ChaoZhiFL.prototype.CG_SHENGJIESHOP_BUY = function (itemId) {
        var ba = new BaseBytes();
        ba.writeInt(itemId);
        this.sendSocket(4503, ba);
    };
    /**4504	购买返回 B:状态，0：商品不存在，1：成功，2：元宝不足，3：商品已售罄，4：条件未达到I:购买的配置表id */
    Model_ChaoZhiFL.prototype.GC_SHENGJIESHOP_BUY = function (self, data) {
        var result = data.readByte();
        var itemId = data.readInt();
        if (result == 1) {
            ViewCommonWarn.text("购买成功");
            for (var i = 0; i < self.shengjieShop.length; i++) {
                if (self.shengjieShop[i].id == itemId) {
                    self.shengjieShop[i].buyNum--;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.SHENGJIE_SHOP);
        }
    };
    /**4502	打开界面返回 [I:配置表idI:剩余购买数量,无限等于-1]商店列表 */
    Model_ChaoZhiFL.prototype.GC_OPEN_SHENGJIESHOP = function (self, data) {
        self.shengjieShop = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var itemId = data.readInt();
            var buyNum = data.readInt();
            var cfg = Config.shengjiestore_301[itemId];
            cfg.buyNum = buyNum;
            self.shengjieShop.push(cfg);
        }
        self.shengjieShop.sort(self.shopSort);
        GGlobal.control.notify(Enum_MsgType.SHENGJIE_SHOP);
    };
    //============
    //==============元宝返利 start
    Model_ChaoZhiFL.prototype.sortFun = function (a, b) {
        return getSort(a) < getSort(b) ? -1 : 1;
        function getSort(arr) {
            var st = arr[1];
            var id = arr[0];
            if (st == 1) {
                return id - 10000;
            }
            else if (st == 0) {
                return id - 1000;
            }
            else if (st == 2) {
                return id;
            }
        }
    };
    Model_ChaoZhiFL.prototype.getYuanBaoCFG = function () {
        if (ModelEightLock.originalDatas[UIConst.YUANBAOFANLI1])
            return Config.ybfl3_735;
        if (this.checkActivity(UIConst.YUANBAOFL_KF))
            return Config.ybfl1_735;
        return Config.ybfl2_735;
    };
    //打开界面
    Model_ChaoZhiFL.prototype.CG_OPEN_3031 = function () {
        if (this.checkActivity(UIConst.YUANBAOFL_KF)) {
            var ba = this.getBytes();
            this.sendSocket(3031, ba);
        }
        else {
            GGlobal.modelActivity.CG_OPENACT(UIConst.YUANBAOFANLI);
        }
    };
    /**
     *  2450 [I-B]-I
     * 打开界面数据返回 [I:索引idB:奖励状态，0：不可领取，1：可领取，2：已领取]奖励状态列表I:消耗元宝数量
    */
    Model_ChaoZhiFL.prototype.GC_OPENUI_2450 = function (s, d) {
        var len = d.readShort();
        s.yuanbaoDta = [];
        for (var a = 0; a < len; a++) {
            s.yuanbaoDta.push([d.readInt(), d.readByte()]);
        }
        s.yuanbaoDta.sort(s.sortFun);
        s.yb = d.readInt();
        GGlobal.control.notify(Enum_MsgType.YUANBAOFANLI);
    };
    /**
     *  3032 [I-B]-I
     * 打开界面数据返回 [I:索引idB:奖励状态，0：不可领取，1：可领取，2：已领取]奖励状态列表I:消耗元宝数量
    */
    Model_ChaoZhiFL.prototype.GC_OPENUI_3032 = function (s, d) {
        var len = d.readShort();
        s.yuanbaoDta = [];
        for (var a = 0; a < len; a++) {
            s.yuanbaoDta.push([d.readInt(), d.readByte()]);
        }
        s.yuanbaoDta.sort(s.sortFun);
        s.yb = d.readInt();
        GGlobal.control.notify(Enum_MsgType.YUANBAOFL_KF);
    };
    //领取奖励
    Model_ChaoZhiFL.prototype.CG_LQ_2451 = function (b) {
        var ba = this.getBytes();
        ba.writeInt(b);
        if (this.checkActivity(UIConst.YUANBAOFL_KF)) {
            this.sendSocket(3033, ba);
        }
        else {
            this.sendSocket(2451, ba);
        }
    };
    //领取奖励
    Model_ChaoZhiFL.prototype.CG_LQ_4791 = function (b) {
        var ba = this.getBytes();
        ba.writeInt(b);
        this.sendSocket(4791, ba);
    };
    /**
     *  2452  B-I
     * 领取奖励返回 B:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取B:奖励id
    */
    Model_ChaoZhiFL.prototype.GC_LQ_2452 = function (s, d) {
        var st = d.readByte();
        var id = d.readInt();
        if (st == 1) {
            var arr = s.yuanbaoDta;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][0] == id) {
                    arr[i][1] = 2;
                    break;
                }
            }
            s.yuanbaoDta.sort(s.sortFun);
            GGlobal.control.notify(Enum_MsgType.YUANBAOFANLI);
        }
        else {
            if (st == 0) {
                ViewCommonWarn.text("奖励不存在");
            }
            else if (st == 2) {
                ViewCommonWarn.text("不可领取");
            }
            else if (st == 3) {
                ViewCommonWarn.text("不可重复领取");
            }
        }
    };
    /**
     *  3034  B-I
     * 领取奖励返回 B:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取B:奖励id
    */
    Model_ChaoZhiFL.prototype.GC_LQ_3034 = function (s, d) {
        var st = d.readByte();
        var id = d.readInt();
        if (st == 1) {
            var arr = s.yuanbaoDta;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][0] == id) {
                    arr[i][1] = 2;
                    break;
                }
            }
            s.yuanbaoDta.sort(s.sortFun);
            GGlobal.control.notify(Enum_MsgType.YUANBAOFL_KF);
        }
        else {
            if (st == 0) {
                ViewCommonWarn.text("奖励不存在");
            }
            else if (st == 2) {
                ViewCommonWarn.text("不可领取");
            }
            else if (st == 3) {
                ViewCommonWarn.text("不可重复领取");
            }
        }
    };
    Model_ChaoZhiFL.prototype.getCailiaoCFG = function () {
        if (this.checkActivity(UIConst.CAILIAOFL_KF))
            return Config.clfl1_736;
        return Config.clfl2_736;
    };
    //打开界面
    Model_ChaoZhiFL.prototype.CG_OPEN_2951 = function () {
        if (this.checkActivity(UIConst.CAILIAOFL_KF)) {
            var ba = this.getBytes();
            this.sendSocket(2951, ba);
        }
        else {
            GGlobal.modelActivity.CG_OPENACT(UIConst.CAILIAOFANLI);
        }
    };
    /**
     *  2430 [I-B]-I
     * 打开界面返回 [I:索引idB:奖励状态，1：可领取，2：已领取]奖励状态列表I:消耗材料个数
    */
    Model_ChaoZhiFL.prototype.GC_OPENUI_2430 = function (s, d) {
        var len = d.readShort();
        s.cailiaoDta = [];
        for (var a = 0; a < len; a++) {
            s.cailiaoDta.push([d.readInt(), d.readByte()]);
        }
        s.cailiaoDta = s.cailiaoDta.sort(s.sortFun);
        s.cl = d.readInt();
        GGlobal.control.notify(Enum_MsgType.CAILIAOFANLI);
    };
    /**
     *  2952 [I-B]-I
     * 打开界面返回 [I:索引idB:奖励状态，1：可领取，2：已领取]奖励状态列表I:消耗材料个数
    */
    Model_ChaoZhiFL.prototype.GC_OPENUI_2952 = function (s, d) {
        var len = d.readShort();
        s.cailiaoDta = [];
        for (var a = 0; a < len; a++) {
            s.cailiaoDta.push([d.readInt(), d.readByte()]);
        }
        s.cailiaoDta = s.cailiaoDta.sort(s.sortFun);
        s.cl = d.readInt();
        GGlobal.control.notify(Enum_MsgType.CAILIAOFL_KF);
    };
    //领取奖励
    Model_ChaoZhiFL.prototype.CG_LQ_2431 = function (b) {
        var ba = this.getBytes();
        ba.writeInt(b);
        if (this.checkActivity(UIConst.CAILIAOFL_KF)) {
            this.sendSocket(2953, ba);
        }
        else {
            this.sendSocket(2431, ba);
        }
    };
    /**
     *  2432  B-I
     * 领取奖励返回 B:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取B:奖励id
    */
    Model_ChaoZhiFL.prototype.GC_LQ_2432 = function (s, d) {
        var st = d.readByte();
        var id = d.readInt();
        if (st == 1) {
            var arr = s.cailiaoDta;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][0] == id) {
                    arr[i][1] = 2;
                    break;
                }
            }
            s.cailiaoDta.sort(s.sortFun);
            GGlobal.control.notify(Enum_MsgType.CAILIAOFANLI);
        }
        else {
            if (st == 0) {
                ViewCommonWarn.text("奖励不存在");
            }
            else if (st == 2) {
                ViewCommonWarn.text("不可领取");
            }
            else if (st == 3) {
                ViewCommonWarn.text("不可重复领取");
            }
        }
    };
    /**
     *  2954  B-I
     * 领取奖励返回 B:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取B:奖励id
    */
    Model_ChaoZhiFL.prototype.GC_LQ_2954 = function (s, d) {
        var st = d.readByte();
        var id = d.readInt();
        if (st == 1) {
            var arr = s.cailiaoDta;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][0] == id) {
                    arr[i][1] = 2;
                    break;
                }
            }
            s.cailiaoDta.sort(s.sortFun);
            GGlobal.control.notify(Enum_MsgType.CAILIAOFL_KF);
        }
        else {
            if (st == 0) {
                ViewCommonWarn.text("奖励不存在");
            }
            else if (st == 2) {
                ViewCommonWarn.text("不可领取");
            }
            else if (st == 3) {
                ViewCommonWarn.text("不可重复领取");
            }
        }
    };
    /**2500 打开界面返回 I:剩余抽奖次数I:消费值[B:宝箱状态，0：不可领取，1：可领取，2：已领取]宝箱状态列表[U:玩家姓名I:道具id]获奖公告列表  */
    Model_ChaoZhiFL.prototype.GC_OPEN_CHAOZHI_ZHUANPAN = function (self, data) {
        Model_ChaoZhiFL.drawNum = data.readInt();
        Model_ChaoZhiFL.costNum = data.readInt();
        Model_ChaoZhiFL.boxArr = [];
        Model_ChaoZhiFL.broadcastArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_ChaoZhiFL.boxArr.push(data.readByte());
        }
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_ChaoZhiFL.broadcastArr.push(data.readFmt(["U", "I"]));
        }
        GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
    };
    /**2501 抽奖 B:抽奖类型，1:1次，10:10次  */
    Model_ChaoZhiFL.prototype.CG_DRAW_CHAOZHI_ZHUANPAN = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(2501, ba);
    };
    /**2502 抽奖返回 B:状态：1：成功，2：抽奖次数不足[B:奖品类型I:奖品idI:奖品数量B:是否大奖，0：不是，1：是]抽取的奖品列表B:抽奖类型返回  */
    Model_ChaoZhiFL.prototype.GC_DRAW_CHAOZHI_ZHUANPAN = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var arr = [];
            for (var i = 0, len = data.readShort(); i < len; i++) {
                var vo = ConfigHelp.parseItemBa(data);
                var isReward = data.readByte();
                arr.push(vo);
                if (Model_ChaoZhiFL.noteArr.length >= 10)
                    Model_ChaoZhiFL.noteArr.pop();
                Model_ChaoZhiFL.noteArr.unshift(vo);
            }
            Model_ChaoZhiFL.zpRewardArr = arr;
            var drawIndex = data.readByte();
            Model_ChaoZhiFL.drawNum -= drawIndex;
            GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
            GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN_SHOWEFF);
        }
    };
    /**2503 领取宝箱奖励 I:宝箱id，从1开始  */
    Model_ChaoZhiFL.prototype.CG_DRAW_CHAOZHI_ZHUANPAN_BOX = function (boxId) {
        var ba = new BaseBytes();
        ba.writeInt(boxId);
        this.sendSocket(2503, ba);
    };
    /**2504 领取宝箱奖励返回 B:状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取I:宝箱id返回  */
    Model_ChaoZhiFL.prototype.GC_DRAW_CHAOZHI_ZHUANPAN_BOX = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var boxId = data.readInt();
            Model_ChaoZhiFL.boxArr[boxId - 1] = 2;
            GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
        }
    };
    /**2505  抽奖记录   */
    Model_ChaoZhiFL.prototype.CG_CHAOZHI_ZHUANPAN_NOTE = function () {
        var ba = new BaseBytes();
        this.sendSocket(2505, ba);
    };
    /**2506 抽奖记录返回 [I:抽奖获得的道具idI:数量]抽奖记录列表  */
    Model_ChaoZhiFL.prototype.GC_CHAOZHI_ZHUANPAN_NOTE = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_ChaoZhiFL.noteArr.push(data.readFmt(["I", "I"]));
        }
        GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
    };
    /**2508 在线推送获奖公告 [U:玩家姓名I:道具id]获奖公告列表  */
    Model_ChaoZhiFL.prototype.GC_CHAOZHI_ZHUANPAN_BROADCAST = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            if (Model_ChaoZhiFL.broadcastArr.length >= 3)
                Model_ChaoZhiFL.broadcastArr.shift();
            Model_ChaoZhiFL.broadcastArr.push(data.readFmt(["U", "I"]));
        }
        GGlobal.control.notify(Enum_MsgType.CHAOZHI_ZHUANPAN);
    };
    //==============材料返利
    Model_ChaoZhiFL.drawNum = 0;
    Model_ChaoZhiFL.costNum = 0;
    /**0：不可领取，1：可领取，2：已领取 */
    Model_ChaoZhiFL.boxArr = [];
    Model_ChaoZhiFL.noteArr = [];
    Model_ChaoZhiFL.broadcastArr = [];
    Model_ChaoZhiFL.zpRewardArr = [];
    Model_ChaoZhiFL.zpSkipTween = false;
    return Model_ChaoZhiFL;
}(BaseModel));
__reflect(Model_ChaoZhiFL.prototype, "Model_ChaoZhiFL");
