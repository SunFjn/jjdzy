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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewHomeEvent = (function (_super) {
    __extends(ViewHomeEvent, _super);
    function ViewHomeEvent() {
        var _this = _super.call(this) || this;
        _this.clickHD = function () {
            var model = GGlobal.homemodel;
            if (model.isSelfHome) {
                if (model.remaindEventAward == 0) {
                    ViewCommonWarn.text("没有次数啦");
                }
            }
            else {
                if (model.helpTime == 0) {
                    ViewCommonWarn.text("没有帮助次数啦");
                }
            }
            GGlobal.homemodel.CG_House_event_11123(_this._eventid);
        };
        _this._eventid = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewHomeEvent.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewHomeEvent"));
    };
    ViewHomeEvent.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomeEvent").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewHomeEvent.prototype.eventFunction = function (type) {
        var self = this;
        EventUtil.register(type, self.n4, EventUtil.TOUCH, self.clickHD, self);
    };
    ViewHomeEvent.prototype.onShown = function () {
        var self = this;
        self._eventid = Number(self._args);
        var cfg = Config.fdsjsj_019[self._eventid];
        if (!cfg) {
            ViewCommonWarn.text("无法查找到事件的配置" + self._eventid);
            return;
        }
        var model = GGlobal.homemodel;
        if (model.isSelfHome) {
            self.lbCount.text = "剩余次数：" + model.remaindEventAward + "/" + ConfigHelp.getSystemNum(7112);
        }
        else {
            self.lbCount.text = "剩余帮助次数：" + model.helpTime + "/" + ConfigHelp.getSystemNum(7120);
        }
        self.lbInfo.text = cfg.wenzi;
        ConfigHelp.createViewGridList(self.n3, cfg.jiangli, self);
    };
    ViewHomeEvent.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.HOME_EVENT_UI);
    };
    ViewHomeEvent.URL = "ui://y0plc878g2m4f";
    return ViewHomeEvent;
}(UIModalPanel));
__reflect(ViewHomeEvent.prototype, "ViewHomeEvent");
