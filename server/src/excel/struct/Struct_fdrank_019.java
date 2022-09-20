package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_府邸排名表.xlsx
 */
public class Struct_fdrank_019 {
    /**编号*/
    private int bh;
    /**排名区间1*/
    private int pm1;
    /**排名区间2*/
    private int pm2;
    /**奖励*/
    private int[][] award;
    /**
     * 编号
     */
    public int getBh() {
        return bh;
    }
    /**
     * 排名区间1
     */
    public int getPm1() {
        return pm1;
    }
    /**
     * 排名区间2
     */
    public int getPm2() {
        return pm2;
    }
    /**
     * 奖励
     */
    public int[][] getAward() {
        return award;
    }
    public Struct_fdrank_019(int bh,int pm1,int pm2,String award) {
        this.bh = bh;
        this.pm1 = pm1;
        this.pm2 = pm2;
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
    }
}