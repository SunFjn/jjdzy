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
var ChildSuit = (function (_super) {
    __extends(ChildSuit, _super);
    function ChildSuit() {
        var _this = _super.call(this) || this;
        _this.sysName = "兵法";
        _this.eventFunction = function (t) {
            var self = _this;
            var event = EventUtil.register;
            event(t, self.btnRight, EventUtil.TOUCH, self.pageHandler, self);
            event(t, self.btnLeft, EventUtil.TOUCH, self.pageHandler, self);
            event(t, self.btnExplain, EventUtil.TOUCH, self.onExplain, self);
            event(t, self.btnActivity, EventUtil.TOUCH, self.onClickActivity, self);
            event(t, self.list, fairygui.ItemEvent.CLICK, self.onClickList, self);
        };
        _this._hasCondition = false;
        return _this;
    }
    ChildSuit.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        sf.list.callbackThisObj = sf;
        sf.list.itemRenderer = sf.renderHander;
        sf.list.setVirtual();
        sf.listGrid.callbackThisObj = sf;
        sf.listGrid.itemRenderer = sf.renderGrid;
    };
    ChildSuit.prototype.open = function () {
        var sf = this;
        var control = GGlobal.control;
        sf.eventFunction(1);
        GGlobal.modelBingFa.listen(Model_BingFa.SUIT_ACTIVE, sf.jiBanUp, sf);
        sf.update();
    };
    ChildSuit.prototype.hide = function () {
        var sf = this;
        var control = GGlobal.control;
        sf.eventFunction(0);
        GGlobal.modelBingFa.remove(Model_BingFa.SUIT_ACTIVE, sf.jiBanUp, sf);
        IconUtil.setImg1(null, sf.imgName);
        IconUtil.setImg1(null, sf.imgIcon);
    };
    ChildSuit.prototype.jiBanUp = function () {
        var sf = this;
        sf.list.numItems = sf._jiBanArr.length;
        var selectIndex = Math.floor(sf._selectVo.id / 1000);
        sf.selectdUpdate(sf._jiBanArr[selectIndex - 1]);
        sf.upPower();
    };
    ChildSuit.prototype.update = function () {
        var sf = this;
        sf._jiBanArr = GGlobal.modelBingFa.suitData;
        sf.list.numItems = sf._jiBanArr.length;
        sf.list.scrollToView(0);
        sf.list.selectedIndex = 0;
        sf.selectdUpdate(sf._jiBanArr[0]);
        sf.upPower();
    };
    ChildSuit.prototype.upPower = function () {
        //套装战力
        var sf = this;
        var power = 0;
        if (sf._jiBanArr) {
            for (var i = 0; i < sf._jiBanArr.length; i++) {
                var v = sf._jiBanArr[i];
                var suit = Config.booksuit_212[v.id];
                if (suit) {
                    power += suit ? suit.power : 0;
                }
            }
        }
        sf.labPower.text = power + "";
    };
    ChildSuit.prototype.renderHander = function (index, obj) {
        var sf = this;
        var gird = obj;
        var v = sf._jiBanArr[index];
        gird.title = v.name;
        gird.data = v;
        gird.checkNotice = Model_BySys.checkSuitVo(v.id, Model_BySys.JIB_BINGFA);
    };
    ChildSuit.prototype.renderGrid = function (index, obj) {
        var sf = this;
        var v = obj;
        v.setSuitVo(sf._conditionArr[index].v);
    };
    ChildSuit.prototype.onClickList = function (e) {
        var sf = this;
        var selectItem = e.itemObject;
        sf.selectdUpdate(selectItem.data);
    };
    ChildSuit.prototype.selectdUpdate = function (v) {
        var sf = this;
        if (v == null) {
            return;
        }
        sf._selectVo = v;
        var suitId = v.id;
        var level = suitId % 1000;
        var suit = Config.booksuit_212[suitId];
        var suitNext = Config.booksuit_212[suitId + 1];
        if (level == 0) {
            sf.btnActivity.text = "激活";
        }
        else {
            sf.btnActivity.text = "升级";
        }
        sf.labLevel.text = "羁绊等级：" + level;
        sf.labSM.text = suit.tips;
        sf.labName.text = suit.name;
        var conditionArr;
        sf._hasCondition = true;
        if (suit.condition == "0") {
            sf.btnActivity.touchable = sf.btnActivity.visible = false;
            sf.labNeed.text = "";
            sf.labAttrCur.text = "";
            sf.boxMax.visible = true;
            sf.imgArrow.visible = false;
            sf.labAttrNext.text = "";
            sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suit.attr), "+", null, "#15f234") + sf.jcTxt(suit.jc, Color.getColorStr(Color.ORANGE));
            var suitPre = Config.booksuit_212[suitId - 1];
            conditionArr = ConfigHelp.SplitStr(suitPre.condition);
            sf._hasCondition = false;
        }
        else {
            if (suit.power == 0) {
                sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitNext.attr), "+", null, "#15f234") + sf.jcTxt(suitNext.jc, Color.getColorStr(Color.ORANGE));
                sf.labAttrCur.text = "";
                sf.labAttrNext.text = "";
                sf.imgArrow.visible = false;
            }
            else {
                sf.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suit.attr), "+") + sf.jcTxt(suit.jc);
                sf.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitNext.attr), "+", null, "#15f234") + sf.jcTxt(suitNext.jc, Color.getColorStr(Color.ORANGE));
                sf.labAttrMax.text = "";
                sf.imgArrow.visible = true;
            }
            sf.boxMax.visible = false;
            sf.btnActivity.visible = true;
            var allNum = 0;
            var reachNum = 0;
            var need;
            conditionArr = ConfigHelp.SplitStr(suit.condition);
            if (suitId == 0 || suitId % 1000 == 0) {
                need = "【" + suit.name + "】所属" + sf.sysName + "收集进度";
            }
            else {
                var $star = Number(conditionArr[0][1]);
                need = "【" + suit.name + "】所属" + sf.sysName + "达到" + $star + "星";
            }
            for (var j = 0; j < conditionArr.length; j++) {
                var $id = Number(conditionArr[j][0]);
                var $star = Number(conditionArr[j][1]);
                allNum++;
                var vo = GGlobal.modelBingFa.mapObj[$id];
                reachNum += vo.star >= $star ? 1 : 0;
            }
            if (reachNum < allNum) {
                sf._hasCondition = false;
            }
            sf.btnActivity.enabled = sf.btnActivity.checkNotice = sf._hasCondition;
            sf.labNeed.text = need + HtmlUtil.fontNoSize("(" + reachNum + "/" + allNum + ")", reachNum >= allNum ? '#00ff00' : '#ff0000');
        }
        sf._conditionArr = [];
        for (var i = 0; i < conditionArr.length; i++) {
            var $id = Number(conditionArr[i][0]);
            var $star = Number(conditionArr[i][1]);
            var vo = GGlobal.modelBingFa.mapObj[$id];
            sf._conditionArr.push({ v: vo, starLv: $star });
        }
        var totalType = 303;
        var totalValue = 0;
        for (var i = 0; i < sf._jiBanArr.length; i++) {
            var v_1 = sf._jiBanArr[i];
            var cfg = Config.booksuit_212[v_1.id];
            var arr = ConfigHelp.SplitStr(cfg.attr1);
            totalType = Number(arr[0][0]);
            totalValue += Number(arr[0][1]);
        }
        if (Config.jssx_002[totalType]) {
            sf.lab2.text = Config.jssx_002[totalType].attr + (totalValue / 1000) + "%";
        }
        sf.lab3.text = "可通过升级" + sf.sysName + "所属羁绊提升效果";
        sf.listGrid.numItems = sf._conditionArr.length;
        IconUtil.setImg1(Enum_Path.JIBAN_URL + "n" + UIConst.BINGFA + ".png", sf.imgName);
        IconUtil.setImg1(Enum_Path.JIBAN_URL + "i" + UIConst.BINGFA + ".png", sf.imgIcon);
    };
    ChildSuit.prototype.onClickActivity = function () {
        var sf = this;
        if (sf._selectVo.isMax) {
            ViewCommonWarn.text("已满级", Color.getColorInt(Color.RED));
            return;
        }
        if (!sf._hasCondition) {
            ViewCommonWarn.text("未满足条件", Color.getColorInt(Color.RED));
            return;
        }
        GGlobal.modelBingFa.CG_ACTIVESUIT_905(sf._selectVo.type);
    };
    ChildSuit.prototype.pageHandler = function (event) {
        var sf = this;
        var btn = event.target;
        var curpage = sf.list.getFirstChildInView();
        switch (btn.id) {
            case sf.btnLeft.id:
                if (curpage > 0) {
                    curpage = curpage - 3;
                    if (curpage < 0)
                        curpage = 0;
                }
                break;
            case sf.btnRight.id:
                if (curpage < sf.list.numItems - 1) {
                    curpage = curpage + 3;
                    if (curpage >= sf.list.numItems - 1)
                        curpage = sf.list.numItems - 1;
                }
                break;
        }
        sf.list.scrollToView(curpage, true, true);
    };
    ChildSuit.prototype.onExplain = function (e) {
        GGlobal.layerMgr.open(UIConst.WFLAB_PANEL);
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    ChildSuit.prototype.jcTxt = function (jc, color) {
        var sf = this;
        if (color)
            return HtmlUtil.fontNoSize("\n" + sf.sysName + "属性+" + (jc / 1000) + "%", color);
        else
            return "\n" + sf.sysName + "属性+" + (jc / 1000) + "%";
    };
    ChildSuit.URL = "ui://3tzqotadby8m38";
    return ChildSuit;
}(fairygui.GComponent));
__reflect(ChildSuit.prototype, "ChildSuit");
