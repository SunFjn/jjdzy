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
var VCrossWars8 = (function (_super) {
    __extends(VCrossWars8, _super);
    function VCrossWars8() {
        return _super.call(this) || this;
    }
    VCrossWars8.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossWars8"));
    };
    VCrossWars8.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.btnYa.addClickListener(self.onGuess, self);
        self.btnLook.addClickListener(self.onGuess, self);
    };
    VCrossWars8.prototype.onGuess = function () {
        VCrossWars16.onGuess(this._vo);
    };
    Object.defineProperty(VCrossWars8.prototype, "vo", {
        set: function (v) {
            var self = this;
            self._vo = v;
            if (v) {
                self.lbGroup.text = Model_CrossWars.getGroupName(v.index + 1);
            }
            else {
                self.lbGroup.text = "";
            }
            VCrossWars16.setData(self._vo, self.lbName1, self.lbName2, self.btnYa, self.btnLook, self.imgWin1, self.imgWin2, self.imgYa1, self.imgYa2);
            self.viewHead1.setdata(self._vo.head1, -1, "", -1, false, self._vo.frame1);
            self.viewHead2.setdata(self._vo.head2, -1, "", -1, false, self._vo.frame2);
        },
        enumerable: true,
        configurable: true
    });
    VCrossWars8.URL = "ui://me1skowlhfct47";
    return VCrossWars8;
}(fairygui.GComponent));
__reflect(VCrossWars8.prototype, "VCrossWars8");
