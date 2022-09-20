package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fhlyreward_254;
public class Config_fhlyreward_254 extends ConfigBase<Struct_fhlyreward_254> {
    private static Config_fhlyreward_254 ins = null;
    public static Config_fhlyreward_254 getIns(){
        if(ins==null){
            ins = new Config_fhlyreward_254();
        }
        return ins;
    }
    private Config_fhlyreward_254(){
        put(11,new Struct_fhlyreward_254(11,"[[1,1]]","[[1,410040,1000],[4,0,6000],[1,400884,40]]"));
        put(12,new Struct_fhlyreward_254(12,"[[2,2]]","[[1,410040,500],[4,0,4500],[1,400884,20]]"));
        put(13,new Struct_fhlyreward_254(13,"[[3,3]]","[[1,410040,500],[4,0,3000],[1,400884,10]]"));
        put(21,new Struct_fhlyreward_254(21,"[[1,1]]","[[1,410080,20],[4,0,2500],[1,400884,20]]"));
        put(22,new Struct_fhlyreward_254(22,"[[2,2]]","[[1,410080,15],[4,0,2000],[1,400884,16]]"));
        put(23,new Struct_fhlyreward_254(23,"[[3,3]]","[[1,410080,10],[4,0,1500],[1,400884,14]]"));
        put(24,new Struct_fhlyreward_254(24,"[[4,4]]","[[1,410080,5],[4,0,1500],[1,400884,12]]"));
        put(25,new Struct_fhlyreward_254(25,"[[5,5]]","[[1,410080,5],[4,0,1000],[1,400884,10]]"));
        put(26,new Struct_fhlyreward_254(26,"[[6,6]]","[[1,410080,2],[4,0,1000],[1,400884,8]]"));
        put(27,new Struct_fhlyreward_254(27,"[[7,7]]","[[1,410080,2],[4,0,500],[1,400884,6]]"));
        put(28,new Struct_fhlyreward_254(28,"[[8,8]]","[[1,410080,2],[4,0,500],[1,400884,6]]"));
        put(29,new Struct_fhlyreward_254(29,"[[9,9]]","[[1,410080,2],[4,0,500],[1,400884,4]]"));
        put(30,new Struct_fhlyreward_254(30,"[[10,10]]","[[1,410080,2],[4,0,500],[1,400884,4]]"));
    }
    public void reset(){
        ins = null;
    }
}