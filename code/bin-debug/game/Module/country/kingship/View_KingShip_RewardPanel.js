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
var View_KingShip_RewardPanel = (function (_super) {
    __extends(View_KingShip_RewardPanel, _super);
    function View_KingShip_RewardPanel() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        fairygui.UIObjectFactory.setPackageItemExtension(Child_KingShip_RewardItem.URL, Child_KingShip_RewardItem);
        _this.childrenCreated();
        return _this;
    }
    View_KingShip_RewardPanel.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("country", "View_KingShip_RewardPanel").asCom;
        self.contentPane = self.view;
        for (var i = 0; i < 5; i++) {
            var item = (self.view.getChild("item" + i));
            item.setData(i + 1);
            self.itemArr.push(item);
        }
        self.myposLb = (self.view.getChild("myposLb"));
        self.drawBt = (self.view.getChild("drawBt"));
        _super.prototype.childrenCreated.call(this);
        self.drawBt.addClickListener(self.drawHandler, self);
    };
    View_KingShip_RewardPanel.prototype.drawHandler = function () {
        if (Model_Kingship.status == 2) {
            GGlobal.modelKingship.CG_GET_KINGSHIP_FENGLU();
        }
        else {
            ViewCommonWarn.text("活动尚未结束");
        }
    };
    View_KingShip_RewardPanel.prototype.updateShow = function () {
        var self = this;
        for (var i = 0; i < self.itemArr.length; i++) {
            if (self._args == 0 && i == self.itemArr.length - 1) {
                self.itemArr[i].updateShow(true);
            }
            else {
                if (i < 3) {
                    if (i + 1 == self._args) {
                        self.itemArr[i].updateShow(true);
                    }
                    else {
                        self.itemArr[i].updateShow(false);
                    }
                }
                else {
                    self.itemArr[i].updateShow(self._args > 3 && i == 3);
                }
            }
        }
        if (self._args == 0) {
            self.myposLb.text = "我的官职:无";
        }
        else {
            self.myposLb.text = "我的官职:" + Model_Kingship.countryText[Model_player.voMine.country - 1][self._args - 1 >= 3 ? 3 : self._args - 1];
        }
        self.updateState();
    };
    View_KingShip_RewardPanel.prototype.updateState = function () {
        var self = this;
        self.drawBt.enabled = Model_Kingship.isDraw != 1;
        self.drawBt.text = Model_Kingship.isDraw == 1 ? "已领取" : "领取俸禄";
        self.drawBt.checkNotice = Model_Kingship.isDraw != 1 && Model_Kingship.status == 2;
    };
    View_KingShip_RewardPanel.prototype.onShown = function () {
        var self = this;
        self.updateShow();
        GGlobal.control.listen(Enum_MsgType.KINGSHIP_UPDATEDATA, self.updateState, self);
    };
    View_KingShip_RewardPanel.prototype.onHide = function () {
        var self = this;
        for (var i = 0; i < self.itemArr.length; i++) {
            self.itemArr[i].clean();
        }
        GGlobal.layerMgr.close(UIConst.COUNTRY_KINGSHIP_REWARD);
        GGlobal.control.remove(Enum_MsgType.KINGSHIP_UPDATEDATA, self.updateState, self);
    };
    View_KingShip_RewardPanel.URL = "ui://uwzc58njjd2n2s";
    return View_KingShip_RewardPanel;
}(UIModalPanel));
__reflect(View_KingShip_RewardPanel.prototype, "View_KingShip_RewardPanel");
