const { Sequelize,DataTypes,Op } = require('sequelize');

//学生数据
const students=[
    {Sno:108,Sname:'曾华',Ssex:'男',Sbirthday:new Date('1977-09-01'),Class:'95033'},
    {Sno:105,Sname:'匡明',Ssex:'男',Sbirthday:new Date('1975-10-02'),Class:'95031'},
    {Sno:107,Sname:'王丽',Ssex:'女',Sbirthday:new Date('1976-01-23'),Class:'95033'},
    {Sno:101,Sname:'李军',Ssex:'男',Sbirthday:new Date('1976-02-20'),Class:'95033'},
    {Sno:109,Sname:'王芳',Ssex:'女',Sbirthday:new Date('1975-02-10'),Class:'95031'},
    {Sno:103,Sname:'陆军',Ssex:'男',Sbirthday:new Date('1974-06-03'),Class:'95031'},
]

//课程数据
const course=[
    {Cno:105,Cname:'计算机导论',Tno:825},
    {Cno:245,Cname:'操作系统',Tno:804},
    {Cno:166,Cname:'数字电路',Tno:856},
    {Cno:888,Cname:'高等数学',Tno:831}
]

//成绩数据
const score=[
    {Sno:103,Cno:245,Degree:86},
    {Sno:105,Cno:245,Degree:75},
    {Sno:109,Cno:245,Degree:68},
    {Sno:103,Cno:105,Degree:92},
    {Sno:105,Cno:105,Degree:88},
    {Sno:101,Cno:105,Degree:64},
    {Sno:107,Cno:105,Degree:91},
    {Sno:108,Cno:105,Degree:78},
    {Sno:101,Cno:166,Degree:85},
    {Sno:107,Cno:166,Degree:79},
    {Sno:108,Cno:166,Degree:81}
]

//教师数据
const teacher=[
    {Tno:804,Tname:'李诚',Tsex:'男',Tbirthday:new Date('1958-12-02'),Prof:'副教授',Depart:'计算机系'},
    {Tno:856,Tname:'张旭',Tsex:'男',Tbirthday:new Date('1969-03-12'),Prof:'讲师',Depart:'电子工程系'},
    {Tno:825,Tname:'王萍',Tsex:'女',Tbirthday:new Date('1972-05-05'),Prof:'助教',Depart:'计算机系'},
    {Tno:831,Tname:'刘冰',Tsex:'女',Tbirthday:new Date('1977-08-14'),Prof:'助教',Depart:'电子工程系'}
]

async function main(){
    const sequelize = new Sequelize('mfs_db2', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql' ,
        pool:{
            max:5,
            min:0,
            idle:10000
        },
    })
    await sequelize.authenticate()
    console.log('连接成功');

    const Student = sequelize.define('Student', {
        Sno: {
          type: DataTypes.INTEGER,
          allowNull: false,
          description:'学号(主键)',
          primaryKey:true
        },
        Sname: {
          type: DataTypes.STRING,
          allowNull: false,
          description:'学生姓名'
        },
        Ssex:{
            type:DataTypes.STRING,
            allowNull:false,
            description:'学生性别'
        },
        Sbirthday:{
            type:DataTypes.DATE,
            allowNull:true,
            description:'学生出生年月'
        },
        Class:{
            type:DataTypes.STRING,
            allowNull:true,
            description:'学生所在班级'
        }
      }
      );

      const Course=sequelize.define('Course',{
          Cno:{
              type:DataTypes.INTEGER,
              allowNull:false,
              description:'课程号(主键)',
              primaryKey:true
          },
          Cname:{
              type:DataTypes.STRING,
              allowNull:false,
              description:'课程名称'
          },
          Tno:{
              type:DataTypes.INTEGER,
              allowNull:false,
              description:'教工编号(外键)',
          }
      })

      const Score=sequelize.define('Score',{
          Sno:{
              type:DataTypes.INTEGER,
              allowNull:false,
              description:'学号(外键)',
            // references:{
            //     model:Student,
            //     key:'Sno'
            // }
          },
          Cno:{
              type:DataTypes.INTEGER,
              allowNull:false,
              description:'课程号(外键)',
            // references:{
            //     model:Course,
            //     key:'Cno'
            // }
          },
          Degree:{
              type:DataTypes.FLOAT,
              allowNull:true,
              description:'成绩'
          }
      })
    //   Student.belongsToMany(Course,{
    //       through:Score
    //   })
    //   Course.belongsToMany(Student,{
    //       through:Score
    //   })
    // Score.hasMany(Student,{as:'score_stu_fk',foreignKey:'Sno'})
    // Score.hasMany(Course,{as:'score_cor_fk',foreignKey:'Cno'})

      const Teacher=sequelize.define('Teacher',{
          Tno:{
              type:DataTypes.INTEGER,
              allowNull:false,
              description:'教工编号(主键)',
              primaryKey:true
          },
          Tname:{
              type:DataTypes.STRING,
              allowNull:false,
              description:'教工姓名'
          },
          Tsex:{
              type:DataTypes.STRING,
              allowNull:false,
              description:'教工性别'
          },
          Tbirthday:{
              type:DataTypes.DATE,
              allowNull:true,
              description:'教工出生年月'
          },
          Prof:{
              type:DataTypes.STRING,
              allowNull:true,
              description:'职称'
          },
          Depart:{
              type:DataTypes.STRING,
              allowNull:false,
              description:'教工所在部门'
          }
      })
      Course.belongsTo(Teacher,{
          foreignKey:'Tno'
      })

     await sequelize.sync()
     console.log('所有模型已成功同步');


     //向表中添加数据
     for(let stu of students){
         await Student.create(stu)
     }

    for(let tea of teacher){
        await Teacher.create(tea)
    }

    for(let cor of course){
        await Course.create(cor)
    }

    for(let sco of score){
        await Score.create(sco)
    }
    
    //查询性别为男的学生
    let res=await Student.findAll({
        where:{
            Ssex:'男'
        }
    })
    console.log(JSON.stringify(res,null,2));

    // let res=await User.findAll({
    //     where:{
    //         id:{
    //             [Op.lt]: 5//小于
    //         }
    //     }
    // })
    // console.log(res);


    //build save 可以不停的修改内存中的数据，然后最终确定下来之后再save进数据库中。
    // let user=User.build({
    //     firstName:'sdsjd',lastName:'cxcx'
    // })
    // console.log('built');
    // user.save()//是个异步方法，其实比下面一条后执行完
    // console.log('save');

    // for(let user of res){
    //     user.firstName='sisisi'
    //     await user.save()
    // }

    // await User.destroy({
    //     where:{
    //         id:1
    //     }
    // })

    // await User.update({
    //     firstName:'mfs'
    // },{
    //     where:{
    //         id:2
    //     }
    // })
     
}


main().catch(err=>{console.log(err);})