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
    var GComboBox = (function (_super) {
        __extends(GComboBox, _super);
        function GComboBox() {
            var _this = _super.call(this) || this;
            _this._visibleItemCount = 0;
            _this._selectedIndex = 0;
            _this._popupDirection = fairygui.PopupDirection.Auto;
            _this._visibleItemCount = fairygui.UIConfig.defaultComboBoxVisibleItemCount;
            _this._itemsUpdated = true;
            _this._selectedIndex = -1;
            _this._items = [];
            _this._values = [];
            return _this;
        }
        Object.defineProperty(GComboBox.prototype, "text", {
            get: function () {
                if (this._titleObject)
                    return this._titleObject.text;
                else
                    return null;
            },
            set: function (value) {
                if (this._titleObject)
                    this._titleObject.text = value;
                this.updateGear(6);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComboBox.prototype, "icon", {
            get: function () {
                if (this._iconObject)
                    return this._iconObject.icon;
                else
                    return null;
            },
            set: function (value) {
                if (this._iconObject)
                    this._iconObject.icon = value;
                this.updateGear(7);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComboBox.prototype, "titleColor", {
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
        Object.defineProperty(GComboBox.prototype, "titleFontSize", {
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
        Object.defineProperty(GComboBox.prototype, "visibleItemCount", {
            get: function () {
                return this._visibleItemCount;
            },
            set: function (value) {
                this._visibleItemCount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComboBox.prototype, "popupDirection", {
            get: function () {
                return this._popupDirection;
            },
            set: function (value) {
                this._popupDirection = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComboBox.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (value) {
                if (!value)
                    this._items.length = 0;
                else
                    this._items = value.concat();
                if (this._items.length > 0) {
                    if (this._selectedIndex >= this._items.length)
                        this._selectedIndex = this._items.length - 1;
                    else if (this._selectedIndex == -1)
                        this._selectedIndex = 0;
                    this.text = this._items[this._selectedIndex];
                    if (this._icons != null && this._selectedIndex < this._icons.length)
                        this.icon = this._icons[this._selectedIndex];
                }
                else {
                    this.text = "";
                    if (this._icons != null)
                        this.icon = null;
                    this._selectedIndex = -1;
                }
                this._itemsUpdated = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComboBox.prototype, "icons", {
            get: function () {
                return this._icons;
            },
            set: function (value) {
                this._icons = value;
                if (this._icons != null && this._selectedIndex != -1 && this._selectedIndex < this._icons.length)
                    this.icon = this._icons[this._selectedIndex];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComboBox.prototype, "values", {
            get: function () {
                return this._values;
            },
            set: function (value) {
                if (!value)
                    this._values.length = 0;
                else
                    this._values = value.concat();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComboBox.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (val) {
                if (this._selectedIndex == val)
                    return;
                this._selectedIndex = val;
                if (this.selectedIndex >= 0 && this.selectedIndex < this._items.length) {
                    this.text = this._items[this._selectedIndex];
                    if (this._icons != null && this._selectedIndex < this._icons.length)
                        this.icon = this._icons[this._selectedIndex];
                }
                else {
                    this.text = "";
                    if (this._icons != null)
                        this.icon = null;
                }
                this.updateSelectionController();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComboBox.prototype, "value", {
            get: function () {
                return this._values[this._selectedIndex];
            },
            set: function (val) {
                this.selectedIndex = this._values.indexOf(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComboBox.prototype, "selectionController", {
            get: function () {
                return this._selectionController;
            },
            set: function (value) {
                this._selectionController = value;
            },
            enumerable: true,
            configurable: true
        });
        GComboBox.prototype.getTextField = function () {
            if (this._titleObject instanceof fairygui.GTextField)
                return this._titleObject;
            else if (this._titleObject instanceof fairygui.GLabel)
                return this._titleObject.getTextField();
            else if (this._titleObject instanceof fairygui.GButton)
                return this._titleObject.getTextField();
            else
                return null;
        };
        GComboBox.prototype.setState = function (val) {
            if (this._buttonController)
                this._buttonController.selectedPage = val;
        };
        GComboBox.prototype.constructExtension = function (buffer) {
            var str;
            this._buttonController = this.getController("button");
            this._titleObject = this.getChild("title");
            this._iconObject = this.getChild("icon");
            str = buffer.readS();
            if (str) {
                this.dropdown = (fairygui.UIPackage.createObjectFromURL(str));
                if (!this.dropdown) {
                    console.error("下拉框必须为元件");
                    return;
                }
                this.dropdown.name = "this.dropdown";
                this._list = this.dropdown.getChild("list").asList;
                if (this._list == null) {
                    console.error(this.resourceURL + ": 下拉框的弹出元件里必须包含名为list的列表");
                    return;
                }
                this._list.addEventListener(fairygui.ItemEvent.CLICK, this.__clickItem, this);
                this._list.addRelation(this.dropdown, fairygui.RelationType.Width);
                this._list.removeRelation(this.dropdown, fairygui.RelationType.Height);
                this.dropdown.addRelation(this._list, fairygui.RelationType.Height);
                this.dropdown.removeRelation(this._list, fairygui.RelationType.Width);
                this.dropdown.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__popupWinClosed, this);
            }
            /*not support
            if (!GRoot.touchScreen) {
                this.displayObject.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.__rollover, this);
                this.displayObject.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.__rollout, this);
            }*/
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__mousedown, this);
        };
        GComboBox.prototype.handleControllerChanged = function (c) {
            _super.prototype.handleControllerChanged.call(this, c);
            if (this._selectionController == c)
                this.selectedIndex = c.selectedIndex;
        };
        GComboBox.prototype.updateSelectionController = function () {
            if (this._selectionController != null && !this._selectionController.changing
                && this._selectedIndex < this._selectionController.pageCount) {
                var c = this._selectionController;
                this._selectionController = null;
                c.selectedIndex = this._selectedIndex;
                this._selectionController = c;
            }
        };
        GComboBox.prototype.dispose = function () {
            if (this.dropdown) {
                this.dropdown.dispose();
                this.dropdown = null;
            }
            _super.prototype.dispose.call(this);
        };
        GComboBox.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            if (!buffer.seek(beginPos, 6))
                return;
            if (buffer.readByte() != this.packageItem.objectType)
                return;
            var i;
            var iv;
            var nextPos;
            var str;
            var itemCount = buffer.readShort();
            for (i = 0; i < itemCount; i++) {
                nextPos = buffer.readShort();
                nextPos += buffer.position;
                this._items[i] = buffer.readS();
                this._values[i] = buffer.readS();
                str = buffer.readS();
                if (str != null) {
                    if (this._icons == null)
                        this._icons = new Array();
                    this._icons[i] = str;
                }
                buffer.position = nextPos;
            }
            str = buffer.readS();
            if (str != null) {
                this.text = str;
                this._selectedIndex = this._items.indexOf(str);
            }
            else if (this._items.length > 0) {
                this._selectedIndex = 0;
                this.text = this._items[0];
            }
            else
                this._selectedIndex = -1;
            str = buffer.readS();
            if (str != null)
                this.icon = str;
            if (buffer.readBool())
                this.titleColor = buffer.readColor();
            iv = buffer.readInt();
            if (iv > 0)
                this._visibleItemCount = iv;
            this._popupDirection = buffer.readByte();
            iv = buffer.readShort();
            if (iv >= 0)
                this._selectionController = this.parent.getControllerAt(iv);
        };
        GComboBox.prototype.showDropdown = function () {
            if (this._itemsUpdated) {
                this._itemsUpdated = false;
                this._list.removeChildrenToPool();
                var cnt = this._items.length;
                for (var i = 0; i < cnt; i++) {
                    var item = this._list.addItemFromPool();
                    item.name = i < this._values.length ? this._values[i] : "";
                    item.text = this._items[i];
                    item.icon = (this._icons != null && i < this._icons.length) ? this._icons[i] : null;
                }
                this._list.resizeToFit(this._visibleItemCount);
            }
            this._list.selectedIndex = -1;
            this.dropdown.width = this.width;
            var downward = null;
            if (this._popupDirection == fairygui.PopupDirection.Down)
                downward = true;
            else if (this._popupDirection == fairygui.PopupDirection.Up)
                downward = false;
            this.root.togglePopup(this.dropdown, this, downward);
            if (this.dropdown.parent)
                this.setState(fairygui.GButton.DOWN);
        };
        GComboBox.prototype.__popupWinClosed = function (evt) {
            if (this._over)
                this.setState(fairygui.GButton.OVER);
            else
                this.setState(fairygui.GButton.UP);
        };
        GComboBox.prototype.__clickItem = function (evt) {
            fairygui.GTimers.inst.add(100, 1, this.__clickItem2, this, this._list.getChildIndex(evt.itemObject));
        };
        GComboBox.prototype.__clickItem2 = function (index) {
            if (this.dropdown.parent instanceof fairygui.GRoot)
                (this.dropdown.parent).hidePopup();
            this._selectedIndex = index;
            if (this._selectedIndex >= 0)
                this.text = this._items[this._selectedIndex];
            else
                this.text = "";
            this.dispatchEvent(new fairygui.StateChangeEvent(fairygui.StateChangeEvent.CHANGED));
        };
        GComboBox.prototype.__rollover = function (evt) {
            this._over = true;
            if (this._down || this.dropdown && this.dropdown.parent)
                return;
            this.setState(fairygui.GButton.OVER);
        };
        GComboBox.prototype.__rollout = function (evt) {
            this._over = false;
            if (this._down || this.dropdown && this.dropdown.parent)
                return;
            this.setState(fairygui.GButton.UP);
        };
        GComboBox.prototype.__mousedown = function (evt) {
            if ((evt.target instanceof egret.TextField) && evt.target.type == egret.TextFieldType.INPUT)
                return;
            this._down = true;
            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END, this.__mouseup, this);
            if (this.dropdown)
                this.showDropdown();
        };
        GComboBox.prototype.__mouseup = function (evt) {
            if (this._down) {
                this._down = false;
                fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.__mouseup, this);
                if (this.dropdown && !this.dropdown.parent) {
                    if (this._over)
                        this.setState(fairygui.GButton.OVER);
                    else
                        this.setState(fairygui.GButton.UP);
                }
            }
        };
        return GComboBox;
    }(fairygui.GComponent));
    fairygui.GComboBox = GComboBox;
    __reflect(GComboBox.prototype, "fairygui.GComboBox");
})(fairygui || (fairygui = {}));
