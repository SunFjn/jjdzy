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
var SignGrid = (function (_super) {
    __extends(SignGrid, _super);
    function SignGrid() {
        return _super.call(this) || this;
    }
    SignGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("Welfare", "SignGrid"));
    };
    SignGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.drawImg = (this.getChild("drawImg"));
        this.signImg = (this.getChild("signImg"));
        this.grid = (this.getChild("grid"));
        this.grid.isShowEff = true;
    };
    SignGrid.prototype.show = function (vo, state, day) {
        var a = this;
        a.state = state;
        a.day = day;
        a.grid.vo = vo;
        a.signImg.visible = false;
        a.drawImg.visible = false;
        a.grid.checkNotice = false;
        a.grid.tipEnabled = false;
        switch (state) {
            case 0:
                a.grid.tipEnabled = true;
                break;
            case 1:
                a.grid.checkNotice = true;
                break;
            case 2:
                a.drawImg.visible = true;
                a.grid.tipEnabled = true;
                break;
            case 3:
                a.signImg.visible = true;
                break;
        }
    };
    SignGrid.prototype.clean = function () {
        var self = this;
        ConfigHelp.cleanGridEff(self.grid);
    };
    SignGrid.URL = "ui://ye1luhg3r6x41";
    return SignGrid;
}(fairygui.GComponent));
__reflect(SignGrid.prototype, "SignGrid");
