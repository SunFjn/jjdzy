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
var UIModalPanel = (function (_super) {
    __extends(UIModalPanel, _super);
    /***传入打包的文件名和图片名字 */
    function UIModalPanel() {
        var _this = _super.call(this) || this;
        _this.isInit = false;
        _this.openLv = 0;
        _this.isShowMask = true;
        /**这个值要恒为 false，不然不会执行 onShown,详细内容查看doShowAnimation方法 */
        _this.isShowOpenAnimation = false; //是否显示缩放动画
        _this.isClosePanel = true;
        _this.lastLifeTime = 0;
        _this.isOpenState = false;
        _this.isOpen = false;
        return _this;
    }
    UIModalPanel.prototype.loadRes = function (fuiName, imgName) {
        if (fuiName === void 0) { fuiName = null; }
        if (imgName === void 0) { imgName = null; }
        if (!fuiName && !imgName) {
            this.childrenCreated();
        }
        else {
            this.fuiName = fuiName;
            this.imgName = imgName;
            if (this.fuiName) {
                RES.getResAsync(fuiName, this.fuiCompHandle, this);
            }
            else {
                this.fuiCompHandle();
            }
        }
    };
    UIModalPanel.prototype.fuiCompHandle = function (data, key) {
        if (data === void 0) { data = null; }
        if (key === void 0) { key = null; }
        if (this.imgName) {
            RES.getResAsync(this.imgName, this.imgCompHandle, this);
        }
        else {
            this.imgCompHandle();
        }
    };
    UIModalPanel.prototype.imgCompHandle = function (data, key) {
        if (data === void 0) { data = null; }
        if (key === void 0) { key = null; }
        this.childrenCreated();
    };
    Object.defineProperty(UIModalPanel.prototype, "contentPane", {
        get: function () {
            return this._contentPane;
        },
        set: function (val) {
            if (this._contentPane != val) {
                if (this._contentPane != null)
                    this.removeChild(this._contentPane);
                this._contentPane = val;
                if (this._contentPane != null) {
                    this.addChild(this._contentPane);
                    this.setSize(this._contentPane.width, this._contentPane.height);
                    this._contentPane.addRelation(this, fairygui.RelationType.Size);
                    this._frame = (this._contentPane.getChild("frame"));
                    if (this._frame != null) {
                        this.closeButton = this._frame.getChild("closeButton");
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIModalPanel.prototype, "frame", {
        get: function () {
            return this._frame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIModalPanel.prototype, "closeButton", {
        get: function () {
            return this._closeButton;
        },
        set: function (value) {
            if (this._closeButton != null)
                this._closeButton.removeClickListener(this.closeEventHandler, this);
            this._closeButton = value;
            if (this._closeButton != null)
                this._closeButton.addClickListener(this.closeEventHandler, this);
        },
        enumerable: true,
        configurable: true
    });
    UIModalPanel.prototype.closeEventHandler = function (evt) {
        this.doHideAnimation();
    };
    UIModalPanel.prototype.childrenCreated = function () {
        this.setPivot(0.5, 0.5);
        this.isInit = true;
        if (this.isShowMask) {
            this.modalLayer = new fairygui.GLoader();
            this.modalLayer.fill = fairygui.LoaderFillType.ScaleFree;
            this.modalLayer.url = "ui://jvxpx9em61zd77";
            if (this.parent) {
                this.setModalMask();
                if (this.isClosePanel)
                    this.modalLayer.addClickListener(this.closePanelByModal, this);
            }
        }
        this.doShowAnimation();
    };
    UIModalPanel.prototype.closePanelByModal = function () {
        if (!this.isInit) {
            return;
        }
        if (this.isClosePanel) {
            this.closeEventHandler(null);
        }
    };
    /**显示时播放动画效果*/
    UIModalPanel.prototype.doShowAnimation = function () {
        var self = this;
        if (self.isInit) {
            self.resetPosition();
        }
        GGlobal.control.listen(Enum_MsgType.ONRESIZE, self.resetPosition, self);
        if (!this.isShowOpenAnimation) {
            if (this.isOpenState) {
                this.isOpen = true;
                this.showview();
            }
            return;
        }
        // this.scaleX = 0;
        // this.scaleY = 0;
        // egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineIn).call(this.onShown, this);
    };
    UIModalPanel.prototype.doHideAnimation = function () {
        var self = this;
        self.scaleX = 1;
        self.scaleY = 1;
        self.isOpen = false;
        GGlobal.control.remove(Enum_MsgType.ONRESIZE, self.resetPosition, self);
        if (!self.isShowOpenAnimation) {
            self.hide();
            return;
        }
        // egret.Tween.get(self).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.sineIn).call(self.hide, self);
    };
    UIModalPanel.prototype.showview = function () {
        this.eventFunction(1);
        this.onShown();
    };
    UIModalPanel.prototype.hide = function () {
        if (this.modalLayer) {
            this.modalLayer.removeFromParent();
        }
        this.isOpenState = false;
        if (this.isInit) {
            this.eventFunction(0);
            this.onHide();
        }
        this.lastLifeTime = egret.getTimer();
        GGlobal.layerMgr.close(this.panelId);
    };
    UIModalPanel.prototype.defaultHide = function () {
    };
    UIModalPanel.prototype.onShown = function () {
    };
    UIModalPanel.prototype.onHide = function () {
    };
    UIModalPanel.prototype.onOpen = function (arg) {
        this.isOpenState = true;
        this.lastLifeTime = egret.getTimer();
        this._args = arg;
        if (this.isInit) {
            if (!this.isOpen || arg) {
                this.doShowAnimation();
            }
        }
        if (this.isOpen) {
            if (this.modalLayer && this.parent) {
                this.setModalMask();
                if (this.isClosePanel)
                    this.modalLayer.addClickListener(this.closePanelByModal, this);
            }
        }
    };
    UIModalPanel.prototype.setModalMask = function () {
        if (this.modalLayer && this.parent) {
            this.modalLayer.setSize(App.stage.stageWidth, App.stage.stageHeight);
            this.modalLayer.setXY(-GGlobal.layerMgr.offx, 0);
            var sc = 1 / LayerManager.getFullScreenSc();
            this.modalLayer.setScale(sc, sc);
            var idx = this.parent.getChildIndex(this) - 1;
            idx = idx < 0 ? 0 : idx;
            this.parent.addChildAt(this.modalLayer, idx);
        }
    };
    UIModalPanel.prototype.onClose = function () {
        if (this.modalLayer) {
            this.modalLayer.removeFromParent();
        }
    };
    UIModalPanel.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
        this.setModalMask();
    };
    UIModalPanel.prototype.dispose = function () {
        this.isInit = false;
        _super.prototype.dispose.call(this);
    };
    /** 关闭界面，界面自己调用，封装了GGlobal.layerMgr.close()接口 */
    UIModalPanel.prototype.closeView = function () {
        GGlobal.layerMgr.close2(this.panelId);
    };
    /**
     * 传入1是注册事件 0为移除
     */
    UIModalPanel.prototype.eventFunction = function (type) {
    };
    return UIModalPanel;
}(fairygui.GComponent));
__reflect(UIModalPanel.prototype, "UIModalPanel", ["IUIView"]);
