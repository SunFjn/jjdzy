class AstarNode {
	public x: number;
	public y: number;
	public f: number;
	public g: number;
	public h: number;
	public walkable: boolean = true;
	public parent: AstarNode;
	public version: number = 1;
	public links: any[];

	public astarLink: Link;

	public value: number;

	public block: boolean;
	public alpha: boolean;
	public floor: number;//二进制00    前位1放置了家具的不可行区域。  后位1已经放置地毯/0未放置地毯 ,
	public safeArea: boolean;
	public buffArea: boolean;
	public buffId: number;
	public jumpArea: boolean;
	public jumpLink: any;

	public cx: number;
	public cy: number;
	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}