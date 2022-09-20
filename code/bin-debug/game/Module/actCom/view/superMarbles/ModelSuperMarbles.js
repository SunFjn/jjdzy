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
var ModelSuperMarbles = (function (_super) {
    __extends(ModelSuperMarbles, _super);
    function ModelSuperMarbles() {
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.shopdata = {};
        _this.shotTime = 0;
        _this.closeNum = 0;
        _this._lastQS = 0;
        return _this;
    }
    ModelSuperMarbles.prototype.createCfg = function () {
        var self = this;
        if (self._lastQS != self.newQS || !self._cfg || !self._shopcfg) {
            var lib = Config.cjdz_502;
            self._cfg = [];
            for (var i in lib) {
                var item = lib[i];
                if (item.qs == self.newQS) {
                    self._cfg.push(item);
                }
            }
            var lib1 = Config.cjdzstore_502;
            self._shopcfg = [];
            for (var i in lib1) {
                var item1 = lib1[i];
                if (item1.qs == self.newQS) {
                    self._shopcfg.push(item1);
                }
            }
        }
        self._lastQS = self.newQS;
    };
    Object.defineProperty(ModelSuperMarbles.prototype, "cfg", {
        get: function () {
            var self = this;
            return self._cfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelSuperMarbles.prototype, "shopcfg", {
        get: function () {
            var self = this;
            return self._shopcfg;
        },
        enumerable: true,
        configurable: true
    });
    ModelSuperMarbles.prototype.listenServ = function (wsm) {
        var self = this;
        self.socket = wsm;
        wsm.regHand(11730, self.GC_openui, self);
        wsm.regHand(11732, self.GC_optAwards, self);
        wsm.regHand(11734, self.GC_reOptAwards, self);
        wsm.regHand(11736, self.GC_reset, self);
        wsm.regHand(11738, self.GC_shopdata, self);
        wsm.regHand(11740, self.GC_buy, self);
    };
    /**返回界面信息 I:当前已发射次数[B:位置序号B:道具类型I:道具idI:道具数量B:是否屏蔽（1是，0否）]奖池数据*/
    ModelSuperMarbles.prototype.GC_openui = function (self, data) {
        self.shotTime = data.readInt();
        self.pools = [];
        self.closeNum = 0;
        for (var i = data.readShort(); i > 0; i--) {
            var obj = {};
            obj.idx = data.readByte();
            obj.type = data.readByte();
            obj.id = data.readInt();
            obj.count = data.readInt();
            obj.isclose = data.readByte();
            if (obj.isclose) {
                self.closeNum++;
            }
            self.pools.push(obj);
        }
        self.score = data.readLong();
        self.pools.sort(function (a, b) { return a.idx < b.idx ? -1 : 1; });
        self.notifyGlobal(UIConst.ACTCOMCJDZ);
    };
    ModelSuperMarbles.prototype.CG_optAwards = function (pos, opt) {
        var byte = this.getBytes();
        byte.writeByte(opt);
        byte.writeByte(pos);
        this.sendSocket(11731, byte);
    };
    /**屏蔽操作结果 B:结果：（0：失败，1：成功）B:失败：（1：位置已屏蔽，2：位置未被屏蔽不用解除屏蔽），成功：操作类型B:操作位置*/
    ModelSuperMarbles.prototype.GC_optAwards = function (self, data) {
        var ret = data.readByte();
        var retType = data.readByte();
        var idx = data.readByte();
        if (ret == 1) {
            for (var i = self.pools.length; i > 0; i--) {
                var obj = self.pools[i - 1];
                if (obj.idx == idx) {
                    obj.isclose = obj.isclose ? 0 : 1;
                    if (obj.isclose) {
                        self.closeNum++;
                    }
                    else {
                        self.closeNum--;
                    }
                    break;
                }
            }
        }
        else {
            if (retType == 1) {
                self.warn("位置已屏蔽");
            }
            else if (retType == 2) {
                self.warn("位置未被屏蔽不用解除屏蔽");
            }
        }
        self.notifyGlobal(UIConst.ACTCOMCJDZ);
    };
    ModelSuperMarbles.prototype.CG_reOptAwards = function (opt) {
        var byte = this.getBytes();
        byte.writeByte(opt);
        this.sendSocket(11733, byte);
    };
    /**B:抽奖结果：0：失败，1：成功I:失败：（1：不能发射5次，2：元宝不足），成功：已发射次数[B:位置序号B:道具类型I:道具idI:道具数量]奖励数据*/
    ModelSuperMarbles.prototype.GC_reOptAwards = function (self, data) {
        var ret = data.readByte();
        var retType = data.readInt();
        self.score = data.readLong();
        if (ret == 1) {
            self.shotTime = retType;
            var awards = [];
            var vos = [];
            for (var i = data.readShort(); i > 0; i--) {
                var obj = {};
                obj.idx = data.readByte();
                obj.type = data.readByte();
                obj.id = data.readInt();
                obj.count = data.readInt();
                vos.push(ConfigHelp.makeItem([obj.type, obj.id, obj.count]));
                awards.push(obj);
            }
            self.notifyGlobal(UIConst.ACTCOMCJDZ, [awards, vos]);
        }
        else {
            if (retType == 1) {
                self.warn("不能发射5次");
            }
            else if (retType == 2) {
                self.warn("元宝不足");
            }
        }
    };
    ModelSuperMarbles.prototype.CG_reset = function () {
        var byte = this.getBytes();
        this.sendSocket(11735, byte);
    };
    /**重置结果 B:结果：0：失败（元宝不足），1：成功*/
    ModelSuperMarbles.prototype.GC_reset = function (self, data) {
        var retType = data.readByte();
        if (retType == 0) {
            self.warn("元宝不足");
        }
        else if (retType == 1) {
            self.warn("重置成功");
        }
    };
    ModelSuperMarbles.prototype.CG_shopdata = function () {
        var byte = this.getBytes();
        this.sendSocket(11737, byte);
    };
    /**弹珠积分商店数据返回 L:弹珠积分[I:商品idI:已买数量]商品数据*/
    ModelSuperMarbles.prototype.GC_shopdata = function (self, data) {
        self.score = data.readLong();
        self.shopdata = {};
        for (var i = data.readShort(); i > 0; i--) {
            self.shopdata[data.readInt()] = data.readInt();
        }
        self.notifyGlobal(UIConst.ACTCOMCJDZ_SHOP);
    };
    ModelSuperMarbles.prototype.CG_buy = function (id, num) {
        var byte = this.getBytes();
        byte.writeInt(id);
        byte.writeInt(num);
        this.sendSocket(11739, byte);
    };
    /**兑换结果 B:结果：0：失败，1：成功I:失败：（1：积分不足），成功：兑换idI:已兑换数量*/
    ModelSuperMarbles.prototype.GC_buy = function (self, data) {
        var ret = data.readByte();
        if (ret == 1) {
            self.shopdata[data.readInt()] = data.readInt();
            self.notifyGlobal(UIConst.ACTCOMCJDZ_SHOP);
        }
    };
    return ModelSuperMarbles;
}(BaseModel));
__reflect(ModelSuperMarbles.prototype, "ModelSuperMarbles");
