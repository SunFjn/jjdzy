package excel.struct;
/**
 * X_281_新活动-单笔返利转盘表.xlsx
 */
public class Struct_dbflzp_281 {
    /**id*/
    private int id;
    /**倍数（百分比）*/
    private int cz;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 倍数（百分比）
     */
    public int getCz() {
        return cz;
    }
    public Struct_dbflzp_281(int id,int cz) {
        this.id = id;
        this.cz = cz;
    }
}