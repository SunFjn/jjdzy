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
var item_DanBiJiangLi = (function (_super) {
    __extends(item_DanBiJiangLi, _super);
    function item_DanBiJiangLi() {
        return _super.call(this) || this;
    }
    item_DanBiJiangLi.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "item_DanBiJiangLi"));
    };
    item_DanBiJiangLi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.ylq = (this.getChild("ylq"));
        this.btnGet = (this.getChild("btnGet"));
        this.btnGo = (this.getChild("btnGo"));
        this.desc = (this.getChild("desc"));
        this.count = (this.getChild("count"));
        this.grid0 = (this.getChild("grid0"));
        this.noticeImg = (this.getChild("noticeImg"));
        this.btnGo.addClickListener(this.onClickBtnGo, this);
        this.btnGet.addClickListener(this.onClickBtnGet, this);
    };
    item_DanBiJiangLi.prototype.onClickBtnGo = function () {
        GGlobal.layerMgr.open(UIConst.CHONGZHI);
    };
    item_DanBiJiangLi.prototype.onClickBtnGet = function () {
        if (this.VoDatas.count > 0) {
            //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~", this.VoDatas)
            GGlobal.modelSGQD.CGGet4911(this.VoDatas.id);
        }
        else {
            ViewCommonWarn.text("领取条件不足");
        }
    };
    item_DanBiJiangLi.prototype.clean = function () {
        this.grid0.tipEnabled = false;
        this.grid0.isShowEff = false;
    };
    // 	interface Isgdbfl_261 { 
    // /**活动期数*/qs;
    // /**奖励*/reward;
    // /**充值id*/cz;
    // /**索引id*/id;
    // /**可领次数*/time;
    // } 
    item_DanBiJiangLi.prototype.setData = function (data) {
        this.VoDatas = data;
        this.desc.text = "单笔充值[color=#33ff00]" + Config.shop_011[this.VoDatas.cz].RMB + "[/color]元";
        this.count.visible = true;
        this.count.text = "可充值领奖次数：[color=#33ff00]" + this.VoDatas.lastNum + "[/color]";
        var reward = ConfigHelp.makeItemListArr(JSON.parse(this.VoDatas.reward));
        var temp = JSON.parse(this.VoDatas.reward);
        this.grid0.tipEnabled = true;
        this.grid0.isShowEff = true;
        this.grid0.vo = reward[0];
        if (temp[0][2] >= 199800) {
            this.grid0.lbNum.text = temp[0][2] + "";
        }
        var state = this.VoDatas.lastNum == 0;
        this.ylq.visible = state;
        if (state) {
            this.count.visible = false;
        }
        this.noticeImg.visible = this.VoDatas.count > 0;
        this.btnGet.visible = this.VoDatas.count > 0;
        this.btnGo.visible = this.VoDatas.lastNum > 0 && this.VoDatas.count <= 0;
        // if(this.VoDatas.count > 0){
        // 	this.count.text = "剩余领取次数：[color=#33ff00]" + this.VoDatas.count + "[/color]";
        // } else {
        // 	this.count.text = "剩余充值次数：[color=#33ff00]" + this.VoDatas.lastNum + "[/color]";
        // }
    };
    item_DanBiJiangLi.URL = "ui://kdt501v2mq0c1d";
    return item_DanBiJiangLi;
}(fairygui.GComponent));
__reflect(item_DanBiJiangLi.prototype, "item_DanBiJiangLi");
