package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-267-少主技能升级表.xlsx
 */
public class Struct_sonskillup_267 {
    /**技能等级*/
    private int id;
    /**下一级*/
    private int next;
    /**绿品少主技能升级消耗*/
    private int[][] lv;
    /**蓝品少主技能升级消耗*/
    private int[][] lan;
    /**紫品少主技能升级消耗*/
    private int[][] zi;
    /**橙品少主技能升级消耗*/
    private int[][] cheng;
    /**红品少主技能升级消耗*/
    private int[][] hong;
    /**需要对应少主星级*/
    private int star;
    /**
     * 技能等级
     */
    public int getId() {
        return id;
    }
    /**
     * 下一级
     */
    public int getNext() {
        return next;
    }
    /**
     * 绿品少主技能升级消耗
     */
    public int[][] getLv() {
        return lv;
    }
    /**
     * 蓝品少主技能升级消耗
     */
    public int[][] getLan() {
        return lan;
    }
    /**
     * 紫品少主技能升级消耗
     */
    public int[][] getZi() {
        return zi;
    }
    /**
     * 橙品少主技能升级消耗
     */
    public int[][] getCheng() {
        return cheng;
    }
    /**
     * 红品少主技能升级消耗
     */
    public int[][] getHong() {
        return hong;
    }
    /**
     * 需要对应少主星级
     */
    public int getStar() {
        return star;
    }
    public Struct_sonskillup_267(int id,int next,String lv,String lan,String zi,String cheng,String hong,int star) {
        this.id = id;
        this.next = next;
        this.lv = ExcelJsonUtils.toObj(lv,int[][].class);
        this.lan = ExcelJsonUtils.toObj(lan,int[][].class);
        this.zi = ExcelJsonUtils.toObj(zi,int[][].class);
        this.cheng = ExcelJsonUtils.toObj(cheng,int[][].class);
        this.hong = ExcelJsonUtils.toObj(hong,int[][].class);
        this.star = star;
    }
}