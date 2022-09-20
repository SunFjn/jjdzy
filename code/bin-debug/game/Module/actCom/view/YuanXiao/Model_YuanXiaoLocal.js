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
 * Model_YuanXiaoLocal
 * 做元宵
 */
var Model_YuanXiaoLocal = (function (_super) {
    __extends(Model_YuanXiaoLocal, _super);
    function Model_YuanXiaoLocal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.drawNum = 0;
        _this.drawTime = 0;
        _this.numArr = [];
        _this.ldNum = 0;
        _this.resTime = 0;
        _this.battleReportArr = [];
        return _this;
    }
    //协议处理
    Model_YuanXiaoLocal.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(11630, this.GC_YuanXiaoLocal_openUi_11630, this);
        mgr.regHand(11632, this.GC_YuanXiaoLocal_openBattle_11632, this);
        mgr.regHand(11634, this.GC_YuanXiaoLocal_battleHid_11634, this);
        mgr.regHand(11636, this.GC_YuanXiaoLocal_refresh_11636, this);
        mgr.regHand(11638, this.GC_YuanXiaoLocal_make_11638, this);
    };
    /**11639 CG 获取元宵免费材料  */
    Model_YuanXiaoLocal.prototype.CG_GET_YUANXIAO_CAILIAO = function () {
        var bates = this.getBytes();
        this.sendSocket(11639, bates);
    };
    /**11640 GC 材料数量变化 I:材料1I:材料2I:材料3  */
    Model_YuanXiaoLocal.prototype.GC_YUANXIAO_CAILIAO_CHANGE = function (self, data) {
        var arg3 = data.readInt();
        var arg4 = data.readInt();
        var arg5 = data.readInt();
        self.numArr = [arg3, arg4, arg5];
        GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO);
    };
    /**11642 领取免费材料返回 B:0成功 1失败I:已经领取次数I:可以领取次数  */
    Model_YuanXiaoLocal.prototype.GC_YUANXIAO_CAILIAO_DRAW = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            self.drawTime = data.readInt();
            self.drawNum = data.readInt();
            GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO);
        }
    };
    /**11630 I-I-I-I-I GC 打开ui返回 I:可领取免费次数freenumI:倒计时timeI:材料1数量onenumI:材料2数量twonumI:材料3数量threenum*/
    Model_YuanXiaoLocal.prototype.GC_YuanXiaoLocal_openUi_11630 = function (self, data) {
        self.drawNum = data.readInt();
        self.drawTime = data.readInt();
        var arg3 = data.readInt();
        var arg4 = data.readInt();
        var arg5 = data.readInt();
        self.numArr = [arg3, arg4, arg5];
        GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO);
    };
    /**11631  CG 打开抢夺材料界面 B:打卡某个材料抢夺界面 */
    Model_YuanXiaoLocal.prototype.CG_YuanXiaoLocal_openBattle_11631 = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(11631, bates);
    };
    /**11632 GC 打开掠夺界面返回 I:剩余掠夺次数I:刷新时间B:材料分类（1 2 3）[L:玩家idU:玩家名字L:玩家战力I:武器模型I:人物模型（job）I:坐骑I:剩余对应材料数量B:掠夺状态0未掠夺1已掠夺]*/
    Model_YuanXiaoLocal.prototype.GC_YuanXiaoLocal_openBattle_11632 = function (self, data) {
        self.ldNum = data.readInt();
        self.resTime = data.readInt();
        var type = data.readByte();
        self.roleDic[type] = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg3 = data.readLong();
            var arg4 = data.readUTF();
            var arg5 = data.readLong();
            var arg6 = data.readInt();
            var arg7 = data.readInt();
            var arg8 = data.readInt();
            var arg9 = data.readInt();
            var state = data.readByte();
            self.roleDic[type].push({ id: arg3, name: arg4, power: arg5, weapon: arg6, job: arg7, ride: arg8, surNum: arg9, state: state });
        }
        GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO);
    };
    /**11633CG 请求掠夺 B:目标材料对象L:目标id*/
    Model_YuanXiaoLocal.prototype.CG_YuanXiaoLocal_battleHid_11633 = function (type, arg1) {
        var bates = this.getBytes();
        bates.writeByte(type);
        bates.writeLong(arg1);
        this.sendSocket(11633, bates);
    };
    /**11634GC GC战斗返回 B:0开始战斗 1对方没有屯粮了B:0胜利1失败I:拥有材料1数量I:拥有材料2数量I:拥有材料3数量
     * L:胜利玩家IDI:胜利头像IDL:战力U:名字I:胜利者将衔IDL:左边玩家IDL:右边玩家ID*/
    Model_YuanXiaoLocal.prototype.GC_YuanXiaoLocal_battleHid_11634 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var arg2 = data.readByte();
            var arg3 = data.readInt();
            var arg4 = data.readInt();
            var arg5 = data.readInt();
            self.numArr = [arg3, arg4, arg5];
            self.enterBattle(data);
        }
        else {
            if (result == 1) {
                ViewCommonWarn.text("对方没有屯粮了");
            }
        }
    };
    Model_YuanXiaoLocal.prototype.enterBattle = function (data) {
        var winerid = data.readLong();
        var headid = data.readInt();
        var power = data.readLong();
        var name = data.readUTF();
        var jiangxian = data.readInt();
        var leftid = data.readLong();
        var rightid = data.readLong();
        var ctrl = SceneCtrl.getCtrl(SceneCtrl.COMMON_VIDEOTAP);
        ctrl.power = power;
        ctrl.name = name;
        ctrl.winerid = winerid;
        ctrl.headid = headid;
        ctrl.jiangxian = jiangxian;
        ctrl.leftid = leftid;
        ctrl.rightid = rightid;
        var vo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_YUANXIAO);
        ctrl.panelIdArr = [vo.groupId];
        GGlobal.mapscene.scenetype = SceneCtrl.COMMON_VIDEOTAP;
        GGlobal.mapscene.enterSceneCtrl(ctrl);
    };
    /**11635 B CG刷新 B:材料x（24,25,26）type*/
    Model_YuanXiaoLocal.prototype.CG_YuanXiaoLocal_refresh_11635 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(11635, bates);
    };
    /**11636 B GC刷新返回11632 B:0成功 1没有人有材料 2次数不够rest*/
    Model_YuanXiaoLocal.prototype.GC_YuanXiaoLocal_refresh_11636 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            ViewCommonWarn.text("刷新成功");
        }
    };
    /**11637  CG 制作元宵 */
    Model_YuanXiaoLocal.prototype.CG_YuanXiaoLocal_make_11637 = function () {
        var bates = this.getBytes();
        this.sendSocket(11637, bates);
    };
    /**11638 GC 制作结果 B:0成功 1材料不足 I:道具IDI:道具数量I:材料1数量I:材料2数量I:材料3数量*/
    Model_YuanXiaoLocal.prototype.GC_YuanXiaoLocal_make_11638 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var itemID = data.readInt();
            var count = data.readInt();
            var arg3 = data.readInt();
            var arg4 = data.readInt();
            var arg5 = data.readInt();
            var itemVo = VoItem.create(itemID);
            itemVo.count = count;
            self.numArr = [arg3, arg4, arg5];
            GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO_EFF);
        }
    };
    return Model_YuanXiaoLocal;
}(BaseModel));
__reflect(Model_YuanXiaoLocal.prototype, "Model_YuanXiaoLocal");
