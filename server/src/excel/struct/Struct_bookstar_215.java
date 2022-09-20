package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_215_天书升星表.xlsx
 */
public class Struct_bookstar_215 {
    /**星级id
	 * jingyu:
	 * 
	 * 品质*1000+Lv*/
    private int id;
    /**下一级*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**
     * 星级id
	 * jingyu:
	 * 
	 * 品质*1000+Lv
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
    public Struct_bookstar_215(int id,int next,String attr) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}