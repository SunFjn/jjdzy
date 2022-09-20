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
var Child_JinSheng = (function (_super) {
    __extends(Child_JinSheng, _super);
    function Child_JinSheng() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.surTime = 0;
        return _this;
    }
    Child_JinSheng.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "Child_JinSheng"));
    };
    Child_JinSheng.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_JinSheng.prototype.openPanel = function (pData) {
        this.open();
    };
    Child_JinSheng.prototype.closePanel = function (pData) {
        this.hide();
    };
    Child_JinSheng.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.rewardList.callbackThisObj = a;
        a.rewardList.itemRenderer = a.rewardListHandle;
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.list.setVirtual();
        Model_JinSheng.getJinSheng();
        a.rewardBt.addClickListener(a.onReward, a);
        a.jihuoBt.addClickListener(a.OnJiHuo, a);
        a.iconJSHL.addClickListener(a.onJSHL, a);
    };
    /**晋升好礼 */
    Child_JinSheng.prototype.onJSHL = function () {
        if (ModuleManager.isOpen(UIConst.VIEWLVBUCOMEUP, true)) {
            GGlobal.layerMgr.open(UIConst.VIEWLVBUCOMEUP);
        }
    };
    Child_JinSheng.prototype.JSHLNot = function () {
        var bool = GGlobal.reddot.checkCondition(UIConst.VIEWLVBUCOMEUP);
        this.noticeImg2.visible = bool && Model_GlobalMsg.kaifuDay <= 7;
    };
    Child_JinSheng.prototype.rewardListHandle = function (index, obj) {
        obj.setVo(this.rewardArr[index], Model_GlobalMsg.kaifuDay <= 7 && index == this.rewardArr.length - 1 && Model_JinSheng.level < 8);
    };
    Child_JinSheng.prototype.OnJiHuo = function () {
        // Model_JinSheng.generalIcon = this.grid.vo.icon;
        GGlobal.modeljinsheng.CG_JINSHENG_JIHUO();
    };
    Child_JinSheng.prototype.onReward = function () {
        GGlobal.layerMgr.open(UIConst.JINSHENG_REWARD);
    };
    Child_JinSheng.prototype.renderHandler = function (index, obj) {
        var item = obj;
        var vo = this.taskArr[index];
        item.show(vo);
        if (item.drawBt.visible && item.drawBt.checkNotice) {
            this.isShowNotice = true;
        }
    };
    Child_JinSheng.prototype.updateShow = function () {
        var a = this;
        a.isShowNotice = false;
        var cfg = Config.up_231[Model_JinSheng.level];
        if (cfg.id >= 2) {
            var gaunzhi = cfg.id;
            if (cfg.id > 11) {
                gaunzhi = 11;
            }
            IconUtil.setImg(a.pinImg, "resource/image/jinsheng/js_" + gaunzhi + ".png");
        }
        else {
            IconUtil.setImg(a.pinImg, null);
        }
        IconUtil.setImg(a.nameImg, "resource/image/jinsheng/name" + cfg.id + ".png");
        if (cfg.exp == 0) {
            a.jinshengGroup.visible = false;
            a.promptLb.visible = true;
        }
        else {
            a.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg["reward" + Model_JinSheng.job]));
            if (Model_GlobalMsg.kaifuDay <= 7) {
                a.rewardList.numItems = a.rewardArr.length;
            }
            else {
                if (Model_JinSheng.level < 8) {
                    a.rewardList.numItems = a.rewardArr.length - 1;
                }
                else {
                    a.rewardList.numItems = a.rewardArr.length;
                }
            }
            a.expBar.value = Model_JinSheng.exp;
            a.expBar.max = cfg.exp;
            a.jinshengGroup.visible = true;
            a.promptLb.visible = false;
        }
        a.taskArr = [];
        for (var i = 0; i < Model_JinSheng.taskArr.length; i++) {
            if (Model_GlobalMsg.kaifuDay >= Model_JinSheng.taskArr[i].kfDay) {
                a.taskArr.push(Model_JinSheng.taskArr[i]);
            }
        }
        a.list.numItems = a.taskArr.length;
        var curTime = Math.floor(Model_GlobalMsg.getServerTime() / 1000);
        var oldTime = Model_GlobalMsg.kaiFuTime;
        var data = new Date(oldTime * 1000);
        var h = data.getHours();
        var m = data.getMinutes();
        var s = data.getSeconds();
        a.surTime = 24 * 60 * 60 * 7 - (curTime - oldTime) - (h * 60 * 60 + m * 60 + s);
        a.limitImg.visible = a.surTime > 0;
        if (a.surTime > 0) {
            if (!Timer.instance.has(a.timeHandler, a)) {
                Timer.instance.listen(a.timeHandler, a, 1000);
            }
        }
        else {
            Timer.instance.remove(a.timeHandler, a);
            if (cfg.exp <= 0) {
                a.powerLb.text = HtmlUtil.fontNoSize("奖励已领取", Color.getColorStr(2));
            }
            else {
                var nextcfg = Config.up_231[Model_JinSheng.level + 1];
                if (nextcfg) {
                    a.powerLb.text = nextcfg.tips + "可领取";
                }
                else {
                    a.powerLb.text = "";
                }
            }
        }
        a.jihuoBt.checkNotice = a.jihuoBt.visible = Model_JinSheng.exp >= cfg.exp;
        if (!a.isShowNotice)
            a.isShowNotice = Model_JinSheng.exp >= cfg.exp;
        a.powerLb.visible = Model_JinSheng.exp < cfg.exp;
        a.noticeImg.visible = false;
        GGlobal.reddot.setCondition(UIConst.JINSHENG, 0, a.isShowNotice);
        GGlobal.reddot.notifyMsg(UIConst.REBIRTH);
        if (this.guideHandler) {
            this.guideHandler.run();
            this.guideHandler = null;
        }
        if (Model_GlobalMsg.kaifuDay <= 7) {
            a.iconJSHL.visible = true;
        }
        else {
            a.iconJSHL.visible = false;
        }
        a.JSHLNot();
    };
    Child_JinSheng.prototype.timeHandler = function () {
        var a = this;
        a.surTime--;
        if (a.surTime <= 0) {
            Timer.instance.remove(a.timeHandler, this);
            var nextcfg = Config.up_231[Model_JinSheng.level + 1];
            if (nextcfg) {
                a.powerLb.text = nextcfg.tips + "可领取";
            }
            else {
                a.powerLb.text = "";
            }
        }
        else {
            a.powerLb.text = "限时奖励领取" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(a.surTime), Color.getColorStr(6)) + "后结束";
        }
    };
    Child_JinSheng.prototype.open = function () {
        var a = this;
        IconUtil.setImg(a.backBg, Enum_Path.BACK_URL + "frameBg3.jpg");
        var c = GGlobal.control;
        c.listen(Enum_MsgType.JINSHENG, a.updateShow, a);
        c.listen(Enum_MsgType.KAIFUDAY_UPDATE, a.updateShow, a);
        GGlobal.modeljinsheng.CG_OPEN_JINSHENG();
        c.listen(ReddotEvent.CHECK_LBCOMEUP, a.JSHLNot, a);
    };
    Child_JinSheng.prototype.hide = function () {
        var a = this;
        var c = GGlobal.control;
        a.list.numItems = 0;
        a.rewardList.numItems = 0;
        IconUtil.setImg(a.backBg, null);
        IconUtil.setImg(a.pinImg, null);
        IconUtil.setImg(a.nameImg, null);
        c.remove(Enum_MsgType.JINSHENG, a.updateShow, a);
        c.remove(Enum_MsgType.KAIFUDAY_UPDATE, a.updateShow, a);
        c.remove(ReddotEvent.CHECK_LBCOMEUP, a.JSHLNot, a);
        Timer.instance.remove(a.timeHandler, a);
    };
    Child_JinSheng.prototype.setGuide = function (hd) {
        this.guideHandler = hd;
        if (this.list.numItems > 0) {
            if (this.guideHandler) {
                this.guideHandler.run();
                this.guideHandler = null;
            }
        }
    };
    Child_JinSheng.prototype.guideTask = function (step) {
        for (var i = 0; i < this.list._children.length; i++) {
            var item = this.list._children[i];
            if (item.vo.id == 3001) {
                GuideStepManager.instance.showGuide(item.drawBt, item.drawBt.width / 2, item.drawBt.height / 2);
                GuideStepManager.instance.showGuide1(step.source.index, item.drawBt, item.drawBt.width / 2, item.drawBt.height, 90, -106, 35);
                break;
            }
        }
    };
    Child_JinSheng.prototype.guideFinishCheck = function (value) {
        var cfg = Config.up_231[Model_JinSheng.level];
        if (!cfg)
            return false;
        return Model_JinSheng.exp >= cfg.exp;
    };
    //>>>>end
    Child_JinSheng.URL = "ui://dllc71i9s0h0e";
    return Child_JinSheng;
}(fairygui.GComponent));
__reflect(Child_JinSheng.prototype, "Child_JinSheng", ["IPanel"]);
