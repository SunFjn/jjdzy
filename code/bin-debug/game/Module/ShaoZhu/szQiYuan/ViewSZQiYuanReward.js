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
var ViewSZQiYuanReward = (function (_super) {
    __extends(ViewSZQiYuanReward, _super);
    function ViewSZQiYuanReward() {
        var _this = _super.call(this) || this;
        _this.loadRes("ShaoZhu", "ShaoZhu_atlas0");
        return _this;
    }
    ViewSZQiYuanReward.prototype.childrenCreated = function () {
        GGlobal.createPack("ShaoZhu");
        this.view = fairygui.UIPackage.createObject("ShaoZhu", "ViewSZQiYuanReward").asCom;
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
    ViewSZQiYuanReward.prototype.onShown = function () {
        this._listData = this._args.award || [];
        this._type = this._args.type;
        this._vPoint = this._args.vo;
        this._base = this._args.base;
        this.btnGet.addClickListener(this.onGet, this);
        GGlobal.control.listen(Enum_MsgType.SZQIYUAN_GET_POINT, this.upGetPoint, this);
        this.update();
    };
    ViewSZQiYuanReward.prototype.onHide = function () {
        this.btnGet.removeClickListener(this.onGet, this);
        GGlobal.layerMgr.close(UIConst.SHAOZHU_QIYUAN_REWARD);
        GGlobal.control.remove(Enum_MsgType.SZQIYUAN_GET_POINT, this.upGetPoint, this);
        this.list.numItems = 0;
    };
    ViewSZQiYuanReward.prototype.upGetPoint = function (obj) {
        if (obj.id == this._vPoint.id) {
            this._vPoint.ct = obj.ct;
            this.upStatus();
        }
    };
    ViewSZQiYuanReward.prototype.update = function () {
        this.list.numItems = this._listData.length;
        this.c1.selectedIndex = this._type == 2 ? 0 : 1;
        this.upStatus();
    };
    ViewSZQiYuanReward.prototype.upStatus = function () {
        var model = GGlobal.modelSZQiYuan;
        if (this._type == 1) {
            this._pointCfg = Config.llgpoint_239[this._vPoint.id];
            var need = this._base + this._pointCfg.point;
            if (this._vPoint.ct > 0) {
                this.imgHas.visible = false;
                this.btnGet.visible = true;
                this.btnGet.checkNotice = true;
            }
            else if (this._pointCfg == null || model.myPoint < need) {
                this.imgHas.visible = false;
                this.btnGet.visible = true;
                this.btnGet.checkNotice = false;
            }
            else if (this._vPoint.ct == -1) {
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
    ViewSZQiYuanReward.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    ViewSZQiYuanReward.prototype.onGet = function () {
        if (this._pointCfg == null)
            return;
        if (this.btnGet.checkNotice == false) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        GGlobal.modelSZQiYuan.CG_GET_SCORE_AWARD(Number(this._vPoint.id));
    };
    return ViewSZQiYuanReward;
}(UIModalPanel));
__reflect(ViewSZQiYuanReward.prototype, "ViewSZQiYuanReward");
