package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_750_专属神兵-升星表.xlsx
 */
public class Struct_sbsx_750 {
    /**星级id
	 * 品质*1000+LV*/
    private int id;
    /**下一级*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**
     * 星级id
	 * 品质*1000+LV
     */
    public int getId() {
        return id;
    }
    /**
     * 下一级
     */
    public int getNext() {
        return next;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_sbsx_750(int id,int next,String attr) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}