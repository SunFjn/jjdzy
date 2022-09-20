package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-266-兽魂觉醒星级表.xlsx
 */
public class Struct_shjxstar_266 {
    /**星级id*/
    private int id;
    /**星级*/
    private int star;
    /**属性*/
    private int[][] attr;
    /**
     * 星级id
     */
    public int getId() {
        return id;
    }
    /**
     * 星级
     */
    public int getStar() {
        return star;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_shjxstar_266(int id,int star,String attr) {
        this.id = id;
        this.star = star;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}