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
var View_JinShengReward_Panel = (function (_super) {
    __extends(View_JinShengReward_Panel, _super);
    function View_JinShengReward_Panel() {
        var _this = _super.call(this) || this;
        _this.surTime = 0;
        _this.rewardArr = [];
        fairygui.UIObjectFactory.setPackageItemExtension(JinShengRewardItem.URL, JinShengRewardItem);
        _this.childrenCreated();
        return _this;
    }
    View_JinShengReward_Panel.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("rebirth", "View_JinShengReward_Panel").asCom;
        a.contentPane = a.view;
        a.list = (a.view.getChild("list"));
        a.list.callbackThisObj = this;
        a.list.itemRenderer = a.renderHandler;
        a.list.setVirtual();
        a.timeLb = (a.view.getChild("timeLb"));
        _super.prototype.childrenCreated.call(this);
    };
    View_JinShengReward_Panel.prototype.renderHandler = function (index, obj) {
        var item = obj;
        item.show(this.rewardArr[index], this.surTime > 0);
    };
    View_JinShengReward_Panel.prototype.updateShow = function () {
        Model_JinSheng.jinShengArr.sort(GGlobal.modeljinsheng.sortReward);
        this.rewardArr = [];
        for (var i = 0; i < Model_JinSheng.jinShengArr.length; i++) {
            var cfg = Model_JinSheng.jinShengArr[i];
            if ((Model_GlobalMsg.kaifuDay > 7 && cfg.id >= 9) || cfg.id < 9) {
                this.rewardArr.push(cfg);
            }
        }
        this.list.numItems = this.rewardArr.length;
    };
    View_JinShengReward_Panel.prototype.timeHandler = function () {
        var a = this;
        a.surTime--;
        if (a.surTime <= 0) {
            Timer.instance.remove(a.timeHandler, this);
            a.timeLb.text = "限时奖励领取已结束";
        }
        else {
            a.timeLb.text = "限时奖励领取" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(a.surTime), Color.getColorStr(6)) + "后结束";
        }
    };
    View_JinShengReward_Panel.prototype.onShown = function () {
        var a = this;
        var curTime = Math.floor(Model_GlobalMsg.getServerTime() / 1000);
        var oldTime = Model_GlobalMsg.kaiFuTime;
        var data = new Date(oldTime * 1000);
        var h = data.getHours();
        var m = data.getMinutes();
        var s = data.getSeconds();
        a.surTime = 24 * 60 * 60 * 7 - (curTime - oldTime) - (h * 60 * 60 + m * 60 + s);
        if (a.surTime > 0) {
            Timer.instance.listen(a.timeHandler, this, 1000);
        }
        else {
            Timer.instance.remove(a.timeHandler, this);
            a.timeLb.text = "限时奖励领取已结束";
        }
        a.updateShow();
        // GGlobal.control.listen(Enum_MsgType.JINSHENG, a.updateShow, this);
    };
    View_JinShengReward_Panel.prototype.onHide = function () {
        var a = this;
        a.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.JINSHENG_REWARD);
        Timer.instance.remove(a.timeHandler, this);
        // GGlobal.control.remove(Enum_MsgType.JINSHENG, a.updateShow, this);
    };
    View_JinShengReward_Panel.URL = "ui://dllc71i9elpxh";
    return View_JinShengReward_Panel;
}(UIModalPanel));
__reflect(View_JinShengReward_Panel.prototype, "View_JinShengReward_Panel");
