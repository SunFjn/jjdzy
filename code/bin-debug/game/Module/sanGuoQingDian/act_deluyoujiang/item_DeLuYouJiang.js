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
var item_DeLuYouJiang = (function (_super) {
    __extends(item_DeLuYouJiang, _super);
    function item_DeLuYouJiang() {
        return _super.call(this) || this;
    }
    item_DeLuYouJiang.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "item_DeLuYouJiang"));
    };
    item_DeLuYouJiang.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.ylq = (this.getChild("ylq"));
        this.btnGet = (this.getChild("btnGet"));
        this.desc = (this.getChild("desc"));
        this.day = (this.getChild("day"));
        this.noticeImg = (this.getChild("noticeImg"));
        this.girdList = (this.getChild("girdList"));
        this.btnGet.addClickListener(this.onClickBtnGet, this);
        this.girdList.setVirtual();
        this.girdList.callbackThisObj = this;
        this.girdList.itemRenderer = this.itemRenderer;
    };
    item_DeLuYouJiang.prototype.itemRenderer = function (index, item) {
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this.rewardVO[index];
    };
    item_DeLuYouJiang.prototype.onClickBtnGet = function () {
        if (this.VODatas.state == 1) {
            GGlobal.modelSGQD.CGGET4891(this.VODatas.id);
        }
        else {
            ViewCommonWarn.text("暂不可领取");
        }
    };
    item_DeLuYouJiang.prototype.clean = function () {
        this.girdList.numItems = 0;
    };
    // interface Isgdlyj_261 {
    // /**奖励*/reward;
    // /**登录天数*/day;
    // /**活动期数*/qs;
    // /**索引id*/id;
    // }
    item_DeLuYouJiang.prototype.setData = function (data) {
        this.VODatas = data;
        this.btnGet.visible = this.VODatas.state == 1;
        this.desc.text = "累计登陆" + this.VODatas.day + "天";
        if (this.VODatas.day <= this.VODatas.loginDay) {
            //this.day.color = 0x00ff00;
            this.day.text = "(" + this.VODatas.loginDay + "/" + this.VODatas.day + ")";
        }
        else {
            this.day.text = "[color=#ff0000](" + this.VODatas.loginDay + "/" + this.VODatas.day + ")[/color]";
        }
        this.noticeImg.visible = this.VODatas.state == 1;
        this.ylq.visible = this.VODatas.state == 2;
        var reward = ConfigHelp.makeItemListArr(JSON.parse(this.VODatas.reward));
        this.rewardVO = reward;
        this.girdList.numItems = this.rewardVO.length;
    };
    item_DeLuYouJiang.URL = "ui://kdt501v2mq0c1f";
    return item_DeLuYouJiang;
}(fairygui.GComponent));
__reflect(item_DeLuYouJiang.prototype, "item_DeLuYouJiang");
