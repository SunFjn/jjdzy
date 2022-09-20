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
var Child_Horse_Lv = (function (_super) {
    __extends(Child_Horse_Lv, _super);
    function Child_Horse_Lv() {
        return _super.call(this) || this;
    }
    Child_Horse_Lv.createInstance = function () {
        return (fairygui.UIPackage.createObject("horse", "Child_Horse_Lv"));
    };
    Child_Horse_Lv.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    /**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag
     */
    Child_Horse_Lv.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
    };
    Child_Horse_Lv.prototype.show = function (v) {
        var self = this;
        self.registerEvent(true);
        self._selVo = v;
        self.upSelView();
    };
    Child_Horse_Lv.prototype.hide = function () {
        var self = this;
        self.registerEvent(false);
    };
    Child_Horse_Lv.prototype.upSelView = function () {
        var self = this;
        var m = GGlobal.model_Horse;
        var v = self._selVo;
        self.tfJie.text = Math.floor(v.lv / 10) + "";
        self.tfJi.text = Math.floor(v.lv % 10) + "";
        var attrArr;
        var nextAttArr;
        var cfgStarNext;
        var cfgLvNext;
        self.imgMax.visible = false;
        self.btnUp.touchable = self.btnUp.visible = true;
        self.starGroup.visible = true;
        self.lbTit.text = "升级属性";
        self.imgPower.url = "ui://jvxpx9emra8g3hk";
        if (v.lv % 10 == 9) {
            self.btnUp.text = "突破";
        }
        else {
            self.btnUp.text = "升级";
        }
        cfgLvNext = Config.zqsj_773[v.cfgLv.next];
        self.starPowerLb.text = cfgLvNext ? "" + (cfgLvNext.power - v.cfgLv.power) : "";
        if (v.lv == 0 || v.cfgLv.next == 0) {
            self.labAttrCur.text = "";
            self.labAttrNext.text = "";
            self.imgArrow.visible = false;
            if (v.lv == 0) {
                attrArr = JSON.parse(cfgLvNext.attr);
            }
            else {
                self.starGroup.visible = false;
                attrArr = JSON.parse(v.cfgLv.attr);
                self.btnUp.touchable = self.btnUp.visible = false;
                self.imgMax.visible = true;
                self.imgMax.url = "ui://jvxpx9emshpk3h3";
            }
            self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
        }
        else {
            attrArr = JSON.parse(v.cfgLv.attr);
            self.imgArrow.visible = true;
            nextAttArr = JSON.parse(Config.zqsj_773[v.cfgLv.next].attr);
            self.labAttrCur.text = ConfigHelp.attrString(attrArr, "+");
            self.labAttrNext.text = ConfigHelp.attrString(nextAttArr, "+", null, "#15f234");
            self.labAttrMax.text = "";
        }
        if (!v.isAct) {
            self.btnUp.visible = false;
            self.labCost.text = HtmlUtil.fontNoSize("请先激活坐骑•" + v.name, Color.REDSTR);
            // self.labCost.y = 856
            self.vres.visible = false;
            self.lbRes.text = "";
        }
        else if (v.cfgLv.next == 0) {
            self.labCost.text = "";
            self.vres.visible = false;
            self.lbRes.text = "";
        }
        else {
            //升星道具
            var consume = JSON.parse(v.cfgLv.exp);
            self._needItem = VoItem.create(Number(consume[0][1]));
            var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
            var count = Number(consume[0][2]);
            var colorStr;
            if (hasCount >= count) {
                colorStr = '#00FF00';
                self._hasNeed = true;
            }
            else {
                colorStr = '#FF0000';
                self._hasNeed = false;
            }
            self.vres.visible = true;
            self.vres.setImgUrl(self._needItem.icon);
            self.vres.setLb(hasCount, count);
            self.lbRes.text = HtmlUtil.fontNoSize(self._needItem.name, Color.getColorStr(self._needItem.quality));
            self.labCost.text = "";
            // self.labCost.text = "消耗：[color=" + Color.getColorStr(self._needItem.quality) + "]" + self._needItem.name + "[/color]x" + count +
            // 	"[color=" + colorStr + "](" + hasCount + "/" + count + ")[/color]";
            self.btnUp.checkNotice = self._hasNeed;
        }
    };
    Child_Horse_Lv.prototype.onUp = function () {
        var self = this;
        if (!self._selVo) {
            return;
        }
        if (!self._hasNeed) {
            View_CaiLiao_GetPanel.show(self._needItem);
            return;
        }
        if (!self._selVo.isAct) {
            ViewCommonWarn.text("未激活");
            return;
        }
        GGlobal.model_Horse.CG_UPLV_11027(self._selVo.id);
    };
    Child_Horse_Lv.URL = "ui://7shc3kzdnct0h";
    return Child_Horse_Lv;
}(fairygui.GComponent));
__reflect(Child_Horse_Lv.prototype, "Child_Horse_Lv");
