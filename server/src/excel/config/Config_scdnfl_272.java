package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_scdnfl_272;
public class Config_scdnfl_272 extends ConfigBase<Struct_scdnfl_272> {
    private static Config_scdnfl_272 ins = null;
    public static Config_scdnfl_272 getIns(){
        if(ins==null){
            ins = new Config_scdnfl_272();
        }
        return ins;
    }
    private Config_scdnfl_272(){
        put(1,new Struct_scdnfl_272(1,1,"[[1,410070,1]]",5,"[[4,0,5000]]","[[5,20000],[6,20000],[7,30000],[8,30000]]"));
        put(2,new Struct_scdnfl_272(2,2,"[[1,410071,1]]",5,"[[4,0,15000]]","[[4,50000],[5,30000],[6,10000],[8,10000]]"));
        put(3,new Struct_scdnfl_272(3,3,"[[1,410072,1]]",5,"[[4,0,49000]]","[[1,30000],[3,40000],[4,30000]]"));
        put(4,new Struct_scdnfl_272(4,4,"[[1,410073,1]]",3,"[[4,0,99000]]","[[1,30000],[3,40000],[4,30000]]"));
        put(5,new Struct_scdnfl_272(5,5,"[[1,410074,1]]",3,"[[4,0,164000]]","[[1,20000],[2,50000],[3,30000]]"));
        put(6,new Struct_scdnfl_272(6,6,"[[1,410075,1]]",3,"[[4,0,324000]]","[[1,20000],[2,50000],[3,30000]]"));
        put(7,new Struct_scdnfl_272(7,7,"[[1,410076,1]]",3,"[[4,0,500000]]","[[1,30000],[3,40000],[4,30000]]"));
        put(8,new Struct_scdnfl_272(8,8,"[[1,410077,1]]",3,"[[4,0,1000000]]","[[1,30000],[3,40000],[4,30000]]"));
        put(9,new Struct_scdnfl_272(9,109,"[[1,410078,1]]",3,"[[4,0,1500000]]","[[3,40000],[4,40000],[5,10000],[7,10000]]"));
        put(10,new Struct_scdnfl_272(10,110,"[[1,410079,1]]",3,"[[4,0,2500000]]","[[3,40000],[4,40000],[5,10000],[7,10000]]"));
    }
    public void reset(){
        ins = null;
    }
}