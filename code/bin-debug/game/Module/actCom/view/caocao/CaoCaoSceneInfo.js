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
var CaoCaoSceneInfo = (function (_super) {
    __extends(CaoCaoSceneInfo, _super);
    function CaoCaoSceneInfo() {
        return _super.call(this) || this;
    }
    CaoCaoSceneInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaoSceneInfo"));
    };
    CaoCaoSceneInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.n15.x += GGlobal.layerMgr.offx;
        self.n13.x += GGlobal.layerMgr.offx;
        self.setXY(fairygui.GRoot.inst.width - self.width, 350);
    };
    CaoCaoSceneInfo.prototype.timeUpdate = function () {
        var self = this;
        var data = JSON.parse(ConfigHelp.getSystemDesc(7020));
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
        self.lbTime.text = TimeUitl.getRemainingTime(time * 1000, 0, { minute: "分", second: "秒" });
    };
    CaoCaoSceneInfo.prototype.openRank = function () {
        GGlobal.layerMgr.open(UIConst.CAOCAO_LAIXI_RANK, 1);
    };
    CaoCaoSceneInfo.prototype.updateMyHurt = function () {
        var self = this;
        var m = GGlobal.modelCaoCao;
        var d = m.rankData;
        if (d.length) {
            self.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt) +
                "       <font color='#ffc334'>1st:</font>" + d[0][1] + "   " + ConfigHelp.getYiWanText(d[0][2]);
        }
        else {
            self.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt);
        }
    };
    CaoCaoSceneInfo.prototype.onopen = function () {
        var self = this;
        MainUIController.addChildToUI(CaoCaoSceneInfo.instance, 1);
        self.updateMyHurt();
        GGlobal.control.listen(UIConst.CAOCAO_LAIXI_RANK, self.updateMyHurt, self);
        Timer.instance.listen(self.timeUpdate, self, 1000);
        self.btn.addClickListener(self.openRank, self);
    };
    CaoCaoSceneInfo.prototype.onclose = function () {
        var self = this;
        MainUIController.removeUI(CaoCaoSceneInfo.instance);
        GGlobal.control.remove(UIConst.CAOCAO_LAIXI_RANK, self.updateMyHurt, self);
        Timer.instance.remove(self.timeUpdate, self);
        self.btn.removeClickListener(self.openRank, self);
    };
    Object.defineProperty(CaoCaoSceneInfo, "instance", {
        get: function () {
            if (!CaoCaoSceneInfo._instance)
                CaoCaoSceneInfo._instance = CaoCaoSceneInfo.createInstance();
            return CaoCaoSceneInfo._instance;
        },
        enumerable: true,
        configurable: true
    });
    CaoCaoSceneInfo.URL = "ui://n6fub9ddeq411";
    return CaoCaoSceneInfo;
}(fairygui.GComponent));
__reflect(CaoCaoSceneInfo.prototype, "CaoCaoSceneInfo");
