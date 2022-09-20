package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_228_功能预览表.xlsx
 */
public class Struct_sysshow_228 {
    /**所需通关关卡*/
    private int id;
    /**奖励*/
    private int[][] reward;
    /**
     * 所需通关关卡
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_sysshow_228(int id,String reward) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}