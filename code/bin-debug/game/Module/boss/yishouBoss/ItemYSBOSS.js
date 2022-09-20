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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ItemYSBOSS = (function (_super) {
    __extends(ItemYSBOSS, _super);
    function ItemYSBOSS() {
        var _this = _super.call(this) || this;
        _this.setdate = function (data) {
            var rank = data[0];
            var name = data[1];
            var layer = data[2];
            var self = _this;
            if (rank < 4) {
                self.n1.visible = true;
                self.n1.url = CommonManager.getCommonUrl("rank_" + rank);
                self.n2.text = "";
            }
            else {
                self.n1.visible = false;
                self.n2.text = rank + "";
            }
            if (name) {
                self.lbName.visible = true;
                self.imgNull.visible = false;
                self.lbName.text = name;
            }
            else {
                self.lbName.visible = false;
                self.imgNull.visible = true;
            }
            self.lbLayer.text = layer + "";
        };
        return _this;
    }
    ItemYSBOSS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemYSBOSS.URL = "ui://47jfyc6ehul73m";
    return ItemYSBOSS;
}(fairygui.GComponent));
__reflect(ItemYSBOSS.prototype, "ItemYSBOSS");
