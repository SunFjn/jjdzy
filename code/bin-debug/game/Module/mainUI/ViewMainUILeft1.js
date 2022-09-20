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
var ViewMainUILeft1 = (function (_super) {
    __extends(ViewMainUILeft1, _super);
    function ViewMainUILeft1() {
        return _super.call(this) || this;
    }
    // private bg1;
    ViewMainUILeft1.prototype.initUI = function () {
        var s = this;
        // s.bg1 = new fairygui.GLoader();
        // s.bg1.setSize(88, 357);
        // s.bg1.fill = fairygui.LoaderFillType.ScaleFree;
        // s.bg1.url = "ui://7gxkx46ww6ro5n";
        // s.bg1.setXY(0, 6);
        // s.bg1.visible = false;
        // s.addChild(s.bg1);
        _super.prototype.initUI.call(this);
        s.btnContainer.setXY(5, 6);
        s.LayoutType = fairygui.GroupLayoutType.Vertical;
        GGlobal.control.listen(Enum_MsgType.ENTER_SCENE, s.aglin, s);
    };
    Object.defineProperty(ViewMainUILeft1, "instance", {
        get: function () {
            if (!ViewMainUILeft1._instance)
                ViewMainUILeft1._instance = new ViewMainUILeft1();
            return ViewMainUILeft1._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewMainUILeft1.prototype.addMenuIcon = function (sid, isNotice) {
        // super.addMenuIcon(sid);
        var s = this;
        if (s.getIcon(sid) != null)
            return;
        var tb = Config.tubiao_003[sid];
        var cfg = Config.xitong_001[sid];
        var btn = MainMenuBtn1.createInstance();
        btn.loadComplete = Handler.create(s, s.aglin);
        var arr = GGlobal.modelActivity.getGroup(sid);
        var cfg1;
        if (arr && arr.length > 0) {
            var vo = arr[0];
            // cfg1 = GGlobal.modelActivity.gethuodong_009(vo.qs,vo.id);
            cfg1 = Config.huodong_009[vo.index];
        }
        if (sid == UIConst.SHOUCHONG) {
            if (GGlobal.modelRecharge.isFirstGet()) {
                btn.setIcon(cfg.icon + "_2");
            }
            else {
                btn.setIcon(cfg.icon + "_1");
            }
        }
        else if (cfg1 && cfg1.dicon > 0) {
            btn.setIcon(cfg1.dicon);
        }
        else {
            btn.setIcon(cfg.icon + "");
        }
        btn.panelId = sid;
        btn.sortIndex = tb.loc;
        btn.checkNotice = isNotice;
        btn.showTime();
        if (tb.spe) {
            btn.showEff(true);
        }
        s.icons.push(btn);
    };
    ViewMainUILeft1.prototype.removeMenuIcon = function (sid) {
        _super.prototype.removeMenuIcon.call(this, sid);
    };
    ViewMainUILeft1.prototype.resetPosition = function () {
        var contentH = fairygui.GRoot.inst.height - 512 - ViewMainTopUI1.instance.height - GGlobal.layerMgr.uiAlign - this._yy;
        this.setXY(-GGlobal.layerMgr.offx + 100, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + contentH / 2 + 120 + 180);
    };
    ViewMainUILeft1.prototype.aglin = function () {
        var s = this;
        _super.prototype.aglin.call(this);
        // s.bg1.visible = true;
        // s.bg1.setSize(88, s._yy);
        s.resetPosition();
    };
    return ViewMainUILeft1;
}(BaseSceneUI));
__reflect(ViewMainUILeft1.prototype, "ViewMainUILeft1");
