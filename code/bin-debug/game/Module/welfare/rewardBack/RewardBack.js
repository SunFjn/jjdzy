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
var RewardBack = (function (_super) {
    __extends(RewardBack, _super);
    function RewardBack() {
        return _super.call(this) || this;
    }
    RewardBack.createInstance = function () {
        return (fairygui.UIPackage.createObject("Welfare", "RewardBack"));
    };
    RewardBack.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.setVirtual();
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRenderer;
        self.getAll.addClickListener(self.onClickGetAll, self);
    };
    RewardBack.prototype.onClickGetAll = function () {
        if (this.VOData.length == 0) {
            ViewCommonWarn.text("没有可找回的奖励");
            return;
        }
        else if (this.lbYB.text == '0') {
            ViewCommonWarn.text("已找回所有奖励");
            return;
        }
        else if (Model_player.voMine.yuanbao < this.yuanbao) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelwelfare.CG_APPLY_GETREWARD(3, 0);
    };
    RewardBack.prototype.itemRenderer = function (index, item) {
        item.setData(this.VOData[index]);
    };
    RewardBack.prototype.show = function () {
        var self = this;
        GGlobal.control.listen(Enum_MsgType.REWARDBACK, self.setList, self);
        GGlobal.control.listen(Enum_MsgType.REWARDBACKITEM, self.updateList, self);
        GGlobal.modelwelfare.CG_OPEN_REWARDBACK();
        self.setState(true);
        IconUtil.setImg(self.n111, Enum_Path.BACK_URL + "backawards.jpg");
        IconUtil.setImg(self.image, Enum_Path.BACK_URL + "caocao.png");
    };
    RewardBack.prototype.setState = function (state) {
        this.list.visible = state;
        this.image.visible = !state;
        this.desc.visible = !state;
    };
    RewardBack.prototype.updateList = function (arg) {
        var self = this;
        if (arg.id == 0 && arg.type == 3) {
            for (var i = 0; i < self.VOData.length; i++) {
                self.VOData[i].state = 2;
            }
            self.lbYB.text = "0";
            GGlobal.mainUICtr.removeReportBTN(UIConst.REWARD_BACK);
            GGlobal.reddot.setCondition(UIConst.REWARD_BACK, 0, false);
        }
        else {
            for (var i = 0; i < self.VOData.length; i++) {
                var vo = self.VOData[i];
                if (arg.id == vo.sys) {
                    self.VOData[i].state = 2;
                    self.yuanbao = self.yuanbao - self.VOData[i].conmuse1;
                    self.setlbYB(self.yuanbao);
                    break;
                }
            }
            for (var i = 0; i < self.VOData.length; ++i) {
                var state = self.VOData[i].state == 1;
                GGlobal.reddot.setCondition(UIConst.REWARD_BACK, 0, state);
                if (state) {
                    break;
                }
            }
        }
        //如果没有红点了，移除战斗界面的找字
        if (!GGlobal.reddot.checkCondition(UIConst.REWARD_BACK, 0)) {
            GGlobal.mainUICtr.removeReportBTN(UIConst.REWARD_BACK);
        }
        self.VOData.sort(function (a, b) { return a.sortIndex() < b.sortIndex() ? -1 : 1; });
        GGlobal.reddot.notify(UIConst.WELFARE);
        self.list.numItems = self.VOData.length;
    };
    RewardBack.prototype.setList = function (arg) {
        var self = this;
        self.list.numItems = 0;
        self.VOData = arg.rewardVO;
        self.yuanbao = arg.all;
        //this.lbYB.text = this.yuanbao + ""; 
        self.setlbYB(self.yuanbao);
        self.VOData.sort(function (a, b) { return a.sortIndex() < b.sortIndex() ? -1 : 1; });
        self.list.numItems = self.VOData.length;
        self.image.visible = self.desc.visible = self.VOData.length == 0;
        //	this.list.visible = this.VOData.length == 0;
    };
    RewardBack.prototype.clean = function () {
        IconUtil.setImg(this.n111, null);
        IconUtil.setImg(this.image, null);
        GGlobal.control.remove(Enum_MsgType.REWARDBACK, this.setList);
        GGlobal.control.remove(Enum_MsgType.REWARDBACKITEM, this.updateList);
        this.list.numItems = 0;
        this.VOData = [];
    };
    RewardBack.prototype.setlbYB = function (amount) {
        var ret = Model_player.voMine.yuanbao < amount;
        if (ret) {
            this.lbYB.text = "[color=#ff0000]" + ConfigHelp.getYiWanText(amount) + "[/color]";
        }
        else {
            this.lbYB.text = ConfigHelp.getYiWanText(amount) + "";
        }
    };
    RewardBack.URL = "ui://ye1luhg3o9c217";
    return RewardBack;
}(fairygui.GComponent));
__reflect(RewardBack.prototype, "RewardBack");
