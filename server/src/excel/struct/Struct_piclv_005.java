package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_005_图鉴升级表.xlsx
 */
public class Struct_piclv_005 {
    /**索引
	 * 品质*1000+等级*/
    private int index;
    /**品质
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红*/
    private int quality;
    /**等级*/
    private int lv;
    /**属性*/
    private int[][] attr;
    /**升级消耗*/
    private int[][] consume;
    /**下一级*/
    private int next;
    /**战力*/
    private int power;
    /**
     * 索引
	 * 品质*1000+等级
     */
    public int getIndex() {
        return index;
    }
    /**
     * 品质
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红
     */
    public int getQuality() {
        return quality;
    }
    /**
     * 等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 升级消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 下一级
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
    public Struct_piclv_005(int index,int quality,int lv,String attr,String consume,int next,int power) {
        this.index = index;
        this.quality = quality;
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.next = next;
        this.power = power;
    }
}