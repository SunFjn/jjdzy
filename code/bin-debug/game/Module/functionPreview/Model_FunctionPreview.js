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
var Model_FunctionPreview = (function (_super) {
    __extends(Model_FunctionPreview, _super);
    function Model_FunctionPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_FunctionPreview.getFunctionPreView = function () {
        if (Model_FunctionPreview.listArr.length <= 0) {
            for (var key in Config.sysshow_228) {
                var cfg = Config.sysshow_228[key];
                Model_FunctionPreview.listArr.push(cfg);
            }
            Model_FunctionPreview.listArr.sort(GGlobal.modelPreview.sortList);
        }
    };
    Model_FunctionPreview.prototype.sortList = function (a, b) {
        if ((Model_FunctionPreview.drawArr.indexOf(a.id) != -1 && Model_FunctionPreview.drawArr.indexOf(b.id) != -1) ||
            (Model_FunctionPreview.drawArr.indexOf(a.id) == -1 && Model_FunctionPreview.drawArr.indexOf(b.id) == -1)) {
            return a.id - b.id;
        }
        else {
            if (Model_FunctionPreview.drawArr.indexOf(a.id) != -1) {
                return 1;
            }
            else {
                return -1;
            }
        }
    };
    /**1801  打开功能预览界面 */
    Model_FunctionPreview.prototype.CG_OPEN_FUNCTIONPREVIEW = function () {
        var ba = new BaseBytes();
        this.sendSocket(1801, ba);
    };
    /**1803 领取目标奖励 I:关卡id  */
    Model_FunctionPreview.prototype.CG_FUNCTIONPREVIEW_DRAWREWARD = function (guanqia) {
        var ba = new BaseBytes();
        ba.writeInt(guanqia);
        this.sendSocket(1803, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_FunctionPreview.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(1802, this.GC_OPEN_FUNCTIONPREVIEW, this);
        wsm.regHand(1804, this.GC_FUNCTIONPREVIEW_DRAWREWARD, this);
    };
    /**1804 领取目标奖励 B:状态，1：成功，2：没有该奖励 3：当前关卡不满足 4：不可重复领取I:状态为成功时返回关卡奖励id  */
    Model_FunctionPreview.prototype.GC_FUNCTIONPREVIEW_DRAWREWARD = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_FunctionPreview.drawArr.push(data.readInt());
            GGlobal.control.notify(Enum_MsgType.FUNCTIONPREVIEW);
        }
    };
    /**1802 打开功能预览界面 [I:关卡id]已领取的列表I:现在的关卡id  */
    Model_FunctionPreview.prototype.GC_OPEN_FUNCTIONPREVIEW = function (self, data) {
        Model_FunctionPreview.drawArr = [];
        Model_FunctionPreview.isFirstOpen = true;
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_FunctionPreview.drawArr.push(data.readInt());
        }
        GGlobal.control.notify(Enum_MsgType.FUNCTIONPREVIEW);
    };
    Model_FunctionPreview.listArr = [];
    Model_FunctionPreview.drawArr = [];
    Model_FunctionPreview.isFirstOpen = false;
    return Model_FunctionPreview;
}(BaseModel));
__reflect(Model_FunctionPreview.prototype, "Model_FunctionPreview");
