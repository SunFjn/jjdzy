package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_209_锻造强化表.xlsx
 */
public class Struct_dzqianghua_209 {
    /**强化等级*/
    private int lv;
    /**消耗*/
    private int[][] consume;
    /**武器*/
    private int[][] attr0;
    /**衣服*/
    private int[][] attr1;
    /**护腕*/
    private int[][] attr2;
    /**裤子*/
    private int[][] attr3;
    /**鞋子*/
    private int[][] attr4;
    /**帽子*/
    private int[][] attr5;
    /**项链*/
    private int[][] attr6;
    /**手镯*/
    private int[][] attr7;
    /**戒指*/
    private int[][] attr8;
    /**饰品*/
    private int[][] attr9;
    /**强化战力*/
    private int power;
    /**
     * 强化等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 武器
     */
    public int[][] getAttr0() {
        return attr0;
    }
    /**
     * 衣服
     */
    public int[][] getAttr1() {
        return attr1;
    }
    /**
     * 护腕
     */
    public int[][] getAttr2() {
        return attr2;
    }
    /**
     * 裤子
     */
    public int[][] getAttr3() {
        return attr3;
    }
    /**
     * 鞋子
     */
    public int[][] getAttr4() {
        return attr4;
    }
    /**
     * 帽子
     */
    public int[][] getAttr5() {
        return attr5;
    }
    /**
     * 项链
     */
    public int[][] getAttr6() {
        return attr6;
    }
    /**
     * 手镯
     */
    public int[][] getAttr7() {
        return attr7;
    }
    /**
     * 戒指
     */
    public int[][] getAttr8() {
        return attr8;
    }
    /**
     * 饰品
     */
    public int[][] getAttr9() {
        return attr9;
    }
    /**
     * 强化战力
     */
    public int getPower() {
        return power;
    }
    public Struct_dzqianghua_209(int lv,String consume,String attr0,String attr1,String attr2,String attr3,String attr4,String attr5,String attr6,String attr7,String attr8,String attr9,int power) {
        this.lv = lv;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.attr0 = ExcelJsonUtils.toObj(attr0,int[][].class);
        this.attr1 = ExcelJsonUtils.toObj(attr1,int[][].class);
        this.attr2 = ExcelJsonUtils.toObj(attr2,int[][].class);
        this.attr3 = ExcelJsonUtils.toObj(attr3,int[][].class);
        this.attr4 = ExcelJsonUtils.toObj(attr4,int[][].class);
        this.attr5 = ExcelJsonUtils.toObj(attr5,int[][].class);
        this.attr6 = ExcelJsonUtils.toObj(attr6,int[][].class);
        this.attr7 = ExcelJsonUtils.toObj(attr7,int[][].class);
        this.attr8 = ExcelJsonUtils.toObj(attr8,int[][].class);
        this.attr9 = ExcelJsonUtils.toObj(attr9,int[][].class);
        this.power = power;
    }
}