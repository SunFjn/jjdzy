package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_216_神剑升星表.xlsx
 */
public class Struct_swordstar_216 {
    /**神剑id*/
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
     * 神剑id
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
    public Struct_swordstar_216(int id,int next,String attr) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}