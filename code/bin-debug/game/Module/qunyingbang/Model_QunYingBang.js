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
var Model_QunYingBang = (function (_super) {
    __extends(Model_QunYingBang, _super);
    function Model_QunYingBang() {
        var _this = _super.call(this) || this;
        /**
         *	I-[I-L-U-I-I-I]
         * 排行榜数据返回 I:自己的排名[I:排名L:玩家idU:玩家名称I:玩家积分I:玩家头像I:玩家头像框]排行数据
        */
        _this.lastTime = 0;
        return _this;
    }
    // rankLastDta;
    // myLastRank;
    // myLastScore;
    Model_QunYingBang.getLibByID = function (rk) {
        var r;
        var l = Config.qyrank_235;
        for (var i in l) {
            var cds = JSON.parse(l[i].rank)[0];
            if (rk >= cds[0] && rk <= cds[1]) {
                r = l[i];
                break;
            }
        }
        return r;
    };
    Model_QunYingBang.prototype.listenServ = function (m) {
        var s = this;
        s.socket = m;
        m.regHand(2192, s.GC_OPEN, s);
        m.regHand(2194, s.GC_LINGQU, s);
        m.regHand(2196, s.GC_SHUAXIN, s);
        m.regHand(2198, s.GC_LAST_2198, s);
    };
    Model_QunYingBang.prototype.CG_OPEN = function () {
        this.sendSocket(2191, this.getBytes());
    };
    /**
     *B-I-I-[I-L-U-I-I-I]-I
     * 群英榜界面数据 B:周几I:自己排名I:积分[I:排名L:玩家idU:玩家名I:积分I:头像I:头像框]排行数据I:已领取的积分奖励项id
    */
    Model_QunYingBang.prototype.GC_OPEN = function (m, d) {
        m.day = d.readByte();
        m.myRank = d.readInt();
        m.score = d.readInt();
        var len = d.readShort();
        m.rankDta = [];
        for (var i = 0; i < 100; i++) {
            if (i < len) {
                m.rankDta.push([d.readInt(), d.readLong(), d.readUTF(), d.readInt(), d.readInt(), d.readInt()]);
            }
            else {
                m.rankDta.push([i + 1, 0, "虚位以待", 0, 0, 0]);
            }
        }
        m.awardID = d.readInt();
        GGlobal.control.notify(Enum_MsgType.QUNYINGBANG);
    };
    //打开上期排名界面
    Model_QunYingBang.prototype.CG_LAST_2197 = function () {
        this.sendSocket(2197, this.getBytes());
    };
    /**
     * 打开上期排名界面返回 [I:排名L:玩家idU:玩家名I:积分I:头像I:头像框]上期排行数据I:自己排名,不在榜上为0I:积分
    */
    Model_QunYingBang.prototype.GC_LAST_2198 = function (m, d) {
        var len = d.readShort();
        m.rankDta = [];
        for (var i = 0; i < 100; i++) {
            if (i < len) {
                m.rankDta.push([d.readInt(), d.readLong(), d.readUTF(), d.readInt(), d.readInt(), d.readInt()]);
            }
            else {
                m.rankDta.push([i + 1, 0, "虚位以待", 0, 0, 0]);
            }
        }
        m.myRank = d.readInt();
        m.score = d.readInt();
        m.day = d.readByte();
        GGlobal.control.notify(Enum_MsgType.QUNYINGBANG_LAST);
    };
    Model_QunYingBang.prototype.CG_LINGQU = function (I) {
        var ba = this.getBytes();
        ba.writeInt(I);
        this.sendSocket(2193, ba);
    };
    /**
     *	B-I
     * 领取积分奖励结果 B:0：失败，1：成功I:失败：错误码，成功：奖励项id
    */
    Model_QunYingBang.prototype.GC_LINGQU = function (m, d) {
        var r = d.readByte();
        var i = d.readInt();
        if (r == 1) {
            m.awardID = i;
            GGlobal.control.notify(Enum_MsgType.QUNYINGBANG);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    Model_QunYingBang.prototype.CG_SHUAXIN = function () {
        if (egret.getTimer() - this.lastTime > 0) {
            this.sendSocket(2195, this.getBytes());
        }
        else {
            ViewCommonWarn.text("2分钟内只可刷新一次");
        }
    };
    Model_QunYingBang.prototype.GC_SHUAXIN = function (m, d) {
        m.lastTime = egret.getTimer() + 120000;
        m.myRank = d.readInt();
        var len = d.readShort();
        m.rankDta = [];
        for (var i = 0; i < 100; i++) {
            if (i < len) {
                m.rankDta.push([d.readInt(), d.readLong(), d.readUTF(), d.readInt(), d.readInt(), d.readInt()]);
            }
            else {
                m.rankDta.push([i + 1, 0, "虚位以待", 0, 0, 0]);
            }
        }
        GGlobal.control.notify(Enum_MsgType.QUNYINGBANG);
    };
    return Model_QunYingBang;
}(BaseModel));
__reflect(Model_QunYingBang.prototype, "Model_QunYingBang");
