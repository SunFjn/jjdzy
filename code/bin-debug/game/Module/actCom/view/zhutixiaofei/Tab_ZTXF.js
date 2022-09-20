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
var Tab_ZTXF = (function (_super) {
    __extends(Tab_ZTXF, _super);
    function Tab_ZTXF() {
        return _super.call(this) || this;
    }
    Tab_ZTXF.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_ZTXF", "Tab_ZTXF"));
    };
    Tab_ZTXF.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    Tab_ZTXF.prototype.setVo = function (cfg, i) {
        var self = this;
        self.idx = i;
        self.updateDot(false);
        if (!cfg)
            return;
        var model = GGlobal.model_ZTXF;
        IconUtil.setImg(self.img, Enum_Path.IMAGE_MODULES_URL + "ztxf/i" + cfg.lx + ".png");
        if (cfg.lx == 1) {
            self.lbTitle.text = "符文主题";
        }
        else if (cfg.lx == 2) {
            self.lbTitle.text = "兽魂主题";
        }
        else if (cfg.lx == 3) {
            self.lbTitle.text = "少主主题";
        }
        else if (cfg.lx == 4) {
            self.lbTitle.text = "异兽主题";
        }
        else if (cfg.lx == 5) {
            self.lbTitle.text = "奇策主题";
        }
        else if (cfg.lx == 6) {
            self.lbTitle.text = "坐骑主题";
        }
        else if (cfg.lx == 7) {
            self.lbTitle.text = "武将主题";
        }
        else if (cfg.lx == 8) {
            self.lbTitle.text = "神兵主题";
        }
        if (model.type == cfg.lx) {
            self.actImg.visible = true;
        }
        else {
            self.actImg.visible = false;
        }
        self.updateDot(model.checkZTXFNoticeByType(cfg.qs, cfg.lx));
    };
    Tab_ZTXF.prototype.setSelect = function (v) {
        var s = this;
        s.c1.setSelectedIndex(v ? 1 : 0);
    };
    Tab_ZTXF.prototype.updateDot = function (v) {
        this.imgNotice.visible = v;
    };
    Tab_ZTXF.URL = "ui://904git2zglgpc";
    return Tab_ZTXF;
}(fairygui.GComponent));
__reflect(Tab_ZTXF.prototype, "Tab_ZTXF");
