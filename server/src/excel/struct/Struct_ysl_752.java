package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_752_异兽录.xlsx
 */
public class Struct_ysl_752 {
    /**异兽id
	 * 
	 * Axxx
	 * A：武将职业  支持两位数
	 * xxx（000）：武将初始神兵*/
    private int id;
    /**异兽激活
	 * 1,道具ID,数量*/
    private int[][] jihuo;
    /**等级上限*/
    private int dengji;
    /**
     * 异兽id
	 * 
	 * Axxx
	 * A：武将职业  支持两位数
	 * xxx（000）：武将初始神兵
     */
    public int getId() {
        return id;
    }
    /**
     * 异兽激活
	 * 1,道具ID,数量
     */
    public int[][] getJihuo() {
        return jihuo;
    }
    /**
     * 等级上限
     */
    public int getDengji() {
        return dengji;
    }
    public Struct_ysl_752(int id,String jihuo,int dengji) {
        this.id = id;
        this.jihuo = ExcelJsonUtils.toObj(jihuo,int[][].class);
        this.dengji = dengji;
    }
}