class Vo_Chat {
	/**(1跨服,2本服,3国家4系统)*/
	public type = 0;
	/**玩家id */
	public id;
	/**等级 */
	public level;
	/**战斗力 */
	public power;
	/**晋升 */
	public jinsheng;
	/**转生 */
	public zs;
	/**国家 */
	public country;
	/**将衔 */
	public jx;
	/**名字 */
	public name: string;
	/**vip */
	public vip;
	/**头像ID */
	public headId = 1001;
	/**头像框 */
	public frameId = 1003;
	/**内容 */
	public content: string;
	/**系统聊天参数 */
	public paramCall: string;
	/**称号 */
	public titleID: number;
	/**职业时装 */
	public fashion: number;
	/**0不是展示1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将*/
	public showtype: number;
	/**神兵*/
	public godWeapon: number;
	/**轮回等级*/
	public lunhui: number;
	/**武将之力技能进阶等级*/
	public wujiangzhiliSkillLv: number;
	/**骑马*/
	public horseId: number;
	
	public constructor() {
	}
}