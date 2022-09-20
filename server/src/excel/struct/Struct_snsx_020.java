package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_020_侍女升星表.xlsx
 */
public class Struct_snsx_020 {
    /**星级id
	 * 品质*1000+LV*/
    private int id;
    /**下一级*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**繁荣度*/
    private int frd;
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
    /**
     * 繁荣度
     */
    public int getFrd() {
        return frd;
    }
    public Struct_snsx_020(int id,int next,String attr,int frd) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.frd = frd;
    }
}