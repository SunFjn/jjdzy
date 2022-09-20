package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_705_转生.xlsx
 */
public class Struct_chengzhang_705 {
    /**序号
	 * jjjjyyy:
	 * 类型*1000+等级
	 * 类型为X转  等级为X重*/
    private int id;
    /**条件*/
    private int[][] condition;
    /**属性*/
    private int[][] attr;
    /**奖励*/
    private int[][] award;
    /**外显奖励*/
    private int[][] show;
    /**战力*/
    private int fight;
    /**
     * 序号
	 * jjjjyyy:
	 * 类型*1000+等级
	 * 类型为X转  等级为X重
     */
    public int getId() {
        return id;
    }
    /**
     * 条件
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
    public Struct_chengzhang_705(int id,String condition,String attr,String award,String show,int fight) {
        this.id = id;
        this.condition = ExcelJsonUtils.toObj(condition,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
        this.show = ExcelJsonUtils.toObj(show,int[][].class);
        this.fight = fight;
    }
}