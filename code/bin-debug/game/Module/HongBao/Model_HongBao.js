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
/**
 * Model_RedBoxAct
 * 红包活动
 */
var Model_HongBao = (function (_super) {
    __extends(Model_HongBao, _super);
    function Model_HongBao() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moneyNum = 0;
        _this.surNum = 0;
        _this.hbArr = [];
        _this.recordArr = [];
        _this.drawID = 0;
        return _this;
    }
    //协议处理
    Model_HongBao.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(11760, this.GC_RedBoxAct_openUi_11760, this);
        mgr.regHand(11762, this.GC_RedBoxAct_lookinfos_11762, this);
        mgr.regHand(11764, this.GC_RedBoxAct_faBoxs_11764, this);
        mgr.regHand(11766, this.GC_RedBoxAct_getBox_11766, this);
        mgr.regHand(11768, this.GC_RedBoxAct_tishi_11768, this);
    };
    /**11760 L-I-[L-U-U-I-I-B-I-I] GC打开红包ui返回 L:金元宝数量maxNumI:剩余发送红包机会leftNum[L:红包唯一idU:发送者名字U:红包名称I:头像idI:头像框B:已经领取人数I:领取了多少 0是没有领取 >0领取了I:红包总金额]redBoxs*/
    Model_HongBao.prototype.GC_RedBoxAct_openUi_11760 = function (self, data) {
        self.hbArr = [];
        self.moneyNum = data.readLong();
        self.surNum = data.readInt();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = new Vo_HongBao();
            vo.readData(data);
            self.hbArr.push(vo);
        }
        GGlobal.control.notify(UIConst.HONGBAO);
    };
    /**11761 L CG 查看红包领取情况 L:红包唯一idboxid*/
    Model_HongBao.prototype.CG_RedBoxAct_lookinfos_11761 = function (arg1) {
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(11761, bates);
    };
    /**11762 GC查看红包领取情况 [U:玩家名字L:领取红包数量B:是否玩家本人,1是,0不是]*/
    Model_HongBao.prototype.GC_RedBoxAct_lookinfos_11762 = function (self, data) {
        self.recordArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = new Vo_HongBao();
            vo.drawNum = len;
            vo.readRecord(data);
            self.recordArr.push(vo);
        }
        GGlobal.control.notify(UIConst.HONGBAO_RECORD);
    };
    /**11763 L-U CG 发送红包 L:红包数量fanumU:红包名称boxname*/
    Model_HongBao.prototype.CG_RedBoxAct_faBoxs_11763 = function (arg1, arg2) {
        var bates = this.getBytes();
        bates.writeLong(arg1);
        bates.writeUTF(arg2);
        this.sendSocket(11763, bates);
    };
    /**11764 B GC 发红包返回 B:0成功1次数不够2金元宝不足rest*/
    Model_HongBao.prototype.GC_RedBoxAct_faBoxs_11764 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            GGlobal.layerMgr.close2(UIConst.HONGBAO_SEND);
            self.CG_OPEN_HONGBAO_11769();
            ViewCommonWarn.text("发送红包成功");
        }
        else if (result == 3) {
            ViewCommonWarn.text("含有非法字符");
        }
        else if (result == 5) {
            ViewCommonWarn.text("此时间段不能发红包");
        }
    };
    /**11765 L CG领取红包 L:红包唯一idboxid*/
    Model_HongBao.prototype.CG_RedBoxAct_getBox_11765 = function (arg1) {
        var self = this;
        var bates = self.getBytes();
        bates.writeLong(arg1);
        self.drawID = arg1;
        self.sendSocket(11765, bates);
    };
    /**11766 B-L GC 领取红包返回 B:0成功1被抢光了restL:领取数量num*/
    Model_HongBao.prototype.GC_RedBoxAct_getBox_11766 = function (self, data) {
        var result = data.readByte();
        var arg2 = data.readLong();
        for (var i = 0; i < self.hbArr.length; i++) {
            if (self.hbArr[i].id == self.drawID) {
                if (result == 0) {
                    self.hbArr[i].robNum = arg2;
                }
                else if (result == 1) {
                    self.hbArr[i].drawNum = Model_HongBao.max;
                    ViewCommonWarn.text("红包已被抢光");
                }
                break;
            }
        }
        GGlobal.control.notify(UIConst.HONGBAO);
    };
    /**11768 U GC提示有人发了红包 U:玩家名字name*/
    Model_HongBao.prototype.GC_RedBoxAct_tishi_11768 = function (self, data) {
        var arg1 = data.readUTF();
        if (ModuleManager.isOpen(UIConst.HONGBAO)) {
            TJHBEff.show();
            GGlobal.modelchat.addNotice(true, 116, arg1 + "_");
            GGlobal.mainUICtr.addReportBTN(UIConst.HONGBAO);
        }
    };
    /**11769  打开红包ui返回11760   */
    Model_HongBao.prototype.CG_OPEN_HONGBAO_11769 = function () {
        var bates = this.getBytes();
        this.sendSocket(11769, bates);
    };
    Model_HongBao.max = 10;
    return Model_HongBao;
}(BaseModel));
__reflect(Model_HongBao.prototype, "Model_HongBao");
