package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_238_武圣榜表.xlsx
 */
public class Struct_ws_238 {
    /**活动id
	 * jingyu:
	 * id同开服天数*/
    private int id;
    /**上榜条件
	 * jingyu:
	 * [[A,B]]
	 * A=前三条件 B=4-10条件
	 * 
	 * 1：宝物总战力（宝物升级，升星，属性丹）
	 * 2：装备总战力（装备，强化，升星，宝石，铸魂，神装）
	 * 3：武将总战力（武将升阶，升星，将印，属性丹，资质丹）
	 * 4：战甲总战力（战甲升阶，升星，套装，属性丹，资质丹）
	 * 5：图鉴总战力（图鉴升级，升星，升星额外属性，升星总等级）
	 * 6：铜雀台（铜雀台通关层数）
	 * 7：总战力
	 * */
    private int[][] tj;
    /**第1名奖励
	 * jingyu:
	 * [[类型,ID,数量,是否大奖]]
	 * 0=不是大奖
	 * 1=大奖*/
    private int[][] reward1;
    /**第2名奖励*/
    private int[][] reward2;
    /**第3名奖励*/
    private int[][] reward3;
    /**第4-10名奖励*/
    private int[][] reward4;
    /**第11-100名奖励*/
    private int[][] reward6;
    /**大奖奖励*/
    private int[][] reward5;
    /**大奖所需要求
	 * jingyu:
	 * 1 武将总战力
	 * 2 宝物总战力
	 * 3 天书总战力
	 * 4 神剑总战力
	 * 5 异宝总战力
	 * 6 铜雀台层数
	 * 7 总战力*/
    private int[][] yq;
    /**
     * 活动id
	 * jingyu:
	 * id同开服天数
     */
    public int getId() {
        return id;
    }
    /**
     * 上榜条件
	 * jingyu:
	 * [[A,B]]
	 * A=前三条件 B=4-10条件
	 * 
	 * 1：宝物总战力（宝物升级，升星，属性丹）
	 * 2：装备总战力（装备，强化，升星，宝石，铸魂，神装）
	 * 3：武将总战力（武将升阶，升星，将印，属性丹，资质丹）
	 * 4：战甲总战力（战甲升阶，升星，套装，属性丹，资质丹）
	 * 5：图鉴总战力（图鉴升级，升星，升星额外属性，升星总等级）
	 * 6：铜雀台（铜雀台通关层数）
	 * 7：总战力
	 * 
     */
    public int[][] getTj() {
        return tj;
    }
    /**
     * 第1名奖励
	 * jingyu:
	 * [[类型,ID,数量,是否大奖]]
	 * 0=不是大奖
	 * 1=大奖
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 第2名奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 第3名奖励
     */
    public int[][] getReward3() {
        return reward3;
    }
    /**
     * 第4-10名奖励
     */
    public int[][] getReward4() {
        return reward4;
    }
    /**
     * 第11-100名奖励
     */
    public int[][] getReward6() {
        return reward6;
    }
    /**
     * 大奖奖励
     */
    public int[][] getReward5() {
        return reward5;
    }
    /**
     * 大奖所需要求
	 * jingyu:
	 * 1 武将总战力
	 * 2 宝物总战力
	 * 3 天书总战力
	 * 4 神剑总战力
	 * 5 异宝总战力
	 * 6 铜雀台层数
	 * 7 总战力
     */
    public int[][] getYq() {
        return yq;
    }
    public Struct_ws_238(int id,String tj,String reward1,String reward2,String reward3,String reward4,String reward6,String reward5,String yq) {
        this.id = id;
        this.tj = ExcelJsonUtils.toObj(tj,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
        this.reward4 = ExcelJsonUtils.toObj(reward4,int[][].class);
        this.reward6 = ExcelJsonUtils.toObj(reward6,int[][].class);
        this.reward5 = ExcelJsonUtils.toObj(reward5,int[][].class);
        this.yq = ExcelJsonUtils.toObj(yq,int[][].class);
    }
}