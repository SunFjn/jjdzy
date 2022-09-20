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
var Model_HSCB = (function (_super) {
    __extends(Model_HSCB, _super);
    function Model_HSCB() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curLayer = 0;
        return _this;
    }
    Model_HSCB.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(7932, this.GC_OPENUI_7932, this);
        wsm.regHand(7934, this.GC_UPLAYER_7934, this);
        wsm.regHand(7936, this.GC_BAT_REW_7936, this);
    };
    Model_HSCB.prototype.CG_OPENUI_7931 = function () {
        var bytes = this.getBytes();
        this.sendSocket(7931, bytes);
    };
    //爬塔
    Model_HSCB.prototype.CG_UPLAYER_7933 = function () {
        var bytes = this.getBytes();
        this.sendSocket(7933, bytes);
    };
    //战斗结束奖励
    Model_HSCB.prototype.CG_BAT_REW_7935 = function () {
        var bytes = this.getBytes();
        this.sendSocket(7935, bytes);
    };
    //打开界面 I:当前关数（已通关）I:最高关数（第一名）U:最高关数名字（第一名）I:最高关数头像（第一名）I:最高关数头像框（第一名）
    Model_HSCB.prototype.GC_OPENUI_7932 = function (self, bytes) {
        self.curLayer = bytes.readInt();
        self.firLayer = bytes.readInt();
        self.firName = bytes.readUTF();
        self.firHead = bytes.readInt();
        self.firFrame = bytes.readInt();
        self.notify(Model_HSCB.msg_openui);
    };
    //爬塔 B:0成功 1失败 I:当前击败关卡B:战斗结果 0失败 1成功 2由前端决定结果
    Model_HSCB.prototype.GC_UPLAYER_7934 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 0) {
            self.batLayer = bytes.readInt();
            self.batRes = bytes.readByte() + 1;
            if (self.batRes > 2) {
                self.batRes = 0;
            }
            GGlobal.layerMgr.close2(UIConst.CHILDZJYW);
            GGlobal.mapscene.enterScene(SceneCtrl.HSCB);
        }
        else {
            ViewCommonWarn.text("挑战失败");
        }
        self.notify(Model_HSCB.msg_battle);
    };
    //请求本人关卡奖励 I:挑战关卡[B:类型I:系统I:数量]boss掉落
    Model_HSCB.prototype.GC_BAT_REW_7936 = function (self, bytes) {
        var layer = bytes.readInt();
        var len = bytes.readShort();
        self.batDrop = [];
        for (var i = 0; i < len; i++) {
            self.batDrop.push([bytes.readByte(), bytes.readInt(), bytes.readInt()]);
        }
        self.notify(Model_HSCB.msg_bat_rew);
    };
    Model_HSCB.prototype.getBigRewCfg = function (curLayer) {
        //大奖
        var maxLay = curLayer;
        var maxCfg = null;
        while (true) {
            var cfg = Config.hscb_751[maxLay];
            if (!cfg) {
                break;
            }
            if (cfg.dj != "0") {
                maxCfg = cfg;
                break;
            }
            maxLay++;
        }
        if (maxCfg == null) {
            maxLay = curLayer - 1;
            while (true) {
                var cfg = Config.hscb_751[maxLay];
                if (!cfg) {
                    break;
                }
                if (cfg.dj != "0") {
                    maxCfg = cfg;
                    break;
                }
                maxLay--;
            }
        }
        return maxCfg;
    };
    Model_HSCB.msg_openui = "msg_openui";
    Model_HSCB.msg_battle = "msg_battle";
    Model_HSCB.msg_bat_rew = "msg_bat_rew";
    return Model_HSCB;
}(BaseModel));
__reflect(Model_HSCB.prototype, "Model_HSCB");
