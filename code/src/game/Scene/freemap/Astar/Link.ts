class Link {
	public constructor(snode: AstarNode, node: AstarNode, cost: number, type: number) {
		this.snode = snode;
		this.node = node;
		this.cost = cost;
		this.type = type;
	}

	public snode: AstarNode;
	public node: AstarNode;
	public cost: number;
	public type: number;
}