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
var Model_SHXunBao = (function (_super) {
    __extends(Model_SHXunBao, _super);
    function Model_SHXunBao() {
        var _this = _super.call(this) || this;
        _this.xbQuan = 0;
        _this.xbCurGe = 0;
        _this.xbArr = [];
        _this.xbRewArr = [];
        _this.xbMuBiaoArr = [];
        _this.xbRankTp = 0;
        _this.xbRankMy = 0;
        _this.xbQuanMy = 0;
        _this.xbRankArr = [];
        return _this;
    }
    /**寻宝 打开界面*/
    Model_SHXunBao.prototype.CG_XUNBAO_OPENUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(5331, ba);
    };
    /**寻宝 抽奖*/
    Model_SHXunBao.prototype.CG_XUNBAO_ROLL = function () {
        var ba = new BaseBytes();
        this.sendSocket(5333, ba);
    };
    /**获取排行榜数据 B:类型：1：本期排行，2：上期排行*/
    Model_SHXunBao.prototype.CG_XUNBAO_RANK = function (type) {
        if (type === void 0) { type = 1; }
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(5335, ba);
    };
    /**寻宝 目标奖励*/
    Model_SHXunBao.prototype.CG_XUNBAO_GOAL = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(5337, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_SHXunBao.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        //寻宝
        wsm.regHand(5332, a.GC_XUNBAO_OPENUI, a);
        wsm.regHand(5334, a.GC_XUNBAO_ROLL, a);
        wsm.regHand(5336, a.GC_XUNBAO_RANK, a);
        wsm.regHand(5338, a.GC_XUNBAO_GOAL, a);
    };
    /**返回界面信息 I:当前圈数I:当前所在格子[B:类型I:道具idI:道具数量]奖励数据[I:奖励idI:目标奖励领取数量，-1已领完，0未达到，2剩余领取次数]目标奖励数据*/
    Model_SHXunBao.prototype.GC_XUNBAO_OPENUI = function (s, data) {
        s.xbQuan = data.readInt();
        s.xbCurGe = data.readInt() - 1;
        s.xbRankMy = data.readInt();
        s.xbArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var type = data.readByte();
            var id = data.readInt();
            var ct = data.readInt();
            var arr = [type, id, ct];
            s.xbArr.push(arr);
        }
        len = data.readShort();
        s.xbMuBiaoArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.id = data.readInt();
            v.status = data.readInt();
            s.xbMuBiaoArr.push(v);
        }
        GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO);
        GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RED);
    };
    /**掷骰子结果 B:结果：0：失败，1：成功I:当前圈数I:当前所在格子[B:类型I:道具idI:道具数量]获得的奖励[B:类型I:道具idI:道具数量]新一轮的奖励数据
     * I:目标奖励领取数量，-1已领完，0未达到，2剩余领取次数I:奖励id*/
    Model_SHXunBao.prototype.GC_XUNBAO_ROLL = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.xbQuan = data.readInt();
            s.xbCurGe = data.readInt() - 1;
            s.xbRankMy = data.readInt();
            var len = data.readShort();
            s.xbRewArr = [];
            for (var i = 0; i < len; i++) {
                var type = data.readByte();
                var id_1 = data.readInt();
                var ct = data.readInt();
                s.xbRewArr.push([type, id_1, ct]);
            }
            len = data.readShort();
            s.xbArr = [];
            for (var i = 0; i < len; i++) {
                var type = data.readByte();
                var id_2 = data.readInt();
                var ct = data.readInt();
                s.xbArr.push([type, id_2, ct]);
            }
            var state = data.readInt();
            var id = data.readInt();
            for (var i = 0; i < s.xbMuBiaoArr.length; i++) {
                if (s.xbMuBiaoArr[i].id == id) {
                    s.xbMuBiaoArr[i].status = state;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_ROLL);
            GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RED);
        }
        else {
            ViewCommonWarn.text("寻宝失败");
        }
    };
    /**返回排行数据 I:个人排名I:个人圈数[I:排名L:角色idU:角色名I:圈数]排行数据*/
    Model_SHXunBao.prototype.GC_XUNBAO_RANK = function (s, data) {
        s.xbRankTp = data.readByte();
        s.xbRankMy = data.readInt();
        s.xbQuanMy = data.readInt();
        s.xbRankArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var rank = data.readInt();
            var pId = data.readLong();
            var pName = data.readUTF();
            var quan = data.readInt();
            s.xbRankArr.push({ rank: rank, pId: pId, pName: pName, quan: quan });
        }
        GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RANK);
        if (s.xbRankTp == 1) {
            GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RED);
        }
    };
    /*领取奖励结果 B:0：失败，1：成功I:失败（1:未达条件，2：已领取），成功：奖励idI:目标奖励领取数量，-1已领完，0未达到，2剩余领取次数*/
    Model_SHXunBao.prototype.GC_XUNBAO_GOAL = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var id = data.readInt();
            var state = data.readInt();
            for (var i = 0; i < s.xbMuBiaoArr.length; i++) {
                if (s.xbMuBiaoArr[i].id == id) {
                    s.xbMuBiaoArr[i].status = state;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO);
            GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XUNBAO_RED);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    Model_SHXunBao.xbRankCfgArr = function () {
        if (Model_SHXunBao._xbRankCfg == null) {
            Model_SHXunBao._xbRankCfg = [];
            for (var keys in Config.ssshxbrank_268) {
                var cfg = Config.ssshxbrank_268[keys];
                var rankArr = ConfigHelp.SplitStr(cfg.rank);
                var rank1 = Number(rankArr[0][0]);
                var rank2 = Number(rankArr[0][1]);
                for (var i = rank1; i <= rank2; i++) {
                    Model_SHXunBao._xbRankCfg[i - 1] = cfg;
                }
            }
        }
        return Model_SHXunBao._xbRankCfg;
    };
    Model_SHXunBao.prototype.isMuBiaoNotice = function (arr) {
        if (!arr) {
            return false;
        }
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            if (v.status > 0) {
                return true;
            }
        }
        return false;
    };
    //寻宝
    Model_SHXunBao.XB_ITEM = 410053;
    return Model_SHXunBao;
}(BaseModel));
__reflect(Model_SHXunBao.prototype, "Model_SHXunBao");
