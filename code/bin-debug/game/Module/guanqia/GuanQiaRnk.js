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
var GuanQiaRnk = (function (_super) {
    __extends(GuanQiaRnk, _super);
    function GuanQiaRnk() {
        return _super.call(this) || this;
    }
    GuanQiaRnk.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqia", "GuanQiaRnk"));
    };
    GuanQiaRnk.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.lbLv = (this.getChild("lbLv"));
    };
    Object.defineProperty(GuanQiaRnk.prototype, "vo", {
        set: function (data) {
            if (data) {
                this.lbRank.text = data[0] + "";
                this.lbName.text = data[2];
                this.lbName.color = data[1] == Model_player.voMine.id ? Color.GREENINT : Color.WHITEINT;
                this.lbLv.text = data[3] + "";
            }
            else {
                this.lbStr.text = this.lbName.text = this.lbLv.text = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    GuanQiaRnk.URL = "ui://r92dp953u94lp";
    return GuanQiaRnk;
}(fairygui.GComponent));
__reflect(GuanQiaRnk.prototype, "GuanQiaRnk");
