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
var Model_ZhenYan = (function (_super) {
    __extends(Model_ZhenYan, _super);
    function Model_ZhenYan() {
        var _this = _super.call(this) || this;
        _this.zYanArr = [];
        return _this;
    }
    // public static UP_LEVEL = "up_level";
    /**
     * 打开界面
    */
    Model_ZhenYan.prototype.CGOPENUI10251 = function () {
        var b = this.getBytes();
        this.socket.sendCMDBytes(10251, b);
        console.log("======================== 10251 send");
    };
    /**
     * 升级/激活阵眼 I:阵眼id
    */
    Model_ZhenYan.prototype.CGUpYan10253 = function (id) {
        var b = this.getBytes();
        b.writeInt(id);
        this.socket.sendCMDBytes(10253, b);
    };
    /**
     *升级/激活阵心
    */
    Model_ZhenYan.prototype.CGUpXin10255 = function () {
        var b = this.getBytes();
        this.socket.sendCMDBytes(10255, b);
    };
    Object.defineProperty(Model_ZhenYan.prototype, "star", {
        //星级
        get: function () {
            return Math.floor(this.lvId % 1000);
        },
        enumerable: true,
        configurable: true
    });
    Model_ZhenYan.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(10252, this.GC_OPENUI_10252, this);
        mgr.regHand(10254, this.GC_UpYan_10254, this);
        mgr.regHand(10256, this.GC_UpXin_10256, this);
    };
    /**
     *打开界面返回 I:阵心等级[I:阵眼idI:阵眼等级]阵眼信息
    */
    Model_ZhenYan.prototype.GC_OPENUI_10252 = function (self, data) {
        self.lvId = data.readInt();
        var l = data.readShort();
        self.zYanArr = [];
        for (var i = 0; i < l; i++) {
            var vo = new VoZhenYan();
            vo.readMsg(data);
            self.zYanArr[vo.id - 1] = vo;
        }
        // self.notify(Model_ZhenYan.OPENUI)
        GGlobal.control.notify(Model_ZhenYan.OPENUI);
        console.log("======================== 10252");
        self.checkRed();
    };
    /**
     *升级/激活阵眼返回 B:状态:0-成功,1-失败I:阵眼idI:阵眼等级
    */
    Model_ZhenYan.prototype.GC_UpYan_10254 = function (self, data) {
        var res = data.readByte();
        if (res == 0) {
            var id = data.readInt();
            var lvId = data.readInt();
            self.zYanArr[id - 1].lvId = lvId;
            // self.notify(Model_ZhenYan.OPENUI);
            GGlobal.control.notify(Model_ZhenYan.OPENUI);
            if (lvId % 10000 == 1) {
                ViewCommonWarn.text("激活成功");
            }
            else if (lvId % 10 == 0) {
                ViewCommonWarn.text("升星成功");
            }
            else {
                ViewCommonWarn.text("升级成功");
            }
            self.checkRed();
        }
        else {
            ViewCommonWarn.text("升级失败");
        }
    };
    /**
     *升级/激活阵心返回 B:状态:0-成功,1-失败I:阵心等级
    */
    Model_ZhenYan.prototype.GC_UpXin_10256 = function (self, data) {
        var res = data.readByte();
        if (res == 0) {
            self.lvId = data.readInt();
            // self.notify(Model_ZhenYan.OPENUI);
            GGlobal.control.notify(Model_ZhenYan.OPENUI);
            if (self.lvId % 1000 == 1) {
                ViewCommonWarn.text("激活成功");
            }
            else {
                ViewCommonWarn.text("升星成功");
            }
            self.checkRed();
        }
        else {
            ViewCommonWarn.text("升星失败");
        }
    };
    Model_ZhenYan.prototype.checkRed = function () {
        var red = this.isRed();
        GGlobal.reddot.setCondition(UIConst.ZHENYAN, 0, red);
        GGlobal.reddot.notifyMsg(UIConst.ZHENYAN);
    };
    Model_ZhenYan.prototype.checkNotice = function () {
        if (!ModuleManager.isOpen(UIConst.ZHENYAN)) {
            return;
        }
        var m = this;
        if (m.zYanArr.length == 0) {
            m.CGOPENUI10251();
            return;
        }
        m.checkRed();
    };
    Model_ZhenYan.prototype.isRed = function () {
        //可升级 激活 升星
        var m = GGlobal.modelZhenYan;
        for (var i = 0; i < m.zYanArr.length; i++) {
            var v = m.zYanArr[i];
            if (m.isRedYan(v)) {
                return true;
            }
        }
        if (m.isRedXin()) {
            return true;
        }
        return false;
    };
    //某个阵眼 是否
    Model_ZhenYan.prototype.isRedYan = function (v) {
        var curLv = Config.zysj_766[v.lvId];
        if (curLv.xj == 0) {
            return false;
        }
        var costItem;
        var xhItem = ConfigHelp.makeItem(JSON.parse(curLv.xiaohao)[0]);
        if (curLv.shengxing > 0) {
            costItem = VoItem.create(v.cfg.djid);
        }
        else {
            costItem = xhItem;
        }
        var ct = Model_Bag.getItemCount(costItem.id);
        if (ct >= xhItem.count) {
            return true;
        }
        return false;
    };
    Model_ZhenYan.prototype.isRedXin = function () {
        var m = this;
        var curXin = Config.zx_766[m.lvId];
        if (curXin.xj == 0) {
            return false;
        }
        var nextXin = Config.zx_766[curXin.xj];
        var xhItem = ConfigHelp.makeItem(JSON.parse(curXin.sxxh)[0]);
        var ct = Model_Bag.getItemCount(xhItem.id);
        //最小等级
        var minLv = -1;
        for (var i = 0; i < m.zYanArr.length; i++) {
            var v = m.zYanArr[i];
            if (v.lvId < minLv || minLv == -1) {
                minLv = v.lvId;
            }
        }
        if (minLv >= curXin.tj && ct >= xhItem.count) {
            return true;
        }
        return false;
    };
    Model_ZhenYan.OPENUI = "openui";
    return Model_ZhenYan;
}(BaseModel));
__reflect(Model_ZhenYan.prototype, "Model_ZhenYan");
