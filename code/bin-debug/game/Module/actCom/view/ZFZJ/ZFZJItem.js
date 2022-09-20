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
var ZFZJItem = (function (_super) {
    __extends(ZFZJItem, _super);
    function ZFZJItem() {
        return _super.call(this) || this;
    }
    ZFZJItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_ZFZJ", "ZFZJItem"));
    };
    ZFZJItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ZFZJItem.prototype.onDraw = function () {
        var self = this;
        var costVo = self.costIcon.vo;
        var model = GGlobal.modelzfzj;
        if (costVo.gType == Enum_Attr.ITEM) {
            model.CG_HeFuZhangFeiBoss_addjiu_9641(self.vo.id);
        }
        else {
            if (self.vo.time - model.wineDic[self.vo.id] > 0) {
                if (ConfigHelp.checkEnough(self.vo.conmuse, false)) {
                    GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_addjiu_9641(self.vo.id);
                }
                else {
                    ModelChongZhi.guideToRecharge();
                }
            }
            else {
                ViewCommonWarn.text("已无敬酒次数");
            }
        }
    };
    ZFZJItem.prototype.setVo = function (index) {
        var self = this;
        var model = GGlobal.modelzfzj;
        self.vo = Config.hfkhzfzjjiu_286[index];
        var itemVo = ConfigHelp.makeItemListArr(JSON.parse(self.vo.reward))[0];
        self.nameLb.text = itemVo.name;
        self.nameLb.color = itemVo.qColor;
        self.rewardLb.text = "敬酒可获得" + itemVo.name;
        self.addLb.text = "醉意+" + self.vo.zui;
        self.grid.isShowEff = self.grid.tipEnabled = true;
        self.grid.vo = itemVo;
        var costItem = ConfigHelp.makeItemListArr(JSON.parse(self.vo.conmuse1))[0];
        var count = Model_Bag.getItemCount(costItem.id);
        if (count >= costItem.count) {
            self.costIcon.vo = costItem;
            self.costLb.text = count + "/" + costItem.count;
        }
        else {
            var costItem1 = ConfigHelp.makeItemListArr(JSON.parse(self.vo.conmuse))[0];
            self.costIcon.vo = costItem1;
            self.costLb.text = costItem1.count + "";
        }
        var color = model.wineDic[index] >= self.vo.time ? 6 : 1;
        if (!model.wineDic[index])
            model.wineDic[index] = 0;
        self.drawBt.text = "敬酒" + "[color=" + Color.getColorStr(color) + "](" + (self.vo.time - model.wineDic[index]) + "/" + self.vo.time + ")[/color]";
        self.drawBt.addClickListener(self.onDraw, self);
    };
    ZFZJItem.prototype.clean = function () {
        var self = this;
        self.grid.clean();
        self.drawBt.removeClickListener(self.onDraw, self);
    };
    ZFZJItem.URL = "ui://4h4iwgjrgapni";
    return ZFZJItem;
}(fairygui.GComponent));
__reflect(ZFZJItem.prototype, "ZFZJItem");
