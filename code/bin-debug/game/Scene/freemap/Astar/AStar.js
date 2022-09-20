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
var AStar = (function () {
    function AStar(grid) {
        AStar._grid = grid;
        AStar.heuristic = AStar.euclidian2;
    }
    AStar.init2 = function (tiles) {
        var numRow = tiles.length;
        var numCol = tiles[0].length;
        AStar._grid = new Grid(numRow, numCol);
        for (var r = 0; r < numRow; r++) {
            var coltiles = tiles[r];
            for (var c = 0; c < numCol; c++) {
                var val = coltiles[c];
                var node = new AstarNode(c, r);
                node.value = val;
                node.block = (val & 1) ? false : true;
                node.walkable = !node.block;
                node.alpha = (val & 2) ? true : false;
                node.cx = c * AStar.size + 16;
                node.cy = r * AStar.size + 16;
                AStar._grid.setNode(c, r, node);
            }
        }
        AStar._grid.calculateLinks(0);
    };
    AStar.init = function (byte) {
        byte.position = 0;
        var mapCol = byte.readShort();
        var mapRow = byte.readShort();
        AStar._grid = new Grid(mapCol, mapRow);
        for (var i = 0; i < mapRow; i++) {
            for (var j = 0; j < mapCol; j++) {
                var node = new AstarNode(j, i);
                var value = byte.readByte();
                node.value = value;
                node.block = (value & 1) ? false : true;
                node.walkable = !node.block;
                node.alpha = (value & 2) ? true : false;
                node.safeArea = (value & 4) ? true : false;
                node.buffArea = (value & 8) ? true : false;
                if (node.buffArea) {
                    node.buffId = (value & 0xf0) >> 4;
                }
                AStar._grid.setNode(j, i, node);
            }
        }
        AStar.initLink(byte);
    };
    AStar.initLink = function (bytearray) {
        for (var i = 0; i < AStar._grid.numCols; i++) {
            for (var j = 0; j < AStar._grid.numRows; j++) {
                var node = AStar._grid.Nodes[i][j];
                node.links = [];
                var byte = bytearray.readUnsignedByte();
                if (byte & 1) {
                    node.links.push(node, AStar._grid.Nodes[i][j - 1], AStar._diagCost, AStar.M_WALK);
                }
                if (byte & 2) {
                    node.links.push(node, AStar._grid.Nodes[i + 1][j - 1], AStar._straightCost, AStar.M_WALK);
                }
                if (byte & 4) {
                    node.links.push(node, AStar._grid.Nodes[i + 1][j], AStar._diagCost, AStar.M_WALK);
                }
                if (byte & 8) {
                    node.links.push(node, AStar._grid.Nodes[i + 1][j + 1], AStar._straightCost, AStar.M_WALK);
                }
                if (byte & 32) {
                    node.links.push(node, AStar._grid.Nodes[i][j + 1], AStar._diagCost, AStar.M_WALK);
                }
                if (byte & 64) {
                    node.links.push(node, AStar._grid.Nodes[i - 1][j + 1], AStar._straightCost, AStar.M_WALK);
                }
                if (byte & 128) {
                    node.links.push(node, AStar._grid.Nodes[i - 1][j], AStar._diagCost, AStar.M_WALK);
                }
                if (byte & 256) {
                    node.links.push(node, AStar._grid.Nodes[i - 1][j - 1], AStar._straightCost, AStar.M_WALK);
                }
            }
        }
    };
    /**
     * 重新设置node
     * @param arrayNode 新设置node的数组
     * @return 旧node数组
     */
    AStar.resetGrid = function (arrayNode) {
        if (!AStar._grid || !arrayNode)
            return null;
        var oldArrayNode = [];
        for (var i = 0; i < arrayNode.length; i++) {
            oldArrayNode.push(AStar._grid.getNode(arrayNode[i].x, arrayNode[i].y));
            AStar._grid.setNode(arrayNode[i].x, arrayNode[i].y, arrayNode[i]);
        }
        AStar._grid.calculateLinks();
        return oldArrayNode;
    };
    AStar.setBlock = function (valueXY, bBlock) {
        if (!AStar._grid || !valueXY)
            return;
        var node;
        for (var i = 0; i < valueXY.length; i++) {
            node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
            if (!node)
                continue;
            node.walkable = !(node.block = bBlock);
        }
        AStar._grid.calculateLinks();
    };
    AStar.setAlpha = function (valueXY, alpha) {
        if (!AStar._grid || !valueXY)
            return;
        var node;
        for (var i = 0; i < valueXY.length; i++) {
            node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
            if (!node)
                continue;
            node.alpha = alpha;
        }
    };
    //设置是否放置地毯
    AStar.setFloor1 = function (valueXY, floor) {
        if (!AStar._grid || !valueXY)
            return;
        var node;
        for (var i = 0; i < valueXY.length; i++) {
            node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
            if (!node)
                continue;
            if (floor) {
                node.floor = node.floor | 1; //个位变1,十位不变
            }
            else {
                node.floor = node.floor & 2; //个位变0,十位不变
            }
        }
    };
    //设置是否是放置了家具的不可行区域
    AStar.setFloor2 = function (valueXY, block) {
        if (!AStar._grid || !valueXY)
            return;
        var node;
        for (var i = 0; i < valueXY.length; i++) {
            node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
            if (!node)
                continue;
            if (block) {
                node.floor = node.floor | 2; //十位变1,个位不变
            }
            else {
                node.floor = node.floor & 1; //十位变0,个位不变
            }
        }
    };
    //添加特效
    AStar.setBuff = function (valueXY, buffid) {
        if (!AStar._grid || !valueXY)
            return;
        var node;
        for (var i = 0; i < valueXY.length; i++) {
            node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
            if (!node)
                continue;
            node.buffArea = true;
            node.buffId = buffid;
        }
    };
    AStar.justMin = function (x, y) {
        return x.f < y.f;
    };
    AStar.getRound = function (i) {
        var startX = AStar._grid.endNode.x >= i ? (AStar._grid.endNode.x - i) : 0;
        var endX = AStar._grid.endNode.x < (AStar._grid.numCols - i) ? (AStar._grid.endNode.x + i) : (AStar._grid.numCols - 1);
        var startY = AStar._grid.endNode.y > i ? (AStar._grid.endNode.y - i) : 0;
        var endY = AStar._grid.endNode.y < (AStar._grid.numRows - i) ? (AStar._grid.endNode.y + i) : (AStar._grid.numRows - 1);
        var distance = 10000;
        var result;
        for (var row = startY; row <= endY; row++)
            for (var col = startX; col <= endX; col++) {
                AStar.counter++;
                if (AStar.counter > 10000) {
                    return null;
                }
                if (AStar._grid.getNode(col, row).walkable && AStar._grid.getNode(col, row) != AStar._grid.startNode) {
                    var temp = Math.abs(row - AStar._grid.startNode.y) + Math.abs(col - AStar._grid.startNode.x);
                    if (temp < distance) {
                        distance = temp;
                        result = AStar._grid.getNode(col, row);
                    }
                }
            }
        if (result == null)
            return AStar.getRound(i + 1);
        return result;
    };
    AStar.find = function (x1, y1, x2, y2, mt) {
        if (mt === void 0) { mt = 0; }
        AStar.moveType = mt;
        AStar.hadJump = false;
        var bool;
        AStar.ex = x2;
        AStar.ey = y2;
        var startCol = Math.floor(x1 / AStar.size);
        var startRow = Math.floor(y1 / AStar.size);
        var targetCol = Math.floor(Math.min(AStar._grid.numCols - 1, x2 / AStar.size));
        var targetRow = Math.floor(Math.min(AStar._grid.numRows - 1, y2 / AStar.size));
        bool = AStar._grid.setStartNode(startCol, startRow);
        if (!bool) {
            return null;
        }
        bool = AStar._grid.setEndNode(targetCol, targetRow);
        if (!bool) {
            return null;
        }
        var targetnode = AStar._grid.getNode(targetCol, targetRow);
        if (targetnode.walkable == false) {
            AStar.counter = 0;
            var node = AStar.getRound(1);
            if (!node)
                return null;
            AStar.ex = (node.x + .5) * AStar.size;
            AStar.ey = (node.y + .5) * AStar.size;
            AStar._grid.setEndNode(node.x, node.y);
        }
        if (AStar.findPath())
            return AStar._path;
        return null;
    };
    AStar.findPath = function () {
        AStar._endNode = AStar._grid.endNode;
        AStar.nowversion++;
        AStar._startNode = AStar._grid.startNode;
        AStar._open = new BinaryHeap(AStar.justMin);
        AStar._startNode.g = 0;
        return AStar.search();
    };
    AStar.search = function () {
        var node = AStar._startNode;
        node.version = AStar.nowversion;
        while (node != AStar._endNode) {
            var len = node.links.length;
            for (var i = 0; i < len; i++) {
                var nodeLink = node.links[i];
                if (nodeLink.type > 0 && (nodeLink.type & AStar.moveType) == 0) {
                    console.log(1);
                    continue;
                }
                var test = nodeLink.node;
                var cost = nodeLink.cost;
                var g = node.g + cost;
                var h = AStar.heuristic(test);
                var f = g + h;
                if (test.version == AStar.nowversion) {
                    if (test.f > f) {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.astarLink = nodeLink;
                        test.parent = node;
                        if (test.astarLink.type == AStar.M_JUMP) {
                            AStar.hadJump = true;
                        }
                    }
                }
                else {
                    test.f = f;
                    test.g = g;
                    test.h = h;
                    test.parent = node;
                    test.astarLink = nodeLink;
                    AStar._open.ins(test);
                    test.version = AStar.nowversion;
                    if (test.astarLink.type == AStar.M_JUMP) {
                        AStar.hadJump = true;
                    }
                }
            }
            if (AStar._open.a.length == 1) {
                return false;
            }
            node = AStar._open.pop();
        }
        if (AStar.hadJump) {
            AStar.buildPath(); //带跳跃的时候的平滑路径逻辑
        }
        else {
            AStar.buildPath2(); //不带跳跃的时候的平滑路径逻辑
        }
        return true;
    };
    AStar.buildPath = function () {
        var arr = [];
        var node = AStar._endNode;
        if (Math.floor(AStar.ex / 32) == node.x && Math.floor(AStar.ey / 32) == node.y) {
            arr.push(AStar._endNode);
        }
        else {
            arr.push(node);
        }
        while (node != AStar._startNode) {
            node = node.parent;
            arr.unshift(node);
        }
        var startnode = AStar._grid.startNode;
        var finalArr;
        var temparr = [];
        finalArr = AStar.smooth(arr, temparr);
        AStar._path = [];
        for (var i = 0; i < finalArr.length; i++) {
            var n = finalArr[i];
            if (n.astarLink) {
                AStar._path.push([n.cx, n.cy, n.astarLink.type]);
            }
            else {
                AStar._path.push([n.cx, n.cy, AStar.M_WALK]);
            }
        }
        AStar._path.push([AStar.ex, AStar.ey, AStar.M_WALK]);
        console.log(AStar._path.length);
    };
    AStar.smooth = function (nodes, result) {
        var len = nodes.length;
        var startindex = 0;
        var testindex = 0;
        var startnode = AStar._grid.startNode;
        while (testindex < len) {
            var testnode = nodes[testindex];
            var canLink = AStar.pathCheck(startnode.cx, startnode.cy, testnode.cx, testnode.cy);
            var nextnode = nodes[testindex + 1];
            if (testnode.astarLink && testnode.astarLink.type == AStar.M_JUMP) {
                result.push(testnode);
                startnode = nextnode;
                testindex++;
            }
            else if (nextnode && nextnode.astarLink.type == AStar.M_JUMP) {
                result.push(testnode);
                startnode = testnode;
                testindex++;
            }
            else if (canLink == false) {
                var prenode = nodes[testindex - 1];
                result.push(prenode);
                startnode = prenode;
                testindex++;
            }
            else {
                testindex++;
            }
        }
        return result;
    };
    AStar.buildPath2 = function () {
        var arr = [];
        var node = AStar._endNode;
        if (Math.floor(AStar.ex / 32) == node.x && Math.floor(AStar.ey / 32) == node.y) {
            arr.push(AStar._endNode);
        }
        else {
            arr.push(node);
        }
        while (node != AStar._startNode) {
            node = node.parent;
            arr.unshift(node);
        }
        var startnode = AStar._grid.startNode;
        AStar._path = [];
        var lastindex = arr.length - 1;
        var startindex = 0;
        for (var testindex = lastindex; testindex > startindex; testindex--) {
            var testnode = arr[testindex];
            if (testnode.astarLink.type == AStar.M_JUMP) {
                var prenode = testnode.astarLink.snode;
                AStar._path.push([prenode.cx, prenode.cy, prenode.astarLink.type]);
                AStar._path.push([testnode.cx, testnode.cy, testnode.astarLink.type]);
                if (testindex == lastindex) {
                    break;
                }
                startnode = testnode;
                startindex = testindex;
                testindex = lastindex + 1;
            }
            else if (AStar.pathCheck(startnode.cx, startnode.cy, testnode.cx, testnode.cy)) {
                AStar._path.push([testnode.cx, testnode.cy, testnode.astarLink.type]);
                if (testindex == lastindex) {
                    break;
                }
                startnode = testnode;
                startindex = testindex;
                testindex = lastindex + 1;
            }
        }
        if (!AStar._path.length) {
            AStar._path.push([AStar.ex, AStar.ey, AStar.M_WALK]);
        }
    };
    AStar.pathCheck = function (x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var len = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
        var temp = 0;
        while (true) {
            if ((temp += AStar.size) > len) {
                return true;
            }
            var rate = temp / len;
            var ny = Math.floor(rate * dy + y1);
            var nx = Math.floor(rate * dx + x1);
            if ((dx > 0 && nx > x2) || (dx < 0 && nx < x2)) {
                nx = x2;
            }
            if ((dy > 0 && ny > y2) || (dy < 0 && ny < y2)) {
                ny = y2;
            }
            if (AStar._grid.getNode(nx / AStar.size, ny / AStar.size).block) {
                return false;
            }
        }
    };
    Object.defineProperty(AStar, "path", {
        get: function () {
            return AStar._path;
        },
        enumerable: true,
        configurable: true
    });
    AStar.manhattan = function (node) {
        return Math.abs(node.x - AStar._endNode.x) + Math.abs(node.y - AStar._endNode.y);
    };
    AStar.manhattan2 = function (node) {
        var dx = Math.abs(node.x - AStar._endNode.x);
        var dy = Math.abs(node.y - AStar._endNode.y);
        return dx + dy + Math.abs(dx - dy) / 1000;
    };
    AStar.euclidian = function (node) {
        var dx = node.x - AStar._endNode.x;
        var dy = node.y - AStar._endNode.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    AStar.chineseCheckersEuclidian2 = function (node) {
        var y = Math.floor(node.y / AStar.TwoOneTwoZero);
        var x = Math.floor(node.x + node.y / 2);
        var dx = Math.floor(x - AStar._endNode.x - AStar._endNode.y / 2);
        var dy = Math.floor(y - AStar._endNode.y / AStar.TwoOneTwoZero);
        return AStar.sqrt(dx * dx + dy * dy);
    };
    AStar.sqrt = function (x) {
        return Math.sqrt(x);
    };
    AStar.euclidian2 = function (node) {
        var dx = node.x - AStar._endNode.x;
        var dy = node.y - AStar._endNode.y;
        return dx * dx + dy * dy;
    };
    AStar.diagonal = function (node) {
        var dx = Math.abs(node.x - AStar._endNode.x);
        var dy = Math.abs(node.y - AStar._endNode.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return AStar._diagCost * diag + AStar._straightCost * (straight - 2 * diag);
    };
    AStar.getAlpha = function (global_x, global_y) {
        if (AStar._grid) {
            var node = AStar._grid.getNode(global_x / 32, global_y / 32);
            if (node) {
                return node.alpha;
            }
        }
        return false;
    };
    /**墙壁 区域 */
    AStar.isWall = function (global_x, global_y) {
        var targetCol = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
        var targetRow = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
        var node = AStar._grid.getNode(targetCol, targetRow);
        return node && node.alpha;
    };
    /**可走区域 */
    AStar.isWalk = function (global_x, global_y) {
        var targetCol = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
        var targetRow = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
        var node = AStar._grid.getNode(targetCol, targetRow);
        return node && node.walkable;
    };
    /**可放置地毯区域 */
    AStar.isPutFloor = function (global_x, global_y) {
        var targetCol = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
        var targetRow = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
        var node = AStar._grid.getNode(targetCol, targetRow);
        return node && (node.walkable || (node.floor & 2) >> 1 == 1) && (node.floor & 1) == 0;
    };
    AStar.getWalkable = function (x, y, inspa) {
        if (inspa === void 0) { inspa = true; }
        var targetCol = Math.floor(Math.min(AStar._grid.numCols - 1, x / AStar.size));
        var targetRow = Math.floor(Math.min(AStar._grid.numRows - 1, y / AStar.size));
        var node = AStar._grid.getNode(targetCol, targetRow);
        if (!node)
            return false;
        else if (inspa) {
            return node.value & 32 ? true : false;
        }
        else {
            return (node.value & 1) && !(node.value & 32) ? true : false;
        }
    };
    AStar.getSafe = function (global_x, global_y) {
        var targetCol = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
        var targetRow = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
        var node = AStar._grid.getNode(targetCol, targetRow);
        if (node)
            return node.safeArea;
        else
            return false;
    };
    AStar.getBuff = function (global_x, global_y) {
        var targetCol = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
        var targetRow = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
        var node = AStar._grid.getNode(targetCol, targetRow);
        if (node && node.buffArea)
            return node.buffId;
        else
            return -1;
    };
    /**
     * 返回为Door
     * @param x
     * @param y
     * @return
     */
    AStar.checkJumpArea = function (x, y) {
        var targetCol = Math.floor(Math.min(AStar._grid.numCols - 1, x / AStar.size));
        var targetRow = Math.floor(Math.min(AStar._grid.numRows - 1, y / AStar.size));
        var node = AStar._grid.getNode(targetCol, targetRow);
        if (node && node.jumpArea)
            return AStar._grid.getNode(targetCol, targetRow).jumpLink;
        else
            return null;
    };
    AStar.checkBlock = function (x, y) {
        var index_x = Math.floor(x / AStar.size);
        var index_y = Math.floor(y / AStar.size);
        if (index_x >= AStar._grid.numCols || index_x < 0 || index_y >= AStar._grid.numRows || index_y < 0)
            return true;
        return !AStar._grid.getNode(index_x, index_y).walkable;
    };
    AStar.getNearWalkableArea = function (x, y, depth) {
        if (depth === void 0) { depth = 5; }
        if (AStar.checkBlock(x, y) == false)
            return new egret.Point(x, y);
        var index_x = Math.floor(x / AStar.size);
        var index_y = Math.floor(y / AStar.size);
        if (index_x < 0 || index_y < 0)
            return null;
        for (var i = 1; i <= depth; i++) {
            var start_x = index_x - i > 0 ? index_x - i : 0;
            var end_x = index_x + i >= AStar._grid.numCols - 1 ? AStar._grid.numCols - 1 : index_x + i;
            var start_y = index_y - i > 0 ? index_y - i : 0;
            var end_y = index_y + i >= AStar._grid.numRows - 1 ? AStar._grid.numRows - 1 : index_y + i;
            for (var m = start_x; m <= end_x; m++)
                for (var n = start_y; n <= end_y; n++) {
                    if (AStar._grid.getNode(m, n).walkable)
                        return new egret.Point(m * AStar.size, n * AStar.size);
                }
        }
        return null;
    };
    AStar.M_WALK = 0;
    AStar.M_JUMP = 1;
    AStar.size = 32;
    AStar.heuristic = AStar.diagonal;
    AStar._straightCost = 1.0;
    AStar._diagCost = Math.SQRT2;
    AStar.nowversion = 1;
    AStar.TwoOneTwoZero = 2 * Math.cos(Math.PI / 3);
    return AStar;
}());
__reflect(AStar.prototype, "AStar");
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid(numRows, numCols) {
        var _this = _super.call(this) || this;
        _this._straightCost = 1.0;
        _this._diagCost = Math.SQRT2;
        _this._numCols = numCols;
        _this._numRows = numRows;
        _this._nodes = [];
        for (var i = 0; i < _this._numRows; i++) {
            _this._nodes[i] = [];
        }
        return _this;
    }
    /**
     * @param    type    0八方向 1四方向 2跳棋
     */
    Grid.prototype.calculateLinks = function (type) {
        if (type === void 0) { type = 0; }
        this.type = type;
        for (var col = 0; col < this._numCols; col++) {
            for (var row = 0; row < this._numRows; row++) {
                this.initNodeLink(this._nodes[row][col], type);
            }
        }
    };
    Grid.prototype.getType = function () {
        return this.type;
    };
    /**
     * @param    node
     * @param    type
     */
    Grid.prototype.initNodeLink = function (node, type) {
        var startX = Math.max(0, node.x - 1);
        var endX = Math.min(this.numCols - 1, node.x + 1);
        var startY = Math.max(0, node.y - 1);
        var endY = Math.min(this.numRows - 1, node.y + 1);
        node.links = [];
        for (var row = startY; row <= endY; row++) {
            for (var col = startX; col <= endX; col++) {
                var test = this.getNode(col, row);
                if (test == node || !test.walkable) {
                    continue;
                }
                var cost = this._straightCost;
                if (node.x == test.x || node.y == test.y) {
                    cost = this._straightCost;
                }
                else {
                    cost = this._diagCost;
                }
                node.links.push(new Link(node, test, cost, AStar.M_WALK));
            }
        }
    };
    Grid.prototype.link = function (x, y, dx, dy, type) {
        var node = this.getNode(x / AStar.size, y / AStar.size);
        var dnode = this.getNode(dx / AStar.size, dy / AStar.size);
        if (node && dnode) {
            var link = new Link(node, dnode, 1, type);
            node.links.push(link);
        }
    };
    Grid.prototype.getNode = function (c, r) {
        c = Math.floor(c);
        r = Math.floor(r);
        if (!this._nodes[r] || !this._nodes[r][c])
            return null;
        return this._nodes[r][c];
    };
    Object.defineProperty(Grid.prototype, "Nodes", {
        get: function () {
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    Grid.prototype.setEndNode = function (c, r) {
        c = Math.floor(c);
        r = Math.floor(r);
        if (this._nodes == null || this._nodes[r] == null || this._nodes[r][c] == null)
            return false;
        this._endNode = this._nodes[r][c];
        return true;
    };
    Grid.prototype.setStartNode = function (c, r) {
        c = Math.floor(c);
        r = Math.floor(r);
        if (this._nodes == null || this._nodes[r] == null || this._nodes[r][c] == null)
            return false;
        this._startNode = this._nodes[r][c];
        return true;
    };
    Grid.prototype.setWalkable = function (c, r, value) {
        c = Math.floor(c);
        r = Math.floor(r);
        this._nodes[r][c].walkable = value;
    };
    Grid.prototype.setNode = function (c, r, node) {
        c = Math.floor(c);
        r = Math.floor(r);
        this._nodes[r][c] = node;
    };
    Object.defineProperty(Grid.prototype, "endNode", {
        get: function () {
            return this._endNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "numCols", {
        get: function () {
            return this._numCols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "numRows", {
        get: function () {
            return this._numRows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "startNode", {
        get: function () {
            return this._startNode;
        },
        enumerable: true,
        configurable: true
    });
    return Grid;
}(egret.Sprite));
__reflect(Grid.prototype, "Grid");
var BinaryHeap = (function () {
    function BinaryHeap(justMinFun) {
        if (justMinFun === void 0) { justMinFun = null; }
        this.a = [];
        this.justMinFun = function (x, y) {
            return x < y;
        };
        this.a.push(-1);
        if (justMinFun != null)
            this.justMinFun = justMinFun;
    }
    BinaryHeap.prototype.ins = function (value) {
        var p = this.a.length;
        this.a[p] = value;
        var pp = Math.floor(p >> 1);
        while (p > 1 && this.justMinFun(this.a[p], this.a[pp])) {
            var temp = this.a[p];
            this.a[p] = this.a[pp];
            this.a[pp] = temp;
            p = pp;
            pp = p >> 1;
        }
    };
    BinaryHeap.prototype.pop = function () {
        var a = this.a;
        var min = a[1];
        a[1] = this.a[a.length - 1];
        a.pop();
        var p = 1;
        var l = a.length;
        var sp1 = Math.floor(p << 1);
        var sp2 = sp1 + 1;
        while (sp1 < l) {
            if (sp2 < l) {
                var minp = this.justMinFun(a[sp2], a[sp1]) ? sp2 : sp1;
            }
            else {
                minp = sp1;
            }
            if (this.justMinFun(a[minp], a[p])) {
                var temp = a[p];
                a[p] = a[minp];
                a[minp] = temp;
                p = minp;
                sp1 = p << 1;
                sp2 = sp1 + 1;
            }
            else {
                break;
            }
        }
        return min;
    };
    return BinaryHeap;
}());
__reflect(BinaryHeap.prototype, "BinaryHeap");
