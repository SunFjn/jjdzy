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
var Model_CaiShenSongLi = (function (_super) {
    __extends(Model_CaiShenSongLi, _super);
    function Model_CaiShenSongLi() {
        var _this = _super.call(this) || this;
        _this.lottery = 0;
        _this.recharge = 0;
        _this.resultList = [];
        return _this;
    }
    /**10771 抽奖  */
    Model_CaiShenSongLi.prototype.CG_TURN = function () {
        var ba = new BaseBytes();
        this.sendSocket(10771, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_CaiShenSongLi.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(10770, a.GC_OPEN_UI, a);
        wsm.regHand(10772, a.GC_TURN, a);
    };
    /**10770 打开界面返回 I:抽奖次数I:再充值元宝数(可再获得抽奖次数)*/
    Model_CaiShenSongLi.prototype.GC_OPEN_UI = function (s, data) {
        s.lottery = data.readInt();
        s.recharge = data.readInt();
        GGlobal.control.notify(UIConst.ACTCOM_CSSL);
    };
    /**10772 抽奖返回 B:状态：1：成功，2：抽奖次数不足[B:类型I:数量I:数量B:是否大奖（1：是，0：否）]获得奖励 */
    Model_CaiShenSongLi.prototype.GC_TURN = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.lottery--;
            s.resultList.length = 0;
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var t_itemVO = ConfigHelp.parseItemBa(data);
                var arg5 = data.readByte();
                t_itemVO.extra = arg5 == 1 ? 5 : 0;
                s.resultList.push(t_itemVO);
            }
            s.reddotCheckCSSL();
            GGlobal.control.notify(UIConst.ACTCOM_CSSL, s.resultList);
        }
        else {
            ViewCommonWarn.text("抽奖次数不足");
        }
    };
    /** 检查财神送礼红点 */
    Model_CaiShenSongLi.prototype.reddotCheckCSSL = function () {
        var sf = GGlobal.reddot;
        var bol = false;
        if (this.lottery > 0) {
            bol = true;
        }
        sf.setCondition(UIConst.ACTCOM_CSSL, 0, bol);
        sf.notifyMsg(UIConst.ACTCOM_CSSL);
    };
    return Model_CaiShenSongLi;
}(BaseModel));
__reflect(Model_CaiShenSongLi.prototype, "Model_CaiShenSongLi");
