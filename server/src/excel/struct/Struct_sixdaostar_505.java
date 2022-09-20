package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_505_六道印记升星表.xlsx
 */
public class Struct_sixdaostar_505 {
    /**星级id
	 * 印记id*100+星级*/
    private int id;
    /**下一级*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**
     * 星级id
	 * 印记id*100+星级
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
    public Struct_sixdaostar_505(int id,int next,String attr) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}