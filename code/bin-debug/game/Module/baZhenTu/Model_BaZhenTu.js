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
var Model_BaZhenTu = (function (_super) {
    __extends(Model_BaZhenTu, _super);
    function Model_BaZhenTu() {
        var _this = _super.call(this) || this;
        _this.godFuWenData = {};
        _this._openUITime = false;
        /*符文大师id*/
        _this.dsId = 0;
        /**状态:0：未激活，未达到条件，1：可激活，2：不可升级，3：可升级**/
        _this.dsSt = 0;
        /*红色符文总星级*/
        _this.dsLv = 0;
        return _this;
    }
    /**
     * 打开八阵图
    */
    Model_BaZhenTu.prototype.CGOPENUI4401 = function () {
        var b = this.getBytes();
        this.socket.sendCMDBytes(4401, b);
    };
    /**
     * 操作天命 B:1.装备 2.卸下I:天命idI:该天命在背包的位置B:要操作的装备位置(位置约定：顺时针1-8)
    */
    Model_BaZhenTu.prototype.CGUseDestiny4403 = function (type, id, posB, posE) {
        var b = this.getBytes();
        b.writeByte(type);
        b.writeInt(id);
        b.writeInt(posB);
        b.writeByte(posE);
        this.socket.sendCMDBytes(4403, b);
    };
    /**
     * 升级符文 B:升级八阵图上符文位置id
    */
    Model_BaZhenTu.prototype.CGUplevel4405 = function (posE) {
        var b = this.getBytes();
        b.writeByte(posE);
        this.socket.sendCMDBytes(4405, b);
    };
    /**
     * 升星八阵图上符文位置id B:升星位置
    */
    Model_BaZhenTu.prototype.CGUpstar4407 = function (posE) {
        var b = this.getBytes();
        b.writeByte(posE);
        this.socket.sendCMDBytes(4407, b);
    };
    /**
     * 一键分解  [I:位置]位置
    */
    Model_BaZhenTu.prototype.CGFenjie4409 = function (posArr) {
        if (posArr == null || posArr.length == 0)
            return;
        var b = this.getBytes();
        var len = posArr.length;
        b.writeShort(len);
        for (var i = 0; i < len; i++) {
            b.writeInt(posArr[i]);
        }
        this.socket.sendCMDBytes(4409, b);
    };
    /**
     * 鉴定 B:类型（0铜钱1元宝）B:次数（0 1次 1十次）
    */
    Model_BaZhenTu.prototype.CGBuydestiny4411 = function (type, count) {
        var b = this.getBytes();
        b.writeByte(type);
        b.writeByte(count);
        this.socket.sendCMDBytes(4411, b);
    };
    /**
     * 锁 I:位置B:加锁1解锁0
    */
    Model_BaZhenTu.prototype.CGLocked4413 = function (pos, lock) {
        var b = this.getBytes();
        b.writeInt(pos);
        b.writeByte(lock);
        this.socket.sendCMDBytes(4413, b);
    };
    /**
     * 锁 I:位置B:加锁1解锁0
    */
    Model_BaZhenTu.prototype.CGJieSuo4415 = function (pos) {
        var b = this.getBytes();
        b.writeByte(pos);
        this.socket.sendCMDBytes(4415, b);
    };
    /**
     * 打开符文大师界面
    */
    Model_BaZhenTu.prototype.CGDaShi_UI4417 = function () {
        var b = this.getBytes();
        this.socket.sendCMDBytes(4417, b);
    };
    /**
     * 升级符文大师
    */
    Model_BaZhenTu.prototype.CGDASHI_UPLV4419 = function () {
        var b = this.getBytes();
        this.socket.sendCMDBytes(4419, b);
    };
    /**
     * 按符文的类型分解 [B:符文类型]
    */
    Model_BaZhenTu.prototype.CG_FENJIE_4421 = function (arr) {
        var len = arr.length;
        if (len == 0)
            return;
        var b = this.getBytes();
        b.writeShort(len);
        for (var i = 0; i < len; i++) {
            b.writeByte(arr[i]);
        }
        this.socket.sendCMDBytes(4421, b);
    };
    /**
     *兑换神符 I:表的id
    */
    Model_BaZhenTu.prototype.CG_BUY_4425 = function (id) {
        var b = this.getBytes();
        b.writeInt(id);
        this.sendSocket(4425, b);
    };
    Model_BaZhenTu.initCost = function () {
        if (Model_BaZhenTu.tong1 == null) {
            var tongCfg = Config.bztjd_261[1];
            var arr = ConfigHelp.SplitStr(tongCfg.conmuse);
            Model_BaZhenTu.tong1 = Number(arr[0][2]);
            arr = ConfigHelp.SplitStr(tongCfg.conmuse1);
            Model_BaZhenTu.tong10 = Number(arr[0][2]);
            Model_BaZhenTu.tongMax = tongCfg.time;
            var yuanCfg = Config.bztjd_261[2];
            arr = ConfigHelp.SplitStr(yuanCfg.conmuse);
            Model_BaZhenTu.yuan1 = Number(arr[0][2]);
            arr = ConfigHelp.SplitStr(yuanCfg.conmuse1);
            Model_BaZhenTu.yuan10 = Number(arr[0][2]);
        }
    };
    Model_BaZhenTu.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        mgr.regHand(4402, self.GC_OPENUI_4402, self);
        mgr.regHand(4404, self.GC_UseDestiny_4404, self);
        mgr.regHand(4406, self.GC_Uplevel_4406, self);
        mgr.regHand(4408, self.GC_Upstar_4408, self);
        mgr.regHand(4410, self.GC_Onekeyfenjie_4410, self);
        mgr.regHand(4412, self.GC_Buydestiny_4412, self);
        mgr.regHand(4414, self.GC_LOCKED_4414, self);
        mgr.regHand(4416, self.GC_JIESUO_4416, self);
        mgr.regHand(4418, self.GC_DASHI_UI4418, self);
        mgr.regHand(4420, self.GC_DASHI_UPLV4420, self);
        mgr.regHand(4422, self.GC_FENJIE_4422, self);
        mgr.regHand(4424, self.GC_ADDDESTINY_4424, self);
        mgr.regHand(4426, self.GC_BUY_4426, self);
        mgr.regHand(4428, self.GC_GOD_FUWEN_EXCHANGENUM, self);
    };
    /**4428	GC 神符文已经兑换数量 [I:符文idI:已兑换数量] */
    Model_BaZhenTu.prototype.GC_GOD_FUWEN_EXCHANGENUM = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var fuwenId = data.readInt();
            var count = data.readInt();
            self.godFuWenData[fuwenId] = count;
        }
        self.notify(Model_BaZhenTu.BUY_GOD);
    };
    /**
     *[B:位置I:符文idI:符文等级I:符文星级]装备在阵上符文[I:符文背包索引I:符文idI:符文等级I:符文星级]背包符文B:免费元宝鉴定次数I:今日铜钱次数I:元宝鉴定次数
      [B:位置I:符文idI:符文等级I:符文星级]装备在阵上符文[I:符文背包索引I:符文idI:符文等级I:符文星级B:是否锁0未锁1锁]背包符文B:免费元宝鉴定次数I:今日铜钱次数I:元宝鉴定次数I:完美鉴定总次数
    */
    Model_BaZhenTu.prototype.GC_OPENUI_4402 = function (self, data) {
        Model_BaZhenTu.isFirstOpen = true;
        var l = data.readShort();
        Model_BaZhenTu.equipArr = [];
        for (var i = 0; i < l; i++) {
            var v = new VoBaZhenTu();
            v.readMsg(data);
            Model_BaZhenTu.equipArr[v.pos - 1] = v;
        }
        l = data.readShort();
        Model_BaZhenTu.bagArr = [];
        for (i = 0; i < l; i++) {
            var v = new VoBaZhenTu();
            v.readMsgBag(data);
            Model_BaZhenTu.pushBagEqu(v);
        }
        Model_BaZhenTu.freeCt = data.readByte();
        Model_BaZhenTu.tongCt = data.readInt();
        Model_BaZhenTu.yuanCt = data.readInt();
        Model_BaZhenTu.yuanTotalCount = data.readInt();
        self.notify(Model_BaZhenTu.OPENUI);
        GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
    };
    /**
     *装备/卸下天命返回 B:装备/卸下结果0成功1不允许装备同类型天命2失败B:类型I:背包索引I:身上索引
    */
    Model_BaZhenTu.prototype.GC_UseDestiny_4404 = function (self, data) {
        var res = data.readByte();
        var type = data.readByte();
        var posB = data.readInt();
        var posE = data.readInt();
        if (res == 0) {
            if (type == 1) {
                var vbag = Model_BaZhenTu.bagMap[posB];
                vbag.pos = posE;
                var vEqu = Model_BaZhenTu.equipArr[posE - 1];
                if (vEqu && vEqu.id > 0) {
                    vEqu.pos = posB;
                }
                Model_BaZhenTu.equipArr[posE - 1] = vbag;
                Model_BaZhenTu.delBagEqu(posB);
                if (vEqu && vEqu.id > 0) {
                    Model_BaZhenTu.pushBagEqu(vEqu);
                }
            }
            else {
                var v = Model_BaZhenTu.equipArr[posE - 1];
                var copy = v.copy();
                copy.pos = posB;
                Model_BaZhenTu.pushBagEqu(copy);
                v.clear();
            }
            self.notify(Model_BaZhenTu.OPENUI);
            GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
        }
        else {
            var t = type == 1 ? "装备" : "卸下";
            ViewCommonWarn.text(t + "失败");
            if (type != 1) {
                self.freshData();
            }
        }
    };
    Model_BaZhenTu.prototype.freshData = function () {
        var self = this;
        if (!self._openUITime) {
            self._openUITime = true;
            GGlobal.modelBaZhenTu.CGOPENUI4401();
            Timer.instance.callLater(function () { this._openUITime = false; }, 3000, self, 0, false, false, true);
        }
    };
    /**
     *升级结果 B:0成功1失败B:位置索引I:符文idI:等级
    */
    Model_BaZhenTu.prototype.GC_Uplevel_4406 = function (self, data) {
        var res = data.readByte();
        if (res == 0) {
            var pos = data.readByte();
            var id = data.readInt();
            var lv = data.readInt();
            var v = Model_BaZhenTu.equipArr[pos - 1];
            v.level = lv;
            self.notify(Model_BaZhenTu.UP_LEVEL);
            GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
            ViewCommonWarn.text("升级成功");
        }
        else {
            ViewCommonWarn.text("升级失败");
        }
    };
    /**
     *GC 升星返回 B:升星结果0成功1失败B:位置索引I:符文idI:星级I:背包被使用的符文位置
    */
    Model_BaZhenTu.prototype.GC_Upstar_4408 = function (self, data) {
        var res = data.readByte();
        if (res == 0) {
            var posE = data.readByte();
            var sid = data.readInt();
            var starLv = data.readInt();
            var v = Model_BaZhenTu.equipArr[posE - 1];
            v.starLv = starLv;
            //删除背包物品
            var posB = data.readInt();
            Model_BaZhenTu.delBagEqu(posB);
            self.notify(Model_BaZhenTu.UP_STAR);
            GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
            ViewCommonWarn.text("升星成功");
        }
        else {
            ViewCommonWarn.text("升星失败");
        }
    };
    /**
     * 分解结果 B:结果0成功1失败[I:被分解符文的背包索引]
    */
    Model_BaZhenTu.prototype.GC_Onekeyfenjie_4410 = function (self, data) {
        var res = data.readByte();
        if (res == 0) {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var posB = data.readInt();
                Model_BaZhenTu.delBagEqu(posB);
            }
            self.notify(Model_BaZhenTu.UP_FENJIE);
            GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
            ViewCommonWarn.text("分解成功");
        }
        else {
            ViewCommonWarn.text("分解失败");
            self.freshData();
        }
    };
    /**
     *鉴定结果 [I:背包位置索引I:符文idI:符文星级I:符文等级]B:免费次数I:铜钱次数I:元宝次数:I:完美鉴定总次数
     GC 鉴定结果 [I:背包位置索引I:符文idI:符文星级I:符文等级]B:免费次数I:铜钱次数I:元宝次数B:类型I:完美鉴定总次数
    */
    Model_BaZhenTu.prototype.GC_Buydestiny_4412 = function (self, data) {
        var len = data.readShort();
        var dropArr = [];
        for (var i = 0; i < len; i++) {
            var v = new VoBaZhenTu();
            v.readMsgBuy(data);
            Model_BaZhenTu.pushBagEqu(v);
            dropArr.push(v);
        }
        Model_BaZhenTu.freeCt = data.readByte();
        Model_BaZhenTu.tongCt = data.readInt();
        Model_BaZhenTu.yuanCt = data.readInt();
        var type = data.readByte(); //类型
        Model_BaZhenTu.yuanTotalCount = data.readInt();
        if (type == 100) {
            for (var i = 0; i < dropArr.length; i++) {
                var v = dropArr[i];
                ViewBroadcastItemText.text("获得了" + v.name + "X1", Color.getColorInt(v.pz));
            }
        }
        else {
            if (GGlobal.layerMgr.isOpenView(UIConst.BAZHENTU_BUY)) {
                GGlobal.layerMgr.getView(UIConst.BAZHENTU_BUY).upOpen({ type: type, drop: dropArr });
            }
            else {
                GGlobal.layerMgr.open(UIConst.BAZHENTU_BUY, { type: type, drop: dropArr });
            }
            self.notify(Model_BaZhenTu.BUY);
        }
        GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
        var not = GGlobal.modelEightLock.getAuthenNot();
        GGlobal.reddot.setCondition(UIConst.AUTHEN_RANK, 0, not);
        GGlobal.modelEightLock.checkAndOpenIcon();
    };
    //锁 I:位置B:锁
    Model_BaZhenTu.prototype.GC_LOCKED_4414 = function (self, data) {
        var pos = data.readInt();
        var locked = data.readByte();
        var v = Model_BaZhenTu.bagMap[pos];
        if (v) {
            v.locked = locked;
            self.notify(Model_BaZhenTu.LOCK);
            ViewCommonWarn.text((locked == 1 ? "锁定" : "解锁") + "成功");
        }
    };
    //GC 解说返回 B:0成功 1失败B:孔id
    Model_BaZhenTu.prototype.GC_JIESUO_4416 = function (self, data) {
        var res = data.readByte();
        var pos = data.readByte();
        if (res == 0) {
            var v = new VoBaZhenTu();
            v.pos = pos;
            Model_BaZhenTu.equipArr[v.pos - 1] = v;
            self.notify(Model_BaZhenTu.JIESUO);
            GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
        }
        else {
            ViewCommonWarn.text("条件不满足");
        }
    };
    //打开符文大师界面返回 I:符文大师idB:状态:0：未激活，未达到条件，1：可激活，2：不可升级，3：可升级I:红色符文总星级
    Model_BaZhenTu.prototype.GC_DASHI_UI4418 = function (self, data) {
        self.dsId = data.readInt();
        self.dsSt = data.readByte();
        self.dsLv = data.readInt();
        self.notify(Model_BaZhenTu.DA_SHI);
        GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
    };
    //激活或升级返回 B:状态：0：失败，1：成功，2：未满足条件，3：已满级I:符文大师idI:下一级符文大师id,已达满级则为0B:状态:0：不可升级，1：可升级
    Model_BaZhenTu.prototype.GC_DASHI_UPLV4420 = function (self, data) {
        var st = data.readByte();
        if (st == 1) {
            self.dsId = data.readInt();
            var nextId = data.readByte();
            self.dsSt = data.readInt();
            self.notify(Model_BaZhenTu.DA_SHI);
            GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
        }
        else if (st == 2) {
            ViewCommonWarn.text("未满足条件");
        }
        else if (st == 3) {
            ViewCommonWarn.text("已满级");
        }
        else {
            ViewCommonWarn.text("升级失败");
        }
    };
    //GC 分解结果 B:0成功 1失败[B:类型]
    Model_BaZhenTu.prototype.GC_FENJIE_4422 = function (self, data) {
        var st = data.readByte();
        if (st == 0) {
            var len = data.readShort();
            var fenTy = {};
            for (var i = 0; i < len; i++) {
                var type = data.readByte();
                fenTy[type] = 1;
            }
            var size = Model_BaZhenTu.bagArr.length;
            var newArr = [];
            for (var i = 0; i < size; i++) {
                var v = Model_BaZhenTu.bagArr[i];
                if (v.locked && v.type > 0) {
                    newArr.push(v);
                }
                else if (!fenTy[v.pz]) {
                    newArr.push(v);
                }
                else {
                    delete Model_BaZhenTu.bagMap[v.pos];
                }
            }
            Model_BaZhenTu.bagArr = newArr;
            self.notify(Model_BaZhenTu.UP_FENJIE);
            GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE);
            ViewCommonWarn.text("分解成功");
        }
        else {
            ViewCommonWarn.text("分解失败");
            self.freshData();
        }
    };
    //GC 添加符文 [I:背包位置索引I:符文idI:符文星级I:符文等级]B:背包是否已满0没有 1有
    Model_BaZhenTu.prototype.GC_ADDDESTINY_4424 = function (self, data) {
        var len = data.readShort();
        var dropArr = {};
        var arrGet = [];
        for (var i = 0; i < len; i++) {
            var v = new VoBaZhenTu();
            v.readMsgBuy(data);
            Model_BaZhenTu.pushBagEqu(v);
            if (v.pz >= 8) {
                arrGet.push(v);
            }
            else {
                if (dropArr[v.id]) {
                    dropArr[v.id].ct++;
                }
                else {
                    dropArr[v.id] = { v: v, ct: 1 };
                }
            }
        }
        var isFull = data.readByte();
        if (isFull) {
            ViewCommonWarn.text("符文背包空间不足，请前往分解");
            var sf = GGlobal.reddot;
            sf.setCondition(UIConst.BAZHENTU, 1, true);
            sf.notifyMsg(UIConst.BAZHENTU);
        }
        // self.notify(Model_BaZhenTu.BUY);
        // GGlobal.control.notify(Enum_MsgType.BAZHENTU_NOTICE)
        for (var key in dropArr) {
            var v = dropArr[key].v;
            var ct = dropArr[key].ct;
            ViewBroadcastItemText.text("获得了" + v.name + "X" + ct, Color.getColorInt(v.pz));
        }
        if (arrGet) {
            ViewCommonPrompt.textItemList(arrGet);
        }
    };
    //兑换神符返回 B:状态 1成功 2神符碎片不足 3神符不存在 4背包已满 I:表的id
    Model_BaZhenTu.prototype.GC_BUY_4426 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            var cfg = Config.bztsf_261[id];
            if (!self.godFuWenData[cfg.sf])
                self.godFuWenData[cfg.sf] = 0;
            self.godFuWenData[cfg.sf]++;
            // ViewCommonWarn.text("兑换神符成功");
            self.notify(Model_BaZhenTu.BUY_GOD);
        }
        else {
            ViewCommonWarn.text(["神符碎片不足", "神符不存在", "背包已满"][res - 2]);
        }
    };
    Model_BaZhenTu.delBagEqu = function (posB) {
        var v = Model_BaZhenTu.bagMap[posB];
        Model_BaZhenTu.bagArr.splice(Model_BaZhenTu.bagArr.indexOf(v), 1);
        delete Model_BaZhenTu.bagMap[posB];
    };
    Model_BaZhenTu.pushBagEqu = function (v) {
        if (Model_BaZhenTu.bagMap[v.pos] == null) {
            Model_BaZhenTu.bagMap[v.pos] = v;
            Model_BaZhenTu.bagArr.push(v);
        }
        else {
            Model_BaZhenTu.bagMap[v.pos] = v;
            var has = false;
            for (var i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
                if (Model_BaZhenTu.bagArr[i].pos == v.pos) {
                    Model_BaZhenTu.bagArr[i] = v;
                    has = true;
                    break;
                }
            }
            if (!has) {
                Model_BaZhenTu.bagArr.push(v);
            }
        }
    };
    //未解锁 true锁着 1-8  //9-10
    Model_BaZhenTu.getIsLock = function (index) {
        if (index > 8) {
            var ve = Model_BaZhenTu.equipArr[index - 1];
            if (ve)
                return false;
        }
        else {
            var v = Config.bzt_261[index];
            if (v) {
                // if (Model_player.voMine.level >= v.lv) {
                if (Model_player.voMine.maxLv >= v.lv) {
                    return false;
                }
                if (v.vip > 0 && Model_player.voMine.viplv >= v.vip) {
                    return false;
                }
            }
        }
        return true;
    };
    Model_BaZhenTu.getTotalLv = function () {
        var tot = 0;
        for (var i = 0; i < Model_BaZhenTu.equipArr.length; i++) {
            var ve = Model_BaZhenTu.equipArr[i];
            if (ve)
                tot += ve.level;
        }
        return tot;
    };
    Model_BaZhenTu.getItemCt = function (id) {
        var ct = 0;
        for (var i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
            var v = Model_BaZhenTu.bagArr[i];
            if (v.id == id) {
                ct++;
            }
        }
        return ct;
    };
    Model_BaZhenTu.getBagMax = function () {
        return ConfigHelp.getSystemNum(6514);
    };
    Model_BaZhenTu.onTong = function (ct) {
        if (Model_BaZhenTu.bagArr.length >= Model_BaZhenTu.getBagMax() - 20) {
            ViewCommonWarn.text("符文背包空间不足，请前往分解");
            return;
        }
        if (Model_BaZhenTu.tongCt >= Model_BaZhenTu.tongMax) {
            ViewCommonWarn.text("普通鉴定次数不足");
            return;
        }
        if (ct == 10 && Model_BaZhenTu.tongMax - Model_BaZhenTu.tongCt < 10) {
            ViewCommonWarn.text("剩余普通鉴定次数不足10次");
            return;
        }
        var cost = ct == 1 ? Model_BaZhenTu.tong1 : Model_BaZhenTu.tong10;
        if (Model_player.voMine.tongbi < cost) {
            ViewCommonWarn.text("铜币不足");
            return;
        }
        GGlobal.modelBaZhenTu.CGBuydestiny4411(0, ct == 1 ? 0 : 1);
    };
    Model_BaZhenTu.onYuan = function (ct) {
        if (Model_BaZhenTu.bagArr.length >= Model_BaZhenTu.getBagMax() - 20) {
            ViewCommonWarn.text("符文背包空间不足，请前往分解");
            return;
        }
        var cost = ct == 1 ? Model_BaZhenTu.yuan1 : Model_BaZhenTu.yuan10;
        if (Model_BaZhenTu.freeCt > 0 && ct == 1)
            cost = 0;
        var JDCct = Model_Bag.getItemCount(Model_BaZhenTu.JDCid);
        if (ct == 1 && JDCct > 0)
            cost = 0;
        if (ct == 10 && JDCct > 9)
            cost = 0;
        if (Model_player.voMine.yuanbao < cost) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelBaZhenTu.CGBuydestiny4411(1, ct == 1 ? 0 : 1);
    };
    //镶嵌
    Model_BaZhenTu.checkEquip = function () {
        //已镶嵌符文可升星升级时要有红点
        for (var i = 0; i < Model_BaZhenTu.equipArr.length; i++) {
            var eq = Model_BaZhenTu.equipArr[i];
            if (Model_BaZhenTu.canUpLevel(eq)) {
                return true;
            }
            if (Model_BaZhenTu.canUpStar(eq)) {
                return true;
            }
        }
        var typeArr = {};
        for (var j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
            var eq = Model_BaZhenTu.equipArr[j];
            if (!eq || eq.id == 0)
                continue;
            typeArr[eq.type] = true;
        }
        //有已开启但未镶嵌的阵眼,且背包有未镶嵌的符文时要有红点
        var empty = false;
        for (var i = 0; i < 10; i++) {
            var eq = Model_BaZhenTu.equipArr[i];
            if (!Model_BaZhenTu.getIsLock(i + 1)) {
                if ((!eq || eq.id == 0)) {
                    empty = true;
                }
                else {
                    if (Model_BaZhenTu.canUpPower(i)) {
                        return true;
                    }
                }
            }
        }
        if (empty) {
            for (var k = 0; k < Model_BaZhenTu.bagArr.length; k++) {
                var ebag = Model_BaZhenTu.bagArr[k];
                if (!ebag || ebag.type == 0)
                    continue;
                if (!typeArr[ebag.type])
                    return true;
            }
        }
        //9-10空位 可开孔
        for (var i = 9; i <= 10; i++) {
            if (Model_BaZhenTu.getIsLock(i)) {
                var v = Config.bzt_261[i];
                var cost = Number(JSON.parse(v.xh)[0][2]);
                if (Model_BaZhenTu.getTotalLv() >= v.fw && Model_player.voMine.yuanbao >= cost) {
                    return true;
                }
            }
        }
        return false;
    };
    ///孔位置  0-7
    Model_BaZhenTu.checkEquipVo = function (index) {
        var eq = Model_BaZhenTu.equipArr[index];
        if (Model_BaZhenTu.canUpLevel(eq)) {
            return true;
        }
        if (Model_BaZhenTu.canUpStar(eq)) {
            return true;
        }
        if (Model_BaZhenTu.canWear(index)) {
            return true;
        }
        return false;
    };
    ///孔位置  0-7
    Model_BaZhenTu.canWear = function (index) {
        var eq = Model_BaZhenTu.equipArr[index];
        if (eq && eq.id > 0) {
            return false;
        }
        if (Model_BaZhenTu.getIsLock(index + 1)) {
            return false;
        }
        var typeArr = {};
        for (var j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
            var eq_1 = Model_BaZhenTu.equipArr[j];
            if (!eq_1 || eq_1.id == 0)
                continue;
            typeArr[eq_1.type] = true;
        }
        //有已开启但未镶嵌的阵眼,且背包有未镶嵌的符文时要有红点
        for (var k = 0; k < Model_BaZhenTu.bagArr.length; k++) {
            var ebag = Model_BaZhenTu.bagArr[k];
            if (!ebag || ebag.type == 0)
                continue;
            if (!typeArr[ebag.type])
                return true;
        }
        return false;
    };
    //有同类型
    Model_BaZhenTu.checkTypeSame = function (type) {
        var typeArr = {};
        for (var j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
            var eq = Model_BaZhenTu.equipArr[j];
            if (!eq || eq.id == 0)
                continue;
            typeArr[eq.type] = true;
        }
        if (typeArr[type])
            return true;
        return false;
    };
    Model_BaZhenTu.canUpLevel = function (v, warn) {
        if (warn === void 0) { warn = false; }
        if (v == null)
            return false;
        if (v.id == 0)
            return false;
        var costUp = Config.bztlv_261[v.level];
        var cost = Number(costUp["exp" + v.pz]);
        if (Model_player.voMine.fuwen < cost) {
            if (warn)
                ViewCommonWarn.text("符文经验不足");
            return false;
        }
        if (v.level >= v.maxmaxLv) {
            if (warn)
                ViewCommonWarn.text("已达满级");
            return false;
        }
        if (v.level >= v.maxLv) {
            if (warn)
                ViewCommonWarn.text("升星可提升等级上限");
            return false;
        }
        return true;
    };
    Model_BaZhenTu.canUpStar = function (v, warn) {
        if (warn === void 0) { warn = false; }
        if (v == null)
            return false;
        if (v.id == 0)
            return false;
        if (Model_BaZhenTu.getItemCt(v.id) == 0) {
            if (warn)
                ViewCommonWarn.text("材料不足");
            return false;
        }
        if (v.starLv >= v.maxStar) {
            if (warn)
                ViewCommonWarn.text("已达满星");
            return false;
        }
        return true;
    };
    //有更高品质 0-7  可替换  xx
    Model_BaZhenTu.canUpPower = function (index) {
        var eq = Model_BaZhenTu.equipArr[index];
        if (eq == null || eq.id == 0)
            return false;
        var typeArr = {};
        for (var j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
            var eq_2 = Model_BaZhenTu.equipArr[j];
            if (!eq_2 || eq_2.id == 0)
                continue;
            typeArr[eq_2.type] = true;
        }
        //有已开启但未镶嵌的阵眼,且背包有未镶嵌的符文时要有红点
        for (var k = 0; k < Model_BaZhenTu.bagArr.length; k++) {
            var ebag = Model_BaZhenTu.bagArr[k];
            if (!ebag || ebag.type == 0)
                continue;
            if (eq.type == ebag.type && ebag.pz > eq.pz)
                return true;
            if (typeArr[ebag.type])
                continue;
            if (ebag.pz > eq.pz)
                return true;
        }
        return false;
    };
    //分解
    Model_BaZhenTu.checkFenJ = function () {
        //当符文背包符文数量＞100时要有红点
        if (Model_BaZhenTu.bagArr.length > (Model_BaZhenTu.getBagMax() - 100))
            return true;
        for (var i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
            var v = Model_BaZhenTu.bagArr[i];
            if (v.pz <= 3) {
                return true;
            }
        }
        return false;
    };
    //鉴定
    Model_BaZhenTu.checkJianD = function () {
        //免费次数
        if (Model_BaZhenTu.freeCt > 0)
            return true;
        var JDCct = Model_Bag.getItemCount(Model_BaZhenTu.JDCid);
        if (JDCct > 0)
            return true;
        return false;
    };
    Model_BaZhenTu.checkDashi = function () {
        var m = GGlobal.modelBaZhenTu;
        return m.dsSt == 1 || m.dsSt == 3;
    };
    Model_BaZhenTu.checkGod = function () {
        var m = GGlobal.modelBaZhenTu;
        // let arr = m.getbztsf();
        var ct = JSON.parse(Config.bztsf_261[1].consume)[0][2];
        var has = Model_Bag.getItemCount(Model_BaZhenTu.GODid);
        return has >= ct;
    };
    Model_BaZhenTu.prototype.getbztsf = function () {
        var s = this;
        if (!s._bztsf) {
            s._bztsf = [];
            for (var key in Config.bztsf_261) {
                var v = Config.bztsf_261[key];
                s._bztsf.push(v);
            }
        }
        return s._bztsf;
    };
    Model_BaZhenTu.OPENUI = "openui";
    Model_BaZhenTu.BUY = "buy";
    Model_BaZhenTu.LOCK = "lock";
    Model_BaZhenTu.JIESUO = "jiesuo";
    Model_BaZhenTu.CHECKED = "checked";
    Model_BaZhenTu.UP_STAR = "up_star";
    Model_BaZhenTu.UP_LEVEL = "up_level";
    Model_BaZhenTu.UP_FENJIE = "up_fenjie";
    Model_BaZhenTu.DA_SHI = "da_shi";
    Model_BaZhenTu.BUY_GOD = "buy_god";
    Model_BaZhenTu.equipArr = [];
    Model_BaZhenTu.bagArr = [];
    Model_BaZhenTu.bagMap = {}; //位置key
    //鉴定锤id
    Model_BaZhenTu.JDCid = 410046;
    Model_BaZhenTu.GODid = 411016;
    Model_BaZhenTu.isFirstOpen = false;
    return Model_BaZhenTu;
}(BaseModel));
__reflect(Model_BaZhenTu.prototype, "Model_BaZhenTu");
