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
var ViewNianShouAlert = (function (_super) {
    __extends(ViewNianShouAlert, _super);
    function ViewNianShouAlert() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewNianShouAlert.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComNianShou", "ViewNianShouAlert"));
    };
    ViewNianShouAlert.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("actComNianShou", "ViewNianShouAlert").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
        s.btn.addClickListener(s.onReward, s);
    };
    ViewNianShouAlert.prototype.onShown = function () {
        var s = this;
        s._ns = s._args;
        s.vgrid.setVo(s._args);
        s.imgYWC.visible = false;
        if (s._ns.time <= 0) {
            s.img.visible = false;
            s.lb.text = "";
            s._cost = 0;
            s.btn.checkNotice = true;
            GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
        }
        else {
            GGlobal.model_ActNianShou.listen(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
            s.img.visible = true;
            IconUtil.setImg(s.img, Enum_Path.ICON70_URL + Enum_Attr.yuanBao + ".png");
            //消耗
            var cfg = Config.nian_299[s._ns.id];
            s._cost = Number(JSON.parse(cfg.consume)[0][2]);
            s.lb.text = s._cost + "";
            s.btn.checkNotice = false;
        }
        s.upTime();
        s.btn.visible = true;
        GGlobal.model_ActNianShou.listen(Model_ActNianShou.get_ns_reward, s.upGet, s);
    };
    ViewNianShouAlert.prototype.upTime = function () {
        var s = this;
        if (s._ns.time <= 0) {
            s.btn.text = "免费开启";
        }
        else {
            s.btn.text = "直接开启";
        }
    };
    ViewNianShouAlert.prototype.onHide = function () {
        var s = this;
        s.vgrid.clean();
        IconUtil.setImg(s.img, null);
        GGlobal.model_ActNianShou.remove(Model_ActNianShou.get_ns_reward, s.upGet, s);
        GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
    };
    ViewNianShouAlert.prototype.upGet = function () {
        var s = this;
        s.btn.visible = false;
        s.imgYWC.visible = true;
        s.lb.text = "";
        s.img.visible = false;
    };
    ViewNianShouAlert.prototype.onReward = function () {
        var s = this;
        if (!s._ns) {
            return;
        }
        if (s._ns.time > 0 && Model_player.voMine.yuanbao < s._cost) {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                s.doHideAnimation();
            }));
            return;
        }
        var yb = s._ns.time > 0 ? 1 : 0;
        GGlobal.model_ActNianShou.CG_GET_REWARD_11559(s._ns.idx, yb);
    };
    ViewNianShouAlert.URL = "ui://ht2966i4dsufa";
    return ViewNianShouAlert;
}(UIModalPanel));
__reflect(ViewNianShouAlert.prototype, "ViewNianShouAlert");
