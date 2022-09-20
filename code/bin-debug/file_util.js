/**
 * 封装微信小游戏的文件系统
 */
var wxFs;
var WX_ROOT;
function getFileSystemManager() {
    if (GGlobal.sdk) {
        return wx.getFileSystemManager();
    }
    else {
        return null;
    }
}
function USER_DATA_PATH() {
    if (GGlobal.sdk) {
        return wx.env.USER_DATA_PATH + "/";
    }
    else {
        return "";
    }
}
function walkFile(dirname, callback) {
    var files = wxFs.readdirSync(dirname);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var f = files_1[_i];
        var file = dirname + "/" + f;
        var stat = wxFs.statSync(file);
        if (stat.isDirectory()) {
            walkFile(file, callback);
        }
        else {
            callback(file);
        }
    }
}
function walkDir(dirname, callback) {
    var files = wxFs.readdirSync(dirname);
    for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
        var f = files_2[_i];
        var file = dirname + "/" + f;
        var stat = wxFs.statSync(file);
        if (stat.isDirectory()) {
            walkDir(file, callback);
            callback(file);
        }
    }
}
var fs_cache = {};
var fileUtils;
(function (fileUtils) {
    fileUtils.fs = {
        /**
     * 遍历删除文件夹
     */
        remove: function (dirname) {
            if (!wxFs)
                wxFs = getFileSystemManager();
            if (!WX_ROOT)
                WX_ROOT = USER_DATA_PATH();
            if (!fileUtils.fs.existsSync(dirname))
                return;
            var globalDirname = WX_ROOT + dirname;
            walkFile(globalDirname, function (file) {
                wxFs.unlinkSync(file);
                var p = file.replace(WX_ROOT, "");
                p = fileUtils.path.normailze(p);
                if (fs_cache[p]) {
                    fs_cache[p] = 0;
                }
            });
            walkDir(globalDirname, function (dir) {
                wxFs.rmdirSync(dir);
                var p = dir.replace(WX_ROOT, "");
                p = fileUtils.path.normailze(p);
                if (fs_cache[p]) {
                    fs_cache[p] = 0;
                }
            });
        },
        /**
         * 检查文件是否存在
         */
        existsSync: function (p) {
            var cache = fs_cache[p];
            if (cache == 0) {
                return false;
            }
            else if (cache == 1) {
                return true;
            }
            else {
                try {
                    wxFs.accessSync(WX_ROOT + p);
                    p = fileUtils.path.normailze(p);
                    if (p) {
                        fs_cache[p] = 1;
                    }
                    return true;
                }
                catch (e) {
                    p = fileUtils.path.normailze(p);
                    fs_cache[p] = 0;
                    return false;
                }
            }
        },
        writeSync: function (p, content) {
            p = fileUtils.path.normailze(p);
            fs_cache[p] = 1;
            wxFs.writeFileSync(WX_ROOT + p, content);
        },
        readSync: function (p, format) {
            format = format || 'utf-8';
            return wxFs.readFileSync(WX_ROOT + p, format);
        },
        /**
         * 创建文件夹
         */
        mkdirsSync: function (p) {
            // console.log(`mkdir: ${p}`)
            var time1 = Date.now();
            if (!fileUtils.fs.existsSync(p)) {
                var dirs = p.split('/');
                var current = "";
                for (var i = 0; i < dirs.length; i++) {
                    var dir = dirs[i];
                    current += dir + "/";
                    if (!fileUtils.fs.existsSync(current)) {
                        var p_1 = fileUtils.path.normailze(current);
                        fs_cache[p_1] = 1;
                        wxFs.mkdirSync(WX_ROOT + current);
                    }
                }
            }
            else {
                return;
            }
            var time2 = Date.now() - time1;
            // console.log(`mkdir: ${p} ${time2} ms`)
        }
    };
    fileUtils.path = {
        dirname: function (p) {
            var arr = p.split("/");
            arr.pop();
            return arr.join('/');
        },
        isRemotePath: function (p) {
            return p.indexOf("http://") == 0 || p.indexOf("https://") == 0;
        },
        normailze: function (p) {
            var arr = p.split("/");
            var original = p.split("/");
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var a = arr_1[_i];
                if (a == '' || a == null) {
                    var index = original.indexOf(a);
                    original.splice(index, 1);
                }
            }
            if (original.length > 0) {
                return original.join('/');
            }
        },
        // 根据key值表获取本地缓存路径
        // 通过本函数可将网络地址转化为本地缓存地址
        // 可通过编辑key值表来创建多个缓存路径
        getLocalFilePath: function (p) {
            for (var key in fileUtils.path.localFileMap) {
                if (p.indexOf(key) >= 0) {
                    p = p.replace(key, fileUtils.path.localFileMap[key]);
                    return fileUtils.path.normailze(p);
                }
            }
            //未设置key值，将按照地址名整理出资源路径，进行存储
            if (p.indexOf(":") >= 0 || p.indexOf('#') >= 0 || p.indexOf('?') >= 0) {
                p = p.replace(/[^a-z0-9.]/gi, "/");
            }
            return fileUtils.path.normailze(p);
        },
        // 获取微信的用户缓存地址
        getWxUserPath: function (p) {
            return WX_ROOT + p;
        },
        // 本地资源文件key值表
        // 可按照网络资源地址分配本地地址，可修改
        // 以下为示例，开发者可根据需要进行修改
        localFileMap: {
            // 'http://XXXXX/resource/assets/': 'temp_image/',
            'https://neice.sgzj.shqi2.net/resource/config/': 'temp_text/',
        }
    };
})(fileUtils || (fileUtils = {}));
