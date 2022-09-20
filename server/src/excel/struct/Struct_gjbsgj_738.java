package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_738_国家boss国家排名.xlsx
 */
public class Struct_gjbsgj_738 {
    /**排名*/
    private int paiming;
    /**奖励*/
    private int[][] jiangli;
    /**
     * 排名
     */
    public int getPaiming() {
        return paiming;
    }
    /**
     * 奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    public Struct_gjbsgj_738(int paiming,String jiangli) {
        this.paiming = paiming;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
    }
}