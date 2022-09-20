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
var ViewTigPasSceneInfo = (function (_super) {
    __extends(ViewTigPasSceneInfo, _super);
    function ViewTigPasSceneInfo() {
        var _this = _super.call(this) || this;
        _this._time = 120;
        return _this;
    }
    ViewTigPasSceneInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ViewTigPasSceneInfo"));
    };
    ViewTigPasSceneInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        this.lbTime = (this.getChild("lbTime"));
        this.lbInfo = (this.getChild("lbInfo"));
        this.lbBestInfo = (this.getChild("lbBestInfo"));
        s.n37 = (s.getChild("n37"));
        s.n37.x += GGlobal.layerMgr.offx;
        s.setXY(0, 350);
    };
    ViewTigPasSceneInfo.prototype.updateMyHurt = function () {
        var s1 = '';
        var s = this;
        var m = GGlobal.modelTigerPass;
        var d = m.batRank;
        if (!d) {
            s.lbBestInfo.text = "";
            s.lbInfo.text = "";
            return;
        }
        var empName = null;
        var emHurt = null;
        for (var i = 0; i < d.length; i++) {
            if (d[i].name != Model_player.voMine.name) {
                empName = d[i].name;
                emHurt = d[i].hurt;
            }
        }
        s1 += "自己：" + ConfigHelp.getYiWanText(m.myHurt);
        s.lbInfo.text = s1;
        s1 = "";
        if (empName)
            s1 = "雇佣帮手：" + empName + "  " + ConfigHelp.getYiWanText(emHurt);
        else
            s1 = "";
        s.lbBestInfo.text = s1;
    };
    ViewTigPasSceneInfo.prototype.timeUpdate = function () {
        var s = this;
        s.pveTime--;
        this.lbTime.text = DateUtil.getMSBySecond4(s.pveTime);
    };
    ViewTigPasSceneInfo.prototype.onOpen = function () {
        var s = this;
        MainUIController.addChildToUI(s, 1);
        s.updateMyHurt();
        GGlobal.modelTigerPass.listen(Model_TigerPass.msg_datas_hurt, s.updateMyHurt, s);
        Timer.instance.listen(s.timeUpdate, s, 1000);
        var id = GGlobal.modelTigerPass.curId;
        var cfg = Config.hlg_323[id];
        s.pveTime = cfg.time;
    };
    ViewTigPasSceneInfo.prototype.onClose = function () {
        var s = this;
        MainUIController.removeUI(s);
        GGlobal.modelTigerPass.remove(Model_TigerPass.msg_datas_hurt, s.updateMyHurt, s);
        Timer.instance.remove(s.timeUpdate, s);
    };
    Object.defineProperty(ViewTigPasSceneInfo, "instance", {
        get: function () {
            if (!ViewTigPasSceneInfo._instance)
                ViewTigPasSceneInfo._instance = ViewTigPasSceneInfo.createInstance();
            return ViewTigPasSceneInfo._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewTigPasSceneInfo.URL = "ui://7a366usafxj42r";
    return ViewTigPasSceneInfo;
}(fairygui.GComponent));
__reflect(ViewTigPasSceneInfo.prototype, "ViewTigPasSceneInfo");
