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
var Model_GuanXian = (function (_super) {
    __extends(Model_GuanXian, _super);
    function Model_GuanXian() {
        var _this = _super.call(this) || this;
        /**官职索引*/ _this.guanzhi = 0;
        /**功勋*/ _this.gongxun = 0;
        _this._maxL = 0;
        return _this;
    }
    Model_GuanXian.getJiangXianStrNoJie = function (idx) {
        var r;
        if (idx == 0)
            r = "平民";
        else {
            var lib = Config.guanxian_701[idx];
            var color = Color.getColorStr(lib.pinzhi);
            r = "<font color='" + color + "'>" + lib.name + "</font>";
        }
        return r;
    };
    Model_GuanXian.getJiangXianStr = function (idx) {
        var r;
        if (idx == 0)
            r = "【零阶】平民";
        else {
            var lib = Config.guanxian_701[idx];
            var color = Color.getColorStr(lib.pinzhi);
            r = "<font color='" + color + "'>【" + ConfigHelp.NumberToChinese(idx - 1) + "阶】" + "" + lib.name + "</font>";
        }
        return r;
    };
    Model_GuanXian.getJiangXianStr1 = function (idx) {
        var r;
        if (idx == 0)
            r = "【零阶·平民】";
        else {
            var lib = Config.guanxian_701[idx];
            var color = Color.getColorStr(lib.pinzhi);
            r = "<font color='" + color + "'>【" + ConfigHelp.NumberToChinese(idx - 1) + "阶】" + "" + lib.name + "</font>";
        }
        return r;
    };
    Object.defineProperty(Model_GuanXian.prototype, "maxL", {
        get: function () {
            if (this._maxL == 0) {
                var lib = Config.guanxian_701;
                for (var key in lib) {
                    this._maxL++;
                }
            }
            return this._maxL;
        },
        enumerable: true,
        configurable: true
    });
    Model_GuanXian.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(154, this.scGuanxian, this);
        mgr.regHand(156, this.scLvlUpGX, this);
    };
    /**153 CG 获取官衔  */
    Model_GuanXian.prototype.csGuanxian = function () {
        var ba = this.getBytes();
        this.sendSocket(153, ba);
    };
    /**154GC 获取官衔返回 B:官衔索引I:功勋*/
    Model_GuanXian.prototype.scGuanxian = function (self, bytes) {
        self.guanzhi = bytes.readByte();
        Model_player.voMine.setJiangXian(self.guanzhi);
        self.gongxun = bytes.readInt();
        GGlobal.control.notify(Enum_MsgType.MSG_GXINIT);
        GGlobal.control.notify(Enum_MsgType.MSG_GXUPDATE);
    };
    /**155 CG 升级官衔   */
    Model_GuanXian.prototype.csLvlUpGX = function () {
        var ba = this.getBytes();
        this.sendSocket(155, ba);
    };
    /**156GC 升官衔返回 B:0成功 1失败B:当前官衔I:功勋*/
    Model_GuanXian.prototype.scLvlUpGX = function (self, bytes) {
        var ret = bytes.readByte();
        self.guanzhi = bytes.readByte();
        Model_player.voMine.setJiangXian(self.guanzhi);
        self.gongxun = bytes.readInt();
        if (ret == 0) {
            ViewCommonWarn.text("升级成功");
            GGlobal.control.notify(Enum_MsgType.MSG_GXUPDATE);
        }
        else
            ViewCommonWarn.text("升级失败");
    };
    return Model_GuanXian;
}(BaseModel));
__reflect(Model_GuanXian.prototype, "Model_GuanXian");
