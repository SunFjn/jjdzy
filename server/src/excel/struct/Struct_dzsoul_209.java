package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_209_锻造铸魂表.xlsx
 */
public class Struct_dzsoul_209 {
    /**铸魂等级*/
    private int lv;
    /**升级所需经验*/
    private int exp;
    /**部位0属性*/
    private int[][] attr0;
    /**部位1属性*/
    private int[][] attr1;
    /**部位2属性*/
    private int[][] attr2;
    /**部位3属性*/
    private int[][] attr3;
    /**部位4属性*/
    private int[][] attr4;
    /**部位5属性*/
    private int[][] attr5;
    /**部位6属性*/
    private int[][] attr6;
    /**部位7属性*/
    private int[][] attr7;
    /**部位8属性*/
    private int[][] attr8;
    /**部位9属性*/
    private int[][] attr9;
    /**战力*/
    private int power;
    /**
     * 铸魂等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 升级所需经验
     */
    public int getExp() {
        return exp;
    }
    /**
     * 部位0属性
     */
    public int[][] getAttr0() {
        return attr0;
    }
    /**
     * 部位1属性
     */
    public int[][] getAttr1() {
        return attr1;
    }
    /**
     * 部位2属性
     */
    public int[][] getAttr2() {
        return attr2;
    }
    /**
     * 部位3属性
     */
    public int[][] getAttr3() {
        return attr3;
    }
    /**
     * 部位4属性
     */
    public int[][] getAttr4() {
        return attr4;
    }
    /**
     * 部位5属性
     */
    public int[][] getAttr5() {
        return attr5;
    }
    /**
     * 部位6属性
     */
    public int[][] getAttr6() {
        return attr6;
    }
    /**
     * 部位7属性
     */
    public int[][] getAttr7() {
        return attr7;
    }
    /**
     * 部位8属性
     */
    public int[][] getAttr8() {
        return attr8;
    }
    /**
     * 部位9属性
     */
    public int[][] getAttr9() {
        return attr9;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    public Struct_dzsoul_209(int lv,int exp,String attr0,String attr1,String attr2,String attr3,String attr4,String attr5,String attr6,String attr7,String attr8,String attr9,int power) {
        this.lv = lv;
        this.exp = exp;
        this.attr0 = ExcelJsonUtils.toObj(attr0,int[][].class);
        this.attr1 = ExcelJsonUtils.toObj(attr1,int[][].class);
        this.attr2 = ExcelJsonUtils.toObj(attr2,int[][].class);
        this.attr3 = ExcelJsonUtils.toObj(attr3,int[][].class);
        this.attr4 = ExcelJsonUtils.toObj(attr4,int[][].class);
        this.attr5 = ExcelJsonUtils.toObj(attr5,int[][].class);
        this.attr6 = ExcelJsonUtils.toObj(attr6,int[][].class);
        this.attr7 = ExcelJsonUtils.toObj(attr7,int[][].class);
        this.attr8 = ExcelJsonUtils.toObj(attr8,int[][].class);
        this.attr9 = ExcelJsonUtils.toObj(attr9,int[][].class);
        this.power = power;
    }
}