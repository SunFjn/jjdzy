package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_228_功能预览表（新）.xlsx
 */
public class Struct_sysshownew_228 {
    /**id
	 * jingyu:
	 * 1XXX：通关关卡
	 * 2XXX：人物等级
	 * 3XXX：人物转生*/
    private int id;
    /**参数*/
    private int cs;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * jingyu:
	 * 1XXX：通关关卡
	 * 2XXX：人物等级
	 * 3XXX：人物转生
     */
    public int getId() {
        return id;
    }
    /**
     * 参数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_sysshownew_228(int id,int cs,String reward) {
        this.id = id;
        this.cs = cs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}