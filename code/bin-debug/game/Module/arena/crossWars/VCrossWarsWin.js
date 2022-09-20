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
var VCrossWarsWin = (function (_super) {
    __extends(VCrossWarsWin, _super);
    function VCrossWarsWin() {
        return _super.call(this) || this;
    }
    VCrossWarsWin.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossWarsWin"));
    };
    VCrossWarsWin.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    VCrossWarsWin.prototype.setVo = function (v, index) {
        var self = this;
        var zsLevel = Config.lsxxkf_232[index];
        if (zsLevel) {
            var zsLevelArr = ConfigHelp.SplitStr(zsLevel.zs);
            var zsMin = Math.floor(Number(zsLevelArr[0][0]) / 1000);
            var zsMax = Math.floor(Number(zsLevelArr[0][1]) / 1000);
            self.lbZs.text = zsMin + "-" + zsMax + "转";
        }
        else {
            self.lbZs.text = "";
        }
        if (v) {
            self.lbName.text = v.name1;
            self.lbPower.text = "战力：" + v.power1;
            self.roleModel.setUIRole(v.job1, v.weakean1, v.horseId1);
            if (v.horseId1) {
                self.roleModel.getUIRole().setScaleXY(0.6, 0.6);
            }
            else {
                self.roleModel.getUIRole().setScaleXY(1, 1);
            }
        }
        else {
            self.lbName.text = "暂无";
            self.lbPower.text = "";
            self.clearAwatar();
        }
    };
    VCrossWarsWin.prototype.setVoWars = function (v, index) {
        var self = this;
        self.imgPower.visible = false;
        self.lbZs.text = "";
        if (index == 1) {
            if (v && v.name1) {
                self.roleModel.setUIRole(v.job1, v.weakean1, v.horseId1);
                if (v.horseId1) {
                    self.roleModel.getUIRole().setScaleXY(0.6, 0.6);
                }
                else {
                    self.roleModel.getUIRole().setScaleXY(1, 1);
                }
                self.lbPower.text = "战力：" + v.power1;
                self.lbName.text = v.name1;
                if (v.battleRes == 2) {
                    self.lbPower.color = 0x999999;
                }
                else {
                    self.lbPower.color = 0xffffff;
                }
            }
            else {
                self.clearAwatar();
                self.lbPower.text = "";
                self.lbName.text = "暂无";
            }
        }
        else if (index == 2) {
            if (v && v.name2) {
                self.roleModel.setUIRole(v.job2, v.weakean2, v.horseId2);
                if (v.horseId2) {
                    self.roleModel.getUIRole().setScaleXY(0.6, 0.6);
                }
                else {
                    self.roleModel.getUIRole().setScaleXY(1, 1);
                }
                self.lbPower.text = "战力：" + v.power2;
                self.lbName.text = v.name2;
                if (v.battleRes == 1) {
                    self.lbPower.color = 0x999999;
                }
                else {
                    self.lbPower.color = 0xffffff;
                }
            }
            else {
                self.clearAwatar();
                self.lbPower.text = "";
                self.lbName.text = "暂无";
            }
        }
    };
    VCrossWarsWin.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.clearAwatar();
    };
    VCrossWarsWin.prototype.clearAwatar = function () {
        var self = this;
        self.roleModel.setUIRole(null);
    };
    VCrossWarsWin.URL = "ui://me1skowlhfct4b";
    return VCrossWarsWin;
}(fairygui.GComponent));
__reflect(VCrossWarsWin.prototype, "VCrossWarsWin");
