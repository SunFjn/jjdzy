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
var Child_ShenJian_JiBan = (function (_super) {
    __extends(Child_ShenJian_JiBan, _super);
    function Child_ShenJian_JiBan() {
        var _this = _super.call(this) || this;
        _this.sysName = "神剑";
        _this.eventFunction = function (t) {
            var self = _this;
            var event = EventUtil.register;
            event(t, self.list, fairygui.ItemEvent.CLICK, self.onClickList, self);
            event(t, self.btnActivity, EventUtil.TOUCH, self.onClickActivity, self);
            event(t, self.btnLeft, EventUtil.TOUCH, self.pageHandler, self);
            event(t, self.btnRight, EventUtil.TOUCH, self.pageHandler, self);
            event(t, self.btnExplain, EventUtil.TOUCH, self.onExplain, self);
        };
        _this._hasCondition = false;
        return _this;
    }
    Child_ShenJian_JiBan.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu_JiBan"));
    };
    Child_ShenJian_JiBan.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        sf.list.callbackThisObj = sf;
        sf.list.itemRenderer = sf.renderHander;
        sf.list.setVirtual();
        sf.listGrid.callbackThisObj = sf;
        sf.listGrid.itemRenderer = sf.renderGrid;
    };
    Child_ShenJian_JiBan.prototype.onOpen = function () {
        var s = this;
        s.eventFunction(1);
        GGlobal.control.listen(Enum_MsgType.BY_SYS_JI_BAN, s.jiBanUp, s);
        s.update();
    };
    Child_ShenJian_JiBan.prototype.onClose = function () {
        var s = this;
        s.eventFunction(0);
        IconUtil.setImg(s.imgName, null);
        IconUtil.setImg(s.imgIcon, null);
        GGlobal.control.remove(Enum_MsgType.BY_SYS_JI_BAN, s.jiBanUp, s);
    };
    Child_ShenJian_JiBan.prototype.jiBanUp = function (arr) {
        var sf = this;
        var sys = arr[0];
        var index = arr[1];
        var sid = arr[2];
        if (sys != Model_BySys.JIB_SHENJIAN) {
            return;
        }
        sf._jiBanArr = Model_BySys.getJiBan(Model_BySys.JIB_SHENJIAN);
        sf.list.numItems = sf._jiBanArr.length;
        var selectIndex = Math.floor(Number(sf._selectVo) / 1000);
        if (selectIndex == index) {
            sf.list.selectedIndex = index - 1;
            sf.selectdUpdate(sf._jiBanArr[index - 1]);
        }
        else {
            sf.selectdUpdate(sf._selectVo);
        }
        sf.upPower();
    };
    Child_ShenJian_JiBan.prototype.update = function () {
        var sf = this;
        sf._jiBanArr = Model_BySys.getJiBan(Model_BySys.JIB_SHENJIAN);
        sf.list.numItems = sf._jiBanArr.length;
        sf.list.scrollToView(0);
        sf.list.selectedIndex = 0;
        sf.selectdUpdate(sf._jiBanArr[0]);
        sf.upPower();
    };
    Child_ShenJian_JiBan.prototype.upPower = function () {
        //套装战力
        var sf = this;
        var power = 0;
        if (sf._jiBanArr) {
            for (var i = 0; i < sf._jiBanArr.length; i++) {
                var ids = sf._jiBanArr[i];
                var suit = Config.swordsuit_216[ids];
                if (suit) {
                    power += suit ? suit.power : 0;
                }
            }
        }
        sf.labPower.text = power + "";
    };
    Child_ShenJian_JiBan.prototype.renderHander = function (index, obj) {
        var sf = this;
        var gird = obj;
        var suitId = sf._jiBanArr[index];
        var suit = Config.swordsuit_216[suitId];
        gird.title = suit.name;
        gird.data = suitId;
        gird.checkNotice = Model_BySys.checkSuitVo(suitId, Model_BySys.JIB_SHENJIAN);
    };
    Child_ShenJian_JiBan.prototype.renderGrid = function (index, obj) {
        var sf = this;
        var v = obj;
        v.setSuitVo(sf._conditionArr[index]);
    };
    Child_ShenJian_JiBan.prototype.onClickList = function (e) {
        var sf = this;
        var selectItem = e.itemObject;
        sf.selectdUpdate(selectItem.data);
    };
    Child_ShenJian_JiBan.prototype.selectdUpdate = function (suitId) {
        var sf = this;
        if (suitId == null) {
            return;
        }
        sf._selectVo = suitId;
        var level = suitId % 1000;
        var suit = Config.swordsuit_216[suitId];
        var suitNext = Config.swordsuit_216[suitId + 1];
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
            var suitPre = Config.swordsuit_216[suitId - 1];
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
            sf.btnActivity.enabled = sf.btnActivity.checkNotice = Model_BySys.checkSuitVo(suit.suitid, Model_BySys.JIB_SHENJIAN);
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
                for (var k = 0; k < Model_ShenJian.shenjianArr.length; k++) {
                    var vo = Model_ShenJian.shenjianArr[k];
                    if (vo.id == $id) {
                        if (vo.starLv >= $star) {
                            reachNum++;
                        }
                        break;
                    }
                }
            }
            if (reachNum < allNum) {
                sf._hasCondition = false;
            }
            sf.labNeed.text = need + HtmlUtil.fontNoSize("(" + reachNum + "/" + allNum + ")", reachNum >= allNum ? '#00ff00' : '#ff0000');
        }
        sf._conditionArr = [];
        for (var i = 0; i < conditionArr.length; i++) {
            var $id = Number(conditionArr[i][0]);
            var $star = Number(conditionArr[i][1]);
            for (var k = 0; k < Model_ShenJian.shenjianArr.length; k++) {
                var vo = Model_ShenJian.shenjianArr[k];
                if (vo.id == $id) {
                    sf._conditionArr.push(vo);
                    break;
                }
            }
        }
        var totalType = 303;
        var totalValue = 0;
        for (var i = 0; i < sf._jiBanArr.length; i++) {
            var v = sf._jiBanArr[i];
            var cfg = Config.swordsuit_216[v];
            var arr = ConfigHelp.SplitStr(cfg.attr1);
            totalType = Number(arr[0][0]);
            totalValue += Number(arr[0][1]);
        }
        if (Config.jssx_002[totalType]) {
            sf.lab2.text = Config.jssx_002[totalType].attr + (totalValue / 1000) + "%";
        }
        sf.lab3.text = "可通过升级" + sf.sysName + "所属羁绊提升效果";
        sf.listGrid.numItems = sf._conditionArr.length;
        IconUtil.setImg(sf.imgName, Enum_Path.JIBAN_URL + "n" + UIConst.SHEN_JIAN + ".png");
        IconUtil.setImg(sf.imgIcon, Enum_Path.JIBAN_URL + "i" + UIConst.SHEN_JIAN + ".png");
    };
    Child_ShenJian_JiBan.prototype.onClickActivity = function () {
        var sf = this;
        if (!sf._hasCondition) {
            ViewCommonWarn.text(sf.sysName + "星级不足");
            return;
        }
        var index = Math.floor(Number(sf._selectVo) / 1000);
        GGlobal.modelBySys.CGJiBanUp(Model_BySys.JIB_SHENJIAN, index);
    };
    Child_ShenJian_JiBan.prototype.pageHandler = function (event) {
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
    Child_ShenJian_JiBan.prototype.onExplain = function (e) {
        GGlobal.layerMgr.open(UIConst.WFLAB_PANEL);
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    Child_ShenJian_JiBan.prototype.jcTxt = function (jc, color) {
        var sf = this;
        if (color)
            return HtmlUtil.fontNoSize("\n" + sf.sysName + "属性+" + (jc / 1000) + "%", color);
        else
            return "\n" + sf.sysName + "属性+" + (jc / 1000) + "%";
    };
    Child_ShenJian_JiBan.URL = "ui://3tzqotadby8m38";
    return Child_ShenJian_JiBan;
}(fairygui.GComponent));
__reflect(Child_ShenJian_JiBan.prototype, "Child_ShenJian_JiBan");
