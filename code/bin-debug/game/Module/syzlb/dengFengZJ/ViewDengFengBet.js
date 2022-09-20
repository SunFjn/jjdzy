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
var ViewDengFengBet = (function (_super) {
    __extends(ViewDengFengBet, _super);
    function ViewDengFengBet() {
        var _this = _super.call(this) || this;
        _this._curPage = 1;
        _this._totalPage = 1;
        _this.childrenCreated();
        return _this;
    }
    ViewDengFengBet.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ViewDengFengBet"));
    };
    ViewDengFengBet.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("syzlb", "ViewDengFengBet").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderItm;
        _super.prototype.childrenCreated.call(this);
    };
    ViewDengFengBet.prototype.onShown = function () {
        var s = this;
        // s.update();
        s.registerEvent(true);
        var m = GGlobal.modelDengFengZJ;
        m.CG_GET_PREDICT();
        m.finalChaiID = 0;
        //下注消耗
        s.lbCt.text = JSON.parse(ConfigHelp.getSystemDesc(8304))[0][2] + "";
        var ct1 = JSON.parse(ConfigHelp.getSystemDesc(8305))[0][2] + "";
        var ct2 = JSON.parse(ConfigHelp.getSystemDesc(8306))[0][2] + "";
        // s.lbTip1.text = HtmlUtil.fontNoSize("下对", "#18F02C") + "获得       " + ct1 + "，" + HtmlUtil.fontNoSize("下错", "#ff0000") + "获得       " + ct2
        s.lbTip1.text = ct1 + "，" + HtmlUtil.fontNoSize("下错", "#ff0000") + "获得";
        s.lbTip2.text = "" + ct2;
    };
    ViewDengFengBet.prototype.onHide = function () {
        var s = this;
        s.list.numItems = 0;
        s.registerEvent(false);
        var m = GGlobal.modelDengFengZJ;
        m.finalChaiID = 0;
    };
    ViewDengFengBet.prototype.registerEvent = function (pFlag) {
        var self = this;
        var m = GGlobal.modelDengFengZJ;
        m.register(pFlag, Model_DengFengZJ.BET_DAT, self.update, self);
        m.register(pFlag, Model_DengFengZJ.BET_SUC, self.upSuc, self);
        EventUtil.register(pFlag, self.btn, egret.TouchEvent.TOUCH_TAP, self.onBet, self);
        EventUtil.register(pFlag, self.btnLeft, egret.TouchEvent.TOUCH_TAP, self.onLeft, self);
        EventUtil.register(pFlag, self.btnRight, egret.TouchEvent.TOUCH_TAP, self.onRight, self);
        EventUtil.register(pFlag, self.list, fairygui.ItemEvent.CLICK, self.onLstSel, self);
    };
    ViewDengFengBet.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelDengFengZJ;
        s._betArr = m.finalBetArr;
        s.upSuc();
        s._totalPage = s._betArr.length > 0 ? Math.ceil(s._betArr.length / 12) : 1;
        s._curPage = 1;
        s.upPage();
    };
    ViewDengFengBet.prototype.upSuc = function () {
        var s = this;
        var m = GGlobal.modelDengFengZJ;
        s.list.touchable = m.finalBetId == 0;
        if (m.getBetStatus()) {
            s.lbSt.text = "已下注";
            s.lbSt.color = Color.GREENINT;
            s.lbSt.visible = m.finalBetId > 0;
            s.lbCt.visible = m.finalBetId == 0;
            s.imgCt.visible = m.finalBetId == 0;
            s.btn.visible = m.finalBetId == 0;
        }
        else {
            s.lbSt.text = "已超时";
            s.lbSt.color = Color.REDINT;
            s.lbSt.visible = true;
            s.lbCt.visible = false;
            s.imgCt.visible = false;
            s.btn.visible = false;
        }
    };
    ViewDengFengBet.prototype.renderItm = function (index, obj) {
        obj.vo = this._betArr[index + (this._curPage - 1) * 12];
    };
    ViewDengFengBet.prototype.onBet = function () {
        var m = GGlobal.modelDengFengZJ;
        if (!m.finalChaiID) {
            ViewCommonWarn.text("没有选择玩家");
            return;
        }
        if (m.finalBetId > 0) {
            ViewCommonWarn.text("已下注");
            return;
        }
        GGlobal.modelDengFengZJ.CG_BET(m.finalChaiID);
    };
    /**
     * 左翻页事件
     */
    ViewDengFengBet.prototype.onLeft = function (e) {
        var s = this;
        s._curPage--;
        if (s._curPage < 1) {
            s._curPage = 1;
        }
        this.upPage();
    };
    /**
     * 右翻页事件
     */
    ViewDengFengBet.prototype.onRight = function (e) {
        var s = this;
        s._curPage++;
        if (s._curPage > s._totalPage) {
            s._curPage = s._totalPage;
        }
        s.upPage();
    };
    ViewDengFengBet.prototype.upPage = function () {
        var s = this;
        var m = GGlobal.modelDengFengZJ;
        s.pageTxt.text = s._curPage + "/" + s._totalPage;
        var len = s._betArr ? s._betArr.length : 0;
        if (len > 12)
            len = 12;
        s.list.numItems = len;
        var selIdx = -1;
        for (var i = 0; i < 12; i++) {
            var v = s._betArr[i + (s._curPage - 1) * 12];
            if (!v) {
                break;
            }
            if (v.plyId == m.finalBetId) {
                selIdx = i;
                break;
            }
        }
        s.list.selectedIndex = selIdx;
    };
    ViewDengFengBet.prototype.onLstSel = function (e) {
        var s = this;
        if (s._preSel) {
            s._preSel.check.selected = false;
        }
        var vSel = e.itemObject;
        vSel.check.selected = true;
        var m = GGlobal.modelDengFengZJ;
        if (vSel.vo) {
            m.finalChaiID = vSel.vo.plyId;
        }
        s._preSel = vSel;
    };
    ViewDengFengBet.URL = "ui://3o8q23uujo891s";
    return ViewDengFengBet;
}(UIModalPanel));
__reflect(ViewDengFengBet.prototype, "ViewDengFengBet");
