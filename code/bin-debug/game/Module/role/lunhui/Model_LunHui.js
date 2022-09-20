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
var Model_LunHui = (function (_super) {
    __extends(Model_LunHui, _super);
    function Model_LunHui() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tmArr = [];
        _this.suitArr = [];
        _this.power = 0; //总战力
        _this.equipArr = {}; //位置key
        _this.index = 0;
        _this._openUITime = false;
        return _this;
    }
    Model_LunHui.checkLunHuiNotice = function () {
        var ret = false;
        var cfg = Config.lunhui_274[Model_player.voMine.reincarnationLevel];
        if (cfg.conmuse == "0")
            return ret;
        var costArr = JSON.parse(cfg.conmuse);
        var itemVo = VoItem.create(costArr[0][1]);
        var count = Model_Bag.getItemCount(costArr[0][1]);
        if (cfg && cfg.lv > 0 && Model_player.voMine.level >= cfg.lv && count >= costArr[0][2]) {
            ret = true;
        }
        return ret;
    };
    /**六道红点 */
    Model_LunHui.checkSWNotice = function () {
        var ret = false;
        var rdt = GGlobal.reddot;
        for (var i = 0; i < 6; i++) {
            var bol = rdt.checkCondition(UIConst.SIXWAY, i);
            if (bol) {
                return true;
            }
        }
        return ret;
    };
    /**六道红点全部索引 */
    Model_LunHui.checkSWNoticeAll = function () {
        for (var i = 0; i < 6; i++) {
            Model_LunHui.checkSWNoticeByIndex(i + 1);
        }
        var rdt = GGlobal.reddot;
        rdt.notifyMsg(UIConst.ROLE);
        rdt.notifyMsg(UIConst.SIXWAY);
    };
    /**六道红点(某个索引) */
    Model_LunHui.checkSWNoticeByIndex = function (type) {
        var ret = Model_LunHui.checkEquip(type);
        var rdt = GGlobal.reddot;
        rdt.setCondition(UIConst.SIXWAY, type - 1, ret);
        // rdt.notifyMsg(UIConst.ROLE);
        // rdt.notifyMsg(UIConst.SIXWAY);
    };
    /**7101  进行轮回 */
    Model_LunHui.prototype.CG_LUNHUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(7101, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_LunHui.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(7102, this.GC_LUNHUI, this);
        wsm.regHand(10592, this.GC_OPENTM_10592, this);
        wsm.regHand(10594, this.GC_UPTM_10594, this);
        wsm.regHand(11902, this.GC_SIXWAY_OPENUI, this);
        wsm.regHand(11904, this.GC_OPEN_ONEWAY, this);
        wsm.regHand(11906, this.GC_USE_YINGJI, this);
        wsm.regHand(11908, this.GC_UP_LEVEL, this);
        wsm.regHand(11910, this.GC_UP_STAR, this);
        wsm.regHand(11912, this.GC_RESOLVE, this);
        wsm.regHand(11914, this.GC_ADD_YINJI, this);
        wsm.regHand(11916, this.GC_FENJIEBYTYPE, this);
        wsm.regHand(11918, this.GC_ZUHECHANGE, this);
    };
    /**7102 进行轮回返回 B:返回状态:0-成功,1-失败I:当前轮回等级  */
    Model_LunHui.prototype.GC_LUNHUI = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_player.voMine.reincarnationLevel = data.readInt();
            GGlobal.control.notify(Enum_MsgType.LUNHUI_DATA_UPDATE);
        }
    };
    Object.defineProperty(Model_LunHui, "realLv", {
        /** 轮回后的真实等级 */
        get: function () {
            var lv = Model_player.voMine.level;
            if (Model_player.voMine.reincarnationLevel > 0) {
                for (var key in Config.lunhui_274) {
                    var cfg = Config.lunhui_274[key];
                    if (Model_player.voMine.reincarnationLevel <= cfg.id) {
                        break;
                    }
                    lv += cfg.lv;
                }
            }
            return lv;
        },
        enumerable: true,
        configurable: true
    });
    /**10591  打开天命 */
    Model_LunHui.prototype.CG_OPENTM_10591 = function () {
        var ba = new BaseBytes();
        this.sendSocket(10591, ba);
    };
    /**打开界面返回 [I:天命idI:天命升级表idI:天命升品表id]天命列表  */
    Model_LunHui.prototype.GC_OPENTM_10592 = function (s, data) {
        var len = data.readShort();
        s.tmArr = [];
        for (var i = 0; i < len; i++) {
            var v = new VoTianMing();
            v.readMsg(data);
            s.tmArr.push(v);
        }
        s.checkNotice();
        // s.notify(Model_LunHui.OPENUI_TM);
    };
    /**10593  升级，升品天命 */
    Model_LunHui.prototype.CG_UPTM_10593 = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(10593, ba);
    };
    /**升级，升品返回 B:状态：1：成功，2：已达最高级，3：道具不足I: 天命升级表idI:天命升品表id  */
    Model_LunHui.prototype.GC_UPTM_10594 = function (s, data) {
        var res = data.readByte();
        var lvId = data.readInt();
        var pinId = data.readInt();
        var id = data.readInt();
        if (res == 1) {
            for (var i = 0; i < s.tmArr.length; i++) {
                var v = s.tmArr[i];
                if (v.id == id) {
                    v.lvId = lvId;
                    v.pinId = pinId;
                    v.init();
                    break;
                }
            }
            s.checkNotice();
            // s.notify(Model_LunHui.UP_TM);
        }
        else {
            ViewCommonWarn.text(["已达最高级", "道具不足"][res - 2]);
        }
    };
    //可升级 升品
    Model_LunHui.prototype.checkVo = function (v) {
        var lh = Model_player.voMine.reincarnationLevel;
        if (lh < v.cfg.lh || v.cfgLv == null) {
            return false;
        }
        if (v.cfgLv.next == 0) {
            return false;
        }
        var consume;
        var pin = Config.tmlv_292[v.cfgLv.next].pin;
        if ((v.pinId % 10) >= pin) {
            consume = v.cfgLv.consume;
        }
        else {
            consume = v.cfgPin.consume;
        }
        return ConfigHelp.checkEnough(consume, false);
    };
    Model_LunHui.prototype.checkNotice = function () {
        var red = false;
        var s = this;
        for (var i = 0; i < s.tmArr.length; i++) {
            var v = s.tmArr[i];
            if (s.checkVo(v)) {
                red = true;
                break;
            }
        }
        var rdt = GGlobal.reddot;
        rdt.setCondition(UIConst.TIANMING, 0, red);
        rdt.notifyMsg(UIConst.TIANMING);
        rdt.notifyMsg(ReddotEvent.CHECK_ROLE);
    };
    /**11901  打开ui返回 */
    Model_LunHui.prototype.CG_SIXWAY_OPENUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(11901, ba);
    };
    /**11902 打开ui返回 L:总战力I:印记碎片数量[I:激活组合id][I:背包位置索引（1-300）I:印记idI:等级I:星级I:是否被锁住 0没有1有] */
    Model_LunHui.prototype.GC_SIXWAY_OPENUI = function (s, data) {
        s.power = data.readLong();
        Model_player.voMine.yinji = data.readInt();
        var len = data.readShort();
        s.suitArr = [];
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            s.suitArr.push(id);
        }
        Model_LunHui.bagArr = [];
        len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new VoSixWay();
            v.readBagMsg(data);
            Model_LunHui.pushBagEqu(v);
        }
        len = s.suitArr.length;
        for (var i = 0; i < len; i++) {
            s.CG_OPEN_ONEWAY(i + 1);
        }
        GGlobal.control.notify(UIConst.SIXWAY);
    };
    /**11903  打开某一道 B:索引 */
    Model_LunHui.prototype.CG_OPEN_ONEWAY = function (index) {
        var ba = new BaseBytes();
        ba.writeByte(index);
        this.sendSocket(11903, ba);
    };
    /**11904 打开x道返回 B:索引[I:装备位置idI:装备印记idI:等级I:星级] */
    Model_LunHui.prototype.GC_OPEN_ONEWAY = function (s, data) {
        s.index = data.readByte();
        // s.equipArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new VoSixWay();
            v.readEquipMsg(data);
            s.equipArr[v.pos] = v;
        }
        // GGlobal.control.notify(UIConst.SIXWAY_YINJI);
    };
    /**11905  使用印记 B:1.装备 2.卸下I:印记idI:该印记在背包的位置（1-300）I:要操作的装备位置 */
    Model_LunHui.prototype.CG_USE_YINGJI = function (type, id, posB, posE) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeInt(id);
        ba.writeInt(posB);
        ba.writeInt(posE);
        this.sendSocket(11905, ba);
    };
    /**11906 使用印记 B:装备/卸下结果0成功1不允许装备类型2失败B:类型I:背包索引I:身上索引 */
    Model_LunHui.prototype.GC_USE_YINGJI = function (s, data) {
        var res = data.readByte();
        var type = data.readByte();
        var posB = data.readInt();
        var posE = data.readInt();
        if (res == 0) {
            if (type == 1) {
                var vbag = Model_LunHui.bagMap[posB];
                vbag.pos = posE;
                var vEqu = s.equipArr[posE];
                if (vEqu && vEqu.id > 0) {
                    vEqu.pos = posB;
                }
                s.equipArr[posE] = vbag;
                Model_LunHui.delBagEqu(posB);
                if (vEqu && vEqu.id > 0) {
                    Model_LunHui.pushBagEqu(vEqu);
                }
            }
            else {
                var v = s.equipArr[posE];
                var copy = v.copy();
                copy.pos = posB;
                Model_LunHui.pushBagEqu(copy);
                v.clear();
            }
            GGlobal.control.notify(Model_LunHui.UP_LEVEL);
            // Model_LunHui.checkSWNoticeByIndex(s.index);
            Model_LunHui.checkSWNoticeAll();
        }
        else {
            var t = type == 1 ? "装备" : "卸下";
            ViewCommonWarn.text(t + "失败");
            if (type != 1) {
                s.freshData();
            }
        }
    };
    /**11907  升级印记 I:装备位置*/
    Model_LunHui.prototype.CG_UP_LEVEL = function (pos) {
        var ba = new BaseBytes();
        ba.writeInt(pos);
        this.sendSocket(11907, ba);
    };
    /**11908 升级装备位置上印记 B:0成功1失败I:位置索引I:印记idI:等级*/
    Model_LunHui.prototype.GC_UP_LEVEL = function (s, data) {
        var res = data.readByte();
        if (res == 0) {
            var pos = data.readInt();
            var id = data.readInt();
            var lv = data.readInt();
            var v = s.equipArr[pos];
            v.lv = lv;
            GGlobal.control.notify(Model_LunHui.UP_LEVEL);
            // Model_LunHui.checkSWNoticeByIndex(s.index);
            Model_LunHui.checkSWNoticeAll();
            ViewCommonWarn.text("升级成功");
        }
        else {
            ViewCommonWarn.text("升级失败");
        }
    };
    /**11909  升级装备印记星级 I:装备印记位置*/
    Model_LunHui.prototype.CG_UP_STAR = function (pos) {
        var ba = new BaseBytes();
        ba.writeInt(pos);
        this.sendSocket(11909, ba);
    };
    /**11910 升星返回 B:升星结果0成功1失败I:印记位置I:印记idI:印记星级I:被消耗的的印记背包位置*/
    Model_LunHui.prototype.GC_UP_STAR = function (s, data) {
        var res = data.readByte();
        if (res == 0) {
            var posE = data.readInt();
            var sid = data.readInt();
            var starLv = data.readInt();
            var v = s.equipArr[posE];
            v.star = starLv;
            //删除背包物品
            var posB = data.readInt();
            Model_LunHui.delBagEqu(posB);
            GGlobal.control.notify(Model_LunHui.UP_STAR);
            // Model_LunHui.checkSWNoticeByIndex(s.index);
            Model_LunHui.checkSWNoticeAll();
            ViewCommonWarn.text("升星成功");
        }
        else {
            ViewCommonWarn.text("升星失败");
        }
    };
    /**11911  分解背包印记 [I:位置]*/
    Model_LunHui.prototype.CG_RESOLVE = function (arr) {
        var len = arr.length;
        if (len == 0)
            return;
        var b = this.getBytes();
        b.writeShort(len);
        for (var i = 0; i < len; i++) {
            b.writeInt(arr[i]);
        }
        this.socket.sendCMDBytes(11911, b);
    };
    /**11912 分解返回 B:结果0成功1失败[I:被分解符文的背包索引]*/
    Model_LunHui.prototype.GC_RESOLVE = function (s, data) {
        var res = data.readByte();
        if (res == 0) {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var posB = data.readInt();
                Model_LunHui.delBagEqu(posB);
            }
            GGlobal.control.notify(UIConst.SIXWAY_FENJIE);
            ViewCommonWarn.text("分解成功");
        }
        else {
            ViewCommonWarn.text("分解失败");
            s.freshData();
        }
    };
    /**11914 添加印记 [I:背包位置I:印记idI:印记等级I:印记星级]I:背包剩余位置*/
    Model_LunHui.prototype.GC_ADD_YINJI = function (s, data) {
        var len = data.readShort();
        var dropArr = {};
        var arrGet = [];
        for (var i = 0; i < len; i++) {
            var v = new VoSixWay();
            v.readMsgBuy(data);
            Model_LunHui.pushBagEqu(v);
            if (dropArr[v.id]) {
                dropArr[v.id].ct++;
            }
            else {
                dropArr[v.id] = { v: v, ct: 1 };
            }
        }
        var isFull = data.readInt();
        var sf = GGlobal.reddot;
        if (isFull < 50) {
            ViewCommonWarn.text("印记背包空间不足，请前往分解");
            // sf.setCondition(UIConst.SIXWAY_FENJIE, 6, true);
            // GGlobal.control.notify(UIConst.SIXWAY);
        }
        for (var key in dropArr) {
            var v = dropArr[key].v;
            var ct = dropArr[key].ct;
            ViewBroadcastItemText.text("获得了" + v.name + "X" + ct, Color.getColorInt(v.pz), v.pz);
        }
        // if (arrGet) {
        // 	ViewCommonPrompt.textItemList(arrGet);
        // }
    };
    /**11915  分解按照类型 [B:[B:符文类型 2绿 3蓝 4紫 5橙 6红 8神]*/
    Model_LunHui.prototype.CG_FENJIEBYTYPE = function (arr) {
        var len = arr.length;
        if (len == 0)
            return;
        var b = this.getBytes();
        b.writeShort(len);
        for (var i = 0; i < len; i++) {
            b.writeByte(arr[i]);
        }
        this.socket.sendCMDBytes(11915, b);
    };
    /**11916 分解结果 B:0成功 1失败[B:类型]*/
    Model_LunHui.prototype.GC_FENJIEBYTYPE = function (s, data) {
        var st = data.readByte();
        if (st == 0) {
            var len = data.readShort();
            var fenTy = {};
            for (var i = 0; i < len; i++) {
                var type = data.readByte();
                fenTy[type] = 1;
            }
            var size = Model_LunHui.bagArr.length;
            var newArr = [];
            for (var i = 0; i < size; i++) {
                var v = Model_LunHui.bagArr[i];
                if (!fenTy[v.pz]) {
                    newArr.push(v);
                }
                else {
                    delete Model_LunHui.bagMap[v.pos];
                }
            }
            Model_LunHui.bagArr = newArr;
            GGlobal.control.notify(UIConst.SIXWAY_FENJIE);
            ViewCommonWarn.text("分解成功");
        }
        else {
            ViewCommonWarn.text("分解失败");
            s.freshData();
        }
    };
    /**11918 印记组合战力发生变化 I:总战力[I:印记组合id]*/
    Model_LunHui.prototype.GC_ZUHECHANGE = function (s, data) {
        s.power = data.readInt();
        var len = data.readShort();
        s.suitArr = [];
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            s.suitArr.push(id);
        }
        GGlobal.control.notify(Model_LunHui.UP_LEVEL);
        GGlobal.control.notify(UIConst.SIXWAY);
    };
    Model_LunHui.delBagEqu = function (posB) {
        var v = Model_LunHui.bagMap[posB];
        Model_LunHui.bagArr.splice(Model_LunHui.bagArr.indexOf(v), 1);
        delete Model_LunHui.bagMap[posB];
    };
    Model_LunHui.pushBagEqu = function (v) {
        if (Model_LunHui.bagMap[v.pos] == null) {
            Model_LunHui.bagMap[v.pos] = v;
            Model_LunHui.bagArr.push(v);
        }
        else {
            Model_LunHui.bagMap[v.pos] = v;
            var has = false;
            for (var i = 0; i < Model_LunHui.bagArr.length; i++) {
                if (Model_LunHui.bagArr[i].pos == v.pos) {
                    Model_LunHui.bagArr[i] = v;
                    has = true;
                    break;
                }
            }
            if (!has) {
                Model_LunHui.bagArr.push(v);
            }
        }
    };
    Model_LunHui.prototype.freshData = function () {
        var self = this;
        if (!self._openUITime) {
            self._openUITime = true;
            // GGlobal.modellh.GC_OPEN_ONEWAY();
            Timer.instance.callLater(function () { this._openUITime = false; }, 3000, self, 0, false, false, true);
        }
    };
    Model_LunHui.getItemCt = function (id) {
        var ct = 0;
        for (var i = 0; i < Model_LunHui.bagArr.length; i++) {
            var v = Model_LunHui.bagArr[i];
            if (v.id == id) {
                ct++;
            }
        }
        return ct;
    };
    //有同类型
    Model_LunHui.checkTypeSame = function (type) {
        var modellh = GGlobal.modellh;
        var typeArr = {};
        for (var key in modellh.equipArr) {
            var eq = modellh.equipArr[key];
            if (!eq || eq.id == 0)
                continue;
            typeArr[eq.type] = true;
        }
        if (typeArr[type])
            return true;
        return false;
    };
    /**六道升级红点 */
    Model_LunHui.canUpLevel = function (v, warn) {
        if (warn === void 0) { warn = false; }
        if (v == null)
            return false;
        if (v.id == 0)
            return false;
        var cfg = Config.sixdaolv_505[v.lv];
        var cost = 0;
        if (v.pz == 2) {
            cost = cfg.exp2;
        }
        else if (v.pz == 3) {
            cost = cfg.exp3;
        }
        else if (v.pz == 4) {
            cost = cfg.exp4;
        }
        else if (v.pz == 5) {
            cost = cfg.exp5;
        }
        else if (v.pz == 6) {
            cost = cfg.exp6;
        }
        else {
            cost = cfg.exp8;
        }
        if (Model_player.voMine.yinji < cost) {
            if (warn)
                ViewCommonWarn.text("材料不足");
            return false;
        }
        if (v.lv >= v.maxLv) {
            if (warn)
                ViewCommonWarn.text("已达满级");
            return false;
        }
        return true;
    };
    /**六道升星红点 */
    Model_LunHui.canUpStar = function (v, warn) {
        if (warn === void 0) { warn = false; }
        if (v == null)
            return false;
        if (v.id == 0)
            return false;
        if (Model_LunHui.getItemCt(v.id) == 0) {
            if (warn)
                ViewCommonWarn.text("材料不足");
            return false;
        }
        if (v.star >= v.maxStar) {
            if (warn)
                ViewCommonWarn.text("已达满星");
            return false;
        }
        return true;
    };
    //有更高品质 0-7  可替换  xx
    Model_LunHui.canUpPower = function (pos) {
        var modellh = GGlobal.modellh;
        var eq = modellh.equipArr[pos];
        if (eq == null || eq.id == 0)
            return false;
        var typeArr = {};
        for (var key in modellh.equipArr) {
            var eq_1 = modellh.equipArr[key];
            if (!eq_1 || eq_1.id == 0)
                continue;
            typeArr[eq_1.type] = true;
        }
        //有已开启但未镶嵌的印记,且背包有未镶嵌的印记时要有红点
        for (var k = 0; k < Model_LunHui.bagArr.length; k++) {
            var ebag = Model_LunHui.bagArr[k];
            if (!ebag || ebag.type == 0)
                continue;
            if (eq.type == ebag.type && ebag.pz > eq.pz)
                return true;
            if (typeArr[ebag.type])
                continue;
            if (ebag.type == pos && ebag.pz > eq.pz)
                return true;
        }
        return false;
    };
    ///有可镶嵌时红点
    Model_LunHui.canWear = function (pos) {
        var modellh = GGlobal.modellh;
        var eq = modellh.equipArr[pos];
        if (eq && eq.id > 0) {
            return false;
        }
        var typeArr = {};
        for (var key in modellh.equipArr) {
            var eq_2 = modellh.equipArr[key];
            if (!eq_2 || eq_2.id == 0)
                continue;
            typeArr[eq_2.type] = true;
        }
        //有已开启但未镶嵌的印记,且背包有未镶嵌的印记时要有红点
        for (var k = 0; k < Model_LunHui.bagArr.length; k++) {
            var ebag = Model_LunHui.bagArr[k];
            if (!ebag || ebag.type == 0)
                continue;
            if (ebag.type == pos && !typeArr[ebag.type])
                return true;
        }
        return false;
    };
    //镶嵌
    Model_LunHui.checkEquip = function (type) {
        //已镶嵌印记可升星升级时要有红点
        var modellh = GGlobal.modellh;
        // let len:number = modellh.equipArr.length;
        for (var key in modellh.equipArr) {
            var eq = modellh.equipArr[key];
            if (Math.floor(eq.pos / 10) == type) {
                if (eq && eq.lv < eq.maxLv && Model_LunHui.canUpLevel(eq)) {
                    return true;
                }
                if (eq && eq.star < eq.maxStar && Model_LunHui.canUpStar(eq)) {
                    return true;
                }
                if (eq && Model_LunHui.canWear(eq.pos)) {
                    return true;
                }
                if (eq && Model_LunHui.canUpPower(eq.pos)) {
                    return true;
                }
            }
        }
        return false;
    };
    Model_LunHui.UP_STAR = "up_star";
    Model_LunHui.UP_LEVEL = "up_level";
    Model_LunHui.CHECKED = "checked";
    Model_LunHui.UP_FENJIE = "up_fenjie";
    Model_LunHui.bagMap = {}; //位置key
    Model_LunHui.type = 0; //六道套装类型
    Model_LunHui.OPENUI_TM = "openui_tm";
    Model_LunHui.UP_TM = "up_tm";
    Model_LunHui.bagArr = [];
    return Model_LunHui;
}(BaseModel));
__reflect(Model_LunHui.prototype, "Model_LunHui");
