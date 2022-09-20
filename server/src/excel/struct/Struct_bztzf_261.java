package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_261_八阵图符文表.xlsx
 */
public class Struct_bztzf_261 {
    /**阵符id*/
    private int id;
    /**阵符名字*/
    private String name;
    /**类型
	 * 0：专门用于分解的阵符，不可镶嵌
	 * 1（以上）：可镶嵌阵符*/
    private int type;
    /**品质*/
    private int pz;
    /**基础属性（升星）*/
    private int[][] arrt;
    /**基础战力*/
    private int power;
    /**升级属性*/
    private int[][] arrt1;
    /**升级战力*/
    private int power1;
    /**升星上限*/
    private int star;
    /**升星提升等级上限*/
    private int lv;
    /**分解数量
	 * 道具id写死
	 * 总数量=数量*星级*/
    private int fj;
    /**初始等级上限*/
    private int lv1;
    /**每星分解神符碎片*/
    private int[][] sp;
    /**
     * 阵符id
     */
    public int getId() {
        return id;
    }
    /**
     * 阵符名字
     */
    public String getName() {
        return name;
    }
    /**
     * 类型
	 * 0：专门用于分解的阵符，不可镶嵌
	 * 1（以上）：可镶嵌阵符
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
     * 基础属性（升星）
     */
    public int[][] getArrt() {
        return arrt;
    }
    /**
     * 基础战力
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
     * 升星上限
     */
    public int getStar() {
        return star;
    }
    /**
     * 升星提升等级上限
     */
    public int getLv() {
        return lv;
    }
    /**
     * 分解数量
	 * 道具id写死
	 * 总数量=数量*星级
     */
    public int getFj() {
        return fj;
    }
    /**
     * 初始等级上限
     */
    public int getLv1() {
        return lv1;
    }
    /**
     * 每星分解神符碎片
     */
    public int[][] getSp() {
        return sp;
    }
    public Struct_bztzf_261(int id,String name,int type,int pz,String arrt,int power,String arrt1,int power1,int star,int lv,int fj,int lv1,String sp) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.pz = pz;
        this.arrt = ExcelJsonUtils.toObj(arrt,int[][].class);
        this.power = power;
        this.arrt1 = ExcelJsonUtils.toObj(arrt1,int[][].class);
        this.power1 = power1;
        this.star = star;
        this.lv = lv;
        this.fj = fj;
        this.lv1 = lv1;
        this.sp = ExcelJsonUtils.toObj(sp,int[][].class);
    }
}