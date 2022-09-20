package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-267-少主时装表.xlsx
 */
public class Struct_sonshow_267 {
    /**时装id*/
    private int id;
    /**所属少主*/
    private int son;
    /**升星属性*/
    private int[][] attr;
    /**升星道具*/
    private int[][] conmuse;
    /**升星上限*/
    private int max;
    /**
     * 时装id
     */
    public int getId() {
        return id;
    }
    /**
     * 所属少主
     */
    public int getSon() {
        return son;
    }
    /**
     * 升星属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 升星道具
     */
    public int[][] getConmuse() {
        return conmuse;
    }
    /**
     * 升星上限
     */
    public int getMax() {
        return max;
    }
    public Struct_sonshow_267(int id,int son,String attr,String conmuse,int max) {
        this.id = id;
        this.son = son;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.max = max;
    }
}