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
var VCrossWars16 = (function (_super) {
    __extends(VCrossWars16, _super);
    function VCrossWars16() {
        return _super.call(this) || this;
    }
    VCrossWars16.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossWars16"));
    };
    VCrossWars16.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.btnYa1.addClickListener(self.onGuess1, self);
        self.btnYa2.addClickListener(self.onGuess2, self);
        self.btnLook1.addClickListener(self.onGuess1, self);
        self.btnLook2.addClickListener(self.onGuess2, self);
    };
    VCrossWars16.prototype.onGuess1 = function () {
        VCrossWars16.onGuess(this._vo1);
    };
    VCrossWars16.prototype.onGuess2 = function () {
        VCrossWars16.onGuess(this._vo2);
    };
    VCrossWars16.onGuess = function (v) {
        if (v.power1 == 0 && v.power2 == 0) {
            return;
        }
        if (v.battleRes > 0) {
            if (v.power1 == 0 || v.power2 == 0) {
                ViewCommonWarn.text("本次战斗轮空");
                return;
            }
            GGlobal.modelCrossWars.CG_LOOK_BATTLE(v);
            return; //可观战
        }
        var buyIndex = -1;
        var arr = Model_CrossWars.matchPlyArr[v.turn];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].buywin > 0) {
                buyIndex = arr[i].index;
                break;
            }
        }
        if (buyIndex == -1 || buyIndex == v.index) {
            GGlobal.layerMgr.open(UIConst.CROSS_WARS_BET, v);
            return;
        }
        ViewCommonWarn.text("每个赛程只可押注一场");
    };
    Object.defineProperty(VCrossWars16.prototype, "vo", {
        set: function (arr) {
            var self = this;
            self._vo1 = arr[0];
            self._vo2 = arr[1];
            if (self._vo1) {
                self.lbGroup.text = Model_CrossWars.getGroupName(self._vo1.index / 2 + 1);
            }
            else {
                self.lbGroup.text = "";
            }
            VCrossWars16.setData(self._vo1, self.lbName1, self.lbName2, self.btnYa1, self.btnLook1, self.imgWin1, self.imgWin2, self.imgYa1, self.imgYa2);
            VCrossWars16.setData(self._vo2, self.lbName3, self.lbName4, self.btnYa2, self.btnLook2, self.imgWin3, self.imgWin4, self.imgYa3, self.imgYa4);
        },
        enumerable: true,
        configurable: true
    });
    VCrossWars16.setData = function (v, lb1, lb2, btnYa, btnLook, imgW1, imgW2, imgYa1, imgYa2) {
        btnYa.visible = btnYa.touchable = false;
        btnLook.visible = btnLook.touchable = false;
        imgW1.visible = false;
        imgW2.visible = false;
        imgYa1.visible = false;
        imgYa2.visible = false;
        if (v) {
            lb1.text = v.name1 ? v.name1 : "暂无";
            lb2.text = v.name2 ? v.name2 : "暂无";
            lb1.color = 0xffffff;
            lb1.color = 0xffffff;
            if (v.buywin == 1) {
                imgYa1.visible = true;
            }
            else if (v.buywin == 2) {
                imgYa2.visible = true;
            }
            if (v.battleRes == 1) {
                imgW1.visible = true;
                if (v.name2)
                    lb2.color = 0x999999;
            }
            else if (v.battleRes == 2) {
                imgW2.visible = true;
                if (v.name1)
                    lb1.color = 0x999999;
            }
            if (v.power1 == 0 && v.power2 == 0) {
            }
            else if (v.battleRes > 0) {
                btnLook.visible = btnLook.touchable = true;
            }
            else {
                btnYa.visible = btnYa.touchable = true;
            }
        }
        else {
            lb1.text = "暂无";
            lb2.text = "暂无";
        }
    };
    VCrossWars16.URL = "ui://me1skowlhfct46";
    return VCrossWars16;
}(fairygui.GComponent));
__reflect(VCrossWars16.prototype, "VCrossWars16");
