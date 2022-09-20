var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var AsyncOperation = (function () {
        function AsyncOperation() {
            this._itemList = new Array();
            this._objectPool = new Array();
        }
        AsyncOperation.prototype.createObject = function (pkgName, resName) {
            var pkg = fairygui.UIPackage.getByName(pkgName);
            if (pkg) {
                var pi = pkg.getItemByName(resName);
                if (!pi)
                    throw new Error("resource not found: " + resName);
                this.internalCreateObject(pi);
            }
            else
                throw new Error("package not found: " + pkgName);
        };
        AsyncOperation.prototype.createObjectFromURL = function (url) {
            var pi = fairygui.UIPackage.getItemByURL(url);
            if (pi)
                this.internalCreateObject(pi);
            else
                throw new Error("resource not found: " + url);
        };
        AsyncOperation.prototype.cancel = function () {
            fairygui.GTimers.inst.remove(this.run, this);
            this._itemList.length = 0;
            var cnt = this._objectPool.length;
            if (cnt > 0) {
                for (var i = 0; i < cnt; i++)
                    this._objectPool[i].dispose();
                this._objectPool.length = 0;
            }
        };
        AsyncOperation.prototype.internalCreateObject = function (item) {
            this._itemList.length = 0;
            this._objectPool.length = 0;
            var di = new fairygui.DisplayListItem(item, 0);
            di.childCount = this.collectComponentChildren(item);
            this._itemList.push(di);
            this._index = 0;
            fairygui.GTimers.inst.add(1, 0, this.run, this);
        };
        AsyncOperation.prototype.collectComponentChildren = function (item) {
            var buffer = item.rawData;
            buffer.seek(0, 2);
            var di;
            var pi;
            var i;
            var dataLen;
            var curPos;
            var pkg;
            var dcnt = buffer.readShort();
            for (i = 0; i < dcnt; i++) {
                dataLen = buffer.readShort();
                curPos = buffer.position;
                buffer.seek(curPos, 0);
                var type = buffer.readByte();
                var src = buffer.readS();
                var pkgId = buffer.readS();
                buffer.position = curPos;
                if (src != null) {
                    if (pkgId != null)
                        pkg = fairygui.UIPackage.getById(pkgId);
                    else
                        pkg = item.owner;
                    pi = pkg != null ? pkg.getItemById(src) : null;
                    di = new fairygui.DisplayListItem(pi, type);
                    if (pi != null && pi.type == fairygui.PackageItemType.Component)
                        di.childCount = this.collectComponentChildren(pi);
                }
                else {
                    di = new fairygui.DisplayListItem(null, type);
                    if (type == fairygui.ObjectType.List)
                        di.listItemCount = this.collectListChildren(buffer);
                }
                this._itemList.push(di);
                buffer.position = curPos + dataLen;
            }
            return dcnt;
        };
        AsyncOperation.prototype.collectListChildren = function (buffer) {
            buffer.seek(buffer.position, 8);
            var listItemCount = 0;
            var i;
            var nextPos;
            var url;
            var pi;
            var di;
            var defaultItem = buffer.readS();
            var itemCount = buffer.readShort();
            for (i = 0; i < itemCount; i++) {
                nextPos = buffer.readShort();
                nextPos += buffer.position;
                url = buffer.readS();
                if (url == null)
                    url = defaultItem;
                if (url) {
                    pi = fairygui.UIPackage.getItemByURL(url);
                    if (pi != null) {
                        di = new fairygui.DisplayListItem(pi, pi.objectType);
                        if (pi.type == fairygui.PackageItemType.Component)
                            di.childCount = this.collectComponentChildren(pi);
                        this._itemList.push(di);
                        listItemCount++;
                    }
                }
                buffer.position = nextPos;
            }
            return listItemCount;
        };
        AsyncOperation.prototype.run = function () {
            var obj;
            var di;
            var poolStart;
            var k;
            var t = egret.getTimer();
            var frameTime = fairygui.UIConfig.frameTimeForAsyncUIConstruction;
            var totalItems = this._itemList.length;
            while (this._index < totalItems) {
                di = this._itemList[this._index];
                if (di.packageItem != null) {
                    obj = fairygui.UIObjectFactory.newObject(di.packageItem);
                    obj.packageItem = di.packageItem;
                    this._objectPool.push(obj);
                    fairygui.UIPackage._constructing++;
                    if (di.packageItem.type == fairygui.PackageItemType.Component) {
                        poolStart = this._objectPool.length - di.childCount - 1;
                        obj.constructFromResource2(this._objectPool, poolStart);
                        this._objectPool.splice(poolStart, di.childCount);
                    }
                    else {
                        obj.constructFromResource();
                    }
                    fairygui.UIPackage._constructing--;
                }
                else {
                    obj = fairygui.UIObjectFactory.newObject2(di.type);
                    this._objectPool.push(obj);
                    if (di.type == fairygui.ObjectType.List && di.listItemCount > 0) {
                        poolStart = this._objectPool.length - di.listItemCount - 1;
                        for (k = 0; k < di.listItemCount; k++)
                            obj.itemPool.returnObject(this._objectPool[k + poolStart]);
                        this._objectPool.splice(poolStart, di.listItemCount);
                    }
                }
                this._index++;
                if ((this._index % 5 == 0) && egret.getTimer() - t >= frameTime)
                    return;
            }
            fairygui.GTimers.inst.remove(this.run, this);
            var result = this._objectPool[0];
            this._itemList.length = 0;
            this._objectPool.length = 0;
            if (this.callback != null)
                this.callback.call(this.callbackObj, result);
        };
        return AsyncOperation;
    }());
    fairygui.AsyncOperation = AsyncOperation;
    __reflect(AsyncOperation.prototype, "fairygui.AsyncOperation");
})(fairygui || (fairygui = {}));
