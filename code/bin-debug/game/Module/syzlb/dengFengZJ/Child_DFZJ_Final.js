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
var Child_DFZJ_Final = (function (_super) {
    __extends(Child_DFZJ_Final, _super);
    function Child_DFZJ_Final() {
        return _super.call(this) || this;
    }
    Child_DFZJ_Final.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "Child_DFZJ_Final"));
    };
    Child_DFZJ_Final.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s._plyArr = [s.ply0, s.ply1, s.ply2, s.ply3, s.ply4];
        s.btnSM.text = HtmlUtil.createLink("玩法说明");
    };
    Child_DFZJ_Final.prototype.registerEvent = function (pFlag) {
        var self = this;
        var m = GGlobal.modelDengFengZJ;
        m.register(pFlag, Model_DengFengZJ.FINAL_UI, self.updateShow, self);
        GGlobal.reddot.register(pFlag, UIConst.DENG_FENG_FINAL, self.upRed, self);
        EventUtil.register(pFlag, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.onAdd, self);
        EventUtil.register(pFlag, self.btnBet, egret.TouchEvent.TOUCH_TAP, self.onBet, self);
        EventUtil.register(pFlag, self.btnRank, egret.TouchEvent.TOUCH_TAP, self.onRank, self);
        EventUtil.register(pFlag, self.btnCge, egret.TouchEvent.TOUCH_TAP, self.onChage, self);
        EventUtil.register(pFlag, self.btnSM, egret.TextEvent.LINK, self.onLink, self);
        GGlobal.control.register(pFlag, Enum_MsgType.ZERO_RESET, self.zeroReset, self);
    };
    Child_DFZJ_Final.prototype.zeroReset = function () {
        GGlobal.modelDengFengZJ.CG_OPENUI(1);
    };
    Child_DFZJ_Final.prototype.onLink = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.DENG_FENG_FINAL);
    };
    Child_DFZJ_Final.prototype.show = function () {
        var s = this;
        s.registerEvent(true);
        s.zeroReset();
        s.lbCge.text = JSON.parse(ConfigHelp.getSystemDesc(8308))[0][2] + "";
        IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "dfzj2.jpg");
    };
    Child_DFZJ_Final.prototype.hide = function () {
        var s = this;
        s.registerEvent(false);
        for (var i = 0; i < s._plyArr.length; i++) {
            s._plyArr[i].clean();
        }
        IconUtil.setImg(s.imgBg, null);
    };
    Child_DFZJ_Final.prototype.updateShow = function () {
        var s = this;
        var m = GGlobal.modelDengFengZJ;
        for (var i = 0; i < 5; i++) {
            s._plyArr[i].finalVo(m.finalData[i], i);
        }
        s.lbPower.text = "" + ConfigHelp.getYiWanText(m.finalPower);
        if (m.finalRank == 0) {
            s.lbMyRank.text = "我的排名：未上榜";
            s.lbMyPoint.text = "";
            s.lbBatCt.text = "";
            s.btnAdd.visible = false;
            s.btnCge.visible = false;
            s.lbCge.visible = false;
            s.imgCge.visible = false;
        }
        else {
            s.lbMyRank.text = "我的排名：" + HtmlUtil.fontNoSize(m.finalRank + "", Color.GREENSTR);
            s.lbMyPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.finalPoint + "", Color.GREENSTR);
            s.lbBatCt.text = "今日挑战次数：" + HtmlUtil.fontNoSize(m.finalBatCt + "", m.finalBatCt > 0 ? Color.GREENSTR : Color.REDSTR);
            s.btnAdd.visible = true;
            s.btnCge.visible = true;
            s.lbCge.visible = true;
            s.imgCge.visible = true;
        }
        s.upRed();
    };
    Child_DFZJ_Final.prototype.upRed = function () {
        var s = this;
        s.btnBet.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_FINAL, 1);
    };
    Child_DFZJ_Final.prototype.onAdd = function () {
        var m = GGlobal.modelDengFengZJ;
        var s = this;
        if (m.status != 2) {
            ViewCommonWarn.text("本周赛事已结束");
            return;
        }
        ViewDengFengBuy.show(m.hasFinalBuy, Config.dfzjjs3_261, Handler.create(null, s.sureAdd));
    };
    Child_DFZJ_Final.prototype.sureAdd = function (ct) {
        GGlobal.modelDengFengZJ.CG_BUY_TIME(1, ct);
    };
    Child_DFZJ_Final.prototype.onBet = function () {
        GGlobal.layerMgr.open(UIConst.DENG_FENG_BET);
    };
    Child_DFZJ_Final.prototype.onRank = function () {
        GGlobal.layerMgr.open(UIConst.DENG_FENG_RANK, 1);
    };
    Child_DFZJ_Final.prototype.onChage = function () {
        var m = GGlobal.modelDengFengZJ;
        // if (m.status != 2) {
        // 	ViewCommonWarn.text("本周赛事已结束");
        // 	return;
        // }
        GGlobal.modelDengFengZJ.CG_REPLACE(1);
    };
    Child_DFZJ_Final.URL = "ui://3o8q23uujo891m";
    return Child_DFZJ_Final;
}(fairygui.GComponent));
__reflect(Child_DFZJ_Final.prototype, "Child_DFZJ_Final");
