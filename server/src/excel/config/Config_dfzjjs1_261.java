package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dfzjjs1_261;
public class Config_dfzjjs1_261 extends ConfigBase<Struct_dfzjjs1_261> {
    private static Config_dfzjjs1_261 ins = null;
    public static Config_dfzjjs1_261 getIns(){
        if(ins==null){
            ins = new Config_dfzjjs1_261();
        }
        return ins;
    }
    private Config_dfzjjs1_261(){
        put(1,new Struct_dfzjjs1_261(1,"[[1,1]]","[[1,402077,75],[1,410305,500],[1,460103,1]]",60));
        put(2,new Struct_dfzjjs1_261(2,"[[2,2]]","[[1,402077,50],[1,410305,400]]",50));
        put(3,new Struct_dfzjjs1_261(3,"[[3,3]]","[[1,402077,50],[1,410305,300]]",50));
        put(4,new Struct_dfzjjs1_261(4,"[[4,8]]","[[1,402077,30],[1,410305,300]]",40));
        put(5,new Struct_dfzjjs1_261(5,"[[9,16]]","[[1,402077,25],[1,410305,200]]",30));
        put(6,new Struct_dfzjjs1_261(6,"[[17,32]]","[[1,402077,20],[1,410305,100]]",25));
    }
    public void reset(){
        ins = null;
    }
}