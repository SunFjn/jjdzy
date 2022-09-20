package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_277_礼包保底表.xlsx
 */
public class Struct_lbbd_277 {
    /**id*/
    private int id;
    /**类型
	 * 
	 * 1.普通道具。奖励为普通道具，进入背包
	 * 2.符文。奖励为符文，进入符文背包*/
    private int type;
    /**首次保底*/
    private int[][] reward;
    /**循环保底
	 * A=第X个区间
	 * B=道具类型
	 * C=道具id
	 * D=道具数量
	 * E=该区间起始次数
	 * F=该区间结束次数*/
    private int[][] reward1;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 类型
	 * 
	 * 1.普通道具。奖励为普通道具，进入背包
	 * 2.符文。奖励为符文，进入符文背包
     */
    public int getType() {
        return type;
    }
    /**
     * 首次保底
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 循环保底
	 * A=第X个区间
	 * B=道具类型
	 * C=道具id
	 * D=道具数量
	 * E=该区间起始次数
	 * F=该区间结束次数
     */
    public int[][] getReward1() {
        return reward1;
    }
    public Struct_lbbd_277(int id,int type,String reward,String reward1) {
        this.id = id;
        this.type = type;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
    }
}