package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_720_签到宝箱.xlsx
 */
public class Struct_qdbaoxiang_720 {
    /**天数*/
    private int DAY;
    /**奖励*/
    private int[][] AWARD;
    /**
     * 天数
     */
    public int getDAY() {
        return DAY;
    }
    /**
     * 奖励
     */
    public int[][] getAWARD() {
        return AWARD;
    }
    public Struct_qdbaoxiang_720(int DAY,String AWARD) {
        this.DAY = DAY;
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
    }
}