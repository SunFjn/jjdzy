package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_209_锻造宝石套装表.xlsx
 */
public class Struct_dzgemsuit_209 {
    /**宝石大师id*/
    private int id;
    /**宝石总等级*/
    private int lv;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**
     * 宝石大师id
     */
    public int getId() {
        return id;
    }
    /**
     * 宝石总等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    public Struct_dzgemsuit_209(int id,int lv,String attr,int power) {
        this.id = id;
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}