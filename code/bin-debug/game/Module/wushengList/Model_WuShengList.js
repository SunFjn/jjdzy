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
var Model_WuShengList = (function (_super) {
    __extends(Model_WuShengList, _super);
    function Model_WuShengList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_WuShengList.getRank = function () {
        Model_WuShengList.listArr = [];
        for (var i = 1; i < 8; i++) {
            var cfg = Config.ws_238[i];
            Model_WuShengList.listArr.push(cfg);
        }
    };
    /**2301 CG 打开ui B:打开某个榜  */
    Model_WuShengList.prototype.CG_OPEN_WUSHENG_LIST = function (index) {
        var ba = new BaseBytes();
        ba.writeByte(index);
        this.sendSocket(2301, ba);
    };
    /**2303 GC 领取奖励 I:奖励序号  */
    Model_WuShengList.prototype.CG_WUSHENG_LIST_DRAW = function (index) {
        var ba = new BaseBytes();
        ba.writeInt(index);
        this.sendSocket(2303, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_WuShengList.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(2302, this.GC_OPEN_WUSHENG_LIST, this);
        wsm.regHand(2304, this.GC_WUSHENG_LIST_DRAW, this);
    };
    /**2304 GC 奖励发生变化 I:奖励序号B:奖励状态0不能领1可以领2已经领完  */
    Model_WuShengList.prototype.GC_WUSHENG_LIST_DRAW = function (self, data) {
        var arr = data.readFmt(["I", "B"]);
        var arr1 = Model_WuShengList.drawArr;
        for (var i = 0; i < arr1.length; i++) {
            if (arr[0] == arr1[i][0]) {
                arr1[i][1] = arr[1];
                break;
            }
        }
        GGlobal.control.notify(Enum_MsgType.WUSHENG_LIST_DRAW, { state: arr[1], targetId: arr[0] });
    };
    /**2302 GC 打开ui信息 L:我的x榜战力I:我的x榜排名[I:奖励序号B:奖励领取情况][L:玩家idU:玩家姓名L:玩家战力B:排名]  */
    Model_WuShengList.prototype.GC_OPEN_WUSHENG_LIST = function (self, data) {
        Model_WuShengList.drawArr = [];
        Model_WuShengList.rankArr = [];
        Model_WuShengList.myRank = 0;
        Model_WuShengList.power = data.readLong();
        Model_WuShengList.myRank = data.readInt();
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_WuShengList.drawArr.push(data.readFmt(["I", "B"]));
        }
        Model_WuShengList.drawArr.sort(self.sortReward);
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var arr = data.readFmt(["L", "U", "L", "B"]);
            Model_WuShengList.rankArr[arr[3] - 1] = arr;
        }
        GGlobal.control.notify(Enum_MsgType.WUSHENG_LIST);
    };
    Model_WuShengList.prototype.sortReward = function (a, b) {
        return a[0] - b[0];
    };
    Model_WuShengList.power = 0;
    Model_WuShengList.drawArr = [];
    Model_WuShengList.rankArr = [];
    Model_WuShengList.listArr = [];
    Model_WuShengList.myRank = 0;
    return Model_WuShengList;
}(BaseModel));
__reflect(Model_WuShengList.prototype, "Model_WuShengList");
