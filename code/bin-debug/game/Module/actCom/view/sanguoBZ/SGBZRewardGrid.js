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
var SGBZRewardGrid = (function (_super) {
    __extends(SGBZRewardGrid, _super);
    function SGBZRewardGrid() {
        return _super.call(this) || this;
    }
    SGBZRewardGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActComSGBZ", "SGBZRewardGrid"));
    };
    SGBZRewardGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    SGBZRewardGrid.prototype.setVo = function (v) {
        var self = this;
        self.grid.vo = v;
        if (v != null) {
            if (v.gType == Enum_Attr.ITEM) {
                var voi = v;
                self.lbName.text = voi.name;
                self.lbName.color = voi.qColor;
            }
            else if (v.gType == Enum_Attr.EQUIP) {
                var voe = v;
                self.lbName.text = voe.gridName;
                self.lbName.color = voe.qColor;
            }
            else {
                var voc = v;
                self.lbName.text = voc.name;
                self.lbName.color = voc.qColor;
            }
            self.grid.tipEnabled = true;
            //显示特效
            self.grid.showEff(v.showEffect);
            self.grid.lbNum.visible = false;
            if (v.count > 1) {
                self.grid.lbNum.visible = true;
                self.grid.lbNum.text = ConfigHelp.numToStr(v.count);
            }
        }
        else {
            this.lbName.text = "";
            self.grid.lbNum.visible = false;
            this.grid.tipEnabled = false;
            this.grid.showEff(false);
        }
    };
    SGBZRewardGrid.prototype.isShowImg = function (value) {
        this.drawImg.visible = value;
    };
    SGBZRewardGrid.URL = "ui://y9683xrpws8yf";
    return SGBZRewardGrid;
}(fairygui.GComponent));
__reflect(SGBZRewardGrid.prototype, "SGBZRewardGrid");
