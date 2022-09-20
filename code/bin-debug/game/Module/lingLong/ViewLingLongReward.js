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
var ViewLingLongReward = (function (_super) {
    __extends(ViewLingLongReward, _super);
    function ViewLingLongReward() {
        var _this = _super.call(this) || this;
        _this.loadRes("lingLong", "lingLong_atlas0");
        return _this;
    }
    ViewLingLongReward.prototype.childrenCreated = function () {
        GGlobal.createPack("lingLong");
        this.view = fairygui.UIPackage.createObject("lingLong", "ViewLingLongReward").asCom;
        this.contentPane = this.view;
        this.c1 = this.view.getController("c1");
        this.list = (this.view.getChild("list"));
        this.lb = (this.view.getChild("lb"));
        this.btnGet = (this.view.getChild("btnGet"));
        this.imgHas = (this.view.getChild("imgHas"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewLingLongReward.prototype.onShown = function () {
        this._listData = this._args.award || [];
        this._type = this._args.type;
        this._vPoint = this._args.vo;
        this._base = this._args.base;
        this.btnGet.addClickListener(this.onGet, this);
        GGlobal.control.listen(Enum_MsgType.LINGLONG_GET_AWARD, this.upStatus, this);
        this.update();
    };
    ViewLingLongReward.prototype.onHide = function () {
        this.btnGet.removeClickListener(this.onGet, this);
        GGlobal.layerMgr.close(UIConst.LING_LONG_REWARD);
        GGlobal.control.remove(Enum_MsgType.LINGLONG_GET_AWARD, this.upStatus, this);
        this.list.numItems = 0;
    };
    ViewLingLongReward.prototype.update = function () {
        this.list.numItems = this._listData.length;
        this.c1.selectedIndex = this._type == 2 ? 0 : 1;
        this.upStatus();
    };
    ViewLingLongReward.prototype.upStatus = function () {
        if (this._type == 1) {
            this._pointCfg = Config.llgpoint_239[this._vPoint.point];
            var need = this._base + this._pointCfg.point;
            if (this._vPoint.status > 0) {
                this.imgHas.visible = false;
                this.btnGet.visible = true;
                this.btnGet.checkNotice = true;
            }
            else if (this._pointCfg == null || Model_LingLong.myPoint < need) {
                this.imgHas.visible = false;
                this.btnGet.visible = true;
                this.btnGet.checkNotice = false;
            }
            else if (this._vPoint.status == -1) {
                this.imgHas.visible = true;
                this.btnGet.visible = false;
            }
            else {
                this.imgHas.visible = false;
                this.btnGet.visible = true;
                this.btnGet.checkNotice = false;
            }
        }
    };
    ViewLingLongReward.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    ViewLingLongReward.prototype.onGet = function () {
        if (this._pointCfg == null)
            return;
        if (this.btnGet.checkNotice == false) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        GGlobal.modelLingLong.CG_GET_SCORE_AWARD(Number(this._pointCfg.id));
    };
    return ViewLingLongReward;
}(UIModalPanel));
__reflect(ViewLingLongReward.prototype, "ViewLingLongReward");
