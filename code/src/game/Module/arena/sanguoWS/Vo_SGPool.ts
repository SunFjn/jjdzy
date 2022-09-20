class Vo_SGPool {
	public constructor() {
	}
	id;
	count;
	remaindCount;
	myCount;
	luckerID;
	luckerName;
	luckNum;
	public init() {
		let lib = Config.doublereward_230[this.id]
		this.remaindCount = lib.num - this.count;
	}
}