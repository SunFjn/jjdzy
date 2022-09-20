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
var Model_bwXianShi = (function (_super) {
    __extends(Model_bwXianShi, _super);
    //宝物现世 by xhm
    function Model_bwXianShi() {
        return _super.call(this) || this;
    }
    Model_bwXianShi.prototype.listenServ = function (mgr) {
        var s = this;
        s.socket = mgr;
        mgr.regHand(4000, s.GC_LOGINDATA_4000, s);
        mgr.regHand(4002, s.GC_GETAWARDS_4002, s);
    };
    //战斗结束通知
    Model_bwXianShi.prototype.CG_GETAWARDS_4001 = function () {
        var ba = this.getBytes();
        ba.writeByte(1);
        this.sendSocket(4001, ba);
    };
    /**登录发需要用的数据 I:下次显示宝物的时间B:今天可挑战次数*/
    Model_bwXianShi.prototype.GC_LOGINDATA_4000 = function (s, d) {
        s.batTime = d.readInt();
        s.batCount = d.readByte();
        s.bwXianShi();
    };
    Model_bwXianShi.prototype.bwXianShi = function () {
        if (!ModuleManager.isOpen(UIConst.BW_XIANSHI)) {
            return;
        }
        var s = GGlobal.modelbwXianShi;
        if (s.batCount > 0) {
            Timer.instance.listen(s.updateTime, s, 1000);
        }
        else {
            Timer.instance.remove(s.updateTime, s);
        }
    };
    /**战斗结束通知 B:结果 1成功*/
    Model_bwXianShi.prototype.GC_GETAWARDS_4002 = function (s, d) {
        var res = d.readByte();
        Model_bwXianShi.dropArr = [];
        if (res == 1) {
            var len = d.readShort();
            Model_bwXianShi.dropArr = [];
            for (var i = 0; i < len; i++) {
                var type = d.readByte();
                var id = d.readInt();
                var count = d.readInt();
                Model_bwXianShi.dropArr.push([type, id, count]);
            }
            s.serGainText();
        }
        GGlobal.control.notify(Enum_MsgType.BAOWU_XIANSHI_DROP);
    };
    Model_bwXianShi.prototype.serGainText = function () {
        for (var i = 0; i < Model_bwXianShi.dropArr.length; i++) {
            var d = Model_bwXianShi.dropArr[i];
            var type = d[0];
            var id = d[1];
            var count = d[2];
            if (Model_BaoWu.isBaoWuJHItem(id)) {
                Model_BaoWu.mustAndShow(id);
            }
        }
    };
    Model_bwXianShi.prototype.updateTime = function () {
        var s = this;
        var t = Model_GlobalMsg.getServerTime() / 1000 - s.batTime;
        if (t >= 0) {
            Timer.instance.remove(s.updateTime, s);
            GGlobal.mainUICtr.addTipBTN(UIConst.BW_XIANSHI);
        }
    };
    return Model_bwXianShi;
}(BaseModel));
__reflect(Model_bwXianShi.prototype, "Model_bwXianShi");
