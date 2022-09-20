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
var Child_ActComLeiTai = (function (_super) {
    __extends(Child_ActComLeiTai, _super);
    function Child_ActComLeiTai() {
        var _this = _super.call(this) || this;
        _this._openUI = false;
        return _this;
    }
    Child_ActComLeiTai.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComLeiTai", "Child_ActComLeiTai"));
    };
    Child_ActComLeiTai.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.lbDes.text = HtmlUtil.createLink("玩法说明", true);
    };
    Child_ActComLeiTai.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemLeiTai.URL, ItemLeiTai);
        f(ItemLeiTaiHead.URL, ItemLeiTaiHead);
        f(ItemLeiTaiReport.URL, ItemLeiTaiReport);
    };
    Child_ActComLeiTai.prototype.initView = function (pParent) {
        var s = this;
        s._taiArr = [s.tai0, s.tai1, s.tai2, s.tai3, s.tai4];
        s._headArr = [s.vhead0, s.vhead1, s.vhead2];
    };
    Child_ActComLeiTai.prototype.openPanel = function (pData) {
        var s = this;
        var m = GGlobal.model_ActLeiTai;
        s.y = 0;
        s._act = pData;
        GGlobal.modelActivity.CG_OPENACT(s._act.id);
        s._openUI = true;
        m.actId = s._act.id; //刷新用
        IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "leitai.jpg");
        Timer.instance.listen(s.upTimer, s, 1000);
        s.registerEvent(true);
        if (m.batLeiTai) {
            s._selVo = m.batLeiTai;
            m.batLeiTai = null;
        }
    };
    Child_ActComLeiTai.prototype.closePanel = function (pData) {
        var s = this;
        IconUtil.setImg(s.imgBg, null);
        Timer.instance.remove(s.upTimer, s);
        Timer.instance.remove(s.upCd, s);
        s.registerEvent(false);
        for (var i = 0; i < s._taiArr.length; i++) {
            s._taiArr[i].clean();
        }
        s._selVo = null;
        var m = GGlobal.model_ActLeiTai;
        if (!m.batPlyId) {
            //关闭跨服
            Model_WorldNet.exiteCross();
        }
    };
    Child_ActComLeiTai.prototype.registerEvent = function (pFlag) {
        var s = this;
        var m = GGlobal.model_ActLeiTai;
        m.register(pFlag, Model_ActLeiTai.OPENUI, s.upView, s);
        EventUtil.register(pFlag, s.btnBat, egret.TouchEvent.TOUCH_TAP, s.onBattle, s);
        EventUtil.register(pFlag, s.btnReport, egret.TouchEvent.TOUCH_TAP, s.onReport, s);
        EventUtil.register(pFlag, s.lbDes, egret.TextEvent.LINK, s.onTFClick, s);
        EventUtil.register(pFlag, s.c1, fairygui.StateChangeEvent.CHANGED, s.onSel, s);
        var reddot = GGlobal.reddot;
        reddot.register(pFlag, UIConst.ACTCOM_LEITAI, s.upRed, s);
    };
    Child_ActComLeiTai.prototype.upTimer = function () {
        var s = this;
        var end = s._act ? s._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var leiTaiTime = GGlobal.model_ActLeiTai.leiTaiTime;
        var date = new Date(servTime * 1000);
        var hours = date.getHours();
        var mins = date.getMinutes();
        var vostart = leiTaiTime[0];
        if (hours < vostart.start) {
            s.labTime.text = "下场擂台开启时间：" + vostart.start + ":00:00";
            s._openUI = false;
            return;
        }
        var voend = leiTaiTime[leiTaiTime.length - 1];
        if (hours > voend.end0 || (hours == voend.end0 && mins >= voend.end1)) {
            if (end - servTime < 86400) {
                s.labTime.text = "活动已结束"; //最后一天
            }
            else {
                s.labTime.text = "下场擂台开启时间：" + vostart.start + ":00:00";
            }
            return;
        }
        var curCfg = null;
        var nextCfg = null;
        for (var i = 0; i < leiTaiTime.length; i++) {
            var v = leiTaiTime[i];
            if (hours < v.start && nextCfg == null) {
                nextCfg = v;
            }
            if (hours >= v.start && hours <= v.end0 && mins < v.end1) {
                curCfg = v;
                break;
            }
        }
        if (curCfg) {
            date.setHours(curCfg.end0);
            date.setMinutes(curCfg.end1);
            date.setSeconds(0);
            s.labTime.text = "本场剩余时间：" + DateUtil.getMSBySecond4(date.getTime() / 1000 - servTime);
            if (!s._openUI) {
                GGlobal.modelActivity.CG_OPENACT(s._act.id);
                s._openUI = true;
            }
        }
        else {
            if (nextCfg) {
                s.labTime.text = "下场擂台开启时间：" + nextCfg.start + ":00:00";
                s._openUI = false;
            }
            else {
                s.labTime.text = "活动已经结束";
            }
        }
    };
    Child_ActComLeiTai.prototype.upView = function () {
        var m = GGlobal.model_ActLeiTai;
        var s = this;
        var arr = m.leiTaiArr;
        s.imgArrow.visible = false;
        var mineId = Model_player.voMine.id;
        var selIdx = 0;
        for (var i = 0; i < s._taiArr.length; i++) {
            var tai = s._taiArr[i];
            var voTai = arr[i];
            tai.setVo(voTai, i);
            if (s._selVo && voTai && s._selVo.id == voTai.id) {
                selIdx = i;
            }
            if (!s.imgArrow.visible) {
                for (var j = 0; j < voTai.plyArr.length; j++) {
                    if (voTai.plyArr[j] && voTai.plyArr[j].plyId == mineId) {
                        s.imgArrow.visible = true;
                        s.imgArrow.x = tai.x + tai.width / 2;
                        s.imgArrow.y = tai.y - s.imgArrow.height + 40;
                    }
                }
            }
        }
        s._selVo = arr[selIdx];
        s.c1.selectedIndex = selIdx;
        s.upSel();
        if (m.batCd > 0) {
            Timer.instance.listen(s.upCd, s, 1000);
        }
        else {
            Timer.instance.remove(s.upCd, s);
            s.lbCt.text = "";
        }
        s.upRed();
    };
    Child_ActComLeiTai.prototype.upRed = function () {
        var s = this;
        var reddot = GGlobal.reddot;
        s.btnReport.checkNotice = reddot.checkCondition(UIConst.ACTCOM_LEITAI, 1);
    };
    Child_ActComLeiTai.prototype.upCd = function () {
        var m = GGlobal.model_ActLeiTai;
        var s = this;
        if (m.batCd > 0) {
            s.lbCt.text = "挑战CD:" + DateUtil.getHMSBySecond(m.batCd);
        }
        else {
            Timer.instance.remove(s.upCd, s);
            s.lbCt.text = "";
        }
        m.batCd--;
    };
    Child_ActComLeiTai.prototype.onSel = function () {
        var s = this;
        var m = GGlobal.model_ActLeiTai;
        if (!m.leiTaiArr) {
            return;
        }
        var idx = s.c1.selectedIndex;
        s._selVo = m.leiTaiArr[idx];
        s.upSel();
    };
    Child_ActComLeiTai.prototype.upSel = function () {
        var s = this;
        var arr = s._selVo.plyArr;
        for (var i = 0; i < 3; i++) {
            s._headArr[i].setVo(arr[i], s._selVo, i);
        }
    };
    Child_ActComLeiTai.prototype.onBattle = function () {
        var s = this;
        if (!s._selVo) {
            return;
        }
        var m = GGlobal.model_ActLeiTai;
        if (!m.isOpenTime()) {
            ViewCommonWarn.text("不在开启时间");
            return;
        }
        if (m.batCd > 0) {
            ViewCommonWarn.text("挑战CD中");
            return;
        }
        if (m.hasMine()) {
            ViewAlert.show("同一时间只能守擂（协助）一个擂台\n是否确定挑战（协助）", new Handler(s, s.onBattleSure));
        }
        else {
            s.onBattleSure();
        }
    };
    Child_ActComLeiTai.prototype.onBattleSure = function () {
        var m = GGlobal.model_ActLeiTai;
        var s = this;
        m.CG_CHALLENGE_11601(s._selVo.id, s._selVo.plyArr[0].plyId);
    };
    Child_ActComLeiTai.prototype.onTFClick = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_LEITAI);
    };
    Child_ActComLeiTai.prototype.onReport = function () {
        GGlobal.layerMgr.open(UIConst.ACTCOM_LEITAI_REPORT);
    };
    Child_ActComLeiTai.URL = "ui://rhfap29in0930";
    Child_ActComLeiTai.pkg = "actComLeiTai";
    return Child_ActComLeiTai;
}(fairygui.GComponent));
__reflect(Child_ActComLeiTai.prototype, "Child_ActComLeiTai", ["IPanel"]);
