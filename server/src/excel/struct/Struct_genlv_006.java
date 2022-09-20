package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_006_将魂升级表.xlsx
 */
public class Struct_genlv_006 {
    /**索引
	 * 类型*10000+品质*1000+等级*/
    private int index;
    /**类型
	 * 1.曹魏
	 * 2.蜀汉
	 * 3.孙吴
	 * 4.群雄*/
    private int type;
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
    /**下一级*/
    private int next;
    /**升级消耗*/
    private int[][] consume;
    /**战力*/
    private int power;
    /**
     * 索引
	 * 类型*10000+品质*1000+等级
     */
    public int getIndex() {
        return index;
    }
    /**
     * 类型
	 * 1.曹魏
	 * 2.蜀汉
	 * 3.孙吴
	 * 4.群雄
     */
    public int getType() {
        return type;
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
     * 下一级
     */
    public int getNext() {
        return next;
    }
    /**
     * 升级消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    public Struct_genlv_006(int index,int type,int quality,int lv,String attr,int next,String consume,int power) {
        this.index = index;
        this.type = type;
        this.quality = quality;
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.next = next;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.power = power;
    }
}