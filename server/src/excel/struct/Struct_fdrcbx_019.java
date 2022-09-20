package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_府邸日常宝箱.xlsx
 */
public class Struct_fdrcbx_019 {
    /**编号*/
    private int bh;
    /**完成日常数量*/
    private int cs;
    /**奖励*/
    private int[][] award;
    /**
     * 编号
     */
    public int getBh() {
        return bh;
    }
    /**
     * 完成日常数量
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励
     */
    public int[][] getAward() {
        return award;
    }
    public Struct_fdrcbx_019(int bh,int cs,String award) {
        this.bh = bh;
        this.cs = cs;
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
    }
}