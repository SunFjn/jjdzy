package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_705_转生.xlsx
 */
public class Struct_zhuansheng_705 {
    /**序号
	 * jingyu:
	 * 类型*1000+等级
	 * 类型为X转  等级为X重*/
    private int id;
    /**转段名称*/
    private String lv;
    /**条件
	 * [x,y]
	 * x为类型 y为值
	 * 1为人物等级 
	 * 2为宝石总等级
	 * 3为强化总等级
	 * 4为升星总等级
	 * 5为技能等级
	 * 6为将衔等级
	 * 7为铜雀台层数*/
    private int[][] condition;
    /**属性*/
    private int[][] attr;
    /**奖励*/
    private int[][] award;
    /**外显奖励*/
    private int[][] show;
    /**战力*/
    private int fight;
    /**下一阶*/
    private int nextid;
    /**外显战力*/
    private int power;
    /**熔炼人物经验上限*/
    private int max;
    /**
     * 序号
	 * jingyu:
	 * 类型*1000+等级
	 * 类型为X转  等级为X重
     */
    public int getId() {
        return id;
    }
    /**
     * 转段名称
     */
    public String getLv() {
        return lv;
    }
    /**
     * 条件
	 * [x,y]
	 * x为类型 y为值
	 * 1为人物等级 
	 * 2为宝石总等级
	 * 3为强化总等级
	 * 4为升星总等级
	 * 5为技能等级
	 * 6为将衔等级
	 * 7为铜雀台层数
     */
    public int[][] getCondition() {
        return condition;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 奖励
     */
    public int[][] getAward() {
        return award;
    }
    /**
     * 外显奖励
     */
    public int[][] getShow() {
        return show;
    }
    /**
     * 战力
     */
    public int getFight() {
        return fight;
    }
    /**
     * 下一阶
     */
    public int getNextid() {
        return nextid;
    }
    /**
     * 外显战力
     */
    public int getPower() {
        return power;
    }
    /**
     * 熔炼人物经验上限
     */
    public int getMax() {
        return max;
    }
    public Struct_zhuansheng_705(int id,String lv,String condition,String attr,String award,String show,int fight,int nextid,int power,int max) {
        this.id = id;
        this.lv = lv;
        this.condition = ExcelJsonUtils.toObj(condition,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
        this.show = ExcelJsonUtils.toObj(show,int[][].class);
        this.fight = fight;
        this.nextid = nextid;
        this.power = power;
        this.max = max;
    }
}