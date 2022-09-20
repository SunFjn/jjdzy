package excel.struct;
/**
 * X_781线下单日累充返利元宝.xlsx
 */
public class Struct_xxdrlcyb_781 {
    /**序号*/
    private int id;
    /**最小额度*/
    private int min;
    /**最大额度
	 * RMB*/
    private int max;
    /**返利元宝比例
	 * 百分比：值/100
	 * */
    private int reward;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 最小额度
     */
    public int getMin() {
        return min;
    }
    /**
     * 最大额度
	 * RMB
     */
    public int getMax() {
        return max;
    }
    /**
     * 返利元宝比例
	 * 百分比：值/100
	 * 
     */
    public int getReward() {
        return reward;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_xxdrlcyb_781(int id,int min,int max,int reward,int jiankong) {
        this.id = id;
        this.min = min;
        this.max = max;
        this.reward = reward;
        this.jiankong = jiankong;
    }
}