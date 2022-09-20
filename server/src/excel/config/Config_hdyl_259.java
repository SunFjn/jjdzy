package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hdyl_259;
public class Config_hdyl_259 extends ConfigBase<Struct_hdyl_259> {
    private static Config_hdyl_259 ins = null;
    public static Config_hdyl_259 getIns(){
        if(ins==null){
            ins = new Config_hdyl_259();
        }
        return ins;
    }
    private Config_hdyl_259(){
        put(101,new Struct_hdyl_259(101,1,3702,"12:00","22:00",0,0,3702,0,0));
        put(102,new Struct_hdyl_259(102,1,1805,"12:30","13:00",0,0,1805,0,0));
        put(103,new Struct_hdyl_259(103,1,1805,"18:30","19:00",0,0,1805,0,0));
        put(104,new Struct_hdyl_259(104,1,3703,"20:00","20:20",1,1,3701,0,4));
        put(105,new Struct_hdyl_259(105,1,1603,"20:30","21:20",1,1,1603,0,0));
        put(106,new Struct_hdyl_259(106,1,1805,"21:30","22:00",0,0,1805,0,0));
        put(107,new Struct_hdyl_259(107,1,1504,"10:00","22:00",0,0,1504,1,0));
        put(108,new Struct_hdyl_259(108,1,3610,"11:00","12:00",1,1,3610,0,15));
        put(109,new Struct_hdyl_259(109,1,3610,"22:00","23:00",1,1,3610,0,15));
        put(201,new Struct_hdyl_259(201,2,3702,"12:00","22:00",0,0,3702,0,0));
        put(202,new Struct_hdyl_259(202,2,1805,"12:30","13:00",0,0,1805,0,0));
        put(203,new Struct_hdyl_259(203,2,1805,"18:30","19:00",0,0,1805,0,0));
        put(204,new Struct_hdyl_259(204,2,3705,"20:00","20:20",1,1,3701,0,4));
        put(205,new Struct_hdyl_259(205,2,1603,"20:30","21:20",1,1,1603,0,0));
        put(206,new Struct_hdyl_259(206,2,1805,"21:30","22:00",0,0,1805,0,0));
        put(207,new Struct_hdyl_259(207,2,3610,"11:00","12:00",1,1,3610,0,15));
        put(208,new Struct_hdyl_259(208,2,3610,"22:00","23:00",1,1,3610,0,15));
        put(301,new Struct_hdyl_259(301,3,3702,"12:00","22:00",0,0,3702,0,0));
        put(302,new Struct_hdyl_259(302,3,1805,"12:30","13:00",0,0,1805,0,0));
        put(303,new Struct_hdyl_259(303,3,1805,"18:30","19:00",0,0,1805,0,0));
        put(304,new Struct_hdyl_259(304,3,3707,"19:30","19:50",1,0,3701,0,6));
        put(305,new Struct_hdyl_259(305,3,3703,"20:00","20:20",1,1,3701,0,4));
        put(306,new Struct_hdyl_259(306,3,1603,"20:30","21:20",1,1,1603,0,0));
        put(307,new Struct_hdyl_259(307,3,1805,"21:30","22:00",0,0,1805,0,0));
        put(308,new Struct_hdyl_259(308,3,3610,"11:00","12:00",1,1,3610,0,15));
        put(309,new Struct_hdyl_259(309,3,3610,"22:00","23:00",1,1,3610,0,15));
        put(401,new Struct_hdyl_259(401,4,3702,"12:00","22:00",0,0,3702,0,0));
        put(402,new Struct_hdyl_259(402,4,1805,"12:30","13:00",0,0,1805,0,0));
        put(403,new Struct_hdyl_259(403,4,1805,"18:30","19:00",0,0,1805,0,0));
        put(404,new Struct_hdyl_259(404,4,3705,"20:00","20:20",1,1,3701,0,4));
        put(405,new Struct_hdyl_259(405,4,1603,"20:30","21:20",1,1,1603,0,0));
        put(406,new Struct_hdyl_259(406,4,1805,"21:30","22:00",0,0,1805,0,0));
        put(407,new Struct_hdyl_259(407,4,1504,"10:00","22:00",0,1,1504,1,0));
        put(408,new Struct_hdyl_259(408,4,3610,"11:00","12:00",1,1,3610,0,15));
        put(409,new Struct_hdyl_259(409,4,3610,"22:00","23:00",1,1,3610,0,15));
        put(501,new Struct_hdyl_259(501,5,3702,"12:00","22:00",0,0,3702,0,0));
        put(502,new Struct_hdyl_259(502,5,1805,"12:30","13:00",0,0,1805,0,0));
        put(503,new Struct_hdyl_259(503,5,1805,"18:30","19:00",0,0,1805,0,0));
        put(504,new Struct_hdyl_259(504,5,3703,"20:00","20:20",1,1,3701,0,4));
        put(505,new Struct_hdyl_259(505,5,1603,"20:30","21:20",1,1,1603,0,0));
        put(506,new Struct_hdyl_259(506,5,1805,"21:30","22:00",0,0,1805,0,0));
        put(507,new Struct_hdyl_259(507,5,3610,"11:00","12:00",1,1,3610,0,15));
        put(508,new Struct_hdyl_259(508,5,3610,"22:00","23:00",1,1,3610,0,15));
        put(601,new Struct_hdyl_259(601,6,3702,"12:00","22:00",0,0,3702,0,0));
        put(602,new Struct_hdyl_259(602,6,1805,"12:30","13:00",0,0,1805,0,0));
        put(603,new Struct_hdyl_259(603,6,1805,"18:30","19:00",0,0,1805,0,0));
        put(604,new Struct_hdyl_259(604,6,3707,"19:30","19:50",1,0,3701,0,6));
        put(605,new Struct_hdyl_259(605,6,3705,"20:00","20:20",1,1,3701,0,4));
        put(606,new Struct_hdyl_259(606,6,1603,"20:30","21:20",1,1,1603,0,0));
        put(607,new Struct_hdyl_259(607,6,1805,"21:30","22:00",0,0,1805,0,0));
        put(608,new Struct_hdyl_259(608,6,3610,"11:00","12:00",1,1,3610,0,15));
        put(609,new Struct_hdyl_259(609,6,3610,"22:00","23:00",1,1,3610,0,15));
        put(701,new Struct_hdyl_259(701,7,3702,"12:00","22:00",0,0,3702,0,0));
        put(702,new Struct_hdyl_259(702,7,1805,"12:30","13:00",0,0,1805,0,0));
        put(703,new Struct_hdyl_259(703,7,1805,"18:30","19:00",0,0,1805,0,0));
        put(704,new Struct_hdyl_259(704,7,3603,"19:30","20:30",1,1,3603,0,0));
        put(705,new Struct_hdyl_259(705,7,1603,"20:30","21:20",1,1,1604,0,0));
        put(706,new Struct_hdyl_259(706,7,1805,"21:30","22:00",0,0,1805,0,0));
        put(707,new Struct_hdyl_259(707,7,3610,"11:00","12:00",1,1,3610,0,15));
        put(708,new Struct_hdyl_259(708,7,3610,"22:00","23:00",1,1,3610,0,15));
        put(801,new Struct_hdyl_259(801,12,1504,"10:00","22:00",0,1,1504,0,0));
        put(802,new Struct_hdyl_259(802,15,1504,"10:00","22:00",0,1,1504,0,0));
    }
    public void reset(){
        ins = null;
    }
}