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
var View_Mail_Content = (function (_super) {
    __extends(View_Mail_Content, _super);
    function View_Mail_Content() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_Mail_Content.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("Mail", "View_Mail_Content").asCom;
        this.contentPane = this.view;
        this.drawBt = (this.view.getChild("drawBt"));
        this.drawBt.addClickListener(this.drawHandle, this);
        this.contentLb = (this.view.getChild("contentLb"));
        this.drawImg = (this.view.getChild("drawImg"));
        this.list = (this.view.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandle;
        _super.prototype.childrenCreated.call(this);
    };
    View_Mail_Content.prototype.renderHandle = function (index, obj) {
        var grid = obj;
        grid.isShowEff = true;
        grid.vo = this.vo.adjunct[index];
        grid.tipEnabled = true;
    };
    View_Mail_Content.prototype.drawHandle = function (event) {
        if (this.vo.adjunctState == 1) {
            if (Model_Bag.checkBagCapacity()) {
                GGlobal.modelMail.drawMail(this.vo.sid);
            }
        }
    };
    View_Mail_Content.prototype.updateShow = function () {
        this.vo = this._args;
        this.contentLb.text = this.vo.content;
        /**0没有附件。1有附件。2附件已领* */
        this.drawImg.visible = this.vo.adjunctState == 2;
        this.drawBt.visible = this.vo.adjunctState == 1;
        this.updateAdjunct();
    };
    /**更新附件显示* */
    View_Mail_Content.prototype.updateAdjunct = function () {
        if (this.vo.adjunctState == 0) {
            this.list.numItems = 0;
        }
        else {
            this.list.numItems = this.vo.adjunct.length;
        }
    };
    View_Mail_Content.prototype.onShown = function () {
        this.updateShow();
        GGlobal.control.listen(Enum_MsgType.MAIL_CONTENT_SHOW, this.updateShow, this);
    };
    View_Mail_Content.prototype.onHide = function () {
        this.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.MAIL_CONTENT);
        GGlobal.control.remove(Enum_MsgType.MAIL_CONTENT_SHOW, this.updateShow, this);
    };
    View_Mail_Content.URL = "ui://uwarq7k4sl2fg";
    return View_Mail_Content;
}(UIModalPanel));
__reflect(View_Mail_Content.prototype, "View_Mail_Content");
