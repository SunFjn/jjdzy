package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_289_神将天赋表.xlsx
 */
public class Struct_godhero_289 {
    /**天赋等级*/
    private int lv;
    /**下一级*/
    private int next;
    /**升级消耗*/
    private int[][] conmuse;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**所需修炼等级*/
    private int max;
    /**
     * 天赋等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 下一级
     */
    public int getNext() {
        return next;
    }
    /**
     * 升级消耗
     */
    public int[][] getConmuse() {
        return conmuse;
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
     * 所需修炼等级
     */
    public int getMax() {
        return max;
    }
    public Struct_godhero_289(int lv,int next,String conmuse,String attr,int power,int max) {
        this.lv = lv;
        this.next = next;
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.max = max;
    }
}