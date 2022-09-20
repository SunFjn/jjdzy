var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var Relations = (function () {
        function Relations(owner) {
            this._owner = owner;
            this._items = new Array();
        }
        Relations.prototype.add = function (target, relationType, usePercent) {
            if (usePercent === void 0) { usePercent = false; }
            var length = this._items.length;
            for (var i = 0; i < length; i++) {
                var item = this._items[i];
                if (item.target == target) {
                    item.add(relationType, usePercent);
                    return;
                }
            }
            var newItem = new fairygui.RelationItem(this._owner);
            newItem.target = target;
            newItem.add(relationType, usePercent);
            this._items.push(newItem);
        };
        Relations.prototype.remove = function (target, relationType) {
            if (relationType === void 0) { relationType = 0; }
            var cnt = this._items.length;
            var i = 0;
            while (i < cnt) {
                var item = this._items[i];
                if (item.target == target) {
                    item.remove(relationType);
                    if (item.isEmpty) {
                        item.dispose();
                        this._items.splice(i, 1);
                        cnt--;
                    }
                    else
                        i++;
                }
                else
                    i++;
            }
        };
        Relations.prototype.contains = function (target) {
            var length = this._items.length;
            for (var i = 0; i < length; i++) {
                var item = this._items[i];
                if (item.target == target)
                    return true;
            }
            return false;
        };
        Relations.prototype.clearFor = function (target) {
            var cnt = this._items.length;
            var i = 0;
            while (i < cnt) {
                var item = this._items[i];
                if (item.target == target) {
                    item.dispose();
                    this._items.splice(i, 1);
                    cnt--;
                }
                else
                    i++;
            }
        };
        Relations.prototype.clearAll = function () {
            var length = this._items.length;
            for (var i = 0; i < length; i++) {
                var item = this._items[i];
                item.dispose();
            }
            this._items.length = 0;
        };
        Relations.prototype.copyFrom = function (source) {
            this.clearAll();
            var arr = source._items;
            var length = arr.length;
            for (var i = 0; i < length; i++) {
                var ri = arr[i];
                var item = new fairygui.RelationItem(this._owner);
                item.copyFrom(ri);
                this._items.push(item);
            }
        };
        Relations.prototype.dispose = function () {
            this.clearAll();
        };
        Relations.prototype.onOwnerSizeChanged = function (dWidth, dHeight, applyPivot) {
            if (this._items.length == 0)
                return;
            var length = this._items.length;
            for (var i = 0; i < length; i++) {
                var item = this._items[i];
                item.applyOnSelfResized(dWidth, dHeight, applyPivot);
            }
        };
        Relations.prototype.ensureRelationsSizeCorrect = function () {
            if (this._items.length == 0)
                return;
            this.sizeDirty = false;
            var length = this._items.length;
            for (var i = 0; i < length; i++) {
                var item = this._items[i];
                item.target.ensureSizeCorrect();
            }
        };
        Object.defineProperty(Relations.prototype, "empty", {
            get: function () {
                return this._items.length == 0;
            },
            enumerable: true,
            configurable: true
        });
        Relations.prototype.setup = function (buffer, parentToChild) {
            var cnt = buffer.readByte();
            var target;
            for (var i = 0; i < cnt; i++) {
                var targetIndex = buffer.readShort();
                if (targetIndex == -1)
                    target = this._owner.parent;
                else if (parentToChild)
                    target = this._owner.getChildAt(targetIndex);
                else
                    target = this._owner.parent.getChildAt(targetIndex);
                var newItem = new fairygui.RelationItem(this._owner);
                newItem.target = target;
                this._items.push(newItem);
                var cnt2 = buffer.readByte();
                for (var j = 0; j < cnt2; j++) {
                    var rt = buffer.readByte();
                    var usePercent = buffer.readBool();
                    newItem.internalAdd(rt, usePercent);
                }
            }
        };
        return Relations;
    }());
    fairygui.Relations = Relations;
    __reflect(Relations.prototype, "fairygui.Relations");
})(fairygui || (fairygui = {}));
