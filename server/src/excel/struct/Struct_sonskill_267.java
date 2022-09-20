package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-267-少主技能表.xlsx
 */
public class Struct_sonskill_267 {
    /**技能id*/
    private int id;
    /**属性*/
    private int[][] attr;
    /**类型*/
    private int type;
    /**技能星级*/
    private int star;
    /**
     * 技能id
     */
    public int getId() {
        return id;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 类型
     */
    public int getType() {
        return type;
    }
    /**
     * 技能星级
     */
    public int getStar() {
        return star;
    }
    public Struct_sonskill_267(int id,String attr,int type,int star) {
        this.id = id;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.type = type;
        this.star = star;
    }
}