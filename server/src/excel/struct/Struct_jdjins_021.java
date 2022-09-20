package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_021_家丁晋升表.xlsx
 */
public class Struct_jdjins_021 {
    /**家丁职位*/
    private int zhiwei;
    /**下级职位*/
    private int next;
    /**模型ID*/
    private int moxing;
    /**晋升条件
	 * 对应家丁升阶表的等级字段,≥X则可晋升
	 * 0则无条件，也不显示条件*/
    private int tiaojian;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**晋升消耗*/
    private int[][] xiaohao;
    /**技能*/
    private int[][] skill;
    /**
     * 家丁职位
     */
    public int getZhiwei() {
        return zhiwei;
    }
    /**
     * 下级职位
     */
    public int getNext() {
        return next;
    }
    /**
     * 模型ID
     */
    public int getMoxing() {
        return moxing;
    }
    /**
     * 晋升条件
	 * 对应家丁升阶表的等级字段,≥X则可晋升
	 * 0则无条件，也不显示条件
     */
    public int getTiaojian() {
        return tiaojian;
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
     * 晋升消耗
     */
    public int[][] getXiaohao() {
        return xiaohao;
    }
    /**
     * 技能
     */
    public int[][] getSkill() {
        return skill;
    }
    public Struct_jdjins_021(int zhiwei,int next,int moxing,int tiaojian,String attr,int power,String xiaohao,String skill) {
        this.zhiwei = zhiwei;
        this.next = next;
        this.moxing = moxing;
        this.tiaojian = tiaojian;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.xiaohao = ExcelJsonUtils.toObj(xiaohao,int[][].class);
        this.skill = ExcelJsonUtils.toObj(skill,int[][].class);
    }
}