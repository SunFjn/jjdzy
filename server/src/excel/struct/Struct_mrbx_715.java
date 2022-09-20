package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * M_715_每日首充宝箱.xlsx
 */
public class Struct_mrbx_715 {
    /**序号*/
    private int ID;
    /**条件
	 * 天数*/
    private int NEED;
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
     * 条件
	 * 天数
     */
    public int getNEED() {
        return NEED;
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
    public Struct_mrbx_715(int ID,int NEED,String AWARD,int jiankong) {
        this.ID = ID;
        this.NEED = NEED;
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
        this.jiankong = jiankong;
    }
}