// TypeScript file
interface ISceneObject {
	onAdd();
	onRemove();
	update(ctx);
	onEvent(evt, any);
	scene: MapScene;

	/**类别 0:不参与游戏逻辑的东东 1:角色*/
	objType;

	x;
	y;
	h;
	/**id */
	id;
	/**所在势力队伍 */
	force;
}