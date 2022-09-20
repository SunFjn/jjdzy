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
var ChildZhanJiaSuit = (function (_super) {
    __extends(ChildZhanJiaSuit, _super);
    function ChildZhanJiaSuit() {
        var _this = _super.call(this) || this;
        _this.sysName = "战甲";
        _this.eventFunction = function (t) {
            var s = _this;
            var event = EventUtil.register;
            event(t, s.list, fairygui.ItemEvent.CLICK, s.onClickList, s);
            event(t, s.btnActivity, EventUtil.TOUCH, s.onClickActivity, s);
            event(t, s.btnLeft, EventUtil.TOUCH, s.pageHandler, s);
            event(t, s.btnRight, EventUtil.TOUCH, s.pageHandler, s);
            event(t, s.btnExplain, EventUtil.TOUCH, s.onExplain, s);
        };
        _this._hasCondition = false;
        return _this;
    }
    ChildZhanJiaSuit.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        sf.list.callbackThisObj = sf;
        sf.list.itemRenderer = sf.renderHander;
        sf.list.setVirtual();
        sf.listGrid.callbackThisObj = sf;
        sf.listGrid.itemRenderer = sf.renderGrid;
        sf.listGrid.touchable = false;
    };
    ChildZhanJiaSuit.prototype.open = function () {
        var s = this;
        s.eventFunction(1);
        GGlobal.control.listen(Enum_MsgType.ZHANJIA_UP_SUIT, s.jiBanUp, s);
        // s.update();
    };
    ChildZhanJiaSuit.prototype.close = function () {
        var s = this;
        IconUtil.setImg(s.imgName, null);
        IconUtil.setImg(s.imgIcon, null);
        s.eventFunction(0);
        GGlobal.control.remove(Enum_MsgType.ZHANJIA_UP_SUIT, s.jiBanUp, s);
    };
    ChildZhanJiaSuit.prototype.jiBanUp = function () {
        var sf = this;
        if (sf._selectVo == null) {
            return;
        }
        sf.list.numItems = sf._jiBanArr.length;
        var selectIndex = Math.floor(Number(sf._selectVo) / 1000);
        sf.list.selectedIndex = selectIndex - 1;
        sf.selectdUpdate(sf._jiBanArr[selectIndex - 1]);
        sf.upPower();
    };
    ChildZhanJiaSuit.prototype.update = function () {
        var sf = this;
        sf._jiBanArr = Model_ZhanJia.actiSuitArr;
        sf.list.numItems = sf._jiBanArr.length;
        sf.list.scrollToView(0);
        sf.list.selectedIndex = 0;
        sf.selectdUpdate(sf._jiBanArr[0]);
        sf.upPower();
    };
    ChildZhanJiaSuit.prototype.upPower = function () {
        //套装战力
        var s = this;
        var power = 0;
        if (s._jiBanArr) {
            for (var i = 0; i < s._jiBanArr.length; i++) {
                var ids = s._jiBanArr[i];
                var suit = Config.clothessuit_212[ids];
                if (suit) {
                    power += suit ? suit.power : 0;
                }
            }
        }
        s.labPower.text = power + "";
    };
    ChildZhanJiaSuit.prototype.renderHander = function (index, obj) {
        var s = this;
        var gird = obj;
        var suitId = s._jiBanArr[index];
        var suit = Config.clothessuit_212[suitId];
        gird.title = suit ? suit.name : "";
        gird.data = suitId;
        gird.checkNotice = Model_BySys.checkSuitVo(suitId, Model_BySys.JIB_ZHANJIA);
    };
    ChildZhanJiaSuit.prototype.renderGrid = function (index, obj) {
        var v = obj;
        v.setSuitVo(this._conditionArr[index]);
    };
    ChildZhanJiaSuit.prototype.onClickList = function (e) {
        var selectItem = e.itemObject;
        this.selectdUpdate(selectItem.data);
    };
    ChildZhanJiaSuit.prototype.selectdUpdate = function (suitId) {
        var self = this;
        if (suitId == null) {
            return;
        }
        self._selectVo = suitId;
        var level = suitId % 1000;
        var suit = Config.clothessuit_212[suitId];
        if (!suit) {
            return;
        }
        var suitNext = Config.clothessuit_212[suitId + 1];
        if (level == 0) {
            self.btnActivity.text = "激活";
        }
        else {
            self.btnActivity.text = "升级";
        }
        self.labLevel.text = "羁绊等级：" + level;
        self.labSM.text = suit.tips;
        self.labName.text = suit.name;
        var conditionArr;
        self._hasCondition = true;
        if (suit.condition == "0") {
            self.btnActivity.touchable = self.btnActivity.visible = false;
            self.labNeed.text = "";
            self.labAttrCur.text = "";
            self.boxMax.visible = true;
            self.imgArrow.visible = false;
            self.labAttrNext.text = "";
            self.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suit.attr), "+", null, "#15f234") + self.jcTxt(suit.jc, Color.getColorStr(Color.ORANGE));
            var suitPre = Config.clothessuit_212[suitId - 1];
            conditionArr = ConfigHelp.SplitStr(suitPre.condition);
            self._hasCondition = false;
        }
        else {
            if (suit.power == 0) {
                self.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitNext.attr), "+", null, "#15f234") + self.jcTxt(suitNext.jc, Color.getColorStr(Color.ORANGE));
                self.labAttrCur.text = "";
                self.labAttrNext.text = "";
                self.imgArrow.visible = false;
            }
            else {
                self.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suit.attr), "+") + self.jcTxt(suit.jc);
                self.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitNext.attr), "+", null, "#15f234") + self.jcTxt(suitNext.jc, Color.getColorStr(Color.ORANGE));
                self.labAttrMax.text = "";
                self.imgArrow.visible = true;
            }
            self.boxMax.visible = false;
            self.btnActivity.visible = true;
            self.btnActivity.enabled = self.btnActivity.checkNotice = Model_BySys.checkSuitVo(suit.suitid, Model_BySys.JIB_ZHANJIA);
            var allNum = 0;
            var reachNum = 0;
            var need;
            conditionArr = ConfigHelp.SplitStr(suit.condition);
            if (suitId == 0 || suitId % 1000 == 0) {
                need = "【" + suit.name + "】所属" + self.sysName + "收集进度";
            }
            else {
                var $star = Number(conditionArr[0][1]);
                need = "【" + suit.name + "】所属" + self.sysName + "达到" + $star + "星";
            }
            for (var j = 0; j < conditionArr.length; j++) {
                var $id = Number(conditionArr[j][0]);
                var $star = Number(conditionArr[j][1]);
                allNum++;
                if (Model_ZhanJia.zhanjiaStar[$id] != null && Model_ZhanJia.zhanjiaStar[$id] >= $star) {
                    reachNum++;
                }
            }
            if (reachNum < allNum) {
                self._hasCondition = false;
            }
            self.labNeed.text = need + HtmlUtil.fontNoSize("(" + reachNum + "/" + allNum + ")", reachNum >= allNum ? '#00ff00' : '#ff0000');
        }
        self._conditionArr = [];
        for (var i = 0; i < conditionArr.length; i++) {
            var $id = Number(conditionArr[i][0]);
            var $star = Number(conditionArr[i][1]);
            self._conditionArr.push(Config.clothes_212[$id]);
        }
        var totalType = 303;
        var totalValue = 0;
        for (var i = 0; i < self._jiBanArr.length; i++) {
            var v = self._jiBanArr[i];
            var cfg = Config.clothessuit_212[v];
            if (!cfg) {
                continue;
            }
            var arr = ConfigHelp.SplitStr(cfg.attr1);
            totalType = Number(arr[0][0]);
            totalValue += Number(arr[0][1]);
        }
        if (Config.jssx_002[totalType]) {
            self.lab2.text = Config.jssx_002[totalType].attr + (totalValue / 1000) + "%";
        }
        self.lab3.text = "可通过升级" + self.sysName + "所属羁绊提升效果";
        self.listGrid.numItems = self._conditionArr.length;
        IconUtil.setImg(self.imgName, Enum_Path.JIBAN_URL + "n" + UIConst.ZHAN_JIA + ".png");
        IconUtil.setImg(self.imgIcon, Enum_Path.JIBAN_URL + "i" + UIConst.ZHAN_JIA + ".png");
        // ImageLoader.instance.loader(Enum_Path.JIBAN_URL + "n" + UIConst.ZHAN_JIA + ".png", self.imgName);
        // ImageLoader.instance.loader(Enum_Path.JIBAN_URL + "i" + UIConst.ZHAN_JIA + ".png", self.imgIcon);
    };
    ChildZhanJiaSuit.prototype.onClickActivity = function () {
        var sf = this;
        if (!sf._hasCondition) {
            ViewCommonWarn.text(sf.sysName + "星级不足");
            return;
        }
        var id = Math.floor(Number(sf._selectVo) / 1000);
        GGlobal.modelZhanJia.CGUpZJTZ(id);
    };
    ChildZhanJiaSuit.prototype.pageHandler = function (event) {
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
    ChildZhanJiaSuit.prototype.onExplain = function (e) {
        GGlobal.layerMgr.open(UIConst.WFLAB_PANEL);
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    ChildZhanJiaSuit.prototype.jcTxt = function (jc, color) {
        var sf = this;
        if (color)
            return HtmlUtil.fontNoSize("\n" + sf.sysName + "属性+" + (jc / 1000) + "%", color);
        else
            return "\n" + sf.sysName + "属性+" + (jc / 1000) + "%";
    };
    ChildZhanJiaSuit.URL = "ui://3tzqotadby8m38";
    return ChildZhanJiaSuit;
}(fairygui.GComponent));
__reflect(ChildZhanJiaSuit.prototype, "ChildZhanJiaSuit");
