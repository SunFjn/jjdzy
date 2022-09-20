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
var ChildTipBagItem = (function (_super) {
    __extends(ChildTipBagItem, _super);
    function ChildTipBagItem() {
        return _super.call(this) || this;
    }
    ChildTipBagItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ChildTipBagItem"));
    };
    ChildTipBagItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.lbSource.ubbEnabled = true;
        self.lbDes.ubbEnabled = true;
        self.grid.isShowEff = true;
    };
    Object.defineProperty(ChildTipBagItem.prototype, "vo", {
        set: function (v) {
            var self = this;
            var count;
            if (v instanceof VoItem) {
                self.lbDesTit.text = "道具描述";
                self.lbSourceTit.text = "道具来源";
                self.lbDes.text = v.cfg.miaoshu;
                count = Model_Bag.getItemCount(v.id);
                if (count > 0) {
                    self.lbNum.text = "拥有数量：" + count;
                }
                else {
                    self.lbNum.text = "";
                }
                self.lbSource.text = v.cfg.laiyuan;
                self.lbLevel.text = "使用等级：" + v.cfg.level;
                self.vPower.visible = false;
            }
            else if (v instanceof Vo_Currency) {
                self.lbDesTit.text = "道具描述";
                self.lbSourceTit.text = "道具来源";
                self.lbDes.text = v.cfg.miaoshu;
                if (v.showCount) {
                    count = v.count;
                }
                else {
                    count = Model_player.getCurrencyCount(Number(v.gType));
                }
                if (count >= 0) {
                    self.lbNum.text = "拥有数量：" + ConfigHelp.numToStr(count);
                }
                else {
                    self.lbNum.text = "";
                }
                self.lbSource.text = v.cfg.laiyuan;
                self.lbLevel.text = "使用等级：" + v.cfg.level;
                self.vPower.visible = false;
            }
            else {
                self.lbDesTit.text = "装备属性";
                self.lbSourceTit.text = "装备描述";
                // self.lbNum.text = "战斗力：" + (v as VoEquip).getPower()
                self.lbNum.text = "";
                self.lbDes.text = ConfigHelp.attrString(v.baseAttr);
                self.lbSource.text = v.cfg.miaoshu;
                var jie = Math.floor(v.jie / 10);
                if (v.type < 40) {
                    if (v.level > 0) {
                        self.lbLevel.text = "使用等级：" + v.level + "级";
                    }
                    else {
                        self.lbLevel.text = "使用等级：" + Math.floor(v.zs / 1000) + "转";
                    }
                }
                else if (v.type < 50) {
                    self.lbLevel.text = "使用阶数：武将" + jie + "阶";
                }
                else if (v.type < 60) {
                    self.lbLevel.text = "使用阶数：战甲" + jie + "阶";
                }
                else if (v.type < 70) {
                    self.lbLevel.text = "使用阶数：神剑" + jie + "阶";
                }
                else if (v.type < 80) {
                    self.lbLevel.text = "使用阶数：异宝" + jie + "阶";
                }
                else if (v.type < 90) {
                    self.lbLevel.text = "使用阶数：兵法" + jie + "阶";
                }
                else if (v.type < 100) {
                    self.lbLevel.text = "使用阶数：宝物" + jie + "阶";
                }
                else if (v.type < 110) {
                    self.lbLevel.text = "使用阶数：天书" + jie + "阶";
                }
                else if (v.type >= 110 && v.type <= 150) {
                    self.lbLevel.text = Math.floor(v.zs / 1000) + "转";
                }
                self.vPower.text = v.getPower() + "";
                self.vPower.visible = true;
            }
            self.grid.vo = v;
            self.grid.lbNum.text = "";
            self.lbName.text = v.name;
            self.lbName.color = v.qColor;
        },
        enumerable: true,
        configurable: true
    });
    ChildTipBagItem.URL = "ui://jvxpx9emlnckac";
    return ChildTipBagItem;
}(fairygui.GComponent));
__reflect(ChildTipBagItem.prototype, "ChildTipBagItem");
