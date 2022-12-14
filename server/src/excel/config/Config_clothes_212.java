package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_clothes_212;
public class Config_clothes_212 extends ConfigBase<Struct_clothes_212> {
    private static Config_clothes_212 ins = null;
    public static Config_clothes_212 getIns(){
        if(ins==null){
            ins = new Config_clothes_212();
        }
        return ins;
    }
    private Config_clothes_212(){
        put(1,new Struct_clothes_212(1,"青铜甲",441001,520001,"[[102,160000],[103,4000],[104,2000],[109,1000]]","[[102,160000],[103,4000],[104,2000],[109,1000]]",75000,75000,"[[1,441001,1]]",50,1,"活动",3,50,0));
        put(2,new Struct_clothes_212(2,"锁子甲",441002,520002,"[[102,160000],[103,4000],[104,2000],[109,1000]]","[[102,160000],[103,4000],[104,2000],[109,1000]]",75000,75000,"[[1,441002,1]]",50,1,"活动",3,50,0));
        put(3,new Struct_clothes_212(3,"蚩尤战甲",441004,520004,"[[102,480000],[103,12000],[104,6000],[109,3000]]","[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,225000,"[[1,441004,1]]",80,3,"每日首冲",4,50,0));
        put(4,new Struct_clothes_212(4,"秦皇宝甲",441005,520005,"[[102,480000],[103,12000],[104,6000],[109,3000]]","[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,225000,"[[1,441005,1]]",80,3,"活动",4,50,0));
        put(5,new Struct_clothes_212(5,"明光铠",441003,520003,"[[102,480000],[103,12000],[104,6000],[109,3000]]","[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,225000,"[[1,441003,1]]",80,3,"活动",4,50,0));
        put(7,new Struct_clothes_212(7,"蛮王藤甲",441007,520007,"[[102,960000],[103,24000],[104,12000],[109,6000]]","[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,450000,"[[1,441007,1]]",130,3,"活动",5,50,0));
        put(6,new Struct_clothes_212(6,"霸王战甲",441006,520006,"[[102,480000],[103,12000],[104,6000],[109,3000]]","[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,225000,"[[1,441006,1]]",80,3,"活动",4,50,0));
        put(8,new Struct_clothes_212(8,"鱼鳞宝衣",441008,520008,"[[102,960000],[103,24000],[104,12000],[109,6000]]","[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,450000,"[[1,441008,1]]",130,5,"活动",5,50,0));
        put(9,new Struct_clothes_212(9,"鹤羽宝衣",441009,520009,"[[102,960000],[103,24000],[104,12000],[109,6000]]","[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,450000,"[[1,441009,1]]",130,5,"活动",5,50,0));
        put(10,new Struct_clothes_212(10,"于吉仙衣",441010,520010,"[[102,960000],[103,24000],[104,12000],[109,6000]]","[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,450000,"[[1,441010,1]]",150,5,"9转",5,50,0));
        put(11,new Struct_clothes_212(11,"太平道袍",441011,520011,"[[102,2560000],[103,64000],[104,32000],[109,16000]]","[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,1200000,"[[1,441011,1]]",220,8,"VIP",6,50,0));
        put(12,new Struct_clothes_212(12,"天师道袍",441012,520012,"[[102,2560000],[103,64000],[104,32000],[109,16000]]","[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,1200000,"[[1,441012,1]]",220,10,"活动",6,50,0));
        put(13,new Struct_clothes_212(13,"风神袍",441013,520013,"[[102,6400000],[103,160000],[104,80000],[109,40000]]","[[102,6400000],[103,160000],[104,80000],[109,40000]]",3000000,3000000,"[[1,441013,1]]",500,10,"活动",8,50,20003));
        put(14,new Struct_clothes_212(14,"踏云天衣",441014,520014,"[[102,6400000],[103,160000],[104,80000],[109,40000]]","[[102,6400000],[103,160000],[104,80000],[109,40000]]",3000000,3000000,"[[1,441014,1]]",500,10,"活动",8,50,20004));
    }
    public void reset(){
        ins = null;
    }
}