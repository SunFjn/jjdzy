package excel.struct;
/**
 * F_019_府邸天工炉.xlsx
 */
public class Struct_fdtgl_019 {
    /**天工炉ID*/
    private int tgl;
    /**巧夺天工次数*/
    private int cishu;
    /**
     * 天工炉ID
     */
    public int getTgl() {
        return tgl;
    }
    /**
     * 巧夺天工次数
     */
    public int getCishu() {
        return cishu;
    }
    public Struct_fdtgl_019(int tgl,int cishu) {
        this.tgl = tgl;
        this.cishu = cishu;
    }
}