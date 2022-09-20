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
var RewardBackItem = (function (_super) {
    __extends(RewardBackItem, _super);
    function RewardBackItem() {
        return _super.call(this) || this;
    }
    RewardBackItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Welfare", "RewardBackItem"));
    };
    RewardBackItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.itemName = (this.getChild("itemName"));
        this.list = (this.getChild("list"));
        this.get = (this.getChild("get"));
        this.getAll = (this.getChild("getAll"));
        this.lbYB1 = (this.getChild("lbYB1"));
        this.lbYB2 = (this.getChild("lbYB2"));
        this.desc1 = (this.getChild("desc1"));
        this.itemParent = (this.getChild("itemParent")).asGroup;
        this.hadGet = (this.getChild("hadGet"));
        this.hadGet.visible = false;
        this.itemParent.visible = true;
        this.desc1.text = "50%奖励";
        this.list.setVirtual();
        this.list.itemRenderer = this.itemRender;
        this.list.callbackThisObj = this;
        this.get.addClickListener(this.onClickGet, this);
        this.getAll.addClickListener(this.onClickGetAll, this);
    };
    RewardBackItem.prototype.itemRender = function (index, item) {
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this.rewardData[index];
    };
    RewardBackItem.prototype.clean = function () {
        this.list.numItems = 0;
    };
    RewardBackItem.prototype.setData = function (vo) {
        this.voData = vo;
        this.list.numItems = 0;
        this.itemParent.visible = true;
        this.hadGet.visible = false;
        var reward = ConfigHelp.makeItemListArr((this.voData.reward));
        this.rewardData = reward;
        this.list.numItems = this.rewardData.length;
        this.itemName.text = this.voData.name;
        if (this.voData.state == 2) {
            this.itemParent.visible = false;
            this.hadGet.visible = true;
        }
        else {
            this.get.noticeImg.visible = this.voData.state == 1;
            this.getAll.noticeImg.visible = this.voData.state == 1;
            this.yuanbao = this.voData.conmuse1;
            this.tongqian = this.voData.conmuse;
            this.setTextState(this.lbYB1, this.yuanbao);
            this.setTextState(this.lbYB2, this.tongqian, 2);
        }
    };
    RewardBackItem.prototype.setTextState = function (text, amount, type) {
        if (type === void 0) { type = 1; }
        //								 元宝的判断								铜钱的判断
        var ret = type == 1 ? Model_player.voMine.yuanbao < amount : Model_player.voMine.tongbi < amount;
        if (ret) {
            text.text = "[color=#ff0000]" + ConfigHelp.getYiWanText(amount) + "[/color]";
        }
        else {
            text.text = ConfigHelp.getYiWanText(amount) + "";
        }
    };
    RewardBackItem.prototype.onClickGet = function () {
        if (Model_player.voMine.tongbi < this.tongqian) {
            ViewCommonWarn.text("铜币不足");
            return;
        }
        GGlobal.modelwelfare.CG_APPLY_GETREWARD(1, this.voData.sys);
    };
    RewardBackItem.prototype.onClickGetAll = function () {
        if (Model_player.voMine.yuanbao < this.yuanbao) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelwelfare.CG_APPLY_GETREWARD(2, this.voData.sys);
    };
    RewardBackItem.URL = "ui://ye1luhg3o9c21b";
    return RewardBackItem;
}(fairygui.GComponent));
__reflect(RewardBackItem.prototype, "RewardBackItem");
