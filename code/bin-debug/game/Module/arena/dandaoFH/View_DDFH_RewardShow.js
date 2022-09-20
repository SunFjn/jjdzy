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
var View_DDFH_RewardShow = (function (_super) {
    __extends(View_DDFH_RewardShow, _super);
    function View_DDFH_RewardShow() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        _this.childrenCreated();
        return _this;
    }
    View_DDFH_RewardShow.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_RewardShow").asCom;
        a.contentPane = a.view;
        a.list = (a.view.getChild("list"));
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.dataLb = (a.view.getChild("dataLb"));
        a.promptLb = (a.view.getChild("promptLb"));
        a.drawBt = (a.view.getChild("drawBt"));
        a.drawImg = (a.view.getChild("drawImg"));
        a.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
        a.drawBt.addClickListener(a.drawHandler, a);
    };
    View_DDFH_RewardShow.prototype.drawHandler = function () {
        var num = this._args.num;
        if (Model_DDFH.winNum >= num && Model_DDFH.winRewardArr.indexOf(num) == -1) {
            GGlobal.modelddfh.CG_DANDAOFH_DRAWWINREWARD(num);
        }
        else {
            if (Model_DDFH.winRewardArr.indexOf(num) != -1) {
                ViewCommonWarn.text("奖励已领取");
            }
            else {
                ViewCommonWarn.text("未达到领取条件");
            }
        }
        this.doHideAnimation();
    };
    View_DDFH_RewardShow.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        grid.vo = this.itemArr[index];
    };
    View_DDFH_RewardShow.prototype.updateShow = function () {
        var a = this;
        if (!a._args)
            return;
        var cfg = a._args;
        if (cfg.panelId == UIConst.DANDAO_FUHUI_RANK) {
            if (cfg.isCross) {
                a.dataLb.text = "跨服排名第" + cfg.num + "可领取";
            }
            else {
                a.dataLb.text = "本服排名第" + cfg.num + "可领取";
            }
            a.promptLb.visible = true;
            a.drawBt.visible = false;
            a.drawImg.visible = false;
        }
        else {
            a.promptLb.visible = false;
            a.drawBt.visible = true;
            if (Model_DDFH.winNum >= cfg.num) {
                a.dataLb.text = "今日胜利" + cfg.num + "场可领取" + HtmlUtil.fontNoSize("(" + Model_DDFH.winNum + "/" + cfg.num + ")", Color.getColorStr(2));
                a.drawBt.checkNotice = Model_DDFH.winRewardArr.indexOf(cfg.num) == -1;
            }
            else {
                a.dataLb.text = "今日胜利" + cfg.num + "场可领取" + HtmlUtil.fontNoSize("(" + Model_DDFH.winNum + "/" + cfg.num + ")", Color.getColorStr(6));
                a.drawBt.checkNotice = false;
            }
            if (Model_DDFH.winRewardArr.indexOf(cfg.num) != -1) {
                a.drawBt.visible = false;
                a.drawImg.visible = true;
            }
            else {
                a.drawBt.visible = true;
                a.drawImg.visible = false;
            }
        }
        a.itemArr = ConfigHelp.makeItemListArr(cfg.reward);
        a.list.numItems = a.itemArr.length;
    };
    View_DDFH_RewardShow.prototype.onShown = function () {
        this.updateShow();
        GGlobal.control.listen(Enum_MsgType.DANDAO_FUHUI, this.updateShow, this);
    };
    View_DDFH_RewardShow.prototype.onHide = function () {
        var a = this;
        GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_REWARDSHOW);
        GGlobal.control.remove(Enum_MsgType.DANDAO_FUHUI, a.updateShow, a);
        a.list.numItems = 0;
    };
    View_DDFH_RewardShow.URL = "ui://me1skowljs6lk";
    return View_DDFH_RewardShow;
}(UIModalPanel));
__reflect(View_DDFH_RewardShow.prototype, "View_DDFH_RewardShow");
