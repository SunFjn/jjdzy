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
var fairygui;
(function (fairygui) {
    var GButton = (function (_super) {
        __extends(GButton, _super);
        function GButton() {
            var _this = _super.call(this) || this;
            _this._mode = fairygui.ButtonMode.Common;
            _this._title = "";
            _this._icon = "";
            _this._sound = fairygui.UIConfig.buttonSound;
            _this._soundVolumeScale = fairygui.UIConfig.buttonSoundVolumeScale;
            _this._pageOption = new fairygui.PageOption();
            _this._changeStateOnClick = true;
            _this._downEffect = 0;
            _this._downEffectValue = 0.8;
            return _this;
        }
        Object.defineProperty(GButton.prototype, "icon", {
            get: function () {
                return this._icon;
            },
            set: function (value) {
                this._icon = value;
                value = (this._selected && this._selectedIcon) ? this._selectedIcon : this._icon;
                if (this._iconObject != null)
                    this._iconObject.icon = value;
                this.updateGear(7);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "selectedIcon", {
            get: function () {
                return this._selectedIcon;
            },
            set: function (value) {
                this._selectedIcon = value;
                value = (this._selected && this._selectedIcon) ? this._selectedIcon : this._icon;
                if (this._iconObject != null)
                    this._iconObject.icon = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "title", {
            get: function () {
                return this._title;
            },
            set: function (value) {
                this._title = value;
                if (this._titleObject)
                    this._titleObject.text = (this._selected && this._selectedTitle) ? this._selectedTitle : this._title;
                this.updateGear(6);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "text", {
            get: function () {
                return this.title;
            },
            set: function (value) {
                this.title = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "selectedTitle", {
            get: function () {
                return this._selectedTitle;
            },
            set: function (value) {
                this._selectedTitle = value;
                if (this._titleObject)
                    this._titleObject.text = (this._selected && this._selectedTitle) ? this._selectedTitle : this._title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "titleColor", {
            get: function () {
                var tf = this.getTextField();
                if (tf != null)
                    return tf.color;
                else
                    return 0;
            },
            set: function (value) {
                var tf = this.getTextField();
                if (tf != null)
                    tf.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "titleFontSize", {
            get: function () {
                var tf = this.getTextField();
                if (tf != null)
                    return tf.fontSize;
                else
                    return 0;
            },
            set: function (value) {
                var tf = this.getTextField();
                if (tf != null)
                    tf.fontSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "sound", {
            get: function () {
                return this._sound;
            },
            set: function (val) {
                this._sound = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "soundVolumeScale", {
            get: function () {
                return this._soundVolumeScale;
            },
            set: function (value) {
                this._soundVolumeScale = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                if (this._mode == fairygui.ButtonMode.Common)
                    return;
                if (this._selected != val) {
                    this._selected = val;
                    if (this.grayed && this._buttonController && this._buttonController.hasPage(GButton.DISABLED)) {
                        if (this._selected)
                            this.setState(GButton.SELECTED_DISABLED);
                        else
                            this.setState(GButton.DISABLED);
                    }
                    else {
                        if (this._selected)
                            this.setState(this._over ? GButton.SELECTED_OVER : GButton.DOWN);
                        else
                            this.setState(this._over ? GButton.OVER : GButton.UP);
                    }
                    if (this._selectedTitle && this._titleObject)
                        this._titleObject.text = this._selected ? this._selectedTitle : this._title;
                    if (this._selectedIcon) {
                        var str = this._selected ? this._selectedIcon : this._icon;
                        if (this._iconObject != null)
                            this._iconObject.icon = str;
                    }
                    if (this._relatedController
                        && this._parent
                        && !this._parent._buildingDisplayList) {
                        if (this._selected) {
                            this._relatedController.selectedPageId = this._pageOption.id;
                            if (this._relatedController.autoRadioGroupDepth)
                                this._parent.adjustRadioGroupDepth(this, this._relatedController);
                        }
                        else if (this._mode == fairygui.ButtonMode.Check && this._relatedController.selectedPageId == this._pageOption.id)
                            this._relatedController.oppositePageId = this._pageOption.id;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "mode", {
            get: function () {
                return this._mode;
            },
            set: function (value) {
                if (this._mode != value) {
                    if (value == fairygui.ButtonMode.Common)
                        this.selected = false;
                    this._mode = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "relatedController", {
            get: function () {
                return this._relatedController;
            },
            set: function (val) {
                if (val != this._relatedController) {
                    this._relatedController = val;
                    this._pageOption.controller = val;
                    this._pageOption.clear();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "pageOption", {
            get: function () {
                return this._pageOption;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "changeStateOnClick", {
            get: function () {
                return this._changeStateOnClick;
            },
            set: function (value) {
                this._changeStateOnClick = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GButton.prototype, "linkedPopup", {
            get: function () {
                return this._linkedPopup;
            },
            set: function (value) {
                this._linkedPopup = value;
            },
            enumerable: true,
            configurable: true
        });
        GButton.prototype.getTextField = function () {
            if (this._titleObject instanceof fairygui.GTextField)
                return this._titleObject;
            else if (this._titleObject instanceof fairygui.GLabel)
                return this._titleObject.getTextField();
            else if (this._titleObject instanceof GButton)
                return this._titleObject.getTextField();
            else
                return null;
        };
        GButton.prototype.addStateListener = function (listener, thisObj) {
            this.addEventListener(fairygui.StateChangeEvent.CHANGED, listener, thisObj);
        };
        GButton.prototype.removeStateListener = function (listener, thisObj) {
            this.removeEventListener(fairygui.StateChangeEvent.CHANGED, listener, thisObj);
        };
        GButton.prototype.fireClick = function (downEffect) {
            if (downEffect === void 0) { downEffect = true; }
            if (downEffect && this._mode == fairygui.ButtonMode.Common) {
                this.setState(GButton.OVER);
                fairygui.GTimers.inst.add(100, 1, function () { this.setState(GButton.DOWN); }, this);
                fairygui.GTimers.inst.add(200, 1, function () { this.setState(GButton.UP); }, this);
            }
            this.__click(null);
        };
        GButton.prototype.setState = function (val) {
            if (this._buttonController)
                this._buttonController.selectedPage = val;
            if (this._downEffect == 1) {
                var cnt = this.numChildren;
                if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED) {
                    var r = this._downEffectValue * 255;
                    var color = (r << 16) + (r << 8) + r;
                    for (var i = 0; i < cnt; i++) {
                        var obj = this.getChildAt(i);
                        if (obj["color"] != undefined && !(obj instanceof fairygui.GTextField))
                            obj.color = color;
                    }
                }
                else {
                    for (var i = 0; i < cnt; i++) {
                        var obj = this.getChildAt(i);
                        if (obj["color"] != undefined && !(obj instanceof fairygui.GTextField))
                            obj.color = 0xFFFFFF;
                    }
                }
            }
            else if (this._downEffect == 2) {
                if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED) {
                    if (!this._downScaled) {
                        this._downScaled = true;
                        //复制缩放前的变换矩阵,解决缩放后的 container 计算hitTest.
                        this._rootContainer.invertedMatrix = this._rootContainer.$getInvertedConcatenatedMatrix().clone();
                        this.setScale(this.scaleX * this._downEffectValue, this.scaleY * this._downEffectValue);
                    }
                }
                else {
                    if (this._downScaled) {
                        this._downScaled = false;
                        this._rootContainer.invertedMatrix = null;
                        this.setScale(this.scaleX / this._downEffectValue, this.scaleY / this._downEffectValue);
                    }
                }
            }
        };
        GButton.prototype.handleControllerChanged = function (c) {
            _super.prototype.handleControllerChanged.call(this, c);
            if (this._relatedController == c)
                this.selected = this._pageOption.id == c.selectedPageId;
        };
        GButton.prototype.handleGrayedChanged = function () {
            if (this._buttonController && this._buttonController.hasPage(GButton.DISABLED)) {
                if (this.grayed) {
                    if (this._selected && this._buttonController.hasPage(GButton.SELECTED_DISABLED))
                        this.setState(GButton.SELECTED_DISABLED);
                    else
                        this.setState(GButton.DISABLED);
                }
                else if (this._selected)
                    this.setState(GButton.DOWN);
                else
                    this.setState(GButton.UP);
            }
            else
                _super.prototype.handleGrayedChanged.call(this);
        };
        GButton.prototype.constructExtension = function (buffer) {
            buffer.seek(0, 6);
            this._mode = buffer.readByte();
            var str = buffer.readS();
            if (str)
                this._sound = str;
            this._soundVolumeScale = buffer.readFloat();
            this._downEffect = buffer.readByte();
            this._downEffectValue = buffer.readFloat();
            if (this._downEffect == 2)
                this.setPivot(0.5, 0.5, this.pivotAsAnchor);
            this._buttonController = this.getController("button");
            this._titleObject = this.getChild("title");
            this._iconObject = this.getChild("icon");
            if (this._titleObject != null)
                this._title = this._titleObject.text;
            if (this._iconObject != null)
                this._icon = this._iconObject.icon;
            if (this._mode == fairygui.ButtonMode.Common)
                this.setState(GButton.UP);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__mousedown, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__click, this);
        };
        GButton.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            if (!buffer.seek(beginPos, 6))
                return;
            if (buffer.readByte() != this.packageItem.objectType)
                return;
            var str;
            var iv;
            str = buffer.readS();
            if (str != null)
                this.title = str;
            str = buffer.readS();
            if (str != null)
                this.selectedTitle = str;
            str = buffer.readS();
            if (str != null)
                this.icon = str;
            str = buffer.readS();
            if (str != null)
                this.selectedIcon = str;
            if (buffer.readBool())
                this.titleColor = buffer.readColor();
            iv = buffer.readInt();
            if (iv != 0)
                this.titleFontSize = iv;
            iv = buffer.readShort();
            if (iv >= 0)
                this._relatedController = this.parent.getControllerAt(iv);
            this.pageOption.id = buffer.readS();
            str = buffer.readS();
            if (str != null)
                this._sound = str;
            if (buffer.readBool())
                this._soundVolumeScale = buffer.readFloat();
            this.selected = buffer.readBool();
        };
        GButton.prototype.__rollover = function (evt) {
            if (!this._buttonController || !this._buttonController.hasPage(GButton.OVER))
                return;
            this._over = true;
            if (this._down)
                return;
            this.setState(this._selected ? GButton.SELECTED_OVER : GButton.OVER);
        };
        GButton.prototype.__rollout = function (evt) {
            if (!this._buttonController || !this._buttonController.hasPage(GButton.OVER))
                return;
            this._over = false;
            if (this._down)
                return;
            this.setState(this._selected ? GButton.DOWN : GButton.UP);
        };
        GButton.prototype.__mousedown = function (evt) {
            this._down = true;
            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END, this.__mouseup, this);
            if (this._mode == fairygui.ButtonMode.Common) {
                if (this.grayed && this._buttonController && this._buttonController.hasPage(GButton.DISABLED))
                    this.setState(GButton.SELECTED_DISABLED);
                else
                    this.setState(GButton.DOWN);
            }
            if (this._linkedPopup != null) {
                if (this._linkedPopup instanceof fairygui.Window)
                    (this._linkedPopup).toggleStatus();
                else
                    this.root.togglePopup(this._linkedPopup, this);
            }
        };
        GButton.prototype.__mouseup = function (evt) {
            if (this._down) {
                fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.__mouseup, this);
                this._down = false;
                if (this.displayObject == null)
                    return;
                if (this._mode == fairygui.ButtonMode.Common) {
                    if (this.grayed && this._buttonController && this._buttonController.hasPage(GButton.DISABLED))
                        this.setState(GButton.DISABLED);
                    else if (this._over)
                        this.setState(GButton.OVER);
                    else
                        this.setState(GButton.UP);
                }
            }
        };
        GButton.prototype.__click = function (evt) {
            if (this._sound) {
                // var pi: PackageItem = UIPackage.getItemByURL(this._sound);
                // if (pi) {
                //     pi.file = this._sound;
                // var sound: egret.Sound = <egret.Sound>pi.owner.getItemAsset(pi);
                var sound = RES.getRes(this._sound);
                if (sound) {
                    if (SoundManager.getInstance().EFF) {
                        fairygui.GRoot.inst.playOneShotSound(sound, fairygui.UIConfig.buttonSoundVolumeScale);
                    }
                }
                else {
                    if (!GButton._hasLoadSound) {
                        GButton._hasLoadSound = 1;
                        RES.getResAsync(this._sound);
                    }
                }
            }
            if (this._mode == fairygui.ButtonMode.Check) {
                if (this._changeStateOnClick) {
                    this.selected = !this._selected;
                    this.dispatchEvent(new fairygui.StateChangeEvent(fairygui.StateChangeEvent.CHANGED));
                }
            }
            else if (this._mode == fairygui.ButtonMode.Radio) {
                if (this._changeStateOnClick && !this._selected) {
                    this.selected = true;
                    this.dispatchEvent(new fairygui.StateChangeEvent(fairygui.StateChangeEvent.CHANGED));
                }
            }
            else {
                if (this._relatedController)
                    this._relatedController.selectedPageId = this._pageOption.id;
            }
        };
        GButton.UP = "up";
        GButton.DOWN = "down";
        GButton.OVER = "over";
        GButton.SELECTED_OVER = "selectedOver";
        GButton.DISABLED = "disabled";
        GButton.SELECTED_DISABLED = "selectedDisabled";
        GButton._hasLoadSound = 0;
        return GButton;
    }(fairygui.GComponent));
    fairygui.GButton = GButton;
    __reflect(GButton.prototype, "fairygui.GButton");
})(fairygui || (fairygui = {}));
