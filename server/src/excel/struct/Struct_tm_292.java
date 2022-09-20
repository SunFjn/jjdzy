package excel.struct;
/**
 * T_292_天命表.xlsx
 */
public class Struct_tm_292 {
    /**天命id*/
    private int id;
    /**开启需要轮回等级*/
    private int lh;
    /**
     * 天命id
     */
    public int getId() {
        return id;
    }
    /**
     * 开启需要轮回等级
     */
    public int getLh() {
        return lh;
    }
    public Struct_tm_292(int id,int lh) {
        this.id = id;
        this.lh = lh;
    }
}