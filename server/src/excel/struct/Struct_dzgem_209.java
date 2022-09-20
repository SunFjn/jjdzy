package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_209_锻造宝石表.xlsx
 */
public class Struct_dzgem_209 {
    /**宝石id*/
    private int id;
    /**宝石等级*/
    private int lv;
    /**镶嵌位置*/
    private int position;
    /**合成消耗数量*/
    private int consume;
    /**下一级宝石id*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**宝石战力*/
    private int power;
    /**
     * 宝石id
     */
    public int getId() {
        return id;
    }
    /**
     * 宝石等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 镶嵌位置
     */
    public int getPosition() {
        return position;
    }
    /**
     * 合成消耗数量
     */
    public int getConsume() {
        return consume;
    }
    /**
     * 下一级宝石id
     */
    public int getNext() {
        return next;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 宝石战力
     */
    public int getPower() {
        return power;
    }
    public Struct_dzgem_209(int id,int lv,int position,int consume,int next,String attr,int power) {
        this.id = id;
        this.lv = lv;
        this.position = position;
        this.consume = consume;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}