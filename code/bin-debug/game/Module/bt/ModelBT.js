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
var ModelBT = (function (_super) {
    __extends(ModelBT, _super);
    function ModelBT() {
        var _this = _super.call(this) || this;
        //超值礼包数据
        _this.czhb_data = {};
        _this.czhb_lib_week = [];
        _this.czhb_lib_mouth = [];
        //万元红包数据
        _this.wyhb_data_lvl = [];
        _this.wyhb_lib_lvl = [];
        _this.totalLvReMoney = 0; //总等级返利
        _this.hasGetLvMoney = 0; //当前领取的等级返利
        _this.wyhb_data_yb = [];
        _this.wyhb_lib_yb = [];
        _this.totalReMoney = 0; //总充值返利
        _this.hasGetMoney = 0; //当前领取的充值返利
        _this.lastTypeCZLB = 1;
        return _this;
    }
    ModelBT.prototype.initCZHBLib = function (qs, type) {
        var self = this;
        var temp = [];
        var lib = Config.czlb_781;
        for (var i in lib) {
            var item = lib[i];
            if (item.qs == qs) {
                if (item.type == type) {
                    temp.push(item);
                }
            }
        }
        if (type == 1) {
            self.czhb_lib_week = temp;
        }
        else {
            self.czhb_lib_mouth = temp;
        }
    };
    ModelBT.prototype.initHB = function () {
        var self = this;
        if (self.wyhb_lib_lvl.length) {
            return;
        }
        self.wyhb_lib_lvl = [];
        self.wyhb_lib_yb = [];
        self.totalReMoney = 0;
        self.totalLvReMoney = 0;
        var lib = Config.wyhb_780;
        for (var i in lib) {
            var item = lib[i];
            if (item.type == 1) {
                self.totalLvReMoney += item.show;
                self.wyhb_lib_lvl.push(item);
            }
            else {
                self.totalReMoney += item.show;
                self.wyhb_lib_yb.push(item);
            }
        }
    };
    ModelBT.prototype.checkWYNotice = function () {
        var self = this;
        var notice0 = false;
        var data = self.wyhb_lib_lvl;
        var mylvl = Model_player.voMine.level;
        var vipexp = ModelBT.realRechargeValue;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (self.wyhb_data_lvl.indexOf(item.id) == -1) {
                if (item.limit <= mylvl) {
                    notice0 = true;
                    break;
                }
            }
        }
        var notice1 = false;
        data = self.wyhb_lib_yb;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (self.wyhb_data_yb.indexOf(item.id) == -1) {
                if (item.limit <= vipexp) {
                    notice1 = true;
                    break;
                }
            }
        }
        GGlobal.reddot.setCondition(UIConst.WYHB_BT, 0, notice1 || notice0);
        GGlobal.reddot.setCondition(UIConst.WYHB_BT, 1, notice0);
        GGlobal.reddot.setCondition(UIConst.WYHB_BT, 2, notice1);
        GGlobal.reddot.notifyMsg(UIConst.WYHB_BT);
    };
    ModelBT.prototype.cacualWYHB = function () {
        var self = this;
        self.hasGetMoney = 0;
        self.hasGetLvMoney = 0;
        for (var i = 0; i < self.wyhb_data_lvl.length; i++) {
            var item = Config.wyhb_780[self.wyhb_data_lvl[i]];
            self.hasGetLvMoney += item.show;
        }
        for (var i = 0; i < self.wyhb_data_yb.length; i++) {
            var item = Config.wyhb_780[self.wyhb_data_yb[i]];
            self.hasGetMoney += item.show;
        }
    };
    ModelBT.prototype.sortWYHB = function () {
        var self = this;
        self.wyhb_lib_lvl.sort(function (a, b) {
            var aweight = a.id;
            var bweight = b.id;
            if (self.wyhb_data_lvl.indexOf(a.id) != -1) {
                aweight += 100000;
            }
            if (self.wyhb_data_lvl.indexOf(b.id) != -1) {
                bweight += 100000;
            }
            return aweight < bweight ? -1 : 1;
        });
        self.wyhb_lib_yb.sort(function (a, b) {
            var aweight = a.id;
            var bweight = b.id;
            if (self.wyhb_data_yb.indexOf(a.id) != -1) {
                aweight += 100000;
            }
            if (self.wyhb_data_yb.indexOf(b.id) != -1) {
                bweight += 100000;
            }
            return aweight < bweight ? -1 : 1;
        });
    };
    ModelBT.prototype.listenServ = function (sc) {
        var self = this;
        self.socket = sc;
        sc.regHand(20100, self.GC_open_20100, self);
        //超值礼包-BT
        sc.regHand(20002, self.GC_open_20002, self);
        sc.regHand(20004, self.GC_get_20004, self);
        //万元红包-BT
        sc.regHand(20012, self.GC_open_20012, self);
        sc.regHand(20014, self.GC_get_20014, self);
    };
    /**增加活动图标  1开启 2关闭*/
    ModelBT.prototype.GC_open_20100 = function (s, d) {
        var id = d.readInt();
        var state = d.readByte();
        if (state == 2) {
            GGlobal.mainUICtr.addIcon(id, true);
        }
        else {
            GGlobal.mainUICtr.removeIcon(id);
        }
    };
    /**打开超值礼包 B:(类型1=周礼包 2=月礼包)*/
    ModelBT.prototype.CG_open_20001 = function (type) {
        if (type === void 0) { type = 1; }
        var ba = this.getBytes();
        this.lastTypeCZLB = type;
        ba.writeByte(type);
        this.sendSocket(20001, ba);
    };
    /**打开界面返回 [I(id),I(剩余购买次数)]*/
    ModelBT.prototype.GC_open_20002 = function (s, d) {
        var qs = d.readByte();
        var type = d.readByte();
        var len = d.readShort();
        for (var i = 0; i < len; i++) {
            s.czhb_data[d.readInt()] = d.readInt();
        }
        s.initCZHBLib(qs, type);
        DEBUGWARING.log("超值红包打开数据：" + s.czhb_data);
        s.notifyGlobal(UIConst.CZLB_BT);
    };
    /**购买成功返回*/
    ModelBT.prototype.GC_get_20004 = function (s, d) {
        var id = d.readInt();
        var lib = Config.czlb_781[id];
        var rewardList = ConfigHelp.makeItemListArr(lib.reward);
        View_BoxReward_Show.show(rewardList, "恭喜您购买" + lib.name + "成功");
        s.CG_open_20001(s.lastTypeCZLB);
    };
    /**打开万元红包 B:(类型1=等级红包 2=充值红包)*/
    ModelBT.prototype.CG_open_20011 = function (type) {
        if (type === void 0) { type = 1; }
        var ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(20011, ba);
    };
    /**打开万元红包 B(类型1=等级红包 2=充值红包)-[S(当前已经领取过的ID)] */
    ModelBT.prototype.GC_open_20012 = function (s, d) {
        var type = d.readByte();
        ModelBT.realRechargeValue = d.readInt();
        var len = d.readShort();
        var temp = [];
        var isLv = type == 1;
        for (var i = 0; i < len; i++) {
            temp.push(d.readShort());
        }
        if (isLv) {
            s.wyhb_data_lvl = temp;
        }
        else {
            s.wyhb_data_yb = temp;
        }
        s.sortWYHB();
        s.cacualWYHB();
        s.checkWYNotice();
        DEBUGWARING.log("万元等级红包数据：" + s.wyhb_data_lvl);
        DEBUGWARING.log("万元充值红包打开数据：" + s.wyhb_data_yb);
        s.notifyGlobal(UIConst.WYHB_BT);
    };
    /**领取万元红包 B:(类型1=等级红包 2=充值红包)*/
    ModelBT.prototype.CG_get_20013 = function (id) {
        if (id === void 0) { id = 1; }
        var ba = this.getBytes();
        ba.writeShort(id);
        this.lastid = id;
        this.sendSocket(20013, ba);
    };
    /**领取奖励 B:领取结果：1成功 2未达条件 3已领取*/
    ModelBT.prototype.GC_get_20014 = function (s, d) {
        var ret = d.readByte();
        if (ret == 1) {
            s.warn("领取成功");
            var item = Config.wyhb_780[s.lastid];
            if (item.type == 1) {
                s.wyhb_data_lvl.push(s.lastid);
            }
            else {
                s.wyhb_data_yb.push(s.lastid);
            }
            var lib = Config.wyhb_780[s.lastid];
            var vogrid = ConfigHelp.makeItemListArr(lib.reward);
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, vogrid);
            s.sortWYHB();
            s.cacualWYHB();
            s.checkWYNotice();
            s.notifyGlobal(UIConst.WYHB_BT);
        }
        else if (ret == 0) {
            s.warn("奖励不存在");
        }
        else if (ret == 1) {
            s.warn("未达条件");
        }
        else if (ret == 3) {
            s.warn("不能重复领取");
        }
    };
    //真实充值金额
    ModelBT.realRechargeValue = 0;
    return ModelBT;
}(BaseModel));
__reflect(ModelBT.prototype, "ModelBT");
