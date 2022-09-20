package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_021_家丁升阶表.xlsx
 */
public class Struct_jdsj_021 {
    /**等级*/
    private int lv;
    /**阶数*/
    private String jie;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**升级经验*/
    private int exp;
    /**
     * 等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 阶数
     */
    public String getJie() {
        return jie;
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
    /**
     * 升级经验
     */
    public int getExp() {
        return exp;
    }
    public Struct_jdsj_021(int lv,String jie,String attr,int power,int exp) {
        this.lv = lv;
        this.jie = jie;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.exp = exp;
    }
}