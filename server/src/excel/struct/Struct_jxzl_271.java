package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_271_觉醒之力.xlsx
 */
public class Struct_jxzl_271 {
    /**觉醒之力等级
	 * 品质*100+等级*/
    private int id;
    /**需要3个觉醒技能的等级*/
    private int lv;
    /**属性*/
    private int[][] attr;
    /**
     * 觉醒之力等级
	 * 品质*100+等级
     */
    public int getId() {
        return id;
    }
    /**
     * 需要3个觉醒技能的等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_jxzl_271(int id,int lv,String attr) {
        this.id = id;
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}