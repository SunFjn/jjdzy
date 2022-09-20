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
var View_FunctionPreview_Panel = (function (_super) {
    __extends(View_FunctionPreview_Panel, _super);
    function View_FunctionPreview_Panel() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.setSkin("functionPreview", "functionPreview_atlas0", "View_FunctionPreview_Panel");
        return _this;
    }
    View_FunctionPreview_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(FunctionPreviewItem.URL, FunctionPreviewItem);
    };
    View_FunctionPreview_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        a.list.callbackThisObj = this;
        a.list.itemRenderer = a.renderHandler;
        a.list.setVirtual();
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, this);
        a.grid0.isShowEff = true;
        a.grid1.isShowEff = true;
        a.drawBt.addClickListener(a.onDraw, this);
        Model_FunctionPreview.getFunctionPreView();
        GGlobal.modelPreview.CG_OPEN_FUNCTIONPREVIEW();
    };
    View_FunctionPreview_Panel.prototype.onDraw = function () {
        if (this.drawBt.checkNotice) {
            GGlobal.modelPreview.CG_FUNCTIONPREVIEW_DRAWREWARD(this.curVo.id);
        }
        else {
            ViewCommonWarn.text(HtmlUtil.fontNoSize("未达到领取条件", Color.getColorStr(6)));
        }
    };
    View_FunctionPreview_Panel.prototype.listHandle = function (evt) {
        var a = this;
        var item = evt.itemObject;
        if (a.curVo && a.curVo.id == item.vo.id)
            return;
        if (a.curVo)
            a.curVo.choose = false;
        if (a.curItem)
            a.curItem.setChoose(false);
        item.setChoose(true);
        a.curVo = item.vo;
        a.curItem = item;
        a.updateChooseShow();
    };
    View_FunctionPreview_Panel.prototype.renderHandler = function (index, obj) {
        var a = this;
        var item = obj;
        var vo = Model_FunctionPreview.listArr[index];
        item.show(vo);
        if (!a.curVo && GGlobal.modelGuanQia.curGuanQiaLv >= vo.id && Model_FunctionPreview.drawArr.indexOf(vo.id) == -1) {
            item.setChoose(true);
            a.curVo = vo;
            a.curItem = item;
        }
        else if (!a.curVo && Model_FunctionPreview.drawArr.indexOf(vo.id) == -1) {
            item.setChoose(true);
            a.curVo = vo;
            a.curItem = item;
        }
        else if (a.curVo && a.curVo.id == vo.id) {
            a.curVo.choose = false;
            item.setChoose(true);
            a.curVo = vo;
            a.curItem = item;
        }
    };
    View_FunctionPreview_Panel.prototype.updateShow = function () {
        var a = this;
        a.index = -1;
        if (a.curVo)
            a.curVo.choose = false;
        a.curVo = null;
        if (a.curItem)
            a.curItem.choose = false;
        a.curItem = null;
        var arr = Model_FunctionPreview.listArr;
        for (var i = 0; i < arr.length; i++) {
            var vo = Model_FunctionPreview.listArr[i];
            if (Model_FunctionPreview.drawArr.indexOf(vo.id) == -1) {
                a.index = i;
                break;
            }
        }
        if (a.index == -1) {
            a.curVo = arr[arr.length - 1];
            a.index = arr.length - 1;
        }
        a.list.numItems = arr.length;
        a.list.scrollToView(Math.floor(a.index / a.list.columnCount) * a.list.columnCount);
        a.updateChooseShow();
    };
    View_FunctionPreview_Panel.prototype.updateChooseShow = function () {
        var a = this;
        if (!a.curVo)
            return;
        var reward = ConfigHelp.makeItemListArr(JSON.parse(a.curVo.reward));
        a.grid0.vo = reward[0];
        a.grid0.tipEnabled = true;
        a.grid1.vo = reward[1];
        a.grid1.tipEnabled = true;
        a.drawBt.visible = true;
        a.drawImg.visible = false;
        a.gqLb.visible = false;
        IconUtil.setImg1(Enum_Path.SYSSHOW_URL + a.curVo.icon + ".png", a.iconImg);
        IconUtil.setImg1(Enum_Path.SYSSHOW_URL + a.curVo.font + ".png", a.lbImg);
        if (Model_FunctionPreview.drawArr.indexOf(a.curVo.id) != -1) {
            a.drawBt.visible = false;
            a.drawImg.visible = true;
        }
        else {
            if (a.curItem.check) {
                a.drawBt.checkNotice = a.curItem.check;
            }
            else {
                a.drawBt.visible = false;
                a.gqLb.text = a.curVo.tips;
                a.gqLb.visible = true;
            }
        }
    };
    View_FunctionPreview_Panel.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        // ImageLoader.instance.loader(Enum_Path.BACK_URL + "functionview.jpg", this.backImg);
        IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "functionview.jpg");
        GGlobal.control.listen(Enum_MsgType.FUNCTIONPREVIEW, a.updateShow, this);
    };
    View_FunctionPreview_Panel.prototype.onHide = function () {
        var a = this;
        if (a.curVo)
            a.curVo.choose = false;
        a.curVo = null;
        if (a.curItem)
            a.curItem.choose = false;
        a.curItem = null;
        IconUtil.setImg(this.backImg, null);
        ConfigHelp.cleanGridEff(a.grid0);
        ConfigHelp.cleanGridEff(a.grid1);
        this.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.FUNCTIONPREVIEW);
        GGlobal.control.remove(Enum_MsgType.FUNCTIONPREVIEW, a.updateShow, this);
        IconUtil.setImg1(null, a.iconImg);
        IconUtil.setImg1(null, a.lbImg);
    };
    View_FunctionPreview_Panel.prototype.guideDraw = function () {
        GuideStepManager.instance.showGuide(this.drawBt, this.drawBt.width / 2, this.drawBt.height / 2);
    };
    View_FunctionPreview_Panel.prototype.guideClosePanel = function () {
        GuideStepManager.instance.showGuide(this.closeButton.asButton, this.closeButton.width / 2, this.closeButton.height / 2, null, true);
    };
    View_FunctionPreview_Panel.URL = "ui://j1v1kh34ejra0";
    return View_FunctionPreview_Panel;
}(UIPanelBase));
__reflect(View_FunctionPreview_Panel.prototype, "View_FunctionPreview_Panel");
