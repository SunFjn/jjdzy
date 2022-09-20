package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_752_异兽录-天赋升级表.xlsx
 */
public class Struct_ystfsj_752 {
    /**等级
	 * 
	 * 
	 * 注意：0级升1级、每9升10的时候，消耗的道具读天赋装备表（对应每个部位），消耗的数量仍然读此表
	 * 
	 * 
	 * 
	 * 
	 * */
    private int lv;
    /**下一级*/
    private int xj;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**升级/升阶消耗
	 * 每十级升一阶，消耗对应升阶道具*/
    private int[][] xiaohao;
    /**升级条件
	 * 天赋技能等级
	 * 
	 * 对应每个异兽*/
    private int tj;
    /**是否进阶
	 * 1表示升级消耗需要替换
	 * 0表示不替换*/
    private int jinjie;
    /**
     * 等级
	 * 
	 * 
	 * 注意：0级升1级、每9升10的时候，消耗的道具读天赋装备表（对应每个部位），消耗的数量仍然读此表
	 * 
	 * 
	 * 
	 * 
	 * 
     */
    public int getLv() {
        return lv;
    }
    /**
     * 下一级
     */
    public int getXj() {
        return xj;
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
     * 升级/升阶消耗
	 * 每十级升一阶，消耗对应升阶道具
     */
    public int[][] getXiaohao() {
        return xiaohao;
    }
    /**
     * 升级条件
	 * 天赋技能等级
	 * 
	 * 对应每个异兽
     */
    public int getTj() {
        return tj;
    }
    /**
     * 是否进阶
	 * 1表示升级消耗需要替换
	 * 0表示不替换
     */
    public int getJinjie() {
        return jinjie;
    }
    public Struct_ystfsj_752(int lv,int xj,String attr,int power,String xiaohao,int tj,int jinjie) {
        this.lv = lv;
        this.xj = xj;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.xiaohao = ExcelJsonUtils.toObj(xiaohao,int[][].class);
        this.tj = tj;
        this.jinjie = jinjie;
    }
}