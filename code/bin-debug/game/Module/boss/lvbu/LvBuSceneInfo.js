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
var LvBuSceneInfo = (function (_super) {
    __extends(LvBuSceneInfo, _super);
    function LvBuSceneInfo() {
        return _super.call(this) || this;
    }
    LvBuSceneInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "LvBuSceneInfo"));
    };
    LvBuSceneInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbMyhurt = (this.getChild("lbMyhurt"));
        this.lbBest = (this.getChild("lbBest"));
        this.lbTime = (this.getChild("lbTime"));
        this.btn = (this.getChild("btn"));
        this.n15 = (this.getChild("n15"));
        this.n15.x += GGlobal.layerMgr.offx;
        this.n13 = (this.getChild("n13"));
        this.n13.x += GGlobal.layerMgr.offx;
        this.setXY(fairygui.GRoot.inst.width - this.width, 350);
    };
    LvBuSceneInfo.prototype.timeUpdate = function () {
        var data = JSON.parse(ConfigHelp.getSystemDesc(1091));
        var t = Model_GlobalMsg.getServerTime();
        var nowData = new Date(t);
        var hour = nowData.getHours();
        var min = nowData.getMinutes();
        var sec = nowData.getSeconds();
        var nextIndex = -1;
        for (var i = 0; i < 3; i++) {
            if (hour == data[i][0]) {
                nextIndex = i;
                break;
            }
        }
        if (nextIndex == -1) {
            var time = 0;
        }
        else {
            time = (data[nextIndex][1] - min + 30) * 60 - sec;
        }
        this.lbTime.text = TimeUitl.getRemainingTime(time * 1000, 0, { minute: "分", second: "秒" });
    };
    LvBuSceneInfo.prototype.openRank = function () {
        GGlobal.layerMgr.open(UIConst.LVBURANK, 1);
    };
    LvBuSceneInfo.prototype.updateMyHurt = function () {
        var m = GGlobal.modelBoss;
        var d = m.rankData;
        if (d.length) {
            this.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt) +
                "       <font color='#ffc334'>1st:</font>" + d[0][1] + "   " + ConfigHelp.getYiWanText(d[0][2]);
        }
        else {
            this.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt);
        }
    };
    LvBuSceneInfo.prototype.onopen = function () {
        MainUIController.addChildToUI(LvBuSceneInfo.instance, 1);
        this.updateMyHurt();
        GGlobal.control.listen(Enum_MsgType.RANK_UPDATE, this.updateMyHurt, this);
        Timer.instance.listen(this.timeUpdate, this, 1000);
        this.btn.addClickListener(this.openRank, this);
    };
    LvBuSceneInfo.prototype.onclose = function () {
        MainUIController.removeUI(LvBuSceneInfo.instance);
        GGlobal.control.remove(Enum_MsgType.RANK_UPDATE, this.updateMyHurt, this);
        Timer.instance.remove(this.timeUpdate, this);
        this.btn.removeClickListener(this.openRank, this);
    };
    Object.defineProperty(LvBuSceneInfo, "instance", {
        get: function () {
            if (!LvBuSceneInfo._instance)
                LvBuSceneInfo._instance = LvBuSceneInfo.createInstance();
            return LvBuSceneInfo._instance;
        },
        enumerable: true,
        configurable: true
    });
    LvBuSceneInfo.URL = "ui://47jfyc6eqcylw";
    return LvBuSceneInfo;
}(fairygui.GComponent));
__reflect(LvBuSceneInfo.prototype, "LvBuSceneInfo");
