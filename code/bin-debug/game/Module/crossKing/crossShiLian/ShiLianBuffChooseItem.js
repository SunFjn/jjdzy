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
var ShiLianBuffChooseItem = (function (_super) {
    __extends(ShiLianBuffChooseItem, _super);
    function ShiLianBuffChooseItem() {
        var _this = _super.call(this) || this;
        _this.costNum = 0;
        return _this;
    }
    ShiLianBuffChooseItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ShiLianBuffChooseItem"));
    };
    ShiLianBuffChooseItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ShiLianBuffChooseItem.prototype.setVo = function (buffData, cfg) {
        var self = this;
        self.buffData = buffData;
        var cfg1 = Config.slbuff_767[cfg.lx];
        IconUtil.setImg(self.iconImg, Enum_Path.SHILIAN_URL + "grid" + (buffData.type - 1) + ".png");
        self.titleIcon.url = CommonManager.getUrl("crossKing", "buff" + (buffData.type - 1));
        self.buffLb.text = Vo_attr.getShowStr(buffData.attID, buffData.attNum, "+");
        self.costNum = cfg1["dj" + buffData.type];
        self.costLb.text = "消耗:       " + cfg1["dj" + buffData.type];
        self.buyImg.visible = buffData.isChoose == 1;
        self.chooseBt.visible = buffData.isChoose != 1;
        self.chooseBt.addClickListener(self.chooseHandler, self);
    };
    ShiLianBuffChooseItem.prototype.chooseHandler = function () {
        var self = this;
        var model = GGlobal.modelkfsl;
        if (model.trialNum >= self.costNum) {
            GGlobal.modelkfsl.CG_CrossTrial_selectBuff_10477([self.buffData.type]);
        }
        else {
            ViewCommonWarn.text("试炼点不足");
        }
    };
    ShiLianBuffChooseItem.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.iconImg, null);
        self.chooseBt.removeClickListener(self.chooseHandler, self);
    };
    ShiLianBuffChooseItem.URL = "ui://yqpfulefkh256f";
    return ShiLianBuffChooseItem;
}(fairygui.GComponent));
__reflect(ShiLianBuffChooseItem.prototype, "ShiLianBuffChooseItem");
