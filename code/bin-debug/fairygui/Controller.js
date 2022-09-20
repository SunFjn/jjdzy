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
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            var _this = _super.call(this) || this;
            _this._selectedIndex = 0;
            _this._previousIndex = 0;
            _this.changing = false;
            _this._pageIds = [];
            _this._pageNames = [];
            _this._selectedIndex = -1;
            _this._previousIndex = -1;
            return _this;
        }
        Controller.prototype.dispose = function () {
        };
        Object.defineProperty(Controller.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (value) {
                if (this._selectedIndex != value) {
                    if (value > this._pageIds.length - 1)
                        throw "index out of bounds: " + value;
                    this.changing = true;
                    this._previousIndex = this._selectedIndex;
                    this._selectedIndex = value;
                    this.parent.applyController(this);
                    this.dispatchEvent(new fairygui.StateChangeEvent(fairygui.StateChangeEvent.CHANGED));
                    this.changing = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        //功能和设置selectedIndex一样，但不会触发事件
        Controller.prototype.setSelectedIndex = function (value) {
            if (value === void 0) { value = 0; }
            if (this._selectedIndex != value) {
                if (value > this._pageIds.length - 1)
                    throw "index out of bounds: " + value;
                this.changing = true;
                this._previousIndex = this._selectedIndex;
                this._selectedIndex = value;
                this.parent.applyController(this);
                this.changing = false;
            }
        };
        Object.defineProperty(Controller.prototype, "previsousIndex", {
            get: function () {
                return this._previousIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Controller.prototype, "selectedPage", {
            get: function () {
                if (this._selectedIndex == -1)
                    return null;
                else
                    return this._pageNames[this._selectedIndex];
            },
            set: function (val) {
                var i = this._pageNames.indexOf(val);
                if (i == -1)
                    i = 0;
                this.selectedIndex = i;
            },
            enumerable: true,
            configurable: true
        });
        //功能和设置selectedPage一样，但不会触发事件
        Controller.prototype.setSelectedPage = function (value) {
            var i = this._pageNames.indexOf(value);
            if (i == -1)
                i = 0;
            this.setSelectedIndex(i);
        };
        Object.defineProperty(Controller.prototype, "previousPage", {
            get: function () {
                if (this._previousIndex == -1)
                    return null;
                else
                    return this._pageNames[this._previousIndex];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Controller.prototype, "pageCount", {
            get: function () {
                return this._pageIds.length;
            },
            enumerable: true,
            configurable: true
        });
        Controller.prototype.getPageName = function (index) {
            if (index === void 0) { index = 0; }
            return this._pageNames[index];
        };
        Controller.prototype.addPage = function (name) {
            if (name === void 0) { name = ""; }
            this.addPageAt(name, this._pageIds.length);
        };
        Controller.prototype.addPageAt = function (name, index) {
            if (index === void 0) { index = 0; }
            var nid = "" + (Controller._nextPageId++);
            if (index == this._pageIds.length) {
                this._pageIds.push(nid);
                this._pageNames.push(name);
            }
            else {
                this._pageIds.splice(index, 0, nid);
                this._pageNames.splice(index, 0, name);
            }
        };
        Controller.prototype.removePage = function (name) {
            var i = this._pageNames.indexOf(name);
            if (i != -1) {
                this._pageIds.splice(i, 1);
                this._pageNames.splice(i, 1);
                if (this._selectedIndex >= this._pageIds.length)
                    this.selectedIndex = this._selectedIndex - 1;
                else
                    this.parent.applyController(this);
            }
        };
        Controller.prototype.removePageAt = function (index) {
            if (index === void 0) { index = 0; }
            this._pageIds.splice(index, 1);
            this._pageNames.splice(index, 1);
            if (this._selectedIndex >= this._pageIds.length)
                this.selectedIndex = this._selectedIndex - 1;
            else
                this.parent.applyController(this);
        };
        Controller.prototype.clearPages = function () {
            this._pageIds.length = 0;
            this._pageNames.length = 0;
            if (this._selectedIndex != -1)
                this.selectedIndex = -1;
            else
                this.parent.applyController(this);
        };
        Controller.prototype.hasPage = function (aName) {
            return this._pageNames.indexOf(aName) != -1;
        };
        Controller.prototype.getPageIndexById = function (aId) {
            return this._pageIds.indexOf(aId);
        };
        Controller.prototype.getPageIdByName = function (aName) {
            var i = this._pageNames.indexOf(aName);
            if (i != -1)
                return this._pageIds[i];
            else
                return null;
        };
        Controller.prototype.getPageNameById = function (aId) {
            var i = this._pageIds.indexOf(aId);
            if (i != -1)
                return this._pageNames[i];
            else
                return null;
        };
        Controller.prototype.getPageId = function (index) {
            if (index === void 0) { index = 0; }
            return this._pageIds[index];
        };
        Object.defineProperty(Controller.prototype, "selectedPageId", {
            get: function () {
                if (this._selectedIndex == -1)
                    return null;
                else
                    return this._pageIds[this._selectedIndex];
            },
            set: function (val) {
                var i = this._pageIds.indexOf(val);
                this.selectedIndex = i;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Controller.prototype, "oppositePageId", {
            set: function (val) {
                var i = this._pageIds.indexOf(val);
                if (i > 0)
                    this.selectedIndex = 0;
                else if (this._pageIds.length > 1)
                    this.selectedIndex = 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Controller.prototype, "previousPageId", {
            get: function () {
                if (this._previousIndex == -1)
                    return null;
                else
                    return this._pageIds[this._previousIndex];
            },
            enumerable: true,
            configurable: true
        });
        Controller.prototype.runActions = function () {
            if (this._actions) {
                var cnt = this._actions.length;
                for (var i = 0; i < cnt; i++)
                    this._actions[i].run(this, this.previousPageId, this.selectedPageId);
            }
        };
        Controller.prototype.setup = function (buffer) {
            var beginPos = buffer.position;
            buffer.seek(beginPos, 0);
            this.name = buffer.readS();
            this.autoRadioGroupDepth = buffer.readBool();
            buffer.seek(beginPos, 1);
            var i;
            var nextPos;
            var cnt = buffer.readShort();
            for (i = 0; i < cnt; i++) {
                this._pageIds.push(buffer.readS());
                this._pageNames.push(buffer.readS());
            }
            buffer.seek(beginPos, 2);
            cnt = buffer.readShort();
            if (cnt > 0) {
                if (this._actions == null)
                    this._actions = new Array();
                for (i = 0; i < cnt; i++) {
                    nextPos = buffer.readShort();
                    nextPos += buffer.position;
                    var action = fairygui.ControllerAction.createAction(buffer.readByte());
                    action.setup(buffer);
                    this._actions.push(action);
                    buffer.position = nextPos;
                }
            }
            if (this.parent != null && this._pageIds.length > 0)
                this._selectedIndex = 0;
            else
                this._selectedIndex = -1;
        };
        Controller._nextPageId = 0;
        return Controller;
    }(egret.EventDispatcher));
    fairygui.Controller = Controller;
    __reflect(Controller.prototype, "fairygui.Controller");
})(fairygui || (fairygui = {}));
