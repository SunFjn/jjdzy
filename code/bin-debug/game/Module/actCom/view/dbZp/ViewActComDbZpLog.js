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
var ViewActComDbZpLog = (function (_super) {
    __extends(ViewActComDbZpLog, _super);
    function ViewActComDbZpLog() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewActComDbZpLog.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("actComDBZP");
        self.view = fairygui.UIPackage.createObject("actComDBZP", "ViewActComDbZpLog").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewActComDbZpLog.prototype.updateLog = function () {
        var str = "";
        var data = GGlobal.model_actCom.single_logData;
        var cfg = Config.scdnfl_272;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var itemname = ConfigHelp.getItemColorName(JSON.parse(cfg[item[0]].reward)[0][1]);
            str += BroadCastManager.reTxt("消耗{0}，抽中了<font color='#ffc334'>{1}倍</font>返利", itemname, item[1] / 100) + "\n";
        }
        this.n6.setText(str);
        this.n6.reScroll();
    };
    ViewActComDbZpLog.prototype.closeHd = function () {
        GGlobal.layerMgr.close2(UIConst.ACTCOM_DBZP_LOG);
    };
    ViewActComDbZpLog.prototype.onShown = function () {
        this.updateLog();
        GGlobal.model_actCom.CG_LOG_SINGLE();
        this.n3.addClickListener(this.closeHd, this);
        GGlobal.control.listen(Enum_MsgType.ACTCOM_SINGLE_LOG, this.updateLog, this);
    };
    ViewActComDbZpLog.prototype.onHide = function () {
        this.n3.removeClickListener(this.closeHd, this);
        GGlobal.control.remove(Enum_MsgType.ACTCOM_SINGLE_LOG, this.updateLog, this);
    };
    ViewActComDbZpLog.URL = "ui://eh3eod8qve5s4";
    return ViewActComDbZpLog;
}(UIModalPanel));
__reflect(ViewActComDbZpLog.prototype, "ViewActComDbZpLog");
