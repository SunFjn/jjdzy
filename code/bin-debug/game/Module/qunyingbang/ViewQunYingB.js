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
var ViewQunYingB = (function (_super) {
    __extends(ViewQunYingB, _super);
    function ViewQunYingB() {
        var _this = _super.call(this) || this;
        _this.awards = [];
        _this.systemID = 0;
        _this.isZeroUpdate = false;
        _this.setSkin("qunyingbang", "qunyingbang_atlas0", "ViewQunYingB");
        return _this;
    }
    ViewQunYingB.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(QunYingBIt.URL, QunYingBIt);
    };
    ViewQunYingB.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.lst.itemRenderer = s.itemRender;
        s.lst.callbackThisObj = s;
        s.lst.setVirtual();
    };
    ViewQunYingB.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    };
    ViewQunYingB.prototype.itemRender = function (idx, obj) {
        var it = obj;
        it.setdata(this.dta[idx]);
    };
    ViewQunYingB.prototype.refreshHD = function () {
        GGlobal.model_QunYingBang.CG_SHUAXIN();
    };
    ViewQunYingB.prototype.openDesc = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.QUNYINGBANG);
    };
    ViewQunYingB.prototype.lingqHD = function () {
        GGlobal.model_QunYingBang.CG_LINGQU(this.nextIdx);
    };
    ViewQunYingB.prototype.update = function () {
        var s = this;
        var m = GGlobal.model_QunYingBang;
        var day = m.day;
        var lib = Config.qy_235[day];
        if (!lib)
            return;
        var itname;
        var it = JSON.parse(lib.item);
        if (it[0][0] < 3)
            itname = ConfigHelp.getItemColorName(it[0][1]);
        else
            itname = ConfigHelp.AttrName(it[0][0]);
        s.lbDesc.text = "活动期间每消耗1个" + itname + "获得" + lib.point + "积分";
        s.lbTitle.text = itname;
        s.lbNext.text = "下期群英榜：" + lib.next;
        s.lbName.text = Model_player.voMine.name;
        s.lbMyRank.text = "我的排名：" + m.myRank;
        s.lbScore.text = "积分：" + m.score;
        var lstDta;
        if (m.rankDta.length != 0) {
            s.dta = m.rankDta;
            if (m.myRank == 0) {
                lstDta = m.rankDta[s.dta.length - 1];
            }
            else {
                var r = m.myRank == 1 ? 0 : m.myRank - 2;
                lstDta = m.rankDta[r];
            }
            s.lst.numItems = s.dta.length;
        }
        if (lstDta) {
            s.lbLastRank.text = "上一排名：" + lstDta[0];
            s.lblastName.text = lstDta[2];
            s.lblastScore.text = "积分：" + lstDta[3];
        }
        else {
            s.lbLastRank.text = "上一排名：";
            s.lblastName.text = "";
            s.lblastScore.text = "";
        }
        var plib = Config.qypoint_235;
        if (m.awardID == 0) {
            s.nextIdx = m.day * 100 + 1;
        }
        else {
            if (plib[m.awardID + 1])
                s.nextIdx = m.awardID + 1;
            else
                s.nextIdx = -1;
        }
        var award;
        var count;
        s.ylq.visible = s.btnLQ.visible = s.btnGo.visible = false;
        if (s.nextIdx != -1) {
            award = plib[s.nextIdx].reward;
            count = plib[s.nextIdx].point;
            s.btnGo.visible = m.score < count;
            s.btnLQ.visible = m.score >= count;
            s.btnLQ.checkNotice = true;
            this.systemID = plib[s.nextIdx].systemid;
        }
        else {
            s.ylq.visible = true;
            award = plib[m.awardID].reward;
            count = plib[m.awardID].point;
            this.systemID = plib[m.awardID].systemid;
        }
        ConfigHelp.createViewGridList(s.n39, award, s);
        s.lbPro.text = s.getWanText1(m.score) + "/" + s.getWanText1(count);
        s.lbPro.color = m.score >= count ? Color.GREENINT : Color.REDINT;
        var t = Model_GlobalMsg.getServerTime();
        var zero = TimeUitl.getZeroTime(t);
        var t1 = zero + 86400000;
        if (t >= zero && t <= zero + 300 * 1000) {
            s.ylq.visible = s.btnLQ.visible = s.btnGo.visible = false;
        }
    };
    /**将超过1000000的数值转换成x.x万显示 */
    ViewQunYingB.prototype.getWanText1 = function (v) {
        if (v >= 100000) {
            return (v / 10000).toFixed(1) + "万";
        }
        else {
            return String(v);
        }
    };
    ViewQunYingB.prototype.goHandler = function () {
        GGlobal.layerMgr.open(this.systemID);
    };
    ViewQunYingB.prototype.updateX = function () {
        var s = this;
        var t = Model_GlobalMsg.getServerTime();
        var zero = TimeUitl.getZeroTime(t);
        var t1 = zero + 86400000;
        if (t >= zero && t <= zero + 300 * 1000) {
            s.promptLb.visible = true;
            s.promptLb.text = "活动已结束\n" + HtmlUtil.fontNoSize("0点5分开启下期群英榜", Color.getColorStr(2));
            s.btnGo.visible = false;
            s.btnLQ.visible = false;
            s.lbTime.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
            s.isZeroUpdate = true;
        }
        else {
            var str = TimeUitl.getRemainingTime(t1, t, { hour: "小时", minute: "分", second: "秒" });
            s.lbTime.text = str;
            s.promptLb.visible = false;
            if (s.isZeroUpdate) {
                s.isZeroUpdate = false;
                GGlobal.model_QunYingBang.CG_OPEN();
            }
        }
    };
    ViewQunYingB.prototype.onShown = function () {
        var s = this;
        GGlobal.control.listen(Enum_MsgType.QUNYINGBANG, s.update, s);
        GGlobal.control.listen(Enum_MsgType.QUNYINGBANG_LAST, s.update, s);
        s.isZeroUpdate = false;
        Timer.instance.listen(s.updateX, s, 1000);
        this.c1.selectedIndex = 0;
        this.selectPage();
        var day = Config.xitong_001[UIConst.QUNYINGBANG].day;
        var ms = Model_GlobalMsg.getServerTime();
        var data = new Date(ms);
        var hou = data.getHours();
        var min = data.getMinutes();
        if (Model_GlobalMsg.kaifuDay == day + 1 && (hou > 0 || min > 5)) {
            this.tab0.visible = true;
            this.tab1.visible = true;
        }
        else if (Model_GlobalMsg.kaifuDay > day + 1) {
            this.tab0.visible = true;
            this.tab1.visible = true;
        }
        else {
            this.tab0.visible = false;
            this.tab1.visible = false;
        }
        IconUtil.setImg(s.imgPic, Enum_Path.BACK_URL + "qunyingbang.jpg");
    };
    ViewQunYingB.prototype.onHide = function () {
        var s = this;
        s.isZeroUpdate = false;
        s.n39.numItems = 0;
        s.lst.numItems = 0;
        Timer.instance.remove(s.updateX, s);
        GGlobal.control.remove(Enum_MsgType.QUNYINGBANG, s.update, s);
        GGlobal.control.remove(Enum_MsgType.QUNYINGBANG_LAST, s.update, s);
        GGlobal.layerMgr.close(UIConst.QUNYINGBANG);
        IconUtil.setImg(s.imgPic, null);
    };
    ViewQunYingB.prototype.eventFunction = function (t) {
        var self = this;
        var event = EventUtil.register;
        event(t, self.btnGo, EventUtil.TOUCH, self.goHandler, self);
        event(t, self.btnLQ, EventUtil.TOUCH, self.lingqHD, self);
        event(t, self.btnDesc, EventUtil.TOUCH, self.openDesc, self);
        event(t, self.btnShuaX, EventUtil.TOUCH, self.refreshHD, self);
        event(t, self.c1, fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
    };
    ViewQunYingB.prototype.selectPage = function () {
        var i = this.c1.selectedIndex;
        if (i == 0) {
            GGlobal.model_QunYingBang.CG_OPEN();
        }
        else if (i == 1) {
            GGlobal.model_QunYingBang.CG_LAST_2197();
        }
        this.update();
    };
    ViewQunYingB.URL = "ui://pxel4rmbwzou0";
    return ViewQunYingB;
}(UIPanelBase));
__reflect(ViewQunYingB.prototype, "ViewQunYingB");
