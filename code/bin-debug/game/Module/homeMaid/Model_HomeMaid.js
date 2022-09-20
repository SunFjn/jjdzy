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
var Model_HomeMaid = (function (_super) {
    __extends(Model_HomeMaid, _super);
    function Model_HomeMaid() {
        var _this = _super.call(this) || this;
        _this.useId = 0;
        //打开界面返回 [I:侍女idI:侍女星级 I:侍女等级I:侍女当前经验]侍女数据
        _this.hasData = false;
        return _this;
    }
    //打开界面
    Model_HomeMaid.prototype.CG_OPENUI_11301 = function () {
        var bates = this.getBytes();
        this.sendSocket(11301, bates);
    };
    //激活/升星侍女 I:配置表id
    Model_HomeMaid.prototype.CG_UPSTAR_11303 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11303, bates);
    };
    //升级侍女 I:侍女idB: 类型 1升级 2一键升级
    Model_HomeMaid.prototype.CG_UPLV_11305 = function (id, type) {
        var bates = this.getBytes();
        bates.writeInt(id);
        bates.writeByte(type);
        this.sendSocket(11305, bates);
    };
    //使用形象 I:侍女id
    Model_HomeMaid.prototype.CG_USE_11307 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11307, bates);
    };
    //协议处理
    Model_HomeMaid.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(11302, this.GC_OPENUI_11302, this);
        mgr.regHand(11304, this.GC_UPSTAR_11304, this);
        mgr.regHand(11306, this.GC_UPLV_11306, this);
        mgr.regHand(11308, this.GC_USE_11308, this);
    };
    Object.defineProperty(Model_HomeMaid.prototype, "datArr", {
        get: function () {
            var m = this;
            if (m._datArr == null) {
                m._datArr = [];
                m._datObj = {};
                for (var k in Config.shinv_020) {
                    var vv = new Vo_HomeMaid();
                    vv.init(Config.shinv_020[k]);
                    m._datArr.push(vv);
                    m._datObj[vv.id] = vv;
                }
            }
            return m._datArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_HomeMaid.prototype.GC_OPENUI_11302 = function (self, data) {
        var len = data.readShort();
        var arr = self.datArr; //初始化_datObj
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var star = data.readInt();
            var lv = data.readInt();
            var exp = data.readInt();
            var v = self._datObj[id];
            if (v) {
                v.isAct = true;
                v.setStar(star);
                v.setLv(lv);
                v.exp = exp;
            }
        }
        self.useId = data.readInt();
        self.hasData = true;
        self.checkNotice();
        self.notify(Model_HomeMaid.openui);
        self.notify(Model_HomeMaid.useMaid);
    };
    //激活/升星侍女返回 I:状态 0成功 1达到上限 2激活升星需要的道具不足I:侍女idI:侍女星级
    Model_HomeMaid.prototype.GC_UPSTAR_11304 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        var star = data.readInt();
        if (res == 0) {
            var v = self._datObj[id];
            v.setStar(star);
            self.checkNotice();
            self.notify(Model_HomeMaid.openui);
        }
        else {
            ViewCommonWarn.text(["达到上限", "激活升星需要的道具不足"][res - 1]);
        }
    };
    //升级侍女返回 I:状态 0成功 1先激活该侍女 2级数已满级 3材料不足 4府邸等级不满足要求I: 侍女idI:侍女等级I: 侍女当前经验
    Model_HomeMaid.prototype.GC_UPLV_11306 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        var lv = data.readInt();
        var exp = data.readInt();
        if (res == 0) {
            var v = self._datObj[id];
            v.setLv(lv);
            v.exp = exp;
            self.checkNotice();
            self.notify(Model_HomeMaid.openui);
        }
        else {
            ViewCommonWarn.text(["先激活该侍女", "级数已满级", "材料不足", "府邸等级不满足要求"][res - 1]);
        }
    };
    //使用形象返回 B:状态 0成功 1先激活该侍女 2该侍女10星解锁动态效果I: 侍女id
    Model_HomeMaid.prototype.GC_USE_11308 = function (self, data) {
        var res = data.readByte();
        if (res == 0) {
            self.useId = data.readInt();
            self.checkNotice();
            self.notify(Model_HomeMaid.openui);
            self.notify(Model_HomeMaid.useMaid);
        }
        else {
            ViewCommonWarn.text(["先激活该侍女", "星级不足"][res - 1]);
        }
    };
    Model_HomeMaid.prototype.checkNotice = function () {
        var s = this;
        if (!s.hasData) {
            return;
        }
        var reddot = GGlobal.reddot;
        var red1 = false;
        var red2 = false;
        var arr = s.datArr;
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            var redStar = s.checkVoStar(v);
            var redLv = s.checkVoLv(v);
            reddot.setCondition(UIConst.HOME_MAID, v.id * 10 + 0, redStar);
            reddot.setCondition(UIConst.HOME_MAID, v.id * 10 + 1, redLv);
            if (!red1)
                red1 = redStar;
            if (!red2)
                red2 = redLv;
        }
        reddot.setCondition(UIConst.HOME_MAID, 0, red1 || red2);
        reddot.setCondition(UIConst.HOME_MAID, 1, red1);
        reddot.setCondition(UIConst.HOME_MAID, 2, red2);
        reddot.notify(UIConst.HOME_MAID);
    };
    //可升星
    Model_HomeMaid.prototype.checkVoStar = function (v) {
        if (!v.cfgStar) {
            return false;
        }
        if (v.star < v.cfg.shangxian) {
            //可升星
            var consume = JSON.parse(v.cfg.xiaohao);
            var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
            var count = Number(consume[0][2]);
            if (hasCount >= count) {
                return true;
            }
        }
        return false;
    };
    //可升级
    Model_HomeMaid.prototype.checkVoLv = function (v) {
        if (!v.isAct) {
            return false;
        }
        var lvHome = GGlobal.homemodel.home_level;
        if (!lvHome) {
            return false;
        }
        var cfgHome = Config.fdsj_019[lvHome];
        if (v.lv >= cfgHome.shinv) {
            return false;
        }
        if (v.cfgLv.xh != "0") {
            //可升级
            var consume = JSON.parse(v.cfgLv.xh);
            var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
            // var count = Number(consume[0][2])
            if (hasCount > 0) {
                return true;
            }
        }
        return false;
    };
    //对应品质的数量
    Model_HomeMaid.prototype.getQualityCt = function (pin) {
        var s = this;
        var ct = 0;
        for (var i = 0; i < s.datArr.length; i++) {
            var vo = s.datArr[i];
            if (vo.isAct && vo.cfg.pinzhi == pin) {
                ct++;
            }
        }
        return ct;
    };
    //对应star的数量
    Model_HomeMaid.prototype.getStarCt = function (star) {
        var s = this;
        var ct = 0;
        for (var i = 0; i < s.datArr.length; i++) {
            var vo = s.datArr[i];
            if (vo.isAct && vo.star >= star) {
                ct++;
            }
        }
        return ct;
    };
    Model_HomeMaid.openui = "openui";
    Model_HomeMaid.useMaid = "useMaid";
    return Model_HomeMaid;
}(BaseModel));
__reflect(Model_HomeMaid.prototype, "Model_HomeMaid");
