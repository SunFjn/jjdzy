package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_208_神装套装.xlsx
 */
public class Struct_godequipsuit_208 {
    /**套装等级
	 * 
	 * 套装等级=身上全部神装所需阶数*/
    private int lv;
    /**装备属性
	 * [[X1,X2]]
	 * x1:属性类型
	 * x2:属性值*/
    private int[][] attr;
    /**基础战力*/
    private int power;
    /**
     * 套装等级
	 * 
	 * 套装等级=身上全部神装所需阶数
     */
    public int getLv() {
        return lv;
    }
    /**
     * 装备属性
	 * [[X1,X2]]
	 * x1:属性类型
	 * x2:属性值
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 基础战力
     */
    public int getPower() {
        return power;
    }
    public Struct_godequipsuit_208(int lv,String attr,int power) {
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}