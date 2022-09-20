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
var Child_Horse_Star = (function (_super) {
    __extends(Child_Horse_Star, _super);
    function Child_Horse_Star() {
        return _super.call(this) || this;
    }
    Child_Horse_Star.createInstance = function () {
        return (fairygui.UIPackage.createObject("horse", "Child_Horse_Star"));
    };
    Child_Horse_Star.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    Child_Horse_Star.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
        EventUtil.register(pFlag, self.btnRide, egret.TouchEvent.TOUCH_TAP, self.onRide, self);
        EventUtil.register(pFlag, self.btnCancel, egret.TouchEvent.TOUCH_TAP, self.onCancel, self);
    };
    Child_Horse_Star.prototype.show = function (v) {
        var self = this;
        self.registerEvent(true);
        self._selVo = v;
        self.upSelView();
    };
    Child_Horse_Star.prototype.hide = function () {
        var self = this;
        self.registerEvent(false);
    };
    Child_Horse_Star.prototype.upSelView = function () {
        var self = this;
        var m = GGlobal.model_Horse;
        var v = self._selVo;
        self.lbLv.text = HtmlUtil.fontNoSize(v.cfg.tiaojian + "星可骑乘", Color.REDSTR);
        if (!v.isAct) {
            self.btnRide.visible = self.btnCancel.visible = false;
            self.boxLv.visible = true;
        }
        else if (v.star >= v.cfg.tiaojian) {
            self.boxLv.visible = false;
            self.btnRide.visible = m.rideId != v.id;
            self.btnCancel.visible = m.rideId == v.id;
        }
        else {
            self.btnRide.visible = self.btnCancel.visible = false;
            self.boxLv.visible = true;
        }
        var attrArr;
        var nextAttArr;
        var cfgStarNext;
        var cfgLvNext;
        self.imgMax.visible = false;
        self.btnUp.touchable = self.btnUp.visible = true;
        self.starGroup.visible = true;
        self.lbTit.text = "升星属性";
        self.imgPower.url = "ui://jvxpx9emul8t3fl";
        cfgStarNext = Config.zqsx_773[v.cfgStar.next];
        self.starPowerLb.text = cfgStarNext ? "" + (cfgStarNext.zl - v.cfgStar.zl) : "";
        if (v.star > 0 && v.cfgStar.next != 0) {
            self.imgArrow.visible = true;
            self.btnUp.text = "升星";
            attrArr = JSON.parse(v.cfgStar.sx);
            nextAttArr = JSON.parse(cfgStarNext.sx);
            self.labAttrCur.text = ConfigHelp.attrString(attrArr, "+");
            self.labAttrNext.text = ConfigHelp.attrString(nextAttArr, "+", null, "#15f234");
            self.labAttrMax.text = "";
        }
        else {
            self.labAttrCur.text = "";
            self.labAttrNext.text = "";
            self.imgArrow.visible = false;
            if (v.star == 0) {
                self.btnUp.text = "激活";
                attrArr = JSON.parse(cfgStarNext.sx);
            }
            else {
                self.starGroup.visible = false;
                attrArr = JSON.parse(v.cfgStar.sx);
                self.btnUp.touchable = self.btnUp.visible = false;
                self.imgMax.visible = true;
                self.imgMax.url = "ui://jvxpx9emirr13h1";
            }
            self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
        }
        if (v.cfgStar.next == 0) {
            self.labCost.text = "";
        }
        else {
            //升星道具
            var consume = JSON.parse(v.cfg.activation);
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
            self.labCost.text = "消耗：[color=" + Color.getColorStr(self._needItem.quality) + "]" + self._needItem.name + "[/color]x" + count +
                "[color=" + colorStr + "](" + hasCount + "/" + count + ")[/color]";
            self.btnUp.checkNotice = self._hasNeed;
        }
        if (v.isAct) {
            self.labSu.text = "移动速度+" + v.cfgStar.ydsd;
        }
        else {
            cfgStarNext = Config.zqsx_773[v.cfgStar.next];
            self.labSu.text = "移动速度+" + cfgStarNext.ydsd;
        }
    };
    Child_Horse_Star.prototype.onUp = function () {
        var self = this;
        if (!self._selVo) {
            return;
        }
        if (!self._hasNeed) {
            View_CaiLiao_GetPanel.show(self._needItem);
            return;
        }
        GGlobal.model_Horse.CG_UPSTAR_11025(self._selVo.id);
    };
    Child_Horse_Star.prototype.onRide = function () {
        var self = this;
        var v = self._selVo;
        if (!v) {
            return;
        }
        if (!v.isAct) {
            ViewCommonWarn.text("未激活");
            return;
        }
        if (v.star < v.cfg.tiaojian) {
            ViewCommonWarn.text(v.cfg.tiaojian + "星可乘骑");
            return;
        }
        GGlobal.model_Horse.CG_RIDE_11023(v.id);
    };
    Child_Horse_Star.prototype.onCancel = function () {
        var self = this;
        if (!self._selVo) {
            return;
        }
        GGlobal.model_Horse.CG_RIDE_11023(0);
    };
    Child_Horse_Star.URL = "ui://7shc3kzdnct0i";
    return Child_Horse_Star;
}(fairygui.GComponent));
__reflect(Child_Horse_Star.prototype, "Child_Horse_Star");
