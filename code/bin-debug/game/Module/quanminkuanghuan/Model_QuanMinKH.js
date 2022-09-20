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
var Model_QuanMinKH = (function (_super) {
    __extends(Model_QuanMinKH, _super);
    function Model_QuanMinKH() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.completeObj = {};
        // public iconArr;
        // public filterArr(): void {
        // 	let a = this;
        // 	a.iconArr = [];
        // 	let t = Model_Activity.activityObj[UIConst.QUANMIN_KUANGHUAN];
        // 	t.forEach(element => {
        // 		if (ModuleManager.isOpen(element.id)) {
        // 			a.iconArr.push(element);
        // 		}
        // 	});
        // }
        _this.bossArr = [];
        _this.xiaoxiongArr = [];
        _this.lvbuArr = [];
        _this.fuhuiArr = [];
        return _this;
    }
    Model_QuanMinKH.prototype.getBossArr = function () {
        if (this.bossArr.length <= 0) {
            for (var key in Config.allpartyboss_241) {
                var cfg = Config.allpartyboss_241[key];
                this.bossArr[parseInt(key) - 1] = cfg;
            }
        }
    };
    Model_QuanMinKH.prototype.getXiaoXiongArr = function () {
        if (this.xiaoxiongArr.length <= 0) {
            for (var key in Config.allpartylsxx_241) {
                var cfg = Config.allpartylsxx_241[key];
                this.xiaoxiongArr[parseInt(key) - 1] = cfg;
            }
        }
    };
    Model_QuanMinKH.prototype.getlvbuArr = function () {
        if (this.lvbuArr.length <= 0) {
            for (var key in Config.allpartylvbu_241) {
                var cfg = Config.allpartylvbu_241[key];
                this.lvbuArr[parseInt(key) - 1] = cfg;
            }
        }
    };
    Model_QuanMinKH.prototype.getfuhuiArr = function () {
        if (this.fuhuiArr.length <= 0) {
            for (var key in Config.allpartyddfh_241) {
                var cfg = Config.allpartyddfh_241[key];
                this.fuhuiArr[parseInt(key) - 1] = cfg;
            }
        }
    };
    /** 2571 2581 2591 2601 CG 打开ui信息   */
    Model_QuanMinKH.prototype.CG_QUANMINKUANGHUAN_OPENUI = function (panelId) {
        var ba = new BaseBytes();
        var cmd = 0;
        switch (panelId) {
            case UIConst.QUANMIN_KUANGHUAN_BOSS:
                cmd = 2571;
                break;
            case UIConst.QUANMIN_KUANGHUAN_XIAOXIONG:
                cmd = 2581;
                break;
            case UIConst.QUANMIN_KUANGHUAN_LVBU:
                cmd = 2591;
                break;
            case UIConst.QUANMIN_KUANGHUAN_FUHUI:
                cmd = 2601;
                break;
        }
        this.sendSocket(cmd, ba);
    };
    /**2573 获取奖励 B:奖励序号 */
    Model_QuanMinKH.prototype.CG_QUANMINKUANGHUAN_DRAWREWARD = function (index, panelId) {
        var ba = new BaseBytes();
        var cmd = 0;
        switch (panelId) {
            case UIConst.QUANMIN_KUANGHUAN_BOSS:
                cmd = 2573;
                break;
            case UIConst.QUANMIN_KUANGHUAN_XIAOXIONG:
                cmd = 2583;
                break;
            case UIConst.QUANMIN_KUANGHUAN_LVBU:
                cmd = 2593;
                break;
            case UIConst.QUANMIN_KUANGHUAN_FUHUI:
                cmd = 2603;
                break;
        }
        ba.writeByte(index);
        this.sendSocket(cmd, ba);
    };
    Model_QuanMinKH.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(2572, a.GC_QUANMINKUANGHUAN_OPEN_BOSS, a);
        wsm.regHand(2582, a.GC_QUANMINKUANGHUAN_OPEN_XIAOXIONG, a);
        wsm.regHand(2592, a.GC_QUANMINKUANGHUAN_OPEN_LVBU, a);
        wsm.regHand(2602, a.GC_QUANMINKUANGHUAN_OPEN_FUHUI, a);
        wsm.regHand(2574, a.GC_QUANMINKUANGHUAN_DRAWREWARD_BOSS, a);
        wsm.regHand(2584, a.GC_QUANMINKUANGHUAN_DRAWREWARD_XIAOXIONG, a);
        wsm.regHand(2594, a.GC_QUANMINKUANGHUAN_DRAWREWARD_LVBU, a);
        wsm.regHand(2604, a.GC_QUANMINKUANGHUAN_DRAWREWARD_FUHUI, a);
    };
    /**2604	GC 奖励变化返回 B:奖励编号B:奖励状态I:完成度 */
    Model_QuanMinKH.prototype.GC_QUANMINKUANGHUAN_DRAWREWARD_FUHUI = function (self, data) {
        var id = data.readByte();
        var state = data.readByte();
        var completeVal = data.readInt();
        for (var i = 0; i < self.fuhuiArr.length; i++) {
            var cfg = self.fuhuiArr[i];
            if (cfg.id == id) {
                cfg.state = state;
                break;
            }
        }
        self.completeObj[UIConst.QUANMIN_KUANGHUAN_FUHUI] = completeVal;
        self.fuhuiArr.sort(self.sortQMKH);
        GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
    };
    /**2594	GC 奖励变化返回 B:奖励编号B:奖励状态I:完成度 */
    Model_QuanMinKH.prototype.GC_QUANMINKUANGHUAN_DRAWREWARD_LVBU = function (self, data) {
        var id = data.readByte();
        var state = data.readByte();
        var completeVal = data.readInt();
        for (var i = 0; i < self.lvbuArr.length; i++) {
            var cfg = self.lvbuArr[i];
            if (cfg.id == id) {
                cfg.state = state;
                break;
            }
        }
        self.completeObj[UIConst.QUANMIN_KUANGHUAN_LVBU] = completeVal;
        self.lvbuArr.sort(self.sortQMKH);
        GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
    };
    /**2584	GC 奖励变化返回 B:奖励编号B:奖励状态I:完成度 */
    Model_QuanMinKH.prototype.GC_QUANMINKUANGHUAN_DRAWREWARD_XIAOXIONG = function (self, data) {
        var id = data.readByte();
        var state = data.readByte();
        var completeVal = data.readInt();
        for (var i = 0; i < self.xiaoxiongArr.length; i++) {
            var cfg = self.xiaoxiongArr[i];
            if (cfg.id == id) {
                cfg.state = state;
                break;
            }
        }
        self.completeObj[UIConst.QUANMIN_KUANGHUAN_XIAOXIONG] = completeVal;
        self.xiaoxiongArr.sort(self.sortQMKH);
        GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
    };
    /**2574	GC 奖励变化返回 B:奖励编号B:奖励状态I:完成度 */
    Model_QuanMinKH.prototype.GC_QUANMINKUANGHUAN_DRAWREWARD_BOSS = function (self, data) {
        var id = data.readByte();
        var state = data.readByte();
        var completeVal = data.readInt();
        for (var i = 0; i < self.bossArr.length; i++) {
            var cfg = self.bossArr[i];
            if (cfg.id == id) {
                cfg.state = state;
                break;
            }
        }
        self.completeObj[UIConst.QUANMIN_KUANGHUAN_BOSS] = completeVal;
        self.bossArr.sort(self.sortQMKH);
        GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
    };
    /**2602 GC 打开ui信息 [B:奖励序号B:奖励状态]I:完成度  */
    Model_QuanMinKH.prototype.GC_QUANMINKUANGHUAN_OPEN_FUHUI = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var id = data.readByte();
            var state = data.readByte();
            for (var j = 0; j < self.fuhuiArr.length; j++) {
                var cfg = self.fuhuiArr[j];
                if (cfg.id == id) {
                    cfg.state = state;
                    break;
                }
            }
        }
        var completeVal = data.readInt();
        self.completeObj[UIConst.QUANMIN_KUANGHUAN_FUHUI] = completeVal;
        self.fuhuiArr.sort(self.sortQMKH);
        GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
    };
    /**2592 GC 打开ui信息 [B:奖励序号B:奖励状态]I:完成度  */
    Model_QuanMinKH.prototype.GC_QUANMINKUANGHUAN_OPEN_LVBU = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var id = data.readByte();
            var state = data.readByte();
            for (var j = 0; j < self.lvbuArr.length; j++) {
                var cfg = self.lvbuArr[j];
                if (cfg.id == id) {
                    cfg.state = state;
                    break;
                }
            }
        }
        var completeVal = data.readInt();
        self.completeObj[UIConst.QUANMIN_KUANGHUAN_LVBU] = completeVal;
        self.lvbuArr.sort(self.sortQMKH);
        GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
    };
    /**2582 GC 打开ui信息 [B:奖励序号B:奖励状态] I:完成度 */
    Model_QuanMinKH.prototype.GC_QUANMINKUANGHUAN_OPEN_XIAOXIONG = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var id = data.readByte();
            var state = data.readByte();
            for (var j = 0; j < self.xiaoxiongArr.length; j++) {
                var cfg = self.xiaoxiongArr[j];
                if (cfg.id == id) {
                    cfg.state = state;
                    break;
                }
            }
        }
        var completeVal = data.readInt();
        self.completeObj[UIConst.QUANMIN_KUANGHUAN_XIAOXIONG] = completeVal;
        self.xiaoxiongArr.sort(self.sortQMKH);
        GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
    };
    /**2572 GC 打开ui信息 [B:奖励序号B:奖励状态] I:完成度 */
    Model_QuanMinKH.prototype.GC_QUANMINKUANGHUAN_OPEN_BOSS = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var id = data.readByte();
            var state = data.readByte();
            for (var j = 0; j < self.bossArr.length; j++) {
                var cfg = self.bossArr[j];
                if (cfg.id == id) {
                    cfg.state = state;
                    break;
                }
            }
        }
        var completeVal = data.readInt();
        self.completeObj[UIConst.QUANMIN_KUANGHUAN_BOSS] = completeVal;
        self.bossArr.sort(self.sortQMKH);
        GGlobal.control.notify(Enum_MsgType.QUANMIN_KUANGHUAN);
    };
    Model_QuanMinKH.prototype.sortQMKH = function (a, b) {
        if (a.state == b.state) {
            return a.id - b.id;
        }
        else {
            if (a.state == 1) {
                return -1;
            }
            else if (b.state == 1) {
                return 1;
            }
            else {
                return a.state - b.state;
            }
        }
    };
    return Model_QuanMinKH;
}(BaseModel));
__reflect(Model_QuanMinKH.prototype, "Model_QuanMinKH");
