package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_717_七日登陆.xlsx
 */
public class Struct_qrdl_717 {
    /**天数*/
    private int DAY;
    /**奖励*/
    private int[][] AWARD;
    /**监控ID*/
    private int jiankong;
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
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_qrdl_717(int DAY,String AWARD,int jiankong) {
        this.DAY = DAY;
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
        this.jiankong = jiankong;
    }
}