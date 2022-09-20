package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_289_神将天赋表.xlsx
 */
public class Struct_godherotf_289 {
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
    public Struct_godherotf_289(int lv,int next,String conmuse,String attr,int power) {
        this.lv = lv;
        this.next = next;
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}