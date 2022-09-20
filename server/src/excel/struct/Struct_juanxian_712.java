package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_712_国家捐献.xlsx
 */
public class Struct_juanxian_712 {
    /**序号*/
    private int ID;
    /**单次消耗*/
    private int[][] USE;
    /**总次数*/
    private int NUM;
    /**奖励*/
    private int[][] AWARD;
    /**
     * 序号
     */
    public int getID() {
        return ID;
    }
    /**
     * 单次消耗
     */
    public int[][] getUSE() {
        return USE;
    }
    /**
     * 总次数
     */
    public int getNUM() {
        return NUM;
    }
    /**
     * 奖励
     */
    public int[][] getAWARD() {
        return AWARD;
    }
    public Struct_juanxian_712(int ID,String USE,int NUM,String AWARD) {
        this.ID = ID;
        this.USE = ExcelJsonUtils.toObj(USE,int[][].class);
        this.NUM = NUM;
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
    }
}