package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dbfl_281;
public class Config_dbfl_281 extends ConfigBase<Struct_dbfl_281> {
    private static Config_dbfl_281 ins = null;
    public static Config_dbfl_281 getIns(){
        if(ins==null){
            ins = new Config_dbfl_281();
        }
        return ins;
    }
    private Config_dbfl_281(){
        put(1,new Struct_dbfl_281(1,1,"[[1,410070,1]]",5,"[[4,0,5000]]","[[5,20000],[6,20000],[7,30000],[8,30000]]"));
        put(2,new Struct_dbfl_281(2,2,"[[1,410071,1]]",5,"[[4,0,15000]]","[[4,50000],[5,30000],[6,10000],[8,10000]]"));
        put(3,new Struct_dbfl_281(3,3,"[[1,410072,1]]",5,"[[4,0,49000]]","[[2,10000],[3,40000],[4,50000]]"));
        put(4,new Struct_dbfl_281(4,4,"[[1,410073,1]]",3,"[[4,0,99000]]","[[2,10000],[3,40000],[4,50000]]"));
        put(5,new Struct_dbfl_281(5,5,"[[1,410074,1]]",3,"[[4,0,164000]]","[[3,30000],[4,40000],[5,30000]]"));
        put(6,new Struct_dbfl_281(6,6,"[[1,410075,1]]",3,"[[4,0,324000]]","[[3,30000],[4,40000],[5,30000]]"));
        put(7,new Struct_dbfl_281(7,7,"[[1,410076,1]]",3,"[[4,0,500000]]","[[3,30000],[4,40000],[5,30000]]"));
        put(8,new Struct_dbfl_281(8,8,"[[1,410077,1]]",3,"[[4,0,1000000]]","[[3,30000],[4,40000],[5,30000]]"));
        put(9,new Struct_dbfl_281(9,109,"[[1,410078,1]]",3,"[[4,0,1500000]]","[[3,40000],[4,40000],[5,10000],[7,10000]]"));
        put(10,new Struct_dbfl_281(10,110,"[[1,410079,1]]",3,"[[4,0,2500000]]","[[3,40000],[4,40000],[5,10000],[7,10000]]"));
    }
    public void reset(){
        ins = null;
    }
}