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
var Model_TianShu = (function (_super) {
    __extends(Model_TianShu, _super);
    function Model_TianShu() {
        var _this = _super.call(this) || this;
        _this._drugID = 0; //属性丹
        /**当前的装备天书ID*/
        _this.currentID = 0;
        /**当前天书的等级*/
        _this.level = 0;
        /**当前天书的经验*/
        _this.exp = 0;
        /**天书属性丹数量*/
        _this.shuxingdan = 0;
        _this.maxLevel = 0;
        return _this;
    }
    Object.defineProperty(Model_TianShu.prototype, "drugID", {
        get: function () {
            if (this._drugID == 0) {
                var lib = Config.drug_200[8];
                this._drugID = lib['id'];
            }
            return this._drugID;
        },
        enumerable: true,
        configurable: true
    });
    Model_TianShu.prototype.getVoByID = function (id) {
        var vo;
        var data = this.data;
        var l = data.length;
        for (var i = 0; i < l; i++) {
            vo = data[i];
            if (vo.id == id)
                return vo;
        }
        return null;
    };
    Object.defineProperty(Model_TianShu.prototype, "data", {
        get: function () {
            if (!this._data) {
                this._data = [];
                var lib = Config.book_215;
                var vo;
                for (var i in lib) {
                    vo = new VoTianShu();
                    vo.id = Number(i);
                    vo.initLib();
                    this._data.push(vo);
                }
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Model_TianShu.prototype.getBookLvMax = function () {
        if (this.maxLevel != 0)
            return this.maxLevel;
        var l = Config.booklv_215;
        for (var i in l) {
            this.maxLevel++;
        }
        return this.maxLevel;
    };
    Model_TianShu.prototype.getDrugCount = function () {
        var data = this.data;
        var ret = 0;
        var vo;
        var l = data.length;
        for (var i = 0; i < l; i++) {
            vo = data[i];
            ret += vo.dragCount;
        }
        return ret;
    };
    Model_TianShu.prototype.sortData = function () {
        var vo;
        var d = this.data;
        var l = d.length;
        var s = this;
        for (var i = 0; i < l; i++) {
            vo = d[i];
            if (vo.id == s.currentID) {
                vo.sortIndex = vo.id + 900000000;
            }
            else if (vo.star > 0) {
                vo.sortIndex = vo.id + 1000000;
            }
            else if (vo.canAcitvate()) {
                vo.sortIndex = vo.id + 100000000;
            }
            else {
                vo.sortIndex = vo.id;
            }
        }
        s._data = s._data.sort(function (a, b) {
            if (s.currentID == a.id) {
                return -1;
            }
            else if (s.currentID == b.id) {
                return 1;
            }
            else if ((a.star > 0 && b.star > 0) || (a.canAcitvate() && a.star <= 0 && b.canAcitvate() && b.star <= 0)) {
                if (a.pin == b.pin) {
                    return b.sortIndex - a.sortIndex;
                }
                else {
                    return b.pin - a.pin;
                }
            }
            else if (!a.canAcitvate() && a.star <= 0 && !b.canAcitvate() && b.star <= 0) {
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
    Model_TianShu.prototype.getTianShuSkill = function () {
        if (this.currentID == 0)
            return null;
        var vo = this.getVoByID(this.currentID);
        var svo = Vo_Skill.create(vo.skillID, vo.star, vo.star);
        return svo;
    };
    Model_TianShu.prototype.getTotalStar = function () {
        var vo;
        var s = 0;
        var data = this.data;
        var l = data.length;
        for (var i = 0; i < l; i++) {
            vo = data[i];
            s += vo.star;
        }
        return s;
    };
    Model_TianShu.prototype.isTianShuJHItem = function (id) {
        return Config.daoju_204[id] && Config.daoju_204[id].sys == UIConst.TIANSHU;
    };
    Model_TianShu.prototype.checkAndShow = function (id) {
        var arr = this.data;
        for (var i = 0, len = arr.length; i < len; i++) {
            var vo = arr[i];
            if (!vo.star) {
                var costArr = JSON.parse(vo.item);
                if (costArr[0][1] == id) {
                    // GGlobal.layerMgr.open(UIConst.BAOWU_GETTIPS, vo);
                    VTipBWJiHuo.add(vo);
                    break;
                }
            }
        }
    };
    Model_TianShu.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(972, this.GC_OPENUI_972, this);
        mgr.regHand(974, this.GC_CHANGETIANSHU_974, this);
        mgr.regHand(976, this.GC_LEVELUP_976, this);
        mgr.regHand(978, this.GC_STARUP_978, this);
        mgr.regHand(980, this.GC_TUNSHI_980, this);
    };
    /**
     * 971
     * CG 打开天书UI
    */
    Model_TianShu.prototype.CG_OPENUI_971 = function () {
        var ba = this.getBytes();
        this.sendSocket(971, ba);
    };
    /**
     * 972
     * GC 打开天书Ui返回 I:当前携带天书id 0没有I:天书等级I:天书经验[I:天书idI:天书星级]I:天书属性丹数量
    */
    Model_TianShu.prototype.GC_OPENUI_972 = function (self, data) {
        self.currentID = data.readInt();
        self.level = data.readInt();
        self.exp = data.readInt();
        var l = data.readShort();
        var vo;
        for (var i = 0; i < l; i++) {
            vo = self.getVoByID(data.readInt());
            vo.star = data.readInt();
            vo.initLib();
        }
        self.sortData();
        self.shuxingdan = data.readInt();
        GGlobal.control.notify(Enum_MsgType.MSG_TS_UPDATE);
        GGlobal.control.notify(Enum_MsgType.MSG_TS_WAEAR);
    };
    /**
    * 973
    * CG 切换携带天书 I:天书id
    */
    Model_TianShu.prototype.CG_CHANGETIANSHU_973 = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(973, ba);
    };
    /**
     * 974
     * 	GC 切换携带天书 I:当前携带天书id
    */
    Model_TianShu.prototype.GC_CHANGETIANSHU_974 = function (self, data) {
        self.currentID = data.readInt();
        self.sortData();
        GGlobal.control.notify(Enum_MsgType.MSG_TS_WAEAR);
    };
    /**
     * 975
     * CG 升级天书 B:升级方式 0 1颗 1一键
    */
    Model_TianShu.prototype.CG_LEVELUP_975 = function (type) {
        var ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(975, ba);
    };
    /**
     * 976
     * GC 升级返回 B:0成功 1失败I:经验I:等级
    */
    Model_TianShu.prototype.GC_LEVELUP_976 = function (self, data) {
        var ret = data.readByte();
        VZhiShengDan.invalNum = 2;
        if (ret == 1)
            ViewCommonWarn.text("升级失败");
        else {
            var exp = data.readInt();
            var lv = data.readInt();
            self.exp = exp;
            self.level = lv;
            GGlobal.control.notify(Enum_MsgType.MSG_TS_LEVELUP);
        }
    };
    /**
     * 977
     * CG 激活/升阶天书星级 I:天书id
    */
    Model_TianShu.prototype.CG_STARUP_977 = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(977, ba);
    };
    /**
     * 978
     * 	GC 升星返回 B:0成功1失败I:天书idI:星级
    */
    Model_TianShu.prototype.GC_STARUP_978 = function (self, data) {
        var ret = data.readByte();
        if (ret == 1)
            ViewCommonWarn.text("升星失败");
        else {
            var id = data.readInt();
            var star = data.readInt();
            var vo = self.getVoByID(id);
            vo.star = star;
            vo.updatePower();
            self.sortData();
            if (vo.star >= vo.starMax) {
                GGlobal.control.notify(UIConst.JUEXING);
            }
            GGlobal.control.notify(Enum_MsgType.MSG_TS_STAR);
        }
    };
    /**
     * 979
     * CG 使用丹药 B:0 1颗 1一键
    */
    Model_TianShu.prototype.CG_TUNSHI_979 = function (type) {
        var ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(979, ba);
    };
    /**
     * 980
     * 	GC 使用天书属性丹返回 B:0成功 1失败I:属性丹数量
    */
    Model_TianShu.prototype.GC_TUNSHI_980 = function (self, data) {
        var ret = data.readByte();
        if (ret == 1)
            ViewCommonWarn.text("使用失败");
        else {
            self.shuxingdan = data.readInt();
            GGlobal.control.notify(Enum_MsgType.MSG_TS_DRUG);
        }
    };
    //一键升阶
    Model_TianShu.checkOneKeyUp = function () {
        var jieShu = GGlobal.modeltianshu.level;
        var jieExp = GGlobal.modeltianshu.exp;
        var count = Model_Bag.getItemCount(Model_TianShu.DAN_LEVELUP);
        var exp = count * Model_TianShu.DAN_EXP;
        var clotheslv = Config.booklv_215[jieShu];
        if (clotheslv && clotheslv.exp > 0) {
            if (exp + jieExp >= clotheslv.exp) {
                return true;
            }
        }
        return false;
    };
    //	获取可以穿的武将装备
    Model_TianShu.tianShuWearArr = function () {
        var arr = Model_Bag.filterEquips(Model_Bag.filterTianShuEquip, null);
        var d = Model_player.voMine.equipData;
        var sendArr = {};
        for (var i = 0; i < arr.length; i++) {
            var equ = arr[i];
            var jieShu = GGlobal.modeltianshu.level;
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
        for (var i = 100; i < 104; i++) {
            if (sendArr[i]) {
                a.push(sendArr[i]);
            }
        }
        return a;
    };
    //技能升级
    Model_TianShu.checkSkill = function (id) {
        var obj = Config.booklvskill_215[id];
        var jieShu = GGlobal.modeltianshu.level;
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
    Model_TianShu.checkUpJie = function () {
        if (Model_TianShu.checkOneKeyUp()) {
            return true;
        }
        //技能升级
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.TIAN_SHU);
        var len = skillArr.length;
        for (var i = 0; i < len; i++) {
            var id = skillArr[i];
            if (Model_TianShu.checkSkill(id)) {
                return true;
            }
        }
        if (Model_TianShu.tianShuWearArr().length > 0) {
            return true;
        }
        return false;
    };
    /**通过激活材料(升星材料)判断使用该材料的天书是否已经满星 */
    Model_TianShu.isFullByMat = function (vo) {
        if (this.matToTianShu[vo.id]) {
            var data = this.matToTianShu[vo.id];
            return data.star >= data.starMax;
        }
        else {
            var datas = GGlobal.modeltianshu.data;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var costArr = JSON.parse(data.item);
                if (costArr) {
                    var id = Number(costArr[0][1]);
                    this.matToTianShu[id] = data;
                    if (id == vo.id) {
                        return data.star >= data.starMax;
                    }
                }
            }
        }
        return false;
    };
    Model_TianShu.peiyangdan = 411008; //资质丹
    /**天书培养丹*/
    Model_TianShu.DAN_LEVELUP = 411008;
    Model_TianShu.DAN_EXP = 10;
    /**材料到天书的映射 */
    Model_TianShu.matToTianShu = {};
    return Model_TianShu;
}(BaseModel));
__reflect(Model_TianShu.prototype, "Model_TianShu");
