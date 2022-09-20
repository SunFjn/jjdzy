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
var Model_BingFa = (function (_super) {
    __extends(Model_BingFa, _super);
    function Model_BingFa() {
        var _this = _super.call(this) || this;
        _this.drugCount = 0;
        _this._drugID = 0;
        return _this;
    }
    Object.defineProperty(Model_BingFa.prototype, "suitData", {
        get: function () {
            if (!this._suitData) {
                this._suitData = [];
                var vo = void 0;
                var lib = Config.booksuit_212;
                for (var i = 1; i < 4; i++) {
                    vo = new VoBingFaSuit();
                    vo.id = i * 1000;
                    vo.initLib();
                    this._suitData.push(vo);
                }
            }
            return this._suitData;
        },
        enumerable: true,
        configurable: true
    });
    Model_BingFa.prototype.getSuitDataByID = function (id) {
        var type = (id / 1000) >> 0;
        var vo;
        var data = this.suitData;
        for (var i in data) {
            vo = data[i];
            if (vo.type == type) {
                return vo;
            }
        }
        return null;
    };
    Model_BingFa.prototype.initData = function () {
        if (!this.data) {
            this.mapObj = {};
            this.data = [];
            var vo = void 0;
            var lib = Config.book_213;
            for (var i in lib) {
                vo = new VoBingFa();
                vo.lib = lib[i];
                vo.initLib();
                this.mapObj[i + ""] = vo;
                this.data.push(vo);
            }
        }
        return this.data;
    };
    Object.defineProperty(Model_BingFa.prototype, "drugID", {
        get: function () {
            if (this._drugID == 0) {
                var lib = Config.drug_200[6];
                this._drugID = lib['id'];
            }
            return this._drugID;
        },
        enumerable: true,
        configurable: true
    });
    Model_BingFa.prototype.getDrugCount = function () {
        var ret = 0;
        var vo;
        for (var i in this.data) {
            vo = this.data[i];
            ret += vo.drugCount;
        }
        return ret;
    };
    Model_BingFa.prototype.sortVO = function () {
        var vo;
        for (var i in this.data) {
            vo = this.data[i];
            if (vo.star > 0) {
                vo.sortIndex = vo.id + 1000000;
            }
            else if (vo.canActivate()) {
                vo.sortIndex = vo.id + 10000000;
            }
            else {
                vo.sortIndex = vo.id;
            }
        }
        this.data = this.data.sort(function (a, b) {
            if ((a.star > 0 && b.star > 0) || (a.canActivate() && a.star <= 0 && b.canActivate() && b.star <= 0)) {
                if (a.pin == b.pin) {
                    return b.sortIndex - a.sortIndex;
                }
                else {
                    return b.pin - a.pin;
                }
            }
            else if ((!a.canActivate() && a.star <= 0 && !b.canActivate() && b.star <= 0)) {
                if (a.pin == b.pin) {
                    return b.sortIndex - a.sortIndex;
                }
                else {
                    return a.pin - b.pin;
                }
            }
            else {
                return b.sortIndex - a.sortIndex;
            }
        });
    };
    Model_BingFa.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(900, this.GC_INFO_900, this);
        mgr.regHand(904, this.GC_ACTIVE_904, this);
        mgr.regHand(906, this.GC_ACTIVESUIT_906, this);
        mgr.regHand(908, this.GC_DRUG_908, this);
    };
    /**
     * 900
     * [I-I]-[I]-I
     * GC 获取兵法返回 [I:兵法idI:兵法星级]已经激活兵法[I:已经激活套装id]I:兵法属性丹数量
    */
    Model_BingFa.prototype.GC_INFO_900 = function (self, data) {
        self.initData();
        var l = data.readShort();
        var id;
        var star;
        var vo;
        for (var i = 0; i < l; i++) {
            id = data.readInt();
            star = data.readInt();
            vo = self.mapObj[id + ""];
            vo.star = star;
            vo.update();
        }
        var items = [];
        l = data.readShort();
        for (i = 0; i < l; i++) {
            id = data.readInt();
            var suit = self.getSuitDataByID(id);
            suit.id = id;
            suit.update();
        }
        self.sortVO();
        self.drugCount = data.readInt();
        self.notify(Model_BingFa.OPENUI);
    };
    /**
     * 901
     * 获取兵法返回
    */
    Model_BingFa.prototype.CG_INFO_901 = function () {
        var b = this.getBytes();
        this.socket.sendCMDBytes(901, b);
    };
    /**
     * 903
     * i
     * CG 激活/升阶兵法 I:兵法id
    */
    Model_BingFa.prototype.CG_ACTIVE_903 = function (id) {
        var b = this.getBytes();
        b.writeInt(id);
        this.socket.sendCMDBytes(903, b);
    };
    /**
     * 904
     * B-I-I
     * GC 激活/升级兵法返回 B:0成功 1失败I:兵法idI:兵法星级
    */
    Model_BingFa.prototype.GC_ACTIVE_904 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            var id = data.readInt();
            var star = data.readInt();
            var vo = self.mapObj[id + ""];
            vo.star = star;
            vo.update();
            self.sortVO();
            if (star >= vo.starMax) {
                GGlobal.control.notify(UIConst.JUEXING);
            }
            self.notify(Model_BingFa.LVLUP, star);
        }
        else {
            ViewCommonWarn.text("缺少道具");
        }
    };
    /**
     * 905
     * B
     * CG 激活/升阶兵法套装 B:套装索引 1/2/3
    */
    Model_BingFa.prototype.CG_ACTIVESUIT_905 = function (id) {
        var b = this.getBytes();
        b.writeByte(id);
        this.socket.sendCMDBytes(905, b);
    };
    /**
     * 906
     * B-B-I
     * GC 激活/升阶某个兵法套装返回 B:0成功 1失败B:兵法套装 1/2/3I:兵法套装id
    */
    Model_BingFa.prototype.GC_ACTIVESUIT_906 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            var index = data.readByte();
            var id = data.readInt();
            var suit = self.getSuitDataByID(id);
            suit.id = id;
            suit.update();
            self.notify(Model_BingFa.SUIT_ACTIVE);
        }
        else {
            ViewCommonWarn.text("缺少道具");
        }
    };
    /**
    * 907
     * B
     * CG 使用丹药 B:使用方式 0 1颗 1一键
    */
    Model_BingFa.prototype.CG_DRUG_907 = function (type) {
        var b = this.getBytes();
        b.writeByte(type);
        this.socket.sendCMDBytes(907, b);
    };
    /**
     * 908
     * B-I
     * GC 使用丹药返回 B:0使用成功 1失败I:兵法属性丹数量
    */
    Model_BingFa.prototype.GC_DRUG_908 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            self.drugCount = data.readInt();
            self.notify(Model_BingFa.DRUG_UP);
        }
        else {
            ViewCommonWarn.text("使用失败");
        }
    };
    //	获取可以穿的武将装备
    Model_BingFa.bingFaWearArr = function () {
        var arr = Model_Bag.filterEquips(Model_Bag.filterBingFaEquip, null);
        var d = Model_player.voMine.equipData;
        var sendArr = {};
        for (var i = 0; i < arr.length; i++) {
            var equ = arr[i];
            var jieShu = Model_BySys.sysJie(Model_BySys.BING_FA);
            if (jieShu < equ.jie) {
                continue;
            }
            var ownE = d[equ.type];
            if (ownE == null && sendArr[equ.type] == null) {
                sendArr[equ.type] = equ;
            }
            else {
                var boo = true;
                if (ownE && equ.basePower <= ownE.basePower) {
                    boo = false;
                }
                if (sendArr[equ.type] && equ.basePower <= sendArr[equ.type].basePower) {
                    boo = false;
                }
                if (boo) {
                    sendArr[equ.type] = equ;
                }
            }
        }
        var a = [];
        for (var i = 80; i < 84; i++) {
            if (sendArr[i]) {
                a.push(sendArr[i]);
            }
        }
        return a;
    };
    //战甲一键升阶
    Model_BingFa.checkOneKeyUp = function () {
        var count = Model_Bag.getItemCount(Model_BingFa.DAN_LEVELUP);
        var exp = count * Model_ZhanJia.DAN_EXP;
        var jieShu = Model_BySys.sysJie(Model_BySys.BING_FA);
        var jieExp = Model_BySys.sysExp(Model_BySys.BING_FA);
        var clotheslv = Config.booklv_213[jieShu];
        if (clotheslv && clotheslv.exp > 0) {
            if (exp + jieExp >= clotheslv.exp) {
                return true;
            }
        }
        return false;
    };
    //战甲技能升级
    Model_BingFa.checkSkill = function (id) {
        var obj = Config.booklvskill_213[id];
        var jieShu = Model_BySys.sysJie(Model_BySys.BING_FA);
        if (obj.next == 0) {
            return false;
        }
        else {
            var consumeArr = ConfigHelp.SplitStr(obj.consume);
            var hasCont = Model_Bag.getItemCount(Number(consumeArr[0][1]));
            if (jieShu >= obj.lv && hasCont >= Number(consumeArr[0][2])) {
                return true;
            }
        }
        return false;
    };
    //升阶
    Model_BingFa.checkUpJie = function () {
        if (Model_BingFa.checkOneKeyUp()) {
            return true;
        }
        //技能升级
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.BING_FA);
        var len = skillArr.length;
        for (var i = 0; i < len; i++) {
            var id = skillArr[i];
            if (Model_BingFa.checkSkill(id)) {
                return true;
            }
        }
        if (Model_BingFa.bingFaWearArr().length > 0) {
            return true;
        }
        return false;
    };
    Model_BingFa.prototype.checkAndShow = function (id) {
        var arr = this.data;
        if (arr == null || arr.length == 0)
            return;
        for (var i = 0, len = arr.length; i < len; i++) {
            var vo = arr[i];
            if (!vo.star) {
                var costArr = vo.item;
                if (costArr[0][1] == id) {
                    VTipBWJiHuo.add(vo);
                    break;
                }
            }
        }
    };
    /**通过激活材料(升星材料)判断使用该材料的兵法是否已经满星 */
    Model_BingFa.isFullByMat = function (vo) {
        if (this.matToBingFa[vo.id]) {
            var data = this.matToBingFa[vo.id];
            return data.star >= data.starMax;
        }
        else {
            var datas = GGlobal.modelBingFa.data;
            for (var i = 0; datas && i < datas.length; i++) {
                var data = datas[i];
                var id = Number(data.item[0][1]);
                this.matToBingFa[id] = data;
                if (id == vo.id) {
                    return data.star >= data.starMax;
                }
            }
        }
        return false;
    };
    Model_BingFa.OPENUI = "pu";
    Model_BingFa.LVLUP = "lv"; //升级/激活
    Model_BingFa.SUIT_ACTIVE = "sv"; //激活套装
    Model_BingFa.DRUG_UP = "drug"; //属性丹更细
    Model_BingFa.DAN_LEVELUP = 411004; //兵法培养丹
    /**材料到兵法的映射 */
    Model_BingFa.matToBingFa = {};
    return Model_BingFa;
}(BaseModel));
__reflect(Model_BingFa.prototype, "Model_BingFa");
