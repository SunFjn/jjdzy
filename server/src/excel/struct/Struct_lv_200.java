package excel.struct;
/**
 * J_200_角色升级表.xlsx
 */
public class Struct_lv_200 {
    /**等级*/
    private int lv;
    /**经验*/
    private int exp;
    /**
     * 等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 经验
     */
    public int getExp() {
        return exp;
    }
    public Struct_lv_200(int lv,int exp) {
        this.lv = lv;
        this.exp = exp;
    }
}