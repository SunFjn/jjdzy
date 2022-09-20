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
var VCrossWarsBet = (function (_super) {
    __extends(VCrossWarsBet, _super);
    function VCrossWarsBet() {
        return _super.call(this) || this;
    }
    VCrossWarsBet.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossWarsBet"));
    };
    VCrossWarsBet.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    VCrossWarsBet.prototype.setVo = function (v, index) {
        var self = this;
        self.imgYa1.visible = false;
        self.imgYa2.visible = false;
        if (index == 0) {
            self.lbName.text = v.name1;
            self.lbGuanxian.text = Model_GuanXian.getJiangXianStr1(v.guanxian1);
            self.lbPower.text = "战斗力" + v.power1;
            self.viewHead.setdata(v.head1, -1, null, -1, false, v.frame1);
            if (v.buywin == 1) {
                self.imgYa1.visible = true;
            }
        }
        else {
            self.lbName.text = v.name2;
            self.lbGuanxian.text = Model_GuanXian.getJiangXianStr1(v.guanxian2);
            ;
            self.lbPower.text = "战斗力" + v.power2;
            self.viewHead.setdata(v.head2, -1, null, -1, false, v.frame2);
            if (v.buywin == 2) {
                self.imgYa2.visible = true;
            }
        }
    };
    VCrossWarsBet.URL = "ui://me1skowlhfct4d";
    return VCrossWarsBet;
}(fairygui.GButton));
__reflect(VCrossWarsBet.prototype, "VCrossWarsBet");
