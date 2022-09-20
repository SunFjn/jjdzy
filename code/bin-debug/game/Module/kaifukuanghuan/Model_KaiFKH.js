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
var Model_KaiFKH = (function (_super) {
    __extends(Model_KaiFKH, _super);
    function Model_KaiFKH() {
        return _super.call(this) || this;
    }
    Model_KaiFKH.prototype.init = function () {
        var s = this;
        s.mapObj = {};
        s.mapObjType = {};
        s.data = [];
        var bigType;
        var lib = Config.party_240;
        for (var i in lib) {
            var cfg = lib[i];
            var vo = new Vo_KaiFuKH();
            vo.init(lib[i]);
            bigType = vo.tabIndex;
            s.mapObjType[vo.type] = bigType;
            s.mapObj[cfg.id] = vo;
            if (!s.data[bigType])
                s.data[bigType] = [];
            var pageDta = s.data[bigType];
            if (bigType == 3) {
                var day = vo.day;
                if (!pageDta[day])
                    pageDta[day] = [];
                pageDta[day].push(vo);
            }
            else {
                pageDta.push(vo);
            }
        }
        for (var j = 0; j < s.data.length; j++) {
            var arr = s.data[j];
            if (!arr)
                continue;
            if (j != 0) {
                if (j == 3) {
                    for (var k = 0; k < arr.length; k++) {
                        if (arr[k]) {
                            arr[k].sort(function (a, b) { return a.id > b.id ? 1 : -1; });
                        }
                    }
                }
                else {
                    arr.sort(function (a, b) { return a.id > b.id ? 1 : -1; });
                }
            }
        }
    };
    Model_KaiFKH.prototype.getThemeType = function () {
        var day = Model_GlobalMsg.kaifuDay;
        var nowDayTheme;
        if (day > 0) {
            if (this.data && this.data[3] && this.data[3][day]) {
                nowDayTheme = this.data[3][day][0];
                return nowDayTheme.type;
            }
            else {
                return day + 2;
            }
        }
        return 1;
    };
    /**检查指定类型的数据状态*/
    Model_KaiFKH.prototype.checkNotice = function (id) {
        if (!this.mapObj)
            this.init();
        var type = this.mapObj[id].type;
        //大类型转一下
        var bigType = (id / 1000) >> 0;
        var source;
        var day = Model_GlobalMsg.kaifuDay;
        day = day == 0 ? 1 : day;
        var retType = false;
        if (bigType == 5) {
            source = Model_KaiFKH.SJKHDataVO;
            for (var j = 0, k = source.length; j < k; j++) {
                var vo = source[j];
                if (vo.reward == 1 || (vo.limitSt == 1 && vo.lastNum > 0)) {
                    retType = true;
                    break;
                }
            }
        }
        else {
            if (bigType == 3) {
                source = this.data[3][day]; //今日主题活动数据
            }
            else {
                source = this.data[bigType];
            }
            for (var j = 0, k = source.length; j < k; j++) {
                var vo = source[j];
                if (vo.st == 1) {
                    retType = true;
                    break;
                }
            }
        }
        var redMgr = GGlobal.reddot;
        //今日主题活动
        var nowDayTheme = this.data[3][day][0];
        redMgr.setCondition(UIConst.KAIFUKUANGHUAN, type - 1, retType);
        var ret = redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 0) || redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 1)
            || redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 9) || redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, this.getThemeType() - 1) || redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 15);
        redMgr.notify(UIConst.KAIFUKUANGHUAN);
    };
    Model_KaiFKH.prototype.listenServ = function (s) {
        this.socket = s;
        var a = this;
        s.regHand(2332, a.GC_OPENUI, a);
        s.regHand(2334, a.GC_LQ, a);
        s.regHand(2336, a.GC_OPENSJKH, a);
        s.regHand(2338, a.GC_RewardState, a);
    };
    /**更新神将狂欢领取状态 */
    Model_KaiFKH.prototype.GC_RewardState = function (s, d) {
        //let i = d.readInt();
        var state = d.readByte();
        var id = d.readInt();
        var type = d.readByte();
        var lastNum = d.readInt();
        if (lastNum == 0 && type == 1) {
            ViewCommonWarn.text("你来晚了，奖励已抢完");
        }
        GGlobal.control.notify(Enum_MsgType.SJKHITEMREFRESH, { state: state, id: id, type: type, lastNum: lastNum });
    };
    /**接受 神将狂欢的数据 */
    Model_KaiFKH.prototype.GC_OPENSJKH = function (s, d) {
        var l = d.readShort();
        var data = [];
        var vo;
        var SJKHData = [];
        Model_KaiFKH.SJKHDataVO = [];
        for (var i = 0; i < l; i++) {
            ////console.log("d.readInt()", d.readInt());  
            var id = d.readInt();
            vo = s.mapObj[id];
            vo.reward = d.readByte();
            vo.limitSt = d.readByte();
            vo.lastNum = d.readInt();
            SJKHData[i] = vo;
        }
        //console.log("ddddddddddddddddddddddd", SJKHData);
        Model_KaiFKH.SJKHDataVO = SJKHData;
        if (vo)
            s.checkNotice(vo.id);
        GGlobal.control.notify(Enum_MsgType.SHENJIANGKUANGHUAN, { data: SJKHData });
    };
    Model_KaiFKH.prototype.CG_OPEN = function (i) {
        var s = this;
        var ba = s.getBytes();
        ba.writeByte(i);
        if (View_KaiFKH.isShenJiangKuanghuan) {
            if (i == 15 || i == 16) {
                s.sendSocket(2335, ba);
            }
            else {
                s.sendSocket(2331, ba);
            }
        }
        else {
            s.sendSocket(2331, ba);
        }
    };
    Model_KaiFKH.prototype.CG_GETREWARD = function (id, type) {
        var ba = this.getBytes();
        ba.writeInt(id);
        ba.writeByte(type);
        this.sendSocket(2337, ba);
    };
    /**2332 [I-B]
     * GC 打开ui信息 [I:奖励索引B:奖励状态]
    */
    Model_KaiFKH.prototype.GC_OPENUI = function (s, d) {
        var l = d.readShort();
        var vo;
        for (var i = 0; i < l; i++) {
            vo = s.mapObj[d.readInt()];
            vo.pro = d.readLong();
            vo.st = d.readByte();
        }
        if (vo)
            s.checkNotice(vo.id);
        GGlobal.control.notify(Enum_MsgType.KAIFUKUANGHUAN, 0);
    };
    Model_KaiFKH.prototype.CG_LQ = function (i) {
        var ba = this.getBytes();
        ba.writeInt(i);
        this.sendSocket(2333, ba);
    };
    /**2334 	I-B
     * GC 奖励发生变化 I:奖励序号B:奖励状态
    */
    Model_KaiFKH.prototype.GC_LQ = function (s, d) {
        if (!s.mapObj)
            s.init();
        var vo = s.mapObj[d.readInt()];
        vo.st = d.readByte();
        s.checkNotice(vo.id);
        GGlobal.control.notify(Enum_MsgType.KAIFUKUANGHUAN, 1);
    };
    return Model_KaiFKH;
}(BaseModel));
__reflect(Model_KaiFKH.prototype, "Model_KaiFKH");
