package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_209_锻造升星表.xlsx
 */
public class Struct_dzstar_209 {
    /**升星等级(所有部位都是读这个)*/
    private int lv;
    /**消耗*/
    private int[][] consume;
    /**属性加成（十万分比，向下取整）*/
    private int addition;
    /**成功率（十万分比）*/
    private int cg;
    /**完美消耗*/
    private int[][] consume1;
    /**
     * 升星等级(所有部位都是读这个)
     */
    public int getLv() {
        return lv;
    }
    /**
     * 消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 属性加成（十万分比，向下取整）
     */
    public int getAddition() {
        return addition;
    }
    /**
     * 成功率（十万分比）
     */
    public int getCg() {
        return cg;
    }
    /**
     * 完美消耗
     */
    public int[][] getConsume1() {
        return consume1;
    }
    public Struct_dzstar_209(int lv,String consume,int addition,int cg,String consume1) {
        this.lv = lv;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.addition = addition;
        this.cg = cg;
        this.consume1 = ExcelJsonUtils.toObj(consume1,int[][].class);
    }
}