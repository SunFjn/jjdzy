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
var VCrossWars4 = (function (_super) {
    __extends(VCrossWars4, _super);
    function VCrossWars4() {
        return _super.call(this) || this;
    }
    VCrossWars4.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossWars4"));
    };
    VCrossWars4.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.btnYa.addClickListener(self.onGuess, self);
        self.btnLook.addClickListener(self.onGuess, self);
    };
    VCrossWars4.prototype.onGuess = function () {
        VCrossWars16.onGuess(this._vo);
    };
    Object.defineProperty(VCrossWars4.prototype, "vo", {
        set: function (v) {
            var self = this;
            self._vo = v;
            self.viewWin1.setVoWars(v, 1);
            self.viewWin2.setVoWars(v, 2);
            VCrossWars16.setData(self._vo, self.viewWin1.lbName, self.viewWin2.lbName, self.btnYa, self.btnLook, self.imgWin1, self.imgWin2, self.imgYa1, self.imgYa2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VCrossWars4.prototype, "first", {
        set: function (v) {
            var self = this;
            self._vo = v;
            if (v) {
                self.visible = true;
                self.viewWin1.setVoWars(v, 1);
                self.viewWin2.setVoWars(v, 2);
                VCrossWars16.setData(self._vo, self.viewWin1.lbName, self.viewWin2.lbName, self.btnYa, self.btnLook, self.imgWin1, self.imgWin2, self.imgYa1, self.imgYa2);
            }
            else {
                self.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    VCrossWars4.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var self = this;
        self.viewWin1.clean();
        self.viewWin2.clean();
    };
    VCrossWars4.URL = "ui://me1skowlhfct48";
    return VCrossWars4;
}(fairygui.GComponent));
__reflect(VCrossWars4.prototype, "VCrossWars4");
