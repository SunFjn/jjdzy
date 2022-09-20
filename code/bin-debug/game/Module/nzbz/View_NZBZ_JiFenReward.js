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
var View_NZBZ_JiFenReward = (function (_super) {
    __extends(View_NZBZ_JiFenReward, _super);
    function View_NZBZ_JiFenReward() {
        var _this = _super.call(this) || this;
        fairygui.UIObjectFactory.setPackageItemExtension(JiFenRewardItem.URL, JiFenRewardItem);
        _this.childrenCreated();
        return _this;
    }
    View_NZBZ_JiFenReward.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("nzbz", "View_NZBZ_JiFenReward").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_NZBZ_JiFenReward.prototype.renderHandler = function (index, obj) {
        var item = obj;
        item.vo = Model_NZBZ.jifenArr[index];
    };
    View_NZBZ_JiFenReward.prototype.updateShow = function () {
        this.list.numItems = Model_NZBZ.jifenArr.length;
        this.list.scrollToView(0, false, true);
    };
    View_NZBZ_JiFenReward.prototype.onShown = function () {
        this.updateShow();
        GGlobal.control.listen(Enum_MsgType.NZBZ_JIFENREWARD_UPDATE, this.updateShow, this);
    };
    View_NZBZ_JiFenReward.prototype.onHide = function () {
        this.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.NANZHENG_BEIZHAN_JIFEN);
        GGlobal.control.remove(Enum_MsgType.NZBZ_JIFENREWARD_UPDATE, this.updateShow, this);
    };
    View_NZBZ_JiFenReward.URL = "ui://xzyn0qe3i6imh";
    return View_NZBZ_JiFenReward;
}(UIModalPanel));
__reflect(View_NZBZ_JiFenReward.prototype, "View_NZBZ_JiFenReward");
