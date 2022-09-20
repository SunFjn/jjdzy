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
var View_ActPreview = (function (_super) {
    __extends(View_ActPreview, _super);
    function View_ActPreview() {
        var _this = _super.call(this) || this;
        _this.sysID = 0;
        _this.surTime = 0;
        _this.state = 0; //0不显示 2结束 1进行中 -1显示下一轮的活动
        return _this;
    }
    Object.defineProperty(View_ActPreview, "instance", {
        get: function () {
            if (!View_ActPreview._instance)
                View_ActPreview._instance = (fairygui.UIPackage.createObject("MainUI", "View_ActPreview"));
            return View_ActPreview._instance;
        },
        enumerable: true,
        configurable: true
    });
    View_ActPreview.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.iconImg = (a.getChild("iconImg"));
        a.timeLb = (a.getChild("timeLb"));
        a.iconGroup = (a.getChild("iconGroup"));
        a.n11 = (a.getChild("n11"));
        //a.iconGroup.visible = false; 
        a.showEff(false);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_GLOBAL_SERVER_TIME_UPDATE, a.show, a);
        //a.show(); 
        a.iconImg.addClickListener(a.OnIcon, this);
    };
    View_ActPreview.prototype.OnIcon = function () {
        var self = this;
        GGlobal.modelGuanQia.setAuto(false);
        if (self.iconImg.data == UIConst.ACTIVITYHALL) {
            var cfg = Config.hddt_200[self.sysID];
            if (cfg)
                GGlobal.layerMgr.open(self.iconImg.data, cfg.fenlei - 1);
        }
        else {
            GGlobal.layerMgr.open(self.iconImg.data);
        }
    };
    View_ActPreview.prototype.show = function () {
        var a = this;
        if (Model_GlobalMsg.actPreviewId <= 0) {
            //a.hide1(); 
            return;
        }
        if (Timer.instance.has(a.update, this)) {
            Timer.instance.remove(a.update, this);
        }
        var cfg = Config.hdyg_229[Model_GlobalMsg.actPreviewId];
        var arr = JSON.parse(cfg.sysid);
        a.state = 0;
        a.iconGroup.visible = true;
        IconUtil.setImg(a.iconImg, Enum_Path.MAINUI_URL + arr[0] + ".png");
        a.sysID = parseInt(arr[0]);
        a.iconImg.data = cfg.open;
        a.showEff(Model_GlobalMsg.actPreviewTime >= 0 && Model_GlobalMsg.actPreviewId == 1);
        var serverTime = Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
        if (Model_GlobalMsg.actPreviewTime <= 0) {
            a.state = -1;
        }
        else if (serverTime >= Model_GlobalMsg.actPreviewTime) {
            a.state = 0;
        }
        else if (serverTime < Model_GlobalMsg.actPreviewTime - cfg.time) {
            a.state = 2;
        }
        else {
            a.state = 1;
        }
        a.updateUIState();
    };
    View_ActPreview.prototype.updateUIState = function () {
        var a = this;
        var serverTime = Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
        var cfg = Config.hdyg_229[Model_GlobalMsg.actPreviewId];
        switch (a.state) {
            case 0:
                a.hide1();
                break;
            case -1:
                a.timeLb.text = "活动预览";
                ViewMainUIRightTipContainer.getInstance().addCompnent(this);
                break;
            case 1:
                if (a.iconImg.data == UIConst.DANDAO_FUHUI) {
                    GGlobal.reddot.setCondition(UIConst.DANDAO_FUHUI, 0, true);
                }
                a.surTime = Model_GlobalMsg.actPreviewTime - serverTime;
                if (!Timer.instance.has(a.update, this)) {
                    Timer.instance.listen(a.update, this, 1000);
                }
                this.width = 102;
                ViewMainUIRightTipContainer.getInstance().addCompnent(this);
                break;
            case 2:
                a.surTime = Model_GlobalMsg.actPreviewTime - cfg.time - serverTime;
                if (!Timer.instance.has(a.update, this)) {
                    Timer.instance.listen(a.update, this, 1000);
                }
                ViewMainUIRightTipContainer.getInstance().addCompnent(this);
                break;
        }
    };
    View_ActPreview.prototype.showEff = function (value) {
        var s = this;
        if (value) {
            if (!s.iconEff) {
                s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, s.iconImg.x + s.iconImg.width / 2, s.iconImg.y + s.iconImg.height / 2, 1000, -1, true);
            }
        }
        else {
            if (s.iconEff) {
                EffectMgr.instance.removeEff(s.iconEff);
                s.iconEff = null;
            }
        }
    };
    View_ActPreview.prototype.update = function () {
        var a = this;
        a.surTime--;
        switch (a.state) {
            case -1:
                a.timeLb.text = "活动预览";
                break;
            case 1://活动进行中
                a.timeLb.text = DateUtil.getHMSBySecond2(a.surTime) + "后结束";
                if (a.surTime < 0) {
                    Timer.instance.remove(a.update, this);
                    a.hide1();
                }
                else {
                    a.showEff(true);
                }
                break;
            case 2://活动未开始
                a.timeLb.text = DateUtil.getHMSBySecond2(a.surTime) + "后开启";
                if (a.surTime < 0) {
                    var serverTime = Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
                    a.surTime = Model_GlobalMsg.actPreviewTime - serverTime;
                    a.state = 1;
                    a.timeLb.text = DateUtil.getHMSBySecond2(a.surTime) + "后结束";
                    a.showEff(true);
                    if (a.iconImg.data == UIConst.DANDAO_FUHUI) {
                        GGlobal.reddot.setCondition(UIConst.DANDAO_FUHUI, 0, true);
                    }
                }
                else {
                    a.showEff(false);
                }
                break;
        }
    };
    View_ActPreview.prototype.hide1 = function () {
        var a = this;
        a.iconGroup.visible = false;
        a.showEff(false);
        ViewMainUIRightTipContainer.getInstance().removeCompnent(a);
        IconUtil.setImg(a.iconImg, null);
    };
    View_ActPreview.URL = "ui://7gxkx46wjy0t3c";
    return View_ActPreview;
}(fairygui.GComponent));
__reflect(View_ActPreview.prototype, "View_ActPreview");
