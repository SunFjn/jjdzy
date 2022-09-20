package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_209_锻造升星套装表.xlsx
 */
public class Struct_dzstarsuit_209 {
    /**套装等级*/
    private int lv;
    /**全身星级等级要求*/
    private int yaoqiu;
    /**属性
	 * [[X1,X2]]
	 * x1:属性类型
	 * x2:属性值*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**
     * 套装等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 全身星级等级要求
     */
    public int getYaoqiu() {
        return yaoqiu;
    }
    /**
     * 属性
	 * [[X1,X2]]
	 * x1:属性类型
	 * x2:属性值
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
    public Struct_dzstarsuit_209(int lv,int yaoqiu,String attr,int power) {
        this.lv = lv;
        this.yaoqiu = yaoqiu;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}