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
var Model_Rank = (function (_super) {
    __extends(Model_Rank, _super);
    function Model_Rank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**获取排行榜数据 B:排行榜类型 */
    Model_Rank.prototype.CG_GET_RANK_LIST = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(1451, bates);
    };
    //协议处理
    Model_Rank.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(1452, this.GC_GET_RANK_LIST, this);
    };
    /**排行榜数据返回 B:排行榜类型[I:排名L:玩家idU:玩家名称I:职业时装（job*1000+时装id）I:专属神兵I:等级I:轮回等级I:vip等级I:官衔I:国家B:是否显示（0：显示，1：隐藏）L:战力I:特殊字段1（铜雀台：层数）（火烧赤壁：关数）I:头像idI:头像框idI:称号idL:个人总战力]排行数据*/
    Model_Rank.prototype.GC_GET_RANK_LIST = function (self, data) {
        var type = data.readByte();
        var len = data.readShort();
        Model_Rank.rankData[type] = [];
        for (var i = 0; i < len; i++) {
            var rank = new VoRank();
            rank.readMsg(data);
            rank.type = type;
            Model_Rank.rankData[type].push(rank);
        }
        GGlobal.control.notify(Enum_MsgType.RANK_UPDATE);
    };
    Object.defineProperty(Model_Rank, "rankTabArr", {
        get: function () {
            if (Model_Rank._rankTabArr == null) {
                Model_Rank._rankTabArr = [];
                for (var keys in Config.paihangbang_711) {
                    Model_Rank._rankTabArr.push(Config.paihangbang_711[keys]);
                }
            }
            return Model_Rank._rankTabArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_Rank.setRankTxt = function (v) {
        if (!v) {
            return "";
        }
        if (v.type == 1) {
            return "等级：" + v.level;
        }
        if (v.type == 3) {
            return "铜雀台：" + v.params + "层";
        }
        return "等级：" + v.level;
    };
    Model_Rank.setPowerTxt = function (v) {
        if (!v) {
            return "";
        }
        if (v.type <= 4) {
            return "战力：" + v.power;
        }
        else {
            var name = Config.paihangbang_711[v.type].NAME;
            name = name.substr(0, 2);
            return name + "战力：" + v.power;
        }
    };
    Model_Rank.setMyInfoTxt = function (v) {
        if (!v) {
            return "";
        }
        if (v.type <= 4) {
            if (v.type == 1) {
                return "等级：" + v.level;
            }
            if (v.type == 2) {
                return "战力：" + v.power;
            }
            if (v.type == 3) {
                return "铜雀台：" + v.params + "层";
            }
            if (v.type == 4) {
                return "战力：" + v.power;
            }
        }
        else {
            var name = Config.paihangbang_711[v.type].NAME;
            name = name.substr(0, 2);
            return name + "战力：" + v.power;
        }
    };
    Model_Rank.rankData = {};
    return Model_Rank;
}(BaseModel));
__reflect(Model_Rank.prototype, "Model_Rank");
