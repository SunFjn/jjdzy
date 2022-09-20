package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_214_宝物升阶技能表.xlsx
 */
public class Struct_baolvskill_214 {
    /**技能id
	 * jingyu:
	 * 
	 * 13ABCD：宝物技能id
	 * A=技能id
	 * BCD=技能等级
	 * */
    private int id;
    /**名字*/
    private String name;
    /**位置*/
    private int wz;
    /**图标*/
    private int icon;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**本级需要升阶阶数*/
    private int lv;
    /**下一级id*/
    private int next;
    /**下一级消耗*/
    private int[][] consume;
    /**
     * 技能id
	 * jingyu:
	 * 
	 * 13ABCD：宝物技能id
	 * A=技能id
	 * BCD=技能等级
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 名字
     */
    public String getName() {
        return name;
    }
    /**
     * 位置
     */
    public int getWz() {
        return wz;
    }
    /**
     * 图标
     */
    public int getIcon() {
        return icon;
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
     * 本级需要升阶阶数
     */
    public int getLv() {
        return lv;
    }
    /**
     * 下一级id
     */
    public int getNext() {
        return next;
    }
    /**
     * 下一级消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    public Struct_baolvskill_214(int id,String name,int wz,int icon,String attr,int power,int lv,int next,String consume) {
        this.id = id;
        this.name = name;
        this.wz = wz;
        this.icon = icon;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.lv = lv;
        this.next = next;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
    }
}