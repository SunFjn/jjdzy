var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var UIObjectFactory = (function () {
        function UIObjectFactory() {
        }
        UIObjectFactory.setPackageItemExtension = function (url, type) {
            if (url == null)
                throw "Invaild url: " + url;
            var pi = fairygui.UIPackage.getItemByURL(url);
            if (pi != null)
                pi.extensionType = type;
            UIObjectFactory.packageItemExtensions[url] = type;
        };
        UIObjectFactory.setLoaderExtension = function (type) {
            UIObjectFactory.loaderType = type;
        };
        UIObjectFactory.resolvePackageItemExtension = function (pi) {
            pi.extensionType = UIObjectFactory.packageItemExtensions["ui://" + pi.owner.id + pi.id];
            if (!pi.extensionType)
                pi.extensionType = UIObjectFactory.packageItemExtensions["ui://" + pi.owner.name + "/" + pi.name];
        };
        UIObjectFactory.newObject = function (pi) {
            if (pi.extensionType != null)
                return new pi.extensionType();
            else
                return this.newObject2(pi.objectType);
        };
        UIObjectFactory.newObject2 = function (type) {
            switch (type) {
                case fairygui.ObjectType.Image:
                    return new fairygui.GImage();
                case fairygui.ObjectType.MovieClip:
                    return new fairygui.GMovieClip();
                case fairygui.ObjectType.Component:
                    return new fairygui.GComponent();
                case fairygui.ObjectType.Text:
                    return new fairygui.GTextField();
                case fairygui.ObjectType.RichText:
                    return new fairygui.GRichTextField();
                case fairygui.ObjectType.InputText:
                    return new fairygui.GTextInput();
                case fairygui.ObjectType.Group:
                    return new fairygui.GGroup();
                case fairygui.ObjectType.List:
                    return new fairygui.GList();
                case fairygui.ObjectType.Graph:
                    return new fairygui.GGraph();
                case fairygui.ObjectType.Loader:
                    if (UIObjectFactory.loaderType != null)
                        return new UIObjectFactory.loaderType();
                    else
                        return new fairygui.GLoader();
                case fairygui.ObjectType.Button:
                    return new fairygui.GButton();
                case fairygui.ObjectType.Label:
                    return new fairygui.GLabel();
                case fairygui.ObjectType.ProgressBar:
                    return new fairygui.GProgressBar();
                case fairygui.ObjectType.Slider:
                    return new fairygui.GSlider();
                case fairygui.ObjectType.ScrollBar:
                    return new fairygui.GScrollBar();
                case fairygui.ObjectType.ComboBox:
                    return new fairygui.GComboBox();
                default:
                    return null;
            }
        };
        UIObjectFactory.packageItemExtensions = {};
        return UIObjectFactory;
    }());
    fairygui.UIObjectFactory = UIObjectFactory;
    __reflect(UIObjectFactory.prototype, "fairygui.UIObjectFactory");
})(fairygui || (fairygui = {}));
