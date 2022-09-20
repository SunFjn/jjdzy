package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y-217异宝升星表.xlsx
 */
public class Struct_ybstar_217 {
    /**异宝id*/
    private int id;
    /**下一级*/
    private int next;
    /**属性
	 * Administrator:
	 * 碎片编号：
	 * 402A01
	 * A为种族：
	 * 1.人族
	 * 2.妖族
	 * 3.仙族*/
    private int[][] attr;
    /**
     * 异宝id
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
	 * Administrator:
	 * 碎片编号：
	 * 402A01
	 * A为种族：
	 * 1.人族
	 * 2.妖族
	 * 3.仙族
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_ybstar_217(int id,int next,String attr) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}