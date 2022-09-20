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
var ActCom_SGBZGrid1 = (function (_super) {
    __extends(ActCom_SGBZGrid1, _super);
    function ActCom_SGBZGrid1() {
        var _this = _super.call(this) || this;
        _this.boxIndex = 0;
        return _this;
    }
    ActCom_SGBZGrid1.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActComSGBZ", "ActCom_SGBZGrid1"));
    };
    ActCom_SGBZGrid1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ActCom_SGBZGrid1.prototype.setVo = function (index, vo) {
        var self = this;
        self.boxIndex = index;
        if (vo) {
            self.grid.tipEnabled = true;
            self.grid.isShowEff = true;
            self.grid.vo = vo;
            self.boxBt.visible = false;
            self.grid.visible = true;
            self.nameLb.text = vo.name;
            self.nameLb.color = vo.qColor;
        }
        else {
            self.boxBt.visible = true;
            self.grid.visible = false;
            self.nameLb.text = "宝箱";
            self.nameLb.color = Color.getColorInt(1);
            self.boxBt.addClickListener(self.onBox, self);
        }
    };
    ActCom_SGBZGrid1.prototype.onBox = function () {
        var self = this;
        var cfg;
        if (Config.cjxh_753[GGlobal.modelsgbz.drawNum + 1]) {
            cfg = Config.cjxh_753[GGlobal.modelsgbz.drawNum + 1];
        }
        else {
            cfg = Config.cjxh_753[GGlobal.modelsgbz.drawNum];
        }
        ViewAlert.show("是否花费" + HtmlUtil.fontNoSize(JSON.parse(cfg.xh)[0][2] + "元宝", Color.getColorStr(2)) + "开启宝箱？", Handler.create(self, function () {
            if (ConfigHelp.checkEnough(cfg.xh, false)) {
                GGlobal.modelsgbz.CG_CountryTreasure_getreward_8653(self.boxIndex);
            }
            else {
                ModelChongZhi.guideToRecharge();
            }
        }));
    };
    ActCom_SGBZGrid1.prototype.clean = function () {
        var self = this;
        self.grid.clean();
        self.boxIndex = 0;
        self.boxBt.removeClickListener(self.onBox, self);
    };
    ActCom_SGBZGrid1.URL = "ui://y9683xrpj158e";
    return ActCom_SGBZGrid1;
}(fairygui.GComponent));
__reflect(ActCom_SGBZGrid1.prototype, "ActCom_SGBZGrid1");
