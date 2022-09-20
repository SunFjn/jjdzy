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
var ViewQianRenZhan = (function (_super) {
    __extends(ViewQianRenZhan, _super);
    function ViewQianRenZhan() {
        var _this = _super.call(this) || this;
        _this.awards = [];
        _this.state = -1;
        _this.nextGuanQian = 0;
        _this.maxKill = 0;
        _this.loadRes("guanqia", "guanqia_atlas0");
        return _this;
    }
    ViewQianRenZhan.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqia", "ViewQianRenZhan"));
    };
    ViewQianRenZhan.prototype.childrenCreated = function () {
        GGlobal.createPack("guanqia");
        var s = this;
        s.view = fairygui.UIPackage.createObject("guanqia", "ViewQianRenZhan").asCom;
        s.contentPane = s.view;
        s.frame = (s.view.getChild("frame"));
        s.btnLQ = (s.view.getChild("btnLQ"));
        s.lbCount = (s.view.getChild("lbCount"));
        s.lbPro = (s.view.getChild("lbPro"));
        this.n11 = (s.view.getChild("n11"));
        this.n11.callbackThisObj = this;
        this.n11.itemRenderer = this.awardsRender;
        s.btnLQ.addClickListener(s.onLQhandler, s);
        _super.prototype.childrenCreated.call(this);
        s.resetPosition();
    };
    ViewQianRenZhan.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.grid.showEff(true);
    };
    ViewQianRenZhan.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelGuanQia;
        var index = m.killAwardsIndex + 1;
        if (!Config.kill_205[index]) {
            index = m.killAwardsIndex;
        }
        var lib = Config.kill_205[index];
        s.maxKill = lib["num"];
        var currentMax = m.getQRZMax();
        s.lbCount.text = "本日已领取(" + m.killAwardsIndex + "/" + currentMax + ")次奖励";
        if (m.killCount >= s.maxKill) {
            var str = Color.getColorStr(Color.GREEN);
        }
        else {
            var str = Color.getColorStr(Color.RED);
        }
        var awards = JSON.parse(lib["reward"]);
        s.state = -1;
        s.btnLQ.enabled = true;
        if (m.killCount < s.maxKill) {
            s.state = 1;
            s.tip = "条件未满足";
            s.btnLQ.enabled = false;
        }
        s.btnLQ.visible = true;
        if (m.killAwardsIndex == currentMax) {
            if (Config.kill_205[index]) {
                s.state = 2;
                s.tip = "通关" + Config.kill_205[index].tj + "关后可增加领取次数";
            }
            else {
                s.btnLQ.visible = false;
            }
        }
        s.awards = ConfigHelp.makeItemListArr(awards);
        s.n11.numItems = s.awards.length;
        if (!Config.kill_205[m.killAwardsIndex + 1]) {
            s.btnLQ.enabled = false;
            s.btnLQ.text = "已领取";
            s.lbPro.text = "已领取完所有奖励";
        }
        else {
            s.btnLQ.text = "领取";
            s.lbPro.text = "击败一定数量怪物可领取奖励<font color='" + str + "'>(" + m.killCount + "/" + s.maxKill + ")</font>";
        }
    };
    ViewQianRenZhan.prototype.onShown = function () {
        this.update();
        GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, this.update, this);
    };
    ViewQianRenZhan.prototype.onHide = function () {
        GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, this.update, this);
        GGlobal.layerMgr.close(UIConst.QIANRENZHAN);
    };
    ViewQianRenZhan.prototype.closeHandler = function () {
        this.n11.numItems = 0;
        GGlobal.layerMgr.close(UIConst.QIANRENZHAN);
    };
    ViewQianRenZhan.prototype.onLQhandler = function () {
        if (this.state != -1) {
            ViewCommonWarn.text(this.tip);
            return;
        }
        var m = GGlobal.modelGuanQia;
        m.CG_ZHANSHA_1111();
    };
    ViewQianRenZhan.URL = "ui://r92dp953u94lq";
    return ViewQianRenZhan;
}(UIModalPanel));
__reflect(ViewQianRenZhan.prototype, "ViewQianRenZhan");
