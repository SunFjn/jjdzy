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
/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
var MengHuoSceneInfo = (function (_super) {
    __extends(MengHuoSceneInfo, _super);
    function MengHuoSceneInfo() {
        return _super.call(this) || this;
    }
    MengHuoSceneInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "MengHuoSceneInfo"));
    };
    MengHuoSceneInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbTime = (s.getChild("lbTime"));
        s.lbInfo = (s.getChild("lbInfo"));
        s.lbBestInfo = (s.getChild("lbBestInfo"));
        s.lb1 = (s.getChild("lb1"));
        s.lb2 = (s.getChild("lb2"));
        s.lbDmgAdd = (s.getChild("lbDmgAdd"));
        s.lb3 = (s.getChild("lb3"));
        s.btnAdd = (s.getChild("btnAdd"));
        s.btnRank = (s.getChild("btnRank"));
        s.btnTg = (s.getChild("btnTg"));
        s.n37 = (s.getChild("n37"));
        s.n22 = (s.getChild("n22"));
        s.n26 = (s.getChild("n26"));
        s.n18 = (s.getChild("n18"));
        s.n37.x += GGlobal.layerMgr.offx;
        s.n22.x += GGlobal.layerMgr.offx;
        s.n26.x += GGlobal.layerMgr.offx;
        s.n18.x += GGlobal.layerMgr.offx;
        s.lbs = [s.lb1, s.lb2, s.lb3];
        s.setXY(0, 350);
    };
    MengHuoSceneInfo.prototype.updateMyHurt = function () {
        var s1 = '';
        var s = this;
        var m = GGlobal.modelBoss;
        var d = m.mhRankdata[1];
        var obj = {};
        for (var i = 0; i < d.length; i++) {
            obj["" + d[i][0]] = d[i][1];
        }
        for (var i = 1; i < 4; i++) {
            var lb = s.lbs[i - 1];
            if (!obj["" + i])
                lb.text = "0";
            else
                lb.text = "" + ConfigHelp.getYiWanText(obj["" + i]); //0;
        }
        s1 += "自己：" + ConfigHelp.getYiWanText(m.myHurt);
        s.lbInfo.text = s1;
        s1 = "";
        if (m.toperName != '')
            s1 = "1st：" + m.toperName + "  " + ConfigHelp.getYiWanText(m.toperDmg);
        s.lbBestInfo.text = s1;
        s.lbDmgAdd.text = "伤害+" + (m.dmgAdd * 10) + "%";
        s.checkTar();
    };
    MengHuoSceneInfo.prototype.timeUpdate = function () {
        var d = new Date(Model_GlobalMsg.getServerTime());
        var m = 49 - d.getMinutes();
        var e = 60 - d.getSeconds();
        this.lbTime.text = m + "分" + (e < 10 ? "0" + e : e) + "秒";
    };
    MengHuoSceneInfo.prototype.openRank = function () {
        GGlobal.layerMgr.open(UIConst.MHRANK, { type: 1, id: GGlobal.modelBoss.curEnterId });
    };
    MengHuoSceneInfo.prototype.openTag = function () {
        GGlobal.layerMgr.open(UIConst.MHAWARDS);
    };
    MengHuoSceneInfo.prototype.buyDmg = function () {
        if (GGlobal.modelBoss.dmgAdd < 10) {
            var moneyArr = JSON.parse(Config.xtcs_004[1087].other);
            var t = "是否花费<font color='" + Color.getColorStr(Color.GREEN) + "'>" + moneyArr[0][2] + Vo_attr.getAttrName(moneyArr[0][0]) + "</font>增加10%伤害？(" + GGlobal.modelBoss.dmgAdd + "/10)\n只在本次BOSS生效";
            ViewAlert.show(t, Handler.create(this, this.addDMG), ViewAlert.OKANDCANCEL);
        }
        else {
            ViewCommonWarn.text("增伤购买次数已用尽");
        }
    };
    MengHuoSceneInfo.prototype.addDMG = function () {
        var moneyStr = Config.xtcs_004[1087].other;
        if (ConfigHelp.checkEnough(moneyStr, false)) {
            GGlobal.modelBoss.CG_MHADDDMG_1719();
        }
        else {
            ModelChongZhi.guideToRecharge();
        }
    };
    MengHuoSceneInfo.prototype.checkTar = function () {
        var r = false;
        var h = GGlobal.modelBoss.myHurt;
        var t = GGlobal.modelBoss.tagDta;
        for (var i = 0; i < t.length; i++) {
            var st = t[i].state;
            if (st == 1) {
                r = true;
                break;
            }
            else if (st == 0 && h > t[i].condition) {
                r = true;
                break;
            }
        }
        this.btnTg.checkNotice = r;
    };
    MengHuoSceneInfo.prototype.onopen = function () {
        var s = this;
        MainUIController.addChildToUI(MengHuoSceneInfo.instance, 1);
        s.updateMyHurt();
        GGlobal.control.listen(Enum_MsgType.MH_SCENE, s.updateMyHurt, s);
        GGlobal.control.listen(Enum_MsgType.MH_TAGERT, s.checkTar, s);
        Timer.instance.listen(s.timeUpdate, s, 1000);
        s.btnRank.addClickListener(s.openRank, s);
        s.btnTg.addClickListener(s.openTag, s);
        s.btnAdd.addClickListener(s.buyDmg, s);
    };
    MengHuoSceneInfo.prototype.onclose = function () {
        var s = this;
        MainUIController.removeUI(MengHuoSceneInfo.instance);
        GGlobal.control.remove(Enum_MsgType.MH_TAGERT, s.checkTar, s);
        GGlobal.control.remove(Enum_MsgType.MH_SCENE, s.updateMyHurt, s);
        Timer.instance.remove(s.timeUpdate, s);
        s.btnRank.removeClickListener(s.openRank, s);
        s.btnTg.removeClickListener(s.openTag, s);
        s.btnAdd.removeClickListener(s.buyDmg, s);
    };
    Object.defineProperty(MengHuoSceneInfo, "instance", {
        get: function () {
            if (!MengHuoSceneInfo._instance)
                MengHuoSceneInfo._instance = MengHuoSceneInfo.createInstance();
            return MengHuoSceneInfo._instance;
        },
        enumerable: true,
        configurable: true
    });
    MengHuoSceneInfo.URL = "ui://47jfyc6ea19118";
    return MengHuoSceneInfo;
}(fairygui.GComponent));
__reflect(MengHuoSceneInfo.prototype, "MengHuoSceneInfo");
