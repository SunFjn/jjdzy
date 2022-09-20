package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_006_将魂套装表.xlsx
 */
public class Struct_genteam_006 {
    /**套装ID*/
    private int id;
    /**分类
	 * 1.曹魏
	 * 2.蜀汉
	 * 3.孙吴
	 * 4.群雄*/
    private int type;
    /**阶级*/
    private int lv;
    /**套装条件
	 * 当前页签将魂总等级*/
    private int need;
    /**属性*/
    private int[][] attr;
    /**下级套装ID*/
    private int next;
    /**战力*/
    private int power;
    /**
     * 套装ID
     */
    public int getId() {
        return id;
    }
    /**
     * 分类
	 * 1.曹魏
	 * 2.蜀汉
	 * 3.孙吴
	 * 4.群雄
     */
    public int getType() {
        return type;
    }
    /**
     * 阶级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 套装条件
	 * 当前页签将魂总等级
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
    public Struct_genteam_006(int id,int type,int lv,int need,String attr,int next,int power) {
        this.id = id;
        this.type = type;
        this.lv = lv;
        this.need = need;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.next = next;
        this.power = power;
    }
}