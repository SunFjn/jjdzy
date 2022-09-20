package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_005_图鉴套装表.xlsx
 */
public class Struct_picteam_005 {
    /**套装ID
	 * 类型*1000+等级
	 * */
    private int id;
    /**分类
	 * 1.猛将
	 * 2.谋士
	 * 3.佳人
	 * 4.君主*/
    private int type;
    /**等级*/
    private int lv;
    /**套装条件
	 * 同类型图鉴总等级达到X级*/
    private int need;
    /**属性*/
    private int[][] attr;
    /**下级套装ID*/
    private int next;
    /**战力*/
    private int power;
    /**
     * 套装ID
	 * 类型*1000+等级
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 分类
	 * 1.猛将
	 * 2.谋士
	 * 3.佳人
	 * 4.君主
     */
    public int getType() {
        return type;
    }
    /**
     * 等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 套装条件
	 * 同类型图鉴总等级达到X级
     */
    public int getNeed() {
        return need;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 下级套装ID
     */
    public int getNext() {
        return next;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    public Struct_picteam_005(int id,int type,int lv,int need,String attr,int next,int power) {
        this.id = id;
        this.type = type;
        this.lv = lv;
        this.need = need;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.next = next;
        this.power = power;
    }
}