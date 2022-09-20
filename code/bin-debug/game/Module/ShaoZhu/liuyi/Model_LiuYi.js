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
var Model_LiuYi = (function (_super) {
    __extends(Model_LiuYi, _super);
    function Model_LiuYi() {
        var _this = _super.call(this) || this;
        _this.liuyiObj = {};
        return _this;
    }
    /** 打开界面 */
    Model_LiuYi.prototype.CG_OPENUI_5125 = function () {
        var bates = this.getBytes();
        this.sendSocket(5125, bates);
    };
    /** 升级六艺 I:少主index B:六艺id */
    Model_LiuYi.prototype.CG_UPLV_5127 = function (szId, lyId) {
        var bates = this.getBytes();
        bates.writeInt(szId);
        bates.writeByte(lyId);
        this.sendSocket(5127, bates);
    };
    /** 进修 I:少主index */
    Model_LiuYi.prototype.CG_EDUCAT_5129 = function (szId) {
        var bates = this.getBytes();
        bates.writeInt(szId);
        this.sendSocket(5129, bates);
    };
    /** 考试 I:少主index B:六艺id */
    Model_LiuYi.prototype.CG_KAOSHI_5131 = function (szId, lyId) {
        var bates = this.getBytes();
        bates.writeInt(szId);
        bates.writeByte(lyId);
        this.sendSocket(5131, bates);
    };
    //协议处理
    Model_LiuYi.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(5126, this.GC_OPENUI_5126, this);
        mgr.regHand(5128, this.GC_UPLV_5128, this);
        mgr.regHand(5130, this.GC_EDUCAT_5130, this);
        mgr.regHand(5132, this.GC_KAOSHI_5132, this);
    };
    //六艺信息返回(已激活少主) [I:少主index B:学堂id [B:六艺id I:六艺等级 B:考试状态：0.不合格 1合格]]
    Model_LiuYi.prototype.GC_OPENUI_5126 = function (self, data) {
        var len = data.readShort();
        self.liuyiObj = {};
        for (var i = 0; i < len; i++) {
            var v = new Vo_LiuYi();
            v.readMsg(data);
            self.liuyiObj[v.szId] = v;
        }
        self.notify(Model_LiuYi.OPENUI);
        self.checkNotice();
    };
    //升级六艺返回 B:1.成功 2参数错误 3.升级条件不足 4.已达上限I:少主index B:六艺id I:等级
    Model_LiuYi.prototype.GC_UPLV_5128 = function (self, data) {
        var res = data.readByte();
        var szId = data.readInt();
        var lyId = data.readByte();
        var lv = data.readInt();
        if (res == 1) {
            var v = self.liuyiObj[szId];
            for (var i = 0; i < v.lyArr.length; i++) {
                if (lyId == v.lyArr[i].lyId) {
                    v.lyArr[i].lyLv = lv;
                    v.lyArr[i].initCfg();
                    break;
                }
            }
            self.notify(Model_LiuYi.UPLEVEL);
            ViewCommonWarn.text("升级成功");
            self.checkNotice();
        }
        else {
            ViewCommonWarn.text(["参数错误", "升级条件不足", "已达上限"][res - 2]);
        }
    };
    //进修返回 B:1.成功 2.参数错误 3.进修条件不足 4.已达顶级学堂I:少主index B:学堂id
    Model_LiuYi.prototype.GC_EDUCAT_5130 = function (self, data) {
        var res = data.readByte();
        var szId = data.readInt();
        var xtId = data.readByte();
        if (res == 1) {
            var v = self.liuyiObj[szId];
            v.xtId = xtId;
            v.initCfg();
            v.initSt();
            ViewCommonWarn.text("进修成功");
            self.notify(Model_LiuYi.OPENUI);
            self.checkNotice();
        }
        else {
            ViewCommonWarn.text(["参数错误", "进修条件不足", "已达上限"][res - 2]);
        }
    };
    //考试返回 B:1.成功 2.参数错误 3.考试条件不足B:1.合格 0.不合格I:少主index B:六艺id
    Model_LiuYi.prototype.GC_KAOSHI_5132 = function (self, data) {
        var res = data.readByte();
        var st = data.readByte();
        var szId = data.readInt();
        var lyId = data.readByte();
        if (res == 1) {
            var v = self.liuyiObj[szId];
            var ly = null;
            for (var i = 0; i < v.lyArr.length; i++) {
                if (v.lyArr[i].lyId == lyId) {
                    v.lyArr[i].st = st;
                    ly = v.lyArr[i];
                    break;
                }
            }
            ViewCommonWarn.text(["考试不合格", "考试合格"][st]);
            self.notify(Model_LiuYi.KAOSHI, ly);
            self.checkNotice();
        }
        else {
            ViewCommonWarn.text(["参数错误", "考试条件不足", "已达上限"][res - 2]);
        }
    };
    Model_LiuYi.prototype.checkNotice = function () {
        var s = this;
        var reddot = GGlobal.reddot;
        var red = false;
        var shaoZhuArr = GGlobal.modelShaoZhu.shaoZhuArr;
        for (var i = 0; i < shaoZhuArr.length; i++) {
            var szRed = s.checkShaoZhu(shaoZhuArr[i]);
            reddot.setCondition(UIConst.SHAOZHU_LIUYI, i + 1, szRed);
            if (!red)
                red = szRed;
        }
        reddot.setCondition(UIConst.SHAOZHU_LIUYI, 0, red);
        reddot.notify(UIConst.SHAOZHU_LIUYI);
    };
    //少主红点
    Model_LiuYi.prototype.checkShaoZhu = function (sz) {
        var s = this;
        var xtVo = s.liuyiObj[sz.shaozhuID];
        if (!xtVo) {
            return false;
        }
        for (var i = 0; i < xtVo.lyArr.length; i++) {
            if (s.checkLyUpLv(sz, xtVo, xtVo.lyArr[i])) {
                return true;
            }
        }
        if (s.checkXTKaoShi(xtVo)) {
            return true;
        }
        return false;
    };
    //六艺能升级
    Model_LiuYi.prototype.checkLyUpLv = function (sz, xtVo, ly) {
        if (!xtVo.openSix[ly.lyId]) {
            return false;
        }
        if (!ly.cfg || ly.cfg.consume == "0") {
            return false;
        }
        var nextCfg = Config.sonsix_267[ly.cfg.next];
        if (sz.starLv < nextCfg.star) {
            return false;
        }
        var it = JSON.parse(ly.cfg.consume)[0];
        var hasCt = Model_Bag.getItemCount(it[1]);
        if (hasCt >= it[2]) {
            return true;
        }
        return false;
    };
    //学堂考试
    Model_LiuYi.prototype.checkXTKaoShi = function (xtVo) {
        if (!xtVo) {
            return false;
        }
        if (xtVo.cfg.consume == "0") {
            return false;
        }
        var it = JSON.parse(xtVo.cfg.consume)[0];
        //达到要求
        var cfgYQ = {};
        var yqArr = JSON.parse(xtVo.cfg.yq);
        for (var i = 0; i < yqArr.length; i++) {
            cfgYQ[yqArr[i][0]] = yqArr[i][1];
        }
        var educat = true;
        var kaoShi = true;
        var ct = Model_Bag.getItemCount(it[1]);
        if (ct < it[2]) {
            kaoShi = false;
        }
        for (var i = 0; i < xtVo.lyArr.length; i++) {
            var ly = xtVo.lyArr[i];
            var isOpen = xtVo.openSix[ly.lyId] ? true : false;
            var max = cfgYQ[ly.lyId];
            if (!isOpen) {
                continue;
            }
            if (ly.lyLv < max) {
                return false;
            }
            if (ly.st == 0) {
                educat = false;
            }
        }
        if (educat || kaoShi) {
            return true;
        }
        return false;
    };
    Model_LiuYi.prototype.getStarMaxCfg = function (star) {
        if (!star) {
            star = 1;
        }
        var preCfg = null;
        for (var k in Config.sonsixclient_267) {
            var v = Config.sonsixclient_267[k];
            if (star == v.id) {
                return v;
            }
            if (star < v.id) {
                return preCfg;
            }
            preCfg = v;
        }
        return preCfg;
    };
    Model_LiuYi.OPENUI = "openui";
    Model_LiuYi.UPLEVEL = "uplevel";
    Model_LiuYi.KAOSHI = "kaoshi";
    return Model_LiuYi;
}(BaseModel));
__reflect(Model_LiuYi.prototype, "Model_LiuYi");
