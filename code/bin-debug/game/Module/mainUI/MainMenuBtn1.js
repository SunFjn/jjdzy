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
var MainMenuBtn1 = (function (_super) {
    __extends(MainMenuBtn1, _super);
    function MainMenuBtn1() {
        return _super.call(this) || this;
    }
    MainMenuBtn1.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "MainMenuBtn1"));
    };
    MainMenuBtn1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.timeLb = (this.getChild("timeLb"));
    };
    MainMenuBtn1.prototype.showTime = function () {
        var s = this;
        if (s.panelId == UIConst.LIMIT_GIFT) {
            GGlobal.model_limitGift.listen(Model_LimitGift.OPENUI, s.upLimitGift, s);
            s.upLimitGift();
        }
    };
    MainMenuBtn1.prototype.upLimitGift = function () {
        var s = this;
        s._endTime = 0;
        var m = GGlobal.model_limitGift;
        var arr = m.giftArr;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            if (v.endTime - servTime <= 0) {
                continue;
            }
            if (s._endTime < v.endTime) {
                s._endTime = v.endTime;
            }
        }
        if (s._endTime > 0 && !Timer.instance.has(s.update, s)) {
            Timer.instance.listen(s.update, s, 1000);
            s.showEff(true);
        }
    };
    MainMenuBtn1.prototype.endTime = function () {
        var s = this;
        if (s.panelId == UIConst.LIMIT_GIFT) {
            s.upLimitGift();
        }
        //移除按钮
        if (s._endTime <= 0) {
            GGlobal.mainUICtr.removeIcon(this.panelId);
        }
    };
    MainMenuBtn1.prototype.update = function () {
        var s = this;
        var end = s._endTime ? s._endTime : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            s.timeLb.text = "<font color='#15f234'>" + DateUtil.getHMSBySecond2(end - servTime) + "</font>" + "后结束";
        }
        else {
            s.timeLb.text = "00:00:00";
            Timer.instance.remove(s.update, s);
            s.endTime();
        }
    };
    MainMenuBtn1.prototype.uidispose = function () {
        var s = this;
        _super.prototype.uidispose.call(this);
        Timer.instance.remove(s.update, s);
        GGlobal.model_limitGift.remove(Model_LimitGift.OPENUI, s.upLimitGift, s);
    };
    MainMenuBtn1.URL = "ui://7gxkx46wved3b7v";
    return MainMenuBtn1;
}(MainMenuBtn));
__reflect(MainMenuBtn1.prototype, "MainMenuBtn1");
