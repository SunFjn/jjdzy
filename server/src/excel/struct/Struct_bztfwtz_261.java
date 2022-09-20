package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_261_八阵图符文套装表.xlsx
 */
public class Struct_bztfwtz_261 {
    /**符文大师id*/
    private int id;
    /**红色符文总星级*/
    private int lv;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**下一级*/
    private int next;
    /**
     * 符文大师id
     */
    public int getId() {
        return id;
    }
    /**
     * 红色符文总星级
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
    /**
     * 下一级
     */
    public int getNext() {
        return next;
    }
    public Struct_bztfwtz_261(int id,int lv,String attr,int power,int next) {
        this.id = id;
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.next = next;
    }
}