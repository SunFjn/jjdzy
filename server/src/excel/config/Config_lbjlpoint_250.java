package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lbjlpoint_250;
public class Config_lbjlpoint_250 extends ConfigBase<Struct_lbjlpoint_250> {
    private static Config_lbjlpoint_250 ins = null;
    public static Config_lbjlpoint_250 getIns(){
        if(ins==null){
            ins = new Config_lbjlpoint_250();
        }
        return ins;
    }
    private Config_lbjlpoint_250(){
        put(1,new Struct_lbjlpoint_250(1,100,"[[4,0,1000],[1,411001,5]]"));
        put(2,new Struct_lbjlpoint_250(2,150,"[[4,0,1000],[1,411001,5]]"));
        put(3,new Struct_lbjlpoint_250(3,250,"[[4,0,2000],[1,412001,1],[1,411001,10]]"));
        put(4,new Struct_lbjlpoint_250(4,600,"[[4,0,2000],[1,412001,1],[1,411001,10]]"));
        put(5,new Struct_lbjlpoint_250(5,1200,"[[1,440001,1],[4,0,4000],[1,411001,20]]"));
        put(6,new Struct_lbjlpoint_250(6,1700,"[[1,440003,1],[4,0,4000],[1,411001,20]]"));
        put(7,new Struct_lbjlpoint_250(7,2200,"[[1,440005,1],[4,0,7500],[1,411001,30]]"));
        put(8,new Struct_lbjlpoint_250(8,3200,"[[4,0,7500],[1,412001,2],[1,411001,30]]"));
        put(9,new Struct_lbjlpoint_250(9,5000,"[[4,0,10000],[1,412001,3],[1,411001,40]]"));
        put(10,new Struct_lbjlpoint_250(10,7000,"[[4,0,10000],[1,412001,3],[1,411001,40]]"));
        put(11,new Struct_lbjlpoint_250(11,11000,"[[1,400173,1],[4,0,10000],[1,412001,3],[1,411001,40]]"));
        put(12,new Struct_lbjlpoint_250(12,15000,"[[1,400173,1],[4,0,15000],[1,412001,4],[1,411001,50]]"));
        put(13,new Struct_lbjlpoint_250(13,19000,"[[1,400173,1],[4,0,15000],[1,412001,4],[1,411001,50]]"));
        put(14,new Struct_lbjlpoint_250(14,26000,"[[1,400177,1],[4,0,15000],[1,412001,4],[1,411001,50]]"));
        put(15,new Struct_lbjlpoint_250(15,30000,"[[1,471004,1],[4,0,25000],[1,412001,5],[1,411001,100]]"));
    }
    public void reset(){
        ins = null;
    }
}