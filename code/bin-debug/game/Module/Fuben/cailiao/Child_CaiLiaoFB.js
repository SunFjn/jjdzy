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
var Child_CaiLiaoFB = (function (_super) {
    __extends(Child_CaiLiaoFB, _super);
    function Child_CaiLiaoFB() {
        var _this = _super.call(this) || this;
        _this.checkNotice = false;
        return _this;
    }
    Child_CaiLiaoFB.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "Child_CaiLiaoFB"));
    };
    Child_CaiLiaoFB.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_CaiLiaoFB.prototype.openPanel = function (pData) {
        this.show();
    };
    Child_CaiLiaoFB.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_CaiLiaoFB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.list.callbackThisObj = a;
        a.list.foldInvisibleItems = true;
        a.list.itemRenderer = a.renderHandler;
        a.jihuoBt.addClickListener(a.jihuoHandle, a);
        a.buyBt.addClickListener(a.buyHandler, a);
        GGlobal.modelcailiao.CG_OPEN_CAILIAOFUBEN();
    };
    Child_CaiLiaoFB.prototype.buyHandler = function () {
        var self = this;
        var arr = Model_CaiLiao.caiLiaoArr;
        var money = 0;
        var MAXNUM = Config.xtcs_004[2011].num;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].startcondition != "0" && !Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(arr[i].startcondition), arr[i].id)) {
            }
            else {
                for (var j = arr[i].buyNum + 1; j <= MAXNUM; j++) {
                    var cfg = Config.cailiaoxiaohao_709[j];
                    var moneyArr = JSON.parse(cfg.expend);
                    if (cfg) {
                        money += parseInt(moneyArr[0][2]);
                    }
                }
            }
        }
        if (money > 0) {
            var money1_1 = Math.floor(money * 7 / 10);
            ViewAlert.show("是否花费" + HtmlUtil.fontNoSize(money1_1 + "元宝", Color.getColorStr(2)) + "购买所有副本挑战次数？", Handler.create(self, function () {
                if (Model_player.voMine.yuanbao < money1_1) {
                    ModelChongZhi.guideToRecharge();
                }
                else {
                    GGlobal.modelcailiao.CG_CAILIAOFUBEN_BUYKEY();
                }
            }));
        }
        else {
            ViewCommonWarn.text("已无可购买次数");
        }
    };
    Child_CaiLiaoFB.prototype.jihuoHandle = function () {
        var a = this;
        var cfg = GGlobal.modelvip.getCfgByVip(Model_player.voMine.viplv);
        if ((cfg && cfg.SAODANGFUBEN == 1) || Model_player.voMine.maxLv >= Config.xtcs_004[2013].num) {
            if (a.checkNotice) {
                var arr = Model_CaiLiao.caiLiaoArr;
                var index = 0;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].pass == 1 && arr[i].battleNum > 0) {
                        index++;
                        GGlobal.modelcailiao.CG_CAILIAOFUBEN_SAODANG();
                        break;
                    }
                }
                if (index == 0) {
                    ViewCommonWarn.text("没有可扫荡的副本");
                }
            }
            else {
                ViewCommonWarn.text("没有可扫荡的副本");
            }
        }
        else {
            ViewChongZhi.tryToOpenCZ();
        }
    };
    Child_CaiLiaoFB.prototype.renderHandler = function (index, obj) {
        var a = this;
        var item = obj;
        item.vo = Model_CaiLiao.caiLiaoArr[index];
        item.visible = Model_player.voMine.maxLv >= item.vo.lib.xianshi;
        if (item.battleBt.checkNotice)
            a.checkNotice = true;
    };
    Child_CaiLiaoFB.prototype.updateShow = function () {
        var a = this;
        var cfg = GGlobal.modelvip.getCfgByVip(Model_player.voMine.viplv);
        if (cfg.SAODANGFUBEN == 1 || Model_player.voMine.maxLv >= Config.xtcs_004[2013].num) {
            a.jihuoBt.text = "一键扫荡";
            a.promptLb.text = "每日0点重置次数,通关后可扫荡";
        }
        else {
            a.jihuoBt.text = "提升VIP";
            a.promptLb.text = "每日0点重置次数\n等级200级开启扫荡    VIP" + Config.xtcs_004[2012].num + "可快速开启";
        }
        a.checkNotice = false;
        a.list.numItems = Model_CaiLiao.caiLiaoArr.length;
    };
    Child_CaiLiaoFB.prototype.scrollHandle = function () {
        this.list.scrollToView(Model_CaiLiao.curSelIndex, true);
    };
    Child_CaiLiaoFB.prototype.show = function () {
        var a = this;
        Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
        a.updateShow();
        GGlobal.reddot.listen(ReddotEvent.CHECK_FUBEN_CAILIAO, a.updateShow, this);
        GGlobal.control.listen(Enum_MsgType.FUBEN_CAILIAO_BATTLENUM_UPDATE, a.scrollHandle, a);
    };
    Child_CaiLiaoFB.prototype.disposePanel = function () {
        var a = this;
        a.list.numItems = 0;
        GGlobal.reddot.remove(ReddotEvent.CHECK_FUBEN_CAILIAO, a.updateShow, a);
        GGlobal.control.remove(Enum_MsgType.FUBEN_CAILIAO_BATTLENUM_UPDATE, a.scrollHandle, a);
    };
    Child_CaiLiaoFB.prototype.guideBattle = function (step) {
        var self = this;
        for (var i = 0; i < this.list._children.length; i++) {
            var item = this.list._children[i];
            if (item.vo.taskType == step.arg) {
                GuideStepManager.instance.showGuide(item.battleBt, item.battleBt.width / 2, item.battleBt.height / 2);
                GuideStepManager.instance.showGuide1(step.source.index, item.battleBt, 0, item.battleBt.height / 2, 180, -250, -35);
                if (item.battleBt.parent)
                    item.battleBt.parent.setChildIndex(item.battleBt, item.battleBt.parent.numChildren - 1);
                break;
            }
        }
    };
    //>>>>end
    Child_CaiLiaoFB.URL = "ui://pkuzcu87ox4fi";
    return Child_CaiLiaoFB;
}(fairygui.GComponent));
__reflect(Child_CaiLiaoFB.prototype, "Child_CaiLiaoFB", ["IPanel"]);
