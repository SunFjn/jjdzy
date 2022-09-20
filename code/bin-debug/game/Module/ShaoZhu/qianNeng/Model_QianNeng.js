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
var Model_QianNeng = (function (_super) {
    __extends(Model_QianNeng, _super);
    function Model_QianNeng() {
        var _this = _super.call(this) || this;
        _this.qianNObj = {};
        return _this;
    }
    /**打开潜能界面 */
    Model_QianNeng.prototype.CG_OPENUI_5133 = function () {
        var bates = this.getBytes();
        this.sendSocket(5133, bates);
    };
    /**升级潜能：冲穴 I:少主index */
    Model_QianNeng.prototype.CG_UP_LEVEL_5135 = function (szId) {
        var bates = this.getBytes();
        bates.writeInt(szId);
        this.sendSocket(5135, bates);
    };
    /**服食 I:少主index I:道具id I:数量 */
    Model_QianNeng.prototype.CG_EAT_5137 = function (szId, itId, ct) {
        var bates = this.getBytes();
        bates.writeInt(szId);
        bates.writeInt(itId);
        bates.writeInt(ct);
        this.sendSocket(5137, bates);
    };
    //协议处理
    Model_QianNeng.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(5134, this.GC_OPENUI_5134, this);
        mgr.regHand(5136, this.GC_UP_LEVEL_5136, this);
        mgr.regHand(5138, this.GC_EAT_5138, this);
    };
    //打开潜能界面返回 [I:少主index I:潜能id[I:丹药id I:数量]]
    Model_QianNeng.prototype.GC_OPENUI_5134 = function (self, data) {
        Model_QianNeng.hasData = true;
        var len = data.readShort();
        self.qianNObj = {};
        for (var i = 0; i < len; i++) {
            var v = new Vo_QianNeng();
            v.readMsg(data);
            self.qianNObj[v.szId] = v;
        }
        self.notify(Model_QianNeng.OPENUI);
        self.checkNotice();
    };
    //冲穴返回 B:1.成功 2.少主未激活 3.冲穴条件不足 4.已满级I:少主indexI: 潜能id
    Model_QianNeng.prototype.GC_UP_LEVEL_5136 = function (self, data) {
        var res = data.readByte();
        var szId = data.readInt();
        var qianNId = data.readInt();
        if (res == 1) {
            var v = self.qianNObj[szId];
            v.qianNId = qianNId;
            v.initCfg();
            self.notify(Model_QianNeng.OPENUI);
            self.checkNotice();
        }
        else {
            ViewCommonWarn.text(["少主未激活", "冲穴条件不足", "已满级"][res - 2]);
        }
    };
    //服食返回 B:1.成功 2.少主未激活 3.参数错误 4.道具不足 5.已达服食上限I:少主indexI: 道具idI:已服食数量
    Model_QianNeng.prototype.GC_EAT_5138 = function (self, data) {
        var res = data.readByte();
        var szId = data.readInt();
        var ty = data.readInt();
        var ct = data.readInt();
        if (res == 1) {
            var v = self.qianNObj[szId];
            for (var i = 0; i < v.danArr.length; i++) {
                var dan = v.danArr[i];
                if (dan.ty == ty) {
                    dan.ct = ct;
                    break;
                }
            }
            self.notify(Model_QianNeng.OPENUI);
            self.checkNotice();
        }
        else {
            ViewCommonWarn.text(["少主未激活", "参数错误", "道具不足", "已达服食上限"][res - 2]);
        }
    };
    Model_QianNeng.prototype.checkNotice = function () {
        var reddot = GGlobal.reddot;
        var model = GGlobal.modelShaoZhu;
        var m = this;
        var redAll = false;
        for (var i = 0; i < model.shaoZhuArr.length; i++) {
            var sz = model.shaoZhuArr[i];
            var red = m.checkSz(sz);
            reddot.setCondition(UIConst.SHAOZHU_QIANNENG, sz.shaozhuID, red);
            if (red) {
                redAll = true;
            }
        }
        reddot.setCondition(UIConst.SHAOZHU_QIANNENG, 0, redAll);
        reddot.notify(UIConst.SHAOZHU_QIANNENG);
    };
    Model_QianNeng.prototype.checkSz = function (sz) {
        var m = this;
        var qn = m.qianNObj[sz.shaozhuID];
        if (!qn)
            return false; //未激活
        if (sz.starcfg.next > 0)
            return false; //未满星
        var hasCt0 = Model_Bag.getItemCount(Model_QianNeng.EAT_DAN0);
        var hasCt1 = Model_Bag.getItemCount(Model_QianNeng.EAT_DAN1);
        //可吞噬
        for (var j = 0; j < qn.danArr.length; j++) {
            var dan = qn.danArr[j];
            if (dan.ty == Model_QianNeng.TYPE_DAN0) {
                if ((hasCt0 > 0 && dan.ct < qn.cfg.max1)) {
                    return true;
                }
            }
            else if (dan.ty == Model_QianNeng.TYPE_DAN1) {
                if ((hasCt1 > 0 && dan.ct < qn.cfg.max2)) {
                    return true;
                }
            }
        }
        //可升级可突破 ;
        if (qn.cfg.next == 0)
            return false; //最大
        var itRes = JSON.parse(qn.cfg.consume);
        var hasCt = Model_Bag.getItemCount(itRes[0][1]);
        if (hasCt >= itRes[0][2]) {
            return true;
        }
        return false;
    };
    Model_QianNeng.OPENUI = "openui";
    Model_QianNeng.EAT_DAN0 = 412015;
    Model_QianNeng.EAT_DAN1 = 412016;
    Model_QianNeng.TYPE_DAN0 = 10;
    Model_QianNeng.TYPE_DAN1 = 11;
    Model_QianNeng.hasData = false;
    return Model_QianNeng;
}(BaseModel));
__reflect(Model_QianNeng.prototype, "Model_QianNeng");
