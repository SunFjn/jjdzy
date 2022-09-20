var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var UIPackage = (function () {
        function UIPackage() {
            this._items = new Array();
            this._itemsById = {};
            this._itemsByName = {};
            this._sprites = {};
        }
        UIPackage.getById = function (id) {
            return UIPackage._packageInstById[id];
        };
        UIPackage.getByName = function (name) {
            return UIPackage._packageInstByName[name];
        };
        UIPackage.addPackage = function (resKey, descData) {
            if (descData === void 0) { descData = null; }
            if (!descData) {
                descData = RES.getRes(resKey);
                if (!descData)
                    throw "Resource '" + resKey + "' not found, please check default.res.json!";
            }
            var pkg = new UIPackage();
            pkg.loadPackage(new fairygui.ByteBuffer(descData), resKey);
            UIPackage._packageInstById[pkg.id] = pkg;
            UIPackage._packageInstByName[pkg.name] = pkg;
            pkg.customId = resKey;
            return pkg;
        };
        UIPackage.removePackage = function (packageId) {
            var pkg = UIPackage._packageInstById[packageId];
            pkg.dispose();
            delete UIPackage._packageInstById[pkg.id];
            if (pkg._customId != null)
                delete UIPackage._packageInstById[pkg._customId];
            delete UIPackage._packageInstByName[pkg.name];
        };
        UIPackage.createObject = function (pkgName, resName, userClass) {
            if (userClass === void 0) { userClass = null; }
            var pkg = UIPackage.getByName(pkgName);
            if (pkg)
                return pkg.createObject(resName, userClass);
            else
                return null;
        };
        UIPackage.createObjectFromURL = function (url, userClass) {
            if (userClass === void 0) { userClass = null; }
            var pi = UIPackage.getItemByURL(url);
            if (pi)
                return pi.owner.internalCreateObject(pi, userClass);
            else
                return null;
        };
        UIPackage.getItemURL = function (pkgName, resName) {
            var pkg = UIPackage.getByName(pkgName);
            if (!pkg)
                return null;
            var pi = pkg._itemsByName[resName];
            if (!pi)
                return null;
            return "ui://" + pkg.id + pi.id;
        };
        UIPackage.getItemByURL = function (url) {
            var pos1 = url.indexOf("//");
            if (pos1 == -1)
                return null;
            var pos2 = url.indexOf("/", pos1 + 2);
            if (pos2 == -1) {
                if (url.length > 13) {
                    var pkgId = url.substr(5, 8);
                    var pkg = UIPackage.getById(pkgId);
                    if (pkg != null) {
                        var srcId = url.substr(13);
                        return pkg.getItemById(srcId);
                    }
                }
            }
            else {
                var pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
                pkg = UIPackage.getByName(pkgName);
                if (pkg != null) {
                    var srcName = url.substr(pos2 + 1);
                    return pkg.getItemByName(srcName);
                }
            }
            return null;
        };
        UIPackage.normalizeURL = function (url) {
            if (url == null)
                return null;
            var pos1 = url.indexOf("//");
            if (pos1 == -1)
                return null;
            var pos2 = url.indexOf("/", pos1 + 2);
            if (pos2 == -1)
                return url;
            var pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
            var srcName = url.substr(pos2 + 1);
            return UIPackage.getItemURL(pkgName, srcName);
        };
        UIPackage.setStringsSource = function (source) {
            fairygui.TranslationHelper.loadFromXML(source);
        };
        UIPackage.prototype.loadPackage = function (buffer, resKey) {
            if (buffer.readUnsignedInt() != 0x46475549)
                throw "FairyGUI: old package format found in '" + resKey + "'";
            buffer.version = buffer.readInt();
            var compressed = buffer.readBool();
            this._id = buffer.readUTF();
            this._name = buffer.readUTF();
            buffer.skip(20);
            if (compressed) {
                var buf = new Uint8Array(buffer.buffer, buffer.position, buffer.length - buffer.position);
                var inflater = new Zlib.RawInflate(buf);
                buffer = new fairygui.ByteBuffer(inflater.decompress());
            }
            var indexTablePos = buffer.position;
            var cnt;
            var i;
            var nextPos;
            buffer.seek(indexTablePos, 4);
            cnt = buffer.readInt();
            var stringTable = new Array(cnt);
            stringTable.reduceRight;
            for (i = 0; i < cnt; i++)
                stringTable[i] = buffer.readUTF();
            buffer.stringTable = stringTable;
            buffer.seek(indexTablePos, 1);
            var pi;
            resKey = resKey + "_";
            cnt = buffer.readShort();
            for (i = 0; i < cnt; i++) {
                nextPos = buffer.readInt();
                nextPos += buffer.position;
                pi = new fairygui.PackageItem();
                pi.owner = this;
                pi.type = buffer.readByte();
                pi.id = buffer.readS();
                pi.name = buffer.readS();
                buffer.readS(); //path
                pi.file = buffer.readS();
                buffer.readBool(); //exported
                pi.width = buffer.readInt();
                pi.height = buffer.readInt();
                switch (pi.type) {
                    case fairygui.PackageItemType.Image:
                        {
                            pi.objectType = fairygui.ObjectType.Image;
                            var scaleOption = buffer.readByte();
                            if (scaleOption == 1) {
                                pi.scale9Grid = new egret.Rectangle();
                                pi.scale9Grid.x = buffer.readInt();
                                pi.scale9Grid.y = buffer.readInt();
                                pi.scale9Grid.width = buffer.readInt();
                                pi.scale9Grid.height = buffer.readInt();
                                pi.tileGridIndice = buffer.readInt();
                            }
                            else if (scaleOption == 2)
                                pi.scaleByTile = true;
                            pi.smoothing = buffer.readBool();
                            break;
                        }
                    case fairygui.PackageItemType.MovieClip:
                        {
                            pi.smoothing = buffer.readBool();
                            pi.objectType = fairygui.ObjectType.MovieClip;
                            pi.rawData = buffer.readBuffer();
                            break;
                        }
                    case fairygui.PackageItemType.Font:
                        {
                            pi.rawData = buffer.readBuffer();
                            break;
                        }
                    case fairygui.PackageItemType.Component:
                        {
                            var extension = buffer.readByte();
                            if (extension > 0)
                                pi.objectType = extension;
                            else
                                pi.objectType = fairygui.ObjectType.Component;
                            pi.rawData = buffer.readBuffer();
                            fairygui.UIObjectFactory.resolvePackageItemExtension(pi);
                            break;
                        }
                    case fairygui.PackageItemType.Atlas:
                    case fairygui.PackageItemType.Sound:
                    case fairygui.PackageItemType.Misc:
                        {
                            pi.file = resKey + fairygui.ToolSet.getFileName(pi.file);
                            break;
                        }
                }
                this._items.push(pi);
                this._itemsById[pi.id] = pi;
                if (pi.name != null)
                    this._itemsByName[pi.name] = pi;
                buffer.position = nextPos;
            }
            buffer.seek(indexTablePos, 2);
            cnt = buffer.readShort();
            for (i = 0; i < cnt; i++) {
                nextPos = buffer.readShort();
                nextPos += buffer.position;
                var itemId = buffer.readS();
                pi = this._itemsById[buffer.readS()];
                var sprite = new fairygui.AtlasSprite();
                sprite.atlas = pi;
                sprite.rect.x = buffer.readInt();
                sprite.rect.y = buffer.readInt();
                sprite.rect.width = buffer.readInt();
                sprite.rect.height = buffer.readInt();
                sprite.rotated = buffer.readBool();
                this._sprites[itemId] = sprite;
                buffer.position = nextPos;
            }
            if (buffer.seek(indexTablePos, 3)) {
                /*cnt = buffer.readShort();
                for (i = 0; i < cnt; i++)
                {
                    nextPos = buffer.readInt();
                    nextPos += buffer.position;
                    
                    pi = this._itemsById[buffer.readS()];
                    if (pi && pi.type == PackageItemType.Image)
                    {
                        pi.pixelHitTestData = new PixelHitTestData();
                        pi.pixelHitTestData.load(buffer);
                    }
                    
                    buffer.position = nextPos;
                }*/
            }
        };
        UIPackage.prototype.dispose = function () {
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var pi = this._items[i];
                var texture = pi.texture;
                if (texture != null)
                    texture.dispose();
                else if (pi.frames != null) {
                    var frameCount = pi.frames.length;
                    for (var j = 0; j < frameCount; j++) {
                        texture = pi.frames[j].texture;
                        if (texture != null)
                            texture.dispose();
                    }
                }
            }
        };
        Object.defineProperty(UIPackage.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIPackage.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIPackage.prototype, "customId", {
            get: function () {
                return this._customId;
            },
            set: function (value) {
                if (this._customId != null)
                    delete UIPackage._packageInstById[this._customId];
                this._customId = value;
                if (this._customId != null)
                    UIPackage._packageInstById[this._customId] = this;
            },
            enumerable: true,
            configurable: true
        });
        UIPackage.prototype.createObject = function (resName, userClass) {
            if (userClass === void 0) { userClass = null; }
            var pi = this._itemsByName[resName];
            if (pi)
                return this.internalCreateObject(pi, userClass);
            else
                return null;
        };
        UIPackage.prototype.internalCreateObject = function (item, userClass) {
            if (userClass === void 0) { userClass = null; }
            var g;
            if (item.type == fairygui.PackageItemType.Component) {
                if (userClass != null)
                    g = new userClass();
                else
                    g = fairygui.UIObjectFactory.newObject(item);
            }
            else
                g = fairygui.UIObjectFactory.newObject(item);
            if (g == null)
                return null;
            UIPackage._constructing++;
            g.packageItem = item;
            g.constructFromResource();
            UIPackage._constructing--;
            return g;
        };
        UIPackage.prototype.getItemById = function (itemId) {
            return this._itemsById[itemId];
        };
        UIPackage.prototype.getItemByName = function (resName) {
            return this._itemsByName[resName];
        };
        UIPackage.prototype.getItemAssetByName = function (resName) {
            var pi = this._itemsByName[resName];
            if (pi == null) {
                throw "Resource not found -" + resName;
            }
            return this.getItemAsset(pi);
        };
        UIPackage.prototype.getItemAsset = function (item) {
            switch (item.type) {
                case fairygui.PackageItemType.Image:
                    if (!item.decoded) {
                        item.decoded = true;
                        var sprite = this._sprites[item.id];
                        if (sprite != null) {
                            var atlas = this.getItemAsset(sprite.atlas);
                            item.texture = new egret.Texture();
                            item.texture.bitmapData = atlas.bitmapData;
                            item.texture.$initData(atlas.$bitmapX + sprite.rect.x, atlas.$bitmapY + sprite.rect.y, sprite.rect.width, sprite.rect.height, 0, 0, sprite.rect.width, sprite.rect.height, atlas.$sourceWidth, atlas.$sourceHeight, sprite.rotated);
                        }
                    }
                    return item.texture;
                case fairygui.PackageItemType.Atlas:
                    if (!item.decoded) {
                        item.decoded = true;
                        item.texture = RES.getRes(item.file);
                        if (!item.texture)
                            console.log("Resource '" + item.file + "' not found, please check default.res.json!");
                    }
                    return item.texture;
                case fairygui.PackageItemType.Sound:
                    if (!item.decoded) {
                        item.decoded = true;
                        item.sound = RES.getRes(item.file);
                        if (!item.sound)
                            console.log("Resource '" + item.file + "' not found, please check default.res.json!");
                    }
                    return item.sound;
                case fairygui.PackageItemType.Font:
                    if (!item.decoded) {
                        item.decoded = true;
                        this.loadFont(item);
                    }
                    return item.bitmapFont;
                case fairygui.PackageItemType.MovieClip:
                    if (!item.decoded) {
                        item.decoded = true;
                        this.loadMovieClip(item);
                    }
                    return item.frames;
                case fairygui.PackageItemType.Misc:
                    if (item.file)
                        return RES.getRes(item.file);
                    else
                        return null;
                default:
                    return null;
            }
        };
        UIPackage.prototype.loadMovieClip = function (item) {
            var buffer = item.rawData;
            buffer.seek(0, 0);
            item.interval = buffer.readInt();
            item.swing = buffer.readBool();
            item.repeatDelay = buffer.readInt();
            buffer.seek(0, 1);
            var frameCount = buffer.readShort();
            item.frames = Array(frameCount);
            var spriteId;
            var frame;
            var sprite;
            var fx;
            var fy;
            for (var i = 0; i < frameCount; i++) {
                var nextPos = buffer.readShort();
                nextPos += buffer.position;
                frame = new fairygui.Frame();
                fx = buffer.readInt();
                fy = buffer.readInt();
                buffer.readInt(); //width
                buffer.readInt(); //height
                frame.addDelay = buffer.readInt();
                spriteId = buffer.readS();
                if (spriteId != null && (sprite = this._sprites[spriteId]) != null) {
                    var atlas = this.getItemAsset(sprite.atlas);
                    frame.texture = new egret.Texture();
                    frame.texture.bitmapData = atlas.bitmapData;
                    frame.texture.$initData(atlas.$bitmapX + sprite.rect.x, atlas.$bitmapY + sprite.rect.y, sprite.rect.width, sprite.rect.height, fx, fy, item.width, item.height, atlas.$sourceWidth, atlas.$sourceHeight, sprite.rotated);
                }
                item.frames[i] = frame;
                buffer.position = nextPos;
            }
        };
        UIPackage.prototype.loadFont = function (item) {
            var font = new fairygui.BitmapFont();
            item.bitmapFont = font;
            var buffer = item.rawData;
            buffer.seek(0, 0);
            font.ttf = buffer.readBool();
            buffer.readBool(); //tint
            font.resizable = buffer.readBool();
            buffer.readBool(); //has channel
            font.size = buffer.readInt();
            var xadvance = buffer.readInt();
            var lineHeight = buffer.readInt();
            var mainTexture = null;
            var mainSprite = this._sprites[item.id];
            if (mainSprite != null)
                mainTexture = (this.getItemAsset(mainSprite.atlas));
            buffer.seek(0, 1);
            var bg = null;
            var cnt = buffer.readInt();
            for (var i = 0; i < cnt; i++) {
                var nextPos = buffer.readShort();
                nextPos += buffer.position;
                bg = new fairygui.BMGlyph();
                var ch = buffer.readChar();
                font.glyphs[ch] = bg;
                var img = buffer.readS();
                var bx = buffer.readInt();
                var by = buffer.readInt();
                bg.offsetX = buffer.readInt();
                bg.offsetY = buffer.readInt();
                bg.width = buffer.readInt();
                bg.height = buffer.readInt();
                bg.advance = buffer.readInt();
                bg.channel = buffer.readByte();
                if (bg.channel == 1)
                    bg.channel = 3;
                else if (bg.channel == 2)
                    bg.channel = 2;
                else if (bg.channel == 3)
                    bg.channel = 1;
                if (!font.ttf) {
                    var charImg = this._itemsById[img];
                    if (charImg) {
                        this.getItemAsset(charImg);
                        bg.width = charImg.width;
                        bg.height = charImg.height;
                        bg.texture = charImg.texture;
                    }
                }
                else {
                    bg.texture = new egret.Texture();
                    bg.texture.bitmapData = mainTexture.bitmapData;
                    bg.texture.$initData(mainTexture.$bitmapX + bx + mainSprite.rect.x, mainTexture.$bitmapY + by + mainSprite.rect.y, bg.width, bg.height, 0, 0, bg.width, bg.height, bg.width, bg.height, mainSprite.rotated);
                }
                if (font.ttf)
                    bg.lineHeight = lineHeight;
                else {
                    if (bg.advance == 0) {
                        if (xadvance == 0)
                            bg.advance = bg.offsetX + bg.width;
                        else
                            bg.advance = xadvance;
                    }
                    bg.lineHeight = bg.offsetY < 0 ? bg.height : (bg.offsetY + bg.height);
                    if (bg.lineHeight < font.size)
                        bg.lineHeight = font.size;
                }
                buffer.position = nextPos;
            }
        };
        //internal
        UIPackage._constructing = 0;
        UIPackage._packageInstById = {};
        UIPackage._packageInstByName = {};
        return UIPackage;
    }());
    fairygui.UIPackage = UIPackage;
    __reflect(UIPackage.prototype, "fairygui.UIPackage");
})(fairygui || (fairygui = {}));
