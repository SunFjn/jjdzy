package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * M_715_每日首充.xlsx
 */
public class Struct_meirishouchong_715 {
    /**序号*/
    private int ID;
    /**奖励*/
    private int[][] AWARD;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getID() {
        return ID;
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
    public Struct_meirishouchong_715(int ID,String AWARD,int jiankong) {
        this.ID = ID;
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
        this.jiankong = jiankong;
    }
}