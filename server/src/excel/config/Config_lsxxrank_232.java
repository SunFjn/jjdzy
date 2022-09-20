package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lsxxrank_232;
public class Config_lsxxrank_232 extends ConfigBase<Struct_lsxxrank_232> {
    private static Config_lsxxrank_232 ins = null;
    public static Config_lsxxrank_232 getIns(){
        if(ins==null){
            ins = new Config_lsxxrank_232();
        }
        return ins;
    }
    private Config_lsxxrank_232(){
        put(1,new Struct_lsxxrank_232(1,"[[3001,9999]]","[[-2000,-1950],[-1800,-1500],[-1300,-1000],[-800,-600]]"));
        put(2,new Struct_lsxxrank_232(2,"[[801,3000]]","[[-550,-500],[-450,-350],[-250,-150],[-100,-50]]"));
        put(3,new Struct_lsxxrank_232(3,"[[201,800]]","[[-75,-70],[-55,-45],[-45,-35],[-30,-25]]"));
        put(4,new Struct_lsxxrank_232(4,"[[101,200]]","[[-50,-40],[-35,-25],[-25,-15],[-10,-5]]"));
        put(5,new Struct_lsxxrank_232(5,"[[51,100]]","[[-25,-20],[-15,-10],[-8,-5],[-4,-1]]"));
        put(6,new Struct_lsxxrank_232(6,"[[21,50]]","[[-15,-12],[-10,-8],[-7,-4],[-3,-1]]"));
        put(7,new Struct_lsxxrank_232(7,"[[17,20]]","[[-5,-4],[-3,-3],[-2,-1],[1,3]]"));
        put(8,new Struct_lsxxrank_232(8,"[[11,16]]","[[-5,-4],[-3,-3],[-2,-2],[-1,-1]]"));
        put(9,new Struct_lsxxrank_232(9,"[[5,10]]","[[-3,-3],[-2,-2],[-1,-1],[1,5]]"));
        put(10,new Struct_lsxxrank_232(10,"[[4,4]]","[[-3,-3],[-2,-2],[-1,-1],[1,5]]"));
        put(11,new Struct_lsxxrank_232(11,"[[3,3]]","[[-2,-2],[-1,-1],[1,2],[3,4]]"));
        put(12,new Struct_lsxxrank_232(12,"[[2,2]]","[[-1,-1],[1,1],[2,2],[3,4]]"));
        put(13,new Struct_lsxxrank_232(13,"[[1,1]]","[[1,1],[2,2],[3,3],[4,5]]"));
    }
    public void reset(){
        ins = null;
    }
}