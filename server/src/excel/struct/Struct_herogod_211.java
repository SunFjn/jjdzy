package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_211_武将神将之力表.xlsx
 */
public class Struct_herogod_211 {
    /**id
	 * id=武将id*100+等级*/
    private int id;
    /**需要武将星级*/
    private int star;
    /**激活属性*/
    private int[][] attr;
    /**基础战力*/
    private int power;
    /**
     * id
	 * id=武将id*100+等级
     */
    public int getId() {
        return id;
    }
    /**
     * 需要武将星级
     */
    public int getStar() {
        return star;
    }
    /**
     * 激活属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 基础战力
     */
    public int getPower() {
        return power;
    }
    public Struct_herogod_211(int id,int star,String attr,int power) {
        this.id = id;
        this.star = star;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}