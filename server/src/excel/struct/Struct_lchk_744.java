package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_744_累充回馈.xlsx
 */
public class Struct_lchk_744 {
    /**序号*/
    private int id;
    /**额度
	 * jingyu:
	 * RMB*/
    private int coin;
    /**奖励*/
    private int[][] reward;
    /**线下累充返利奖励*/
    private int[][] mail;
    /**最高显示额度
	 * Windows 用户:
	 * */
    private int xianshi;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 额度
	 * jingyu:
	 * RMB
     */
    public int getCoin() {
        return coin;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 线下累充返利奖励
     */
    public int[][] getMail() {
        return mail;
    }
    /**
     * 最高显示额度
	 * Windows 用户:
	 * 
     */
    public int getXianshi() {
        return xianshi;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_lchk_744(int id,int coin,String reward,String mail,int xianshi,int jiankong) {
        this.id = id;
        this.coin = coin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.mail = ExcelJsonUtils.toObj(mail,int[][].class);
        this.xianshi = xianshi;
        this.jiankong = jiankong;
    }
}