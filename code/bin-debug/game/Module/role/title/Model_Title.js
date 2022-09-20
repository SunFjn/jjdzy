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
var Model_Title = (function (_super) {
    __extends(Model_Title, _super);
    function Model_Title() {
        var _this = _super.call(this) || this;
        /**当前佩戴的称号*/
        _this.curID = 0;
        /**当前佩戴的称号*/
        _this.myTitles = [];
        /**当前激活称号的数量统计 type: count*/
        _this.countObj = {};
        /**战力*/
        _this.totalPower = 0;
        return _this;
    }
    Model_Title.prototype.initlib = function () {
        if (this.lib)
            return;
        this.mappingObj = {};
        var leixing;
        this.lib = {};
        var vo;
        var lb = Config.chenghao_702;
        for (var i in lb) {
            leixing = lb[i]["belong"];
            vo = new VoTitle();
            vo.initLib(lb[i]);
            if (!this.lib[leixing + ""])
                this.lib[leixing + ""] = [];
            this.lib[leixing + ""].push(vo);
            this.setCount(leixing, 0);
            this.mappingObj[vo.id] = vo;
        }
    };
    Object.defineProperty(Model_Title.prototype, "mappingObj", {
        get: function () {
            if (!this._mappingObj) {
                this.initlib();
            }
            return this._mappingObj;
        },
        set: function (val) {
            this._mappingObj = val;
        },
        enumerable: true,
        configurable: true
    });
    //统计更新的称号数量
    Model_Title.prototype.setCount = function (type, opt) {
        if (!this.countObj[type])
            this.countObj[type] = 0;
        this.countObj[type] += opt;
    };
    Model_Title.prototype.sortArr = function () {
        var temp = this.lib;
        for (var i in temp) {
            var childArr = temp[i];
            childArr = childArr.sort(function (a, b) {
                return a.getSortIndex() < b.getSortIndex() ? -1 : 1;
            });
        }
    };
    Model_Title.prototype.getTotalPower = function () {
        var totalPower = 0;
        var source = this.lib;
        for (var j in source) {
            var arr = source[j];
            for (var i in arr) {
                var vo = arr[i];
                totalPower += vo.actPower;
            }
        }
        return totalPower;
    };
    Model_Title.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(502, this.GC_INFO_502, this);
        mgr.regHand(504, this.GC_WEAR_504, this);
        mgr.regHand(506, this.GC_TITLE_506, this);
        mgr.regHand(508, this.GC_UPDATE_508, this);
        mgr.regHand(510, this.GC_ACTIVE_510, this);
        mgr.regHand(512, this.CG_NEWTITLE_512, this);
        mgr.regHand(514, this.GC_LEVELUP_514, this);
    };
    /**
     * 501
     * CG请求打开称号界面
      */
    Model_Title.prototype.CG_INFO_501 = function () {
        this.initlib();
        var ba = this.getBytes();
        this.sendSocket(501, ba);
    };
    /**
     * 502
     * GC返回称号界面信息 I:当前穿戴的称号id[I:称号idI:时效称号的剩余时间S:称号等级B:称号状态（ 0：未激活、1：可激活、2：已激活、3：已穿戴）]已拥有的称号id集合
    */
    Model_Title.prototype.GC_INFO_502 = function (self, bytes) {
        self.initlib();
        self.curID = bytes.readInt();
        Model_player.voMine.setTitle(self.curID);
        var l = bytes.readShort();
        self.countObj = {};
        self.totalPower = 0;
        for (var i = 0; i < l; i++) {
            var id = bytes.readInt();
            var vo = self.mappingObj[id];
            vo.time = bytes.readInt() * 1000 + Model_GlobalMsg.getServerTime();
            vo.level = bytes.readShort();
            vo.setState(bytes.readByte());
            self.setCount(vo.ttype, 1);
            self.totalPower += vo.power;
        }
        self.sortArr();
        GGlobal.control.notify(Enum_MsgType.TITLE_UPDATE);
        GGlobal.control.notify(Enum_MsgType.TITLE_OPENUI);
    };
    /**
         * 503
         * CG请求操作称号 B:1.穿戴 2.脱下I:称号id
          */
    Model_Title.prototype.CG_WEAR_503 = function (tp, id) {
        var ba = this.getBytes();
        ba.writeByte(tp);
        ba.writeInt(id);
        this.sendSocket(503, ba);
    };
    /**
     * 504
     * GC返回操作称号结果 I:称号idB:操作：1.穿 2.脱
    */
    Model_Title.prototype.GC_WEAR_504 = function (self, bytes) {
        var rid = bytes.readInt();
        var ropt = bytes.readByte();
        if (ropt == 1) {
            if (self.curID != 0) {
                var vo = self.mappingObj[self.curID];
                vo.setState(2);
            }
            self.sortArr();
            self.curID = rid;
            var vo = self.mappingObj[rid];
            vo.setState(3);
        }
        else {
            var vo = self.mappingObj[rid];
            vo.setState(2);
            self.curID = 0;
        }
        Model_player.voMine.setTitle(self.curID);
        GGlobal.control.notify(Enum_MsgType.TITLE_UPDATE);
    };
    /**
     * 506
     * 登录时后端推送角色当前佩戴的称号id I:当前称号id
    */
    Model_Title.prototype.GC_TITLE_506 = function (self, bytes) {
        self.curID = bytes.readInt();
        Model_player.voMine.setTitle(self.curID);
    };
    /**
     * 508
     * GC通知前端称号过期 I:称号id
    */
    Model_Title.prototype.GC_UPDATE_508 = function (self, bytes) {
        var id = bytes.readInt();
        var vo = self.mappingObj[id];
        vo.setState(0);
        self.sortArr();
        self.setCount(vo.ttype, -1);
        if (self.curID == id) {
            self.curID = 0;
            Model_player.voMine.setTitle(self.curID);
        }
        ViewCommonWarn.text(vo.name + "已过期");
        GGlobal.control.notify(Enum_MsgType.TITLE_UPDATE);
    };
    /**
     *  509
     * 激活称号（永久类型称号） I:称号id
     */
    Model_Title.prototype.CG_ACTIVE_509 = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(509, ba);
    };
    /**
     * 510
     * 激活称号结果 B:0:失败，1：成I:失败：错误码(1:非永久称号无法激活；2：未获得称号)，成功：称号id
    */
    Model_Title.prototype.GC_ACTIVE_510 = function (self, bytes) {
        var ret = bytes.readByte();
        var id = bytes.readInt();
        if (ret == 1) {
            var vo = self.mappingObj[id];
            self.curID = id;
            vo.setState(2);
            self.sortArr();
            Model_player.voMine.setTitle(self.curID);
            GGlobal.control.notify(Enum_MsgType.TITLE_UPDATE);
            ViewCommonWarn.text("激活" + vo.name);
            if (id == 109) {
                self.CG_WEAR_503(id, 1);
            }
        }
        else {
            if (id == 1)
                ViewCommonWarn.text("无法激活非永久称号");
            else if (id == 2)
                ViewCommonWarn.text("已激活此称号");
            else if (id == 3)
                ViewCommonWarn.text("道具不足");
        }
    };
    /**
 *  512
 * 获得称号 I:称号idS:等级
 */
    Model_Title.prototype.CG_NEWTITLE_512 = function (self, bytes) {
        var id = bytes.readInt();
        var lv = bytes.readShort();
        var vo = self.mappingObj[id];
        vo.level = lv;
        ViewCommonWarn.text("激活" + vo.name);
        GGlobal.control.notify(Enum_MsgType.TITLE_UPDATE);
    };
    /**
     *  513
     * 升级称号（永久类型称号） I:称号id
     */
    Model_Title.prototype.CG_LEVELUP_513 = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(513, ba);
    };
    /**
     * 514
     * 称号升级 B:0:失败，1：成功I:失败：错误码（1：未获得该称号，2：已达最高等级，3：非可进价类型称号，4：材料不足），成功：称号idS:称号等级
    */
    Model_Title.prototype.GC_LEVELUP_514 = function (self, bytes) {
        var ret = bytes.readByte();
        var id = bytes.readInt();
        if (ret == 0) {
            if (id == 1) {
                ViewCommonWarn.text("未获得称号");
            }
            else if (id == 2) {
                ViewCommonWarn.text("已达最高等级");
            }
            else if (id == 3) {
                ViewCommonWarn.text("该称号不可进阶");
            }
            else if (id == 4) {
                ViewCommonWarn.text("材料不足");
            }
            return;
        }
        ViewCommonWarn.text("进阶成功");
        var lv = bytes.readShort();
        var vo = self.mappingObj[id];
        vo.level = lv;
        GGlobal.control.notify(Enum_MsgType.TITLE_UPDATE);
    };
    return Model_Title;
}(BaseModel));
__reflect(Model_Title.prototype, "Model_Title");
