class AStar {
	public constructor(grid: Grid) {
		AStar._grid = grid;
		AStar.heuristic = AStar.euclidian2;
	}

	public static M_WALK: number = 0;
	public static M_JUMP: number = 1;

	public static size: number = 32;
	private static _open: BinaryHeap;
	public static _grid: Grid;
	private static _endNode: AstarNode;
	private static _startNode: AstarNode;
	private static _path: any[];
	public static heuristic: Function = AStar.diagonal;
	private static _straightCost: number = 1.0;
	private static _diagCost: number = Math.SQRT2;
	private static nowversion: number = 1;

	public static jump_position: any[];

	private static ex: number;
	private static ey: number;

	public static hadJump: boolean;

	public static moveType: number;

	public static init2(tiles: any[]): void {
		var numRow: number = tiles.length;
		var numCol: number = tiles[0].length;
		AStar._grid = new Grid(numRow, numCol);
		for (var r: number = 0; r < numRow; r++) {
			var coltiles: any[] = tiles[r];
			for (var c: number = 0; c < numCol; c++) {
				var val: number = coltiles[c];
				var node: AstarNode = new AstarNode(c, r);
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
	}

	public static init(byte: egret.ByteArray): void {
		byte.position = 0;
		var mapCol: number = byte.readShort();
		var mapRow: number = byte.readShort();
		AStar._grid = new Grid(mapCol, mapRow);
		for (var i: number = 0; i < mapRow; i++) {
			for (var j: number = 0; j < mapCol; j++) {
				var node: AstarNode = new AstarNode(j, i);
				var value: number = byte.readByte();
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
	}

	private static initLink(bytearray: egret.ByteArray): void {
		for (var i: number = 0; i < AStar._grid.numCols; i++) {
			for (var j: number = 0; j < AStar._grid.numRows; j++) {
				var node: AstarNode = AStar._grid.Nodes[i][j];
				node.links = [];
				var byte: number = bytearray.readUnsignedByte();
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
	}

	/**
	 * 重新设置node
	 * @param arrayNode 新设置node的数组
	 * @return 旧node数组
	 */
	public static resetGrid(arrayNode: any[]): any[] {
		if (!AStar._grid || !arrayNode) return null;
		var oldArrayNode: any[] = [];
		for (var i: number = 0; i < arrayNode.length; i++) {
			oldArrayNode.push(AStar._grid.getNode(arrayNode[i].x, arrayNode[i].y));
			AStar._grid.setNode(arrayNode[i].x, arrayNode[i].y, arrayNode[i]);
		}
		AStar._grid.calculateLinks();
		return oldArrayNode;
	}

	public static setBlock(valueXY: any[], bBlock: boolean): void {
		if (!AStar._grid || !valueXY) return;
		var node: AstarNode
		for (var i: number = 0; i < valueXY.length; i++) {
			node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
			if (!node) continue;
			node.walkable = !(node.block = bBlock);
		}
		AStar._grid.calculateLinks();
	}

	public static setAlpha(valueXY: any[], alpha: boolean): void {
		if (!AStar._grid || !valueXY) return;
		var node: AstarNode
		for (var i: number = 0; i < valueXY.length; i++) {
			node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
			if (!node) continue;
			node.alpha = alpha;
		}
	}
	//设置是否放置地毯
	public static setFloor1(valueXY: any[], floor: boolean): void {
		if (!AStar._grid || !valueXY) return;
		var node: AstarNode
		for (var i: number = 0; i < valueXY.length; i++) {
			node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
			if (!node) continue;
			if(floor){
				node.floor = node.floor | 1;//个位变1,十位不变
			}else{
				node.floor = node.floor & 2;//个位变0,十位不变
			}
		}
	}
	//设置是否是放置了家具的不可行区域
	public static setFloor2(valueXY: any[], block: boolean): void {
		if (!AStar._grid || !valueXY) return;
		var node: AstarNode
		for (var i: number = 0; i < valueXY.length; i++) {
			node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
			if (!node) continue;
			if(block){
				node.floor = node.floor | 2;//十位变1,个位不变
			}else{
				node.floor = node.floor & 1;//十位变0,个位不变
			}
		}
	}

	//添加特效
	public static setBuff(valueXY: any[], buffid: number): void {
		if (!AStar._grid || !valueXY) return;
		var node: AstarNode;
		for (var i: number = 0; i < valueXY.length; i++) {
			node = AStar._grid.getNode(valueXY[i][0], valueXY[i][1]);
			if (!node) continue;
			node.buffArea = true;
			node.buffId = buffid;
		}
	}

	private static justMin(x: any, y: any): boolean {
		return x.f < y.f;
	}

	private static counter: number;
	private static getRound(i: number): AstarNode {
		var startX: number = AStar._grid.endNode.x >= i ? (AStar._grid.endNode.x - i) : 0;
		var endX: number = AStar._grid.endNode.x < (AStar._grid.numCols - i) ? (AStar._grid.endNode.x + i) : (AStar._grid.numCols - 1);
		var startY: number = AStar._grid.endNode.y > i ? (AStar._grid.endNode.y - i) : 0;
		var endY: number = AStar._grid.endNode.y < (AStar._grid.numRows - i) ? (AStar._grid.endNode.y + i) : (AStar._grid.numRows - 1);
		var distance: number = 10000;
		var result: AstarNode;
		for (var row: number = startY; row <= endY; row++)
			for (var col: number = startX; col <= endX; col++) {
				AStar.counter++;
				if (AStar.counter > 10000) {
					return null;
				}

				if (AStar._grid.getNode(col, row).walkable && AStar._grid.getNode(col, row) != AStar._grid.startNode) {
					var temp: number = Math.abs(row - AStar._grid.startNode.y) + Math.abs(col - AStar._grid.startNode.x);
					if (temp < distance) {
						distance = temp;
						result = AStar._grid.getNode(col, row);
					}
				}
			}

		if (result == null)
			return AStar.getRound(i + 1);
		return result;
	}

	public static find(x1: number, y1: number, x2: number, y2: number, mt: number = 0): any[] {
		AStar.moveType = mt;
		AStar.hadJump = false;
		var bool: boolean;
		AStar.ex = x2;
		AStar.ey = y2;
		var startCol: number = Math.floor(x1 / AStar.size);
		var startRow: number = Math.floor(y1 / AStar.size);
		var targetCol: number = Math.floor(Math.min(AStar._grid.numCols - 1, x2 / AStar.size));
		var targetRow: number = Math.floor(Math.min(AStar._grid.numRows - 1, y2 / AStar.size));
		bool = AStar._grid.setStartNode(startCol, startRow);
		if (!bool) {
			return null;
		}
		bool = AStar._grid.setEndNode(targetCol, targetRow);
		if (!bool) {
			return null;
		}
		var targetnode: AstarNode = AStar._grid.getNode(targetCol, targetRow);
		if (targetnode.walkable == false) {
			AStar.counter = 0;
			var node: AstarNode = AStar.getRound(1);
			if (!node) return null;
			AStar.ex = (node.x + .5) * AStar.size;
			AStar.ey = (node.y + .5) * AStar.size;
			AStar._grid.setEndNode(node.x, node.y);
		}
		if (AStar.findPath()) return AStar._path;
		return null;
	}

	private static findPath(): boolean {
		AStar._endNode = AStar._grid.endNode;
		AStar.nowversion++;
		AStar._startNode = AStar._grid.startNode;
		AStar._open = new BinaryHeap(AStar.justMin);
		AStar._startNode.g = 0;
		return AStar.search();
	}

	public static search(): boolean {
		var node: AstarNode = AStar._startNode;
		node.version = AStar.nowversion;
		while (node != AStar._endNode) {
			var len: number = node.links.length;
			for (var i: number = 0; i < len; i++) {
				var nodeLink: Link = node.links[i];
				if (nodeLink.type > 0 && (nodeLink.type & AStar.moveType) == 0) {
					console.log(1);
					continue;
				}
				var test: AstarNode = nodeLink.node;
				var cost: number = nodeLink.cost;
				var g: number = node.g + cost;
				var h: number = AStar.heuristic(test);
				var f: number = g + h;
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
				} else {
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
			node = AStar._open.pop() as AstarNode;
		}
		if (AStar.hadJump) {
			AStar.buildPath();//带跳跃的时候的平滑路径逻辑
		} else {
			AStar.buildPath2();//不带跳跃的时候的平滑路径逻辑
		}
		return true;
	}

	private static buildPath(): void {
		var arr: any[] = [];
		var node: AstarNode = AStar._endNode;
		if (Math.floor(AStar.ex / 32) == node.x && Math.floor(AStar.ey / 32) == node.y) {
			arr.push(AStar._endNode);
		} else {
			arr.push(node);
		}
		while (node != AStar._startNode) {
			node = node.parent;
			arr.unshift(node);
		}

		var startnode: AstarNode = AStar._grid.startNode;

		var finalArr: any[];
		var temparr: any[] = [];
		finalArr = AStar.smooth(arr, temparr);

		AStar._path = [];
		for (var i = 0; i < finalArr.length; i++) {
			var n: AstarNode = finalArr[i];
			if (n.astarLink) {
				AStar._path.push([n.cx, n.cy, n.astarLink.type]);
			} else {
				AStar._path.push([n.cx, n.cy, AStar.M_WALK]);
			}
		}

		AStar._path.push([AStar.ex, AStar.ey, AStar.M_WALK]);
		console.log(AStar._path.length);
	}

	public static smooth(nodes: any[], result: any[]): any {
		var len: number = nodes.length;
		var startindex: number = 0;
		var testindex: number = 0;
		var startnode: AstarNode = AStar._grid.startNode;
		while (testindex < len) {
			var testnode: AstarNode = nodes[testindex];
			var canLink: boolean = AStar.pathCheck(startnode.cx, startnode.cy, testnode.cx, testnode.cy);
			var nextnode: AstarNode = nodes[testindex + 1];

			if (testnode.astarLink && testnode.astarLink.type == AStar.M_JUMP) {
				result.push(testnode);
				startnode = nextnode;
				testindex++;
			} else if (nextnode && nextnode.astarLink.type == AStar.M_JUMP) {
				result.push(testnode);
				startnode = testnode;
				testindex++;
			} else if (canLink == false) {
				var prenode: AstarNode = nodes[testindex - 1];
				result.push(prenode);
				startnode = prenode;
				testindex++;
			} else {
				testindex++;
			}
		}
		return result;
	}

	private static buildPath2(): void {
		var arr: any[] = [];
		var node: AstarNode = AStar._endNode;
		if (Math.floor(AStar.ex / 32) == node.x && Math.floor(AStar.ey / 32) == node.y) {
			arr.push(AStar._endNode);
		} else {
			arr.push(node);
		}
		while (node != AStar._startNode) {
			node = node.parent;
			arr.unshift(node);
		}

		var startnode: AstarNode = AStar._grid.startNode;
		AStar._path = [];
		var lastindex: number = arr.length - 1;
		var startindex: number = 0;

		for (var testindex: number = lastindex; testindex > startindex; testindex--) {
			var testnode: AstarNode = arr[testindex];
			if (testnode.astarLink.type == AStar.M_JUMP) {
				var prenode: AstarNode = testnode.astarLink.snode;
				AStar._path.push([prenode.cx, prenode.cy, prenode.astarLink.type]);
				AStar._path.push([testnode.cx, testnode.cy, testnode.astarLink.type]);
				if (testindex == lastindex) {
					break;
				}
				startnode = testnode;
				startindex = testindex;
				testindex = lastindex + 1;
			} else if (AStar.pathCheck(startnode.cx, startnode.cy, testnode.cx, testnode.cy)) {
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
	}

	public static pathCheck(x1: number, y1: number, x2: number, y2: number): boolean {
		var dx: number = x2 - x1;
		var dy: number = y2 - y1;
		var len: number = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
		var temp: number = 0;
		while (true) {
			if ((temp += AStar.size) > len) {
				return true;
			}
			var rate: number = temp / len;
			var ny: number = Math.floor(rate * dy + y1);
			var nx: number = Math.floor(rate * dx + x1);
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
	}

	public static get path(): any {
		return AStar._path;
	}

	public static manhattan(node: AstarNode): number {
		return Math.abs(node.x - AStar._endNode.x) + Math.abs(node.y - AStar._endNode.y);
	}

	public static manhattan2(node: AstarNode): number {
		var dx: number = Math.abs(node.x - AStar._endNode.x);
		var dy: number = Math.abs(node.y - AStar._endNode.y);
		return dx + dy + Math.abs(dx - dy) / 1000;
	}

	public static euclidian(node: AstarNode): number {
		var dx: number = node.x - AStar._endNode.x;
		var dy: number = node.y - AStar._endNode.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	private static TwoOneTwoZero: number = 2 * Math.cos(Math.PI / 3);

	public static chineseCheckersEuclidian2(node: AstarNode): number {
		var y: number = Math.floor(node.y / AStar.TwoOneTwoZero);
		var x: number = Math.floor(node.x + node.y / 2);
		var dx: number = Math.floor(x - AStar._endNode.x - AStar._endNode.y / 2);
		var dy: number = Math.floor(y - AStar._endNode.y / AStar.TwoOneTwoZero);
		return AStar.sqrt(dx * dx + dy * dy);
	}

	private static sqrt(x: number): number {
		return Math.sqrt(x);
	}

	public static euclidian2(node: AstarNode): number {
		var dx: number = node.x - AStar._endNode.x;
		var dy: number = node.y - AStar._endNode.y;
		return dx * dx + dy * dy;
	}

	public static diagonal(node: AstarNode): number {
		var dx: number = Math.abs(node.x - AStar._endNode.x);
		var dy: number = Math.abs(node.y - AStar._endNode.y);
		var diag: number = Math.min(dx, dy);
		var straight: number = dx + dy;
		return AStar._diagCost * diag + AStar._straightCost * (straight - 2 * diag);
	}

	public static getAlpha(global_x: number, global_y: number): boolean {
		if (AStar._grid) {
			var node: AstarNode = AStar._grid.getNode(global_x / 32, global_y / 32);
			if (node) {
				return node.alpha;
			}
		}
		return false;
	}
	/**墙壁 区域 */
	public static isWall(global_x: number, global_y: number): boolean {
		var targetCol: number = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
		var targetRow: number = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
		var node: AstarNode = AStar._grid.getNode(targetCol, targetRow);
		return node && node.alpha;
	}
	/**可走区域 */
	public static isWalk(global_x: number, global_y: number): boolean {
		var targetCol: number = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
		var targetRow: number = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
		var node: AstarNode = AStar._grid.getNode(targetCol, targetRow);
		return node && node.walkable;
	}
	
	/**可放置地毯区域 */
	public static isPutFloor(global_x: number, global_y: number): boolean {
		var targetCol: number = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
		var targetRow: number = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
		var node: AstarNode = AStar._grid.getNode(targetCol, targetRow);
		return node && (node.walkable || (node.floor & 2) >> 1 == 1) && (node.floor & 1) == 0;
	}

	public static getWalkable(x: number, y: number, inspa: boolean = true): boolean {
		var targetCol: number = Math.floor(Math.min(AStar._grid.numCols - 1, x / AStar.size));
		var targetRow: number = Math.floor(Math.min(AStar._grid.numRows - 1, y / AStar.size));
		var node: AstarNode = AStar._grid.getNode(targetCol, targetRow);
		if (!node) return false;
		else if (inspa) {
			return node.value & 32 ? true : false;
		}
		else {
			return (node.value & 1) && !(node.value & 32) ? true : false;
		}
	}

	public static getSafe(global_x: number, global_y: number): boolean {
		var targetCol: number = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
		var targetRow: number = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
		var node: AstarNode = AStar._grid.getNode(targetCol, targetRow);
		if (node) return node.safeArea;
		else return false;
	}

	public static getBuff(global_x: number, global_y: number): number {
		var targetCol: number = Math.floor(Math.min(AStar._grid.numCols - 1, global_x / AStar.size));
		var targetRow: number = Math.floor(Math.min(AStar._grid.numRows - 1, global_y / AStar.size));
		var node: AstarNode = AStar._grid.getNode(targetCol, targetRow);
		if (node && node.buffArea) return node.buffId;
		else return -1;
	}

	/**
	 * 返回为Door 
	 * @param x
	 * @param y
	 * @return 
	 */
	public static checkJumpArea(x: number, y: number): any {
		var targetCol: number = Math.floor(Math.min(AStar._grid.numCols - 1, x / AStar.size));
		var targetRow: number = Math.floor(Math.min(AStar._grid.numRows - 1, y / AStar.size));
		var node: AstarNode = AStar._grid.getNode(targetCol, targetRow);
		if (node && node.jumpArea)
			return AStar._grid.getNode(targetCol, targetRow).jumpLink;
		else return null;
	}

	public static checkBlock(x: number, y: number): boolean {
		var index_x: number = Math.floor(x / AStar.size);
		var index_y: number = Math.floor(y / AStar.size);
		if (index_x >= AStar._grid.numCols || index_x < 0 || index_y >= AStar._grid.numRows || index_y < 0)
			return true;
		return !AStar._grid.getNode(index_x, index_y).walkable;
	}

	public static getNearWalkableArea(x: number, y: number, depth: number = 5): egret.Point {
		if (AStar.checkBlock(x, y) == false)
			return new egret.Point(x, y);
		var index_x: number = Math.floor(x / AStar.size);
		var index_y: number = Math.floor(y / AStar.size);
		if (index_x < 0 || index_y < 0) return null;
		for (var i: number = 1; i <= depth; i++) {
			var start_x: number = index_x - i > 0 ? index_x - i : 0;
			var end_x: number = index_x + i >= AStar._grid.numCols - 1 ? AStar._grid.numCols - 1 : index_x + i;
			var start_y: number = index_y - i > 0 ? index_y - i : 0;
			var end_y: number = index_y + i >= AStar._grid.numRows - 1 ? AStar._grid.numRows - 1 : index_y + i;
			for (var m: number = start_x; m <= end_x; m++)
				for (var n: number = start_y; n <= end_y; n++) {
					if (AStar._grid.getNode(m, n).walkable)
						return new egret.Point(m * AStar.size, n * AStar.size);
				}
		}
		return null;
	}
}

class Grid extends egret.Sprite{
	private _startNode: AstarNode;
	private _endNode: AstarNode;
	private _nodes: any[];
	private _numCols: number;
	private _numRows: number;

	private type: number;

	private _straightCost: number = 1.0;
	private _diagCost: number = Math.SQRT2;

	public constructor(numRows: number, numCols: number) {
		super();
		this._numCols = numCols;
		this._numRows = numRows;
		this._nodes = [];
		for (var i = 0; i < this._numRows; i++) {
			this._nodes[i] = [];
		}
	}

	/**
	 * @param    type    0八方向 1四方向 2跳棋
	 */
	public calculateLinks(type: number = 0): void {
		this.type = type;
		for (var col: number = 0; col < this._numCols; col++) {
			for (var row: number = 0; row < this._numRows; row++) {
				this.initNodeLink(this._nodes[row][col], type);
			}
		}
	}

	public getType(): number {
		return this.type;
	}

	/**
	 * @param    node
	 * @param    type 
	 */
	private initNodeLink(node: AstarNode, type: number): void {
		var startX: number = Math.max(0, node.x - 1);
		var endX: number = Math.min(this.numCols - 1, node.x + 1);
		var startY: number = Math.max(0, node.y - 1);
		var endY: number = Math.min(this.numRows - 1, node.y + 1);
		node.links = [];
		for (var row: number = startY; row <= endY; row++) {
			for (var col: number = startX; col <= endX; col++) {
				var test: AstarNode = this.getNode(col, row);
				if (test == node || !test.walkable) {
					continue;
				}
				var cost: number = this._straightCost;
				if (node.x == test.x || node.y == test.y) {
					cost = this._straightCost;
				} else {
					cost = this._diagCost;
				}
				node.links.push(new Link(node, test, cost, AStar.M_WALK));
			}
		}
	}

	public link(x: number, y: number, dx: number, dy: number, type: number): void {
		var node: AstarNode = this.getNode(x / AStar.size, y / AStar.size);
		var dnode: AstarNode = this.getNode(dx / AStar.size, dy / AStar.size);
		if (node && dnode) {
			var link: Link = new Link(node, dnode, 1, type);
			node.links.push(link);
		}
	}

	public getNode(c: number, r: number): AstarNode {
		c = Math.floor(c);
		r = Math.floor(r);
		if (!this._nodes[r] || !this._nodes[r][c]) return null;
		return this._nodes[r][c];
	}

	public get Nodes(): any {
		return this._nodes;
	}

	public setEndNode(c: number, r: number): boolean {
		c = Math.floor(c);
		r = Math.floor(r);
		if (this._nodes == null || this._nodes[r] == null || this._nodes[r][c] == null) return false;
		this._endNode = this._nodes[r][c];
		return true;
	}

	public setStartNode(c: number, r: number): boolean {
		c = Math.floor(c);
		r = Math.floor(r);
		if (this._nodes == null || this._nodes[r] == null || this._nodes[r][c] == null) return false;
		this._startNode = this._nodes[r][c];
		return true;
	}

	public setWalkable(c: number, r: number, value: boolean): void {
		c = Math.floor(c);
		r = Math.floor(r);
		this._nodes[r][c].walkable = value;
	}

	public setNode(c: number, r: number, node: AstarNode): void {
		c = Math.floor(c);
		r = Math.floor(r);
		this._nodes[r][c] = node;
	}

	public get endNode(): AstarNode {
		return this._endNode;
	}

	public get numCols(): number {
		return this._numCols;
	}

	public get numRows(): number {
		return this._numRows;
	}

	public get startNode(): AstarNode {
		return this._startNode;
	}

}

class BinaryHeap {
	public a: any[] = [];
	public justMinFun: Function = function (x: any, y: any): boolean {
		return x < y;
	};

	public constructor(justMinFun: Function = null) {
		this.a.push(-1);
		if (justMinFun != null)
			this.justMinFun = justMinFun;
	}

	public ins(value: any): void {
		var p: number = this.a.length;
		this.a[p] = value;
		var pp: number = Math.floor(p >> 1);
		while (p > 1 && this.justMinFun(this.a[p], this.a[pp])) {
			var temp: any = this.a[p];
			this.a[p] = this.a[pp];
			this.a[pp] = temp;
			p = pp;
			pp = p >> 1;
		}
	}

	public pop(): any {
		var a = this.a;
		var min: any = a[1];
		a[1] = this.a[a.length - 1];
		a.pop();
		var p: number = 1;
		var l: number = a.length;
		var sp1: number = Math.floor(p << 1);
		var sp2: number = sp1 + 1;
		while (sp1 < l) {
			if (sp2 < l) {
				var minp: number = this.justMinFun(a[sp2], a[sp1]) ? sp2 : sp1;
			} else {
				minp = sp1;
			}
			if (this.justMinFun(a[minp], a[p])) {
				var temp: Object = a[p];
				a[p] = a[minp];
				a[minp] = temp;
				p = minp;
				sp1 = p << 1;
				sp2 = sp1 + 1;
			} else {
				break;
			}
		}
		return min;
	}
}