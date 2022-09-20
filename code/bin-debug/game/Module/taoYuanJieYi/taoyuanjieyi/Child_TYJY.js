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
/**
 * 桃园结义子界面
 */
var Child_TYJY = (function (_super) {
    __extends(Child_TYJY, _super);
    function Child_TYJY() {
        var _this = _super.call(this) || this;
        _this._curPage = 1;
        _this._dage = 0;
        return _this;
    }
    Child_TYJY.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "Child_TYJY"));
    };
    Child_TYJY.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
        var self = this;
        self.applyList.callbackThisObj = self;
        self.applyList.itemRenderer = self.itemRender;
        self.gangList.callbackThisObj = self;
        self.gangList.itemRenderer = self.itemRender1;
        self.lbDesc.text = HtmlUtil.createLink("玩法说明", true);
    };
    Child_TYJY.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Child_TYJY.prototype.openPanel = function (pData) {
        IconUtil.setImg(this.bgImg, Enum_Path.TYJY_URL + "bg_1.jpg");
        this.show();
    };
    Child_TYJY.prototype.closePanel = function (pData) {
        this.onHide();
    };
    Child_TYJY.prototype.show = function () {
        var self = this;
        GGlobal.control.listen(UIConst.TAOYUANJIEYI, self.updateView, self);
        self.btnLeft.addClickListener(self.onLeft, self);
        self.btnRight.addClickListener(self.onRight, self);
        self.createBtn.addClickListener(self.onCreate, self);
        self.renameBtn.addClickListener(self.onRename, self);
        self.applyBtn.addClickListener(self.onApply, self);
        self.memberBtn.addClickListener(self.onMember, self);
        self._curPage = 1;
        if (Model_player.voMine.tyjyId > 0) {
            GGlobal.model_TYJY.CG_OPEN_MYGANG();
        }
        else {
            GGlobal.model_TYJY.CG_GET_INFOS(self._curPage);
        }
        GGlobal.reddot.listen(UIConst.TAOYUANJIEYI, self.updateApplyRed, self);
        self.lbDesc.addEventListener(egret.TextEvent.LINK, self.onTFClick, self);
        self.updateApplyRed();
    };
    Child_TYJY.prototype.onHide = function () {
        var self = this;
        GGlobal.control.remove(UIConst.TAOYUANJIEYI, self.updateView, self);
        self.applyList.numItems = 0;
        self.gangList.numItems = 0;
        self.btnLeft.removeClickListener(self.onLeft, self);
        self.btnRight.removeClickListener(self.onRight, self);
        self.createBtn.removeClickListener(self.onCreate, self);
        self.renameBtn.removeClickListener(self.onRename, self);
        self.applyBtn.removeClickListener(self.onApply, self);
        self.memberBtn.removeClickListener(self.onMember, self);
        IconUtil.setImg(self.bgImg, null);
        GGlobal.reddot.remove(UIConst.TAOYUANJIEYI, self.updateApplyRed, self);
        self.lbDesc.removeEventListener(egret.TextEvent.LINK, self.onTFClick, self);
    };
    Child_TYJY.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._listData[idx]);
    };
    Child_TYJY.prototype.itemRender1 = function (idx, obj) {
        var item = obj;
        item.setdata(this._listData[idx], idx);
    };
    /**
     * 更新页面数据
     */
    Child_TYJY.prototype.updateView = function () {
        var self = this;
        var model = GGlobal.model_TYJY;
        if (Model_player.voMine.tyjyId > 0) {
            self.c1.selectedIndex = 1;
            self.nameTxt.text = model.myGangName;
            self._listData = model.myGangList;
            self._listData.sort(self.sortFuc);
            self.gangList.numItems = 3;
            var len = model.myGangList.length;
            for (var i = 0; i < len; i++) {
                var vo = model.myGangList[i];
                if (vo.position == 1) {
                    self._dage = vo.playerId;
                }
            }
            self.applyBtn.visible = Model_player.voMine.id == self._dage ? true : false;
            if (self.applyBtn.visible) {
                self.memberBtn.x = 331;
            }
            else {
                self.memberBtn.x = 267;
            }
        }
        else {
            self.c1.selectedIndex = 0;
            self._listData = model.list;
            self.applyList.numItems = this._listData ? this._listData.length : 0;
            self.pageTxt.text = model.curPage + "/" + model.totalPage;
            self._curPage = model.curPage;
        }
    };
    Child_TYJY.prototype.sortFuc = function (a, b) {
        return a.position - b.position;
    };
    /**
     * 左翻页事件
     */
    Child_TYJY.prototype.onLeft = function (e) {
        this._curPage--;
        if (this._curPage < 1) {
            this._curPage = 1;
            return;
        }
        GGlobal.model_TYJY.CG_GET_INFOS(this._curPage);
    };
    /**
     * 右翻页事件
     */
    Child_TYJY.prototype.onRight = function (e) {
        this._curPage++;
        if (this._curPage > GGlobal.model_TYJY.totalPage) {
            this._curPage = GGlobal.model_TYJY.totalPage;
            return;
        }
        GGlobal.model_TYJY.CG_GET_INFOS(this._curPage);
    };
    /**
     * 创建义盟
     */
    Child_TYJY.prototype.onCreate = function (e) {
        GGlobal.layerMgr.open(UIConst.TYJY_CREATE, { type: 0 });
    };
    /**
     * 修改义盟名字
     */
    Child_TYJY.prototype.onRename = function (e) {
        if (Model_player.voMine.id != this._dage) {
            ViewCommonWarn.text("没有权限");
            return;
        }
        GGlobal.layerMgr.open(UIConst.TYJY_CREATE, { type: 1 });
    };
    /**
     * 打开申请列表界面
     */
    Child_TYJY.prototype.onApply = function (e) {
        GGlobal.layerMgr.open(UIConst.TYJY_APPLY);
    };
    /**
     * 打开人员调动界面
     */
    Child_TYJY.prototype.onMember = function (e) {
        GGlobal.layerMgr.open(UIConst.TYJY_MEMBER);
    };
    /**
     * 更新申请按钮红点
     */
    Child_TYJY.prototype.updateApplyRed = function () {
        this.applyBtn.checkNotice = GGlobal.reddot.checkCondition(UIConst.TAOYUANJIEYI, 0);
    };
    Child_TYJY.prototype.onTFClick = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.TAOYUANJIEYI);
    };
    Child_TYJY.URL = "ui://m2fm2aiyihs7u";
    return Child_TYJY;
}(fairygui.GComponent));
__reflect(Child_TYJY.prototype, "Child_TYJY", ["IPanel"]);
