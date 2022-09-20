class SceneObject implements ISceneObject {

	public x = 0;
	public y = 0;
	public h = 0;

	/** 1:通常角色(主角 怪物等) 10:岩石 20:掉落货币*/
	public objType = 0;

	public scene:MapScene;
	public id = 0;

	public static COUNTER = 0;

	/**所在势力队伍 */
	public force = 0;
	/**左右权重 */
	public forceRightWeight = 1;

	public scale:number = 1;

	public constructor() {
		this.id = SceneObject.COUNTER++;
	}

	public update(ctx) {
	}

	public onAdd() {
	}

	public onRemove() {
	}

	public onEvent(evt, arg=null) {
	}
}