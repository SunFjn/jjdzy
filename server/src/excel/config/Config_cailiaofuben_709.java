package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cailiaofuben_709;
public class Config_cailiaofuben_709 extends ConfigBase<Struct_cailiaofuben_709> {
    private static Config_cailiaofuben_709 ins = null;
    public static Config_cailiaofuben_709 getIns(){
        if(ins==null){
            ins = new Config_cailiaofuben_709();
        }
        return ins;
    }
    private Config_cailiaofuben_709(){
        put(1001,new Struct_cailiaofuben_709(1001,"[[1,31]]","[[1,200001,5]]","[[201015,1]]","[[3,0,280000]]","[[3,0,280000]]",372001,28,0));
        put(2001,new Struct_cailiaofuben_709(2001,"[[1,13]]","[[1,200001,5]]","[[201015,1]]","[[1,411001,8]]","[[1,411001,8]]",372002,29,0));
        put(3001,new Struct_cailiaofuben_709(3001,"[[3,200]]","[[1,200001,5]]","[[201015,1]]","[[1,411002,8]]","[[1,411002,8]]",372003,30,0));
        put(4001,new Struct_cailiaofuben_709(4001,"[[1,31]]","[[1,200001,5]]","[[201015,1]]","[[1,411003,8]]","[[1,411003,8]]",372004,31,0));
        put(5001,new Struct_cailiaofuben_709(5001,"[[3,100]]","[[1,200001,5]]","[[201020,1]]","[[1,411008,8]]","[[1,411008,8]]",372005,32,0));
        put(6001,new Struct_cailiaofuben_709(6001,"[[1,25]]","[[1,200001,5]]","[[201015,1]]","[[9,0,70000]]","[[9,0,70000]]",372006,33,0));
        put(7001,new Struct_cailiaofuben_709(7001,"[[1,31]]","[[1,200001,5]]","[[201020,1]]","[[1,410002,2]]","[[1,410002,2]]",372007,34,0));
        put(8001,new Struct_cailiaofuben_709(8001,"[[3,180]]","[[1,200001,5]]","[[201020,1]]","[[1,411005,8]]","[[1,411005,8]]",372008,35,0));
        put(9001,new Struct_cailiaofuben_709(9001,"[[3,150]]","[[1,200001,5]]","[[201020,1]]","[[1,411007,8]]","[[1,411007,8]]",372009,36,0));
        put(10001,new Struct_cailiaofuben_709(10001,"[[3,240]]","[[1,200001,5]]","[[201020,1]]","[[1,411004,8]]","[[1,411004,8]]",372010,37,0));
        put(11001,new Struct_cailiaofuben_709(11001,"[[3,270]]","[[1,200001,5]]","[[201020,1]]","[[1,411006,8]]","[[1,411006,8]]",372011,38,0));
        put(12001,new Struct_cailiaofuben_709(12001,"[[3,400]]","[[1,200001,5]]","[[201015,1]]","[[1,410092,8]]","[[1,410092,8]]",372012,0,29));
    }
    public void reset(){
        ins = null;
    }
}