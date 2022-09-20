package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_261_八阵图符文升星表.xlsx
 */
public class Struct_runestar_261 {
    /**星级id*/
    private int id;
    /**下一级*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**
     * 星级id
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
    public Struct_runestar_261(int id,int next,String attr) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}