package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_239_玲珑阁积分表.xlsx
 */
public class Struct_llgpoint_239 {
    /**id*/
    private int id;
    /**配置id
	 * jingyu:
	 * 同玲珑阁表配置id字段*/
    private int llg;
    /**所需积分*/
    private int point;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 配置id
	 * jingyu:
	 * 同玲珑阁表配置id字段
     */
    public int getLlg() {
        return llg;
    }
    /**
     * 所需积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_llgpoint_239(int id,int llg,int point,String reward) {
        this.id = id;
        this.llg = llg;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}