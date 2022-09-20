package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_505_六道印记表.xlsx
 */
public class Struct_sixdaoyj_505 {
    /**印记id*/
    private int id;
    /**印记部位
	 * 1：天道
	 * 2：人道
	 * 3：畜生道
	 * 4：饿鬼道
	 * 5：地狱道
	 * 6：修罗道*/
    private int type;
    /**品质*/
    private int pz;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**升级属性*/
    private int[][] arrt1;
    /**升级战力*/
    private int power1;
    /**分解获得
	 * 分解获得货币id：29*/
    private int fj;
    /**初始等级上限*/
    private int lv;
    /**升星上限*/
    private int star;
    /**每星提升等级上限*/
    private int lvup;
    /**
     * 印记id
     */
    public int getId() {
        return id;
    }
    /**
     * 印记部位
	 * 1：天道
	 * 2：人道
	 * 3：畜生道
	 * 4：饿鬼道
	 * 5：地狱道
	 * 6：修罗道
     */
    public int getType() {
        return type;
    }
    /**
     * 品质
     */
    public int getPz() {
        return pz;
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
     * 升级属性
     */
    public int[][] getArrt1() {
        return arrt1;
    }
    /**
     * 升级战力
     */
    public int getPower1() {
        return power1;
    }
    /**
     * 分解获得
	 * 分解获得货币id：29
     */
    public int getFj() {
        return fj;
    }
    /**
     * 初始等级上限
     */
    public int getLv() {
        return lv;
    }
    /**
     * 升星上限
     */
    public int getStar() {
        return star;
    }
    /**
     * 每星提升等级上限
     */
    public int getLvup() {
        return lvup;
    }
    public Struct_sixdaoyj_505(int id,int type,int pz,String attr,int power,String arrt1,int power1,int fj,int lv,int star,int lvup) {
        this.id = id;
        this.type = type;
        this.pz = pz;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.arrt1 = ExcelJsonUtils.toObj(arrt1,int[][].class);
        this.power1 = power1;
        this.fj = fj;
        this.lv = lv;
        this.star = star;
        this.lvup = lvup;
    }
}