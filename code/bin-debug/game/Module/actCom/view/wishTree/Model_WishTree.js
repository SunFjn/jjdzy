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
var Model_WishTree = (function (_super) {
    __extends(Model_WishTree, _super);
    function Model_WishTree() {
        var _this = _super.call(this) || this;
        /** 是否播放抽奖动画 */
        _this.isPlayMc7219 = true;
        _this.isPlayMc7751 = true;
        /** 抽奖正在播放动画的状态 */
        _this.isPlayingMc = false;
        _this.type = 0;
        _this.targetMap = {};
        _this.voArr = [];
        _this.wish = 0;
        _this.systemId = 0;
        _this.resultList = [];
        _this.rankArr = [];
        _this.myRank = 0;
        _this.myWish = 0;
        _this.targetArr = [];
        _this.targetCount = 0;
        return _this;
    }
    /**10041 许愿 B:许愿类型 1为许愿1次 2为许愿10次I:系统id  */
    Model_WishTree.prototype.CG_DRAW = function (type, systemId) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeInt(systemId);
        this.sendSocket(10041, ba);
        this.type = type;
    };
    /**10043 领取奖励 I:目标idI:系统id  */
    Model_WishTree.prototype.CG_GET_AWARD = function (target, systemId) {
        var ba = new BaseBytes();
        ba.writeInt(target);
        ba.writeInt(systemId);
        this.sendSocket(10043, ba);
    };
    /**10045 打开排行榜  */
    Model_WishTree.prototype.CG_OPEN_RANKUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(10045, ba);
    };
    /**10047 打开目标页面 I:系统id  */
    Model_WishTree.prototype.CG_OPEN_TARGETUI = function (systemId) {
        var ba = new BaseBytes();
        ba.writeInt(systemId);
        this.sendSocket(10047, ba);
    };
    /**10049 领取页面目标奖励 I:配置表idI:系统id  */
    Model_WishTree.prototype.CG_GET_TARGETAWARD = function (id, systemId) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        ba.writeInt(systemId);
        this.sendSocket(10049, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_WishTree.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(10040, a.GC_OPEN_UI, a);
        wsm.regHand(10042, a.GC_DRAW, a);
        wsm.regHand(10044, a.GC_GET_AWARD, a);
        wsm.regHand(10046, a.GC_OPEN_RANKUI, a);
        wsm.regHand(10048, a.GC_OPEN_TARGETUI, a);
        wsm.regHand(10050, a.GC_GET_TARGETAWARD, a);
    };
    /**10040 打开界面返回 [I:目标idI:奖励状态 -1已领取 0条件不符 >0可领取次数]目标列表I:许愿次数*/
    Model_WishTree.prototype.GC_OPEN_UI = function (s, data) {
        s.voArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var status_1 = data.readInt();
            s.targetMap[id] = status_1;
        }
        s.wish = data.readInt();
        GGlobal.control.notify(UIConst.WISHTREE_ACT);
        GGlobal.control.notify(UIConst.WISHTREE_SYSTEM);
    };
    /**10042 许愿返回 B:状态 1成功 2元宝不足[B:道具类型I:道具idI:道具数量B:是否大奖]道具列表[I:目标idI:状态 -1已领取 0条件不符 >0可领取次数]目标列表I:许愿次数I:系统id*/
    Model_WishTree.prototype.GC_DRAW = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.resultList.length = 0;
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var t_itemVO = ConfigHelp.parseItemBa(data);
                var arg5 = data.readByte();
                t_itemVO.extra = arg5 == 1 ? 5 : 0;
                s.resultList.push(t_itemVO);
            }
            len = data.readShort();
            for (var i = 0; i < len; i++) {
                var id = data.readInt();
                var status_2 = data.readInt();
                s.targetMap[id] = status_2;
            }
            s.wish = data.readInt();
            s.systemId = data.readInt();
            if (s.type == 1) {
                s.targetCount += 1;
            }
            else {
                s.targetCount += 10;
            }
            if (s.targetArr.length > 0) {
                var len_1 = s.targetArr.length;
                var cfg = void 0;
                for (var j = 0; j < len_1; j++) {
                    var v = s.targetArr[j];
                    cfg = Config.xysslb_328[v.id];
                    if (v.status <= 0 && s.targetCount >= cfg.time) {
                        v.status = 1;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.WISHTREE_PRAY_MOVIE);
            s.reddotCheckWishTree();
            s.reddotCheckWishTreeTarget();
        }
        else {
            ViewCommonWarn.text("元宝不足");
        }
    };
    /**10044 领取奖励返回 B:状态 1成功 2条件不符 3背包已满 4参数错误 5已领取I:目标idI:目标奖励状态 -1已领取 0条件不符 >0可领取次数I:系统id*/
    Model_WishTree.prototype.GC_GET_AWARD = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var id = data.readInt();
            var status_3 = data.readInt();
            s.targetMap[id] = status_3;
            s.systemId = data.readInt();
            s.resultList.length = 0;
            GGlobal.control.notify(UIConst.WISHTREE_ACT);
            GGlobal.control.notify(UIConst.WISHTREE_SYSTEM);
            s.reddotCheckWishTree();
        }
    };
    /**10046 打开排行榜返回 [S:排名U:玩家名I:许愿次数]排行列表S:我的排名 没进排名为0I:我的许愿次数*/
    Model_WishTree.prototype.GC_OPEN_RANKUI = function (s, data) {
        s.rankArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new WishTreeVO();
            v.readRankMsg(data);
            s.rankArr.push(v);
        }
        s.myRank = data.readUnsignedShort();
        s.myWish = data.readInt();
        GGlobal.control.notify(UIConst.WISHTREE_RANK);
    };
    /**10048 打开目标页面返回 [I:配置表idB:状态 0未领取 1可领取 2已领取]目标列表I:系统idI:次数*/
    Model_WishTree.prototype.GC_OPEN_TARGETUI = function (s, data) {
        s.targetArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new WishTreeVO();
            v.readMsg(data);
            s.targetArr.push(v);
        }
        s.systemId = data.readInt();
        s.targetCount = data.readInt();
        // GGlobal.control.notify(UIConst.WISHTREE_TARGET);
        GGlobal.control.notify(UIConst.WISHTREE_ACT);
        GGlobal.control.notify(UIConst.WISHTREE_SYSTEM);
    };
    /**10050 领取页面目标奖励返回 B:状态I:目标idI:系统id*/
    Model_WishTree.prototype.GC_GET_TARGETAWARD = function (s, data) {
        var res = data.readByte();
        var id = data.readInt();
        s.systemId = data.readInt();
        if (res == 1) {
            var len = s.targetArr.length;
            for (var i = 0; i < len; i++) {
                var v = s.targetArr[i];
                if (v.id == id) {
                    v.status = 2;
                    break;
                }
            }
            s.reddotCheckWishTreeTarget();
            // GGlobal.control.notify(UIConst.WISHTREE_TARGET);
            GGlobal.control.notify(UIConst.WISHTREE_ACT);
            GGlobal.control.notify(UIConst.WISHTREE_SYSTEM);
        }
    };
    Model_WishTree.getxyspmCfg = function (qs, rank) {
        if (Model_WishTree._xyspmCfg == null) {
            Model_WishTree._xyspmCfg = {};
            for (var keys in Config.xyspmb_328) {
                var cfg = Config.xyspmb_328[keys];
                if (Model_WishTree._xyspmCfg[cfg.qs] == null) {
                    Model_WishTree._xyspmCfg[cfg.qs] = {};
                }
                var arr = ConfigHelp.SplitStr(cfg.rank);
                for (var j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
                    Model_WishTree._xyspmCfg[cfg.qs][j] = cfg;
                }
            }
        }
        return Model_WishTree._xyspmCfg[qs] ? Model_WishTree._xyspmCfg[qs][rank] : null;
    };
    Model_WishTree.getWishTreeVO = function (id) {
        var model = GGlobal.modelWishTree;
        if (model.voArr && model.voArr.length > 0) {
            var len = model.voArr.length;
            var vo = void 0;
            for (var i = 0; i < len; i++) {
                vo = model.voArr[i];
                if (vo.id == id) {
                    return vo;
                }
            }
        }
        return null;
    };
    /**
     * 检查抽奖道具是否足够（非元宝）
     * @param pType 1抽一次 2抽10次
     */
    Model_WishTree.prototype.checkItemEnough = function (pType) {
        var t = this;
        if (pType == 1) {
            //抽一次
            return FastAPI.checkItemEnough(416010, 1, false);
        }
        else {
            //抽10次
            return FastAPI.checkItemEnough(416010, 10, false);
        }
    };
    /** 检查许愿树红点 */
    Model_WishTree.prototype.reddotCheckWishTree = function () {
        var bol = false;
        var sf = GGlobal.reddot;
        for (var key in this.targetMap) {
            var status = this.targetMap[key];
            if (status > 0) {
                bol = true;
                break;
            }
        }
        if (!bol) {
            bol = GGlobal.modelWishTree.checkItemEnough(1) || GGlobal.modelWishTree.checkItemEnough(1) ? true : false;
        }
        if (GGlobal.modelWishTree.systemId > 0) {
            sf.setCondition(GGlobal.modelWishTree.systemId, 0, bol);
            sf.notifyMsg(GGlobal.modelWishTree.systemId);
        }
        else {
            sf.setCondition(UIConst.WISHTREE_ACT, 0, bol);
            sf.notifyMsg(UIConst.WISHTREE_ACT);
            sf.setCondition(UIConst.WISHTREE_SYSTEM, 0, bol);
            sf.notifyMsg(UIConst.WISHTREE_SYSTEM);
        }
    };
    /** 检查许愿树目标红点 */
    Model_WishTree.prototype.reddotCheckWishTreeTarget = function () {
        var bol = false;
        var sf = GGlobal.reddot;
        var cfg;
        if (this.targetArr) {
            var len = this.targetArr.length;
            for (var i = 0; i < len; i++) {
                var v = this.targetArr[i];
                cfg = Config.xysslb_328[v.id];
                if (v.status == 1) {
                    bol = true;
                    break;
                }
                else if (v.status == 0 && GGlobal.modelWishTree.wish >= cfg.time) {
                    bol = true;
                    break;
                }
            }
        }
        sf.setCondition(GGlobal.modelWishTree.systemId, 1, bol);
        sf.notifyMsg(GGlobal.modelWishTree.systemId);
    };
    return Model_WishTree;
}(BaseModel));
__reflect(Model_WishTree.prototype, "Model_WishTree");
