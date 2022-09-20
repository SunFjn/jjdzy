package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_nianpoint_299;
public class Config_nianpoint_299 extends ConfigBase<Struct_nianpoint_299> {
    private static Config_nianpoint_299 ins = null;
    public static Config_nianpoint_299 getIns(){
        if(ins==null){
            ins = new Config_nianpoint_299();
        }
        return ins;
    }
    private Config_nianpoint_299(){
        put(1,new Struct_nianpoint_299(1,2,"[[1,402047,2],[1,400893,1]]"));
        put(2,new Struct_nianpoint_299(2,5,"[[1,411006,10],[1,447107,1]]"));
        put(3,new Struct_nianpoint_299(3,9,"[[1,411006,10],[1,447107,1]]"));
        put(4,new Struct_nianpoint_299(4,15,"[[1,402047,3],[1,400893,1]]"));
        put(5,new Struct_nianpoint_299(5,20,"[[1,411006,20],[1,447107,2]]"));
        put(6,new Struct_nianpoint_299(6,30,"[[1,402047,5],[1,400893,2]]"));
        put(7,new Struct_nianpoint_299(7,40,"[[1,411006,20],[1,447107,3]]"));
        put(8,new Struct_nianpoint_299(8,50,"[[1,402047,5],[1,400893,2]]"));
        put(9,new Struct_nianpoint_299(9,60,"[[1,411006,30],[1,447107,5]]"));
        put(10,new Struct_nianpoint_299(10,75,"[[1,402047,5],[1,400894,1]]"));
        put(11,new Struct_nianpoint_299(11,90,"[[1,411006,30],[1,447107,5]]"));
        put(12,new Struct_nianpoint_299(12,105,"[[1,402047,7],[1,400894,1]]"));
        put(13,new Struct_nianpoint_299(13,120,"[[1,411006,40],[1,447107,5]]"));
        put(14,new Struct_nianpoint_299(14,135,"[[1,402047,8],[1,400894,2]]"));
        put(15,new Struct_nianpoint_299(15,150,"[[1,411006,40],[1,447107,5]]"));
        put(16,new Struct_nianpoint_299(16,170,"[[1,402047,10],[1,400894,3]]"));
        put(17,new Struct_nianpoint_299(17,190,"[[1,410049,50],[1,447107,7]]"));
        put(18,new Struct_nianpoint_299(18,210,"[[1,402047,10],[1,400894,5]]"));
        put(19,new Struct_nianpoint_299(19,230,"[[1,410049,50],[1,447107,7]]"));
        put(20,new Struct_nianpoint_299(20,250,"[[1,402047,10]]"));
        put(21,new Struct_nianpoint_299(21,270,"[[1,410049,50],[1,447107,8]]"));
        put(22,new Struct_nianpoint_299(22,300,"[[1,402047,15]]"));
        put(23,new Struct_nianpoint_299(23,330,"[[1,410049,70],[1,447107,8]]"));
        put(24,new Struct_nianpoint_299(24,360,"[[1,402047,20]]"));
        put(25,new Struct_nianpoint_299(25,390,"[[1,410049,80],[1,447107,10]]"));
        put(26,new Struct_nianpoint_299(26,420,"[[1,402047,20]]"));
        put(27,new Struct_nianpoint_299(27,450,"[[1,410049,100],[1,447107,15]]"));
    }
    public void reset(){
        ins = null;
    }
}