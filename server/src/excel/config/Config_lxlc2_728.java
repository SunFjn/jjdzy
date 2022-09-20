package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lxlc2_728;
public class Config_lxlc2_728 extends ConfigBase<Struct_lxlc2_728> {
    private static Config_lxlc2_728 ins = null;
    public static Config_lxlc2_728 getIns(){
        if(ins==null){
            ins = new Config_lxlc2_728();
        }
        return ins;
    }
    private Config_lxlc2_728(){
        put(1,new Struct_lxlc2_728(1,1,1,"[[1,410019,1],[1,410006,2],[1,400024,2],[1,410003,20]]",6001));
        put(2,new Struct_lxlc2_728(2,1,2,"[[1,410019,2],[1,410006,2],[1,400024,2],[1,410003,20]]",6002));
        put(3,new Struct_lxlc2_728(3,1,3,"[[1,410019,2],[1,410006,3],[1,400025,2],[1,410003,50]]",6003));
        put(4,new Struct_lxlc2_728(4,1,4,"[[1,410019,2],[1,410006,3],[1,400025,2],[1,410003,50]]",6004));
        put(5,new Struct_lxlc2_728(5,1,5,"[[1,410019,3],[1,410006,5],[1,400026,2],[1,410003,100]]",6005));
        put(6,new Struct_lxlc2_728(6,1,6,"[[1,410019,5],[1,410006,5],[1,400026,2],[1,410003,100]]",6006));
        put(7,new Struct_lxlc2_728(7,1,7,"[[1,440009,1],[1,410006,10],[1,400027,2],[1,410003,200]]",6007));
        put(8,new Struct_lxlc2_728(8,2,1,"[[1,410019,1],[1,410006,2],[1,400024,2],[1,410003,20]]",6008));
        put(9,new Struct_lxlc2_728(9,2,2,"[[1,410019,2],[1,410006,2],[1,400024,2],[1,410003,20]]",6009));
        put(10,new Struct_lxlc2_728(10,2,3,"[[1,410019,2],[1,410006,3],[1,400025,2],[1,410003,50]]",6010));
        put(11,new Struct_lxlc2_728(11,2,4,"[[1,410019,2],[1,410006,3],[1,400025,2],[1,410003,50]]",6011));
        put(12,new Struct_lxlc2_728(12,2,5,"[[1,410019,3],[1,410006,5],[1,400026,2],[1,410003,100]]",6012));
        put(13,new Struct_lxlc2_728(13,2,6,"[[1,410019,5],[1,410006,5],[1,400026,2],[1,410003,100]]",6013));
        put(14,new Struct_lxlc2_728(14,2,7,"[[1,440009,1],[1,410006,10],[1,400027,2],[1,410003,200]]",6014));
        put(15,new Struct_lxlc2_728(15,3,1,"[[1,410019,1],[1,410006,2],[1,400024,2],[1,410003,20]]",6015));
        put(16,new Struct_lxlc2_728(16,3,2,"[[1,410019,2],[1,410006,2],[1,400024,2],[1,410003,20]]",6016));
        put(17,new Struct_lxlc2_728(17,3,3,"[[1,440002,1],[1,410006,3],[1,400025,2],[1,410004,10]]",6017));
        put(18,new Struct_lxlc2_728(18,3,4,"[[1,410019,2],[1,410006,3],[1,400025,2],[1,410004,10]]",6018));
        put(19,new Struct_lxlc2_728(19,3,5,"[[1,441006,1],[1,410006,5],[1,400026,2],[1,410005,10]]",6019));
        put(20,new Struct_lxlc2_728(20,3,6,"[[1,410019,5],[1,410006,5],[1,400026,2],[1,410005,10]]",6020));
        put(21,new Struct_lxlc2_728(21,3,7,"[[1,432004,1],[1,410006,10],[1,400027,2],[1,410005,20]]",6021));
    }
    public void reset(){
        ins = null;
    }
}