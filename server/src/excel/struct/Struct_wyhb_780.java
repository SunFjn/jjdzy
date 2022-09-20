package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_780_万元红包表.xlsx
 */
public class Struct_wyhb_780 {
    /**id*/
    private int id;
    /**红包类型1=等级红包2=累充红包*/
    private int type;
    /**领取条件类型1=玩家等级2=累充金额*/
    private int limit;
    /**奖励*/
    private int[][] reward;
    /**领取后界面显示元*/
    private int show;
    /**广播*/
    private int broadcast;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 红包类型1=等级红包2=累充红包
     */
    public int getType() {
        return type;
    }
    /**
     * 领取条件类型1=玩家等级2=累充金额
     */
    public int getLimit() {
        return limit;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 领取后界面显示元
     */
    public int getShow() {
        return show;
    }
    /**
     * 广播
     */
    public int getBroadcast() {
        return broadcast;
    }
    public Struct_wyhb_780(int id,int type,int limit,String reward,int show,int broadcast) {
        this.id = id;
        this.type = type;
        this.limit = limit;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.show = show;
        this.broadcast = broadcast;
    }
}