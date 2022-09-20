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
/**
 * 新活动-财神送礼
 */
var Child_ActCom_CSSL = (function (_super) {
    __extends(Child_ActCom_CSSL, _super);
    function Child_ActCom_CSSL() {
        return _super.call(this) || this;
    }
    Child_ActCom_CSSL.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_CSSL", "Child_ActCom_CSSL"));
    };
    Child_ActCom_CSSL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActCom_CSSL.prototype.initView = function (pParent) {
        var self = this;
        self._rewardArr = [self.reward0, self.reward1, self.reward2, self.reward3, self.reward4, self.reward5, self.reward6, self.reward7, self.reward8, self.reward9, self.reward10, self.reward11];
    };
    Child_ActCom_CSSL.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "caishensongli.jpg");
        GGlobal.modelActivity.CG_OPENACT(self._vo.id);
        GGlobal.control.listen(UIConst.ACTCOM_CSSL, self.updateView, self);
        Timer.instance.listen(self.onUpdate, self);
        self.qyBtn.addClickListener(self.onQiYuan, self);
        var rewardCfg = Config.xtcs_004[7902];
        var showArr = [];
        if (rewardCfg) {
            showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rewardCfg.other));
        }
        var len = self._rewardArr.length;
        for (var i = 0; i < len; i++) {
            var v = self._rewardArr[i];
            v.visible = true;
            v.isShowEff = true;
            v.tipEnabled = true;
            v.vo = showArr[i];
        }
        var cfg = Config.xtcs_004[7901];
        if (cfg) {
            self.labTips.text = "活动期间每充值<font color='#15f234'>" + cfg.num + "元</font>可抽奖1次(上不封顶)";
        }
        self.updateView();
    };
    Child_ActCom_CSSL.prototype.closePanel = function (pData) {
        var self = this;
        self.disposePanel();
    };
    Child_ActCom_CSSL.prototype.disposePanel = function () {
        var self = this;
        Timer.instance.remove(self.onUpdate, self);
        self.qyBtn.removeClickListener(self.onQiYuan, self);
        IconUtil.setImg(self.bgImg, null);
        GGlobal.control.remove(UIConst.ACTCOM_CSSL, self.updateView, self);
    };
    Child_ActCom_CSSL.prototype.updateView = function (rewards) {
        if (rewards === void 0) { rewards = null; }
        var self = this;
        var model = GGlobal.modelCaiShenSongLli;
        self.labRecharge.text = "再充值<font color='#15f234'>" + model.recharge + "元</font>可抽奖1次";
        if (model.lottery > 0) {
            self.labDraw.text = "抽奖次数：<font color='#15f234'>" + model.lottery + "</font>";
            self.qyBtn.checkNotice = true;
        }
        else {
            self.labDraw.text = "抽奖次数：<font color='#ed1414'>" + model.lottery + "</font>";
            self.qyBtn.checkNotice = false;
        }
        if (rewards) {
            View_Reward_Show4.show(UIConst.ACTCOM_CSSL, "再來一次", Handler.create(self, function () {
                GGlobal.modelCaiShenSongLli.CG_TURN();
            }), rewards, function () {
                var t_color = Color.GREENSTR;
                if (GGlobal.modelCaiShenSongLli.lottery <= 0)
                    t_color = Color.REDSTR;
                var t_countStr = HtmlUtil.font(GGlobal.modelCaiShenSongLli.lottery + "", t_color);
                return "\u62BD\u5956\u5269\u4F59\u6B21\u6570\uFF1A" + t_countStr;
            }, self);
        }
    };
    Child_ActCom_CSSL.prototype.onUpdate = function () {
        var end = this._vo ? this._vo.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.labTime.text = "00:00:00";
        }
    };
    /**
     * 祈愿按钮
     */
    Child_ActCom_CSSL.prototype.onQiYuan = function () {
        var model = GGlobal.modelCaiShenSongLli;
        if (model.lottery <= 0) {
            ViewCommonWarn.text("抽奖次数不足");
            return;
        }
        model.CG_TURN();
    };
    Child_ActCom_CSSL.URL = "ui://scvzi2gqw89c1";
    /** 设置包名（静态属性） */
    Child_ActCom_CSSL.pkg = "ActCom_CSSL";
    return Child_ActCom_CSSL;
}(fairygui.GComponent));
__reflect(Child_ActCom_CSSL.prototype, "Child_ActCom_CSSL", ["IPanel"]);
