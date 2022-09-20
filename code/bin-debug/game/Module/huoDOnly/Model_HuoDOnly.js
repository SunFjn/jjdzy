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
var Model_HuoDOnly = (function (_super) {
    __extends(Model_HuoDOnly, _super);
    function Model_HuoDOnly() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //=================元宝返利
        _this._ybao = {}; //材料数量
        _this._ybaoDta = {};
        return _this;
    }
    /**请求某活动数据 I:唯一id*/
    Model_HuoDOnly.prototype.CG_OPEN_UI = function (hid) {
        var ba = new BaseBytes();
        ba.writeInt(hid);
        this.sendSocket(7901, ba);
    };
    /**返回专属活动数据 [I:唯一idI:开始时间I:结束时间]专属活动数据*/
    Model_HuoDOnly.prototype.GC_OPEN_UI7900 = function (self, bytes) {
        var len = bytes.readShort();
        var servTime = Model_GlobalMsg.getServerTime() / 1000;
        for (var i = 0; i < len; i++) {
            var sysID = bytes.readInt();
            var start = bytes.readInt();
            var end = bytes.readInt();
            var state = servTime > start && servTime < end ? 1 : 0;
            var cfg = Config.zshdb_315[sysID];
            if (cfg == null) {
                console.error("专属活动id配置缺失" + sysID);
                continue;
            }
            var act = Vo_Activity.create();
            act.setData(cfg.type, cfg.hdid, sysID, cfg.qs, start, end);
            act.status = state; //更新活动状态
            if (state == 1) {
                Model_HuoDOnly.originalDatas[sysID] = act;
                console.info("专属活动id开启" + sysID + cfg.name);
            }
            else {
                if (Model_HuoDOnly.originalDatas[sysID]) {
                    delete Model_HuoDOnly.originalDatas[sysID];
                }
                console.info("专属活动id关闭" + sysID + cfg.name);
            }
        }
        Model_HuoDOnly.ON_OFF = (bytes.readByte() == 1 ? true : false);
        GGlobal.control.notify(Enum_MsgType.SEND_HUOD_ONLY_SYSTEM);
        console.info("专属活动开关" + (Model_HuoDOnly.ON_OFF ? "true" : "false"));
        var actlen = Model_HuoDOnly.getActivity().length;
        console.info("专属活动长度" + actlen);
    };
    //更新活动状态 B:更新类型：0：结束，1：开启I:分类表唯一idI:系统idI:期数I:开始时间I:结束时间
    Model_HuoDOnly.prototype.GC_UP_STATUS7902 = function (self, bytes) {
        var sysID = bytes.readInt();
        var start = bytes.readInt();
        var end = bytes.readInt();
        var state = bytes.readByte();
        var cfg = Config.zshdb_315[sysID];
        if (cfg == null) {
            console.error("专属活动id配置缺失" + sysID);
            return;
        }
        var act = Vo_Activity.create();
        act.setData(cfg.type, cfg.hdid, sysID, cfg.qs, start, end);
        act.status = state; //更新活动状态
        if (state == 1) {
            Model_HuoDOnly.originalDatas[sysID] = act;
            console.info("更新专属活动id开启" + sysID + cfg.name);
        }
        else {
            if (Model_HuoDOnly.originalDatas[sysID]) {
                delete Model_HuoDOnly.originalDatas[sysID];
            }
            console.info("更新活动id关闭" + sysID + cfg.name);
        }
        var actlen = Model_HuoDOnly.getActivity().length;
        console.info("更新专属活动长度" + actlen);
        self.notify(Model_HuoDOnly.add_del_hd); //活动更新删除
        GGlobal.control.notify(Enum_MsgType.SEND_HUOD_ONLY_SYSTEM);
    };
    Model_HuoDOnly.prototype.GC_ON_OFF7904 = function (self, bytes) {
        Model_HuoDOnly.ON_OFF = (bytes.readByte() == 1 ? true : false);
        GGlobal.control.notify(Enum_MsgType.SEND_HUOD_ONLY_SYSTEM);
        console.info("更新专属活动开关" + (Model_HuoDOnly.ON_OFF ? "true" : "false"));
    };
    //更新专属活动配置数据 [I:唯一idI:大活动类型I:活动idI:期数U:活动名称U:活动内容U:开始时间U:结束时间]专属活动配置数据
    Model_HuoDOnly.prototype.GC_ALL_CFG7906 = function (self, bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var v = {
                id: bytes.readInt(),
                type: bytes.readInt(),
                hdid: bytes.readInt(),
                qs: bytes.readInt(),
                name: bytes.readUTF(),
                nr: bytes.readUTF(),
                hstart: bytes.readUTF(),
                hend: bytes.readUTF(),
                wdid: 0,
                vip: 0,
                fwq: 0
            };
            Config.zshdb_315[v.id] = v;
        }
    };
    Model_HuoDOnly.getActivity = function () {
        var arr = [];
        for (var keys in Model_HuoDOnly.originalDatas) {
            var v = Model_HuoDOnly.originalDatas[keys];
            arr.push(v);
        }
        return arr;
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_HuoDOnly.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        //专属活动数据
        wsm.regHand(7900, a.GC_OPEN_UI7900, a);
        wsm.regHand(7902, a.GC_UP_STATUS7902, a);
        wsm.regHand(7904, a.GC_ON_OFF7904, a);
        wsm.regHand(7906, a.GC_ALL_CFG7906, a);
        //单笔充值
        wsm.regHand(8100, a.GC_DAIONE_OPENUI8100, a);
        wsm.regHand(8102, a.GC_DAIONE_GET8102, a);
        wsm.regHand(8104, a.GC_DAIONE_CFG8104, a);
        //专属商店
        wsm.regHand(8160, a.GC_SHOP_OPENUI8160, a);
        wsm.regHand(8162, a.GC_SHOP_BUY8162, a);
        wsm.regHand(8164, a.GC_SHOP_CFG8164, a);
        //累计充值
        wsm.regHand(8300, a.GC_ADDRECHARGE_OPENUI8300, a);
        wsm.regHand(8302, a.GC_ADDRECHARGE_GET8302, a);
        wsm.regHand(8304, a.GC_ADDRECHARGE_CHARGE8304, a);
        wsm.regHand(8306, a.GC_ADDRECHARGE_CFG8306, a);
        //元宝返利
        wsm.regHand(8330, a.GC_YBFL_UI_8330, a);
        wsm.regHand(8332, a.GC_YBFL_LQ_8332, a);
        wsm.regHand(8334, a.GC_YBFL_CFG_8334, a);
        //单笔返利
        wsm.regHand(8360, a.GCDBFanLi_UI8360, a);
        wsm.regHand(8362, a.GCDBFanLi_Get8362, a);
        wsm.regHand(8364, a.GCDBFanLi_CFG8364, a);
    };
    Model_HuoDOnly.getDaiOneArr = function (sys) {
        return Model_HuoDOnly._daiOneArr[sys];
    };
    /**单笔充值 领取奖励 I:活动唯一idI:奖励编号*/
    Model_HuoDOnly.prototype.CG_DAILYONE_GET = function (hid, id) {
        var ba = new BaseBytes();
        ba.writeInt(hid);
        ba.writeInt(id);
        this.sendSocket(8101, ba);
    };
    /**单笔充值 打开界面返回 [B:奖励状态，0：未达到，1：可领取，2：已领取]奖励状态列表*/
    Model_HuoDOnly.prototype.GC_DAIONE_OPENUI8100 = function (self, data) {
        var sys = data.readInt();
        var len = data.readShort();
        Model_HuoDOnly._daiOneArr[sys] = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgCt(data);
            Model_HuoDOnly._daiOneArr[sys].push(v);
        }
        Model_HuoDOnly._daiOneArr[sys].sort(Model_HuoDong.sortFuc);
        GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_DAIONEA_UI, sys);
    };
    /**单笔充值 领取奖励 B:状态：1：成功，2：未达到，3：重复领取B:领取奖励id*/
    Model_HuoDOnly.prototype.GC_DAIONE_GET8102 = function (self, data) {
        var sys = data.readInt();
        var v = new Vo_HuoDong();
        v.readMsgCt(data);
        if (v.id != 0) {
            var arr = Model_HuoDOnly._daiOneArr[sys];
            if (arr == null) {
                Model_HuoDOnly._daiOneArr[sys] = [];
                Model_HuoDOnly._daiOneArr[sys].push(v);
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    var vday = arr[i];
                    if (vday.id == v.id) {
                        vday.hasCt = v.hasCt;
                        vday.canCt = v.canCt;
                        break;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_DAIONEA_UI, sys);
        }
    };
    //更新单笔充值配置表 [I:序号I:期数I:je[B:道具类型I:道具idI:道具数量]I:领取次数]单笔充值配置数据
    Model_HuoDOnly.prototype.GC_DAIONE_CFG8104 = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = {
                xh: data.readInt(),
                qs: data.readInt(),
                je: data.readInt(),
                jl: [],
                cs: 0
            };
            var size = data.readShort();
            for (var j = 0; j < size; j++) {
                var itm = [data.readByte(), data.readInt(), data.readInt()];
                v.jl.push(itm);
            }
            v.cs = data.readInt();
            Config.zshddbcz_315[v.xh] = v;
        }
    };
    Model_HuoDOnly.setSkipShow = function (selected) {
        Model_HuoDOnly.skipShow = selected;
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = "huodonly_" + Model_player.voMine.id + "_" + date.getDay() + "" + date.getMonth() + "" + date.getFullYear();
        var val = Model_HuoDOnly.skipShow ? "1" : "0";
        egret.localStorage.setItem(key, val);
    };
    Model_HuoDOnly.getSkipShow = function () {
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = "huodonly_" + Model_player.voMine.id + "_" + date.getDay() + "" + date.getMonth() + "" + date.getFullYear();
        var val = egret.localStorage.getItem(key);
        Model_HuoDOnly.skipShow = val == "1" ? true : false;
        return Model_HuoDOnly.skipShow;
    };
    Model_HuoDOnly.getshopArr = function (sys) {
        return Model_HuoDOnly._shopArr[sys];
    };
    /**购买商品 I:活动唯一idI:商品编号*/
    Model_HuoDOnly.prototype.CG_SHOP_BUY_8161 = function (hid, id) {
        var ba = new BaseBytes();
        ba.writeInt(hid);
        ba.writeInt(id);
        this.sendSocket(8161, ba);
    };
    /**返回界面信息 I:活动唯一id[I:商品编号I:已购买数量]已购商品数据*/
    Model_HuoDOnly.prototype.GC_SHOP_OPENUI8160 = function (self, data) {
        var sys = data.readInt();
        var len = data.readShort();
        Model_HuoDOnly._shopArr[sys] = [];
        for (var i = 0; i < len; i++) {
            var v = Vo_Shop.createOnly(data.readInt());
            v.buyNum = data.readInt();
            Model_HuoDOnly._shopArr[sys].push(v);
        }
        GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_Shop_UI);
    };
    /**购买结果返回 I:活动唯一idB:购买结果：0：失败，1：成功I:失败：（1:已达限购次数，2：元宝不足），成功：商品编号I:已购买数量*/
    Model_HuoDOnly.prototype.GC_SHOP_BUY8162 = function (self, data) {
        var sys = data.readInt();
        var res = data.readByte();
        var id = data.readInt();
        var ct = data.readInt();
        if (res == 1) {
            var arr = Model_HuoDOnly._shopArr[sys];
            if (arr == null)
                return;
            for (var i = 0; i < arr.length; i++) {
                if (id == arr[i].id) {
                    arr[i].buyNum = ct;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_Shop_UI);
        }
        else {
            ViewCommonWarn.text("购买失败");
        }
    };
    //更新专属商店配置表 [I:商品idI:期数I:位置[B:道具类型I:道具idI:道具数量][B:道具类型I:道具idI:道具数量]I:购买次数]专属商店配置数据
    Model_HuoDOnly.prototype.GC_SHOP_CFG8164 = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = {
                id: data.readInt(),
                qs: data.readInt(),
                wz: data.readInt(),
                name: "",
                item: [],
                money: [],
                time: 0,
            };
            var size = data.readShort();
            for (var j = 0; j < size; j++) {
                var itm = [data.readByte(), data.readInt(), data.readInt()];
                v.item.push(itm);
            }
            size = data.readShort();
            for (var j = 0; j < size; j++) {
                var itm = [data.readByte(), data.readInt(), data.readInt()];
                v.money.push(itm);
            }
            v.time = data.readInt();
            Config.zshdzssd_315[v.id] = v;
        }
    };
    Model_HuoDOnly.getAddRecharge = function (sys) {
        return Model_HuoDOnly._addRecharge[sys] ? Model_HuoDOnly._addRecharge[sys] : 0;
    };
    Model_HuoDOnly.getAddRechargeArr = function (sys) {
        return Model_HuoDOnly._addRechargeArr[sys] ? Model_HuoDOnly._addRechargeArr[sys] : [];
    };
    /**累计充值 领取奖励 I:活动唯一idI:奖励序号*/
    Model_HuoDOnly.prototype.CG_ADDRECHARGE_GET = function (hid, index) {
        var ba = new BaseBytes();
        ba.writeInt(hid);
        ba.writeInt(index);
        this.sendSocket(8301, ba);
    };
    /**累计充值 返回界面信息 I:活动唯一idI:充值金额[I:索引idB:奖励状态]奖励状态数据]*/
    Model_HuoDOnly.prototype.GC_ADDRECHARGE_OPENUI8300 = function (self, data) {
        var sys = data.readInt();
        Model_HuoDOnly._addRecharge[sys] = data.readInt();
        var len = data.readShort();
        Model_HuoDOnly._addRechargeArr[sys] = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgInt(data);
            Model_HuoDOnly._addRechargeArr[sys].push(v);
        }
        Model_HuoDOnly._addRechargeArr[sys].sort(Model_HuoDong.sortFuc);
        GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI);
        GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_ADD_RECHARGE, sys - 1, Model_HuoDong.isVoNotice(Model_HuoDOnly._addRechargeArr[sys]));
        GGlobal.reddot.notify(UIConst.HUOD_ONLY);
    };
    /**累计充值 领取奖励结果 I:活动唯一idI: 序号B:奖励状态*/
    Model_HuoDOnly.prototype.GC_ADDRECHARGE_GET8302 = function (self, data) {
        var sys = data.readInt();
        var v = new Vo_HuoDong();
        v.readMsgInt(data);
        if (v.id != 0) {
            var arr = Model_HuoDOnly._addRechargeArr[sys];
            if (arr == null) {
                Model_HuoDOnly._addRechargeArr[sys] = [];
                Model_HuoDOnly._addRechargeArr[sys].push(v);
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id == v.id) {
                        arr[i].status = v.status;
                        break;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI);
            GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_ADD_RECHARGE, sys - 1, Model_HuoDong.isVoNotice(Model_HuoDOnly._addRechargeArr[sys]));
            GGlobal.reddot.notify(UIConst.HUOD_ONLY);
        }
    };
    /**充值金额变化 I:活动唯一idI: 充值金额数量*/
    Model_HuoDOnly.prototype.GC_ADDRECHARGE_CHARGE8304 = function (self, data) {
        var sys = data.readInt();
        Model_HuoDOnly._addRecharge[sys] = data.readInt();
        GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_ADDRECHARGE_OPENUI);
    };
    //更新累计充值配置表 I:序号I:期数I:额度[B:道具类型I:道具idI:道具数量]
    Model_HuoDOnly.prototype.GC_ADDRECHARGE_CFG8306 = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = {
                id: data.readInt(),
                qs: data.readInt(),
                coin: data.readInt(),
                reward: []
            };
            var size = data.readShort();
            for (var j = 0; j < size; j++) {
                var itm = [data.readByte(), data.readInt(), data.readInt()];
                v.reward.push(itm);
            }
            Config.zshdljcz_315[v.id] = v;
        }
    };
    Model_HuoDOnly.prototype.getYbao = function (sys) {
        return this._ybao[sys] ? this._ybao[sys] : 0;
    };
    Model_HuoDOnly.prototype.getYbaoDta = function (sys) {
        return this._ybaoDta[sys] ? this._ybaoDta[sys] : [];
    };
    /**
     *  2450 [I-B]-I
     * 返回界面信息 I:活动唯一idI: 消耗元宝数量[I:索引idB: 奖励状态，0：不可领取，1：可领取，2：已领取]奖励状态列表
    */
    Model_HuoDOnly.prototype.GC_YBFL_UI_8330 = function (s, d) {
        var sys = d.readInt();
        s._ybao[sys] = d.readInt();
        var len = d.readShort();
        s._ybaoDta[sys] = [];
        for (var a = 0; a < len; a++) {
            var v = new Vo_HuoDong();
            v.readMsgInt(d);
            s._ybaoDta[sys].push(v);
        }
        s._ybaoDta[sys].sort(Model_HuoDong.sortFuc);
        GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_YBFL);
        GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_YBFL, sys - 1, Model_HuoDong.isVoNotice(s._ybaoDta[sys]));
        GGlobal.reddot.notify(UIConst.HUOD_ONLY);
    };
    //领取奖励 I:活动唯一idI: 索引id
    Model_HuoDOnly.prototype.CG_YBFL_LQ_8331 = function (sys, id) {
        var ba = this.getBytes();
        ba.writeInt(sys);
        ba.writeInt(id);
        this.sendSocket(8331, ba);
    };
    /**
     * 领取奖励结果 I:活动唯一idI: 索引idB:奖励状态，0：奖励不存在，1：成功，2：不可领取，3：重复领取
    */
    Model_HuoDOnly.prototype.GC_YBFL_LQ_8332 = function (s, d) {
        var sys = d.readInt();
        var id = d.readInt();
        var st = d.readByte();
        if (st == 1) {
            var arr = s._ybaoDta[sys];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    arr[i].status = 2;
                    break;
                }
            }
            s._ybaoDta[sys].sort(Model_HuoDong.sortFuc);
            GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_YBFL);
            GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_YBFL, sys - 1, Model_HuoDong.isVoNotice(s._ybaoDta[sys]));
            GGlobal.reddot.notify(UIConst.HUOD_ONLY);
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
    //更新元宝返利配置表 [I:索引idI:期数[B:道具类型I:道具idI:道具数量][B:道具类型I:道具idI:道具数量]]元宝返利数据
    Model_HuoDOnly.prototype.GC_YBFL_CFG_8334 = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = {
                id: data.readInt(),
                qs: data.readInt(),
                xh: [],
                reward: []
            };
            var size = data.readShort();
            for (var j = 0; j < size; j++) {
                var itm = [data.readByte(), data.readInt(), data.readInt()];
                v.xh.push(itm);
            }
            size = data.readShort();
            for (var j = 0; j < size; j++) {
                var itm = [data.readByte(), data.readInt(), data.readInt()];
                v.reward.push(itm);
            }
            Config.zshdybfl_315[v.id] = v;
        }
    };
    Model_HuoDOnly.getDBFanLi = function (sys) {
        return Model_HuoDOnly._dBFanLiDt[sys] ? Model_HuoDOnly._dBFanLiDt[sys] : [];
    };
    /**返回界面信息 I:获得唯一id[I:奖励项B:可领取次数B:剩余次数]奖励状态数据 */
    Model_HuoDOnly.prototype.GCDBFanLi_UI8360 = function (self, bytes) {
        var sys = bytes.readInt();
        var length = bytes.readShort();
        var arr = [];
        for (var i = 0; i < length; i++) {
            var vo = new Vo_HuoDong();
            vo.readMsgCt(bytes);
            arr.push(vo);
        }
        Model_HuoDOnly._dBFanLiDt[sys] = arr;
        GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_DBFANLI);
        GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_DBFanLi, sys - 1, self.noticeDBFL(sys));
        GGlobal.reddot.notify(UIConst.HUOD_ONLY);
    };
    /**领取奖励 I:活动唯一idI:奖励项id */
    Model_HuoDOnly.prototype.CGDBFanLi_Get8361 = function (sys, type) {
        var bytes = this.getBytes();
        bytes.writeInt(sys);
        bytes.writeInt(type);
        this.sendSocket(8361, bytes);
    };
    /**领取奖励结果 I:活动唯一idB:结果：0：失败，1：成功I:失败：（1：没领取次数），成功：奖励项idB:可领取次数B:剩余次数 */
    Model_HuoDOnly.prototype.GCDBFanLi_Get8362 = function (self, bytes) {
        var sys = bytes.readInt();
        //领取奖励结果 B:结果：0：失败，1：成功I:失败：（1：没领取次数），成功：奖励项idB:可领取次数B:剩余次数
        var result = bytes.readByte(); //领取结果
        var v = new Vo_HuoDong();
        v.readMsgCt(bytes);
        if (result == 0) {
            ViewCommonWarn.text("领取失败");
            return;
        }
        if (v.id != 0) {
            var arr = Model_HuoDOnly._dBFanLiDt[sys];
            if (arr == null) {
                Model_HuoDOnly._dBFanLiDt[sys] = [];
                Model_HuoDOnly._dBFanLiDt[sys].push(v);
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id == v.id) {
                        arr[i].canCt = v.canCt;
                        arr[i].hasCt = v.hasCt;
                        break;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.HUOD_ONLY_DBFANLI);
            GGlobal.reddot.setCondition(UIConst.HUOD_ONLY_DBFanLi, sys - 1, self.noticeDBFL(sys));
            GGlobal.reddot.notify(UIConst.HUOD_ONLY);
        }
    };
    //更新单笔返利配置表 [I:序号I:期数I:金额[B:道具类型I:道具idI:道具数量]I:领取次数]单笔返利数据
    Model_HuoDOnly.prototype.GCDBFanLi_CFG8364 = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = {
                xh: data.readInt(),
                qs: data.readInt(),
                je: data.readInt(),
                jl: [],
                cs: 0
            };
            var size = data.readShort();
            for (var j = 0; j < size; j++) {
                var itm = [data.readByte(), data.readInt(), data.readInt()];
                v.jl.push(itm);
            }
            v.cs = data.readInt();
            Config.zshddbfl_315[v.xh] = v;
        }
    };
    /**获取单笔返利红点状态 */
    Model_HuoDOnly.prototype.noticeDBFL = function (sys) {
        var temp = Model_HuoDOnly._dBFanLiDt[sys];
        if (temp) {
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].canCt > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    Model_HuoDOnly.skipShow = false; //ture 不打开
    Model_HuoDOnly.ON_OFF = false; //true开启，false关闭
    Model_HuoDOnly.add_del_hd = "add_del_hd"; //true开启，false关闭
    Model_HuoDOnly.originalDatas = {};
    //单笔充值
    Model_HuoDOnly._daiOneArr = {};
    Model_HuoDOnly._shopArr = {};
    //=================累计充值
    //累计充值
    Model_HuoDOnly._addRecharge = {};
    Model_HuoDOnly._addRechargeArr = {};
    //=================单笔返利
    /**单笔返利数据 */
    Model_HuoDOnly._dBFanLiDt = {};
    return Model_HuoDOnly;
}(BaseModel));
__reflect(Model_HuoDOnly.prototype, "Model_HuoDOnly");
