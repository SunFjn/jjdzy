package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_721_激活码.xlsx
 */
public class Struct_jhm_721 {
    /**类型
	 * jingyu:
	 * 1.加群礼包
	 * 2.新手礼包
	 * 3.反馈礼包
	 * 4.加群礼包（微端1）
	 * 5.新手礼包（微端1）
	 * 6.反馈礼包（微端1）
	 * 7.新手礼包（微端3）
	 * 8.反馈礼包（微端3）
	 * 9.新手礼包（微端3）
	 * 10.反馈礼包（微端3）
	 * 11.新手礼包（微端2）
	 * 12.反馈礼包（微端2）
	 * 13.1元购宝箱（微端4）
	 * 14.腾讯爱玩礼包（微端4）
	 * 15.腾讯视频礼包（微端4）
	 * 16.腾讯新闻礼包（微端4）
	 * 17.首发豪华礼包（微端4）
	 * 18.腾讯新闻礼包（微端4）
	 * 19.超值福利礼包（微端4）
	 * 20.霸服特权礼包（微端4）
	 * 21.霸服银卡(等级)（微端4）
	 * 22.霸服金卡(等级)（微端4）
	 * 23.霸服铂金卡(等级)（微端4）
	 * 24.霸服黑卡(等级)（微端4）
	 * 25.霸服金卡(定制)（微端4）
	 * 26.霸服铂金卡(定制)（微端4）
	 * 27.霸服黑卡(定制)（微端4）
	 * 28:VIP贵族俱乐部-认证礼包（微端1-4）
	 * 29:VIP贵族俱乐部-生日礼包（微端1-4）
	 * 30.新手礼包（微端6）
	 * 31.反馈礼包（微端6）
	 * 32.新手礼包（微信小游戏）
	 * 33.反馈礼包（微信小游戏）
	 * 34.畅享礼包
	 * 49.微信贵族vip认证礼包
	 * 50.微信贵族vip生日礼包
	 * 66.微信新手通码礼包*/
    private int type;
    /**奖励*/
    private int[][] jl;
    /**起始时间*/
    private String time1;
    /**结束时间*/
    private String time2;
    /**最大领取上限
	 * 一个玩家可以使用的该种类型激活码的次数*/
    private int max;
    /**平台渠道*/
    private String qudao;
    /**是否通码
	 * jingyu:
	 * 0表示不是，一码只能一个玩家使用
	 * 1表示是，一码可以多个玩家使用*/
    private int tongma;
    /**
     * 类型
	 * jingyu:
	 * 1.加群礼包
	 * 2.新手礼包
	 * 3.反馈礼包
	 * 4.加群礼包（微端1）
	 * 5.新手礼包（微端1）
	 * 6.反馈礼包（微端1）
	 * 7.新手礼包（微端3）
	 * 8.反馈礼包（微端3）
	 * 9.新手礼包（微端3）
	 * 10.反馈礼包（微端3）
	 * 11.新手礼包（微端2）
	 * 12.反馈礼包（微端2）
	 * 13.1元购宝箱（微端4）
	 * 14.腾讯爱玩礼包（微端4）
	 * 15.腾讯视频礼包（微端4）
	 * 16.腾讯新闻礼包（微端4）
	 * 17.首发豪华礼包（微端4）
	 * 18.腾讯新闻礼包（微端4）
	 * 19.超值福利礼包（微端4）
	 * 20.霸服特权礼包（微端4）
	 * 21.霸服银卡(等级)（微端4）
	 * 22.霸服金卡(等级)（微端4）
	 * 23.霸服铂金卡(等级)（微端4）
	 * 24.霸服黑卡(等级)（微端4）
	 * 25.霸服金卡(定制)（微端4）
	 * 26.霸服铂金卡(定制)（微端4）
	 * 27.霸服黑卡(定制)（微端4）
	 * 28:VIP贵族俱乐部-认证礼包（微端1-4）
	 * 29:VIP贵族俱乐部-生日礼包（微端1-4）
	 * 30.新手礼包（微端6）
	 * 31.反馈礼包（微端6）
	 * 32.新手礼包（微信小游戏）
	 * 33.反馈礼包（微信小游戏）
	 * 34.畅享礼包
	 * 49.微信贵族vip认证礼包
	 * 50.微信贵族vip生日礼包
	 * 66.微信新手通码礼包
     */
    public int getType() {
        return type;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    /**
     * 起始时间
     */
    public String getTime1() {
        return time1;
    }
    /**
     * 结束时间
     */
    public String getTime2() {
        return time2;
    }
    /**
     * 最大领取上限
	 * 一个玩家可以使用的该种类型激活码的次数
     */
    public int getMax() {
        return max;
    }
    /**
     * 平台渠道
     */
    public String getQudao() {
        return qudao;
    }
    /**
     * 是否通码
	 * jingyu:
	 * 0表示不是，一码只能一个玩家使用
	 * 1表示是，一码可以多个玩家使用
     */
    public int getTongma() {
        return tongma;
    }
    public Struct_jhm_721(int type,String jl,String time1,String time2,int max,String qudao,int tongma) {
        this.type = type;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.time1 = time1;
        this.time2 = time2;
        this.max = max;
        this.qudao = qudao;
        this.tongma = tongma;
    }
}