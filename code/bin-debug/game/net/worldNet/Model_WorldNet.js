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
var Model_WorldNet = (function (_super) {
    __extends(Model_WorldNet, _super);
    function Model_WorldNet() {
        var _this = _super.call(this) || this;
        _this.heartNum = 0;
        return _this;
    }
    /**
     * 离开中央服
    */
    Model_WorldNet.exiteCross = function () {
        GGlobal.layerMgr.close(UIConst.CONNECT_WORLD);
        WorldSocketMgr.instance.close();
        console.log("==== 离开中央服");
    };
    Model_WorldNet.sendCmd = function (cmd, content) {
        WorldSocketMgr.instance.sendCMDBytes(cmd, content);
    };
    //协议处理
    Model_WorldNet.prototype.listenServ = function (mgr) {
        _super.prototype.listenServ.call(this, mgr);
        //注册GC方法
        mgr.regHand(1662, this.GC_Cross_askCross_1662, this);
        mgr.regHand(1664, this.GC_Cross_loginCross_1664, this);
        mgr.regHand(1666, this.GC_Cross_end_1666, this);
        mgr.regHand(1668, this.GC_Cross_heart_1668, this);
    };
    /**2301 B-U 请求跨服 B:跨服类型U:附加参数 B:跨服类型typeU:附加参数param*/
    Model_WorldNet.prototype.CG_Cross_askCross_2301 = function (arg1, arg2) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        bates.writeUTF(arg2);
        this.sendSocket(2301, bates);
    };
    /**2302 B-U 请求跨服返回 B:返回 1：正在请求中央服务器，2：正在准备数据，3：可以开始连接，4：中央服务器连接失败rtnU:附加参数param*/
    Model_WorldNet.prototype.GC_Cross_askCross_1662 = function (self, data) {
        var arg1 = data.readByte();
        var arg2 = data.readUTF();
        switch (arg1) {
            case 1:
                //	GGlobal.layerMgr.open(UIConst.CONNECT_WORLD);
                break;
            case 2:
                break;
            case 3:
                var info = arg2.split("_");
                WorldSocketMgr.instance.connect(info[0], parseInt(info[1]));
                break;
            case 4:
                GGlobal.layerMgr.close(UIConst.CONNECT_WORLD);
                break;
            default:
                GGlobal.layerMgr.close(UIConst.CONNECT_WORLD);
                break;
        }
    };
    /**1663 CG （跨服）请求登陆跨服 L:hid*/
    Model_WorldNet.prototype.CG_Cross_loginCross_1663 = function (arg1) {
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(1663, bates, true);
    };
    /**2304 B 登陆结果 B:1：登陆成功rtn*/
    Model_WorldNet.prototype.GC_Cross_loginCross_1664 = function (self, data) {
        var arg1 = data.readByte();
        if (arg1 == 1) {
            // GGlobal.layerMgr.close(UIConst.CONNECT_WORLD);
        }
    };
    /**2305 I 进入场景 I:地图IDsceneId*/
    Model_WorldNet.prototype.CG_Cross_inScene_2305 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(2305, bates);
    };
    Model_WorldNet.prototype.GC_Cross_end_1666 = function (self, data) {
        var sid = data.readInt();
        if (sid == UIConst.FHLY) {
            // FengHuoLYCtr.getInstance().activityEnd();	
        }
        Model_WorldNet.exiteCross();
        console.log("后端主动断开中央服");
    };
    Model_WorldNet.prototype.CG_Cross_heart_1667 = function () {
        var bates = this.getBytes();
        this.sendSocket(1667, bates, true);
        this.heartNum++;
        if (this.heartNum > 3) {
            this.notify(Model_WorldNet.WORLD_SOCKET_CLOSE);
            DEBUGWARING.log("跨服处于 断开状态");
        }
    };
    /**跨服心跳包*/
    Model_WorldNet.prototype.GC_Cross_heart_1668 = function (self, data) {
        self.heartNum--;
        DEBUGWARING.log("跨服处于 激活状态");
    };
    Model_WorldNet.WORLD_SOCKET_CLOSE = "WORLD_SOCKET_CLOSE"; //跨服无法连接
    Model_WorldNet.crossCMDList = [
        3553, 3555, 3559, 3561, 3565, 3567, 3569, 3571, 3573, 3575, 3577, 3579, 3591,
        4205, 4207, 4213, 4215, 4217, 4219, 4221, 4225, 4227, 4231, 4233, 4235, 4237, 1667
    ];
    return Model_WorldNet;
}(BaseModel));
__reflect(Model_WorldNet.prototype, "Model_WorldNet");
