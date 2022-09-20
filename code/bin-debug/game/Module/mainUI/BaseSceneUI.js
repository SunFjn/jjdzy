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
var BaseSceneUI = (function (_super) {
    __extends(BaseSceneUI, _super);
    function BaseSceneUI() {
        var _this = _super.call(this) || this;
        _this.LayoutType = fairygui.GroupLayoutType.Horizontal;
        _this.icons = [];
        _this._xx = 0;
        _this._yy = 0;
        _this.maxCount = 7;
        _this.width = 640;
        _this.initUI();
        return _this;
    }
    BaseSceneUI.prototype.initUI = function () {
        var s = this;
        s.btnContainer = fairygui.UIObjectFactory.newObject2(fairygui.ObjectType.Component).asCom;
        this.addChild(s.btnContainer);
        s.LayoutType = fairygui.GroupLayoutType.Horizontal;
        s.resetPosition();
        GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, s.kaifuDayUpdate, s);
        GGlobal.control.listen(Enum_MsgType.IOS_OPEN_CHANGE, s.kaifuDayUpdate, s);
        GGlobal.control.listen(Enum_MsgType.ONRESIZE, s.resetPosition, s);
    };
    BaseSceneUI.prototype.addMenuIcon = function (sid, isNotice) {
        var s = this;
        if (s.getIcon(sid) != null)
            return;
        var tb = Config.tubiao_003[sid];
        var cfg = Config.xitong_001[sid];
        var btn = MainMenuBtn.createInstance();
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
        if (tb.spe == 1) {
            btn.showEff(true);
        }
        s.icons.push(btn);
        // //注册红点关联
        // if (sid == UIConst.QICE_STAR) {
        // 	if (btn) {
        // 		ReddotMgr.ins().register(ReddotEnum.GROUP_QICE, btn.noticeImg);
        // 	}
        // }
    };
    BaseSceneUI.prototype.removeMenuIcon = function (sid) {
        var s = this;
        var l = s.icons.length;
        for (var i = 0; i < l; i++) {
            var t_icon = s.icons[i];
            if (t_icon.panelId == sid) {
                // ReddotMgr.ins().unregister(t_icon);
                t_icon.uidispose();
                s.icons.splice(i, 1);
                break;
            }
        }
        s.aglin();
    };
    BaseSceneUI.prototype.getIcon = function (sid) {
        var s = this;
        var l = s.icons.length;
        for (var i = 0; i < l; i++) {
            if (s.icons[i].panelId == sid) {
                return s.icons[i];
            }
        }
        return null;
    };
    BaseSceneUI.prototype.setIconNotice = function (sid, isNotice) {
        var btn = this.getIcon(sid);
        if (btn)
            btn.checkNotice = isNotice;
    };
    BaseSceneUI.prototype.setIconDisImg = function (sid, bol) {
        var btn = this.getIcon(sid);
        if (btn)
            btn.checkDisImg = bol;
    };
    /**外部加载完成再进行排序*/
    BaseSceneUI.prototype.aglin = function () {
        var s = this;
        s.icons.sort(function (a, b) { return a.sortIndex > b.sortIndex ? 1 : -1; });
        var l = s.icons.length;
        var isH = s.LayoutType == fairygui.GroupLayoutType.Horizontal;
        var _x = 0;
        var _y = 0;
        for (var i = 0; i < l; i++) {
            s.icons[i].setXY(_x, _y);
            var mapcfg = Config.map_200[GGlobal.sceneID];
            if (mapcfg && String(mapcfg.icon).indexOf(s.icons[i].panelId + "") != -1) {
                if (s.icons[i].parent) {
                    this.btnContainer.removeChild(s.icons[i]);
                }
            }
            else {
                if (isH) {
                    _x += s.icons[i].width;
                    if (i == 6) {
                        _x = 0;
                        _y = 100;
                    }
                }
                else {
                    _x = (77 - s.icons[i].width) >> 1;
                    _y += s.icons[i].height + 10;
                }
                this.btnContainer.addChild(s.icons[i]);
            }
        }
        this._yy = _y;
        this._xx = _x;
    };
    BaseSceneUI.prototype.resetPosition = function () {
    };
    //特殊的系统没开放需要显示的不做处理，所以仅仅检查时限的活动
    BaseSceneUI.prototype.kaifuDayUpdate = function () {
        var s = this;
        var l = s.icons.length;
        for (var i = 0; i < l;) {
            var panelid = s.icons[i].panelId;
            if (!ModuleManager.isOpen(panelid)) {
                s.icons[i].uidispose();
                s.icons.splice(i, 1);
                l = s.icons.length;
            }
            else {
                i++;
            }
        }
    };
    return BaseSceneUI;
}(fairygui.GComponent));
__reflect(BaseSceneUI.prototype, "BaseSceneUI");
