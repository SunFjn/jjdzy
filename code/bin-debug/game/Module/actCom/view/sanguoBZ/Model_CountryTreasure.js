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
 * Model_CountryTreasure
 * 三国宝藏
 */
var Model_CountryTreasure = (function (_super) {
    __extends(Model_CountryTreasure, _super);
    function Model_CountryTreasure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = 0;
        _this.qishu = 0;
        _this.lunshu = 0;
        _this.maxLun = 0;
        _this.drawNum = 0;
        _this.rewardData = {};
        _this.drawStateArr = [];
        _this.selectData = {};
        return _this;
    }
    //协议处理
    Model_CountryTreasure.prototype.listenServ = function (mgr) {
        var self = this;
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(8650, self.GC_CountryTreasure_openUI_8650, self);
        mgr.regHand(8652, self.GC_CountryTreasure_chooseItem_8652, self);
        mgr.regHand(8654, self.GC_CountryTreasure_getreward_8654, self);
        mgr.regHand(8656, self.GC_CountryTreasure_getExrReward_8656, self);
        mgr.regHand(8658, self.GC_ACTCOM_SGBZ_SURREWARD, self);
    };
    /**8657 CG 获得剩余奖励 */
    Model_CountryTreasure.prototype.CG_ACTCOM_SGBZ_SURREWARD = function () {
        var bates = this.getBytes();
        this.sendSocket(8657, bates);
    };
    /**8658	GC 获得剩余奖励 [B:奖励类型I:奖励idI:奖励数量]剩余奖励 */
    Model_CountryTreasure.prototype.GC_ACTCOM_SGBZ_SURREWARD = function (self, data) {
        var arr = ConfigHelp.parseItemListBa(data);
        GGlobal.layerMgr.open(UIConst.ACTCOM_SGBZ_PREVIEW, arr);
    };
    /**8650 B-B-B-B-[B-I-I-B]-[I-B] GC 打开ui返回 B:状态state 0 选择物品界面 1 抽奖界面stateB:期数qsB:轮数lun
     * B:当前第几次抽奖次数B:最大轮数[B:类型I:idI:数量B:位置]界面抽取显示uiinfos[I:indexB:state]额外奖励领取情况extraRewad*/
    Model_CountryTreasure.prototype.GC_CountryTreasure_openUI_8650 = function (self, data) {
        self.state = data.readByte();
        self.qishu = data.readByte();
        self.lunshu = data.readByte();
        self.drawNum = data.readByte();
        self.maxLun = data.readByte();
        self.drawStateArr = [];
        self.selectData = {};
        self.rewardData = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = ConfigHelp.parseItemBa(data);
            var pos = data.readByte();
            self.rewardData[pos] = vo;
        }
        var len1 = data.readShort();
        for (var i = 0; i < len1; i++) {
            var index = data.readInt();
            var state = data.readByte();
            self.drawStateArr.push([index, state]);
        }
        GGlobal.control.notify(UIConst.ACTCOM_SGBZ);
    };
    /**8651 [I-[B]] CG 选择道具 [I:奖池序号[B:道具位置]]items*/
    Model_CountryTreasure.prototype.CG_CountryTreasure_chooseItem_8651 = function (arg1) {
        var bates = this.getBytes();
        var len = arg1.length;
        bates.writeShort(len);
        for (var i = 0; i < len; i++) {
            bates.writeInt(arg1[i][0]);
            var len1 = arg1[i][1].length;
            bates.writeShort(len1);
            for (var j = 0; j < len1; j++) {
                bates.writeByte(arg1[i][1][j]);
            }
        }
        this.sendSocket(8651, bates);
    };
    /**8652 B GC 选择奖品返回 B:0成功 1有不存在道具rest*/
    Model_CountryTreasure.prototype.GC_CountryTreasure_chooseItem_8652 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            self.state = 1;
            GGlobal.control.notify(UIConst.ACTCOM_SGBZ);
        }
    };
    /**8653 B CG 抽奖 B:抽的位置（1-12）index*/
    Model_CountryTreasure.prototype.CG_CountryTreasure_getreward_8653 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(8653, bates);
    };
    /**8654 B-B-I-I-B GC 抽奖返回 B:0成功 1位置已经抽了 2钱不够restB:道具类型typeI:道具iditemidI:道具数量numB:道具被抽位置index*/
    Model_CountryTreasure.prototype.GC_CountryTreasure_getreward_8654 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var vo = ConfigHelp.parseItemBa(data);
            var pos = data.readByte();
            self.rewardData[pos] = vo;
            self.drawNum++;
            GGlobal.control.notify(UIConst.ACTCOM_SGBZ);
        }
    };
    /**8655 I CG 获取额外奖励 I:奖励序号index*/
    Model_CountryTreasure.prototype.CG_CountryTreasure_getExrReward_8655 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(8655, bates);
    };
    /**8656 I-B GC 额外奖励状态编号 I:序号indexB:奖励状态 0 1 2state*/
    Model_CountryTreasure.prototype.GC_CountryTreasure_getExrReward_8656 = function (self, data) {
        var index = data.readInt();
        var state = data.readByte();
        var noticeIndex = 0;
        for (var i = 0; i < self.drawStateArr.length; i++) {
            if (self.drawStateArr[i][0] == index) {
                self.drawStateArr[i][1] = state;
            }
            if (self.drawStateArr[i][1] == 1) {
                noticeIndex++;
            }
        }
        GGlobal.reddot.setCondition(UIConst.ACTCOM_SGBZ, 0, noticeIndex > 0);
        GGlobal.reddot.notifyMsg(UIConst.ACTCOM_SGBZ);
        GGlobal.control.notify(UIConst.ACTCOM_SGBZ);
    };
    return Model_CountryTreasure;
}(BaseModel));
__reflect(Model_CountryTreasure.prototype, "Model_CountryTreasure");
