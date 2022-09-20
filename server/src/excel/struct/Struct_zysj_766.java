package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_766_阵眼_阵眼升级表.xlsx
 */
public class Struct_zysj_766 {
    /**等级
	 * 
	 * 
	 * 注意：0级升1级、每9升10的时候，消耗的道具读阵眼表（对应每个阵眼位置），消耗的数量仍然读此表
	 * 
	 * 每十级为1星
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
    /**升级消耗
	 * 每十级升一星，消耗对应升星道具*/
    private int[][] xiaohao;
    /**升星消耗
	 * 1表示升级消耗需要替换
	 * 0表示不替换
	 * 只替换升级消耗的道具，数量不替换，对应每个阵眼的道具id*/
    private int shengxing;
    /**
     * 等级
	 * 
	 * 
	 * 注意：0级升1级、每9升10的时候，消耗的道具读阵眼表（对应每个阵眼位置），消耗的数量仍然读此表
	 * 
	 * 每十级为1星
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
     * 升级消耗
	 * 每十级升一星，消耗对应升星道具
     */
    public int[][] getXiaohao() {
        return xiaohao;
    }
    /**
     * 升星消耗
	 * 1表示升级消耗需要替换
	 * 0表示不替换
	 * 只替换升级消耗的道具，数量不替换，对应每个阵眼的道具id
     */
    public int getShengxing() {
        return shengxing;
    }
    public Struct_zysj_766(int lv,int xj,String attr,int power,String xiaohao,int shengxing) {
        this.lv = lv;
        this.xj = xj;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.xiaohao = ExcelJsonUtils.toObj(xiaohao,int[][].class);
        this.shengxing = shengxing;
    }
}