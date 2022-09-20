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
var Child_ActLuckTurn = (function (_super) {
    __extends(Child_ActLuckTurn, _super);
    function Child_ActLuckTurn() {
        return _super.call(this) || this;
    }
    Child_ActLuckTurn.createInstance = function () {
        return (fairygui.UIPackage.createObject("actLuckTurn", "Child_ActLuckTurn"));
    };
    Child_ActLuckTurn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActLuckTurn.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemActLuckTurn.URL, ItemActLuckTurn);
        f(ItemActLuckTurnTarge.URL, ItemActLuckTurnTarge);
    };
    Child_ActLuckTurn.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        s._cardArr = [s.card0, s.card1, s.card2, s.card3];
        for (var i = 0; i < s._cardArr.length; i++) {
            s._cardArr[i].index = i - 1;
        }
        s.lb3.text = "每期活动重置翻牌数和目标奖励";
    };
    Child_ActLuckTurn.prototype.openPanel = function (pData) {
        var s = this;
        var m = GGlobal.model_LuckTurn;
        s.y = 257;
        s._act = pData;
        Timer.instance.listen(s.upTimer, s);
        m.listen(Model_LuckTurn.OPENUI, s.upView, s);
        m.listen(Model_LuckTurn.TURN, s.upTurn, s);
        GGlobal.reddot.listen(UIConst.ACTCOM, s.upRed, s);
        s.btnTarge.addClickListener(s.onTarge, s);
        s.btnSM.addClickListener(s.onShuoMing, s);
        s.btnTen.addClickListener(s.onTen, s);
        s.btnMust.addClickListener(s.onMust, s);
        s.checkBox.addClickListener(s.onCheck, s);
        for (var i = 1; i < s._cardArr.length; i++) {
            s._cardArr[i].addClickListener(s.onCard, s);
        }
        GGlobal.modelActivity.CG_OPENACT(s._act.id);
        //红点
        m.CG_TARGET_OPEN_10343();
        s.upList(s._act.qs);
        s.upView();
        s.upRed();
        var key = Model_player.voMine.id + "LuckTurnCheck";
        var val = egret.localStorage.getItem(key);
        Model_LuckTurn.skipTween = val == "1" ? true : false;
        s.checkBox.selected = Model_LuckTurn.skipTween;
    };
    Child_ActLuckTurn.prototype.closePanel = function (pData) {
        var s = this;
        var m = GGlobal.model_LuckTurn;
        s.list.numItems = 0;
        Timer.instance.remove(s.upTimer, s);
        m.remove(Model_LuckTurn.OPENUI, s.upView, s);
        m.remove(Model_LuckTurn.TURN, s.upTurn, s);
        GGlobal.reddot.remove(UIConst.ACTCOM, s.upRed, s);
        s.btnTarge.removeClickListener(s.onTarge, s);
        s.btnSM.removeClickListener(s.onShuoMing, s);
        s.btnTen.removeClickListener(s.onTen, s);
        s.btnMust.removeClickListener(s.onMust, s);
        s.checkBox.removeClickListener(s.onCheck, s);
        for (var i = 1; i < s._cardArr.length; i++) {
            s._cardArr[i].removeClickListener(s.onCard, s);
        }
    };
    Child_ActLuckTurn.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.closePanel();
    };
    Child_ActLuckTurn.prototype.itemRender = function (index, obj) {
        var s = this;
        var item = obj;
        item.tipEnabled = item.isShowEff = true;
        item.vo = s._listData[index];
    };
    Child_ActLuckTurn.prototype.upTimer = function () {
        var s = this;
        var end = s._act ? s._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            s.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            s.lbTime.text = "00:00:00";
        }
    };
    Child_ActLuckTurn.prototype.upList = function (qs) {
        var s = this;
        var m = GGlobal.model_LuckTurn;
        var cfg = Config.slfpjlb_330[qs];
        s._listData = ConfigHelp.makeItemListArr(JSON.parse(cfg.show));
        s.list.numItems = s._listData ? s._listData.length : 0;
        if (s.list.numItems > 0) {
            s.list.scrollToView(0);
        }
        var ybCost = Config.slfpxhb_330[qs * 1000 + 1].yb;
        var ybMust = Config.slfpxhb_330[qs * 1000 + 2].yb;
        var ybTen = Config.slfpxhb_330[qs * 1000 + 3].yb;
        m.ybCost = ybCost;
        m.ybMust = ybMust;
        m.ybTen = ybTen;
    };
    Child_ActLuckTurn.prototype.upCost = function () {
        var s = this;
        var m = GGlobal.model_LuckTurn;
        var yb = Model_player.voMine.yuanbao;
        var color = m.ybCost <= yb ? Color.GREENSTR : Color.REDSTR;
        for (var i = 0; i < s._cardArr.length; i++) {
            s._cardArr[i].cost = HtmlUtil.fontNoSize(m.ybCost + "", color);
        }
        color = m.ybMust <= yb ? Color.GREENSTR : Color.REDSTR;
        s.lbMust.text = HtmlUtil.fontNoSize(m.ybMust + "", color);
        color = m.ybTen <= yb ? Color.GREENSTR : Color.REDSTR;
        s.lbTen.text = HtmlUtil.fontNoSize(m.ybTen + "", color);
    };
    Child_ActLuckTurn.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_LuckTurn;
        s.upTimer();
        var max = ConfigHelp.getSystemNum(7635);
        var color = m.turnCt >= max ? Color.REDSTR : Color.GREENSTR;
        s.lb2.text = "已翻牌数：" + HtmlUtil.fontNoSize(m.turnCt + "/" + max, color);
        s.lb1.text = "累计获胜数：" + HtmlUtil.fontNoSize(m.winCt + "", Color.GREENSTR);
        m.cardArr;
        s.card1.st = m.cardArr[0];
        s.card2.st = m.cardArr[1];
        s.card3.st = m.cardArr[2];
        s.upCost();
    };
    Child_ActLuckTurn.prototype.upRed = function () {
        var s = this;
        s.btnTarge.checkNotice = GGlobal.reddot.checkCondition(UIConst.LUCK_TURN);
    };
    Child_ActLuckTurn.prototype.upTurn = function (pos) {
        var s = this;
        if (pos < 4) {
            s._cardArr[pos + 1].turn();
        }
        else {
            for (var i = 1; i < s._cardArr.length; i++) {
                s._cardArr[i].turn();
            }
        }
    };
    Child_ActLuckTurn.prototype.onShuoMing = function () {
        var s = this;
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, s._act.id);
    };
    Child_ActLuckTurn.prototype.onTarge = function () {
        GGlobal.layerMgr.open(UIConst.LUCK_TURN_TARGE);
    };
    Child_ActLuckTurn.prototype.onTen = function () {
        GGlobal.model_LuckTurn.turnTenCt();
    };
    Child_ActLuckTurn.prototype.onMust = function () {
        if (Model_LuckTurn.isMoive) {
            ViewCommonWarn.text("请稍后");
            return;
        }
        if (!Model_LuckTurn.skipTween) {
            Model_LuckTurn.isMoive = true;
        }
        GGlobal.model_LuckTurn.CG_TURN_10341(20);
    };
    Child_ActLuckTurn.prototype.onCard = function (e) {
        var item = e.currentTarget;
        if (item.index == -1) {
            return;
        }
        if (item.st != -1) {
            return;
        }
        if (Model_LuckTurn.isMoive) {
            ViewCommonWarn.text("请稍后");
            return;
        }
        if (!Model_LuckTurn.skipTween) {
            Model_LuckTurn.isMoive = true;
        }
        GGlobal.model_LuckTurn.CG_TURN_10341(10 + item.index);
    };
    Child_ActLuckTurn.prototype.onCheck = function (e) {
        Model_LuckTurn.skipTween = this.checkBox.selected;
        var key = Model_player.voMine.id + "LuckTurnCheck";
        var val = Model_LuckTurn.skipTween ? "1" : "0";
        egret.localStorage.setItem(key, val);
    };
    Child_ActLuckTurn.URL = "ui://px5jiht9kzdy0";
    Child_ActLuckTurn.pkg = "actLuckTurn";
    return Child_ActLuckTurn;
}(fairygui.GComponent));
__reflect(Child_ActLuckTurn.prototype, "Child_ActLuckTurn", ["IPanel"]);
